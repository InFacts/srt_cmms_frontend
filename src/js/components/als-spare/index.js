import React, { useState, useEffect } from 'react';
// import { scaleLinear } from "d3-scale";
// import { extent } from "d3-array"
import { withFormik} from 'formik';

import { footerToModeInvisible } from '../../redux/modules/footer.js';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { useToolbarChangeModeInitializer } from '../../hooks/toolbar-initializer';
import { TOOLBAR_MODE, TOOLBAR_ACTIONS, MODE_TO_ACTION_CREATOR } from '../../redux/modules/toolbar.js';
import useFactInitializer from '../../hooks/fact-initializer';
import useTokenInitializer from '../../hooks/token-initializer';

import ScatterPlot from './d3-scatter-plot';
import LineGraph from './d3-line-graph';
import MultiLineGraph from './d3-multi-line-graph';
import BarDivergingGraph from './d3-bar-diverging';

import AdjustmentBarComponent from './adjustment-bar';
import SimpleGrayCardComponent from '../als-equipment-status/simple-gray-card';
import SimpleCard2ValuesComponent from './simple-card-2values';
import { getAnnualInventoryMonthData, randomDivergingBarGraphData, randomScatterPlotData } from './mockup-data';

import BgGreen from '../../../images/als/bg_als.jpg';
import { fetchPositionPermissionData, changeTheam , fetchStatisticGoodsMonthlySummary,
  getItemInternalIDfromItemID} from '../../helper.js';
import { FACTS } from '../../redux/modules/api/fact.js';

