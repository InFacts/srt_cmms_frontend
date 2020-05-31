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
import { useFormikContext , useField} from 'formik';

import PopupModalDocument from '../common/popup-modal-document'
import PopupModalInventoryEdit from './popup-modal-inventory-edit'
import PopupModalUsernameEdit from './popup-modal-username-edit'
import PopupModalInventory from './popup-modal-inventory'
import PopupModalUsername from './popup-modal-username'
import {TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';


const TextInput = ({ ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <div className="p-search-box cancel-margin">
        <input type='text' className='p-search-box__input cancel-default' {...field} {...props}/>
        {props.searchable &&
          <button type="button" className="p-search-box__button cancel-padding hidden" >
            <i className="p-icon--search" aria-controls={props.ariaControls} />
          </button>
        }
      </div>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};


const TopContent = (props) => {
  useEffect(() => {
    document.getElementById("defaultOpen").click();
  }, []);

  const {values, errors, handleChange, getFieldProps} = useFormikContext();

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

  function checkInternalDocumentID(e) {
    e.preventDefault();
    const documentID = e.target.value;
    const target = e.currentTarget;
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/search?document_type_group_id=101&internal_document_id=${documentID}`;
    
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
      .then((res) => {
          console.log(res.data);
          if (res.data.results[0] && res.data.results[0].internal_document_id === documentID){ // check if First Item exact match
            e.target.checkValidity();
          }else{
            setTimeout(() => target.focus()); //Omitted delay , execute on next tick
          }
      });

    
  }

  return (
    <div id="blackground-white">
      <div className="container_12 clearfix">
        <section className="grid_12 ">
          <h4 className="head-title">นำอะไหล่เข้าโดยมีใบสั่งซื้อ</h4>
          <div className="grid_12">

          {/* Document ID */}
          <div className="grid_2">
            <p className="top-text">เลขที่เอกสาร</p>
          </div>
          <div className="grid_3 pull_1">
            <TextInput name='internal_document_id' searchable={props.actionMode === TOOLBAR_MODE.SEARCH} ariaControls="modalDocument"/>
            {/* <div className="p-search-box cancel-margin">
              <FormInput field="internal_document_id" className="p-search-box__input cancel-default" 
                handleBlur={checkInternalDocumentID} required/> 
              <input type='text' name='internal_document_id' className='p-search-box__input cancel-default' 
                {...getFieldProps('internal_document_id')}/>
                

              {props.actionMode === TOOLBAR_MODE.SEARCH &&
                <button type="button" className="p-search-box__button cancel-padding hidden" >
                  <i className="p-icon--search" id="showModalInventory" aria-controls="modalDocument" onClick={props.onClickOpenPopUp}></i>
                </button>
              }
            </div>
            {<div>{errors.internal_document_id}</div>} */}
          </div>

          {/* Document Status  */}
          <div className="grid_3 float-right">
            <TextInput name="status_name_th" disabled />
            {/* <FormInput field="status_name_th" className="cancel-default" disabled /> */}
            {/* <input type='text' name='status_name_th' className='cancel-default' 
                {...getFieldProps('status_name_th')} disabled/> */}
          </div>
          <div className="grid_2 float-right">
            <p className="top-text float-right">สถานะ</p>
          </div>
        </div>

        <div className="grid_12">
          {/* Created by User */}
          <div className="grid_2">
            <p className="top-text">ผู้นำเข้า</p>
          </div>
          <div className="grid_3 pull_1">
            {/* Q: If this is user name in thai, how do we get ID? */}
            <TextInput name="created_by_user_name_th" disabled={props.actionMode === TOOLBAR_MODE.SEARCH} 
              searchable={props.actionMode !== TOOLBAR_MODE.SEARCH} ariaControls="modalUserName"/>
          {/* <div className="p-search-box cancel-margin"> */}
            {/* <FormInput field="created_by_user_name_th" className={'p-search-box__input  cancel-default'}
              disabled={props.actionMode === TOOLBAR_MODE.SEARCH} required/>
            {props.actionMode !== TOOLBAR_MODE.SEARCH &&
              <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalInventory" aria-controls="modalUserName"></i></button>
            }
            </div>   */}

          </div>

          {/* Created On */}
          <div className="grid_3 float-right">
            <input type="datetime-local" className="cancel-default" 
              value={props.document_show.created_on !== undefined ? props.document_show.created_on.slice(0, 16) : null} 
              disabled={props.actionMode === TOOLBAR_MODE.SEARCH} onChange={props.onChangeDate} required></input>
          </div>
          <div className="grid_2 float-right">
            <p className="top-text float-right">วันที่</p>
          </div>
        </div>
        

       
        <div className="grid_12">

          {/* Admin Name */}
          <div className="grid_2">
            <p className="top-text">ผู้สร้างเอกสาร</p>
          </div>
          <div className="grid_3 pull_1">
            <TextInput name="created_by_admin_name_th" disabled />
            {/* <FormInput field="created_by_admin_name_th" className="cancel-default" disabled /> */}
          </div>


          {/* Dest Warehouse ID */}
          <div className="grid_3 float-right">
            <TextInput name="dest_warehouse_id" disabled={props.actionMode === TOOLBAR_MODE.SEARCH}
              searchable={props.actionMode !== TOOLBAR_MODE.SEARCH} ariaControls="modalInventory"/>


          {/* <div className="p-search-box cancel-margin">
            <FormInput field="dest_warehouse_id" className="p-search-box__input cancel-default"
              disabled={props.actionMode === TOOLBAR_MODE.SEARCH} required/>
            { props.actionMode === TOOLBAR_MODE.SEARCH &&
              <button type="button" className="p-search-box__button cancel-padding hidden" >
                <i className="p-icon--search" id="showModalInventory" aria-controls="modalInventory"></i>
              </button>
            }
            </div> */}
          </div>
          <div className="grid_2 float-right">
            <p className="top-text float-right">เลขที่คลัง</p>
          </div>

        </div>

        {/* PO ID */}
        <div className="grid_12">
          <div className="grid_2">
            <p className="top-text">เลขที่ใบสั่งซื้อ/เลขที่เอกสารอ้างอิง</p>
          </div>
          <div className="grid_3 pull_0">
            <TextInput name="po_id" disabled={props.actionMode === TOOLBAR_MODE.SEARCH} />
            {/* <FormInput field="po_id" className="cancel-default" disabled={props.actionMode === TOOLBAR_MODE.SEARCH} required/> */}
          </div>

          {/* Dest Warehouse Name */}
          <div className="grid_3 float-right">
            <TextInput name="dest_warehouse_name" disabled/>
            {/* <FormInput field="dest_warehouse_name" className="cancel-default float-right" disabled/> */}
          </div>
          <div className="grid_2 float-right">
            <p className="top-text float-right">ชื่อคลัง</p>
          </div>
        </div>
      </section>

      <div className="grid_12">
        <div className="tab grid_11">
          <button type="button" id="defaultOpen" className="tablinks" onClick={e => tapChange(e, "รายการ")}>รายการ</button>
          <button type="button" className="tablinks" onClick={e => tapChange(e, "แนบไฟล์")}>แนบไฟล์</button>
        </div>
      </div>

    </div>

    {/* PopUp ค้นหาเลขที่เอกสาร */}
    <PopupModalDocument {...props}/>

    {/* PopUp ค้นหาเลขที่คลัง MODE EDIT */}
    <PopupModalInventoryEdit {...props}/>
    
    {/* PopUp ค้นหาชื่อพนักงาน MODE EDIT */}
    <PopupModalUsernameEdit {...props}/>
    

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
