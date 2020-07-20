import React, { useState, useEffect, useMemo } from 'react';
import { scaleLinear ,scaleTime, scaleBand, scaleQuantize } from "d3-scale";
import { extent, max, min, range } from "d3-array";
import {line} from "d3-shape";
import {schemeSet1, schemeReds, schemeOranges} from "d3-scale-chromatic";
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import useChartDimensions from '../../hooks/chart-dimensions-hook'
import { useFormik, withFormik, useFormikContext } from 'formik';
import ThailandTopo from './thailandWithName.json';
// import MockupEquipmentData from './mockupEquipmentData.json';
import { geoPath, geoAlbers, geoMercator ,geoEqualEarth } from "d3-geo"
import legend from './d3-color-legend';
// import mockupEquipmentData from './mockupEquipmentData.json';
import {ITEM_STATUS, FilterByAdjustmentBar} from './index';

const chartSettings = { //Need to be at least one since 0 is a falsy value, will be replaced by defaults
    "marginLeft": 10,
    "marginBottom": 1,
    "marginTop": 1,
    "marginRight": 10,
    "height": 700,
}

export const EQUIPMENT_STATUS = {
    "READY": "1",
    "WORKING": "2",
    "DAMAGED": "3",
    "MAINTENANCING": "4",
}

// Reference:December 30, 2012Mike Bostock Let’s Make a Map https://bost.ocks.org/mike/map/
// Reference2: https://medium.com/@zimrick/how-to-create-pure-react-svg-maps-with-topojson-and-d3-geo-e4a6b6848a98 
// Reference thailandWithName from https://github.com/apisit/thailand.json
function ThailandMapComponent({data}) {
    // useChartDimensions will have a ref to the Chart_wrapper and get its own Height and Width
    // See reference of Amelia Wattenberger https://wattenberger.com/blog/react-and-d3#sizing-responsivity
    const [ref, dms] = useChartDimensions(chartSettings);
    const factEquipment = useSelector((state) => ({ ...state.api.fact.equipment }), shallowEqual);
    const { resetForm, setFieldValue, setValues, values } = useFormikContext();
    const [timeDomain, setTimeDomain] = useState([new Date(2000, 0, 1), new Date(2000, 0, 2)]);
    const [inventoryMonthDomain, setInventoryMonthDomain] = useState([0, 100]);
    const [inventoryMonthPath, setInventoryMonthPath] = useState("");
    const [toolTipText, setToolTipText] = useState("Test Tooltip Text")

    const geographies = useMemo(() => (
        ThailandTopo.features
    ), [])

    // const projection = geoAlbers()
    //     // .fitSize([dms.boundedWidth, dms.boundedHeight])
    //     .center([0, 55.4])
    //     .rotate([4.4, 0])
    //     .parallels([50, 60])
    //     .scale(200)
    //     // .translate([ dms.width / 2, dms.height / 2 ])

    var projection = geoAlbers()
        // .scale(200)
        // .translate([dms.width / 2, dms.height / 2])
        .rotate([-50,40,10])
        .center([0, 0])
        // .parallels([-90, -120])
        .fitSize([dms.boundedWidth, dms.boundedHeight], ThailandTopo)
        .center([-1.2, 0])

    // set Domain of x and y after new data
    useEffect(() => {
        if(!data) {
            console.log("There is no data! Line Graph.");
        }else { // There is data
            console.log("AlsEquipmentStatusComponent:: JSON ", ThailandTopo)
            console.log("AlsEquipmentStatusComponent:: geoPath ", geoPath()(ThailandTopo))
            // const timeDomain = extent(data, d => d.date);
            // const inventoryMonthDomain = [0, max(data, d => d.inventory_month)];
            // xScale.domain(timeDomain);
            // yScale.domain(inventoryMonthDomain);
            // setTimeDomain(extent(data, d => d.date));
            // setInventoryMonthDomain([0, max(data, d => d.inventory_month)*1.1]); // Move up by 10% of the max
        }
    }, [data]);

    var [testMapData,setTestMapData] = useState([])

    useEffect(() => {
        let tempMapData = []
        
        geographies.map((region, i) => {
            tempMapData.push({
                regionName: region.properties.name,
                value: 0
            });

            if (factEquipment.items !== undefined && factEquipment.items !== []) {
                factEquipment.items.map(function ({ item_status_id, equipment_installation, equipment_group }) {
                    if (FilterByAdjustmentBar(equipment_installation, equipment_group, values)) {
                        if (equipment_installation[0].location_province.name_en === region.properties.name && (item_status_id === ITEM_STATUS.NEW || item_status_id === ITEM_STATUS.BROKEN || item_status_id === ITEM_STATUS.FIX)) {
                            tempMapData[i] = {
                                regionName: region.properties.name,
                                value: tempMapData[i].value + 1
                            };
                        }
                    }
                })
            }
            
        });
        setTestMapData(tempMapData);
    },[factEquipment.items, values.equipment_group_id, values.district_id, values.node_id])
    


    const color = useMemo(() => (
        scaleQuantize()
            .domain([0,max(testMapData, d => d.value) !== 0 ? max(testMapData, d => d.value) : 1])
            .range(schemeReds[9])
    ), [testMapData]);


    return (
        <div className="Chart_wrapper" ref={ref}>
            <svg width={dms.width} height={dms.height} 
                // style={{ border: "1.5px solid gold" }} 
                viewBox={`0 0 ${dms.width} ${dms.height}`}>
                <g transform={`translate(${dms.width/2+dms.width/8}, ${0})`}>
                  {legend({color, title: "Test title", width: 200})}  
                </g>
                <g transform={`translate(${dms.marginLeft}, ${dms.marginTop})`}>
                    
                    {/* <rect
                        width={dms.boundedWidth}
                        height={dms.boundedHeight}
                        fill="#FEF9E7"
                    /> */}
                    {/* <path 
                        d={geoPath(projection)(ThailandTopo)}
                        stroke="red"
                        fill="none"
                    /> */}

                    {/* React onMouseEnter Events https://reactjs.org/docs/events.html#mouse-events */}
                    {geographies.map((region, i)=> (
                        <path 
                            id={region.properties.name}
                            key={region.properties.name}
                            class="map-region"
                            d={geoPath(projection)(region)}
                            onMouseEnter ={() => setToolTipText(region.properties.name)}
                            stroke="black"
                            // fill="#f3f3f3" 
                            fill={testMapData[i] ? color(testMapData[i].value) : "#f3f3f3" }
                            // fill={  color(Math.random())  }
                        >
                            <title>{region.properties.name}</title>

                        </path>
                    ))}
                </g>
                <text class="label" id="country-name" x="20" y="50">{toolTipText}</text>

            </svg>

          
        </div>
    );
}

export default ThailandMapComponent;