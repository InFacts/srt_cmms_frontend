import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { useSelector, shallowEqual } from 'react-redux'
import { useFormikContext } from 'formik';
import {
    fetchStepApprovalDocumentData,
    fetchAttachmentDocumentData, getDocumentbyInternalDocumentID
} from '../helper';

import { FOOTER_ACTIONS } from '../redux/modules/footer.js';

const useDocumentSubscription = () => {
    // const dispatch = useDispatch();
    const { values, setFieldValue } = useFormikContext();
    const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);
    const nav_bottom_status = useSelector((state) => ({ ...state.nav_bottom_status }), shallowEqual);

    // Get approval Step when values.document_id changes
    useEffect(() => {
        if (values.document_id !== "") {
            // If not an empty string AND isn't handlingSEND process
            // console.log("fetchStepApprovalDocumentData: SEND/Doc ID Changed")
            // Start Axios Get step_approve and attachment By nuk
            fetchStepApprovalDocumentData(values.document_id)
                .then((result) => {
                    setFieldValue("step_approve", result.approval_step === undefined ? [] : result.approval_step, false);
                    if (result.is_canceled) {
                        setFieldValue("document_is_canceled", result.is_canceled.data, false);
                    }
                });
        }
    }, [values.document_id, footer.requiresHandleClick[FOOTER_ACTIONS.SEND], footer.requiresHandleClick[FOOTER_ACTIONS.APPROVAL],
    footer.requiresHandleClick[FOOTER_ACTIONS.APPROVAL_DONE],
    footer.requiresHandleClick[FOOTER_ACTIONS.CANCEL_APPROVAL_PROCESS],
    footer.requiresHandleClick[FOOTER_ACTIONS.CHECK_APPROVAL],
    footer.requiresHandleClick[FOOTER_ACTIONS.FAST_TRACK],
    footer.requiresHandleClick[FOOTER_ACTIONS.GOT_IT],
    footer.requiresHandleClick[FOOTER_ACTIONS.REJECT]]);

    // Get approval Step when values.document_id changes
    useEffect(() => {
        if (values.document_id &&
            !footer.requiresHandleClick[FOOTER_ACTIONS.SEND] &&
            !footer.requiresHandleClick[FOOTER_ACTIONS.APPROVAL] &&
            !footer.requiresHandleClick[FOOTER_ACTIONS.APPROVAL_DONE] &&
            !footer.requiresHandleClick[FOOTER_ACTIONS.CANCEL_APPROVAL_PROCESS] &&
            !footer.requiresHandleClick[FOOTER_ACTIONS.CHECK_APPROVAL] &&
            !footer.requiresHandleClick[FOOTER_ACTIONS.FAST_TRACK] &&
            !footer.requiresHandleClick[FOOTER_ACTIONS.GOT_IT] &&
            !footer.requiresHandleClick[FOOTER_ACTIONS.REJECT]
        ) {
            // If not an empty string AND isn't handlingSEND process
            console.log("fetchStepApprovalDocumentData: SEND/Doc ID Changed")
            // Start Axios Get step_approve and attachment By nuk
            getDocumentbyInternalDocumentID(values.internal_document_id)
                .then((data) => {
                    setFieldValue('status_name_th', data.status_name, false);
                });
        }
    }, [footer.requiresHandleClick[FOOTER_ACTIONS.SEND], footer.requiresHandleClick[FOOTER_ACTIONS.APPROVAL],
    footer.requiresHandleClick[FOOTER_ACTIONS.APPROVAL_DONE],
    footer.requiresHandleClick[FOOTER_ACTIONS.CANCEL_APPROVAL_PROCESS],
    footer.requiresHandleClick[FOOTER_ACTIONS.CHECK_APPROVAL],
    footer.requiresHandleClick[FOOTER_ACTIONS.FAST_TRACK],
    footer.requiresHandleClick[FOOTER_ACTIONS.GOT_IT],
    footer.requiresHandleClick[FOOTER_ACTIONS.REJECT]]); //values.document_id, ไว้เช็ค โดนลบออกไปแล้ว

    // Get  attachment when values.document_id changes
    useEffect(() => {
        // console.log("footer.requiresHandleClick[FOOTER_ACTIONS.SEND]", footer.requiresHandleClick[FOOTER_ACTIONS.SEND])
        // console.log("footer.requiresHandleClick[FOOTER_ACTIONS.SAVE]", footer.requiresHandleClick[FOOTER_ACTIONS.SAVE])
        if (values.document_id && !(footer.requiresHandleClick[FOOTER_ACTIONS.SEND] || footer.requiresHandleClick[FOOTER_ACTIONS.SAVE])) { // If not an empty string AND isn't handlingSEND process)
            // Start Axios Get step_approve and attachment By nuk
            fetchAttachmentDocumentData(values.document_id)
                .then((data_files) => {
                    // Setup value From Attachment
                    console.log("data_files", data_files)
                    setFieldValue("files", data_files.data.results, false);
                });
        }
    }, [values.document_id, nav_bottom_status.mode]);

    return;
}
export default useDocumentSubscription;