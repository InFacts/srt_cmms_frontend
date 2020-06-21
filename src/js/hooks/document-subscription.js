import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { useSelector, shallowEqual} from 'react-redux'
import { useFormikContext } from 'formik';
import {fetchStepApprovalDocumentData, 
    fetchAttachmentDocumentData} from '../helper';
    
import { FOOTER_ACTIONS} from '../redux/modules/footer.js';

const useDocumentSubscription = () => {
    // const dispatch = useDispatch();
    const { values, setFieldValue } = useFormikContext();
    const footer = useSelector((state) => ({...state.footer}), shallowEqual);


    // Get approval Step when values.document_id changes
    useEffect(() => {
        if(values.document_id && 
            !footer.requiresHandleClick[FOOTER_ACTIONS.SEND] && 
            !footer.requiresHandleClick[FOOTER_ACTIONS.APPROVAL] && 
            !footer.requiresHandleClick[FOOTER_ACTIONS.APPROVAL_DONE] && 
            !footer.requiresHandleClick[FOOTER_ACTIONS.CANCEL_APPROVAL_PROCESS] && 
            !footer.requiresHandleClick[FOOTER_ACTIONS.CHECK_APPROVAL] && 
            !footer.requiresHandleClick[FOOTER_ACTIONS.FAST_TRACK] && 
            !footer.requiresHandleClick[FOOTER_ACTIONS.GOT_IT] && 
            !footer.requiresHandleClick[FOOTER_ACTIONS.REJECT]
        ){ 
        // If not an empty string AND isn't handlingSEND process
        // console.log("fetchStepApprovalDocumentData: SEND/Doc ID Changed")
        // Start Axios Get step_approve and attachment By nuk
        fetchStepApprovalDocumentData(values.document_id)
        .then((result) => {
            setFieldValue("step_approve", result.approval_step === undefined ? [] : result.approval_step, false);
            if(result.is_canceled){
                setFieldValue("document_is_canceled", result.is_canceled.data, false);
            }
        });
        }
    }, [values.document_id, footer.requiresHandleClick[FOOTER_ACTIONS.SEND], footer.requiresHandleClick[FOOTER_ACTIONS.APPROVAL] , 
    footer.requiresHandleClick[FOOTER_ACTIONS.APPROVAL_DONE],
    footer.requiresHandleClick[FOOTER_ACTIONS.CANCEL_APPROVAL_PROCESS],
    footer.requiresHandleClick[FOOTER_ACTIONS.CHECK_APPROVAL],
    footer.requiresHandleClick[FOOTER_ACTIONS.FAST_TRACK], 
    footer.requiresHandleClick[FOOTER_ACTIONS.GOT_IT],
    footer.requiresHandleClick[FOOTER_ACTIONS.REJECT],
    footer.requiresHandleClick[FOOTER_ACTIONS.CANCEL_APPROVAL_PROCESS] ]);

    
    // Get  attachment when values.document_id changes
    useEffect(() => {
        if(values.document_id  && ! footer.requiresHandleClick[FOOTER_ACTIONS.SEND]) { // If not an empty string AND isn't handlingSEND process)
        // Start Axios Get step_approve and attachment By nuk
        fetchAttachmentDocumentData(values.document_id)
        .then((data_files) => {
            // Setup value From Attachment
            setFieldValue("files", data_files.data.results, false);
        });
        }
    }, [values.document_id, footer.requiresHandleClick[FOOTER_ACTIONS.SEND]]);
    
    
    return;
}
export default useDocumentSubscription;