const initialState = {

  document: [
    {
      "id": 1,

      "district": "แขวงนครสวรรค์",
      "zone": "",
      "date_start": "2020-04-14",
      "date_end": "2020-04-14",
      "job_name": "รถไฟชน",
      "create_name": "นายศิวกร แสงสว่าง",
      "station": "ตอนบางซื่อ",


      "no_document": "12345",
      "detail": "",
      "type_item": "Fixed Asset",
      "group_asset": "",
      "type_account": "",

      "import_name": "Pallet",
      "import_quantity": "48",
      "depreciation_per_year": "",
      "depreciation_type": "",

      "status": "เปิดการใช้งาน",
      "note": "",

      "short_name_unit": "",
      "name_unit": "",
      "type_unit": "",
      "valuation_method": "",
      "list": [
        {
          "id": 1,
          "no_part": "001",
          "detail": "",
          "location": "คลัง",
          "status": "ใช้งานอยู่",
          "value": "",
          "quility": 10,
          "note": "",
        },
      ],

      "group_maintenance": "",
      "type_maintenance": "",
      "list_main": [
        {
          "id": 1,
          "no_part": "001",
          "detail": "",
          "unit": "",
          "quility": 10,
          "note": "",
          "name": "",
          "freq": 2,
          "per": "",
        },


      ]
    }
  ],


  raw_no_part: [
    {
      "id": 1,
      "no_part": "001",
      "detail": "",
      "location": "คลัง",
      "status": "ใช้งานอยู่",
      "value": "",
      "quility": 10,
      "note": "",
    },
  ],



  raw_no_part_main: [
    {
      "id": 1,
      "no_part": "001",
      "detail": "",
      "unit": "",
      "quility": 10,
      "note": "",
      "name": "",
      "freq": 2,
      "per": "",
    },
  ],





  status: [
    {
      id: 1,
      status: "เปิดการใช้งาน"
    },
    {
      id: 2,
      status: "ปิดการใช้งาน"
    }
  ],

  type_item: [
    {
      id: 1,
      status: "Fixed Asset"
    },
  ],

  type_account: [
    {
      id: 1,
      status: "Fixed Asset"
    },

  ],

  depreciation_type: [
    {
      id: 1,
      status: "SS"
    },
  ],

  type_unit: [
    {
      id: 1,
      status: "SS"
    },
  ],

  valuation_method: [
    {
      id: 1,
      status: "SS"
    },
  ],

  list_status: [
    {
      id: 1,
      status: "ใช้งานอยู่"
    },
  ],

  list_per: [
    {
      id: 1,
      status: "เดือน"
    },
  ],

  // แขวง
  district: [
    {
      "id": 1,
      "name": "แขวงลาดยาว"
    },
    {
      "id": 2,
      "name": "แขวงจตุจักร"
    },
    {
      "id": 3,
      "name": "แขวงนครสวรรค์"
    }
  ],
  // เขต
  zone: [
    {
      "id": 1,
      "name": "ตอนลาดยาว"
    },
    {
      "id": 2,
      "name": "ตอนจตุจักร"
    },
    {
      "id": 3,
      "name": "ตอนบางซื่อ"
    }
  ],


  // Mode การทำงาน
  action: "search",

  // Mode Search
  no_document: "",
  districts: "",
  zones: "",
  date_starts: "",
  date_ends: "",

  document_show_popup: [],
  document_show: [],
  list_show: [],
  list_show_main: [],

  // Mode Edit
  list_no_part: "",
  list_show_row_index: "", //ไว้บอกตำแหน่งว่ากด แก้ไข อะไหล่จาก row ไหนใน table
  no_part_show: [],

  list_no_part_main: "",
  list_show_row_index_main: "", //ไว้บอกตำแหน่งว่ากด แก้ไข อะไหล่จาก row ไหนใน table
  no_part_show_main: [],

  // Mode Add
  list_no_part_mode_add: "",
  list_no_part_mode_add_main: "",

  document_show_mode_add: {
    "id": "",
    "no_document": "",
    "detail": "",
    "type_item": "",
    "group_asset": "",
    "type_account": "",

    "import_name": "",
    "import_quantity": "",
    "depreciation_per_year": "",
    "depreciation_type": "",

    "status": "",
    "note": "",

    "short_name_unit": "",
    "name_unit": "",
    "type_unit": "",
    "valuation_method": "",
    "list": [],

    "group_maintenance": "",
    "type_maintenance": "",
    "list_main": [],
  },

  list_show_mode_add: [
    {
      "id": "",
      "no_part": "",
      "detail": "",
      "location": "",
      "status": "",
      "value": "",
      "quility": "",
      "note": "",
    },
  ],
  list_show_mode_add_row_index: "",
  no_part_show_mode_add: [],




  list_show_mode_add_main: [
    {
      "id": "",
      "no_part": "",
      "detail": "",
      "unit": "",
      "quility": "",
      "note": "",
      "name": "",
      "freq": "",
      "per": "",
    },
  ],
  list_show_mode_add_row_index_main: "",
  no_part_show_mode_add_main: [],




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
    case "CHANGE NO DOCUMENT":
      return {
        ...state,
        no_document: action.value
      }
    case "ON CHANGE DISTRICTS":
      return {
        ...state,
        districts: action.value
      }

    case "ON CHANGE ZONES":
      return {
        ...state,
        zones: action.value
      }

    case "ON CHANGE DATE STRARTS":
      return {
        ...state,
        date_starts: action.value
      }

    case "ON CHANGE DATE ENDS":
      return {
        ...state,
        date_ends: action.value
      }

    case "CLICK OPEN POPUP NO DOCUMENT":
      return {
        ...state,
        document_show_popup: initialState.document_show_popup
      }


    case "CLICK SEARCH POPUP NO DOCUMENT":
      // const no_document_requestRegex = new RegExp(`${state.no_document}`, "gi");
      // const date_endsRegex = new RegExp(`${state.date_ends}`, "gi");
      // const date_startsRegex = new RegExp(`${state.date_starts}`, "gi");
      // const zonesRegex = new RegExp(`${state.zones}`, "gi");
      // const districtsRegex = new RegExp(`${state.districts}`, "gi");
      return {
        ...state,
        // document_show_popup: initialState.document.filter(function (document) {
        //   var isMatch = (!no_document_requestRegex || no_document_requestRegex.test(document.no_asset_install)) &&
        //     (!date_endsRegex || date_endsRegex.test(document.date_end)) &&
        //     (!date_startsRegex || date_startsRegex.test(document.date_start)) &&
        //     (!zonesRegex || zonesRegex.test(document.zone)) &&
        //     (!districtsRegex || districtsRegex.test(document.district))
        //   return (isMatch);
        // }

        document_show_popup: initialState.document.filter(item =>{
          const query = state.no_document.toLowerCase();
          const query2 = state.date_starts.toLowerCase();
          const query3 = state.date_ends.toLowerCase();
          const query4 = state.zones.toLowerCase();
          const query5 = state.districts.toLowerCase();
          return(
            (item.no_document.toLowerCase().indexOf(query) >= 0 || !query )&&
            (item.zone.toLowerCase().indexOf(query4) >= 0 || !query4 ) &&
            (item.district.toLowerCase().indexOf(query5) >= 0 || !query5 ) &&
            (item.date_end.toLowerCase().indexOf(query3) >= 0 || !query3 ) &&
            (item.date_start.toLowerCase().indexOf(query2) >= 0 || !query2 ) 
          )

          }
        ),
      }

    case "CLICK SELECT POPUP NO DOCUMENT":
      return {
        ...state,
        no_document: state.document_show_popup[action.row_document_show_popup].no_document,
        document_show: state.document_show_popup[action.row_document_show_popup],
        list_show: state.document_show_popup[action.row_document_show_popup].list,
        list_show_main: state.document_show_popup[action.row_document_show_popup].list_main
      }



    case "CHANGE DETAIL":
      var clone_document_show = { ...state.document_show };
      clone_document_show.detail = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }

    case "CHANGE TYPE ITEM":
      var clone_document_show = { ...state.document_show };
      clone_document_show.type_item = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }

    case "CHANGE GROUP ASSET":
      var clone_document_show = { ...state.document_show };
      clone_document_show.group_asset = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }

    case "CHANGE TYPE ACCOUNT":
      var clone_document_show = { ...state.document_show };
      clone_document_show.type_account = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }

    case "CHANGE IMPORT NAME":
      var clone_document_show = { ...state.document_show };
      clone_document_show.import_name = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }

    case "CHANGE IMPORT NAME ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.import_name = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "CHANGE IMPORT QUANTITY":
      var clone_document_show = { ...state.document_show };
      clone_document_show.import_quantity = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }

    case "CHANGE IMPORT QUANTITY ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.import_quantity = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }


    case "CHANGE DEPRECIATION PER YEAR":
      var clone_document_show = { ...state.document_show };
      clone_document_show.depreciation_per_year = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }

    case "CHANGE DEPRECIATION PER YEAR ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.depreciation_per_year = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "CHANGE DEPRECIATION TYPE":
      var clone_document_show = { ...state.document_show };
      clone_document_show.depreciation_type = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }


    case "CHANGE DEPRECIATION TYPE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.depreciation_type = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "CHANGE STATUS":
      var clone_document_show = { ...state.document_show };
      clone_document_show.status = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }

    case "CHANGE STATUS ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.status = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "CHANGE NOTE":
      var clone_document_show = { ...state.document_show };
      clone_document_show.note = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }

    case "CHANGE NOTE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.note = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "CHANGE SHORT NAME UNIT":
      var clone_document_show = { ...state.document_show };
      clone_document_show.short_name_unit = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }

    case "CHANGE SHORT NAME UNIT ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.short_name_unit = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }


    case "CHANGE NAME UNIT":
      var clone_document_show = { ...state.document_show };
      clone_document_show.name_unit = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }

    case "CHANGE NAME UNIT ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.name_unit = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "CHANGE TYPE UNIT":
      var clone_document_show = { ...state.document_show };
      clone_document_show.type_unit = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }


    case "CHANGE TYPE UNIT ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.type_unit = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "CHANGE VALUATION METHOD":
      var clone_document_show = { ...state.document_show };
      clone_document_show.valuation_method = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }


    case "CHANGE GROUP MAINTENANCE":
      var clone_document_show = { ...state.document_show };
      clone_document_show.group_maintenance = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }

    case "CHANGE TYPE MAINTENANCE":
      var clone_document_show = { ...state.document_show };
      clone_document_show.type_maintenance = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }


    case "CHANGE VALUATION METHOD ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.valuation_method = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }


    case "CHANGE GROUP MAINTENANCE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.group_maintenance = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }


    case "CHANGE TYPE MAINTENANCE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.type_maintenance = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
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
    case "ON CLICK SEARCH POPUP NO PART":
      return {
        ...state,
        no_part_show: initialState.raw_no_part.filter(function (raw_no_part) {
          const regex = new RegExp(`${state.list_no_part}`, 'i');
          var isMatch = regex.test(raw_no_part.no_part);
          return (isMatch);
        }),
      }

    case "ON CHANGE NO PART":
      return {
        ...state,
        list_no_part: action.value
      }

    case "ON CLICK SELECT POPUP NO PART":
      console.log(state.no_part_show[action.rowIndex], "and", state.list_show_row_index)
      var clone_list_show = [...state.list_show];
      clone_list_show[state.list_show_row_index] = state.no_part_show[action.rowIndex]
      return {
        ...state,
        list_show: clone_list_show
      }

    case "ON CHANGE STATUS EACH ROW":
      var clone_list_show = [...state.list_show];
      console.log(clone_list_show[action.rowIndex])
      clone_list_show[action.rowIndex].status = action.value
      return {
        ...state,
        list_show: clone_list_show
      }
    case "ON CHANGE QUILITY EACH ROW":
      var clone_list_show = [...state.list_show];
      clone_list_show[action.rowIndex].quility = action.value
      return {
        ...state,
        list_show: clone_list_show
      }

    case "ON CHANGE NOTE EACH ROW":
      var clone_list_show = [...state.list_show];
      clone_list_show[action.rowIndex].note = action.value
      return {
        ...state,
        list_show: clone_list_show
      }

    case "ON CHANGE STATUS EACH ROW MODE ADD":
      var clone_list_show_mode_add = [...state.list_show_mode_add];
      // console.log(clone_list_show[action.rowIndex])
      clone_list_show_mode_add[action.rowIndex].status = action.value
      return {
        ...state,
        list_show_mode_add: clone_list_show_mode_add
      }

    case "ON CHANGE QUILITY EACH ROW MODE ADD":
      var clone_list_show_mode_add = [...state.list_show_mode_add];
      // console.log(clone_list_show[action.rowIndex])
      clone_list_show_mode_add[action.rowIndex].quility = action.value
      return {
        ...state,
        list_show_mode_add: clone_list_show_mode_add
      }

    case "ON CHANGE NOTE EACH ROW MODE ADD":
      var clone_list_show_mode_add = [...state.list_show_mode_add];
      // console.log(clone_list_show[action.rowIndex])
      clone_list_show_mode_add[action.rowIndex].note = action.value
      return {
        ...state,
        list_show_mode_add: clone_list_show_mode_add
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
      console.log(state.no_part_show_mode_add[action.rowIndex], "and", state.list_show_mode_add[state.list_show_mode_add_row_index])

      var clone_list_show_mode_add = [...state.list_show_mode_add];
      clone_list_show_mode_add[state.list_show_mode_add_row_index] = state.no_part_show_mode_add[action.rowIndex]

      return {
        ...state,
        list_show_mode_add: clone_list_show_mode_add
      }




























    case "ON CHANGE NO PART MASTER EACH ROW":
      var clone_list_show = [...state.list_show_main];
      clone_list_show[action.rowIndex].no_part = action.value
      return {
        ...state,
        list_show_main: clone_list_show,
        list_show_row_index_main: action.rowIndex,
        list_no_part_main: action.value
      }
    case "ON CLICK NO PART MASTER EACH ROW":
      return {
        ...state,
        list_show_row_index_main: action.rowIndex,
        no_part_show_main: initialState.no_part_show_main,
        list_no_part_main: state.list_show_main[action.rowIndex].no_part
      }
    case "ON CLICK SEARCH POPUP NO PART MASTER":
      return {
        ...state,
        no_part_show_main: initialState.raw_no_part_main.filter(function (raw_no_part) {
          const regex = new RegExp(`${state.list_no_part_main}`, 'i');
          var isMatch = regex.test(raw_no_part.no_part);
          return (isMatch);
        }),
      }

    case "ON CHANGE NO PART MASTER":
      return {
        ...state,
        list_no_part_main: action.value
      }

    case "ON CLICK SELECT POPUP NO PART MASTER":
      console.log(state.no_part_show_main[action.rowIndex], "and", state.list_show_row_index_main)
      var clone_list_show = [...state.list_show];
      clone_list_show[state.list_show_row_index_main] = state.no_part_show_main[action.rowIndex]
      return {
        ...state,
        list_show_main: clone_list_show
      }

    case "ON CLICK NO PART MASTER EACH ROW MODE ADD":
      return {
        ...state,
        list_show_mode_add_row_index_main: action.rowIndex,
        no_part_show_mode_add_main: initialState.no_part_show_mode_add_main,
        list_no_part_mode_add_main: state.list_show_mode_add_main[action.rowIndex].no_part
      }

    case "ON CLICK SEARCH POPUP NO PART MASTER ADD MODE":
      return {
        ...state,
        no_part_show_mode_add_main: initialState.raw_no_part_main.filter(function (raw_no_part) {
          const regex = new RegExp(`${state.list_no_part_mode_add_main}`, 'i');
          var isMatch = regex.test(raw_no_part.no_part);
          return (isMatch);
        }),
      }

    case "ON CHANGE NO PART MASTER MODE ADD":
      return {
        ...state,
        list_no_part_mode_add_main: action.value
      }

    case "ON CLICK SELECT POPUP NO PART MASTER MODE ADD":
      console.log(state.no_part_show_mode_add_main[action.rowIndex], "and", state.list_show_mode_add_main[state.list_show_mode_add_row_index_main])

      var clone_list_show_mode_add = [...state.list_show_mode_add_main];
      clone_list_show_mode_add[state.list_show_mode_add_row_index_main] = state.no_part_show_mode_add_main[action.rowIndex]

      return {
        ...state,
        list_show_mode_add_main: clone_list_show_mode_add
      }






    case "ON CHANGE NAME MASTER EACH ROW":
      var clone_list_show = [...state.list_show_main];
      clone_list_show[action.rowIndex].name = action.value
      return {
        ...state,
        list_show_main: clone_list_show
      }

    case "ON CHANGE NAME MASTER EACH ROW MODE ADD":
      var clone_list_show_mode_add = [...state.list_show_mode_add_main];
      // console.log(clone_list_show[action.rowIndex])
      clone_list_show_mode_add[action.rowIndex].name = action.value
      return {
        ...state,
        list_show_mode_add_main: clone_list_show_mode_add
      }

    case "ON CHANGE FREQ MASTER EACH ROW":
      var clone_list_show = [...state.list_show_main];
      clone_list_show[action.rowIndex].freq = action.value
      return {
        ...state,
        list_show_main: clone_list_show
      }

    case "ON CHANGE FREQ MASTER EACH ROW MODE ADD":
      var clone_list_show_mode_add = [...state.list_show_mode_add_main];
      // console.log(clone_list_show[action.rowIndex])
      clone_list_show_mode_add[action.rowIndex].freq = action.value
      return {
        ...state,
        list_show_mode_add_main: clone_list_show_mode_add
      }


    case "ON CHANGE PER MASTER EACH ROW":
      var clone_list_show = [...state.list_show_main];
      clone_list_show[action.rowIndex].per = action.value
      return {
        ...state,
        list_show_main: clone_list_show
      }

    case "ON CHANGE PER MASTER EACH ROW MODE ADD":
      var clone_list_show_mode_add = [...state.list_show_mode_add_main];
      // console.log(clone_list_show[action.rowIndex])
      clone_list_show_mode_add[action.rowIndex].per = action.value
      return {
        ...state,
        list_show_mode_add_main: clone_list_show_mode_add
      }


    case "ON CHANGE DETAIL MASTER EACH ROW":
      var clone_list_show = [...state.list_show_main];
      clone_list_show[action.rowIndex].detail = action.value
      return {
        ...state,
        list_show_main: clone_list_show
      }

    case "ON CHANGE DETAIL MASTER EACH ROW MODE ADD":
      var clone_list_show_mode_add = [...state.list_show_mode_add_main];
      // console.log(clone_list_show[action.rowIndex])
      clone_list_show_mode_add[action.rowIndex].detail = action.value
      return {
        ...state,
        list_show_mode_add_main: clone_list_show_mode_add
      }

    case "ON CHANGE UNIT MASTER EACH ROW":
      var clone_list_show = [...state.list_show_main];
      clone_list_show[action.rowIndex].unit = action.value
      return {
        ...state,
        list_show_main: clone_list_show
      }

    case "ON CHANGE UNIT MASTER EACH ROW MODE ADD":
      var clone_list_show_mode_add = [...state.list_show_mode_add_main];
      // console.log(clone_list_show[action.rowIndex])
      clone_list_show_mode_add[action.rowIndex].unit = action.value
      return {
        ...state,
        list_show_mode_add_main: clone_list_show_mode_add
      }

    case "ON CHANGE QUILITY MASTER EACH ROW":
      var clone_list_show = [...state.list_show_main];
      clone_list_show[action.rowIndex].quility = action.value
      return {
        ...state,
        list_show_main: clone_list_show
      }

    case "ON CHANGE QUILITY MASTER EACH ROW MODE ADD":
      var clone_list_show_mode_add = [...state.list_show_mode_add_main];
      // console.log(clone_list_show[action.rowIndex])
      clone_list_show_mode_add[action.rowIndex].quility = action.value
      return {
        ...state,
        list_show_mode_add_main: clone_list_show_mode_add
      }


    case "ON CHANGE NOTE MASTER EACH ROW":
      var clone_list_show = [...state.list_show_main];
      clone_list_show[action.rowIndex].note = action.value
      return {
        ...state,
        list_show_main: clone_list_show
      }

    case "ON CHANGE NOTE MASTER EACH ROW MODE ADD":
      var clone_list_show_mode_add = [...state.list_show_mode_add_main];
      // console.log(clone_list_show[action.rowIndex])
      clone_list_show_mode_add[action.rowIndex].note = action.value
      return {
        ...state,
        list_show_mode_add_main: clone_list_show_mode_add
      }


    // case "ON CHANGE NO PART MAINTENANCE EACH ROW":
    //   var clone_list_show = [...state.list_maintenance_show];
    //   console.log(clone_list_show)
    //   console.log(action.rowIndex)
    //   clone_list_show[action.rowIndex].no_part = action.value
    //   return {
    //     ...state,
    //     list_maintenance_show: clone_list_show,
    //     list_maintenance_row_index: action.rowIndex,
    //     list_maintenance_part: action.value
    //   }
    // case "ON CLICK NO PART MAINTENANCE EACH ROW":
    //   return {
    //     ...state,
    //     list_maintenance_row_index: action.rowIndex,
    //     no_part_maintenance_show: initialState.no_part_maintenance_show,
    //     list_maintenance_part: state.list_maintenance_show[action.rowIndex].no_part
    //   }
    // case "ON CLICK SEARCH POPUP NO PART MAINTENANCE":
    //   return {
    //     ...state,
    //     no_part_maintenance_show: initialState.raw_no_part_maintenance.filter(function (raw_no_part_maintenance) {
    //       const regex = new RegExp(`${state.list_maintenance_part}`, 'i');
    //       var isMatch = regex.test(raw_no_part_maintenance.no_part);
    //       return (isMatch);
    //     }),
    //   }

    // case "ON CHANGE NO PART MAINTENANCE":
    //   return {
    //     ...state,
    //     list_maintenance_part: action.value
    //   }

    // case "ON CLICK SELECT POPUP NO PART MAINTENANCE":
    //   // console.log(state.no_part_show[action.rowIndex], "and", state.list_show_row_index)
    //   var clone_list_show = [...state.list_maintenance_show];
    //   clone_list_show[state.list_maintenance_row_index] = state.no_part_maintenance_show[action.rowIndex]
    //   return {
    //     ...state,
    //     list_maintenance_show: clone_list_show
    //   }



    // case "ON CHANGE MAINTENANCE DETAIL EACH ROW":
    //   var clone_list_show = [...state.list_maintenance_show];
    //   // console.log(clone_list_show[action.rowIndex])
    //   clone_list_show[action.rowIndex].detail = action.value
    //   return {
    //     ...state,
    //     list_maintenance_show: clone_list_show
    //   }

    // case "ON CHANGE MAINTENANCE UNIT EACH ROW":
    //   var clone_list_show = [...state.list_maintenance_show];
    //   clone_list_show[action.rowIndex].unit = action.value
    //   return {
    //     ...state,
    //     list_maintenance_show: clone_list_show
    //   }

    // case "ON CHANGE MAINTENANCE NAME EACH ROW":
    //   var clone_list_show = [...state.list_maintenance_show];
    //   clone_list_show[action.rowIndex].name = action.value
    //   return {
    //     ...state,
    //     list_maintenance_show: clone_list_show
    //   }

    // case "ON CHANGE MAINTENANCE FREQ EACH ROW":
    //   var clone_list_show = [...state.list_maintenance_show];
    //   clone_list_show[action.rowIndex].freq = action.value
    //   return {
    //     ...state,
    //     list_maintenance_show: clone_list_show
    //   }

    // case "ON CHANGE MAINTENANCE PER EACH ROW":
    //   var clone_list_show = [...state.list_maintenance_show];
    //   clone_list_show[action.rowIndex].PER = action.value
    //   return {
    //     ...state,
    //     list_maintenance_show: clone_list_show
    //   }

    // case "ON CHANGE MAINTENANCE QUILITY EACH ROW":
    //   var clone_list_show = [...state.list_maintenance_show];
    //   clone_list_show[action.rowIndex].quility = action.value
    //   return {
    //     ...state,
    //     list_maintenance_show: clone_list_show
    //   }

    // case "ON CHANGE MAINTENANCE NOTE EACH ROW":
    //   var clone_list_show = [...state.list_maintenance_show];
    //   clone_list_show[action.rowIndex].note = action.value
    //   return {
    //     ...state,
    //     list_maintenance_show: clone_list_show
    //   }


    // case "ON CHANGE NO PART EACH ROW MODE ADD":
    //   var clone_list_show_mode_add = [...state.list_show_mode_add]
    //   // console.log(clone_list_show_mode_add[action.rowIndex].no_part, action.value)
    //   clone_list_show_mode_add[action.rowIndex].no_part = action.value
    //   return {
    //     ...state,
    //     list_show_mode_add: clone_list_show_mode_add,
    //     list_no_part_mode_add: action.value,
    //     list_show_mode_add_row_index: action.rowIndex
    //   }
    // case "ON CLICK NO PART EACH ROW MODE ADD":
    //   return {
    //     ...state,
    //     list_show_mode_add_row_index: action.rowIndex,
    //     no_part_show_mode_add: initialState.no_part_show_mode_add,
    //     list_no_part_mode_add: state.list_show_mode_add[action.rowIndex].no_part
    //   }
    // case "ON CLICK SEARCH POPUP NO PART ADD MODE":
    //   return {
    //     ...state,
    //     no_part_show_mode_add: initialState.raw_no_part.filter(function (raw_no_part) {
    //       const regex = new RegExp(`${state.list_no_part_mode_add}`, 'i');
    //       var isMatch = regex.test(raw_no_part.no_part);
    //       return (isMatch);
    //     }),
    //   }
    // case "ON CHANGE NO PART MODE ADD":
    //   return {
    //     ...state,
    //     list_no_part_mode_add: action.value
    //   }
    // case "ON CLICK SELECT POPUP NO PART MODE ADD":
    //   // console.log(state.no_part_show_mode_add[action.rowIndex], "and", state.list_show_mode_add[state.list_show_mode_add_row_index])
    //   var clone_list_show_mode_add = [...state.list_show_mode_add];
    //   clone_list_show_mode_add[state.list_show_mode_add_row_index] = state.no_part_show_mode_add[action.rowIndex]
    //   return {
    //     ...state,
    //     list_show_mode_add: clone_list_show_mode_add
    //   }
    // case "ON CHANGE QUILITY EACH ROW MODE ADD":
    //   var clone_list_show_mode_add = [...state.list_show_mode_add];
    //   // console.log(clone_list_show[action.rowIndex])
    //   clone_list_show_mode_add[action.rowIndex].quility = action.value
    //   return {
    //     ...state,
    //     list_show_mode_add: clone_list_show_mode_add
    //   }
    // case "ON CHANGE DETAIL EACH ROW MODE ADD":
    //   var clone_list_show_mode_add = [...state.list_show_mode_add];
    //   // console.log(clone_list_show[action.rowIndex])
    //   clone_list_show_mode_add[action.rowIndex].detail = action.value
    //   return {
    //     ...state,
    //     list_show_mode_add: clone_list_show_mode_add
    //   }
    // case "ON CHANGE LOCATION EACH ROW MODE ADD":
    //   var clone_list_show_mode_add = [...state.list_show_mode_add];
    //   // console.log(clone_list_show[action.rowIndex])
    //   clone_list_show_mode_add[action.rowIndex].location = action.value
    //   return {
    //     ...state,
    //     list_show_mode_add: clone_list_show_mode_add
    //   }
    // case "ON CHANGE STATUS EACH ROW MODE ADD":
    //   var clone_list_show_mode_add = [...state.list_show_mode_add];
    //   // console.log(clone_list_show[action.rowIndex])
    //   clone_list_show_mode_add[action.rowIndex].status = action.value
    //   return {
    //     ...state,
    //     list_show_mode_add: clone_list_show_mode_add
    //   }
    // case "ON CHANGE VALUE EACH ROW MODE ADD":
    //   var clone_list_show_mode_add = [...state.list_show_mode_add];
    //   // console.log(clone_list_show[action.rowIndex])
    //   clone_list_show_mode_add[action.rowIndex].value = action.value
    //   return {
    //     ...state,
    //     list_show_mode_add: clone_list_show_mode_add
    //   }
    // case "ON CHANGE NOTE EACH ROW MODE ADD":
    //   var clone_list_show_mode_add = [...state.list_show_mode_add];
    //   // console.log(clone_list_show[action.rowIndex])
    //   clone_list_show_mode_add[action.rowIndex].note = action.value
    //   return {
    //     ...state,
    //     list_show_mode_add: clone_list_show_mode_add
    //   }



































    // case "ON CHANGE NO PART MAINTENANCE EACH ROW MODE ADD":
    //   var clone_list_show_mode_add = [...state.list_maintenance_show_mode_add]
    //   // console.log(clone_list_show_mode_add[action.rowIndex].no_part, action.value)
    //   clone_list_show_mode_add[action.rowIndex].no_part = action.value
    //   return {
    //     ...state,
    //     list_maintenance_show_mode_add: clone_list_show_mode_add,
    //     list_no_maintenance_mode_add: action.value,
    //     list_maintenance_show_mode_add_row_index: action.rowIndex
    //   }
    // case "ON CLICK NO PART MAINTENANCE EACH ROW MODE ADD":
    //   return {
    //     ...state,
    //     list_maintenance_show_mode_add_row_index: action.rowIndex,
    //     no_part_maintenance_show_mode_add: initialState.no_part_maintenance_show_mode_add,
    //     list_maintenance_show_mode_add: state.list_maintenance_show_mode_add[action.rowIndex].no_part
    //   }
    // case "ON CLICK SEARCH POPUP NO PART MAINTENANCE ADD MODE":
    //   return {
    //     ...state,
    //     no_part_maintenance_show_mode_add: initialState.raw_no_part_maintenance.filter(function (raw_no_part_maintenance) {
    //       const regex = new RegExp(`${state.list_no_maintenance_mode_add}`, 'i');
    //       var isMatch = regex.test(raw_no_part_maintenance.no_part);
    //       return (isMatch);
    //     }),
    //   }
    // case "ON CHANGE NO PART MAINTENANCE MODE ADD":
    //   return {
    //     ...state,
    //     list_maintenance_show_mode_add: action.value
    //   }
    // case "ON CLICK SELECT POPUP NO PART MAINTENANCE MODE ADD":
    //   // console.log(state.no_part_show_mode_add[action.rowIndex], "and", state.list_show_mode_add[state.list_show_mode_add_row_index])
    //   var clone_list_show_mode_add = [...state.list_maintenance_show_mode_add];
    //   clone_list_show_mode_add[state.list_maintenance_show_mode_add_row_index] = state.no_part_maintenance_show_mode_add[action.rowIndex]
    //   return {
    //     ...state,
    //     list_maintenance_show_mode_add: clone_list_show_mode_add
    //   }




    // case "ON CHANGE QUILITY MAINTENANCE EACH ROW MODE ADD":
    //   var clone_list_show_mode_add = [...state.list_maintenance_show_mode_add];
    //   // console.log(clone_list_show[action.rowIndex])
    //   clone_list_show_mode_add[action.rowIndex].quility = action.value
    //   return {
    //     ...state,
    //     list_maintenance_show_mode_add: clone_list_show_mode_add
    //   }

    // case "ON CHANGE DETAIL MAINTENANCE EACH ROW MODE ADD":
    //   var clone_list_show_mode_add = [...state.list_maintenance_show_mode_add];
    //   // console.log(clone_list_show[action.rowIndex])
    //   clone_list_show_mode_add[action.rowIndex].detail = action.value
    //   return {
    //     ...state,
    //     list_maintenance_show_mode_add: clone_list_show_mode_add
    //   }


    // case "ON CHANGE UNIT MAINTENANCE EACH ROW MODE ADD":
    //   var clone_list_show_mode_add = [...state.list_maintenance_show_mode_add];
    //   // console.log(clone_list_show[action.rowIndex])
    //   clone_list_show_mode_add[action.rowIndex].unit = action.value
    //   return {
    //     ...state,
    //     list_maintenance_show_mode_add: clone_list_show_mode_add
    //   }


    // case "ON CHANGE NOTE MAINTENANCE EACH ROW MODE ADD":
    //   var clone_list_show_mode_add = [...state.list_maintenance_show_mode_add];
    //   // console.log(clone_list_show[action.rowIndex])
    //   clone_list_show_mode_add[action.rowIndex].note = action.value
    //   return {
    //     ...state,
    //     list_maintenance_show_mode_add: clone_list_show_mode_add
    //   }


    // case "ON CHANGE NAME MAINTENANCE EACH ROW MODE ADD":
    //   var clone_list_show_mode_add = [...state.list_maintenance_show_mode_add];
    //   // console.log(clone_list_show[action.rowIndex])
    //   clone_list_show_mode_add[action.rowIndex].name = action.value
    //   return {
    //     ...state,
    //     list_maintenance_show_mode_add: clone_list_show_mode_add
    //   }

    // case "ON CHANGE FREQ MAINTENANCE EACH ROW MODE ADD":
    //   var clone_list_show_mode_add = [...state.list_maintenance_show_mode_add];
    //   // console.log(clone_list_show[action.rowIndex])
    //   clone_list_show_mode_add[action.rowIndex].freq = action.value
    //   return {
    //     ...state,
    //     list_maintenance_show_mode_add: clone_list_show_mode_add
    //   }

    // case "ON CHANGE PER MAINTENANCE EACH ROW MODE ADD":
    //   var clone_list_show_mode_add = [...state.list_maintenance_show_mode_add];
    //   // console.log(clone_list_show[action.rowIndex])
    //   clone_list_show_mode_add[action.rowIndex].per = action.value
    //   return {
    //     ...state,
    //     list_maintenance_show_mode_add: clone_list_show_mode_add
    //   }





















    // Mode Add
    case "ON CHANGE DOCUMENT MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.no_document = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "ON CHANGE DETAIL MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.detail = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "ON CHANGE TYPE ITEM MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.type_item = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "ON CHANGE GROUP ASSET MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.group_asset = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }
    case "ON CHANGE TYPE ACCOUNT MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.type_account = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "ON CHANGE IMPORT NAME MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.import_name = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "ON CHANGE IMPORT QUANTITY MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.import_quantity = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "ON CHANGE DEPRECIATION PER YEAR MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.depreciation_per_year = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "ON CHANGE DEPRECIATION TYPE MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.depreciation_type = action.value;
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

    case "ON CHANGE NOTE MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.note = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "ON CHANGE SHORT NAME UNIT MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.short_name_unit = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "ON CHANGE NAME UNIT MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.name_unit = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "ON CHANGE TYPE UNIT MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.type_unit = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "ON CHANGE VALUATION METHOD MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.valuation_method = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "ON CHANGE GROUP MAINTENANCE MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.group_maintenance = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "ON CHANGE TYPE MAINTENANCE MODE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.type_maintenance = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    default:
      return state
  }
}