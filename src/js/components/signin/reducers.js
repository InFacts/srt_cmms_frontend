// import axios from "axios";

const initialState = {
    username: "",
    password: ""
}
export default (state = initialState, action) => {
    switch (action.type) {
        // case "ON_SUBMIT":
        //     const user = {
        //         "username": this.state.username,
        //         "password": this.state.password
        //     };
        //     return axios.post(`http://vanilla-erp.com:${API_URL_DATABASE}/api/auth/login`, user).then(res => {
        //         // console.log(res);
        //         console.log(res.data.token);
        //         localStorage.setItem('token_auth', res.data.token)
        //         console.log("token_auth", localStorage.getItem('token_auth'))
        //     }).catch(function (err) {
        //         console.log(err)
        //     })
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