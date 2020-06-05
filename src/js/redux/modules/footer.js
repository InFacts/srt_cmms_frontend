import {makeActionCreator} from './generate_action_creator'
import history from '../../history' 

// Constants
export const FOOTER_MODE = {
    INVISIBLE: "INVISIBLE",
    NONE: "NONE",
    SEARCH: "SEARCH",
    EDIT: "EDIT",
    OWN_DOCUMENT: "OWN_DOCUMENT",
    ADD_DRAFT: "ADD_DRAFT",
    AP_APPROVAL: "AP_APPROVAL",
    AP_CHECK_APPROVAL: "AP_CHECK_APPROVAL",
    AP_GOT_IT: "AP_GOT_IT",
    AP_CHECK_ORDER: "AP_CHECK_ORDER",
    AP_CHECK_MAINTENANCE: "AP_CHECK_MAINTENANCE",
    AP_GUARANTEE_MAINTENANCE: "AP_GUARANTEE_MAINTENANCE",
    AP_APPROVAL_END: "AP_APPROVAL_END"
}

export const FOOTER_ACTIONS = {
    BACK: "BACK", 
    CANCEL_APPROVAL_PROCESS: "CANCEL_APPROVAL_PROCESS", 
    VOID: "VOID", // Visual DELETE_DOCUMENT
    REJECT: "REJECT", 
    SAVE: "SAVE",
    CHECK_APPROVAL: "CHECK_APPROVAL", 
    APPROVAL_ORDER: "APPROVAL_ORDER", 
    GOT_IT: "GOT_IT",
    FAST_TRACK: "FAST_TRACK", 
    SEND: "SEND",
    APPROVAL: "APPROVAL", 
    APPROVED: "APPROVED"
}

export const FOOTER_ACTIONS_TEXT = {
    BACK: "ย้อนกลับ", 
    CANCEL_APPROVAL_PROCESS: "ยกเลิกการขออนุมัติ", 
    VOID: "ยกเลิกการใช้งานเอกสาร", // Visual DELETE_DOCUMENT
    REJECT: "ส่งกลับไปยังต้นทาง", 
    SAVE: "บันทึก",
    CHECK_APPROVAL: "ตรวจสอบและลงนาม", 
    APPROVAL_ORDER: "ตรวจสอบและสั่งจ่าย", 
    GOT_IT: "รับทราบ",
    FAST_TRACK: "Fast Track", 
    SEND: "ส่งเอกสาร",
    APPROVAL: "ลงนาม", 
    APPROVED: "ลงนามเรียบร้อยแล้ว"
}


// Actions
const TO_MODE_INVISIBLE = "footer/TO_MODE_INVISIBLE";
const TO_MODE_NONE = "footer/TO_MODE_NONE";
const TO_MODE_SEARCH = "footer/TO_MODE_SEARCH";
const TO_MODE_EDIT = "footer/TO_MODE_EDIT";
const TO_MODE_OWN_DOCUMENT = "footer/TO_MODE_OWN_DOCUMENT";
const TO_MODE_ADD_DRAFT = "footer/TO_MODE_ADD_DRAFT";
const TO_MODE_AP_APPROVAL = "footer/TO_MODE_AP_APPROVAL";
const TO_MODE_AP_CHECK_APPROVAL = "footer/TO_MODE_AP_CHECK_APPROVAL";
const TO_MODE_AP_GOT_IT = "footer/TO_MODE_AP_GOT_IT";
const TO_MODE_AP_CHECK_ORDER = "footer/TO_MODE_AP_CHECK_ORDER";
const TO_MODE_AP_CHECK_MAINTENANCE = "footer/TO_MODE_AP_CHECK_MAINTENANCE";
const TO_MODE_AP_GUARANTEE_MAINTENANCE = "footer/TO_MODE_AP_GUARANTEE_MAINTENANCE";
const TO_MODE_AP_APPROVAL_END = "footer/TO_MODE_AP_APPROVAL_END";

const CLICK_APPROVAL = "footer/CLICK_APPROVAL";
const CLICK_SEND = "footer/CLICK_SEND";
const CLICK_SAVE = "footer/CLICK_SAVE";
const CLICK_REJECT = "footer/CLICK_REJECT";
const CLICK_BACK = "footer/CLICK_BACK";
const CLICK_CHECK_APPROVAL = "footer/CLICK_FORWARD";
const CLICK_APPROVAL_ORDER = "footer/CLICK_APPROVAL_ORDER";
const CLICK_GOT_IT = "footer/CLICK_GOT_IT";
const CLICK_FAST_TRACK = "footer/CLICK_FAST_TRACK";
const CLICK_CANCEL_APPROVAL_PROCESS = "footer/CLICK_CANCEL_APPROVAL_PROCESS";
const CLICK_VOID = "footer/CLICK_VOID";
const CLICK_APPROVED = "footer/CLICK_APPROVED";

