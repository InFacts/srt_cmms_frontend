// Data format is referenced from https://observablehq.com/@d3/grouped-bar-chart with some modifications
export const randomGroupedBarGraphData = () => {
    let results = [];
    results.columns = ["2018", "2019"];
    results.yAxis = "ระยะเวลาเฉลี่ย"
    results.xAxis = "ประเภท"
    let xGroups = ["ก0", "ก1", "ก2", "ก3", "ก4", "ก5", "ข1", "ข2", "ข3", "ข4", "ข5", "ข6", "ข7", "ข8", "ข9", "ข10", "ข11", "ข12"]

    for (let i = 0; i < xGroups.length; i++) {
        results.push({
            [results.xAxis]: xGroups[i],
            [results.columns[0]]: Math.random() * 10000,
            [results.columns[1]]: Math.random() * 8000,
        });
    }

    return results;
}
