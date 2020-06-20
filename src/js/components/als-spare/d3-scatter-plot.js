import React, { useState, useEffect } from 'react';
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array"
import AxisBottom from '../common/d3-axis-bottom';
import AxisLeft from '../common/d3-axis-left';
import useChartDimensions from '../../hooks/chart-dimensions-hook'

function RandomData() {
    const data = [...Array(100)].map((e, i) => {
      return {
        x: Math.random() * 40,
        y: Math.random() * 40,
        temparature: Math.random() * 500
      };
    });
    return data;
  }
  const chartSettings = {
    "marginLeft": 20,
    "marginBottom": 20,
    "marginTop": 10,
    "marginRight": 10,

    "height": 200,
}
  
  function ScatterPlot() {
    // useChartDimensions will have a ref to the Chart_wrapper and get its own Height and Width
    // See reference of Amelia Wattenberger https://wattenberger.com/blog/react-and-d3#sizing-responsivity
    const [ref, dms] = useChartDimensions(chartSettings);

    const data = RandomData(),
      w = 600,
      h = 600,
      margin = {
        top: 40,
        bottom: 40,
        left: 40,
        right: 40
      };
  
    const width = w - margin.right - margin.left,
      height = h - margin.top - margin.bottom;
  
    const xScale = scaleLinear()
      .domain(extent(data, d => d.x))
      .range([0, width]);
  
    const yScale = scaleLinear()
      .domain(extent(data, d => d.y))
      .range([height, 0]);
  
    const circles = data.map((d, i) => (
      <circle
        key={i}
        r={5}
        cx={xScale(d.x)}
        cy={yScale(d.y)}
        style={{ fill: "lightblue" }}
      />
    ));
  
    return (
   <div className="Chart_wrapper" ref={ref}>
            <svg width={dms.width} height={dms.height} style={{ border: "1.5px solid gold" }} >
                <g transform={`translate(${dms.marginLeft}, ${dms.marginTop})`}>
                                        
                    <rect
                        width={dms.boundedWidth}
                        height={dms.boundedHeight}
                        fill="#FEF9E7"
                    />
                {circles}
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

  export default ScatterPlot;