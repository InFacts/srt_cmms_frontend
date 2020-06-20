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

import ScatterPlot from '../als-spare/d3-scatter-plot';
import LineGraph from '../als-spare/d3-line-graph';
import BarDivergingGraph from '../als-spare/d3-bar-diverging';
import GroupedBarGraph from './d3-grouped-bar-graph';

import Histogram from '../als-equipment-status/d3-histogram';
import ThailandMapComponent from '../als-equipment-status/d3-map';
import SimpleGrayCardComponent from '../als-equipment-status/simple-gray-card';
import AdjustmentBarComponent from './adjustment-bar';
import EquipmentStatusListComponent from '../als-equipment-status/equipment-status-list';


const randomHistogramData = () => {
    let results = [];

    results.push(0)
    for (let i = 0; i < 1000; i++) {
        let randomNumber = (Math.random() + Math.random() + Math.random() + Math.random()) / 4 * 100;
        results.push(randomNumber);
    }

    return results;
}


// Data format is referenced from https://observablehq.com/@d3/grouped-bar-chart with some modifications
const randomGroupedBarGraphData = () => {
    let results = [];
    results.columns = ["2018", "2019"];
    results.yAxis = "ค่าใช้จ่ายในการขัดข้อง"
    results.xAxis = "ประเภท"
    let xGroups = ["ก0", "ก1", "ก2", "ก3", "ก4", "ก5", "ข1", "ข2", "ข3", "ข4", "ข5", "ข6", "ข7", "ข8", "ข9", "ข10", "ข11", "ข12"]
    
    for (let i = 0; i < xGroups.length; i++) {
        results.push({
            [results.xAxis]: xGroups[i],
            [results.columns[0]]: Math.random()*10000,
            [results.columns[1]]: Math.random()*8000,
        });
    }

    return results;
}

const AlsEquipmentStatusComponent = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.token.isLoggedIn);

    // Initializer: Change Toolbar to Mode None
    useToolbarChangeModeInitializer(TOOLBAR_MODE.NONE_HOME); // TODO: Needs to find where to go when we press "HOME"!!
    useTokenInitializer();
    useFactInitializer();
    useEffect(() => {
        dispatch(footerToModeInvisible());
    }, []);



    return (
        <>
            {!loggedIn ? <Redirect to="/" /> : null}

            <div id="blackground-white" >
                <div className="bootstrap-wrapper">
                    <div className="container" style={{ marginTop: "70px" }}>
                        {/* Section Title */}
                        <h4 className="head-title no-margin">ภาพรวมของสถิติเหตุขัดข้อง/เสียหาย - สส.101</h4>


                        {/* Columns have horizontal padding to create the gutters between individual columns, however, you can remove the margin from rows and padding from columns with .no-gutters on the .row. */}
                        <div className="row_bootstrap no-gutters">

                            <div className="col-6"
                                style={{ border: "1px red solid" }}
                            >
                            <div className="row_bootstrap no-gutters">
                                    <div className="col-4"
                                        style={{ border: "1px purple solid" }}
                                    >
                                        <AdjustmentBarComponent />
                                    </div>
                                    <div className="col-8"
                                        style={{ border: "1px purple solid" }}
                                    >col4</div>

                                </div>

                                <div className="row_bootstrap no-gutters">
                                    <div className="col-12"
                                        style={{ border: "1px purple solid" }}
                                    >
                                        <GroupedBarGraph 
                                            title="สถิติค่าใช้จ่ายในการซ่อมบำรุงแต่ละประเภท"
                                            data={randomGroupedBarGraphData()}
                                        />
                                    </div>

                                </div>

                                <div className="row_bootstrap no-gutters">
                                    <div className="col-12"
                                        style={{ border: "1px purple solid" }}
                                    >col6</div>

                                </div>
                            </div>

                            <div className="col-6"
                                style={{ border: "1px red solid" }}
                            >col6
                            <div className="row_bootstrap no-gutters">
                                    <div className="col-12"
                                        style={{ border: "1px purple solid" }}
                                    >col6</div>

                                </div>
                                <div className="row_bootstrap no-gutters">
                                    <div className="col-12"
                                        style={{ border: "1px purple solid" }}
                                    >col6</div>

                                </div>
                            </div>

                        </div>
                        <div className="row_bootstrap no-gutters">

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
                                    height: "300px"
                                }}>
                                <Histogram
                                    chartSettings={{ marginLeft: 50, marginTop: 70, marginBottom: 40, height: 300 }}
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
        year:2563,
        fix_type: '',
        division_id: '',
        district_id: '',
        node_id: '',
    })
})(AlsEquipmentStatusComponent);


export default EnhancedAlsEquipmentStatusComponent;
