import React from 'react';
import { connect } from 'react-redux';
import Document from '../../../images/document.svg'
import Files from '../common/files'

import '../../../css/style.css'

class BottomContent extends React.Component {

  checkActionMode = (mode) => {
    let current = this;
    if (mode === "search") {
      return (
        <>

          <div id="อาการเสีย" className="tabcontent">
            <h3 className="head-title-bottom mt-2">ข้อมูลเกี่ยวกับอาการขัดข้อง</h3>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">ชื่องาน</p></div>
              <div className="grid_7 ">
                <input type="text" className="cancel-default mt-1" value={this.props.word_order_show.information_name} disabled="disabled"></input>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">วันเวลาที่เกิดเหตุ</p></div>
              <div className="grid_7 ">
                <input type="date" className="cancel-default grid_3 mt-1" value={this.props.word_order_show.date_start} disabled="disabled"></input>
                <input type="time" className="cancel-default grid_3 mt-1 float-right" value={this.props.word_order_show.time_start} disabled="disabled"></input>
                <p className="cancel-default grid_1 float-right">เวลา</p>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">วันเวลาที่รับแจ้ง</p></div>
              <div className="grid_7 ">
                <input type="date" className="cancel-default grid_3 mt-1" value={this.props.word_order_show.date_end} disabled="disabled"></input>
                <input type="time" className="cancel-default grid_3 mt-1 float-right" value={this.props.word_order_show.time_end} disabled="disabled"></input>
                <p className="cancel-default grid_1 float-right">เวลา</p>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">อาการเสียโดยสรุป</p></div>
              <div className="grid_7 ">
                <input type="text" className="cancel-default mt-1" value={this.props.word_order_show.conclusions} disabled="disabled"></input>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">ได้รับเหตุจาก</p></div>
              <div className="grid_7">
                <input type="text" className="cancel-default mt-1" value={this.props.word_order_show.reason} disabled="disabled"></input>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">ได้รับข้อมูลผ่านช่องทาง</p></div>
              <div className="grid_7 ">
                {current.props.type.map(function (type, index) {
                        if (type.name === current.props.word_order_show.type){
                          return <div><input className="d-inline" type="radio" name="RadioOptions" id={type.name} value={type.name} checked/><label htmlFor={type.name} className="cancel-default d-inline">{type.name}</label></div>
                        }
                        else{
                          return <div><input className="d-inline ml-3" type="radio" name="RadioOptions" id={type.name} value={type.name} /><label htmlFor={type.name} className="cancel-default d-inline ml-3">{type.name} </label></div>
                        }
                })}

              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">รายงานการตรวจซ่อมอุปกรณ์แขวง</p></div>
              <div className="grid_7 ">
                <input type="text" className="cancel-default mt-1" value={this.props.word_order_show.report} disabled="disabled"></input>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default" style={{ paddingRight: "50px" }}>ที่ตั้งอุปกรณ์ที่ทำการตรวจซ่อม (สถานที่/ที่ตั้ง)</p></div>
              <div className="grid_7 ">
                <input type="text" className="cancel-default mt-1" value={this.props.word_order_show.equipment} disabled="disabled"></input>
              </div>
            </div>

            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">หมายเหตุ</p></div>
              <div className="grid_7">
                <textarea className="edit" name="Text1" cols="40" rows="2" value={this.props.word_order_show.note}></textarea>
              </div>
            </div>
          </div>

          <div id="สินทรัพย์ที่เกี่ยวข้อง" className="tabcontent">
            <h4 className="head-title-bottom mt-2">ข้อมูลเกี่ยวกับอาการขัดข้อง</h4>
            <div className="grid_12" style={{ paddingRight: "10px" }}>
              <table className="table-many-column">
                <thead>
                  <tr>
                    <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                    <th className="font" style={{ minWidth: "130px" }}>เลขที่สินทรัพย์</th>
                    <th className="font" style={{ minWidth: "250px" }}>รายละเอียด</th>
                    <th className="font text-center" style={{ minWidth: "150px" }}>ที่อยู่ปัจจุบัน</th>
                    <th className="font text-center" style={{ minWidth: "100px" }}>สถานะ</th>
                    <th className="font text-center" style={{ minWidth: "500px" }}>หมายเหตุ</th>
                  </tr>
                </thead>
                <tbody>


                  {/* "status": "เสียหาย", */}


                  {current.props.list_show.map(function (list, index) {
                    return (
                      <tr key={index}>
                        <th className="edit-padding text-center" style={{ minWidth: "30px" }}>{list.id}</th>
                        <td className="edit-padding" style={{ minWidth: "130px" }}>{list.no_part}</td>
                        <td className="edit-padding text-left" style={{ minWidth: "250px" }}>{list.quility}</td>
                        <td className="edit-padding text-center" style={{ minWidth: "80px" }}>{list.location}</td>
                        <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                          <select className="edit-select-table">
                            {current.props.status.map(function (status, index) {
                              if (list.status === status.name) {
                                return <option defaultValue={status.id} key={index} selected> {status.name} </option>
                              }
                              else {
                                return null
                              }
                            })}
                          </select>
                        </td>
                        <td className="edit-padding text-left" style={{ minWidth: "300px" }}>{list.note}</td>
                      </tr>)
                  })}
                </tbody>
              </table>
            </div>


          </div>

          <div id="แนบไฟล์" className="tabcontent">
            <div className="grid_12 ">
              <Files />
            </div>
          </div>

        </>
      )
    }
    if (mode === "edit") {
      return (
        <>
          <div id="อาการเสีย" className="tabcontent">
            <h3 className="head-title-bottom mt-2">ข้อมูลเกี่ยวกับอาการขัดข้อง</h3>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">ชื่องาน</p></div>
              <div className="grid_7 ">
                <input type="text" className="cancel-default mt-1" value={this.props.word_order_show.information_name} onChange={(e) => { this.props.onChangeInformatioName(e) }} ></input>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">วันเวลาที่เกิดเหตุ</p></div>
              <div className="grid_7 ">
                <input type="date" className="cancel-default grid_3 mt-1" value={this.props.word_order_show.date_start} onChange={(e) => { this.props.onChangeDateStart(e) }}></input>
                <input type="time" className="cancel-default grid_3 mt-1 float-right" value={this.props.word_order_show.time_start} onChange={(e) => { this.props.onChangeTimeStart(e) }}></input>
                <p className="cancel-default grid_1 float-right">เวลา</p>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">วันเวลาที่รับแจ้ง</p></div>
              <div className="grid_7 ">
                <input type="date" className="cancel-default grid_3 mt-1" value={this.props.word_order_show.date_end} onChange={(e) => { this.props.onChangeDateEnd(e) }}></input>
                <input type="time" className="cancel-default grid_3 mt-1 float-right" value={this.props.word_order_show.time_end} onChange={(e) => { this.props.onChangeTimeEnd(e) }}></input>
                <p className="cancel-default grid_1 float-right">เวลา</p>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">อาการเสียโดยสรุป</p></div>
              <div className="grid_7 ">
                <input type="text" className="cancel-default mt-1" value={this.props.word_order_show.conclusions} onChange={(e) => { this.props.onChangeConclusions(e) }}></input>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">ได้รับเหตุจาก</p></div>
              <div className="grid_7">
                <input type="text" className="cancel-default mt-1" value={this.props.word_order_show.reason} onChange={(e) => { this.props.onChangeReason(e) }}></input>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">ได้รับข้อมูลผ่านช่องทาง</p></div>
              <div className="grid_7 ">
                <input className="d-inline" type="radio" name="RadioOptions" id="Radio1" value="โทรศัพท์" onChange={(e) => { this.props.onChangeType(e) }} />
                <label htmlFor="Radio1" className="cancel-default d-inline">โทรศัพท์</label>
                <input className="d-inline ml-3" type="radio" name="RadioOptions" id="Radio2" value="จดหมาย" onChange={(e) => { this.props.onChangeType(e) }} />
                <label htmlFor="Radio2" className="cancel-default d-inline ml-3">จดหมาย</label>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">รายงานการตรวจซ่อมอุปกรณ์แขวง</p></div>
              <div className="grid_7 ">
                <input type="text" className="cancel-default mt-1" value={this.props.word_order_show.report} onChange={(e) => { this.props.onChangeReport(e) }}></input>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default" style={{ paddingRight: "50px" }}>ที่ตั้งอุปกรณ์ที่ทำการตรวจซ่อม (สถานที่/ที่ตั้ง)</p></div>
              <div className="grid_7 ">
                <input type="text" className="cancel-default mt-1" value={this.props.word_order_show.equipment} onChange={(e) => { this.props.onChangeEquipment(e) }}></input>
              </div>
            </div>

            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">หมายเหตุ</p></div>
              <div className="grid_7">
                <textarea className="edit" name="Text1" cols="40" rows="2" value={this.props.word_order_show.note} onChange={(e) => { this.props.onChangeNote(e) }}></textarea>
              </div>
            </div>
          </div>

          <div id="สินทรัพย์ที่เกี่ยวข้อง" className="tabcontent">
            <h4 className="head-title-bottom mt-2">ข้อมูลเกี่ยวกับอาการขัดข้อง</h4>
            <div className="grid_12" style={{ paddingRight: "10px" }}>
              <table className="table-many-column">
                <thead>
                  <tr>
                    <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                    <th className="font" style={{ minWidth: "130px" }}>เลขที่สินทรัพย์</th>
                    <th className="font" style={{ minWidth: "250px" }}>รายละเอียด</th>
                    <th className="font text-center" style={{ minWidth: "150px" }}>ที่อยู่ปัจจุบัน</th>
                    <th className="font text-center" style={{ minWidth: "100px" }}>สถานะ</th>
                    <th className="font text-center" style={{ minWidth: "500px" }}>หมายเหตุ</th>
                  </tr>
                </thead>
                <tbody>


                  {/* "status": "เสียหาย", */}


                  {current.props.list_show.map(function (list, index) {
                    return (
                      <tr key={index}>
                        <th className="edit-padding text-center" style={{ minWidth: "30px" }}>{list.id}</th>
                        <td className="edit-padding" style={{ minWidth: "130px" }}>{list.no_part}</td>
                        <td className="edit-padding text-left" style={{ minWidth: "250px" }}>{list.quility}</td>
                        <td className="edit-padding text-center" style={{ minWidth: "80px" }}>{list.location}</td>
                        <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                          <select className="edit-select-table">
                            {current.props.status.map(function (status, index) {
                              if (list.status === status.name) {
                                return <option defaultValue={status.id} key={index} selected> {status.name} </option>
                              }
                              else {
                                return null
                              }
                            })}
                          </select>
                        </td>
                        <td className="edit-padding text-left" style={{ minWidth: "300px" }}>{list.note}</td>
                      </tr>)
                  })}
                </tbody>
              </table>
            </div>
            {/* <select className="edit-select" onChange={(e) => this.props.onChangeZone(e)}>
                {this.props.zone.map(function (zone, index) {
                  if (current.props.word_request_show.zone === zone.name) {
                    return <option defaultValue={zone.id} key={index} selected> {zone.name} </option>
                  }
                  else {
                    return <option value={zone.name} key={index}> {zone.name} </option>
                  }
                })} */}

          </div>


          <div id="แนบไฟล์" className="tabcontent">
            <div className="grid_12 ">
              <Files />
            </div>
          </div>
        </>
      )
    }
    if (mode === "add") {
      return (
        <>

<div id="อาการเสีย" className="tabcontent">
            <h3 className="head-title-bottom mt-2">ข้อมูลเกี่ยวกับอาการขัดข้อง</h3>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">ชื่องาน</p></div>
              <div className="grid_7 ">
                <input type="text" className="cancel-default mt-1" value={this.props.information_name_add} onChange={(e) => { this.props.onChangeInformatioNameAdd(e) }} ></input>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">วันเวลาที่เกิดเหตุ</p></div>
              <div className="grid_7 ">
                <input type="date" className="cancel-default grid_3 mt-1" value={this.props.date_start_add} onChange={(e) => { this.props.onChangeDateStartAdd(e) }}></input>
                <input type="time" className="cancel-default grid_3 mt-1 float-right" value={this.props.time_start_add} onChange={(e) => { this.props.onChangeTimeStartAdd(e) }}></input>
                <p className="cancel-default grid_1 float-right">เวลา</p>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">วันเวลาที่รับแจ้ง</p></div>
              <div className="grid_7 ">
                <input type="date" className="cancel-default grid_3 mt-1" value={this.props.date_end_add} onChange={(e) => { this.props.onChangeDateEndAdd(e) }}></input>
                <input type="time" className="cancel-default grid_3 mt-1 float-right" value={this.props.time_end_add} onChange={(e) => { this.props.onChangeTimeEndAdd(e) }}></input>
                <p className="cancel-default grid_1 float-right">เวลา</p>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">อาการเสียโดยสรุป</p></div>
              <div className="grid_7 ">
                <input type="text" className="cancel-default mt-1" value={this.props.conclusions_add} onChange={(e) => { this.props.onChangeConclusionsAdd(e) }}></input>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">ได้รับเหตุจาก</p></div>
              <div className="grid_7">
                <input type="text" className="cancel-default mt-1" value={this.props.reason_add} onChange={(e) => { this.props.onChangeReasonAdd(e) }}></input>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">ได้รับข้อมูลผ่านช่องทาง</p></div>
              <div className="grid_7 ">
                <input className="d-inline" type="radio" name="RadioOptions" id="Radio1" value="โทรศัพท์" onChange={(e) => { this.props.onChangeTypeAdd(e) }}/>
                <label htmlFor="Radio1" className="cancel-default d-inline">โทรศัพท์</label>
                <input className="d-inline ml-3" type="radio" name="RadioOptions" id="Radio2" value="จดหมาย" onChange={(e) => { this.props.onChangeTypeAdd(e) }}/>
                <label htmlFor="Radio2" className="cancel-default d-inline ml-3">จดหมาย</label>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">รายงานการตรวจซ่อมอุปกรณ์แขวง</p></div>
              <div className="grid_7 ">
                <input type="text" className="cancel-default mt-1" value={this.props.report_add} onChange={(e) => { this.props.onChangeReportAdd(e) }}></input>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default" style={{ paddingRight: "50px" }}>ที่ตั้งอุปกรณ์ที่ทำการตรวจซ่อม (สถานที่/ที่ตั้ง)</p></div>
              <div className="grid_7 ">
                <input type="text" className="cancel-default mt-1" value={this.props.equipment_add} onChange={(e) => { this.props.onChangeEquipmentAdd(e) }}></input>
              </div>
            </div>

            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">หมายเหตุ</p></div>
              <div className="grid_7">
                <textarea className="edit" name="Text1" cols="40" rows="2" value={this.props.note_add} onChange={(e) => { this.props.onChangeNoteAdd(e) }}></textarea>
              </div>
            </div>
          </div>

          <div id="สินทรัพย์ที่เกี่ยวข้อง" className="tabcontent">
            <h4 className="head-title-bottom mt-2">ข้อมูลเกี่ยวกับอาการขัดข้อง</h4>
            <div className="grid_12" style={{ paddingRight: "10px" }}>
              <table className="table-many-column">
                <thead>
                  <tr>
                    <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                    <th className="font" style={{ minWidth: "130px" }}>เลขที่สินทรัพย์</th>
                    <th className="font" style={{ minWidth: "250px" }}>รายละเอียด</th>
                    <th className="font text-center" style={{ minWidth: "150px" }}>ที่อยู่ปัจจุบัน</th>
                    <th className="font text-center" style={{ minWidth: "100px" }}>สถานะ</th>
                    <th className="font text-center" style={{ minWidth: "500px" }}>หมายเหตุ</th>
                  </tr>
                </thead>
                <tbody>


                  {/* "status": "เสียหาย", */}


                  {current.props.list_show.map(function (list, index) {
                    return (
                      <tr key={index}>
                        <th className="edit-padding text-center" style={{ minWidth: "30px" }}>{list.id}</th>
                        <td className="edit-padding" style={{ minWidth: "130px" }}>{list.no_part}</td>
                        <td className="edit-padding text-left" style={{ minWidth: "250px" }}>{list.quility}</td>
                        <td className="edit-padding text-center" style={{ minWidth: "80px" }}>{list.location}</td>
                        <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                          <select className="edit-select-table">
                            {current.props.status.map(function (status, index) {
                              if (list.status === status.name) {
                                return <option defaultValue={status.id} key={index} selected> {status.name} </option>
                              }
                              else {
                                return null
                              }
                            })}
                          </select>
                        </td>
                        <td className="edit-padding text-left" style={{ minWidth: "300px" }}>{list.note}</td>
                      </tr>)
                  })}
                </tbody>
              </table>
            </div>
            {/* <select className="edit-select" onChange={(e) => this.props.onChangeZone(e)}>
                {this.props.zone.map(function (zone, index) {
                  if (current.props.word_request_show.zone === zone.name) {
                    return <option defaultValue={zone.id} key={index} selected> {zone.name} </option>
                  }
                  else {
                    return <option value={zone.name} key={index}> {zone.name} </option>
                  }
                })} */}

          </div>


          <div id="แนบไฟล์" className="tabcontent">
            <div className="grid_12 ">
              <Files />
            </div>
          </div>
        </>
      )
    }

  }


