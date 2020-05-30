const initialState = {
  // Mode การทำงาน
  action: "search",
  fill_data: false,
  tool_mode: false,

  no_item: "",
  des_item: "",
  inventory_id: "",
  inventory_name: "",
  districts: "",
  districts_id: "",
  node: "",
  node_id: "",
  year_name: "",
  month_name: "",

  item_pop_up: [],
  inventory_pop_up: [],
  districts_pop_up: [],
  node_pop_up: [],

  line_item_s1: [],

  year: [
    {
      "id": 1,
      "year_id": "2019",
      "name": "2019"
    },
    {
      "id": 2,
      "year_id": "2020",
      "name": "2020"
    }
  ],
  month: [
    {
      "id": 1,
      "month_id": "01",
      "name": "มกราคม"
    },
    {
      "id": 2,
      "month_id": "02",
      "name": "กุมภาพันธ์"
    },
    {
      "id": 3,
      "month_id": "03",
      "name": "มีนาคม"
    },
    {
      "id": 4,
      "month_id": "04",
      "name": "เมษายน"
    },
    {
      "id": 5,
      "month_id": "05",
      "name": "พฤษภาคม"
    },
    {
      "id": 6,
      "month_id": "06",
      "name": "มิถุนายน"
    },
    {
      "id": 7,
      "month_id": "07",
      "name": "กรกฎาคม"
    },
    {
      "id": 8,
      "month_id": "08",
      "name": "สิงหาคม"
    },
    {
      "id": 9,
      "month_id": "09",
      "name": "กันยายน"
    },
    {
      "id": 10,
      "month_id": "10",
      "name": "ตุลาคม"
    },
    {
      "id": 11,
      "month_id": "11",
      "name": "พฤศจิกายน"
    },
    {
      "id": 12,
      "month_id": "12",
      "name": "ธันวาคม"
    }
  ]
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

    case "ON CHANGE NO ITEM":
      return {
        ...state,
        no_item: action.value
      }
    case "ON CHANGE DES ITEM":
      return {
        ...state,
        des_item: action.value
      }
    case "ON CLICK SEARCH POPUP NO PART":
      return {
        ...state,
        item_pop_up: action.value
      }
    case "ON CLICK SELECT POPUP NO PART":
      return {
        ...state,
        no_item: state.item_pop_up[action.rowIndex].internal_item_id,
        des_item: state.item_pop_up[action.rowIndex].description
      }
    case "ON CHANGE INVENTORY ID":
      return {
        ...state,
        inventory_id: action.value
      }
    case "ON CHANGE INVENTORY NAME":
      return {
        ...state,
        inventory_name: action.value
      }
    case "CLICK SEARCH POPUP INVENTORY":
      return {
        ...state,
        inventory_pop_up: action.value
      }
    case "CLICK SELECT POPUP INVENTORY":
      return {
        ...state,
        inventory_id: state.inventory_pop_up[action.rowIndex].warehouse_id,
        inventory_name: state.inventory_pop_up[action.rowIndex].name
      }
    case "ON CHANGE DISTRICTS":
      return {
        ...state,
        districts: action.value
      }
    case "CLICK SEARCH POPUP DISTRICTS":
      return {
        ...state,
        districts_pop_up: action.value
      }
    case "CLICK SELECT POPUP DISTRICTS":
      return {
        ...state,
        districts: state.districts_pop_up[action.rowIndex].name,
        districts_id: state.districts_pop_up[action.rowIndex].district_id
      }
    case "ON CHANGE NODE":
      return {
        ...state,
        node: action.value
      }
    case "ON CLICK SEARCH POPUP NODE":
      return {
        ...state,
        node_pop_up: action.value
      }
    case "ON CLICK SELECT POPUP NODE":
      return {
        ...state,
        node: state.node_pop_up[action.rowIndex].name,
        node_id: state.node_pop_up[action.rowIndex].node_id
      }
    case "CLICK SEARCH POPUP S1":
      return {
        ...state,
        line_item_s1: action.value
      }
    case "ON CHANGE YEAR":
      return {
        ...state,
        year_id: action.value
      }
      case "ON CHANGE MONTH":
      return {
        ...state,
        month_id: action.value
      }

    default:
      return state
  }
}