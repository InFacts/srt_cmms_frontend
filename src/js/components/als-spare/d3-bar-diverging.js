import React, { useState, useEffect, useMemo } from 'react';
import { scaleLinear ,scaleTime, scaleBand } from "d3-scale";
import { extent, max, min, range } from "d3-array";
import {line} from "d3-shape";
import {schemeSet1} from "d3-scale-chromatic";

import AxisBottom from '../common/d3-axis-bottom';
import AxisLeft from '../common/d3-axis-left';
import useChartDimensions from '../../hooks/chart-dimensions-hook'

const chartSettings = {
    "marginLeft": 20,
    "marginBottom": 10,
    "marginTop": 20,
    "marginRight": 10,

    "height": 400,
}

// Reference: D3 Diverging Barchart https://observablehq.com/@d3/diverging-bar-chart
function DivergingBarGraph({data}) {
    // useChartDimensions will have a ref to the Chart_wrapper and get its own Height and Width
    // See reference of Amelia Wattenberger https://wattenberger.com/blog/react-and-d3#sizing-responsivity
    const [ref, dms] = useChartDimensions(chartSettings);


    const [timeDomain, setTimeDomain] = useState([new Date(2000, 0, 1), new Date(2000, 0, 2)]);
    const [inventoryMonthDomain, setInventoryMonthDomain] = useState([0, 100]);
    const [inventoryMonthPath, setInventoryMonthPath] = useState("");

    // const xScale = useMemo(() => (
    //     scaleLinear()
    //         .domain([min(data, d => d.value_neg), max(data, d => d.value_pos)])
    //         .range([dms.boundedWidth, 0])
    // ), [dms.boundedWidth]) 
    const xScale = scaleLinear()
    .domain([min(data, d => d.value_neg), max(data, d => d.value_pos)])
    .range([0, dms.boundedWidth])

    // const yScale = useMemo(() => (
    //     scaleBand()
    //         .domain(range(data.length))
    //         .range([0, dms.boundedHeight])
    //         .padding(0.1)
    // ), [dms.boundedHeight])
    const yScale = scaleBand()
    .domain(range(data.length))
    .range([0, dms.boundedHeight])
    .padding(0.1)

    

    
    // set Domain of x and y after new data
    useEffect(() => {
        if(!data) {
            console.log("There is no data! Line Graph.");
        }else { // There is data
            console.log("DivergeBar: i got data ", data)
            console.log("DivergeBar xScale: ", [min(data, d => d.value_neg), max(data, d => d.value_pos)])
            // const timeDomain = extent(data, d => d.date);
            // const inventoryMonthDomain = [0, max(data, d => d.inventory_month)];
            // xScale.domain(timeDomain);
            // yScale.domain(inventoryMonthDomain);
            // setTimeDomain(extent(data, d => d.date));
            // setInventoryMonthDomain([0, max(data, d => d.inventory_month)*1.1]); // Move up by 10% of the max
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


                    {data.map( ({name, value_neg, value_pos}, index) => {
                        return(<>
                        {/* value_pos */}
                        <rect
                            x={xScale(0)}
                            y={yScale(index)}
                            width={Math.abs(xScale(value_pos) - xScale(0))}
                            height={yScale.bandwidth()}
                            fill={schemeSet1[1]}
                        />
                        {/* value_neg */}
                        <rect
                            x={xScale(value_neg)}
                            y={yScale(index)}
                            width={Math.abs(xScale(value_neg) - xScale(0))}
                            height={yScale.bandwidth()}
                            fill={schemeSet1[0]}
                        />
                        <text
                            x={0-dms.marginLeft}
                            y={yScale(index)+ yScale.bandwidth()/2}
                            dy="0.35em"
                        >{name}</text>
                        </>
                        )
                        
                    })}


                    

                    <g >
                        <AxisBottom xScale={xScale} />
                    </g>
                    {/* Move Axis Left to the Middle */}
                    <g transform={`translate(${xScale(0)}, 0)`}>
                        <AxisLeft domain={yScale.domain()} range={yScale.range()} />
                    </g>

                </g>

            </svg>
        </div>
    );
}

export default DivergingBarGraph;


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