  render() {
    return (
      <form>
        <div id="blackground-gray">
          <div className="container_12 clearfix">
            <div className="grid_12 ">
              {/* Input in Bottom */}
              {this.checkActionMode(this.props.actionMode)}






            </div>
          </div>
        </div>
      </form>
    )
  };
}



const mapStateToProps = (state) => ({
  actionMode: state.action,
  word_order_show: state.word_order_show,
  list_show: state.list_show,

  district: state.district,
  zone: state.zone,
  status: state.status,
  type:state.type,

  // Mode Add
  information_name_add: state.information_name_add,
  date_start_add: state.date_start_add,
  time_start_add: state.time_start_add,
  date_end_add: state.date_end_add,
  time_end_add: state.time_end_add,
  district_add: state.district_add,
  zone_add: state.zone_add,
  station_add: state.station_add,
  job_name_add: state.job_name_add,
  type_add:state.type_add,

  conclusions_add: state.conclusions_add,
  reason_add: state.reason_add,
  report_add: state.report_add,
  equipment_add: state.equipment_add,
  note_add: state.note_add,
  list_add: state.list_add,

})

const mapDispatchToProps = (dispatch) => ({

  // Mode Edit
  onChangeInformatioName: (e) => dispatch(onChangeInformatioName(e)),
  onChangeDateStart: (e) => dispatch(onChangeDateStart(e)),
  onChangeTimeStart: (e) => dispatch(onChangeTimeStart(e)),
  onChangeDateEnd: (e) => dispatch(onChangeDateEnd(e)),
  onChangeTimeEnd: (e) => dispatch(onChangeTimeEnd(e)),
  onChangeStation: (e) => dispatch(onChangeStation(e)),
  onChangeDistrict: (e) => dispatch(onChangeDistrict(e)),
  onChangeZone: (e) => dispatch(onChangeZone(e)),
  onChangeJobName: (e) => dispatch(onChangeJobName(e)),
  onChangeNote: (e) => dispatch(onChangeNote(e)),
  onChangeEquipment: (e) => dispatch(onChangeEquipment(e)),
  onChangeReport: (e) => dispatch(onChangeReport(e)),
  onChangeReason: (e) => dispatch(onChangeReason(e)),
  onChangeConclusions: (e) => dispatch(onChangeConclusions(e)),

  onChangeType: (e) => dispatch(onChangeType(e)),

  // Mode Add
  onChangeTypeAdd: (e) => dispatch(onChangeTypeAdd(e)),
  onChangeInformatioNameAdd: (e) => dispatch(onChangeInformatioNameAdd(e)),
  onChangeDateStartAdd: (e) => dispatch(onChangeDateStartAdd(e)),
  onChangeTimeStartAdd: (e) => dispatch(onChangeTimeStartAdd(e)),
  onChangeDateEndAdd: (e) => dispatch(onChangeDateEndAdd(e)),
  onChangeTimeEndAdd: (e) => dispatch(onChangeTimeEndAdd(e)),
  onChangeStationAdd: (e) => dispatch(onChangeStationAdd(e)),
  onChangeDistrictAdd: (e) => dispatch(onChangeDistrictAdd(e)),
  onChangeZoneAdd: (e) => dispatch(onChangeZoneAdd(e)),
  onChangeJobNameAdd: (e) => dispatch(onChangeJobNameAdd(e)),
  onChangeNoteAdd: (e) => dispatch(onChangeNoteAdd(e)),
  onChangeEquipmentAdd: (e) => dispatch(onChangeEquipmentAdd(e)),
  onChangeReportAdd: (e) => dispatch(onChangeReportAdd(e)),
  onChangeReasonAdd: (e) => dispatch(onChangeReasonAdd(e)),
  onChangeConclusionsAdd: (e) => dispatch(onChangeConclusionsAdd(e)),

})

