const initialState = {
    count: 0,
    otherState: "",
    text: "nuk",
    text2: "k"
}
export default (state = initialState, action) => {
    switch (action.type) {
        case "INCREMENT":
            return {
                ...state,
                count: state.count + 1
            }
        case "DECREMENT":
            return {
                ...state,
                count: state.count - 1
            }
        case "TEXT":
            return {
                ...state,
                text: action.value
            }
        case "TEXT2":
            return {
                ...state,
                text2: action.value
            }
        default:
            return state
    }
}