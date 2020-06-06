import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';
import { v4 as uuidv4 } from 'uuid';

import FormInput from '../common/form-input'
import TextInput from '../common/formik-text-input'
import DateTimeInput from '../common/formik-datetime-input'
import DateInput from '../common/formik-date-input'

import { useFormikContext, useField } from 'formik';

import PopupModalDocument from '../common/popup-modal-document'
import PopupModalUsername from '../common/popup-modal-username'
import { TOOLBAR_MODE, TOOLBAR_ACTIONS, toModeAdd } from '../../redux/modules/toolbar.js';
import { getEmployeeIDFromUserID } from '../../helper';

const responseToFormState = (userFact, data, step_approve, desrciption_files) => {
    // for (var i = data.line_items.length; i <= 9; i++) {
    //   data.line_items.push(
    //     {
    //       item_id: "",
    //       internal_item_id: "",
    //       description: "",
    //       quantity: "",
    //       uom_group_id: "",
    //       unit: "",
    //       per_unit_price: "",
    //       list_uoms: []
    //     }
    //   );
    // }
    return {
        //   internal_document_id: data.internal_document_id,
        //   created_by_user_employee_id: getEmployeeIDFromUserID(userFact, data.created_by_user_id) || '',
        //   created_by_admin_employee_id: getEmployeeIDFromUserID(userFact, data.created_by_admin_id) || '',
        //   created_on: data.created_on.split(".")[0],
        //   line_items: data.line_items,
        //   dest_warehouse_id: data.dest_warehouse_id,
        //   remark: data.remark,
        //   status_name_th: data.status_name,
        //   po_id: data.po_id,

        //   // Setup value From Approve and Attachment
        //   step_approve: step_approve.approval_step === undefined ? [] : step_approve.approval_step,
        //   desrciption_files_length: desrciption_files.length,
        //   desrciption_files: desrciption_files
    }
}

