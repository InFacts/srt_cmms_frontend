import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { useFormik , withFormik ,useFormikContext} from 'formik';



import TabBar, {TAB_BAR_ACTIVE} from '../common/tab-bar';
import {FOOTER_MODE, FOOTER_ACTIONS, footerToModeSearch, footerToModeAddDraft} from '../../redux/modules/footer.js';


import axios from "axios";

import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import TopContent from './top-content';
import BottomContent from './bottom-content';
import Footer from '../common/footer.js';

import { TOOLBAR_ACTIONS, handleClickHomeToSpareMain, handleClickRefresh, toModeSearch, handleClickAdd, 
    handleClickForward, handleClickBackward, TOOLBAR_MODE } from '../../redux/modules/toolbar.js';
import { onClearStateModeAdd} from '../../redux/modules/goods_receipt.js';
import {fetchFactIfNeeded , FACTS} from '../../redux/modules/api/fact';
import {decodeTokenIfNeeded} from '../../redux/modules/token';
import DateTimeInput from '../common/formik-datetime-input.js';

import {getUserIDFromEmployeeID, DOCUMENT_SCHEMA, ICD_SCHEMA, ICD_LINE_ITEM_SCHEMA,packDataFromValues, DOCUMENT_TYPE_ID} from '../../helper';

import useToolbarInitializer from '../../hooks/toolbar-initializer';
import useFactInitializer from '../../hooks/fact-initializer';
import useTokenInitializer from '../../hooks/token-initializer';





const packForm = (document_id, document_show, list_show) => {
    const line_items = [];
    var line_number = 1
    // console.log(list_show_mode_add)
    list_show.map(function (item, index) {
        if (item.description !== "") {
            var myObj = {
                "document_id": document_id,
                "line_number": line_number,
                "quantity": parseInt(item.quantity),
                "uom_id": item.uom_group_id,
                "per_unit_price": parseFloat(item.per_unit_price),
                "item_id": item.item_id,
                "item_status_id": 1
            };
            line_number += 1;
            return (
                line_items.push(myObj)
            )
        }
    })

    const data = {
        "document": {
            "document_id": document_id,
            "internal_document_id": document_show.internal_document_id,
            "created_by_admin_id": document_show.created_by_admin_id,
            "created_by_user_id": document_show.created_by_user_id,
            "remark": document_show.remark,
        },
        "specific": {
            "document_id": document_id,
            "dest_warehouse_id": parseInt(document_show.dest_warehouse_id),
            "src_warehouse_id": 999,
            "line_items": line_items,
            "movement": {
                "document_id": document_id,
                "po_id": document_show.po_id
            }
        }
    };
    console.log(data)
    return data;
}

