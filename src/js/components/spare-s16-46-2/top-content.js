import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import axios from "axios";

import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import '../../../css/style.css'
import '../../../css/grid12.css';

class TopContent extends React.Component {

  componentDidMount() {
    document.getElementById("defaultOpen").click();
  }

  tapChange(evt, cityName) {
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

  checkAfterSearch = (created_by_user_name_th) => {
    if (created_by_user_name_th !== undefined) {
      return <button type="button" className="mb-0" style={{ padding: "0px 10px" }} onClick={(e) => this.props.onClickModeEdit(e)}>แก้ไข</button>
    }
  }

  checkTransfer = (transfer_method) => {
    if (transfer_method === "รับของเอง") {
      return (
        <select className="edit-select-top" onChange={(e) => this.props.onChangeTransfer(e)}>
          <option value="รับของเอง" selected> รับของเอง </option>
          <option value="ส่งไปยังคลังปลายทาง"> ส่งไปยังคลังปลายทาง </option>
        </select>
      )
    }
    else {
      return (
        <select className="edit-select-top" onChange={(e) => this.props.onChangeTransfer(e)}>
          <option value="รับของเอง"> รับของเอง </option>
          <option value="ส่งไปยังคลังปลายทาง" selected> ส่งไปยังคลังปลายทาง </option>
        </select>
      )
    }
  }

  checkActionMode = (mode) => {
    // console.log(mode)
    const current = this;
    if (mode === "home") {
      return (
        <Redirect to="/main"></Redirect>
      )
    }
    if (mode === "search") {
      return (
        <>
          <div className="grid_12">
            <div className="grid_2">
              <p className="top-text">เลขที่เอกสาร</p>
            </div>
            <div className="grid_3 pull_1">
              <div className="p-search-box cancel-margin">
                <input type="text" className="p-search-box__input cancel-default" value={this.props.no_document} onChange={(e) => this.props.onChangeNoDocument(e)} />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalInventory" aria-controls="modalDocument" onClick={(e) => this.props.onClickOpenPopUp(e)}></i></button>
              </div>
            </div>
            <div className="grid_1 pull_1">
              {current.checkAfterSearch(current.props.document_show.created_by_user_name_th)}
            </div>
            <div className="grid_3 float-right">
              <input type="text" className="cancel-default float-right" defaultValue={current.props.document_show.status_name_th} disabled="disabled"></input>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">สถานะ</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2">
              <p className="top-text">ผู้นำออก</p>
            </div>
            <div className="grid_3 pull_1">
              <input type="text" className="cancel-default" defaultValue={current.props.document_show.created_by_user_name_th} disabled="disabled"></input>
            </div>
            <div className="grid_3 float-right">
              <input type="date" className="cancel-default float-right" defaultValue={current.props.document_show.created_on !== undefined ? current.props.document_show.created_on.slice(0, 10) : null} disabled="disabled"></input>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">วันที่</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2">
              <p className="top-text">ผู้สร้างเอกสาร</p>
            </div>
            <div className="grid_3 pull_1">
              <input type="text" className="cancel-default" defaultValue={current.props.document_show.created_by_admin_name_th} disabled="disabled"></input>
            </div>
            <div className="grid_3 float-right">
              <input type="text" className="cancel-default float-right" defaultValue={current.props.document_show.src_warehouse_id} disabled="disabled"></input>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">เลขที่คลังต้นทาง</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_3 float-right">
              <input type="text" className="cancel-default float-right" defaultValue={current.props.document_show.src_warehouse_name} disabled="disabled"></input>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">ชื่อคลังต้นทาง</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_3 float-right">
              <input type="text" className="cancel-default float-right" defaultValue={current.props.document_show.dest_warehouse_id} disabled="disabled"></input>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">เลขที่คลังปลายทาง</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_3 float-right">
              <input type="text" className="cancel-default float-right" defaultValue={current.props.document_show.dest_warehouse_name} disabled="disabled"></input>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">ชื่อคลังปลายทาง</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_3 float-right">
              <select className="edit-select-top" disabled="disabled">
                <option value="รับของเอง" selected> {current.props.document_show.transfer_method} </option>
                {/* <option value="ส่งไปยังคลังปลายทาง"> ส่งไปยังคลังปลายทาง </option> */}
              </select>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">รูปแบบการรับของ</p>
            </div>
          </div>
        </>
      )
    }
    if (mode === "edit") {
      return (
        <>
          <div className="grid_12">
            <div className="grid_2">
              <p className="top-text">เลขที่เอกสาร</p>
            </div>
            <div className="grid_3 pull_1">
              <div className="p-search-box cancel-margin">
                <input type="text" className="p-search-box__input cancel-default" value={this.props.no_document} onChange={(e) => this.props.onChangeNoDocument(e)} />
                {/* <button type="button" className="p-search-box__button cancel-padding hidden" onClick={(e) => this.props.onClickOpenPopUp(e)}><i className="p-icon--search" id="showModalInventory" aria-controls="modalDocument"></i></button> */}
              </div>
            </div>
            <div className="grid_3 float-right">
              <input type="text" className="cancel-default float-right" value={current.props.document_show.status_name_th} disabled="disabled"></input>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">สถานะ</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2">
              <p className="top-text">ผู้นำออก</p>
            </div>
            <div className="grid_3 pull_1">
              <div className="p-search-box cancel-margin">
                <input type="text" className="p-search-box__input cancel-default" value={current.props.document_show.created_by_user_name_th} onChange={(e) => this.props.onChangeName(e)} required />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalInventory" aria-controls="modalUserNameModeEdit"></i></button>
              </div>
            </div>
            <div className="grid_3 float-right">
              <input type="date" className="cancel-default float-right" value={current.props.document_show.created_on.slice(0, 10)} onChange={(e) => this.props.onChangeDate(e)}></input>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">วันที่</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2">
              <p className="top-text">ผู้สร้างเอกสาร</p>
            </div>
            <div className="grid_3 pull_1">
              <input type="text" className="cancel-default" value={current.props.document_show.created_by_admin_name_th} onChange={(e) => this.props.onChangeNameByAdmin(e)} disabled="disabled"></input>
            </div>
            <div className="grid_3 float-right">
              <div className="p-search-box cancel-margin">
                <input type="text" className="p-search-box__input cancel-default" value={current.props.document_show.src_warehouse_id} onChange={(e) => this.props.onChangeSrcInventory(e)} />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalInventory" aria-controls="modalSrcInventoryEdit"></i></button>
              </div>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">เลขที่คลังต้นทาง</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_3 float-right">
              <input type="text" className="cancel-default float-right" defaultValue={current.props.document_show.src_warehouse_name} disabled="disabled"></input>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">ชื่อคลังต้นทาง</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_3 float-right">
              <div className="p-search-box cancel-margin">
                <input type="text" className="p-search-box__input cancel-default" value={current.props.document_show.dest_warehouse_id} onChange={(e) => this.props.onChangeMyInventory(e)} />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalInventory" aria-controls="modalInventoryEdit"></i></button>
              </div>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">เลขที่คลังปลายทาง</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_3 float-right">
              <input type="text" className="cancel-default float-right" defaultValue={current.props.document_show.dest_warehouse_name} disabled="disabled"></input>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">ชื่อคลังปลายทาง</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_3 float-right">
              {current.checkTransfer(current.props.document_show.transfer_method)}
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">รูปแบบการรับของ</p>
            </div>
          </div>
        </>
      )
    }
    if (mode === "add") {
      return (
        <>
          <div className="grid_12">
            <div className="grid_2">
              <p className="top-text">เลขที่เอกสาร</p>
            </div>
            <div className="grid_3 pull_1">
              <input type="text" className="p-search-box__input cancel-default" value={this.props.document_show_mode_add.internal_document_id} onChange={(e) => this.props.onChangeNoDocumentModeAdd(e)} required />
            </div>
            <div className="grid_3 float-right">
              <input type="text" className="cancel-default float-right" value={current.props.document_show_mode_add.document_status_id} disabled="disabled"></input>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">สถานะ</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2">
              <p className="top-text">ผู้นำออก</p>
            </div>
            <div className="grid_3 pull_1">
              <div className="p-search-box cancel-margin">
                <input type="text" className="p-search-box__input cancel-default" value={current.props.document_show_mode_add.created_by_user_name_th} onChange={(e) => this.props.onChangeNameModeAdd(e)} required />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalInventory" aria-controls="modalUserName"></i></button>
              </div>
            </div>
            <div className="grid_3 float-right">
              <input type="date" className="cancel-default float-right" value={current.props.document_show_mode_add.created_on} onChange={(e) => this.props.onChangeDateModeAdd(e)} required></input>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">วันที่</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2">
              <p className="top-text">ผู้สร้างเอกสาร</p>
            </div>
            <div className="grid_3 pull_1">
              <input type="text" className="cancel-default" value={current.props.document_show_mode_add.created_by_admin_name_th} onChange={(e) => this.props.onChangeNameByAdmin(e)} disabled="disabled"></input>
            </div>
            <div className="grid_3 float-right">
              <div className="p-search-box cancel-margin">
                <input type="text" className="p-search-box__input cancel-default" value={current.props.document_show_mode_add.src_warehouse_id} onChange={(e) => this.props.onChangeSrcInventoryModeAdd(e)} />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalInventory" aria-controls="modalSrcInventoryAdd"></i></button>
              </div>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">เลขที่คลังต้นทาง</p>
            </div>
          </div>


          <div className="grid_12">
            <div className="grid_3 float-right">
              <input type="text" className="cancel-default float-right" defaultValue={current.props.document_show_mode_add.src_warehouse_name} disabled="disabled"></input>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">ชื่อคลังต้นทาง</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_3 float-right">
              <div className="p-search-box cancel-margin">
                <input type="text" className="p-search-box__input cancel-default" value={current.props.document_show_mode_add.dest_warehouse_id} onChange={(e) => this.props.onChangeMyInventoryModeAdd(e)} required />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalInventory" aria-controls="modalInventory"></i></button>
              </div>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">เลขที่คลังปลายทาง</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_3 float-right">
              <input type="text" className="cancel-default float-right" defaultValue={current.props.document_show_mode_add.dest_warehouse_name} disabled="disabled"></input>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">ชื่อคลังปลายทาง</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_3 float-right">
            <select className="edit-select-top" onChange={(e) => this.props.onChangeTransferModeAdd(e)}>
          <option value=""> none </option>
          <option value="รับของเอง"> รับของเอง </option>
          <option value="ส่งไปยังคลังปลายทาง"> ส่งไปยังคลังปลายทาง </option>
        </select>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">รูปแบบการรับของ</p>
            </div>
          </div>
        </>
      )
    }
  }

  render() {
    const current = this;
    return (
      <div>
        <div id="blackground-white">
          <div className="container_12 clearfix">
            <section className="grid_12 ">
              <h4 className="head-title">เบิก/โอนย้าย อะไหล่/พัสดุ - แบบ ส.16/46</h4>
              {this.checkActionMode(this.props.actionMode)}
            </section>

            <div className="grid_12">
              <div className="tab grid_11">
                <button type="button" id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "รายการ")}>รายการ</button>
                <button type="button" className="tablinks" onClick={e => this.tapChange(e, "แนบไฟล์")}>แนบไฟล์</button>
              </div>
            </div>

          </div>
        </div>

        {/* PopUp ค้นหาเลขที่เอกสาร */}
        <div className="modal" id="modalDocument" style={{ display: "none" }}>
          <div className="gray-board">
            <p className="head-title-modal edit">ค้นหาเลขที่เอกสาร</p>
            <div className="container_12 edit-padding">

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">เลขที่เอกสาร</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" value={this.props.no_document} onChange={(e) => this.props.onChangeNoDocument(e)} />
                  <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickPopUpSearchNoDocument(this.props.no_document)}>ค้นหา</button>
                </div>
              </div>