export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);


// Mode Edit


// export const onChangeList = (e) => {
//   return {
//     type: "ON CHANGE LIST",
//     value: e.target.value
//   }
// }
export const onChangeNote = (e) => {
  return {
    type: "ON CHANGE NOTE",
    value: e.target.value
  }
}

export const onChangeEquipment = (e) => {
  return {
    type: "ON CHANGE EQUIPMENT",
    value: e.target.value
  }
}

export const onChangeReport = (e) => {
  return {
    type: "ON CHANGE REPORT",
    value: e.target.value
  }
}

export const onChangeReason = (e) => {
  return {
    type: "ON CHANGE REASON",
    value: e.target.value
  }
}


export const onChangeConclusions = (e) => {
  return {
    type: "ON CHANGE CONCLUSIONS",
    value: e.target.value
  }
}


export const onChangeInformatioName = (e) => {
  return {
    type: "ON CHANGE INFORMATION NAME",
    value: e.target.value
  }
}

export const onChangeDateStart = (e) => {
  return {
    type: "ON CHANGE DATE START",
    value: e.target.value
  }
}

export const onChangeTimeStart = (e) => {
  return {
    type: "ON CHANGE TIME START",
    value: e.target.value
  }
}

export const onChangeDateEnd = (e) => {
  return {
    type: "ON CHANGE DATE END",
    value: e.target.value
  }
}

