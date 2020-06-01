import React, {useEffect } from 'react';
import { connect } from 'react-redux'

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import {
  onChangeNoDocument,
  onClickPopUpSearchNoDocument,
  onClickSelectNoDocument,
  onClickOpenPopUp,

  onClickModeEdit,

  // Mode Edit
  onChangeName,
  onChangeNameByAdmin,
  onChangeDate,
  onChangeMyInventory,
  onChangeNoPo,
  onClickPopUpSearchInventory,
  onClickSelectInventory,
  onChangeMyInventoryName,
  onClickSelectInventoryModeEdit,
  onChangeNameId,
  onClickPopUpSearchUserModeEdit,
  onClickSelectUserModeEdit,

  // Mode Add
  onChangeNoDocumentModeAdd,
  onChangeNameModeAdd,
  onChangeNameIdModeAdd,
  onChangeDateModeAdd,
  onChangeNoPoModeAdd,
  onChangeMyInventoryModeAdd,
  onChangeMyInventoryNameModeAdd,
  onClickPopUpSearchUser,
  onClickSelectUser,
} from '../../redux/modules/goods_receipt.js';

import FormInput from '../common/form-input'
import TextInput from '../common/formik-text-input'
import DateTimeInput from '../common/formik-datetime-input'

import { useFormikContext , useField} from 'formik';

import PopupModalDocument from '../common/popup-modal-document'
import PopupModalInventory from './popup-modal-inventory'
import PopupModalUsername from '../common/popup-modal-username'
import {TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';


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

const TopContent = (props) => {
  useEffect(() => {
    document.getElementById("defaultOpen").click();
  }, []);

  const {values, errors, handleChange, handleBlur, getFieldProps, setValues} = useFormikContext();

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
          if (res.data.internal_document_id === internal_document_id){ // check if First Item exact match
            setValues({...values, ...responseToFormState(res.data)}, false); //Setvalues and don't validate
          }else{
            console.log("INVALID DOCUMENT ID")
            error = 'Invalid Document ID'
          }
      })
      .finally(() => {
        resolve(error)
        console.log(' i run after solve')
      });
  });

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
              searchable={props.actionMode === TOOLBAR_MODE.SEARCH} ariaControls="modalDocument" tabIndex="1"/>
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
            <TextInput name="created_by_user_employee_id" disabled={props.actionMode === TOOLBAR_MODE.SEARCH} 
              searchable={props.actionMode !== TOOLBAR_MODE.SEARCH} ariaControls="modalUserName" tabIndex="2"/>
          </div>

          {/* Created On */}
          <div className="grid_3 float-right">
  <DateTimeInput name="created_on" /*validate={validateCreateOnField */
            disabled={props.actionMode === TOOLBAR_MODE.SEARCH}/>
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
            <TextInput name="created_by_admin_name_th" disabled />
          </div>

          {/* Dest Warehouse ID */}
          <div className="grid_3 float-right">
            <TextInput name="dest_warehouse_id" disabled={props.actionMode === TOOLBAR_MODE.SEARCH}
              searchable={props.actionMode !== TOOLBAR_MODE.SEARCH} ariaControls="modalInventory"/>
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
            <TextInput name="dest_warehouse_name" disabled/>
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
    <PopupModalInventory {...props}/>

    {/* PopUp ค้นหาชื่อพนักงาน MODE ADD */}
    <PopupModalUsername {...props}/>

  </div>
  )

}
const mapStateToProps = (state) => {
  var action = state.toolbar.mode;
  state = state.goods_receipt
  return ({
    actionMode: action,
    no_document: state.no_document,
    document_show_popup: state.document_show_popup,
    document_show: state.document_show,
    document_show_mode_add: state.document_show_mode_add,
    inventory_show_popup: state.inventory_show_popup,
    inventory: state.inventory,
    document_specific_show: state.document_specific_show,
    line_users: state.line_users
  })
}
const mapDispatchToProps = {
  onChangeNoDocument,
  onClickPopUpSearchNoDocument,
  onClickSelectNoDocument,
  onClickOpenPopUp,

  onClickModeEdit,

  // Mode Edit
  onChangeName,
  onChangeNameByAdmin,
  onChangeDate,
  onChangeMyInventory,
  onChangeNoPo,
  onClickPopUpSearchInventory,
  onClickSelectInventory,
  onChangeMyInventoryName,
  onClickSelectInventoryModeEdit,
  onChangeNameId,
  onClickPopUpSearchUserModeEdit,
  onClickSelectUserModeEdit,

  // Mode Add
  onChangeNoDocumentModeAdd,
  onChangeNameModeAdd,
  onChangeNameIdModeAdd,
  onChangeDateModeAdd,
  onChangeNoPoModeAdd,
  onChangeMyInventoryModeAdd,
  onChangeMyInventoryNameModeAdd,
  onClickPopUpSearchUser,
  onClickSelectUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(TopContent);
