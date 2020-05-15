import React from 'react';
import { connect } from 'react-redux'
import Document from '../../../images/document.svg'
import Files from '../common/files'
import '../../../css/style.css'
import '../../../css/table.css';

class BottomContent extends React.Component {

  checkActionMode = (mode) => {
    const current = this;
    if (mode === "search") {
      return (
        <>
          <h3 className="head-title-bottom mt-2">ข้อมูลเกี่ยวกับอาการขัดข้อง</h3>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">เดินทางโดย</p></div>
            <div className="grid_7">
              <select className="edit-select" disabled="disabled">
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.travel_by === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">ออกเดินทาง</p></div>
            <div className="grid_7">
              <input type="date" className="cancel-default grid_3 mt-1" disabled="disabled" defaultValue={this.props.document_show.travel_by_date1}></input>
              <input type="time" className="cancel-default grid_3 mt-1 float-right" disabled="disabled" defaultValue={this.props.document_show.travel_by_time1}></input>
              <p className="cancel-default grid_1 float-right">เวลา</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">เดินทางถึง</p></div>
            <div className="grid_7">
              <input type="date" className="cancel-default grid_3 mt-1" disabled="disabled" defaultValue={this.props.document_show.travel_by_date2}></input>
              <input type="time" className="cancel-default grid_3 mt-1 float-right" disabled="disabled" defaultValue={this.props.document_show.travel_by_time2}></input>
              <p className="cancel-default grid_1 float-right">เวลา</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">วันเวลาที่แล้วเสร็จ</p></div>
            <div className="grid_7 ">
              <input type="date" className="cancel-default grid_3 mt-1" disabled="disabled" defaultValue={this.props.document_show.travel_by_date3}></input>
              <input type="time" className="cancel-default grid_3 mt-1 float-right" disabled="disabled" defaultValue={this.props.document_show.travel_by_time3}></input>
              <p className="cancel-default grid_1 float-right">เวลา</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">ระบบตรวจซ่อม</p></div>
            <div className="grid_7 ">
              <select className="edit-select grid_3" disabled="disabled">
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.inspection === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
              <select className="edit-select grid_3 float-right" disabled="disabled">
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.type === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ชนิด</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">รายการที่ซ่อม</p></div>
            <div className="grid_8 ">
              <input type="text" className="cancel-default mt-1" disabled="disabled" defaultValue={this.props.document_show.list}></input>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">ที่ตั้งอุปกรณ์ที่ทำการตรวจซ่อม</p></div>
            <div className="grid_8">
              <input type="text" className="cancel-default mt-1" disabled="disabled" defaultValue={this.props.document_show.location}></input>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">ชื่ออุปกรณ์ที่บำรุงรักษา</p></div>
            <div className="grid_8">
              <input type="text" className="cancel-default mt-1" disabled="disabled" defaultValue={this.props.document_show.name_inspection}></input>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">สาเหตุและอาการเสียโดยสรุป</p></div>
            <div className="grid_8">
              <textarea className="edit" name="Text1" cols="40" rows="2" disabled="disabled" defaultValue={this.props.document_show.symptoms}></textarea>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">ขบวนรถที่</p></div>
            <div className="grid_8">
              <p className="cancel-default grid_1 float-right">นาที:</p>
              <input type="text" className="cancel-default mt-1 grid_3" disabled="disabled" defaultValue={this.props.document_show.procession}></input>
              <input type="text" className="cancel-default mt-1 grid_2 float-right" disabled="disabled" defaultValue={this.props.document_show.time}></input>
              <p className="cancel-default grid_2 float-right">เสียเวลาเพราะเหตุนี้</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">สรุปการแก้ไขและการซ่อมแซม</p></div>
            <div className="grid_8 ">
              <textarea className="edit" name="Text1" cols="40" rows="2" disabled="disabled" defaultValue={this.props.document_show.conclude}></textarea>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">ยังไม่ได้จัดการแก้ไขเพราะ</p></div>
            <div className="grid_7 ">
              <select className="edit-select" disabled="disabled" >
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.edit === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">สรุปการแก้ไขและการซ่อมแซม</p></div>
            <div className="grid_8 ">
              <textarea className="edit" name="Text1" cols="40" rows="2" disabled="disabled" defaultValue={this.props.document_show.note}></textarea>
            </div>
          </div>
        </>
      )
    }
    if (mode === "edit") {
      return (
        <>
          <h3 className="head-title-bottom mt-2">ข้อมูลเกี่ยวกับอาการขัดข้อง</h3>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">เดินทางโดย</p></div>
            <div className="grid_7">
              <select className="edit-select" onChange={(e) => this.props.onChangeTravelBy(e)} >
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.travel_by === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return <option value={list_job.status} key={index}> {list_job.status} </option>
                  }
                })}
              </select>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">ออกเดินทาง</p></div>
            <div className="grid_7">
              <input type="date" className="cancel-default grid_3 mt-1" defaultValue={this.props.document_show.travel_by_date1} onChange={(e) => this.props.onChangeTravelByDate1(e)}></input>
              <input type="time" className="cancel-default grid_3 mt-1 float-right" defaultValue={this.props.document_show.travel_by_time1} onChange={(e) => this.props.onChangeTravelByTime1(e)}></input>
              <p className="cancel-default grid_1 float-right">เวลา</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">เดินทางถึง</p></div>
            <div className="grid_7">
              <input type="date" className="cancel-default grid_3 mt-1" defaultValue={this.props.document_show.travel_by_date2} onChange={(e) => this.props.onChangeTravelByDate2(e)}></input>
              <input type="time" className="cancel-default grid_3 mt-1 float-right" defaultValue={this.props.document_show.travel_by_time2} onChange={(e) => this.props.onChangeTravelByTime2(e)}></input>
              <p className="cancel-default grid_1 float-right">เวลา</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">วันเวลาที่แล้วเสร็จ</p></div>
            <div className="grid_7 ">
              <input type="date" className="cancel-default grid_3 mt-1" defaultValue={this.props.document_show.travel_by_date3} onChange={(e) => this.props.onChangeTravelByDate3(e)}></input>
              <input type="time" className="cancel-default grid_3 mt-1 float-right" defaultValue={this.props.document_show.travel_by_time3} onChange={(e) => this.props.onChangeTravelByTime3(e)}></input>
              <p className="cancel-default grid_1 float-right">เวลา</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">ระบบตรวจซ่อม</p></div>
            <div className="grid_7 ">
              <select className="edit-select grid_3" onChange={(e) => this.props.onChangeInspection(e)}>
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.travel_by === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return <option value={list_job.status} key={index}> {list_job.status} </option>
                  }
                })}
              </select>
              <select className="edit-select grid_3 float-right" onChange={(e) => this.props.onChangeType(e)}>
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.travel_by === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return <option value={list_job.status} key={index}> {list_job.status} </option>
                  }
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ชนิด</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">รายการที่ซ่อม</p></div>
            <div className="grid_8 ">
              <input type="text" className="cancel-default mt-1" defaultValue={this.props.document_show.list} onChange={(e) => this.props.onChangeList(e)}></input>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">ที่ตั้งอุปกรณ์ที่ทำการตรวจซ่อม</p></div>
            <div className="grid_8">
              <input type="text" className="cancel-default mt-1" onChange={(e) => this.props.onChangeLocation(e)} defaultValue={this.props.document_show.location}></input>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">ชื่ออุปกรณ์ที่บำรุงรักษา</p></div>
            <div className="grid_8">
              <input type="text" className="cancel-default mt-1" onChange={(e) => this.props.onChangeNameInspection(e)} defaultValue={this.props.document_show.name_inspection}></input>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">สาเหตุและอาการเสียโดยสรุป</p></div>
            <div className="grid_8">
              <textarea className="edit" name="Text1" cols="40" rows="2" onChange={(e) => this.props.onChangeSymptoms(e)} defaultValue={this.props.document_show.symptoms}></textarea>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">ขบวนรถที่</p></div>
            <div className="grid_8">
              <p className="cancel-default grid_1 float-right">นาที:</p>
              <input type="text" className="cancel-default mt-1 grid_3" onChange={(e) => this.props.onChangeProcession(e)} defaultValue={this.props.document_show.procession}></input>
              <input type="text" className="cancel-default mt-1 grid_2 float-right" onChange={(e) => this.props.onChangeTime(e)} defaultValue={this.props.document_show.time}></input>
              <p className="cancel-default grid_2 float-right">เสียเวลาเพราะเหตุนี้</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">สรุปการแก้ไขและการซ่อมแซม</p></div>
            <div className="grid_8 ">
              <textarea className="edit" name="Text1" cols="40" rows="2" onChange={(e) => this.props.onChangeConclude(e)} defaultValue={this.props.document_show.conclude}></textarea>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">ยังไม่ได้จัดการแก้ไขเพราะ</p></div>
            <div className="grid_7 ">
              <select className="edit-select" onChange={(e) => this.props.onChangeEdit(e)} >
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.travel_by === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return <option value={list_job.status} key={index}> {list_job.status} </option>
                  }
                })}
              </select>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">สรุปการแก้ไขและการซ่อมแซม</p></div>
            <div className="grid_8 ">
              <textarea className="edit" name="Text1" cols="40" rows="2" onChange={(e) => this.props.onChangeNote(e)} defaultValue={this.props.document_show.note}></textarea>
            </div>
          </div>
        </>
      )
    }
    if (mode === "add") {
      return (
        <>
          <h3 className="head-title-bottom mt-2">ข้อมูลเกี่ยวกับอาการขัดข้อง</h3>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">เดินทางโดย</p></div>
            <div className="grid_7">
              <select className="edit-select" onChange={(e) => this.props.onChangeTravelByAdd(e)} >
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.travel_by === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return <option value={list_job.status} key={index}> {list_job.status} </option>
                  }
                })}
              </select>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">ออกเดินทาง</p></div>
            <div className="grid_7">
              <input type="date" className="cancel-default grid_3 mt-1" defaultValue={this.props.document_show_mode_add.travel_by_date1} onChange={(e) => this.props.onChangeTravelByDate1Add(e)}></input>
              <input type="time" className="cancel-default grid_3 mt-1 float-right" defaultValue={this.props.document_show_mode_add.travel_by_time1} onChange={(e) => this.props.onChangeTravelByTime1Add(e)}></input>
              <p className="cancel-default grid_1 float-right">เวลา</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">เดินทางถึง</p></div>
            <div className="grid_7">
              <input type="date" className="cancel-default grid_3 mt-1" defaultValue={this.props.document_show_mode_add.travel_by_date2} onChange={(e) => this.props.onChangeTravelByDate2Add(e)}></input>
              <input type="time" className="cancel-default grid_3 mt-1 float-right" defaultValue={this.props.document_show_mode_add.travel_by_time2} onChange={(e) => this.props.onChangeTravelByTime2Add(e)}></input>
              <p className="cancel-default grid_1 float-right">เวลา</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">วันเวลาที่แล้วเสร็จ</p></div>
            <div className="grid_7 ">
              <input type="date" className="cancel-default grid_3 mt-1" defaultValue={this.props.document_show_mode_add.travel_by_date3} onChange={(e) => this.props.onChangeTravelByDate3Add(e)}></input>
              <input type="time" className="cancel-default grid_3 mt-1 float-right" defaultValue={this.props.document_show_mode_add.travel_by_time3} onChange={(e) => this.props.onChangeTravelByTime3Add(e)}></input>
              <p className="cancel-default grid_1 float-right">เวลา</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">ระบบตรวจซ่อม</p></div>
            <div className="grid_7 ">
              <select className="edit-select grid_3" onChange={(e) => this.props.onChangeInspectionAdd(e)}>
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.travel_by === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return <option value={list_job.status} key={index}> {list_job.status} </option>
                  }
                })}
              </select>
              <select className="edit-select grid_3 float-right" onChange={(e) => this.props.onChangeTypeAdd(e)}>
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.travel_by === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return <option value={list_job.status} key={index}> {list_job.status} </option>
                  }
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ชนิด</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">รายการที่ซ่อม</p></div>
            <div className="grid_8 ">
              <input type="text" className="cancel-default mt-1" defaultValue={this.props.document_show_mode_add.list} onChange={(e) => this.props.onChangeListAdd(e)}></input>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">ที่ตั้งอุปกรณ์ที่ทำการตรวจซ่อม</p></div>
            <div className="grid_8">
              <input type="text" className="cancel-default mt-1" onChange={(e) => this.props.onChangeLocationAdd(e)} defaultValue={this.props.document_show_mode_add.location}></input>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">ชื่ออุปกรณ์ที่บำรุงรักษา</p></div>
            <div className="grid_8">
              <input type="text" className="cancel-default mt-1" onChange={(e) => this.props.onChangeNameInspectionAdd(e)} defaultValue={this.props.document_show_mode_add.name_inspection}></input>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">สาเหตุและอาการเสียโดยสรุป</p></div>
            <div className="grid_8">
              <textarea className="edit" name="Text1" cols="40" rows="2" onChange={(e) => this.props.onChangeSymptomsAdd(e)} defaultValue={this.props.document_show_mode_add.symptoms}></textarea>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">ขบวนรถที่</p></div>
            <div className="grid_8">
              <p className="cancel-default grid_1 float-right">นาที:</p>
              <input type="text" className="cancel-default mt-1 grid_3" onChange={(e) => this.props.onChangeProcessionAdd(e)} defaultValue={this.props.document_show_mode_add.procession}></input>
              <input type="text" className="cancel-default mt-1 grid_2 float-right" onChange={(e) => this.props.onChangeTimeAdd(e)} defaultValue={this.props.document_show_mode_add.time}></input>
              <p className="cancel-default grid_2 float-right">เสียเวลาเพราะเหตุนี้</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">สรุปการแก้ไขและการซ่อมแซม</p></div>
            <div className="grid_8 ">
              <textarea className="edit" name="Text1" cols="40" rows="2" onChange={(e) => this.props.onChangeConcludeAdd(e)} defaultValue={this.props.document_show_mode_add.conclude}></textarea>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">ยังไม่ได้จัดการแก้ไขเพราะ</p></div>
            <div className="grid_7 ">
              <select className="edit-select" onChange={(e) => this.props.onChangeEditAdd(e)} >
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.travel_by === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return <option value={list_job.status} key={index}> {list_job.status} </option>
                  }
                })}
              </select>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_3"><p className="cancel-default">สรุปการแก้ไขและการซ่อมแซม</p></div>
            <div className="grid_8 ">
              <textarea className="edit" name="Text1" cols="40" rows="2" onChange={(e) => this.props.onChangeNoteAdd(e)} defaultValue={this.props.document_show_mode_add.note}></textarea>
            </div>
          </div>

        </>
      )
    }

  }

  checkActionMode2 = (mode) => {
    const current = this;
    if (mode === "search") {
      return (
        <>
          <h3 className="head-title-bottom mt-2">ผู้ปฎิบัติงาน</h3>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ผู้ควบคุมตรวจสอบชื่อ</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_4 mt-1" disabled="disabled" defaultValue={this.props.document_show.name1}></input>
              <select className="edit-select grid_3 float-right" disabled="disabled">
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.job1 === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ดำเนินการแก้ไขชื่อ</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_4 mt-1" disabled="disabled" defaultValue={this.props.document_show.name2}></input>
              <select className="edit-select grid_3 float-right" disabled="disabled" >
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.job2 === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
            <div className="grid_8 pull_0" >
              <input type="text" className="cancel-default grid_4 mt-1" disabled="disabled" defaultValue={this.props.document_show.name3}></input>
              <select className="edit-select grid_3 float-right" disabled="disabled">
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.job3 === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_4 mt-1" disabled="disabled" defaultValue={this.props.document_show.name4}></input>
              <select className="edit-select grid_3 float-right" disabled="disabled">
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.job4 === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_4 mt-1" disabled="disabled" defaultValue={this.props.document_show.name5}></input>
              <select className="edit-select grid_3 float-right" disabled="disabled" >
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.job5 === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_4 mt-1" disabled="disabled" defaultValue={this.props.document_show.name6}></input>
              <select className="edit-select grid_3 float-right" disabled="disabled">
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.job6 === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>
        </>
      )
    }
    if (mode === "edit") {
      return (
        <>
          <h3 className="head-title-bottom mt-2">ผู้ปฎิบัติงาน</h3>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ผู้ควบคุมตรวจสอบชื่อ</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_4 mt-1" defaultValue={this.props.document_show.name1} onChange={(e) => this.props.onChangeName1(e)}></input>
              <select className="edit-select grid_3 float-right" onChange={(e) => this.props.onChangeJob1(e)}>
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.job1 === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return <option value={list_job.status} key={index}> {list_job.status} </option>
                  }
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ดำเนินการแก้ไขชื่อ</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_4 mt-1" defaultValue={this.props.document_show.name2} onChange={(e) => this.props.onChangeName2(e)}></input>
              <select className="edit-select grid_3 float-right" onChange={(e) => this.props.onChangeJob2(e)}>
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.job2 === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return <option value={list_job.status} key={index}> {list_job.status} </option>
                  }
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
            <div className="grid_8 pull_0" >
              <input type="text" className="cancel-default grid_4 mt-1" defaultValue={this.props.document_show.name3} onChange={(e) => this.props.onChangeName3(e)}></input>
              <select className="edit-select grid_3 float-right" onChange={(e) => this.props.onChangeJob3(e)}>
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.job3 === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return <option value={list_job.status} key={index}> {list_job.status} </option>
                  }
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_4 mt-1" defaultValue={this.props.document_show.name4} onChange={(e) => this.props.onChangeName4(e)}></input>
              <select className="edit-select grid_3 float-right" onChange={(e) => this.props.onChangeJob4(e)} >
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.job4 === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return <option value={list_job.status} key={index}> {list_job.status} </option>
                  }
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_4 mt-1" defaultValue={this.props.document_show.name5} onChange={(e) => this.props.onChangeName5(e)}></input>
              <select className="edit-select grid_3 float-right" onChange={(e) => this.props.onChangeJob5(e)}>
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.job5 === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return <option value={list_job.status} key={index}> {list_job.status} </option>
                  }
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_4 mt-1" defaultValue={this.props.document_show.name6} onChange={(e) => this.props.onChangeName6(e)}></input>
              <select className="edit-select grid_3 float-right" onChange={(e) => this.props.onChangeJob6(e)}>
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.job6 === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return <option value={list_job.status} key={index}> {list_job.status} </option>
                  }
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>
        </>
      )
    }
    if (mode === "add") {
      return (
        <>
          <h3 className="head-title-bottom mt-2">ผู้ปฎิบัติงาน</h3>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ผู้ควบคุมตรวจสอบชื่อ</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_4 mt-1" defaultValue={this.props.document_show_mode_add.name1} onChange={(e) => this.props.onChangeName1Add(e)}></input>
              <select className="edit-select grid_3 float-right" onChange={(e) => this.props.onChangeJob1Add(e)}>
                {current.props.list_job.map(function (list_job, index) {

                  return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>

                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ดำเนินการแก้ไขชื่อ</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_4 mt-1" defaultValue={this.props.document_show.name2} onChange={(e) => this.props.onChangeName2Add(e)}></input>
              <select className="edit-select grid_3 float-right" onChange={(e) => this.props.onChangeJob2Add(e)}>
                {current.props.list_job.map(function (list_job, index) {
                  return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
            <div className="grid_8 pull_0" >
              <input type="text" className="cancel-default grid_4 mt-1" defaultValue={this.props.document_show.name3} onChange={(e) => this.props.onChangeName3Add(e)}></input>
              <select className="edit-select grid_3 float-right" onChange={(e) => this.props.onChangeJob3Add(e)}>
                {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.job3 === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return <option value={list_job.status} key={index}> {list_job.status} </option>
                  }
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_4 mt-1" defaultValue={this.props.document_show.name4} onChange={(e) => this.props.onChangeName4Add(e)}></input>
              <select className="edit-select grid_3 float-right" onChange={(e) => this.props.onChangeJob4Add(e)} >
                {current.props.list_job.map(function (list_job, index) {
                  return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_4 mt-1" defaultValue={this.props.document_show.name5} onChange={(e) => this.props.onChangeName5Add(e)}></input>
              <select className="edit-select grid_3 float-right" onChange={(e) => this.props.onChangeJob5Add(e)}>
                {current.props.list_job.map(function (list_job, index) {

                  return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>

                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
            <div className="grid_8 pull_0">
              <input type="text" className="cancel-default grid_4 mt-1" defaultValue={this.props.document_show.name6} onChange={(e) => this.props.onChangeName6Add(e)}></input>
              <select className="edit-select grid_3 float-right" onChange={(e) => this.props.onChangeJob6Add(e)}>
                {current.props.list_job.map(function (list_job, index) {

                  return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>

                })}
              </select>
              <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
            </div>
          </div>
        </>
      )
    }

  }

  checkActionMode4 = (mode) => {
    const current = this;
    if (mode === "search") {
      return (
        <>
          <div className="grid_12 ">
            <Files />
          </div>
        </>
      )
    }
    if (mode === "edit") {
      return (
        <>
          <div className="grid_12 ">
            <Files />
          </div>
        </>
      )
    }
    if (mode === "add") {
      return (
        <>
          <div className="grid_12 ">
            <Files />
          </div>
        </>
      )
    }

  }




  checkActionMode3 = (mode) => {
    const current = this;
    if (mode === "search") {
      return (
        <>
          <h4 className="head-title-bottom mt-2">ข้อมูลรายการค่าเสียหาย</h4>

          <table className="table-many-column">
            <thead>
              <tr>
                <th className="font text-center" style={{ minWidth: "50px" }}>#</th>
                <th className="font text-center" style={{ minWidth: "300px" }}>รายการ</th>
                <th className="font text-center" style={{ minWidth: "80px" }}>จำนวน</th>
                <th className="font text-center" style={{ minWidth: "80px" }}>หน่วย</th>
                <th className="font text-center" style={{ minWidth: "80px" }}>จำนวนเงิน</th>
                <th className="font text-center" style={{ minWidth: "80px" }}>เลขที่อุปกรณ์</th>
                <th className="font text-center" style={{ minWidth: "400px" }}>หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>
              {this.props.list_show.map(function (list_show, row) {
                return (
                  <tr key={row} id={row}>
                    <td className="edit-padding text-center" style={{ minWidth: "50px" }}>{list_show.id}</td>
                    <td className="edit-padding text-center" style={{ minWidth: "200px" }}>{list_show.no_part}</td>
                    <td className="edit-padding text-center" style={{ minWidth: "80px" }}>{list_show.count}</td>
                    <td className="edit-padding text-center" style={{ minWidth: "80px" }}>{list_show.unit}</td>
                    <td className="edit-padding text-center" style={{ minWidth: "80px" }}>{list_show.quility}</td>
                    <td className="edit-padding text-center" style={{ minWidth: "80px" }}>{list_show.no_tool}</td>
                    <td className="edit-padding text-center" style={{ minWidth: "300px" }}>{list_show.note}</td>
                  </tr>)
              })}
            </tbody>
          </table>
        </>
      )
    }
    if (mode === "edit") {
      return (
        <>
          <h4 className="head-title-bottom mt-2">ข้อมูลรายการค่าเสียหาย</h4>

          <table className="table-many-column">
            <thead>
              <tr>
                <th className="font text-center" style={{ minWidth: "50px" }}>#</th>
                <th className="font text-center" style={{ minWidth: "300px" }}>รายการ</th>
                <th className="font text-center" style={{ minWidth: "80px" }}>จำนวน</th>
                <th className="font text-center" style={{ minWidth: "80px" }}>หน่วย</th>
                <th className="font text-center" style={{ minWidth: "80px" }}>จำนวนเงิน</th>
                <th className="font text-center" style={{ minWidth: "80px" }}>เลขที่อุปกรณ์</th>
                <th className="font text-center" style={{ minWidth: "400px" }}>หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>
              {this.props.list_show.map(function (list_show, row) {
                return (
                  <tr key={row} id={row}>
                    <td className="edit-padding text-center" style={{ minWidth: "50px" }}>{list_show.id}</td>
                    <td className="edit-padding text-center" style={{ minWidth: "200px" }}>
                      <div className="p-search-box cancel-margin" style={{ marginBottom: "0" }}>
                        <input type="text" className="p-search-box__input cancel-default-table" value={list_show.no_part} onChange={(e) => current.props.onChangeNoPartEachRow(e)} />
                        <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPart" aria-controls="modalNoPart" onClick={(e) => current.props.onClickNoPartEachRow(e)}></i></button>
                      </div>
                    </td>
                    <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
                      <input type="number" min="1" className="cancel-default float-right" value={list_show.count} onChange={(e) => current.props.onChangeCountEachRow(e)}></input>

                    </td>
                    <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
                      < select className="edit-select-table" onChange={(e) => current.props.onChangeUnitEachRow(e)}>
                        {current.props.list_unit.map(function (list_unit, index) {
                          if (list_show.unit === list_unit.status) {
                            return <option defaultValue={list_unit.id} key={index} selected> {list_unit.status} </option>
                          }
                          else {
                            return null
                          }
                        })}
                      </select></td>
                    <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
                      <input type="number" min="1" className="cancel-default float-right" value={list_show.quility} onChange={(e) => current.props.onChangeQuilityEachRow(e)}></input>
                    </td>
                    <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
                      <input type="number" min="1" className="cancel-default float-right" value={list_show.no_tool} onChange={(e) => current.props.onChangeNoToolEachRow(e)}></input></td>
                    <td className="edit-padding text-center" style={{ minWidth: "300px" }}>
                      <input type="text" className="cancel-default float-right" value={list_show.note} onChange={(e) => current.props.onChangeNoteEachRow(e)}></input></td>
                  </tr>)
              })}
            </tbody>
          </table>


          {/* PopUp เลขที่อะไหล่ */}
          <div className="modal" id="modalNoPart" style={{ display: "none" }}>
            <div className="gray-board">
              <p className="head-title-modal edit">ค้นหาเลขที่อะไหล่</p>
              <div className="container_12 edit-padding">
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">เลขที่อะไหล่</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_3" value={this.props.list_no_part} onChange={(e) => this.props.onChangeNoPart(e)} />
                    <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickSearchPopUpNoPart(e)}>ค้นหา</button>
                  </div>
                </div>
                <div className="grid_12">
                  <table className="table-many-column mt-3">
                    <thead>
                      <tr>
                        <th className="font" style={{ minWidth: "300px" }}>เลขที่อะไหล่</th>

                        <th className="font" style={{ minWidth: "100px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {current.props.no_part_show.map(function (no_part_show, index) {
                        return (
                          <tr key={index} id={index}>
                            <td className="edit-padding"> {no_part_show.no_part} </td>
                            <td className="edit-padding text-center">
                              <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectPopUpNoPart(e)} aria-label="Close active modal" aria-controls="modalNoPart" id="closeModalNoPart" >เลือก</button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="grid_12">
                  <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalNoPart" id="closeModalNoPart">กลับ</button>
                </div>

              </div>
            </div>
          </div>
        </>
      )
    }
    if (mode === "add") {
      return (
        <>
          <h4 className="head-title-bottom mt-2">ข้อมูลรายการค่าเสียหาย</h4>

          <table className="table-many-column">
            <thead>
              <tr>
                <th className="font text-center" style={{ minWidth: "50px" }}>#</th>
                <th className="font text-center" style={{ minWidth: "300px" }}>รายการ</th>
                <th className="font text-center" style={{ minWidth: "80px" }}>จำนวน</th>
                <th className="font text-center" style={{ minWidth: "80px" }}>หน่วย</th>
                <th className="font text-center" style={{ minWidth: "80px" }}>จำนวนเงิน</th>
                <th className="font text-center" style={{ minWidth: "80px" }}>เลขที่อุปกรณ์</th>
                <th className="font text-center" style={{ minWidth: "400px" }}>หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>
              {this.props.list_show_mode_add.map(function (list_show, row) {
                return (
                  <tr key={row} id={row}>
                    <td className="edit-padding text-center" style={{ minWidth: "50px" }}>{list_show.id}</td>
                    <td className="edit-padding text-center" style={{ minWidth: "200px" }}>
                      <div className="p-search-box cancel-margin" style={{ marginBottom: "0" }}>
                        <input type="text" className="p-search-box__input cancel-default-table" value={list_show.no_part} onChange={(e) => current.props.onChangeNoPartEachRowModeAdd(e)} />
                        <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPartModeAdd" aria-controls="modalNoPartModeAdd" onClick={(e) => current.props.onClickNoPartEachRowModeAdd(e)}></i></button>
                      </div>
                    </td>
                    <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
                      <input type="number" min="1" className="cancel-default float-right" value={list_show.count} onChange={(e) => current.props.onChangeCountEachRowAdd(e)}></input>

                    </td>
                    <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
                      < select className="edit-select-table" onChange={(e) => current.props.onChangeUnitEachRowAdd(e)}>
                        {current.props.list_unit.map(function (list_unit, index) {
                          if (list_show.unit === list_unit.status) {
                            return <option defaultValue={list_unit.id} key={index} selected> {list_unit.status} </option>
                          }
                          else {
                            return null
                          }
                        })}
                      </select></td>
                    <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
                      <input type="number" min="1" className="cancel-default float-right" value={list_show.quility} onChange={(e) => current.props.onChangeQuilityEachRowAdd(e)}></input>
                    </td>
                    <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
                      <input type="number" min="1" className="cancel-default float-right" value={list_show.no_tool} onChange={(e) => current.props.onChangeNoToolEachRowAdd(e)}></input></td>
                    <td className="edit-padding text-center" style={{ minWidth: "300px" }}>
                      <input type="text" className="cancel-default float-right" value={list_show.note} onChange={(e) => current.props.onChangeNoteEachRowAdd(e)}></input></td>
                  </tr>)
              })}
            </tbody>
          </table>


          {/* PopUp เลขที่อะไหล่ */}
          <div className="modal" id="modalNoPartModeAdd" style={{ display: "none" }}>
            <div className="gray-board">
              <p className="head-title-modal edit">ค้นหาเลขที่อะไหล่</p>
              <div className="container_12 edit-padding">

                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">เลขที่อะไหล่</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_3" value={this.props.list_no_part_mode_add} onChange={(e) => this.props.onChangeNoPartModeAdd(e)} />
                    <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickSearchPopUpNoPartModeAdd(e)}>ค้นหา</button>
                  </div>
                </div>

                <div className="grid_12">
                  <table className="table-many-column mt-3">
                    <thead>
                      <tr>
                        <th className="font" style={{ minWidth: "300px" }}>เลขที่อะไหล่</th>

                        <th className="font" style={{ minWidth: "100px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.no_part_show_mode_add.map(function (no_part_show_mode_add, index) {
                        return (
                          <tr key={index} id={index}>
                            <td className="edit-padding"> {no_part_show_mode_add.no_part} </td>

                            <td className="edit-padding text-center">
                              <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectPopUpNoPartModeAdd(e)} aria-label="Close active modal" aria-controls="modalNoPartModeAdd" id="closeModalNoPart" >เลือก</button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="grid_12">
                  <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalNoPartModeAdd" id="closeModalNoPart">กลับ</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    }

  }

  checkActionMode5 = (mode) => {
    const current = this;
    if (mode === "search") {
      return (
        <>
          <h4 className="head-title-bottom mt-2">สถานะของเอกสาร</h4>
          <table className="cancel-border">
            <thead>
              <tr>
                <th className="font-for-status" style={{ width: "50px" }}></th>
                <th className="font-for-status">ตำแหน่ง</th>
                <th className="font-for-status">หน่วยงาน</th>
                <th className="font-for-status">ชื่อผู้ลงนาม</th>
                <th className="font-for-status">วันที่ลงนาม</th>
                <th className="font-for-status">สถานะ</th>
              </tr>
            </thead>
            <tbody>


              {current.props.list_show_main.map(function (list_show, row) {
                return (
                  <tr key={row} id={row}>
                    <td className="font-for-status" style={{ width: "50px" }}>
                      <i className="fas fa-check-circle" style={{ color: "green" }}></i>
                    </td>
                    <td className="font-for-status">{list_show.no_part}</td>
                    <td className="font-for-status">{list_show.name_unit}</td>
                    <td className="font-for-status">{list_show.name}</td>
                    <td className="font-for-status">{list_show.date_time}</td>
                    <td className="font-for-status">{list_show.status}</td>
                  </tr>)
              })}
            </tbody>
          </table>
        </>
      )
    }
    if (mode === "edit") {
      return (
        <>
          <h4 className="head-title-bottom mt-2">สถานะของเอกสาร</h4>
          <table className="cancel-border">
            <thead>
              <tr>
                <th className="font-for-status" style={{ width: "50px" }}></th>
                <th className="font-for-status">ตำแหน่ง</th>
                <th className="font-for-status">หน่วยงาน</th>
                <th className="font-for-status">ชื่อผู้ลงนาม</th>
                <th className="font-for-status">วันที่ลงนาม</th>
                <th className="font-for-status">สถานะ</th>
              </tr>
            </thead>
            <tbody>


              {current.props.list_show_main.map(function (list_show, row) {
                return (
                  <tr key={row} id={row}>
                    <td className="font-for-status" style={{ width: "50px" }}>
                      <i className="fas fa-check-circle" style={{ color: "green" }}></i>
                    </td>
                    <td className="font-for-status">{list_show.no_part}</td>
                    <td className="font-for-status">{list_show.name_unit}</td>
                    <td className="font-for-status">{list_show.name}</td>
                    <td className="font-for-status">{list_show.date_time}</td>
                    <td className="font-for-status">{list_show.status}</td>
                  </tr>)
              })}
            </tbody>
          </table>
        </>
      )
    }
    if (mode === "add") {
      return (
        <>
          <h4 className="head-title-bottom mt-2">สถานะของเอกสาร</h4>
          <table className="cancel-border">
            <thead>
              <tr>
                <th className="font-for-status" style={{ width: "50px" }}></th>
                <th className="font-for-status">ตำแหน่ง</th>
                <th className="font-for-status">หน่วยงาน</th>
                <th className="font-for-status">ชื่อผู้ลงนาม</th>
                <th className="font-for-status">วันที่ลงนาม</th>
                <th className="font-for-status">สถานะ</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </>
      )
    }

  }

  checkActionMode6 = (mode) => {
    const current = this;
    if (mode === "search") {
      return (
        <>
          <h4 className="head-title-bottom mt-2">สินทรัพย์ที่ดำเนินการซ่อมแล้ว</h4>
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

              {current.props.list_show_master.map(function (list_show, row) {
                return (
                  <tr key={row} id={row}>
                    <th className="edit-padding text-center" style={{ minWidth: "30px" }}>{list_show.id}</th>
                    <td className="edit-padding" style={{ minWidth: "130px" }}>{list_show.no_part}</td>
                    <td className="edit-padding text-left" style={{ minWidth: "250px" }}>{list_show.detail}</td>
                    <td className="edit-padding text-center" style={{ minWidth: "80px" }}>{list_show.location}</td>
                    <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                      <select className="edit-select-table">
                        <option defaultValue="1">{list_show.status}</option>
                      </select>
                    </td>
                    <td className="edit-padding text-left" style={{ minWidth: "300px" }}>{list_show.note}</td>
                  </tr>)
              })}

            </tbody>
          </table>
        </>
      )
    }
    if (mode === "edit") {
      return (
        <>
          <h4 className="head-title-bottom mt-2">สินทรัพย์ที่ดำเนินการซ่อมแล้ว</h4>
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

              {current.props.list_show_master.map(function (list_show, row) {
                return (
                  <tr key={row} id={row}>
                    <th className="edit-padding text-center" style={{ minWidth: "30px" }}>{list_show.id}</th>
                    <td className="edit-padding" style={{ minWidth: "130px" }}>
                      <div className="p-search-box cancel-margin" style={{ marginBottom: "0" }}>
                        <input type="text" className="p-search-box__input cancel-default-table" value={list_show.no_part} onChange={(e) => current.props.onChangeNoPartMasterEachRow(e)} />
                        <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPartMaster" aria-controls="modalNoPartMaster" onClick={(e) => current.props.onClickNoPartMasterEachRow(e)}></i></button>
                      </div>
                    </td>
                    <td className="edit-padding text-left" style={{ minWidth: "250px" }}>{list_show.detail}</td>
                    <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
                      <input type="text" className="cancel-default float-right" value={list_show.location} onChange={(e) => current.props.onChangeLocationMasterEachRow(e)}></input></td>
                    <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                      < select className="edit-select-table" onChange={(e) => current.props.onChangeStatusMasterEachRow(e)}>
                        {current.props.list_unit.map(function (list_unit, index) {
                          if (list_show.unit === list_unit.status) {
                            return <option defaultValue={list_unit.id} key={index} selected> {list_unit.status} </option>
                          }
                          else {
                            return null
                          }
                        })}
                      </select>
                    </td>
                    <td className="edit-padding text-left" style={{ minWidth: "300px" }}>{list_show.note}</td>
                  </tr>)
              })}

            </tbody>
          </table>

          {/* PopUp เลขที่อะไหล่ */}
          <div className="modal" id="modalNoPartMaster" style={{ display: "none" }}>
            <div className="gray-board">
              <p className="head-title-modal edit">ค้นหาเลขที่อะไหล่</p>
              <div className="container_12 edit-padding">
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">เลขที่อะไหล่</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_3" value={this.props.list_no_part_master} onChange={(e) => this.props.onChangeNoPartMaster(e)} />
                    <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickSearchPopUpNoPartMaster(e)}>ค้นหา</button>
                  </div>
                </div>
                <div className="grid_12">
                  <table className="table-many-column mt-3">
                    <thead>
                      <tr>
                        <th className="font" style={{ minWidth: "300px" }}>เลขที่อะไหล่</th>

                        <th className="font" style={{ minWidth: "100px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {current.props.no_part_show_master.map(function (no_part_show, index) {
                        return (
                          <tr key={index} id={index}>
                            <td className="edit-padding"> {no_part_show.no_part} </td>
                            <td className="edit-padding text-center">
                              <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectPopUpNoPartMaster(e)} aria-label="Close active modal" aria-controls="modalNoPartMaster" id="closeModalNoPartMaster" >เลือก</button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="grid_12">
                  <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalNoPartMaster" id="closeModalNoPartMaster">กลับ</button>
                </div>

              </div>
            </div>
          </div>



        </>
      )
    }
    if (mode === "add") {
      return (
        <>

          <h4 className="head-title-bottom mt-2">สินทรัพย์ที่ดำเนินการซ่อมแล้ว</h4>
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

              {current.props.list_show_mode_add_master.map(function (list_show, row) {
                return (
                  <tr key={row} id={row}>
                    <th className="edit-padding text-center" style={{ minWidth: "30px" }}>{list_show.id}</th>
                    <td className="edit-padding" style={{ minWidth: "130px" }}>
                      <div className="p-search-box cancel-margin" style={{ marginBottom: "0" }}>
                        <input type="text" className="p-search-box__input cancel-default-table" value={list_show.no_part} onChange={(e) => current.props.onChangeNoPartMasterEachRowModeAdd(e)} />
                        <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPartMasterModeAdd" aria-controls="modalNoPartMasterModeAdd" onClick={(e) => current.props.onClickNoPartMasterEachRowModeAdd(e)}></i></button>
                      </div>
                    </td>
                    <td className="edit-padding text-left" style={{ minWidth: "250px" }}>{list_show.detail}</td>
                    <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
                      <input type="text" className="cancel-default float-right" value={list_show.location} onChange={(e) => current.props.onChangeLocationMasterEachRowAdd(e)}></input></td>
                    <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                      < select className="edit-select-table" onChange={(e) => current.props.onChangeStatusMasterEachRowAdd(e)}>
                        {current.props.list_unit.map(function (list_unit, index) {
                          if (list_show.unit === list_unit.status) {
                            return <option defaultValue={list_unit.id} key={index} selected> {list_unit.status} </option>
                          }
                          else {
                            return null
                          }
                        })}
                      </select>
                    </td>
                    <td className="edit-padding text-left" style={{ minWidth: "300px" }}>{list_show.note}</td>
                  </tr>)
              })}

            </tbody>
          </table>

          {/* PopUp เลขที่อะไหล่ */}
          <div className="modal" id="modalNoPartMasterModeAdd" style={{ display: "none" }}>
            <div className="gray-board">
              <p className="head-title-modal edit">ค้นหาเลขที่อะไหล่</p>
              <div className="container_12 edit-padding">

                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">เลขที่อะไหล่</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_3" value={this.props.list_no_part_mode_add_master} onChange={(e) => this.props.onChangeNoPartMasterModeAdd(e)} />
                    <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickSearchPopUpNoPartMasterModeAdd(e)}>ค้นหา</button>
                  </div>
                </div>

                <div className="grid_12">
                  <table className="table-many-column mt-3">
                    <thead>
                      <tr>
                        <th className="font" style={{ minWidth: "300px" }}>เลขที่อะไหล่</th>

                        <th className="font" style={{ minWidth: "100px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.no_part_show_mode_add_master.map(function (no_part_show_mode_add, index) {
                        return (
                          <tr key={index} id={index}>
                            <td className="edit-padding"> {no_part_show_mode_add.no_part} </td>

                            <td className="edit-padding text-center">
                              <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectPopUpNoPartMasterModeAdd(e)} aria-label="Close active modal" aria-controls="modalNoPartMasterModeAdd" id="closeModalNoPartMaster" >เลือก</button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="grid_12">
                  <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalNoPartMasterModeAdd" id="closeModalNoPartMaster">กลับ</button>
                </div>
              </div>
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

              <div id="อาการเสีย" className="tabcontent">
                {/* Input in TopBar */}
                {this.checkActionMode(this.props.actionMode)}
              </div>

              <div id="ผู้ที่เกี่ยวข้อง" className="tabcontent">
                {/* Input in TopBar */}
                {this.checkActionMode2(this.props.actionMode)}
              </div>

              <div id="รายการค่าเสียหาย" className="tabcontent">
                {/* Input in TopBar */}
                {this.checkActionMode3(this.props.actionMode)}
              </div>

              <div id="แนบไฟล์" className="tabcontent">
                {/* Input in TopBar */}
                {this.checkActionMode4(this.props.actionMode)}
              </div>

              <div id="สถานะเอกสาร" className="tabcontent">
                {/* Input in TopBar */}
                {this.checkActionMode5(this.props.actionMode)}
              </div>

              <div id="สินทรัพย์ที่ดำเนินซ่อมบำรุง" className="tabcontent">
                {/* Input in TopBar */}
                {this.checkActionMode6(this.props.actionMode)}
              </div>

            </div>
          </div>
        </div>
      </form>
    )
  };
}

const mapStateToProps = (state) => ({
  actionMode: state.action,
  document_show: state.document_show,
  list_show: state.list_show,
  list_show_main: state.list_show_main,
  list_show_master: state.list_show_master,

  list_unit: state.list_unit,

  list_no_part: state.list_no_part,
  no_part_show: state.no_part_show,
  no_part_show_mode_add: state.no_part_show_mode_add,
  list_show_mode_add: state.list_show_mode_add,

  list_job: state.list_job,
  list_status_asset1: state.list_status_asset1,

  document_show_mode_add: state.document_show_mode_add,


  list_no_part_master: state.list_no_part_master,
  no_part_show_master: state.no_part_show_master,
  no_part_show_mode_add_master: state.no_part_show_mode_add_master,
  list_show_mode_add_master: state.list_show_mode_add_master,

})

const mapDispatchToProps = (dispatch) => ({


  onChangeName1: (e) => dispatch(onChangeName1(e)),
  onChangeName1Add: (e) => dispatch(onChangeName1Add(e)),
  onChangeJob1: (e) => dispatch(onChangeJob1(e)),
  onChangeJob1Add: (e) => dispatch(onChangeJob1Add(e)),
  onChangeName2: (e) => dispatch(onChangeName2(e)),
  onChangeName2Add: (e) => dispatch(onChangeName2Add(e)),
  onChangeJob2: (e) => dispatch(onChangeJob2(e)),
  onChangeJob2Add: (e) => dispatch(onChangeJob2Add(e)),
  onChangeName3: (e) => dispatch(onChangeName3(e)),
  onChangeName3Add: (e) => dispatch(onChangeName3Add(e)),
  onChangeJob3: (e) => dispatch(onChangeJob3(e)),
  onChangeJob3Add: (e) => dispatch(onChangeJob3Add(e)),
  onChangeName4: (e) => dispatch(onChangeName4(e)),
  onChangeName4Add: (e) => dispatch(onChangeName4Add(e)),
  onChangeJob5: (e) => dispatch(onChangeJob5(e)),
  onChangeJob5Add: (e) => dispatch(onChangeJob5Add(e)),
  onChangeName6: (e) => dispatch(onChangeName6(e)),
  onChangeName6Add: (e) => dispatch(onChangeName6Add(e)),
  onChangeJob6: (e) => dispatch(onChangeJob6(e)),
  onChangeJob6Add: (e) => dispatch(onChangeJob6Add(e)),


  onChangeTravelBy: (e) => dispatch(onChangeTravelBy(e)),
  onChangeTravelByAdd: (e) => dispatch(onChangeTravelByAdd(e)),
  onChangeTravelByDate1: (e) => dispatch(onChangeTravelByDate1(e)),
  onChangeTravelByDate1Add: (e) => dispatch(onChangeTravelByDate1Add(e)),
  onChangeTravelByTime1: (e) => dispatch(onChangeTravelByTime1(e)),
  onChangeTravelByTime1Add: (e) => dispatch(onChangeTravelByTime1Add(e)),
  onChangeTravelByDate2: (e) => dispatch(onChangeTravelByDate2(e)),
  onChangeTravelByDate2Add: (e) => dispatch(onChangeTravelByDate2Add(e)),
  onChangeTravelByTime2: (e) => dispatch(onChangeTravelByTime2(e)),
  onChangeTravelByTime2Add: (e) => dispatch(onChangeTravelByTime2Add(e)),
  onChangeTravelByDate3: (e) => dispatch(onChangeTravelByDate3(e)),
  onChangeTravelByDate3Add: (e) => dispatch(onChangeTravelByDate3Add(e)),
  onChangeTravelByTime3: (e) => dispatch(onChangeTravelByTime3(e)),
  onChangeTravelByTime3Add: (e) => dispatch(onChangeTravelByTime3Add(e)),
  onChangeInspection: (e) => dispatch(onChangeInspection(e)),
  onChangeInspectionAdd: (e) => dispatch(onChangeInspectionAdd(e)),
  onChangeType: (e) => dispatch(onChangeType(e)),
  onChangeTypeAdd: (e) => dispatch(onChangeTypeAdd(e)),
  onChangeList: (e) => dispatch(onChangeList(e)),
  onChangeListAdd: (e) => dispatch(onChangeListAdd(e)),
  onChangeLocation: (e) => dispatch(onChangeLocation(e)),
  onChangeLocationAdd: (e) => dispatch(onChangeLocationAdd(e)),
  onChangeNameInspection: (e) => dispatch(onChangeNameInspection(e)),
  onChangeNameInspectionAdd: (e) => dispatch(onChangeNameInspectionAdd(e)),
  onChangeSymptoms: (e) => dispatch(onChangeSymptoms(e)),
  onChangeSymptomsAdd: (e) => dispatch(onChangeSymptomsAdd(e)),
  onChangeProcession: (e) => dispatch(onChangeProcession(e)),
  onChangeProcessionAdd: (e) => dispatch(onChangeProcessionAdd(e)),
  onChangeTime: (e) => dispatch(onChangeTime(e)),
  onChangeTimeAdd: (e) => dispatch(onChangeTimeAdd(e)),
  onChangeConclude: (e) => dispatch(onChangeConclude(e)),
  onChangeConcludeAdd: (e) => dispatch(onChangeConcludeAdd(e)),
  onChangeEdit: (e) => dispatch(onChangeEdit(e)),
  onChangeEditAdd: (e) => dispatch(onChangeEditAdd(e)),
  onChangeDetail: (e) => dispatch(onChangeDetail(e)),
  onChangeDetailAdd: (e) => dispatch(onChangeDetailAdd(e)),
  onChangeNote: (e) => dispatch(onChangeNote(e)),
  onChangeNoteAdd: (e) => dispatch(onChangeNoteAdd(e)),




  onChangeNoPart: (e) => dispatch(onChangeNoPart(e)),
  onChangeNoPartEachRow: (e) => dispatch(onChangeNoPartEachRow(e)),
  onClickNoPartEachRow: (e) => dispatch(onClickNoPartEachRow(e)),
  onClickSearchPopUpNoPart: (e) => dispatch(onClickSearchPopUpNoPart(e)),
  onClickSelectPopUpNoPart: (e) => dispatch(onClickSelectPopUpNoPart(e)),

  onChangeQuilityEachRow: (e) => dispatch(onChangeQuilityEachRow(e)),
  onChangeNoteEachRow: (e) => dispatch(onChangeNoteEachRow(e)),
  onChangeUnitEachRow: (e) => dispatch(onChangeUnitEachRow(e)),
  onChangeCountEachRow: (e) => dispatch(onChangeCountEachRow(e)),
  onChangeNoToolEachRow: (e) => dispatch(onChangeNoToolEachRow(e)),

  onChangeCountEachRowAdd: (e) => dispatch(onChangeCountEachRowAdd(e)),
  onChangeNoToolEachRowAdd: (e) => dispatch(onChangeNoToolEachRowAdd(e)),
  onChangeQuilityEachRowAdd: (e) => dispatch(onChangeQuilityEachRowAdd(e)),
  onChangeNoteEachRowAdd: (e) => dispatch(onChangeNoteEachRowAdd(e)),
  onChangeUnitEachRowAdd: (e) => dispatch(onChangeUnitEachRowAdd(e)),


  onChangeNoPartEachRowModeAdd: (e) => dispatch(onChangeNoPartEachRowModeAdd(e)),
  onClickNoPartEachRowModeAdd: (e) => dispatch(onClickNoPartEachRowModeAdd(e)),
  onClickSearchPopUpNoPartModeAdd: (e) => dispatch(onClickSearchPopUpNoPartModeAdd(e)),
  onClickSelectPopUpNoPartModeAdd: (e) => dispatch(onClickSelectPopUpNoPartModeAdd(e)),
  onChangeNoPartModeAdd: (e) => dispatch(onChangeNoPartModeAdd(e)),




  onChangeNoPartMaster: (e) => dispatch(onChangeNoPartMaster(e)),
  onChangeNoPartMasterEachRow: (e) => dispatch(onChangeNoPartMasterEachRow(e)),
  onClickNoPartMasterEachRow: (e) => dispatch(onClickNoPartMasterEachRow(e)),
  onClickSearchPopUpNoPartMaster: (e) => dispatch(onClickSearchPopUpNoPartMaster(e)),
  onClickSelectPopUpNoPartMaster: (e) => dispatch(onClickSelectPopUpNoPartMaster(e)),


  onChangeNoPartMasterEachRowModeAdd: (e) => dispatch(onChangeNoPartMasterEachRowModeAdd(e)),
  onClickNoPartMasterEachRowModeAdd: (e) => dispatch(onClickNoPartMasterEachRowModeAdd(e)),
  onClickSearchPopUpNoPartMasterModeAdd: (e) => dispatch(onClickSearchPopUpNoPartMasterModeAdd(e)),
  onClickSelectPopUpNoPartMasterModeAdd: (e) => dispatch(onClickSelectPopUpNoPartMasterModeAdd(e)),
  onChangeNoPartMasterModeAdd: (e) => dispatch(onChangeNoPartMasterModeAdd(e)),

  onChangeLocationMasterEachRow: (e) => dispatch(onChangeLocationMasterEachRow(e)),
  onChangeLocationMasterEachRowAdd: (e) => dispatch(onChangeLocationMasterEachRowAdd(e)),
  onChangeStatusMasterEachRow: (e) => dispatch(onChangeStatusMasterEachRow(e)),
  onChangeStatusMasterEachRowAdd: (e) => dispatch(onChangeStatusMasterEachRowAdd(e)),

})





export const onClickSearchPopUpNoPartMaster = (e) => {
  return {
    type: "ON CLICK SEARCH POPUP NO PART MASTER",
  }
}
export const onChangeNoPartMaster = (e) => {
  return {
    type: "ON CHANGE NO PART MASTER",
    value: e.target.value,
  }
}
export const onClickSelectPopUpNoPartMaster = (e) => {

  return {
    type: "ON CLICK SELECT POPUP NO PART MASTER",
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeNoPartMasterEachRow = (e) => {

  return {
    type: "ON CHANGE NO PART MASTER EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.parentNode.id
  }
}
export const onClickNoPartMasterEachRow = (e) => {

  return {
    type: "ON CLICK NO PART MASTER EACH ROW",
    rowIndex: e.target.parentNode.parentNode.parentNode.parentNode.id
  }
}

export const onChangeNoPartMasterEachRowModeAdd = (e) => {

  return {
    type: "ON CHANGE NO PART MASTER EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.parentNode.id
  }
}
export const onClickNoPartMasterEachRowModeAdd = (e) => {
  // console.log(e.target.parentNode.parentNode.parentNode.parentNode)
  console.log(e.target.parentNode.parentNode.parentNode.parentNode.id)
  return {
    type: "ON CLICK NO PART MASTER EACH ROW MODE ADD",
    rowIndex: e.target.parentNode.parentNode.parentNode.parentNode.id
  }
}
export const onClickSearchPopUpNoPartMasterModeAdd = (e) => {
  return {
    type: "ON CLICK SEARCH POPUP NO PART MASTER ADD MODE",
  }
}
export const onChangeNoPartMasterModeAdd = (e) => {
  return {
    type: "ON CHANGE NO PART MASTER MODE ADD",
    value: e.target.value,
  }
}
export const onClickSelectPopUpNoPartMasterModeAdd = (e) => {
  console.log(e.target.parentNode.parentNode.id)
  return {
    type: "ON CLICK SELECT POPUP NO PART MASTER MODE ADD",
    rowIndex: e.target.parentNode.parentNode.id
  }
}


export const onChangeLocationMasterEachRow = (e) => {
  return {
    type: "ON CHANGE LOCATION MASTER EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangeLocationMasterEachRowAdd = (e) => {

  return {
    type: "ON CHANGE LOCATION MASTER EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangeStatusMasterEachRow = (e) => {
  return {
    type: "ON CHANGE STATUS MASTER EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangeStatusMasterEachRowAdd = (e) => {

  return {
    type: "ON CHANGE STATUS MASTER EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}














export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);

export const onClickSearchPopUpNoPart = (e) => {
  return {
    type: "ON CLICK SEARCH POPUP NO PART",
  }
}
export const onChangeNoPart = (e) => {
  return {
    type: "ON CHANGE NO PART",
    value: e.target.value,
  }
}
export const onClickSelectPopUpNoPart = (e) => {

  return {
    type: "ON CLICK SELECT POPUP NO PART",
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeNoPartEachRow = (e) => {

  return {
    type: "ON CHANGE NO PART EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.parentNode.id
  }
}
export const onClickNoPartEachRow = (e) => {

  return {
    type: "ON CLICK NO PART EACH ROW",
    rowIndex: e.target.parentNode.parentNode.parentNode.parentNode.id
  }
}
export const onChangeQuilityEachRow = (e) => {

  return {
    type: "ON CHANGE QUILITY EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeNoteEachRow = (e) => {
  return {
    type: "ON CHANGE NOTE EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeUnitEachRow = (e) => {
  return {
    type: "ON CHANGE UNIT EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangeCountEachRow = (e) => {
  return {
    type: "ON CHANGE COUNT EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangeNoToolEachRow = (e) => {
  return {
    type: "ON CHANGE NO TOOL EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangeNoToolEachRowAdd = (e) => {

  return {
    type: "ON CHANGE NO TOOL EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangeCountEachRowAdd = (e) => {

  return {
    type: "ON CHANGE COUNT EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangeQuilityEachRowAdd = (e) => {

  return {
    type: "ON CHANGE QUILITY EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeNoteEachRowAdd = (e) => {
  return {
    type: "ON CHANGE NOTE EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeUnitEachRowAdd = (e) => {
  return {
    type: "ON CHANGE UNIT EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}




export const onChangeNoPartEachRowModeAdd = (e) => {

  return {
    type: "ON CHANGE NO PART EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.parentNode.id
  }
}
export const onClickNoPartEachRowModeAdd = (e) => {
  // console.log(e.target.parentNode.parentNode.parentNode.parentNode)
  console.log(e.target.parentNode.parentNode.parentNode.parentNode.id)
  return {
    type: "ON CLICK NO PART EACH ROW MODE ADD",
    rowIndex: e.target.parentNode.parentNode.parentNode.parentNode.id
  }
}
export const onClickSearchPopUpNoPartModeAdd = (e) => {
  return {
    type: "ON CLICK SEARCH POPUP NO PART ADD MODE",
  }
}
export const onChangeNoPartModeAdd = (e) => {
  return {
    type: "ON CHANGE NO PART MODE ADD",
    value: e.target.value,
  }
}
export const onClickSelectPopUpNoPartModeAdd = (e) => {
  console.log(e.target.parentNode.parentNode.id)
  return {
    type: "ON CLICK SELECT POPUP NO PART MODE ADD",
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangeName1 = (e) => {
  return {
    type: "CHANGE NAME1",
    value: e.target.value
  }
}
export const onChangeName1Add = (e) => {
  return {
    type: "CHANGE NAME1 ADD",
    value: e.target.value
  }
}

export const onChangeName2 = (e) => {
  return {
    type: "CHANGE NAME2",
    value: e.target.value
  }
}
export const onChangeName2Add = (e) => {
  return {
    type: "CHANGE NAME2 ADD",
    value: e.target.value
  }
}

export const onChangeName3 = (e) => {
  return {
    type: "CHANGE NAME3",
    value: e.target.value
  }
}
export const onChangeName3Add = (e) => {
  return {
    type: "CHANGE NAME3 ADD",
    value: e.target.value
  }
}

export const onChangeName4 = (e) => {
  return {
    type: "CHANGE NAME4",
    value: e.target.value
  }
}
export const onChangeName4Add = (e) => {
  return {
    type: "CHANGE NAME4 ADD",
    value: e.target.value
  }
}

export const onChangeName5 = (e) => {
  return {
    type: "CHANGE NAME5",
    value: e.target.value
  }
}
export const onChangeName5Add = (e) => {
  return {
    type: "CHANGE NAME5 ADD",
    value: e.target.value
  }
}

export const onChangeName6 = (e) => {
  return {
    type: "CHANGE NAME6",
    value: e.target.value
  }
}
export const onChangeName6Add = (e) => {
  return {
    type: "CHANGE NAME6 ADD",
    value: e.target.value
  }
}


export const onChangeJob1 = (e) => {
  return {
    type: "CHANGE JOB1",
    value: e.target.value
  }
}
export const onChangeJob1Add = (e) => {
  return {
    type: "CHANGE JOB1 ADD",
    value: e.target.value
  }
}

export const onChangeJob2 = (e) => {
  return {
    type: "CHANGE JOB2",
    value: e.target.value
  }
}
export const onChangeJob2Add = (e) => {
  return {
    type: "CHANGE JOB2 ADD",
    value: e.target.value
  }
}

export const onChangeJob3 = (e) => {
  return {
    type: "CHANGE JOB3",
    value: e.target.value
  }
}
export const onChangeJob3Add = (e) => {
  return {
    type: "CHANGE JOB3 ADD",
    value: e.target.value
  }
}

export const onChangeJob4 = (e) => {
  return {
    type: "CHANGE JOB4",
    value: e.target.value
  }
}
export const onChangeJob4Add = (e) => {
  return {
    type: "CHANGE JOB4 ADD",
    value: e.target.value
  }
}

export const onChangeJob5 = (e) => {
  return {
    type: "CHANGE JOB5",
    value: e.target.value
  }
}
export const onChangeJob5Add = (e) => {
  return {
    type: "CHANGE JOB5 ADD",
    value: e.target.value
  }
}

export const onChangeJob6 = (e) => {
  return {
    type: "CHANGE JOB6",
    value: e.target.value
  }
}
export const onChangeJob6Add = (e) => {
  return {
    type: "CHANGE JOB6 ADD",
    value: e.target.value
  }
}

export const onChangeTravelBy = (e) => {
  return {
    type: "CHANGE TRAVEL BY",
    value: e.target.value
  }
}
export const onChangeTravelByAdd = (e) => {
  return {
    type: "CHANGE TRAVEL BY ADD",
    value: e.target.value
  }
}

export const onChangeTravelByDate1 = (e) => {
  return {
    type: "CHANGE TRAVEL BY DATE1",
    value: e.target.value
  }
}
export const onChangeTravelByDate1Add = (e) => {
  return {
    type: "CHANGE TRAVEL BY DATE1 ADD",
    value: e.target.value
  }
}

export const onChangeTravelByTime1 = (e) => {
  return {
    type: "CHANGE TRAVEL BY TIME1",
    value: e.target.value
  }
}
export const onChangeTravelByTime1Add = (e) => {
  return {
    type: "CHANGE TRAVEL BY TIME1 ADD",
    value: e.target.value
  }
}


export const onChangeTravelByDate2 = (e) => {
  return {
    type: "CHANGE TRAVEL BY DATE2",
    value: e.target.value
  }
}
export const onChangeTravelByDate2Add = (e) => {
  return {
    type: "CHANGE TRAVEL BY DATE2 ADD",
    value: e.target.value
  }
}

export const onChangeTravelByTime2 = (e) => {
  return {
    type: "CHANGE TRAVEL BY TIME2",
    value: e.target.value
  }
}
export const onChangeTravelByTime2Add = (e) => {
  return {
    type: "CHANGE TRAVEL BY TIME2 ADD",
    value: e.target.value
  }
}


export const onChangeTravelByDate3 = (e) => {
  return {
    type: "CHANGE TRAVEL BY DATE3",
    value: e.target.value
  }
}
export const onChangeTravelByDate3Add = (e) => {
  return {
    type: "CHANGE TRAVEL BY DATE3 ADD",
    value: e.target.value
  }
}

export const onChangeTravelByTime3 = (e) => {
  return {
    type: "CHANGE TRAVEL BY TIME3",
    value: e.target.value
  }
}
export const onChangeTravelByTime3Add = (e) => {
  return {
    type: "CHANGE TRAVEL BY TIME3 ADD",
    value: e.target.value
  }
}



export const onChangeInspection = (e) => {
  return {
    type: "CHANGE INSPECTION",
    value: e.target.value
  }
}
export const onChangeInspectionAdd = (e) => {
  return {
    type: "CHANGE INSPECTION ADD",
    value: e.target.value
  }
}


export const onChangeType = (e) => {
  return {
    type: "CHANGE TYPE",
    value: e.target.value
  }
}
export const onChangeTypeAdd = (e) => {
  return {
    type: "CHANGE TYPE ADD",
    value: e.target.value
  }
}

export const onChangeList = (e) => {
  return {
    type: "CHANGE LIST",
    value: e.target.value
  }
}
export const onChangeListAdd = (e) => {
  return {
    type: "CHANGE LIST ADD",
    value: e.target.value
  }
}


export const onChangeLocation = (e) => {
  return {
    type: "CHANGE LOCATION",
    value: e.target.value
  }
}
export const onChangeLocationAdd = (e) => {
  return {
    type: "CHANGE LOCATION ADD",
    value: e.target.value
  }
}


export const onChangeNameInspection = (e) => {
  return {
    type: "CHANGE NAME INSPECTION",
    value: e.target.value
  }
}
export const onChangeNameInspectionAdd = (e) => {
  return {
    type: "CHANGE NAME INSPECTION ADD",
    value: e.target.value
  }
}


export const onChangeSymptoms = (e) => {
  return {
    type: "CHANGE SYMPTOMS",
    value: e.target.value
  }
}
export const onChangeSymptomsAdd = (e) => {
  return {
    type: "CHANGE SYMPTOMS ADD",
    value: e.target.value
  }
}


export const onChangeProcession = (e) => {
  return {
    type: "CHANGE PROCESSION",
    value: e.target.value
  }
}
export const onChangeProcessionAdd = (e) => {
  return {
    type: "CHANGE PROCESSION ADD",
    value: e.target.value
  }
}


export const onChangeTime = (e) => {
  return {
    type: "CHANGE TIME",
    value: e.target.value
  }
}
export const onChangeTimeAdd = (e) => {
  return {
    type: "CHANGE TIME ADD",
    value: e.target.value
  }
}



export const onChangeConclude = (e) => {
  return {
    type: "CHANGE CONCLUDE",
    value: e.target.value
  }
}
export const onChangeConcludeAdd = (e) => {
  return {
    type: "CHANGE CONCLUDE ADD",
    value: e.target.value
  }
}


export const onChangeEdit = (e) => {
  return {
    type: "CHANGE EDIT",
    value: e.target.value
  }
}
export const onChangeEditAdd = (e) => {
  return {
    type: "CHANGE EDIT ADD",
    value: e.target.value
  }
}

export const onChangeDetail = (e) => {
  return {
    type: "CHANGE DETAIL",
    value: e.target.value
  }
}
export const onChangeDetailAdd = (e) => {
  return {
    type: "CHANGE DETAIL ADD",
    value: e.target.value
  }
}

export const onChangeNote = (e) => {
  return {
    type: "CHANGE NOTE",
    value: e.target.value
  }
}
export const onChangeNoteAdd = (e) => {
  return {
    type: "CHANGE NOTE ADD",
    value: e.target.value
  }
}