export const onChangeTimeEnd = (e) => {
  return {
    type: "ON CHANGE TIME END",
    value: e.target.value
  }
}

export const onChangeStation = (e) => {
  console.log(e.target.value)
  return {
    type: "ON CHANGE STATION",
    value: e.target.value
  }
}

export const onChangeDistrict = (e) => {
  return {
    type: "ON CHANGE DISTRICT",
    value: e.target.value
  }
}

export const onChangeZone = (e) => {
  return {
    type: "ON CHANGE ZONE",
    value: e.target.value
  }
}

export const onChangeJobName = (e) => {
  return {
    type: "ON CHANGE JOB NAME",
    value: e.target.value
  }
}

export const onChangeType = (e) => {
  return {
    type: "ON CHANGE TYPE",
    value: e.target.value
  }
}


// Mode Add


export const onChangeTypeAdd = (e) => {
  return {
    type: "ON CHANGE TYPE ADD",
    value: e.target.value
  }
}

export const onChangeNoteAdd = (e) => {
  return {
    type: "ON CHANGE NOTE ADD",
    value: e.target.value
  }
}

export const onChangeEquipmentAdd = (e) => {
  return {
    type: "ON CHANGE EQUIPMENT ADD",
    value: e.target.value
  }
}

export const onChangeReportAdd = (e) => {
  return {
    type: "ON CHANGE REPORT ADD",
    value: e.target.value
  }
}