const GoodsReceiptComponent = (props) => {
    
    const {resetForm, setFieldValue, setValues, values} = useFormikContext();

    // Initial tabbar & set default active
    const [tabNames, setTabNames] = useState([
        {id:"listItem", name:"รายการ", is_active: TAB_BAR_ACTIVE.ACTIVE},
        {id:"attachment", name:"แนบไฟล์", is_active: TAB_BAR_ACTIVE.INACTIVE},
        {id:"table_status", name:"สถานะเอกสาร", is_active: TAB_BAR_ACTIVE.INACTIVE},
    ]);
    const [initialTabbar, setInitialTabbar] = useState(true);

    useToolbarInitializer();
    useTokenInitializer();
    useFactInitializer();

    // Handle Footer
    useEffect(() => {
        console.log("Handle Footer", props.toolbar.mode, TOOLBAR_MODE.SEARCH)
        if (props.toolbar.mode === TOOLBAR_MODE.SEARCH){
            console.log("Handle SEARCH")
            props.footerToModeSearch();
        }
        else if (props.toolbar.mode === TOOLBAR_MODE.ADD){
            console.log("Handle ADD")
            props.footerToModeAddDraft();
        }
    }, [props.toolbar.mode]);

    function handleSubmit(e) {
        e.preventDefault();
        if (props.actionMode === "add") {
            return (
                axios.put(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/${props.document_id}/101`, packForm(props.document_id, props.document_show_mode_add, props.list_show_mode_add), { headers: { "x-access-token": localStorage.getItem('token_auth') } })
                    .then(res => {
                        console.log(res);
                        props.onClearStateModeAdd()
                    }).catch(function (err) {
                        console.log(err);
                    })
            )
        }
        if (props.actionMode === "edit") {
            return (
                axios.put(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/${props.document_show.document_id}/101`, packForm(props.document_show.document_id, props.document_show, props.list_show), { headers: { "x-access-token": localStorage.getItem('token_auth') } })
                    .then(res => {
                        console.log(res);
                        props.onClearStateModeAdd()
                    }).catch(function (err) {
                        console.log(err);
                    })
            )
            // }
        }
    }

    return (
        <form onSubmit={props.handleSubmit}>
        {/* <form onSubmit={(e) => { if (window.confirm('คุณต้องการบันทึกใช่หรือไม่')) handleSubmit(e) }}> */}
            <TopContent />
            <TabBar tabNames={tabNames} initialTabbar={initialTabbar} setInitialTabbar={setInitialTabbar}>
                <BottomContent />
            </TabBar>
            <Footer />
        </form>

    )
}
const initialLineItem = {
    internal_item_id: '',
    quantity: '',
    uom_id: '',
    per_unit_price: '',
    item_id: '',
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


const EnhancedGoodsReceiptComponent = withFormik({
    mapPropsToValues: (props) => ({ 
        // Field ที่ให้ User กรอก
        internal_document_id: '',
        document_date: '',
    
        dest_warehouse_id: '', // Need to fill for user's own WH
        src_warehouse_id: 999, // for Goods Receipt
        created_by_user_employee_id: '',
    
        po_id: '',
    
        remark: '',
    
        line_items: initialRows(),
    
        //Field ที่ไม่ได้กรอก
        document_id: '',
        created_on: '',
        status_name_th: '',
        document_status_id: '',
        created_by_admin_employee_id: '',
        step_approve: []
    
        // dest_warehouse_name: '',

        // firstPosted: false
    }),
    validate: (values, props) => {
        const errors = {};

        // Internal Document ID
        //  {DocumentTypeGroupAbbreviation}-{WH Abbreviation}-{Year}-{Auto Increment ID}
        //  ie. GR-PYO-2563/0001
        // let internalDocumentIDRegex = /^(GP|GT|GR|GU|GI|IT|GX|GF|PC|IA|SR|SS)-[A-Z]{3}-\d{4}\/\d{4}$/g
        // let draftInternalDocumentIDRegex= /^draft-\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b$/g
        // if (!values.internal_document_id) {
        //     errors.internal_document_id = 'Required';
        // }else if (!internalDocumentIDRegex.test(values.internal_document_id)){ //&& !draftInternalDocumentIDRegex.text(values.internal_document_id)
        //     errors.internal_document_id = 'Invalid Document ID Format\nBe sure to use the format ie. GR-PYO-2563/0001'
        // }
        // MOVED TO FIELD
        if (!values.document_date){
            errors.document_date = "Required";
        }
        return errors;
    },
    handleSubmit: (values, formikBag) => {
        
        console.log("i am submitting", values)
        console.log("i have facts on submit", formikBag.props)
        console.log("I AM SUBMITTING ", packDataFromValues(formikBag.props.fact, values, DOCUMENT_TYPE_ID.GOODS_RECEIPT_PO) )
        alert(JSON.stringify(values, null, 2));
      },    
    // validateOnChange: false,
})(GoodsReceiptComponent);



const mapStateToProps = (state) => ({
    toolbar: state.toolbar,
    decoded_token: state.token.decoded_token,
    actionMode: state.goods_receipt.action,
    fact: state.api.fact,
})

const mapDispatchToProps = {
    handleClickHomeToSpareMain, toModeSearch, onClearStateModeAdd, handleClickAdd, fetchFactIfNeeded, 
    decodeTokenIfNeeded, handleClickRefresh, handleClickForward, handleClickBackward, footerToModeAddDraft, footerToModeSearch
}

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedGoodsReceiptComponent);