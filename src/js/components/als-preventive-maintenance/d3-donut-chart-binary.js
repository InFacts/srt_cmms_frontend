import React, { useState, useEffect, useMemo, useRef } from 'react';
import { scaleLinear, scaleTime , scaleOrdinal, scaleBand, scaleSequential, scaleSequentialSqrt } from "d3-scale";
import { extent, max, histogram } from "d3-array";
import {interpolatePuRd, interpolateOrRd, interpolateYlOrRd, interpolateSpectral} from 'd3-scale-chromatic';
import { line, arc, pie } from "d3-shape";
import {select} from "d3-selection";
import {quantize} from 'd3-interpolate';
import {axisBottom, axisLeft} from "d3-axis";

import AxisBottom from '../common/d3-axis-bottom';
import AxisLeft from '../common/d3-axis-left';
import useChartDimensions from '../../hooks/chart-dimensions-hook'

const defaultChartSettings = {
    marginLeft: 50,
    marginBottom: 25,
    marginTop: 20,
    marginRight: 25,

    height: 250,
}


// Reference Mike Bostock - Donut Chart https://observablehq.com/@d3/donut-chart
const DonutChartBinary = ({ data, chartSettings, title}) => {
    // useChartDimensions will have a ref to the Chart_wrapper and get its own Height and Width
    // See reference of Amelia Wattenberger https://wattenberger.com/blog/react-and-d3#sizing-responsivity
    const [ref, dms] = useChartDimensions({ ...defaultChartSettings, ...chartSettings });
    
    const [arcs, setArcs] = useState([]);
    
    const arcGenerator = useMemo(() => {
        const radius = Math.min(dms.boundedWidth, dms.boundedHeight) / 2;
        return arc()
        .innerRadius(radius*0.58)
        .outerRadius(radius - 1)
    }, [dms.boundedWidth, dms.boundedHeight]);

    const pieGenerator = pie()
        .padAngle(0.005)
        .sort(null)
        .value(d => d.value);

    const color = useMemo(() => (
        scaleOrdinal()
            .domain(data.map(d => d.key))
            .range(["#4F4F4F", "#D0D0D0"])
    ), [data]);

    // set Domain of x and y after new data.
    useEffect(() => {
        if (!data) {
            console.log("DonutChart: There is no data! ");
        } else { // There is data
            console.log("DonutChart:: data ", data)
            // console.log("PieChart:: arcs ",pieGenerator(data))
            setArcs(pieGenerator(data))
        }
    }, [data]);

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
                        x={dms.boundedWidth/2}
                        textAnchor="middle"
                        y={0}
                        fontWeight="bold"
                        fontSize="20px"
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

                    <text
                        x={dms.boundedWidth*(1/2-1/12)}
                        y={dms.boundedHeight*(1/2+1/10)}
                        fontWeight={600} // 400 is the same as normal, and 700 is the same as bold
                        fontSize="18px"
                    >{data.groupShow}</text>

                    
                    <text  
                        x={dms.boundedWidth*(1/2-1/12)}
                        y={dms.boundedHeight*(1/2+1/10)}
                        dy={-20}
                        fontWeight={600} // 400 is the same as normal, and 700 is the same as bold
                        fontSize="18px"
                    >{data[0].value}</text>

                    <text
                        x={dms.boundedWidth*(1/2-1/12)}
                        y={dms.boundedHeight*(1/2+1/10)}
                        dy={15}
                        fontWeight={500} // 400 is the same as normal, and 700 is the same as bold
                        fontSize="16px"
                    >{data.unitOfMeasure}</text>

                    {/* Total Value */}
                    <text
                        x={dms.boundedWidth*(1/4-1/6)}
                        y={dms.boundedHeight*(1/2+1/10)}
                        textAnchor="end"
                        dy={-20}
                        fontWeight={500} // 400 is the same as normal, and 700 is the same as bold
                        fontSize="18px"
                    >{data.reduce((prevValue, curValue) => (prevValue.value+curValue.value))}</text>

                    {/* Total Value */}
                    <text
                        x={dms.boundedWidth*(1/4-1/6)}
                        y={dms.boundedHeight*(1/2+1/10)}
                        textAnchor="end"
                        // dy={-20}
                        fontWeight={500} // 400 is the same as normal, and 700 is the same as bold
                        fontSize="16px"
                    >{data.totalUnitOfMeasure}</text>

                    {/* Percentage */}
                    <text
                        // x={dms.boundedWidth*(1/4-1/6)}
                        // y={dms.boundedHeight*(1/2+1/10)}
                        x={dms.boundedWidth*(1/4)}
                        y={dms.boundedHeight/2+13+2}
                        textAnchor="middle"
                        // dy={-20}
                        fontWeight={600} // 400 is the same as normal, and 700 is the same as bold
                        fontSize={"25px"}
                    >{`${Math.floor(data[0].value/data.reduce((prevValue, curValue) => (prevValue.value+curValue.value))*100)}%`}</text>

                    {/* For Each Pie Sector */}
                    <g transform={`translate(${dms.boundedWidth/4}, ${dms.boundedHeight/2+10})`}>
                
                        {arcs.map((singleArc, singleArcIndex) => (
                            // <>
                            <path 
                                key={`arc-${singleArcIndex}`}
                                fill={color(singleArc.data.key)}
                                d={arcGenerator(singleArc)}
                            >
                                {/* <title>{`${singleArc.data.key}: ${singleArc.data.value}`}</title> */}
                            
                            {/* <text
                                transform={`translate(${arcLabel.centroid(singleArc)})`}
                            >
                                {(singleArc.endAngle - singleArc.startAngle) > 0.25 && 
                                <tspan fontWeight="bold">{singleArc.data.value}</tspan>}
                            </text> */}
                            {/* </> */}
                            </path>
                        ))}
                    </g>



                </g>

            </svg>
        </div>
    );
}

export default DonutChartBinary;

