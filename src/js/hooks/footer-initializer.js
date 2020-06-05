import { useEffect } from 'react';
import {  toModeSearch, handleClickAdd, handleClickHomeToSpareMain,
    handleClickForward, handleClickBackward,handleClickRefresh, TOOLBAR_MODE,TOOLBAR_ACTIONS } from '../redux/modules/toolbar.js';
import { FOOTER_MODE, FOOTER_ACTIONS, handleClickBackToSpareMain, ACTION_TO_HANDLE_CLICK, footerToModeInvisible, footerToModeNone, footerToModeSearch, footerToModeEdit, footerToModeAddDraft, footerToModeApApproval, footerToModeApCheckApproval, footerToModeApGotIt, footerToModeApCheckOrder, footerToModeApCheckMaintenance, footerToModeApGuarnteeMaintenance} from '../redux/modules/footer.js';
import { useDispatch, useSelector  } from 'react-redux';
import useTokenInitializer from '../hooks/token-initializer';
import { useFormikContext} from 'formik';
import axios from "axios";

import { API_PORT_DATABASE } from '../config_port.js';
import { API_URL_DATABASE } from '../config_url.js';
import {startDocumentApprovalFlow, DOCUMENT_TYPE_ID, saveDocument, packDataFromValues, fetchStepApprovalDocumentData, fetchLatestStepApprovalDocumentData, fetchSearchDocumentData} from '../helper';

const useFooterInitializer = (document_type_id) => {
    const dispatch = useDispatch();
    const toolbar = useSelector((state) => ({...state.toolbar}));
    const state = useSelector((state) => ({...state}));
    
    const user = useSelector((state) => ({...state.token.decoded_token}));
    const footer = useSelector((state) => ({...state.footer}));
    const fact = useSelector((state) => ({...state.api.fact}));

    const {values, submitForm, setFieldValue} = useFormikContext();
    useTokenInitializer();

    // Handle Toolbar Mode
    useEffect(() => {
        // let url = window.location.search;
        // const urlParams = new URLSearchParams(url);
        // const internal_document_id = urlParams.get('internal_document_id');
        // const document_id = urlParams.get('document_id');

        // if (toolbar.mode === TOOLBAR_MODE.SEARCH){
        //     if (internal_document_id !== "") {
        //         // action_approval
        //         // GET APPROVAL STEP http://43.229.79.36:60013/approval/{document_id}/all
        //         // For Loop find "approval_step.approval_by" & "position_id" & "user_id" & Check "isCancel" & "approval_status_id"
                
        //         let userInfo = {
        //             id: "",
        //             level_id: "",
        //             postion: 3,
        //             has_positions: [], // abbreviation: "สสญ.นว.", name: "สารวัตรงานบำรุงรักษาอาณัติสัญญาณแขวงนครสวรรค์", position_group_id: 3, position_id: 33, warehouse_id: null
        //         };
                
        //         let track_document_id = 1
        //         let previousApprovalInfo = values.step_approve;
        //         let latestApprovalInfo = {}
        //         // Check if user_id matched == created_by_admin_id
        //         //      show => SEARCH, EDIT, ADD_DRAFT mode
        //         // Check Previous Approver 
                
        //         // Check Next Approver 
        //         fetchLatestStepApprovalDocumentData(track_document_id).then((result) => {
        //             console.log("result fetchLatestStepApprovalDocumentData", result);
        //             latestApprovalInfo = result
        //             previousApprovalInfo.approval_step.map(prevApprval => {
        //                 // if user_id matched & show approval_status => disable *NOTE: approval_by!=[]
        //                 //      show => AP_APPROVAL, AP_CHECK_APPROVAL, AP_GOT_IT, AP_CHECK_ORDER, AP_CHECK_MAINTENANCE, AP_GUARANTEE_MAINTENANCE mode
        //                 // else
        //                 //      if position_id matched. it can button enable (check Next approval)
        //                 //      else show => NONE mode
        //             })
        //             console.log("------>footerToModeApproval")
                    
        //         })

                
        //         dispatch(footerToModeApGotIt());
                
        //     }
        //     else {
        //         // Normal Search
        //         dispatch(footerToModeSearch());
        //     }
        // }
        // else if (toolbar.mode === TOOLBAR_MODE.ADD){
        //     dispatch(footerToModeAddDraft());
        // }
        // else {
        //     dispatch(footerToModeInvisible());
        // }
    }, [toolbar.mode]);

    // Handle Back
    useEffect(()=> {
        if (footer.requiresHandleClick[FOOTER_ACTIONS.BACK]){
            dispatch(handleClickBackToSpareMain()); // TODO Needs to have logic from URL ? or pass props?
        }
    }, [footer.requiresHandleClick[FOOTER_ACTIONS.BACK]]);


    // Handle Click Save
    useEffect(()=> {
        if (footer.requiresHandleClick[FOOTER_ACTIONS.SAVE]){
            // submitForm()
            // .catch((err) => {
            //     //TODO Do something if Submit Fails
            //     console.log("Submit Failed ", err);
            // })
            // .finally(() => { // Set that I already handled the Click
            //     console.log(" I submitted and i am now handling click")
            //     dispatch(ACTION_TO_HANDLE_CLICK[FOOTER_ACTIONS.SAVE]());
            // }); 
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
                dispatch(ACTION_TO_HANDLE_CLICK[FOOTER_ACTIONS.SAVE]());
            }); 
        }
    }, [footer.requiresHandleClick[FOOTER_ACTIONS.SAVE]]);

    // Handle Click Send To Approval Process
    useEffect(()=> {
        if (footer.requiresHandleClick[FOOTER_ACTIONS.SEND]){
            // submitForm()
            // .then((document_id) => {
            //     // After getting the document_id and PUTTING, needs to start the approval process
            //     setTimeout(startDocumentApprovalFlow(values.document_id) // HACK TO GET VALUE
            //     .catch((err) => {
            //         //TODO Do something if Submit Fails
            //         console.log("Adding Approval Flow Failed ", err);
            //     }), 20);                
            // }) 
            // .catch((err) => {
            //     //TODO Do something if Submit Fails
            //     console.log("Submit Failed ", err);
            // })
            // .finally(() => { // Set that I already handled the Click
            //     dispatch(ACTION_TO_HANDLE_CLICK[FOOTER_ACTIONS.SEND]());
            // }); 
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
                dispatch(ACTION_TO_HANDLE_CLICK[FOOTER_ACTIONS.SAVE]());
            }); 
        }
    }, [footer.requiresHandleClick[FOOTER_ACTIONS.SEND]]);

    return;
}
export default useFooterInitializer;