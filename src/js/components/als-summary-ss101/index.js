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
// import {randomGroupedBarGraphData , randomGroupedBarGraphDataMTBF, randomColorMapData,randomPieChartData, randomPieChartDataSystemType} from './mockup-data';

import BgGreen from '../../../images/als/bg_als.jpg';
import { ALSGetDocumentSS101, changeTheam, FilterByAdjustmentBarSS101 } from '../../helper.js'
const AlsEquipmentStatusComponent = () => {
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
        let begin_document_date = (values.year-543-1).toString() + "-01-01";
        let end_document_date = (values.year-543).toString() + "-12-31";
        let groups = ["ระบบอาณัติสัญญาณ", "ระบบสายส่ง", "ระบบทางผ่านเครื่องกั้นถนน", "ระบบเครื่องทางสะดวก", "ระบบโทรศัพท์", "ระบบไฟฟ้า", "ระบบโทรพิมพ์", "ระบบวิทยุ", "ระบบอิเล็กทรอนิกส์"]; 
        let count_groups = new Array(9).fill(0)
        let count_loss_ss101_now = new Array(12).fill(0)
        let count_loss_ss101_prev = new Array(12).fill(0)

        let count_accident_now = new Array(12).fill(0)
        let count_accident_prev = new Array(12).fill(0)
        let count_color_map = new Array(16).fill(0).map(() => new Array(12).fill(0));
        let count_interrupt = new Array(12).fill(0);
        let results = []
        let results_pieInterrupt = []

        // ColorMap
        let xLabels = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
        let yLabels = ["สสญ.ธบ.", "สสญ.อย.", "สสญ.ก.", "สญก.", "สญค.", "สญพ.", "สสญ.กค.", "สสญ.ลช.", "สสญ.ขอ.", "สสญ.นว.","สสญ.ลป.", "สสญ.หห.", "สสญ.ทส.", "สสญ.หใ.", "สสญ.ฉท.","สสญ.ศช."];
        
        let groups_interrupt = ["รอเครื่องมือและอะไหล่", "ธรรมชาติไม่เอื้ออำนวย", "รอเวลาในการซ่อมแก้ไข", "พนักงานไม่เพียงพอ", "พาหนะไม่มี", "ระยะทางไกล", "สาเหตุอื่นๆ", "ไม่มี"];

        ALSGetDocumentSS101(begin_document_date, end_document_date).then((data) => {
            let data_ss101 = data.results;
            data_ss101.map((item) => { 
                let d = new Date(item.document.document_date);
                if (FilterByAdjustmentBarSS101(item, values)) {
                    // https://stackoverflow.com/questions/1968167/difference-between-dates-in-javascript
                    let a = new Date(item.specific.accident_on);
                    let b = new Date(item.specific.finished_on);
                    let hour = parseInt((b-a)/1000/60/60);
                    if (d.getFullYear() === values.year-543) {
                        count_color_map[item.specific.district.district_id-1][d.getMonth()-1]++;
                        count_groups[item.specific.system_type.system_type_group_id]++;
                        item.specific.loss_line_item.map((sub_data) => {
                            count_loss_ss101_now[d.getMonth()-1] = count_loss_ss101_now[d.getMonth()-1] + sub_data.price;
                        })
                        count_accident_now[d.getMonth()-1] = count_accident_now[d.getMonth()-1] + hour;
                        count_interrupt[item.specific.interrupt_id-1]++;
                    }
                    else {
                        item.specific.loss_line_item.map((sub_data) => {
                            count_loss_ss101_prev[d.getMonth()-1] = count_loss_ss101_prev[d.getMonth()-1] + sub_data.price;
                        })
                        count_accident_prev[d.getMonth()-1] = count_accident_prev[d.getMonth()-1] + hour;
                    }
                }
            })
            // PieChartDataSystemType
            for (let i = 0; i < groups_interrupt.length; i++) {
                results_pieInterrupt.push({key: groups_interrupt[i], value: count_interrupt[i]});
            }

            for (let i = 0; i < groups.length; i++) {
                results.push({key: groups[i], value: count_groups[i]});
            }

            setFieldValue('maintenance_system', results);
            setFieldValue('interrupt', results_pieInterrupt);
            setFieldValue('accident_color_map', {values_data: count_color_map, xLabels, yLabels});

            let results_loss = [];
            let results_accident = [];
            let now_year = values.year
            let prev_year = values.year - 1
            results_loss.columns = [prev_year, now_year];
            results_loss.yAxis = "ค่าใช้จ่ายในการขัดข้อง (บาท)"
            results_loss.xAxis = "เดือน"

            results_accident.columns = [prev_year, now_year];
            results_accident.yAxis = "ระยะเวลาขัดข้อง (ชั่วโมง)";
            results_accident.xAxis = "เดือน";
    
            let xGroups = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];

            for (let i = 0; i < xGroups.length; i++) {
                results_loss.push({
                    [results_loss.xAxis]: xGroups[i],
                    [results_loss.columns[0]]: count_loss_ss101_prev[i],
                    [results_loss.columns[1]]: count_loss_ss101_now[i],
                });

                results_accident.push({
                    [results_accident.xAxis]: xGroups[i],
                    [results_accident.columns[0]]: count_accident_prev[i],
                    [results_accident.columns[1]]: count_accident_now[i],
                });
            }
            
            let results_groups_interrupt = [];
            for (let i = 0; i < groups_interrupt.length; i++) {
                results_groups_interrupt.push({key: groups_interrupt[i], value: count_interrupt[i]});
            }
            setFieldValue('loss_ss101', results_loss);
            setFieldValue('accident_ss101', results_accident);
        })
    }, [values.year, values.district_id, values.node_id]);

    return (
        <>
            {!loggedIn ? <Redirect to="/" /> : null}
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
                                        data={values.maintenance_system}
                                        // data={randomPieChartDataSystemType()}
                                    />
                                </div>

                                </div>

                                <div className="row_bootstrap no-gutters">
                                    <div className="col-12"
                                        // style={{ border: "1px purple solid" }}
                                    >
                                        <GroupedBarGraph
                                            title="สถิติค่าใช้จ่ายในการซ่อมบำรุงเทียบแต่ละเดือน"
                                            data={values.loss_ss101}
                                            // data={randomGroupedBarGraphData()}
                                        />
                                    </div>

                                </div>

                                <div className="row_bootstrap no-gutters">
                                    <div className="col-12"
                                        // style={{ border: "1px purple solid" }}
                                    >   
                                        <PieChart 
                                            title="สถิติการซ่อมบำรุงในแต่ละหมวด"
                                            data={values.interrupt}
                                            // data={randomPieChartData()}
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
                                            title="สถิติจำนวนครั้งการขัดข้องของแขวงเทียบแต่ละเดือน"
                                            data={values.accident_color_map }
                                            // data={randomColorMapData()}
                                        />
                                    </div>

                                </div>

                                {/* ระยะเวลาเฉลี่ยก่อนการเสียหายแต่ละครั้ง - MTBF */}
                                <div className="row_bootstrap no-gutters">
                                    <div className="col-12"
                                        // style={{ border: "1px purple solid" }}
                                    >
                                        <GroupedBarGraph
                                            title="ระยะเวลาขัดข้องแต่ละครั้งเทียบแต่ละเดือน"
                                            data={values.accident_ss101 }
                                            // data={randomGroupedBarGraphDataMTBF()}
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
let _loss_ss101 = []
_loss_ss101.columns = [];
_loss_ss101.yAxis = "";
_loss_ss101.xAxis = "เดือน";
const EnhancedAlsEquipmentStatusComponent = withFormik({
    
    mapPropsToValues: () => ({
        year: 2563,
        fix_type: '',
        district_id: 'ทั้งหมด',
        node_id: 'ทั้งหมด',
        interrupt: [],
        maintenance_system: [],
        accident_color_map: {values_data: [], xLabels: [], yLabels: []},
        loss_ss101: _loss_ss101,
        accident_ss101: _loss_ss101,
    })
})(AlsEquipmentStatusComponent);


export default EnhancedAlsEquipmentStatusComponent;