const HANDLE_CLICK_APPROVAL = "footer/HANDLE_CLICK_APPROVAL";
const HANDLE_CLICK_SEND = "footer/HANDLE_CLICK_SEND";
const HANDLE_CLICK_SAVE = "footer/HANDLE_CLICK_SAVE";
const HANDLE_CLICK_REJECT = "footer/HANDLE_CLICK_REJECT";
const HANDLE_CLICK_BACK = "footer/HANDLE_CLICK_BACK";
const HANDLE_CLICK_CHECK_APPROVAL = "footer/HANDLE_CLICK_CHECK_APPROVAL";
const HANDLE_CLICK_APPROVAL_ORDER = "footer/HANDLE_CLICK_APPROVAL_ORDER";
const HANDLE_CLICK_GOT_IT = "footer/HANDLE_CLICK_GOT_IT";
const HANDLE_CLICK_FAST_TRACK = "footer/HANDLE_CLICK_FAST_TRACK";
const HANDLE_CLICK_CANCEL_APPROVAL_PROCESS = "footer/HANDLE_CLICK_CANCEL_APPROVAL_PROCESS";
const HANDLE_CLICK_VOID = "footer/HANDLE_CLICK_VOID";
const HANDLE_CLICK_APPROVED = "footer/HANDLE_CLICK_APPROVED";

const initialState = {
    mode: FOOTER_MODE.SEARCH,
    requiresHandleClick: {
        [FOOTER_ACTIONS.APPROVAL]: false, 
        [FOOTER_ACTIONS.SEND]: false,
        [FOOTER_ACTIONS.REJECT]: false,
        [FOOTER_ACTIONS.BACK]: false,
        [FOOTER_ACTIONS.CHECK_APPROVAL]: false,
        [FOOTER_ACTIONS.APPROVAL_ORDER]: false,
        [FOOTER_ACTIONS.FAST_TRACK]: false,
        [FOOTER_ACTIONS.CANCEL_APPROVAL_PROCESS]: false,
        [FOOTER_ACTIONS.VOID]: false,
        [FOOTER_ACTIONS.APPROVED]: false
    }
}

