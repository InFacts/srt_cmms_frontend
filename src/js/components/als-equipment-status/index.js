import React, { useState, useEffect } from 'react';
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array"
import { useFormik, withFormik, useFormikContext } from 'formik';

import { footerToModeInvisible } from '../../redux/modules/footer.js';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { Redirect } from 'react-router-dom';

import { useToolbarChangeModeInitializer } from '../../hooks/toolbar-initializer';
import { TOOLBAR_MODE, TOOLBAR_ACTIONS, MODE_TO_ACTION_CREATOR } from '../../redux/modules/toolbar.js';
import useFactInitializer from '../../hooks/fact-initializer';
import useTokenInitializer from '../../hooks/token-initializer';

import GroupedBarGraph from '../common/d3-grouped-bar-graph';
import Histogram from './d3-histogram';
import ThailandMapComponent from './d3-map';
import SimpleGrayCardComponent from './simple-gray-card';
import AdjustmentBarComponent from './adjustment-bar';
import EquipmentStatusListComponent from './equipment-status-list';
import {randomGroupedBarGraphData} from './mockup-data'

import BgGreen from '../../../images/als/bg_als.jpg';
import { changeTheam } from '../../helper.js'
// import mockupEquipmentData from './mockupEquipmentData.json';

const randomHistogramData = () => {
    let results = [];

    results.push(0)
    for (let i = 0; i < 1000; i++) {
        let randomNumber = (Math.random() + Math.random() + Math.random() + Math.random()) / 4 * 100;
        results.push(randomNumber);
    }

    return results;
}

// Equipment
export const ITEM_STATUS = {
    NEW: 1, // ใหม่
    BROKEN: 2, // เสีย
    FIX: 3, // ซ่อมแล้ว
    USED: 4, // มือสอง
    SALVAGE: 5, // ซาก
    INSTALLED: 6, // ติดตั้งแล้ว
}

export const FilterByAdjustmentBar = (equipment_installation, equipment_group, adjustmentBar) => {
    if (equipment_installation.length !== 0) {
        if (adjustmentBar.equipment_group_id === "ทั้งหมด" || adjustmentBar.equipment_group_id == equipment_group.equipment_group_id) {
            if (adjustmentBar.district_id === "ทั้งหมด" || adjustmentBar.district_id == equipment_installation[0].location_district_id) {
                if (adjustmentBar.node_id === "ทั้งหมด" || adjustmentBar.node_id == equipment_installation[0].location_node_id) {
                    return true;
                }
            }
        }
    }
    return false;
}

const AlsEquipmentStatusComponent = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.token.isLoggedIn);
    const {values, setFieldValue} = useFormikContext();
    const factEquipment = useSelector((state) => ({ ...state.api.fact.equipment }), shallowEqual);
    const [equipmentsTotal, setEquipmentsTotal] = useState(0);
    const [equipmentsInstalled, setEquipmentsInstalled] = useState(0);
    const [equipmentsBroken, setEquipmentsBroken] = useState(0);
    const [equipmentsMaintenance, setEquipmentsMaintenance] = useState(0);

    // Initializer: Change Toolbar to Mode None
    useToolbarChangeModeInitializer(TOOLBAR_MODE.NONE_HOME); // TODO: Needs to find where to go when we press "HOME"!!
    useTokenInitializer();
    useFactInitializer();
    useEffect(() => {
        // setFieldValue('temp_equipment_data', mockupEquipmentData.data)
        dispatch(footerToModeInvisible());
    }, []);

    useEffect(() => {
        let count_total = 0;
        let count_installed = 0;
        let count_broken = 0;
        let count_maintenance = 0;
        let promise = new Promise(function(resolve, reject) {
            // let count_total, count_installed, count_broken, count_maintenance = 0;
            factEquipment.items.map(function ({ equipment_id, item_id, useful_life, responsible_district_id, item_status_id, responsible_node_id, is_installed, equipment_group, equipment_installation }) {
                // is_installed.data[0] === 1 
                if (FilterByAdjustmentBar(equipment_installation, equipment_group, values)) {
                    if (item_status_id === ITEM_STATUS.INSTALLED || item_status_id === ITEM_STATUS.NEW || item_status_id === ITEM_STATUS.BROKEN || item_status_id === ITEM_STATUS.FIX) {
                        count_total++;
                        if (item_status_id === ITEM_STATUS.INSTALLED || item_status_id === ITEM_STATUS.NEW) { count_installed++; }
                        else if (item_status_id === ITEM_STATUS.BROKEN) { count_broken++; }
                        else if (item_status_id === ITEM_STATUS.FIX) { count_maintenance++; }
                    }
                }
            })
            resolve();
        });

        promise.then(function() { 
            setEquipmentsTotal(count_total);
            setEquipmentsInstalled(count_installed);
            setEquipmentsBroken(count_broken);
            setEquipmentsMaintenance(count_maintenance);
        })
        
    }, [factEquipment.items, values.equipment_group_id, values.district_id, values.node_id]);

    return (
        <>
            {/* {!loggedIn ? <Redirect to="/" /> : null} */}
            <div id={changeTheam() === true ? "" : "blackground-white"} style={changeTheam() === true ? { backgroundImage: `url(${BgGreen})`, width: "100vw", height: "120vh" } : {height: "120vh"}}>
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
                                    // value={1270}
                                    value={equipmentsTotal!==undefined ? equipmentsTotal:0}
                                />
                            </div>


                            {/* === Current Average Inventory Month Text :1st Row, 2nd Column === */}
                            <div className="col-3">
                                <SimpleGrayCardComponent
                                    name="จำนวนสินทรัพย์ที่ใช้งาน"
                                    // value={750}
                                    value={equipmentsInstalled!==undefined ? equipmentsInstalled:0}
                                />

                            </div>

                            {/* === Current Inventory Month vs Planned Inventory Month Scatter Plot :1st Row, 2nd Column === */}
                            <div className="col-3">
                                <SimpleGrayCardComponent
                                    name="จำนวนสินทรัพย์ชำรุด"
                                    // value={200}
                                    value={equipmentsBroken!==undefined ? equipmentsBroken:0}
                                />

                            </div>

                            <div className="col-3" >
                                <SimpleGrayCardComponent
                                    name="จำนวนสินทรัพย์ดำเนินการซ่อม"
                                    // value={320}
                                    value={equipmentsMaintenance!==undefined ? equipmentsMaintenance:0}
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
                                    marginTop: 30, 
                                    height: "300px"
                                }}>
                                <Histogram
                                    chartSettings={{ marginLeft: 50, marginTop: 40, marginBottom: 40, height: 300 }}
                                    data={randomHistogramData()}
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
                            <div className="col-4" 
                                // style={{ border: "1px solid red", height: "200px" }}
                            >

                                <GroupedBarGraph
                                    title="ระยะเวลาเฉลี่ยก่อนการเสียหายแต่ละครั้ง"
                                    data={randomGroupedBarGraphData()}
                                />
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
        equipment_group_id: 'ทั้งหมด',
        district_id: 'ทั้งหมด',
        node_id: 'ทั้งหมด',
        thailand_location_province: [],
    })
})(AlsEquipmentStatusComponent);

export default EnhancedAlsEquipmentStatusComponent;
