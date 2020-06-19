import React, { useState, useEffect } from 'react';
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array"

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
import ThailandMapComponent from './d3-map';


const getAnnualInventoryMonthData = () => {
    let results = [];
    let dataPoints = 10;
    let date = new Date("October 13, 2014");
    for (let i = 0; i < dataPoints; i++) {
        results.push({
            date: new Date(date),
            inventory_month: Math.random() * 10,
        });
        date.setMonth(date.getMonth() + 1);
    }
    return results;
}

const randomDivergingBarGraphData = () => {
    let results = [];

    //set the default value of i & j to print A to Z
    var charCodeA = 65;
    var charCodeZ = 91;

    for (let charCode = charCodeA; charCode < charCodeZ; charCode++) {
        results.push({
            name: String.fromCharCode(charCode),
            value_neg: -Math.random() * 200,
            value_pos: Math.random() * 200,
        });
    }

    return results;
}

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

    const [IVMonthData, setIVMonthData] = useState([])
    const [BarDivergingGraphData, setBarDivergingGraphData] = useState([])
    useEffect(() => {
        const interval = setTimeout(() => {
            var randomMonthData = getAnnualInventoryMonthData()
            setIVMonthData(randomMonthData);
        }, 2000);
        return () => clearInterval(interval);
    }, [])
    useEffect(() => {
        
        const interval = setTimeout(() => {
            // var randomMonthData = randomDivergingBarGraphData()
            setBarDivergingGraphData(randomDivergingBarGraphData());
        }, 1500);
        return () => clearInterval(interval);
    }, [])

    return (
        <>
            {!loggedIn ? <Redirect to="/" /> : null}

            <div id="blackground-white" >
                <div className="bootstrap-wrapper">
                    <div className="container" style={{ marginTop: "80px" }}>
                        {/* Section Title */}
                        <h4 className="head-title">แสดงผลสถานะของสินทรัพย์</h4>


                        {/* Columns have horizontal padding to create the gutters between individual columns, however, you can remove the margin from rows and padding from columns with .no-gutters on the .row. */}
                        <div className="row_bootstrap">
                            {/* === Annual Average Inventory Month Line Graph :1st Row, 1st Column === */}
                            <div className="col-3" style={{border:"1px solid red", height:"120px"}}>
                                จำนวนสินทรัพย์ทั้งหมด
                                {/* <LineGraph data={IVMonthData} /> */}
                            </div>


                            {/* === Current Average Inventory Month Text :1st Row, 2nd Column === */}
                            <div className="col-3" style={{border:"1px solid red"}}>
                            จำนวนสินทรัพยที่ใช้งาน
              {/* <LineGraph /> */}
                            </div>

                            {/* === Current Inventory Month vs Planned Inventory Month Scatter Plot :1st Row, 2nd Column === */}
                            <div className="col-3" style={{border:"1px solid red"}}>
                            จำนวนสินทรัพยชำรุด
                            </div>

                            <div className="col-3" style={{border:"1px solid red"}}>
                            จำนวนสินทรัพยดำเนินการซ่อม
                            </div>
                        </div>
                        {/*=== Second Row ===*/}
                        <div className="row_bootstrap">
                            <div className="col-2" style={{border:"1px solid red", height:"250px"}}>.col-md-2 ปรับแต่งข้อมูลของภาพรวม</div>
                            <div className="col-7" style={{border:"1px solid red", height:"500px"}}>
                                
                                <ThailandMapComponent />
                            </div>
                            <div className="col-3" style={{border:"1px solid red", height:"300px"}}>.col-md-5 <ScatterPlot /></div>
                        </div>
                        {/*=== Second Row ===*/}
                        <div className="row_bootstrap">
                        <div className="col-4" style={{border:"1px solid red", height:"200px"}}>.col-md-5 <ScatterPlot /></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AlsEquipmentStatusComponent;
