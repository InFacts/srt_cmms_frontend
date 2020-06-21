
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