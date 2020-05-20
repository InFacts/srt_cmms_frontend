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
                    "document_id": current.props.document_id,
                    "line_number": line_number,
                    "quantity": parseInt(item.quantity),
                    "uom_id": item.uom_id,
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
                "refer_to_document": document_show.refer_to_document,
                "remark": document_show.remark,
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



    handleSubmit = event => {
        event.preventDefault();
        const current = this;

        if (this.props.actionMode === "add" || this.props.actionMode === "edit") {
            return (
                axios.put(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/${this.props.document_id}/102`, this.packForm(this.props.document_id, this.props.document_show_mode_add, this.props.list_show_mode_add), { headers: { "x-access-token": localStorage.getItem('token_auth') } })
                    .then(res => {
                        console.log(res);
                    }).catch(function (err) {
                        console.log(err);
                    })
            )
        }
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
})
export default connect(mapStateToProps)(WrapForm);