import React, { useState, useEffect, useMemo, useRef } from 'react';
import { scaleLinear, scaleTime , scaleOrdinal, scaleBand, scaleSequential, scaleSequentialSqrt } from "d3-scale";
import { extent, max, histogram } from "d3-array";
import {interpolatePuRd, interpolateOrRd, interpolateYlOrRd} from 'd3-scale-chromatic';
import { line } from "d3-shape";
import {select} from "d3-selection";
import {axisBottom} from "d3-axis";

import AxisBottom from '../common/d3-axis-bottom';
import AxisLeft from '../common/d3-axis-left';
import useChartDimensions from '../../hooks/chart-dimensions-hook'
import { createPortal } from 'react-dom';

const defaultChartSettings = {
    marginLeft: 95,
    marginBottom: 5,
    marginTop: 50,
    marginRight: 95,

    height: 450,
}

// References https://observablehq.com/@d3/grouped-bar-chart
const ColorMap = ({ data, chartSettings, title}) => {
    // useChartDimensions will have a ref to the Chart_wrapper and get its own Height and Width
    // See reference of Amelia Wattenberger https://wattenberger.com/blog/react-and-d3#sizing-responsivity
    const [ref, dms] = useChartDimensions({ ...defaultChartSettings, ...chartSettings });
    
    // Using Shirley Wu's Hack on Axes Ref's: D3 and React, Together - Shirley Wu https://www.youtube.com/watch?v=zXBdNDnqV2Q 
    // In addition to how to useRef with `.current` from https://medium.com/@mautayro/d3-react-and-using-refs-e25b9a817a43
    const xAxis = useRef(null)

    const [xDomain, setXDomain] = useState([0, 1000]);
    const [yDomain, setYDomain] = useState([0, 1000]);


    const xScale = useMemo(() => (
        scaleBand()
            .domain(xDomain)
            .range([0, dms.boundedWidth])
    ), [dms.boundedWidth, xDomain.join("-")])


    const yScale = useMemo(() => (
        scaleBand()
            .domain(yDomain)
            .range([0, dms.boundedHeight])
    ), [dms.boundedHeight, yDomain.join("-")])

    const color = scaleSequential([0, max(data.values, d => max(d))], interpolateYlOrRd);


    // set Domain of x and y after new data.
    useEffect(() => {
        if (!data) {
            console.log("ColorMap: There is no data! ");
        } else { // There is data
            setXDomain(data.xLabels);
            setYDomain(data.yLabels); 
        }
    }, [data]);


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
                        y={-30}
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
                                    x={xScale(data.xLabels[colIndex])}
                                    width={xScale.bandwidth()-1}
                                    height={yScale.bandwidth()-1}
                                    fill={isNaN(value) ? "#EEE":  color(value)}
                                >    
                                    <text>{`${value} in ${data.xLabels[rowIndex]}`}</text>
                                </rect>
                            ))}
                        </g>
                    ))}



                    {/* === xAxis === */}
                    <g transform={`translate(0, ${dms.boundedHeight})`}>
                        <g ref={xAxis} />
                    </g>
                    {/* === yAxis === */}
                    <g >
                        <AxisLeft domain={yScale.domain()} range={yScale.range()} />
                    </g>

                </g>

            </svg>
        </div>
    );
}

export default ColorMap;

