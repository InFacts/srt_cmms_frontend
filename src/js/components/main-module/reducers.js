const initialState = {
  // Mode การทำงาน
  action: "search",
  fill_data: false,
  tool_mode: true,

  notify: [],
  not_read_count: ""
}
export default (state = initialState, action) => {
  switch (action.type) {
    case "LOAD NOTIFY":
      var not_read_count = 0;
      action.value.map(function (notify, index) {
        if(notify.is_read.data[0] === 1){
          return not_read_count
        }
        else {
          not_read_count = not_read_count + 1;
          return not_read_count
        }
      })
      return {
        ...state,
        notify: action.value,
        not_read_count: not_read_count
      }

    default:
      return state
  }
}