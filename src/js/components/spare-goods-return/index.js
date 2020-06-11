import React, {useState, useEffect} from 'react';
import { useFormik , withFormik ,useFormikContext} from 'formik';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux'

import TabBar from '../common/tab-bar';

import TopContent from './top-content';
import BottomContent from './bottom-content';
import Footer from '../common/footer.js';

import {packDataFromValues, DOCUMENT_TYPE_ID, saveDocument, getUrlParamsLink} from '../../helper';

import useToolbarInitializer from '../../hooks/toolbar-initializer';
import useFactInitializer from '../../hooks/fact-initializer';
import useTokenInitializer from '../../hooks/token-initializer';
import useFooterInitializer from '../../hooks/footer-initializer';

import {  TOOLBAR_MODE,TOOLBAR_ACTIONS } from '../../redux/modules/toolbar.js';

// ADD FOR Link
import useDocumentSubscription from '../../hooks/document-subscription';
import useNavBottomStatusInitializer from '../../hooks/nav-bottom-status-initializer';
import { footerToModeSearch } from '../../redux/modules/footer.js';

const GoodsReturnComponent = (props) => {
    const dispatch = useDispatch();
    const {resetForm, setFieldValue, setValues, values, validateField,validateForm} = useFormikContext();

    // Initial tabbar & set default active
    const [tabNames, setTabNames] = useState([
        {id:"listItem", name:"รายการ"},
        {id:"attachment", name:"แนบไฟล์"},
        {id:"table_status", name:"สถานะเอกสาร"},
    ]);

    useToolbarInitializer(TOOLBAR_MODE.SEARCH);
    useTokenInitializer();
    useFactInitializer();
    useFooterInitializer(DOCUMENT_TYPE_ID.GOODS_RETURN);
    useNavBottomStatusInitializer();
    useDocumentSubscription();
    const loggedIn = useSelector(state => state.token.isLoggedIn); 

    useEffect(()=>{
        dispatch(footerToModeSearch());
    }, []);

    // If Link to this url via Track Document
    useEffect(() => {
        console.log("useEffect getUrlParamsLink")
        getUrlParamsLink.then((internal_document_id) => {
            console.log("internal_document_id --------", internal_document_id)
            if (internal_document_id !== "") {
                // action_approval
                setFieldValue("status_name_th", "", true);
                setFieldValue("internal_document_id", internal_document_id, true);
            }
        })
    }, [])
    // // If Link to this url via Track Document
    // useEffect(() => {
    //     let url = window.location.search;
    //     // console.log("URL IS", url)
    //     const urlParams = new URLSearchParams(url);
    //     const internal_document_id = urlParams.get('internal_document_id');
    //     if (internal_document_id !== "") {
    //         // action_approval
    //         // console.log(" IA M NOT SETTING ", internal_document_id);
    //         // console.log(" i think that toolbar mode is ", props.toolbar.mode)
    //         // console.log(" THIS IS CURRENT VALUES ", values);
    //         setFieldValue("status_name_th", "", true);
    //         setFieldValue("internal_document_id", internal_document_id, true);
    //         // console.log(" THIS IS AFTER VALUES ", values);
    //         // setTimeout(validateForm, 2);
    //     }
    // }, [])

    return (
        <>
        {!loggedIn ? <Redirect to="/" /> : null}
        <form >
            <TopContent />
            <TabBar tabNames={tabNames} initialTabID="listItem">
                <BottomContent />
            </TabBar>
            <Footer />
        </form>
        </>
    )
}
const initialLineItem = {
    internal_item_id: '',
    quantity: '',
    uom_id: '',
    per_unit_price: '',
    // item_id: '',
    item_status_id: 1,
    
    //Field ที่ไม่ได้กรอก
    description: '',
    line_number: '',
    // document_id: '', // maybe not needed
    list_uoms: [],
}
const initialRows = (n=10) => {
    let rows = [];
    for (var i = 1; i <= n; i++) {
        rows.push({
            ...initialLineItem, 
            line_number: i
        });
    }
    return rows;
}


const EnhancedGoodsReturnComponent = withFormik({
    mapPropsToValues: (props) => ({ 
        // Field ที่ให้ User กรอก
        internal_document_id: '',
        document_date: '',
        dest_warehouse_id: '', // Need to fill for user's own WH
        src_warehouse_id: 999, // for Goods Receipt
        created_by_user_employee_id: '',
        remark: '',
        line_items: initialRows(),

        file: [],
    
        //Field ที่ไม่ได้กรอก
        
        created_on: '',
        status_name_th: '',
        document_status_id: '',
        created_by_admin_employee_id: '',

        //Field ที่ไม่ได้ display
        document_id: '', // changes when document is displayed (internal_document_id field validation)

        // For Attactment
        desrciption_files_length: '',
        desrciption_files: [],
        // For Step Approval
        step_approve: [],
    }),
    validate: (values, props) => {
        const errors = {};

        if (!values.document_date){
            errors.document_date = "Required";
        }
        return errors;
    },
})(GoodsReturnComponent);

export default EnhancedGoodsReturnComponent;