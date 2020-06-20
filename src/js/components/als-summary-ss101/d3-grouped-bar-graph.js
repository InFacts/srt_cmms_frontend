import React, { useState, useEffect, useMemo, useRef } from 'react';
import { scaleLinear, scaleTime , scaleOrdinal, scaleBand} from "d3-scale";
import { extent, max, histogram } from "d3-array";
import { line } from "d3-shape";
import {select} from "d3-selection";
import {axisBottom} from "d3-axis";

import AxisBottom from '../common/d3-axis-bottom';
import AxisLeft from '../common/d3-axis-left';
import useChartDimensions from '../../hooks/chart-dimensions-hook'
import { createPortal } from 'react-dom';

const defaultChartSettings = {
    marginLeft: 40,
    marginBottom: 20,
    marginTop: 40,
    marginRight: 10,

    height: 250,
}

// References https://observablehq.com/@d3/grouped-bar-chart
function GroupedBarGraph({ data, chartSettings, title}) {
    // useChartDimensions will have a ref to the Chart_wrapper and get its own Height and Width
    // See reference of Amelia Wattenberger https://wattenberger.com/blog/react-and-d3#sizing-responsivity
    const [ref, dms] = useChartDimensions({ ...defaultChartSettings, ...chartSettings });
    
    // Using Shirley Wu's Hack on Axes Ref's: D3 and React, Together - Shirley Wu https://www.youtube.com/watch?v=zXBdNDnqV2Q 
    // In addition to how to useRef with `.current` from https://medium.com/@mautayro/d3-react-and-using-refs-e25b9a817a43
    const xAxis = useRef(null)

    const [x0Domain, setX0Domain] = useState([0, 1000]);
    const [x1Domain, setX1Domain] = useState([0, 1000]);
    const [yDomain, setYDomain] = useState([0, 1000]);


    const x0Scale = useMemo(() => (
        scaleBand()
            .domain(x0Domain)
            .rangeRound([0, dms.boundedWidth])
            .paddingInner(0.1)
    ), [dms.boundedWidth, x0Domain.join("-")])

    const x1Scale = useMemo(() => (
        scaleBand()
            .domain(x1Domain)
            .rangeRound([0, x0Scale.bandwidth()])
            .padding(0.05)
    ), [dms.boundedWidth, x1Domain.join("-"), x0Scale.bandwidth()])

    const yScale = useMemo(() => (
        scaleLinear()
            .domain(yDomain).nice()
            .range([dms.boundedHeight, 0])
    ), [dms.boundedHeight, yDomain.join("-")])

    const color = scaleOrdinal()
    .range([
        // "#98abc5", 
        // "#8a89a6", 
        // "#7b6888", 
        // "#6b486b", 
        "#a05d56", 
        "#d0743c", 
        "#ff8c00"])



    // set Domain of x and y after new data.
    useEffect(() => {
        if (!data) {
            console.log("GroupedBarGraph: There is no data! ");
        } else { // There is data
            setX0Domain(data.map(d => d[data.xAxis]));
            setX1Domain(data.columns);
            setYDomain([0, max(data, d => max(data.columns, key => d[key]))]); 
        }
    }, [data]);

    useEffect(() => {
        console.log("GroupedBarGraph: I can select ", select(xAxis.current))
        select(xAxis.current)
            .style("font-size", "15px")
            .call(axisBottom(x0Scale).tickSizeOuter(0));
    }, [xAxis, x0Scale])
    // Draw Line after data, xScale/yScale is updated
    // useEffect(() => {
    //     if (data) {
    //         let _bins= histogram()
    //                     .domain(xScale.domain())
    //                     .thresholds(xScale.ticks(16))
    //                     (data)
    //         console.log("Histogram:: data bins", data,bins)
    //         setBins(_bins);
    //     }
    // }, [data, xScale]);


    return (
        <div className="Chart_wrapper" ref={ref}>
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

                    {/* Graph Title */}
                    <text 
                        x="50%"
                        text-anchor="middle"
                        y={-15}
                        font-weight="bold"
                        font-size="20px"
                        // transform={`translate(${dms.width/2}, ${dms.marginTop})`}
                    >{title}</text>

                    {/* xAxis Label */}
                    {/* <text
                        x="50%"
                        text-anchor="middle"
                        y={dms.boundedHeight+15+20}
                        font-weight="bold"
                    >{data.xAxis}</text> */}

                    {/* yAxis Label */}
                    <text
                        // x={dms.marginLeft}
                        text-anchor="left"
                        x={5}
                        y={0}
                        font-weight="bold"
                        font-size="16px"
                    >{data.yAxis}</text>



                    {/* For Each Group of Rects */}
                    {data.map(d=>(
                        <g transform={`translate(${x0Scale(d[data.xAxis])},0)`}>
                            {/* For Each Column of Rect (Individuals in a Group)  */}
                            {data.columns.map(column => (
                                <rect 
                                    x={x1Scale(column)}
                                    y={yScale(d[column])}

                                    width={x1Scale.bandwidth()}
                                    height={yScale(0)-yScale(d[column])}

                                    fill={color(column)}
                                />
                            ))}
                            
                        </g>
                    ))}




                    <g transform={`translate(0, ${dms.boundedHeight})`}>
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

export default GroupedBarGraph;

