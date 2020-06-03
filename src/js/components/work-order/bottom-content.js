import React from 'react';
import { connect } from 'react-redux';
import Document from '../../../images/document.svg'
import Files from '../common/files'
import axios from "axios";

import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';
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
                <input type="text" className="cancel-default mt-1" value={this.props.document_show.information_name} disabled="disabled"></input>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">วันเวลาที่เกิดเหตุ</p></div>
              <div className="grid_7 ">
                <input type="date" className="cancel-default grid_3 mt-1" value={this.props.document_show.date_start} disabled="disabled"></input>
                <input type="time" className="cancel-default grid_3 mt-1 float-right" value={this.props.document_show.time_start} disabled="disabled"></input>
                <p className="cancel-default grid_1 float-right">เวลา</p>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">วันเวลาที่รับแจ้ง</p></div>
              <div className="grid_7 ">
                <input type="date" className="cancel-default grid_3 mt-1" value={this.props.document_show.date_end} disabled="disabled"></input>
                <input type="time" className="cancel-default grid_3 mt-1 float-right" value={this.props.document_show.time_end} disabled="disabled"></input>
                <p className="cancel-default grid_1 float-right">เวลา</p>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">อาการเสียโดยสรุป</p></div>
              <div className="grid_7 ">
                <input type="text" className="cancel-default mt-1" value={this.props.document_show.conclusions} disabled="disabled"></input>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">ได้รับเหตุจาก</p></div>
              <div className="grid_7">
                <input type="text" className="cancel-default mt-1" value={this.props.document_show.reason} disabled="disabled"></input>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">ได้รับข้อมูลผ่านช่องทาง</p></div>
              <div className="grid_7 ">
                {/* {current.props.type.map(function (type, index) {
                  if (type.name === current.props.word_order_show.type) {
                    return <div><input className="d-inline" type="radio" name="RadioOptions" id={type.name} value={type.name} checked /><label htmlFor={type.name} className="cancel-default d-inline">{type.name}</label></div>
                  }
                  else {
                    return <div><input className="d-inline ml-3" type="radio" name="RadioOptions" id={type.name} value={type.name} /><label htmlFor={type.name} className="cancel-default d-inline ml-3">{type.name} </label></div>
                  }
                })} */}

              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">รายงานการตรวจซ่อมอุปกรณ์แขวง</p></div>
              <div className="grid_7 ">
                <input type="text" className="cancel-default mt-1" value={this.props.document_show.report} disabled="disabled"></input>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default" style={{ paddingRight: "50px" }}>ที่ตั้งอุปกรณ์ที่ทำการตรวจซ่อม (สถานที่/ที่ตั้ง)</p></div>
              <div className="grid_7 ">
                <input type="text" className="cancel-default mt-1" value={this.props.document_show.equipment} disabled="disabled"></input>
              </div>
            </div>

            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">หมายเหตุ</p></div>
              <div className="grid_7">
                <textarea className="edit" name="Text1" cols="40" rows="2" value={this.props.document_show.note} disabled="disabled"></textarea>
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
                        <th className="edit-padding text-center" style={{ minWidth: "30px" }}>{index + 1}</th>
                        <td className="edit-padding" style={{ minWidth: "130px" }}>{list.internal_item_id}</td>
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
                <input type="text" className="cancel-default mt-1" value={this.props.document_show.information_name} onChange={(e) => { this.props.onChangeInformatioName(e) }} ></input>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">วันเวลาที่เกิดเหตุ</p></div>
              <div className="grid_7 ">
                <input type="date" className="cancel-default grid_3 mt-1" value={this.props.document_show.date_start} onChange={(e) => { this.props.onChangeDateStart(e) }}></input>
                <input type="time" className="cancel-default grid_3 mt-1 float-right" value={this.props.document_show.time_start} onChange={(e) => { this.props.onChangeTimeStart(e) }}></input>
                <p className="cancel-default grid_1 float-right">เวลา</p>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">วันเวลาที่รับแจ้ง</p></div>
              <div className="grid_7 ">
                <input type="date" className="cancel-default grid_3 mt-1" value={this.props.document_show.date_end} onChange={(e) => { this.props.onChangeDateEnd(e) }}></input>
                <input type="time" className="cancel-default grid_3 mt-1 float-right" value={this.props.document_show.time_end} onChange={(e) => { this.props.onChangeTimeEnd(e) }}></input>
                <p className="cancel-default grid_1 float-right">เวลา</p>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">อาการเสียโดยสรุป</p></div>
              <div className="grid_7 ">
                <input type="text" className="cancel-default mt-1" value={this.props.document_show.conclusions} onChange={(e) => { this.props.onChangeConclusions(e) }}></input>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">ได้รับเหตุจาก</p></div>
              <div className="grid_7">
                <input type="text" className="cancel-default mt-1" value={this.props.document_show.reason} onChange={(e) => { this.props.onChangeReason(e) }}></input>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">ได้รับข้อมูลผ่านช่องทาง</p></div>
              <div className="grid_7 ">
                {/* <input className="d-inline" type="radio" name="RadioOptions" id="Radio1" value="โทรศัพท์" onChange={(e) => { this.props.onChangeType(e) }} />
                <label htmlFor="Radio1" className="cancel-default d-inline">โทรศัพท์</label>
                <input className="d-inline ml-3" type="radio" name="RadioOptions" id="Radio2" value="จดหมาย" onChange={(e) => { this.props.onChangeType(e) }} />
                <label htmlFor="Radio2" className="cancel-default d-inline ml-3">จดหมาย</label> */}
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">รายงานการตรวจซ่อมอุปกรณ์แขวง</p></div>
              <div className="grid_7 ">
                <input type="text" className="cancel-default mt-1" value={this.props.document_show.report} onChange={(e) => { this.props.onChangeReport(e) }}></input>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default" style={{ paddingRight: "50px" }}>ที่ตั้งอุปกรณ์ที่ทำการตรวจซ่อม (สถานที่/ที่ตั้ง)</p></div>
              <div className="grid_7 ">
                <input type="text" className="cancel-default mt-1" value={this.props.document_show.equipment} onChange={(e) => { this.props.onChangeEquipment(e) }}></input>
              </div>
            </div>

            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">หมายเหตุ</p></div>
              <div className="grid_7">
                <textarea className="edit" name="Text1" cols="40" rows="2" value={this.props.document_show.note} onChange={(e) => { this.props.onChangeNote(e) }}></textarea>
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

                    if (index === 0) {
                      return (
                        <tr key={index}>
                          <th className="edit-padding text-center">{index + 1}</th>
                          <td className="edit-padding">
                            <div className="p-search-box cancel-margin" style={{ marginBottom: "0" }}>
                              <input type="text" className="p-search-box__input cancel-default-table" value={list.internal_item_id} onChange={(e) => current.props.onChangeNoPartEachRow(e)} onKeyPress={(e) => current.props.handleKeyPressModeEdit(e)} required />
                              <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPart" aria-controls="modalNoPart" onClick={(e) => current.props.onClickNoPartEachRow(e)}></i></button>
                            </div>
                          </td>

                          <td className="edit-padding text-left" style={{ minWidth: "250px" }}>{list.quility}</td>
                          <td className="edit-padding text-center" style={{ minWidth: "80px" }}>{list.location}</td>
                          <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                            <select className="edit-select-table">
                              {/* {current.props.status.map(function (status, index) {
                                if (list.status === status.name) {
                                  return <option defaultValue={status.id} key={index} selected> {status.name} </option>
                                }
                                else {
                                  return null
                                }
                              })} */}
                            </select>
                          </td>
                          <td className="edit-padding text-left" style={{ minWidth: "300px" }}>{list.note}</td>
                        </tr>)
                    }
                    else {
                      return (
                        <tr key={index}>
                          <th className="edit-padding text-center">{index + 1}</th>
                          <td className="edit-padding">
                            <div className="p-search-box cancel-margin" style={{ marginBottom: "0" }}>
                              <input type="text" className="p-search-box__input cancel-default-table" value={list.internal_item_id} onChange={(e) => current.props.onChangeNoPartEachRow(e)} onKeyPress={(e) => current.props.handleKeyPressModeEdit(e)} />
                              <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPart" aria-controls="modalNoPart" onClick={(e) => current.props.onClickNoPartEachRow(e)}></i></button>
                            </div>
                          </td>

                          <td className="edit-padding text-left" style={{ minWidth: "250px" }}>{list.quility}</td>
                          <td className="edit-padding text-center" style={{ minWidth: "80px" }}>{list.location}</td>
                          <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                            <select className="edit-select-table">
                              {/* {current.props.status.map(function (status, index) {
                                if (list.status === status.name) {
                                  return <option defaultValue={status.id} key={index} selected> {status.name} </option>
                                }
                                else {
                                  return null
                                }
                              })} */}
                            </select>
                          </td>
                          <td className="edit-padding text-left" style={{ minWidth: "300px" }}>{list.note}</td>
                        </tr>)

                    }


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



          {/* PopUp เลขที่อะไหล่ */}
          <div className="modal" id="modalNoPart" style={{ display: "none" }}>
            <div className="gray-board">
              <p className="head-title-modal edit">ค้นหาเลขที่อะไหล่</p>
              <div className="container_12 edit-padding">

                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">เลขที่อะไหล่</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_3" value={this.props.list_no_part} onChange={(e) => this.props.onChangeNoPart(e)} />
                    {/* <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickSearchPopUpNoPart(this.props.list_no_part)}>ค้นหา</button> */}
                  </div>
                </div>

                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">รายละเอียด</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_3" value={this.props.list_description_part} onChange={(e) => this.props.onChangeDescriptionPart(e)} />
                    <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickSearchPopUpNoPart(this.props.list_no_part)}>ค้นหา</button>
                  </div>
                </div>

                <div className="grid_12">
                  <table className="table-many-column mt-3">
                    <thead>
                      <tr>
                        <th className="font" style={{ minWidth: "300px" }}>เลขที่อะไหล่</th>
                        <th className="font" style={{ minWidth: "450px" }}>รายละเอียด</th>
                        <th className="font" style={{ minWidth: "150px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.no_part_show.map(function (no_part_show, index) {
                        return (
                          <tr key={index} id={index}>
                            <td className="edit-padding" style={{ minWidth: "150px" }}> {no_part_show.internal_item_id} </td>
                            <td className="edit-padding" style={{ minWidth: "300px" }}> {no_part_show.description} </td>
                            <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
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

          <div id="อาการเสีย" className="tabcontent">
            <h3 className="head-title-bottom mt-2">ข้อมูลเกี่ยวกับอาการขัดข้อง</h3>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">ชื่องาน</p></div>
              <div className="grid_7 ">
                <input type="text" className="cancel-default mt-1" value={this.props.document_show_mode_add.information_name} onChange={(e) => { this.props.onChangeInformatioNameAdd(e) }} ></input>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">วันเวลาที่เกิดเหตุ</p></div>
              <div className="grid_7 ">
                <input type="date" className="cancel-default grid_3 mt-1" value={this.props.document_show_mode_add.date_start} onChange={(e) => { this.props.onChangeDateStartAdd(e) }}></input>
                <input type="time" className="cancel-default grid_3 mt-1 float-right" value={this.props.document_show_mode_add.time_start} onChange={(e) => { this.props.onChangeTimeStartAdd(e) }}></input>
                <p className="cancel-default grid_1 float-right">เวลา</p>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">วันเวลาที่รับแจ้ง</p></div>
              <div className="grid_7 ">
                <input type="date" className="cancel-default grid_3 mt-1" value={this.props.document_show_mode_add.date_end} onChange={(e) => { this.props.onChangeDateEndAdd(e) }}></input>
                <input type="time" className="cancel-default grid_3 mt-1 float-right" value={this.props.document_show_mode_add.time_end} onChange={(e) => { this.props.onChangeTimeEndAdd(e) }}></input>
                <p className="cancel-default grid_1 float-right">เวลา</p>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">อาการเสียโดยสรุป</p></div>
              <div className="grid_7 ">
                <input type="text" className="cancel-default mt-1" value={this.props.document_show_mode_add.conclusions} onChange={(e) => { this.props.onChangeConclusionsAdd(e) }}></input>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">ได้รับเหตุจาก</p></div>
              <div className="grid_7">
                <input type="text" className="cancel-default mt-1" value={this.props.document_show_mode_add.reason} onChange={(e) => { this.props.onChangeReasonAdd(e) }}></input>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">ได้รับข้อมูลผ่านช่องทาง</p></div>
              <div className="grid_7 ">
                {/* <input className="d-inline" type="radio" name="RadioOptions" id="Radio1" value="โทรศัพท์" onChange={(e) => { this.props.onChangeTypeAdd(e) }} />
                <label htmlFor="Radio1" className="cancel-default d-inline">โทรศัพท์</label>
                <input className="d-inline ml-3" type="radio" name="RadioOptions" id="Radio2" value="จดหมาย" onChange={(e) => { this.props.onChangeTypeAdd(e) }} />
                <label htmlFor="Radio2" className="cancel-default d-inline ml-3">จดหมาย</label> */}
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">รายงานการตรวจซ่อมอุปกรณ์แขวง</p></div>
              <div className="grid_7 ">
                <input type="text" className="cancel-default mt-1" value={this.props.document_show_mode_add.report} onChange={(e) => { this.props.onChangeReportAdd(e) }}></input>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default" style={{ paddingRight: "50px" }}>ที่ตั้งอุปกรณ์ที่ทำการตรวจซ่อม (สถานที่/ที่ตั้ง)</p></div>
              <div className="grid_7 ">
                <input type="text" className="cancel-default mt-1" value={this.props.document_show_mode_add.equipment} onChange={(e) => { this.props.onChangeEquipmentAdd(e) }}></input>
              </div>
            </div>

            <div className="grid_12">
              <div className="grid_3"><p className="cancel-default">หมายเหตุ</p></div>
              <div className="grid_7">
                <textarea className="edit" name="Text1" cols="40" rows="2" value={this.props.document_show_mode_add.note} onChange={(e) => { this.props.onChangeNoteAdd(e) }}></textarea>
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


                  {current.props.list_show_mode_add.map(function (list, index) {

                    if (index === 0) {
                      return (
                        <tr key={index}>
                          <th className="edit-padding text-center">{index + 1}</th>
                          <td className="edit-padding">
                            <div className="p-search-box cancel-margin" style={{ marginBottom: "0" }}>
                              <input type="text" className="p-search-box__input cancel-default-table" value={list.internal_item_id} onChange={(e) => current.props.onChangeNoPartEachRowModeAdd(e)} onKeyPress={(e) => current.props.handleKeyPress(e)} required />
                              <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPart" aria-controls="modalNoPartModeAdd" onClick={(e) => current.props.onClickNoPartEachRowModeAdd(e)}></i></button>
                            </div>
                          </td>

                          <td className="edit-padding text-left" style={{ minWidth: "250px" }}>{list.quility}</td>
                          <td className="edit-padding text-center" style={{ minWidth: "80px" }}>{list.location}</td>
                          <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                            <select className="edit-select-table">
                              {/* {current.props.status.map(function (status, index) {
                                if (list.status === status.name) {
                                  return <option defaultValue={status.id} key={index} selected> {status.name} </option>
                                }
                                else {
                                  return null
                                }
                              })} */}
                            </select>
                          </td>
                          <td className="edit-padding text-left" style={{ minWidth: "300px" }}>{list.note}</td>
                        </tr>)
                    } else {
                      return (
                        <tr key={index}>
                          <th className="edit-padding text-center">{index + 1}</th>
                          <td className="edit-padding">
                            <div className="p-search-box cancel-margin" style={{ marginBottom: "0" }}>
                              <input type="text" className="p-search-box__input cancel-default-table" value={list.internal_item_id} onChange={(e) => current.props.onChangeNoPartEachRowModeAdd(e)} onKeyPress={(e) => current.props.handleKeyPress(e)} />
                              <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPart" aria-controls="modalNoPartModeAdd" onClick={(e) => current.props.onClickNoPartEachRowModeAdd(e)}></i></button>
                            </div>
                          </td>

                          <td className="edit-padding text-left" style={{ minWidth: "250px" }}>{list.quility}</td>
                          <td className="edit-padding text-center" style={{ minWidth: "80px" }}>{list.location}</td>
                          <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                            <select className="edit-select-table">
                              {/* {current.props.status.map(function (status, index) {
                                if (list.status === status.name) {
                                  return <option defaultValue={status.id} key={index} selected> {status.name} </option>
                                }
                                else {
                                  return null
                                }
                              })} */}
                            </select>
                          </td>
                          <td className="edit-padding text-left" style={{ minWidth: "300px" }}>{list.note}</td>
                        </tr>)
                    }

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


          {/* PopUp เลขที่อะไหล่ */}
          <div className="modal" id="modalNoPartModeAdd" style={{ display: "none" }}>
            <div className="gray-board">
              <p className="head-title-modal edit">ค้นหาเลขที่อะไหล่</p>
              <div className="container_12 edit-padding">

                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">เลขที่อะไหล่</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_3" value={this.props.list_no_part_mode_add} onChange={(e) => this.props.onChangeNoPartModeAdd(e)} />
                    {/* <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickSearchPopUpNoPartModeAdd(this.props.list_no_part_mode_add)}>ค้นหา</button> */}
                  </div>
                </div>

                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">รายละเอียด</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_3" value={this.props.list_desription_part_mode_add} onChange={(e) => this.props.onChangeDescriptionPartModeAdd(e)} />
                    <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickSearchPopUpNoPartModeAdd(this.props.list_no_part_mode_add, this.props.list_desription_part_mode_add)}>ค้นหา</button>
                  </div>
                </div>

                <div className="grid_12">
                  <table className="table-many-column mt-3">
                    <thead>
                      <tr>
                        <th className="font" style={{ minWidth: "300px" }}>เลขที่อะไหล่</th>
                        <th className="font" style={{ minWidth: "450px" }}>รายละเอียด</th>
                        <th className="font" style={{ minWidth: "150px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.no_part_show_mode_add.map(function (no_part_show_mode_add, index) {
                        return (
                          <tr key={index} id={index}>
                            <td className="edit-padding" style={{ minWidth: "150px" }}> {no_part_show_mode_add.internal_item_id} </td>
                            <td className="edit-padding" style={{ minWidth: "300px" }}> {no_part_show_mode_add.description} </td>
                            <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
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
  document_show: state.document_show,
  list_show: state.list_show,

  // Mode Edit 
  list_no_part: state.list_no_part,
  no_part_show: state.no_part_show,
  list_description_part: state.list_description_part,

  // Mode Add
  list_show_mode_add: state.list_show_mode_add,
  no_part_show_mode_add: state.no_part_show_mode_add,
  list_no_part_mode_add: state.list_no_part_mode_add,
  document_show_mode_add: state.document_show_mode_add,
  list_desription_part_mode_add: state.list_desription_part_mode_add

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

  // onChangeType: (e) => dispatch(onChangeType(e)),

  // Mode Add
  // onChangeTypeAdd: (e) => dispatch(onChangeTypeAdd(e)),
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


  // Mode Edit
  onChangeNoPart: (e) => dispatch(onChangeNoPart(e)),
  onChangeNoPartEachRow: (e) => dispatch(onChangeNoPartEachRow(e)),
  onClickNoPartEachRow: (e) => dispatch(onClickNoPartEachRow(e)),
  onClickSearchPopUpNoPart: (e) => dispatch(onClickSearchPopUpNoPart(e)),
  onClickSelectPopUpNoPart: (e) => dispatch(onClickSelectPopUpNoPart(e)),

  onChangeStatusEachRow: (e) => dispatch(onChangeStatusEachRow(e)),
  onChangeNoteEachRow: (e) => dispatch(onChangeNoteEachRow(e)),

  // Mode Add
  onChangeNoPartEachRowModeAdd: (e) => dispatch(onChangeNoPartEachRowModeAdd(e)),
  onClickNoPartEachRowModeAdd: (e) => dispatch(onClickNoPartEachRowModeAdd(e)),
  onClickSearchPopUpNoPartModeAdd: (e, i) => dispatch(onClickSearchPopUpNoPartModeAdd(e, i)),
  onChangeNoPartModeAdd: (e) => dispatch(onChangeNoPartModeAdd(e)),
  onClickSelectPopUpNoPartModeAdd: (e) => dispatch(onClickSelectPopUpNoPartModeAdd(e)),

  onChangeStatusEachRowModeAdd: (e) => dispatch(onChangeStatusEachRowModeAdd(e)),
  onChangeNoteEachRowModeAdd: (e) => dispatch(onChangeNoteEachRowModeAdd(e)),

  handleKeyPress: (e) => dispatch(handleKeyPress(e)),
  handleKeyPressModeEdit: (e) => dispatch(handleKeyPressModeEdit(e)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);


// Mode Edit


export const onChangeList = (e) => {
  return {
    type: "ON CHANGE LIST",
    value: e.target.value
  }
}
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


// // Mode Add


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


export const onChangeStatusEachRow = (e) => {
  return {
    type: "ON CHANGE STATUS EACH ROW",
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

export const onChangeStatusEachRowModeAdd = (e) => {
  return {
    type: "ON CHANGE STATUS EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}

export const onChangeNoteEachRowModeAdd = (e) => {
  return {
    type: "ON CHANGE NOTE EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}




export const onChangeNoPart = (e) => {
  return {
    type: "ON CHANGE NO PART",
    value: e.target.value,
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
  console.log(e.target.parentNode.parentNode.parentNode.parentNode)
  return {
    type: "ON CLICK NO PART EACH ROW",
    rowIndex: e.target.parentNode.parentNode.parentNode.parentNode.id
  }
}


export const onClickSearchPopUpNoPart = (item) => {
  // return {
  //   type: "ON CLICK SEARCH POPUP NO PART",
  // }

  return function (dispatch) {
    return axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/fact/items?internal_item_id=${item}`, { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
      console.log(res)
      dispatch({
        type: "ON CLICK SEARCH POPUP NO PART",
        value: res.data.results
      });
    });
  };
}
export const onClickSelectPopUpNoPart = (e) => {
  return {
    type: "ON CLICK SELECT POPUP NO PART",
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
  return {
    type: "ON CLICK NO PART EACH ROW MODE ADD",
    rowIndex: e.target.parentNode.parentNode.parentNode.parentNode.id
  }
}
export const onClickSearchPopUpNoPartModeAdd = (list_no_part_mode_add, list_desription_part_mode_add) => {
  console.log(list_no_part_mode_add)
  console.log(list_desription_part_mode_add)
  return function (dispatch) {
    return axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/fact/items?internal_item_id=${list_no_part_mode_add}&description=${list_desription_part_mode_add}`, { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
      console.log(res)
      dispatch({
        type: "ON CLICK SEARCH POPUP NO PART ADD MODE",
        value: res.data.results
      });
    });
  };
}
export const onChangeNoPartModeAdd = (e) => {
  return {
    type: "ON CHANGE NO PART MODE ADD",
    value: e.target.value,
  }
}
export const onClickSelectPopUpNoPartModeAdd = (e) => {
  return {
    type: "ON CLICK SELECT POPUP NO PART MODE ADD",
    rowIndex: e.target.parentNode.parentNode.id
  }
}


export const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    console.log("in enter")
    let value = e.target.value;
    let rowIndex = e.target.parentNode.parentNode.parentNode.id;
    console.log("rowIndex", rowIndex)
    return function (dispatch) {
      return axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/fact/items?internal_item_id=${value}`, { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
        console.log("pree key down", res)
        dispatch({
          type: "KEY PRESS ENTER",
          value: value,
          rowIndex: rowIndex,
          res: res.data.results
        });
      });
    };
  }
  else {
    console.log("not enter");
    return {
      type: "NOT ENTER"
    }
  }
}


export const handleKeyPressModeEdit = (e) => {
  if (e.key === 'Enter') {
    console.log("in enter")
    let value = e.target.value;
    let rowIndex = e.target.parentNode.parentNode.parentNode.id;
    console.log("rowIndex", rowIndex)
    return function (dispatch) {
      return axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/fact/items?internal_item_id=${value}`, { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
        console.log("pree key down", res)
        dispatch({
          type: "KEY PRESS ENTER MODE EDIT",
          value: value,
          rowIndex: rowIndex,
          res: res.data.results
        });
      });
    };
  }
  else {
    console.log("not enter");
    return {
      type: "NOT ENTER"
    }
  }
}