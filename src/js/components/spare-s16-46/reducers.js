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
            ["จำนวน", "", "100px"],
            ["หน่วยนับ", "", "80px"],
            ["ราคาต่อหน่วย", "", "80px"],
            ["จำนวนเงิน", "", "80px"]
        ],
    bodyTable:
        [
            [
                // value, css text center, css gray background, check type
                ["", "text-center", "disable", ""],
                ["", "", "", "search"],
                ["", "", "", "text"],
                ["", "text-center", "disable", ""],
                ["", "text-center", "disable", ""],
                ["", "text-center", "disable", ""],
                ["", "text-center", "disable", ""],
                ["", "text-center", "disable", ""],
                ["", "text-right", "", "number"],
                ["", "text-left", "", ""],
                ["", "text-center", "", ""],
                ["", "text-right", "", ""]
            ],
            [
                ["", "text-center", "disable", ""],
                ["", "", "", "search"],
                ["", "", "", ""],
                ["", "text-center", "disable", ""],
                ["", "text-center", "disable", ""],
                ["", "text-center", "disable", ""],
                ["", "text-center", "disable", ""],
                ["", "text-center", "disable", ""],
                ["", "text-right", "", "number"],
                ["", "text-left", "", ""],
                ["", "text-center", "", ""],
                ["", "text-right", "", ""]
            ]
        ],

    // State Table Satus
    headTableStatus:
        [
            ["", "50px"],
            ["ตำแหน่ง", "100px"],
            ["หน่วยงาน", "250px"],
            ["ชื่อผู้ลงนาม", "250px"],
            ["วันที่ลงนาม", "150px"],
            ["สถานะ", "110px"]
        ],
    bodyTableStatus:
        [
            [
                ["", "50px", "green"],
                ["ช่างฝีมือ", "100px", ""],
                ["ตอนหาดใหญ่ (ผู้ขอเบิก)", "250px", ""],
                ["นายวิชัย ไชยแก้ว", "250px", ""],
                ["31/07/2018 22:24PM", "150px", ""],
                ["ลงนามเรียบร้อยแล้ว", "110px", ""]
            ],
            [
                ["", "50px", "gray"],
                ["ช่างฝีมือ", "100px", ""],
                ["ตอนหาดใหญ่ (ผู้ขอเบิก)", "250px", ""],
                ["นายวิชัย ไชยแก้ว", "250px", ""],
                ["31/07/2018 22:24PM", "150px", ""],
                ["ลงนามเรียบร้อยแล้ว", "110px", ""]
            ]
        ],

    // State Table POPUP
    idPopUpTable: "modalTable",
    variablePopUp: {
        head: "เลขที่สิ่งของ",
        labelFind: "ค้นหาเลขที่สิ่งของ",
        filterInventoryID: ""
    },
    headTablePopUp: [
        ["เลขที่สิ่งของ", "300px"],
        ["รายละเอียดสินค้า", "500px"],
        ["Action", "100px"]
    ],
    bodyTablePopUp:
        [
            [
                // value, css text center, check show or not show, check type text or button
                ["12", "", "block", false],
                ["เครืื่องกั้นถนน", "", "block", false],
                ["", "text-left", "block", true],
                ["10", "", "display-none", false], //คงคลัง
                ["10", "", "display-none", false], //รอส่งมอบ 
                ["10", "", "display-none", false], //ระหว่างการจัดซื้อ	
                ["10", "", "display-none", false], //จำนวนสุทธิ
                ["พร้อมใช้งาน", "", "display-none", false], //สถานะ
                ["ชิ้น", "", "display-none", false], //หน่อยนับ
                ["100", "", "display-none", false] //ราคาต่อหน่วย
            ],
            [
                ["13", "", "block", false],
                ["เครืื่องกั้นถนนไฟฟ้า", "", "block", false],
                ["", "text-left", "block", true],
                ["20", "", "display-none", false], //คงคลัง
                ["20", "", "display-none", false], //รอส่งมอบ 
                ["20", "", "display-none", false], //ระหว่างการจัดซื้อ	
                ["20", "", "display-none", false], //จำนวนสุทธิ
                ["พร้อมใช้งาน", "", "display-none", false], //สถานะ
                ["ชิ้น", "", "display-none", false], //หน่อยนับ
                ["100", "", "display-none", false] //ราคาต่อหน่วย
            ],
            [
                ["33", "", "block", false],
                ["คลังลาดกรบัง222", "", "block", false],
                ["", "text-left", "block", true],
                ["10", "", "display-none", false], //คงคลัง
                ["10", "", "display-none", false], //รอส่งมอบ 
                ["10", "", "display-none", false], //ระหว่างการจัดซื้อ	
                ["10", "", "display-none", false], //จำนวนสุทธิ
                ["พร้อมใช้งาน", "", "display-none", false], //สถานะ
                ["ชิ้น", "", "display-none", false], //หน่อยนับ
                ["100", "", "display-none", false] //ราคาต่อหน่วย
            ]
        ],
    bodyTablePopUp_Show: [],

    // ROW COLUMN ของ TABLE หลัก
    rowBodyTable: "",
    columnBodyTable: "",

    // FOOTER SHow or Not
    show_footer: "block",

    // Variable Top Componant
    no_document: "",
    headTable_list_no_document:
        [
            ["เลขที่คลัง", "300px"],
            ["ชื่อคลัง", "500px"],
            ["Action", "100px"]
        ],
    bodyTable_list_no_document:
        [

            {
                no_document: "1", //เลขที่เอกสาร
                pathfinder: "นายศุภากร", //ผู้เบิก
                status: "เสร็จสิ้น",
                date: "12/09/2560",
                from_inventory: "หาดใหญ๋",
                to_inventory: "ลาดกระบัง",
                type_pickup: 1,
                type_account: "เครดิต",
                total_money: "1000",
                note: ""
            }
            ,

            {
                no_document: "2", //เลขที่เอกสาร
                pathfinder: "นายสรวิศ", //ผู้เบิก
                status: "ยังไม่เสด",
                date: "12/09/2560",
                from_inventory: "หาดใหญ๋",
                to_inventory: "ลาดกระบัง",
                type_pickup: 1,
                type_account: "เครดิต",
                total_money: "1000",
                note: ""
            }
        ]
}
export default (state = initialState, action) => {
    switch (action.type) {
        case "CHANGE SEARCH TYPE HAVE WORD":
            const cloneTableSearch = [...initialState.bodyTable];
            cloneTableSearch[action.rowBodyTable][action.columnBodyTable][0] = action.value;
            initialState.variablePopUp.filterInventoryID = action.value;
            const rowBodyTable = action.rowBodyTable;
            const columnBodyTable = action.columnBodyTable;
            console.log(initialState.variablePopUp.filterInventoryID)
            return {
                ...state,
                bodyTable: cloneTableSearch,
                variablePopUp: {
                    head: initialState.variablePopUp.head,
                    labelFind: initialState.variablePopUp.labelFind,
                    filterInventoryID: action.value
                },
                rowBodyTable: rowBodyTable,
                columnBodyTable: columnBodyTable
            }
        case "ENTER VALUE IN TABLE":
            // console.log(action.key)
            if (action.key === 'Enter') {
                console.log(action.value);
                // state.bodyTablePopUp.map(function (bodyTablePopUp, index) {
                //     console.log("bodyTablePopUp", bodyTablePopUp)
                // })
                const cloneBodyTable = [...initialState.bodyTable];
                state.bodyTablePopUp.map(function (bodyTablePopUp, index) {
                    // console.log(bodyTablePopUp[0][0])
                    if (bodyTablePopUp[0][0] === action.value) {
                        // Array in Javascript cloneBodyTable[ROW][COL]
                        cloneBodyTable[state.rowBodyTable][1][0] = bodyTablePopUp[0][0];
                        cloneBodyTable[state.rowBodyTable][2][0] = bodyTablePopUp[1][0];
                        cloneBodyTable[state.rowBodyTable][3][0] = bodyTablePopUp[3][0];
                        cloneBodyTable[state.rowBodyTable][4][0] = bodyTablePopUp[4][0];
                        cloneBodyTable[state.rowBodyTable][5][0] = bodyTablePopUp[5][0];
                        cloneBodyTable[state.rowBodyTable][6][0] = bodyTablePopUp[6][0];
                        cloneBodyTable[state.rowBodyTable][7][0] = bodyTablePopUp[7][0];
                        cloneBodyTable[state.rowBodyTable][9][0] = bodyTablePopUp[8][0];
                        cloneBodyTable[state.rowBodyTable][10][0] = bodyTablePopUp[9][0];
                        return null
                    }
                    return null
                    // console.log("AFTER", cloneBodyTable)
                })
                return {
                    ...state,
                    bodyTable: cloneBodyTable
                }
            }
            else {
                return state
            }
        case "CLICK SEARCH TYPE NO WORD":
            const cloneTableSearch2 = [...initialState.bodyTable];
            cloneTableSearch2[action.rowBodyTable][action.columnBodyTable][0] = action.value;
            initialState.variablePopUp.filterInventoryID = action.value;
            const rowBodyTable2 = action.rowBodyTable;
            const columnBodyTable2 = action.columnBodyTable;
            // console.log(state.rowBodyTable, "and", state.columnBodyTable)
            return {
                ...state,
                bodyTable: cloneTableSearch2,
                variablePopUp: {
                    head: initialState.variablePopUp.head,
                    labelFind: initialState.variablePopUp.labelFind,
                    filterInventoryID: action.value
                },
                rowBodyTable: rowBodyTable2,
                columnBodyTable: columnBodyTable2
            }
        case "TEXT":
            const cloneTableText = [...initialState.bodyTable];
            cloneTableText[action.rowBodyTable][[action.columnBodyTable]][0] = action.value;
            return {
                ...state,
                bodyTable: cloneTableText
            }
        case "NUMBER":
            const cloneTableNumber = [...initialState.bodyTable];
            cloneTableNumber[action.rowBodyTable][[action.columnBodyTable]][0] = action.value;
            return {
                ...state,
                bodyTable: cloneTableNumber
            }
        case "SEARCH POPUP":
            return {
                ...state,
                variablePopUp: {
                    head: initialState.variablePopUp.head,
                    labelFind: initialState.variablePopUp.labelFind,
                    filterInventoryID: action.value
                }
            }
        case "SUBMIT SEARCH":
            return {
                ...state,
                bodyTablePopUp_Show: initialState.bodyTablePopUp.filter(function (bodyTablePopUp) {
                    const regex = new RegExp(`${state.variablePopUp.filterInventoryID}`, 'i');
                    var isMatch = regex.test(bodyTablePopUp[0]);
                    console.log(state.variablePopUp);
                    return (isMatch);
                }),
            }
        case "SELECT ROW IN POPUP":
            /*
                Parameter
                ----------
                cloneBodyTable:        is clone variable from BodyTable --> # Number of column = 12
                bodyTablePopUp_Show:   is Table in POPUP                --> # Number of column = 10
                rowBodyTable:             COLUMN INDEX of BodyTable (NOT POPUP) from Search
                columnBodyTable:             ROW INDEX of BodyTable (NOT POPUP) from Search
                action.rowIndexPopUp): ROW INDEX of Table in POPUP
            */
            // console.log(state.rowBodyTable, "and", state.columnBodyTable);
            // console.log("rowIndexPopUp", action.rowIndexPopUp);
            const cloneBodyTable = [...initialState.bodyTable];

            // console.log("DONUT HERE", cloneBodyTable);
            // console.log("bodyTablePopUp_Show HERE", state.bodyTablePopUp_Show);

            // For loop: find seleted row index of Table in POPUP
            state.bodyTablePopUp_Show.map(function (bodyTablePopUp_Show, index) {
                // console.log("TEST INDEX", action.rowIndexPopUp, index, "...", state.rowBodyTable);
                // console.log("BEFORE", cloneBodyTable);
                // console.log("TYPE");
                // console.log(typeof action.rowIndexPopUp);
                // console.log(typeof index);
                if (action.rowIndexPopUp === index.toString()) {
                    // Array in Javascript cloneBodyTable[ROW][COL]
                    // console.log(">>>bodyTablePopUp_Show", index, bodyTablePopUp_Show, ">>", bodyTablePopUp_Show[2]);
                    cloneBodyTable[state.rowBodyTable][1][0] = bodyTablePopUp_Show[0][0];
                    cloneBodyTable[state.rowBodyTable][2][0] = bodyTablePopUp_Show[1][0];
                    cloneBodyTable[state.rowBodyTable][3][0] = bodyTablePopUp_Show[3][0];
                    cloneBodyTable[state.rowBodyTable][4][0] = bodyTablePopUp_Show[4][0];
                    cloneBodyTable[state.rowBodyTable][5][0] = bodyTablePopUp_Show[5][0];
                    cloneBodyTable[state.rowBodyTable][6][0] = bodyTablePopUp_Show[6][0];
                    cloneBodyTable[state.rowBodyTable][7][0] = bodyTablePopUp_Show[7][0];
                    cloneBodyTable[state.rowBodyTable][9][0] = bodyTablePopUp_Show[8][0];
                    cloneBodyTable[state.rowBodyTable][10][0] = bodyTablePopUp_Show[9][0];
                    return null;
                }
                return null;
                // console.log("AFTER", cloneBodyTable)
            })
            return {
                ...state,
                bodyTable: cloneBodyTable
            }
        case "CHANGE NO DOCUMENT":
            return {
                ...state,
                no_document: action.value
            }
        default:
            return state
    }
}