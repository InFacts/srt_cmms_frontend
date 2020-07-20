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
import { ALSGetDocumentSS101, changeTheam, FilterByAdjustmentBar } from '../../helper.js'
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
        let begin_document_date = (values.year-543).toString() + "-01-01";
        let end_document_date = (values.year-543).toString() + "-12-31";
        let groups = ["ระบบอาณัติสัญญาณ", "ระบบสายส่ง", "ระบบทางผ่านเครื่องกั้นถนน", "ระบบเครื่องทางสะดวก", 
                    "ระบบโทรศัพท์", "ระบบไฟฟ้า", "ระบบโทรพิมพ์", "ระบบวิทยุ", "ระบบอิเล็กทรอนิกส์"]; 
        let count_groups = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        let count_color_map = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        let results = []
        ALSGetDocumentSS101(begin_document_date, end_document_date).then((data) => {
            let data_ss101 = data.results;
            data_ss101.map((item) => { 
                let d = new Date(item.document.document_date);
                count_color_map[d.getMonth()-1]++;
                count_groups[item.specific.system_type.system_type_group_id]++; 
            })
            // PieChartDataSystemType
            for (let i = 0; i < groups.length; i++) {
                results.push({key: groups[i], value: count_groups[i]});
            }

            // ColorMap
            let xLabels = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
            let yLabels = ["สสญ.ธบ.", "สสญ.อย.", "สสญ.ก.", "สญก.", "สญค.", "สญพ.", "สสญ.กค.", "สสญ.ลช.", "สสญ.ขอ.", "สสญ.นว.","สสญ.ลป.",
                            "สสญ.หห.", "สสญ.ทส.", "สสญ.หใ.", "สสญ.ฉท.","สสญ.ศช."]
            let values_data = [];
            for (let i=0; i<yLabels.length; i++ ){
                let _tempRow = [];
                let lax = (Math.random() > 0.4) ? true : false;
                for (let j=0; j<xLabels.length; j++){
                    let value = count_color_map[j];
                    value = lax ? Math.max(0, value-2.5) : Math.min( 10, value+ 2.5)
                    _tempRow.push(value);
                }
                values_data.push(_tempRow)
            }
            setFieldValue('maintenance_system', results);
            setFieldValue('accident_color_map', {values_data, xLabels, yLabels});
        })
    }, [values.year, values.district_id, values.node_id]);

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
                                        {console.log("values.accident_color_map", values.accident_color_map)}
                                        {console.log("randomColorMapData()", randomColorMapData())}
                                        <ColorMap 
                                            title="สถิติจำนวนครั้งการขัดข้องของแขวงเทียบแต่ละเดือน"
                                            data={values.accident_color_map !== {} ? values.accident_color_map:randomPieChartDataSystemType()}
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
                                            title="ระยะเวลาเฉลี่ยก่อนการเสียหายแต่ละครั้งเทียบแต่ละเดือน - MTBF"
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
        maintenance_system: [],
        accident_color_map: {values: [], xLabels: [], yLabels: []}
    })
})(AlsEquipmentStatusComponent);


export default EnhancedAlsEquipmentStatusComponent;
