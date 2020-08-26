import { useEffect } from 'react';
import {   handleClickAdd, handleClickHomeToSpareMain,
    handleClickForward, handleClickBackward,handleClickRefresh, TOOLBAR_MODE,TOOLBAR_ACTIONS,
    MODE_TO_ACTION_CREATOR, handleClickHomeToPMTMain } from '../redux/modules/toolbar.js';
import {useFormikContext } from 'formik';
import { useDispatch, useSelector ,shallowEqual } from 'react-redux'
import {fetchLastestInternalDocumentID, isICDWarehouseDest, isICDWarehouseSrc, getInternalDocumentIDFromCurrentValues, DOCUMENT_TYPE_ID, isICD, getPositionAbbreviationFromWarehouseID} from '../helper'
import { navBottomOnReady, navBottomError, navBottomSuccess, navBottomSending } from '../redux/modules/nav-bottom';

export const useToolbarChangeModeInitializer = (initial_mode) => {
    const dispatch = useDispatch();
    const toolbar = useSelector((state) => ({...state.toolbar}), shallowEqual);
    useEffect(()=>{
        dispatch(MODE_TO_ACTION_CREATOR[initial_mode]());
    }, [dispatch, initial_mode]);

    // Handle toolbar mode change + requireClick Changes, navBottom onReady 
    useEffect(()=> {
        // Handle make navBottom onready (Blue) once change mode
        console.log("Change navBottomOnReady")
        dispatch(navBottomOnReady('', '', ''));
    }, [toolbar.mode]);
    // toolbar.mode, toolbar.requiresHandleClick
    return;
}

