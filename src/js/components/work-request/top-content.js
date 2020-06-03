import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import axios from "axios";

import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import '../../../css/style.css'
import '../../../css/grid12.css';

class TopContent extends React.Component {

  checkAfterSearch = (created_by_user_name_th) => {
    if (created_by_user_name_th !== undefined) {
      return <button type="button" className="mb-0" style={{ padding: "0px 10px" }} onClick={(e) => this.props.onClickModeEdit(e)}>แก้ไข</button>
    }
  }

  checkActionMode = (mode) => {
    const current = this;
    if (mode === "home") {
      return (
        <Redirect to="/main-pmt"></Redirect>
      )
    }
    if (mode === "search") {
      return (
        <>
          <div className="grid_12">
            <div className="grid_2"><p className="top-text">เลขที่เอกสาร</p></div>
            <div>
              <div className="p-search-box cancel-margin grid_3 pull_0">
                <input type="search" className="p-search-box__input cancel-default " value={this.props.no_document} onChange={(e) => this.props.onChangeNoDocument(e)} />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalInventory" aria-controls="modalDocument" onClick={(e) => this.props.onClickOpenPopUp(e)}></i></button>
              </div>

              <div className="grid_1 pull_1">
                {current.checkAfterSearch(current.props.document_show.created_by_user_name_th)}
              </div>

              <div className="p-search-box cancel-margin grid_3  float-right">
                <input type="date" className="p-search-box__input cancel-default " value={this.props.document_show.created_on} disabled="diabled" />
              </div>
              <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">วันที่ออกเอกสาร</p></div>
            </div>
          </div>
          <div className="grid_12">
            <div>
              <div className="p-search-box cancel-margin grid_3  float-right">
                <input type="text" className=" p-search-box__input cancel-default  " defaultValue={this.props.document_show.created_by_admin_name_th} disabled="diabled"></input>
              </div>
            </div>
            <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">ผู้สร้างเอกสาร</p></div>
          </div>
        </>
      )
    }
    if (mode === "edit") {
      return (
        <>
          <div className="grid_12">
            <div className="grid_2"><p className="top-text">เลขที่เอกสาร</p></div>
            <div>
              <div className="p-search-box cancel-margin grid_3 pull_0">
                <input type="search" className="p-search-box__input cancel-default " value={this.props.no_document} onChange={(e) => this.props.onChangeNoDocument(e)} />
              </div>
              <div className="p-search-box cancel-margin grid_3  float-right">
                <input type="date" className="p-search-box__input cancel-default " value={this.props.document_show.created_on.slice(0, 10)} onChange={(e) => this.props.onChangeDate(e)} />
              </div>
              <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">วันที่ออกเอกสาร</p></div>
            </div>
          </div>
          <div className="grid_12">
            <div>
              <div className="p-search-box cancel-margin grid_3  float-right">
                <input type="text" className=" p-search-box__input cancel-default  " value={this.props.document_show.created_by_admin_name_th} oonChange={(e) => this.props.onChangeNameByAdmin(e)} disabled="disabled"></input>
              </div>
            </div>
            <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">ผู้สร้างเอกสาร</p></div>
          </div>
        </>
      )
    }
    if (mode === "add") {
      return (
        <>
          <div className="grid_12">
            <div className="grid_2"><p className="top-text">เลขที่เอกสาร</p></div>
            <div>
              <div className="p-search-box cancel-margin grid_3 pull_0">
                <input type="search" className="p-search-box__input cancel-default " value={this.props.document_show_mode_add.internal_document_id} onChange={(e) => this.props.onChangeNoDocumentModeAdd(e)} required />
              </div>
              <div className="p-search-box cancel-margin grid_3  float-right">
                <input type="date" className="p-search-box__input cancel-default " value={this.props.document_show_mode_add.created_on} onChange={(e) => this.props.onChangeDateModeAdd(e)} required />
              </div>
              <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">วันที่ออกเอกสาร</p></div>
            </div>
          </div>
          <div className="grid_12">
            <div>
              <div className="p-search-box cancel-margin grid_3  float-right">
                <input type="text" className=" p-search-box__input cancel-default  " value={this.props.document_show_mode_add.created_by_admin_name_th} disabled="disabled"></input>
              </div>
            </div>
            <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">ผู้สร้างเอกสาร</p></div>
          </div>
        </>
      )

    }
  }

