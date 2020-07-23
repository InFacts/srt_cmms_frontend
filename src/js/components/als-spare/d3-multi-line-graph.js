import React, { useState, useEffect, useMemo } from 'react';
import { scaleLinear ,scaleTime} from "d3-scale";
import { extent, max } from "d3-array";
import {line} from "d3-shape";

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

function MultiLineGraph({ data, chartSettings, title}) {
    // useChartDimensions will have a ref to the Chart_wrapper and get its own Height and Width
    // See reference of Amelia Wattenberger https://wattenberger.com/blog/react-and-d3#sizing-responsivity
    const [ref, dms] = useChartDimensions({ ...defaultChartSettings, ...chartSettings });
    
    const xScale = scaleTime()
            .domain(extent(data.dates))
            .range([0, dms.boundedWidth]);

    const yScale = scaleLinear()
            .domain([0, max(data.series, d => max(d.values))]).nice() // Move up by 10% of the max
            .range([dms.boundedHeight, 0])

    const lineGenerator = line()
        .defined(d => !isNaN(d))
        .x((d,i) => xScale(data.dates[i]))
        .y(d => yScale(d))

    return (
        <div className="Chart_wrapper" ref={ref} style={{ background: "white" }}>
            <svg width={dms.width} height={dms.height} 
                // style={{ border: "1.5px solid gold" }} 
                viewBox={`0 0 ${dms.width} ${dms.height}`}>

                {/* Graph Boundary */}
                <g transform={`translate(${dms.marginLeft}, ${dms.marginTop})`}>
                                        
                    {/* <rect
                        width={dms.boundedWidth}
                        height={dms.boundedHeight}
                        fill="#FEF9E7"
                    /> */}


                    {/* Line Paths */}
                    <g 
                        fill="none"
                        stroke="steelblue"
                        strokeWidth={1.5}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    >
                        {data.series.map((d,i) => (
                            <path 
                                key={i}
                                mix-blend-mode="multiply"
                                d={lineGenerator(d.values)}
                            />
                        ))}

                    </g>


                    {/* Graph Title */}
                    <text 
                        // x={dms.boundedWidth/2}

                        // text-anchor="middle"
                        y={0}
                        dy={-5}
                        // font-weight="bold"
                        font-size="17px"
                    >{title}</text>

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

export default MultiLineGraph;
