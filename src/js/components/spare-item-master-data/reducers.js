const initialState = {
  // ค่าคงที่ต่างๆใน DropDawn
  // Mode ในการ Add มีสองโหมด
  mode_no_part: [
    {
      "id": 1,
      "mode_no": "manual"
    },
    {
      "id": 2,
      "mode_no": "auto"
    }
  ],
  // ชนิดอุปกรณ์
  type_part: [
    {
      "id": 1,
      "type": "ใช้ไฟฟ้า"
    },
    {
      "id": 2,
      "type": "ไม่ใช้ไฟฟ้า"
    }
  ],
  // กลุ่มอุปกรณ์
  group_part: [
    {
      "id": 1,
      "group": "อุปกรณ์ภายใน"
    },
    {
      "id": 2,
      "group": "อุปกรณ์ภายนอก"
    }
  ],
  // กลุ่มหน่วยนับ
  parent_unit_part: [
    {
      "id": 1,
      "parent_unit": "เครื่องกั้น",
      "child_unit": [
        {
          "id": 1,
          "child_unit": "เครื่อง",
          "short_name": "ค."
        },
        {
          "id": 2,
          "child_unit": "จักร",
          "short_name": "จ."
        }
      ]
    }
  ],
  // ระบบการจัดการ Fist in Fist out
  valuation_method: [
    {
      "id": 1,
      "valuation_method": "FIFO"
    }
  ],
  // ค่าคงที่ต่างๆ ของแต่ละอุปกรณ์
  raw_info_part: [
    {
      "id": 1,
      "no_part": "SW1",
      "description": "สองขา 5V.",
      "type": "ใช้ไฟฟ้า",
      "group": "อุปกรณ์ภายใน",
      "parent_unit_part": "เครื่องกั้น",
      "valuation_method": "FIFO",
      "low_po": 10,
      "quality_into": 1,
      "lead_time": 5,
      "tolerance_day": 5,
      "note": "",
      "stock_need": 5,
      "stock_min": 1,
      "stock_max": 10,
      "table_list": [
        {
          "id": 1,
          "no_inventory": "100",
          "name_inventory": "คลังพัสดุส่วนกลางบางซื่อ",
          "stock": 10,
          "wait_send": 5,
          "wait_po": 5,
          "real_stock": 10,
          "broken": 5,
          "send_fix": 5,
          "old_part": 5,
          "carcass": 5
        }
      ]
    },
  ],


  // Mode การทำงาน
  action: "search",

  // Mode Search 
  no_part: "",
  info_part_show_popup: [],
  info_part_show: [],
  table_list_show: [],

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
    // เลืก mode ในการทำงาน ( Search / Create / Edit )
    case "ACTION":
      // console.log("mode", state.action)
      return {
        ...state,
        action: action.value,
        clickable: action.value === "add" || action.value === "edit" ? true : false
      }

    // Mode Search
    case "ON CHANGE NO PART":
      return {
        ...state,
        no_part: action.value
      }
    case "ON CLICK POPUP SEARCH NO PART":
      return {
        ...state,
        info_part_show_popup: initialState.raw_info_part.filter(function (raw_info_part) {
          const regex = new RegExp(`${state.no_part}`, 'i');
          var isMatch = regex.test(raw_info_part.no_part);
          return (isMatch);
        }),
      }
    case "ON CLICK SELECT NO PART POPUP":
      return {
        ...state,
        no_part: state.info_part_show_popup[action.rowIndex].no_part,
        info_part_show: state.info_part_show_popup[action.rowIndex],
        table_list_show: state.info_part_show_popup[action.rowIndex].table_list
      }
    case "ON CLICK OPRN POPUP NO PART":
      return {
        ...state,
        info_part_show_popup: initialState.info_part_show_popup
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