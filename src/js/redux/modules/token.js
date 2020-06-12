import { makeActionCreator } from './generate_action_creator';
import jwt_decode from 'jwt-decode';


// Actions
const DECODE_TOKEN = "token/DECODE_TOKEN";

const SET_LOGGED_IN_TRUE = "token/SET_LOGGED_IN_TRUE"
const SET_LOGGED_IN_FALSE = "token/SET_LOGGED_IN_FALSE"

const initialState = {
    raw_token: '',
    decoded_token: {},
    // Needs to check for token, else we will bounce back to login page everytime we refresh a page (initialState will be false)
    isLoggedIn: (localStorage.getItem("token_auth") !== null)? true: false, 
}

// Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case DECODE_TOKEN:
            return {
                ...state,
                raw_token: action.token,
                decoded_token: jwt_decode(action.token),
            }
        case SET_LOGGED_IN_TRUE:
        case SET_LOGGED_IN_FALSE:
            return {
                ...state,
                isLoggedIn: (action.type === SET_LOGGED_IN_TRUE) ? true: false,
            }
        default:
            return state
    }
}

// Action Creators
export const decodeToken = makeActionCreator(DECODE_TOKEN, 'token');
export const setLoggedInTrue = makeActionCreator(SET_LOGGED_IN_TRUE);
export const setLoggedInFalse = makeActionCreator(SET_LOGGED_IN_FALSE);

function shouldDecodeToken(state, raw_token) {
    const current_token = state.token.raw_token;
    return current_token !== raw_token;
}

export function decodeTokenIfNeeded() {
    // console.log("localStorage.getItem('token_auth')", localStorage.getItem('token_auth'))
    let raw_token = localStorage.getItem('token_auth');
    return (dispatch, getState) => {
        if (shouldDecodeToken(getState(), raw_token)) {
            return dispatch(decodeToken(raw_token));
        } else {
            return Promise.resolve();
        }
    }
}