const AlsSpareComponent = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.token.isLoggedIn);
  const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);

  // Initializer: Change Toolbar to Mode None
  useToolbarChangeModeInitializer(TOOLBAR_MODE.NONE_HOME); // TODO: Needs to find where to go when we press "HOME"!!
  useTokenInitializer();
  useFactInitializer();
  useEffect(() => {
    dispatch(footerToModeInvisible());
  }, []);

  const [IVMonthData, setIVMonthData] = useState([]);
  const [BarDivergingGraphData, setBarDivergingGraphData] = useState([]);

  useEffect(() => {
    const interval = setTimeout(() => {
      var randomMonthData = getAnnualInventoryMonthData()
      setIVMonthData(randomMonthData);
    }, 1000);
    return () => clearInterval(interval);
  }, [])
  useEffect(() => {
    // const interval = setTimeout(() => {
    //   // var randomMonthData = randomDivergingBarGraphData()
    //   setBarDivergingGraphData(randomDivergingBarGraphData());
    // }, 1500);
    // return () => clearInterval(interval);
  }, [])


  // Replace Z with +07:00 to comply with ISO Standards
  const sneakyAddUTC7ToDate = (datetimeString) => {
    return datetimeString.replace(/Z$/, "+07:00");
  }

  // Find reporting period ids that is inside the window size, and the current reporting id from Fact
  // Input: 
  //    - reportingPeriodFact       : the reporting periods from the Fact
  //    - windowSize       (year)   : the number of years for one window size (should be >=1 year: because i will use max/min of the windowSize Array - else the currentYearReportingPeriodIDs will have more when we query the reportingPeriodFact)
  // Output:
  //    - currentReportingPeriodID         Int      : ReportingPeriodID of the current Date
  //    - currentYearReportingPeriodIDs    Array[Int] : Array of ReportingPeriodIDs' from [beginYear:now]
  //    - currentWindowReportingPeriodIDs  Array[Int] : Array of ReportingPeriodIDs' from [now-windowSize:now]
  const findCurrentReportingPeriods = (reportingPeriodFact, windowSize=2) => {
    const today = new Date();
    let reportingPeriods = reportingPeriodFact.items;

    // Find currentReportingPeriodID => Get the reportingPeriod that is in between the start and end date
    const currentReportingPeriodID = reportingPeriods.find(reportingPeriod => 
      today.getTime() >= new Date(sneakyAddUTC7ToDate(reportingPeriod.start_datetime)).getTime() &&
      today.getTime() <= new Date(sneakyAddUTC7ToDate(reportingPeriod.end_datetime)).getTime() 
    );

    // Find currentYearReportingPeriodIDs => get array of reportingperiodids from beginning of the year to now
    // Find currentWindowReportingPeriodIDs => get array of reportingperiodids from now-windowSize to now
    const beginOfYear   = new Date(new Date().getFullYear(), 0, 1);
    var beginOfWindow = new Date();
    beginOfWindow.setFullYear(beginOfWindow.getFullYear() - windowSize );

    var currentYearReportingPeriodIDs = [];
    var currentWindowReportingPeriodIDs = []; 
    for (var reportingPeriod of reportingPeriods){
      // if reportingPeriod inside the beginning of the year to now
      if(new Date(sneakyAddUTC7ToDate(reportingPeriod.start_datetime)).getTime() >= beginOfYear.getTime() &&
      new Date(sneakyAddUTC7ToDate(reportingPeriod.start_datetime)).getTime() <= today.getTime()
      ){
        currentYearReportingPeriodIDs.push(reportingPeriod);
      }
      // if reportingPeriod inside the windowSize to now
      if(new Date(sneakyAddUTC7ToDate(reportingPeriod.start_datetime)).getTime() >= beginOfWindow.getTime() &&
      new Date(sneakyAddUTC7ToDate(reportingPeriod.start_datetime)).getTime() <= today.getTime()
      ){
        currentWindowReportingPeriodIDs.push(reportingPeriod);
      }
    }

    return [currentReportingPeriodID, currentYearReportingPeriodIDs, currentWindowReportingPeriodIDs];
  }

  // const find

  const findItemUsageRate = (stats) => {

  }

  const findItemsStats = (stats, reportingPeriodFilter, annualAverage=false) => {
    // This assumes that the reporting period ID is populated over all item/warehouses, 
    // because the number of _reporting_period_ids tracked will be used as a denominator of division in the final step.

    // // Used to keep track of all the reporting period ids
    // var _reporting_period_ids = [];
    // Used as a dictionary to map between item_id -> summation of state_out (qty)
    var itemUsageRate = {}; 
    // Used as a dictionary to map between item_id -> summation of state_in (qty)
    var itemReceiveRate = {}; 

    for (var result of stats) {
      // // If there is no reporting period, include it to track 
      // if (!_reporting_period_ids.includes(result.reporting_period_id)) {
      //   _reporting_period_ids.push(result.reporting_period_id);
      // }
      if (!reportingPeriodFilter.includes(result.reporting_period_id)){
        continue;
      }

      // Update ItemUsageRate
      if (itemUsageRate.hasOwnProperty(result.item_id)){
        itemUsageRate[result.item_id] += result.issue_unit_count;
      }else{
        itemUsageRate[result.item_id] = result.issue_unit_count;
      }
      
      // Update itemReceiveRate
      if (itemReceiveRate.hasOwnProperty(result.item_id)){
        itemReceiveRate[result.item_id] += result.receive_unit_count;
      }else{
        itemReceiveRate[result.item_id] = result.receive_unit_count;
      }

    }

    // If we want annualAverage
    if (annualAverage) {
      Object.keys(itemUsageRate).map((key, index) => {
        itemUsageRate[key] /= reportingPeriodFilter.length/12;
      });
      Object.keys(itemReceiveRate).map((key, index) => {
        itemReceiveRate[key] /= reportingPeriodFilter.length/12;
      });
    }
    
    return [itemUsageRate, itemReceiveRate]
  }

  // Selects the data for the diverging bar graph 
  // Data in the Format:
  //    results.push({
  //       name: String.fromCharCode(charCode),
  //       value_neg: -Math.random() * 200,
  //       value_pos: Math.random() * 200,
  //    });
  const divergingBarSelector = (itemUsageRate, itemReceiveRate, itemFact, sort=true) => {
    var results = [];

    const uniqueItemIds = Object.keys({...itemUsageRate, ...itemReceiveRate}); 

    for (var itemId of uniqueItemIds){
      results.push({
        name: getItemInternalIDfromItemID(itemFact, itemId),
        value_neg: -itemUsageRate[itemId] || 0,
        value_pos: itemReceiveRate[itemId] || 0,
      });
    }

    // If sort, we will sort by the maximum of the value_pos (receive_unit_count)
    if(sort){
      results.sort((a,b) => {return b.value_pos - a.value_pos });
    }

    return results;
  }

  const reportingPeriodIDSelector = (reportingPeriodIDs) => {
    return reportingPeriodIDs.map(reportingPeriod => reportingPeriod.reporting_period_id); 
  }

  useEffect (() => {

    if(fact[FACTS.REPORTING_PERIOD].lastUpdated > 0 &&
      fact[FACTS.ITEM].lastUpdated > 0 
      ){

      // 3 Reporting Period IDs
      //    - currentReportingPeriodID         Int      : ReportingPeriodID of the current Date (SELECTED)
      //    - currentYearReportingPeriodIDs    Array[Int] : Array of ReportingPeriodIDs' from [beginYear:now]
      //    - currentWindowReportingPeriodIDs  Array[Int] : Array of ReportingPeriodIDs' from [now-windowSize:now]
      const [currentReportingPeriodID, currentYearReportingPeriodIDs, currentWindowReportingPeriodIDs] = findCurrentReportingPeriods(fact[FACTS.REPORTING_PERIOD]);
      console.log("ALSSPARE:: currentReportingPeriodID:: ", currentReportingPeriodID);
      console.log("ALSSPARE:: currentYearReportingPeriodIDs:: ", currentYearReportingPeriodIDs);
      console.log("ALSSPARE:: currentWindowReportingPeriodIDs:: ", currentWindowReportingPeriodIDs);

      // Fetch the statistic Goods monthly summary
      fetchStatisticGoodsMonthlySummary( // Beware of Math.min() and Math.max() going to infinity and -infinity 
        Math.min(...currentWindowReportingPeriodIDs.map(reportingPeriod => reportingPeriod.reporting_period_id)) , 
        Math.max(...currentWindowReportingPeriodIDs.map(reportingPeriod => reportingPeriod.reporting_period_id),0 )  )
      .then(  results  => {
        // console.log("ALSSPARE:: findCurrentReportingPeriod", findCurrentReportingPeriod(fact[FACTS.REPORTING_PERIOD].items))
        console.log("ALSSPARE:: fetchStatisticGoodsMonthlySummary", results);

        // itemUsageAnnualRate, itemReceiveAnnualRate 
        var [itemUsageAnnualRate, itemReceiveAnnualRate] = findItemsStats(results, reportingPeriodIDSelector(currentWindowReportingPeriodIDs), true);
        
        

        // Set Diverging Bar Graph Data
        var [itemUsageYear, itemReceiveYear] = findItemsStats(results, reportingPeriodIDSelector(currentYearReportingPeriodIDs), false);
        var barDivergingGraphData = divergingBarSelector(itemUsageYear, itemReceiveYear, fact[FACTS.ITEM]);
        setBarDivergingGraphData(barDivergingGraphData);

        console.log("ALSSPARE:: item stats:: ", itemUsageYear, itemReceiveYear)
      })
    }
  }, [fact[FACTS.REPORTING_PERIOD].lastUpdated, fact[FACTS.ITEM].lastUpdated])

  return (
    <>
      {!loggedIn ? <Redirect to="/" /> : null}

      <div id={changeTheam() === true ? "" : "blackground-white"} style={changeTheam() === true ? { backgroundImage: `url(${BgGreen})`, width: "100vw", height: "100vh" } : { height: "100vh" }}>
        <div className="bootstrap-wrapper">
          <div class="container" style={{ marginTop: "80px" }}>
            {/* Section Title */}
            <h4 className="head-title mb-0">ระบบวิเคราะห์การวางแผนสำรองอะไหล่</h4>


            {/* Columns have horizontal padding to create the gutters between individual columns, however, you can remove the margin from rows and padding from columns with .no-gutters on the .row. */}
            <div className="row_bootstrap no-gutters">
              {/* === Annual Average Inventory Month Line Graph :1st Row, 1st Column === */}
              <div class="col-4">
                <LineGraph
                  title="Average Inventory Month ของทุกๆปี"
                  data={IVMonthData}
                  chartSettings={{
                    marginTop: 20,
                    height: 230,
                  }}
                />
              </div>


              {/* === Current Average Inventory Month Text :1st Row, 2nd Column === */}
              <div className="col-4"
                style={{ padding: 5 }}
              // style={{ border: "1px red solid" }}
              >
                <div className="row_bootstrap"
                  style={{ marginBottom: 5 }}
                >
                  <div className="col-12">
                    <SimpleGrayCardComponent
                      name="Average Inventory Month ปัจจุบัน"
                      value={`7.5 เดือน `}
                    />
                  </div>
                </div>

                <div className="row_bootstrap no-gutters">
                  <div className="col-4">
                    <SimpleGrayCardComponent
                      name="อะไหล่ต่ำกว่าเกณฑ์"
                      value={52}
                    />
                  </div>
                  <div className="col-4">
                    <SimpleGrayCardComponent
                      name="อะไหล่ตามเกณฑ์"
                      value={200}
                    />
                  </div>
                  <div className="col-4">
                    <SimpleGrayCardComponent
                      name="อะไหล่สูงกว่าเกณฑ์"
                      value={367}
                    />
                  </div>
                </div>

                {/* <LineGraph /> */}
              </div>

              {/* === Current Inventory Month vs Planned Inventory Month Scatter Plot :1st Row, 2nd Column === */}
              <div className="col-4">
                <ScatterPlot
                  title="Inventory Month ปัจจุบัน vs. แผนของแต่ละอะไหล่"
                  data={randomScatterPlotData()}
                  chartSettings={{
                    marginTop: 40,
                    marginBottom: 30,
                    marginLeft: 30,
                    height: 250,
                  }}
                />
              </div>
            </div>
            {/*=== Second Row ===*/}
            <div className="row_bootstrap no-gutters">
              <div className="col-2">
                <AdjustmentBarComponent />
              </div>
              <div className="col-5">
                <BarDivergingGraph
                  title="การนำออกและนำเข้าอะไหล่"
                  data={BarDivergingGraphData}
                />
              </div>
              <div className="col-5">
                <div className="row_bootstrap no-gutters">
                  <div className="col-12">
                    <h5 style={{marginBottom:0 , 
                      backgroundColor: "white",
                      fontSize: 20,
                      fontWeight:600}}>{"อะไหล่ Relay 5V SPDF 240"}</h5>
                  </div>
                  <div className="col-7">
                    <div className="row_bootstrap no-gutters">
                      <div className="col-12">
                        <MultiLineGraph
                          title="การใช้งานและการนำเข้า"
                          data={IVMonthData}
                          chartSettings={{
                            marginTop: 20,
                            height: 150,
                          }}
                        />
                      </div>
                    </div>
                    <div className="row_bootstrap no-gutters">
                      <div className="col-12">
                        <MultiLineGraph
                          title="คงคลัง/Inventory Month"
                          data={IVMonthData}
                          chartSettings={{
                            marginTop: 20,
                            height: 150,
                          }}
                        />
                      </div>
                    </div>
                    <div className="row_bootstrap no-gutters">
                      <div className="col-12">
                        <MultiLineGraph
                          title="Inventory Turnover Rate"
                          data={IVMonthData}
                          chartSettings={{
                            marginTop: 20,
                            height: 150,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="row_bootstrap no-gutters">
                      <div className="col-12">
                        <SimpleCard2ValuesComponent
                          name1="อัตราการนำออก"
                          value1="200/ปี"
                          name2="อัตราการนำเข้า"
                          value2="200/ปี"
                        />
                      </div>
                    </div>
                    <div className="row_bootstrap no-gutters">
                      <div className="col-12">
                        <SimpleCard2ValuesComponent
                          name1="คงคลัง ปัจจุบัน"
                          value1={125}
                          name2="คงคลังเป้าหมาย"
                          value2={110}

                        />
                        <SimpleCard2ValuesComponent
                          name1="Iv. Month ปัจจุบัน"
                          value1={6.5}
                          name2="Iv. Month เป้าหมาย"
                          value2={6}
                        />
                      </div>
                    </div>
                    <div className="row_bootstrap no-gutters">
                      <div className="col-12">
                        <SimpleCard2ValuesComponent
                          name1="Turnover Rate ปัจจุบัน"
                          value1={22}
                          name2="Turnover Rate เป้าหมาย"
                          value2={2}
                        />
                      </div>
                    </div>
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

const EnhancedAlsSpareComponent = withFormik({
  mapPropsToValues: () => ({
    year: 2563,
    warehouse_id: '',
    item_id: '',
    goal_inventory_month: 6,
  })
})(AlsSpareComponent);

export default EnhancedAlsSpareComponent;
