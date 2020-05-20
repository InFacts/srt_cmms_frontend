const initialState = {
  // Mode การทำงาน
  action: "search",
  fill_data: false,
  tool_mode: true,

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
    "internal_document_id": "",
    "created_on": "",
    "remark": "",
    "created_by_user_name_th": "",
    "created_by_admin_name_th": "",
    "document_status_id": "",
    "src_warehouse_id": 999,
    "dest_warehouse_name": "",
    "refer_to_document": "",
    "line_items": []
  },
  list_show_mode_add: [
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": []
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": []
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": []
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": []
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": []
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": []
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": []
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": []
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": []
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": []
    },
  ],
  list_show_mode_add_row_index: "",
  no_part_show_mode_add: [],

  list_show_for_clear: [
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_group_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": []
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_group_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": []
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_group_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": []
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_group_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": []
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_group_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": []
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_group_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": []
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_group_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": []
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_group_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": []
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_group_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": []
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_group_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": []
    },
  ],

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
      console.log("reducer", action.value)
      return {
        ...state,
        document_show_popup: action.value
      }
    case "CLICK SELECT POPUP NO DOCUMENT":
      console.log("reducer", action.value)
      return {
        ...state,
        no_document: action.value.internal_document_id,
        document_show: action.value,
        // document_specific_show: action.value.specific,
        list_show: action.value.line_items,
        fill_data: true,
      }

    // Mode Edit
    case "ON CHANGE NAME":
      var clone_document_show = { ...state.document_show };
      clone_document_show.created_by_user_name_th = action.value;
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
      var clone_document_show = { ...state.document_show };
      clone_document_show.dest_warehouse_name = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "ON CHANGE SS101":
      var clone_document_show = { ...state.document_show };
      clone_document_show.refer_to_document = action.value;
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
      clone_list_show[action.rowIndex].internal_item_id = action.value
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
      clone_list_show[action.rowIndex].quantity = action.value;
      return {
        ...state,
        list_show: clone_list_show,
      }
    case "ON CHANGE UNIT PER BATH EACH ROW":
      var clone_list_show = [...state.list_show];
      clone_list_show[action.rowIndex].per_unit_price = action.value
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
        no_part_show: action.value,
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
      console.log("reducer", action.value)
      return {
        ...state,
        inventory_show_popup: action.value,
      }
    case "CLICK SELECT POPUP INVENTORY":
      var clone_document_show = { ...state.document_show };
      clone_document_show.dest_warehouse_name = action.value;
      console.log("reducer", action.value)
      return {
        ...state,
        document_show: clone_document_show,
      }

    case "CLICK SEARCH POPUP SS101":
      console.log("reducer", action.value)
      return {
        ...state,
        document_specific_show: action.value,
      }
    case "CLICK SELECT POPUP SS101":
      var clone_document_show = { ...state.document_show };
      clone_document_show.refer_to_document = action.value.internal_document_id;
      console.log("reducer", action.value)
      return {
        ...state,
        document_show: clone_document_show,
      }

    case "ON CHANGE NOTE":
      var clone_document_show = { ...state.document_show };
      clone_document_show.remark = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }

    // Mode Add
    case "ON CHANGE DOCUMENT MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.internal_document_id = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }
    case "ON CHANGE NAME MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.created_by_user_name_th = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }
    case "ON CHANGE BY ADMIN NAME MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.created_by_admin_name_th = action.value;
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
    case "ON CHANGE SS101 MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.refer_to_document = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }
    case "ON CHANGE NO PART EACH ROW MODE ADD":
      var clone_list_show_mode_add = [...state.list_show_mode_add]
      clone_list_show_mode_add[action.rowIndex].internal_item_id = action.value
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
        list_no_part_mode_add: state.list_show_mode_add[action.rowIndex].internal_item_id
      }
    case "ON CLICK SEARCH POPUP NO PART ADD MODE":
      return {
        ...state,
        no_part_show_mode_add: action.value,
        // no_part_show_mode_add: initialState.raw_no_part.filter(function (raw_no_part) {
        //   const regex = new RegExp(`${state.list_no_part_mode_add}`, 'i');
        //   var isMatch = regex.test(raw_no_part.no_part);
        //   return (isMatch);
        // }),
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
      clone_list_show_mode_add[action.rowIndex].quantity = action.value
      return {
        ...state,
        list_show_mode_add: clone_list_show_mode_add,
        // document_show_mode_add: clone_document_show_mode_add
      }
    case "ON CHANGE UNIT PER BATH EACH ROW MODE ADD":
      var clone_list_show_mode_add = [...state.list_show_mode_add];
      clone_list_show_mode_add[action.rowIndex].per_unit_price = action.value
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
      clone_document_show_mode_add.remark = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }
    case "ON CHANGE MY INVENTORY MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.dest_warehouse_name = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "CLICK SELECT POPUP INVENTORY MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.dest_warehouse_name = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add,
      }


    case "CLICK SEARCH POPUP SS101 MODE ADD":
      console.log("reducer", action.value)
      return {
        ...state,
        document_specific_show: action.value
      }
    case "CLICK SELECT POPUP SS101 MODE ADD":
      console.log("reducer", action.value.internal_document_id)
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.refer_to_document = action.value.internal_document_id;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add,
      }

    // POST DOCUMENT
    case "POST DOCUMENT":
      console.log("reuducer", action.resPost, "mode", action.value)
      return {
        ...state,
        action: action.value,
        clickable: action.value === "add" || action.value === "edit" ? true : false
      }

          // Clear State after sumbit
    case "ON CLEAR STATE MODE ADD":
      console.log(initialState.no_document)
      return {
        ...state,
        action: initialState.action,
        fill_data: initialState.fill_data,
        tool_mode: initialState.tool_mode,

        document_id: initialState.document_id,
        document_show_mode_add: initialState.document_show_mode_add,
        list_show_mode_add: state.list_show_for_clear,

        no_document: initialState.no_document,
        document_show: initialState.document_show,
        list_show: initialState.list_show,
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