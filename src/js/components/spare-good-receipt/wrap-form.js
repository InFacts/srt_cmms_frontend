import React from 'react';
import { connect } from 'react-redux'

import axios from "axios";

import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import TopContent from './top-content';
import BottomContent from './bottom-content';
import Footer from '../common/footer.js';

class WrapForm extends React.Component {

    handleSubmit = event => {
        event.preventDefault();
        const current = this;
        const line_items = [];
        var line_number = 1
        // console.log(list_show_mode_add)
        this.props.list_show_mode_add.map(function (item, index) {
            if (item.description !== "") {
                var myObj = {
                    "document_id": current.props.document_id,
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
                "document_id": this.props.document_id,
                "internal_document_id": this.props.document_show_mode_add.internal_document_id,
                "remark": this.props.document_show_mode_add.remark,
            },
            "specific": {
                "document_id": this.props.document_id,
                "dest_warehouse_id": parseInt(this.props.document_show_mode_add.dest_warehouse_id),
                "src_warehouse_id": 999,
                "line_items": line_items,
                "movement": {
                    "document_id": this.props.document_id,
                    "po_id": this.props.document_show_mode_add.po_id
                }
            }
        };
        console.log("data", data)

        axios.put(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/${this.props.document_id}/101`, data, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
            .then(res => {
                console.log(res);
            }).catch(function (err) {
                console.log(err);
            })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <TopContent />
                <BottomContent />
                <Footer />
            </form>
        )
    };
}

const mapStateToProps = (state) => ({
    actionMode: state.action,
    document_id: state.document_id,
    document_show_mode_add: state.document_show_mode_add,
    list_show_mode_add: state.list_show_mode_add
})
export default connect(mapStateToProps)(WrapForm);