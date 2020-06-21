import React, { useState, useEffect } from 'react';
import { useFormik, withFormik, useFormikContext } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';

import { footerToModeInvisible } from '../../redux/modules/footer.js';

import { useToolbarChangeModeInitializer } from '../../hooks/toolbar-initializer';
import { TOOLBAR_MODE, TOOLBAR_ACTIONS, MODE_TO_ACTION_CREATOR } from '../../redux/modules/toolbar.js';
import useFactInitializer from '../../hooks/fact-initializer';
import useTokenInitializer from '../../hooks/token-initializer';

import Top5Component from './d3-top5';

import AdjustmentBarComponent from './adjustment-bar';

const AlsPreventiveMaintenanaceComponent = () => {
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
                        <h4 className="head-title no-margin">ภาพรวมการทำวาระ</h4>

                        {/* Columns have horizontal padding to create the gutters between individual columns, however, you can remove the margin from rows and padding from columns with .no-gutters on the .row. */}
                        <div className="row_bootstrap no-gutters">

                            {/* AdjustmentBar */}
                            <div className="col-2"
                                style={{ border: "1px red solid" }}
                            >
                                <AdjustmentBarComponent />
                            </div>


                            {/* Make another col,row pair since 10 cant be divided by 3equally ; and col-auto/col with automatic width doesn't work!!*/}
                            <div className="col-10">
                                <div className="row_bootstrap no-gutters">

                                    {/* Top5 */}
                                    <div className="col-4"
                                        style={{ border: "1px red solid" }}
                                    >
                                        <Top5Component
                                            title="5 อันดับแรกที่ดำเนินตามวาระได้เสร็จสมบูรณ์"
                                            // data={randomDonutChartBinaryData()}
                                        />
                                    </div>

                                    {/* Top5 */}
                                    <div className="col-4"
                                        style={{ border: "1px red solid" }}
                                    >
                                        <Top5Component
                                            title="5 อันดับแรกที่ทำตามวาระได้ดำเนินการไม่ตรงตามวาระ"
                                            // data={randomDonutChartBinaryData()}
                                        />
                                    </div>

                                    {/* Top5 */}
                                    <div className="col-4"
                                        style={{ border: "1px red solid" }}
                                    >
                                        <Top5Component
                                            title="5 อันดับแรกที่ไม่ดำเนินการทำวาระ"
                                            // data={randomDonutChartBinaryData()}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* PM ColorMap */}
                        <div className="row_bootstrap no-gutters">

                            {/* Top5 */}
                            <div className="col-auto"
                                style={{ border: "1px red solid" }}
                            >Top5
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}
const EnhancedAlsPreventiveMaintenanaceComponent = withFormik({
    mapPropsToValues: () => ({
        year: 2563,
        fix_type: '',
        division_id: '',
        district_id: '',
        node_id: '',
        temp_equipment_data: [],
    })
})(AlsPreventiveMaintenanaceComponent);


export default EnhancedAlsPreventiveMaintenanaceComponent;
