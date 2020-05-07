const initialState = {
  // Mode การทำงาน
  action: "search",
}
export default (state = initialState, action) => {
  switch (action.type) {
    // เลืก mode ในการทำงาน ( Search / Create / Edit )
      case "ACTION":
        console.log("mode", state.action)
          return {
              ...state,
              action: action.value
          }
      default:
          return state
  }
}