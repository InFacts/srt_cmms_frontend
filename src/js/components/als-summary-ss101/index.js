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
import { ExportCSV, ExportCSVRealJournal } from '../common/exportCSVForSS101';
import { FACTS } from '../../redux/modules/api/fact';

const AlsEquipmentStatusComponent = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.token.isLoggedIn);
    const { values, setFieldValue } = useFormikContext();
    const factNodes = useSelector((state) => ({ ...state.api.fact.nodes }), shallowEqual);
    const factStations = useSelector((state) => ({ ...state.api.fact.stations }), shallowEqual);
    const factXCross = useSelector((state) => ({ ...state.api.fact[FACTS.X_CROSS] }), shallowEqual);
    const factDocByPass = useSelector((state) => ({ ...state.api.fact[FACTS.SS101_DOC_BYPASS] }), shallowEqual);
    const factXType = useSelector((state) => ({ ...state.api.fact[FACTS.SS101_X_TYPE] }), shallowEqual);

    // Initializer: Change Toolbar to Mode None
    useToolbarChangeModeInitializer(TOOLBAR_MODE.NONE_HOME); // TODO: Needs to find where to go when we press "HOME"!!
    useTokenInitializer();
    useFactInitializer();
    useEffect(() => {
        dispatch(footerToModeInvisible());
    }, []);

    useEffect(() => {
        let begin_document_date = (values.year - 543 - 1).toString() + "-01-01";
        let end_document_date = (values.year - 543).toString() + "-12-31";
        let groups = ["ระบบอาณัติสัญญาณ", "ระบบสายส่ง", "ระบบเครื่องกั้นถนน", "ระบบเครื่องทางสะดวก", "ระบบโทรศัพท์", "ระบบไฟฟ้า", "ระบบโทรพิมพ์", "ระบบวิทยุ", "ระบบอิเล็กทรอนิกส์"];
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
        let yLabels = ["สสญ.ธบ.", "สสญ.อย.", "สสญ.ก.", "สญก.", "สญค.", "สญพ.", "สสญ.กค.", "สสญ.ลช.", "สสญ.ขอ.", "สสญ.นว.", "สสญ.ลป.", "สสญ.หห.", "สสญ.ทส.", "สสญ.หใ.", "สสญ.ฉท.", "สสญ.ศช."];

        let groups_interrupt = ["รอเครื่องมือและอะไหล่", "ธรรมชาติไม่เอื้ออำนวย", "รอเวลาในการซ่อมแก้ไข", "พนักงานไม่เพียงพอ", "พาหนะไม่มี", "ระยะทางไกล", "สาเหตุอื่นๆ", "ไม่มี"];

        let groups_hardware_type = [
            "1.เสาอุปกรณ์และระบบแสดงสัญญาณ",
            "1.สัญญาณ-ระบบไฟตอนทาง",
            "1.อุปกรณ์และระบบควบคุมบังคับของระบบอาณัติสัญญาณ",
            "1.แหล่งจ่ายไฟในระบบ",
            "1.ตู้และอุปกรณ์",
            "1.สายเคเบิลและจุดต่อสาย",
            "1.ไฟแสดงและแผงบรรยายทาง",
            "1.อุปกรณ์และระบบควบคุมบังคับของระบบประแจ",
            "1.ระบบตรวจสอบท่า",
            "1.ระบบจ่ายไฟวงจรประแจ",
            "1.อุปกรณ์ชุดล็อกปลายลิ้นประแจ",
            "1.อุปกรณ์ชุดตกราง",


            "2.สายโถงหรือสายส่งสัญญาณ",
            "2.เสาโทรเลข",
            "2.ไม้คอน",
            "2.ลูกถ้วย",


            "3.ระบบไฟแสงสว่าง",
            "3.ระบบจ่ายไฟเครื่องกันถนนฯ",
            "3.ระบบไฟตอน เครื่องนับล้อ",
            "3.เสาและระบบสัญญาณเตือน",
            "3.ระบบการควบคุมบังคับ",
            "3.ตู้อุปกรณ์ สายเคเบิลและจุดต่อสาย",
            "3.แท่นและคานหรือชุดกั้น",
            "3.มอเตอร์ชำรุด",

            "4.สายโถงหรือสายส่งสัญญาณ",
            "4.ชุดกันฟ้าและฟิวส์",
            "4.อุปกรณ์และเครื่องทางสะดวก",
            "4.รีเลย์และชุดจ่ายไฟ",


            "5.โทรศัพท์ควบคุมระบบและอุปกรณ",
            "5.โทรศัพท์ควบคุมชุดจ่ายไฟ",
            "5.โทรศัพท์พื้นฐาน, ระบบชุมสายและอุปกรณ",

            "6.แหล่งจ่ายจากการไฟฟ้า",
            "6.แหล่งจ่ายจากเครื่องกำเนิดไฟฟ้าสำรอง",
            "6.ระบบตรวจสอบและป้องกัน",
            "6.อุปกรณ์และระบบในตู้จ่ายไฟระบบ",
            "6.ระบบไฟอาคารและชานชลา",

            "8.ระบบวิทยุสถานีและอุปกรณ์ร่วม",
            "8.ชุดจ่ายไฟระบบวิทยุ",   
            
            "9.อินเตอร์คอม, โทรศัพท์เครื่องกั้น",
            "9.กล้องวงจรปิด (CCTV) สถานีหรือขบวนรถไฟ",
            "9.ชุดเครื่องขยายเสียงสถานี",
        ];

        let groups_time_hardware_type = [
            "1.ระยะเวลาขัดข้องเสาอุปกรณ์และระบบแสดงสัญญาณ",
            "1.ระยะเวลาขัดข้องสัญญาณ-ระบบไฟตอนทาง",
            "1.ระยะเวลาขัดข้องอุปกรณ์และระบบควบคุมบังคับของระบบอาณัติสัญญาณ",
            "1.ระยะเวลาขัดข้องแหล่งจ่ายไฟในระบบ",
            "1.ระยะเวลาขัดข้องตู้และอุปกรณ์",
            "1.ระยะเวลาขัดข้องสายเคเบิลและจุดต่อสาย",
            "1.ระยะเวลาขัดข้องไฟแสดงและแผงบรรยายทาง",
            "1.ระยะเวลาขัดข้องอุปกรณ์และระบบควบคุมบังคับของระบบประแจ",
            "1.ระยะเวลาขัดข้องระบบตรวจสอบท่า",
            "1.ระยะเวลาขัดข้องระบบจ่ายไฟวงจรประแจ",
            "1.ระยะเวลาขัดข้องอุปกรณ์ชุดล็อกปลายลิ้นประแจ",
            "1.ระยะเวลาขัดข้องอุปกรณ์ชุดตกราง",
            "2.ระยะเวลาขัดข้องสายโถงหรือสายส่งสัญญาณ",
            "2.ระยะเวลาขัดข้องเสาโทรเลข",
            "2.ระยะเวลาขัดข้องไม้คอน",
            "2.ระยะเวลาขัดข้องลูกถ้วย",
            "3.ระยะเวลาขัดข้องระบบไฟแสงสว่าง",
            "3.ระยะเวลาขัดข้องระบบจ่ายไฟเครื่องกันถนนฯ",
            "3.ระยะเวลาขัดข้องระบบไฟตอน เครื่องนับล้อ",
            "3.ระยะเวลาขัดข้องเสาและระบบสัญญาณเตือน",
            "3.ระยะเวลาขัดข้องระบบการควบคุมบังคับ",
            "3.ระยะเวลาขัดข้องตู้อุปกรณ์ สายเคเบิลและจุดต่อสาย",
            "3.ระยะเวลาขัดข้องแท่นและคานหรือชุดกั้น",
            "3.ระยะเวลาขัดข้องมอเตอร์ชำรุด",
            "4.ระยะเวลาขัดข้องสายโถงหรือสายส่งสัญญาณ",
            "4.ระยะเวลาขัดข้องชุดกันฟ้าและฟิวส์",
            "4.ระยะเวลาขัดข้องอุปกรณ์และเครื่องทางสะดวก",
            "4.ระยะเวลาขัดข้องรีเลย์และชุดจ่ายไฟ",
            "5.ระยะเวลาขัดข้องโทรศัพท์ควบคุมระบบและอุปกรณ",
            "5.ระยะเวลาขัดข้องโทรศัพท์ควบคุมชุดจ่ายไฟ",
            "5.ระยะเวลาขัดข้องโทรศัพท์พื้นฐาน, ระบบชุมสายและอุปกรณ",
            "6.ระยะเวลาขัดข้องแหล่งจ่ายจากการไฟฟ้า",
            "6.ระยะเวลาขัดข้องแหล่งจ่ายจากเครื่องกำเนิดไฟฟ้าสำรอง",
            "6.ระยะเวลาขัดข้องระบบตรวจสอบและป้องกัน",
            "6.ระยะเวลาขัดข้องอุปกรณ์และระบบในตู้จ่ายไฟระบบ",
            "6.ระยะเวลาขัดข้องระบบไฟอาคารและชานชลา",
            "8.ระยะเวลาขัดข้องระบบวิทยุสถานีและอุปกรณ์ร่วม",
            "8.ระยะเวลาขัดข้องชุดจ่ายไฟระบบวิทยุ",   
            "9.ระยะเวลาขัดข้องอินเตอร์คอม, โทรศัพท์เครื่องกั้น",
            "9.ระยะเวลาขัดข้องกล้องวงจรปิด (CCTV) สถานีหรือขบวนรถไฟ",
            "9.ระยะเวลาขัดข้องชุดเครื่องขยายเสียงสถานี",
        ]

        let count_groups_list_hardware_type = new Array(12).fill(0).map(() => {
            return new Array(41).fill(0)
        });
        let count_groups_time_list_hardware_type = new Array(12).fill(0).map(() => {
            return new Array(41).fill(0)
        });

        ALSGetDocumentSS101(begin_document_date, end_document_date).then((data) => {
            let data_ss101 = data.results;
            // console.log("data_ss101", data_ss101)
            let data_ss101_journal = [];
            data_ss101.map((item) => {
                let d = new Date(item.document.document_date);
                if (FilterByAdjustmentBarSS101(item, values)) {
                    // https://stackoverflow.com/questions/1968167/difference-between-dates-in-javascript

                    if (values.systems_group_id === "ทั้งหมด" || values.systems_group_id == item.specific.system_type.system_type_id) {
                        data_ss101_journal.push(item);
                        
                        let a = new Date(item.specific.accident_on);
                        let b = new Date(item.specific.finished_on);
                        let hour = parseInt((b - a) / 1000 / 60 / 60);
                        if (d.getFullYear() === values.year - 543) {
                            // console.log(">>>>>>>>> if", values.year - 543)
                            if (item.specific.district.district_id !== undefined) {
                                count_color_map[item.specific.district.district_id - 1][d.getMonth() - 1]++;
                                count_groups[item.specific.system_type.system_type_group_id]++;

                                item.specific.loss_line_item.map((sub_data) => {
                                    count_loss_ss101_now[d.getMonth() - 1] = count_loss_ss101_now[d.getMonth() - 1] + sub_data.price;
                                })
                                count_accident_now[d.getMonth() - 1] = count_accident_now[d.getMonth() - 1] + hour;
                                count_interrupt[item.specific.interrupt_id - 1]++;

                                // sum hardware tyes and time
                                count_groups_list_hardware_type[d.getMonth() - 1][item.specific.hardware_type_id-1]++;
                                count_groups_time_list_hardware_type[d.getMonth() - 1][item.specific.hardware_type_id-1] = hour++;

                                // console.log("count_groups_list_hardware_type[d.getMonth() - 1][item.specific.hardware_type_id]", item.specific.hardware_type_id, d.getMonth() - 1, ">>>", ">>", count_groups_list_hardware_type[d.getMonth() - 1][item.specific.hardware_type_id])
                            }
                        } else {
                            // console.log(">>>>>> else")
                            item.specific.loss_line_item.map((sub_data) => {
                                count_loss_ss101_prev[d.getMonth() - 1] = count_loss_ss101_prev[d.getMonth() - 1] + sub_data.price;
                            })
                            count_accident_prev[d.getMonth() - 1] = count_accident_prev[d.getMonth() - 1] + hour;
                        }
                    }
                }
            })
            // console.log("count_groups_list_hardware_type", count_groups_list_hardware_type)
            console.log("data_ss101_journal", data_ss101_journal)
            // console.log("factXCross.items", factXCross.items)
            let realJournal = [];
            data_ss101_journal.map((data_ss101_journal_test) => {
                let node = factNodes.items.find(node => `${node.node_id}` === `${data_ss101_journal_test.specific.location_node_id}`);
                if (node) {
                    let subRealJournal = {};
                    subRealJournal.internal_document_id = data_ss101_journal_test.document.internal_document_id;
                    subRealJournal.accident_on = data_ss101_journal_test.specific.accident_on;
                    subRealJournal.finished_on = data_ss101_journal_test.specific.finished_on;
                    subRealJournal.district = data_ss101_journal_test.specific.district.name;
                    subRealJournal.node_id = factNodes.items.length > 0 && factNodes.items.find(node => `${node.node_id}` === `${data_ss101_journal_test.specific.location_node_id}`).name;
                    subRealJournal.station_id = factStations.items.length > 0 && factStations.items.find(station => `${station.station_id}` === `${data_ss101_journal_test.specific.location_station_id}`).name;
                    subRealJournal.remark = data_ss101_journal_test.specific.remark;
                    subRealJournal.service_method_desc = data_ss101_journal_test.specific.service_method_desc;
                    subRealJournal.summary_cause_condition = data_ss101_journal_test.specific.summary_cause_condition;
                    subRealJournal.location_detail = data_ss101_journal_test.specific.location_detail;
                    subRealJournal.system_type = data_ss101_journal_test.specific.system_type.system_type;
                    subRealJournal.total_fail_time = data_ss101_journal_test.specific.total_fail_time;
                    subRealJournal.auditor_name = data_ss101_journal_test.specific.auditor_name;
                    subRealJournal.location_x_cross_id = factXCross.items.length > 0 && factXCross.items.find(x_cross => `${x_cross.x_cross_id}` === `${data_ss101_journal_test.specific.location_x_cross_id}`) ? factXCross.items.find(x_cross => `${x_cross.x_cross_id}` === `${data_ss101_journal_test.specific.location_x_cross_id}`).road_center : "-" ;
                    subRealJournal.doc_bypass_doc_bypass_id = factDocByPass.items.length > 0 && factDocByPass.items.find(doc_by_pass => `${doc_by_pass.doc_bypass_id}` === `${data_ss101_journal_test.specific.doc_bypass_doc_bypass_id}`) ? factDocByPass.items.find(doc_by_pass => `${doc_by_pass.doc_bypass_id}` === `${data_ss101_journal_test.specific.doc_bypass_doc_bypass_id}`).name : "-";
                    subRealJournal.x_type_id = factXType.items.length > 0 && factXType.items.find(x_type => `${x_type.x_type_id}` === `${data_ss101_journal_test.specific.x_type_id}`) ? factXType.items.find(x_type => `${x_type.x_type_id}` === `${data_ss101_journal_test.specific.x_type_id}`).name : "-";

                    realJournal.push(subRealJournal);
                }
            })
            console.log("realJournal", realJournal)

            setFieldValue("realJournal", realJournal, false);

            let count_groups_list_hardware_type_v2 = []
            for (const outer_row of count_groups_list_hardware_type) {

                const row_data = {}
                for (let i = 0; i < 41; i++) {
                    row_data[groups_hardware_type[i]] = outer_row[i]
                }

                count_groups_list_hardware_type_v2.push(row_data)
            }
            // console.log("count_groups_list_hardware_type_v2", count_groups_list_hardware_type_v2)

            let count_groups_time_list_hardware_type_v2 = []
            for (const outer_row of count_groups_time_list_hardware_type) {

                const row_data = {}
                for (let i = 0; i < 41; i++) {
                    row_data[groups_time_hardware_type[i]] = outer_row[i]
                }

                count_groups_time_list_hardware_type_v2.push(row_data)
            }

            let tmpArr1 = [];

            for (let i = 0; i < 12; i++) {

                let tmpObj1 = {}

                // console.log("wow much error", count_groups_list_hardware_type_v2)
                
                for (let j = 0; j < Object.keys(count_groups_list_hardware_type_v2[i]).length; j++) {
                    if (values.systems_group_id === "ทั้งหมด" || !Object.keys(count_groups_list_hardware_type_v2[i])[j].search(values.systems_group_id)
                    || !Object.keys(count_groups_time_list_hardware_type_v2[i])[j].search(values.systems_group_id)) {
                        // console.log("Object.keys(count_groups_list_hardware_type_v2[i])[j]", Object.keys(count_groups_list_hardware_type_v2[i])[j])
                        const firstKey = Object.keys(count_groups_list_hardware_type_v2[i])[j]
                        const secondKey = Object.keys(count_groups_time_list_hardware_type_v2[i])[j]
                        // console.log("count_groups_list_hardware_type_v2[i][firstKey]", count_groups_list_hardware_type_v2[i][firstKey])
    
                        tmpObj1[firstKey] = count_groups_list_hardware_type_v2[i][firstKey]
                        tmpObj1[secondKey] = count_groups_time_list_hardware_type_v2[i][secondKey]   
                    }
                }
                tmpArr1.push(tmpObj1)
            }
            // console.log("tmpArr1", tmpArr1)

            // PieChartDataSystemType
            for (let i = 0; i < groups_interrupt.length; i++) {
                results_pieInterrupt.push({ key: groups_interrupt[i], value: count_interrupt[i] });
            }

            for (let i = 0; i < groups.length; i++) {
                results.push({ key: groups[i], value: count_groups[i] });
            }

            setFieldValue('maintenance_system', results);
            setFieldValue('interrupt', results_pieInterrupt);
            setFieldValue('accident_color_map', { values_data: count_color_map, xLabels, yLabels });

            let results_loss = [];
            let results_accident = [];
            let results_hardware_type = [];
            let now_year = values.year
            let prev_year = values.year - 1
            results_loss.columns = [prev_year, now_year];
            results_loss.yAxis = "ค่าใช้จ่ายในการขัดข้อง (บาท)"
            results_loss.xAxis = "เดือน"

            results_accident.columns = [prev_year, now_year];
            results_accident.yAxis = "ระยะเวลาขัดข้อง (ชั่วโมง)";
            results_accident.xAxis = "เดือน";

            results_hardware_type.columns = [now_year];
            results_hardware_type.yAxis = "ระยะเวลาขัดข้อง (ชั่วโมง)";
            results_hardware_type.xAxis = "เดือน";

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

                results_hardware_type.push({
                    [results_hardware_type.xAxis]: xGroups[i],
                    ...tmpArr1[i]
                });
            }

            // console.log("results_hardware_type", results_hardware_type)

            let results_groups_interrupt = [];
            for (let i = 0; i < groups_interrupt.length; i++) {
                results_groups_interrupt.push({ key: groups_interrupt[i], value: count_interrupt[i] });
            }

            setFieldValue('loss_ss101', results_loss);
            setFieldValue('accident_ss101', results_accident);
            setFieldValue('results_hardware_type', results_hardware_type)
        })
    }, [values.year, values.district_id, values.node_id, values.systems_group_id, factNodes.items, factStations.items, factXCross.items, factDocByPass.items, factXType.items]);

    return (
        <>
            {!loggedIn ? <Redirect to="/" /> : null}
            <div id={changeTheam() === true ? "" : "blackground-white"} style={changeTheam() === true ? { backgroundImage: `url(${BgGreen})`, width: "100vw", height: "120vh" } : { height: "120vh" }}>
                <div className="bootstrap-wrapper">
                    <div className="container" style={{ marginTop: "70px" }}>
                        {/* Section Title */}
                        <h4 className="head-title no-margin">ภาพรวมของสถิติเหตุขัดข้อง/เสียหาย - สส.101
                        <ExportCSV csvData={values.results_hardware_type} fileName="รายงานสถิติ" />
                        <ExportCSVRealJournal csvData={values.realJournal} fileName="data" />
                        </h4>

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
                                                marginTop: 50,
                                                marginBottom: 80,
                                                height: 280,
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
                                            data={values.accident_color_map}
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
                                            data={values.accident_ss101}
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
        systems_group_id: 'ทั้งหมด',
        district_id: 'ทั้งหมด',
        node_id: 'ทั้งหมด',
        interrupt: [],
        maintenance_system: [],
        accident_color_map: { values_data: [], xLabels: [], yLabels: [] },
        loss_ss101: _loss_ss101,
        accident_ss101: _loss_ss101,
    })
})(AlsEquipmentStatusComponent);


export default EnhancedAlsEquipmentStatusComponent;
