
import React, {DOM, useState, useEffect, useMemo } from 'react';
import { scaleLinear ,scaleTime, scaleBand, scaleQuantize } from "d3-scale";

// References from @d3/color-legend https://observablehq.com/@d3/color-legend
function ColorLegend({
    color,
    title,
    tickSize = 6,
    width = 320,
    height = 44 + tickSize,
    marginTop = 18,
    marginRight = 0,
    marginBottom = 16 + tickSize,
    marginLeft = 0,
    ticks = width / 64,
    tickFormat,
    tickValues
}) {
    useEffect(() => {
        console.log("ColorLegend:: ", color)
        console.log("ColorLegend:: interpolate", color.interpolate)
        console.log("ColorLegend:: interpolator", color.interpolator)
        console.log("ColorLegend:: range", color.range())
    }, []);


    function ramp(color, n = 256) {
        const canvas = DOM.canvas(n, 1);
        const context = canvas.getContext("2d");
        for (let i = 0; i < n; ++i) {
            context.fillStyle = color(i / (n - 1));
            context.fillRect(i, 0, 1, 1);
        }
        return canvas;
    }
    const x = scaleLinear()
    .domain([-1, color.range().length - 1])
    .rangeRound([marginLeft, width - marginRight]);


    return (
        <>
    
     <svg width={width} height={height} viewBox={`0 0 ${width} ${height}]`} overflow="visible" display="block">
        {/* <image
            x={marginLeft}
            y={marginTop}
            width={width - marginLeft - marginRight}
            height={height - marginTop - marginBottom}
            preserveAspectRatio="none"
            // xlinkHref={ramp(color.interpolator()).toDataURL()} 
        /> */}
        {/* Color Range will return 9 hexadecimal colors */}
        {color.range().map((hexColor, index) => (
            <rect 
                x={x(index-1)}
                y={marginTop}
                width={x(index)-x(index-1)}
                height={height-marginTop-marginBottom}
                fill={hexColor}
            />
        ))}
     </svg>
    </>
    );
}

export default ColorLegend;