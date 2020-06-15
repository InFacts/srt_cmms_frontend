import React, { useState, useEffect, useMemo } from 'react';
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array"

const AxisBottom = ({
    domain = [0, 100],
    range = [10, 290],
}) => {

    const width = range[1] - range[0];

    const ticks = useMemo(() => {
        const xScale = scaleLinear()
            .domain(domain)
            .range(range)
        
        const pixelsPerTick = 30;
        const numberOfTicksTarget = Math.max(1, Math.floor( width / pixelsPerTick));
        return xScale.ticks(numberOfTicksTarget)
            .map(value => ({
                value,
                xOffset: xScale(value)
            }))
    }, [domain.join("-"), range.join("-")]);


    return (
        <>
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
                            fontSize: "15px",
                            textAnchor: "middle",
                            transform: "translateY(17px)"
                        }}>
                        {value}
                    </text>
                </g>
            ))}
        </>
    );
}

export default AxisBottom;