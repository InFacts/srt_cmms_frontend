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
import Histogram from '../als-equipment-status/d3-histogram';
import ThailandMapComponent from '../als-equipment-status/d3-map';
import SimpleGrayCardComponent from '../als-equipment-status/simple-gray-card';
import AdjustmentBarComponent from '../als-equipment-status/adjustment-bar';
import EquipmentStatusListComponent from '../als-equipment-status/equipment-status-list';

import {randomHistogramData, randomPieChartData,randomGroupedBarGraphData} from './mockup-data';
import PieChart from '../common/d3-pie-chart';
import GroupedBarGraph from '../common/d3-grouped-bar-graph';

const AlsPlanPreventiveMaintenanceComponent = () => {
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

            <div id="blackground-white" style={{ height: "100vh"}}>
                <div className="bootstrap-wrapper">
                    <div className="container" style={{ marginTop: "70px" }}>
                        {/* Section Title */}
                        <h4 className="head-title no-margin">ระบบวิเคราะห์การวางแผนการซ่อมบำรุง</h4>

                        {/* Columns have horizontal padding to create the gutters between individual columns, however, you can remove the margin from rows and padding from columns with .no-gutters on the .row. */}
                        <div className="row_bootstrap no-gutters">
                            <div className="col-4" >
                                <Histogram 
                                    chartSettings={{ marginLeft: 50, marginTop: 70, marginBottom: 40, height: 300 }} 
                                    data={randomHistogramData()}
                                    title="ระยะเวลาระหว่างการชำรุดจากอายุการใช้งาน"
                                    xAxis="อายุการใช้งานของสินทรัพย์"
                                    yAxis="จำนวนของสินทรัพย์"
                                />
                            </div>
                            <div className="col-8" >
                                <GroupedBarGraph 
                                    chartSettings={{ marginLeft: 50, marginTop: 70, marginBottom: 40, height: 300 }} 
                                    data={randomGroupedBarGraphData()}
                                />
                            </div>

                        </div>

                        <div className="row_bootstrap no-gutters">
                            <div className="col-4" >
                                <PieChart 
                                    chartSettings={{ marginLeft: 20, marginTop: 30, marginBottom: 40, 
                                    marginRight:20, height: 200 }} 
                                    data={randomPieChartData()}
                                    title="ระยะเวลาระหว่างการชำรุดจากอายุการใช้งาน"
                                />
                            </div>
                            {/* PM MTBF */}
                            <div className="col-8" >
                                
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
const EnhancedAlsPlanPreventiveMaintenanceComponent = withFormik({
    mapPropsToValues: () => ({
        equipment_group_id: '',
        division_id: '',
        district_id: '',
        node_id: '',
    })
})(AlsPlanPreventiveMaintenanceComponent);


export default EnhancedAlsPlanPreventiveMaintenanceComponent;
