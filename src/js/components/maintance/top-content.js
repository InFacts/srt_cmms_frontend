import React from 'react';
import { connect } from 'react-redux'
import '../../../css/style.css'
import '../../../css/grid12.css';
import { Redirect } from 'react-router-dom'
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
            <div className="grid_2"><p className="top-text">เลขที่เอกสาร</p></div>
            <div>
              <div className="p-search-box cancel-margin grid_3 pull_0 ">
                <input type="search" className="p-search-box__input cancel-default " value={this.props.no_document} onChange={(e) => this.props.onChangeNoDocument(e)} />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showMaintenance" aria-controls="modalMaintenance"></i></button>
              </div>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="top-text">เลขที่เอกสารอ้างอิง</p></div>
            <div>
              <div className="p-search-box cancel-margin grid_3 pull_0 ">
                <input type="search" className="p-search-box__input cancel-default " defaultValue={this.props.document_show.no_document_ref} disabled="disabled" />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="" aria-controls=""></i></button>
              </div>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ผู้รับผิดชอบ</p></div>
            <div className="grid_3 pull_0">
              <input className="cancel-default " type="text" defaultValue={this.props.document_show.name} disabled="disabled" />
            </div>
            <div className="grid_2"><p className="cancel-default float-left">สถานะ</p></div>
            <div className="grid_3 pull_0">
              <select className="edit-select grid_3 float-right" disabled="disabled">
                {current.props.list_status_asset1.map(function (list_status_asset1, index) {
                  if (current.props.document_show.status === list_status_asset1.status) {
                    return <option defaultValue={list_status_asset1.id} key={index} selected> {list_status_asset1.status} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
            </div>
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
              <div className="p-search-box cancel-margin grid_3 pull_0 ">
                <input type="search" className="p-search-box__input cancel-default " value={this.props.no_document} onChange={(e) => this.props.onChangeNoDocument(e)} />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showMaintenance" aria-controls="modalMaintenance"></i></button>
              </div>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="top-text">เลขที่เอกสารอ้างอิง</p></div>
            <div>
              <div className="p-search-box cancel-margin grid_3 pull_0 ">
                <input type="search" className="p-search-box__input cancel-default " defaultValue={this.props.document_show.no_document_ref} onChange={(e) => this.props.onChangeNoDocumentRef(e)} />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="" aria-controls=""></i></button>
              </div>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ผู้รับผิดชอบ</p></div>
            <div className="grid_3 pull_0">
              <input className="cancel-default " type="text" defaultValue={this.props.document_show.name} onChange={(e) => this.props.onChangeName(e)} />
            </div>
            <div className="grid_2"><p className="cancel-default float-left">สถานะ</p></div>
            <div className="grid_3 pull_0">
              <select className="edit-select grid_3 float-right" onChange={(e) => this.props.onChangeStatus(e)}>
                {current.props.list_status_asset1.map(function (list_status_asset1, index) {
                  if (current.props.document_show.status === list_status_asset1.status) {
                    return <option defaultValue={list_status_asset1.id} key={index} selected> {list_status_asset1.status} </option>
                  }
                  else {
                    return <option value={list_status_asset1.status} key={index}> {list_status_asset1.status} </option>
                  }
                })}
              </select>
            </div>
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
              <div className="p-search-box cancel-margin grid_3 pull_0 ">
                <input type="search" className="p-search-box__input cancel-default " value={this.props.document_show_mode_add.no_document} onChange={(e) => this.props.onChangeNoDocumentAdd(e)} />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showMaintenance" aria-controls="modalMaintenance"></i></button>
              </div>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="top-text">เลขที่เอกสารอ้างอิง</p></div>
            <div>
              <div className="p-search-box cancel-margin grid_3 pull_0 ">
                <input type="search" className="p-search-box__input cancel-default " defaultValue={this.props.document_show_mode_add.no_document_ref} onChange={(e) => this.props.onChangeNoDocumentRefAdd(e)} />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="" aria-controls=""></i></button>
              </div>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ผู้รับผิดชอบ</p></div>
            <div className="grid_3 pull_0">
              <input className="cancel-default " type="text" defaultValue={this.props.document_show_mode_add.name} onChange={(e) => this.props.onChangeNameAdd(e)} />
            </div>
            <div className="grid_2"><p className="cancel-default float-left">สถานะ</p></div>
            <div className="grid_3 pull_0">
              <select className="edit-select grid_3 float-right" onChange={(e) => this.props.onChangeStatusAdd(e)}>
                {current.props.list_status_asset1.map(function (list_status_asset1, index) {

                  return <option defaultValue={list_status_asset1.id} key={index} selected> {list_status_asset1.status} </option>

                })}
              </select>
            </div>
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
              <h4 className="head-title">สรุปการทำวาระซ่อมบำรุง - สินทรัพย์</h4>
              {/* Input in TopBar */}
              {this.checkActionMode(this.props.actionMode)}
            </section>

            <div className="grid_12">
              <div className="tab grid_11">
                <button type="button" id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "รายการอะไหล่")}>รายการอะไหล่</button>
                <button type="button" className="tablinks" onClick={e => this.tapChange(e, "ระบุผู้ปฎิบัติงาน")}>ระบุผู้ปฎิบัติงาน</button>
                <button type="button" className="tablinks" onClick={e => this.tapChange(e, "อุปกรณ์ที่ต้องนำไปปฎิบัติงาน")}>อุปกรณ์ที่ต้องนำไปปฎิบัติงาน</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal" id="modalMaintenance" style={{ display: "none" }}>
          <div className="gray-board">
            <p className="head-title-modal edit">รายการแจ้งเหตุขัดข้อง/ชำรุด</p>
            <div className="container_12 edit-padding">
              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">เลขที่เอกสาร:</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" value={this.props.no_document} onChange={(e) => this.props.onChangeNoDocument(e)} />
                </div>
              </div>
              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">สถานที่ แขวง:</p></div>
                <div className="grid_8 pull_0">
                  <select className="edit-select-top grid_3 " onChange={(e) => this.props.onChangeDistricts(e)}>
                    <option defaultValue=""></option>
                    {this.props.district.map(function (district, index) {
                      return <option value={district.name} key={index}> {district.name} </option>
                    })}
                  </select>
                  <select className="edit-select-top grid_3 float-right" onChange={(e) => this.props.onChangeZones(e)}>
                    <option defaultValue=""></option>
                    {this.props.zone.map(function (zone, index) {
                      return <option value={zone.name} key={index}> {zone.name} </option>
                    })}
                  </select>
                  <p className="cancel-default grid_2 float-right">สถานที่ ตอน:</p>
                </div>
              </div>
              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">วันที่เริ่มต้น:</p></div>
                <div className="grid_8 pull_0">
                  <input type="date" className="cancel-default grid_3 " value={this.props.date_starts} onChange={(e) => this.props.onChangeDateStarts(e)}></input>
                  <input type="date" className="cancel-default grid_3 float-right" value={this.props.date_ends} onChange={(e) => this.props.onChangeDateEnds(e)}></input>
                  <p className="cancel-default grid_2 float-right">วันที่สิ้นสุด:</p>
                </div>
                <button className="button-blue edit grid_1 float-right mr-5" type="button" onClick={(e) => this.props.onClickPopUpSearchNoDocument(e)}>ค้นหา</button>
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

                          <td className="edit-padding" style={{ minWidth: "150px", paddingLeft: "50px" }}>{document_show_popup.no_word_request}</td>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>{document_show_popup.job_name}</td>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>{document_show_popup.date_start} {document_show_popup.time_start}</td>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>{document_show_popup.create_name}</td>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>{document_show_popup.station}</td>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>
                            <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectNoDocument(e)} aria-label="Close active modal" aria-controls="modalMaintenance" id="closeModalAssetMaster">เลือก</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="grid_12">
                <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalMaintenance" id="closeModalMaintenance">กลับ</button>
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

  // Mode Search
  no_document: state.no_document,
  districts: state.districts,
  zones: state.zones,
  date_starts: state.date_starts,
  date_ends: state.date_ends,

  document_show_popup: state.document_show_popup,
  document_show: state.document_show,

  list_status_asset1: state.list_status_asset1,
  district: state.district,
  zone: state.zone,
  station: state.station,

  document_show_mode_add: state.document_show_mode_add
})

