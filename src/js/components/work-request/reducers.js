const initialState = {

  // ค่าคงที่ต่างๆใน DropDawn

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


  // ค่าคงที่ต่างๆ ของแต่ละคลัง
  wordrequest: [
    {
      "id": 1,
      "no_word_request": "WR-0004",
      "create_date_time": "2020-04-14",
      "create_name": "นายศิวกร แสงสว่าง",
      "job_name": "รถไฟชน",
      "station": "ตอนบางซื่อ",

      "information_name": "นายศิวกร แสงสว่าง",
      "date_start": "2020-04-14",
      "time_start": "04:00",
      "date_end": "2020-04-14",
      "time_end": "04:00",
      "district": "แขวงนครสวรรค์",
      "zone": "ตอนลาดยาว",

    },
    {
      "id": 2,
      "no_word_request": "WR-0003",
      "create_date_time": "2020-04-14",
      "create_name": "นายศิวกร แสงสว่าง",
      "job_name": "รถยนต์ขับชนไม้กั้น",
      "station": "ตอนบางซื่อ",

      "information_name": "นายศิวกร แสงสว่าง",
      "date_start": "2020-04-14",
      "time_start": "04:00",
      "date_end": "2020-04-14",
      "time_end": "04:00",
      "district": "แขวงนครสวรรค์",
      "zone": "ตอนลาดยาว",
    }
  ],

  // Mode การทำงาน
  action: "search",

  // Mode Search
  no_word_request: "",
  districts: "",
  zones: "",
  date_starts: "",
  date_ends: "",

  word_request_show_popup: [],
  word_request_show: [],

  // Mode Add
  no_word_request_add: "",
  create_date_time_add: "",
  create_name_add: "",
  information_name_add: "",
  date_start_add: "",
  time_start_add: "",
  date_end_add: "",
  time_end_add: "",
  district_add: "",
  zone_add: "",
  station_add: "",
  job_name_add: "",

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
    case "ON CHANGE NO WORKREQUEST":
      return {
        ...state,
        no_word_request: action.value
      }



    case "ON CHANGE DISTRICTS WORKREQUEST":
      return {
        ...state,
        districts: action.value
      }

    case "ON CHANGE ZONES WORKREQUEST":
      return {
        ...state,
        zones: action.value
      }


    case "ON CHANGE DATE STRARTS WORKREQUEST":
      return {
        ...state,
        date_starts: action.value
      }

    case "ON CHANGE DATE ENDS WORKREQUEST":
      return {
        ...state,
        date_ends: action.value
      }

    case "CLICK POPUP NO WORKREQUEST":
      return {
        ...state,
        no_word_request: state.no_word_request
      }
    case "CLICK SEARCH POPUP NO WORKREQUEST":
      return {
        ...state,
        // word_request_show_popup: initialState.wordrequest.filter(function (wordrequest) {
        //   const regex = new RegExp(`${state.no_word_request}`, 'i');
        //   var isMatch = regex.test(wordrequest.no_word_request);
        //   return (isMatch);
        // }

        word_request_show_popup: initialState.wordrequest.filter(item =>{
          const query = state.no_word_request.toLowerCase();
          const query2 = state.date_starts.toLowerCase();
          const query3 = state.date_ends.toLowerCase();
          const query4 = state.zones.toLowerCase();
          const query5 = state.districts.toLowerCase();
          return(
            (item.no_word_request.toLowerCase().indexOf(query) >= 0 || !query )&&
            (item.zone.toLowerCase().indexOf(query4) >= 0 || !query4 ) &&
            (item.district.toLowerCase().indexOf(query5) >= 0 || !query5 ) &&
            (item.date_end.toLowerCase().indexOf(query3) >= 0 || !query3 ) &&
            (item.date_start.toLowerCase().indexOf(query2) >= 0 || !query2 ) 
          )

          }
        ),
      }

    case "CLICK SELECT POPUP NO WORKREQUEST":

      return {
        ...state,
        no_word_request: state.word_request_show_popup[action.row_word_request_show_popup].no_word_request,
        word_request_show: state.word_request_show_popup[action.row_word_request_show_popup]
      }


    // Mode Edit
    case "ON CHANGE CREATE DATETIME":
      var clone_word_request_show = { ...state.word_request_show };
      clone_word_request_show.create_date_time = action.value;
      return {
        ...state,
        word_request_show: clone_word_request_show
      }

    case "ON CHANGE CREATE NAME":
      var clone_word_request_show = { ...state.word_request_show };
      clone_word_request_show.create_name = action.value;
      return {
        ...state,
        word_request_show: clone_word_request_show
      }

    case "ON CHANGE INFORMATION NAME":
      var clone_word_request_show = { ...state.word_request_show };
      clone_word_request_show.information_name = action.value;
      return {
        ...state,
        word_request_show: clone_word_request_show
      }

    case "ON CHANGE DATE START":
      var clone_word_request_show = { ...state.word_request_show };
      clone_word_request_show.date_start = action.value;
      return {
        ...state,
        word_request_show: clone_word_request_show
      }

    case "ON CHANGE TIME START":
      var clone_word_request_show = { ...state.word_request_show };
      clone_word_request_show.time_start = action.value;
      return {
        ...state,
        word_request_show: clone_word_request_show
      }

    case "ON CHANGE DATE END":
      var clone_word_request_show = { ...state.word_request_show };
      clone_word_request_show.date_end = action.value;
      return {
        ...state,
        word_request_show: clone_word_request_show
      }

    case "ON CHANGE TIME END":
      var clone_word_request_show = { ...state.word_request_show };
      clone_word_request_show.time_end = action.value;
      return {
        ...state,
        word_request_show: clone_word_request_show
      }

    case "ON CHANGE DISTRICT":
      var clone_word_request_show = { ...state.word_request_show };
      clone_word_request_show.district = action.value;
      return {
        ...state,
        word_request_show: clone_word_request_show
      }

    case "ON CHANGE ZONE":
      var clone_word_request_show = { ...state.word_request_show };
      clone_word_request_show.zone = action.value;
      return {
        ...state,
        word_request_show: clone_word_request_show
      }

    case "ON CHANGE STATION":
      var clone_word_request_show = { ...state.word_request_show };
      clone_word_request_show.station = action.value;
      return {
        ...state,
        word_request_show: clone_word_request_show
      }

    case "ON CHANGE JOB NAME":
      var clone_word_request_show = { ...state.word_request_show };
      clone_word_request_show.job_name = action.value;
      return {
        ...state,
        word_request_show: clone_word_request_show
      }


    // Mode Add
    case "ON CHANGE NO WORDREQUEST ADD":
      return {
        ...state,
        no_word_request_add: action.value
      }
    case "ON CHANGE CREATE DATETIME ADD":
      return {
        ...state,
        create_date_time_add: action.value
      }
    case "ON CHANGE CREATE NAME ADD":
      return {
        ...state,
        create_name_add: action.value
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