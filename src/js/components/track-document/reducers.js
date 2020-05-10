const initialState = {


  find_document_list: [
    {
      "id": 1,
      "type": "เอกสารของฉัน"
    },
    {
      "id": 2,
      "type": "เอกสารทั้งหมด"
    },
  ],

  type_document_list: [
    {
      "id": 1,
      "type": "Work Order"
    },
    {
      "id": 2,
      "type": "สส. 101"
    },
  ],

  status_document_list: [
    {
      "id": 1,
      "status": "เสร็จสมบูรณ์"
    },
    {
      "id": 2,
      "status": "รอการอนุมัติ"
    },
  ],

  station_list: [
    {
      "id": 1,
      "name": "คลังบางซื่อ"
    },
    {
      "id": 2,
      "name": "คลังลาดกระบัง"
    },
    {
      "id": 3,
      "name": "คลังหัวตะเข้"
    }
  ],
  // แขวง
  district_list: [
    {
      "id": 1,
      "name": "ลาดยาว"
    },
    {
      "id": 2,
      "name": "จตุจักร"
    },
    {
      "id": 3,
      "name": "ดอนเมือง"
    }
  ],
  // เขต
  zone_list: [
    {
      "id": 1,
      "name": "ลาดยาว"
    },
    {
      "id": 2,
      "name": "จตุจักร"
    },
    {
      "id": 3,
      "name": "ดอนเมือง"
    }
  ],

  // ค่าคงที่ต่างๆ ของแต่ละคลัง
  track_document: [
    {
      "id": 1,
      "find_document": "เอกสารของฉัน",
      "no_track_document": "WO-0004",
      "type_document": "Work Order",
      "job_document": "รถไฟชนกัน",
      "create_name": "นายศิวกร แสงสว่าง",
      "status_document": "เสร็จสมบูรณ์",
      "district": "ลาดยาว",
      "zone": "ลาดยาว",
      "station": "คลังบางซื่อ",
      "date_start": "2020-05-09",
      "time_start": "2020-05-09",
      "date_end": "2020-05-09",
      "time_start": "2020-05-09",
    },
    {
      "id": 2,
      "find_document": "เอกสารของฉัน",
      "no_track_document": "WO-0003",
      "type_document": "สส. 101",
      "job_document": "รถยนต์ขับชนไม้กั้น",
      "create_name": "นายศิวกร แสงสว่าง",
      "status_document": "รอการอนุมัติ",
      "district": "ลาดยาว",
      "zone": "ลาดยาว",
      "station": "คลังบางซื่อ",
      "date_start": "2020-05-09",
      "time_start": "2020-05-09",
      "date_end": "2020-05-09",
      "time_start": "2020-05-09",
    },{
      "id": 3,
      "find_document": "เอกสารของฉัน",
      "no_track_document": "WO-00045",
      "type_document": "Work Order",
      "job_document": "รถไฟชนกัน",
      "create_name": "นายศิวกร แสงสว่าง",
      "status_document": "เสร็จสมบูรณ์",
      "district": "ลาดยาว",
      "zone": "ลาดยาว",
      "station": "คลังบางซื่อ",
      "date_start": "2020-05-09",
      "time_start": "2020-05-09",
      "date_end": "2020-05-09",
      "time_start": "2020-05-09",
    },
  ],

  // Mode การทำงาน
  action: "search",





  // Mode Search
  no_track_document: "",
  find_document: "",
  type_document: "",
  date_start: "",
  date_end: "",
  status_document: "",
  district: "",
  zone: "",
  station: "",


  track_document_popup: [],
  track_document_show: [],





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
    case "CLICK SEARCH TRACKDOCUMENT":
      const no_track_documentRegex  = new RegExp(`${state.no_track_document}`, "gi");
      const find_documentRegex  = new RegExp(`${state.find_document}`, "gi");
      const type_documentRegex  = new RegExp(`${state.type_document}`, "gi");
      const date_startRegex  = new RegExp(`${state.date_start}`, "gi");
      const date_endRegex  = new RegExp(`${state.date_end}`, "gi");
      const status_documentRegex  = new RegExp(`${state.status_document}`, "gi");
      const districtRegex  = new RegExp(`${state.district}`, "gi");
      const zoneRegex  = new RegExp(`${state.zone}`, "gi");
      const stationRegex  = new RegExp(`${state.station}`, "gi");
      return {
        ...state,
        track_document_popup :initialState.track_document.filter(function (track_document) {
          var isMatch =  (!no_track_documentRegex ||no_track_documentRegex.test(track_document.no_track_document)) &&
          (!find_documentRegex ||find_documentRegex.test(track_document.find_document)) &&
          (!type_documentRegex || type_documentRegex.test(track_document.type_document)) &&
          (!date_startRegex || date_startRegex.test(track_document.date_start)) &&
          (!date_endRegex || date_endRegex.test(track_document.date_end)) &&
          (!status_documentRegex || status_documentRegex.test(track_document.status_document)) &&
          (!districtRegex || districtRegex.test(track_document.district)) &&
          (!zoneRegex || zoneRegex.test(track_document.zone)) &&
          (!stationRegex || stationRegex.test(track_document.station)) 
          return (isMatch);
        }),
      }

    case "ON CHANGE NO TRACKDOCUMENT":
      return {
        ...state,
        no_track_document: action.value
      }

    case "ON CHANGE FIND TRACKDOCUMENT":
      console.log(action.value)
      return {
        ...state,
        find_document: action.value
      }

    case "ON CHANGE TYPE TRACKDOCUMENT":
      console.log(action.value)
      return {
        ...state,
        type_document: action.value
      }

    case "ON CHANGE DATE START TRACKDOCUMENT":
      console.log(action.value)
      return {
        ...state,
        date_start: action.value
      }

    case "ON CHANGE DATE END TRACKDOCUMENT":
      return {
        ...state,
        date_end: action.value
      }

    case "ON CHANGE STATUS TRACKDOCUMENT":
      return {
        ...state,
        status: action.value
      }

    case "ON CHANGE DISTRICT TRACKDOCUMENT":
      return {
        ...state,
        district: action.value
      }

    case "ON CHANGE ZONE TRACKDOCUMENT":
      return {
        ...state,
        zone: action.value
      }

    case "ON CHANGE STATION TRACKDOCUMENT":
      return {
        ...state,
        station: action.value
      }

    default:
      return state
  }
}