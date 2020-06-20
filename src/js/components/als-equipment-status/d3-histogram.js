import React, { useState, useEffect, useMemo } from 'react';
import { scaleLinear, scaleTime } from "d3-scale";
import { extent, max, histogram } from "d3-array";
import { line } from "d3-shape";

import AxisBottom from '../common/d3-axis-bottom';
import AxisLeft from '../common/d3-axis-left';
import useChartDimensions from '../../hooks/chart-dimensions-hook'

const defaultChartSettings = {
    marginLeft: 20,
    marginBottom: 20,
    marginTop: 10,
    marginRight: 10,

    height: 250,
}

function Histogram({ data, chartSettings, title, xAxis, yAxis}) {
    // useChartDimensions will have a ref to the Chart_wrapper and get its own Height and Width
    // See reference of Amelia Wattenberger https://wattenberger.com/blog/react-and-d3#sizing-responsivity
    const [ref, dms] = useChartDimensions({ ...defaultChartSettings, ...chartSettings });


    const [binDomain, setBinDomain] = useState([0, 1000]);
    const [frequencyDomain, setFrequencyDomain] = useState([0, 1000]);
    const [bins, setBins] = useState([]);


    const xScale = useMemo(() => (
        scaleLinear()
            .domain(binDomain)
            .range([0, dms.boundedWidth])
    ), [dms.boundedWidth, binDomain.join("-")])

    const yScale = useMemo(() => (
        scaleLinear()
            .domain(frequencyDomain)
            .range([dms.boundedHeight, 0])
    ), [dms.boundedHeight, frequencyDomain.join("-")])



    // set Domain of x and y after new data.
    useEffect(() => {
        if (!data) {
            console.log("There is no data! Line Graph.");
        } else { // There is data
            setBinDomain(extent(data));
            setFrequencyDomain([0, max(bins, d => d.length)]); // Move up by 10% of the max
        }
    }, [data, bins]);

    // Draw Line after data, xScale/yScale is updated
    useEffect(() => {
        if (data) {
            let _bins= histogram()
                        .domain(xScale.domain())
                        .thresholds(xScale.ticks(16))
                        (data)
            console.log("Histogram:: data bins", data,bins)
            setBins(_bins);
        }
    }, [data, xScale]);


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
                        font-size="22px"
                        // transform={`translate(${dms.width/2}, ${dms.marginTop})`}
                    >{title}</text>

                    {/* xAxis Label */}
                    <text
                        x="50%"
                        text-anchor="middle"
                        y={dms.boundedHeight+15+20}
                        font-weight="bold"
                    >{xAxis}</text>

                    {/* yAxis Label */}
                    <text
                        // x={dms.marginLeft}
                        text-anchor="middle"
                        y={-10}
                        font-weight="bold"
                    >{yAxis}</text>



                    {/* Histogram Rects */}
                    {bins.map((bin)=>(
                        <rect 
                            x={xScale(bin.x0) + 1}
                            y={yScale(bin.length)}

                            width={Math.max(0, xScale(bin.x1) - xScale(bin.x0) - 1)}
                            height={yScale(0)-yScale(bin.length)}

                            fill="steelblue"
                        />
                    ))}




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

export default Histogram;

