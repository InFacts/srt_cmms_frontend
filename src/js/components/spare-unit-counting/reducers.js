const initialState = {
  // ค่าคงที่ต่างๆ
  // ค่าคงที่เอกสาร
  document: [
    {
      "id": 1,
      "no_document": "12345",
      "name": "นายศุภากร ศิริมาลีวัฒนนา",
      "status": "เปิดสำหรับแก้ไข",
      "date": "2014-02-09",
      "my_inventory": "100",
      "no_po": "67890",
      "total": "2000",
      "note": "",
      "list": [
        {
          "id": 1,
          "no_part": "SIG 003",
          "name_part": "SIG ขนาด 5V.",
          "quility": "10",
          "unit": "ชิ้น",
          "unit_per_bath": "100",
          "total": 1000
        },
        {
          "id": 2,
          "no_part": "SIG 004",
          "name_part": "SIG ขนาด 5V.",
          "quility": "10",
          "unit": "ชิ้น",
          "unit_per_bath": "100",
          "total": 1000
        },
        {
          "id": "",
          "no_part": "",
          "name_part": "",
          "quility": "",
          "unit": "",
          "unit_per_bath": "",
          "total": ""
        },
        {
          "id": "",
          "no_part": "",
          "name_part": "",
          "quility": "",
          "unit": "",
          "unit_per_bath": "",
          "total": ""
        },
        {
          "id": "",
          "no_part": "",
          "name_part": "",
          "quility": "",
          "unit": "",
          "unit_per_bath": "",
          "total": ""
        },
        {
          "id": "",
          "no_part": "",
          "name_part": "",
          "quility": "",
          "unit": "",
          "unit_per_bath": "",
          "total": ""
        },
        {
          "id": "",
          "no_part": "",
          "name_part": "",
          "quility": "",
          "unit": "",
          "unit_per_bath": "",
          "total": ""
        },
        {
          "id": "",
          "no_part": "",
          "name_part": "",
          "quility": "",
          "unit": "",
          "unit_per_bath": "",
          "total": ""
        },
        {
          "id": "",
          "no_part": "",
          "name_part": "",
          "quility": "",
          "unit": "",
          "unit_per_bath": "",
          "total": ""
        },
        {
          "id": "",
          "no_part": "",
          "name_part": "",
          "quility": "",
          "unit": "",
          "unit_per_bath": "",
          "total": ""
        }
      ]
    },
    {
      "id": 2,
      "no_document": "6789",
      "name": "นายสรวิศ ศิริมาลีวัฒนนา",
      "status": "ปิดสำหรับแก้ไข",
      "date": "2014-02-09",
      "my_inventory": "200",
      "no_po": "67890",
      "total": 2000,
      "note": "",
      "list": [
        {
          "id": 1,
          "no_part": "SIG 003",
          "name_part": "SIG ขนาด 5V.",
          "quility": "10",
          "unit": "ชิ้น",
          "unit_per_bath": "100",
          "total": 1000
        },
        {
          "id": 2,
          "no_part": "SIG 004",
          "name_part": "SIG ขนาด 5V.",
          "quility": "10",
          "unit": "ชิ้น",
          "unit_per_bath": "100",
          "total": 1000
        },
        {
          "id": "",
          "no_part": "",
          "name_part": "",
          "quility": "",
          "unit": "",
          "unit_per_bath": "",
          "total": ""
        },
        {
          "id": "",
          "no_part": "",
          "name_part": "",
          "quility": "",
          "unit": "",
          "unit_per_bath": "",
          "total": ""
        },
        {
          "id": "",
          "no_part": "",
          "name_part": "",
          "quility": "",
          "unit": "",
          "unit_per_bath": "",
          "total": ""
        },
        {
          "id": "",
          "no_part": "",
          "name_part": "",
          "quility": "",
          "unit": "",
          "unit_per_bath": "",
          "total": ""
        },
        {
          "id": "",
          "no_part": "",
          "name_part": "",
          "quility": "",
          "unit": "",
          "unit_per_bath": "",
          "total": ""
        },
        {
          "id": "",
          "no_part": "",
          "name_part": "",
          "quility": "",
          "unit": "",
          "unit_per_bath": "",
          "total": ""
        },
        {
          "id": "",
          "no_part": "",
          "name_part": "",
          "quility": "",
          "unit": "",
          "unit_per_bath": "",
          "total": ""
        },
        {
          "id": "",
          "no_part": "",
          "name_part": "",
          "quility": "",
          "unit": "",
          "unit_per_bath": "",
          "total": ""
        }
      ]
    }
  ],
  // ค่าคงที่อะไหล่
  raw_no_part: [
    {
      "id": 1,
      "no_part": "SIG 003",
      "name_part": "SIG ขนาด 5V.",
      "quility": "10",
      "unit": "ชิ้น",
      "unit_per_bath": "100",
      "total": "1000"
    },
    {
      "id": 2,
      "no_part": "SIG 004",
      "name_part": "SIG ขนาด 5V.",
      "quility": "10",
      "unit": "ชิ้น",
      "unit_per_bath": "100",
      "total": "1000"
    },
    {
      "id": 3,
      "no_part": "SIG 005",
      "name_part": "SIG ขนาด 5V.",
      "quility": "10",
      "unit": "ชิ้น",
      "unit_per_bath": "100",
      "total": "1000"
    }
  ],
  // ค่าคงที่คลังต่างๆ
  inventory: [
    {
      id: "1",
      no_inventory: "100",
      name: "คลังบางซื่อ"
    },
    {
      id: "2",
      no_inventory: "200",
      name: "คลังลาดกระบัง"
    }
  ],

  // Mode การทำงาน
  action: "search",

  // Mode Search 
  no_document: "",
  document_show_popup: [],
  document_show: [],
  list_show: [], //เอาไว้ clone list ที่อยู่ใน document_show ออกมาแสดงผล

  // Mode Edit
  list_no_part: "", //เอามาใช้งานตอนที่กดแก้ไขอะไหล่ ในการใช้ค้นหา
  no_part_show: [],
  inventory_show_popup: [],
  list_show_row_index: "", //ไว้บอกตำแหน่งว่ากด แก้ไข อะไหล่จาก row ไหนใน table

  // Mode Add
  list_no_part_mode_add: "",
  document_show_mode_add: {
    "id": "",
    "no_document": "",
    "name": "",
    "status": "",
    "date": "",
    "my_inventory": "",
    "no_po": "",
    "total": "",
    "note": "",
    "list": []
  },
  list_show_mode_add: [
    {
      "id": "",
      "no_part": "",
      "name_part": "",
      "quility": "",
      "unit": "",
      "unit_per_bath": "",
      "total": ""
    },
    {
      "id": "",
      "no_part": "",
      "name_part": "",
      "quility": "",
      "unit": "",
      "unit_per_bath": "",
      "total": ""
    },
    {
      "id": "",
      "no_part": "",
      "name_part": "",
      "quility": "",
      "unit": "",
      "unit_per_bath": "",
      "total": ""
    },
    {
      "id": "",
      "no_part": "",
      "name_part": "",
      "quility": "",
      "unit": "",
      "unit_per_bath": "",
      "total": ""
    },
    {
      "id": "",
      "no_part": "",
      "name_part": "",
      "quility": "",
      "unit": "",
      "unit_per_bath": "",
      "total": ""
    },
    {
      "id": "",
      "no_part": "",
      "name_part": "",
      "quility": "",
      "unit": "",
      "unit_per_bath": "",
      "total": ""
    },
    {
      "id": "",
      "no_part": "",
      "name_part": "",
      "quility": "",
      "unit": "",
      "unit_per_bath": "",
      "total": ""
    },
    {
      "id": "",
      "no_part": "",
      "name_part": "",
      "quility": "",
      "unit": "",
      "unit_per_bath": "",
      "total": ""
    },
    {
      "id": "",
      "no_part": "",
      "name_part": "",
      "quility": "",
      "unit": "",
      "unit_per_bath": "",
      "total": ""
    },
    {
      "id": "",
      "no_part": "",
      "name_part": "",
      "quility": "",
      "unit": "",
      "unit_per_bath": "",
      "total": ""
    }
  ],
  list_show_mode_add_row_index: "",
  no_part_show_mode_add: [],

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
    case "CLICK OPEN POPUP":
      return {
        ...state,
        document_show_popup: initialState.document_show_popup
      }
    case "ON CHANGE NO DOCUMENT":
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
    case "CLICK SELECT POPUP NO DOCUMENT":
      return {
        ...state,
        no_document: state.document_show_popup[action.row_document_show_popup].no_document,
        document_show: state.document_show_popup[action.row_document_show_popup],
        list_show: state.document_show_popup[action.row_document_show_popup].list
      }

    // Mode Edit
    case "ON CHANGE STATUS":
      var clone_document_show = { ...state.document_show };
      clone_document_show.status = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "ON CHANGE NAME":
      var clone_document_show = { ...state.document_show };
      clone_document_show.name = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "ON CHANGE DATE":
      var clone_document_show = { ...state.document_show };
      clone_document_show.date = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "ON CHANGE MY INVENTORY":
      var clone_document_show = { ...state.document_show };
      clone_document_show.my_inventory = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "ON CHANGE NO PO":
      var clone_document_show = { ...state.document_show };
      clone_document_show.no_po = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "ON CHANGE NO PART":
      return {
        ...state,
        list_no_part: action.value
      }
    case "ON CHANGE NO PART EACH ROW":
      var clone_list_show = [...state.list_show];
      clone_list_show[action.rowIndex].no_part = action.value
      return {
        ...state,
        list_show: clone_list_show,
        list_show_row_index: action.rowIndex,
        list_no_part: action.value
      }
    case "ON CLICK NO PART EACH ROW":
      return {
        ...state,
        list_show_row_index: action.rowIndex,
        no_part_show: initialState.no_part_show,
        list_no_part: state.list_show[action.rowIndex].no_part
      }
    case "ON CHANGE QUILITY EACH ROW":
      var clone_list_show = [...state.list_show];
      var clone_document_show = {...state.document_show};
      // console.log(clone_list_show[action.rowIndex])
      clone_list_show[action.rowIndex].quility = action.value;
      clone_list_show[action.rowIndex].total = clone_list_show[action.rowIndex].quility * clone_list_show[action.rowIndex].unit_per_bath;
      var sum_real_total = 0;
      clone_list_show.map(function(clone_list_show,index) {
        sum_real_total = clone_list_show.total + sum_real_total;
        return sum_real_total;
      })
      clone_document_show.total = sum_real_total
      return {
        ...state,
        list_show: clone_list_show, 
        document_show: clone_document_show
      }
    case "ON CHANGE UNIT PER BATH EACH ROW":
      var clone_list_show = [...state.list_show];
      var clone_document_show = {...state.document_show};
      // console.log(clone_list_show[action.rowIndex])
      clone_list_show[action.rowIndex].unit_per_bath = action.value
      clone_list_show[action.rowIndex].total = clone_list_show[action.rowIndex].quility * clone_list_show[action.rowIndex].unit_per_bath;
      var sum_real_total = 0;
      clone_list_show.map(function(clone_list_show,index) {
        sum_real_total = clone_list_show.total + sum_real_total;
        return sum_real_total;
      })
      clone_document_show.total = sum_real_total
      return {
        ...state,
        list_show: clone_list_show, 
        document_show: clone_document_show
      }
    case "ON CHANGE TOTAL EACH ROW":
      var clone_list_show = [...state.list_show];
      clone_list_show[action.rowIndex].total = action.value
      return {
        ...state,
        list_show: clone_list_show
      }
    case "ON CLICK SEARCH POPUP NO PART":
      return {
        ...state,
        no_part_show: initialState.raw_no_part.filter(function (raw_no_part) {
          const regex = new RegExp(`${state.list_no_part}`, 'i');
          var isMatch = regex.test(raw_no_part.no_part);
          return (isMatch);
        }),
      }
    case "ON CLICK SELECT POPUP NO PART":
      console.log(state.no_part_show[action.rowIndex], "and", state.list_show_row_index)
      var clone_list_show = [...state.list_show];
      clone_list_show[state.list_show_row_index] = state.no_part_show[action.rowIndex]
      return {
        ...state,
        list_show: clone_list_show
      }
    case "CLICK SEARCH POPUP INVENTORY":
      return {
        ...state,
        inventory_show_popup: initialState.inventory.filter(function (inventory) {
          const regex = new RegExp(`${state.document_show.my_inventory}`, 'i');
          console.log(state.document_show.my_inventory)
          var isMatch = regex.test(inventory.no_inventory);
          return (isMatch);
        }),
      }
    case "CLICK SELECT POPUP INVENTORY":
      var clone_document_show = { ...state.document_show };
      console.log(clone_document_show.my_inventory, "and", state.inventory_show_popup[action.row_inventory_show_popup].no_inventory)
      clone_document_show.my_inventory = state.inventory_show_popup[action.row_inventory_show_popup].no_inventory
      return {
        ...state,
        document_show: clone_document_show,
      }
    case "ON CHANGE TOTAL":
      var clone_document_show = { ...state.document_show };
      clone_document_show.total = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "ON CHANGE NOTE":
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
    case "ON CHANGE STATUS MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.status = action.value;
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
    case "ON CHANGE NO PO MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.no_po = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }
    case "ON CHANGE NO PART EACH ROW MODE ADD":
      var clone_list_show_mode_add = [...state.list_show_mode_add]
      // console.log(clone_list_show_mode_add[action.rowIndex].no_part, action.value)
      clone_list_show_mode_add[action.rowIndex].no_part = action.value
      return {
        ...state,
        list_show_mode_add: clone_list_show_mode_add,
        list_no_part_mode_add: action.value,
        list_show_mode_add_row_index: action.rowIndex
      }
    case "ON CLICK NO PART EACH ROW MODE ADD":
      return {
        ...state,
        list_show_mode_add_row_index: action.rowIndex,
        no_part_show_mode_add: initialState.no_part_show_mode_add,
        list_no_part_mode_add: state.list_show_mode_add[action.rowIndex].no_part
      }
    case "ON CLICK SEARCH POPUP NO PART ADD MODE":
      return {
        ...state,
        no_part_show_mode_add: initialState.raw_no_part.filter(function (raw_no_part) {
          const regex = new RegExp(`${state.list_no_part_mode_add}`, 'i');
          var isMatch = regex.test(raw_no_part.no_part);
          return (isMatch);
        }),
      }
    case "ON CHANGE NO PART MODE ADD":
      return {
        ...state,
        list_no_part_mode_add: action.value
      }
    case "ON CLICK SELECT POPUP NO PART MODE ADD":
      // console.log(state.no_part_show_mode_add[action.rowIndex], "and", state.list_show_mode_add[state.list_show_mode_add_row_index])
      var clone_list_show_mode_add = [...state.list_show_mode_add];
      clone_list_show_mode_add[state.list_show_mode_add_row_index] = state.no_part_show_mode_add[action.rowIndex]
      clone_list_show_mode_add[state.list_show_mode_add_row_index].quility = 1
      clone_list_show_mode_add[state.list_show_mode_add_row_index].total = 1
      return {
        ...state,
        list_show_mode_add: clone_list_show_mode_add
      }
    case "ON CHANGE QUILITY EACH ROW MODE ADD":
      var clone_list_show_mode_add = [...state.list_show_mode_add];
      var clone_document_show_mode_add = {...state.document_show_mode_add};
      // console.log(clone_list_show[action.rowIndex])
      clone_list_show_mode_add[action.rowIndex].quility = action.value
      clone_list_show_mode_add[action.rowIndex].total = clone_list_show_mode_add[action.rowIndex].quility * clone_list_show_mode_add[action.rowIndex].unit_per_bath;
      var sum_real_total = 0;
      clone_list_show_mode_add.map(function(clone_list_show_mode_add,index) {
        sum_real_total = clone_list_show_mode_add.total + sum_real_total;
        return sum_real_total;
      })
      clone_document_show_mode_add.total = sum_real_total
      return {
        ...state,
        list_show_mode_add: clone_list_show_mode_add,
        document_show_mode_add: clone_document_show_mode_add
      }
      case "ON CHANGE UNIT PER BATH EACH ROW MODE ADD":
      var clone_list_show_mode_add = [...state.list_show_mode_add];
      var clone_document_show_mode_add = {...state.document_show_mode_add};
      // console.log(clone_list_show_mode_add[action.rowIndex])
      clone_list_show_mode_add[action.rowIndex].unit_per_bath = action.value
      clone_list_show_mode_add[action.rowIndex].total = clone_list_show_mode_add[action.rowIndex].quility * clone_list_show_mode_add[action.rowIndex].unit_per_bath;
      var sum_real_total = 0;
      clone_list_show_mode_add.map(function(clone_list_show_mode_add,index) {
        sum_real_total = clone_list_show_mode_add.total + sum_real_total;
        return sum_real_total;
      })
      clone_document_show_mode_add.total = sum_real_total
      return {
        ...state,
        list_show_mode_add: clone_list_show_mode_add, 
        document_show_mode_add: clone_document_show_mode_add
      }
    case "ON CHANGE TOTAL EACH ROW MODE ADD":
      var clone_list_show_mode_add = [...state.list_show_mode_add];
      // console.log(clone_list_show[action.rowIndex])
      clone_list_show_mode_add[action.rowIndex].total = action.value
      return {
        ...state,
        list_show_mode_add: clone_list_show_mode_add
      }
    case "ON CHANGE TOTAL MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.total = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }
    case "ON CHANGE NOTE MODE ADD":
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