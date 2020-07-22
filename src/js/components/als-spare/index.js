import React, { useState, useEffect } from 'react';
// import { scaleLinear } from "d3-scale";
// import { extent } from "d3-array"
import { withFormik, useFormikContext} from 'formik';

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
  getItemInternalIDfromItemID, getItemNamefromItemID} from '../../helper.js';
import { FACTS } from '../../redux/modules/api/fact.js';

const AlsSpareComponent = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.token.isLoggedIn);
  const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
  const {values} = useFormikContext();

  // Initializer: Change Toolbar to Mode None
  useToolbarChangeModeInitializer(TOOLBAR_MODE.NONE_HOME); // TODO: Needs to find where to go when we press "HOME"!!
  useTokenInitializer();
  useFactInitializer();
  useEffect(() => {
    dispatch(footerToModeInvisible());
  }, []);


  const [isMockup, setIsMockup] =  useState(false);
  const [macroAverageInventoryMonthUI, setMacroAverageInventoryMonthUI] = useState(6.0);

  const [IVMonthData, setIVMonthData] = useState([]);
  const [BarDivergingGraphData, setBarDivergingGraphData] = useState([]);
  const [scatterPlotData, setScatterPlotData] = useState([]);
  const [numberItemsLowerUI, setNumberItemsLowerUI] = useState(0);
  const [numberItemsEqualUI, setNumberItemsEqualUI] = useState(0);
  const [numberItemsHigherUI, setNumberItemsHigherUI] = useState(0);


  const mockupData = () => {
    setIVMonthData(getAnnualInventoryMonthData());
    setBarDivergingGraphData(randomDivergingBarGraphData());
    setScatterPlotData(randomScatterPlotData());
    setNumberItemsLowerUI(52);
    setNumberItemsEqualUI(200);
    setNumberItemsHigherUI(367);
  }

  // Replace Z with +07:00 to comply with ISO Standards
  const sneakyAddUTC7ToDate = (datetimeString) => {
    return datetimeString.replace(/Z$/, "+07:00");
  }

  // Find reporting period ids that is inside the window size, and the current reporting id from Fact
  // Input: 
  //    - reportingPeriodFact       : the reporting periods from the Fact
  //    - selectedYear     (year)   : the selected year in the selector
  //    - windowSize       (#year)  : the number of years for one window size (should be >=1 year: because i will use max/min of the windowSize Array - else the currentYearReportingPeriodIDs will have more when we query the reportingPeriodFact)
  // Output:
  //    - currentReportingPeriodID         Int      : ReportingPeriodID of the current Date
  //    - currentYearReportingPeriodIDs    Array[Int] : Array of ReportingPeriodIDs' from [beginYear:now]
  //    - currentWindowReportingPeriodIDs  Array[Int] : Array of ReportingPeriodIDs' from [now-windowSize:now]
  const findCurrentReportingPeriods = (reportingPeriodFact, selectedYear, windowSize=2) => {
    var today = new Date();
    if (selectedYear < today.getFullYear()){
      today = new Date(selectedYear, 11, 31);
    }

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


  const findItemsStats = (stats, reportingPeriodFilter, warehouseIDFilter=null, itemIDFilter=null, annualAverage=false) => {
    // This assumes that the reporting period ID is populated over all item/warehouses, 
    // because the number of _reporting_period_ids tracked will be used as a denominator of division in the final step.

    // // Used to keep track of all the reporting period ids
    // var _reporting_period_ids = [];
    // Used as a dictionary to map between item_id -> summation of state_out (qty)
    var itemUsageRate = {}; 
    // Used as a dictionary to map between item_id -> summation of state_in (qty)
    var itemReceiveRate = {}; 

    // var latestReportingPeriodID = Math.max(...reportingPeriodFilter); // Use the latest reporting period to find QOH_current
    // Used as a dictionary to map between item_id -> summation of unit count (qty)
    var itemEndingUnitCount = {}; 

    for (var result of stats) {
      // // If there is no reporting period, include it to track 
      // if (!_reporting_period_ids.includes(result.reporting_period_id)) {
      //   _reporting_period_ids.push(result.reporting_period_id);
      // }
      if (!reportingPeriodFilter.includes(result.reporting_period_id)){
        continue;
      }
      // Skip if there not in warehouseIDFilter / ignore this if it is null
      // IMPORTANT: Need to ignore all warehouse_id=999 (EXTERNAL!!!)
      if (warehouseIDFilter !== null && !warehouseIDFilter.includes(result.warehouse_id) || result.warehouse_id===999){
        continue;
      }
      // Skip if there not in itemIDFilter / ignore this if it is null
      if (itemIDFilter !== null && !itemIDFilter.includes(result.item_id)){
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

      // Update itemEndingUnitCount
      // if (latestReportingPeriodID  === result.reporting_period_id){
      if (itemEndingUnitCount.hasOwnProperty(result.reporting_period_id)){
        if (itemEndingUnitCount[result.reporting_period_id].hasOwnProperty(result.item_id)){
          itemEndingUnitCount[result.reporting_period_id][result.item_id] += result.ending_unit_count;
        }else{
          itemEndingUnitCount[result.reporting_period_id][result.item_id] = result.ending_unit_count;
        }
      }else{
        itemEndingUnitCount[result.reporting_period_id] = {
          [result.item_id] : result.ending_unit_count
        };
      }
        
      // }
      

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
    
    return [itemUsageRate, itemReceiveRate, itemEndingUnitCount]
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

  // Selects the data for the line graph 
  // Data in the Format:
      // results.push({
      //   date: new Date(date),
      //   inventory_month: Math.random() * 10,
      // });
  const lineGraphSelector = (macroAverageInventoryMonthHistory) => {
    var results = [];
    for (var items of macroAverageInventoryMonthHistory){
      results.push({
        date: new Date(items.reportingPeriod.end_datetime),
        inventory_month: items.macroAverageInventoryMonth,
      });
    }
    results.sort((a,b) => {return b.date - a.date }); // sort the dates for sureness
    return results;
  }

  // Priorities
  // 1. If not null, Check if it complies with the itemFact's quantity_lowest(pin):null; quantity_highest(pin):null; quantity_required(pin):null
  // 2. If there is itemInventoryMonth, Check if it complies with InventoryMonth: 6 [itemUsage > 0]
  // 3. If nothing, Check if it is more than 1 QOH unit [default Goal since no itemUsage to reference]
  //
  // Also export data to scatter plot
  // [...Array(500)].map((e, i) => ({
      //     name: `Item ${i}`,
      //     x: Math.random() * 40,
      //     y: Math.random() * 40,
        
      // }));
  const checkItemsQOHCompliance = (itemEndingUnitCount, itemUsageAnnualRate, itemInventoryMonth, itemFact , goalInventoryMonth=6, tolerance=0.1, showInventoryMonth = false) => {
    var numberItemsLower = 0, numberItemsEqual= 0,numberItemsHigher =0;
    let results = [];
    // If the itemEndingUnitCount is not undefined
    if (typeof itemEndingUnitCount !== 'undefined') {  
      Object.keys(itemEndingUnitCount).map(itemID => {
        let goalQOH = 1;
        let upperLimitQOH = goalQOH*(1+tolerance);
        let lowerLimitQOH = goalQOH*(1-tolerance);
        let currentQOH = itemEndingUnitCount[itemID];
        let itemInfo = itemFact.items.find(item => `${item.item_id}` === `${itemID}`);
        let colorState = 0; // -1 for Lower, 0 for Equal , 1 for Higher
        
        if (itemInfo.quantity_highest && itemInfo.quantity_lowest && itemInfo.quantity_required){
          console.log("ALSSPARE:: itemInfo", itemInfo.quantity_highest, itemInfo.quantity_lowest, itemInfo.quantity_required)
          goalQOH = itemInfo.quantity_required;
          upperLimitQOH = itemInfo.quantity_highest;
          lowerLimitQOH = itemInfo.quantity_lowest;
        }else if(itemUsageAnnualRate.hasOwnProperty(itemID) && itemUsageAnnualRate[itemID] > 0){
          goalQOH = itemUsageAnnualRate[itemID] *goalInventoryMonth/12; // Reverse to find the itemUsageAnnualRate
          console.log("ALSSPARE:: Reverse to find the itemUsageAnnualRate", goalQOH)
          upperLimitQOH = goalQOH*(1+tolerance);
          lowerLimitQOH = goalQOH*(1-tolerance);
        } 
        // console.log("ALSSPARE: itemInfo", itemInfo)

        if (currentQOH <= upperLimitQOH && currentQOH >= lowerLimitQOH){
          numberItemsEqual += 1;
          colorState = 0; // Equal
        } else if (currentQOH > upperLimitQOH){
          numberItemsHigher += 1;
          colorState = 1;
        }else if (currentQOH < upperLimitQOH){
          numberItemsLower += 1;
          colorState = -1;
        }
        if (showInventoryMonth){
          if(itemUsageAnnualRate.hasOwnProperty(itemID) && itemUsageAnnualRate[itemID] > 0){
            results.push({
              name: `Item ${itemID}; currentQOH: ${currentQOH}; goalQOH: ${goalQOH.toFixed(1)}; upperLimitQOH: ${upperLimitQOH.toFixed(1)}; lowerLimitQOH: ${lowerLimitQOH.toFixed(1)}`,
              x: currentQOH/itemUsageAnnualRate[itemID]*12,
              y: goalQOH/itemUsageAnnualRate[itemID]*12,
              colorState,
            })
          }
        }else{
          results.push({
            name: `Item ${itemID}; currentQOH: ${currentQOH}; goalQOH: ${goalQOH.toFixed(1)}; upperLimitQOH: ${upperLimitQOH.toFixed(1)}; lowerLimitQOH: ${lowerLimitQOH.toFixed(1)}`,
            x: currentQOH,
            y: goalQOH,
            colorState,
          })
        }
        
      });
    }
    if (showInventoryMonth){
      results.xAxisLabel = "Inv. Month ปัจจุบัน →";
      results.yAxisLabel = "↑ แผน Inv. Month";
    }else{
      results.xAxisLabel = "QOH ปัจจุบัน →";
      results.yAxisLabel = "↑ แผน QOH";
    }
    
    results.hasComparisonLine = true;
    results.tolerance = tolerance; 

    return {
      numberItemsLower,
      numberItemsEqual,
      numberItemsHigher,
      scatterPlotData: results,
    }
  }

  const reportingPeriodIDSelector = (reportingPeriodIDs) => {
    return reportingPeriodIDs.map(reportingPeriod => reportingPeriod.reporting_period_id); 
  }



  const reportingPeriodIDSelectorLatest = (reportingPeriodIDs) => {
    return Math.max(...reportingPeriodIDs.map(reportingPeriod => reportingPeriod.reporting_period_id), 0); 
  }

  const macroAverageItems = (itemInventoryMonth) => {
    let sum = 0;
    let count = 0;
    let itemsInvalid = []; 
    Object.keys(itemInventoryMonth).map(item_id => {
      if(isFinite(itemInventoryMonth[item_id])){
        sum += itemInventoryMonth[item_id];
        count += 1;
      }else{
        itemsInvalid.push(item_id);
      }
    });
    return {
      macroAverageInventoryMonth: sum/count, 
      itemsInvalid
    };
  }

  const calculateItemInventoryMonth = (itemEndingUnitCount, itemUsageAnnualRate) => {
    let itemInventoryMonth = {}
    // If the itemEndingUnitCount is not undefined
    if (typeof itemEndingUnitCount !== 'undefined') { 
      Object.keys(itemEndingUnitCount).map(item_id => {
        itemInventoryMonth[item_id] = itemEndingUnitCount[item_id]/itemUsageAnnualRate[item_id]*12;
      })
    }
    return itemInventoryMonth;
  }

  const calculateInventoryMonthHistory = (itemEndingUnitCounts, itemUsageAnnualRate) => {
    let itemInventoryMonths = [];
    Object.keys(itemEndingUnitCounts).map( reportingPeriodID => {

      let itemEndingUnitCount = itemEndingUnitCounts[reportingPeriodID];
      let itemInventoryMonth = {}
      Object.keys(itemEndingUnitCount).map(item_id => {
        itemInventoryMonth[item_id] = itemEndingUnitCount[item_id]/itemUsageAnnualRate[item_id]*12;
      })
      itemInventoryMonths.push({
        reportingPeriodID: parseInt(reportingPeriodID),
        itemInventoryMonth
      });
    }); 
    return itemInventoryMonths;
  }

  useEffect (() => {
    if (!isMockup){
      if(fact[FACTS.REPORTING_PERIOD].lastUpdated > 0 &&
        fact[FACTS.ITEM].lastUpdated > 0 
        ){
  
        // 3 Reporting Period IDs
        //    - currentReportingPeriodID         Int      : ReportingPeriodID of the current Date (SELECTED)
        //    - currentYearReportingPeriodIDs    Array[Int] : Array of ReportingPeriodIDs' from [beginYear:now]
        //    - currentWindowReportingPeriodIDs  Array[Int] : Array of ReportingPeriodIDs' from [now-windowSize:now]
        const [currentReportingPeriodID, currentYearReportingPeriodIDs, currentWindowReportingPeriodIDs] = findCurrentReportingPeriods(fact[FACTS.REPORTING_PERIOD], values.year);
        console.log("ALSSPARE:: currentReportingPeriodID:: ", currentReportingPeriodID);
        console.log("ALSSPARE:: currentYearReportingPeriodIDs:: ", currentYearReportingPeriodIDs);
        console.log("ALSSPARE:: currentWindowReportingPeriodIDs:: ", currentWindowReportingPeriodIDs);
  
        let warehouseIDFilter = (values.warehouse_id === '') ? null : [parseInt(values.warehouse_id)];
        let itemIDFilter = (values.item_id === '') ? null : [parseInt(values.item_id)];
        console.log("ALSSPARE:: warehouseIDFilter", warehouseIDFilter);
  
        // Fetch the statistic Goods monthly summary
        fetchStatisticGoodsMonthlySummary( // Beware of Math.min() and Math.max() going to infinity and -infinity 
          Math.min(...currentWindowReportingPeriodIDs.map(reportingPeriod => reportingPeriod.reporting_period_id)) , 
          Math.max(...currentWindowReportingPeriodIDs.map(reportingPeriod => reportingPeriod.reporting_period_id),0 ) ,
          warehouseIDFilter,
          itemIDFilter ,
        )
        .then(  results  => {

          // console.log("ALSSPARE:: findCurrentReportingPeriod", findCurrentReportingPeriod(fact[FACTS.REPORTING_PERIOD].items))
          console.log("ALSSPARE:: fetchStatisticGoodsMonthlySummary", results);
  
          // itemUsageAnnualRate, itemReceiveAnnualRate [Calculated from the current window size]
          var [itemUsageAnnualRate, itemReceiveAnnualRate, itemEndingUnitCounts] = findItemsStats(results, reportingPeriodIDSelector(currentWindowReportingPeriodIDs), warehouseIDFilter, itemIDFilter, true);
  
          // Finding Macro Average of the Inventory Month
          // 1. Find Inventory month of every item by QOH_current/InventoryUsageRate_item * 12
          //    (QOH_current should be found by the latest reporting period id of that particular year)
          // 2. Find Macro Average by summing all InventoryMonth_item/#Items
          console.log("ALSSPARE:: itemAnnualEndingUnitCount ", itemEndingUnitCounts)
          console.log("ALSSPARE:: itemUsageAnnualRate ", itemUsageAnnualRate)
          let itemInventoryMonth = calculateItemInventoryMonth(itemEndingUnitCounts[currentReportingPeriodID.reporting_period_id], itemUsageAnnualRate);
          console.log("ALSSPARE:: itemInventoryMonth ", itemInventoryMonth)
          let {macroAverageInventoryMonth, itemsInvalid} = macroAverageItems(itemInventoryMonth);
          // Set MacroAverageInventoryMonth on the UI
          setMacroAverageInventoryMonthUI(macroAverageInventoryMonth);
          console.log("ALSSPARE:: macroAverageInventoryMonth ", macroAverageInventoryMonth)

          // Set MacroAverageInventoryMonth for each reporting period ID using the same itemUsageAnnualRate (this should be changed to each window size to get the same report each time, but too many queries!! -- or just use quantity [but will lose information about the relative against usage rate])
          let macroAverageInventoryMonthHistory = calculateInventoryMonthHistory(itemEndingUnitCounts, itemUsageAnnualRate);
          macroAverageInventoryMonthHistory = macroAverageInventoryMonthHistory.map(({reportingPeriodID, itemInventoryMonth}) => {
            let {macroAverageInventoryMonth, itemsInvalid} = macroAverageItems(itemInventoryMonth);
            return ({
              reportingPeriodID, 
              reportingPeriod: currentWindowReportingPeriodIDs.find(reportingPeriod => reportingPeriod.reporting_period_id===reportingPeriodID),
              macroAverageInventoryMonth 
            })
          })
          console.log("ALSSPARE:: macroAverageInventoryMonthHistory ", macroAverageInventoryMonthHistory)
          let lineGraphData = lineGraphSelector(macroAverageInventoryMonthHistory);
          console.log("ALSSPARE:: lineGraphData ", lineGraphData)
          setIVMonthData(lineGraphData);

  
          // Set Diverging Bar Graph Data:: For only Current Year Filter
          var [itemUsageYear, itemReceiveYear, _] = findItemsStats(results, reportingPeriodIDSelector(currentYearReportingPeriodIDs), warehouseIDFilter, itemIDFilter, false);
          var barDivergingGraphData = divergingBarSelector(itemUsageYear, itemReceiveYear, fact[FACTS.ITEM]);
          setBarDivergingGraphData(barDivergingGraphData);
  
          // Set numberItemsLower, numberItemsEqual , numberItemsHigher , scatterPlotData
          var {numberItemsLower, numberItemsEqual , numberItemsHigher , scatterPlotData} = checkItemsQOHCompliance(itemEndingUnitCounts[currentReportingPeriodID.reporting_period_id], itemUsageAnnualRate, itemInventoryMonth, fact[FACTS.ITEM]);
          setNumberItemsLowerUI(numberItemsLower);
          setNumberItemsEqualUI(numberItemsEqual);
          setNumberItemsHigherUI(numberItemsHigher);
          setScatterPlotData(scatterPlotData);

          console.log("ALSSPARE:: item stats:: ", itemUsageYear, itemReceiveYear)
        })
      }
    }else{ //isMockup!!
      mockupData();
    }
    
  }, [fact[FACTS.REPORTING_PERIOD].lastUpdated, fact[FACTS.ITEM].lastUpdated, values.year, values.warehouse_id, values.item_id, isMockup])

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
                      value={`${macroAverageInventoryMonthUI.toFixed(1)} เดือน `}
                    />
                  </div>
                </div>

                <div className="row_bootstrap no-gutters">
                  <div className="col-4">
                    <SimpleGrayCardComponent
                      name="อะไหล่ต่ำกว่าเกณฑ์"
                      value={numberItemsLowerUI}
                    />
                  </div>
                  <div className="col-4">
                    <SimpleGrayCardComponent
                      name="อะไหล่ตามเกณฑ์"
                      value={numberItemsEqualUI}
                    />
                  </div>
                  <div className="col-4">
                    <SimpleGrayCardComponent
                      name="อะไหล่สูงกว่าเกณฑ์"
                      value={numberItemsHigherUI}
                    />
                  </div>
                </div>

                {/* <LineGraph /> */}
              </div>

              {/* === Current Inventory Month vs Planned Inventory Month Scatter Plot :1st Row, 2nd Column === */}
              <div className="col-4">
                <ScatterPlot
                  title="QOH ปัจจุบัน vs. แผนของแต่ละอะไหล่"
                  data={scatterPlotData}
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
                      fontWeight:600}}>
                        {`อะไหล่ ${values.item_id === '' ? 'ทั้งหมด' : `${getItemInternalIDfromItemID(fact[FACTS.ITEM], values.item_id)} | ${getItemNamefromItemID(fact[FACTS.ITEM], values.item_id)}`}`}
                    </h5>
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
    year: 2020,
    warehouse_id: '',
    item_id: '',
    goal_inventory_month: 6,
  })
})(AlsSpareComponent);

export default EnhancedAlsSpareComponent;
