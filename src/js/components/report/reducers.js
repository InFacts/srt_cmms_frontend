const initialState = {

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


  level_list: [
    {
      "id": 1,
      "type": 1
    },
    {
      "id": 2,
      "type": 2
    },
    {
      "id": 3,
      "type": 3
    }
  ],

  type_list: [
    {
      "id": 1,
      "type": "เดือน"
    },
    {
      "id": 2,
      "type": "ปี"
    },
  ],

  year_list: [
    {
      "id": 1,
      "type": "2562"
    },
    {
      "id": 2,
      "type": "2563"
    },
  ],

  month_list: [
    {
      "id": 1,
      "type": "มกราคม"
    },
    {
      "id": 2,
      "type": "ธันวาคม"
    },
  ],

  // Mode การทำงาน
  action: "search",
  fill_data: false,
  tool_mode: false,

  report: "",
  level: "",
  type: "",
  district: "",
  station: "",
  year: "",
  month: "",

  report_add: "",
  level_add: "",
  type_add: "",
  district_add: "",
  station_add: "",
  year_add: "",
  month_add: "",

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

    case "ON CHANGE REPORT":
      return {
        ...state,
        report: action.value
      }

    case "ON CHANGE LEVEL":
      return {
        ...state,
        level: action.value
      }

    case "ON CHANGE TYPE":
      return {
        ...state,
        type: action.value
      }

    case "ON CHANGE DISTRICT":
      return {
        ...state,
        district: action.value
      }

    case "ON CHANGE STATION":
      return {
        ...state,
        station: action.value
      }

    case "ON CHANGE YEAR":
      return {
        ...state,
        year: action.value
      }

    case "ON CHANGE MONTH":
      return {
        ...state,
        month: action.value
      }


    case "ON CHANGE REPORT ADD":
      return {
        ...state,
        report_add: action.value
      }

    case "ON CHANGE LEVEL ADD":
      return {
        ...state,
        level_add: action.value
      }


    case "ON CHANGE TYPE ADD":
      return {
        ...state,
        type_add: action.value
      }

    case "ON CHANGE DISTRICT ADD":
      return {
        ...state,
        district_add: action.value
      }

    case "ON CHANGE STATION ADD":
      return {
        ...state,
        station_add: action.value
      }

    case "ON CHANGE YEAR ADD":
      return {
        ...state,
        year_add: action.value
      }

    case "ON CHANGE MONTH ADD":
      return {
        ...state,
        month_add: action.value
      }

    default:
      return state
  }
}