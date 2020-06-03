import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {  toModeSearch, handleClickAdd, handleClickHomeToSpareMain,
    handleClickForward, handleClickBackward,handleClickRefresh, TOOLBAR_MODE,TOOLBAR_ACTIONS } from '../redux/modules/toolbar.js';
import {useFormikContext } from 'formik';
import { useDispatch, useSelector  } from 'react-redux'
import {fetchLastestInternalDocumentID, DOCUMENT_TYPE_ID} from '../helper'

const useToolbarInitializer = () => {
    const {resetForm, values, setFieldValue} = useFormikContext();
    const toolbar = useSelector((state) => ({...state.toolbar}));
    const dispatch = useDispatch();
    // Initializer
    // Run only once with checking nothing []
    // 1. Change Toolbar to Mode Search
    useEffect(()=>{
        dispatch(toModeSearch());
    }, []);

    // !!! Handles all state.toolbar mode and requiresHandleClick Changes !!!

    // Handle toolbar mode change: SEARCH
    useEffect(()=> {
        if (toolbar.mode === TOOLBAR_MODE.SEARCH){
            resetForm(); //Search doesn't have handleClick, Clicks are tracked by mode changes only.
        }
    }, [toolbar.mode]);

    // Handle home button, only re-subscribe if requiresHandleClick of HOME changes
    useEffect(()=> {
        if (toolbar.requiresHandleClick[TOOLBAR_ACTIONS.HOME]){
            dispatch(handleClickHomeToSpareMain());
        }
    }, [toolbar.requiresHandleClick[TOOLBAR_ACTIONS.HOME]]);

    // Handle Add button
    useEffect(()=> {
        if (toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]){
            resetForm();
            dispatch(handleClickAdd()); // make handle click False 
        }
    }, [toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]]);

    // Handle Refresh button
    useEffect(()=> {
        if (toolbar.requiresHandleClick[TOOLBAR_ACTIONS.REFRESH]){
            resetForm();
            dispatch(handleClickRefresh()); // make handle click False
        }
    }, [toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]]);

    // Handle Forward button
    useEffect(()=> {
        if (toolbar.requiresHandleClick[TOOLBAR_ACTIONS.FORWARD]){
            dispatch(handleClickForward()); // make handle click False
            if(values.document_id){ // If there is document ID

            }else{ // If there is not document ID
                console.log("I HAVE NO DOC ID")
                
            }
        }
    }, [toolbar.requiresHandleClick[TOOLBAR_ACTIONS.FORWARD]]);

    // Handle Backward button
    useEffect(()=> {
        if (toolbar.requiresHandleClick[TOOLBAR_ACTIONS.BACKWARD]){
            dispatch(handleClickBackward()); // make handle click False
            if(values.document_id){ // If there is document ID

            }else{ // If there is not document ID
                console.log("I HAVE NO DOC ID")
                fetchLastestInternalDocumentID(DOCUMENT_TYPE_ID.GOODS_RECEIPT_PO)
                .then(internal_document_id => {
                    setFieldValue('internal_document_id', internal_document_id, true);
                })
            }
        }
    }, [toolbar.requiresHandleClick[TOOLBAR_ACTIONS.BACKWARD]]);

    return;
}

export default useToolbarInitializer;
// cannot use connect since it will not return a function!!!
// export default connect(mapStateToProps, mapDispatchToProps)(useToolbarInitializer);