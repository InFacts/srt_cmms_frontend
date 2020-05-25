import { combineReducers } from 'redux';

const initialState = {
    temp_reducer: {
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
    },

    mode: {
        // Mode การทำงาน
        action: "search",
        fill_data: false,
        tool_mode: false,
    },

    //Donut
    fields: {}
}

function mode(state=initialState.mode, action){
    switch(action.type){
      // เลืก mode ในการทำงาน ( Search / Create / Edit )
      case "ACTION":
        // console.log("mode", state.action)
        return {
          ...state,
          action: action.value,
          clickable: action.value === "add" || action.value === "edit" ? true : false
        }
      default:
          return state
    }
  }


function fields(state = {}, action){
    switch(action.type){
      //nite
      case('CHANGE_FORM'):
        // ES6 computed property syntax https://redux.js.org/advanced/async-actions
        return {...state, [action.field] : action.value};
      default:
        return state
    }
}

const temp_reducer = (state = initialState.temp_reducer, action) => {
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
            return {
            ...state,
                track_document_popup: initialState.temp_reducer.track_document.filter(item =>{
                    const query = state.no_track_document.toLowerCase();
                    const query2 = state.date_start.toLowerCase();
                    const query3 = state.date_end.toLowerCase();
                    const query4 = state.zone.toLowerCase();
                    const query5 = state.district.toLowerCase();

                    const query6 = state.find_document.toLowerCase();
                    const query7 = state.type_document.toLowerCase();
                    const query8 = state.status_document.toLowerCase();
                    const query9 = state.station.toLowerCase();
                    return(
                        (item.no_track_document.toLowerCase().indexOf(query) >= 0 || !query )&&
                        (item.zone.toLowerCase().indexOf(query4) >= 0 || !query4 ) &&
                        (item.district.toLowerCase().indexOf(query5) >= 0 || !query5 ) &&
                        (item.date_end.toLowerCase().indexOf(query3) >= 0 || !query3 ) &&
                        (item.date_start.toLowerCase().indexOf(query2) >= 0 || !query2 ) &&

                        (item.find_document.toLowerCase().indexOf(query6) >= 0 || !query6 ) &&
                        (item.type_document.toLowerCase().indexOf(query7) >= 0 || !query7 ) &&
                        (item.status_document.toLowerCase().indexOf(query8) >= 0 || !query8 ) &&
                        (item.station.toLowerCase().indexOf(query9) >= 0 || !query9 ) 
                    )
                }),
            }
  
        case "ON CHANGE NO TRACKDOCUMENT":
            return {
            ...state,
            no_track_document: action.value
            }
  
        case "ON CHANGE FIND TRACKDOCUMENT":
            return {
                ...state,
                find_document: action.value
            }
  
        case "ON CHANGE TYPE TRACKDOCUMENT":
            return {
                ...state,
                type_document: action.value
            }
  
        case "ON CHANGE DATE START TRACKDOCUMENT":
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

const trackDoc = combineReducers({
    fields,
    temp_reducer,
    mode
});
  
export default trackDoc;