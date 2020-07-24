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
import ColorMapDateComponent from './d3-color-map-date';

import AdjustmentBarComponent from './adjustment-bar';

import {randomColorMapData} from './mockup-data';

import BgGreen from '../../../images/als/bg_als.jpg';
import { ALSGetDocumentPMTPlan, changeTheam, DOCUMENT_STATUS } from '../../helper.js'
const AlsPreventiveMaintenanaceComponent = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.token.isLoggedIn);
    const {values, setFieldValue} = useFormikContext();

    // Initializer: Change Toolbar to Mode None
    useToolbarChangeModeInitializer(TOOLBAR_MODE.NONE_HOME); // TODO: Needs to find where to go when we press "HOME"!!
    useTokenInitializer();
    useFactInitializer();
    useEffect(() => {
        dispatch(footerToModeInvisible());
    }, []);

    useEffect(() => {
        let groupsComplete = ["จำนวนวาระที่เสร็จสมบูรณ์", "จำนวนวาระทั้งหมด"];
        let groupsDelay = ["จำนวนวาระที่ไม่ตรงตามวาระ", "จำนวนวาระทั้งหมด"];
        let groupsUncomplete = ["จำนวนวาระที่ไม่ดำเนินการทำวาระ", "จำนวนวาระทั้งหมด"];
        let dataCircleWorkOrderPM_complete = [];
        let _countOrderPM_complete = 0;
        let dataCircleWorkOrderPM_delay = [];
        let _countOrderPM_delay = 0;
        let dataCircleWorkOrderPM_uncomplete = [];
        let _countOrderPM_uncomplete = 0;
        let _countOrderPM_todo = 0;

        let nowYear = new Date().getFullYear();
        let begin_document_date = (nowYear-1).toString() + "-01-01";
        let end_document_date = (nowYear).toString() + "-12-31";
        ALSGetDocumentPMTPlan(begin_document_date, end_document_date).then((data) => {
            let data_pmt_plan = data.results;
            console.log("data_pmt_plan", data_pmt_plan )
            data_pmt_plan.map((item) => { 
                let pmt_plan_createon = new Date(item.created_on);
                let pmt_plan_doc_date = new Date(item.document_date);
                // To calculate the time difference of two dates 
                let Difference_In_Time = pmt_plan_doc_date.getTime() - pmt_plan_createon.getTime()

                // To calculate the no. of days between two dates 
                var Difference_In_Week = Difference_In_Time / (1000 * 3600 * 24 * 7);

                // ------------------------------------------
                //            |   In Time   |   Out Time   |
                // ------------------------------------------
                // Complete   |     60      |              |
                // Uncomplete |             |      30      |
                // Delay      |             |      10      |
                // ------------------------------------------
                // Note: Work Order PM - TODO
                if (Difference_In_Week > 4) {  //Out Time
                    if (item.document_status_en === DOCUMENT_STATUS.DRAFT || item.document_status_en === DOCUMENT_STATUS.WAIT_APPROVE) { _countOrderPM_uncomplete++; }
                    else { _countOrderPM_delay++; } // APPROVE_DONE
                }
                else {  // In Time
                    if (item.document_status_en === DOCUMENT_STATUS.APPROVE_DONE ) { _countOrderPM_complete++; }
                    else { 
                        console.log("Difference_In_Week", Difference_In_Week)
                        _countOrderPM_todo++;
                    } // DRAFT, WAIT_APPROVE
                }
            })

            // console.log("_countOrderPM_complete", _countOrderPM_complete )
            // console.log("_countOrderPM_uncomplete", _countOrderPM_uncomplete )
            // console.log("_countOrderPM_delay", _countOrderPM_delay )
            // console.log("_countOrderPM_todo", _countOrderPM_todo )
            let total_task = _countOrderPM_complete + _countOrderPM_uncomplete + _countOrderPM_delay + _countOrderPM_todo;
            // groupsComplete
            dataCircleWorkOrderPM_complete.push({key: groupsComplete[0], value: _countOrderPM_complete});
            dataCircleWorkOrderPM_complete.push({key: groupsComplete[1], value: total_task});
            dataCircleWorkOrderPM_complete.groupsComplete = groupsComplete[0];
            dataCircleWorkOrderPM_complete.totalUnitOfMeasure ="ทั้งหมด";
            dataCircleWorkOrderPM_complete.unitOfMeasure = "#Work Order";

            // groupsDelay
            dataCircleWorkOrderPM_delay.push({key: groupsDelay[0], value: _countOrderPM_delay});
            dataCircleWorkOrderPM_delay.push({key: groupsDelay[1], value: total_task});
            dataCircleWorkOrderPM_delay.groupsComplete = groupsComplete[0];
            dataCircleWorkOrderPM_delay.totalUnitOfMeasure ="ทั้งหมด";
            dataCircleWorkOrderPM_delay.unitOfMeasure = "#Work Order";

            // groupsUncomplete
            dataCircleWorkOrderPM_uncomplete.push({key: groupsUncomplete[0], value: _countOrderPM_uncomplete});
            dataCircleWorkOrderPM_uncomplete.push({key: groupsUncomplete[1], value: total_task});
            dataCircleWorkOrderPM_uncomplete.groupsComplete = groupsComplete[0];
            dataCircleWorkOrderPM_uncomplete.totalUnitOfMeasure ="ทั้งหมด";
            dataCircleWorkOrderPM_uncomplete.unitOfMeasure = "#Work Order";

            
            setFieldValue('dataCircleWorkOrderPM_complete', dataCircleWorkOrderPM_complete);
            setFieldValue('dataCircleWorkOrderPM_delay', dataCircleWorkOrderPM_delay);
            setFieldValue('dataCircleWorkOrderPM_uncomplete', dataCircleWorkOrderPM_uncomplete);
        })
        
    }, [values.pmt_plan_id, values.district_id, values.node_id])

    return (
        <>
            {/* {!loggedIn ? <Redirect to="/" /> : null} */}

            <div id={changeTheam() === true ? "" : "blackground-white"} style={changeTheam() === true ? { backgroundImage: `url(${BgGreen})`, width: "100vw", height: "160vh" } : {height: "160vh"}}>
                <div className="bootstrap-wrapper">
                    <div className="container" style={{ marginTop: "70px" }}>
                        {/* Section Title */}
                        <h4 className="head-title no-margin">ภาพรวมการทำวาระ</h4>

                        {/* Columns have horizontal padding to create the gutters between individual columns, however, you can remove the margin from rows and padding from columns with .no-gutters on the .row. */}
                        <div className="row_bootstrap no-gutters">

                            {/* AdjustmentBar */}
                            <div className="col-2"
                                // style={{ border: "1px red solid" }}
                            >
                                <AdjustmentBarComponent />
                            </div>


                            {/* Make another col,row pair since 10 cant be divided by 3equally ; and col-auto/col with automatic width doesn't work!!*/}
                            <div className="col-10">
                                <div className="row_bootstrap no-gutters">

                                    {/* Top5 */}
                                    <div className="col-4"
                                        // style={{ border: "1px red solid" }}
                                    >
                                        {console.log("dataCircleWorkOrderPM_complete", values.dataCircleWorkOrderPM_complete)}
                                        <Top5Component
                                            title="5 อันดับแรกที่ดำเนินตามวาระได้เสร็จสมบูรณ์"
                                            dataDonut={values.dataCircleWorkOrderPM_complete}
                                            // data={randomDonutChartBinaryData()}
                                        />
                                    </div>
                                    {/* Top5 */}
                                    <div className="col-4"
                                    // style={{ border: "1px red solid" }}
                                    >
                                        <Top5Component
                                            title="5 อันดับแรกที่ทำตามวาระได้ดำเนินการไม่ตรงตามวาระ"
                                            dataDonut={values.dataCircleWorkOrderPM_delay}
                                        />
                                    </div>

                                    {/* Top5 */}
                                    <div className="col-4"
                                    // style={{ border: "1px red solid" }}
                                    >
                                        <Top5Component
                                            title="5 อันดับแรกที่ไม่ดำเนินการทำวาระ"
                                            dataDonut={values.dataCircleWorkOrderPM_uncomplete}
                                        />
                                    </div>

                                    
                                </div>
                            </div>

                        </div>

                        {/* PM ColorMap */}
                        <div className="row_bootstrap no-gutters">

                            {/* Top5 */}
                            <div className="col-auto"
                                // style={{ border: "1px red solid" }}
                            >
                                <ColorMapDateComponent 
                                    title="สถิติการทำวาระของแต่ละตอน"
                                    data={randomColorMapData()}
                                    chartSettings={{
                                        height: 950,
                                        marginBottom: 30,
                                        marginLeft: 50,
                                        marginRight: 20,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

let _data = []
_data.push("")
_data.groupsComplete = "";
_data.totalUnitOfMeasure = "เดือน";
_data.unitOfMeasure = "";
const EnhancedAlsPreventiveMaintenanaceComponent = withFormik({
    mapPropsToValues: () => ({
        year: 2563,
        pmt_plan_id: 'ทั้งหมด',
        district_id: 'ทั้งหมด',
        node_id: 'ทั้งหมด',
        dataCircleWorkOrderPM_complete: _data,
        dataCircleWorkOrderPM_delay: _data,
        dataCircleWorkOrderPM_uncomplete: _data,
    })
})(AlsPreventiveMaintenanaceComponent);


export default EnhancedAlsPreventiveMaintenanaceComponent;
