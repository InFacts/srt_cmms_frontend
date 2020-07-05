import React, { useState, useEffect, useMemo, useRef } from 'react';
import { scaleLinear, scaleTime , scaleOrdinal, scaleBand, scaleSequential, scaleSequentialSqrt } from "d3-scale";
import { extent, max, histogram } from "d3-array";
import {interpolatePuRd, interpolateOrRd, interpolateYlOrRd, interpolateSpectral} from 'd3-scale-chromatic';
import { line, arc, pie } from "d3-shape";
import {select} from "d3-selection";
import {quantize} from 'd3-interpolate';
import {axisBottom, axisLeft} from "d3-axis";

import AxisBottom from './d3-axis-bottom';
import AxisLeft from './d3-axis-left';
import useChartDimensions from '../../hooks/chart-dimensions-hook'

const defaultChartSettings = {
    marginLeft: 20,
    marginBottom: 25,
    marginTop: 20,
    marginRight: 25,

    height: 250,
}

// References Maria Luísa - Simple Pie Chart  https://observablehq.com/@marialuisacp/pie-chart
// Reference Mike Bostock - Pie Chart https://observablehq.com/@d3/pie-chart
const PieChart = ({ data, chartSettings, title}) => {
    // useChartDimensions will have a ref to the Chart_wrapper and get its own Height and Width
    // See reference of Amelia Wattenberger https://wattenberger.com/blog/react-and-d3#sizing-responsivity
    const [ref, dms] = useChartDimensions({ ...defaultChartSettings, ...chartSettings });
    
    const [arcs, setArcs] = useState([]);
    
    const arcGenerator = useMemo(() => (
        arc()
        .innerRadius(0)
        .outerRadius(Math.min(dms.boundedWidth, dms.boundedHeight) / 2 - 1)
    ), [dms.boundedWidth, dms.boundedHeight]);

    const pieGenerator = pie()
        .sort(null)
        .value(d => d.value);

    const color = useMemo(() => (
        scaleOrdinal()
            .domain(data.map(d => d.key))
            .range(quantize(t => interpolateSpectral(t * 0.8 + 0.1), data.length).reverse())
    ), [data]);
    
    const arcLabel = useMemo(() => {
        const radius = Math.min(dms.boundedWidth, dms.boundedHeight) / 2 * 0.7;
        return arc().innerRadius(radius).outerRadius(radius);
    })

    // set Domain of x and y after new data.
    useEffect(() => {
        if (!data) {
            console.log("PieChart: There is no data! ");
        } else { // There is data
            // console.log("PieChart:: data ", data)
            // console.log("PieChart:: arcs ",pieGenerator(data))
            setArcs(pieGenerator(data))
        }
    }, [data]);

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

                    {/* Graph Title */}
                    <text 
                        x={dms.boundedWidth/2}
                        text-anchor="middle"
                        y={0}
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


                    {/* For Each Pie Sector */}
                    <g transform={`translate(${dms.boundedWidth/4}, ${dms.boundedHeight/2+10})`}>
                
                        {arcs.map((singleArc) => (
                            <>
                            <path 
                                fill={color(singleArc.data.key)}
                                d={arcGenerator(singleArc)}
                            >
                                <title>{`${singleArc.data.key}: ${singleArc.data.value}`}</title>
                            </path>
                            <text
                                transform={`translate(${arcLabel.centroid(singleArc)})`}
                            >
                                {/* <tspan y="-0.4em" fontWeight="bold">{singleArc.data.key}</tspan> */}
                                {/* Ignore any angle that is too small */}
                                {/* {(singleArc.endAngle - singleArc.startAngle) > 0.25 && 
                                <tspan x="0" y="0.7em" fillOpacity="0.7">{singleArc.data.value}</tspan>} */}
                                {(singleArc.endAngle - singleArc.startAngle) > 0.25 && 
                                <tspan fontWeight="bold">{singleArc.data.value}</tspan>}
                            </text>
                            </>
                        ))}
                    </g>


                    {/* === Color Legend === */}
                    <g transform={`translate(${dms.boundedWidth/2+20}, ${dms.boundedHeight/4   })`}
                        // textAnchor="end"
                        fontSize="14"
                    >
                        {color.domain().slice().reverse().map((d,i)=> (
                            <g  transform={`translate(0, ${i*17})`} >
                                <rect 
                                    x={-15}
                                    width={15}
                                    height={15}
                                    fill={color(d)}
                                />
                                <text
                                    x={7}
                                    y={6}
                                    dy={"0.35em"}
                                >{d}</text>
                            </g>
                        ))}

                    </g>

                </g>

            </svg>
        </div>
    );
}

export default PieChart;

