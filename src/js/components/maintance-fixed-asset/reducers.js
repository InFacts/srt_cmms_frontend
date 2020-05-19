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
      "no_document_ref": "",
      "name": "",
      "number1": "",
      "number2": "",
      "detail": "",

      "group_asset": "",
      "type_asset": "",
      "unit_asset": "",
      "freq_asset": "",
      "per_asset": "",
      "status_asset1": "",
      "status_asset2": "",

      "name1": "a",
      "job1": "",
      "name2": "",
      "job2": "",
      "name3": "",
      "job3": "",
      "name4": "",
      "job4": "",
      "name5": "",
      "job5": "",
      "name6": "",
      "job6": "",

      "list": [
        {
          "id": 1,
          "no_part": "001",
          "detail": "",
          "unit": "",
          "quility": 10,
          "note": "",
        },


      ]
    }
  ],

  raw_no_part: [
    {
      "id": 1,
      "no_part": "001",
      "detail": "",
      "unit": "",
      "quility": 10,
      "note": "",
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

  station: [
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

  list_per: [
    {
      id: 1,
      status: "เดือน"
    },
  ],

  list_status_asset1: [
    {
      id: 1,
      status: "ใช้งานอยู่"
    },
  ],

  list_status_asset2: [
    {
      id: 1,
      status: "ใช้งานอยู่"
    },
  ],

  list_unit: [
    {
      id: 1,
      status: "หน่วย"
    },
  ],

  list_job: [
    {
      id: 1,
      status: "หน่วย"
    },
  ],



  // Mode การทำงาน
  action: "search",
  fill_data: false,
  tool_mode: true,

  // Mode Search
  no_document: "",
  districts: "",
  zones: "",
  date_starts: "",
  date_ends: "",

  document_show_popup: [],
  document_show: [],
  list_show: [],


  // Mode Edit
  list_no_part: "",
  list_show_row_index: "", //ไว้บอกตำแหน่งว่ากด แก้ไข อะไหล่จาก row ไหนใน table
  no_part_show: [],



  // Mode Add
  list_no_part_mode_add: "",


  document_show_mode_add: {
    "id": "",

    "district": "",
    "zone": "",
    "create_name": "",
    "station": "",

    "no_document": "",
    "no_document_ref": "",
    "name": "",
    "number1": "",
    "number2": "",
    "detail": "",

    "group_asset": "",
    "type_asset": "",
    "unit_asset": "",
    "freq_asset": "",
    "per_asset": "",
    "status_asset1": "",
    "status_asset2": "",

    "name1": "",
    "job1": "",
    "name2": "",
    "job2": "",
    "name3": "",
    "job3": "",
    "name4": "",
    "job4": "",
    "name5": "",
    "job5": "",
    "name6": "",
    "job6": "",


    "list": [],

  },

  list_show_mode_add: [
    {
      "id": "",
      "no_part": "",
      "detail": "",
      "unit": "",
      "quility": "",
      "note": "",
    },
  ],
  list_show_mode_add_row_index: "",
  no_part_show_mode_add: [],







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
        fill_data: true,
      }


    case "CHANGE NO DOCUMENT REF":
      var clone_document_show = { ...state.document_show };
      clone_document_show.no_document_ref = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }

    case "CHANGE NAME":
      var clone_document_show = { ...state.document_show };
      clone_document_show.name = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }

    case "CHANGE NUMBER1":
      var clone_document_show = { ...state.document_show };
      clone_document_show.number1 = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }

    case "CHANGE NUMBER2":
      var clone_document_show = { ...state.document_show };
      clone_document_show.number2 = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }

    case "CHANGE DETAIL":
      var clone_document_show = { ...state.document_show };
      clone_document_show.detail = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }

    case "CHANGE DISTRICT":
      var clone_document_show = { ...state.document_show };
      clone_document_show.district = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }

    case "CHANGE ZONE":
      var clone_document_show = { ...state.document_show };
      clone_document_show.zone = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }

    case "CHANGE STATION":
      var clone_document_show = { ...state.document_show };
      clone_document_show.station = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }


    case "CHANGE NO DOCUMENT ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.no_document = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "CHANGE NO DOCUMENT REF ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.no_document_ref = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "CHANGE STATION ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.station = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "CHANGE ZONE ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.zone = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "CHANGE DISTRICT ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.district = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "CHANGE DETAIL ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.detail = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "CHANGE NUMBER2 ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.number2 = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "CHANGE NUMBER1 ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.number1 = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "CHANGE NAME ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.name = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "CHANGE JOB1":
      var clone_document_show = { ...state.document_show };
      clone_document_show.job1 = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "CHANGE JOB1 ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.job1 = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }
    case "CHANGE JOB2":
      var clone_document_show = { ...state.document_show };
      clone_document_show.job2 = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "CHANGE JOB2 ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.job2 = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }
    case "CHANGE JOB3":
      var clone_document_show = { ...state.document_show };
      clone_document_show.job3 = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "CHANGE JOB3 ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.job3 = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }
    case "CHANGE JOB4":
      var clone_document_show = { ...state.document_show };
      clone_document_show.job4 = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "CHANGE JOB4 ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.job4 = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }
    case "CHANGE JOB5":
      var clone_document_show = { ...state.document_show };
      clone_document_show.job5 = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "CHANGE JOB5 ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.job5 = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }
    case "CHANGE JOB6":
      var clone_document_show = { ...state.document_show };
      clone_document_show.job6 = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "CHANGE JOB6 ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.job6 = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }
    case "CHANGE NAME1":
      var clone_document_show = { ...state.document_show };
      clone_document_show.name1 = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "CHANGE NAME1 ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.name1 = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }
    case "CHANGE NAME2":
      var clone_document_show = { ...state.document_show };
      clone_document_show.name2 = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "CHANGE NAME2 ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.name2 = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }
    case "CHANGE NAME3":
      var clone_document_show = { ...state.document_show };
      clone_document_show.name3 = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "CHANGE NAME3 ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.name3 = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }
    case "CHANGE NAME4":
      var clone_document_show = { ...state.document_show };
      clone_document_show.name4 = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "CHANGE NAME4 ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.name4 = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }
    case "CHANGE NAME5":
      var clone_document_show = { ...state.document_show };
      clone_document_show.name5 = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "CHANGE NAME5 ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.name5 = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }
    case "CHANGE NAME6":
      var clone_document_show = { ...state.document_show };
      clone_document_show.name6 = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "CHANGE NAME6 ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.name6 = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }


    case "CHANGE STATUS ASSET2":
      var clone_document_show = { ...state.document_show };
      clone_document_show.status_asset2 = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "CHANGE STATUS ASSET2 ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.status_asset2 = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "CHANGE STATUS ASSET1":
      var clone_document_show = { ...state.document_show };
      clone_document_show.status_asset1 = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "CHANGE STATUS ASSET1 ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.status_asset1 = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "CHANGE PER ASSET":
      var clone_document_show = { ...state.document_show };
      clone_document_show.per_asset = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "CHANGE PER ASSET ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.per_asset = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "CHANGE GROUP ASSET":
      var clone_document_show = { ...state.document_show };
      clone_document_show.group_asset = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "CHANGE GROUP ASSET ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.group_asset = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }


    case "CHANGE TYPE ASSET":
      var clone_document_show = { ...state.document_show };
      clone_document_show.type_asset = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "CHANGE TYPE ASSET ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.type_asset = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "CHANGE UNIT ASSET":
      var clone_document_show = { ...state.document_show };
      clone_document_show.unit_asset = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "CHANGE UNIT ASSET ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.unit_asset = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    case "CHANGE FREQ ASSET":
      var clone_document_show = { ...state.document_show };
      clone_document_show.freq_asset = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "CHANGE FREQ ASSET ADD":
      var clone_document_show_mode_add = { ...state.document_show_mode_add };
      clone_document_show_mode_add.freq_asset = action.value;
      return {
        ...state,
        document_show_mode_add: clone_document_show_mode_add
      }

    ////Table/////



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

    case "ON CHANGE UNIT EACH ROW":
      var clone_list_show = [...state.list_show];
      clone_list_show[action.rowIndex].unit = action.value
      return {
        ...state,
        list_show: clone_list_show
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

    case "ON CHANGE UNIT EACH ROW MODE ADD":
      var clone_list_show_mode_add = [...state.list_show_mode_add];
      // console.log(clone_list_show[action.rowIndex])
      clone_list_show_mode_add[action.rowIndex].unit = action.value
      return {
        ...state,
        list_show_mode_add: clone_list_show_mode_add
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

        case "ON CLICK SELECT POPUP NO PART MODE ADD":
          console.log(state.no_part_show_mode_add[action.rowIndex], "and", state.list_show_mode_add[state.list_show_mode_add_row_index])
    
          var clone_list_show_mode_add = [...state.list_show_mode_add];
          clone_list_show_mode_add[state.list_show_mode_add_row_index] = state.no_part_show_mode_add[action.rowIndex]
    
          return {
            ...state,
            list_show_mode_add: clone_list_show_mode_add
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
    
        // case "ON CLICK SELECT POPUP NO PART MODE ADD":
        //   console.log(state.no_part_show_mode_add[action.rowIndex], "and", state.list_show_mode_add[state.list_show_mode_add_row_index])
    
        //   var clone_list_show_mode_add = [...state.list_show_mode_add];
        //   clone_list_show_mode_add[state.list_show_mode_add_row_index] = state.no_part_show_mode_add[action.rowIndex]
    
        //   return {
        //     ...state,
        //     list_show_mode_add: clone_list_show_mode_add
        //   }

    default:
      return state
  }
}