import React, { useEffect, useState } from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux'

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
import PopupModalDocumentSS101 from '../common/popup-modal-ref-document'
import PopupModalInventory from '../common/popup-modal-inventory'
import PopupModalUsername from '../common/popup-modal-username'
import { TOOLBAR_MODE, TOOLBAR_ACTIONS, toModeAdd } from '../../redux/modules/toolbar.js';
import {
  getEmployeeIDFromUserID, fetchStepApprovalDocumentData,
  DOCUMENT_TYPE_ID, getDocumentbyInternalDocumentID,
  isValidInternalDocumentIDFormat, isValidInternalDocumentIDDraftFormat,
  fetchAttachmentDocumentData, validateEmployeeIDField, validateWarehouseIDField,
  validateInternalDocumentIDFieldHelper, DOCUMENT_STATUS, getUserIDFromEmployeeID,
  validatedataDocumentField, checkBooleanForEditHelper
} from '../../helper';
import { FACTS } from '../../redux/modules/api/fact.js';

import { FOOTER_MODE, FOOTER_ACTIONS } from '../../redux/modules/footer.js';
import useFillDefaultsOnModeAdd from '../../hooks/fill-defaults-on-mode-add'

import { fetchPositionPermissionData, changeTheam } from '../../helper.js'
// For Search S16/46
const setLineItem = (data) => {
  for (var i = data.line_items.length; i <= 9; i++) {
    data.line_items.push(
      {
        item_id: "",
        internal_item_id: "",
        description: "",
        quantity: "",
        uom_group_id: "",
        unit: "",
        per_unit_price: "",
        list_uoms: []
      }
    );
  }
  return data.line_items;
}