// Reducer
export default function reducer(state = initialState, action){
    switch(action.type){
        // CHANGE MODE
        case TO_MODE_INVISIBLE:
            return {
                ...state,
                mode: FOOTER_MODE.INVISIBLE
            }
        case TO_MODE_NONE:
            return {
                ...state,
                mode: FOOTER_MODE.NONE
            }
        case TO_MODE_SEARCH:
            return {
                ...state,
                mode: FOOTER_MODE.SEARCH
            }
        case TO_MODE_EDIT:
            return {
                ...state,
                mode: FOOTER_MODE.EDIT
            }
        case TO_MODE_OWN_DOCUMENT:
            return {
                ...state,
                mode: FOOTER_MODE.OWN_DOCUMENT
            }
        case TO_MODE_ADD_DRAFT:
            return {
                ...state,
                mode: FOOTER_MODE.ADD_DRAFT
            }
        case TO_MODE_AP_APPROVAL:
            return {
                ...state,
                mode: FOOTER_MODE.AP_APPROVAL
            }
        case TO_MODE_AP_CHECK_APPROVAL:
            return {
                ...state,
                mode: FOOTER_MODE.AP_CHECK_APPROVAL
            }
        case TO_MODE_AP_GOT_IT:
            return {
                ...state,
                mode: FOOTER_MODE.AP_GOT_IT
            }
        case TO_MODE_AP_CHECK_ORDER:
            return {
                ...state,
                mode: FOOTER_MODE.AP_CHECK_ORDER
            }
        case TO_MODE_AP_CHECK_MAINTENANCE:
            return {
                ...state,
                mode: FOOTER_MODE.AP_CHECK_MAINTENANCE
            }
        case TO_MODE_AP_GUARANTEE_MAINTENANCE:
            return {
                ...state,
                mode: FOOTER_MODE.AP_GUARANTEE_MAINTENANCE
            }
        case TO_MODE_AP_APPROVAL_END:
            return {
                ...state,
                mode: FOOTER_MODE.AP_APPROVAL_END
            }

        // CLICK
        case CLICK_APPROVAL:
            return {
                ...state,
                requiresHandleClick: {...state.requiresHandleClick, 
                                    [FOOTER_ACTIONS.APPROVAL]: true}
            }
        case CLICK_SEND:
            return {
                ...state,
                requiresHandleClick: {...state.requiresHandleClick, 
                                    [FOOTER_ACTIONS.SEND]: true}
            }
        case CLICK_SAVE:
            return {
                ...state,
                requiresHandleClick: {...state.requiresHandleClick, 
                                    [FOOTER_ACTIONS.SAVE]: true}
            }
        case CLICK_REJECT:
            return {
                ...state,
                requiresHandleClick: {...state.requiresHandleClick, 
                                    [FOOTER_ACTIONS.REJECT]: true}
            }
        case CLICK_BACK:
            return {
                ...state,
                requiresHandleClick: {...state.requiresHandleClick, 
                                    [FOOTER_ACTIONS.BACK]: true}
            }
        case CLICK_CHECK_APPROVAL:
            return {
                ...state,
                requiresHandleClick: {...state.requiresHandleClick, 
                                    [FOOTER_ACTIONS.CHECK_APPROVAL]: true}
            }
        case CLICK_APPROVAL_ORDER:
            return {
                ...state,
                requiresHandleClick: {...state.requiresHandleClick, 
                                    [FOOTER_ACTIONS.APPROVAL_ORDER]: true}
            }
        case CLICK_GOT_IT:
            return {
                ...state,
                requiresHandleClick: {...state.requiresHandleClick, 
                                    [FOOTER_ACTIONS.GOT_IT]: true}
            }
        case CLICK_FAST_TRACK:
            return {
                ...state,
                requiresHandleClick: {...state.requiresHandleClick, 
                                    [FOOTER_ACTIONS.FAST_TRACK]: true}
            }
        case CLICK_CANCEL_APPROVAL_PROCESS:
            return {
                ...state,
                requiresHandleClick: {...state.requiresHandleClick, 
                                    [FOOTER_ACTIONS.CANCEL_APPROVAL_PROCESS]: true}
            }
        case CLICK_VOID:
            return {
                ...state,
                requiresHandleClick: {...state.requiresHandleClick, 
                                    [FOOTER_ACTIONS.VOID]: true}
            }
        case CLICK_APPROVED:
            return {
                ...state,
                requiresHandleClick: {...state.requiresHandleClick, 
                                    [FOOTER_ACTIONS.APPROVED]: true}
            }

        // HANDLE CLICK
        case HANDLE_CLICK_APPROVAL:
            return {
                ...state,
                requiresHandleClick: {...state.requiresHandleClick, 
                                    [FOOTER_ACTIONS.APPROVAL]: false}
            }
        case HANDLE_CLICK_SEND:
            return {
                ...state,
                requiresHandleClick: {...state.requiresHandleClick, 
                                    [FOOTER_ACTIONS.SEND]: false}
            }
        case HANDLE_CLICK_SAVE:
            return {
                ...state,
                requiresHandleClick: {...state.requiresHandleClick, 
                                    [FOOTER_ACTIONS.SAVE]: false}
            }
        case HANDLE_CLICK_REJECT:
            return {
                ...state,
                requiresHandleClick: {...state.requiresHandleClick, 
                                    [FOOTER_ACTIONS.REJECT]: false}
            }
        case HANDLE_CLICK_BACK:
            return {
                ...state,
                requiresHandleClick: {...state.requiresHandleClick, 
                                    [FOOTER_ACTIONS.BACK]: false}
            }
        case HANDLE_CLICK_CHECK_APPROVAL:
            return {
                ...state,
                requiresHandleClick: {...state.requiresHandleClick, 
                                    [FOOTER_ACTIONS.CHECK_APPROVAL]: false}
            }
        case HANDLE_CLICK_APPROVAL_ORDER:
            return {
                ...state,
                requiresHandleClick: {...state.requiresHandleClick, 
                                    [FOOTER_ACTIONS.APPROVAL_ORDER]: false}
            }
        case HANDLE_CLICK_GOT_IT:
            return {
                ...state,
                requiresHandleClick: {...state.requiresHandleClick, 
                                    [FOOTER_ACTIONS.GOT_IT]: false}
            }
        case HANDLE_CLICK_FAST_TRACK:
            return {
                ...state,
                requiresHandleClick: {...state.requiresHandleClick, 
                                    [FOOTER_ACTIONS.FAST_TRACK]: false}
            }
        case HANDLE_CLICK_CANCEL_APPROVAL_PROCESS:
            return {
                ...state,
                requiresHandleClick: {...state.requiresHandleClick, 
                                    [FOOTER_ACTIONS.CANCEL_APPROVAL_PROCESS]: false}
            }
        case HANDLE_CLICK_VOID:
            return {
                ...state,
                requiresHandleClick: {...state.requiresHandleClick, 
                                    [FOOTER_ACTIONS.VOID]: false}
            }
        case HANDLE_CLICK_APPROVED:
            return {
                ...state,
                requiresHandleClick: {...state.requiresHandleClick, 
                                    [FOOTER_ACTIONS.APPROVED]: false}
            }
        
        default:
            return state;
    
    }
}


