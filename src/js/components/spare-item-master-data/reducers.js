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
  group_unit_part: [
    {
      "id": 1,
      "unit": "เครื่องกั้น",
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
  inventory: [
    {
      "id": 1,
      "no_part": "SW1",
      "description": "สองขา 5V.",
      "type": "ใช้ไฟฟ้า",
      "group": "อุปกรณ์ภายใน",
      "unit": "ชิ้น",
      "valuation_method": "FIFO",
    },
  ],


  // Mode การทำงาน
  action: "search",

  // Mode Search 
  no_part: "",

  // แนบไฟล์
  files: [],
  clickable: true,
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
        action: action.value
      }

    // Mode Search
    case "ON CHANGE NO PART":
      return {
        ...state,
        no_part: action.value
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