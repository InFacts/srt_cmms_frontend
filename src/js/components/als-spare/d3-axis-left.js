import React, { useState, useEffect, useMemo } from 'react';
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array"

const AxisLeft= ({
    domain = [0, 100],
    range = [10, 290],
}) => {

    const ticks = useMemo(() => {
        const yScale = scaleLinear()
            .domain(domain)
            .range(range)
        const height = Math.abs(range[1] - range[0])
        const pixelsPerTick = 30;
        const numberOfTicksTarget = Math.max(1, Math.floor( height / pixelsPerTick));
        return yScale.ticks(numberOfTicksTarget)
            .map(value => ({
                value,
                yOffset: yScale(value)
            }))
    }, [domain.join("-"), range.join("-")]);


    return (
        <>
            <path
                d={[
                    "m", -6, range[0]+range[1], // using m to allow negative values
                    "h", 6, // Duplicate first mark (in case our ticks don't cover the top or bottom of our domain)
                    "v", -range[0], // range[1] is the limit
                    "h", -6, // Duplicate last mark (in case our ticks don't cover the top or bottom of our domain)
                ].join(" ")}
                fill="none"
                stroke="currentColor"
            />

            {ticks.map(({ value, yOffset }) => (
                <g
                    key={value}
                    transform={`translate(0, ${yOffset})`}
                >
                    <line
                        x2="-6"
                        stroke="currentColor"
                    />
                    <text
                        key={value}
                        style={{
                            fontSize: "15px",
                            textAnchor: "middle",
                            transform: "translateX(-13px)"
                        }}>
                        {value}
                    </text>
                </g>
            ))}
        </>
    );
}

export default AxisLeft;