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
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showMaintenanceCustom" aria-controls="modalMaintenanceCustom"></i></button>
              </div>
              <div className="p-search-box cancel-margin grid_3  float-right">
                <input type="date" className="p-search-box__input cancel-default " defaultValue={this.props.document_show.create_name} disabled="disabled" />
              </div>
              <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">วันที่ออกเอกสาร</p></div>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="top-text">เลขที่เอกสารอ้างอิง</p></div>
            <div>
              <div className="p-search-box cancel-margin grid_3 pull_0 ">
                <input type="search" className="p-search-box__input cancel-default " defaultValue={this.props.document_show.no_document_ref} disabled="disabled" />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showMaintenanceCustom" aria-controls="modalMaintenanceCustom"></i></button>
              </div>
              <div className="p-search-box cancel-margin grid_3  float-right">
                <input type="text" className="p-search-box__input cancel-default " defaultValue={this.props.document_show.date_start} disabled="disabled" />
              </div>
              <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">ผู้สร้างเอกสาร</p></div>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ชื่อแผนซ่อมบำรุง</p></div>
            <div className="grid_3 pull_0">
              <input className="cancel-default " type="text" disabled="disabled" defaultValue={this.props.document_show.name} />
            </div>

          </div>



          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">แขวง</p></div>
            <div className="grid_3 pull_0">
              <select className="edit-select-top" disabled="disabled">
                {current.props.district.map(function (district, index) {
                  if (current.props.document_show.district === district.name) {
                    return <option defaultValue={district.id} key={index} selected> {district.name} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ตอน</p></div>
            <div className="grid_3 pull_0">
              <select className="edit-select-top" disabled="disabled">
                {current.props.zone.map(function (zone, index) {
                  if (current.props.document_show.zone === zone.name) {
                    return <option defaultValue={zone.id} key={index} selected> {zone.name} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">สถานี</p></div>
            <div className="grid_3 pull_0">
              <select className="edit-select-top" disabled="disabled">
                {current.props.station.map(function (station, index) {
                  if (current.props.document_show.station === station.name) {
                    return <option defaultValue={station.id} key={index} selected> {station.name} </option>
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
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showMaintenanceCustom" aria-controls="modalMaintenanceCustom"></i></button>
              </div>
              <div className="p-search-box cancel-margin grid_3  float-right">
                <input type="date" className="p-search-box__input cancel-default " defaultValue={this.props.document_show.create_name} disabled="disabled" />
              </div>
              <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">วันที่ออกเอกสาร</p></div>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="top-text">เลขที่เอกสารอ้างอิง</p></div>
            <div>
              <div className="p-search-box cancel-margin grid_3 pull_0 ">
                <input type="search" className="p-search-box__input cancel-default " defaultValue={this.props.document_show.no_document_ref} onChange={(e) => this.props.onChangeNoDocumentRef(e)} />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showMaintenanceFixedAsset2" aria-controls="modalMaintenanceFixedAsset2"></i></button>
              </div>
              <div className="p-search-box cancel-margin grid_3  float-right">
                <input type="text" className="p-search-box__input cancel-default " defaultValue={this.props.document_show.date_start} disabled="disabled" />
              </div>
              <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">ผู้สร้างเอกสาร</p></div>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ชื่อแผนซ่อมบำรุง</p></div>
            <div className="grid_3 pull_0">
              <input className="cancel-default " type="text" disabled="disabled" defaultValue={this.props.document_show.name} onChange={(e) => this.props.onChangeName(e)} />
            </div>

          </div>



          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">แขวง</p></div>
            <div className="grid_3 pull_0">
              <select className="edit-select-top" onChange={(e) => this.props.onChangeDistrict(e)}>
                {current.props.district.map(function (district, index) {
                  if (current.props.document_show.district === district.name) {
                    return <option defaultValue={district.id} key={index} selected> {district.name} </option>
                  }
                  else {
                    return <option value={district.name} key={index}> {district.name} </option>
                  }
                })}
              </select>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ตอน</p></div>
            <div className="grid_3 pull_0">
              <select className="edit-select-top" onChange={(e) => this.props.onChangeZone(e)}>
                {current.props.zone.map(function (zone, index) {
                  if (current.props.document_show.zone === zone.name) {
                    return <option defaultValue={zone.id} key={index} selected> {zone.name} </option>
                  }
                  else {
                    return <option value={zone.name} key={index}> {zone.name} </option>
                  }
                })}
              </select>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">สถานี</p></div>
            <div className="grid_3 pull_0">
              <select className="edit-select-top" onChange={(e) => this.props.onChangeStation(e)}>
                {current.props.station.map(function (station, index) {
                  if (current.props.document_show.station === station.name) {
                    return <option defaultValue={station.id} key={index} selected> {station.name} </option>
                  }
                  else {
                    return <option value={station.name} key={index}> {station.name} </option>
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
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showMaintenanceFixedAsset" aria-controls="modalMaintenanceFixedAsset"></i></button>
              </div>
              <div className="p-search-box cancel-margin grid_3  float-right">
                <input type="date" className="p-search-box__input cancel-default " defaultValue={this.props.document_show_mode_add.create_name} disabled="disabled" />
              </div>
              <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">วันที่ออกเอกสาร</p></div>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="top-text">เลขที่เอกสารอ้างอิง</p></div>
            <div>
              <div className="p-search-box cancel-margin grid_3 pull_0 ">
                <input type="search" className="p-search-box__input cancel-default " defaultValue={this.props.document_show_mode_add.no_document_ref} onChange={(e) => this.props.onChangeNoDocumentRefAdd(e)} />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showMaintenanceFixedAsset2" aria-controls="modalMaintenanceFixedAsset2"></i></button>
              </div>
              <div className="p-search-box cancel-margin grid_3  float-right">
                <input type="text" className="p-search-box__input cancel-default " defaultValue={this.props.document_show_mode_add.date_start} disabled="disabled" />
              </div>
              <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">ผู้สร้างเอกสาร</p></div>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ชื่อแผนซ่อมบำรุง</p></div>
            <div className="grid_3 pull_0">
              <input className="cancel-default " type="text" disabled="disabled" defaultValue={this.props.document_show_mode_add.name} onChange={(e) => this.props.onChangeNameAdd(e)} />
            </div>

          </div>



          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">แขวง</p></div>
            <div className="grid_3 pull_0">
              <select className="edit-select-top" onChange={(e) => this.props.onChangeDistrictAdd(e)}>
                {current.props.district.map(function (district, index) {
                 
                    return <option defaultValue={district.id} key={index} selected> {district.name} </option>
                  
                })}
              </select>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ตอน</p></div>
            <div className="grid_3 pull_0">
              <select className="edit-select-top" onChange={(e) => this.props.onChangeZoneAdd(e)}>
                {current.props.zone.map(function (zone, index) {
                 
                    return <option defaultValue={zone.id} key={index} selected> {zone.name} </option>
                
                })}
              </select>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">สถานี</p></div>
            <div className="grid_3 pull_0">
              <select className="edit-select-top" onChange={(e) => this.props.onChangeStationAdd(e)}>
                {current.props.station.map(function (station, index) {
                
                    return <option defaultValue={station.id} key={index} selected> {station.name} </option>
                 
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
              <h4 className="head-title">สรุปการทำวาระซ่อมบำรุง - สถานี</h4>
              {/* Input in TopBar */}
              {this.checkActionMode(this.props.actionMode)}
            </section>

            <div className="grid_12">
              <div className="tab grid_11">
                <button type="button" id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "ข้อมูลการทำวาระ")}>ข้อมูลการทำวาระ</button>
                <button type="button" className="tablinks" onClick={e => this.tapChange(e, "ระบุผู้ปฎิบัติงาน")}>ระบุผู้ปฎิบัติงาน</button>
                <button type="button" className="tablinks" onClick={e => this.tapChange(e, "อุปกรณ์ที่ต้องนำไปปฎิบัติงาน")}>อุปกรณ์ที่ต้องนำไปปฎิบัติงาน</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal" id="modalMaintenanceCustom" style={{ display: "none" }}>
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
                            <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectNoDocument(e)} aria-label="Close active modal" aria-controls="modalMaintenanceCustom" id="closeModalAssetMaster">เลือก</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="grid_12">
                <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalMaintenanceCustom" id="closeModalMaintenanceCustom">กลับ</button>
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
  onChangeDistrict: (e) => dispatch(onChangeDistrict(e)),
  onChangeZone: (e) => dispatch(onChangeZone(e)),
  onChangeStation: (e) => dispatch(onChangeStation(e)),

  onChangeNoDocumentAdd: (e) => dispatch(onChangeNoDocumentAdd(e)),
  onChangeNoDocumentRefAdd: (e) => dispatch(onChangeNoDocumentRefAdd(e)),
  onChangeNameAdd: (e) => dispatch(onChangeNameAdd(e)),
  onChangeDistrictAdd: (e) => dispatch(onChangeDistrictAdd(e)),
  onChangeZoneAdd: (e) => dispatch(onChangeZoneAdd(e)),
  onChangeStationAdd: (e) => dispatch(onChangeStationAdd(e)),

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

export const onChangeDistrict = (e) => {
  return {
    type: "CHANGE DISTRICT",
    value: e.target.value
  }
}
export const onChangeZone = (e) => {
  return {
    type: "CHANGE ZONE",
    value: e.target.value
  }
}
export const onChangeStation = (e) => {
  return {
    type: "CHANGE STATION",
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

export const onChangeDistrictAdd = (e) => {
  return {
    type: "CHANGE DISTRICT ADD",
    value: e.target.value
  }
}
export const onChangeZoneAdd = (e) => {
  return {
    type: "CHANGE ZONE ADD",
    value: e.target.value
  }
}
export const onChangeStationAdd = (e) => {
  return {
    type: "CHANGE STATION ADD",
    value: e.target.value
  }
}
