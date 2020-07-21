export const randomHistogramData = () => {
    let results = [];

    results.push(0)
    for (let i = 0; i < 1000; i++) {
        let randomNumber = (Math.random() + Math.random() + Math.random() + Math.random()) / 4*100; 
        results.push(randomNumber);
    }

    return results;
}

// Data Format is referenced from https://observablehq.com/@marialuisacp/pie-chart
export const randomPieChartData = () => {
    let groups = ["1 ปี", "2 ปี", "3 ปี", "4-5 ปี", "5-10 ปี", "10+ ปี"];
    let results = [];
    
    for (let i = 0; i < groups.length; i++) {
        results.push({key: groups[i], value: Math.floor(Math.random()*100)});
    }

    return results;
}


// Data format is referenced from https://observablehq.com/@d3/grouped-bar-chart with some modifications
export const randomGroupedBarGraphData = () => {
    let results = [];
    results.columns = ["ระยะเวลาการทำวาระ", "MTBF - Run to Fail", "MTBF - ของผู้ผลิต"];
    results.yAxis = "MTBF - Run to Fail"
    results.xAxis = "Equipment Item"
    let xGroups = ["ระบบเครื่องกั้นถนน", "ระบบเซนเซอร์", "ระบบโทรคมนาคม", "หม้อแปลงไฟฟ้า", "ระบบโทรทัศน์วงจรปิด (CCTV)", "ระบบประกาศสาธารณะ (PA)"];

    for (let i = 0; i < xGroups.length; i++) {
        results.push({
            [results.xAxis]: xGroups[i],
            [results.columns[0]]: Math.random() * 10000,
            [results.columns[1]]: Math.random() * 8000,
            [results.columns[2]]: Math.random() * 8000,
        });
    }

    return results;
}