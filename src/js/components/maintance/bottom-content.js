import React from 'react';
import { connect } from 'react-redux'
import Document from '../../../images/document.svg'

import '../../../css/style.css'

class BottomContent extends React.Component {


  checkActionMode1 = (mode) => {
    const current = this;
    if (mode === "search") {
      return (
        <>
          <table className="table-many-column mt-2">
            <thead>
              <tr>
                <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                <th className="font" style={{ minWidth: "130px" }}>เลขที่สิ่งของ</th>
                <th className="font" style={{ minWidth: "250px" }}>รายละเอียดอะไหล่</th>
                <th className="font" style={{ minWidth: "250px" }}>เลขที่สินทรัพย์</th>
                <th className="font text-center" style={{ minWidth: "100px" }}>หน่วย</th>
                <th className="font text-center" style={{ minWidth: "100px" }}>ของเสีย</th>
                <th className="font text-center" style={{ minWidth: "100px" }}>ซาก</th>
                <th className="font text-center" style={{ minWidth: "150px" }}>ของเก่าพร้อมใช้งาน</th>
                <th className="font text-center" style={{ minWidth: "150px" }}>จำนวนทั้งหมด</th>
                <th className="font text-center" style={{ minWidth: "500px" }}>หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>
              {this.props.list_show_main.map(function (list_show, row) {
                return (
                  <tr key={row} id={row}>
                    <th className="edit-padding text-center" style={{ minWidth: "30px" }}>{list_show.id}</th>
                    <td className="edit-padding" style={{ minWidth: "130px" }}>{list_show.no_part}</td>
                    <td className="edit-padding text-left" style={{ minWidth: "250px" }}>{list_show.detail}</td>
                    <td className="edit-padding text-center" style={{ minWidth: "250px" }}>{list_show.number}</td>
                    <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                      {list_show.unit}
                    </td>
                    <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                      {list_show.fail1}
                    </td>
                    <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                      {list_show.fail2}
                    </td>
                    <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                      {list_show.fail3}
                    </td>
                    <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                      {list_show.quility}
                    </td>
                    <td className="edit-padding text-left" style={{ minWidth: "300px" }}> {list_show.note}</td>
                  </tr>)
              })}
            </tbody>
          </table>

          <div className="grid_12 mt-5 mb-1">
            <div className="grid_1"><p className="cancel-default">หมายเหตุ</p></div>
            <div className="grid_10">
              <textarea className="edit" name="Text1" cols="40" rows="2" disabled="disabled"></textarea>
            </div>
          </div>

        </>
      )
    }
    if (mode === "edit") {
      return (
        <>
          <table className="table-many-column mt-2">
            <thead>
              <tr>
                <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                <th className="font" style={{ minWidth: "130px" }}>เลขที่สิ่งของ</th>
                <th className="font" style={{ minWidth: "250px" }}>รายละเอียดอะไหล่</th>
                <th className="font" style={{ minWidth: "250px" }}>เลขที่สินทรัพย์</th>
                <th className="font text-center" style={{ minWidth: "100px" }}>หน่วย</th>
                <th className="font text-center" style={{ minWidth: "100px" }}>ของเสีย</th>
                <th className="font text-center" style={{ minWidth: "100px" }}>ซาก</th>
                <th className="font text-center" style={{ minWidth: "150px" }}>ของเก่าพร้อมใช้งาน</th>
                <th className="font text-center" style={{ minWidth: "150px" }}>จำนวนทั้งหมด</th>
                <th className="font text-center" style={{ minWidth: "500px" }}>หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>
              {this.props.list_show_main.map(function (list_show, row) {
                return (
                  <tr key={row} id={row}>
                    <th className="edit-padding text-center" style={{ minWidth: "30px" }}>{list_show.id}</th>
                    <td className="edit-padding" style={{ minWidth: "130px" }}>
                      <div className="p-search-box cancel-margin" style={{ marginBottom: "0" }}>
                        <input type="text" className="p-search-box__input cancel-default-table" value={list_show.no_part} onChange={(e) => current.props.onChangeNoPartEachRowMain(e)} />
                        <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPartMain" aria-controls="modalNoPartMain" onClick={(e) => current.props.onClickNoPartMainEachRow(e)}></i></button>
                      </div>
                    </td>
                    <td className="edit-padding text-left" style={{ minWidth: "250px" }}>{list_show.detail}</td>
                    <td className="edit-padding text-center" style={{ minWidth: "250px" }}>
                      <input type="text" className="cancel-default float-right" value={list_show.number} onChange={(e) => current.props.onChangeNumberMainEachRow(e)}></input>


                    </td>
                    <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                      {list_show.unit}
                    </td>
                    <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                      <input type="text" className="cancel-default float-right" value={list_show.fail1} onChange={(e) => current.props.onChangeFail1MainEachRow(e)}></input>
                    </td>
                    <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                      <input type="text" className="cancel-default float-right" value={list_show.fail2} onChange={(e) => current.props.onChangeFail2MainEachRow(e)}></input>
                    </td>
                    <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                      <input type="text" className="cancel-default float-right" value={list_show.fail3} onChange={(e) => current.props.onChangeFail3MainEachRow(e)}></input>
                    </td>
                    <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                      {list_show.quility}
                    </td>
                    <td className="edit-padding text-left" style={{ minWidth: "300px" }}>
                      <input type="text" className="cancel-default float-right" value={list_show.note} onChange={(e) => current.props.onChangeNoteMainEachRow(e)}></input></td>
                  </tr>)
              })}
            </tbody>
          </table>

          <div className="grid_12 mt-5 mb-1">
            <div className="grid_1"><p className="cancel-default">หมายเหตุ</p></div>
            <div className="grid_10">
              <textarea className="edit" name="Text1" cols="40" rows="2" ></textarea>
            </div>
          </div>

          {/* PopUp เลขที่อะไหล่ */}
          <div className="modal" id="modalNoPartMain" style={{ display: "none" }}>
            <div className="gray-board">
              <p className="head-title-modal edit">ค้นหาเลขที่อะไหล่</p>
              <div className="container_12 edit-padding">
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">เลขที่อะไหล่</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_3" value={this.props.list_no_part_main} onChange={(e) => this.props.onChangeNoPartMain(e)} />
                    <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickSearchPopUpNoPartMain(e)}>ค้นหา</button>
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
                      {current.props.no_part_show_main.map(function (no_part_show_main, index) {
                        return (
                          <tr key={index} id={index}>
                            <td className="edit-padding"> {no_part_show_main.no_part} </td>
                            <td className="edit-padding text-center">
                              <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectPopUpNoPartMain(e)} aria-label="Close active modal" aria-controls="modalNoPartMain" id="closeModalNoPartMain" >เลือก</button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="grid_12">
                  <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalNoPartMain" id="closeModalNoPart">กลับ</button>
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

          <table className="table-many-column mt-2">
            <thead>
              <tr>
                <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                <th className="font" style={{ minWidth: "130px" }}>เลขที่สิ่งของ</th>
                <th className="font" style={{ minWidth: "250px" }}>รายละเอียดอะไหล่</th>
                <th className="font" style={{ minWidth: "250px" }}>เลขที่สินทรัพย์</th>
                <th className="font text-center" style={{ minWidth: "100px" }}>หน่วย</th>
                <th className="font text-center" style={{ minWidth: "100px" }}>ของเสีย</th>
                <th className="font text-center" style={{ minWidth: "100px" }}>ซาก</th>
                <th className="font text-center" style={{ minWidth: "150px" }}>ของเก่าพร้อมใช้งาน</th>
                <th className="font text-center" style={{ minWidth: "150px" }}>จำนวนทั้งหมด</th>
                <th className="font text-center" style={{ minWidth: "500px" }}>หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>
              {this.props.list_show_mode_add_main.map(function (list_show, row) {
                return (
                  <tr key={row} id={row}>
                    <th className="edit-padding text-center" style={{ minWidth: "30px" }}>{list_show.id}</th>
                    <td className="edit-padding" style={{ minWidth: "130px" }}>
                      <div className="p-search-box cancel-margin" style={{ marginBottom: "0" }}>
                        <input type="text" className="p-search-box__input cancel-default-table" value={list_show.no_part} onChange={(e) => current.props.onChangeNoPartMainEachRowModeAdd(e)} />
                        <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPartMainModeAdd" aria-controls="modalNoPartMainModeAdd" onClick={(e) => current.props.onClickNoPartMainEachRowModeAdd(e)}></i></button>
                      </div>
                    </td>
                    <td className="edit-padding text-left" style={{ minWidth: "250px" }}>{list_show.detail}</td>
                    <td className="edit-padding text-center" style={{ minWidth: "250px" }}>
                      <input type="text" className="cancel-default float-right" value={list_show.number} onChange={(e) => current.props.onChangeNumberMainEachRowAdd(e)}></input>
                    </td>
                    <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                      {list_show.unit}
                    </td>
                    <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                      <input type="text" className="cancel-default float-right" value={list_show.fail1} onChange={(e) => current.props.onChangeFail1MainEachRowAdd(e)}></input>
                    </td>
                    <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                      <input type="text" className="cancel-default float-right" value={list_show.fail2} onChange={(e) => current.props.onChangeFail2MainEachRowAdd(e)}></input>
                    </td>
                    <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                      <input type="text" className="cancel-default float-right" value={list_show.fail3} onChange={(e) => current.props.onChangeFail3MainEachRowAdd(e)}></input>
                    </td>
                    <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                      {list_show.quility}
                    </td>
                    <td className="edit-padding text-left" style={{ minWidth: "300px" }}>
                      <input type="text" className="cancel-default float-right" value={list_show.note} onChange={(e) => current.props.onChangeNoteMainEachRowAdd(e)}></input></td>
                  </tr>)
              })}
            </tbody>
          </table>

          <div className="grid_12 mt-5 mb-1">
            <div className="grid_1"><p className="cancel-default">หมายเหตุ</p></div>
            <div className="grid_10">
              <textarea className="edit" name="Text1" cols="40" rows="2" ></textarea>
            </div>
          </div>

          {/* PopUp เลขที่อะไหล่ */}
          <div className="modal" id="modalNoPartMainModeAdd" style={{ display: "none" }}>
            <div className="gray-board">
              <p className="head-title-modal edit">ค้นหาเลขที่อะไหล่</p>
              <div className="container_12 edit-padding">

                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">เลขที่อะไหล่</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_3" value={this.props.list_no_part_mode_add_main} onChange={(e) => this.props.onChangeNoPartMainModeAdd(e)} />
                    <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickSearchPopUpNoPartMainModeAdd(e)}>ค้นหา</button>
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
                      {this.props.no_part_show_mode_add_main.map(function (no_part_show_mode_add_main, index) {
                        return (
                          <tr key={index} id={index}>
                            <td className="edit-padding"> {no_part_show_mode_add_main.no_part} </td>

                            <td className="edit-padding text-center">
                              <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectPopUpNoPartMainModeAdd(e)} aria-label="Close active modal" aria-controls="modalNoPartMainModeAdd" id="closeModalNoPartMain" >เลือก</button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="grid_12">
                  <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalNoPartMainModeAdd" id="closeModalNoPartMain">กลับ</button>
                </div>
              </div>
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
        </>)
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
        </>)
    }
  }

  checkActionMode3 = (mode) => {
    const current = this;
    if (mode === "search") {

      return (
        <>
          <table className="table-many-column mt-2">
            <thead>
              <tr>
                <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                <th className="font" style={{ minWidth: "130px" }}>เลขที่อุปกรณ์</th>
                <th className="font" style={{ minWidth: "250px" }}>รายละเอียด</th>
                <th className="font text-center" style={{ minWidth: "150px" }}>จำนวน</th>
                <th className="font text-center" style={{ minWidth: "100px" }}>หน่วย</th>
                <th className="font text-center" style={{ minWidth: "500px" }}>หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>

              {this.props.list_show.map(function (list_show, row) {
                return (
                  <tr key={row} id={row}>
                    <th className="edit-padding text-center" style={{ minWidth: "30px" }}>{list_show.id}</th>
                    <td className="edit-padding" style={{ minWidth: "130px" }}>{list_show.no_part}</td>
                    <td className="edit-padding text-left" style={{ minWidth: "250px" }}>{list_show.detail}</td>
                    <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
                      <select className="edit-select-table" disabled="disabled">
                        <option defaultValue="1">{list_show.unit}</option>
                      </select>
                    </td>
                    <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                      {list_show.quility}
                    </td>
                    <td className="edit-padding text-left" style={{ minWidth: "300px" }}> {list_show.note}</td>
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
          <table className="table-many-column mt-2">
            <thead>
              <tr>
                <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                <th className="font" style={{ minWidth: "130px" }}>เลขที่อุปกรณ์</th>
                <th className="font" style={{ minWidth: "250px" }}>รายละเอียด</th>
                <th className="font text-center" style={{ minWidth: "150px" }}>จำนวน</th>
                <th className="font text-center" style={{ minWidth: "100px" }}>หน่วย</th>
                <th className="font text-center" style={{ minWidth: "500px" }}>หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>

              {this.props.list_show.map(function (list_show, row) {
                return (
                  <tr key={row} id={row}>
                    <th className="edit-padding text-center" style={{ minWidth: "30px" }}>{list_show.id}</th>
                    <td className="edit-padding" style={{ minWidth: "130px" }}>
                      <div className="p-search-box cancel-margin" style={{ marginBottom: "0" }}>
                        <input type="text" className="p-search-box__input cancel-default-table" value={list_show.no_part} onChange={(e) => current.props.onChangeNoPartEachRow(e)} />
                        <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPart" aria-controls="modalNoPart" onClick={(e) => current.props.onClickNoPartEachRow(e)}></i></button>
                      </div>
                    </td>
                    <td className="edit-padding text-left" style={{ minWidth: "250px" }}>{list_show.detail}</td>
                    <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
                      <select className="edit-select-table" onChange={(e) => current.props.onChangeUnitEachRow(e)}>
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
                    <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                      <input type="number" min="1" className="cancel-default float-right" value={list_show.quility} onChange={(e) => current.props.onChangeQuilityEachRow(e)}></input>
                    </td>
                    <td className="edit-padding text-left" style={{ minWidth: "300px" }}>
                      <input type="text" className="cancel-default float-right" value={list_show.note} onChange={(e) => current.props.onChangeNoteEachRow(e)}></input>
                    </td>
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
          <table className="table-many-column mt-2">
            <thead>
              <tr>
                <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                <th className="font" style={{ minWidth: "130px" }}>เลขที่อุปกรณ์</th>
                <th className="font" style={{ minWidth: "250px" }}>รายละเอียด</th>
                <th className="font text-center" style={{ minWidth: "150px" }}>จำนวน</th>
                <th className="font text-center" style={{ minWidth: "100px" }}>หน่วย</th>
                <th className="font text-center" style={{ minWidth: "500px" }}>หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>

              {current.props.list_show_mode_add.map(function (list_show, row) {
                return (
                  <tr key={row} id={row}>
                    <th className="edit-padding text-center" style={{ minWidth: "30px" }}>{list_show.id}</th>
                    <td className="edit-padding" style={{ minWidth: "130px" }}>
                      <div className="p-search-box cancel-margin" style={{ marginBottom: "0" }}>
                        <input type="text" className="p-search-box__input cancel-default-table" value={list_show.no_part} onChange={(e) => current.props.onChangeNoPartEachRowModeAdd(e)} />
                        <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPartModeAdd" aria-controls="modalNoPartModeAdd" onChange={(e) => current.props.onChangeNoPartEachRowModeAdd(e)}></i></button>
                      </div>
                    </td>
                    <td className="edit-padding text-left" style={{ minWidth: "250px" }}>{list_show.detail}</td>
                    <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
                      <select className="edit-select-table" onChange={(e) => current.props.onChangeUnitEachRowAdd(e)}>
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
                    <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                      <input type="number" min="1" className="cancel-default float-right" value={list_show.quility} onChange={(e) => current.props.onChangeQuilityEachRowAdd(e)}></input>
                    </td>
                    <td className="edit-padding text-left" style={{ minWidth: "300px" }}>
                      <input type="text" className="cancel-default float-right" value={list_show.note} onChange={(e) => current.props.onChangeNoteEachRowAdd(e)}></input>
                    </td>
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
  render() {
    return (
      <form>
        <div id="blackground-gray">
          <div className="container_12 clearfix">
            <div className="grid_12 ">
              <div id="รายการอะไหล่" className="tabcontent">
                {/* Input in TopBar */}
                {this.checkActionMode1(this.props.actionMode)}
              </div>
              <div id="ระบุผู้ปฎิบัติงาน" className="tabcontent">
                {/* Input in TopBar */}
                {this.checkActionMode2(this.props.actionMode)}
              </div>
              <div id="อุปกรณ์ที่ต้องนำไปปฎิบัติงาน" className="tabcontent">
                {/* Input in TopBar */}
                {this.checkActionMode3(this.props.actionMode)}
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

  list_unit: state.list_unit,

  list_no_part: state.list_no_part,
  no_part_show: state.no_part_show,

  no_part_show_mode_add: state.no_part_show_mode_add,
  list_show_mode_add: state.list_show_mode_add,

  list_job: state.list_job,

  document_show_mode_add: state.document_show_mode_add,



  list_show_main: state.list_show_main,
  list_no_part_main: state.list_no_part_main,
  no_part_show_main: state.no_part_show_main,
  no_part_show_mode_add_main: state.no_part_show_mode_add_main,
  list_show_mode_add_main: state.list_show_mode_add_main,
})

const mapDispatchToProps = (dispatch) => ({
  onChangeNoPart: (e) => dispatch(onChangeNoPart(e)),
  onChangeNoPartEachRow: (e) => dispatch(onChangeNoPartEachRow(e)),
  onClickNoPartEachRow: (e) => dispatch(onClickNoPartEachRow(e)),
  onClickSearchPopUpNoPart: (e) => dispatch(onClickSearchPopUpNoPart(e)),
  onClickSelectPopUpNoPart: (e) => dispatch(onClickSelectPopUpNoPart(e)),

  onChangeQuilityEachRow: (e) => dispatch(onChangeQuilityEachRow(e)),
  onChangeNoteEachRow: (e) => dispatch(onChangeNoteEachRow(e)),
  onChangeUnitEachRow: (e) => dispatch(onChangeUnitEachRow(e)),

  onChangeQuilityEachRowAdd: (e) => dispatch(onChangeQuilityEachRowAdd(e)),
  onChangeNoteEachRowAdd: (e) => dispatch(onChangeNoteEachRowAdd(e)),
  onChangeUnitEachRowAdd: (e) => dispatch(onChangeUnitEachRowAdd(e)),


  onChangeNoPartEachRowModeAdd: (e) => dispatch(onChangeNoPartEachRowModeAdd(e)),
  onClickNoPartEachRowModeAdd: (e) => dispatch(onClickNoPartEachRowModeAdd(e)),
  onClickSearchPopUpNoPartModeAdd: (e) => dispatch(onClickSearchPopUpNoPartModeAdd(e)),
  onClickSelectPopUpNoPartModeAdd: (e) => dispatch(onClickSelectPopUpNoPartModeAdd(e)),
  onChangeNoPartModeAdd: (e) => dispatch(onChangeNoPartModeAdd(e)),


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


  onClickSearchPopUpNoPartMain: (e) => dispatch(onClickSearchPopUpNoPartMain(e)),
  onChangeNoPartMain: (e) => dispatch(onChangeNoPartMain(e)),
  onClickSelectPopUpNoPartMain: (e) => dispatch(onClickSelectPopUpNoPartMain(e)),
  onChangeNoPartEachRowMain: (e) => dispatch(onChangeNoPartEachRowMain(e)),
  onClickNoPartMainEachRow: (e) => dispatch(onClickNoPartMainEachRow(e)),
  onChangeNumberMainEachRow: (e) => dispatch(onChangeNumberMainEachRow(e)),
  onChangeFail1MainEachRow: (e) => dispatch(onChangeFail1MainEachRow(e)),
  onChangeFail3MainEachRow: (e) => dispatch(onChangeFail3MainEachRow(e)),
  onChangeFail2MainEachRow: (e) => dispatch(onChangeFail2MainEachRow(e)),
  onChangeNoteMainEachRow: (e) => dispatch(onChangeNoteMainEachRow(e)),



  onChangeNumberMainEachRowAdd: (e) => dispatch(onChangeNumberMainEachRowAdd(e)),
  onChangeNoteMainEachRowAdd: (e) => dispatch(onChangeNoteMainEachRowAdd(e)),
  onChangeFail1MainEachRowAdd: (e) => dispatch(onChangeFail1MainEachRowAdd(e)),
  onChangeFail2MainEachRowAdd: (e) => dispatch(onChangeFail2MainEachRowAdd(e)),
  onChangeFail3MainEachRowAdd: (e) => dispatch(onChangeFail3MainEachRowAdd(e)),
  onChangeNoPartMainEachRowModeAdd: (e) => dispatch(onChangeNoPartMainEachRowModeAdd(e)),
  onClickNoPartMainEachRowModeAdd: (e) => dispatch(onClickNoPartMainEachRowModeAdd(e)),
  onClickSearchPopUpNoPartMainModeAdd: (e) => dispatch(onClickSearchPopUpNoPartMainModeAdd(e)),
  onChangeNoPartMainModeAdd: (e) => dispatch(onChangeNoPartMainModeAdd(e)),
  onClickSelectPopUpNoPartMainModeAdd: (e) => dispatch(onClickSelectPopUpNoPartMainModeAdd(e)),
})

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
  console.log(e.target.parentNode.parentNode.parentNode.parentNode)
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
  console.log(e.target.parentNode.parentNode.parentNode.id)
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



///Table

export const onClickSearchPopUpNoPartMain = (e) => {
  return {
    type: "ON CLICK SEARCH POPUP NO PART MAIN",
  }
}
export const onChangeNoPartMain = (e) => {
  return {
    type: "ON CHANGE NO PART MAIN",
    value: e.target.value,
  }
}
export const onClickSelectPopUpNoPartMain = (e) => {
  return {
    type: "ON CLICK SELECT POPUP NO PART MAIN",
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeNoPartEachRowMain = (e) => {
  return {
    type: "ON CHANGE NO PART MAIN EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.parentNode.id
  }
}
export const onClickNoPartMainEachRow = (e) => {
  console.log(e.target.parentNode.parentNode.parentNode.parentNode)
  return {
    type: "ON CLICK NO PART EACH ROW",
    rowIndex: e.target.parentNode.parentNode.parentNode.parentNode.id
  }
}



export const onChangeNumberMainEachRow = (e) => {
  return {
    type: "ON CHANGE NUMBER MAIN EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeFail1MainEachRow = (e) => {
  return {
    type: "ON CHANGE FAIL1 MAIN EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeFail2MainEachRow = (e) => {
  return {
    type: "ON CHANGE FAIL2 MAIN EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeFail3MainEachRow = (e) => {
  return {
    type: "ON CHANGE FAIL3 MAIN EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeNoteMainEachRow = (e) => {
  return {
    type: "ON CHANGE NOTE MAIN EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}


export const onChangeNumberMainEachRowAdd = (e) => {
  return {
    type: "ON CHANGE NUMBER MAIN EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeNoteMainEachRowAdd = (e) => {
  return {
    type: "ON CHANGE NOTE MAIN EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeFail1MainEachRowAdd = (e) => {
  return {
    type: "ON CHANGE FAIL1 MAIN EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeFail2MainEachRowAdd = (e) => {
  return {
    type: "ON CHANGE FAIL2 MAIN EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeFail3MainEachRowAdd = (e) => {
  return {
    type: "ON CHANGE FAIL3 MAIN EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}




export const onChangeNoPartMainEachRowModeAdd = (e) => {
  console.log(e.target.parentNode.parentNode.parentNode.id)
  return {
    type: "ON CHANGE NO PART MAIN EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.parentNode.id
  }
}
export const onClickNoPartMainEachRowModeAdd = (e) => {
  // console.log(e.target.parentNode.parentNode.parentNode.parentNode)
  return {
    type: "ON CLICK NO PART MAIN EACH ROW MODE ADD",
    rowIndex: e.target.parentNode.parentNode.parentNode.parentNode.id
  }
}
export const onClickSearchPopUpNoPartMainModeAdd = (e) => {
  return {
    type: "ON CLICK SEARCH POPUP NO PART MAIN ADD MODE",
  }
}
export const onChangeNoPartMainModeAdd = (e) => {
  return {
    type: "ON CHANGE NO PART MAIN MODE ADD",
    value: e.target.value,
  }
}
export const onClickSelectPopUpNoPartMainModeAdd = (e) => {
  return {
    type: "ON CLICK SELECT POPUP NO PART MAIN MODE ADD",
    rowIndex: e.target.parentNode.parentNode.id
  }
}