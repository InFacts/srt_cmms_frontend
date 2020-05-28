const initialState = {

  // Mode การทำงาน
  action: "search",
  fill_data: false,
  tool_mode: true,

  // Mode Search 
  no_document: "",
  document_show_popup: [],
  document_show: [],
  list_show: [], //เอาไว้ clone list ที่อยู่ใน document_show ออกมาแสดงผล

  // Mode Edit
  list_no_part: "", //เอามาใช้งานตอนที่กดแก้ไขอะไหล่ ในการใช้ค้นหา
  list_description_part: "",
  no_part_show: [],
  inventory_show_popup: [],
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
    "created_by_user_name_th": "",
    "created_by_user_id": "",
    "created_by_admin_name_th": "",
    "employee_id": "",
    "document_status_id": "",
    "src_warehouse_id": "",
    "src_warehouse_name": "",
    "dest_warehouse_id": "",
    "dest_warehouse_name": "",
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
      "list_uoms": [],
      "at_source": [
        {
          "current_unit_count": "",
          "item_status": {
          "description_th": ""
          }
        }
      ]
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_group_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": [],
      "at_source": [
        {
          "current_unit_count": "",
          "item_status": {
          "description_th": ""
          }
        }
      ]
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_group_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": [],
      "at_source": [
        {
          "current_unit_count": "",
          "item_status": {
            "description_th": ""
          }
        }
      ]
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_group_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": [],
      "at_source": [
        {
          "current_unit_count": "",
          "item_status": {
            "description_th": ""
          }
        }
      ]
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_group_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": [],
      "at_source": [
        {
          "current_unit_count": "",
          "item_status": {
            "description_th": ""
          }
        }
      ]
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_group_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": [],
      "at_source": [
        {
          "current_unit_count": "",
          "item_status": {
            "description_th": ""
          }
        }
      ]
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_group_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": [],
      "at_source": [
        {
          "current_unit_count": "",
          "item_status": {
            "description_th": ""
          }
        }
      ]
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_group_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": [],
      "at_source": [
        {
          "current_unit_count": "",
          "item_status": {
            "description_th": ""
          }
        }
      ]
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_group_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": [],
      "at_source": [
        {
          "current_unit_count": "",
          "item_status": {
            "description_th": ""
          }
        }
      ]
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_group_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": [],
      "at_source": [
        {
          "current_unit_count": "",
          "item_status": {
            "description_th": ""
          }
        }
      ]
    },
  ],

  list_show_for_clear: [
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_group_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": [],
      "at_source": [
        {
          "current_unit_count": "",
          "item_status": {
            "description_th": ""
          }
        }
      ]
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_group_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": [],
      "at_source": [
        {
          "current_unit_count": "",
          "item_status": {
            "description_th": ""
          }
        }
      ]
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_group_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": [],
      "at_source": [
        {
          "current_unit_count": "",
          "item_status": {
            "description_th": ""
          }
        }
      ]
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_group_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": [],
      "at_source": [
        {
          "current_unit_count": "",
          "item_status": {
            "description_th": ""
          }
        }
      ]
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_group_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": [],
      "at_source": [
        {
          "current_unit_count": "",
          "item_status": {
            "description_th": ""
          }
        }
      ]
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_group_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": [],
      "at_source": [
        {
          "current_unit_count": "",
          "item_status": {
            "description_th": ""
          }
        }
      ]
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_group_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": [],
      "at_source": [
        {
          "current_unit_count": "",
          "item_status": {
            "description_th": ""
          }
        }
      ]
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_group_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": [],
      "at_source": [
        {
          "current_unit_count": "",
          "item_status": {
            "description_th": ""
          }
        }
      ]
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_group_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": [],
      "at_source": [
        {
          "current_unit_count": "",
          "item_status": {
            "description_th": ""
          }
        }
      ]
    },
    {
      "item_id": "",
      "internal_item_id": "",
      "description": "",
      "quantity": "",
      "uom_group_id": "",
      "unit": "",
      "per_unit_price": "",
      "list_uoms": [],
      "at_source": [
        {
          "current_unit_count": "",
          "item_status": {
            "description_th": ""
          }
        }
      ]
    },
  ],
  list_show_mode_add_row_index: "",
  no_part_show_mode_add: [],

  // สำหรับเก็บชื่อพนักงาน
  line_users: [],

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

    // Mode Search
    case "CLICK OPEN POPUP":
      return {
        ...state,
        document_show_popup: initialState.document_show_popup
      }
    case "ON CHANGE NO DOCUMENT":
      var clone_document_show = state.document_show
      clone_document_show.internal_document_id = action.value
      return {
        ...state,
        no_document: action.value,
        document_show: clone_document_show
      }
    case "CLICK SEARCH POPUP NO DOCUMENT":
      // console.log("reducer", action.value)
      return {
        ...state,
        document_show_popup: action.value
      }
    case "CLICK SELECT POPUP NO DOCUMENT":
      for (var i = action.value.line_items.length; i <= 9; i++) {
        action.value.line_items.push(
          {
            "item_id": "",
            "internal_item_id": "",
            "description": "",
            "quantity": "",
            "uom_group_id": "",
            "unit": "",
            "per_unit_price": "",
            "list_uoms": [],
            "at_source": [
              {
                "adjustment_unit_count": "",
                "begin_unit_count": "",
                "current_unit_count": "",
                "in_unit_count": "",
                "issue_unit_count": "",
                "item_id": "",
                "item_status": {
                  "item_status_id": "",
                  "description": "",
                  "description_th": ""
                },
                "item_status_id": "",
                "out_unit_count": "",
                "receive_unit_count": "",
                "warehouse_id": ""
              }
            ]
          }
        );
      }
      return {
        ...state,
        no_document: action.value.internal_document_id,
        document_show: action.value,
        list_show: action.value.line_items,
        // fill_data: true,
      }

    // Mode Edit
    case "ON CHANGE NAME":
      var clone_document_show = { ...state.document_show };
      clone_document_show.created_by_user_name_th = action.value;
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
    case "ON CHANGE DATE":
      var clone_document_show = { ...state.document_show };
      clone_document_show.created_on = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "ON CHANGE MY INVENTORY":
      var clone_document_show = { ...state.document_show };
      console.log(state.document_show)
      clone_document_show.dest_warehouse_id = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "ON CHANGE SRC INVENTORY":
      var clone_document_show = { ...state.document_show };
      clone_document_show.src_warehouse_id = action.value;
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
      var clone_list_show_test = [...state.list_show];
      clone_list_show_test[action.rowIndex].internal_item_id = action.value
      console.log("clone_list_show_test[action.rowIndex]", clone_list_show_test[action.rowIndex])
      return {
        ...state,
        list_show: clone_list_show_test,
        list_show_row_index: action.rowIndex,
        list_no_part: action.value
      }
    case "ON CLICK NO PART EACH ROW":
      return {
        ...state,
        list_show_row_index: action.rowIndex,
        no_part_show: initialState.no_part_show,
        list_no_part: state.list_show[action.rowIndex].internal_item_id
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
        no_part_show: action.value
      }
    case "ON CLICK SELECT POPUP NO PART":
      var clone_list_show = [...state.list_show];
      
      clone_list_show[state.list_show_row_index].item_id = state.no_part_show[action.rowIndex].item_id
      clone_list_show[state.list_show_row_index].internal_item_id = state.no_part_show[action.rowIndex].internal_item_id
      clone_list_show[state.list_show_row_index].description = state.no_part_show[action.rowIndex].description
      clone_list_show[state.list_show_row_index].list_uoms = state.no_part_show[action.rowIndex].list_uoms
      clone_list_show[state.list_show_row_index].uom_group_id = state.no_part_show[action.rowIndex].uom_group_id

      clone_list_show[state.list_show_row_index].quantity = 1
      clone_list_show[state.list_show_row_index].per_unit_price = "1.0000"
      clone_list_show[state.list_show_row_index].at_source[0].current_unit_count = action.resStatistic[0].current_unit_count
      clone_list_show[state.list_show_row_index].at_source[0].item_status.description_th = action.resStatistic[0].description_th
      return {
        ...state,
        list_show: clone_list_show
      }
    case "CLICK SEARCH POPUP INVENTORY":
      return {
        ...state,
        inventory_show_popup: action.value.results
      }
    case "CLICK SELECT POPUP INVENTORY MODE EDIT":
      var clone_document_show = { ...state.document_show };
      clone_document_show.dest_warehouse_id = state.inventory_show_popup[action.row_inventory_show_popup].warehouse_id
      clone_document_show.dest_warehouse_name = state.inventory_show_popup[action.row_inventory_show_popup].name
      return {
        ...state,
        document_show: clone_document_show,
      }
    case "CLICK SELECT POPUP SRC INVENTORY MODE EDIT":
      var clone_document_show = { ...state.document_show };
      clone_document_show.src_warehouse_id = state.inventory_show_popup[action.row_inventory_show_popup].warehouse_id
      clone_document_show.src_warehouse_name = state.inventory_show_popup[action.row_inventory_show_popup].name
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
    case "ON CHANGE MY INVENTORY NAMAE":
      var clone_document_show = { ...state.document_show };
      clone_document_show.dest_warehouse_name = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "ON CHANGE SRC INVENTORY NAMAE":
      var clone_document_show = { ...state.document_show };
      clone_document_show.src_warehouse_name = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "ON CHANGE NAME ID":
      var clone_document_show = { ...state.document_show };
      clone_document_show.employee_id = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "ON CHANGE TRANFER":
      var clone_document_show = { ...state.document_show };
      clone_document_show.transfer_method = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "CLICK SEARCH POPUP USER MODE EDIT":
      return {
        ...state,
        line_users: action.value
      }
    case "CLICK SELECT POPUP USER MODE EDIT":
      console.log("state.line_users[action.row_inventory_show_popup].user_id", state.line_users[action.row_inventory_show_popup].user_id)
      var clone_document_show = { ...state.document_show };
      clone_document_show.created_by_user_name_th = state.line_users[action.row_inventory_show_popup].firstname_th + " " + state.line_users[action.row_inventory_show_popup].lastname_th
      clone_document_show.employee_id = state.line_users[action.row_inventory_show_popup].employee_id
      clone_document_show.created_by_user_id = state.line_users[action.row_inventory_show_popup].user_id
      return {
        ...state,
        document_show: clone_document_show,
      }
    case "ON CHANGE DESCRIPTION PART":
      return {
        ...state,
        list_desription_part: action.value
      }

    // Mode Add
    case "ON CHANGE SRC INVENTORY MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.src_warehouse_id = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }
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
    case "ON CHANGE NAME ID MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.employee_id = action.value;
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
        no_part_show_mode_add: action.value
      }
    case "ON CHANGE NO PART MODE ADD":
      return {
        ...state,
        list_no_part_mode_add: action.value
      }
    case "ON CLICK SELECT POPUP NO PART MODE ADD":
      var clone_list_show_mode_add = [...state.list_show_mode_add];
      console.log(clone_list_show_mode_add[state.list_show_mode_add_row_index], "<<<<<<<<<")

      clone_list_show_mode_add[state.list_show_mode_add_row_index].item_id = state.no_part_show_mode_add[action.rowIndex].item_id
      clone_list_show_mode_add[state.list_show_mode_add_row_index].internal_item_id = state.no_part_show_mode_add[action.rowIndex].internal_item_id
      clone_list_show_mode_add[state.list_show_mode_add_row_index].description = state.no_part_show_mode_add[action.rowIndex].description
      clone_list_show_mode_add[state.list_show_mode_add_row_index].uom_group_id = state.no_part_show_mode_add[action.rowIndex].uom_group_id
      clone_list_show_mode_add[state.list_show_mode_add_row_index].list_uoms = state.no_part_show_mode_add[action.rowIndex].list_uoms
      clone_list_show_mode_add[state.list_show_mode_add_row_index].quantity = 1
      clone_list_show_mode_add[state.list_show_mode_add_row_index].per_unit_price = "1.0000"
      clone_list_show_mode_add[state.list_show_mode_add_row_index].current_unit_count = action.resStatistic[0].current_unit_count
      clone_list_show_mode_add[state.list_show_mode_add_row_index].description_th = action.resStatistic[0].description_th
      return {
        ...state,
        list_show_mode_add: clone_list_show_mode_add
      }
    case "ON CHANGE QUILITY EACH ROW MODE ADD":
      var clone_list_show_mode_add = [...state.list_show_mode_add];
      clone_list_show_mode_add[action.rowIndex].quantity = action.value
      return {
        ...state,
        list_show_mode_add: clone_list_show_mode_add
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
    case "CLICK SELECT POPUP SRC INVENTORY MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.src_warehouse_id = state.inventory_show_popup[action.row_inventory_show_popup].warehouse_id
      clone_document_show_mode_add.src_warehouse_name = state.inventory_show_popup[action.row_inventory_show_popup].name
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add,
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
      clone_document_show_mode_add.dest_warehouse_id = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }
    case "ON CHANGE MY INVENTORY NAMAE MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.dest_warehouse_name = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }
    case "ON CHANGE SRC INVENTORY NAMAE MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.src_warehouse_name = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }
    case "CLICK SELECT POPUP INVENTORY":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.dest_warehouse_id = state.inventory_show_popup[action.row_inventory_show_popup].warehouse_id
      clone_document_show_mode_add.dest_warehouse_name = state.inventory_show_popup[action.row_inventory_show_popup].name
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add,
      }
    case "CLICK SEARCH POPUP USER":
      return {
        ...state,
        line_users: action.value
      }
    case "CLICK SELECT POPUP USER":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.created_by_user_name_th = state.line_users[action.row_inventory_show_popup].firstname_th + " " + state.line_users[action.row_inventory_show_popup].lastname_th
      clone_document_show_mode_add.employee_id = state.line_users[action.row_inventory_show_popup].employee_id
      clone_document_show_mode_add.created_by_user_id = state.line_users[action.row_inventory_show_popup].user_id
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add,
      }
    case "ON CHANGE DESCRIPTION PART MODE ADD":
      return {
        ...state,
        list_desription_part_mode_add: action.value
      }
    case "ON CHANGE TRANFER MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.transfer_method = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "KEY PRESS ENTER":
      if (action.value === action.res.internal_item_id) {
        console.log("state.list_show_mode_add", state.list_show_mode_add)
        var clone_list_show_mode_add = [...state.list_show_mode_add];
        clone_list_show_mode_add[action.rowIndex] = action.res.internal_item_id
        clone_list_show_mode_add[action.rowIndex].quantity = "1"
        clone_list_show_mode_add[action.rowIndex].per_unit_price = "1.0000"
        return {
          ...state,
          list_show_mode_add: clone_list_show_mode_add
        }
      }
      else return {
        ...state,
      }
    case "NOT ENTER":
      return {
        ...state,
      }

    // POST DOCUMENT
    case "POST DOCUMENT":
      clone_document_show_mode_add = initialState.document_show_mode_add;
      clone_document_show_mode_add.created_by_admin_name_th = action.decoded.firstname_th === null ? "" : action.decoded.firstname_th + " " + action.decoded.lastname_th;
      clone_document_show_mode_add.created_by_admin_id = action.decoded.user_id === null ? "" : action.decoded.user_id;

      clone_document_show_mode_add.dest_warehouse_id = action.decoded.list_positions[0].warehouse_id === null ? "" : action.decoded.list_positions[0].warehouse_id;
      clone_document_show_mode_add.dest_warehouse_name = action.decoded.list_positions[0].warehouse_name === null ? "" : action.decoded.list_positions[0].warehouse_name;

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
      return {
        ...state,
        action: initialState.action,
        // fill_data: initialState.fill_data,
        // tool_mode: initialState.tool_mode,

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
        inventory_show_popup: initialState.inventory_show_popup,
        list_show_row_index: initialState.list_show_row_index,

        document_type_id: initialState.document_type_id,
        list_no_part_mode_add: initialState.list_no_part_mode_add,
        list_desription_part_mode_add: initialState.list_desription_part_mode_add,

        list_show_mode_add_row_index: initialState.list_show_mode_add_row_index,
        no_part_show_mode_add: initialState.no_part_show_mode_add,

        line_users: initialState.line_users,
      }
    case "ON CLICK CANCLE":
      return {
        ...state,
        action: initialState.action,
        // fill_data: initialState.fill_data,
        // tool_mode: initialState.tool_mode,

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
        inventory_show_popup: initialState.inventory_show_popup,
        list_show_row_index: initialState.list_show_row_index,

        document_type_id: initialState.document_type_id,
        list_no_part_mode_add: initialState.list_no_part_mode_add,
        list_desription_part_mode_add: initialState.list_desription_part_mode_add,

        list_show_mode_add_row_index: initialState.list_show_mode_add_row_index,
        no_part_show_mode_add: initialState.no_part_show_mode_add,

        line_users: initialState.line_users,
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