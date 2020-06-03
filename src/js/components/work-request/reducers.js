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


  // Mode Add
  document_id: "",
  document_type_id: "",
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

  // สำหรับเก็บชื่อพนักงาน
  // line_users: [],

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






    case "ON CLICK CANCLE":
      console.log(initialState.action)
      return {
        ...state,
        action: initialState.action,
        actionId: initialState.actionId,

        document_id: initialState.document_id,
        document_show_mode_add: initialState.document_show_mode_add,

        no_document: initialState.no_document,
        document_show: initialState.document_show,
        list_show: initialState.list_show,
        document_show_popup: initialState.document_show_popup,
        document_type_id: initialState.document_type_id,

        // line_users: initialState.line_users,
        files: initialState.files,
        clickable: initialState.clickable
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






    case "ON CHANGE INFORMATION EDIT":
      var clone_document_show = { ...state.document_show };
      clone_document_show.created_by_user_id = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }

    case "ON CHANGE DATE EDIT":
      var clone_document_show = { ...state.document_show };
      clone_document_show.created_on_date = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }

    case "ON CHANGE TIME EDIT":
      var clone_document_show = { ...state.document_show };
      clone_document_show.created_on_time = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }

    case "ON CHANGE STATION EDIT":
      var clone_document_show = { ...state.document_show };
      clone_document_show.created_by_user_id = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }

    case "ON CHANGE DISTRICTS EDIT":
      var clone_document_show = { ...state.document_show };
      clone_document_show.created_by_user_id = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }

    case "ON CHANGE ZONE EDIT":
      var clone_document_show = { ...state.document_show };
      clone_document_show.created_by_user_id = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }

    case "ON CHANGE JOB NAME EDIT":
      var clone_document_show = { ...state.document_show };
      clone_document_show.job_name = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }




    case "ON CHANGE INFORMATION ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.created_by_user_id = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "ON CHANGE DATE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.created_on_date = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "ON CHANGE TIME ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.created_on_time = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "ON CHANGE STATION ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.created_by_user_id = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "ON CHANGE DISTRICTS ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.created_by_user_id = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "ON CHANGE ZONE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.created_by_user_id = action.value;
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
      clone_document_show_mode_add = initialState.document_show_mode_add;
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
        no_document: initialState.no_document,
        document_show: initialState.document_show,
        document_show_popup: initialState.document_show_popup,
        document_type_id: initialState.document_type_id,

        // line_users: initialState.line_users,
        files: initialState.files,
        clickable: initialState.clickable
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