const TopContent = (props) => {

    const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();

    const validateInternalDocumentIDField = internal_document_id => new Promise(resolve => {
        // Internal Document ID
        //  {DocumentTypeGroupAbbreviation}-{WH Abbreviation}-{Year}-{Auto Increment ID}
        //  ie. GR-PYO-2563/0001
        console.log("I am validating document id")
        let internalDocumentIDRegex = /^(GP|GT|GR|GU|GI|IT|GX|GF|PC|IA|SR|SS)-[A-Z]{3}-\d{4}\/\d{4}$/g
        let draftInternalDocumentIDRegex = /^draft-\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b$/g
        // let draftInternalDocumentIDRegex = /^heh/g
        if (!internal_document_id) {
            return resolve('Required');
        } else if (!internalDocumentIDRegex.test(internal_document_id) && !draftInternalDocumentIDRegex.test(internal_document_id)) { //
            return resolve('Invalid Document ID Format\nBe sure to use the format ie. GR-PYO-2563/0001')
        }
        // if (!internal_document_id) {
        //   return resolve(); // Resolve doesn't return
        // }
        let error;
        const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/internal_document_id/${encodeURIComponent(internal_document_id)}`;
        axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
            .then((res) => {
                if (res.data.internal_document_id === internal_document_id) { // If input document ID exists
                    if (props.toolbar.mode === TOOLBAR_MODE.SEARCH && !props.toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]) { //If Mode Search, needs to set value 
                        console.log(" I AM STILL IN MODE SEARCH AND SET VALUE")
                        setValues({ ...values, ...responseToFormState(props.fact.users, res.data) }, false); //Setvalues and don't validate
                        validateField("dest_warehouse_id");
                        validateField("created_by_user_employee_id");
                        validateField("created_by_admin_employee_id");
                        // validateField("internal_document_id");
                        return resolve(null);

                    } else { //If Mode add, need to error duplicate Document ID
                        console.log("I AM DUPLICATE")
                        error = 'Duplicate Document ID';
                    }
                } else { // If input Document ID doesn't exists
                    if (props.toolbar.mode === TOOLBAR_MODE.SEARCH) { //If Mode Search, invalid Document ID
                        console.log("I KNOW IT'sINVALID")
                        error = 'Invalid Document ID';
                    } else {//If mode add, ok
                    }
                }
            })
            .catch((err) => { // 404 NOT FOUND  If input Document ID doesn't exists
                if (props.toolbar.mode === TOOLBAR_MODE.SEARCH) { //If Mode Search, invalid Document ID
                    error = 'Invalid Document ID';
                }//If mode add, ok
            })
            .finally(() => {
                return resolve(error)
            });
    });

    return (
        <div id="blackground-white">
            <div className="container_12 clearfix">
                <section className="container_12 ">
                    <h4 className="head-title">สรุปการซ่อมบำรุง - แบบ สส.101</h4>
                    <div className="container_12">
                        <div className="grid_2"><p className="top-text">เลขที่เอกสาร</p></div>
                        <div className="grid_3  pull_0">
                            <TextInput name='internal_document_id' validate={validateInternalDocumentIDField}
                                searchable={props.toolbar.mode === TOOLBAR_MODE.SEARCH} ariaControls="modalDocument" tabIndex="1" />
                        </div>
                        <div className="grid_3  float-right">
                            <div className="p-search-box cancel-margin">
                                <input type="date" className="p-search-box__input cancel-default " disabled="disabled"
                                // defaultValue={this.props.document_show.create_name} 
                                />
                            </div>
                        </div>
                        <div className="grid_2 float-right">
                            <div className="cancel-default">
                                <p className="cancel-default float-right">วันที่ออกเอกสาร</p>
                            </div>
                        </div>
                    </div>

                    <div className="container_12">
                        <div className="grid_2"><p className="top-text">เลขที่เอกสารอ้างอิง</p></div>
                        <div>
                            <div className="p-search-box cancel-margin grid_3 pull_0">
                                <input type="search" className="p-search-box__input cancel-default "
                                    // defaultValue={this.props.document_show.no_document_ref} 
                                    disabled="disabled" />
                                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showss101-2" aria-controls="modalss101-2"></i></button>
                            </div>
                            <div className="p-search-box cancel-margin grid_3   float-right">
                                <input type="text" className=" p-search-box__input cancel-default"
                                    // defaultValue={this.props.document_show.date_start} 
                                    disabled="disabled"></input>
                            </div>
                            <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">ผู้สร้างเอกสาร</p></div>
                        </div>
                    </div>

                    <div className="container_12">
                        <div className="grid_2">
                            <p className="top-text">ชื่องาน</p>
                            <p className="top-text mt-1">วันเวลาที่เกิดเหตุ</p>
                            <p className="top-text">วันเวลาที่รับแจ้ง</p>
                        </div>
                        <div className="grid_3 pull_0">
                            <p className="top-text">
                                {/* {this.props.document_show.name} */}
                            </p>
                            <p className="top-text" >
                                {/* {this.props.document_show.date_time_start} */}
                            </p>
                            <p className="top-text">
                                {/* {this.props.document_show.date_time_end} */}
                            </p>
                        </div>
                        <div className="grid_3">
                            <p className="top-text">รายงานการตรวจซ่อมอุปกรณ์แขวง</p>
                            <p className="top-text">ได้รับเหตุจาก</p>
                            <p className="top-text">ได้รับข้อมูลผ่านช่องทาง</p>
                        </div>
                        <div className="grid_3 pull_0">
                            <p className="top-text">
                                {/* {this.props.document_show.report} */}
                            </p>
                            <p className="top-text">
                                {/* {this.props.document_show.cause} */}
                            </p>
                            <p className="top-text">
                                {/* {this.props.document_show.channel} */}
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            {/* PopUp ค้นหาเลขที่เอกสาร */}
            <PopupModalDocument />

        </div>
    )
}

const mapStateToProps = (state) => ({
    fact: state.api.fact,
    toolbar: state.toolbar,
    decoded_token: state.token.decoded_token,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TopContent);