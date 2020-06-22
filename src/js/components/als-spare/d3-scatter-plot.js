import React, { useState, useEffect, useRef } from 'react';
import { scaleLinear } from "d3-scale";
import { extent, max, min } from "d3-array"
import AxisBottom from '../common/d3-axis-bottom';
import AxisLeft from '../common/d3-axis-left';
import useChartDimensions from '../../hooks/chart-dimensions-hook'
import { axisBottom ,axisLeft} from 'd3-axis';
import {select} from "d3-selection";


const defaultChartSettings = {
    marginLeft: 20,
    marginBottom: 20,
    marginTop: 10,
    marginRight: 10,

    height: 200,
}

// References from https://observablehq.com/@d3/scatterplot
// References from https://observablehq.com/@d3/scatterplot-with-shapes
function ScatterPlot({ data, chartSettings, title }) {
    // useChartDimensions will have a ref to the Chart_wrapper and get its own Height and Width
    // See reference of Amelia Wattenberger https://wattenberger.com/blog/react-and-d3#sizing-responsivity
    const [ref, dms] = useChartDimensions({ ...defaultChartSettings, ...chartSettings });

    // Using Shirley Wu's Hack on Axes Ref's: D3 and React, Together - Shirley Wu https://www.youtube.com/watch?v=zXBdNDnqV2Q 
    // In addition to how to useRef with `.current` from https://medium.com/@mautayro/d3-react-and-using-refs-e25b9a817a43
    const xAxis = useRef(null)
    const yAxis = useRef(null)

    // Scales are made with .nice() so that ticks are made 
    const xScale = scaleLinear()
        .domain(extent(data, d => d.x)).nice()
        .range([0, dms.boundedWidth]);
    const yScale = scaleLinear()
        .domain(extent(data, d => d.y)).nice()
        .range([dms.boundedHeight, 0]);

    useEffect(() => {
        select(xAxis.current)
            .style("font-size", "12px")
            .call(axisBottom(xScale).tickPadding(0).ticks(dms.boundedWidth / 40)) //dms.boundedWidth / 80
            .call(g => g.select(".domain").remove());
    }, [xAxis, xScale, dms.boundedWidth])

    useEffect(() => {
        select(yAxis.current)
            .style("font-size", "12px")
            .call(axisLeft(yScale))
            .call(g => g.select(".domain").remove());
    }, [yAxis, yScale])

    return (
        <div className="Chart_wrapper" ref={ref}>
            <svg width={dms.width} height={dms.height} 
                // style={{ border: "1.5px solid gold" }} 
                >
                <g transform={`translate(${dms.marginLeft}, ${dms.marginTop})`}>

                    {/* Graph Title */}
                    <text
                        x={dms.boundedWidth / 2}
                        dy={0}
                        text-anchor="middle"
                        font-weight="bold"
                        font-size="20px"
                    >{title}</text>

                    {/* x and y Axis */}
                    <g transform={`translate(0, ${dms.boundedHeight})`}>
                        <g ref={xAxis} />
                        <text
                            x={dms.boundedWidth}
                            y={dms.marginBottom-4}
                            fontSize="13px"
                            textAnchor="end"
                        >{data.xAxisLabel}</text>
                    </g>
                    <g >
                        <g ref={yAxis} />
                        <text
                            x={-dms.marginLeft}
                            y={-dms.marginTop+10}
                            fontSize="13px"
                            textAnchor="start"
                        >{data.yAxisLabel}</text>
                    </g>

                    {/* Grid */}
                    {xScale.ticks().map((tick) => (
                        <line 
                            x1={0.5 + xScale(tick)}
                            x2={0.5 + xScale(tick)}
                            y1={0}
                            y2={dms.boundedHeight}
                            stroke-opacity={0.1}
                            stroke={"#000"}
                        />
                    ))}
                    {yScale.ticks().map((tick) => (
                        <line 
                            y1={0.5 + yScale(tick)}
                            y2={0.5 + yScale(tick)}
                            x1={0}
                            x2={dms.boundedWidth}
                            stroke-opacity={0.1}
                            stroke={"#000"}
                        />
                    ))}
                    {/* <rect
                        width={dms.boundedWidth}
                        height={dms.boundedHeight}
                        fill="#FEF9E7"
                    /> */}

                    {/* For Each Circle */}
                    {data.map((d, i) => (
                        <circle
                            key={i}
                            r={2}
                            cx={xScale(d.x)}
                            cy={yScale(d.y)}
                            fill="steelblue"
                        >
                            <title>{d.name}</title>
                        </circle>
                    ))}


                    

                    

                </g>

            </svg>
        </div>
    );
}

export default ScatterPlot;