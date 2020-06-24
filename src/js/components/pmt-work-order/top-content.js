import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux'

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
import {
    getEmployeeIDFromUserID, fetchStepApprovalDocumentData, DOCUMENT_TYPE_ID, validateEmployeeIDField,
    validateWarehouseIDField, validateInternalDocumentIDFieldHelper, DOCUMENT_STATUS, validatedataDocumentField, getUserIDFromEmployeeID, checkBooleanForEditHelper
} from '../../helper';
import { FACTS } from '../../redux/modules/api/fact';
import Label from '../common/form-label'
import useFillDefaultsOnModeAdd from '../../hooks/fill-defaults-on-mode-add'

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { fetchPositionPermissionData, changeTheam } from '../../helper.js'
const TopContent = (props) => {
    const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
    const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
    const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);
    const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);
    const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();

    // Fill Default Forms
    useFillDefaultsOnModeAdd();

    const validateInternalDocumentIDField = (...args) => validateInternalDocumentIDFieldHelper(checkBooleanForEdit, DOCUMENT_TYPE_ID.WORK_ORDER, toolbar, footer, fact, values, setValues, setFieldValue, validateField, ...args);

    const validateUserEmployeeIDField = (...args) => validateEmployeeIDField("created_by_user_employee_id", fact, setFieldValue, ...args);
    const validateAdminEmployeeIDField = (...args) => validateEmployeeIDField("created_by_admin_employee_id", fact, setFieldValue, ...args);

    const validateDocumentDateField = (...args) => validatedataDocumentField("document_date", setFieldValue, ...args)

    const validateInternalDocumentWRID = refer_to_document_internal_id => new Promise(resolve => {
        // Internal Document ID
        //  {DocumentTypeGroupAbbreviation}-{WH Abbreviation}-{Year}-{Auto Increment ID}
        //  ie. GR-PYO-2563/0001
        // console.log("I am validating document id")
        let internalDocumentIDRegex = /^(GP|GT|GR|GU|GI|IT|GX|GF|PC|IA|SR|SS|WR)-[A-Z]{3}-\d{4}\/\d{4}$/g
        let draftInternalDocumentIDRegex = /^draft-\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b$/g
        // let draftInternalDocumentIDRegex = /^heh/g
        if (!refer_to_document_internal_id) {
          return resolve('Required');
        } else if (!internalDocumentIDRegex.test(refer_to_document_internal_id) && !draftInternalDocumentIDRegex.test(refer_to_document_internal_id)) { //
          return resolve('Invalid Document ID Format\nBe sure to use the format ie. S1646-PYO-2563/0001')
        }
    
        // if (!refer_to_document_internal_id) {
        //   return resolve(); // Resolve doesn't return
        // }
        let error;
        const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/internal_document_id/${encodeURIComponent(refer_to_document_internal_id)}`;
        axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
          .then((res) => {
            if (res.data.document.internal_document_id === refer_to_document_internal_id) { // If input document ID exists
              // if (props.toolbar.mode === TOOLBAR_MODE.SEARCH && !props.toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]) { //If Mode Search, needs to set value 
              // console.log(" I AM STILL IN MODE ADD AND SET VALUE")
              // setValues({ ...values, ...responseToFormState(res.data) }, false); //Setvalues and don't validate
              setFieldValue("refer_to_document_id", res.data.document.document_id, false)
              // setFieldValue("line_items", setLineItem(res.data), false)
              return resolve(null);
              // } else { //If Mode add, need to error duplicate Document ID
              //   console.log("I AM DUPLICATE")
              //   error = 'Duplicate Document ID';
              // }
            } else { // If input Document ID doesn't exists
              // console.log("I KNOW IT'sINVALID")
              error = 'Invalid Document ID';
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

    const checkBooleanForEdit = checkBooleanForEditHelper(values, decoded_token, fact)
    return (
        <div id={changeTheam() === true ? "" : "blackground-white"}>
            <div className="container_12 clearfix" style={{ marginTop: "55px" }}>
                {/* Section Title */}
                <h4 className="head-title">ออกใบสั่งซ่อมบำรุง</h4>

                <div id={changeTheam() === true ? "blackground-white" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray", height: "150px", paddingTop: "10px" } : {}} >
                    {/* === Left Column === */}
                    <div className={changeTheam() === true ? "grid_5" : "grid_6"} style={{ paddingLeft: "10px" }}>
                        {/* Document ID */}
                        <div className="grid_1 alpha white-space">
                            <p className="top-text">เลขที่เอกสาร</p>
                        </div>
                        <div className="grid_3 alpha">
                            <TextInput name='internal_document_id'
                                validate={validateInternalDocumentIDField}
                                searchable={toolbar.mode === TOOLBAR_MODE.SEARCH}
                                ariaControls="modalDocument"
                                tabIndex="1" />
                        </div>
                        <div class="clear" />

                        {/* User Employee ID  */}
                        <div className="grid_1 alpha white-space">
                            <p className="top-text">ผู้ดำเนินเรื่อง</p>
                        </div>
                        <div className="grid_3 alpha">
                            <TextInput name="created_by_user_employee_id"
                                validate={validateUserEmployeeIDField}
                                searchable={checkBooleanForEdit === true ? true : toolbar.mode !== TOOLBAR_MODE.SEARCH}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                                ariaControls="modalUserName"
                                tabIndex="2" />
                        </div>
                        <div class="clear" />


                        {/* Admin Employee ID  */}
                        <div className="grid_1 alpha white-space">
                            <p className="top-text">ผู้สร้างเอกสาร</p>
                        </div>
                        <div className="grid_3">
                            <TextInput name="created_by_admin_employee_id"
                                validate={validateAdminEmployeeIDField}
                                disabled
                                tabIndex="3" />
                        </div>
                        <div class="clear" />

                        {/* refer_to_document_internal_id  */}
                        <div className="grid_2 alpha omega white-space">
                            <p className="top-text">เลขที่เอกสารแจ้งเหตุขัดข้อง</p>
                        </div>
                        <div className="grid_3 omega">
                            <TextInput name='refer_to_document_internal_id'
                                validate={validateInternalDocumentWRID}
                                searchable={checkBooleanForEdit === true ? true : toolbar.mode !== TOOLBAR_MODE.SEARCH}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                                ariaControls="modalDocument2"
                                tabIndex="4" />
                        </div>
                        <div class="clear" />
                    </div>

                    {/* === Right Column === */}
                    <div className="grid_6 prefix_2">
                        {/* Document Status  */}
                        <Label>สถานะ</Label>
                        <div className="grid_3 alpha">
                            <TextInput name="status_name_th"
                                disabled
                                tabIndex="5" />
                        </div>
                        <div class="clear" />

                        {/* Created On */}
                        <Label>วันที่</Label>
                        <div className="grid_3 alpha">
                            <DateTimeInput name="created_on"
                                disabled
                                tabIndex="6" />
                        </div>
                        <div class="clear" />

                        {/* Document date */}
                        <Label>วันที่เอกสาร</Label>
                        <div className="grid_3 alpha">
                            <DateInput name="document_date" validate={validateDocumentDateField}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                                tabIndex="7" />
                        </div>
                        <div class="clear" />
                    </div>
                </div>
            </div>
            <PopupModalDocument
                documentTypeGroupID={DOCUMENT_TYPE_ID.WORK_ORDER}
                id="modalDocument" //For Open POPUP
                name="internal_document_id" //For setFieldValue 
            />

            <PopupModalDocument
                documentTypeGroupID={DOCUMENT_TYPE_ID.WORK_REQUEST}
                id="modalDocument2" //For Open POPUP
                name="refer_to_document_internal_id" //For setFieldValue 
            />

            {/* PopUp ค้นหาชื่อพนักงาน MODE ADD */}
            <PopupModalUsername />
        </div>
    )
}
export default TopContent;