import React, { useState, useEffect, useMemo } from 'react';
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array"

import AxisBottom from './d3-axis-bottom';
import AxisLeft from './d3-axis-left';
import useChartDimensions from './chart-dimensions-hook'

const chartSettings = {
    "marginLeft": 20,
    "marginBottom": 20,
    "marginTop": 10,
    "marginRight": 10,

    "height": 200,
}

function LineGraph() {
    // useChartDimensions will have a ref to the Chart_wrapper and get its own Height and Width
    // See reference of Amelia Wattenberger https://wattenberger.com/blog/react-and-d3#sizing-responsivity
    const [ref, dms] = useChartDimensions(chartSettings);

    const xScale = useMemo(() => (
        scaleLinear()
            .domain([0, 100])
            .range([0, dms.boundedWidth])
    ), [dms.boundedWidth])

    const yScale = useMemo(() => (
        scaleLinear()
            .domain([0, 100])
            .range([dms.boundedHeight, 0])
    ), [dms.boundedHeight])
    console.log('this is yscale ', yScale.range())


    return (
        <div className="Chart_wrapper" ref={ref}>
            <svg width={dms.width} height={dms.height} style={{ border: "1.5px solid gold" }} >
                <g transform={`translate(${dms.marginLeft}, ${dms.marginTop})`}>
                    <rect
                        width={dms.boundedWidth}
                        height={dms.boundedHeight}
                        fill="lavender"
                    />
                    <g transform={`translate(0, ${dms.boundedHeight})`}>
                        <AxisBottom domain={xScale.domain()} range={xScale.range()} />
                    </g>
                    <g >
                        <AxisLeft domain={yScale.domain()} range={yScale.range()} />
                    </g>

                </g>

            </svg>
        </div>
    );
}

export default LineGraph;