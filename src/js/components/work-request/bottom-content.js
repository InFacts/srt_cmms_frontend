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
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ผู้แจ้งเหตุ</p></div>
            <div className="grid_7 ">
              <input type="text" className="cancel-default mt-1" value={this.props.word_request_show.information_name} disabled="disabled"></input>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">วันเวลาเกิดเหตุ</p></div>
            <div className="grid_7 ">
              <input type="date" className="cancel-default grid_3 mt-1" value={this.props.word_request_show.date_start} disabled="disabled"></input>
              <input type="time" className="cancel-default grid_3 mt-1 float-right" value={this.props.word_request_show.time_start} disabled="disabled"></input>
              <p className="cancel-default grid_1 float-right">เวลา</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">อาการขัดข้อง</p></div>
            <div className="grid_7 ">
              <textarea className="edit" name="Text1" cols="40" rows="2" value={this.props.word_request_show.job_name} disabled="disabled"></textarea>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">สถานที่ แขวง</p></div>
            <div className="grid_3 ">
              <select className="edit-select" disabled="disabled">
                {this.props.district.map(function (district, index) {
                  if (current.props.word_request_show.district === district.name) {
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
            <div className="grid_2"><p className="cancel-default">สถานที่ ตอน</p></div>
            <div className="grid_3 ">
              <select className="edit-select" disabled="disabled">
                {this.props.zone.map(function (zone, index) {
                  if (current.props.word_request_show.zone === zone.name) {
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
            <div className="grid_2"><p className="cancel-default">รายละเอียดของสถานที่</p></div>
            <div className="grid_3 ">
              <select className="edit-select" disabled="disabled">
                {this.props.station.map(function (station, index) {
                  if (current.props.word_request_show.station === station.name) {
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
            <div className="grid_2"><p className="cancel-default">ผู้แจ้งเหตุ</p></div>
            <div className="grid_7 ">
              <input type="text" className="cancel-default mt-1" value={this.props.word_request_show.information_name} onChange={(e) => { this.props.onChangeInformatioName(e) }}></input>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">วันเวลาเกิดเหตุ</p></div>
            <div className="grid_7 ">
              <input type="date" className="cancel-default grid_3 mt-1" value={this.props.word_request_show.date_start} onChange={(e) => { this.props.onChangeDateStart(e) }}></input>
              <input type="time" className="cancel-default grid_3 mt-1 float-right" value={this.props.word_request_show.time_start} onChange={(e) => { this.props.onChangeTimeStart(e) }}></input>
              <p className="cancel-default grid_1 float-right">เวลา</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">อาการขัดข้อง</p></div>
            <div className="grid_7 ">
              <textarea className="edit" name="Text1" cols="40" rows="2" value={this.props.word_request_show.job_name} onChange={(e) => { this.props.onChangeJobName(e) }}></textarea>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">สถานที่ แขวง</p></div>
            <div className="grid_3 ">
              <select className="edit-select" onChange={(e) => this.props.onChangeDistrict(e)}>
                {this.props.district.map(function (district, index) {
                  if (current.props.word_request_show.district === district.name) {
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
            <div className="grid_2"><p className="cancel-default">สถานที่ ตอน</p></div>
            <div className="grid_3 ">
              <select className="edit-select" onChange={(e) => this.props.onChangeZone(e)}>
                {this.props.zone.map(function (zone, index) {
                  if (current.props.word_request_show.zone === zone.name) {
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
            <div className="grid_2"><p className="cancel-default">รายละเอียดของสถานที่</p></div>
            <div className="grid_3 ">
              <select className="edit-select" onChange={(e) => this.props.onChangeStation(e)}>
                {this.props.station.map(function (station, index) {
                  if (current.props.word_request_show.station === station.name) {
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
            <div className="grid_2"><p className="cancel-default">ผู้แจ้งเหตุ</p></div>
            <div className="grid_7 ">
              <input type="text" className="cancel-default mt-1" value={this.props.information_name_add} onChange={(e) => { this.props.onChangeInformatioNameAdd(e) }}></input>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">วันเวลาเกิดเหตุ</p></div>
            <div className="grid_7 ">
              <input type="date" className="cancel-default grid_3 mt-1" value={this.props.date_start_add} onChange={(e) => { this.props.onChangeDateStartAdd(e) }}></input>
              <input type="time" className="cancel-default grid_3 mt-1 float-right" value={this.props.time_start_add} onChange={(e) => { this.props.onChangeTimeStartAdd(e) }}></input>
              <p className="cancel-default grid_1 float-right">เวลา</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">อาการขัดข้อง</p></div>
            <div className="grid_7 ">
              <textarea className="edit" name="Text1" cols="40" rows="2" value={this.props.job_name_add} onChange={(e) => { this.props.onChangeJobNameAdd(e) }}></textarea>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">สถานที่ แขวง</p></div>
            <div className="grid_3 ">
              <select className="edit-select" onChange={(e) => this.props.onChangeDistrictAdd(e)}>
              <option defaultValue="0"> none </option>
                  {this.props.district.map(function (district, index) {
                    return <option value={district.name} key={index}> {district.name} </option>
                  })}
               
              </select>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">สถานที่ ตอน</p></div>
            <div className="grid_3 ">
              <select className="edit-select" onChange={(e) => this.props.onChangeZoneAdd(e)}>
              <option defaultValue="0"> none </option>
                  {this.props.zone.map(function (zone, index) {
                    return <option value={zone.name} key={index}> {zone.name} </option>
                  })}
              </select>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายละเอียดของสถานที่</p></div>
            <div className="grid_3 ">
              <select className="edit-select" onChange={(e) => this.props.onChangeStationAdd(e)}>
                <option defaultValue="0"> none </option>
                  {this.props.station.map(function (station, index) {
                    return <option value={station.name} key={index}> {station.name} </option>
                  })}
              </select>
            </div>
          </div>
        </>
      )
    }

  }
  render() {
    return (

      <div id="blackground-gray">
        <div className="container_12 clearfix">
          <div className="grid_12 ">

            <h3 className="head-title-bottom mt-2">ข้อมูลเหตุขัดข้อง/ชำรุด</h3>
            {/* Input in Bottom */}
            {this.checkActionMode(this.props.actionMode)}
          </div>
          <div className="grid_12 ">
            <Files />
          </div>


        </div>
      </div>

    )
  };
}

const mapStateToProps = (state) => ({
  actionMode: state.action,
  word_request_show: state.word_request_show,

  district: state.district,
  zone: state.zone,
  station: state.station,

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

  // Mode Add
  onChangeInformatioNameAdd: (e) => dispatch(onChangeInformatioNameAdd(e)),
  onChangeDateStartAdd: (e) => dispatch(onChangeDateStartAdd(e)),
  onChangeTimeStartAdd: (e) => dispatch(onChangeTimeStartAdd(e)),
  onChangeDateEndAdd: (e) => dispatch(onChangeDateEndAdd(e)),
  onChangeTimeEndAdd: (e) => dispatch(onChangeTimeEndAdd(e)),
  onChangeStationAdd: (e) => dispatch(onChangeStationAdd(e)),
  onChangeDistrictAdd: (e) => dispatch(onChangeDistrictAdd(e)),
  onChangeZoneAdd: (e) => dispatch(onChangeZoneAdd(e)),
  onChangeJobNameAdd: (e) => dispatch(onChangeJobNameAdd(e)),

})
export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);

// Mode Edit
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
// Mode Add
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