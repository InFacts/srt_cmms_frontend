import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import {
    toModeSearch, handleClickAdd, handleClickHomeToSpareMain,
    handleClickForward, handleClickBackward, handleClickRefresh, TOOLBAR_MODE, TOOLBAR_ACTIONS
} from '../redux/modules/toolbar.js';
import { FOOTER_MODE, FOOTER_ACTIONS, handleClickBackToSpareMain, ACTION_TO_HANDLE_CLICK, footerToModeInvisible, footerToModeNone, footerToModeSearch, footerToModeEdit, footerToModeOwnDocument, footerToModeAddDraft, footerToModeApApproval, footerToModeApCheckApproval, footerToModeApGotIt, footerToModeApCheckOrder, footerToModeApCheckMaintenance, footerToModeApGuarnteeMaintenance, footerToModeVoid, footerToModeFastTrack, footerToModeApApprovalDone, footerToModeSave } from '../redux/modules/footer.js';
import { useDispatch, useSelector } from 'react-redux';
import useTokenInitializer from '../hooks/token-initializer';
import { useFormikContext } from 'formik';
import { cancelApproval, startDocumentApprovalFlow, APPROVAL_STATUS, DOCUMENT_TYPE_ID, saveDocument, editDocument, packDataFromValuesMasterDataForEdit, packDataFromValues, fetchLatestStepApprovalDocumentData, getUserIDFromEmployeeID, DOCUMENT_STATUS, DOCUMENT_STATUS_ID, APPROVAL_STEP_ACTION, checkDocumentStatus, approveDocument, fetchStepApprovalDocumentData, saveMasterData, editMasterDataHelper } from '../helper';
import { FACTS } from '../redux/modules/api/fact';
import { navBottomOnReady, navBottomError, navBottomSuccess, navBottomSending } from '../redux/modules/nav-bottom'
import history from '../history';

const spacialPage = {
    ITEM_MASTER_DATA: "/spare-item-master-data",
    WAREHOUSE: "/spare-warehouse",
    PMT_EQUIPMENT_MASTER: "/pmt-equipment-master",
    PMT_CREATE_CHECKOUT: "/pmt-create-checklist",
    PMT_ALL_CHECKLIST_FIXED_ASSET: "/pmt-all-checklist-fixed-asset"
}
function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function getRouteLocation() {
    return history.location.pathname;
}


