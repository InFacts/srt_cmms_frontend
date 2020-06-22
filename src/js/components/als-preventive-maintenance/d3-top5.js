import React, { useState, useEffect, useMemo, useRef } from 'react';

import DonutChartBinary from './d3-donut-chart-binary';
import HorizontalBarGraph from './d3-horizontal-bar-graph';

import { randomDonutChartBinaryData, randomHorizontalBarGraphData } from './mockup-data';

const Top5Component = ({ data, chartSettings, title}) => {

    return (
        <>  
        <div>
            <h5 className="top5-title">{title}</h5>    

        
            <DonutChartBinary 
                data={randomDonutChartBinaryData()}
                chartSettings={{
                    marginTop:1,
                    marginBottom: 20,
                    height: 90,
                }}
            />

            <HorizontalBarGraph 
                data={randomHorizontalBarGraphData()}
            />
            </div>
        </>
    )
}

export default Top5Component;