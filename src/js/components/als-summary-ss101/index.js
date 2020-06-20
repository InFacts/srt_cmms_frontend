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
import ColorMap from './d3-color-map';

import AdjustmentBarComponent from './adjustment-bar';
import {randomGroupedBarGraphData , randomColorMapData} from './mockup-data';

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

                            {/* First Half Column */}
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

                            {/* Second Half Column */}
                            <div className="col-6"
                                style={{ border: "1px red solid" }}
                            >
                                <div className="row_bootstrap no-gutters">
                                    <div className="col-12"
                                        style={{ border: "1px purple solid" }}
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
                                        style={{ border: "1px purple solid" }}
                                    >
                                        <GroupedBarGraph
                                            title="ระยะเวลาเฉลี่ยก่อนการเสียหายแต่ละครั้ง - MTBF"
                                            data={randomGroupedBarGraphData()}
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
