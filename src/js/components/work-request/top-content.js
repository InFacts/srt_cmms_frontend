import React from 'react';
import { connect } from 'react-redux'

import '../../../css/style.css'
import '../../../css/grid12.css';

class TopContent extends React.Component {

  checkActionMode = (mode) => {

    if (mode === "search") {
      return (
        <>
          <div className="grid_12">
            <div className="grid_2"><p className="top-text">เลขที่เอกสาร</p></div>
            <div>
              <div className="p-search-box cancel-margin grid_3 pull_0">
                <input type="search" className="p-search-box__input cancel-default " value={this.props.no_word_request} onChange={(e) => { this.props.onChangeNoWorkRequset(e) }} />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showWorkRequset" aria-controls="modalWorkRequset"></i></button>
              </div>
              <div className="p-search-box cancel-margin grid_3  float-right">
                <input type="date" className="p-search-box__input cancel-default " defaultValue={this.props.word_request_show.create_date_time} disabled="diabled" />
              </div>
              <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">วันที่ออกเอกสาร</p></div>
            </div>
          </div>
          <div className="grid_12">
            <div>
              <div className="p-search-box cancel-margin grid_3  float-right">
                <input type="text" className=" p-search-box__input cancel-default  " defaultValue={this.props.word_request_show.create_name} disabled="diabled"></input>
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
                <input type="search" className="p-search-box__input cancel-default " value={this.props.no_word_request} onChange={(e) => { this.props.onChangeNoWorkRequset(e) }} />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showWorkRequset" aria-controls="modalWorkRequset"></i></button>
              </div>
              <div className="p-search-box cancel-margin grid_3  float-right">
                <input type="date" className="p-search-box__input cancel-default " value={this.props.word_request_show.create_date_time} onChange={(e) => this.props.onChangeCreateDatetime(e)} />
              </div>
              <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">วันที่ออกเอกสาร</p></div>
            </div>
          </div>
          <div className="grid_12">
            <div>
              <div className="p-search-box cancel-margin grid_3  float-right">
                <input type="text" className=" p-search-box__input cancel-default  " value={this.props.word_request_show.create_name} onChange={(e) => this.props.onChangeCreateName(e)}></input>
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
                <input type="search" className="p-search-box__input cancel-default " value={this.props.no_word_request_add} onChange={(e) => { this.props.onChangeNoWordRequestAdd(e) }} />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showWorkRequset" aria-controls="modalWorkRequset"></i></button>
              </div>
              <div className="p-search-box cancel-margin grid_3  float-right">
                <input type="date" className="p-search-box__input cancel-default " value={this.props.create_date_time_add} onChange={(e) => this.props.onChangeCreateDatetimeAdd(e)} />
              </div>
              <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">วันที่ออกเอกสาร</p></div>
            </div>
          </div>
          <div className="grid_12">
            <div>
              <div className="p-search-box cancel-margin grid_3  float-right">
                <input type="text" className=" p-search-box__input cancel-default  " value={this.props.create_name_add} onChange={(e) => this.props.onChangeCreateNameAdd(e)}></input>
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


        <div className="modal" id="modalWorkRequset" style={{ display: "none" }}>
          <div className="gray-board">
            <p className="head-title-modal edit">รายการแจ้งเหตุขัดข้อง/ชำรุด</p>
            <div className="container_12 edit-padding">

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">เลขที่เอกสาร:</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" value={this.props.no_word_request} onChange={(e) => this.props.onChangeNoWorkRequset(e)} />
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
                <button className="button-blue edit grid_1 float-right mr-5" type="button" onClick={(e) => this.props.onClickPopUpSearchWorkRequset(e)}>ค้นหา</button>
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
                    {this.props.word_request_show_popup.map(function (word_request_show_popup, index) {
                      return (
                        <tr key={index} id={index}>

                          <td className="edit-padding" style={{ minWidth: "150px", paddingLeft: "50px" }}>{word_request_show_popup.no_word_request}</td>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>{word_request_show_popup.job_name}</td>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>{word_request_show_popup.date_start} {word_request_show_popup.time_start}</td>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>{word_request_show_popup.create_name}</td>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>{word_request_show_popup.station}</td>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>
                            <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectNoWorkRequset(e)} aria-label="Close active modal" aria-controls="modalWorkRequset" id="closeModalWorkRequset">เลือก</button>
                          </td>
                        </tr>
                      )
                    })}


                  </tbody>
                </table>
              </div>


              <div className="grid_12">
                <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalWorkRequset" id="closeModalWorkRequset">กลับ</button>
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
  no_word_request: state.no_word_request,
  districts: state.districts,
  zones: state.zones,
  date_starts: state.date_starts,
  date_ends: state.date_ends,


  word_request_show_popup: state.word_request_show_popup,
  word_request_show: state.word_request_show,

  district: state.district,
  zone: state.zone,

  // Mode Add
  no_word_request_add: state.no_word_request_add,
  create_date_time_add: state.create_date_time_add,
  create_name_add: state.create_name_add,

})

const mapDispatchToProps = (dispatch) => ({
  onChangeNoWorkRequset: (e) => dispatch(onChangeNoWorkRequset(e)),
  onClickPopUpSearchWorkRequset: (e) => dispatch(onClickPopUpSearchWorkRequset(e)),
  onClickSelectNoWorkRequset: (e) => dispatch(onClickSelectNoWorkRequset(e)),
  onChangeDistricts: (e) => dispatch(onChangeDistricts(e)), 
  onChangeZones: (e) => dispatch(onChangeZones(e)),
  onChangeDateStarts: (e) => dispatch(onChangeDateStarts(e)),
  onChangeDateEnds: (e) => dispatch(onChangeDateEnds(e)),

  // Mode Edit
  onChangeCreateDatetime: (e) => dispatch(onChangeCreateDatetime(e)),
  onChangeCreateName: (e) => dispatch(onChangeCreateName(e)),

  // Mode Add
  onChangeNoWordRequestAdd: (e) => dispatch(onChangeNoWordRequestAdd(e)),
  onChangeCreateDatetimeAdd: (e) => dispatch(onChangeCreateDatetimeAdd(e)),
  onChangeCreateNameAdd: (e) => dispatch(onChangeCreateNameAdd(e))
})

// Mode Search
export const onChangeNoWorkRequset = (e) => {
  return {
    type: "ON CHANGE NO WORKREQUEST",
    value: e.target.value
  }
}

export const onChangeDistricts = (e) => {
  return {
    type: "ON CHANGE DISTRICTS WORKREQUEST",
    value: e.target.value
  }
}

export const onChangeZones = (e) => {
  return {
    type: "ON CHANGE ZONES WORKREQUEST",
    value: e.target.value
  }
}

export const onChangeDateStarts = (e) => {
  return {
    type: "ON CHANGE DATE STRARTS WORKREQUEST",
    value: e.target.value
  }
}

export const onChangeDateEnds = (e) => {
  return {
    type: "ON CHANGE DATE ENDS WORKREQUEST",
    value: e.target.value
  }
}
export const onClickPopUpSearchWorkRequset = (e) => {
  return {
    type: "CLICK SEARCH POPUP NO WORKREQUEST"
  }
}
export const onClickSelectNoWorkRequset = (e) => {
  return {
    type: "CLICK SELECT POPUP NO WORKREQUEST",
    row_word_request_show_popup: e.target.parentNode.parentNode.id
  }
}

// Mode Edit
export const onChangeCreateDatetime = (e) => {
  return {
    type: "ON CHANGE CREATE DATETIME",
    value: e.target.value
  }
}
export const onChangeCreateName = (e) => {
  return {
    type: "ON CHANGE CREATE NAME",
    value: e.target.value
  }
}

// Mode Add
export const onChangeNoWordRequestAdd = (e) => {
  return {
    type: "ON CHANGE NO WORDREQUEST ADD",
    value: e.target.value
  }
}
export const onChangeCreateDatetimeAdd = (e) => {
  return {
    type: "ON CHANGE CREATE DATETIME ADD",
    value: e.target.value
  }
}
export const onChangeCreateNameAdd = (e) => {
  return {
    type: "ON CHANGE CREATE NAME ADD",
    value: e.target.value
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TopContent);
