import React, { useState, useEffect, useMemo, useRef } from 'react';
import { scaleLinear ,scaleTime} from "d3-scale";
import { extent, max } from "d3-array";
import {line} from "d3-shape";
import {axisTop, axisBottom} from "d3-axis";
import {select} from "d3-selection";

import AxisBottom from '../common/d3-axis-bottom';
import AxisLeft from '../common/d3-axis-left';
import useChartDimensions from '../../hooks/chart-dimensions-hook'

const defaultChartSettings = {
    marginLeft: 20,
    marginBottom: 20,
    marginTop: 10,
    marginRight: 10,

    height: 200,
}

function LineGraph({ data, chartSettings, title}) {
    // useChartDimensions will have a ref to the Chart_wrapper and get its own Height and Width
    // See reference of Amelia Wattenberger https://wattenberger.com/blog/react-and-d3#sizing-responsivity
    const [ref, dms] = useChartDimensions({ ...defaultChartSettings, ...chartSettings });


    // Using Shirley Wu's Hack on Axes Ref's: D3 and React, Together - Shirley Wu https://www.youtube.com/watch?v=zXBdNDnqV2Q 
    // In addition to how to useRef with `.current` from https://medium.com/@mautayro/d3-react-and-using-refs-e25b9a817a43
    const xAxis = useRef(null)

    // Note: useState will not update on props change, use the useEffect if needed props
    // const [timeDomain, setTimeDomain] = useState([new Date(2000, 0, 1), new Date(2000, 0, 2)]);
    // const [inventoryMonthDomain, setInventoryMonthDomain] = useState([0, 100]);
    // const [inventoryMonthPath, setInventoryMonthPath] = useState("");

    const xScale = scaleTime()
            .domain(extent(data, d => d.date))
            .range([0, dms.boundedWidth]);

    const yScale = scaleLinear()
            .domain([0, max(data, d => d.inventory_month)*1.1]) // Move up by 10% of the max
            .range([dms.boundedHeight, 0])

    const lineGenerator = line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.inventory_month))

    useEffect(() => {
        select(xAxis.current)
            .style("font-size", "14px")
            .call(axisBottom(xScale).ticks(dms.boundedWidth/80).tickSizeOuter(0))
    }, [xAxis, xScale, dms.boundedWidth])

    return (
        <div className="Chart_wrapper" ref={ref} style={{ background: "white" }}>
            <svg width={dms.width} height={dms.height} 
                // style={{ border: "1.5px solid gold" }} 
            >
                <g transform={`translate(${dms.marginLeft}, ${dms.marginTop})`}>
                                        
                    {/* <rect
                        width={dms.boundedWidth}
                        height={dms.boundedHeight}
                        fill="#FEF9E7"
                    /> */}
                    
                    

                    {/* Line Path */}
                    <path d={lineGenerator(data)} fill='none' stroke='steelblue'/>

                    {/* Dots */}
                    {data.map(({date,inventory_month}) => (
                        <circle
                            key={`DataPoint ${date}`}
                            cx={xScale(date)}
                            cy={yScale(inventory_month)}
                            r={2}
                            fill="black"
                        />
                    ))}


                    {/* Graph Title */}
                    <text 
                        x={dms.boundedWidth/2}
                        text-anchor="middle"
                        y={0}
                        font-weight="bold"
                        font-size="20px"
                    >{title}</text>

                    <g transform={`translate(0, ${dms.boundedHeight})`}>
                        {/* <AxisBottom xScale={xScale} /> */}
                        <g ref={xAxis} />
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