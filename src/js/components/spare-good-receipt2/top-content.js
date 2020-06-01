import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';


import FormInput from '../common/form-input'
import TextInput from '../common/formik-text-input'
import DateTimeInput from '../common/formik-datetime-input'

import { useFormikContext, useField } from 'formik';

import PopupModalDocument from '../common/popup-modal-document'
import PopupModalInventory from './popup-modal-inventory'
import PopupModalUsername from '../common/popup-modal-username'
import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';


const responseToFormState = (data) => {
  for (var i = data.line_items.length; i <= 9; i++) {
    data.line_items.push(
      {
        "item_id": "",
        "internal_item_id": "",
        "description": "",
        "quantity": "",
        "uom_group_id": "",
        "unit": "",
        "per_unit_price": "",
        "list_uoms": []
      }
    );
  }
  return {
    internal_document_id: data.internal_document_id,
    created_by_user_employee_id: data.created_by_user_employee_id,
    created_on: data.created_on.split(".")[0],
    line_items: data.line_items,
    dest_warehouse_id: data.dest_warehouse_id,
    remark: data.remark,
    status_name_th: data.status_name,
  }

}


function getEmployeeIDFromUserID(userFact, userID) {
  let users = userFact.items;
  if (users && users.length > 0) {
    let user = users.find(user => user.user_id === userID)
    if (user) {
      return user.employee_id;
    }
  }
  return null;
}

const TopContent = (props) => {
  useEffect(() => {
    document.getElementById("defaultOpen").click();
  }, []);

  const {values, errors,setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField} = useFormikContext();

  // Fill Default Forms
  useEffect(() => {
    if(props.actionMode === TOOLBAR_MODE.ADD){
      setFieldValue("created_by_admin_employee_id", getEmployeeIDFromUserID(props.fact.users, props.decoded_token.id));
      validateField("created_by_admin_employee_id");
    }
  }, [props.decoded_token, props.fact.users, props.actionMode])


  function tapChange(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  const validateInternalDocumentIDField = internal_document_id => new Promise(resolve => {
    if (!internal_document_id) {
      return resolve(); // Resolve doesn't return
    }
    let error;
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/internal_document_id/${internal_document_id}`;
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
      .then((res) => {
        if (res.data.internal_document_id === internal_document_id) { // If input document ID exists
          if (props.actionMode === TOOLBAR_MODE.SEARCH) { //If Mode Search, needs to set value
            setValues({ ...values, ...responseToFormState(res.data) }, false); //Setvalues and don't validate
          } else { //If Mode add, need to error duplicate Document ID
            error = 'Duplicate Document ID';
          }
        } else { // If input Document ID doesn't exists
          if (props.actionMode === TOOLBAR_MODE.SEARCH) { //If Mode Search, invalid Document ID
            error = 'Invalid Document ID';
          }//If mode add, ok
        }
      })
      .finally(() => {
        resolve(error)
      });
  });

  const validateEmployeeIDField = (fieldName, employee_id) => {
    employee_id = employee_id.split('\\')[0]; // Escape Character USERNAME CANT HAVE ESCAPE CHARACTER!
    let users = props.fact.users.items;
    let user = users.find(user => user.employee_id === employee_id); // Returns undefined if not found
    if(user){
      setFieldValue(fieldName, `${employee_id}\\${user.firstname_th} ${user.lastname_th}`, false);
      return;
    }else{
      return 'Invalid Employee ID';
    }
  };

  const validateUserEmployeeIDField = (...args) => validateEmployeeIDField("created_by_user_employee_id", ...args);
  const validateAdminEmployeeIDField = (...args) => validateEmployeeIDField("created_by_admin_employee_id", ...args);

  return (
    <div id="blackground-white">
      <div className="container_12 clearfix">
        <section className="container_12 ">
          <h4 className="head-title">นำอะไหล่เข้าโดยมีใบสั่งซื้อ</h4>
          <div className="container_12">

            {/* Document ID */}
            <div className="grid_2">
              <p className="top-text">เลขที่เอกสาร</p>
            </div>
            <div className="grid_3 pull_1">
              <TextInput name='internal_document_id' validate={validateInternalDocumentIDField}
                searchable={props.actionMode === TOOLBAR_MODE.SEARCH} ariaControls="modalDocument" tabIndex="1" />
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
                disabled={props.actionMode === TOOLBAR_MODE.SEARCH}
                searchable={props.actionMode !== TOOLBAR_MODE.SEARCH} ariaControls="modalUserName" tabIndex="2" />
            </div>

            {/* Created On */}
            <div className="grid_3 float-right">
              <DateTimeInput name="created_on" /*validate={validateCreateOnField */
                disabled={props.actionMode === TOOLBAR_MODE.SEARCH} />
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

            {/* Dest Warehouse ID */}
            <div className="grid_3 float-right">
              <TextInput name="dest_warehouse_id" disabled={props.actionMode === TOOLBAR_MODE.SEARCH}
                searchable={props.actionMode !== TOOLBAR_MODE.SEARCH} ariaControls="modalInventory" />
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">เลขที่คลัง</p>
            </div>

          </div>

          {/* PO ID */}
          <div className="container_12">
            <div className="grid_2">
              <p className="top-text">เลขที่ใบสั่งซื้อ/เลขที่เอกสารอ้างอิง</p>
            </div>
            <div className="grid_3 pull_0">
              <TextInput name="po_id" disabled={props.actionMode === TOOLBAR_MODE.SEARCH} />
            </div>

            {/* Dest Warehouse Name */}
            <div className="grid_3 float-right">
              <TextInput name="dest_warehouse_name" disabled />
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">ชื่อคลัง</p>
            </div>
          </div>
        </section>

        <div className="container_12">
          <div className="tab grid_11">
            <button type="button" id="defaultOpen" className="tablinks" onClick={e => tapChange(e, "รายการ")}>รายการ</button>
            <button type="button" className="tablinks" onClick={e => tapChange(e, "แนบไฟล์")}>แนบไฟล์</button>
          </div>
        </div>

      </div>

      {/* PopUp ค้นหาเลขที่เอกสาร */}
      <PopupModalDocument />

      {/* PopUp ค้นหาเลขที่คลัง MODE ADD */}
      <PopupModalInventory />

      {/* PopUp ค้นหาชื่อพนักงาน MODE ADD */}
      <PopupModalUsername />  

    </div>
  )

}
const mapStateToProps = (state) => ({
  fact: state.api.fact,
  actionMode: state.toolbar.mode,
  decoded_token: state.token.decoded_token,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TopContent);
