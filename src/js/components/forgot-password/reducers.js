const initialState = {
    username: "",
    password: "",

    new_password: "",
    alert: "",
    submitForget: false
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
        case "SUBMIT":
            return {
                ...state,
                submitForget: true,
                new_password: action.value
            }
        case "NO ID":
            return {
                ...state,
                alert: "ไม่มีรหัสพนักงานในระบบ"
            }

        default:
            return state
    }
}