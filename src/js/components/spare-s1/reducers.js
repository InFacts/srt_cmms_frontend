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

  item_pop_up: [],
  inventory_pop_up: [],
  districts_pop_up: [],
  node_pop_up: [],

  line_item_s1: []

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

    default:
      return state
  }
}