const useFooterInitializer = (document_type_id) => {
    const dispatch = useDispatch();
    const toolbar = useSelector((state) => ({ ...state.toolbar }));
    const user_id = useSelector((state) => ({ ...state.token.decoded_token }));
    const footer = useSelector((state) => ({ ...state.footer }));
    const fact = useSelector((state) => ({ ...state.api.fact }));
    const nav_bottom_status = useSelector((state) => ({ ...state.nav_bottom_status }));

    const { values, touched, setFieldTouched, setTouched, resetForm, validateForm, setFieldValue, setErrors } = useFormikContext();
    useTokenInitializer();

    // Handle Document Status TODO: move it out of footer!!
    const hadleDocumentStatusWithFooter = (document_id) => {
        let userInfo = {
            id: user_id.id, // TEST: User ID
            position_id: user_id.has_position[0].position_id,
            has_positions: user_id.has_position,
        };
        let document_status = values.status_name_th; // TEST: values.status_name_th
        console.log("document_status", document_status)
        console.log("document_status values", values)
        let created_by_admin_employee_id = getUserIDFromEmployeeID(fact[FACTS.USERS], values.created_by_admin_employee_id); // TEST: values.created_by_admin_employee_id;

        // Check That user who create document?
        if (userInfo.id === created_by_admin_employee_id) {
            console.log("hadleDocumentStatusWithFooter", document_status)
            if (document_status === DOCUMENT_STATUS.DRAFT) { dispatch(footerToModeAddDraft()); }
            else if (document_status === DOCUMENT_STATUS.WAIT_APPROVE) { dispatch(footerToModeOwnDocument()); }
            else if (document_status === DOCUMENT_STATUS.APPROVE_DONE) { dispatch(footerToModeApApprovalDone()); }
            else if (document_status === DOCUMENT_STATUS.VOID) { dispatch(footerToModeVoid()); }
            else if (document_status === DOCUMENT_STATUS.REOPEN) { dispatch(footerToModeEdit()); }
            else if (document_status === DOCUMENT_STATUS.FAST_TRACK) { dispatch(footerToModeFastTrack()); }
            else {
                if (toolbar.mode === TOOLBAR_MODE.SEARCH) { dispatch(footerToModeSearch()); }
                else { dispatch(footerToModeAddDraft()); }
            }
        }
        else {
            // Check Next Approver from postion_id
            console.log("fetchLatestStepApprovalDocumentData")
            fetchLatestStepApprovalDocumentData(document_id).then((latestApprovalInfo) => {
                if ((latestApprovalInfo !== undefined || latestApprovalInfo.length !== 0) && document_status === DOCUMENT_STATUS.WAIT_APPROVE) {
                    console.log("latestApprovalInfo------> ", latestApprovalInfo)
                    console.log("user------> ", latestApprovalInfo.position_id, userInfo.position_id)
                    console.log("approval_step_action_id------> ", latestApprovalInfo.approval_step_action_id, APPROVAL_STEP_ACTION.APPROVAL)
                    if (latestApprovalInfo.position_id === userInfo.position_id) {
                        if (latestApprovalInfo.approval_step_action_id === APPROVAL_STEP_ACTION.CHECK_APPROVAL) { dispatch(footerToModeApApproval()); }
                        else if (latestApprovalInfo.approval_step_action_id === APPROVAL_STEP_ACTION.APPROVAL) { dispatch(footerToModeApCheckApproval()); }
                        else if (latestApprovalInfo.approval_step_action_id === APPROVAL_STEP_ACTION.GOT_IT) { dispatch(footerToModeApGotIt()); }
                        else if (latestApprovalInfo.approval_step_action_id === APPROVAL_STEP_ACTION.CHECK_ORDER) { dispatch(footerToModeApCheckOrder()); }
                        else if (latestApprovalInfo.approval_step_action_id === APPROVAL_STEP_ACTION.CHECK_MAINTENANCE) { dispatch(footerToModeApCheckMaintenance()); }
                        else if (latestApprovalInfo.approval_step_action_id === APPROVAL_STEP_ACTION.GUARANTEE_MAINTENANCE) { dispatch(footerToModeApGuarnteeMaintenance()); }
                    }
                    else { // Everyone for Search mode
                        if (document_type_id === DOCUMENT_TYPE_ID.WORK_ORDER_PM && toolbar.mode === TOOLBAR_MODE.SEARCH && document_status === DOCUMENT_STATUS.DRAFT) {
                            dispatch(footerToModeAddDraft());
                        } else {
                            dispatch(footerToModeSearch());
                        }
                    }
                }
                else { // Just Work order PM
                    if (toolbar.mode === TOOLBAR_MODE.ADD) { dispatch(footerToModeAddDraft()); }
                    else {
                        if (document_type_id === DOCUMENT_TYPE_ID.WORK_ORDER_PM && toolbar.mode === TOOLBAR_MODE.SEARCH) {
                            dispatch(footerToModeAddDraft());
                        } else {
                            dispatch(footerToModeSearch());
                        }
                    }
                }
            })


        }
    }

    // Handle Toolbar Mode
    useEffect(() => {
        let document_id = values.document_id;
        console.log("document_id", document_id)
        let routeLocation = getRouteLocation();
        if (routeLocation === spacialPage.ITEM_MASTER_DATA || routeLocation === spacialPage.WAREHOUSE || routeLocation === spacialPage.PMT_EQUIPMENT_MASTER || routeLocation === spacialPage.PMT_CREATE_CHECKOUT) {
            if (toolbar.mode === TOOLBAR_MODE.SEARCH) {
                // TODO: Check is_Admin
                if (values.active !== undefined && values.active !== "" && values.modeEdit === true) { dispatch(footerToModeSave()); }
                else { dispatch(footerToModeSearch()); }
            }
            else if (toolbar.mode === TOOLBAR_MODE.ADD) {
                dispatch(footerToModeSave());
            }
        } else if (routeLocation === spacialPage.PMT_ALL_CHECKLIST_FIXED_ASSET) {
            dispatch(footerToModeSave());
        } else {
            // In General
            if (document_id !== undefined) {
                if (toolbar.mode === TOOLBAR_MODE.SEARCH && document_id !== "") { // SEARCH mode
                    dispatch(footerToModeSearch());
                    hadleDocumentStatusWithFooter(document_id);
                }
                else if (toolbar.mode === TOOLBAR_MODE.ADD) { // ADD_DRAFT mode
                    dispatch(footerToModeAddDraft());
                    hadleDocumentStatusWithFooter(document_id);

                }
                else { dispatch(footerToModeSearch()); }
            }
            else {
                if (toolbar.mode !== TOOLBAR_MODE.SEARCH) { dispatch(footerToModeAddDraft()); }
                else { dispatch(footerToModeSearch()); }
            }

        }
    }, [toolbar.mode, values.warehouse_id, values.active, values.modeEdit, values.status_name_th, nav_bottom_status.mode]);

    // Handle Back
    useEffect(() => {
        // console.log("values", values)
        if (footer.requiresHandleClick[FOOTER_ACTIONS.BACK]) { dispatch(handleClickBackToSpareMain(getRouteLocation(), values.internal_document_id)); }
    }, [footer.requiresHandleClick[FOOTER_ACTIONS.BACK]]);

    const isObject = (obj) =>
        obj !== null && typeof obj === 'object';

    function setNestedObjectValues(
        object,
        value,
        visited = new WeakMap(),
        response = {}
    ) {
        for (let k of Object.keys(object)) {
            const val = object[k];
            if (isObject(val)) {
                if (!visited.get(val)) {
                    visited.set(val, true);
                    // In order to keep array values consistent for both dot path  and
                    // bracket syntax, we need to check if this is an array so that
                    // this will output  { friends: [true] } and not { friends: { "0": true } }
                    response[k] = Array.isArray(val) ? [] : {};
                    setNestedObjectValues(val, value, visited, response[k]);
                }
            } else {
                response[k] = value;
            }
        }

        return response;
    }
    // Handle Click Save
    useEffect(() => {
        if (footer.requiresHandleClick[FOOTER_ACTIONS.SAVE]) {
            validateForm()
                .then((err) => {
                    setTouched(setNestedObjectValues(values, true))
                    dispatch(navBottomSending('[API]', 'Sending ...', ''));
                    setErrors(err);
                    if (isEmpty(err)) {
                        if (values.document_id) { // If have document_id, no need to create new doc
                            let data = packDataFromValues(fact, values, document_type_id);
                            console.log("packDataFromValues === ", data)
                            editDocument(values.document_id, document_type_id, data, values.files)
                                .then((document_id) => {
                                    setFieldValue('document_id', values.document_id, true);
                                    dispatch(navBottomSuccess('[PUT]', 'Save Document Success', ''));
                                })
                                .catch((err) => {
                                    console.log("Submit Failed ", err.response);
                                    dispatch(navBottomError('[PUT]', 'Submit Failed', err));
                                })
                                .finally(() => { // Set that I already handled the Click
                                    console.log(" I submitted and i am now handling click")
                                    dispatch(ACTION_TO_HANDLE_CLICK[FOOTER_ACTIONS.SAVE]());
                                });
                        } else { // If not have document_id
                            let data = packDataFromValues(fact, values, document_type_id);
                            if (document_type_id !== DOCUMENT_TYPE_ID.WAREHOUSE_MASTER_DATA && document_type_id !== DOCUMENT_TYPE_ID.ITEM_MASTER_DATA
                                && document_type_id !== DOCUMENT_TYPE_ID.EQUIPMENT_MASTER_DATA && document_type_id !== DOCUMENT_TYPE_ID.CREATE_CHECKLIST_LINE_ITEM) {
                                saveDocument(document_type_id, data, values.files)
                                    .then((document_id) => {
                                        setFieldValue('document_id', document_id, true);
                                        dispatch(navBottomSuccess('[PUT]', 'Save Document Success', ''));
                                    })
                                    .catch((err) => {
                                        console.log("Submit Failed ", err.response);
                                        dispatch(navBottomError('[PUT]', 'Submit Failed', err));
                                    })
                                    .finally(() => { // Set that I already handled the Click
                                        console.log(" I submitted and i am now handling click")
                                        dispatch(ACTION_TO_HANDLE_CLICK[FOOTER_ACTIONS.SAVE]());
                                    });
                            } else {
                                if (values.modeEdit === true) {// Mode Edit Mater data
                                    let data = packDataFromValuesMasterDataForEdit(fact, values, document_type_id);
                                    editMasterDataHelper(document_type_id, data)
                                        .then(() => {
                                            dispatch(navBottomSuccess('[PUT]', 'Save Document Success', ''));
                                        })
                                        .catch((err) => {
                                            console.log("Submit Failed ", err.response);
                                            dispatch(navBottomError('[PUT]', 'Submit Failed', err));
                                        })
                                        .finally(() => { // Set that I already handled the Click
                                            console.log(" I submitted and i am now handling click")
                                        });
                                } else {// For POST MASTER DATA
                                    saveMasterData(document_type_id, data)
                                        .then(() => {
                                            dispatch(navBottomSuccess('[PUT]', 'Save Document Success', ''));
                                        })
                                        .catch((err) => {
                                            console.log("Submit Failed ", err.response);
                                            dispatch(navBottomError('[PUT]', 'Submit Failed', err));
                                        })
                                        .finally(() => { // Set that I already handled the Click
                                            console.log(" I submitted and i am now handling click")
                                        });
                                }
                            }
                        }
                    }
                })
                .catch((err) => {
                    console.log("err validate", err)
                })
        }
    }, [footer.requiresHandleClick[FOOTER_ACTIONS.SAVE]]);

    const postDocumentApprovalFlow = (document_id, data) => {
        startDocumentApprovalFlow(document_id)
            .then(() => {
                putDocument(document_id, document_type_id, data, values.files, DOCUMENT_STATUS_ID.WAIT_APPROVE, false);
                dispatch(navBottomSuccess('[PUT]', 'Submit Approval Flow Success', ''));
            })
            .catch((err) => {
                dispatch(navBottomError('[PUT] postDocumentApprovalFlow', 'Submit Approval Flow Failed', err));
            }).finally(() => {
                console.log(" I submitted ")
                fetchApprovalStep(document_id);
                dispatch(ACTION_TO_HANDLE_CLICK[FOOTER_ACTIONS.SEND]());
            });
    }

    const editDocumentAggregateAPI = (document_id, document_type_id, data, files, flag_create_approval_flow) => {
        editDocument(document_id, document_type_id, data, files, flag_create_approval_flow)
            .then(() => {
                setFieldValue('document_id', document_id, true);
                if (flag_create_approval_flow) {
                    console.log("postDocumentApprovalFlow ...")
                    postDocumentApprovalFlow(document_id, data);
                }
            }).catch((err) => {
                console.warn("Submit Failed ", err);
                dispatch(navBottomError('[PUT] editDocumentAggregateAPI', 'Submit Failed', err));
            }).finally(() => { // Set that I already handled the Click
                dispatch(ACTION_TO_HANDLE_CLICK[FOOTER_ACTIONS.SEND]());
                fetchApprovalStep(values.document_id);
            });
    }

    const putDocument = (document_id, document_type_id, data, files, document_status_id, flag_create_approval_flow) => {
        if (DOCUMENT_STATUS_ID.WAIT_APPROVE === document_status_id && values.status_name_th !== DOCUMENT_STATUS.REOPEN) {
            // setFieldValue('status_name_th', DOCUMENT_STATUS.WAIT_APPROVE, true);
            fetchLatestStepApprovalDocumentData(document_id).then((latestApprovalInfo) => {
                if (latestApprovalInfo.position === undefined) {
                    data.document.document_status_id = DOCUMENT_STATUS_ID.APPROVE_DONE;
                }
                editDocumentAggregateAPI(document_id, document_type_id, data, files, flag_create_approval_flow)
            });
        }
        else {
            editDocumentAggregateAPI(document_id, document_type_id, data, files, flag_create_approval_flow)
        }
    }

    const fetchApprovalStep = (document_id) => {
        fetchStepApprovalDocumentData(document_id).then((result) => {
            setFieldValue("step_approve", result.approval_step === undefined ? [] : result.approval_step, false);
            if (result.is_canceled) {
                setFieldValue("document_is_canceled", result.is_canceled.data, false);
            }
        });
    }

    // Handle Click Send Document & Create Approval Process
    useEffect(() => {
        if (footer.requiresHandleClick[FOOTER_ACTIONS.SEND]) {
            // Move Dispatch to `finally` in the async functions
            validateForm().then((err) => {
                setTouched(setNestedObjectValues(values, true))
                dispatch(navBottomSending('[API]', 'Sending ...', ''));
                setErrors(err);
                let data = packDataFromValues(fact, values, document_type_id);
                if (isEmpty(err)) {
                    if (values.document_id) { // Case If you ever saved document and then you SEND document. (If have document_id, no need to create new doc)
                        if (values.status_name_th === DOCUMENT_STATUS.REOPEN) {
                            data.document.document_status_id = DOCUMENT_STATUS_ID.WAIT_APPROVE;
                            putDocument(values.document_id, document_type_id, data, values.files, data.document.document_status_id, true);
                        }
                        else {
                            data.document.document_status_id = DOCUMENT_STATUS_ID.WAIT_APPROVE;
                            putDocument(values.document_id, document_type_id, data, values.files, DOCUMENT_STATUS_ID.DRAFT, true);
                        }
                        setFieldValue('status_name_th', DOCUMENT_STATUS.WAIT_APPROVE, true);
                    }
                    else { // Case If you never saved document, but you want to SEND document
                        data.document.document_status_id = DOCUMENT_STATUS_ID.WAIT_APPROVE;
                        saveDocument(document_type_id, data, values.files, true)
                            .then((document_id) => {
                                setFieldValue('document_id', document_id, true);
                                dispatch(navBottomSuccess('[PUT]', 'Save Document Success', ''));
                                postDocumentApprovalFlow(document_id, data);
                            }).catch((err) => {
                                console.warn("Submit Failed", err.response);
                                dispatch(navBottomError('[PUT] saveDocument', 'Submit Failed', err));
                            }).finally(() => { // Set that I already handled the Click
                                dispatch(ACTION_TO_HANDLE_CLICK[FOOTER_ACTIONS.SEND]());
                            });
                    }
                }
                else {
                    dispatch(navBottomError('[PUT] validateForm', 'Submit Failed', err));
                    dispatch(ACTION_TO_HANDLE_CLICK[FOOTER_ACTIONS.SEND]());
                }
            }).catch((err) => {
                console.warn("Validate Failed ", err);
                dispatch(navBottomError('[PUT]', 'Do not have document', err));
                dispatch(ACTION_TO_HANDLE_CLICK[FOOTER_ACTIONS.SEND]());
            })
        }
    }, [footer.requiresHandleClick[FOOTER_ACTIONS.SEND]]);

    const clearFooterAction = () => {
        if (footer.requiresHandleClick[FOOTER_ACTIONS.APPROVAL]) { dispatch(ACTION_TO_HANDLE_CLICK[FOOTER_ACTIONS.APPROVAL]()); }
        else if (footer.requiresHandleClick[FOOTER_ACTIONS.CHECK_APPROVAL]) { dispatch(ACTION_TO_HANDLE_CLICK[FOOTER_ACTIONS.CHECK_APPROVAL]()); }
        else if (footer.requiresHandleClick[FOOTER_ACTIONS.APPROVAL_ORDER]) { dispatch(ACTION_TO_HANDLE_CLICK[FOOTER_ACTIONS.APPROVAL_ORDER]()); }
        else if (footer.requiresHandleClick[FOOTER_ACTIONS.GOT_IT]) { dispatch(ACTION_TO_HANDLE_CLICK[FOOTER_ACTIONS.GOT_IT]()); }
        else if (footer.requiresHandleClick[FOOTER_ACTIONS.FAST_TRACK]) { dispatch(ACTION_TO_HANDLE_CLICK[FOOTER_ACTIONS.FAST_TRACK]()); }
        else if (footer.requiresHandleClick[FOOTER_ACTIONS.REJECT]) { dispatch(ACTION_TO_HANDLE_CLICK[FOOTER_ACTIONS.REJECT]()); }
        else if (footer.requiresHandleClick[FOOTER_ACTIONS.REJECT]) { dispatch(ACTION_TO_HANDLE_CLICK[FOOTER_ACTIONS.CANCEL_APPROVAL_PROCESS]()); }
    }

    // Handle Click Approval
    useEffect(() => {
        if (footer.requiresHandleClick[FOOTER_ACTIONS.APPROVAL] || footer.requiresHandleClick[FOOTER_ACTIONS.CHECK_APPROVAL]
            || footer.requiresHandleClick[FOOTER_ACTIONS.APPROVAL_ORDER] || footer.requiresHandleClick[FOOTER_ACTIONS.GOT_IT]
            || footer.requiresHandleClick[FOOTER_ACTIONS.FAST_TRACK] || footer.requiresHandleClick[FOOTER_ACTIONS.REJECT]) {
            // console.log("I AM Handle APPROVAL", values);
            validateForm().then((err) => {
                dispatch(navBottomSending('[API]', 'Sending ...', ''));
                setErrors(err);
                if (isEmpty(err)) {
                    let data = packDataFromValues(fact, values, document_type_id);
                    let approval_status = APPROVAL_STATUS.APPROVED;
                    if (footer.requiresHandleClick[FOOTER_ACTIONS.REJECT]) {
                        data.document.document_status_id = DOCUMENT_STATUS_ID.REOPEN;
                        approval_status = APPROVAL_STATUS.REJECTED;
                    }
                    else {
                        data.document.document_status_id = DOCUMENT_STATUS_ID.WAIT_APPROVE;
                        approval_status = APPROVAL_STATUS.APPROVED;
                    }
                    if (values.document_id) { // Case If you ever saved document and then you SEND document. (If have document_id, no need to create new doc)]
                        console.log("valies.remark_approval", values.remark_approval)
                        let remark = values.remark_approval;
                        approveDocument(values.document_id, approval_status, user_id, remark).then(() => {
                            dispatch(navBottomSuccess('[PUT]', 'Submit Success', ''));
                            putDocument(values.document_id, document_type_id, data, null, data.document.document_status_id, false);
                            fetchApprovalStep(values.document_id);
                        })
                            .catch((err) => {
                                console.warn("Approve Document Failed ", err.response);
                                dispatch(navBottomError('[PUT] approveDocument', 'Approve Document Failed', err));
                            })
                            .finally(() => { // Set that I already handled the Click
                                console.log(" I submitted and i am now handling click")
                                clearFooterAction();
                            });
                    }
                    else { // Case If you never saved document, but you want to SEND document
                        dispatch(navBottomError('[PUT ]values.document_id', 'Do not have document', err));
                        clearFooterAction();
                    }
                }
                else {
                    console.warn("err", err);
                    if (toolbar.mode !== TOOLBAR_MODE.SEARCH && toolbar.mode !== TOOLBAR_MODE.NONE) { dispatch(navBottomError('[PUT] isEmpty', 'Error Validate Form', err)); }
                    else {
                        dispatch(navBottomOnReady('', '', ''));
                    }
                    clearFooterAction();
                }
            })
                .catch((err) => {
                    console.warn("Submit Failed ", err);
                    if (toolbar.mode !== TOOLBAR_MODE.SEARCH && toolbar.mode !== TOOLBAR_MODE.NONE) {
                        dispatch(navBottomError('[PUT] validateForm', 'Error Validate Form', err));
                    }
                    else if (toolbar.mode === TOOLBAR_MODE.SEARCH && (values.status_name_th === DOCUMENT_STATUS.REOPEN || values.status_name_th === DOCUMENT_STATUS.WAIT_APPROVE)) {
                        dispatch(navBottomError('[PUT] validateForm', 'Error Validate Form', err));
                    }
                    clearFooterAction();
                })
        }
    }, [footer.requiresHandleClick[FOOTER_ACTIONS.APPROVAL], footer.requiresHandleClick[FOOTER_ACTIONS.CHECK_APPROVAL],
    footer.requiresHandleClick[FOOTER_ACTIONS.APPROVAL_ORDER], footer.requiresHandleClick[FOOTER_ACTIONS.GOT_IT],
    footer.requiresHandleClick[FOOTER_ACTIONS.FAST_TRACK], footer.requiresHandleClick[FOOTER_ACTIONS.REJECT]]);

    // Handle Click CANCEL_APPROVAL_PROCESS
    useEffect(() => {
        if (footer.requiresHandleClick[FOOTER_ACTIONS.CANCEL_APPROVAL_PROCESS]) {
            console.log("CANCEL_APPROVAL_PROCESS")
            validateForm().then((err) => {
                dispatch(navBottomSending('[API]', 'Sending ...', ''));
                setErrors(err);
                if (isEmpty(err)) {
                    let data = packDataFromValues(fact, values, document_type_id);
                    data.document.document_status_id = DOCUMENT_STATUS_ID.REOPEN;
                    if (values.document_id) { // Case If you ever saved document and then you SEND document. (If have document_id, no need to create new doc)
                        cancelApproval(values.document_id, values.step_approve[0].approval_process_id).then(() => {
                            dispatch(navBottomSuccess('[PUT]', 'Canceled Success', ''));
                            putDocument(values.document_id, document_type_id, data, null, DOCUMENT_STATUS_ID.REOPEN, false);
                            setFieldValue('status_name_th', DOCUMENT_STATUS.REOPEN, true);
                        })
                            .catch((err) => {
                                console.warn("Canceled Approval Process Failed ", err.response);
                                dispatch(navBottomError('[PUT]', 'Canceled Document Failed', err));
                            })
                            .finally(() => { // Set that I already handled the Click
                                console.log(" I submitted and i am now handling click")
                                fetchApprovalStep(values.document_id);
                                clearFooterAction();
                            });
                    }
                    else { // Case If you never saved document, but you want to SEND document
                        dispatch(navBottomError('[PUT ]values.document_id', 'Do not have document', err));
                        clearFooterAction();
                    }
                }
                else {
                    console.warn("err", err);
                    if (toolbar.mode !== TOOLBAR_MODE.SEARCH && toolbar.mode !== TOOLBAR_MODE.NONE) { dispatch(navBottomError('[PUT] isEmpty', 'Error Validate Form', err)); }
                    else {
                        dispatch(navBottomOnReady('', '', ''));
                    }
                    clearFooterAction();
                }
            })
                .catch((err) => {
                    console.warn("Submit Failed ", err);
                    if (toolbar.mode !== TOOLBAR_MODE.SEARCH && toolbar.mode !== TOOLBAR_MODE.NONE) {
                        dispatch(navBottomError('[PUT] validateForm', 'Error Validate Form', err));
                    }
                    else if (toolbar.mode === TOOLBAR_MODE.SEARCH && (values.status_name_th === DOCUMENT_STATUS.REOPEN || values.status_name_th === DOCUMENT_STATUS.WAIT_APPROVE)) {
                        dispatch(navBottomError('[PUT] validateForm', 'Error Validate Form', err));
                    }
                    clearFooterAction();
                })
        }
    }, [footer.requiresHandleClick[FOOTER_ACTIONS.CANCEL_APPROVAL_PROCESS],]);


    return;

}
export default useFooterInitializer;