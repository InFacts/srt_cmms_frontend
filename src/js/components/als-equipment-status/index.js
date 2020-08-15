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

import GroupedBarGraph from '../common/d3-grouped-bar-graph';
import Histogram from './d3-histogram';
import ThailandMapComponent from './d3-map';
import SimpleGrayCardComponent from './simple-gray-card';
import AdjustmentBarComponent from './adjustment-bar';
import EquipmentStatusListComponent from './equipment-status-list';
import {randomGroupedBarGraphData} from './mockup-data'

import BgGreen from '../../../images/als/bg_als.jpg';
import { changeTheam, FilterByAdjustmentBar, ALSGetDocumentSS101, ITEM_STATUS } from '../../helper.js'
// import mockupEquipmentData from './mockupEquipmentData.json';

const randomHistogramData = () => {
    let results = [];
    results.push(0)
    for (let i = 0; i < 10; i++) {
        // let randomNumber = (Math.random() + Math.random() + Math.random() + Math.random()) / 4 * 100;
        let randomNumber = 78;
        results.push(randomNumber);
    }
    return results;
}

const AlsEquipmentStatusComponent = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.token.isLoggedIn);
    const {values, setFieldValue} = useFormikContext();
    const factEquipment = useSelector((state) => ({ ...state.api.fact.equipment }), shallowEqual);
    const factNodes = useSelector((state) => ({ ...state.api.fact.nodes }), shallowEqual);
    const [equipmentsTotal, setEquipmentsTotal] = useState(0);
    const [equipmentsInstalled, setEquipmentsInstalled] = useState(0);
    const [equipmentsBroken, setEquipmentsBroken] = useState(0);
    const [equipmentsMaintenance, setEquipmentsMaintenance] = useState(0);

    // Initializer: Change Toolbar to Mode None
    useToolbarChangeModeInitializer(TOOLBAR_MODE.NONE_HOME); // TODO: Needs to find where to go when we press "HOME"!!
    useTokenInitializer();
    useFactInitializer();
    useEffect(() => {
        dispatch(footerToModeInvisible());
    }, []);

    useEffect(() => {
        let count_total = 0;
        let count_installed = 0;
        let count_broken = 0;
        let count_maintenance = 0;
        let tempNodeData = [];
        let tempOnlyUniqueNodeID = [];
        let equipment_age = [];
        equipment_age.push(0)
        let promise = new Promise(function(resolve, reject) {
            // let count_total, count_installed, count_broken, count_maintenance = 0;
            factEquipment.items.map(function ({ equipment_id, item_id, useful_life, responsible_district_id, item_status_id, responsible_node_id, is_installed, equipment_group, equipment_installation }) {
                // is_installed.data[0] === 1 
                if (FilterByAdjustmentBar(equipment_installation, equipment_group, values)) {
                    if (item_status_id === ITEM_STATUS.INSTALLED || item_status_id === ITEM_STATUS.NEW || item_status_id === ITEM_STATUS.BROKEN || item_status_id === ITEM_STATUS.FIX) {
                        count_total++;
                        // Plot data on Thailand
                        if (item_status_id === ITEM_STATUS.INSTALLED || item_status_id === ITEM_STATUS.NEW) { count_installed++; }
                        else if (item_status_id === ITEM_STATUS.BROKEN) { count_broken++; }
                        else if (item_status_id === ITEM_STATUS.FIX) { count_maintenance++; }
                        
                        // TODO used useful_life, we will change now-import_on
                        equipment_age.push(useful_life);

                        // Plot data on equipment-status-list
                        // console.log("equipment_installation[0].location_node_id", equipment_installation[0].location_node_id)
                        let node_id = equipment_installation[0].location_node_id - 1;
                        if (tempNodeData.length !== 0) {
                            let isInArray = tempOnlyUniqueNodeID.includes(node_id);
                            let indexArray = tempOnlyUniqueNodeID.indexOf(node_id);
                            if (isInArray) {
                                if (item_status_id === ITEM_STATUS.WORKING || item_status_id === ITEM_STATUS.NEW) { tempNodeData[indexArray].WORKING += 1 }
                                else if (item_status_id === ITEM_STATUS.DAMAGED) { tempNodeData[indexArray].DAMAGED += 1 }
                                else if (item_status_id === ITEM_STATUS.MAINTENANCING) { tempNodeData[indexArray].MAINTENANCING += 1 }
                            } else {
                                tempOnlyUniqueNodeID.push(node_id);
                                tempNodeData.push({
                                    id: node_id,
                                    name: factNodes.items[node_id],
                                    WORKING: item_status_id === ITEM_STATUS.INSTALLED || item_status_id === ITEM_STATUS.NEW ? 1:0,
                                    DAMAGED: item_status_id === ITEM_STATUS.BROKEN ? 1:0,
                                    MAINTENANCING: item_status_id === ITEM_STATUS.FIX ? 1:0
                                });
                            }
                        } else {
                            tempOnlyUniqueNodeID.push(node_id);
                            tempNodeData.push({
                                id: node_id,
                                name: factNodes.items[node_id],
                                WORKING: item_status_id === ITEM_STATUS.INSTALLED || item_status_id === ITEM_STATUS.NEW ? 1:0,
                                DAMAGED: item_status_id === ITEM_STATUS.BROKEN ? 1:0,
                                MAINTENANCING: item_status_id === ITEM_STATUS.FIX ? 1:0
                            });
                        }
                    }
                }
            })
            setFieldValue('list_node_status', tempNodeData);
            setFieldValue('equipment_age', equipment_age);
            
            // SS101
            let nowYear = new Date().getFullYear();
            let begin_document_date = (nowYear-1).toString() + "-01-01";
            let end_document_date = (nowYear).toString() + "-12-31";
            let count_accident_now = new Array(12).fill(0)
            let count_accident_prev = new Array(12).fill(0)

            ALSGetDocumentSS101(begin_document_date, end_document_date).then((data) => {
                let data_ss101 = data.results;
                data_ss101.map((item) => { 
                    let d = new Date(item.document.document_date);
                    // https://stackoverflow.com/questions/1968167/difference-between-dates-in-javascript
                    let a = new Date(item.specific.accident_on);
                    let b = new Date(item.specific.finished_on);
                    let hour = parseInt((b-a)/1000/60/60);
                    if (d.getFullYear() === nowYear) {
                        count_accident_now[d.getMonth()-1] = count_accident_now[d.getMonth()-1] + hour;
                    }
                    else {
                        count_accident_prev[d.getMonth()-1] = count_accident_prev[d.getMonth()-1] + hour;
                    }
                    // }
                })

                let results_accident = [];
                let now_year = nowYear+543
                let prev_year = nowYear+543 - 1

                results_accident.columns = [prev_year, now_year];
                results_accident.yAxis = "ระยะเวลาขัดข้อง (ชั่วโมง)";
                results_accident.xAxis = "เดือน";
        
                let xGroups = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];

                for (let i = 0; i < xGroups.length; i++) {
                    results_accident.push({
                        [results_accident.xAxis]: xGroups[i],
                        [results_accident.columns[0]]: count_accident_prev[i],
                        [results_accident.columns[1]]: count_accident_now[i],
                    });
                }
                
                setFieldValue('accident_ss101', results_accident);
            })
            resolve()
        });

        promise.then(function() { 
            setEquipmentsTotal(count_total);
            setEquipmentsInstalled(count_installed);
            setEquipmentsBroken(count_broken);
            setEquipmentsMaintenance(count_maintenance);
        })
        
    }, [factEquipment.items, values.equipment_group_id, values.district_id, values.node_id]);

    return (
        <>
            {!loggedIn ? <Redirect to="/" /> : null}
            <div id={changeTheam() === true ? "" : "blackground-white"} style={changeTheam() === true ? { backgroundImage: `url(${BgGreen})`, width: "100vw", height: "120vh" } : {height: "120vh"}}>
                <div className="bootstrap-wrapper">
                    <div className="container" style={{ marginTop: "70px" }}>
                        {/* Section Title */}
                        <h4 className="head-title no-margin">แสดงผลสถานะของสินทรัพย์</h4>


                        {/* Columns have horizontal padding to create the gutters between individual columns, however, you can remove the margin from rows and padding from columns with .no-gutters on the .row. */}
                        <div className="row_bootstrap ">
                            {/* === Annual Average Inventory Month Line Graph :1st Row, 1st Column === */}
                            <div className="col-3" >
                                <SimpleGrayCardComponent
                                    name="จำนวนสินทรัพย์ทั้งหมด"
                                    // value={1270}
                                    value={equipmentsTotal!==undefined ? equipmentsTotal:0}
                                />
                            </div>


                            {/* === Current Average Inventory Month Text :1st Row, 2nd Column === */}
                            <div className="col-3">
                                <SimpleGrayCardComponent
                                    name="จำนวนสินทรัพย์ที่ใช้งาน"
                                    // value={750}
                                    value={equipmentsInstalled!==undefined ? equipmentsInstalled:0}
                                />

                            </div>

                            {/* === Current Inventory Month vs Planned Inventory Month Scatter Plot :1st Row, 2nd Column === */}
                            <div className="col-3">
                                <SimpleGrayCardComponent
                                    name="จำนวนสินทรัพย์ชำรุด"
                                    // value={200}
                                    value={equipmentsBroken!==undefined ? equipmentsBroken:0}
                                />

                            </div>

                            <div className="col-3" >
                                <SimpleGrayCardComponent
                                    name="จำนวนสินทรัพย์ดำเนินการซ่อม"
                                    // value={320}
                                    value={equipmentsMaintenance!==undefined ? equipmentsMaintenance:0}
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
                                    marginTop: 30, 
                                    height: "300px"
                                }}>
                                <Histogram
                                    chartSettings={{ marginLeft: 50, marginTop: 40, marginBottom: 40, height: 300 }}
                                    data={values.equipment_age}
                                    // data={randomHistogramData()}
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
                            <div className="col-4" 
                                // style={{ border: "1px solid red", height: "200px" }}
                            >

                                <GroupedBarGraph
                                    title="ระยะเวลาขัดข้องแต่ละครั้งเทียบแต่ละเดือน"
                                    data={values.accident_ss101}
                                    // data={randomGroupedBarGraphData()}
                                />
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
        equipment_group_id: 'ทั้งหมด',
        district_id: 'ทั้งหมด',
        node_id: 'ทั้งหมด',
        list_node_status: [],
        accident_ss101: _loss_ss101,
        equipment_age: [],

    })
})(AlsEquipmentStatusComponent);

export default EnhancedAlsEquipmentStatusComponent;
