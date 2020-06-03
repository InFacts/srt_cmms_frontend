import { useEffect } from 'react';
import {  toModeSearch, handleClickAdd, handleClickHomeToSpareMain,
    handleClickForward, handleClickBackward,handleClickRefresh, TOOLBAR_MODE,TOOLBAR_ACTIONS } from '../redux/modules/toolbar.js';
import {FOOTER_MODE, FOOTER_ACTIONS, footerToModeSearch, 
        footerToModeAddDraft, handleClickBackToSpareMain, ACTION_TO_HANDLE_CLICK, footerToModeInvisible} from '../redux/modules/footer.js';
import { useDispatch, useSelector  } from 'react-redux'
import { useFormikContext} from 'formik';
import {startDocumentApprovalFlow} from '../helper';

const useFooterInitializer = () => {
    const dispatch = useDispatch();
    const toolbar = useSelector((state) => ({...state.toolbar}));
    const footer = useSelector((state) => ({...state.footer}));

    const {values, submitForm} = useFormikContext();

    // Handle Toolbar Mode
    useEffect(() => {
        if (toolbar.mode === TOOLBAR_MODE.SEARCH){
            dispatch(footerToModeSearch());
        }
        else if (toolbar.mode === TOOLBAR_MODE.ADD){
            dispatch(footerToModeAddDraft());
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