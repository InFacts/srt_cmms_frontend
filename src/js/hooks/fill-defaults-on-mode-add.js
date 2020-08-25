import { useEffect } from 'react';
import { TOOLBAR_MODE, TOOLBAR_ACTIONS } from '../redux/modules/toolbar.js';
import { shallowEqual, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';

import { useFormikContext } from 'formik';
import {getEmployeeIDFromUserID, DOCUMENT_TYPE_ID, isICD, 
    getPositionAbbreviationFromWarehouseID, isICDWarehouseDest, isICDWarehouseSrc, 
    // getInternalDocumentIDFromCurrentValues, getInternalDocumentIDFromCurrentValuesPMT,
    fetchLastestRunningInternalDocumentID} from '../helper';

const useFillDefaultsOnModeAdd = (document_type_group_id) => {

    const fact = useSelector((state) => ({...state.api.fact}), shallowEqual);
    const toolbar = useSelector((state) => ({...state.toolbar}), shallowEqual);
    const decoded_token = useSelector((state) => ({...state.token.decoded_token}), shallowEqual);
    const { values, touched, setFieldValue, setFieldTouched, validateField} = useFormikContext();

    // Fill Default Forms
    useEffect(() => {
        async function fillDefaults(){
            var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
            var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);

            var this_warehouse_id, this_warehouse_id_name;

            if(isICD(document_type_group_id)) {
                if (isICDWarehouseDest(document_type_group_id)) {
                    this_warehouse_id_name = "dest_warehouse_id";
                }else if (isICDWarehouseSrc(document_type_group_id)) {
                    this_warehouse_id_name = "src_warehouse_id";
                }
            }

            if (toolbar.mode === TOOLBAR_MODE.ADD) {
                var delimiter = "/";
                var positionAbbreviation, positionID, documentTypeGroupIDSplit, fullYearBE, runningInternalDocumentID; 
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
                    

                    if(document_type_group_id === DOCUMENT_TYPE_ID.SALVAGE_SOLD){
                        this_warehouse_id = 100;
                    }else{
                        this_warehouse_id = decoded_token.has_position[0].warehouse_id;
                    }
                    setFieldValue(this_warehouse_id_name, this_warehouse_id , true);

                    let position = getPositionAbbreviationFromWarehouseID(fact.position, this_warehouse_id);
                    if (position) {
                    positionAbbreviation = position.abbreviation;
                    positionID = position.position_id;
                    }
                }else{ //PMT
                    // fact.position.items
                    positionAbbreviation = decoded_token.has_position[0].abbreviation;
                    positionID = decoded_token.has_position[0].position_id;
                }

                if (document_type_group_id === DOCUMENT_TYPE_ID.MAINTENANT_ITEM) {
                    setFieldValue("division_id", decoded_token.has_position[0].division_id, false);
                    setFieldValue("district_id", decoded_token.has_position[0].district_id, false);
                    setFieldValue("node_id", decoded_token.has_position[0].node_id, false);
                }


                // If auto increment
                if(values.is_auto_internal_document_id === "auto") {
                    console.log("document_type_group_id",document_type_group_id)
                    documentTypeGroupIDSplit = `${document_type_group_id.toString()[0]}-${document_type_group_id.toString().substr(1)}`;
                    fullYearBE = (parseInt(localISOTime.slice(0, 4))+543).toString();

                    try{
                        console.log("fillDefaults:: runningInternalDocumentID positionID", positionID, document_type_group_id, fullYearBE)
                        let fullYearBEForAPI = (parseInt(fullYearBE)-543).toString();
                        runningInternalDocumentID = await fetchLastestRunningInternalDocumentID(positionID, document_type_group_id, fullYearBEForAPI);
                        let splitRunningInternalDocumentID =  runningInternalDocumentID.split(delimiter);
                        runningInternalDocumentID = (parseInt(splitRunningInternalDocumentID[splitRunningInternalDocumentID.length-1]) + 1).toString().padStart(4, '0');
                        
                    }catch(err){
                        if (err === 'No Results in fetchLastestRunningInternalDocumentID'){
                            console.log("fillDefaults:: No Results in fetchLastestRunningInternalDocumentID")
                            runningInternalDocumentID = "0001";
                        }else{
                            throw "fillDefaults:: try catch values.is_auto_internal_document_id === auto";
                        }
                    }
                    internalDocumentID = [positionAbbreviation, documentTypeGroupIDSplit, fullYearBE, runningInternalDocumentID].join(delimiter);
                    
                    console.log("fillDefaults:: positionAbbreviation", positionAbbreviation);
                    console.log("fillDefaults:: documentTypeGroupIDSplit", documentTypeGroupIDSplit);
                    console.log("fillDefaults:: fullYearBE", fullYearBE);
                    console.log("fillDefaults:: runningInternalDocumentID", runningInternalDocumentID);
                    console.log("fillDefaults:: internalDocumentID", internalDocumentID);

                    setFieldValue('internal_document_id', internalDocumentID, false);
                    
                    // .then(runningInternalDocumentID => {

                    //     if (!runningInternalDocumentID){
                    //         runningInternalDocumentID = "0001";
                    //     }
                    //     internalDocumentID = [positionAbbreviation, documentTypeGroupIDSplit, fullYearBE, runningInternalDocumentID].join(delimiter);
                    
                    //     console.log("validateInternalDocumentIDFieldHelper:: positionAbbreviation", positionAbbreviation);
                    //     console.log("validateInternalDocumentIDFieldHelper:: documentTypeGroupIDSplit", documentTypeGroupIDSplit);
                    //     console.log("validateInternalDocumentIDFieldHelper:: fullYearBE", fullYearBE);
                    //     console.log("validateInternalDocumentIDFieldHelper:: runningInternalDocumentID", runningInternalDocumentID);
                    //     console.log("validateInternalDocumentIDFieldHelper:: internalDocumentID", internalDocumentID);

                    //     setFieldValue('internal_document_id', internalDocumentID, false);
                    // })
                    
                    // runningInternalDocumentID = "0000";
                    // internalDocumentID = [positionAbbreviation, documentTypeGroupIDSplit, fullYearBE, runningInternalDocumentID].join(delimiter);
                    
                    // console.log("validateInternalDocumentIDFieldHelper:: positionAbbreviation", positionAbbreviation);
                    // console.log("validateInternalDocumentIDFieldHelper:: documentTypeGroupIDSplit", documentTypeGroupIDSplit);
                    // console.log("validateInternalDocumentIDFieldHelper:: fullYearBE", fullYearBE);
                    // console.log("validateInternalDocumentIDFieldHelper:: runningInternalDocumentID", runningInternalDocumentID);
                    // console.log("validateInternalDocumentIDFieldHelper:: internalDocumentID", internalDocumentID);

                    // setFieldValue('internal_document_id', internalDocumentID, false);

                }
            }

        }
        fillDefaults();
        
    }, [fact.users.lastUpdated, toolbar.mode, touched.internal_document_id, !values.internal_document_id, 
        values.is_auto_internal_document_id,
        toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]]) // This needs requiresHandleClick since it resetsForm AFTER the setField Value, making it not show anything

    // Subscribe to internal_document_id changes
    // NOTE: THIS SHOULD BE REMOVE FINALLY WHEN WE CAN DO ASYNC!!!!
    // Since after clicking on the popup, the setFieldValue is too delayed and doesn't cause changes in the `values` variable. 
    // So i would like to setFieldValue without validation in here to be subscribe to the changes
    useEffect(() => {
        async function subscribeInternalDocumentIDChanges() {
            var this_warehouse_id_name;
            if (isICD(document_type_group_id)) { // If document type group ID is ICD   
                if (isICDWarehouseDest(document_type_group_id)) {
                    this_warehouse_id_name = "dest_warehouse_id";
                }else if (isICDWarehouseSrc(document_type_group_id)) {
                    this_warehouse_id_name = "src_warehouse_id";
                }
            }
            if(values.is_auto_internal_document_id === "auto" 
                && toolbar.mode === TOOLBAR_MODE.ADD
                && (isICD(document_type_group_id) && values[this_warehouse_id_name]) // SOMEHOW IT JUST DOESNT HAVE SOMETIMES???? 
                ) {
                var delimiter = "/";
                var positionAbbreviation, positionID, documentTypeGroupIDSplit, fullYearBE, runningInternalDocumentID; 
                var internalDocumentID;
                if (isICD(document_type_group_id)) { // If document type group ID is ICD
                    
                    console.log("subscribeInternalDocumentIDChanges:: values[this_warehouse_id_name]", values[this_warehouse_id_name]);
                    let position = getPositionAbbreviationFromWarehouseID(fact.position, values[this_warehouse_id_name]);
                    console.log("subscribeInternalDocumentIDChanges:: position",position);
                    if (position) {
                    positionAbbreviation = position.abbreviation;
                    positionID = position.position_id;
                    }

                    // runningInternalDocumentID = await fetchLastestRunningInternalDocumentID(positionID, document_type_group_id, fullYearBE);
                    // internalDocumentID = getInternalDocumentIDFromCurrentValues(fact, values, document_type_group_id, this_warehouse_id_name, runningInternalDocumentID);
                } else{ // If document type group ID is PMT
                    positionAbbreviation = decoded_token.has_position[0].abbreviation;
                    positionID = decoded_token.has_position[0].position_id;
                    // internalDocumentID = getInternalDocumentIDFromCurrentValuesPMT(fact, values, document_type_group_id, positionAbbreviation, runningInternalDocumentID);
                    
                }
                console.log("subscribeInternalDocumentIDChanges:: positionAbbreviation",positionAbbreviation)
                documentTypeGroupIDSplit = `${document_type_group_id.toString()[0]}-${document_type_group_id.toString().substr(1)}`;
                fullYearBE = (parseInt(values["document_date"].slice(0, 4))+543).toString();
                try{
                    let fullYearBEForAPI = (parseInt(fullYearBE)-543).toString();
                    runningInternalDocumentID = await fetchLastestRunningInternalDocumentID(positionID, document_type_group_id, fullYearBEForAPI);
                    let splitRunningInternalDocumentID =  runningInternalDocumentID.split(delimiter);
                    runningInternalDocumentID = (parseInt(splitRunningInternalDocumentID[splitRunningInternalDocumentID.length-1]) + 1).toString().padStart(4, '0');
                }catch(err){
                    if (err === 'No Results in fetchLastestRunningInternalDocumentID'){
                        console.log("subscribeInternalDocumentIDChanges:: No Results in fetchLastestRunningInternalDocumentID")
                        runningInternalDocumentID = "0001";
                    }else{
                        throw "validateInternalDocumentIDFieldHelper:: try catch values.is_auto_internal_document_id === auto";
                    }
                }
                internalDocumentID = [positionAbbreviation, documentTypeGroupIDSplit, fullYearBE, runningInternalDocumentID].join(delimiter);
                setFieldTouched('internal_document_id');
                setFieldValue('internal_document_id', internalDocumentID, false);
            }
        }
        subscribeInternalDocumentIDChanges();
        
    }, [values["src_warehouse_id"], values["dest_warehouse_id"], values["document_date"], document_type_group_id,
fact.position.lastUpdated, values.is_auto_internal_document_id], decoded_token.has_position, toolbar.mode)
    
    
}
export default useFillDefaultsOnModeAdd;