
// Data Format is referenced from https://observablehq.com/@marialuisacp/pie-chart
export const randomDonutChartBinaryData = () => {
    let groups = ["จำนวนวาระที่เสร็จสมบูรณ์", "จำนวนวาระที่ไม่เสร็จสมบูรณ์"];
    let results = [];
    
    for (let i = 0; i < groups.length; i++) {
        results.push({key: groups[i], value: Math.floor(Math.random()*100)});
    }
    results.groupShow = groups[0];
    results.totalUnitOfMeasure ="ทั้งหมด";
    results.unitOfMeasure = "#Work Order";

    return results;
}

// Data Format is referenced from https://observablehq.com/@d3/horizontal-bar-chart
export const randomHorizontalBarGraphData = () => {

    let results = [];
    
    for (let i = 0; i < 5; i++) {
        results.push({key: `ตอน ${i}`, value: Math.floor(Math.random()*100)});
    }

    return results;
}

// Data format is referenced from https://observablehq.com/@mbostock/the-impact-of-vaccines
export const randomColorMapData = () => {
    let xLabels = []
    for (let d=new Date(2018, 0, 1); d<new Date(2020, 0, 1); d.setDate(d.getDate() + 7)) {
        xLabels.push(new Date(d));
    }
    let yLabels = []
    for (let i=0; i<99; i++) {
        yLabels.push(`ตอน ${i}`);
    }

    let values = [];
    for (let i=0; i<yLabels.length; i++ ){
        let _tempRow = [];
        let lax = (Math.random() > 0.4) ? true : false;
        for (let j=0; j<xLabels.length; j++){

            let value = Math.floor((Math.random()+Math.random()+Math.random())/3*10);
            value = lax ? Math.max(0, value-2.5) : Math.min( 10, value+ 2.5)
            _tempRow.push(value);
        }
        values.push(_tempRow)
    }

    return {values, xLabels, yLabels};
}