const initialState = {

  // Mode การทำงาน
  action: "search",
  actionId: 2,
  fill_data: false,
  tool_mode: true,

  // Mode Search 
  no_document: "",
  no_districts: "",
  no_zone: "",
  no_date_start: "",
  no_date_end: "",

  document_show_popup: [],
  document_show: [],
  list_show: [], //เอาไว้ clone list ที่อยู่ใน document_show ออกมาแสดงผล


  // Mode Edit
  list_no_part: "", //เอามาใช้งานตอนที่กดแก้ไขอะไหล่ ในการใช้ค้นหา
  list_description_part: "",
  no_part_show: [],
  list_show_row_index: "", //ไว้บอกตำแหน่งว่ากด แก้ไข อะไหล่จาก row ไหนใน table



  // Mode Add
  document_id: "",
  document_type_id: "",
  list_no_part_mode_add: "",
  list_desription_part_mode_add: "",
  document_show_mode_add: {
    "internal_document_id": "",
    "created_on": "",
    "remark": "",
    "created_by_user_id": "",
    "created_by_user_name_th": "",
    "created_by_admin_name_th": "",
    "document_status_id": "",
    "employee_id": "",
    "src_warehouse_id": 999,
    "dest_warehouse_id": "",
    "dest_warehouse_name": "",
    "refer_to_document": null,
    "refer_to_document_id": "",
    "line_items": []
  },


  list_show_mode_add: [
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
  // สำหรับเก็บชื่อพนักงาน
  line_users: [],










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
    case "CLICK MODE EDIT":
      return {
        ...state,
        action: "edit"
      }
    // เลืก mode ในการทำงาน ( Search / Add / Edit )
    case "ACTION":
      // console.log("mode", action.value)
      return {
        ...state,
        action: action.value,
        clickable: action.value === "add" || action.value === "edit" ? true : false
      }
    case "ACTIONID":
      console.log("mode", action.value)
      return {
        ...state,
        actionId: action.value,
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
    case "ON CHANGE DISTRICTS":
      return {
        ...state,
        no_districts: action.value
      }
    case "ON CHANGE ZONE":
      return {
        ...state,
        no_zone: action.value
      }
    case "ON CHANGE DATE START":
      return {
        ...state,
        no_date_start: action.value
      }
    case "ON CHANGE DATE END":
      return {
        ...state,
        no_date_end: action.value
      }
    case "CLICK SEARCH POPUP NO DOCUMENT":
      console.log("reducer", action.value)
      return {
        ...state,
        document_show_popup: action.value
      }


    case "CLICK SELECT POPUP NO DOCUMENT":
      console.log("reducer", action.value)
      for (var i = action.value.line_items.length; i <= 9; i++) {
        action.value.line_items.push({
          "item_id": "",
          "internal_item_id": "",
          "description": "",
          "quantity": "",
          "uom_group_id": "",
          "unit": "",
          "per_unit_price": "",
          "list_uoms": []
        });
      }


      return {
        ...state,
        no_document: action.value.internal_document_id,
        document_show: action.value,
        // document_specific_show: action.value.specific,
        list_show: action.value.line_items,
        fill_data: true,
        // files:action.files
      }

    case "ON CHANGE DATE":
      var clone_document_show = { ...state.document_show };
      clone_document_show.created_on = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }

    case "ON CHANGE NAME BY ADMIN":
      var clone_document_show = { ...state.document_show };
      clone_document_show.created_by_admin_name_th = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }





    case "ON CHANGE DOCUMENT MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.internal_document_id = action.value;
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

    // POST DOCUMENT
    case "POST DOCUMENT":
      var clone_document_show_mode_add = initialState.document_show_mode_add;
      clone_document_show_mode_add.created_by_admin_name_th = action.decoded.firstname_th === null ? "" : action.decoded.firstname_th + " " + action.decoded.lastname_th;
      clone_document_show_mode_add.created_by_admin_id = action.decoded.user_id === null ? "" : action.decoded.user_id;

      clone_document_show_mode_add.dest_warehouse_id = action.decoded.list_positions[0].warehouse_id === null ? "" : action.decoded.list_positions[0].warehouse_id;
      clone_document_show_mode_add.dest_warehouse_name = action.decoded.list_positions[0].warehouse_name === null ? "" : action.decoded.list_positions[0].warehouse_name;

      console.log("action.decoded", clone_document_show_mode_add)
      return {
        ...state,
        action: action.value,
        document_id: action.resPost.document_id,
        clickable: action.value === "add" || action.value === "edit" ? true : false,
        document_show_mode_add: clone_document_show_mode_add
      }

    // Clear State after sumbit
    case "ON CLEAR STATE MODE ADD":
      console.log(initialState.no_document)
      console.log(initialState.action)
      return {
        ...state,
        action: initialState.action,
        actionId: initialState.actionId,

        document_id: initialState.document_id,
        document_show_mode_add: initialState.document_show_mode_add,
        list_show_mode_add: state.list_show_for_clear,

        no_document: initialState.no_document,
        document_show: initialState.document_show,
        list_show: initialState.list_show,

        document_show_popup: initialState.document_show_popup,

        list_no_part: initialState.list_no_part,
        list_description_part: initialState.list_description_part,
        no_part_show: initialState.no_part_show,
        list_show_row_index: initialState.list_show_row_index,

        document_type_id: initialState.document_type_id,
        list_no_part_mode_add: initialState.list_no_part_mode_add,
        list_desription_part_mode_add: initialState.list_desription_part_mode_add,

        list_show_mode_add_row_index: initialState.list_show_mode_add_row_index,
        no_part_show_mode_add: initialState.no_part_show_mode_add,

        line_users: initialState.line_users,
        files: initialState.files,
        clickable: initialState.clickable
      }


    case "ON CLICK CANCLE":
      console.log(initialState.action)
      return {
        ...state,
        action: initialState.action,
        actionId: initialState.actionId,

        document_id: initialState.document_id,
        document_show_mode_add: initialState.document_show_mode_add,
        list_show_mode_add: state.list_show_for_clear,

        no_document: initialState.no_document,
        document_show: initialState.document_show,
        list_show: initialState.list_show,

        document_show_popup: initialState.document_show_popup,

        list_no_part: initialState.list_no_part,
        list_description_part: initialState.list_description_part,
        no_part_show: initialState.no_part_show,
        // inventory_show_popup: initialState.inventory_show_popup,
        list_show_row_index: initialState.list_show_row_index,

        document_type_id: initialState.document_type_id,
        list_no_part_mode_add: initialState.list_no_part_mode_add,
        list_desription_part_mode_add: initialState.list_desription_part_mode_add,

        list_show_mode_add_row_index: initialState.list_show_mode_add_row_index,
        no_part_show_mode_add: initialState.no_part_show_mode_add,

        line_users: initialState.line_users,
        files: initialState.files,
        clickable: initialState.clickable
      }







    // Mode Edit
    case "ON CHANGE CREATE DATETIME":
      var clone_word_order_show = { ...state.document_show };
      clone_word_order_show.create_date_time = action.value;
      return {
        ...state,
        document_show: clone_word_order_show
      }

    case "ON CHANGE CREATE NAME":
      var clone_word_order_show = { ...state.document_show };
      clone_word_order_show.create_name = action.value;
      return {
        ...state,
        document_show: clone_word_order_show
      }

    case "ON CHANGE INFORMATION NAME":
      var clone_word_order_show = { ...state.document_show };
      clone_word_order_show.information_name = action.value;
      return {
        ...state,
        document_show: clone_word_order_show
      }

    case "ON CHANGE DATE START":
      var clone_word_order_show = { ...state.document_show };
      clone_word_order_show.date_start = action.value;
      return {
        ...state,
        document_show: clone_word_order_show
      }

    case "ON CHANGE TIME START":
      var clone_word_order_show = { ...state.document_show };
      clone_word_order_show.time_start = action.value;
      return {
        ...state,
        document_show: clone_word_order_show
      }

    case "ON CHANGE DATE END":
      var clone_word_order_show = { ...state.document_show };
      clone_word_order_show.date_end = action.value;
      return {
        ...state,
        document_show: clone_word_order_show
      }

    case "ON CHANGE TIME END":
      var clone_word_order_show = { ...state.document_show };
      clone_word_order_show.time_end = action.value;
      return {
        ...state,
        document_show: clone_word_order_show
      }

    case "ON CHANGE DISTRICT":
      var clone_word_order_show = { ...state.document_show };
      clone_word_order_show.district = action.value;
      return {
        ...state,
        document_show: clone_word_order_show
      }

    case "ON CHANGE ZONE":
      var clone_word_order_show = { ...state.document_show };
      clone_word_order_show.zone = action.value;
      return {
        ...state,
        document_show: clone_word_order_show
      }

    case "ON CHANGE STATION":
      var clone_word_order_show = { ...state.document_show };
      clone_word_order_show.station = action.value;
      return {
        ...state,
        document_show: clone_word_order_show
      }

    case "ON CHANGE JOB NAME":
      var clone_word_order_show = { ...state.document_show };
      clone_word_order_show.job_name = action.value;
      return {
        ...state,
        document_show: clone_word_order_show
      }




    case "ON CHANGE NOTE":
      var clone_word_order_show = { ...state.document_show };
      clone_word_order_show.note = action.value;
      return {
        ...state,
        document_show: clone_word_order_show
      }

    case "ON CHANGE EQUIPMENT":
      var clone_word_order_show = { ...state.document_show };
      clone_word_order_show.equipment = action.value;
      return {
        ...state,
        document_show: clone_word_order_show
      }

    case "ON CHANGE INFORMATION NAME":
      var clone_word_order_show = { ...state.document_show };
      clone_word_order_show.information_name = action.value;
      return {
        ...state,
        document_show: clone_word_order_show
      }


    case "ON CHANGE CONCLUSIONS":
      var clone_word_order_show = { ...state.document_show };
      clone_word_order_show.conclusions = action.value;
      return {
        ...state,
        document_show: clone_word_order_show
      }

    case "ON CHANGE REASON":
      var clone_word_order_show = { ...state.document_show };
      clone_word_order_show.reason = action.value;
      return {
        ...state,
        document_show: clone_word_order_show
      }

    case "ON CHANGE REPORT":
      var clone_word_order_show = { ...state.document_show };
      clone_word_order_show.report = action.value;
      return {
        ...state,
        document_show: clone_word_order_show
      }


    // Mode Add

    case "ON CHANGE CREATE DATETIME ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.create_date_time = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }


    case "ON CHANGE INFORMATION NAME ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.information_name = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "ON CHANGE DATE START ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.date_start = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "ON CHANGE TIME START ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.time_start = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "ON CHANGE DATE END ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.date_end = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "ON CHANGE TIME END ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.time_end = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "ON CHANGE CREATE NAME ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.create_name = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "ON CHANGE STATION ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.station = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }
    case "ON CHANGE ADDRESS ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.created_by_admin_name_th = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }
    case "ON CHANGE DISTRICT ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.district = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }
    case "ON CHANGE JOB NAME ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.job_name = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "ON CHANGE CONCLUSIONS ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.conclusions = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "ON CHANGE REASON ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.reason = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "ON CHANGE REPORT ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.report = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "ON CHANGE EQUIPMENT ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.equipment = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "ON CHANGE NOTE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.note = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }






    case "ON CHANGE STATUS EACH ROW":
      var clone_list_show = [...state.list_show];
      // console.log(clone_list_show[action.rowIndex])
      clone_list_show[action.rowIndex].quantity = action.value;
      return {
        ...state,
        list_show: clone_list_show,
      }


    case "ON CHANGE STATUS EACH ROW MODE ADD":
      var clone_list_show_mode_add = [...state.list_show_mode_add];
      clone_list_show_mode_add[action.rowIndex].quantity = action.value
      return {
        ...state,
        list_show_mode_add: clone_list_show_mode_add,
        // document_show_mode_add: clone_document_show_mode_add
      }

    case "ON CHANGE NOTE EACH ROW":
      var clone_list_show = [...state.list_show];
      // console.log(clone_list_show[action.rowIndex])
      clone_list_show[action.rowIndex].quantity = action.value;
      return {
        ...state,
        list_show: clone_list_show,
      }


    case "ON CHANGE NOTE EACH ROW MODE ADD":
      var clone_list_show_mode_add = [...state.list_show_mode_add];
      clone_list_show_mode_add[action.rowIndex].quantity = action.value
      return {
        ...state,
        list_show_mode_add: clone_list_show_mode_add,
        // document_show_mode_add: clone_document_show_mode_add
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