import React, { useState, useEffect, useMemo, useRef } from 'react';
import { scaleLinear ,scaleTime, scaleBand } from "d3-scale";
import { extent, max, min, range } from "d3-array";
import {line} from "d3-shape";
import {schemeSet1} from "d3-scale-chromatic";
import {axisTop, axisLeft} from "d3-axis";
import {select} from "d3-selection";

import AxisBottom from '../common/d3-axis-bottom';
import AxisLeft from '../common/d3-axis-left';
import useChartDimensions from '../../hooks/chart-dimensions-hook'

const defaultChartSettings = {
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 40,
    marginRight: 10,

    height: 400,
}

// Reference: D3 Diverging Barchart https://observablehq.com/@d3/diverging-bar-chart
function DivergingBarGraph({ data, chartSettings, title}) {
    // useChartDimensions will have a ref to the Chart_wrapper and get its own Height and Width
    // See reference of Amelia Wattenberger https://wattenberger.com/blog/react-and-d3#sizing-responsivity
    const [ref, dms] = useChartDimensions({ ...defaultChartSettings, ...chartSettings });

    // Using Shirley Wu's Hack on Axes Ref's: D3 and React, Together - Shirley Wu https://www.youtube.com/watch?v=zXBdNDnqV2Q 
    // In addition to how to useRef with `.current` from https://medium.com/@mautayro/d3-react-and-using-refs-e25b9a817a43
    const xAxis = useRef(null)
    // const yAxis = useRef(null)

    // useMemo for Referential equality/Computationally Expensive? https://kentcdodds.com/blog/usememo-and-usecallback
    const xScale = scaleLinear()
        .domain([min(data, d => d.value_neg)*1.1, max(data, d => d.value_pos)*1.1])
        .range([0, dms.boundedWidth])

    const yScale = scaleBand()
        .domain(range(data.length))
        .range([0, dms.boundedHeight])
        .padding(0.1)

    useEffect(() => {
        select(xAxis.current)
            .style("font-size", "14px")
            .call(axisTop(xScale).ticks(dms.boundedWidth/80, "d"))
            .call(g => g.select(".domain").remove());
    }, [xAxis, xScale, dms.boundedWidth])

    // useEffect(() => {
    //     select(yAxis.current)
    //         .style("font-size", "14px")
    //         .call(axisLeft(yScale).ticks())
    //         .call(g => g.select(".domain").remove());
    // }, [yAxis, yScale, dms.boundedWidth])


    return (
        <div className="Chart_wrapper" ref={ref} style={{ background: "white" }}>
            <svg width={dms.width} height={dms.height} 
                style={{ border: "1.5px solid gold" }} 
            >
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
                            x={0-dms.marginLeft+7}
                            y={yScale(index)+ yScale.bandwidth()/2}
                            dy="0.35em"
                        >{name}</text>
                        </>
                        )
                        
                    })}


                    {/* Graph Title */}
                    <text 
                        x={dms.boundedWidth/2}
                        text-anchor="middle"
                        y={-23}
                        font-weight="bold"
                        font-size="20px"
                    >{title}</text>

                    <g >
                        <g ref={xAxis} />
                    </g>
                    {/* Move Axis Left to the Middle */}
                    {/* <g transform={`translate(${xScale(0)}, 0)`}>
                        <g ref={yAxis} />
                    </g> */}

                </g>

            </svg>
        </div>
    );
}

export default DivergingBarGraph;