const useToolbarInitializer = (initial_mode, documentTypeGroupID) => {
    const {resetForm, values, setFieldValue, setFieldTouched} = useFormikContext();
    const fact = useSelector((state) => ({...state.api.fact}), shallowEqual);
    const toolbar = useSelector((state) => ({...state.toolbar}), shallowEqual);
    const decoded_token = useSelector((state) => ({...state.token.decoded_token}), shallowEqual);
    const dispatch = useDispatch();
    // Initializer
    // Run only once with checking nothing []
    // 1. Change Toolbar to Mode Search
    useToolbarChangeModeInitializer(initial_mode);


    // !!! Handles all state.toolbar mode and requiresHandleClick Changes !!!

    // Handle toolbar mode change
    useEffect(()=> {
        if (toolbar.mode === TOOLBAR_MODE.SEARCH){
            resetForm(); //Search doesn't have handleClick, Clicks are tracked by mode changes only.
        }
    }, [toolbar.mode, resetForm]);

    // Handle home button, only re-subscribe if requiresHandleClick of HOME changes
    useEffect(()=> {
        if (toolbar.requiresHandleClick[TOOLBAR_ACTIONS.HOME]){
            if(isICD(documentTypeGroupID)){ //Handle undefined documentTypeGroupID for not breaking change, but need to remove it!!
                dispatch(handleClickHomeToSpareMain());
            }else{ // Assume going to Module #2, but TODO to other modules too isPMT... or something
                dispatch(handleClickHomeToPMTMain());
            }
        }
    }, [toolbar.requiresHandleClick[TOOLBAR_ACTIONS.HOME]]);

    // Handle Add button
    useEffect(()=> {
        if (toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]){
            resetForm();
            dispatch(handleClickAdd()); // make handle click False
            dispatch(navBottomOnReady('', '', '')); // RESET NAV BOTTOM 
        }
    }, [toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]]);

    // Handle Refresh button
    useEffect(()=> {
        if (toolbar.requiresHandleClick[TOOLBAR_ACTIONS.REFRESH]){
            resetForm();
            // setFieldValue("status_name_th", "kuyped", false)
            dispatch(handleClickRefresh()); // make handle click False
        }
    }, [toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]]);

    // Handle Forward button
    useEffect(()=> {
        if (toolbar.requiresHandleClick[TOOLBAR_ACTIONS.FORWARD]){
            dispatch(handleClickForward()); // make handle click False

            var delimiter = "/";

            // If there is document ID
            // Find DDDD and +1
            if(values.document_id){ 
                // Split Internal Document ID with Delimiter, Increment the last element and pad with zeros. 
                var splitedInternalDocumentID = values.internal_document_id.split(delimiter);
                var runningInternalDocumentID = parseInt(splitedInternalDocumentID[splitedInternalDocumentID.length-1]) + 1;
                runningInternalDocumentID = runningInternalDocumentID.toString().padStart(4, '0');
                splitedInternalDocumentID[splitedInternalDocumentID.length-1] = runningInternalDocumentID;
                var internalDocumentID = splitedInternalDocumentID.join(delimiter);
                setFieldValue('internal_document_id', internalDocumentID, false);
                setFieldTouched('internal_document_id');
                // dispatch(handleClickForward()); // make handle click False

            }else{ // If there is not document ID
                // Initialize with DDDD 0001
                console.log("toolbarinitializer:: ForwarDbuttom: I HAVE NO DOC ID")

                var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
                var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
                var this_warehouse_id,internalDocumentID;
                var positionAbbreviation, documentTypeGroupIDSplit, fullYearBE, runningInternalDocumentID; 
                var internalDocumentID;

                if (isICD(documentTypeGroupID)) { // If document type group ID is ICD

                    if(documentTypeGroupID === DOCUMENT_TYPE_ID.SALVAGE_SOLD){
                        this_warehouse_id = 100;
                    }else{
                        this_warehouse_id = decoded_token.has_position[0].warehouse_id;
                    }
                    positionAbbreviation = getPositionAbbreviationFromWarehouseID(fact.position, this_warehouse_id);
                    
                } else{ // If document type group ID is PMT

                }
                documentTypeGroupIDSplit = `${documentTypeGroupID.toString()[0]}-${documentTypeGroupID.toString().substr(1)}`;
                fullYearBE = (parseInt(localISOTime.slice(0, 4))+543).toString();
                runningInternalDocumentID = "0001";
                internalDocumentID = [positionAbbreviation, documentTypeGroupIDSplit, fullYearBE, runningInternalDocumentID].join(delimiter);

                setFieldValue('internal_document_id', internalDocumentID, false);
                // dispatch(handleClickForward()); // make handle click False
            }
        }
    }, [toolbar.requiresHandleClick[TOOLBAR_ACTIONS.FORWARD]]);

    // Handle Backward button
    useEffect(()=> {
        if (toolbar.requiresHandleClick[TOOLBAR_ACTIONS.BACKWARD]){
            dispatch(handleClickBackward()); // make handle click False
            var delimiter = "/";
            // If there is document ID
            // Find DDDD and -1
            if(values.document_id){
                // Split Internal Document ID with Delimiter, Increment the last element and pad with zeros. 
                var splitedInternalDocumentID = values.internal_document_id.split(delimiter);
                var runningInternalDocumentID = parseInt(splitedInternalDocumentID[splitedInternalDocumentID.length-1]) - 1;
                runningInternalDocumentID = runningInternalDocumentID.toString().padStart(4, '0');
                splitedInternalDocumentID[splitedInternalDocumentID.length-1] = runningInternalDocumentID;
                var internalDocumentID = splitedInternalDocumentID.join(delimiter);
                setFieldValue('internal_document_id', internalDocumentID, false);
                // dispatch(handleClickBackward()); // make handle click False

            }else{ // If there is not document ID
                // Initialize with DDDD (max) -> fetch Latest DDDD
                console.log("toolbarinitializer:: I HAVE NO DOC ID")
                fetchLastestInternalDocumentID(documentTypeGroupID)
                .then(internal_document_id => {
                    setFieldValue('internal_document_id', internal_document_id, false);
                    // dispatch(handleClickBackward()); // make handle click False
                })
            }
        }
    }, [toolbar.requiresHandleClick[TOOLBAR_ACTIONS.BACKWARD]]);

    return;
}

export default useToolbarInitializer;
// cannot use connect since it will not return a function!!!
// export default connect(mapStateToProps, mapDispatchToProps)(useToolbarInitializer);