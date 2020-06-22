import React, { useState, useEffect, useMemo, useRef } from 'react';
import { scaleLinear, scaleTime , scaleOrdinal, scaleBand, scaleSequential, scaleSequentialSqrt } from "d3-scale";
import { extent, max,min, histogram } from "d3-array";
import {interpolatePuRd, interpolateOrRd, interpolateYlOrRd} from 'd3-scale-chromatic';
import { line } from "d3-shape";
import {select} from "d3-selection";
import {axisBottom, axisLeft , axisTop} from "d3-axis";

import AxisBottom from '../common/d3-axis-bottom';
import AxisLeft from '../common/d3-axis-left';
import useChartDimensions from '../../hooks/chart-dimensions-hook'

const defaultChartSettings = {
    marginLeft: 40,
    marginBottom: 5,
    marginTop: 50,
    marginRight: 40,

    height: 450,
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

// References https://observablehq.com/@mbostock/the-impact-of-vaccines 
const ColorMap = ({ data, chartSettings, title}) => {
    // useChartDimensions will have a ref to the Chart_wrapper and get its own Height and Width
    // See reference of Amelia Wattenberger https://wattenberger.com/blog/react-and-d3#sizing-responsivity
    const [ref, dms] = useChartDimensions({ ...defaultChartSettings, ...chartSettings });
    
    // Using Shirley Wu's Hack on Axes Ref's: D3 and React, Together - Shirley Wu https://www.youtube.com/watch?v=zXBdNDnqV2Q 
    // In addition to how to useRef with `.current` from https://medium.com/@mautayro/d3-react-and-using-refs-e25b9a817a43
    const xAxis = useRef(null)
    const yAxis = useRef(null)

    const [xDomain, setXDomain] = useState([new Date("2019-01-02"), new Date("2020-01-02")]);
    const [yDomain, setYDomain] = useState([0, 1000]);


    const xScale = useMemo(() => (
        scaleTime()
            .domain(xDomain)
            .range([0, dms.boundedWidth])
            
    ), [dms.boundedWidth, xDomain.join("-")])


    const yScale = useMemo(() => (
        scaleBand()
            .domain(yDomain)
            .range([0, dms.boundedHeight])
    ), [dms.boundedHeight, yDomain.join("-")])

    const color = scaleSequential([0, max(data.values, d => max(d))], interpolatePuRd);


    // set Domain of x and y after new data.
    useEffect(() => {
        if (!data) {
            console.log("ColorMap: There is no data! ");
        } else { // There is data
            setXDomain([min(data.xLabels), max(data.xLabels).addDays(7)]);
            setYDomain(data.yLabels); 
        }
    }, [data]);

    useEffect(() => {
        select(xAxis.current)
            .style("font-size", "14px")
            .call(axisTop(xScale).ticks(20, "%Y-%m"))
            .call(g => g.select(".domain").remove());
    }, [xAxis, xScale])


    useEffect(() => {
        select(yAxis.current)
            .style("font-size", "15px")
            .call(axisLeft(yScale).tickSize(0))
            .call(g => g.select(".domain").remove());
    }, [yAxis, yScale])


    return (
        <div className="Chart_wrapper" ref={ref}>
            <svg width={dms.width} height={dms.height} 
                style={{ border: "1.5px solid gold" }} 
                viewBox={`0 0 ${dms.width} ${dms.height}`}>
                
                {/* Graph Boundary */}
                <g transform={`translate(${dms.marginLeft}, ${dms.marginTop})`}>

                    {/* <rect
                        width={dms.boundedWidth}
                        height={dms.boundedHeight}
                        fill="#FEF9E7"
                    /> */}

                    {/* Graph Title */}
                    <text 
                        x={dms.boundedWidth/2}
                        text-anchor="middle"
                        y={-23}
                        font-weight="bold"
                        font-size="20px"
                    >{title}</text>

                    {/* xAxis Label */}
                    {/* <text
                        x="50%"
                        text-anchor="middle"
                        y={dms.boundedHeight+15+20}
                        font-weight="bold"
                    >{data.xAxis}</text> */}

                    {/* yAxis Label */}
                    {/* <text
                        // x={dms.marginLeft}
                        text-anchor="left"
                        x={5}
                        y={0}
                        font-weight="bold"
                        font-size="16px"
                    >{data.yAxis}</text> */}



                    {/* For Each Value */}
                    {data.values.map((rowValues, rowIndex) => (
                        <g transform={`translate(0, ${yScale(data.yLabels[rowIndex])})`}> 
                            {rowValues.map((value, colIndex) => (
                                <rect 
                                    key={`rect-date-${rowIndex}-${colIndex}`}
                                    x={xScale(data.xLabels[colIndex])}
                                    width={xScale(data.xLabels[colIndex].addDays(7))-xScale(data.xLabels[colIndex])-1} //-1 for space between it
                                    height={yScale.bandwidth()-1} //-1 for space between it
                                    fill={isNaN(value) ? "#EEE":  color(value)}
                                >    
                                    <text>{`${value} in ${data.xLabels[rowIndex]}`}</text>
                                </rect>
                            ))}
                        </g>
                    ))}



                    {/* === xAxis === */}
                    <g 
                    >
                        <g ref={xAxis} />
                    </g>
                    {/* === yAxis === */}
                    <g >
                        <g ref={yAxis} />
                    </g>

                </g>

            </svg>
        </div>
    );
}

export default ColorMap;

