import { useEffect } from 'react';
import {  toModeSearch, handleClickAdd, handleClickHomeToSpareMain,
    handleClickForward, handleClickBackward,handleClickRefresh, TOOLBAR_MODE,TOOLBAR_ACTIONS } from '../redux/modules/toolbar.js';
import { FOOTER_MODE, FOOTER_ACTIONS, footerToModeSearch, footerToModeAddDraft, handleClickBackToSpareMain, ACTION_TO_HANDLE_CLICK, footerToModeInvisible} from '../redux/modules/footer.js';
import { useDispatch, useSelector  } from 'react-redux';
import useTokenInitializer from '../hooks/token-initializer';
import { useFormikContext} from 'formik';
import axios from "axios";

import { API_PORT_DATABASE } from '../config_port.js';
import { API_URL_DATABASE } from '../config_url.js';
import {startDocumentApprovalFlow} from '../helper';

const useFooterInitializer = () => {
    const dispatch = useDispatch();
    const toolbar = useSelector((state) => ({...state.toolbar}));
    const user = useSelector((state) => ({...state.token.decoded_token}));
    const footer = useSelector((state) => ({...state.footer}));

    const {values, submitForm} = useFormikContext();
    useTokenInitializer();

    // Handle Toolbar Mode
    useEffect(() => {
        let url = window.location.search;
        const urlParams = new URLSearchParams(url);
        const internal_document_id = urlParams.get('internal_document_id');
        const document_id = urlParams.get('document_id');

        if (toolbar.mode === TOOLBAR_MODE.SEARCH){
            dispatch(footerToModeSearch());
        }
        else if (toolbar.mode === TOOLBAR_MODE.ADD){
            dispatch(footerToModeAddDraft());
        }
        else if (internal_document_id !== "") {
            // action_approval
            // GET APPROVAL STEP http://43.229.79.36:60013/approval/{document_id}/all
            // For Loop find "approval_step.approval_by" & "position_id" & "user_id" & Check "isCancel" & "approval_status_id"
            let userID = 0;
            let approvalStatusID = 0;
            let userHasPosition = [];
            // GET Infomation of user
            // TODO if Fact. it has user_id, position_id, warehouse_id, position_group, level_id, has_positions. You can remove API /user/profile
            axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/user/profile`, { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((resUser) => {
                userID = resUser.data.user_id;
                const userLevelID = resUser.data.level_id;
                userHasPosition = resUser.data.has_positions;// abbreviation: "สสญ.นว.", name: "สารวัตรงานบำรุงรักษาอาณัติสัญญาณแขวงนครสวรรค์", position_group_id: 3, position_id: 33, warehouse_id: null
                axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/approval/${document_id}/all`, { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
                    // console.log("DONUT TEST", res.data.results, userHasPosition)
                    // Check Previous Approver 
                    let approvalFlowBy = res.data.results;
                    approvalFlowBy[0].approval_step.map(approvalStep => {
                        console.log("approvalStep", approvalStep)
                        if (approvalStep.is_cancel === 0 || approvalStep.is_cancel === undefined) {
                            if (approvalStep.approval_by.user_id === userID) {
                                approvalStatusID = approvalStep.approval_status_id;
                                console.log("approvalStatusID", approvalStatusID)
                            }
                            else {
                                console.log("General User for view")
                            }
                        }
                    });
                    
                    // Check Next Approver
                    axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/approval/${document_id}/latest/step`, { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
                    // console.log("DONUT TEST", res.data.results, userHasPosition)
                    // Check Previous Approver 
                    let approvalFlowBy = res.data.results;
                    approvalFlowBy[0].approval_step.map(approvalStep => {
                        console.log("approvalStep", approvalStep)
                        if (approvalStep.is_cancel === 0 || approvalStep.is_cancel === undefined) {
                            if (approvalStep.approval_by.user_id === userID) {
                                approvalStatusID = approvalStep.approval_status_id;
                                console.log("approvalStatusID", approvalStatusID)
                            }
                            else {
                                console.log("General User for view")
                            }
                        }
                    });
                    
                    // Check Next Approver

                    

                }).catch(function (err) {
                    console.log(err)
                })

                    

                }).catch(function (err) {
                    console.log(err)
                })
            }).catch(function (err) {
                console.log(err)
            })
        }
        else {
            dispatch(footerToModeInvisible());
        }
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
            submitForm()
            .catch((err) => {
                //TODO Do something if Submit Fails
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
            submitForm()
            .then((document_id) => {
                // After getting the document_id and PUTTING, needs to start the approval process
                startDocumentApprovalFlow(document_id)
                .catch((err) => {
                    //TODO Do something if Submit Fails
                    console.log("Adding Approval Flow Failed ", err);
                })
            }) 
            .catch((err) => {
                //TODO Do something if Submit Fails
                console.log("Submit Failed ", err);
            })
            .finally(() => { // Set that I already handled the Click
                dispatch(ACTION_TO_HANDLE_CLICK[FOOTER_ACTIONS.SEND]());
            }); 
        }
    }, [footer.requiresHandleClick[FOOTER_ACTIONS.SEND]]);

    return;
}
export default useFooterInitializer;