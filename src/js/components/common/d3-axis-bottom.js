import React, { useState, useEffect, useMemo } from 'react';
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array"

function toJSONLocal (date) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    // return local.toJSON().slice(0, 10);
    return local.toJSON().slice(2, 7);
}

const AxisBottom = ({xScale}) => {

    const width = xScale.range()[1] - xScale.range()[0];

    // const ticks = useMemo(() => {
    //     const xScale = scaleLinear()
    //         .domain(domain)
    //         .range(range)
        
    //     const pixelsPerTick = 30;
    //     const numberOfTicksTarget = Math.max(1, Math.floor( width / pixelsPerTick));
    //     return xScale.ticks(numberOfTicksTarget)
    //         .map(value => ({
    //             value,
    //             xOffset: xScale(value)
    //         }))
    // }, [domain.join("-"), range.join("-")]);

    const ticks = useMemo(() => {
        const pixelsPerTick = 30;
        const numberOfTicksTarget = Math.max(1, Math.floor( width / pixelsPerTick));
        if (xScale.ticks) {
            return xScale.ticks(numberOfTicksTarget)
            .map(value => ({
                value,
                xOffset: xScale(value)
            }))
        } else { // This could be ordinal
            return xScale.domain().map(value => ({
                value,
                xOffset: xScale(value)
            }))
        }
        
    }, [ xScale.range().join("-"), xScale.domain().join("-")]);

    return (
        <>
            <path
                d={[
                    "M", xScale.range()[0], 6,
                    "v", -6, // Duplicate first mark (in case our ticks don't cover the top or bottom of our domain)
                    "H", xScale.range()[1],
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
                            fontSize: "13px",
                            textAnchor: "middle",
                            transform: "translateY(17px)"
                        }}>
                        {(value instanceof Date) ? toJSONLocal(value) :value}
                    </text>
                </g>
            ))}
        </>
    );
}

export default AxisBottom;