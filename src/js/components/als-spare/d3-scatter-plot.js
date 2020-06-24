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
        <div className="Chart_wrapper" ref={ref} style={{ background: "white" }}>
            <svg width={dms.width} height={dms.height} 
                style={{ border: "1.5px solid gold" }} 
                >
                <g transform={`translate(${dms.marginLeft}, ${dms.marginTop})`}>

                    {/* Graph Title */}
                    <text
                        x={dms.boundedWidth / 2}
                        dy={-20}
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
                            y={-8}
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

                    {/* Comparison Line */}
                    {data.hasComparisonLine &&
                    <>
                        {/* Line x=y */}
                        <line 
                            x1={xScale(0)}
                            y1={yScale(0)}
                            // Invert to find x value of dms.boundedWidth (max X)
                            x2={xScale(xScale.invert(dms.boundedWidth))}
                            // Invert to find y value (Y2=X2)
                            y2={yScale(xScale.invert(dms.boundedWidth))}
                            stroke-dasharray="3,3"
                            stroke-opacity={0.3}
                            stroke={"#000"}
                        />
                        {/* Top Line x>0.95y  */}
                        <line 
                            x1={xScale(0)}
                            y1={yScale(0)}

                            // Invert to find max y value of 0 (max Y) 
                            y2={yScale(yScale.invert(0))}
                            // Invert to find x value (X2=0.95*Y2)
                            x2={xScale(yScale.invert(0)*0.95)}

                            stroke-dasharray="3,3"
                            stroke-opacity={0.5}
                            stroke="steelblue"
                        />
                        {/* Bottom Line x<1.05y */}
                        <line 
                            x1={xScale(0)}
                            y1={yScale(0)}

                            // Invert to find x value of dms.boundedWidth (max X)
                            x2={xScale(xScale.invert(dms.boundedWidth))}
                            // Invert to find y value (Y2=1/0.95*X2)
                            y2={yScale(xScale.invert(dms.boundedWidth)*1/1.05)}
                            
                            stroke-dasharray="3,3"
                            stroke-opacity={0.5}
                            stroke="steelblue"
                        />
                        {/* Path to fill the Comparison Line */}
                        <path 
                            d={["M", xScale(0), yScale(0), // Start with point 0,0
                                "L", xScale(yScale.invert(0)*0.95), yScale(yScale.invert(0)), //Move to top line boundary
                                "L", xScale(xScale.invert(dms.boundedWidth)), yScale(xScale.invert(dms.boundedWidth)),// Move to Center Line
                                "L", xScale(xScale.invert(dms.boundedWidth)),yScale(xScale.invert(dms.boundedWidth)*1/1.05), // Move to Bottom Line
                                "L", xScale(0), yScale(0), //Move back to Center 0,0
                                ].join(" ")}
                            // stroke={"#000"}
                            opacity={0.2}
                            fill={"mediumseagreen"}
                        />


                        {/* Text Label */}
                        <text
                            x={-dms.marginLeft+dms.width/2}
                            y={dms.boundedHeight/4}
                            text-anchor="middle"
                            vertical-align="middle"
                            font-weight={600}
                            font-size={18}
                            fill={"red"}
                            // paint-order="stroke"
                            // stroke={"#000000"}
                            // stroke-width="2px"
                        >อะไหล่ต่ำกว่าเกณฑ์</text>

                        <text
                            x={-dms.marginLeft+dms.width/2}
                            y={dms.boundedHeight/2}
                            text-anchor="middle"
                            vertical-align="middle"
                            font-weight={600}
                            font-size={18}
                            fill={"green"}
                        >อะไหล่ตามเกณฑ์</text>

                        <text
                            x={-dms.marginLeft+dms.width/2}
                            y={dms.boundedHeight*3/4}
                            text-anchor="middle"
                            vertical-align="middle"
                            font-weight={600}
                            font-size={18}
                            fill={"orange"}
                        >อะไหล่สูงกว่าเกณฑ์</text>


                    </>
                    }



                    {/* <rect
                        width={dms.boundedWidth}
                        height={dms.boundedHeight}
                        fill="#FEF9E7"
                    /> */}

                    {/* For Each Circle */}
                    {data.map((d, i) => (
                        <circle
                            key={i}
                            r={1.3}
                            cx={xScale(d.x)}
                            cy={yScale(d.y)}
                            fill={!data.hasComparisonLine ? 
                                    "steelblue" : 
                                    d.x > 1.05*d.y ? "orange" // Actual > Plan
                                    : d.x < 0.95*d.y ?  "red" :  // Actual < Plan
                                    "green" // 0.95y < x < 1.05y
                                }
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