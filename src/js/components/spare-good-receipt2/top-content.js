import React, {useEffect } from 'react';
import { connect } from 'react-redux'

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




import PopupModalDocument from './popup-modal-document'
import PopupModalInventoryEdit from './popup-modal-inventory-edit'
import PopupModalUsernameEdit from './popup-modal-username-edit'
import PopupModalInventory from './popup-modal-inventory'
import PopupModalUsername from './popup-modal-username'
import {TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';

const TopContent = (props) => {
  useEffect(() => {
    document.getElementById("defaultOpen").click();
  }, []);

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


  const checkActionMode = (mode) => {
    return (
      <>
        <div className="grid_12">
          {/* Document ID */}
          <div className="grid_2">
            <p className="top-text">เลขที่เอกสาร</p>
          </div>
          <div className="grid_3 pull_1">
            <div className="p-search-box cancel-margin">
              <FormInput field="internal_document_id" className="p-search-box__input cancel-default" required/>
              {/* <input type="text" className="p-search-box__input cancel-default" value={props.no_document} onChange={props.onChangeNoDocument} required/> */}

              {mode === TOOLBAR_MODE.SEARCH &&
                <button type="button" className="p-search-box__button cancel-padding hidden" >
                  <i className="p-icon--search" id="showModalInventory" aria-controls="modalDocument" onClick={props.onClickOpenPopUp}></i>
                </button>
              }
            </div>
            {/* {
              mode === "add" 
              ? <input type="text" className="p-search-box__input cancel-default" value={props.document_show_mode_add.internal_document_id} onChange={props.onChangeNoDocumentModeAdd} required />
              : (<div className="p-search-box cancel-margin">
              <input type="text" className="p-search-box__input cancel-default" value={props.no_document} onChange={props.onChangeNoDocument} />
              {mode === TOOLBAR_MODE.SEARCH &&
                <button type="button" className="p-search-box__button cancel-padding hidden" >
                  <i className="p-icon--search" id="showModalInventory" aria-controls="modalDocument" onClick={props.onClickOpenPopUp}></i>
                </button>
              }
            </div>)
            } */}
          </div>
          {/* No more แก้ไข button */}
          {/* {mode === TOOLBAR_MODE.SEARCH &&
            <div className="grid_1 pull_1">
              {props.document_show.created_by_user_name_th !== undefined &&
              <button type="button" className="mb-0" style={{ padding: "0px 10px" }} onClick={(e) => props.onClickModeEdit(e)}>แก้ไข</button>}
            </div>
          } */}

          {/* Document Status  */}
          <div className="grid_3 float-right">
            <FormInput field="status_name_th" className="cancel-default float-right" disabled />
            {/* <input type="text" className="cancel-default float-right" value={props.document_show.status_name_th} disabled="disabled"></input> */}
            {/* {
              mode === "search" 
              ? <input type="text" className="cancel-default float-right" defaultValue={props.document_show.status_name_th} disabled="disabled"></input>
              : (
                mode === "edit"
                ?<input type="text" className="cancel-default float-right" value={props.document_show.status_name_th} disabled="disabled"></input>
                : <input type="text" className="cancel-default float-right" value={props.document_show_mode_add.document_status_id} disabled="disabled"></input>
              )
            } */}
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
          <div className="p-search-box cancel-margin">
            {/* Q: What does p-search-box__input do? */}
            {/* Q: If this is user name in thai, how do we get ID? */}
            <FormInput field="created_by_user_name_th" className={`${(mode !== TOOLBAR_MODE.SEARCH) ? "p-search-box__input " : ""}cancel-default`}
              disabled={mode === TOOLBAR_MODE.SEARCH} required/>
            {/* <input type="text" className={`${(mode !== TOOLBAR_MODE.SEARCH) ? "p-search-box__input " : ""}cancel-default`} 
              value={props.document_show.created_by_user_name_th} onChange={props.onChangeName} disabled={mode === TOOLBAR_MODE.SEARCH} required></input> */}
            {mode !== TOOLBAR_MODE.SEARCH &&
              <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalInventory" aria-controls="modalUserName"></i></button>
            }
            {/* {
              mode === "search" 
              ? <input type="text" className="cancel-default" defaultValue={props.document_show.created_by_user_name_th} disabled="disabled"></input>
              : 
                mode === "edit"
                ? (
                  <div className="p-search-box cancel-margin">
                  <input type="text" className="p-search-box__input cancel-default" value={props.document_show.created_by_user_name_th} onChange={props.onChangeName} required />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalInventory" aria-controls="modalUserNameModeEdit"></i></button>
                </div>
                )
                : ( <div className="p-search-box cancel-margin">
                <input type="text" className="p-search-box__input cancel-default" value={props.document_show_mode_add.created_by_user_name_th} onChange={props.onChangeNameModeAdd} required />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalInventory" aria-controls="modalUserName"></i></button>
                </div>
                )
            } */}
            </div>
          </div>

          {/* Created On */}
          <div className="grid_3 float-right">
            <input type="datetime-local" className="cancel-default float-right" 
              value={props.document_show.created_on !== undefined ? props.document_show.created_on.slice(0, 16) : null} 
              disabled={mode === TOOLBAR_MODE.SEARCH} onChange={props.onChangeDate} required></input>
            {/* {
              mode === "search" 
              ? <input type="datetime-local" className="cancel-default float-right" defaultValue={props.document_show.created_on !== undefined ? props.document_show.created_on.slice(0, 16) : null} disabled="disabled"></input>
              : 
                mode === "edit"
                ? <input type="datetime-local" className="cancel-default float-right" value={props.document_show.created_on.slice(0, 16)} onChange={props.onChangeDate}></input>
                : <input type="datetime-local" className="cancel-default float-right" value={props.document_show_mode_add.created_on} onChange={props.onChangeDateModeAdd} required></input>
            } */}
            
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
            <FormInput field="created_by_admin_name_th" className="cancel-default" disabled />
            {/* <input type="text" className="cancel-default" value={props.document_show.created_by_admin_name_th} disabled="disabled"></input> */}
            {/* {
              mode === "search" 
              ? <input type="text" className="cancel-default" value={props.document_show.created_by_admin_name_th} disabled="disabled"></input>
              : 
                mode === "edit"
                ? <input type="text" className="cancel-default" value={props.document_show.created_by_admin_name_th} onChange={props.onChangeNameByAdmin} disabled="disabled"></input>
                : <input type="text" className="cancel-default" value={props.document_show_mode_add.created_by_admin_name_th} disabled="disabled"></input>
            } */}
          </div>


          {/* Dest Warehouse ID */}
          <div className="grid_3 float-right">
          <div className="p-search-box cancel-margin">
            <FormInput field="dest_warehouse_id" className={`${(mode !== TOOLBAR_MODE.SEARCH) ? "p-search-box__input " : ""}cancel-default`}
              disabled={mode === TOOLBAR_MODE.SEARCH} required/>
            {/* <input type="text" className={`${(mode !== TOOLBAR_MODE.SEARCH) ? "p-search-box__input " : ""}cancel-default`} onChange={props.onChangeMyInventory}
              value={props.document_show.dest_warehouse_id} disabled={mode === TOOLBAR_MODE.SEARCH} required/> */}
            { mode === TOOLBAR_MODE.SEARCH &&
              <button type="button" className="p-search-box__button cancel-padding hidden" >
                <i className="p-icon--search" id="showModalInventory" aria-controls="modalInventory"></i>
              </button>
            }
          
            {/* {
              mode === "search" 
              ? <input type="text" className="cancel-default float-right" defaultValue={props.document_show.dest_warehouse_id} disabled="disabled"></input>
              : 
                mode === "edit"
                ? (<div className="p-search-box cancel-margin">
                  <input type="text" className="p-search-box__input cancel-default" value={props.document_show.dest_warehouse_id} onChange={props.onChangeMyInventory} />
                  <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalInventory" aria-controls="modalInventoryEdit"></i></button>
                </div>)
                : (<div className="p-search-box cancel-margin">
                <input type="text" className="p-search-box__input cancel-default" value={props.document_show_mode_add.dest_warehouse_id} onChange={props.onChangeMyInventoryModeAdd} required />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalInventory" aria-controls="modalInventory"></i></button>
              </div>)
            } */}
            </div>
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
          <FormInput field="po_id" className="cancel-default" disabled={mode === TOOLBAR_MODE.SEARCH} required/>
          {/* <input type="text" className="cancel-default" onChange={props.onChangeNoPo}
            value={props.document_show.po_id} disabled={mode === TOOLBAR_MODE.SEARCH} required/> */}
            
            {/* {
              mode === "search" 
              ? <input type="text" className="cancel-default" defaultValue={props.document_show.po_id} disabled="disabled"></input>
              : 
                mode === "edit"
                ? <input type="text" className="cancel-default" value={props.document_show.po_id} onChange={props.onChangeNoPo}></input>
                : <input type="text" className="cancel-default" value={props.document_show_mode_add.po_id} onChange={props.onChangeNoPoModeAdd} required></input>
            } */}
            
          </div>

          {/* Dest Warehouse Name */}
          <div className="grid_3 float-right">
          <FormInput field="dest_warehouse_name" className="cancel-default float-right" disabled/>
          {/* <input type="text" className="cancel-default float-right" value={props.document_show.dest_warehouse_name} disabled="disabled"></input> */}
            {/* {
              mode === "add"
              ? <input type="text" className="cancel-default float-right" defaultValue={props.document_show_mode_add.dest_warehouse_name} disabled="disabled"></input>
              : <input type="text" className="cancel-default float-right" defaultValue={props.document_show.dest_warehouse_name} disabled="disabled"></input>
            } */}
          </div>
          <div className="grid_2 float-right">
            <p className="top-text float-right">ชื่อคลัง</p>
          </div>
        </div>
      </>
    )
    
  }
  return (
    <div>
        <div id="blackground-white">
          <div className="container_12 clearfix">
            <section className="grid_12 ">
              <h4 className="head-title">นำอะไหล่เข้าโดยมีใบสั่งซื้อ</h4>
              {checkActionMode(props.actionMode)}
            </section>

            <div className="grid_12">
              <div className="tab grid_11">
                <button type="button" id="defaultOpen" className="tablinks" onClick={e => tapChange(e, "รายการ")}>รายการ</button>
                <button type="button" className="tablinks" onClick={e => tapChange(e, "แนบไฟล์")}>แนบไฟล์</button>
              </div>
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
