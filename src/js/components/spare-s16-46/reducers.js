const initialState = {
    headTable:
        [
            ["#", "text-center", "30px"],
            ["เลขที่อะไหล่", "", "130px"],
            ["ชื่ออะไหล่", "", "250px"],
            ["คงคลัง", "text-center", "80px"],
            ["รอส่งมอบ", "text-center", "80px"],
            ["ระหว่างการจัดซื้อ", "text-center", "80px"],
            ["จำนวนสุทธิ", "text-center", "80px"],
            ["สถานะ", "text-center", "80px"],
            ["จำนวน", "", "80px"],
            ["หน่วยนับ", "", "80px"],
            ["ราคาต่อหน่วย", "", "80px"],
            ["จำนวนเงิน", "", "80px"]
        ],
    bodyTable:
        [
            [
                // value, css text center, css gray background, check input search modal if ture 
                ["", "text-center", "disable", ""],
                ["textInput", "", "", true],
                ["", "", "", ""],
                ["", "text-center", "disable", ""],
                ["", "text-center", "disable", ""],
                ["", "text-center", "disable", ""],
                ["", "text-center", "disable", ""],
                ["", "text-center", "disable", ""],
                ["", "text-right", "", ""],
                ["", "text-left", "", ""],
                ["", "text-right", "", ""],
                ["", "text-right", "", ""],
            ],
            [
                // value, css text center, css gray background, check input search modal if ture 
                ["", "text-center", "disable", ""],
                ["textInput", "", "", true],
                ["", "", "", ""],
                ["", "text-center", "disable", ""],
                ["", "text-center", "disable", ""],
                ["", "text-center", "disable", ""],
                ["", "text-center", "disable", ""],
                ["", "text-center", "disable", ""],
                ["", "text-right", "", ""],
                ["", "text-left", "", ""],
                ["", "text-right", "", ""],
                ["", "text-right", "", ""],
            ]
        ]
}
export default (state = initialState, action) => {
    switch (action.type) {
        case "TEXT":
            return {
                ...state,
                text: action.value
            }
        default:
            return state
    }
}