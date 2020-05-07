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
                ["100", "", "display-none", false], //ราคาต่อหน่วย
            ]
        ],
    bodyTablePopUp_Show: [],

    // ROW COLUMN ของ TABLE หลัก
    rowBodyTable: "",
    columnBodyTable: "",

    // FOOTER SHow or Not
    show_footer: "block",

    // Variable PopUp no document
    no_document: "",
    headTable_list_no_document:
        [
            ["เลขที่เอกสาร", "300px"],
            ["ผู้เบิก", "500px"],
            ["Action", "100px"]
        ],
    bodyTable_list_no_document:
        [
            {
                variousValues:
                    [
                        [
                            // value, css show dom, ระบุว่าเป็น text หรือ button
                            ["1", "block", false], //เลขที่เอกสาร
                            ["นายศุภากร", "block", false], //ผู้เบิก
                            ["", "block", true], //button ในpopUp
                            ["เสร็จสิ้น", "display-none", false],  //status
                            ["2020-05-05", "display-none", false], //date
                            ["หาดใหญ๋", "display-none", false],  //from_inventory
                            ["ลาดกระบัง", "display-none", false],  //to_inventory
                            [1, "display-none", false], //type_pickup
                            ["เครดิต", "display-none", false], //type_account
                            ["1000", "display-none", false], //total_money
                            ["", "display-none", false],  //note
                        ],
                        [
                            // value, css show dom, ระบุว่าเป็น text หรือ button
                            ["2", "block", false], //เลขที่เอกสาร
                            ["นายสรวิศ", "block", false], //ผู้เบิก
                            ["", "block", true], //button ในpopUp
                            ["เสร็จสิ้น", "display-none", false],  //status
                            ["2020-10-05", "display-none", false], //date
                            ["หาดใหญ๋", "display-none", false],  //from_inventory
                            ["ลาดกระบัง", "display-none", false],  //to_inventory
                            [1, "display-none", false], //type_pickup
                            ["เครดิต", "display-none", false], //type_account
                            ["1000", "display-none", false], //total_money
                            ["", "display-none", false],  //note
                        ]
                    ]
            },
            {
                bodyTable:
                    [
                        {
                            0:
                                [
                                    [
                                        // value, css text center, css gray background, check type
                                        ["1", "text-center", "disable", ""],
                                        ["100", "", "", "search"],
                                        ["เครื่องกั้นไฟฟ้า", "", "", "text"],
                                        ["10", "text-center", "disable", ""],
                                        ["10", "text-center", "disable", ""],
                                        ["10", "text-center", "disable", ""],
                                        ["10", "text-center", "disable", ""],
                                        ["10", "text-center", "disable", ""],
                                        ["5", "text-right", "", "number"],
                                        ["ชิ้น", "text-left", "", ""],
                                        ["100", "text-center", "", ""],
                                        ["500", "text-right", "", ""]
                                    ],
                                    [
                                        // value, css text center, css gray background, check type
                                        ["2", "text-center", "disable", ""],
                                        ["200", "", "", "search"],
                                        ["วิทยุ", "", "", "text"],
                                        ["20", "text-center", "disable", ""],
                                        ["20", "text-center", "disable", ""],
                                        ["20", "text-center", "disable", ""],
                                        ["20", "text-center", "disable", ""],
                                        ["20", "text-center", "disable", ""],
                                        ["10", "text-right", "", "number"],
                                        ["เครื่อง", "text-left", "", ""],
                                        ["200", "text-center", "", ""],
                                        ["1000", "text-right", "", ""]
                                    ]
                                ]
                        },
                        {
                            1:
                                [
                                    [
                                        // value, css text center, css gray background, check type
                                        ["1", "text-center", "disable", ""],
                                        ["100", "", "", "search"],
                                        ["เครื่องกั้นไฟฟ้า", "", "", "text"],
                                        ["10", "text-center", "disable", ""],
                                        ["10", "text-center", "disable", ""],
                                        ["10", "text-center", "disable", ""],
                                        ["10", "text-center", "disable", ""],
                                        ["10", "text-center", "disable", ""],
                                        ["5", "text-right", "", "number"],
                                        ["ชิ้น", "text-left", "", ""],
                                        ["100", "text-center", "", ""],
                                        ["500", "text-right", "", ""]
                                    ]
                                ]
                        }
                    ]
            }

        ],
    bodyTable_list_no_document_Show:
        [
            {
                variousValues:
                    [
                        []
                    ]
            },
            {
                bodyTable:
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
            }
        ],

    // Variable Componant
    name: "",
    status: "",
    date: "",
    from_inventory: "",
    to_inventory: "",
    type_pickup: "",  //ยังไม่ได้ใช้
    type_account: "",
    total_money: "",
    note: ""
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
                    console.log(bodyTablePopUp[0])
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
        case "SEARCH NO DOCUMENT":
            // มี bug ที่เกิดขึ้นคือ ค้นหาเลขที่เอกสารแล้วมันไม่ขึ้น
            const cloneNewListNoDocument = [...initialState.bodyTable_list_no_document];
            const filterVariousValues = initialState.bodyTable_list_no_document[0].variousValues.filter(function (cloneListNoDocument) {
                // console.log(cloneListNoDocument[0][0])
                const regex = new RegExp(`${state.no_document}`, 'i');
                var isMatch = regex.test(cloneListNoDocument[0][0]);
                // console.log(isMatch)
                return isMatch
            })
            // console.log("filter" ,filter)
            cloneNewListNoDocument[0].variousValues = filterVariousValues;
            return {
                ...state,
                bodyTable_list_no_document_Show: cloneNewListNoDocument
            }
        case "SELECT NO DOCUMENT IN POPUP":
            // console.log(state.bodyTable_list_no_document_Show)
            var clone_bodyTable = [...initialState.bodyTable];
            clone_bodyTable = state.bodyTable_list_no_document[1].bodyTable[action.rowPopUpDocument][action.rowPopUpDocument]
            console.log(clone_bodyTable)
            return {
                ...state,
                no_document: state.bodyTable_list_no_document_Show[0].variousValues[action.rowPopUpDocument][0][0],
                name: state.bodyTable_list_no_document_Show[0].variousValues[action.rowPopUpDocument][1][0],
                status: state.bodyTable_list_no_document_Show[0].variousValues[action.rowPopUpDocument][3][0],
                date: state.bodyTable_list_no_document_Show[0].variousValues[action.rowPopUpDocument][4][0],
                from_inventory: state.bodyTable_list_no_document_Show[0].variousValues[action.rowPopUpDocument][5][0],
                to_inventory: state.bodyTable_list_no_document_Show[0].variousValues[action.rowPopUpDocument][6][0],
                type_pickup: state.bodyTable_list_no_document_Show[0].variousValues[action.rowPopUpDocument][7][0],  //ยังไม่ได้ใช้
                type_account: state.bodyTable_list_no_document_Show[0].variousValues[action.rowPopUpDocument][8][0],
                total_money: state.bodyTable_list_no_document_Show[0].variousValues[action.rowPopUpDocument][9][0],
                note: state.bodyTable_list_no_document_Show[0].variousValues[action.rowPopUpDocument][10][0],
                bodyTable: clone_bodyTable
            }
        default:
            return state
    }
}