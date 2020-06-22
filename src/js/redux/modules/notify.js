import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

const initialState = {
    notify: [],
    not_read_count: ""
}


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case "LOAD NOTIFY":
            var not_read_count = 0;
            action.notify.map(function (notify, index) {
                if (notify.is_read.data[0] === 1) {
                    return not_read_count
                }
                else {
                    not_read_count = not_read_count + 1;
                    return not_read_count
                }
            })
            return {
                ...state,
                notify: action.notify,
                not_read_count: not_read_count
            }

        default:
            return state
    }
}

export const loadNotify = (e) => {
    return (dispatch, getState) => {
        return axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/user/notification/plus`,
            { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
                console.log("TEST")
                console.log(res.headers)
                dispatch(
                    {
                        type: "LOAD NOTIFY",
                        notify: res.data.results
                    }
                )
            })
    }
}
export const readNotify = (e) => {
    const data = {
        "notification_id": e.target.parentNode.parentNode.parentNode.id,
        "is_read": true
    }
    return (dispatch, getState) => {
        return axios.patch(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/user/notifications`, data, 
            { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
                console.log(res)
                dispatch(
                    {
                        type: "",
                    }
                )
            })
    }
}