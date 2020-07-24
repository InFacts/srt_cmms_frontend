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
import Histogram from '../als-equipment-status/d3-histogram';
import ThailandMapComponent from '../als-equipment-status/d3-map';

import AdjustmentBarComponent from '../als-equipment-status/adjustment-bar';
import EquipmentStatusListComponent from '../als-equipment-status/equipment-status-list';
import SimpleGrayCardComponent from '../als-equipment-status/simple-gray-card';

import { randomHistogramData, randomPieChartData, randomGroupedBarGraphData } from './mockup-data';
import PieChart from '../common/d3-pie-chart';
import GroupedBarGraph from '../common/d3-grouped-bar-graph';

import BgGreen from '../../../images/als/bg_als.jpg';
import { ALSGetDocumentSS101, changeTheam, ITEM_STATUS } from '../../helper.js'

const AlsPlanPreventiveMaintenanceComponent = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.token.isLoggedIn);
    const {values, setFieldValue} = useFormikContext();
    const factEquipment = useSelector((state) => ({ ...state.api.fact.equipment }), shallowEqual);

    // Initializer: Change Toolbar to Mode None
    useToolbarChangeModeInitializer(TOOLBAR_MODE.NONE_HOME); // TODO: Needs to find where to go when we press "HOME"!!
    useTokenInitializer();
    useFactInitializer();
    useEffect(() => {
        dispatch(footerToModeInvisible());
    }, []);

    useEffect(() => {
        let backward_year = 5;
        let today = new Date();
        let RunToFail_mtbf = [];
        let ageEquipmentList = [];
        RunToFail_mtbf.columns = ["ระยะเวลาการทำวาระ", "MTBF - Run to Fail", "MTBF - ของผู้ผลิต"];
        RunToFail_mtbf.yAxis = "MTBF - Run to Fail (เดือน)"
        RunToFail_mtbf.xAxis = "Equipment Item"
        let xGroups = ["ระบบเครื่องกั้นถนน", "ระบบเซนเซอร์", "ระบบโทรคมนาคม", "หม้อแปลงไฟฟ้า", "ระบบโทรทัศน์วงจรปิด (CCTV)", "ระบบประกาศสาธารณะ (PA)"];
        let ageEquipmentPieGroups = ["1 ปี", "2 ปี", "3 ปี", "4-5 ปี", "5-10 ปี", "10+ ปี"];
        
        let ageEquipmentPie = [];
        let _ageEquipmentPie = new Array(ageEquipmentPieGroups.length).fill(0);
        let count_useful_life_group = new Array(xGroups.length).fill(0);
        let count_group = new Array(xGroups.length).fill(0);
        factEquipment.items.map(function ({ equipment_id, item_id, useful_life, import_on, item_status_id, responsible_node_id, is_installed, equipment_group, equipment_installation }) {
            // TODO: freqPlan = ConvertMount(NOW - import_on) - ConvertMount(Fail_time)
            // TODO: spareMTBF = ConvertMount(NOW - import_on) - ConvertMount(Fail_time)
            // TODO: ageEquipment = ConvertMount(NOW - import_on)
            count_useful_life_group[equipment_group.equipment_group_id] = count_useful_life_group[equipment_group.equipment_group_id] + useful_life;
            count_group[equipment_group.equipment_group_id]++;
            
            // Equpiment Status - Broken, Fix, Salvage
            // if (item_status_id === ITEM_STATUS.NEW || item_status_id === ITEM_STATUS.BROKEN || item_status_id === ITEM_STATUS.FIX || item_status_id === ITEM_STATUS.SALVAGE) {
            if (import_on !== null) {
                // TODO: ageEquipment = ConvertMount(NOW - import_on)
                let import_on_date = new Date(import_on);

                // To calculate the time difference of two dates 
                var Difference_In_Time = today.getTime() - import_on_date.getTime();

                // To calculate the no. of days between two dates 
                var Difference_In_Year = Difference_In_Time / (1000 * 3600 * 24 * 365.25);
                ageEquipmentList.push(Difference_In_Year);

                if (Difference_In_Year <= 1) { _ageEquipmentPie[0]++; }
                else if (Difference_In_Year <= 2) { _ageEquipmentPie[1]++; }
                else if (Difference_In_Year <= 3) { _ageEquipmentPie[2]++; }
                else if (Difference_In_Year <= 5) { _ageEquipmentPie[3]++; }
                else if (Difference_In_Year <= 10) { _ageEquipmentPie[4]++; }
                else { _ageEquipmentPie[5]++; }

            }
            // }
        })
        for (let i = 0; i < count_group.length; i++) {
            count_useful_life_group[i] = count_useful_life_group[i]/count_group[i];
        }

        for (let i = 0; i < xGroups.length; i++) {
            RunToFail_mtbf.push({
                [RunToFail_mtbf.xAxis]: xGroups[i],
                [RunToFail_mtbf.columns[0]]: count_useful_life_group[i],
                [RunToFail_mtbf.columns[1]]: count_useful_life_group[i],
                [RunToFail_mtbf.columns[2]]: count_useful_life_group[i],
            });
        }

        for (let i = 0; i < ageEquipmentPieGroups.length; i++) {
            // console.log("ageEquipmentPieGroups", i, ageEquipmentPieGroups[i])
            ageEquipmentPie.push({key: ageEquipmentPieGroups[i], value: _ageEquipmentPie[i]});
        }
        // console.log("_ageEquipmentPie", _ageEquipmentPie)
        // console.log("ageEquipmentPie >", ageEquipmentPie)
        
        setFieldValue('RunToFail_mtbf', RunToFail_mtbf);
        setFieldValue('age_equipment_list', ageEquipmentList);
        setFieldValue('ageEquipmentPieGroups', ageEquipmentPie);
        
    }, [factEquipment.items]);



    return (
        <>
            {!loggedIn ? <Redirect to="/" /> : null}

            <div id={changeTheam() === true ? "" : "blackground-white"} style={changeTheam() === true ? { backgroundImage: `url(${BgGreen})`, width: "100vw", height: "100vh" } : { height: "100vh" }}>
                <div className="bootstrap-wrapper">
                    <div className="container" style={{ marginTop: "70px" }}>
                        {/* Section Title */}
                        <h4 className="head-title no-margin">ระบบวิเคราะห์การวางแผนการซ่อมบำรุง</h4>

                        {/* Columns have horizontal padding to create the gutters between individual columns, however, you can remove the margin from rows and padding from columns with .no-gutters on the .row. */}
                        <div className="row_bootstrap no-gutters">
                            <div className="col-4" >
                                <Histogram
                                    chartSettings={{ marginLeft: 50, marginTop: 70, marginBottom: 40, height: 300 }}
                                    // data={randomHistogramData()}
                                    data={values.age_equipment_list}
                                    title="ระยะเวลาระหว่างการชำรุดจากอายุการใช้งาน"
                                    xAxis="อายุการใช้งานของสินทรัพย์ (ปี)"
                                    yAxis="จำนวนของสินทรัพย์"
                                />
                            </div>
                            <div className="col-8" >
                                <GroupedBarGraph
                                    chartSettings={{ marginLeft: 50, marginTop: 60, marginBottom: 40, height: 300 }}
                                    data={values.RunToFail_mtbf}
                                    // data={randomGroupedBarGraphData()}
                                />
                            </div>

                        </div>

                        <div className="row_bootstrap no-gutters">
                            <div className="col-4" >
                                <PieChart
                                    chartSettings={{
                                        marginLeft: 20, marginTop: 30, marginBottom: 40,
                                        marginRight: 20, height: 200
                                    }}
                                    // data={randomPieChartData()}
                                    data={values.ageEquipmentPieGroups}
                                    title="ระยะเวลาระหว่างการชำรุดจากอายุการใช้งาน"
                                />
                            </div>
                            {/* PM MTBF */}
                            <div className="col-8" >
                                <div className="row_bootstrap" style={{ padding: 10 }}>
                                    <div className="col-12">
                                        <div className="gray-background">
                                            <h5 className="simple-card-name">จำนวนของสินทรัพย์ในแต่ละเกณฑ์</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="row_bootstrap" style={{ padding: 10 }}>
                                    <div className="col-4">
                                        <SimpleGrayCardComponent
                                            name="ความถี่ในการทำวาระ < MTBF"
                                            value={22}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <SimpleGrayCardComponent
                                            name="ความถี่ในการทำวาระ = MTBF"
                                            value={22}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <SimpleGrayCardComponent
                                            name="ความถี่ในการทำวาระ > MTBF"
                                            value={22}
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
const EnhancedAlsPlanPreventiveMaintenanceComponent = withFormik({
    mapPropsToValues: () => ({
        equipment_group_id: '',
        division_id: '',
        district_id: '',
        node_id: '',
        RunToFail_mtbf: _loss_ss101,
        age_equipment_list: [],
        ageEquipmentPieGroups: [],
    })
})(AlsPlanPreventiveMaintenanceComponent);


export default EnhancedAlsPlanPreventiveMaintenanceComponent;