const mapDispatchToProps = (dispatch) => ({
  onChangeNoDocument: (e) => dispatch(onChangeNoDocument(e)),
  onChangeDistricts: (e) => dispatch(onChangeDistricts(e)),
  onChangeZones: (e) => dispatch(onChangeZones(e)),
  onChangeDateStarts: (e) => dispatch(onChangeDateStarts(e)),
  onChangeDateEnds: (e) => dispatch(onChangeDateEnds(e)),
  onClickOpenPopUpNoDocument: (e) => dispatch(onClickOpenPopUpNoDocument(e)),
  onClickPopUpSearchNoDocument: (e) => dispatch(onClickPopUpSearchNoDocument(e)),
  onClickSelectNoDocument: (e) => dispatch(onClickSelectNoDocument(e)),


  onChangeNoDocumentRef: (e) => dispatch(onChangeNoDocumentRef(e)),
  onChangeName: (e) => dispatch(onChangeName(e)),
  onChangeStatus: (e) => dispatch(onChangeStatus(e)),


  onChangeNoDocumentAdd: (e) => dispatch(onChangeNoDocumentAdd(e)),
  onChangeNoDocumentRefAdd: (e) => dispatch(onChangeNoDocumentRefAdd(e)),
  onChangeNameAdd: (e) => dispatch(onChangeNameAdd(e)),
  onChangeStatusAdd: (e) => dispatch(onChangeStatusAdd(e)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TopContent);


export const onChangeNoDocument = (e) => {
  return {
    type: "CHANGE NO DOCUMENT",
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
    type: "ON CHANGE ZONES",
    value: e.target.value
  }
}
export const onChangeDateStarts = (e) => {
  return {
    type: "ON CHANGE DATE STRARTS",
    value: e.target.value
  }
}
export const onChangeDateEnds = (e) => {
  return {
    type: "ON CHANGE DATE ENDS",
    value: e.target.value
  }
}
export const onClickOpenPopUpNoDocument = (e) => {
  return {
    type: "CLICK OPEN POPUP NO DOCUMENT"
  }
}
export const onClickPopUpSearchNoDocument = (e) => {
  return {
    type: "CLICK SEARCH POPUP NO DOCUMENT"
  }
}
export const onClickSelectNoDocument = (e) => {
  return {
    type: "CLICK SELECT POPUP NO DOCUMENT",
    row_document_show_popup: e.target.parentNode.parentNode.id
  }
}


export const onChangeNoDocumentRef = (e) => {
  return {
    type: "CHANGE NO DOCUMENT REF",
    value: e.target.value
  }
}
export const onChangeName = (e) => {
  return {
    type: "CHANGE NAME",
    value: e.target.value
  }
}
export const onChangeStatus = (e) => {
  return {
    type: "CHANGE STATUS",
    value: e.target.value
  }
}

export const onChangeNoDocumentAdd = (e) => {
  return {
    type: "CHANGE NO DOCUMENT ADD",
    value: e.target.value
  }
}
export const onChangeNoDocumentRefAdd = (e) => {
  return {
    type: "CHANGE NO DOCUMENT REF ADD",
    value: e.target.value
  }
}
export const onChangeNameAdd = (e) => {
  return {
    type: "CHANGE NAME ADD",
    value: e.target.value
  }
}

export const onChangeStatusAdd = (e) => {
  return {
    type: "CHANGE STATUS ADD",
    value: e.target.value
  }
}