  render() {
    let current = this;
    return (
      <div>
        <div id="blackground-white">
          <div className="container_12 clearfix">
            <section className="grid_12 ">
              <h4 className="head-title">แจ้งเหตุขัดข้อง/ชำรุด</h4>
              {/* Input in TopBar */}
              {this.checkActionMode(this.props.actionMode)}
            </section>
          </div>
        </div>

        {/* PopUp ค้นหาเลขที่เอกสาร */}
        <div className="modal" id="modalDocument" style={{ display: "none" }}>
          <div className="gray-board">
            <p className="head-title-modal edit">รายการแจ้งเหตุขัดข้อง/ชำรุด</p>

            <div className="container_12 edit-padding">

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">เลขที่เอกสาร</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" value={this.props.no_document} onChange={(e) => this.props.onChangeNoDocument(e)} />
                 {/* <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickPopUpSearchNoDocument(this.props.no_document)}>ค้นหา</button> */}
                </div>
              </div>

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">สถานที่ แขวง</p></div>
                <div className="grid_8 pull_0">
                  <select className="edit-select-top grid_3 " onChange={(e) => this.props.onChangeDistricts(e)}>

                  </select>
                  <select className="edit-select-top grid_3 float-right" onChange={(e) => this.props.onChangeZones(e)}>

                  </select>
                  <p className="cancel-default grid_2 float-right">สถานที่ ตอน</p>
                </div>
              </div>

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">วันที่เริ่มต้น</p></div>
                <div className="grid_8 pull_0">
                  <input type="date" className="cancel-default grid_3 " value={this.props.date_starts} onChange={(e) => this.props.onChangeDateStarts(e)}></input>
                  <input type="date" className="cancel-default grid_3 float-right" value={this.props.date_ends} onChange={(e) => this.props.onChangeDateEnds(e)}></input>
                  <p className="cancel-default grid_2 float-right">วันที่สิ้นสุด</p>
                </div>
                <button className="button-blue edit grid_1 float-right mr-5" type="button" onClick={(e) => this.props.onClickPopUpSearchNoDocument(this.props.no_document,this.props.no_districts,this.props.no_zone,this.props.no_date_start,this.props.no_date_end)}>ค้นหา</button>
              </div>

              <div className="grid_12">
                <table className="table-many-column mt-3">
                  <thead>
                    <tr>
                      <th className="font" style={{ minWidth: "150px" }}>เลขที่เอกสาร</th>
                      <th className="font" style={{ minWidth: "150px" }}>ชื่องาน</th>
                      <th className="font" style={{ minWidth: "150px" }}>วันเวลาแจ้งขัดข้อง</th>
                      <th className="font" style={{ minWidth: "150px" }}>ผู้นำเข้าระบบ</th>
                      <th className="font" style={{ minWidth: "150px" }}>สถานที่ แขวน/ตอน</th>
                      <th className="font" style={{ minWidth: "150px" }}></th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.props.document_show_popup.map(function (document_show_popup, index) {
                      return (
                        <tr key={index} id={index}>
                          <td className="edit-padding" style={{ minWidth: "150px", paddingLeft: "50px" }}>{document_show_popup.internal_document_id}</td>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>{document_show_popup.name}</td>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>{document_show_popup.created_on.replace("T", " เวลา ").slice(0, 21) + " น."}</td>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>{document_show_popup.created_by_user_name_th}</td>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>{document_show_popup.station}</td>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>
                            <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectNoDocument(e)} aria-label="Close active modal" aria-controls="modalDocument" id="closeModalInventory">เลือก</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div className="grid_12">
                <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalDocument" id="closeModalInventory">กลับ</button>
              </div>
            </div>
          </div>
        </div>

      </div >
    )
  };
}

const mapStateToProps = (state) => ({
  actionMode: state.action,
  document_id: state.document_id,
  document_show: state.document_show,

  no_document: state.no_document,
  no_districts: state.no_districts,
  no_zone: state.no_zone,
  no_date_start: state.no_date_start,
  no_date_end: state.no_date_end,


  document_show_popup: state.document_show_popup,
  document_show_mode_add: state.document_show_mode_add,
})

const mapDispatchToProps = (dispatch) => ({
  onChangeNoDocument: (e) => dispatch(onChangeNoDocument(e)),

  onChangeDistricts: (e) => dispatch(onChangeDistricts(e)),
  onChangeZones: (e) => dispatch(onChangeZones(e)),
  onChangeDateStarts: (e) => dispatch(onChangeDateStarts(e)),
  onChangeDateEnds: (e) => dispatch(onChangeDateEnds(e)),

  onClickOpenPopUp: (e) => dispatch(onClickOpenPopUp(e)),
  onClickPopUpSearchNoDocument: (e) => dispatch(onClickPopUpSearchNoDocument(e)),
  onClickSelectNoDocument: (e, i) => dispatch(onClickSelectNoDocument(e, i)),

  // Mode Edit
  onChangeDate: (e) => dispatch(onChangeDate(e)),
  onChangeNameByAdmin: (e) => dispatch(onChangeNameByAdmin(e)),

  // Mode Add
  onChangeNoDocumentModeAdd: (e) => dispatch(onChangeNoDocumentModeAdd(e)),
  onChangeByAdminNameModeAdd: (e) => dispatch(onChangeByAdminNameModeAdd(e)),
  onChangeDateModeAdd: (e) => dispatch(onChangeDateModeAdd(e)),
})

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

export const onChangeDistricts = (e) => {
  return {
    type: "ON CHANGE DISTRICTS",
    value: e.target.value
  }
}
export const onChangeZones = (e) => {
  return {
    type: "ON CHANGE ZONE",
    value: e.target.value
  }
}
export const onChangeDateStarts = (e) => {
  return {
    type: "ON CHANGE DATE START",
    value: e.target.value
  }
}
export const onChangeDateEnds = (e) => {
  return {
    type: "ON CHANGE DATE END",
    value: e.target.value
  }
}


export const onClickPopUpSearchNoDocument = (no_document,no_districts,no_zone,no_date_start,no_date_end) => {
  return function (dispatch) {
    return axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/search?document_type_group_id=201&internal_document_id=${no_document}`, { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
      dispatch({
        type: "CLICK SEARCH POPUP NO DOCUMENT",
        value: res.data.results
      });
    });
  };
}

export const onClickSelectNoDocument = (document_id) => {

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

// Mode Add
export const onChangeNoDocumentModeAdd = (e) => {
  return {
    type: "ON CHANGE DOCUMENT MODE ADD",
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

export default connect(mapStateToProps, mapDispatchToProps)(TopContent);
