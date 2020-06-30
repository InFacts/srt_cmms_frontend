import { useEffect } from 'react';
import { TOOLBAR_MODE, TOOLBAR_ACTIONS } from '../redux/modules/toolbar.js';
import { shallowEqual, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { getEmployeeIDFromUserID} from '../helper';

import { useFormikContext } from 'formik';

import {DOCUMENT_TYPE_ID} from '../helper';
const useFillDefaultsOnModeAdd = (document_type_group_id) => {

    const fact = useSelector((state) => ({...state.api.fact}), shallowEqual);
    const toolbar = useSelector((state) => ({...state.toolbar}), shallowEqual);
    const decoded_token = useSelector((state) => ({...state.token.decoded_token}), shallowEqual);
    const { values, touched, setFieldValue, validateField} = useFormikContext();

    // Fill Default Forms
    useEffect(() => {
        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
        if (toolbar.mode === TOOLBAR_MODE.ADD) {
            if (!values.internal_document_id && touched.internal_document_id){
                setFieldValue('internal_document_id', `draft-${uuidv4()}`, true)
            }
            setFieldValue("created_by_admin_employee_id", getEmployeeIDFromUserID(fact.users, decoded_token.id));
            setFieldValue("created_on", localISOTime.slice(0, 16), false);
            console.log("decoded_token.has_position[0].warehouse_id", decoded_token.has_position[0].warehouse_id)
            // setFieldValue("src_warehouse_id", decoded_token.has_position[0].warehouse_id, true)
            // setFieldValue("dest_warehouse_id", decoded_token.has_position[0].warehouse_id, true)
            if (document_type_group_id === DOCUMENT_TYPE_ID.GOODS_RECEIPT_PO || document_type_group_id === DOCUMENT_TYPE_ID.GOODS_RETURN 
            || document_type_group_id === DOCUMENT_TYPE_ID.GOODS_RECEIPT_FIX || document_type_group_id === DOCUMENT_TYPE_ID.INVENTORY_TRANSFER) {
                setFieldValue("dest_warehouse_id", decoded_token.has_position[0].warehouse_id, true)
            }
            if (document_type_group_id === DOCUMENT_TYPE_ID.GOODS_USAGE || document_type_group_id === DOCUMENT_TYPE_ID.GOODS_FIX 
            || document_type_group_id === DOCUMENT_TYPE_ID.GOODS_ISSUE || document_type_group_id === DOCUMENT_TYPE_ID.PHYSICAL_COUNT
            || document_type_group_id === DOCUMENT_TYPE_ID.INVENTORY_ADJUSTMENT || document_type_group_id === DOCUMENT_TYPE_ID.SALVAGE_RETURN) {
                setFieldValue("src_warehouse_id", decoded_token.has_position[0].warehouse_id, true)
            }
            
            if (document_type_group_id === DOCUMENT_TYPE_ID.SALVAGE_SOLD) {
                setFieldValue("src_warehouse_id", 100, true);
            }
        }
        
    }, [fact.users, toolbar.mode, touched.internal_document_id, !values.internal_document_id,
        toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]]) // This needs requiresHandleClick since it resetsForm AFTER the setField Value, making it not show anything
    
}
export default useFillDefaultsOnModeAdd;