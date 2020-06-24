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

import GroupedBarGraph from '../common/d3-grouped-bar-graph';
import Histogram from './d3-histogram';
import ThailandMapComponent from './d3-map';
import SimpleGrayCardComponent from './simple-gray-card';
import AdjustmentBarComponent from './adjustment-bar';
import EquipmentStatusListComponent from './equipment-status-list';
import {randomGroupedBarGraphData} from './mockup-data'

import BgGreen from '../../../images/als/bg_als.jpg';
import { fetchPositionPermissionData, changeTheam } from '../../helper.js'
import mockupEquipmentData from './mockupEquipmentData.json';

const randomHistogramData = () => {
    let results = [];

    results.push(0)
    for (let i = 0; i < 1000; i++) {
        let randomNumber = (Math.random() + Math.random() + Math.random() + Math.random()) / 4 * 100;
        results.push(randomNumber);
    }

    return results;
}

const AlsEquipmentStatusComponent = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.token.isLoggedIn);
    const {setFieldValue} = useFormikContext();

    // Initializer: Change Toolbar to Mode None
    useToolbarChangeModeInitializer(TOOLBAR_MODE.NONE_HOME); // TODO: Needs to find where to go when we press "HOME"!!
    useTokenInitializer();
    useFactInitializer();
    useEffect(() => {
        dispatch(footerToModeInvisible());
    }, []);

    useEffect(() => {
        setFieldValue('temp_equipment_data', mockupEquipmentData.data)
    }, [])


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
                                    value={2000}
                                />
                            </div>


                            {/* === Current Average Inventory Month Text :1st Row, 2nd Column === */}
                            <div className="col-3">
                                <SimpleGrayCardComponent
                                    name="จำนวนสินทรัพย์ที่ใช้งาน"
                                    value={1600}
                                />

                            </div>

                            {/* === Current Inventory Month vs Planned Inventory Month Scatter Plot :1st Row, 2nd Column === */}
                            <div className="col-3">
                                <SimpleGrayCardComponent
                                    name="จำนวนสินทรัพย์ชำรุด"
                                    value={98}
                                />

                            </div>

                            <div className="col-3" >
                                <SimpleGrayCardComponent
                                    name="จำนวนสินทรัพย์ดำเนินการซ่อม"
                                    value={302}
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
        equipment_group_id: '',
        division_id: '',
        district_id: '',
        node_id: '',
    })
})(AlsEquipmentStatusComponent);


export default EnhancedAlsEquipmentStatusComponent;
