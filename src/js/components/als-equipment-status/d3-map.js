import React, { useState, useEffect, useMemo } from 'react';
import { scaleLinear ,scaleTime, scaleBand } from "d3-scale";
import { extent, max, min, range } from "d3-array";
import {line} from "d3-shape";
import {schemeSet1} from "d3-scale-chromatic";

import useChartDimensions from '../../hooks/chart-dimensions-hook'

import ThailandTopo from './thailandWithName.json';
import { geoPath, geoAlbers, geoMercator ,geoEqualEarth } from "d3-geo"

const chartSettings = { //Need to be at least one since 0 is a falsy value, will be replaced by defaults
    "marginLeft": 10,
    "marginBottom": 1,
    "marginTop": 1,
    "marginRight": 10,

    "height": 700,
}

// Reference:December 30, 2012Mike Bostock Let’s Make a Map https://bost.ocks.org/mike/map/
// Reference2: https://medium.com/@zimrick/how-to-create-pure-react-svg-maps-with-topojson-and-d3-geo-e4a6b6848a98 
// Reference thailandWithName from https://github.com/apisit/thailand.json
function ThailandMapComponent({data}) {
    // useChartDimensions will have a ref to the Chart_wrapper and get its own Height and Width
    // See reference of Amelia Wattenberger https://wattenberger.com/blog/react-and-d3#sizing-responsivity
    const [ref, dms] = useChartDimensions(chartSettings);


    const [timeDomain, setTimeDomain] = useState([new Date(2000, 0, 1), new Date(2000, 0, 2)]);
    const [inventoryMonthDomain, setInventoryMonthDomain] = useState([0, 100]);
    const [inventoryMonthPath, setInventoryMonthPath] = useState("");

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
        // .parallels([-90, -120])
        .fitSize([dms.boundedWidth, dms.boundedHeight], ThailandTopo)

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

    useEffect(() => {
        console.log("AlsEquipmentStatusComponent:: JSON ", ThailandTopo)
        console.log("AlsEquipmentStatusComponent:: geoPath ", geoPath(projection)(ThailandTopo))
    },[])



    return (
        <div className="Chart_wrapper" ref={ref}>
            <svg width={dms.width} height={dms.height} style={{ border: "1.5px solid gold" }} viewBox={`0 0 ${dms.width} ${dms.height}`}>
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
                    {geographies.map((region, i)=> (
                        <path 
                            d={geoPath(projection)(region)}
                            stroke="steelblue"
                            fill="#FEF9E7"
                        >
                            <title>{region.properties.name}</title>

                        </path>
                    ))}
                    


                </g>
                

            </svg>
        </div>
    );
}

export default ThailandMapComponent;