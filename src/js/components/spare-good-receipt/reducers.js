const initialState = {
  // Mode การทำงาน
  action: "search",

  // Mode Search 
  no_document: "",
  document_show_popup: [],
  document_show: [],
  document_specific_show: [],
  list_show: [], //เอาไว้ clone list ที่อยู่ใน document_show ออกมาแสดงผล

  // Mode Edit
  list_no_part: "", //เอามาใช้งานตอนที่กดแก้ไขอะไหล่ ในการใช้ค้นหา
  no_part_show: [],
  inventory_show_popup: [],
  list_show_row_index: "", //ไว้บอกตำแหน่งว่ากด แก้ไข อะไหล่จาก row ไหนใน table

  // Mode Add
  document_id: "",
  document_type_id: "",
  list_no_part_mode_add: "",
  document_show_mode_add: {
    "id": "",
    "no_document": "",
    "created_by_user_id": "",
    "status": "",
    "created_on": "",
    "src_warehouse_id": "",
    "no_po": "",
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
    },
    {
      "id": "",
      "no_part": "",
      "name_part": "",
      "quility": "",
      "unit": "",
      "unit_per_bath": "",
    },
    {
      "id": "",
      "no_part": "",
      "name_part": "",
      "quility": "",
      "unit": "",
      "unit_per_bath": "",
    },
    {
      "id": "",
      "no_part": "",
      "name_part": "",
      "quility": "",
      "unit": "",
      "unit_per_bath": "",
    },
    {
      "id": "",
      "no_part": "",
      "name_part": "",
      "quility": "",
      "unit": "",
      "unit_per_bath": "",
    },
    {
      "id": "",
      "no_part": "",
      "name_part": "",
      "quility": "",
      "unit": "",
      "unit_per_bath": "",
    },
    {
      "id": "",
      "no_part": "",
      "name_part": "",
      "quility": "",
      "unit": "",
      "unit_per_bath": "",
    },
    {
      "id": "",
      "no_part": "",
      "name_part": "",
      "quility": "",
      "unit": "",
      "unit_per_bath": "",
    },
    {
      "id": "",
      "no_part": "",
      "name_part": "",
      "quility": "",
      "unit": "",
      "unit_per_bath": "",
    },
    {
      "id": "",
      "no_part": "",
      "name_part": "",
      "quility": "",
      "unit": "",
      "unit_per_bath": "",
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
      // console.log("mode", action.value)
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
      // console.log("reducer", action.value)
      return {
        ...state,
        document_show_popup: action.value
      }
    case "CLICK SELECT POPUP NO DOCUMENT":
      console.log("reducer", action.value)
      return {
        ...state,
        no_document: action.value.document.internal_document_id,
        document_show: action.value.document,
        document_specific_show: action.value.specific,
        list_show: action.value.specific.line_items
      }

    // Mode Edit
    case "ON CHANGE NAME":
      var clone_document_show = { ...state.document_show };
      clone_document_show.created_by_user_id = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "ON CHANGE DATE":
      var clone_document_show = { ...state.document_show };
      clone_document_show.created_on = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "ON CHANGE MY INVENTORY":
      var clone_document_specific_show = { ...state.document_specific_show };
      clone_document_specific_show.src_warehouse_id = action.value;
      return {
        ...state,
        document_specific_show: clone_document_specific_show
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
      // console.log(clone_list_show[action.rowIndex])
      clone_list_show[action.rowIndex].quility = action.value;
      return {
        ...state,
        list_show: clone_list_show,
      }
    case "ON CHANGE UNIT PER BATH EACH ROW":
      var clone_list_show = [...state.list_show];
      clone_list_show[action.rowIndex].unit_per_bath = action.value
      return {
        ...state,
        list_show: clone_list_show,
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
          const regex = new RegExp(`${state.document_specific_show.src_warehouse_id}`, 'i');
          var isMatch = regex.test(inventory.no_inventory);
          return (isMatch);
        }),
      }
    case "CLICK SELECT POPUP INVENTORY":
      var clone_document_specific_show = { ...state.document_specific_show };
      clone_document_specific_show.src_warehouse_id = state.inventory_show_popup[action.row_inventory_show_popup].no_inventory
      return {
        ...state,
        document_show: clone_document_show,
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
    case "ON CHANGE NAME MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.created_by_user_id = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }
    case "ON CHANGE DATE MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.created_on = action.value;
      console.log("time", action.value)
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
      clone_list_show_mode_add[action.rowIndex].quility = action.value
      return {
        ...state,
        list_show_mode_add: clone_list_show_mode_add,
        document_show_mode_add: clone_document_show_mode_add
      }
    case "ON CHANGE UNIT PER BATH EACH ROW MODE ADD":
      var clone_list_show_mode_add = [...state.list_show_mode_add];
      clone_list_show_mode_add[action.rowIndex].unit_per_bath = action.value
      return {
        ...state,
        list_show_mode_add: clone_list_show_mode_add,
      }
    case "ON CHANGE TOTAL EACH ROW MODE ADD":
      var clone_list_show_mode_add = [...state.list_show_mode_add];
      // console.log(clone_list_show[action.rowIndex])
      clone_list_show_mode_add[action.rowIndex].total = action.value
      return {
        ...state,
        list_show_mode_add: clone_list_show_mode_add
      }
    case "ON CHANGE NOTE MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.note = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }
    case "ON CHANGE MY INVENTORY MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.src_warehouse_id = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    // POST DOCUMENT
    case "POST DOCUMENT":
      console.log("reuducer", action.resPost, "mode", action.value)
      return {
        ...state,
        action: action.value,
        clickable: action.value === "add" || action.value === "edit" ? true : false
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