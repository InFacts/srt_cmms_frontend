import React, { useState, useEffect, useMemo } from 'react';
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array"

const Axis = ({
    domain = [0, 100],
    range = [10, 290],
}) => {

    const ticks = useMemo(() => {
        const xScale = scaleLinear()
            .domain(domain)
            .range(range)
        const width = range[1] - range[0];
        const pixelsPerTick = 30;
        const numberOfTicksTarget = Math.max(1, Math.floor(width / pixelsPerTick));
        return xScale.ticks(numberOfTicksTarget)
            .map(value => ({
                value,
                xOffset: xScale(value)
            }))
    }, [domain.join("-"), range.join("-")]);


    return (
        <>
            <svg width="auto" height="auto" style={{ border: "2px solid gold" }} >
                <path
                    d={[
                        "M", range[0], 6, 
                        "v", -6, // Duplicate first mark (in case our ticks don't cover the top or bottom of our domain)
                        "H", range[1], 
                        "v", 6, // Duplicate last mark (in case our ticks don't cover the top or bottom of our domain)
                    ].join(" ")}
                    fill="none" 
                    stroke="currentColor" 
                />

                {ticks.map(({ value, xOffset }) => (
                    <g
                        key={value}
                        transform={`translate(${xOffset}, 0)`}
                    >
                        <line
                            y2="6"
                            stroke="currentColor"
                        />
                        <text
                            key={value}
                            style={{
                                fontSize: "10px",
                                textAnchor: "middle",
                                transform: "translateY(20px)"
                            }}>
                            {value}
                        </text>
                    </g>
                ))}
            </svg>
        </>
    );
}

export default Axis;