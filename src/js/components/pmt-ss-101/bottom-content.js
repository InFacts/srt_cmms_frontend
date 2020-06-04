import React, { useState, useEffect } from 'react';

import TextareaInput from '../common/formik-textarea-input';
import TableStatus from '../common/table-status';

import Files from '../common/files2'

const BottomContent = (props) => {
    return (
        <div id="blackground-gray">
            <div className="container_12 clearfix">
                <div className="container_12 ">
                    <div id="breakdown_content" className="tabcontent">
                        <h3 className="head-title-bottom mt-2">ข้อมูลเกี่ยวกับอาการขัดข้อง</h3>
                        <div className="grid_12">
                            <div className="grid_3"><p className="cancel-default">เดินทางโดย</p></div>
                            <div className="grid_7">
                                <select className="edit-select" disabled="disabled">
                                    {/* {current.props.list_job.map(function (list_job, index) {
                  if (current.props.document_show.travel_by === list_job.status) {
                    return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                  }
                  else {
                    return null
                  }
                })} */}
                                </select>
                            </div>
                        </div>
                        <div className="grid_12">
                            <div className="grid_3"><p className="cancel-default">ออกเดินทาง</p></div>
                            <div className="grid_7">
                                <input type="date" className="cancel-default grid_3 mt-1" disabled="disabled"
                                // defaultValue={this.props.document_show.travel_by_date1}
                                ></input>
                                <input type="time" className="cancel-default grid_3 mt-1 float-right" disabled="disabled"
                                // defaultValue={this.props.document_show.travel_by_time1}
                                ></input>
                                <p className="cancel-default grid_1 float-right">เวลา</p>
                            </div>
                        </div>
                        <div className="grid_12">
                            <div className="grid_3"><p className="cancel-default">เดินทางถึง</p></div>
                            <div className="grid_7">
                                <input type="date" className="cancel-default grid_3 mt-1" disabled="disabled"
                                // defaultValue={this.props.document_show.travel_by_date2}
                                ></input>
                                <input type="time" className="cancel-default grid_3 mt-1 float-right" disabled="disabled"
                                // defaultValue={this.props.document_show.travel_by_time2}
                                ></input>
                                <p className="cancel-default grid_1 float-right">เวลา</p>
                            </div>
                        </div>
                        <div className="grid_12">
                            <div className="grid_3"><p className="cancel-default">วันเวลาที่แล้วเสร็จ</p></div>
                            <div className="grid_7 ">
                                <input type="date" className="cancel-default grid_3 mt-1" disabled="disabled"
                                // defaultValue={this.props.document_show.travel_by_date3}
                                ></input>
                                <input type="time" className="cancel-default grid_3 mt-1 float-right" disabled="disabled"
                                // defaultValue={this.props.document_show.travel_by_time3}
                                ></input>
                                <p className="cancel-default grid_1 float-right">เวลา</p>
                            </div>
                        </div>
                        <div className="grid_12">
                            <div className="grid_3"><p className="cancel-default">ระบบตรวจซ่อม</p></div>
                            <div className="grid_7 ">
                                <select className="edit-select grid_3" disabled="disabled">
                                    {/* {current.props.list_job.map(function (list_job, index) {
                                    if (current.props.document_show.inspection === list_job.status) {
                                        return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                                    }
                                    else {
                                        return null
                                    }
                                })} */}
                                </select>
                                <select className="edit-select grid_3 float-right" disabled="disabled">
                                    {/* {current.props.list_job.map(function (list_job, index) {
                                    if (current.props.document_show.type === list_job.status) {
                                        return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                                    }
                                    else {
                                        return null
                                    }
                                })} */}
                                </select>
                                <p className="cancel-default grid_1 float-right">ชนิด</p>
                            </div>
                        </div>
                        <div className="grid_12">
                            <div className="grid_3"><p className="cancel-default">รายการที่ซ่อม</p></div>
                            <div className="grid_8 ">
                                <input type="text" className="cancel-default mt-1" disabled="disabled"
                                // defaultValue={this.props.document_show.list}
                                ></input>
                            </div>
                        </div>
                        <div className="grid_12">
                            <div className="grid_3"><p className="cancel-default">ที่ตั้งอุปกรณ์ที่ทำการตรวจซ่อม</p></div>
                            <div className="grid_8">
                                <input type="text" className="cancel-default mt-1" disabled="disabled"
                                // defaultValue={this.props.document_show.location}
                                ></input>
                            </div>
                        </div>
                        <div className="grid_12">
                            <div className="grid_3"><p className="cancel-default">ชื่ออุปกรณ์ที่บำรุงรักษา</p></div>
                            <div className="grid_8">
                                <input type="text" className="cancel-default mt-1" disabled="disabled"
                                // defaultValue={this.props.document_show.name_inspection}
                                ></input>
                            </div>
                        </div>
                        <div className="grid_12">
                            <div className="grid_3"><p className="cancel-default">สาเหตุและอาการเสียโดยสรุป</p></div>
                            <div className="grid_8">
                                <textarea className="edit" name="Text1" cols="40" rows="2" disabled="disabled"
                                // defaultValue={this.props.document_show.symptoms}
                                ></textarea>
                            </div>
                        </div>
                        <div className="grid_12">
                            <div className="grid_3"><p className="cancel-default">ขบวนรถที่</p></div>
                            <div className="grid_8">
                                <p className="cancel-default grid_1 float-right">นาที:</p>
                                <input type="text" className="cancel-default mt-1 grid_3" disabled="disabled"
                                // defaultValue={this.props.document_show.procession}
                                ></input>
                                <input type="text" className="cancel-default mt-1 grid_2 float-right" disabled="disabled"
                                // defaultValue={this.props.document_show.time}
                                ></input>
                                <p className="cancel-default grid_2 float-right">เสียเวลาเพราะเหตุนี้</p>
                            </div>
                        </div>
                        <div className="grid_12">
                            <div className="grid_3"><p className="cancel-default">สรุปการแก้ไขและการซ่อมแซม</p></div>
                            <div className="grid_8 ">
                                <textarea className="edit" name="Text1" cols="40" rows="2" disabled="disabled"
                                // defaultValue={this.props.document_show.conclude}
                                ></textarea>
                            </div>
                        </div>
                        <div className="grid_12">
                            <div className="grid_3"><p className="cancel-default">ยังไม่ได้จัดการแก้ไขเพราะ</p></div>
                            <div className="grid_7 ">
                                <select className="edit-select" disabled="disabled" >
                                    {/* {current.props.list_job.map(function (list_job, index) {
                                    if (current.props.document_show.edit === list_job.status) {
                                        return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                                    }
                                    else {
                                        return null
                                    }
                                })} */}
                                </select>
                            </div>
                        </div>
                        <div className="grid_12">
                            <div className="grid_3"><p className="cancel-default">สรุปการแก้ไขและการซ่อมแซม</p></div>
                            <div className="grid_8 ">
                                <textarea className="edit" name="Text1" cols="40" rows="2" disabled="disabled"
                                // defaultValue={this.props.document_show.note}
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div id="related_partiesn_content" className="tabcontent">
                        <h3 className="head-title-bottom mt-2">ผู้ปฎิบัติงาน</h3>
                        <div className="grid_12">
                            <div className="grid_2"><p className="cancel-default">ผู้ควบคุมตรวจสอบชื่อ</p></div>
                            <div className="grid_8 pull_0">
                                <input type="text" className="cancel-default grid_4 mt-1" disabled="disabled"
                                // defaultValue={this.props.document_show.name1}
                                ></input>
                                <select className="edit-select grid_3 float-right" disabled="disabled">
                                    {/* {current.props.list_job.map(function (list_job, index) {
                                        if (current.props.document_show.job1 === list_job.status) {
                                            return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                                        }
                                        else {
                                            return null
                                        }
                                    })} */}
                                </select>
                                <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
                            </div>
                        </div>

                        <div className="grid_12">
                            <div className="grid_2"><p className="cancel-default">ดำเนินการแก้ไขชื่อ</p></div>
                            <div className="grid_8 pull_0">
                                <input type="text" className="cancel-default grid_4 mt-1" disabled="disabled"
                                // defaultValue={this.props.document_show.name2}
                                ></input>
                                <select className="edit-select grid_3 float-right" disabled="disabled" >
                                    {/* {current.props.list_job.map(function (list_job, index) {
                                        if (current.props.document_show.job2 === list_job.status) {
                                            return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                                        }
                                        else {
                                            return null
                                        }
                                    })} */}
                                </select>
                                <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
                            </div>
                        </div>

                        <div className="grid_12">
                            <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
                            <div className="grid_8 pull_0" >
                                <input type="text" className="cancel-default grid_4 mt-1" disabled="disabled"
                                // defaultValue={this.props.document_show.name3}
                                ></input>
                                <select className="edit-select grid_3 float-right" disabled="disabled">
                                    {/* {current.props.list_job.map(function (list_job, index) {
                                        if (current.props.document_show.job3 === list_job.status) {
                                            return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                                        }
                                        else {
                                            return null
                                        }
                                    })} */}
                                </select>
                                <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
                            </div>
                        </div>
                        <div className="grid_12">
                            <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
                            <div className="grid_8 pull_0">
                                <input type="text" className="cancel-default grid_4 mt-1" disabled="disabled"
                                // defaultValue={this.props.document_show.name4}
                                ></input>
                                <select className="edit-select grid_3 float-right" disabled="disabled">
                                    {/* {current.props.list_job.map(function (list_job, index) {
                                        if (current.props.document_show.job4 === list_job.status) {
                                            return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                                        }
                                        else {
                                            return null
                                        }
                                    })} */}
                                </select>
                                <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
                            </div>
                        </div>
                        <div className="grid_12">
                            <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
                            <div className="grid_8 pull_0">
                                <input type="text" className="cancel-default grid_4 mt-1" disabled="disabled"
                                // defaultValue={this.props.document_show.name5}
                                ></input>
                                <select className="edit-select grid_3 float-right" disabled="disabled" >
                                    {/* {current.props.list_job.map(function (list_job, index) {
                                        if (current.props.document_show.job5 === list_job.status) {
                                            return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                                        }
                                        else {
                                            return null
                                        }
                                    })} */}
                                </select>
                                <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
                            </div>
                        </div>
                        <div className="grid_12">
                            <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
                            <div className="grid_8 pull_0">
                                <input type="text" className="cancel-default grid_4 mt-1" disabled="disabled"
                                // defaultValue={this.props.document_show.name6}
                                ></input>
                                <select className="edit-select grid_3 float-right" disabled="disabled">
                                    {/* {current.props.list_job.map(function (list_job, index) {
                                        if (current.props.document_show.job6 === list_job.status) {
                                            return <option defaultValue={list_job.id} key={index} selected> {list_job.status} </option>
                                        }
                                        else {
                                            return null
                                        }
                                    })} */}
                                </select>
                                <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
                            </div>
                        </div>
                    </div>

                    <div id="compensation_list_content" className="tabcontent">
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
                                {/* {this.props.list_show.map(function (list_show, row) {
      return (
        <tr key={row} id={row}>
          <td className="edit-padding text-center">{list_show.id}</td>
          <td className="edit-padding text-center">{list_show.no_part}</td>
          <td className="edit-padding text-center">{list_show.count}</td>
          <td className="edit-padding text-center">{list_show.unit}</td>
          <td className="edit-padding text-center">{list_show.quility}</td>
          <td className="edit-padding text-center">{list_show.no_tool}</td>
          <td className="edit-padding text-center">{list_show.note}</td>
        </tr>)
    })} */}
                            </tbody>
                        </table>
                    </div>

                    <div id="attachment_content" className="tabcontent">
                    {/* <Files name="file[0].filename" desrciptionFiles={props.actionMode === TOOLBAR_MODE.SEARCH ? values.desrciption_files
              : values.file}
              desrciptionFilesLength={props.actionMode === TOOLBAR_MODE.SEARCH ? values.desrciption_files_length
                : values.file.length}
              disabled={props.actionMode === TOOLBAR_MODE.SEARCH}
              disabledForModeAdd={props.actionMode === TOOLBAR_MODE.ADD}
              HandleDownload={HandleDownload}
              HandleDeleteFile={HandleDeleteFile}
            /> */}
                    </div>

                    <div id="table_status_content" className="tabcontent">
                    {/* <TableStatus bodyTableStatus = {values.step_approve} /> */}
                    </div>

                    <div id="assets-under-maintenance_content" className="tabcontent">
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
                                {/* {current.props.list_show_master.map(function (list_show, row) {
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
              })} */}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BottomContent;