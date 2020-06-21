
// Data format is referenced from https://observablehq.com/@d3/grouped-bar-chart with some modifications
export const randomGroupedBarGraphData = () => {
    let results = [];
    results.columns = ["2018", "2019"];
    results.yAxis = "ค่าใช้จ่ายในการขัดข้อง"
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

// Data format is referenced from https://observablehq.com/@mbostock/the-impact-of-vaccines
export const randomColorMapData = () => {
    let xLabels = ["ก0", "ก1", "ก2", "ก3", "ก4", "ก5", 
                    "ข1", "ข2", "ข3", "ข4", "ข5", "ข6", "ข7", "ข8", "ข9", "ข10", "ข11", "ข12",
                    "ค1", "ค2", "ค3", "ค4", "ค5", "ค6" ];
    let yLabels = []
    for (let i=0; i<29; i++) {
        yLabels.push(`แขวง ${i}`);
    }

    let values = [];
    for (let i=0; i<yLabels.length; i++ ){
        let _tempRow = [];
        let lax = (Math.random() > 0.4) ? true : false;
        for (let j=0; j<xLabels.length; j++){
            // if(Math.random() > 0.8){
            // _tempRow.push(0);
            // }else{
            let value = Math.floor((Math.random()+Math.random()+Math.random())/3*10);
            value = lax ? Math.max(0, value-2.5) : Math.min( 10, value+ 2.5)
            _tempRow.push(value);
            // }
        }
        values.push(_tempRow)
    }

    return {values, xLabels, yLabels};
}

// Data Format is referenced from https://observablehq.com/@marialuisacp/pie-chart
export const randomPieChartData = () => {
    let groups = ["จากอายุการใช้งาน", "จากอุบัติเหตุ", "จากภัยธรรมชาติ", "จากการบำรุงรักษาไม่ต่อเนี่อง", "จากอุปกรณ์ไม่ได้มาตรฐาน", "สาเหตุอื่นๆ"];
    let results = [];
    
    for (let i = 0; i < groups.length; i++) {
        results.push({key: groups[i], value: Math.floor(Math.random()*100)});
    }

    return results;
}