import React, { useState, useEffect } from 'react';
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array"
import { useFormik, withFormik, useFormikContext } from 'formik';

import { footerToModeInvisible } from '../../redux/modules/footer.js';
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';

import { useToolbarChangeModeInitializer } from '../../hooks/toolbar-initializer';
import { TOOLBAR_MODE, TOOLBAR_ACTIONS, MODE_TO_ACTION_CREATOR } from '../../redux/modules/toolbar.js';
import useFactInitializer from '../../hooks/fact-initializer';
import useTokenInitializer from '../../hooks/token-initializer';

import {filterAlsEquipment} from '../../helper';

import ScatterPlot from '../als-spare/d3-scatter-plot';
import LineGraph from '../als-spare/d3-line-graph';
import BarDivergingGraph from '../als-spare/d3-bar-diverging';
import Histogram from '../als-equipment-status/d3-histogram';
import ThailandMapComponent from '../als-equipment-status/d3-map';
import SimpleGrayCardComponent from '../als-equipment-status/simple-gray-card';
import AdjustmentBarComponent from '../als-equipment-status/adjustment-bar';
import EquipmentStatusListComponent from '../als-equipment-status/equipment-status-list';
import MockupEquipmentData from '../als-equipment-status/mockupEquipmentData.json';
import {EQUIPMENT_STATUS} from '../als-equipment-status/d3-map.js';

const randomHistogramData = () => {
    let results = [];
    results.push(0)
    for (let i = 0; i < 1000; i++) {
        let randomNumber = (Math.random() + Math.random() + Math.random() + Math.random()) / 4*100; 
        results.push(randomNumber);
    }
    console.log("results", results)
    return results;
}

const AlsEquipmentStatusComponent = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.token.isLoggedIn);
    const { setFieldValue, values } = useFormikContext();
    const [equipmentAge, setEquipmentAge] = useState([])
    
    // Initializer: Change Toolbar to Mode None
    useToolbarChangeModeInitializer(TOOLBAR_MODE.NONE_HOME); // TODO: Needs to find where to go when we press "HOME"!!
    useTokenInitializer();
    useFactInitializer();
    useEffect(() => {
        dispatch(footerToModeInvisible());
    }, []);

    var [amountEquipmentStatusData, setAmountEquipmentStatusData] = useState({ ALL: 0, WORKING: 0, DAMAGED: 0, MAINTENANCING: 0 })
    useEffect(() => {
        const countEquipmentStatus = (mockup, amountEquipmentStatus) => {
            if (mockup.equipment_status_id === EQUIPMENT_STATUS.READY) { amountEquipmentStatus.READY += 1 }
            else if (mockup.equipment_status_id === EQUIPMENT_STATUS.WORKING) { amountEquipmentStatus.WORKING += 1 }
            else if (mockup.equipment_status_id === EQUIPMENT_STATUS.DAMAGED) { amountEquipmentStatus.DAMAGED += 1 }
            else if (mockup.equipment_status_id === EQUIPMENT_STATUS.MAINTENANCING) { amountEquipmentStatus.MAINTENANCING += 1 }
            amountEquipmentStatus.ALL = amountEquipmentStatus.WORKING + amountEquipmentStatus.DAMAGED + amountEquipmentStatus.MAINTENANCING;
            return amountEquipmentStatus;
        }

        let amountEquipmentStatus = {
            ALL: 0,
            WORKING: 0,
            DAMAGED: 0,
            MAINTENANCING: 0
        }
        let filterEquipment = filterAlsEquipment(MockupEquipmentData.data, values)
        setFieldValue("temp_equipment_data", filterEquipment, false);
        filterEquipment.map((mockup, i) => {
            amountEquipmentStatus = countEquipmentStatus(mockup, amountEquipmentStatus);
        })
        setAmountEquipmentStatusData(amountEquipmentStatus);

        // Age Histogram
        let dataAge = []
        filterEquipment.map((data) => {
            dataAge.push(data.age);
        })
        setEquipmentAge(dataAge);

    }, [values.equipment_group_id, values.division_id, values.district_id, values.node_id])


    return (
        <>
            {/* {!loggedIn ? <Redirect to="/" /> : null} */}

            <div id="blackground-white" style={{ height: "100vh"}}>
                <div className="bootstrap-wrapper">
                    <div className="container" style={{ marginTop: "70px" }}>
                        {/* Section Title */}
                        <h4 className="head-title no-margin">แสดงผลสถานะของสินทรัพย์</h4>


                        {/* Columns have horizontal padding to create the gutters between individual columns, however, you can remove the margin from rows and padding from columns with .no-gutters on the .row. */}
                        <div className="row_bootstrap ">
                            {/* === Annual Average Inventory Month Line Graph :1st Row, 1st Column === */}
                            <div className="col-3" >
                                <SimpleGrayCardComponent
                                    name="จำนวนสินทรัพย์ทั้งหมด"
                                    value={amountEquipmentStatusData.ALL.toString()}
                                />
                            </div>


                            {/* === Current Average Inventory Month Text :1st Row, 2nd Column === */}
                            <div className="col-3">
                                <SimpleGrayCardComponent
                                    name="จำนวนสินทรัพย์ที่ใช้งาน"
                                    value={amountEquipmentStatusData.WORKING.toString()}
                                />

                            </div>

                            {/* === Current Inventory Month vs Planned Inventory Month Scatter Plot :1st Row, 2nd Column === */}
                            <div className="col-3">
                                <SimpleGrayCardComponent
                                    name="จำนวนสินทรัพย์ชำรุด"
                                    value={amountEquipmentStatusData.DAMAGED.toString()}
                                />

                            </div>

                            <div className="col-3" >
                                <SimpleGrayCardComponent
                                    name="จำนวนสินทรัพย์ดำเนินการซ่อม"
                                    value={amountEquipmentStatusData.MAINTENANCING.toString()}
                                />

                            </div>
                        </div>
                        {/*=== Second Row ===*/}
                        <div className="row_bootstrap no-gutters">
                            <div className="col-2" >
                                <AdjustmentBarComponent />
                            </div>
                            <div className="col-6"
                                style={{
                                    // border:"1px solid red", 
                                    height: "450px"
                                }}>

                                <ThailandMapComponent />
                            </div>
                            <div className="col-4"
                                style={{
                                    // border:"1px solid red", 
                                    height: "300px"
                                }}>
                                <Histogram 
                                    chartSettings={{ marginLeft: 50, marginTop: 70, marginBottom: 40, height: 300 }} 
                                    data={equipmentAge} // {randomHistogramData()}
                                    title="กลุ่มอายุของสินทรัพย์"
                                    xAxis="อายุการใช้งานของสินทรัพย์"
                                    yAxis="จำนวนของสินทรัพย์"
                                />

                                <div class="space-50px" />

                                <EquipmentStatusListComponent />
                            </div>
                        </div>

                        {/*=== Third Row ===*/}
                        <div className="row_bootstrap no-gutters">
                            <div className="col-4" style={{ border: "1px solid red", height: "200px" }}>
                                <ScatterPlot />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
const EnhancedAlsEquipmentStatusComponent = withFormik({
    mapPropsToValues: () => ({
        equipment_group_id: '',
        division_id: '',
        district_id: '',
        node_id: '',
        temp_equipment_data: [],
    })
})(AlsEquipmentStatusComponent);


export default EnhancedAlsEquipmentStatusComponent;
