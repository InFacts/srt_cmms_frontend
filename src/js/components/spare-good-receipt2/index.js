import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { useFormik , withFormik ,useFormikContext} from 'formik';

import { TOOLBAR_ACTIONS, handleClickHomeToSpareMain, toModeSearch, handleClickAdd, TOOLBAR_MODE } from '../../redux/modules/toolbar.js';
import { onClearStateModeAdd} from '../../redux/modules/goods_receipt.js';

import axios from "axios";

import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import TopContent from './top-content';
import BottomContent from './bottom-content';
import Footer from '../common/footer.js';

import {fetchFactIfNeeded , FACTS} from '../../redux/modules/api/fact';
import {decodeTokenIfNeeded} from '../../redux/modules/token';


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
    
    const {resetForm, setValues} = useFormikContext();


    // Initializer
    // Run only once with checking nothing []
    // 1. Change Toolbar to Mode Search
    useEffect(()=>{
        props.toModeSearch();
    }, []);

    // Handle home button, only re-subscribe if requiresHandleClick of HOME changes
    useEffect(()=> {
        if (props.toolbar.requiresHandleClick[TOOLBAR_ACTIONS.HOME]){
            props.handleClickHomeToSpareMain();
        }
    }, [props.toolbar.requiresHandleClick[TOOLBAR_ACTIONS.HOME]]);

    // Handle toolbar mode change: ADD, SEARCH
    useEffect(()=> {
        if (props.toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]){
            props.handleClickAdd(); // make handle click False
            resetForm();
        }
        if (props.toolbar.mode === TOOLBAR_MODE.SEARCH){
            resetForm();
        }
    }, [props.toolbar.mode]);

    // Fetch Fact If needed
    useEffect(() => {
        for (const factName of Object.values(FACTS)){
            props.fetchFactIfNeeded(factName);
        }
    }, []);
    // Decode Token If needed
    useEffect(() => {
        props.decodeTokenIfNeeded();
    }, []);

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
            <BottomContent />
            <Footer />
        </form>

    )
}

// const initialForm = 

const initialLineItem = {
    quantity: '',
    uom_id: '',
    per_unit_price: '',
    item_id: '',
    item_status_id: '',
    //Field ที่ไม่ได้กรอก
    line_number: '',
    document_id: '',
}

const EnhancedGoodsReceiptComponent = withFormik({
    mapPropsToValues: (props) => ({ 
        // Field ที่ให้ User กรอก
        internal_document_id: '',
        document_date: '',
    
        dest_warehouse_id: '',
        created_by_user_employee_id: '',
    
        po_id: '',
    
        remark: '',
    
        line_items: [],
    
        //Field ที่ไม่ได้กรอก
        document_id: '',
        created_on: '',
        status_name_th: '',
        document_status_id: '',
        created_by_admin_employee_id: '',
    
        dest_warehouse_name: '',
    }),
    validate: (values, props) => {
        const errors = {};

        if (!values.internal_document_id) {
          errors.internal_document_id = 'Required';
        }


        return errors;
    },
    handleSubmit: values => {
        console.log("i am submitting", values)
        alert(JSON.stringify(values, null, 2));
      },    
    validateOnChange: false,
})(GoodsReceiptComponent);



const mapStateToProps = (state) => ({
    toolbar: state.toolbar,
    decoded_token: state.token.decoded_token,
    actionMode: state.goods_receipt.action,
})

const mapDispatchToProps = {
    handleClickHomeToSpareMain, toModeSearch, onClearStateModeAdd, handleClickAdd, fetchFactIfNeeded, decodeTokenIfNeeded
}

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedGoodsReceiptComponent);
