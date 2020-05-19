const initialState = {

  // ค่าคงที่ต่างๆใน DropDawn
  type:[
    {
      "id": 1,
      "name": "โทรศัพท์"
    },
    {
      "id": 2,
      "name": "จดหมาย"
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

  status: [
    {
      "id": 1,
      "name": "เสียหาย"
    },
    {
      "id": 2,
      "name": "ของเก่า"
    },

  ],

  wordorder_incident: [
    {
      "id": 1,
      "no_word_order_incident": "1",

      "no_word_order": "WR-0004",
      "district": "แขวงนครสวรรค์",
      "zone": "",
      "date_start": "2020-04-14",
      "time_start": "04:00",
      "date_end": "2020-04-14",
      "time_end": "04:00",
      

      "job_name": "รถไฟชน",
      "create_name": "นายศิวกร แสงสว่าง",
      "create_date_time": "2020-04-14",
      "station": "ตอนบางซื่อ",
    },
    {
      "id": 2,
      "no_word_order_incident": "2",

      "no_word_order": "WR-0003",
      "district": "แขวงนครสวรรค์",
      "zone": "",
      "date_start": "2020-04-14",
      "time_start": "04:00",
      "date_end": "2020-04-14",
      "time_end": "04:00",


      "job_name": "รถไฟชน",
      "create_name": "นายศิวกร แสงสว่าง",
      "create_date_time": "2020-04-14",
      "station": "ตอนบางซื่อ",

    },
  ],


  // ค่าคงที่ต่างๆ ของแต่ละคลัง
  wordorder: [
    {
      "id": 1,
      "no_word_order": "WR-0004",
      "district": "แขวงนครสวรรค์",
      "zone": "",
      "date_start": "2020-04-14",
      "time_start": "04:00",
      "date_end": "2020-04-14",
      "time_end": "04:00",
      "type":"โทรศัพท์",
      "job_name": "รถไฟชน",
      "create_name": "นายศิวกร แสงสว่าง",
      "create_date_time": "2020-04-14",
      "station": "ตอนบางซื่อ",

      "no_word_order_incident": "1",
      "information_name": "",
      "conclusions": "",
      "reason": "",
      "report": "",
      "equipment": "",
      "note": "",
      "list": [
        {
          "id": 1,
          "no_part": "001",
          "quility": "10",
          "location": "คลัง",
          "status": "เสียหาย",
          "note": "",
        },
      ],

    },
    {
      "id": 2,
      "no_word_order": "WR-0003",
      "district": "แขวงนครสวรรค์",
      "zone": "",
      "date_start": "2020-04-14",
      "time_start": "04:00",
      "date_end": "2020-04-14",
      "time_end": "04:00",
      "type":"โทรศัพท์",
      "job_name": "รถยนต์ขับชนไม้กั้น",
      "create_name": "นายศิวกร แสงสว่าง",
      "create_date_time": "2020-04-14",
      "station": "ตอนบางซื่อ",

      "no_word_order_incident": "2",
      "information_name": "",
      "conclusions": "",
      "reason": "",
      "report": "",
      "equipment": "",
      "note": "",
      "list": [
        {
          "id": 1,
          "no_part": "001",
          "quility": "10",
          "location": "คลัง",
          "status": "เสียหาย",
          "note": "",

        },
      ],

    }
  ],

  // Mode การทำงาน
  action: "search",
  fill_data: false,
  tool_mode: true,

  // Mode Search
  no_word_order: "",
  districts: "",
  zones: "",
  date_starts: "",
  date_ends: "",




  word_order_show_popup: [],
  word_order_show: [],


  no_word_order_incident: "",
  word_order_incident_show_popup: [],
  word_order_incident_show: [],

  list_show: [],

  // Mode Add
  no_word_order_add: "",
  create_date_time_add: "",
  create_name_add: "",

  date_start_add: "",
  time_start_add: "",
  date_end_add: "",
  time_end_add: "",
  district_add: "",
  zone_add: "",
  station_add: "",
  job_name_add: "",
  information_name_add: "",
  conclusions_add: "",
  reason_add: "",
  report_add: "",
  equipment_add: "",
  note_add: "",
  list_add: "",

  type_add:"",

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
    case "ON CHANGE NO WORKORDER":
      return {
        ...state,
        no_word_order: action.value
      }

    case "ON CHANGE DISTRICTS WORKORDER":
      return {
        ...state,
        districts: action.value
      }

    case "ON CHANGE ZONES WORKORDER":
      return {
        ...state,
        zones: action.value
      }


    case "ON CHANGE DATE STRARTS WORKORDER":
      return {
        ...state,
        date_starts: action.value
      }

    case "ON CHANGE DATE ENDS WORKORDER":
      return {
        ...state,
        date_ends: action.value
      }

    case "CLICK POPUP NO WORKORDER":
      return {
        ...state,
        no_word_order: state.no_word_order
      }
    case "CLICK SEARCH POPUP NO WORKORDER":
      // const no_word_requestRegex  = new RegExp(`${state.no_word_order}`, "gi");
      // const date_endsRegex  = new RegExp(`${state.date_ends}`, "gi");
      // const date_startsRegex  = new RegExp(`${state.date_starts}`, "gi");
      // const zonesRegex  = new RegExp(`${state.zones}`, "gi");
      // const districtsRegex  = new RegExp(`${state.districts}`, "gi");
      return {
        ...state,
      
        // word_order_show_popup: initialState.wordorder.filter(function (wordorder) {
        //   var isMatch =  (!no_word_requestRegex ||no_word_requestRegex.test(wordorder.no_word_request)) &&
        //   (!date_endsRegex ||date_endsRegex.test(wordorder.date_end)) &&
        //   (!date_startsRegex ||date_startsRegex.test(wordorder.date_start)) &&
        //   (!zonesRegex ||zonesRegex.test(wordorder.zone)) &&
        //   (!districtsRegex ||districtsRegex.test(wordorder.district)) 
        //   return (isMatch);
        // }

        word_order_show_popup: initialState.wordorder.filter(item =>{
          const query = state.no_word_order.toLowerCase();
          const query2 = state.date_starts.toLowerCase();
          const query3 = state.date_ends.toLowerCase();
          const query4 = state.zones.toLowerCase();
          const query5 = state.districts.toLowerCase();
          return(
            (item.no_word_order.toLowerCase().indexOf(query) >= 0 || !query )&&
            (item.zone.toLowerCase().indexOf(query4) >= 0 || !query4 ) &&
            (item.district.toLowerCase().indexOf(query5) >= 0 || !query5 ) &&
            (item.date_end.toLowerCase().indexOf(query3) >= 0 || !query3 ) &&
            (item.date_start.toLowerCase().indexOf(query2) >= 0 || !query2 ) 
          )

          }
        
        ),
      }
    case "CLICK SELECT POPUP NO WORKORDER":

      return {
        ...state,
        no_word_order: state.word_order_show_popup[action.row_word_order_show_popup].no_word_order,
        word_order_show: state.word_order_show_popup[action.row_word_order_show_popup],
        list_show: state.word_order_show_popup[action.row_word_order_show_popup].list,
        fill_data: true,
      }


    case "ON CHANGE NO WORKORDERINCIDENT":
      return {
        ...state,
        no_word_order_incident: action.value
      }
    case "CLICK POPUP NO WORKORDERINCIDENT":
      return {
        ...state,
        no_word_order_incident: state.no_word_order_incident
      }
    case "CLICK SEARCH POPUP NO WORKORDERINCIDENT":
      // const no_word_requestRegexw  = new RegExp(`${state.no_word_order_incident}`, "gi");
      // const date_endsRegexw  = new RegExp(`${state.date_ends}`, "gi");
      // const date_startsRegexw  = new RegExp(`${state.date_starts}`, "gi");
      // const zonesRegexw  = new RegExp(`${state.zones}`, "gi");
      // const districtsRegexw  = new RegExp(`${state.districts}`, "gi");


      return {
        ...state,
        // word_order_incident_show_popup: initialState.wordorder_incident.filter(function (wordorder_incident) {
        //   const regex = new RegExp(`${state.no_word_order_incident}`, 'i');
        //   var isMatch = regex.test(wordorder_incident.no_word_order_incident);
        //   return (isMatch);
        // }

        word_order_incident_show_popup: initialState.wordorder_incident.filter(item =>{
          const query = state.no_word_order_incident.toLowerCase();
          const query2 = state.date_starts.toLowerCase();
          const query3 = state.date_ends.toLowerCase();
          const query4 = state.zones.toLowerCase();
          const query5 = state.districts.toLowerCase();
          return(
            (item.no_word_order_incident.toLowerCase().indexOf(query) >= 0 || !query )&&
            (item.zone.toLowerCase().indexOf(query4) >= 0 || !query4 ) &&
            (item.district.toLowerCase().indexOf(query5) >= 0 || !query5 ) &&
            (item.date_end.toLowerCase().indexOf(query3) >= 0 || !query3 ) &&
            (item.date_start.toLowerCase().indexOf(query2) >= 0 || !query2 ) 
          )

          }

        // word_order_incident_show_popup: initialState.wordorder_incident.filter(function (wordorder_incident) {
        //   var isMatch =  (!no_word_requestRegexw ||no_word_requestRegexw.test(wordorder_incident.no_word_order_incident)) &&
        //   (!date_endsRegexw ||date_endsRegexw.test(wordorder_incident.date_end)) &&
        //   (!date_startsRegexw ||date_startsRegexw.test(wordorder_incident.date_start)) &&
        //   (!zonesRegexw ||zonesRegexw.test(wordorder_incident.zone)) &&
        //   (!districtsRegexw ||districtsRegexw.test(wordorder_incident.district)) 
        //   return (isMatch);
        // }
        
        ),
      }
    case "CLICK SELECT POPUP NO WORKORDERINCIDENT":

      return {
        ...state,
        no_word_order_incident: state.word_order_incident_show_popup[action.row_word_order_incident_show_popup].no_word_order_incident,
        word_order_incident_show: state.word_order_incident_show_popup[action.row_word_order_incident_show_popup]

      }


    // Mode Edit
    case "ON CHANGE CREATE DATETIME":
      var clone_word_order_show = { ...state.word_order_show };
      clone_word_order_show.create_date_time = action.value;
      return {
        ...state,
        word_order_show: clone_word_order_show
      }

    case "ON CHANGE CREATE NAME":
      var clone_word_order_show = { ...state.word_order_show };
      clone_word_order_show.create_name = action.value;
      return {
        ...state,
        word_order_show: clone_word_order_show
      }

    case "ON CHANGE INFORMATION NAME":
      var clone_word_order_show = { ...state.word_order_show };
      clone_word_order_show.information_name = action.value;
      return {
        ...state,
        word_order_show: clone_word_order_show
      }

    case "ON CHANGE DATE START":
      var clone_word_order_show = { ...state.word_order_show };
      clone_word_order_show.date_start = action.value;
      return {
        ...state,
        word_order_show: clone_word_order_show
      }

    case "ON CHANGE TIME START":
      var clone_word_order_show = { ...state.word_order_show };
      clone_word_order_show.time_start = action.value;
      return {
        ...state,
        word_order_show: clone_word_order_show
      }

    case "ON CHANGE DATE END":
      var clone_word_order_show = { ...state.word_order_show };
      clone_word_order_show.date_end = action.value;
      return {
        ...state,
        word_order_show: clone_word_order_show
      }

    case "ON CHANGE TIME END":
      var clone_word_order_show = { ...state.word_order_show };
      clone_word_order_show.time_end = action.value;
      return {
        ...state,
        word_order_show: clone_word_order_show
      }

    case "ON CHANGE DISTRICT":
      var clone_word_order_show = { ...state.word_order_show };
      clone_word_order_show.district = action.value;
      return {
        ...state,
        word_order_show: clone_word_order_show
      }

    case "ON CHANGE ZONE":
      var clone_word_order_show = { ...state.word_order_show };
      clone_word_order_show.zone = action.value;
      return {
        ...state,
        word_order_show: clone_word_order_show
      }

    case "ON CHANGE STATION":
      var clone_word_order_show = { ...state.word_order_show };
      clone_word_order_show.station = action.value;
      return {
        ...state,
        word_order_show: clone_word_order_show
      }

    case "ON CHANGE JOB NAME":
      var clone_word_order_show = { ...state.word_order_show };
      clone_word_order_show.job_name = action.value;
      return {
        ...state,
        word_order_show: clone_word_order_show
      }



    // case "ON CHANGE LIST":
    //   var clone_word_order_show = { ...state.word_order_show };
    //   clone_word_order_show.list = action.value;
    //   return {
    //     ...state,
    //     word_order_show: clone_word_order_show
    //   }

    case "ON CHANGE NOTE":
      var clone_word_order_show = { ...state.word_order_show };
      clone_word_order_show.note = action.value;
      return {
        ...state,
        word_order_show: clone_word_order_show
      }

    case "ON CHANGE EQUIPMENT":
      var clone_word_order_show = { ...state.word_order_show };
      clone_word_order_show.equipment = action.value;
      return {
        ...state,
        word_order_show: clone_word_order_show
      }

    case "ON CHANGE INFORMATION NAME":
      var clone_word_order_show = { ...state.word_order_show };
      clone_word_order_show.information_name = action.value;
      return {
        ...state,
        word_order_show: clone_word_order_show
      }


    case "ON CHANGE CONCLUSIONS":
      var clone_word_order_show = { ...state.word_order_show };
      clone_word_order_show.conclusions = action.value;
      return {
        ...state,
        word_order_show: clone_word_order_show
      }

    case "ON CHANGE REASON":
      var clone_word_order_show = { ...state.word_order_show };
      clone_word_order_show.reason = action.value;
      return {
        ...state,
        word_order_show: clone_word_order_show
      }

    case "ON CHANGE REPORT":
      var clone_word_order_show = { ...state.word_order_show };
      clone_word_order_show.report = action.value;
      return {
        ...state,
        word_order_show: clone_word_order_show
      }

    // Mode Add
    case "ON CHANGE NO WORDREORDER ADD":
      return {
        ...state,
        no_word_order_add: action.value
      }
    case "ON CHANGE CREATE DATETIME ADD":
      return {
        ...state,
        create_date_time_add: action.value
      }


    case "ON CHANGE INFORMATION NAME ADD":
      return {
        ...state,
        information_name_add: action.value
      }

    case "ON CHANGE DATE START ADD":
      return {
        ...state,
        date_start_add: action.value
      }

    case "ON CHANGE TIME START ADD":
      return {
        ...state,
        time_start_add: action.value
      }

    case "ON CHANGE DATE END ADD":
      return {
        ...state,
        date_end_add: action.value
      }

    case "ON CHANGE TIME END ADD":
      return {
        ...state,
        time_end_add: action.value
      }

    case "ON CHANGE CREATE NAME ADD":
      return {
        ...state,
        create_name_add: action.value
      }

    case "ON CHANGE STATION ADD":
      return {
        ...state,
        station_add: action.value
      }
    case "ON CHANGE ADDRESS ADD":
      return {
        ...state,
        address_add: action.value
      }
    case "ON CHANGE DISTRICT ADD":
      return {
        ...state,
        district_add: action.value
      }
    case "ON CHANGE JOB NAME ADD":
      return {
        ...state,
        job_name_add: action.value
      }

    case "ON CHANGE CONCLUSIONS ADD":
      return {
        ...state,
        conclusions_add: action.value
      }

    case "ON CHANGE REASON ADD":
      return {
        ...state,
        reason_add: action.value
      }

    case "ON CHANGE REPORT ADD":
      return {
        ...state,
        report_add: action.value
      }

    case "ON CHANGE EQUIPMENT ADD":
      return {
        ...state,
        equipment_add: action.value
      }

    case "ON CHANGE NOTE ADD":
      return {
        ...state,
        note_add: action.value
      }

      case "ON CHANGE TYPE ADD":
        return {
          ...state,
          type_add: action.value
        }


        case "ON CHANGE TYPE ":
          var clone_word_order_show = { ...state.word_order_show };
          clone_word_order_show.type = action.value;
          return {
            ...state,
            word_order_show: clone_word_order_show
          }


    // case "ON CHANGE LIST ADD":
    //   return {
    //     ...state,
    //     list_add: action.value
    //   }

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