import React, { useState, useEffect, useMemo, useRef } from 'react';
import { scaleLinear, scaleTime , scaleOrdinal, scaleBand} from "d3-scale";
import { extent, max, histogram } from "d3-array";
import { line } from "d3-shape";
import {select} from "d3-selection";
import {axisBottom, axisTop, axisLeft} from "d3-axis";

import AxisBottom from '../common/d3-axis-bottom';
import AxisLeft from '../common/d3-axis-left';
import useChartDimensions from '../../hooks/chart-dimensions-hook'
import { createPortal } from 'react-dom';

const defaultChartSettings = {
    marginLeft: 40,
    marginBottom: 1,
    marginTop: 20,
    marginRight: 10,

    height: 150,
}

// References https://observablehq.com/@d3/grouped-bar-chart
function HorizontalBarGraph({ data, chartSettings, title}) {
    // useChartDimensions will have a ref to the Chart_wrapper and get its own Height and Width
    // See reference of Amelia Wattenberger https://wattenberger.com/blog/react-and-d3#sizing-responsivity
    const [ref, dms] = useChartDimensions({ ...defaultChartSettings, ...chartSettings });
    
    // Using Shirley Wu's Hack on Axes Ref's: D3 and React, Together - Shirley Wu https://www.youtube.com/watch?v=zXBdNDnqV2Q 
    // In addition to how to useRef with `.current` from https://medium.com/@mautayro/d3-react-and-using-refs-e25b9a817a43
    const xAxis = useRef(null)
    const yAxis = useRef(null)

    const [xDomain, setXDomain] = useState([0, 1000]);
    const [yDomain, setYDomain] = useState([0, 1000]);


    const xScale = useMemo(() => (
        scaleLinear()
            .domain(xDomain)
            .rangeRound([0, dms.boundedWidth])
    ), [dms.boundedWidth, xDomain.join("-")])

    const yScale = useMemo(() => (
        scaleBand()
            .domain(yDomain)
            .range([0, dms.boundedHeight])
            .padding(0.1)
    ), [dms.boundedHeight, yDomain.join("-")])


    // set Domain of x and y after new data.
    useEffect(() => {
        if (!data) {
            console.log("HorizontalBarGraph: There is no data! ");
        } else { // There is data
            setXDomain([0, max(data, d => d.value)]);
            setYDomain(data.map(d => d.key)); 
        }
    }, [data]);

    useEffect(() => {
        select(xAxis.current)
            .style("font-size", "15px")
            .call(axisTop(xScale))
            .call(g => g.select(".domain").remove());

        select(yAxis.current)
            .style("font-size", "15px")
            .call(axisLeft(yScale).tickSizeOuter(0));
    }, [xAxis, xScale, yAxis])


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



                    {/* For Each Rects */}
                    {data.map((d, index)=>(
                        <rect 
                            key={`horizontal-bar-rect-${index}`}
                            x={xScale(0)}
                            y={yScale(d.key)}
                            width={xScale(d.value)-xScale(0)}
                            height={yScale.bandwidth()}
                            fill={"#4F4F4F"}
                        />
                    ))}



                    {/* === xAxis === */}
                    <g>
                        <g ref={xAxis} />
                    </g>
                    {/* === yAxis === */}
                    <g>
                        <g ref={yAxis} />
                    </g>


                </g>

            </svg>
        </div>
    );
}

export default HorizontalBarGraph;

