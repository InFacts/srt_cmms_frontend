import { useEffect } from 'react';
import { TOOLBAR_MODE, TOOLBAR_ACTIONS } from '../redux/modules/toolbar.js';
import { shallowEqual, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { getEmployeeIDFromUserID} from '../helper';

import { useFormikContext } from 'formik';

import {DOCUMENT_TYPE_ID, isICD, getPositionAbbreviationFromWarehouseID} from '../helper';
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
            var delimiter = "/";
            var positionAbbreviation, documentTypeGroupIDSplit, fullYearBE, runningInternalDocumentID; 
            var internalDocumentID;

            // if (!values.internal_document_id && touched.internal_document_id){
            //     setFieldValue('internal_document_id', `draft-${uuidv4()}`, true)
            // }


            // Both User and Admin Employee ID will be defaulted to the user logged in : Knight
            // Document Date will be Defaulted to Today: Knight
            var userEmployeeID = getEmployeeIDFromUserID(fact.users, decoded_token.id);
            var adminEmployeeID = userEmployeeID;
            setFieldValue("created_by_user_employee_id", userEmployeeID);
            setFieldValue("created_by_admin_employee_id", adminEmployeeID);
            setFieldValue("created_on", localISOTime.slice(0, 16), false);
            setFieldValue("document_date", localISOTime.slice(0, 10), false);

            if(isICD(document_type_group_id)) {
                var this_warehouse_id, this_warehouse_id_name;

                if (document_type_group_id === DOCUMENT_TYPE_ID.GOODS_RECEIPT_PO 
                    || document_type_group_id === DOCUMENT_TYPE_ID.GOODS_RETURN 
                    || document_type_group_id === DOCUMENT_TYPE_ID.GOODS_RECEIPT_FIX 
                    || document_type_group_id === DOCUMENT_TYPE_ID.INVENTORY_TRANSFER
                    || document_type_group_id === DOCUMENT_TYPE_ID.GOODS_RECEIPT_PO_NO_PO) {
                    this_warehouse_id_name = "dest_warehouse_id";
                    this_warehouse_id = decoded_token.has_position[0].warehouse_id;
                }else if (document_type_group_id === DOCUMENT_TYPE_ID.GOODS_USAGE 
                    || document_type_group_id === DOCUMENT_TYPE_ID.GOODS_FIX 
                    || document_type_group_id === DOCUMENT_TYPE_ID.GOODS_ISSUE 
                    || document_type_group_id === DOCUMENT_TYPE_ID.PHYSICAL_COUNT
                    || document_type_group_id === DOCUMENT_TYPE_ID.INVENTORY_ADJUSTMENT 
                    || document_type_group_id === DOCUMENT_TYPE_ID.SALVAGE_RETURN) {
                    this_warehouse_id_name = "src_warehouse_id";
                    this_warehouse_id = decoded_token.has_position[0].warehouse_id;
                }else if (document_type_group_id === DOCUMENT_TYPE_ID.SALVAGE_SOLD) {
                    this_warehouse_id_name = "src_warehouse_id";
                    this_warehouse_id = 100;
                }
                setFieldValue(this_warehouse_id_name, this_warehouse_id , true);

                positionAbbreviation = getPositionAbbreviationFromWarehouseID(fact.position, this_warehouse_id);
            }else{ //PMT
                
                // positionAbbreviation = 
            }

            if (document_type_group_id === DOCUMENT_TYPE_ID.MAINTENANT_ITEM) {
                setFieldValue("division_id", decoded_token.has_position[0].division_id, false);
                setFieldValue("district_id", decoded_token.has_position[0].district_id, false);
                setFieldValue("node_id", decoded_token.has_position[0].node_id, false);
            }


            // If auto increment
            if(values.is_auto_internal_document_id === "auto") {
                documentTypeGroupIDSplit = `${document_type_group_id.toString()[0]}-${document_type_group_id.toString().substr(1)}`;
                fullYearBE = (parseInt(localISOTime.slice(0, 4))+543).toString();
                runningInternalDocumentID = "0000";
                internalDocumentID = [positionAbbreviation, documentTypeGroupIDSplit, fullYearBE, runningInternalDocumentID].join(delimiter);
                
                console.log("validateInternalDocumentIDFieldHelper:: positionAbbreviation", positionAbbreviation)
                console.log("validateInternalDocumentIDFieldHelper:: documentTypeGroupIDSplit", documentTypeGroupIDSplit)
                console.log("validateInternalDocumentIDFieldHelper:: fullYearBE", fullYearBE)
                console.log("validateInternalDocumentIDFieldHelper:: runningInternalDocumentID", runningInternalDocumentID)
                console.log("validateInternalDocumentIDFieldHelper:: internalDocumentID", internalDocumentID)

                setFieldValue('internal_document_id', internalDocumentID, false)

            }
            

        }
        
    }, [fact.users.lastUpdated, toolbar.mode, touched.internal_document_id, !values.internal_document_id, values.is_auto_internal_document_id,
        toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]]) // This needs requiresHandleClick since it resetsForm AFTER the setField Value, making it not show anything
    
}
export default useFillDefaultsOnModeAdd;