const TopContent = (props) => {
  const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
  const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
  const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
  const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);
  const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);

  // Fill Default Forms
  useFillDefaultsOnModeAdd(DOCUMENT_TYPE_ID.GOODS_RECEIPT_FIX);

  const validateInternalDocumentIDField = (...args) => validateInternalDocumentIDFieldHelper(checkBooleanForEdit, DOCUMENT_TYPE_ID.GOODS_RECEIPT_FIX, toolbar, footer, fact, values, setValues, setFieldValue, validateField, ...args);

  const validateUserEmployeeIDField = (...args) => validateEmployeeIDField("created_by_user_employee_id", fact, setFieldValue, ...args);
  const validateAdminEmployeeIDField = (...args) => validateEmployeeIDField("created_by_admin_employee_id", fact, setFieldValue, ...args);

  const validateDestWarehouseIDField = (...args) => validateWarehouseIDField("dest_warehouse_id", props.fact, setFieldValue, ...args);

  const validateInternalDocumentSS101ID = refer_to_document_internal_document_id => new Promise(resolve => {
    // Internal Document ID
    //  {DocumentTypeGroupAbbreviation}-{WH Abbreviation}-{Year}-{Auto Increment ID}
    //  ie. GR-PYO-2563/0001
    // console.log("I am validating document id")
    let internalDocumentIDRegex = /^(GP|GT|GR|GU|GI|IT|GX|GF|PC|IA|SR|SS|MI)-[A-Z]{3}-\d{4}\/\d{4}$/g
    let draftInternalDocumentIDRegex = /^draft-\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b$/g
    // let draftInternalDocumentIDRegex = /^heh/g
    // if (!refer_to_document_internal_document_id) {
    //   return resolve('Required');
    // } else if (!internalDocumentIDRegex.test(refer_to_document_internal_document_id) && !draftInternalDocumentIDRegex.test(refer_to_document_internal_document_id)) { //
    //   return resolve('Invalid Document ID Format\nBe sure to use the format ie. S1646-PYO-2563/0001')
    // }

    if (refer_to_document_internal_document_id) {
      if (!internalDocumentIDRegex.test(refer_to_document_internal_document_id) && !draftInternalDocumentIDRegex.test(refer_to_document_internal_document_id)) { //
        return resolve('Invalid Document ID Format\nBe sure to use the format ie. S1646-PYO-2563/0001')
      }
    }
    if (values.refer_to_document_internal_document_id === refer_to_document_internal_document_id) {
      return resolve(null);
    }
    // if (!refer_to_document_internal_document_id) {
    //   return resolve(); // Resolve doesn't return
    // }
    let error;
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/internal_document_id/${encodeURIComponent(refer_to_document_internal_document_id)}`;
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
      .then((res) => {
        console.log("res.data", res.data)
        if (res.data.document.internal_document_id === refer_to_document_internal_document_id) { // If input document ID exists
          setFieldValue("line_items", setLineItem(res.data.specific), false)
          setFieldValue("refer_to_document_id", res.data.document.document_id, false)
          return resolve(null);
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

  let checkBooleanForEdit = checkBooleanForEditHelper(values, decoded_token, fact);
  useEffect(() => {
    checkBooleanForEdit = false
    validateField("internal_document_id")
  }, [values.internal_document_id])

  return (
    <div id={changeTheam() === true ? "" : "blackground-white"}>
      <div className="container_12 clearfix">
        <section className="container_12 ">
          <h4 className="head-title">รับคืนอะไหล่ส่งซ่อม</h4>

          <div id={changeTheam() === true ? "blackground-white" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray", height: "150px", paddingTop: "10px" } : {}} >

            <div className="container_12">

              {/* Document ID */}
              <div className="grid_2">
                <p className="top-text">เลขที่เอกสาร</p>
              </div>
              <div className="grid_3 pull_1">
                <TextInput name='internal_document_id' validate={validateInternalDocumentIDField}
                  searchable={toolbar.mode === TOOLBAR_MODE.SEARCH} ariaControls="modalDocument" tabIndex="1" />
              </div>

              {/* Document Status  */}
              <div className="grid_3 float-right">
                <TextInput name="status_name_th" disabled />
              </div>
              <div className="grid_2 float-right">
                <p className="top-text float-right">สถานะ</p>
              </div>
            </div>

            <div className="container_12">
              {/* Created by User */}
              <div className="grid_2">
                <p className="top-text">ผู้นำเข้า</p>
              </div>
              <div className="grid_3 pull_1">
                {/* Q: If this is user name in thai, how do we get ID? */}
                <TextInput name="created_by_user_employee_id" validate={validateUserEmployeeIDField}
                  disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                  searchable={checkBooleanForEdit === true ? true : toolbar.mode !== TOOLBAR_MODE.SEARCH} ariaControls="modalUserName" tabIndex="2" />
              </div>

              {/* Created On */}
              <div className="grid_3 float-right">
                <DateTimeInput name="created_on" /*validate={validateCreateOnField */
                  disabled />
              </div>
              <div className="grid_2 float-right">
                <p className="top-text float-right">วันที่</p>
              </div>
            </div>

            <div className="container_12">
              {/* Admin Name */}
              <div className="grid_2">
                <p className="top-text">ผู้สร้างเอกสาร</p>
              </div>
              <div className="grid_3 pull_1">
                <TextInput name="created_by_admin_employee_id" validate={validateAdminEmployeeIDField} disabled />
              </div>

              {/* Document date */}
              <div className="grid_3 float-right">
                <DateInput name="document_date"
                  disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="3" />
              </div>
              <div className="grid_2 float-right">
                <p className="top-text float-right">วันที่เอกสาร</p>
              </div>

            </div>

            <div className="container_12">
              <div className="grid_2">
                <p className="top-text">เอกสารอ้างอิง</p>
              </div>
              <div className="grid_3 pull_1">
                <TextInput name="refer_to_document_internal_document_id"
                  validate={validateInternalDocumentSS101ID}
                  disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                  searchable={checkBooleanForEdit === true ? true : toolbar.mode !== TOOLBAR_MODE.SEARCH} ariaControls="modalDocument2" tabIndex="4" />
              </div>

              {/* Dest Warehouse ID */}
              <div className="grid_3 float-right">
                <TextInput name="dest_warehouse_id" validate={validateDestWarehouseIDField}
                  disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                  searchable={props.actionMode !== TOOLBAR_MODE.SEARCH} ariaControls="modalInventory" tabIndex="5" />
              </div>
              <div className="grid_2 float-right">
                <p className="top-text float-right">เลขที่คลัง</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* PopUp ค้นหาเลขที่เอกสาร */}
      <PopupModalDocument documentTypeGroupID={DOCUMENT_TYPE_ID.GOODS_RECEIPT_FIX}
        id="modalDocument" //For Open POPUP
        name="internal_document_id" //For setFieldValue
      />

      {/* PopUp ค้นหาเลขที่เอกสาร สส.101 */}
      <PopupModalDocumentSS101 documentTypeGroupID={DOCUMENT_TYPE_ID.MAINTENANT_ITEM}
        documentTypeGroupID2={DOCUMENT_TYPE_ID.SS101}
        id="modalDocument2"
        name="refer_to_document_internal_document_id" //For setFieldValue
      />

      {/* PopUp ค้นหาเลขที่คลัง MODE ADD */}
      <PopupModalInventory
        id="modalInventory" //For Open POPUP
        name="dest_warehouse_id" />

      {/* PopUp ค้นหาชื่อพนักงาน MODE ADD */}
      <PopupModalUsername />

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