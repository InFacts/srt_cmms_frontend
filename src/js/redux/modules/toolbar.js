import history from '../../history'
import { makeActionCreator } from './generate_action_creator'

// Constants
export const TOOLBAR_MODE = {
    INVISIBLE: "INVISIBLE",
    NONE: "NONE",
    NONE_HOME: "NONE_HOME",
    SEARCH: "SEARCH",
    JUST_SEARCH: "JUST_SEARCH",
    ADD: "ADD",
    REPORT: "REPORT"
}

export const TOOLBAR_ACTIONS = {
    HOME: "HOME",
    SEARCH: "SEARCH",
    ADD: "ADD",
    SAVE: "SAVE",
    REFRESH: "REFRESH",
    BACKWARD: "BACKWARD",
    FORWARD: "FORWARD",
    EXPORT_PDF: "EXPORT_PDF"
}



// Actions
const TO_MODE_INVISIBLE = "toolbar/TO_MODE_INVISIBLE";
const TO_MODE_NONE = "toolbar/TO_MODE_NONE";
const TO_MODE_NONE_HOME = "toolbar/TO_MODE_NONE_HOME";
const TO_MODE_SEARCH = "toolbar/TO_MODE_SEARCH";
const TO_MODE_JUST_SEARCH = "toolbar/TO_MODE_JUST_SEARCH";
const TO_MODE_ADD = "toolbar/TO_MODE_ADD";
const TO_MODE_REPORT = "toolbar/TO_MODE_REPORT";

const CLICK_HOME = "toolbar/CLICK_HOME";
const CLICK_ADD = "toolbar/CLICK_ADD";
const CLICK_SAVE = "toolbar/CLICK_SAVE";
const CLICK_REFRESH = "toolbar/CLICK_REFRESH";
const CLICK_BACKWARD = "toolbar/CLICK_BACKWARD";
const CLICK_FORWARD = "toolbar/CLICK_FORWARD";
const CLICK_EXPORT_PDF = "toolbar/CLICK_EXPORT_PDF";

const HANDLE_CLICK_HOME = "toolbar/HANDLE_CLICK_HOME";
const HANDLE_CLICK_ADD = "toolbar/HANDLE_CLICK_ADD";
const HANDLE_CLICK_SAVE = "toolbar/HANDLE_CLICK_SAVE";
const HANDLE_CLICK_REFRESH = "toolbar/HANDLE_CLICK_REFRESH";
const HANDLE_CLICK_BACKWARD = "toolbar/HANDLE_CLICK_BACKWARD";
const HANDLE_CLICK_FORWARD = "toolbar/HANDLE_CLICK_FORWARD";
const HANDLE_CLICK_EXPORT_PDF = "toolbar/HANDLE_CLICK_EXPORT_PDF";

const initialState = {
    mode: TOOLBAR_MODE.NONE,
    requiresHandleClick: {
        [TOOLBAR_ACTIONS.HOME]: false,
        [TOOLBAR_ACTIONS.ADD]: false,
        [TOOLBAR_ACTIONS.SAVE]: false,
        [TOOLBAR_ACTIONS.REFRESH]: false,
        [TOOLBAR_ACTIONS.BACKWARD]: false,
        [TOOLBAR_ACTIONS.FORWARD]: false,
        [TOOLBAR_ACTIONS.EXPORT_PDF]: false
    }
}

// Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        // CHANGE MODE
        case TO_MODE_INVISIBLE:
            return {
                ...state,
                mode: TOOLBAR_MODE.INVISIBLE
            }
        case TO_MODE_NONE:
            return {
                ...state,
                mode: TOOLBAR_MODE.NONE
            }
        case TO_MODE_NONE_HOME:
            return {
                ...state,
                mode: TOOLBAR_MODE.NONE_HOME
            }
        case TO_MODE_SEARCH:
            return {
                ...state,
                mode: TOOLBAR_MODE.SEARCH
            }
        case TO_MODE_JUST_SEARCH:
            return {
                ...state,
                mode: TOOLBAR_MODE.JUST_SEARCH
            }
        case TO_MODE_ADD:
            return {
                ...state,
                mode: TOOLBAR_MODE.ADD
            }
            case TO_MODE_REPORT:
            return {
                ...state,
                mode: TOOLBAR_MODE.REPORT
            }

        // CLICK
        case CLICK_HOME:
            return {
                ...state,
                requiresHandleClick: {
                    ...state.requiresHandleClick,
                    [TOOLBAR_ACTIONS.HOME]: true
                }
            }
        case CLICK_ADD:
            return {
                ...state,
                mode: TOOLBAR_MODE.ADD,
                requiresHandleClick: {
                    ...state.requiresHandleClick,
                    [TOOLBAR_ACTIONS.ADD]: true
                }
            }
        case CLICK_SAVE:
            return {
                ...state,
                requiresHandleClick: {
                    ...state.requiresHandleClick,
                    [TOOLBAR_ACTIONS.SAVE]: true
                }
            }
        case CLICK_REFRESH:
            return {
                ...state,
                requiresHandleClick: {
                    ...state.requiresHandleClick,
                    [TOOLBAR_ACTIONS.REFRESH]: true
                }
            }
        case CLICK_BACKWARD:
            return {
                ...state,
                mode: TOOLBAR_MODE.SEARCH,
                requiresHandleClick: {
                    ...state.requiresHandleClick,
                    [TOOLBAR_ACTIONS.BACKWARD]: true
                }
            }
        case CLICK_FORWARD:
            return {
                ...state,
                mode: TOOLBAR_MODE.SEARCH,
                requiresHandleClick: {
                    ...state.requiresHandleClick,
                    [TOOLBAR_ACTIONS.FORWARD]: true
                }
            }
        case CLICK_EXPORT_PDF:
            return {
                ...state,
                requiresHandleClick: {
                    ...state.requiresHandleClick,
                    [TOOLBAR_ACTIONS.EXPORT_PDF]: true
                }
            }

        // HANDLE CLICK
        case HANDLE_CLICK_HOME:
            return {
                ...state,
                requiresHandleClick: {
                    ...state.requiresHandleClick,
                    [TOOLBAR_ACTIONS.HOME]: false
                }
            }
        case HANDLE_CLICK_ADD:
            return {
                ...state,
                requiresHandleClick: {
                    ...state.requiresHandleClick,
                    [TOOLBAR_ACTIONS.ADD]: false
                }
            }
        case HANDLE_CLICK_SAVE:
            return {
                ...state,
                requiresHandleClick: {
                    ...state.requiresHandleClick,
                    [TOOLBAR_ACTIONS.SAVE]: false
                }
            }
        case HANDLE_CLICK_REFRESH:
            return {
                ...state,
                requiresHandleClick: {
                    ...state.requiresHandleClick,
                    [TOOLBAR_ACTIONS.REFRESH]: false
                }
            }
        case HANDLE_CLICK_BACKWARD:
            return {
                ...state,
                requiresHandleClick: {
                    ...state.requiresHandleClick,
                    [TOOLBAR_ACTIONS.BACKWARD]: false
                }
            }
        case HANDLE_CLICK_FORWARD:
            return {
                ...state,
                requiresHandleClick: {
                    ...state.requiresHandleClick,
                    [TOOLBAR_ACTIONS.FORWARD]: false
                }
            }
        case HANDLE_CLICK_EXPORT_PDF:
            return {
                ...state,
                requiresHandleClick: {
                    ...state.requiresHandleClick,
                    [TOOLBAR_ACTIONS.EXPORT_PDF]: false
                }
            }

        default:
            return state;

    }
}

// Action Creators
export const toModeInvisible = makeActionCreator(TO_MODE_INVISIBLE);
export const toModeNone = makeActionCreator(TO_MODE_NONE);
export const toModeNoneHome = makeActionCreator(TO_MODE_NONE_HOME);
export const toModeSearch = makeActionCreator(TO_MODE_SEARCH);
export const toModeJustSearch = makeActionCreator(TO_MODE_JUST_SEARCH);
export const toModeAdd = makeActionCreator(TO_MODE_ADD);
export const toModeReport = makeActionCreator(TO_MODE_REPORT);

export const clickHome = makeActionCreator(CLICK_HOME);
export const clickAdd = makeActionCreator(CLICK_ADD);
export const clickSave = makeActionCreator(CLICK_SAVE);
export const clickRefresh = makeActionCreator(CLICK_REFRESH);
export const clickBackward = makeActionCreator(CLICK_BACKWARD);
export const clickForward = makeActionCreator(CLICK_FORWARD);
export const clickExportPDF = makeActionCreator(CLICK_EXPORT_PDF);

export const handleClickHome = makeActionCreator(HANDLE_CLICK_HOME);
export const handleClickAdd = makeActionCreator(HANDLE_CLICK_ADD);
export const handleClickSave = makeActionCreator(HANDLE_CLICK_SAVE);
export const handleClickRefresh = makeActionCreator(HANDLE_CLICK_REFRESH);
export const handleClickBackward = makeActionCreator(HANDLE_CLICK_BACKWARD);
export const handleClickForward = makeActionCreator(HANDLE_CLICK_FORWARD);
export const handleClickExportPDF = makeActionCreator(HANDLE_CLICK_EXPORT_PDF);

export const handleClickHomeToSpareMain = () => {
    return (dispatch) => {
        dispatch(handleClickHome());
        history.push('/main-spare');
    };
}
export const handleClickHomeToPMTMain = () => {
    return (dispatch) => {
        dispatch(handleClickHome());
        history.push('/main-pmt');
    };
}

export const MODE_TO_ACTION_CREATOR = {
    [TOOLBAR_MODE.NONE]: toModeNone,
    [TOOLBAR_MODE.NONE_HOME]: toModeNoneHome,
    [TOOLBAR_MODE.SEARCH]: toModeSearch,
    [TOOLBAR_MODE.JUST_SEARCH]: toModeJustSearch,
    [TOOLBAR_MODE.ADD]: toModeAdd,
    [TOOLBAR_MODE.REPORT]: toModeReport,
    [TOOLBAR_MODE.INVISIBLE]: toModeInvisible
}