export const onChangeReasonAdd = (e) => {
  return {
    type: "ON CHANGE REASON ADD",
    value: e.target.value
  }
}


export const onChangeConclusionsAdd = (e) => {
  return {
    type: "ON CHANGE CONCLUSIONS ADD",
    value: e.target.value
  }
}


export const onChangeInformatioNameAdd = (e) => {
  return {
    type: "ON CHANGE INFORMATION NAME ADD",
    value: e.target.value
  }
}

export const onChangeDateStartAdd = (e) => {
  return {
    type: "ON CHANGE DATE START ADD",
    value: e.target.value
  }
}

export const onChangeTimeStartAdd = (e) => {
  return {
    type: "ON CHANGE TIME START ADD",
    value: e.target.value
  }
}

export const onChangeDateEndAdd = (e) => {
  return {
    type: "ON CHANGE DATE END ADD",
    value: e.target.value
  }
}

export const onChangeTimeEndAdd = (e) => {
  return {
    type: "ON CHANGE TIME END ADD",
    value: e.target.value
  }
}

export const onChangeStationAdd = (e) => {
  console.log(e.target.value)
  return {
    type: "ON CHANGE STATION ADD",
    value: e.target.value
  }
}

export const onChangeDistrictAdd = (e) => {
  return {
    type: "ON CHANGE DISTRICT ADD",
    value: e.target.value
  }
}

export const onChangeZoneAdd = (e) => {
  return {
    type: "ON CHANGE ZONE ADD",
    value: e.target.value
  }
}

export const onChangeJobNameAdd = (e) => {
  return {
    type: "ON CHANGE JOB NAME ADD",
    value: e.target.value
  }
}
