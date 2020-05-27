import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import NavTopbar from '../nav/nav-top.js';
import Toolbar from '../common/nav-toolbar';
import { TOOLBAR_ACTIONS, handleClickHomeToSpareMain, toModeSearch } from '../../redux/modules/toolbar.js';
import { onClearStateModeAdd} from '../../redux/modules/goods_receipt.js';

import axios from "axios";

import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import TopContent from './top-content';
import BottomContent from './bottom-content';
import Footer from '../common/footer.js';

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
        <>
            <NavTopbar />
            <Toolbar />
            <form onSubmit={(e) => { if (window.confirm('คุณต้องการบันทึกใช่หรือไม่')) handleSubmit(e) }}>
                <TopContent />
                <BottomContent />
                <Footer />
            </form>
        </>
    )
}

const mapStateToProps = (state) => ({
    toolbar: state.toolbar,

    actionMode: state.goods_receipt.action,

    // Mode Edit
    no_document: state.goods_receipt.no_document,
    document_show: state.goods_receipt.document_show,
    list_show: state.goods_receipt.list_show,

    // Mode add
    document_id: state.goods_receipt.document_id,
    document_show_mode_add: state.goods_receipt.document_show_mode_add,
    list_show_mode_add: state.goods_receipt.list_show_mode_add
})

const mapDispatchToProps = {
    handleClickHomeToSpareMain, toModeSearch, onClearStateModeAdd
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodsReceiptComponent);
