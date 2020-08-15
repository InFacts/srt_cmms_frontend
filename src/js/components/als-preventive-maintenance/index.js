import React, { useState, useEffect } from 'react';
import { useFormik, withFormik, useFormikContext } from 'formik';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
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
    const factNodes = useSelector((state) => ({ ...state.api.fact.nodes }), shallowEqual);
    const node_abbreviation = {
        "ธนบุรี":	"ธบ.",
        "ตลิ่งชัน":	"ตช.",
        "นครปฐม":	"คฐ.",
        "กาญจนบุรี":	"กญ.",
        "บ้านโป่ง":	"โป.",
        "กรุงเทพ":	"กท.",
        "จิตรลดา":	"จล.",
        "บางซื่อ":	"บซ.",
        "อยุธยา":	"อย.",
        "บ้านภาชี":	"ภช.",
        "บ้านหมอ":	"มอ.",
        "ลพบุรี":	"ลบ.",
        "มักกะสัน":	"มส.",
        "รังสิต":	"รต.",
        "แก่งคอย":	"กค.",
        "ปากช่อง":	"ปช.",
        "นครราชสีมา":	"รส.",
        "จิระที่ราชสีมา":	"จร.",
        "จิระที่ลำปลายมาศ":	"ลำ.",
        "ลำชี":	"ลช.",
        "ตอนลำชีที่อุบลราชธานี":	"อน.",
        "ลำนารายณ์":	"ลา.",
        "ลำนารายณ์ที่จตุรัส":	"จต.",
        "ลำนารายณ์ที่บัวใหญ่":	"วญ.",
        "ขอนแก่น":	"ขอ.",
        "ขอนแก่นที่อุดรธานี":	"รด.",
        "ขอนแก่นที่หนองคาย":	"นค.",
        "ช่องแค":	"ชค.",
        "นครสวรรค์":	"นว.",
        "นครสวรรค์ที่ตะพานหิน":	"ตห.",
        "พิษณุโลก":	"พล.",
        "พิษณุโลกที่บ้านดารา":	"ดร.",
        "ลำปาง":	"ลป.",
        "ลำปางที่บ้านปิน":	"บป.",
        "ลำปางที่เชียงใหม่":	"ชม.",
        "ศิลาอาสน์":	"ศล.",
        "ศิลาอาสน์ที่เด่นชัย":	"ดช.",
        "เพชรบุรี":	"พบ.",
        "หัวหินที่ประจวบฯ":	"จข.",
        "ชุมพรที่บางสะพานใหญ่":	"พญ.",
        "ชุมพร":	"ชพ.",
        "ทุ่งสง":	"ทส.1",
        "ทุ่งสงที่สุราษฏร์ธานี":	"ทส.2",
        "สุราษฏร์ธานี":	"ชพ.",
        "สุราษฏร์ธานีที่หลังสวน":	"รท.",
        "สุราษฏร์ธานีที่ท่าชนะ":	"งส.",
        "เขาชุมทองที่ทุ่งสง":	"นะ.",
        "หาดใหญ่":	"หใ.",
        "หาดใหญ่ที่พัทลุง":	"พท.",
        "รือเสาะที่ยะลา":	"ยล.",
        "ยะลาที่สุไหงโกลก":	"โล.",
        "ฉะเชิงเทรา":	"ฉท.",
        "ปราจีนบุรี":	"ปจ.",
        "ปราจีนบุรีที่อรัญประเทศ":	"อร.",
        "องครักษ์":	"อษ.",
        "องครักษ์ที่คลองสืเก้า":	"สเ.",
        "ศรีราชาที่ชลบุรี":	"ชบ.",
        "ศรีราชา":	"ศช.",
        "พลูตาหลวงที่บางละมุง":	"มุ",
        "พลูตาหลวง":	"พต.",
        "หัวหิน":	"หห.",
        "สุราษฏร์ธานีที่ชุมพร":	"ชท."
    }

    // Initializer: Change Toolbar to Mode None
    useToolbarChangeModeInitializer(TOOLBAR_MODE.NONE_HOME); // TODO: Needs to find where to go when we press "HOME"!!
    useTokenInitializer();
    useFactInitializer();
    useEffect(() => {
        dispatch(footerToModeInvisible());
    }, []);

    function getWeek( d ) { 
        // Create a copy of this date object  
        var target  = new Date(d.valueOf());  
        
        // ISO week date weeks start on monday  
        // so correct the day number  
        var dayNr   = (d.getDay() + 6) % 7;  
        
        // Set the target to the thursday of this week so the  
        // target date is in the right year  
        target.setDate(target.getDate() - dayNr + 3);  
        
        // ISO 8601 states that week 1 is the week  
        // with january 4th in it  
        var jan4    = new Date(target.getFullYear(), 0, 4);  
        
        // Number of days between target date and january 4th  
        var dayDiff = (target - jan4) / 86400000;    
        
        // Calculate week number: Week 1 (january 4th) plus the    
        // number of weeks between target date and january 4th    
        var weekNr = 1 + Math.ceil(dayDiff / 7);    
        
        return weekNr;    
    }

    const mapOrder = (array, order, key) => new Promise((resolve, reject) => {
        let _array = array.concat(); 
        let _order = order.concat(); 
        for (let i=0; i<_array.length - 1; i++) {
            if(_array[i] > _array[i+1])
                // # Swap the elements
                var _curr_value = _array[i];
                var _next_value = _array[i+1];
                _array[i]= _next_value;
                _array[i+1] = _curr_value;

                var _curr_order = _order[i];
                var _next_order = _order[i+1];
                _order[i]= _next_order;
                _order[i+1] = _curr_order;
        }
        let output = {_array, _order}
        resolve(output);
    });

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
        let countTopNode_complete = [];
        let countTopNode_delay = [];
        let countTopNode_uncomplete = [];
        let begin_document_date = (nowYear-1).toString() + "-01-01";
        let end_document_date = (nowYear).toString() + "-12-31";

        ALSGetDocumentPMTPlan(begin_document_date, end_document_date).then((data) => {
            // Color Map
            let _list_node_id = [];
            let _list_node_name = [];
            factNodes.items.map(function ({ node_id, name, district_id }) {
                if (values.district_id == district_id) { 
                    _list_node_name.push({"node_name": node_abbreviation[name]}); 
                    _list_node_id.push(node_id);
                }
                else if (values.district_id === "ทั้งหมด") {
                    _list_node_name.push({"node_name": node_abbreviation[name]}) //node_abbreviation[name]
                    _list_node_id.push(node_id);
                }
            })

            
            let xLabels = []
            let _data = [];
            for (let d=new Date(2019, 0, 1); d<new Date(2019, 12, 1); d.setDate(d.getDate() + 7)) {
                xLabels.push(new Date(d));
                _data.push(0);
            }
            // let _data = new Array(xLabels.length).fill(0);
            let _list_do_plan_uncomplete = [];
            let yLabels = [];
            for (let i=0; i<_list_node_name.length; i++) {
                yLabels.push(`${_list_node_name[i].node_name}`);
                let _data_copy = _data.concat(); 
                _list_do_plan_uncomplete.push(_data_copy);
                countTopNode_complete.push(0);
                countTopNode_delay.push(0);
                countTopNode_uncomplete.push(0);
            }

            let data_pmt_plan = data.results;
            data_pmt_plan.map((item) => { 
                let pmt_plan_createon = new Date(item.created_on);
                let pmt_plan_doc_date = new Date(item.document_date);
                // To calculate the time difference of two dates 
                let Difference_In_Time = pmt_plan_doc_date.getTime() - pmt_plan_createon.getTime()

                // To calculate the no. of days between two dates 
                var Difference_In_Week = Difference_In_Time / (1000 * 3600 * 24 * 7);
                let _createDateWorkOrderPM = new Date(item.created_on);
                let n_week = getWeek(_createDateWorkOrderPM);
                // ------------------------------------------
                //            |   In Time   |   Out Time   |
                // ------------------------------------------
                // Complete   |     60      |              |
                // Uncomplete |             |      30      |
                // Delay      |             |      10      |
                // ------------------------------------------
                // Note: Work Order PM - TODO
                let _index = _list_node_id.indexOf(item.node_id);
                if (Difference_In_Week > 4) {  //Out Time
                    if (item.document_status_en === DOCUMENT_STATUS.DRAFT || item.document_status_en === DOCUMENT_STATUS.WAIT_APPROVE) {
                        _countOrderPM_uncomplete++;
                        for (let i = n_week; i < n_week+4; i++) {
                            if (_index !== -1 && item.node_id === 1) {
                                _list_do_plan_uncomplete[_index][i]++;
                                countTopNode_uncomplete[_index]++;
                            }
                        }
                    }
                    else { 
                        countTopNode_delay[_index]++;
                        _countOrderPM_delay++;
                    } // APPROVE_DONE
                }
                else {  // In Time
                    if (item.document_status_en === DOCUMENT_STATUS.APPROVE_DONE ) {
                        _countOrderPM_complete++;
                        countTopNode_complete[_index]++;
                    }
                    else {  _countOrderPM_todo++; } // DRAFT, WAIT_APPROVE
                }
            })

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
            dataCircleWorkOrderPM_delay.totalUnitOfMeasure = "ทั้งหมด";
            dataCircleWorkOrderPM_delay.unitOfMeasure = "#Work Order";

            // groupsUncomplete
            dataCircleWorkOrderPM_uncomplete.push({key: groupsUncomplete[0], value: _countOrderPM_uncomplete});
            dataCircleWorkOrderPM_uncomplete.push({key: groupsUncomplete[1], value: total_task});
            dataCircleWorkOrderPM_uncomplete.groupsComplete = groupsComplete[0];
            dataCircleWorkOrderPM_uncomplete.totalUnitOfMeasure = "ทั้งหมด";
            dataCircleWorkOrderPM_uncomplete.unitOfMeasure = "#Work Order";
            
            setFieldValue('dataCircleWorkOrderPM_complete', dataCircleWorkOrderPM_complete);
            setFieldValue('dataCircleWorkOrderPM_delay', dataCircleWorkOrderPM_delay);
            setFieldValue('dataCircleWorkOrderPM_uncomplete', dataCircleWorkOrderPM_uncomplete);
            setFieldValue('list_node_id', _list_node_id);
            
            // Color Map
            let values_data = [];
            let _dataBarGraphComplete = [];
            let _dataBarGraphDelay = [];
            let _dataBarGraphUncomplete = [];
    
            mapOrder(countTopNode_uncomplete, _list_node_name, 'node_name').then((output) => {
                if (output._order[output._array.length-1] !== undefined && output._order.length !== 0) {
                    console.log("output._array.length", output._array.length)
                    let max_node = output._array.length;
                    if (max_node > 5) {max_node = 5}
                    for (let i=1; i<=max_node; i++) {
                        _dataBarGraphUncomplete.push({key: output._order[output._array.length-i]['node_name'], value: output._array[output._array.length-i]});
                    }
                    // _dataBarGraphUncomplete.push({key: output._order[output._array.length-1]['node_name'], value: output._array[output._array.length-1]});
                    // _dataBarGraphUncomplete.push({key: output._order[output._array.length-2]['node_name'], value: output._array[output._array.length-2]});
                    // _dataBarGraphUncomplete.push({key: output._order[output._array.length-3]['node_name'], value: output._array[output._array.length-3]});
                    // _dataBarGraphUncomplete.push({key: output._order[output._array.length-4]['node_name'], value: output._array[output._array.length-4]});
                    // _dataBarGraphUncomplete.push({key: output._order[output._array.length-5]['node_name'], value: output._array[output._array.length-5]});
                    setFieldValue('dataBarGraphUncomplete', _dataBarGraphUncomplete); 
                }  
            });

            mapOrder(countTopNode_complete, _list_node_name, 'node_name').then((output) => {
                if (output._order[output._array.length-1] !== undefined && output._order.length !== 0) {
                    let max_node = output._array.length;
                    if (max_node > 5) {max_node = 5}
                    for (let i=1; i<=max_node; i++) {
                        _dataBarGraphComplete.push({key: output._order[output._array.length-i]['node_name'], value: output._array[output._array.length-i]});
                    }
                    // _dataBarGraphComplete.push({key: output._order[output._array.length-1]['node_name'], value: output._array[output._array.length-1]});
                    // _dataBarGraphComplete.push({key: output._order[output._array.length-2]['node_name'], value: output._array[output._array.length-2]});
                    // _dataBarGraphComplete.push({key: output._order[output._array.length-3]['node_name'], value: output._array[output._array.length-3]});
                    // _dataBarGraphComplete.push({key: output._order[output._array.length-4]['node_name'], value: output._array[output._array.length-4]});
                    // _dataBarGraphComplete.push({key: output._order[output._array.length-5]['node_name'], value: output._array[output._array.length-5]});
                    setFieldValue('dataBarGraphComplete', _dataBarGraphComplete); 
                }  
            });

            mapOrder(countTopNode_delay, _list_node_name, 'node_name').then((output) => {
                if (output._order[output._array.length-1] !== undefined && output._order.length !== 0) {
                    let max_node = output._array.length;
                    if (max_node > 5) {max_node = 5}
                    for (let i=1; i<=max_node; i++) {
                        _dataBarGraphDelay.push({key: output._order[output._array.length-i]['node_name'], value: output._array[output._array.length-i]});
                    }
                    // _dataBarGraphDelay.push({key: output._order[output._array.length-1]['node_name'], value: output._array[output._array.length-1]});
                    // _dataBarGraphDelay.push({key: output._order[output._array.length-2]['node_name'], value: output._array[output._array.length-2]});
                    // _dataBarGraphDelay.push({key: output._order[output._array.length-3]['node_name'], value: output._array[output._array.length-3]});
                    // _dataBarGraphDelay.push({key: output._order[output._array.length-4]['node_name'], value: output._array[output._array.length-4]});
                    // _dataBarGraphDelay.push({key: output._order[output._array.length-5]['node_name'], value: output._array[output._array.length-5]});
                    setFieldValue('dataBarGraphDelay', _dataBarGraphDelay);  
                }  
            });
            
            for (let i=0; i<yLabels.length; i++ ){ // ตอน
                let _tempRow = [];
                // let lax = (Math.random() > 0.4) ? true : false;
                for (let j=0; j<xLabels.length; j++){ // 52 week
                    // let value = Math.floor((Math.random()+Math.random()+Math.random())/3*10);
                    let value = _list_do_plan_uncomplete[i][j];
                    // value = lax ? Math.max(0, value-2.5) : Math.min( 10, value+ 2.5)
                    _tempRow.push(value);
                }
                values_data.push(_tempRow)
            }
            setFieldValue('do_plan_color_map', {values_data, xLabels, yLabels});
        })
        
    }, [values.pmt_plan_id, values.district_id, values.node_id, factNodes.items])

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
                                            dataBarGraph={values.dataBarGraphComplete}
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
                                            dataBarGraph={values.dataBarGraphDelay}
                                        />
                                    </div>

                                    {/* Top5 */}
                                    <div className="col-4"
                                    // style={{ border: "1px red solid" }}
                                    >
                                        <Top5Component
                                            title="5 อันดับแรกที่ไม่ดำเนินการทำวาระ"
                                            dataDonut={values.dataCircleWorkOrderPM_uncomplete}
                                            dataBarGraph={values.dataBarGraphUncomplete}
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
                                    // data={randomColorMapData()}
                                    // size_per_rect = 15.8
                                    chartSettings={{
                                        height: 950,
                                        marginBottom: 30,
                                        marginLeft: 50,
                                        marginRight: 20,
                                    }}
                                    data={values.do_plan_color_map.xLabels.length !== 0 ? values.do_plan_color_map:randomColorMapData()}
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
        list_node_id: [],
        dataCircleWorkOrderPM_complete: _data,
        dataCircleWorkOrderPM_delay: _data,
        dataCircleWorkOrderPM_uncomplete: _data,
        do_plan_color_map: {values_data:[], xLabels:[], yLabels:[]},
        dataBarGraphComplete: [],
        dataBarGraphDelay: [],
        dataBarGraphUncomplete: [],
    })
})(AlsPreventiveMaintenanaceComponent);


export default EnhancedAlsPreventiveMaintenanaceComponent;
