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
import GroupedBarGraph from '../common/d3-grouped-bar-graph';
import ColorMap from './d3-color-map';
import PieChart from '../common/d3-pie-chart';

import AdjustmentBarComponent from './adjustment-bar';
import {randomGroupedBarGraphData , randomGroupedBarGraphDataMTBF, randomColorMapData,randomPieChartData, randomPieChartDataSystemType} from './mockup-data';

import BgGreen from '../../../images/als/bg_als.jpg';
import { fetchPositionPermissionData, changeTheam } from '../../helper.js'
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
            {/* {!loggedIn ? <Redirect to="/" /> : null} */}

            <div id={changeTheam() === true ? "" : "blackground-white"} style={changeTheam() === true ? { backgroundImage: `url(${BgGreen})`, width: "100vw", height: "120vh" } : {height: "120vh"}}>
                <div className="bootstrap-wrapper">
                    <div className="container" style={{ marginTop: "70px" }}>
                        {/* Section Title */}
                        <h4 className="head-title no-margin">ภาพรวมของสถิติเหตุขัดข้อง/เสียหาย - สส.101</h4>


                        {/* Columns have horizontal padding to create the gutters between individual columns, however, you can remove the margin from rows and padding from columns with .no-gutters on the .row. */}
                        <div className="row_bootstrap no-gutters">

                            {/* First Half Column */}
                            <div className="col-6"
                                // style={{ border: "1px red solid" }}
                            >
                                <div className="row_bootstrap no-gutters">
                                    <div className="col-4"
                                        // style={{ border: "1px purple solid" }}
                                    >
                                        <AdjustmentBarComponent />
                                    </div>
                                    <div className="col-8"
                                        // style={{ border: "1px purple solid" }}
                                    >
                                    <PieChart 
                                        title="สถิติจำนวนครั้งการขัดข้องของระบบที่ตรวจซ่อม"
                                        chartSettings={{
                                            marginTop:50,
                                            marginBottom:80,
                                            height:280,
                                        }}
                                        data={randomPieChartDataSystemType()}
                                    />
                                </div>

                                </div>

                                <div className="row_bootstrap no-gutters">
                                    <div className="col-12"
                                        // style={{ border: "1px purple solid" }}
                                    >
                                        <GroupedBarGraph
                                            title="สถิติค่าใช้จ่ายในการซ่อมบำรุงแต่ละประเภท"
                                            data={randomGroupedBarGraphData()}
                                        />
                                    </div>

                                </div>

                                <div className="row_bootstrap no-gutters">
                                    <div className="col-12"
                                        // style={{ border: "1px purple solid" }}
                                    >
                                        <PieChart 
                                            title="สถิติการซ่อมบำรุงในแต่ละหมวด"
                                            data={randomPieChartData()}
                                        />
                                    </div>

                                </div>
                            </div>

                            {/* Second Half Column */}
                            <div className="col-6"
                                // style={{ border: "1px red solid" }}
                            >
                                <div className="row_bootstrap no-gutters">
                                    <div className="col-12"
                                        // style={{ border: "1px purple solid" }}
                                    >
                                        <ColorMap 
                                            title="สถิติจำนวนครั้งการขัดข้องของระบบที่ตรวจซ่อมเทียบกับแขวง"
                                            data={randomColorMapData()}
                                        />
                                    </div>

                                </div>

                                {/* ระยะเวลาเฉลี่ยก่อนการเสียหายแต่ละครั้ง - MTBF */}
                                <div className="row_bootstrap no-gutters">
                                    <div className="col-12"
                                        // style={{ border: "1px purple solid" }}
                                    >
                                        <GroupedBarGraph
                                            title="ระยะเวลาเฉลี่ยก่อนการเสียหายแต่ละครั้ง - MTBF"
                                            data={randomGroupedBarGraphDataMTBF()}
                                        />
                                    </div>

                                </div>
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
        year: 2563,
        fix_type: '',
        division_id: '',
        district_id: '',
        node_id: '',
    })
})(AlsEquipmentStatusComponent);


export default EnhancedAlsEquipmentStatusComponent;