// Action Creators
export const footerToModeInvisible = makeActionCreator(TO_MODE_INVISIBLE);
export const footerToModeNone = makeActionCreator(TO_MODE_NONE);
export const footerToModeSearch = makeActionCreator(TO_MODE_SEARCH);
export const footerToModeEdit = makeActionCreator(TO_MODE_EDIT);
export const footerToModeOwnDocument = makeActionCreator(TO_MODE_OWN_DOCUMENT);
export const footerToModeAddDraft = makeActionCreator(TO_MODE_ADD_DRAFT);
export const footerToModeApApproval = makeActionCreator(TO_MODE_AP_APPROVAL);
export const footerToModeApCheckApproval = makeActionCreator(TO_MODE_AP_CHECK_APPROVAL);
export const footerToModeApGotIt = makeActionCreator(TO_MODE_AP_GOT_IT);
export const footerToModeApCheckOrder = makeActionCreator(TO_MODE_AP_CHECK_ORDER);
export const footerToModeApCheckMaintenance = makeActionCreator(TO_MODE_AP_CHECK_MAINTENANCE);
export const footerToModeApGuarnteeMaintenance = makeActionCreator(TO_MODE_AP_GUARANTEE_MAINTENANCE);
export const footerToModeApApprovalEnd = makeActionCreator(TO_MODE_AP_APPROVAL_END);

export const clickApproval = makeActionCreator(CLICK_APPROVAL);
export const clickSend = makeActionCreator(CLICK_SEND);
export const clickSave = makeActionCreator(CLICK_SAVE);
export const clickReject = makeActionCreator(CLICK_REJECT);
export const clickBack = makeActionCreator(CLICK_BACK);
export const clickCheckApproval = makeActionCreator(CLICK_CHECK_APPROVAL);
export const clickApprovalOrder = makeActionCreator(CLICK_APPROVAL_ORDER);
export const clickFastTrack = makeActionCreator(CLICK_FAST_TRACK);
export const clickCancleApprovalProcess = makeActionCreator(CLICK_CANCEL_APPROVAL_PROCESS);
export const clickVoid = makeActionCreator(CLICK_VOID);
export const clickApproved = makeActionCreator(CLICK_APPROVED);

export const handleFooterClickApproval = makeActionCreator(HANDLE_CLICK_APPROVAL);
export const handleFooterClickSend = makeActionCreator(HANDLE_CLICK_SEND);
export const handleFooterClickSave = makeActionCreator(HANDLE_CLICK_SAVE);
export const handleFooterClickReject = makeActionCreator(HANDLE_CLICK_REJECT);
export const handleFooterClickBack = makeActionCreator(HANDLE_CLICK_BACK);
export const handleFooterClickCheckApproval = makeActionCreator(HANDLE_CLICK_CHECK_APPROVAL);
export const handleFooterClickApprovalOrder = makeActionCreator(HANDLE_CLICK_APPROVAL_ORDER);
export const handleFooterClickFastTrack = makeActionCreator(HANDLE_CLICK_FAST_TRACK);
export const handleFooterClickApprovalProcess = makeActionCreator(HANDLE_CLICK_CANCEL_APPROVAL_PROCESS);
export const handleFooterClickVoid = makeActionCreator(HANDLE_CLICK_VOID);
export const handleFooterClickApproved = makeActionCreator(HANDLE_CLICK_APPROVED);

export const handleClickBackToSpareMain = () => {
    return (dispatch) => {
        dispatch(handleFooterClickBack());
        history.push('/main-spare');
    };
}

export const ACTION_TO_HANDLE_CLICK = {
    [FOOTER_ACTIONS.SAVE]: handleFooterClickSave,
    [FOOTER_ACTIONS.SEND]: handleFooterClickSend,
}