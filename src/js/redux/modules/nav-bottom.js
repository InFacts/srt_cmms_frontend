import {makeActionCreator} from './generate_action_creator'

// Constants
export const NAV_BOTTOM_STATUS = {
    ON_READY: "ON_READY",
    SENDING: "SENDING",
    SUCCESS: "SUCCESS",
    WARNING: "WARNING",
    ERROR: "ERROR",
}

export const NAV_BOTTOM_STATUS_TEXT = {
    ON_READY: "พร้อมใช้งาน",
    SENDING: "กำลังส่งข้อมูล",
    SUCCESS: "ส่งข้อมูลสำเร็จ",
    WARNING: "ระวัง",
    ERROR: "เกิดข้อผิดพลาด",
}

// Actions
const TO_STATUS_ON_READY = "navBottom/TO_STATUS_ON_READY";
const TO_STATUS_SENDING = "navBottom/TO_STATUS_SENDING";
const TO_STATUS_SUCCESS = "navBottom/TO_STATUS_SUCCESS";
const TO_STATUS_WARNING = "navBottom/TO_STATUS_WARNING";
const TO_STATUS_ERROR = "navBottom/TO_STATUS_ERROR";

const initialState = {
    mode: NAV_BOTTOM_STATUS.ON_READY,
    api_type: "",
    action: "",
    description: "",
}

const ACTION_TYPE_TO_MODE = {
    "navBottom/TO_STATUS_ON_READY": NAV_BOTTOM_STATUS.ON_READY,
    "navBottom/TO_STATUS_SENDING": NAV_BOTTOM_STATUS.SENDING,
    "navBottom/TO_STATUS_SUCCESS": NAV_BOTTOM_STATUS.SUCCESS,
    "navBottom/TO_STATUS_WARNING": NAV_BOTTOM_STATUS.WARNING,
    "navBottom/TO_STATUS_ERROR": NAV_BOTTOM_STATUS.ERROR,
}

// Reducer
export default function reducer(state = initialState, action){
    switch(action.type){
        // CHANGE MODE
        case TO_STATUS_ON_READY:
        case TO_STATUS_SENDING:
        case TO_STATUS_SUCCESS:
        case TO_STATUS_WARNING:
        case TO_STATUS_ERROR:
            return {
                ...state,
                mode: ACTION_TYPE_TO_MODE[action.type],
                api_type: action.api_type,
                action: action.action,
                description: action.description,
            }
        default:
            return state;
    }
}

// Action Creators
export const navBottomOnReady = makeActionCreator(TO_STATUS_ON_READY, 'api_type', 'action', 'description');
export const navBottomSending = makeActionCreator(TO_STATUS_SENDING, 'api_type', 'action', 'description');
export const navBottomSuccess = makeActionCreator(TO_STATUS_SUCCESS, 'api_type', 'action', 'description');
export const navBottomWarning = makeActionCreator(TO_STATUS_WARNING, 'api_type', 'action', 'description');
export const navBottomError = makeActionCreator(TO_STATUS_ERROR, 'api_type', 'action', 'description');