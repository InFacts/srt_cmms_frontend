import {makeActionCreator} from './generate_action_creator'

// Constants
export const NAV_BOTTOM_STATUS = {
    ON_READY: "ON_READY",
    SUCCESS: "SUCCESS",
    WARNING: "WARNING",
    ERROR: "ERROR",
}

export const NAV_BOTTOM_STATUS_TEXT = {
    ON_READY: "พร้อมใช้งาน",
    SUCCESS: "ส่งข้อมูลสำเร็จ",
    WARNING: "ระวัง",
    ERROR: "เกิดข้อผิดพลาด",
}

// Actions
const TO_STATUS_ON_READY = "navBottom/TO_STATUS_ON_READY";
const TO_STATUS_SUCCESS = "navBottom/TO_STATUS_SUCCESS";
const TO_STATUS_WARNING = "navBottom/TO_STATUS_WARNING";
const TO_STATUS_ERROR = "navBottom/TO_STATUS_ERROR";

const initialState = {
    mode: NAV_BOTTOM_STATUS.ON_READY,
}

// Reducer
export default function reducer(state = initialState, action){
    switch(action.type){
        // CHANGE MODE
        case TO_STATUS_ON_READY:
            console.log("-----> TO_STATUS_ON_READY")
            return {
                ...state,
                mode: NAV_BOTTOM_STATUS.ON_READY
            }
        case TO_STATUS_SUCCESS:
            return {
                ...state,
                mode: NAV_BOTTOM_STATUS.SUCCESS
            }
        case TO_STATUS_WARNING:
            return {
                ...state,
                mode: NAV_BOTTOM_STATUS.WARNING
            }
        case TO_STATUS_ERROR:
            return {
                ...state,
                mode: NAV_BOTTOM_STATUS.ERROR
            }
        default:
            return state;
    }
}

// Action Creators
export const navBottomOnReady = makeActionCreator(TO_STATUS_ON_READY);
export const navBottomSuccess = makeActionCreator(TO_STATUS_SUCCESS);
export const navBottomWarning = makeActionCreator(TO_STATUS_WARNING);
export const navBottomError = makeActionCreator(TO_STATUS_ERROR);