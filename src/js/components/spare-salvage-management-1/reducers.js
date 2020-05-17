const initialState = {
    // ค่าคงที่ต่างๆ
    // ค่าคงที่เอกสาร
    document: [
        {
            "id": 1,
            "no_document": "12345",
            "name": "นายศุภากร ศิริมาลีวัฒนนา",
            "date": "2014-02-09",
            "to_inventory": "200",
            "pick_up": 1,    // 1 รับของเอง  2 ส่งไปยังคลังปลายทาง
            
            "total": 3000,
            "note": "",
            "table_part": [
                {
                    "id": 1,
                    "no_part": "SIG 003",
                    "name_part": "SIG ขนาด 5V.",
                    "stock": 10,
                    "wait_sent": 10,
                    "wait_po": 10,
                    "real_stock": 10,
                    "status": "ซาก",
                    "quility": 10,
                    "unit": "อัน",
                    "parent_unit": "sig",
                    "unit_per_bath": 100,
                    "total": 1000
                },
                {
                    "id": 2,
                    "no_part": "SIG 004",
                    "name_part": "SIG ขนาด 5V.",
                    "stock": 10,
                    "wait_sent": 10,
                    "wait_po": 10,
                    "real_stock": 10,
                    "status": "ซาก",
                    "quility": 10,
                    "unit": "อัน",
                    "parent_unit": "sig",
                    "unit_per_bath": 100,
                    "total": 1000
                },
                {
                    "id": 3,
                    "no_part": "เครื่องกั้นไฟฟ้า",
                    "name_part": "เครื่องกั้นไฟฟ้า ขนาด 5V.",
                    "stock": 10,
                    "wait_sent": 10,
                    "wait_po": 10,
                    "real_stock": 10,
                    "status": "ซาก",
                    "quility": 10,
                    "unit": "เครื่อง",
                    "parent_unit": "เครื่องกั้นไฟฟ้า",
                    "unit_per_bath": 100,
                    "total": 1000
                },
                {
                    "id": "",
                    "no_part": "",
                    "name_part": "",
                    "stock": "",
                    "wait_sent": "",
                    "wait_po": "",
                    "real_stock": "",
                    "status": "",
                    "quility": "",
                    "unit": "",
                    "parent_unit": "",
                    "unit_per_bath": "",
                    "total": ""
                },

                {
                    "id": "",
                    "no_part": "",
                    "name_part": "",
                    "stock": "",
                    "wait_sent": "",
                    "wait_po": "",
                    "real_stock": "",
                    "status": "",
                    "quility": "",
                    "unit": "",
                    "parent_unit": "",
                    "unit_per_bath": "",
                    "total": ""
                },

                {
                    "id": "",
                    "no_part": "",
                    "name_part": "",
                    "stock": "",
                    "wait_sent": "",
                    "wait_po": "",
                    "real_stock": "",
                    "status": "",
                    "quility": "",
                    "unit": "",
                    "parent_unit": "",
                    "unit_per_bath": "",
                    "total": ""
                },

                {
                    "id": "",
                    "no_part": "",
                    "name_part": "",
                    "stock": "",
                    "wait_sent": "",
                    "wait_po": "",
                    "real_stock": "",
                    "status": "",
                    "quility": "",
                    "unit": "",
                    "parent_unit": "",
                    "unit_per_bath": "",
                    "total": ""
                },

                {
                    "id": "",
                    "no_part": "",
                    "name_part": "",
                    "stock": "",
                    "wait_sent": "",
                    "wait_po": "",
                    "real_stock": "",
                    "status": "",
                    "quility": "",
                    "unit": "",
                    "parent_unit": "",
                    "unit_per_bath": "",
                    "total": ""
                },

                {
                    "id": "",
                    "no_part": "",
                    "name_part": "",
                    "stock": "",
                    "wait_sent": "",
                    "wait_po": "",
                    "real_stock": "",
                    "status": "",
                    "quility": "",
                    "unit": "",
                    "parent_unit": "",
                    "unit_per_bath": "",
                    "total": ""
                },

                {
                    "id": "",
                    "no_part": "",
                    "name_part": "",
                    "stock": "",
                    "wait_sent": "",
                    "wait_po": "",
                    "real_stock": "",
                    "status": "",
                    "quility": "",
                    "unit": "",
                    "parent_unit": "",
                    "unit_per_bath": "",
                    "total": ""
                },
            ],
            "table_status": [
                {
                    "role": "ช่างฝีมือ 6",
                    "department": "ตอนหาดใหญ่ (ผู้ขอเบิก)",
                    "name": "นายวินัย ชัยแก้ว",
                    "date": "2020-12-01 12:32",
                    "status": "ลงนามเรียบร้อย"
                },
                {
                    "role": "สสญ.",
                    "department": "แขวงบำรุงรักษาอาณัติสัญญาณหาดใหญ่",
                    "name": "นายภาคิน แก้วสองเมือง",
                    "date": "",
                    "status": "รอการอนุมัติ"
                },
                {
                    "role": "วศญ.2",
                    "department": "กองบำรุงรักษาเขต 2",
                    "name": "นายเฉลียว ฤทธิ",
                    "date": "",
                    "status": "รอการอนุมัติ"
                },
                {
                    "role": "วสส.",
                    "department": "กองอาณัติสัญญาณ",
                    "name": "นายวิระ สายไหม",
                    "date": "",
                    "status": "รอการอนุมัติ"
                },
                {
                    "role": "สสม.",
                    "department": "งานระบบเครื่องกล",
                    "name": "นายศิวกร ศิริ",
                    "date": "",
                    "status": "รอการอนุมัติ"
                }
            ],
            "raw_no_part": [
                {
                    "id": 1,
                    "no_part": "SIG 003",
                    "name_part": "SIG ขนาด 5V.",
                    "stock": 10,
                    "wait_sent": 10,
                    "wait_po": 10,
                    "real_stock": 10,
                    "status": "ซาก",
                    "parent_unit": "sig",
                    "unit_per_bath": 100,
                },
                {
                    "id": 2,
                    "no_part": "เครื่องกั้นไฟฟ้า",
                    "name_part": "เครื่องกั้นไฟฟ้า ขนาด 5V.",
                    "stock": 10,
                    "wait_sent": 10,
                    "wait_po": 10,
                    "real_stock": 10,
                    "status": "ของเก่า",
                    "parent_unit": "เครื่องกั้น",
                    "unit_per_bath": 100,
                },
                {
                    "id": 3,
                    "no_part": "SIG 004",
                    "name_part": "SIG ขนาด 5V.",
                    "stock": 10,
                    "wait_sent": 10,
                    "wait_po": 10,
                    "real_stock": 10,
                    "status": "ซาก",
                    "parent_unit": "sig",
                    "unit_per_bath": 100,
                }
            ]
        },
        {
            "id": 2,
            "no_document": "6789",
            "name": "นายสรวิศ ศิริมาลีวัฒนนา",
            "date": "2014-02-09",
            "to_inventory": "200",
            "pick_up": 1,    // 1 รับของเอง  2 ส่งไปยังคลังปลายทาง
            "total": 2000,
            "note": "",
            "table_part": [
                {
                    "id": 1,
                    "no_part": "SIG 003",
                    "name_part": "SIG ขนาด 5V.",
                    "stock": 10,
                    "wait_sent": 10,
                    "wait_po": 10,
                    "real_stock": 10,
                    "status": "ซาก",
                    "quility": 10,
                    "unit": "อัน",
                    "parent_unit": "sig",
                    "unit_per_bath": 100,
                    "total": 1000
                },
                {
                    "id": 2,
                    "no_part": "SIG 004",
                    "name_part": "SIG ขนาด 5V.",
                    "stock": 10,
                    "wait_sent": 10,
                    "wait_po": 10,
                    "real_stock": 10,
                    "status": "ซาก",
                    "quility": 10,
                    "unit": "อัน",
                    "parent_unit": "sig",
                    "unit_per_bath": 100,
                    "total": 1000
                },
                {
                    "id": "",
                    "no_part": "",
                    "name_part": "",
                    "stock": "",
                    "wait_sent": "",
                    "wait_po": "",
                    "real_stock": "",
                    "status": "",
                    "quility": "",
                    "unit": "",
                    "parent_unit": "",
                    "unit_per_bath": "",
                    "total": ""
                },
                {
                    "id": "",
                    "no_part": "",
                    "name_part": "",
                    "stock": "",
                    "wait_sent": "",
                    "wait_po": "",
                    "real_stock": "",
                    "status": "",
                    "quility": "",
                    "unit": "",
                    "parent_unit": "",
                    "unit_per_bath": "",
                    "total": ""
                },
                {
                    "id": "",
                    "no_part": "",
                    "name_part": "",
                    "stock": "",
                    "wait_sent": "",
                    "wait_po": "",
                    "real_stock": "",
                    "status": "",
                    "quility": "",
                    "unit": "",
                    "parent_unit": "",
                    "unit_per_bath": "",
                    "total": ""
                },

                {
                    "id": "",
                    "no_part": "",
                    "name_part": "",
                    "stock": "",
                    "wait_sent": "",
                    "wait_po": "",
                    "real_stock": "",
                    "status": "",
                    "quility": "",
                    "unit": "",
                    "parent_unit": "",
                    "unit_per_bath": "",
                    "total": ""
                },

                {
                    "id": "",
                    "no_part": "",
                    "name_part": "",
                    "stock": "",
                    "wait_sent": "",
                    "wait_po": "",
                    "real_stock": "",
                    "status": "",
                    "quility": "",
                    "unit": "",
                    "parent_unit": "",
                    "unit_per_bath": "",
                    "total": ""
                },

                {
                    "id": "",
                    "no_part": "",
                    "name_part": "",
                    "stock": "",
                    "wait_sent": "",
                    "wait_po": "",
                    "real_stock": "",
                    "status": "",
                    "quility": "",
                    "unit": "",
                    "parent_unit": "",
                    "unit_per_bath": "",
                    "total": ""
                },

                {
                    "id": "",
                    "no_part": "",
                    "name_part": "",
                    "stock": "",
                    "wait_sent": "",
                    "wait_po": "",
                    "real_stock": "",
                    "status": "",
                    "quility": "",
                    "unit": "",
                    "parent_unit": "",
                    "unit_per_bath": "",
                    "total": ""
                },

                {
                    "id": "",
                    "no_part": "",
                    "name_part": "",
                    "stock": "",
                    "wait_sent": "",
                    "wait_po": "",
                    "real_stock": "",
                    "status": "",
                    "quility": "",
                    "unit": "",
                    "parent_unit": "",
                    "unit_per_bath": "",
                    "total": ""
                },
            ],
            "table_status": [
                {
                    "role": "ช่างฝีมือ 6",
                    "department": "ตอนหาดใหญ่ (ผู้ขอเบิก)",
                    "name": "นายวินัย ชัยแก้ว",
                    "date": "2020-12-01 12:32",
                    "status": "ลงนามเรียบร้อย"
                },
                {
                    "role": "สสญ.",
                    "department": "แขวงบำรุงรักษาอาณัติสัญญาณหาดใหญ่",
                    "name": "นายภาคิน แก้วสองเมือง",
                    "date": "",
                    "status": "รอการอนุมัติ"
                },
                {
                    "role": "วศญ.2",
                    "department": "กองบำรุงรักษาเขต 2",
                    "name": "นายเฉลียว ฤทธิ",
                    "date": "",
                    "status": "รอการอนุมัติ"
                },
                {
                    "role": "วสส.",
                    "department": "กองอาณัติสัญญาณ",
                    "name": "นายวิระ สายไหม",
                    "date": "",
                    "status": "รอการอนุมัติ"
                },
                {
                    "role": "สสม.",
                    "department": "งานระบบเครื่องกล",
                    "name": "นายศิวกร ศิริ",
                    "date": "",
                    "status": "รอการอนุมัติ"
                }
            ],
            "raw_no_part": [
                {
                    "id": 1,
                    "no_part": "SIG 003",
                    "name_part": "SIG ขนาด 5V.",
                    "stock": 10,
                    "wait_sent": 10,
                    "wait_po": 10,
                    "real_stock": 10,
                    "status": "ซาก",
                    "parent_unit": "sig",
                    "unit_per_bath": 100,
                },
                {
                    "id": 2,
                    "no_part": "เครื่องกั้นไฟฟ้า",
                    "name_part": "เครื่องกั้นไฟฟ้า ขนาด 5V.",
                    "stock": 10,
                    "wait_sent": 10,
                    "wait_po": 10,
                    "real_stock": 10,
                    "status": "ของเก่า",
                    "parent_unit": "เครื่องกั้น",
                    "unit_per_bath": 100,
                },
                {
                    "id": 3,
                    "no_part": "SIG 004",
                    "name_part": "SIG ขนาด 5V.",
                    "stock": 10,
                    "wait_sent": 10,
                    "wait_po": 10,
                    "real_stock": 10,
                    "status": "ซาก",
                    "parent_unit": "sig",
                    "unit_per_bath": 100,
                }
            ]
        }
    ],
    inventory: [
        {
            "id": "1",
            "no_inventory": "100",
            "name": "คลังบางซื่อ",
            "raw_no_part": [
                {
                    "id": 1,
                    "no_part": "SIG 003",
                    "name_part": "SIG ขนาด 5V.",
                    "stock": 10,
                    "wait_sent": 10,
                    "wait_po": 10,
                    "real_stock": 10,
                    "status": "ซาก",
                    "parent_unit": "sig",
                    "unit": "ชิ้น",
                    "unit_per_bath": 100,
                },
                {
                    "id": 2,
                    "no_part": "เครื่องกั้นไฟฟ้า",
                    "name_part": "เครื่องกั้นไฟฟ้า ขนาด 5V.",
                    "stock": 10,
                    "wait_sent": 10,
                    "wait_po": 10,
                    "real_stock": 10,
                    "status": "ของเก่า",
                    "parent_unit": "เครื่องกั้น",
                    "unit": "ชิ้น",
                    "unit_per_bath": 100,
                },
                {
                    "id": 3,
                    "no_part": "SIG 004",
                    "name_part": "SIG ขนาด 5V.",
                    "stock": 10,
                    "wait_sent": 10,
                    "wait_po": 10,
                    "real_stock": 10,
                    "status": "ซาก",
                    "parent_unit": "sig",
                    "unit": "ชิ้น",
                    "unit_per_bath": 100,
                }
            ],
        },
        {
            "id": "2",
            "no_inventory": "200",
            "name": "คลังลาดกระบัง",
            "raw_no_part": [
                {
                    "id": 1,
                    "no_part": "SIG 003",
                    "name_part": "SIG ขนาด 5V.",
                    "stock": 10,
                    "wait_sent": 10,
                    "wait_po": 10,
                    "real_stock": 10,
                    "status": "ซาก",
                    "parent_unit": "sig",
                    "unit": "ชิ้น",
                    "unit_per_bath": 100,
                }
            ],
        }
    ],

    // ค่าคงที่หน่วยนับ
    unit: [
        {
            "id": 1,
            "parent_unit": "sig",
            "child_unit": [
                {
                    "id": 1,
                    "name_unit": "อัน",
                    "short_name_unit": "อ."
                },
                {
                    "id": 2,
                    "name_unit": "ชิ้น",
                    "short_name_unit": "ช."
                }
            ]
        },
        {
            "id": 2,
            "parent_unit": "เครื่องกั้น",
            "child_unit": [
                {
                    "id": 1,
                    "name_unit": "เครื่อง",
                    "short_name_unit": "คร."
                }
            ]
        }
    ],

    // Mode การทำงาน
    action: "search",
    document_show_popup: [],
    document_show: [],
    table_part_show: [], //เปลี่ยนจาก list_show => table_part_show
    table_status_show: [],

    // Mode Search
    no_document: "",

    // Mode Edit
    raw_no_part: [],
    raw_no_part_show_popup: [],
    to_inventory_show_popup: [],
    table_part_show_row_index: "",
    table_no_part: "",

    // Mode Add
    document_show_mode_add:
    {
        "id": "",
        "no_document": "",
        "name": "",
        "date": "",
        "to_inventory": "",
        "pick_up": "",
        "total": "",
        "note": "",
        "table_part": [
            {
                "id": "",
                "no_part": "",
                "name_part": "",
                "stock": "",
                "wait_sent": "",
                "wait_po": "",
                "real_stock": "",
                "status": "",
                "quility": "",
                "unit": "",
                "parent_unit": "",
                "unit_per_bath": "",
                "total": ""
            },
            {
                "id": "",
                "no_part": "",
                "name_part": "",
                "stock": "",
                "wait_sent": "",
                "wait_po": "",
                "real_stock": "",
                "status": "",
                "quility": "",
                "unit": "",
                "parent_unit": "",
                "unit_per_bath": "",
                "total": ""
            },
            {
                "id": "",
                "no_part": "",
                "name_part": "",
                "stock": "",
                "wait_sent": "",
                "wait_po": "",
                "real_stock": "",
                "status": "",
                "quility": "",
                "unit": "",
                "parent_unit": "",
                "unit_per_bath": "",
                "total": ""
            },
            {
                "id": "",
                "no_part": "",
                "name_part": "",
                "stock": "",
                "wait_sent": "",
                "wait_po": "",
                "real_stock": "",
                "status": "",
                "quility": "",
                "unit": "",
                "parent_unit": "",
                "unit_per_bath": "",
                "total": ""
            },

            {
                "id": "",
                "no_part": "",
                "name_part": "",
                "stock": "",
                "wait_sent": "",
                "wait_po": "",
                "real_stock": "",
                "status": "",
                "quility": "",
                "unit": "",
                "parent_unit": "",
                "unit_per_bath": "",
                "total": ""
            },

            {
                "id": "",
                "no_part": "",
                "name_part": "",
                "stock": "",
                "wait_sent": "",
                "wait_po": "",
                "real_stock": "",
                "status": "",
                "quility": "",
                "unit": "",
                "parent_unit": "",
                "unit_per_bath": "",
                "total": ""
            },

            {
                "id": "",
                "no_part": "",
                "name_part": "",
                "stock": "",
                "wait_sent": "",
                "wait_po": "",
                "real_stock": "",
                "status": "",
                "quility": "",
                "unit": "",
                "parent_unit": "",
                "unit_per_bath": "",
                "total": ""
            },

            {
                "id": "",
                "no_part": "",
                "name_part": "",
                "stock": "",
                "wait_sent": "",
                "wait_po": "",
                "real_stock": "",
                "status": "",
                "quility": "",
                "unit": "",
                "parent_unit": "",
                "unit_per_bath": "",
                "total": ""
            },

            {
                "id": "",
                "no_part": "",
                "name_part": "",
                "stock": "",
                "wait_sent": "",
                "wait_po": "",
                "real_stock": "",
                "status": "",
                "quility": "",
                "unit": "",
                "parent_unit": "",
                "unit_per_bath": "",
                "total": ""
            },

            {
                "id": "",
                "no_part": "",
                "name_part": "",
                "stock": "",
                "wait_sent": "",
                "wait_po": "",
                "real_stock": "",
                "status": "",
                "quility": "",
                "unit": "",
                "parent_unit": "",
                "unit_per_bath": "",
                "total": ""
            },
        ],
        "table_status": [],
        "raw_no_part": []
    },
    to_inventory_show_popup_mode_add: [],
    table_part_show_mode_add: [
        {
            "id": "",
            "no_part": "",
            "name_part": "",
            "stock": "",
            "wait_sent": "",
            "wait_po": "",
            "real_stock": "",
            "status": "",
            "quility": "",
            "unit": "",
            "parent_unit": "",
            "unit_per_bath": "",
            "total": ""
        },
        {
            "id": "",
            "no_part": "",
            "name_part": "",
            "stock": "",
            "wait_sent": "",
            "wait_po": "",
            "real_stock": "",
            "status": "",
            "quility": "",
            "unit": "",
            "parent_unit": "",
            "unit_per_bath": "",
            "total": ""
        },
        {
            "id": "",
            "no_part": "",
            "name_part": "",
            "stock": "",
            "wait_sent": "",
            "wait_po": "",
            "real_stock": "",
            "status": "",
            "quility": "",
            "unit": "",
            "parent_unit": "",
            "unit_per_bath": "",
            "total": ""
        },
        {
            "id": "",
            "no_part": "",
            "name_part": "",
            "stock": "",
            "wait_sent": "",
            "wait_po": "",
            "real_stock": "",
            "status": "",
            "quility": "",
            "unit": "",
            "parent_unit": "",
            "unit_per_bath": "",
            "total": ""
        },

        {
            "id": "",
            "no_part": "",
            "name_part": "",
            "stock": "",
            "wait_sent": "",
            "wait_po": "",
            "real_stock": "",
            "status": "",
            "quility": "",
            "unit": "",
            "parent_unit": "",
            "unit_per_bath": "",
            "total": ""
        },

        {
            "id": "",
            "no_part": "",
            "name_part": "",
            "stock": "",
            "wait_sent": "",
            "wait_po": "",
            "real_stock": "",
            "status": "",
            "quility": "",
            "unit": "",
            "parent_unit": "",
            "unit_per_bath": "",
            "total": ""
        },

        {
            "id": "",
            "no_part": "",
            "name_part": "",
            "stock": "",
            "wait_sent": "",
            "wait_po": "",
            "real_stock": "",
            "status": "",
            "quility": "",
            "unit": "",
            "parent_unit": "",
            "unit_per_bath": "",
            "total": ""
        },

        {
            "id": "",
            "no_part": "",
            "name_part": "",
            "stock": "",
            "wait_sent": "",
            "wait_po": "",
            "real_stock": "",
            "status": "",
            "quility": "",
            "unit": "",
            "parent_unit": "",
            "unit_per_bath": "",
            "total": ""
        },

        {
            "id": "",
            "no_part": "",
            "name_part": "",
            "stock": "",
            "wait_sent": "",
            "wait_po": "",
            "real_stock": "",
            "status": "",
            "quility": "",
            "unit": "",
            "parent_unit": "",
            "unit_per_bath": "",
            "total": ""
        },

        {
            "id": "",
            "no_part": "",
            "name_part": "",
            "stock": "",
            "wait_sent": "",
            "wait_po": "",
            "real_stock": "",
            "status": "",
            "quility": "",
            "unit": "",
            "parent_unit": "",
            "unit_per_bath": "",
            "total": ""
        },
    ],
    table_part_show_row_index_mode_add: "",
    table_no_part_mode_add: "",
    raw_no_part_show_popup_mode_add: [],

    // แนบไฟล์
    files: [],
    clickable: false,
    accepts: null,
    multiple: true,
    maxFiles: Infinity,
    maxFileSize: Infinity,
    minFileSize: 0,
}
export default (state = initialState, action) => {
    switch (action.type) {
        // เลืก mode ในการทำงาน ( Search / Add / Edit )
        case "ACTION":
            console.log("mode", state.action)
            return {
                ...state,
                action: action.value,
                clickable: action.value === "add" || action.value === "edit" ? true : false
            }

        // Mode Search
        case "CHANGE NO DOCUMENT":
            return {
                ...state,
                no_document: action.value
            }
        case "CLICK SEARCH POPUP NO DOCUMENT":
            return {
                ...state,
                document_show_popup: initialState.document.filter(function (document) {
                    // console.log(inventory.no_inventory)
                    const regex = new RegExp(`${state.no_document}`, 'i');
                    var isMatch = regex.test(document.no_document);
                    return (isMatch);
                }),
            }
        case "CLICK OPEN POPUP NO DOCUMENT":
            return {
                ...state,
                document_show_popup: initialState.document_show_popup
            }
        case "CLICK SELECT POPUP NO DOCUMENT":
            return {
                ...state,
                no_document: state.document_show_popup[action.row_document_show_popup].no_document,
                document_show: state.document_show_popup[action.row_document_show_popup],
                table_part_show: state.document_show_popup[action.row_document_show_popup].table_part,
                table_status_show: state.document_show_popup[action.row_document_show_popup].table_status,
                raw_no_part: state.document_show_popup[action.row_document_show_popup].raw_no_part
            }

        // Mode Edit
        case "CHANGE NAME":
            var clone_document_show = { ...state.document_show };
            clone_document_show.name = action.value;
            return {
                ...state,
                document_show: clone_document_show
            }
        case "CHANGE DATE":
            var clone_document_show = { ...state.document_show };
            clone_document_show.date = action.value;
            return {
                ...state,
                document_show: clone_document_show
            }
        case "CHANGE TO INVENTORY":
            var clone_document_show = { ...state.document_show };
            clone_document_show.to_inventory = action.value;
            return {
                ...state,
                document_show: clone_document_show
            }
        case "CLICK TO INVENTORY":
            return {
                ...state,
                to_inventory_show_popup: initialState.to_inventory_show_popup
            }
        case "CLICK SEARCH POPUP TO INVENTORY":
            return {
                ...state,
                to_inventory_show_popup: initialState.inventory.filter(function (inventory) {
                    // console.log(inventory.no_inventory)
                    const regex = new RegExp(`${state.document_show.to_inventory}`, 'i');
                    var isMatch = regex.test(inventory.no_inventory);
                    return (isMatch);
                }),
            }
        case "CLICK SELECT POPUP TO INVENTORY":
            var clone_document_show = { ...state.document_show };
            clone_document_show.to_inventory = state.to_inventory_show_popup[action.rowIndex].no_inventory
            return {
                ...state,
                document_show: clone_document_show,
            }
        case "ON CHANGE NO PART EACH ROW":
            var clone_table_part_show = [...state.table_part_show];
            clone_table_part_show[action.rowIndex].no_part = action.value
            return {
                ...state,
                table_part_show: clone_table_part_show,
                table_part_show_row_index: action.rowIndex,
                table_no_part: action.value
            }
        case "ON CLICK NO PART EACH ROW":
            return {
                ...state,
                table_part_show_row_index: action.rowIndex,
                raw_no_part_show_popup: initialState.raw_no_part_show_popup,
                table_no_part: state.table_part_show[action.rowIndex].no_part
            }
        case "ON CHANGE NO PART":
            return {
                ...state,
                table_no_part: action.value
            }
        case "ON CLICK SEARCH POPUP NO PART":
            return {
                ...state,
                raw_no_part_show_popup: state.raw_no_part.filter(function (raw_no_part) {
                    const regex = new RegExp(`${state.table_no_part}`, 'i');
                    var isMatch = regex.test(raw_no_part.no_part);
                    return (isMatch);
                }),
            }
        case "ON CLICK SELECT POPUP NO PART":
            var clone_table_part_show = [...state.table_part_show];
            clone_table_part_show[state.table_part_show_row_index] = state.raw_no_part_show_popup[action.rowIndex]
            return {
                ...state,
                table_part_show: clone_table_part_show
            }
        case "ON CHANGE QUILITY EACH ROW":
            var clone_table_part_show = [...state.table_part_show];
            var clone_document_show = { ...state.document_show };
            // console.log(clone_list_show[action.rowIndex])
            clone_table_part_show[action.rowIndex].quility = action.value;
            clone_table_part_show[action.rowIndex].total = clone_table_part_show[action.rowIndex].quility * clone_table_part_show[action.rowIndex].unit_per_bath
            var sum_real_total = 0;
            clone_table_part_show.map(function (clone_list_show, index) {
                sum_real_total = clone_list_show.total + sum_real_total;
                return sum_real_total;
            })
            clone_table_part_show.total = sum_real_total
            return {
                ...state,
                table_part_show: clone_table_part_show,
                document_show: clone_table_part_show
            }
        case "ON CHANGE UNIT PER BATH EACH ROW":
            var clone_table_part_show = [...state.table_part_show];
            var clone_document_show = { ...state.document_show };
            clone_table_part_show[action.rowIndex].unit_per_bath = action.value;
            clone_table_part_show[action.rowIndex].total = clone_table_part_show[action.rowIndex].quility * clone_table_part_show[action.rowIndex].unit_per_bath
            var sum_real_total = 0;
            clone_table_part_show.map(function (clone_list_show, index) {
                sum_real_total = clone_list_show.total + sum_real_total;
                return sum_real_total;
            })
            clone_table_part_show.total = sum_real_total
            return {
                ...state,
                table_part_show: clone_table_part_show,
                document_show: clone_table_part_show
            }
        case "CHANGE NOTE":
            var clone_document_show = { ...state.document_show };
            clone_document_show.note = action.value;
            return {
                ...state,
                document_show: clone_document_show
            }

        // Mode Add
        case "ON CHANGE DOCUMENT MODE ADD":
            var clone_document_show_mode_add = { ...state.document_show_mode_add };
            clone_document_show_mode_add.no_document = action.value;
            return {
                ...state,
                document_show_mode_add: clone_document_show_mode_add
            }
        case "ON CHANGE NAME MODE ADD":
            var clone_document_show_mode_add = { ...state.document_show_mode_add };
            clone_document_show_mode_add.name = action.value;
            return {
                ...state,
                document_show_mode_add: clone_document_show_mode_add
            }
        case "ON CHANGE DATE MODE ADD":
            var clone_document_show_mode_add = { ...state.document_show_mode_add };
            clone_document_show_mode_add.date = action.value;
            return {
                ...state,
                document_show_mode_add: clone_document_show_mode_add
            }
        case "CHANGE TO INVENTORY MODE ADD":
            var clone_document_show_mode_add = { ...state.document_show_mode_add };
            clone_document_show_mode_add.to_inventory = action.value;
            return {
                ...state,
                document_show_mode_add: clone_document_show_mode_add
            }
        case "CLICK TO INVENTORY MODE ADD":
            return {
                ...state,
                to_inventory_show_popup: initialState.to_inventory_show_popup
            }
        case "CLICK SEARCH POPUP TO INVENTORY MODE ADD":
            return {
                ...state,
                to_inventory_show_popup_mode_add: initialState.inventory.filter(function (inventory) {
                    // console.log(inventory.no_inventory)
                    const regex = new RegExp(`${state.document_show_mode_add.to_inventory}`, 'i');
                    var isMatch = regex.test(inventory.no_inventory);
                    return (isMatch);
                }),
            }
        case "CLICK SELECT POPUP TO INVENTORY MODE ADD":
            var clone_document_show_mode_add = { ...state.document_show_mode_add };
            clone_document_show_mode_add.to_inventory = state.to_inventory_show_popup_mode_add[action.rowIndex].no_inventory
            return {
                ...state,
                document_show_mode_add: clone_document_show_mode_add,
            }
        case "ON CHANGE NO PART EACH ROW MODE ADD":
            var clone_table_part_show_mode_add = [...state.table_part_show_mode_add];
            clone_table_part_show_mode_add[action.rowIndex].no_part = action.value
            return {
                ...state,
                table_part_show_mode_add: clone_table_part_show_mode_add,
                table_part_show_row_index_mode_add: action.rowIndex,
                table_no_part_mode_add: action.value
            }
        case "ON CLICK NO PART EACH ROW MODE ADD":
            return {
                ...state,
                table_part_show_row_index_mode_add: action.rowIndex,
                raw_no_part_show_popup_mode_add: initialState.raw_no_part_show_popup_mode_add,
                table_no_part_mode_add: state.table_part_show_mode_add[action.rowIndex].no_part
            }
        case "ON CHANGE NO PART MODE ADD":
            return {
                ...state,
                table_no_part_mode_add: action.value
            }
        case "ON CLICK SEARCH POPUP NO PART MODE ADD":
            return {
                ...state,
                raw_no_part_show_popup_mode_add: state.raw_no_part.filter(function (raw_no_part) {
                    const regex = new RegExp(`${state.table_no_part_mode_add}`, 'i');
                    var isMatch = regex.test(raw_no_part.no_part);
                    return (isMatch);
                }),
            }
        case "ON CLICK SELECT POPUP NO PART MODE ADD":
            var clone_table_part_show_mode_add = [...state.table_part_show_mode_add];
            clone_table_part_show_mode_add[state.table_part_show_row_index_mode_add] = state.raw_no_part_show_popup_mode_add[action.rowIndex]
            return {
                ...state,
                table_part_show_mode_add: clone_table_part_show_mode_add
            }
        case "ON CHANGE QUILITY EACH ROW MODE ADD":
            var clone_table_part_show_mode_add = [...state.table_part_show_mode_add];
            var clone_document_show_mode_add = { ...state.document_show_mode_add };
            // console.log(clone_list_show[action.rowIndex])
            clone_table_part_show_mode_add[action.rowIndex].quility = action.value;
            clone_table_part_show_mode_add[action.rowIndex].total = clone_table_part_show_mode_add[action.rowIndex].quility * clone_table_part_show_mode_add[action.rowIndex].unit_per_bath

            var sum_real_total = 0;
            clone_table_part_show_mode_add.map(function (clone_list_show, index) {
                sum_real_total = clone_list_show.total + sum_real_total;
                return sum_real_total;
            })
            clone_document_show_mode_add.total = sum_real_total
            console.log(sum_real_total)
            return {
                ...state,
                table_part_show_mode_add: clone_table_part_show_mode_add,
                document_show_mode_add: clone_document_show_mode_add
            }
        case "ON CHANGE UNIT PER BATH EACH ROW MODE ADD":
            var clone_table_part_show_mode_add = [...state.table_part_show_mode_add];
            var clone_document_show_mode_add = { ...state.document_show_mode_add };
            // console.log(action.value)

            clone_table_part_show_mode_add[action.rowIndex].unit_per_bath = action.value;
            clone_table_part_show_mode_add[action.rowIndex].total = clone_table_part_show_mode_add[action.rowIndex].quility * clone_table_part_show_mode_add[action.rowIndex].unit_per_bath

            var sum_real_total = 0;
            clone_table_part_show_mode_add.map(function (clone_list_show, index) {
                sum_real_total = clone_list_show.total + sum_real_total;
                return sum_real_total;
            })
            clone_document_show_mode_add.total = sum_real_total
            console.log(sum_real_total)
            return {
                ...state,
                table_part_show_mode_add: clone_table_part_show_mode_add,
                document_show_mode_add: clone_document_show_mode_add
            }
        case "CHANGE NOTE MODE ADD":
            var clone_document_show_mode_add = { ...state.document_show_mode_add };
            clone_document_show_mode_add.note = action.value;
            return {
                ...state,
                document_show_mode_add: clone_document_show_mode_add
            }


        // แนบไฟล์
        case "FILES":
            return {
                ...state,
                files: action.value
            }
        default:
            return state
    }
}