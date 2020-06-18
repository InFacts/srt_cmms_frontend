import React, { useState, useEffect, useMemo } from 'react';
import { scaleLinear ,scaleTime} from "d3-scale";
import { extent, max } from "d3-array";
import {line} from "d3-shape";

import AxisBottom from './d3-axis-bottom';
import AxisLeft from './d3-axis-left';
import useChartDimensions from '../../hooks/chart-dimensions-hook'

const chartSettings = {
    "marginLeft": 20,
    "marginBottom": 20,
    "marginTop": 10,
    "marginRight": 10,

    "height": 200,
}

function LineGraph({data}) {
    // useChartDimensions will have a ref to the Chart_wrapper and get its own Height and Width
    // See reference of Amelia Wattenberger https://wattenberger.com/blog/react-and-d3#sizing-responsivity
    const [ref, dms] = useChartDimensions(chartSettings);


    const [timeDomain, setTimeDomain] = useState([new Date(2000, 0, 1), new Date(2000, 0, 2)]);
    const [inventoryMonthDomain, setInventoryMonthDomain] = useState([0, 100]);
    const [inventoryMonthPath, setInventoryMonthPath] = useState("");
    // const xScale = useMemo(() => (
    //     scaleLinear()
    //         .domain([0, 100])
    //         .range([0, dms.boundedWidth])
    // ), [dms.boundedWidth])
    const xScale = useMemo(() => {
        console.log("LineGraph: i got new timeDomain ", timeDomain)
        return scaleTime()
            .domain(timeDomain)
            .range([0, dms.boundedWidth]);
    }, [dms.boundedWidth, timeDomain.join("-")])

    const yScale = useMemo(() => (
        scaleLinear()
            .domain(inventoryMonthDomain)
            .range([dms.boundedHeight, 0])
    ), [dms.boundedHeight, inventoryMonthDomain.join("-")])
    // console.log('this is yscale ', yScale.range())

    
    // set Domain of x and y after new data.
    useEffect(() => {
        if(!data) {
            console.log("There is no data! Line Graph.");
        }else { // There is data
            console.log("LineGraph: i got data ", data)
            // const timeDomain = extent(data, d => d.date);
            // const inventoryMonthDomain = [0, max(data, d => d.inventory_month)];
            // xScale.domain(timeDomain);
            // yScale.domain(inventoryMonthDomain);
            // console.log("LineGraph this is time extent ", extent(data, d => d.date).join("-"))
            setTimeDomain(extent(data, d => d.date));
            setInventoryMonthDomain([0, max(data, d => d.inventory_month)*1.1]); // Move up by 10% of the max
        }
    }, [data]);

    // Draw Line after data, xScale/yScale is updated
    useEffect(()=> {
        if(data){
            const lineGenerator = line()
                .x(d => xScale(d.date))
                .y(d => yScale(d.inventory_month));
            console.log("This is line generator date", extent(data, d => d.date))
            console.log("This is line generator ",lineGenerator(data));
            setInventoryMonthPath(lineGenerator(data)); 
        }
    }, [data, xScale, yScale]);


    return (
        <div className="Chart_wrapper" ref={ref}>
            <svg width={dms.width} height={dms.height} style={{ border: "1.5px solid gold" }} >
                <g transform={`translate(${dms.marginLeft}, ${dms.marginTop})`}>
                                        
                    <rect
                        width={dms.boundedWidth}
                        height={dms.boundedHeight}
                        fill="#FEF9E7"
                    />
                    {/* Line Path */}
                    <path d={inventoryMonthPath} fill='none' stroke='steelblue'/>


                    

                    <g transform={`translate(0, ${dms.boundedHeight})`}>
                        <AxisBottom xScale={xScale} />
                    </g>
                    <g >
                        <AxisLeft domain={yScale.domain()} range={yScale.range()} />
                    </g>

                </g>

            </svg>
        </div>
    );
}

export default LineGraph;


const data = [{
    "reporting_period_id": 1,
    "item_id": 1,
    "warehouse_id": 323,
    "item_status_id": 1,
    "begin_unit_count": 0,
    "receive_unit_count": 0,
    "issue_unit_count": 0,
    "state_in_unit_count": 0,
    "state_out_unit_count": 0,
    "adjustment_unit_count": 0,
    "ending_unit_count": 127,
    "ending_committed_unit_count": 0
}]