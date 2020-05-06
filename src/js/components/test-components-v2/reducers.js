const initialState = {
    count: 0,
    otherState: "",
    text: "nuk",
    text2: "k",

    action: "search",
    data: {},


    files:[],
    clickable: true,
    accepts: null,
    multiple: true,
    maxFiles: Infinity,
    maxFileSize: Infinity,
    minFileSize: 0,





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

        case "ACTION":
            return {
                ...state,
                action: action.value
            }

        case "DATA":
            return {
                ...state,
                data: action.value
            }

        case "FILES":
            return {
                ...state,
                files: action.value
            }





        default:
            return state
    }
}