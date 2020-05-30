
const initialState = {
    username: "",
    password: ""
}
export default (state = initialState, action) => {
    switch (action.type) {
        case "ON_CHANGE_USERNAME":
            return {
                ...state,
                username: action.value,
            }
        case "ON_CHANGE_PASSWORD":
            return {
                ...state,
                password: action.value
            }
        default:
            return state
    }
}