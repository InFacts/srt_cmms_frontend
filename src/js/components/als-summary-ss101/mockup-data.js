
// Data format is referenced from https://observablehq.com/@d3/grouped-bar-chart with some modifications
export const randomGroupedBarGraphData = () => {
    let results = [];
    results.columns = ["2018", "2019"];
    results.yAxis = "ค่าใช้จ่ายในการขัดข้อง"
    results.xAxis = "เดือน"
    let xGroups = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];

    for (let i = 0; i < xGroups.length; i++) {
        results.push({
            [results.xAxis]: xGroups[i],
            [results.columns[0]]: Math.random() * 10000,
            [results.columns[1]]: Math.random() * 8000,
        });
    }
    console.log("results ..", results)
    return results;
}
export const randomGroupedBarGraphDataMTBF = () => {
    let results = [];
    results.columns = ["2018", "2019"];
    results.yAxis = "ระยะเวลาขัดข้อง"
    results.xAxis = "เดือน"
    let xGroups = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];

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
    let xLabels = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    let yLabels = ["สสญ.ธบ.", "สสญ.อย.", "สสญ.ก.", "สญก.", "สญค.", "สญพ.", "สสญ.กค.", "สสญ.ลช.", "สสญ.ขอ.", "สสญ.นว.","สสญ.ลป.",
                    "สสญ.หห.", "สสญ.ทส.", "สสญ.หใ.", "สสญ.ฉท.","สสญ.ศช."]
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

// Data Format is referenced from https://observablehq.com/@marialuisacp/pie-chart
export const randomPieChartData = () => {
    let groups = ["รอเครื่องมือและอะไหล่", "ธรรมชาติไม่เอื้ออำนวย", "รอเวลาในการซ่อมแก้ไข", "พนักงานไม่เพียงพอ", "พาหนะไม่มี", "ระยะทางไกล", "สาเหตุอื่นๆ", "ไม่มี"];
    let results = [];
    
    for (let i = 0; i < groups.length; i++) {
        results.push({key: groups[i], value: Math.floor(Math.random()*100)});
    }

    return results;
}

// Data Format is referenced from https://observablehq.com/@marialuisacp/pie-chart
export const randomPieChartDataSystemType = () => {
    let groups = ["ระบบอาณัติสัญญาณ", 
                    "ระบบสายส่ง", 
                    "ระบบทางผ่านเครื่องกั้นถนน", 
                    "ระบบเครื่องทางสะดวก", 
                    "ระบบโทรศัพท์", 
                    "ระบบไฟฟ้า", 
                    "ระบบโทรพิมพ์", 
                    "ระบบวิทยุ", 
                    "ระบบอิเล็กทรอนิกส์"]; 

    let results = [];
    
    for (let i = 0; i < groups.length; i++) {
        results.push({key: groups[i], value: Math.floor(Math.random()*100)});
    }

    return results;
}