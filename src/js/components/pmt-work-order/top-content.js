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
import PopupModalInventory from '../common/popup-modal-inventory'
import PopupModalUsername from '../common/popup-modal-username'
import { TOOLBAR_MODE, TOOLBAR_ACTIONS, toModeAdd } from '../../redux/modules/toolbar.js';
import { getEmployeeIDFromUserID } from '../../helper';


const responseToFormState = (userFact, data, step_approve, desrciption_files) => {
  for (var i = data.line_items.length; i <= 9; i++) {
    data.line_items.push(
      {
        internal_document_id: "",
        ref_document_id: "",
        document_date: "",
        document_creator: ""
      }
    );
  }
  return {
    internal_document_id: "sdsd",
    // created_by_user_employee_id: getEmployeeIDFromUserID(userFact, data.created_by_user_id) || '',
    // created_by_admin_employee_id: getEmployeeIDFromUserID(userFact, data.created_by_admin_id) || '',
    // created_on: data.created_on.split(".")[0],
    // line_items: data.line_items,
    // dest_warehouse_id: data.dest_warehouse_id,
    // remark: data.remark,
    // status_name_th: data.status_name,
    // po_id: data.po_id,

    // // Setup value From Approve and Attachment
    // step_approve: step_approve.approval_step === undefined ? [] : step_approve.approval_step,
    // desrciption_files_length: desrciption_files.length,
    // desrciption_files: desrciption_files
  }
}




const TopContent = (props) => {
    const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
    // Fill Default Forms
    useEffect(() => {
        if (props.toolbar.mode === TOOLBAR_MODE.ADD) {
        if (!values.internal_document_id && touched.internal_document_id){
            setFieldValue('internal_document_id', `draft-${uuidv4()}`)
        }
        setFieldValue("created_by_admin_employee_id", getEmployeeIDFromUserID(props.fact.users, props.decoded_token.id));
        setFieldValue("status_name_th", "ยังไม่ได้รับการบันทึก");
        setFieldValue("created_on", new Date().toISOString().slice(0, 16));
        // validateField("created_by_admin_employee_id");
        }
    }, [props.decoded_token, props.fact.users, props.toolbar.mode, touched.internal_document_id, !values.internal_document_id])

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

                // Start Axios Get step_approve and attachment By nuk
                axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/approval/${res.data.document_id}/latest/plus`, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
                .then((step_approve) => {
                    axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/attachment/${res.data.document_id}`, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
                    .then((desrciption_files) => {
                        console.log(" I AM STILL IN MODE SEARCH AND SET VALUE")
                        setValues({ ...values, ...responseToFormState(props.fact.users, res.data, step_approve.data, desrciption_files.data.results) }, false); //Setvalues and don't validate
                        validateField("dest_warehouse_id");
                        validateField("created_by_user_employee_id");
                        validateField("created_by_admin_employee_id");
                        // validateField("internal_document_id");
                        return resolve(null);
                    });
                });
                // End

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
                <section className="grid_12 ">
                    <h4 className="head-title">ออกใบสั่งซ่อมบำรุง</h4>
                    {/* Input in TopBar */}
                    <div className="grid_12">
                        <div className="grid_3"><p className="top-text">เลขที่เอกสารใบสั่งซ่อมบำรุง</p></div>
                        <div >
                        <div className="p-search-box cancel-margin grid_3 pull_0">
                            <TextInput name='internal_document_id' validate={validateInternalDocumentIDField} searchable={props.toolbar.mode === TOOLBAR_MODE.SEARCH} ariaControls="modalDocument" tabIndex="1" />
                            {/* <input type="search" className="p-search-box__input cancel-default" style={ {display: "flex"}} value={props.no_word_order_add} onChange={(e) => { props.onChangeNoWordOrderAdd(e) }}/> */}
                            <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showWorkOrder" aria-controls="modalWorkOrder"></i></button>
                        </div>
                        <div className="p-search-box cancel-margin grid_3  float-right">
                            <DateInput name="document_date" disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="3" />
                            {/* <input type="date" className="p-search-box__input cancel-default " value={props.create_date_time_add} onChange={(e) => props.onChangeCreateDatetimeAdd(e)}/> */}
                        </div>
                        <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">วันที่ออกเอกสาร</p></div>
                        </div>
                    </div>
                    <div className="grid_12">
                        <div className="grid_3"><p className="top-text">เลขที่เอกสารแจ้งเหตุขัดข้อง (ถ้ามี)</p></div>
                        <div >
                        <div className="p-search-box cancel-margin grid_3 pull_0">
                            <TextInput name='ref_document_id' searchable={props.toolbar.mode === TOOLBAR_MODE.SEARCH} ariaControls="modalDocument" tabIndex="1" />
                            {/* <input type="search" className="p-search-box__input cancel-default " />
                            <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showWorkOrder2" aria-controls="modalWorkOrder2"></i></button> */}
                        </div>
                        <div className="p-search-box cancel-margin grid_3   float-right">
                            <TextInput name='document_creator' searchable={props.toolbar.mode === TOOLBAR_MODE.SEARCH} ariaControls="modalDocument" tabIndex="1" />
                            {/* <input type="text" className=" p-search-box__input cancel-default  " value={props.create_name_add} onChange={(e) => props.onChangeCreateNameAdd(e)} ></input> */}
                        </div>
                        <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">ผู้สร้างเอกสาร</p></div>
                        </div>
                    </div>
                </section>
            </div>
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