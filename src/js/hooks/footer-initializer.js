import { useEffect } from 'react';
import {  toModeSearch, handleClickAdd, handleClickHomeToSpareMain,
    handleClickForward, handleClickBackward,handleClickRefresh, TOOLBAR_MODE,TOOLBAR_ACTIONS } from '../redux/modules/toolbar.js';
import { FOOTER_MODE, FOOTER_ACTIONS, handleClickBackToSpareMain, ACTION_TO_HANDLE_CLICK, footerToModeInvisible, footerToModeNone, footerToModeSearch, footerToModeEdit, footerToModeOwnDocument, footerToModeAddDraft, footerToModeApApproval, footerToModeApCheckApproval, footerToModeApGotIt, footerToModeApCheckOrder, footerToModeApCheckMaintenance, footerToModeApGuarnteeMaintenance, footerToModeVoid, footerToModeFastTrack, footerToModeApApprovalDone} from '../redux/modules/footer.js';
import { useDispatch, useSelector  } from 'react-redux';
import useTokenInitializer from '../hooks/token-initializer';
import { useFormikContext} from 'formik';
import {startDocumentApprovalFlow, APPROVAL_STATUS, DOCUMENT_TYPE_ID, saveDocument, packDataFromValues, fetchLatestStepApprovalDocumentData, getUserIDFromEmployeeID, DOCUMENT_STATUS, APPROVAL_STEP_ACTION, checkDocumentStatus, approveDocument} from '../helper';
import { FACTS } from '../redux/modules/api/fact';
import {navBottomError, navBottomSuccess, navBottomSending } from '../redux/modules/nav-bottom'

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const useFooterInitializer = (document_type_id) => {
    const dispatch = useDispatch();
    const toolbar = useSelector((state) => ({...state.toolbar}));
    const user_id = useSelector((state) => ({...state.token.decoded_token}));
    const footer = useSelector((state) => ({...state.footer}));
    const fact = useSelector((state) => ({...state.api.fact}));

    const {values, submitForm, validateForm, setFieldValue, setErrors} = useFormikContext();
    useTokenInitializer();

    //Handle Document Status TODO: move it out of footer!!
    const hadleDocumentStatusWithFooter = (document_id) => {
        checkDocumentStatus(values).then(function(docuementStatus) {
            // console.log("HI document_status", docuementStatus, "toolbar>>", toolbar.mode)
            setFieldValue("status_name_th", docuementStatus, false);
            let userInfo = {
                id: user_id.id, // TEST: User ID
                position_id: user_id.has_position[0].position_id, 
                has_positions: user_id.has_position,
            };
            let track_document_id = document_id; // TEST: Track Document
            let previousApprovalInfo = values.step_approve; // Check Previous Approver 
            let document_status = docuementStatus; // TEST: values.status_name_th
            let created_by_admin_employee_id = getUserIDFromEmployeeID(fact[FACTS.USERS], values.created_by_admin_employee_id); // TEST: values.created_by_admin_employee_id;

            // Check That user who create document?
            console.log("userInfo.id", userInfo.id,"created_by_admin_employee_id", created_by_admin_employee_id)
            if (userInfo.id === created_by_admin_employee_id) {
                // console.log("HI Check Who's create document---->", document_status)
                if (document_status === DOCUMENT_STATUS.DRAFT) { dispatch(footerToModeAddDraft()); }
                else if (document_status === DOCUMENT_STATUS.WAIT_APPROVE) { dispatch(footerToModeOwnDocument()); }
                else if (document_status === DOCUMENT_STATUS.APPROVE_DONE) { dispatch(footerToModeApApprovalDone()); }
                else if (document_status === DOCUMENT_STATUS.VOID) { dispatch(footerToModeVoid()); }
                else if (document_status === DOCUMENT_STATUS.REOPEN) { dispatch(footerToModeEdit()); }
                else if (document_status === DOCUMENT_STATUS.FAST_TRACK) { dispatch(footerToModeFastTrack()); } 
                else { dispatch(footerToModeSearch()); }
            }
            else {
                // Check That user_id into Previous Approval Flow ?
                previousApprovalInfo.map(prevApprval => {
                    if (prevApprval.approval_by !== undefined || prevApprval.approval_by.length !== 0) {
                        prevApprval.approval_by.map(prevApprvalBy => {
                            if (userInfo.id === prevApprvalBy.user_id){
                                dispatch(footerToModeApApprovalDone());
                                return "";
                            }
                        });
                    }
                });

                // Check Next Approver from postion_id
                fetchLatestStepApprovalDocumentData(track_document_id).then((latestApprovalInfo) => {
                    if (latestApprovalInfo !== undefined || latestApprovalInfo.length !== 0) {
                        console.log("latestApprovalInfo------> ", latestApprovalInfo)
                        console.log("user------> ", latestApprovalInfo.position_id, userInfo.position_id)
                        console.log("approval_step_action_id------> ", latestApprovalInfo.approval_step_action_id, APPROVAL_STEP_ACTION.APPROVAL)
                        if (latestApprovalInfo.position_id === userInfo.position_id) {
                            console.log(" ------ APPROVALLLL------> ")
                            if (latestApprovalInfo.approval_step_action_id === APPROVAL_STEP_ACTION.CHECK_APPROVAL) {
                                dispatch(footerToModeApApproval());
                            }
                            else if (latestApprovalInfo.approval_step_action_id === APPROVAL_STEP_ACTION.APPROVAL) {
                                console.log(" ------ APPROVAL_STEP_ACTION.APPROVAL------> ")
                                dispatch(footerToModeApCheckApproval());
                            }
                            else if (latestApprovalInfo.approval_step_action_id === APPROVAL_STEP_ACTION.GOT_IT) {
                                dispatch(footerToModeApGotIt());
                            }
                            else if (latestApprovalInfo.approval_step_action_id === APPROVAL_STEP_ACTION.CHECK_ORDER) {
                                dispatch(footerToModeApCheckOrder());
                            }
                            else if (latestApprovalInfo.approval_step_action_id === APPROVAL_STEP_ACTION.CHECK_MAINTENANCE) {
                                dispatch(footerToModeApCheckMaintenance());
                            }
                            else if (latestApprovalInfo.approval_step_action_id === APPROVAL_STEP_ACTION.GUARANTEE_MAINTENANCE) {
                                dispatch(footerToModeApGuarnteeMaintenance());
                            }
                        }
                        else {
                            // Everyone for Search mode
                            dispatch(footerToModeSearch());
                        }
                    }
                    else { 
                        // Everyone for Search mode
                        dispatch(footerToModeSearch());
                    }
                })
            }
        });
    }

    // Handle Toolbar Mode
    useEffect(() => {
        let document_id = values.document_id;
        if (toolbar.mode === TOOLBAR_MODE.SEARCH && document_id !== "" && document_id !== undefined) {
            // SEARCH mode
            hadleDocumentStatusWithFooter(document_id);
        }
        else if (toolbar.mode === TOOLBAR_MODE.ADD){
            // ADD_DRAFT mode
            if ( document_id !== "" && document_id !== undefined) { hadleDocumentStatusWithFooter(document_id); }
            dispatch(footerToModeAddDraft());
        }
        else {
            // INVISIBLE mode
            dispatch(footerToModeSearch());
        }
    }, [toolbar.mode, values.document_id, values.step_approve, values.created_by_admin_employee_id]);

    // Handle Back
    useEffect(()=> {
        if (footer.requiresHandleClick[FOOTER_ACTIONS.BACK]){
            dispatch(handleClickBackToSpareMain()); // TODO Needs to have logic from URL ? or pass props?
        }
    }, [footer.requiresHandleClick[FOOTER_ACTIONS.BACK]]);


    // Handle Click Save
    useEffect(()=> {
        if (footer.requiresHandleClick[FOOTER_ACTIONS.SAVE]){
            validateForm()
            .then((err) => {
                console.log("THIS IS ErR I GET ", err)
                dispatch(navBottomSending('[API]', 'Sending ...', ''));
                setErrors(err);
                if(isEmpty(err)){
                    let data = packDataFromValues(fact, values, document_type_id);
                    console.log("I AM SUBMITTING ", data );
                    saveDocument(document_type_id, data)
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
                }
            })
        }
    }, [footer.requiresHandleClick[FOOTER_ACTIONS.SAVE]]);

    // Handle Click Send Document & Create Approval Process
    useEffect(()=> {
        if (footer.requiresHandleClick[FOOTER_ACTIONS.SEND]){
            // Move Dispatch to `finally` in the async functions
            // dispatch(ACTION_TO_HANDLE_CLICK[FOOTER_ACTIONS.SAVE]());

            validateForm()
            .then((err) => {
                dispatch(navBottomSending('[API]', 'Sending ...', ''));
                setErrors(err);
                if(isEmpty(err)){
                    if(values.document_id){ // If have document_id, no need to create new doc
                        startDocumentApprovalFlow(values.document_id)
                        .then(() => {
                            dispatch(navBottomSuccess('[PUT]', 'Started Approval Flow Success', ''));
                        })
                        .catch((err) => {
                            //         //TODO Do something if Submit Fails
                            console.warn("Adding Approval Flow Failed ", err.response);
                            dispatch(navBottomError('[PUT]', 'Adding Approval Flow Failed', err));
                        })
                        .finally(() => { // Set that I already handled the Click
                            console.log(" I submitted and i am now handling click")
                            dispatch(ACTION_TO_HANDLE_CLICK[FOOTER_ACTIONS.SEND]());
                        }); 
                    }else{ // If not have document_id
                        let data = packDataFromValues(fact, values, document_type_id);
                        console.log("I AM SUBMITTING ", data );
                        saveDocument(document_type_id, data)
                        .then((document_id) => {
                            setFieldValue('document_id', document_id, true);
                            startDocumentApprovalFlow(document_id)
                            .then(() => {
                                dispatch(navBottomSuccess('[PUT]', 'Submit Success', ''));
                            })
                            .catch((err) => {
                                //         //TODO Do something if Submit Fails
                                console.warn("Adding Approval Flow Failed ", err.response);
                                dispatch(navBottomError('[PUT]', 'Adding Approval Flow Failed', err));
                            })
                            .finally(() => { // Set that I already handled the Click
                                console.log(" I submitted and i am now handling click")
                                dispatch(ACTION_TO_HANDLE_CLICK[FOOTER_ACTIONS.SEND]());
                            }); 
                        })
                        .catch((err) => {
                            console.warn("Submit Failed ", err.response);
                            dispatch(navBottomError('[PUT]', 'Submit Failed', err));
                            dispatch(ACTION_TO_HANDLE_CLICK[FOOTER_ACTIONS.SEND]());
                        })
                        .finally(() => { // Set that I already handled the Click
                            console.log(" I submitted ")
                        }); 
                    }
                    
                }
            })
            .catch((err) => {
                console.log("NUK IN CATCH <<<<<<<<")
            })
        }
    }, [footer.requiresHandleClick[FOOTER_ACTIONS.SEND]]);

    // Handle Click Approval
    useEffect(()=> {
        console.log("I AM Handle APPROVAL", values );
        if (footer.requiresHandleClick[FOOTER_ACTIONS.APPROVAL]){
            validateForm()
            .then((err) => {
                dispatch(navBottomSending('[API]', 'Sending ...', ''));
                setErrors(err);
                if(isEmpty(err)){
                    let data = packDataFromValues(fact, values, document_type_id);
                    console.log("I AM SUBMITTING ", data );
                    if(values.document_id){ // If have document_id, no need to create new doc
                        console.log("If have document_id", values);
                        let remark = "demo body";
                        approveDocument(values.document_id, APPROVAL_STATUS.APPROVED, user_id, remark)
                            .then(() => {
                                dispatch(navBottomSuccess('[PUT]', 'Submit Success', ''));
                            })
                            .catch((err) => {
                                console.warn("Approve Document Failed ", err.response);
                                dispatch(navBottomError('[PUT]', 'Approve Document Failed', err));
                            })
                            .finally(() => { // Set that I already handled the Click
                                console.log(" I submitted and i am now handling click")
                                dispatch(ACTION_TO_HANDLE_CLICK[FOOTER_ACTIONS.APPROVAL]());
                            });
                    }
                    else { // If not have document_id
                        console.log("If not have document_id" );
                    }
                }
                else {
                    console.warn("isEmpty(err) ", err);
                }
            })
            .catch((err) => {
                console.warn("Validate Failed ", err);
                console.warn("Submit Failed ", err.response);
            })
        }
    }, [footer.requiresHandleClick[FOOTER_ACTIONS.APPROVAL]]);

    // Handle Click Check Approval
    useEffect(()=> {
        if (footer.requiresHandleClick[FOOTER_ACTIONS.CHECK_APPROVAL]){
            validateForm()
            .then((err) => {
                console.log("values", values)
                dispatch(navBottomSending('[API]', 'Sending ...', ''));
                setErrors(err);
                if(isEmpty(err)){
                    let data = packDataFromValues(fact, values, document_type_id);
                    if(values.document_id){ // If have document_id, no need to create new doc
                        let remark = "demo body";
                        approveDocument(values.document_id, APPROVAL_STATUS.APPROVED, user_id, remark)
                            .then(() => {
                                dispatch(navBottomSuccess('[PUT]', 'Submit Success', ''));
                            })
                            .catch((err) => {
                                console.warn("Approve Document Failed ", err.response);
                                dispatch(navBottomError('[PUT]', 'Approve Document Failed', err));
                            })
                            .finally(() => { // Set that I already handled the Click
                                console.log(" I submitted and i am now handling click")
                                dispatch(ACTION_TO_HANDLE_CLICK[FOOTER_ACTIONS.CHECK_APPROVAL]());
                            });
                    }
                    else { // If not have document_id
                        console.log("If not have document_id" );
                    }
                }
                else {
                    console.warn("isEmpty(err) ", err);
                }
            })
            .catch((err) => {
                console.warn("Submit Failed ", err.response);
            })
        }
    }, [footer.requiresHandleClick[FOOTER_ACTIONS.CHECK_APPROVAL]]);


    // Handle Click Check Approval Order
    useEffect(()=> {
        if (footer.requiresHandleClick[FOOTER_ACTIONS.APPROVAL_ORDER]){
            validateForm()
            .then((err) => {
                dispatch(navBottomSending('[API]', 'Sending ...', ''));
                setErrors(err);
                if(isEmpty(err)){
                    let data = packDataFromValues(fact, values, document_type_id);
                    if(values.document_id){ // If have document_id, no need to create new doc
                        let remark = "demo body";
                        approveDocument(values.document_id, APPROVAL_STATUS.APPROVED, user_id, remark)
                            .then(() => {
                                dispatch(navBottomSuccess('[PUT]', 'Submit Success', ''));
                            })
                            .catch((err) => {
                                console.warn("Approve Document Failed ", err.response);
                                dispatch(navBottomError('[PUT]', 'Approve Document Failed', err));
                            })
                            .finally(() => { // Set that I already handled the Click
                                console.log(" I submitted and i am now handling click")
                                dispatch(ACTION_TO_HANDLE_CLICK[FOOTER_ACTIONS.APPROVAL_ORDER]());
                            });
                    }
                    else { // If not have document_id
                        console.log("If not have document_id" );
                    }
                }
                else {
                    console.warn("isEmpty(err) ", err);
                }
            })
            .catch((err) => {
                console.warn("Submit Failed ", err.response);
            })
        }
    }, [footer.requiresHandleClick[FOOTER_ACTIONS.APPROVAL_ORDER]]);


    // Handle Click GOT_IT
    useEffect(()=> {
        if (footer.requiresHandleClick[FOOTER_ACTIONS.GOT_IT]){
            validateForm()
            .then((err) => {
                dispatch(navBottomSending('[API]', 'Sending ...', ''));
                setErrors(err);
                if(isEmpty(err)){
                    let data = packDataFromValues(fact, values, document_type_id);
                    if(values.document_id){ // If have document_id, no need to create new doc
                        let remark = "demo body";
                        approveDocument(values.document_id, APPROVAL_STATUS.APPROVED, user_id, remark)
                            .then(() => {
                                dispatch(navBottomSuccess('[PUT]', 'Submit Success', ''));
                            })
                            .catch((err) => {
                                console.warn("Approve Document Failed ", err.response);
                                dispatch(navBottomError('[PUT]', 'Approve Document Failed', err));
                            })
                            .finally(() => { // Set that I already handled the Click
                                console.log(" I submitted and i am now handling click")
                                dispatch(ACTION_TO_HANDLE_CLICK[FOOTER_ACTIONS.GOT_IT]());
                            });
                    }
                    else { // If not have document_id
                        console.log("If not have document_id" );
                    }
                }
                else {
                    console.warn("isEmpty(err) ", err);
                }
            })
            .catch((err) => {
                console.warn("Submit Failed ", err.response);
            })
        }
    }, [footer.requiresHandleClick[FOOTER_ACTIONS.GOT_IT]]);

    // Handle Click FAST_TRACK
    useEffect(()=> {
        if (footer.requiresHandleClick[FOOTER_ACTIONS.FAST_TRACK]){
            validateForm()
            .then((err) => {
                dispatch(navBottomSending('[API]', 'Sending ...', ''));
                setErrors(err);
                if(isEmpty(err)){
                    let data = packDataFromValues(fact, values, document_type_id);
                    if(values.document_id){ // If have document_id, no need to create new doc
                        let remark = "demo body";
                        approveDocument(values.document_id, APPROVAL_STATUS.FAST_TRACKED, user_id, remark)
                            .then(() => {
                                dispatch(navBottomSuccess('[PUT]', 'Submit Success', ''));
                            })
                            .catch((err) => {
                                console.warn("Approve Document Failed ", err.response);
                                dispatch(navBottomError('[PUT]', 'Approve Document Failed', err));
                            })
                            .finally(() => { // Set that I already handled the Click
                                console.log(" I submitted and i am now handling click")
                                dispatch(ACTION_TO_HANDLE_CLICK[FOOTER_ACTIONS.FAST_TRACK]());
                            });
                    }
                    else { // If not have document_id
                        console.log("If not have document_id" );
                    }
                }
                else {
                    console.warn("isEmpty(err) ", err);
                }
            })
            .catch((err) => {
                console.warn("Submit Failed ", err.response);
            })
        }
    }, [footer.requiresHandleClick[FOOTER_ACTIONS.FAST_TRACK]]);

    // Handle Click REJECT
    useEffect(()=> {
        if (footer.requiresHandleClick[FOOTER_ACTIONS.REJECT]){
            validateForm()
            .then((err) => {
                dispatch(navBottomSending('[API]', 'Sending ...', ''));
                setErrors(err);
                if(isEmpty(err)){
                    let data = packDataFromValues(fact, values, document_type_id);
                    if(values.document_id){ // If have document_id, no need to create new doc
                        let remark = "demo body";
                        approveDocument(values.document_id, APPROVAL_STATUS.REJECTED, user_id, remark)
                            .then(() => {
                                dispatch(navBottomSuccess('[PUT]', 'Submit Success', ''));
                            })
                            .catch((err) => {
                                console.warn("Approve Document Failed ", err.response);
                                dispatch(navBottomError('[PUT]', 'Approve Document Failed', err));
                            })
                            .finally(() => { // Set that I already handled the Click
                                console.log(" I submitted and i am now handling click")
                                dispatch(ACTION_TO_HANDLE_CLICK[FOOTER_ACTIONS.REJECT]());
                            });
                    }
                    else { // If not have document_id
                        console.log("If not have document_id" );
                    }
                }
                else {
                    console.warn("isEmpty(err) ", err);
                }
            })
            .catch((err) => {
                console.warn("Submit Failed ", err.response);
            })
        }
    }, [footer.requiresHandleClick[FOOTER_ACTIONS.REJECT]]);

    return;
    
}
export default useFooterInitializer;