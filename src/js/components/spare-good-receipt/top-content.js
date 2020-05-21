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
            <div className="grid_3 float-right">
              <input type="text" className="cancel-default float-right" defaultValue={current.props.document_show.document_status_id} disabled="disabled"></input>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">สถานะ</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2">
              <p className="top-text">ผู้นำเข้า</p>
            </div>
            <div className="grid_3 pull_1">
              <input type="text" className="cancel-default" defaultValue={current.props.document_show.created_by_user_name_th} disabled="disabled"></input>
            </div>
            <div className="grid_3 float-right">
              <input type="datetime" className="cancel-default float-right" defaultValue={current.props.document_show.created_on} disabled="disabled"></input>
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
              <input type="text" className="cancel-default float-right" defaultValue={current.props.document_show.dest_warehouse_id} disabled="disabled"></input>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">คลัง</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2">
              <p className="top-text">เลขที่ใบสั่งซื้อ/เลขที่เอกสารอ้างอิง</p>
            </div>
            <div className="grid_3 pull_0">
              <input type="text" className="cancel-default" defaultValue={current.props.document_show.po_id} disabled="disabled"></input>
            </div>
          </div>
        </>
      )
    }
    if (mode === "edit") {
      console.log(current.props.document_show.created_on.slice(0, 15))
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
              <input type="text" className="cancel-default float-right" value={current.props.document_show.document_status_id} disabled="disabled"></input>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">สถานะ</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2">
              <p className="top-text">ผู้นำเข้า</p>
            </div>
            <div className="grid_3 pull_1">
              <input type="text" className="cancel-default" value={current.props.document_show.created_by_user_name_th} onChange={(e) => this.props.onChangeName(e)}></input>
            </div>
            <div className="grid_3 float-right">
              <input type="datetime-local" className="cancel-default float-right" value={current.props.document_show.created_on.slice(0, 16)} onChange={(e) => this.props.onChangeDate(e)}></input>
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
              <input type="text" className="cancel-default" value={current.props.document_show.created_by_admin_name_th} onChange={(e) => this.props.onChangeNameByAdmin(e)}></input>
            </div>
            <div className="grid_3 float-right">
            <div className="p-search-box cancel-margin">
                <input type="text" className="p-search-box__input cancel-default" value={current.props.document_show.dest_warehouse_id} onChange={(e) => this.props.onChangeMyInventory(e)} />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalInventory" aria-controls="modalInventoryEdit"></i></button>
                </div>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">คลัง</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2">
              <p className="top-text">เลขที่ใบสั่งซื้อ/เลขที่เอกสารอ้างอิง</p>
            </div>
            <div className="grid_3 pull_0">
              <input type="text" className="cancel-default" value={current.props.document_show.po_id} onChange={(e) => this.props.onChangeNoPo(e)}></input>
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
              <p className="top-text">ผู้นำเข้า</p>
            </div>
            <div className="grid_3 pull_1">
              <input type="text" className="cancel-default" value={current.props.document_show_mode_add.created_by_user_name_th} onChange={(e) => this.props.onChangeNameModeAdd(e)} required></input>
            </div>
            <div className="grid_3 float-right">
              <input type="datetime-local" className="cancel-default float-right" value={current.props.document_show_mode_add.created_on} onChange={(e) => this.props.onChangeDateModeAdd(e)} required></input>
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
              <input type="text" className="cancel-default" value={current.props.document_show_mode_add.created_by_admin_name_th} onChange={(e) => this.props.onChangeByAdminNameModeAdd(e)} required></input>
            </div>
            <div className="grid_3 float-right">
              <div className="p-search-box cancel-margin">
                <input type="text" className="p-search-box__input cancel-default" value={current.props.document_show_mode_add.dest_warehouse_id} onChange={(e) => this.props.onChangeMyInventoryModeAdd(e)} required />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalInventory" aria-controls="modalInventory"></i></button>
              </div>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">คลัง</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2">
              <p className="top-text">เลขที่ใบสั่งซื้อ/เลขที่เอกสารอ้างอิง</p>
            </div>
            <div className="grid_3 pull_0">
              <input type="text" className="cancel-default" value={current.props.document_show_mode_add.po_id} onChange={(e) => this.props.onChangeNoPoModeAdd(e)} required></input>
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
              <h4 className="head-title">นำอะไหล่เข้า</h4>
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
                          <td className="edit-padding" style={{ minWidth: "300px" }}> {document_show_popup.created_on.replace("T"," เวลา ").slice(0, 21)} </td>
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

        {/* PopUp ค้นหาเลขที่คลัง MODE EDIT */}
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

        {/* PopUp ค้นหาเลขที่คลัง MODE ADD */}
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
})
const mapDispatchToProps = (dispatch) => ({
  onChangeNoDocument: (e) => dispatch(onChangeNoDocument(e)),
  onClickPopUpSearchNoDocument: (e) => dispatch(onClickPopUpSearchNoDocument(e)),
  onClickSelectNoDocument: (e, i) => dispatch(onClickSelectNoDocument(e, i)),
  onClickOpenPopUp: (e) => dispatch(onClickOpenPopUp(e)),

  // Mode Edit
  onChangeName: (e) => dispatch(onChangeName(e)),
  onChangeNameByAdmin: (e) => dispatch(onChangeNameByAdmin(e)),
  onChangeDate: (e) => dispatch(onChangeDate(e)),
  onChangeMyInventory: (e) => dispatch(onChangeMyInventory(e)),
  onChangeNoPo: (e) => dispatch(onChangeNoPo(e)),
  onClickPopUpSearchInventory: (e, i) => dispatch(onClickPopUpSearchInventory(e, i)),
  onClickSelectInventory: (e) => dispatch(onClickSelectInventory(e)),
  onChangeMyInventoryName: (e) => dispatch(onChangeMyInventoryName(e)),
  onClickSelectInventoryModeEdit: (e) => dispatch(onClickSelectInventoryModeEdit(e)),

  // Mode Add
  onChangeNoDocumentModeAdd: (e) => dispatch(onChangeNoDocumentModeAdd(e)),
  onChangeNameModeAdd: (e) => dispatch(onChangeNameModeAdd(e)),
  onChangeByAdminNameModeAdd: (e) => dispatch(onChangeByAdminNameModeAdd(e)),
  onChangeDateModeAdd: (e) => dispatch(onChangeDateModeAdd(e)),
  onChangeNoPoModeAdd: (e) => dispatch(onChangeNoPoModeAdd(e)),
  onChangeMyInventoryModeAdd: (e) => dispatch(onChangeMyInventoryModeAdd(e)),
  onChangeMyInventoryNameModeAdd: (e) => dispatch(onChangeMyInventoryNameModeAdd(e)),
})
export default connect(mapStateToProps, mapDispatchToProps)(TopContent);

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
    return axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/search?document_type_group_id=101&internal_document_id=${no_document}`, { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
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
export const onChangeNoPo = (e) => {
  return {
    type: "ON CHANGE NO PO",
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
export const onClickSelectInventoryModeEdit = (e) => {
  console.log(e.target.parentNode.parentNode)
  return {
    type: "CLICK SELECT POPUP INVENTORY MODE EDIT",
    row_inventory_show_popup: e.target.parentNode.parentNode.id
  }
}

// Mode Add
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
export const onChangeByAdminNameModeAdd = (e) => {
  return {
    type: "ON CHANGE BY ADMIN NAME MODE ADD",
    value: e.target.value
  }
}
export const onChangeDateModeAdd = (e) => {
  return {
    type: "ON CHANGE DATE MODE ADD",
    value: e.target.value
  }
}
export const onChangeNoPoModeAdd = (e) => {
  return {
    type: "ON CHANGE NO PO MODE ADD",
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