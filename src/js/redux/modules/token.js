import { makeActionCreator } from './generate_action_creator';
import jwt_decode from 'jwt-decode';


// Actions
const DECODE_TOKEN = "token/DECODE_TOKEN";


const initialState = {
    raw_token: '',
    decoded_token: {},
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
        default:
            return state
    }
}

// Action Creators
export const decodeToken = makeActionCreator(DECODE_TOKEN, 'token');

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