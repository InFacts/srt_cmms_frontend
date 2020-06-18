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

import ScatterPlot from './d3-scatter-plot';
import LineGraph from './d3-line-graph';
import BarDivergingGraph from './d3-bar-diverging';

const getAnnualInventoryMonthData = () => {
  let results= [];
  let dataPoints=10;
  let date = new Date("October 13, 2014");
  for (let i = 0 ; i< dataPoints; i++){
    results.push({
      date: new Date(date),
      inventory_month: Math.random()*10,
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
  
  for (let charCode = charCodeA; charCode<charCodeZ; charCode++){
    results.push({
      name: String.fromCharCode(charCode),
      value_out: Math.random()*200,
      value_in: Math.random()*200,
    });
  }

  return results;
}

const AlsSpareComponent = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.token.isLoggedIn);

  // Initializer: Change Toolbar to Mode None
  useToolbarChangeModeInitializer(TOOLBAR_MODE.NONE_HOME); // TODO: Needs to find where to go when we press "HOME"!!
  useTokenInitializer();
  useFactInitializer();
  useEffect(() => {
    dispatch(footerToModeInvisible());
    console.log("THIS IS ANNUAL ", getAnnualInventoryMonthData())
  }, []);

  return (
    <>
      {!loggedIn ? <Redirect to="/" /> : null}

      <div id="blackground-white" >
        <div className="bootstrap-wrapper">
          <div class="container" style={{ marginTop: "80px" }}>
            {/* Section Title */}
            <h4 className="head-title">ระบบวิเคราะห์การวางแผนสำรองอะไหล่</h4>


            {/* Columns have horizontal padding to create the gutters between individual columns, however, you can remove the margin from rows and padding from columns with .no-gutters on the .row. */}
            <div className="row_bootstrap no-gutters">
              {/* === Annual Average Inventory Month Line Graph :1st Row, 1st Column === */}
              <div class="col-4">
                <LineGraph data={getAnnualInventoryMonthData()}/>
              </div>


              {/* === Current Average Inventory Month Text :1st Row, 2nd Column === */}
              <div className="col-4">
              Average Inventory Month ปัจจุบัน
              {/* <LineGraph /> */}
              </div>

              {/* === Current Inventory Month vs Planned Inventory Month Scatter Plot :1st Row, 2nd Column === */}
              <div className="col-4">
              <ScatterPlot />
              </div>
            </div>
            {/*=== Second Row ===*/}
            <div className="row_bootstrap">
              <div className="col-2">.col-md-2 ปรับแต่งข้อมูลของภาพรวม</div>
              <div className="col-5">
                <BarDivergingGraph data={getAnnualInventoryMonthData()}/>  
              </div>
              <div className="col-5">.col-md-5</div>
            </div>
            {/* <Scatter /> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default AlsSpareComponent;
