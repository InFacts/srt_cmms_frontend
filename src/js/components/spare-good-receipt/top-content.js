import React, {useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
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

import '../../../css/style.css'
import '../../../css/grid12.css';
import '../../../css/modal.css';

import PopupModalDocument from './popup-modal-document'
import PopupModalInventoryEdit from './popup-modal-inventory-edit'
import PopupModalUsernameEdit from './popup-modal-username-edit'
import PopupModalInventory from './popup-modal-inventory'
import PopupModalUsername from './popup-modal-username'

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

  const checkAfterSearch = (created_by_user_name_th) => {
    if (created_by_user_name_th !== undefined) {
      return <button type="button" className="mb-0" style={{ padding: "0px 10px" }} onClick={(e) => props.onClickModeEdit(e)}>แก้ไข</button>
    }
  }

  const checkActionMode = (mode) => {
    return (
      <>
        <div className="container_12">
          <div className="grid_2">
            <p className="top-text">เลขที่เอกสาร</p>
          </div>
          <div className="grid_3 pull_1">
            {
              mode === "add" 
              ? <input type="text" className="p-search-box__input cancel-default" value={props.document_show_mode_add.internal_document_id} onChange={props.onChangeNoDocumentModeAdd} required />
              : (<div className="p-search-box cancel-margin">
              <input type="text" className="p-search-box__input cancel-default" value={props.no_document} onChange={props.onChangeNoDocument} />
              {mode === "search" &&
                <button type="button" className="p-search-box__button cancel-padding hidden" >
                  <i className="p-icon--search" id="showModalInventory" aria-controls="modalDocument" onClick={props.onClickOpenPopUp}></i>
                </button>
              }
            </div>)
            }
            
          </div>
          {mode === "search" &&
            <div className="grid_1 pull_1">
              {checkAfterSearch(props.document_show.created_by_user_name_th)}
            </div>
          }
          <div className="float-right">
          <div className="grid_2">
            <p className="top-text float-right">สถานะ</p>
          </div>
          <div className="grid_3">
            {
              mode === "search" 
              ? <input type="text" className="cancel-default" defaultValue={props.document_show.status_name_th} disabled="disabled"></input>
              : (
                mode === "edit"
                ?<input type="text" className="cancel-default" value={props.document_show.status_name_th} disabled="disabled"></input>
                : <input type="text" className="cancel-default" value={props.document_show_mode_add.document_status_id} disabled="disabled"></input>
              )
            }
          </div>
          </div>
        </div>

        <div className="container_12">
          <div className="grid_2">
            <p className="top-text">ผู้นำเข้า</p>
          </div>
          <div className="grid_3 pull_1">
            {
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
            }
            
          </div>
          <div className="float-right">
          <div className="grid_2">
            <p className="top-text float-right">วันที่</p>
          </div>
          <div className="grid_3">
            {
              mode === "search" 
              ? <input type="datetime-local" className="cancel-default" defaultValue={props.document_show.created_on !== undefined ? props.document_show.created_on.slice(0, 16) : null} disabled="disabled"></input>
              : 
                mode === "edit"
                ? <input type="datetime-local" className="cancel-default" value={props.document_show.created_on.slice(0, 16)} onChange={props.onChangeDate}></input>
                : <input type="datetime-local" className="cancel-default" value={props.document_show_mode_add.created_on} onChange={props.onChangeDateModeAdd} required></input>
            }
          </div>
          </div>
        </div>

        <div className="container_12">
          <div className="grid_2">
            <p className="top-text">ผู้สร้างเอกสาร</p>
          </div>
          <div className="grid_3 pull_1">
            {
              mode === "search" 
              ? <input type="text" className="cancel-default" defaultValue={props.document_show.created_by_admin_name_th} disabled="disabled"></input>
              : 
                mode === "edit"
                ? <input type="text" className="cancel-default" value={props.document_show.created_by_admin_name_th} onChange={props.onChangeNameByAdmin} disabled="disabled"></input>
                : <input type="text" className="cancel-default" value={props.document_show_mode_add.created_by_admin_name_th} disabled="disabled"></input>
            }
            
          </div>
          <div className="float-right">
          <div className="grid_2">
            <p className="top-text float-right">เลขที่คลัง</p>
          </div>
          <div className="grid_3">
            {
              mode === "search" 
              ? <input type="text" className="cancel-default" defaultValue={props.document_show.dest_warehouse_id} disabled="disabled"></input>
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
            }
            
          </div>
          </div>
        </div>

        <div className="container_12">
          <div className="grid_2">
            <p className="top-text">เลขที่ใบสั่งซื้อ/เลขที่เอกสารอ้างอิง</p>
          </div>
          <div className="grid_3 pull_0">
            {
              mode === "search" 
              ? <input type="text" className="cancel-default" defaultValue={props.document_show.po_id} disabled="disabled"></input>
              : 
                mode === "edit"
                ? <input type="text" className="cancel-default" value={props.document_show.po_id} onChange={props.onChangeNoPo}></input>
                : <input type="text" className="cancel-default" value={props.document_show_mode_add.po_id} onChange={props.onChangeNoPoModeAdd} required></input>
            }
            
          </div>
          <div className="float-right">
          <div className="grid_2">
            <p className="top-text float-right">ชื่อคลัง</p>
          </div>
          <div className="grid_3">
            {
              mode === "add"
              ? <input type="text" className="cancel-default" defaultValue={props.document_show_mode_add.dest_warehouse_name} disabled="disabled"></input>
              : <input type="text" className="cancel-default" defaultValue={props.document_show.dest_warehouse_name} disabled="disabled"></input>
            }
            
          </div>
          </div>
        </div>
      </>
    )
    
  }
  return (
    <div>
        <div id="blackground-white">
          <div className="container_12 clearfix">
            <section className="container_12 ">
              <h4 className="head-title">นำอะไหล่เข้าโดยมีใบสั่งซื้อ</h4>
              {checkActionMode(props.actionMode)}
            </section>

            <div className="container_12">
              <div className="tab grid_11">
                <button type="button" id="defaultOpen" className="tablinks" onClick={e => tapChange(e, "รายการ")}>รายการ</button>
                <button type="button" className="tablinks" onClick={e => tapChange(e, "แนบไฟล์")}>แนบไฟล์</button>
              </div>
            </div>

          </div>
        </div>

        {/* PopUp ค้นหาเลขที่เอกสาร */}
        <PopupModalDocument props={props}/>

        {/* PopUp ค้นหาเลขที่คลัง MODE EDIT */}
        <PopupModalInventoryEdit props={props}/>
        
        {/* PopUp ค้นหาชื่อพนักงาน MODE EDIT */}
        <PopupModalUsernameEdit props={props}/>
        

        {/* PopUp ค้นหาเลขที่คลัง MODE ADD */}
        <PopupModalInventory props={props}/>

        {/* PopUp ค้นหาชื่อพนักงาน MODE ADD */}
        <PopupModalUsername props={props}/>

      </div>
  )

}
const mapStateToProps = (state) => {
  state = state.goods_receipt
  return ({
    actionMode: state.action,
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
