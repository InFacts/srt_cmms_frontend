export const getAnnualInventoryMonthData = () => {
    let results = [];
    let dataPoints = 10;
    let date = new Date("October 13, 2014");
    for (let i = 0; i < dataPoints; i++) {
        results.push({
            date: new Date(date),
            inventory_month: Math.random() * 10,
        });
        date.setMonth(date.getMonth() + 1);
    }
    return results;
}

export const randomDivergingBarGraphData = () => {
    let results = [];

    //set the default value of i & j to print A to Z
    var charCodeA = 65;
    var charCodeZ = 91;

    for (let charCode = charCodeA; charCode < charCodeZ; charCode++) {
        results.push({
            name: String.fromCharCode(charCode),
            value_neg: -Math.random() * 200,
            value_pos: Math.random() * 200,
        });
    }

    return results;
}

// Data Format Referenced from https://observablehq.com/@d3/scatterplot
export function randomScatterPlotData() {
    const data = [...Array(500)].map((e, i) => ({
        name: `Item ${i}`,
        x: Math.random() * 40,
        y: Math.random() * 40,
      
    }));

    data.xAxisLabel = "Inv. Month ปัจจุบัน →";
    data.yAxisLabel = "↑ แผน Inv. Month";
    data.hasComparisonLine = true;
    data.tolerance = 0.05; 

    return data;
  }

// Data Format Referenced from https://observablehq.com/@d3/multi-line-chart
export const getMultiLineGraphData = () => {
    let results = [];
    let dataPoints = 10;
    let date = new Date("October 13, 2014");
    for (let i = 0; i < dataPoints; i++) {
        results.push({
            date: new Date(date),
            inventory_month: Math.random() * 10,
        });
        date.setMonth(date.getMonth() + 1);
    }
    return results;
}