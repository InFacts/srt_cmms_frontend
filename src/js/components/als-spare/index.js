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
import { fetchPositionPermissionData, changeTheam , fetchStatisticGoodsMonthlySummary,fetchStatisticGoodsOnhand,
  getItemInternalIDfromItemID, getItemNamefromItemID, getItemIDFromInternalItemID} from '../../helper.js';
import { FACTS } from '../../redux/modules/api/fact.js';

const AlsSpareComponent = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.token.isLoggedIn);
  const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
  const {values, setFieldValue} = useFormikContext();

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

  const [itemSpecificIssueAccuUI, setItemSpecificIssueAccuUI] = useState(0);
  const [itemSpecificIssueRateUI, setItemSpecificIssueRateUI] = useState(0);
  const [itemSpecificReceiveAccuUI, setItemSpecificReceiveAccuUI] = useState(0);
  const [itemSpecificReceiveRateUI, setItemSpecificReceiveRateUI] = useState(0);

  const [itemSpecificCurrentQOHUI, setItemSpecificCurrentQOHUI] = useState(0);
  const [itemSpecificGoalQOHUI, setItemSpecificGoalQOHUI] = useState(0);
  const [itemSpecificCurrentIVMonthUI, setItemSpecificCurrentIVMonthUI] = useState(0);
  const [itemSpecificGoalIVMonthUI, setItemSpecificGoalIVMonthUI] = useState(0);
  const [itemSpecificCurrentTORateUI, setItemSpecificCurrentTORateUI] = useState(0);
  const [itemSpecificGoalTORateUI, setItemSpecificGoalTORateUI] = useState(0);

  const [itemSpecificMultiLineIssueReceiptData, setItemSpecificMultiLineIssueReceiptData] = useState({
    dates: [],
    series: [],
  });
  const [itemSpecificMultiLineIVMonthData, setItemSpecificMultiLineIVMonthData] = useState({
    dates: [],
    series: [],
  });
  const [itemSpecificMultiLineIVTORateData, setItemSpecificMultiLineIVTORateData] = useState({
    dates: [],
    series: [],
  });

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
  //    - isCurrentYear                    Boolean    : to show that this is the current year or not
  const findCurrentReportingPeriods = (reportingPeriodFact, selectedYear, windowSize=2) => {
    var isCurrentYear = true;
    var today = new Date();
    if (selectedYear < today.getFullYear()){
      today = new Date(selectedYear, 11, 31);
      isCurrentYear = false;
    }

    let reportingPeriods = reportingPeriodFact.items;

    // Find currentReportingPeriodID => Get the reportingPeriod that is in between the start and end date
    var currentReportingPeriodID = reportingPeriods.find(reportingPeriod => 
      today.getTime() >= new Date(sneakyAddUTC7ToDate(reportingPeriod.start_datetime)).getTime() &&
      today.getTime() <= new Date(sneakyAddUTC7ToDate(reportingPeriod.end_datetime)).getTime() 
    ) || {};

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

    return {currentReportingPeriodID, currentYearReportingPeriodIDs, currentWindowReportingPeriodIDs, isCurrentYear};
  }


  const findItemsStats = (stats, reportingPeriodFilter, currentReportingPeriodID, isCurrentYear, warehouseIDFilter=null, itemIDFilter=null, annualAverage=false) => {
    // This assumes that the reporting period ID is populated over all item/warehouses, 

    // Used as a dictionary to map between item_id -> summation of state_out (qty)
    var itemUsageRate = {}; 
    // Used as a dictionary to map between item_id -> summation of state_in (qty)
    var itemReceiveRate = {}; 

    // var latestReportingPeriodID = Math.max(...reportingPeriodFilter); // Use the latest reporting period to find QOH_current
    // Used as a dictionary to map between item_id -> summation of unit count (qty)
    var itemEndingUnitCount = {}; 

    for (var result of stats) {

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
      // If it is the current year and is the current reporting period, need to set current_unit_count
      if (isCurrentYear && result.reporting_period_id === currentReportingPeriodID){
        if (itemEndingUnitCount.hasOwnProperty(result.reporting_period_id)){
          if (itemEndingUnitCount[result.reporting_period_id].hasOwnProperty(result.item_id)){
            itemEndingUnitCount[result.reporting_period_id][result.item_id] += result.current_unit_count;
          }else{
            itemEndingUnitCount[result.reporting_period_id][result.item_id] = result.current_unit_count;
          }
        }else{
          itemEndingUnitCount[result.reporting_period_id] = {
            [result.item_id] : result.current_unit_count
          };
        }

      }else{
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
        date: new Date(sneakyAddUTC7ToDate(items.reportingPeriod.end_datetime)),
        inventory_month: items.macroAverageInventoryMonth,
      });
    }
    results.sort((a,b) => {return b.date - a.date }); // sort the dates for sureness
    return results;
  }

  const calculateTORateFromIVMonth = (inventoryMonth) => {
    return 1/inventoryMonth*12;
  }


  // Selects the data for the multi line graph https://observablehq.com/@d3/multi-line-chart
  // {
  //    y: ylabel
  //    series: Array[  {name: xname , values: Array(166)},  {name: xname , values: Array(166)}, ...]
  //    dates: Array(166) [...] 
  // }
  const multilineGraphSelector = (totalWindowStats, itemUsageAnnualRate, currentYearReportingPeriodIDs, currentReportingPeriodID, isCurrentYear, warehouseIDFilter=null, itemIDFilter = null, DELIMITER = "@@") => {
    let multilineIssueReceiptData = {}, multilineIVMonthData = {}, multilineIVTORateData = {};
    multilineIssueReceiptData.y = "จำนวนอะไหล่";
    multilineIVMonthData.y = "Inventory Month"; 
    multilineIVTORateData.y = "Inventory Turnover Rate";

    let dates = currentYearReportingPeriodIDs.map(reportingPeriod => new Date(sneakyAddUTC7ToDate(reportingPeriod.end_datetime)));
    multilineIssueReceiptData.dates = [...dates];
    multilineIVMonthData.dates = [...dates];
    multilineIVTORateData.dates = [...dates];

    multilineIssueReceiptData.series = [
      {
        name: "นำเข้า",
        values: dates.map( (date,index) => {
          return totalWindowStats
            .filter(element => element.reporting_period_id === currentYearReportingPeriodIDs[index].reporting_period_id
              && (warehouseIDFilter === null || warehouseIDFilter.includes(element.warehouse_id)) 
              && (itemIDFilter === null || itemIDFilter.includes(element.item_id))
            )
            .reduce((previousValue, currentValue) => {
              return previousValue + currentValue.receive_unit_count;
            }, 0); 
        })
      },
      {
        name: "นำออก",
        values: dates.map( (date,index) => {
          return totalWindowStats
            .filter(element => element.reporting_period_id === currentYearReportingPeriodIDs[index].reporting_period_id
              && (warehouseIDFilter === null || warehouseIDFilter.includes(element.warehouse_id)) 
              && (itemIDFilter === null || itemIDFilter.includes(element.item_id))
            )
            .reduce((previousValue, currentValue) => {
              return previousValue + currentValue.issue_unit_count;
            }, 0); 
        })
      }
    ];


    var QOHValues = [], IVMonthValues = [], TORateValues = [];

    dates.map((date, index) => {
      var itemEndingUnitCount = {};

      totalWindowStats
        .filter(element => element.reporting_period_id === currentYearReportingPeriodIDs[index].reporting_period_id
          && (warehouseIDFilter === null || warehouseIDFilter.includes(element.warehouse_id)) 
          && (itemIDFilter === null || itemIDFilter.includes(element.item_id))
        )
        .map(element => {
          if (isCurrentYear && currentYearReportingPeriodIDs[index].reporting_period_id === currentReportingPeriodID){
            itemEndingUnitCount[`${element.warehouse_id}${DELIMITER}${element.item_id}`] = element.current_unit_count;
          }else{
            itemEndingUnitCount[`${element.warehouse_id}${DELIMITER}${element.item_id}`] = element.ending_unit_count;
          }
        }); 

      QOHValues.push(sumObjectValues(itemEndingUnitCount)); 
      
      var itemEndingUnitCountAggItem =  aggregateItemFromItemEndingUnitCount(itemEndingUnitCount);
      
      var itemSpecificInventoryMonth = calculateItemInventoryMonth(
        itemEndingUnitCountAggItem, 
        itemUsageAnnualRate,
      );

      let {macroAverageInventoryMonth} = macroAverageItems(itemSpecificInventoryMonth);

      IVMonthValues.push(macroAverageInventoryMonth);
      TORateValues.push(calculateTORateFromIVMonth(macroAverageInventoryMonth))
    });

    multilineIVMonthData.series = [
      {
        name: "QOH",
        // values: dates.map((date, index) => {
        //   return  totalWindowStats
        //     .filter(element => element.reporting_period_id === currentYearReportingPeriodIDs[index].reporting_period_id
        //       && (warehouseIDFilter === null || warehouseIDFilter.includes(element.warehouse_id)) 
        //       && (itemIDFilter === null || itemIDFilter.includes(element.item_id))
        //     )
        //     .reduce((previousValue, currentValue) => {
        //       if (isCurrentYear && currentYearReportingPeriodIDs[index].reporting_period_id === currentReportingPeriodID){
        //         return previousValue + currentValue.current_unit_count;
        //       }else{
        //         return previousValue + currentValue.ending_unit_count;
        //       }
              
        //     }, 0) 
        // })
        values: QOHValues
      },
      {
        name: "Inventory Month",
        values: IVMonthValues
      }
    ];

    multilineIVTORateData.series = [
      {
        name: "Inventory Turnover Rate",
        values: TORateValues
      }
    ]
    console.log("ALSSPARE:: itemMultiLineQOHValues ", QOHValues)
    console.log("ALSSPARE:: itemMultiLine IV MONTH ", IVMonthValues)
    console.log("ALSSPARE:: itemMultiLine ITORateValues ", TORateValues)


    return {multilineIssueReceiptData,multilineIVMonthData,multilineIVTORateData};
  }



  const itemEndingUnitCountSelector = (totalWindowStats,  currentReportingPeriodID, isCurrentYear, warehouseIDFilter=null, itemIDFilter = null, DELIMITER = "@@") => {
    var itemEndingUnitCount = {};

    totalWindowStats
      .filter(element => element.reporting_period_id === currentReportingPeriodID 
        && (warehouseIDFilter === null || warehouseIDFilter.includes(element.warehouse_id)) 
        && (itemIDFilter === null || itemIDFilter.includes(element.item_id))
      )
      .map(element => {
        if (isCurrentYear){
          itemEndingUnitCount[`${element.warehouse_id}${DELIMITER}${element.item_id}`] = element.current_unit_count;
        }else{
          itemEndingUnitCount[`${element.warehouse_id}${DELIMITER}${element.item_id}`] = element.ending_unit_count;
        }
      }); 
    return itemEndingUnitCount;
  }

  // Priorities
  // 1. If not null, Check if it complies with the itemFact's quantity_lowest(pin):null; quantity_highest(pin):null; quantity_required(pin):null
  // 2. If there is itemInventoryMonth, Check if it complies with InventoryMonth: 6 [itemUsage > 0]
  // 3. If nothing, Check if it is more than 1 QOH unit [default Goal since no itemUsage to reference]
  // Return: goalQOH, upperLimitQOH, lowerLimitQOH
  //         goalIVMonth,
  //         goalTORate  
  const findItemGoalQOH = (itemID, itemFact, itemUsageAnnualRate, goalInventoryMonth=6, tolerance=0.1) => {

    let itemInfo = itemFact.items.find(item => `${item.item_id}` === `${itemID}`);

    let goalQOH = 1;
    let upperLimitQOH = goalQOH*(1+tolerance);
    let lowerLimitQOH = goalQOH*(1-tolerance);
    let goalIVMonth = "N/A";
    let goalTORate = "N/A"; 

    if (itemInfo.quantity_highest && itemInfo.quantity_lowest && itemInfo.quantity_required){
      // console.log("ALSSPARE:: itemInfo", itemInfo.quantity_highest, itemInfo.quantity_lowest, itemInfo.quantity_required)
      goalQOH = itemInfo.quantity_required;
      upperLimitQOH = itemInfo.quantity_highest;
      lowerLimitQOH = itemInfo.quantity_lowest;
    }else if(itemUsageAnnualRate.hasOwnProperty(itemID) && itemUsageAnnualRate[itemID] > 0){
      goalQOH = itemUsageAnnualRate[itemID] *goalInventoryMonth/12; // Reverse to find the itemUsageAnnualRate
      // console.log("ALSSPARE:: Reverse to find the itemUsageAnnualRate", goalQOH)
      upperLimitQOH = goalQOH*(1+tolerance);
      lowerLimitQOH = goalQOH*(1-tolerance);
    } 

    if (itemUsageAnnualRate.hasOwnProperty(itemID)){
      goalIVMonth = goalQOH/itemUsageAnnualRate[itemID] * 12;
      goalTORate = itemUsageAnnualRate[itemID]/goalQOH; 
    }

    return {goalQOH, upperLimitQOH, lowerLimitQOH, goalIVMonth, goalTORate};

  }

  
  //
  // Also export data to scatter plot
  // [...Array(500)].map((e, i) => ({
      //     name: `Item ${i}`,
      //     x: Math.random() * 40,
      //     y: Math.random() * 40,
        
      // }));
  const checkItemsQOHCompliance = (totalWindowStats, currentReportingPeriodID, isCurrentYear, itemUsageAnnualRate, itemInventoryMonth, warehouseIDSourcesFilter, itemFact , goalInventoryMonth=6, tolerance=0.1, showInventoryMonth = false) => {


    var numberItemsLower = 0, numberItemsEqual= 0,numberItemsHigher =0;
    let results = [];

    const DELIMITER = "@@";
    // convert totalWindowStats to itemEndingUnitCount
    var itemEndingUnitCount = itemEndingUnitCountSelector(totalWindowStats, currentReportingPeriodID, isCurrentYear,warehouseIDSourcesFilter, null,  DELIMITER);
    console.log("ALSSPARE:: THIS IS ITEM ENDING UNIT COUNT itemEndingUnitCount ", itemEndingUnitCount);


    // If the itemEndingUnitCount is not undefined
    if (typeof itemEndingUnitCount !== 'undefined') {  
      Object.keys(itemEndingUnitCount).map(key => {
        var [warehouseID, itemID] = key.split(DELIMITER);

        let currentQOH = itemEndingUnitCount[key];
        let colorState = 0; // -1 for Lower, 0 for Equal , 1 for Higher
    
        var {goalQOH, upperLimitQOH, lowerLimitQOH} = findItemGoalQOH(itemID, itemFact, itemUsageAnnualRate, goalInventoryMonth, tolerance);


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
              name: `Warehouse ${warehouseID} Item ${itemID}; currentQOH: ${currentQOH}; goalQOH: ${goalQOH.toFixed(1)}; upperLimitQOH: ${upperLimitQOH.toFixed(1)}; lowerLimitQOH: ${lowerLimitQOH.toFixed(1)}`,
              x: currentQOH/itemUsageAnnualRate[itemID]*12,
              y: goalQOH/itemUsageAnnualRate[itemID]*12,
              colorState,
            })
          }
        }else{
          results.push({
            name: `Warehouse ${warehouseID} Item ${itemID}; currentQOH: ${currentQOH}; goalQOH: ${goalQOH.toFixed(1)}; upperLimitQOH: ${upperLimitQOH.toFixed(1)}; lowerLimitQOH: ${lowerLimitQOH.toFixed(1)}`,
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

  const sumObjectValues = (obj) => {
    if (typeof obj !== 'undefined'){
      return Object.keys(obj).reduce((prevValue, nextValue) => prevValue + obj[nextValue], 0);
    }
    return 0;
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

  // Output: array of warehouse_id's that are the "sources" (To filter for topbar scatter)
  const warehouseIDSourcesSelector = (warehouseFact) => {
    const WAREHOUSE_TYPE_SOURCE = [1,2,4]; //1	คลังพัสดุกลางบางซื่อ; 2	คลังอื่นๆ; 3	คลังของตอน; 4	คลังเชียงราก
    return warehouseFact.items
      .filter(warehouse => WAREHOUSE_TYPE_SOURCE.includes(warehouse.warehouse_type_id))
      .map(warehouse => warehouse.warehouse_id);
  }

  // Combine both statisticGoodsMonthlySummary and statisticGoodsOnhand
  // Combine the results of the 2 statistics by adding the current reporting period
  const combineStatisticGoods = (statisticGoodsMonthlySummary, statisticGoodsOnhand, currentReportingPeriodID) => {
    var totalWindowStats = [];
    for (var element of statisticGoodsMonthlySummary){
      totalWindowStats.push({...element});
    }
    for (var element of statisticGoodsOnhand){
      totalWindowStats.push({reporting_period_id: currentReportingPeriodID, ...element});
    }
    return totalWindowStats;
  } 

  const aggregateItemFromItemEndingUnitCount = (itemSpecificEndingUnitCount, DELIMITER="@@") => {
    let itemSpecificEndingUnitCountAggItem = {}
    for (var key in itemSpecificEndingUnitCount){
      var [warehouseID, itemID] = key.split(DELIMITER);

      if (itemSpecificEndingUnitCountAggItem.hasOwnProperty(itemID)){
        itemSpecificEndingUnitCountAggItem[itemID] += itemSpecificEndingUnitCount[key];
      }else{
        itemSpecificEndingUnitCountAggItem[itemID] = itemSpecificEndingUnitCount[key];
      }
    }
    return itemSpecificEndingUnitCountAggItem;
  }

  const handleClickInternalItemID = (internalItemID) => {
    setFieldValue("item_id", getItemIDFromInternalItemID(fact[FACTS.ITEM], internalItemID));
  }

  
  useEffect (() => {
    async function mainFetchAndUpdateData() {
      if (!isMockup){
        if(fact[FACTS.REPORTING_PERIOD].lastUpdated > 0 &&
          fact[FACTS.ITEM].lastUpdated > 0 
          ){
    
          // 3 Reporting Period IDs
          //    - currentReportingPeriodID         Int      : ReportingPeriodID of the current Date (SELECTED)
          //    - currentYearReportingPeriodIDs    Array[Int] : Array of ReportingPeriodIDs' from [beginYear:now]
          //    - currentWindowReportingPeriodIDs  Array[Int] : Array of ReportingPeriodIDs' from [now-windowSize:now]
          //    - isCurrentYear                    Boolean    : to show that this is the current year or not
          const {currentReportingPeriodID, currentYearReportingPeriodIDs, currentWindowReportingPeriodIDs, isCurrentYear} = findCurrentReportingPeriods(fact[FACTS.REPORTING_PERIOD], values.year);
          console.log("ALSSPARE:: currentReportingPeriodID:: ", currentReportingPeriodID);
          console.log("ALSSPARE:: currentYearReportingPeriodIDs:: ", currentYearReportingPeriodIDs);
          console.log("ALSSPARE:: currentWindowReportingPeriodIDs:: ", currentWindowReportingPeriodIDs);
          console.log("ALSSPARE:: isCurrentYear:: ", isCurrentYear);
    
          let warehouseIDFilter = (values.warehouse_id === '') ? null : [parseInt(values.warehouse_id)];
          let itemIDFilter = (values.item_id === '') ? null : [parseInt(values.item_id)];
          console.log("ALSSPARE:: warehouseIDFilter", warehouseIDFilter);
          
          let itemStatusIDFilter = 1; // Always new!!!
          let warehouseIDSourcesFilter = warehouseIDSourcesSelector(fact[FACTS.WAREHOUSES]);
    
          // 1. Combine the results of Goods Monthly Summary (Filter out the currentReportingPeriodID) and Goods Onhand (Only currentReportingPeriodID)
          var totalWindowStats = [];
        
          if (isCurrentYear){
            // 1.1 Fetch the statistic Goods monthly summary (WITHOUT the current Reporting ID) AND statisticGoodsOnhand (for current Reporting ID by asynchronous await)
            let [statisticGoodsMonthlySummary, statisticGoodsOnhand] = await Promise.all([
              fetchStatisticGoodsMonthlySummary( // Beware of Math.min() and Math.max() going to infinity and -infinity 
                Math.min(...currentWindowReportingPeriodIDs
                  .map(reportingPeriod => parseInt(reportingPeriod.reporting_period_id))
                  .filter(reportingPeriodID => reportingPeriodID!==currentReportingPeriodID.reporting_period_id)) , 
                Math.max(...currentWindowReportingPeriodIDs
                  .map(reportingPeriod => parseInt(reportingPeriod.reporting_period_id))
                  .filter(reportingPeriodID => reportingPeriodID!==currentReportingPeriodID.reporting_period_id),0 ) ,
                // warehouseIDFilter,
                null, // WAREHOUSE FILTER CANT BE USED HERE BECAUSE OF TOP bar -> need to summaiton of everything
                itemIDFilter ,
                itemStatusIDFilter,
              ),
              fetchStatisticGoodsOnhand(
                null, // WAREHOUSE FILTER CANT BE USED HERE BECAUSE OF TOP bar -> need to summaiton of everything
                itemIDFilter,
                itemStatusIDFilter,
              )
            ]);
            console.log("ALSSPARE:: statisticGoodsMonthlySummary", statisticGoodsMonthlySummary);
            console.log("ALSSPARE:: statisticGoodsOnhand", statisticGoodsOnhand);
            // 1.2 Combine the results of the 2 statistics by adding the current reporting period  if isCurrentYear
            totalWindowStats = combineStatisticGoods(statisticGoodsMonthlySummary, statisticGoodsOnhand, currentReportingPeriodID.reporting_period_id); 
          }else{
            // 1.1 Fetch the statistic Goods monthly summary (WITHOUT the current Reporting ID)
            let [statisticGoodsMonthlySummary] = await Promise.all([
              fetchStatisticGoodsMonthlySummary( // Beware of Math.min() and Math.max() going to infinity and -infinity 
                Math.min(...currentWindowReportingPeriodIDs
                  .map(reportingPeriod => parseInt(reportingPeriod.reporting_period_id))
                  .filter(reportingPeriodID => reportingPeriodID!==currentReportingPeriodID.reporting_period_id)) , 
                Math.max(...currentWindowReportingPeriodIDs
                  .map(reportingPeriod => parseInt(reportingPeriod.reporting_period_id))
                  .filter(reportingPeriodID => reportingPeriodID!==currentReportingPeriodID.reporting_period_id),0 ) ,
                // warehouseIDFilter,
                null, // WAREHOUSE FILTER CANT BE USED HERE BECAUSE OF TOP bar -> need to summaiton of everything
                itemIDFilter ,
                itemStatusIDFilter,
              )
            ]);
            console.log("ALSSPARE:: statisticGoodsMonthlySummary", statisticGoodsMonthlySummary);
            // 1.2 Let the totalWindowStats be the monthly Summary
            totalWindowStats = statisticGoodsMonthlySummary;
          }
          totalWindowStats = totalWindowStats.filter(element => element.warehouse_id !== 999);
          console.log("ALSSPARE:: totalWindowStats", totalWindowStats);
          
          // Calculate GLOBAL Usage Annual Rate and Receive Annual Rate from the current window size (used for Inventory Month)
          // itemUsageAnnualRate, itemReceiveAnnualRate [Calculated from the current window size]
          var [itemUsageAnnualRate, itemReceiveAnnualRate, itemEndingUnitCounts] = findItemsStats(
            totalWindowStats, 
            reportingPeriodIDSelector(currentWindowReportingPeriodIDs), 
            currentReportingPeriodID.reporting_period_id,  // To check for the current reporting period if it is current year 
            isCurrentYear, // Current year will not have ending unit count!!!
            null, // warehouse ID filter is null, because we want to select Usage and Receive 
            itemIDFilter, 
            true, // Annual Average True
          );

          // Finding Macro Average of the Inventory Month
          // 1. Find Inventory month of every item by QOH_current/InventoryUsageRate_item * 12
          //    (QOH_current should be found by the latest reporting period id of that particular year)
          // 2. Find Macro Average by summing all InventoryMonth_item/#Items
          console.log("ALSSPARE:: itemAnnualEndingUnitCount ", itemEndingUnitCounts)
          console.log("ALSSPARE:: itemUsageAnnualRate ", itemUsageAnnualRate)
          let itemInventoryMonth = calculateItemInventoryMonth(
            itemEndingUnitCounts[currentReportingPeriodID.reporting_period_id], 
            itemUsageAnnualRate,
          );
          console.log("ALSSPARE:: itemInventoryMonth ", itemInventoryMonth)
          let {macroAverageInventoryMonth, itemsInvalid} = macroAverageItems(itemInventoryMonth);
          // Set MacroAverageInventoryMonth on the UI
          setMacroAverageInventoryMonthUI(macroAverageInventoryMonth);

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

          // Set numberItemsLower, numberItemsEqual , numberItemsHigher , scatterPlotData
          var {numberItemsLower, numberItemsEqual , numberItemsHigher , scatterPlotData} = checkItemsQOHCompliance(
            totalWindowStats, 
            currentReportingPeriodID.reporting_period_id,  // To check for the current reporting period if it is current year 
            isCurrentYear, // Current year will not have ending unit count!!!
            itemUsageAnnualRate, 
            itemInventoryMonth, 
            warehouseIDSourcesFilter,
            fact[FACTS.ITEM],
            6,  // Goal Inventory Month
            0.1, // Tolerance 
            false, // showInventory Month?
          );
          setNumberItemsLowerUI(numberItemsLower);
          setNumberItemsEqualUI(numberItemsEqual);
          setNumberItemsHigherUI(numberItemsHigher);
          setScatterPlotData(scatterPlotData);



          // FOR LOWER PART OF THE GRAPHS
          // Set Diverging Bar Graph Data:: For only Current Year Filter
          var [itemUsageYear, itemReceiveYear, _] = findItemsStats(
            totalWindowStats, 
            reportingPeriodIDSelector(currentYearReportingPeriodIDs), 
            currentReportingPeriodID.reporting_period_id,  // To check for the current reporting period if it is current year 
            isCurrentYear, // Current year will not have ending unit count!!!
            warehouseIDFilter, 
            itemIDFilter, 
            false,
          );
          var barDivergingGraphData = divergingBarSelector(itemUsageYear, itemReceiveYear, fact[FACTS.ITEM]);
          setBarDivergingGraphData(barDivergingGraphData);



          // Finally, Set the Item Specific Information
          // 1. IssueAccu and Receive Accu (This year)
          var itemSpecificIssueAccu = sumObjectValues(itemUsageYear).toFixed(0); 
          var itemSpecificReceiveAccu = sumObjectValues(itemReceiveYear).toFixed(0);

          // 2. IssueRate and ReceiveRate (WindowSize)
          var itemSpecificIssueRate = sumObjectValues(itemUsageAnnualRate).toFixed(0);
          var itemSpecificReceiveRate = sumObjectValues(itemReceiveAnnualRate).toFixed(0);

          // 3. QOH current and QOH Goal
          // 4. Inventory Month current and Inventory Month Goal
          // 5. Inventory Turnover Rate Current and Inventory Turnover Rate Goal

          // itemSpecificEndingUnitCount -> Get unit count of the latest year where itemSpecificEndingUnitCount[{warehouseID}@@{itemID}] -> unit count
          var itemSpecificEndingUnitCount = itemEndingUnitCountSelector(totalWindowStats,  currentReportingPeriodID.reporting_period_id, isCurrentYear, warehouseIDFilter, itemIDFilter);
          console.log("ALSSPARE:: itemSpecificEndingUnitCount ", itemSpecificEndingUnitCount)

          var itemSpecificCurrentQOH = sumObjectValues(itemSpecificEndingUnitCount).toFixed(0); 

          var itemSpecificEndingUnitCountAggItem =  aggregateItemFromItemEndingUnitCount(itemSpecificEndingUnitCount);
          console.log("ALSSPARE:: itemSpecificEndingUnitCountAggItem ", itemSpecificEndingUnitCountAggItem);
          var itemSpecificInventoryMonth = calculateItemInventoryMonth(
            itemSpecificEndingUnitCountAggItem, 
            itemUsageAnnualRate,
          );
          console.log("ALSSPARE:: itemSpecificInventoryMonth ", itemSpecificInventoryMonth);
          var macroAverageInventoryMonthDict = macroAverageItems(itemSpecificInventoryMonth);

          var itemSpecificCurrentIVMonth = macroAverageInventoryMonthDict.macroAverageInventoryMonth.toFixed(1);
          var itemSpecificCurrentTORate  = (1/macroAverageInventoryMonthDict.macroAverageInventoryMonth*12).toFixed(2);


          var itemSpecificGoalQOH, itemSpecificGoalIVMonth, itemSpecificGoalTORate;
          if (itemIDFilter !== null){
            var {goalQOH, upperLimitQOH, lowerLimitQOH,  goalIVMonth, goalTORate} = findItemGoalQOH(itemIDFilter, fact[FACTS.ITEM], itemUsageAnnualRate);
            itemSpecificGoalQOH= goalQOH;
            itemSpecificGoalIVMonth = (typeof goalIVMonth ==='string') ? goalIVMonth : goalIVMonth.toFixed(1);
            itemSpecificGoalTORate = (typeof goalTORate ==='string') ? goalTORate :goalTORate.toFixed(2);
          }else{
            itemSpecificGoalQOH =  "N/A";
            itemSpecificGoalIVMonth = "N/A";
            itemSpecificGoalTORate = "N/A";
          }

          setItemSpecificIssueAccuUI(itemSpecificIssueAccu);
          setItemSpecificReceiveAccuUI(itemSpecificReceiveAccu);
          setItemSpecificIssueRateUI(itemSpecificIssueRate);
          setItemSpecificReceiveRateUI(itemSpecificReceiveRate);
          setItemSpecificCurrentQOHUI(itemSpecificCurrentQOH);
          setItemSpecificGoalQOHUI(itemSpecificGoalQOH);
          setItemSpecificCurrentIVMonthUI(itemSpecificCurrentIVMonth); 
          setItemSpecificGoalIVMonthUI(itemSpecificGoalIVMonth);
          setItemSpecificCurrentTORateUI(itemSpecificCurrentTORate); 
          setItemSpecificGoalTORateUI(itemSpecificGoalTORate);


          // 3 Lower Graphs
          var {multilineIssueReceiptData,multilineIVMonthData,multilineIVTORateData} = multilineGraphSelector(totalWindowStats,itemUsageAnnualRate, currentYearReportingPeriodIDs, currentReportingPeriodID.reporting_period_id, isCurrentYear, warehouseIDFilter, itemIDFilter);
          setItemSpecificMultiLineIssueReceiptData(multilineIssueReceiptData);
          setItemSpecificMultiLineIVMonthData(multilineIVMonthData);
          setItemSpecificMultiLineIVTORateData(multilineIVTORateData);

         
        }
      }else{ //isMockup!!
        mockupData();
      }
    }
    mainFetchAndUpdateData();
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
                      style={{color:"red"}}
                      name="อะไหล่ต่ำกว่าเกณฑ์"
                      value={numberItemsLowerUI}
                    />
                  </div>
                  <div className="col-4">
                    <SimpleGrayCardComponent
                    style={{color:"green"}}
                      name="อะไหล่ตามเกณฑ์"
                      value={numberItemsEqualUI}
                    />
                  </div>
                  <div className="col-4">
                    <SimpleGrayCardComponent
                    style={{color:"orange"}}
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
                    marginLeft: 37,
                    marginRight: 17,
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
                  handleClickInternalItemID={handleClickInternalItemID}
                  chartSettings={{
                    marginLeft: 20,
                    marginBottom: 10,
                    marginTop: 40,
                    marginRight: 10,

                    height: 550,
                  }}
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
                          data={itemSpecificMultiLineIssueReceiptData}
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
                          data={itemSpecificMultiLineIVMonthData}
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
                          data={itemSpecificMultiLineIVTORateData}
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
                          name1="จำนวนนำออก"
                          value1={`${itemSpecificIssueAccuUI}`}
                          name2="จำนวนนำเข้า"
                          value2={`${itemSpecificReceiveAccuUI}`}
                        />
                      </div>
                    </div>
                    <div className="row_bootstrap no-gutters">
                      <div className="col-12">
                        <SimpleCard2ValuesComponent
                          name1="อัตราการนำออก"
                          value1={`${itemSpecificIssueRateUI}/ปี`}
                          name2="อัตราการนำเข้า"
                          value2={`${itemSpecificReceiveRateUI}/ปี`}
                        />
                      </div>
                    </div>
                    <div className="row_bootstrap no-gutters">
                      <div className="col-12">
                        <SimpleCard2ValuesComponent
                          name1="คงคลัง ปัจจุบัน"
                          value1={itemSpecificCurrentQOHUI}
                          name2="คงคลังเป้าหมาย"
                          value2={itemSpecificGoalQOHUI}

                        />
                        <SimpleCard2ValuesComponent
                          name1="Iv. Month ปัจจุบัน"
                          value1={itemSpecificCurrentIVMonthUI}
                          name2="Iv. Month เป้าหมาย"
                          value2={itemSpecificGoalIVMonthUI}
                        />
                      </div>
                    </div>
                    <div className="row_bootstrap no-gutters">
                      <div className="col-12">
                        <SimpleCard2ValuesComponent
                          name1="Turnover Rate ปัจจุบัน"
                          value1={itemSpecificCurrentTORateUI}
                          name2="Turnover Rate เป้าหมาย"
                          value2={itemSpecificGoalTORateUI}
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
    window_size: 2,
  })
})(AlsSpareComponent);

export default EnhancedAlsSpareComponent;