              <div className="grid_12">
                <table className="table-many-column mt-3">
                  <thead>
                    <tr>
                      <th className="font" style={{ minWidth: "300px" }}>เลขที่เอกสาร</th>
                      <th className="font" style={{ minWidth: "450px" }}>สร้างวันที่</th>
                      <th className="font" style={{ minWidth: "150px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.document_show_popup.map(function (document_show_popup, index) {
                      return (
                        <tr key={index} id={index}>
                          <td className="edit-padding" style={{ minWidth: "150px" }}> {document_show_popup.internal_document_id} </td>
                          <td className="edit-padding" style={{ minWidth: "300px" }}> {document_show_popup.created_on.replace("T", " เวลา ").slice(0, 21) + " น."} </td>
                          <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                            <button type="button" className="button-blue" onClick={(e, i) => current.props.onClickSelectNoDocument(document_show_popup.document_id)} aria-label="Close active modal" aria-controls="modalDocument" id="closeModalInventory" >เลือก</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="grid_12">
                <button className="button-blue float-right grid_1 mr-5 mt-3" type="button" aria-label="Close active modal" aria-controls="modalDocument" id="closeModalInventory">กลับ</button>
              </div>

            </div>
          </div>
        </div>

        {/* PopUp ค้นหาเลขที่คลังต้นทาง MODE EDIT */}
        <div className="modal" id="modalSrcInventoryEdit" style={{ display: "none" }}>
          <div className="gray-board">
            <p className="head-title-modal edit">ค้นหาเลขที่คลัง</p>
            <div className="container_12 edit-padding">

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">เลขที่คลัง</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" value={this.props.document_show.src_warehouse_id} onChange={(e) => this.props.onChangeSrcInventory(e)} />
                </div>
              </div>
              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">ชื่อคลัง</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" value={this.props.document_show.src_warehouse_name} onChange={(e) => this.props.onChangeSrcInventoryName(e)} />
                  <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickPopUpSearchInventory(this.props.document_show.src_warehouse_id, this.props.document_show.src_warehouse_name)}>ค้นหา</button>
                </div>
              </div>

              <div className="grid_12">
                <table className="table-many-column mt-3">
                  <thead>
                    <tr>
                      <th className="font" style={{ minWidth: "300px" }}>เลขที่คลัง</th>
                      <th className="font" style={{ minWidth: "450px" }}>ชื่อคลัง</th>
                      <th className="font" style={{ minWidth: "150px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.inventory_show_popup.map(function (inventory_show_popup, index) {
                      return (
                        <tr key={index} id={index}>
                          <td className="edit-padding" style={{ minWidth: "150px" }}> {inventory_show_popup.warehouse_id} </td>
                          <td className="edit-padding" style={{ minWidth: "300px" }}> {inventory_show_popup.name} </td>
                          <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                            <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectSrcInventoryModeEdit(e)} aria-label="Close active modal" aria-controls="modalSrcInventoryEdit" id="closeModalInventory" >เลือก</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="grid_12">
                <button className="button-blue float-right grid_1 mr-5 mt-3" type="button" aria-label="Close active modal" aria-controls="modalSrcInventoryEdit" id="closeModalInventory">กลับ</button>
              </div>

            </div>
          </div>
        </div>

        {/* PopUp ค้นหาเลขที่คลังปลายทาง MODE EDIT */}
        <div className="modal" id="modalInventoryEdit" style={{ display: "none" }}>
          <div className="gray-board">
            <p className="head-title-modal edit">ค้นหาเลขที่คลัง</p>
            <div className="container_12 edit-padding">

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">เลขที่คลัง</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" value={this.props.document_show.dest_warehouse_id} onChange={(e) => this.props.onChangeMyInventory(e)} />
                </div>
              </div>
              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">ชื่อคลัง</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" value={this.props.document_show.dest_warehouse_name} onChange={(e) => this.props.onChangeMyInventoryName(e)} />
                  <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickPopUpSearchInventory(this.props.document_show.dest_warehouse_id, this.props.document_show.dest_warehouse_name)}>ค้นหา</button>
                </div>
              </div>

              <div className="grid_12">
                <table className="table-many-column mt-3">
                  <thead>
                    <tr>
                      <th className="font" style={{ minWidth: "300px" }}>เลขที่คลัง</th>
                      <th className="font" style={{ minWidth: "450px" }}>ชื่อคลัง</th>
                      <th className="font" style={{ minWidth: "150px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.inventory_show_popup.map(function (inventory_show_popup, index) {
                      return (
                        <tr key={index} id={index}>
                          <td className="edit-padding" style={{ minWidth: "150px" }}> {inventory_show_popup.warehouse_id} </td>
                          <td className="edit-padding" style={{ minWidth: "300px" }}> {inventory_show_popup.name} </td>
                          <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                            <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectInventoryModeEdit(e)} aria-label="Close active modal" aria-controls="modalInventoryEdit" id="closeModalInventory" >เลือก</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="grid_12">
                <button className="button-blue float-right grid_1 mr-5 mt-3" type="button" aria-label="Close active modal" aria-controls="modalInventoryEdit" id="closeModalInventory">กลับ</button>
              </div>

            </div>
          </div>
        </div>

        {/* PopUp ค้นหาชื่อพนักงาน MODE EDIT */}
        <div className="modal" id="modalUserNameModeEdit" style={{ display: "none" }}>
          <div className="gray-board">
            <p className="head-title-modal edit">ค้นหาชื่อผู้นำออก</p>
            <div className="container_12 edit-padding">

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">ชื่อพนักงาน</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" value={this.props.document_show.created_by_user_name_th} onChange={(e) => this.props.onChangeName(e)} />
                </div>
              </div>
              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">รหัสพนักงาน</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" value={this.props.document_show.created_by_user_id} onChange={(e) => this.props.onChangeNameId(e)} />
                  <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickPopUpSearchUserModeEdit(this.props.document_show.created_by_user_name_th, this.props.document_show.created_by_user_id)}>ค้นหา</button>
                </div>
              </div>

              <div className="grid_12">
                <table className="table-many-column mt-3">
                  <thead>
                    <tr>
                      <th className="font" style={{ minWidth: "300px" }}>รหัสพนักงาน</th>
                      <th className="font" style={{ minWidth: "450px" }}>ชื่อพนักงาน</th>
                      <th className="font" style={{ minWidth: "150px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.line_users.map(function (line_users, index) {
                      return (
                        <tr key={index} id={index}>
                          <td className="edit-padding" style={{ minWidth: "150px" }}> {line_users.employee_id} </td>
                          <td className="edit-padding" style={{ minWidth: "300px" }}> {line_users.firstname_th} {line_users.lastname_th}</td>
                          <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                            <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectUserModeEdit(e)} aria-label="Close active modal" aria-controls="modalUserNameModeEdit" id="closeModalInventory" >เลือก</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="grid_12">
                <button className="button-blue float-right grid_1 mr-5 mt-3" type="button" aria-label="Close active modal" aria-controls="modalUserNameModeEdit" id="closeModalInventory">กลับ</button>
              </div>

            </div>
          </div>
        </div>

        {/* PopUp ค้นหาเลขที่คลังต้นทาง MODE ADD */}
        <div className="modal" id="modalSrcInventoryAdd" style={{ display: "none" }}>
          <div className="gray-board">
            <p className="head-title-modal edit">ค้นหาเลขที่คลัง</p>
            <div className="container_12 edit-padding">

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">เลขที่คลัง</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" value={this.props.document_show_mode_add.src_warehouse_id} onChange={(e) => this.props.onChangeSrcInventoryModeAdd(e)} />
                </div>
              </div>
              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">ชื่อคลัง</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" value={this.props.document_show_mode_add.src_warehouse_name} onChange={(e) => this.props.onChangeSrcInventoryNameModeAdd(e)} />
                  <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickPopUpSearchInventoryModeAdd(this.props.document_show_mode_add.src_warehouse_id, this.props.document_show_mode_add.src_warehouse_name)}>ค้นหา</button>
                </div>
              </div>

              <div className="grid_12">
                <table className="table-many-column mt-3">
                  <thead>
                    <tr>
                      <th className="font" style={{ minWidth: "300px" }}>เลขที่คลัง</th>
                      <th className="font" style={{ minWidth: "450px" }}>ชื่อคลัง</th>
                      <th className="font" style={{ minWidth: "150px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.inventory_show_popup.map(function (inventory_show_popup, index) {
                      return (
                        <tr key={index} id={index}>
                          <td className="edit-padding" style={{ minWidth: "150px" }}> {inventory_show_popup.warehouse_id} </td>
                          <td className="edit-padding" style={{ minWidth: "300px" }}> {inventory_show_popup.name} </td>
                          <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                            <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectSrcInventoryModeAdd(e)} aria-label="Close active modal" aria-controls="modalSrcInventoryAdd" id="closeModalInventory" >เลือก</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="grid_12">
                <button className="button-blue float-right grid_1 mr-5 mt-3" type="button" aria-label="Close active modal" aria-controls="modalSrcInventoryAdd" id="closeModalInventory">กลับ</button>
              </div>

            </div>
          </div>
        </div>

        {/* PopUp ค้นหาเลขที่คลังปลายทาง MODE ADD */}
        <div className="modal" id="modalInventory" style={{ display: "none" }}>
          <div className="gray-board">
            <p className="head-title-modal edit">ค้นหาเลขที่คลัง</p>
            <div className="container_12 edit-padding">

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">เลขที่คลัง</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" value={this.props.document_show_mode_add.dest_warehouse_id} onChange={(e) => this.props.onChangeMyInventoryModeAdd(e)} />
                </div>
              </div>
              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">ชื่อคลัง</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" value={this.props.document_show_mode_add.dest_warehouse_name} onChange={(e) => this.props.onChangeMyInventoryNameModeAdd(e)} />
                  <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickPopUpSearchInventory(this.props.document_show_mode_add.dest_warehouse_id, this.props.document_show_mode_add.dest_warehouse_name)}>ค้นหา</button>
                </div>
              </div>

              <div className="grid_12">
                <table className="table-many-column mt-3">
                  <thead>
                    <tr>
                      <th className="font" style={{ minWidth: "300px" }}>เลขที่คลัง</th>
                      <th className="font" style={{ minWidth: "450px" }}>ชื่อคลัง</th>
                      <th className="font" style={{ minWidth: "150px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.inventory_show_popup.map(function (inventory_show_popup, index) {
                      return (
                        <tr key={index} id={index}>
                          <td className="edit-padding" style={{ minWidth: "150px" }}> {inventory_show_popup.warehouse_id} </td>
                          <td className="edit-padding" style={{ minWidth: "300px" }}> {inventory_show_popup.name} </td>
                          <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                            <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectInventory(e)} aria-label="Close active modal" aria-controls="modalInventory" id="closeModalInventory" >เลือก</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="grid_12">
                <button className="button-blue float-right grid_1 mr-5 mt-3" type="button" aria-label="Close active modal" aria-controls="modalInventory" id="closeModalInventory">กลับ</button>
              </div>

            </div>
          </div>
        </div>

        {/* PopUp ค้นหาชื่อพนักงาน MODE ADD */}
        <div className="modal" id="modalUserName" style={{ display: "none" }}>
          <div className="gray-board">
            <p className="head-title-modal edit">ค้นหาชื่อผู้นำออก</p>
            <div className="container_12 edit-padding">

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">ชื่อพนักงาน</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" value={this.props.document_show_mode_add.created_by_user_name_th} onChange={(e) => this.props.onChangeNameModeAdd(e)} />
                </div>
              </div>
              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">รหัสพนักงาน</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" value={this.props.document_show_mode_add.created_by_user_id} onChange={(e) => this.props.onChangeNameIdModeAdd(e)} />
                  <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickPopUpSearchUser(this.props.document_show_mode_add.created_by_user_name_th, this.props.document_show_mode_add.created_by_user_id)}>ค้นหา</button>
                </div>
              </div>

              <div className="grid_12">
                <table className="table-many-column mt-3">
                  <thead>
                    <tr>
                      <th className="font" style={{ minWidth: "300px" }}>รหัสพนักงาน</th>
                      <th className="font" style={{ minWidth: "450px" }}>ชื่อพนักงาน</th>
                      <th className="font" style={{ minWidth: "150px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.line_users.map(function (line_users, index) {
                      return (
                        <tr key={index} id={index}>
                          <td className="edit-padding" style={{ minWidth: "150px" }}> {line_users.employee_id} </td>
                          <td className="edit-padding" style={{ minWidth: "300px" }}> {line_users.firstname_th} {line_users.lastname_th}</td>
                          <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                            <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectUser(e)} aria-label="Close active modal" aria-controls="modalUserName" id="closeModalInventory" >เลือก</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="grid_12">
                <button className="button-blue float-right grid_1 mr-5 mt-3" type="button" aria-label="Close active modal" aria-controls="modalUserName" id="closeModalInventory">กลับ</button>
              </div>

            </div>
          </div>
        </div>

      </div>
    )
  };
}

const mapStateToProps = (state) => ({
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
const mapDispatchToProps = (dispatch) => ({
  onChangeNoDocument: (e) => dispatch(onChangeNoDocument(e)),
  onClickPopUpSearchNoDocument: (e) => dispatch(onClickPopUpSearchNoDocument(e)),
  onClickSelectNoDocument: (e) => dispatch(onClickSelectNoDocument(e)),
  onClickOpenPopUp: (e) => dispatch(onClickOpenPopUp(e)),

  onClickModeEdit: (e) => dispatch(onClickModeEdit(e)),

  // Mode Edit
  onChangeName: (e) => dispatch(onChangeName(e)),
  onChangeNameByAdmin: (e) => dispatch(onChangeNameByAdmin(e)),
  onChangeDate: (e) => dispatch(onChangeDate(e)),
  onChangeMyInventory: (e) => dispatch(onChangeMyInventory(e)),
  onClickPopUpSearchInventory: (e, i) => dispatch(onClickPopUpSearchInventory(e, i)),
  onClickSelectInventory: (e) => dispatch(onClickSelectInventory(e)),
  onChangeMyInventoryName: (e) => dispatch(onChangeMyInventoryName(e)),
  onChangeSrcInventoryName: (e) => dispatch(onChangeSrcInventoryName(e)),
  onClickSelectInventoryModeEdit: (e) => dispatch(onClickSelectInventoryModeEdit(e)),
  onChangeNameId: (e) => dispatch(onChangeNameId(e)),
  onClickPopUpSearchUserModeEdit: (e, i) => dispatch(onClickPopUpSearchUserModeEdit(e, i)),
  onClickSelectUserModeEdit: (e) => dispatch(onClickSelectUserModeEdit(e)),
  onChangeSrcInventory: (e) => dispatch(onChangeSrcInventory(e)),
  onClickSelectSrcInventoryModeEdit: (e) => dispatch(onClickSelectSrcInventoryModeEdit(e)),
  onChangeTransfer: (e) => dispatch(onChangeTransfer(e)),

  // Mode Add
  onChangeNoDocumentModeAdd: (e) => dispatch(onChangeNoDocumentModeAdd(e)),
  onChangeNameModeAdd: (e) => dispatch(onChangeNameModeAdd(e)),
  onChangeNameIdModeAdd: (e) => dispatch(onChangeNameIdModeAdd(e)),
  onChangeDateModeAdd: (e) => dispatch(onChangeDateModeAdd(e)),
  onChangeMyInventoryModeAdd: (e) => dispatch(onChangeMyInventoryModeAdd(e)),
  onChangeMyInventoryNameModeAdd: (e) => dispatch(onChangeMyInventoryNameModeAdd(e)),
  onClickPopUpSearchUser: (e, i) => dispatch(onClickPopUpSearchUser(e, i)),
  onClickSelectUser: (e) => dispatch(onClickSelectUser(e)),
  onChangeSrcInventoryModeAdd: (e) => dispatch(onChangeSrcInventoryModeAdd(e)),
  onChangeSrcInventoryNameModeAdd: (e) => dispatch(onChangeSrcInventoryNameModeAdd(e)),
  onClickSelectSrcInventoryModeAdd: (e) => dispatch(onClickSelectSrcInventoryModeAdd(e)),
  onClickPopUpSearchInventoryModeAdd: (e, i) => dispatch(onClickPopUpSearchInventoryModeAdd(e, i)),
  onChangeTransferModeAdd: (e) => dispatch(onChangeTransferModeAdd(e)),
})
export default connect(mapStateToProps, mapDispatchToProps)(TopContent);

export const onClickModeEdit = (e) => {
  return {
    type: "CLICK MODE EDIT"
  }
}

// Mode Search
export const onClickOpenPopUp = (e) => {
  return {
    type: "CLICK OPEN POPUP"
  }
}
export const onChangeNoDocument = (e) => {
  return {
    type: "ON CHANGE NO DOCUMENT",
    value: e.target.value
  }
}
export const onClickPopUpSearchNoDocument = (no_document) => {
  return function (dispatch) {
    return axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/search?document_type_group_id=121&internal_document_id=${no_document}`, { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
      // console.log(res)
      // dispatch
      dispatch({
        type: "CLICK SEARCH POPUP NO DOCUMENT",
        value: res.data.results
      });
    });
  };
}
export const onClickSelectNoDocument = (document_id) => {
  return function (dispatch) {
    return axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/${document_id}`, { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
      console.log(res)
      dispatch({
        type: "CLICK SELECT POPUP NO DOCUMENT",
        value: res.data
      });
    });
  };
}

// Mode Edit
export const onChangeName = (e) => {
  return {
    type: "ON CHANGE NAME",
    value: e.target.value
  }
}
export const onChangeNameByAdmin = (e) => {
  return {
    type: "ON CHANGE NAME BY ADMIN",
    value: e.target.value
  }
}
export const onChangeDate = (e) => {
  return {
    type: "ON CHANGE DATE",
    value: e.target.value
  }
}
export const onChangeMyInventory = (e) => {
  return {
    type: "ON CHANGE MY INVENTORY",
    value: e.target.value
  }
}
export const onClickPopUpSearchInventory = (dest_warehouse_id, dest_warehouse_name) => {
  console.log("dest_warehouse_id", dest_warehouse_id, "dest_warehouse_name", dest_warehouse_name)
  return function (dispatch) {
    return axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/fact/warehouses?warehouse_id=${dest_warehouse_id}&name=${dest_warehouse_name}`, { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
      console.log(res)
      dispatch({
        type: "CLICK SEARCH POPUP INVENTORY",
        value: res.data
      });
    });
  };
}
export const onClickSelectInventory = (e) => {
  console.log(e.target.parentNode.parentNode)
  return {
    type: "CLICK SELECT POPUP INVENTORY",
    row_inventory_show_popup: e.target.parentNode.parentNode.id
  }
}
export const onChangeMyInventoryName = (e) => {
  return {
    type: "ON CHANGE MY INVENTORY NAMAE",
    value: e.target.value
  }
}
export const onChangeSrcInventoryName = (e) => {
  return {
    type: "ON CHANGE SRC INVENTORY NAMAE",
    value: e.target.value
  }
}
export const onClickSelectInventoryModeEdit = (e) => {
  console.log(e.target.parentNode.parentNode)
  return {
    type: "CLICK SELECT POPUP INVENTORY MODE EDIT",
    row_inventory_show_popup: e.target.parentNode.parentNode.id
  }
}
export const onClickSelectSrcInventoryModeEdit = (e) => {
  console.log(e.target.parentNode.parentNode)
  return {
    type: "CLICK SELECT POPUP SRC INVENTORY MODE EDIT",
    row_inventory_show_popup: e.target.parentNode.parentNode.id
  }
}
export const onChangeNameId = (e) => {
  return {
    type: "ON CHANGE NAME ID",
    value: e.target.value
  }
}
export const onClickPopUpSearchUserModeEdit = (created_by_user_name_th, created_by_user_id) => {
  console.log("created_by_user_name_th", created_by_user_name_th, "created_by_user_id", created_by_user_id)
  return function (dispatch) {
    var space = created_by_user_name_th.indexOf(" ");
    var firstname = created_by_user_name_th.slice(0, space);
    var lastname = created_by_user_name_th.slice(space + 1, created_by_user_name_th.length);
    return axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/fact/users?firstname_th=${firstname}&lastname_th=${lastname}&employee_id=${created_by_user_id}`, { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
      console.log(">>>>", res)
      dispatch({
        type: "CLICK SEARCH POPUP USER MODE EDIT",
        value: res.data.results
      });
    });
  };
}
export const onClickSelectUserModeEdit = (e) => {
  console.log(e.target.parentNode.parentNode)
  return {
    type: "CLICK SELECT POPUP USER MODE EDIT",
    row_inventory_show_popup: e.target.parentNode.parentNode.id
  }
}
export const onChangeSrcInventory = (e) => {
  return {
    type: "ON CHANGE SRC INVENTORY",
    value: e.target.value
  }
}
export const onChangeTransfer = (e) => {
  return {
    type: "ON CHANGE TRANFER",
    value: e.target.value
  }
}

// Mode Add
export const onChangeSrcInventoryModeAdd = (e) => {
  return {
    type: "ON CHANGE SRC INVENTORY MODE ADD",
    value: e.target.value
  }
}
export const onChangeNoDocumentModeAdd = (e) => {
  // console.log(e.target.value)
  return {
    type: "ON CHANGE DOCUMENT MODE ADD",
    value: e.target.value
  }
}
export const onChangeNameModeAdd = (e) => {
  return {
    type: "ON CHANGE NAME MODE ADD",
    value: e.target.value
  }
}
export const onChangeNameIdModeAdd = (e) => {
  return {
    type: "ON CHANGE NAME ID MODE ADD",
    value: e.target.value
  }
}
export const onChangeDateModeAdd = (e) => {
  return {
    type: "ON CHANGE DATE MODE ADD",
    value: e.target.value
  }
}
export const onChangeMyInventoryModeAdd = (e) => {
  return {
    type: "ON CHANGE MY INVENTORY MODE ADD",
    value: e.target.value
  }
}
export const onChangeMyInventoryNameModeAdd = (e) => {
  return {
    type: "ON CHANGE MY INVENTORY NAMAE MODE ADD",
    value: e.target.value
  }
}
export const onClickPopUpSearchUser = (created_by_user_name_th, created_by_user_id) => {
  console.log("created_by_user_name_th", created_by_user_name_th, "created_by_user_id", created_by_user_id)
  return function (dispatch) {
    var space = created_by_user_name_th.indexOf(" ");
    var firstname = created_by_user_name_th.slice(0, space);
    var lastname = created_by_user_name_th.slice(space + 1, created_by_user_name_th.length);
    return axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/fact/users?firstname_th=${firstname}&lastname_th=${lastname}&employee_id=${created_by_user_id}`, { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
      console.log(res)
      dispatch({
        type: "CLICK SEARCH POPUP USER",
        value: res.data.results
      });
    });
  };
}
export const onClickSelectUser = (e) => {
  console.log(e.target.parentNode.parentNode)
  return {
    type: "CLICK SELECT POPUP USER",
    row_inventory_show_popup: e.target.parentNode.parentNode.id
  }
}
export const onChangeSrcInventoryNameModeAdd = (e) => {
  return {
    type: "ON CHANGE SRC INVENTORY NAMAE MODE ADD",
    value: e.target.value
  }
}
export const onClickSelectSrcInventoryModeAdd = (e) => {
  console.log(e.target.parentNode.parentNode)
  return {
    type: "CLICK SELECT POPUP SRC INVENTORY MODE ADD",
    row_inventory_show_popup: e.target.parentNode.parentNode.id
  }
}
export const onClickPopUpSearchInventoryModeAdd = (dest_warehouse_id, dest_warehouse_name) => {
  console.log("dest_warehouse_id", dest_warehouse_id, "dest_warehouse_name", dest_warehouse_name)
  return function (dispatch) {
    return axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/fact/warehouses?warehouse_id=${dest_warehouse_id}&name=${dest_warehouse_name}`, { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
      console.log(res)
      dispatch({
        type: "CLICK SEARCH POPUP INVENTORY",
        value: res.data
      });
    });
  };
}
export const onChangeTransferModeAdd = (e) => {
  return {
    type: "ON CHANGE TRANFER MODE ADD",
    value: e.target.value
  }
}