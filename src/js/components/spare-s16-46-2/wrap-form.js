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
                    "item_status_id": 2
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
                "created_by_admin_id": document_show.created_by_admin_id,
                "created_by_user_id": document_show.created_by_user_id,
                "remark": document_show.remark,
            },
            "specific": {
                "document_id": document_id,
                "dest_warehouse_id": parseInt(document_show.dest_warehouse_id),
                "src_warehouse_id": parseInt(document_show.src_warehouse_id),
                "line_items": line_items,
                "movement": {
                    "document_id": document_id,
                    "transfer_method": document_show.transfer_method
                }
            }
        };
        console.log(data)
        return data;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(">>>>>> test <<<<<<<<")
        const current = this;
            if (this.props.actionMode === "add") {
                return (
                    axios.put(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/${this.props.document_id}/121`, this.packForm(this.props.document_id, this.props.document_show_mode_add, this.props.list_show_mode_add), { headers: { "x-access-token": localStorage.getItem('token_auth') } })
                        .then(res => {
                            console.log(res);
                            this.props.onClearStateModeAdd()
                        }).catch(function (err) {
                            console.log(err);
                        })
                )
            }
            if (this.props.actionMode === "edit") {
                return (
                    axios.put(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/${this.props.document_show.document_id}/121`, this.packForm(this.props.document_show.document_id, this.props.document_show, this.props.list_show), { headers: { "x-access-token": localStorage.getItem('token_auth') } })
                        .then(res => {
                            console.log(res);
                            this.props.onClearStateModeAdd()
                        }).catch(function (err) {
                            console.log(err);
                        })
                )
            }
            if (this.props.actionApproval === "check & approval") {
                console.log(">>>>>> approval <<<<<<<<")
                return (
                    // GET http://43.229.79.36:60013/approval/{document_id}/latest
                    // POST http://43.229.79.36:60013/approval/{document_id}/{approval_process_id}/approve
                    // "user_id": 1,
                    // "employee_id": "1203829",
                    // "username": "thanapapas",
                    // "email": "thanapapas@hotmail.com",
                    // "national_id": "1101700225444",
                    // "firstname_en": "Knight++",
                    // "lastname_en": "Horsuwan",
                    // "firstname_th": "ธนปภัส",
                    // "lastname_th": "หอสุวรรณ",
                    // "address": "250/107 Mooban Sammakorn Ramkhamhaeng 112 Sapansoong Bangkok 10240, Thailand",
                    // "birthdate": "1997-04-03T00:00:00.000Z",
                    // "phone": "+66806111234",
                    // "created_at": "2020-05-19T08:35:20.000Z",
                    // "updated_at": "2020-05-26T19:12:51.000Z",
                    // "is_approved": {
                    //     "type": "Buffer",
                    //     "data": [
                    //         1
                    //     ]
                    // },
                    // "active": {
                    //     "type": "Buffer",
                    //     "data": [
                    //         1
                    //     ]
                    // },
                    // "gender_id": 1,
                    // "title_id": 1,
                    // "level_id": 16
                    // "has_positions": [
                    //     {
                    //         "position_id": 33,
                    //         "name": "สารวัตรงานบำรุงรักษาอาณัติสัญญาณแขวงนครสวรรค์",
                    //         "abbreviation": "สสญ.นว.",
                    //         "position_group_id": 3,
                    //         "warehouse_id": null
                    //     }
                    // ],
                    // console.log(">>>>", this.props.approval_step_action_id)
                    axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/user/profile`, { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((resUser) => {
                        axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/approval/${this.props.document_show.document_id}/latest/step`, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
                        .then(res => {
                            
                            let obj_body = {
                                "step_number": res.data.waiting_step,
                                "user_id": resUser.data.user_id,
                                "approval_process_id": res.data.approval_process_id,
                                "approval_status_id": this.props.approval_step_action_id,
                                "position_group_id": resUser.data.has_positions[0].position_group_id,
                                "remark": "demo body"
                            }
                            console.log("obj_body", obj_body)
                            // /approval/{document_id}/{approval_process_id}/approve
                            // console.log(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/approval/${this.props.document_show.document_id}/${obj_body.approval_process_id}/approve`)
                            axios.post(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/approval/${this.props.document_show.document_id}/${obj_body.approval_process_id}/approve`, obj_body, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
                                .then(res => {
                                    console.log(res);
                                }).catch(function (err) {
                                    console.log(err);
                                })
                                
                        }).catch(function (err) {
                            console.log(err);
                        })
                    }).catch(function (err) {
                        console.log(err)
                    })
                    
                )
            }
    }

    render() {
        return (
            <form onSubmit={(e) => { if (window.confirm('คุณต้องการบันทึกใช่หรือไม่')) {return this.handleSubmit(e) }else { e.preventDefault(); }}}>
                <TopContent />
                <BottomContent />
                <Footer />
            </form>
        )
    };
}

const mapStateToProps = (state) => ({
    actionApproval: state.action_approval,
    actionMode: state.action,
    approval_step_action_id: state.approval_step_action_id,

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