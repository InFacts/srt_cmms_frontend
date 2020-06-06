import { useEffect } from 'react';
import {  toModeSearch, handleClickAdd, handleClickHomeToSpareMain,
    handleClickForward, handleClickBackward,handleClickRefresh, TOOLBAR_MODE,TOOLBAR_ACTIONS } from '../redux/modules/toolbar.js';
import { FOOTER_MODE, FOOTER_ACTIONS, handleClickBackToSpareMain, ACTION_TO_HANDLE_CLICK, footerToModeInvisible, footerToModeNone, footerToModeSearch, footerToModeEdit, footerToModeOwnDocument, footerToModeAddDraft, footerToModeApApproval, footerToModeApCheckApproval, footerToModeApGotIt, footerToModeApCheckOrder, footerToModeApCheckMaintenance, footerToModeApGuarnteeMaintenance, footerToModeVoid, footerToModeFastTrack, footerToModeApApprovalDone} from '../redux/modules/footer.js';
import { useDispatch, useSelector  } from 'react-redux';
import useTokenInitializer from '../hooks/token-initializer';
import { useFormikContext} from 'formik';
import {startDocumentApprovalFlow, DOCUMENT_TYPE_ID, saveDocument, packDataFromValues, fetchLatestStepApprovalDocumentData, getUserIDFromEmployeeID, DOCUMENT_STATUS, APPROVAL_STEP_ACTION, checkDocumentStatus} from '../helper';
import { FACTS } from '../redux/modules/api/fact';

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

    const {values, submitForm, validateForm, setFieldValue, resetForm, setErrors} = useFormikContext();
    const token = useSelector((state) => ({...state.token}));
    useTokenInitializer();

    //Handle Document Status TODO: move it out of footer!!



    // Handle Toolbar Mode
    useEffect(() => {
        let document_id = values.document_id;
        let docuementStatus = checkDocumentStatus(values);
        setFieldValue("status_name_th", docuementStatus, false);
        // setFieldValue("document_action_type_id", docuementStatus, false);
        if (toolbar.mode === TOOLBAR_MODE.SEARCH && document_id !== "" && document_id !== undefined){
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
            if (userInfo.id === created_by_admin_employee_id) {
                // console.log("HI Check Who's create document", userInfo.id, created_by_admin_employee_id)
                if (document_status === DOCUMENT_STATUS.DRAFT) { dispatch(footerToModeAddDraft()); }
                else if (document_status === DOCUMENT_STATUS.WAIT_APPROVE) { dispatch(footerToModeOwnDocument()); }
                else if (document_status === DOCUMENT_STATUS.APPROVE_DONE) { dispatch(footerToModeApApprovalDone()); }
                else if (document_status === DOCUMENT_STATUS.VOID) { dispatch(footerToModeVoid()); }
                else if (document_status === DOCUMENT_STATUS.REOPEN) { dispatch(footerToModeEdit()); }
                else if (document_status === DOCUMENT_STATUS.FAST_TRACK) { dispatch(footerToModeFastTrack()); } 
                else { dispatch(footerToModeAddDraft()); }
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
                        // console.log("latestApprovalInfo------> ", latestApprovalInfo, APPROVAL_STEP_ACTION.CHECK_APPROVAL)
                        if (latestApprovalInfo.position_id !== userInfo.position_id) {
                            if (latestApprovalInfo.approval_step_action_id === APPROVAL_STEP_ACTION.CHECK_APPROVAL) {
                                dispatch(footerToModeApApproval());
                            }
                            else if (latestApprovalInfo.approval_step_action_id === APPROVAL_STEP_ACTION.APPROVAL) {
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
        }
        else if (toolbar.mode === TOOLBAR_MODE.ADD){
            // ADD_DRAFT mode
            dispatch(footerToModeAddDraft());
        }
        else {
            // INVISIBLE mode
            // dispatch(footerToModeInvisible());
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
            dispatch(ACTION_TO_HANDLE_CLICK[FOOTER_ACTIONS.SAVE]());
            validateForm()
            .then((err) => {
                console.log("THIS IS ErR I GET ", err)
                setErrors(err);
                if(isEmpty(err)){
                    let data = packDataFromValues(fact, values, document_type_id);
                    console.log("I AM SUBMITTING ", data );
                    saveDocument(document_type_id, data)
                    .then((document_id) => {
                        setFieldValue('document_id', document_id, false);
                        
                    })
                    .catch((err) => {
                        console.log("Submit Failed ", err);
                    })
                    .finally(() => { // Set that I already handled the Click
                        console.log(" I submitted and i am now handling click")
                        resetForm();
                    }); 
                }
            })
        }
    }, [footer.requiresHandleClick[FOOTER_ACTIONS.SAVE]]);

    // Handle Click Send To Approval Process
    useEffect(()=> {
        if (footer.requiresHandleClick[FOOTER_ACTIONS.SEND]){
            dispatch(ACTION_TO_HANDLE_CLICK[FOOTER_ACTIONS.SAVE]());
            validateForm()
            .then((err) => {
                setErrors(err);
                if(isEmpty(err)){
                    let data = packDataFromValues(fact, values, document_type_id);
                    console.log("I AM SUBMITTING ", data );
                    saveDocument(document_type_id, data)
                    .then((document_id) => {
                        setFieldValue('document_id', document_id, false);
                        startDocumentApprovalFlow(document_id)
                        .catch((err) => {
                            //         //TODO Do something if Submit Fails
                            console.log("Adding Approval Flow Failed ", err);
                        });
                    })
                    .catch((err) => {
                        console.log("Submit Failed ", err);
                    })
                    .finally(() => { // Set that I already handled the Click
                        console.log(" I submitted and i am now handling click")
                        resetForm();
                    }); 
                }
            })
            
        }
    }, [footer.requiresHandleClick[FOOTER_ACTIONS.SEND]]);

    return;
}
export default useFooterInitializer;