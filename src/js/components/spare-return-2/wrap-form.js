import React from 'react';
import { connect } from 'react-redux'

import axios from "axios";

import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import TopContent from './top-content';
import BottomContent from './bottom-content';
import Footer from '../common/footer.js';

class WrapForm extends React.Component {

    packForm = (document_id, document_show, list_show) => {
        const current = this;
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
                line_number = line_number + 1;
                return (
                    line_items.push(myObj)
                )
            }
        })

        const data = {
            "document": {
                "document_id": document_id,
                "internal_document_id": document_show.internal_document_id,
                "remark": document_show.remark,
                "created_by_admin_id": document_show.created_by_admin_id,
                "created_by_user_id": document_show.created_by_user_id_database,
                "refer_to_document_id": document_show.refer_to_document_id,
            },
            "specific": {
                "document_id": document_id,
                "dest_warehouse_id": parseInt(document_show.dest_warehouse_id),
                "src_warehouse_id": 999,
                "line_items": line_items,
                "movement": {
                    "document_id": document_id,
                    
                }
            }
        };
        return data;
    }



    handleSubmit = e => {
        e.preventDefault();
        const current = this;
        

        if (this.props.actionMode === "add") {
            console.log(this.packForm(this.props.document_id, this.props.document_show_mode_add, this.props.list_show_mode_add));
            return (
                axios.put(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/${this.props.document_id}/131`, this.packForm(this.props.document_id, this.props.document_show_mode_add, this.props.list_show_mode_add), { headers: { "x-access-token": localStorage.getItem('token_auth') } })
                    .then(res => {
                        console.log(res);
                        this.props.onClearStateModeAdd()
                    }).catch(function (err) {
                        console.log(err);
                    })
            )
        }
        if (this.props.actionMode === "edit") {
            console.log(this.packForm(this.props.document_show.document_id, this.props.document_show, this.props.list_show));
            return (
                axios.put(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/${this.props.document_show.document_id}/131`, this.packForm(this.props.document_show.document_id, this.props.document_show, this.props.list_show), { headers: { "x-access-token": localStorage.getItem('token_auth') } })
                    .then(res => {
                        console.log(res);
                        this.props.onClearStateModeAdd()
                    }).catch(function (err) {
                        console.log(err);
                    })
            )
        }
    }

    render() {
        return (
            <div>
                <TopContent />
                <BottomContent />
                <form onSubmit={this.handleSubmit}>
                    <Footer />
                </form>
            </div>
        )
    };
}

const mapStateToProps = (state) => ({
    actionMode: state.action,

    // Mode Edit
    no_document: state.no_document,
    document_show: state.document_show,
    list_show: state.list_show,

    // Mode add
    document_id: state.document_id,
    document_show_mode_add: state.document_show_mode_add,
    list_show_mode_add: state.list_show_mode_add
})

const mapDispatchToProps = (dispatch) => ({
    onClearStateModeAdd: () => dispatch(onClearStateModeAdd())
})

export default connect(mapStateToProps, mapDispatchToProps)(WrapForm);
// Mode Search
export const onClearStateModeAdd = () => {
    console.log("onClearStateModeAdd")
    return {
        type: "ON CLEAR STATE MODE ADD"
    }
}