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
    console.log("hello")
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
            <div >
              <div className="p-search-box cancel-margin grid_3  pull_0">
                <input type="search" className="p-search-box__input cancel-default " value={this.props.no_document} onChange={(e) => this.props.onChangeNoDocument(e)} />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showss101" aria-controls="modalss101"></i></button>
              </div>
              <div className="p-search-box cancel-margin grid_3  float-right">
                <input type="date" className="p-search-box__input cancel-default " disabled="disabled" defaultValue={this.props.document_show.create_name} />
              </div>
              <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">วันที่ออกเอกสาร</p></div>
            </div>
          </div>


          <div className="grid_12">
            <div className="grid_2"><p className="top-text">เลขที่เอกสารอ้างอิง</p></div>
            <div>
              <div className="p-search-box cancel-margin grid_3 pull_0">
                <input type="search" className="p-search-box__input cancel-default " defaultValue={this.props.document_show.no_document_ref} disabled="disabled" />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showss101-2" aria-controls="modalss101-2"></i></button>
              </div>
              <div className="p-search-box cancel-margin grid_3   float-right">
                <input type="text" className=" p-search-box__input cancel-default  " defaultValue={this.props.document_show.date_start} disabled="disabled"></input>
              </div>
              <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">ผู้สร้างเอกสาร</p></div>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2">
              <p className="top-text">ชื่องาน</p>
              <p className="top-text mt-1">วันเวลาที่เกิดเหตุ</p>
              <p className="top-text">วันเวลาที่รับแจ้ง</p>
            </div>
            <div className="grid_3 pull_0">
              <p className="top-text">{this.props.document_show.name}</p>
              <p className="top-text" >{this.props.document_show.date_time_start}</p>
              <p className="top-text">{this.props.document_show.date_time_end}</p>
            </div>
            <div className="grid_3">
              <p className="top-text">รายงานการตรวจซ่อมอุปกรณ์แขวง</p>
              <p className="top-text">ได้รับเหตุจาก</p>
              <p className="top-text">ได้รับข้อมูลผ่านช่องทาง</p>
            </div>
            <div className="grid_3 pull_0">
              <p className="top-text">{this.props.document_show.report}</p>
              <p className="top-text">{this.props.document_show.cause}</p>
              <p className="top-text">{this.props.document_show.channel}</p>
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
            <div >
              <div className="p-search-box cancel-margin grid_3  pull_0">
                <input type="search" className="p-search-box__input cancel-default " value={this.props.no_document} onChange={(e) => this.props.onChangeNoDocument(e)} />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showss101" aria-controls="modalss101"></i></button>
              </div>
              <div className="p-search-box cancel-margin grid_3  float-right">
                <input type="date" className="p-search-box__input cancel-default " disabled="disabled" defaultValue={this.props.document_show.create_name} />
              </div>
              <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">วันที่ออกเอกสาร</p></div>
            </div>
          </div>


          <div className="grid_12">
            <div className="grid_2"><p className="top-text">เลขที่เอกสารอ้างอิง</p></div>
            <div>
              <div className="p-search-box cancel-margin grid_3 pull_0">
                <input type="search" className="p-search-box__input cancel-default " defaultValue={this.props.document_show.no_document_ref} disabled="disabled" />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showss101-2" aria-controls="modalss101-2"></i></button>
              </div>
              <div className="p-search-box cancel-margin grid_3   float-right">
                <input type="text" className=" p-search-box__input cancel-default  " defaultValue={this.props.document_show.date_start} disabled="disabled"></input>
              </div>
              <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">ผู้สร้างเอกสาร</p></div>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2">
              <p className="top-text">ชื่องาน</p>
              <p className="top-text mt-1">วันเวลาที่เกิดเหตุ</p>
              <p className="top-text">วันเวลาที่รับแจ้ง</p>
            </div>
            <div className="grid_3 pull_0">
              <p className="top-text">{this.props.document_show.name}</p>
              <p className="top-text" >{this.props.document_show.date_time_start}</p>
              <p className="top-text">{this.props.document_show.date_time_end}</p>
            </div>
            <div className="grid_3">
              <p className="top-text">รายงานการตรวจซ่อมอุปกรณ์แขวง</p>
              <p className="top-text">ได้รับเหตุจาก</p>
              <p className="top-text">ได้รับข้อมูลผ่านช่องทาง</p>
            </div>
            <div className="grid_3 pull_0">
              <p className="top-text">{this.props.document_show.report}</p>
              <p className="top-text">{this.props.document_show.cause}</p>
              <p className="top-text">{this.props.document_show.channel}</p>
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
            <div >
              <div className="p-search-box cancel-margin grid_3  pull_0">
                <input type="search" className="p-search-box__input cancel-default " value={this.props.no_document} onChange={(e) => this.props.onChangeNoDocument(e)} />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showss101" aria-controls="modalss101"></i></button>
              </div>
              <div className="p-search-box cancel-margin grid_3  float-right">
                <input type="date" className="p-search-box__input cancel-default " disabled="disabled" defaultValue={this.props.document_show.create_name} />
              </div>
              <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">วันที่ออกเอกสาร</p></div>
            </div>
          </div>


          <div className="grid_12">
            <div className="grid_2"><p className="top-text">เลขที่เอกสารอ้างอิง</p></div>
            <div>
              <div className="p-search-box cancel-margin grid_3 pull_0">
                <input type="search" className="p-search-box__input cancel-default " defaultValue={this.props.document_show.no_document_ref} disabled="disabled" />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showss101-2" aria-controls="modalss101-2"></i></button>
              </div>
              <div className="p-search-box cancel-margin grid_3   float-right">
                <input type="text" className=" p-search-box__input cancel-default  " defaultValue={this.props.document_show.date_start} disabled="disabled"></input>
              </div>
              <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">ผู้สร้างเอกสาร</p></div>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2">
              <p className="top-text">ชื่องาน</p>
              <p className="top-text mt-1">วันเวลาที่เกิดเหตุ</p>
              <p className="top-text">วันเวลาที่รับแจ้ง</p>
            </div>
            <div className="grid_3 pull_0">
              <p className="top-text">{this.props.document_show.name}</p>
              <p className="top-text" >{this.props.document_show.date_time_start}</p>
              <p className="top-text">{this.props.document_show.date_time_end}</p>
            </div>
            <div className="grid_3">
              <p className="top-text">รายงานการตรวจซ่อมอุปกรณ์แขวง</p>
              <p className="top-text">ได้รับเหตุจาก</p>
              <p className="top-text">ได้รับข้อมูลผ่านช่องทาง</p>
            </div>
            <div className="grid_3 pull_0">
              <p className="top-text">{this.props.document_show.report}</p>
              <p className="top-text">{this.props.document_show.cause}</p>
              <p className="top-text">{this.props.document_show.channel}</p>
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
              <h4 className="head-title">สรุปการซ่อมบำรุง - แบบ สส.101</h4>
              {/* Input in TopBar */}
              {this.checkActionMode(this.props.actionMode)}
            </section>

            <div className="grid_12">
              <div className="tab grid_11">
                <button type="button" id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "อาการเสีย")}>อาการเสีย</button>
                <button type="button" id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "ผู้ที่เกี่ยวข้อง")}>ผู้ที่เกี่ยวข้อง</button>
                <button type="button" id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "รายการค่าเสียหาย")}>รายการค่าเสียหาย</button>
                <button type="button" className="tablinks" onClick={e => this.tapChange(e, "แนบไฟล์")}>แนบไฟล์</button>
                <button type="button" className="tablinks" onClick={e => this.tapChange(e, "สถานะเอกสาร")}>สถานะเอกสาร</button>
                <button type="button" className="tablinks" onClick={e => this.tapChange(e, "สินทรัพย์ที่ดำเนินซ่อมบำรุง")}>สินทรัพย์ที่ดำเนินซ่อมบำรุง</button>
              </div>
            </div>
          </div>
        </div>

        {/* PopUp */}
        {/* <div className="modal" id="modal" style={{ display: "none" }}>
          <div className="gray-board">
            <p className="head-title-modal edit">ค้นหาเอกสารอ้างอิง / ใบสั่งงาน</p>
            <div className="container_12 edit-padding">

              <div className="grid_12">
                <div className="grid_7">
                  <input className="d-inline" type="radio" name="RadioOptions" id="Radio1" value="เอกสารของฉัน" onChange={(e) => { this.props.onChangeFindTrackDocument(e) }} />
                  <label htmlFor="Radio1" className="cancel-default d-inline">เอกสารของฉัน</label>
                  <input className="d-inline ml-3" type="radio" name="RadioOptions" id="Radio2" value="เอกสารทั้งหมด" onChange={(e) => { this.props.onChangeFindTrackDocument(e) }} />
                  <label htmlFor="Radio2" className="cancel-default d-inline ml-3">เอกสารทั้งหมด</label>
                </div>
              </div>


              <div className="grid_12 mt-2">
                <div className="grid_1 cancel-default">
                  <p className="cancel-default">ประเภทเอกสาร </p>
                </div>
                <div className="grid_2">
                  <select className="edit-select-top grid_2 " >

                  </select>
                </div>
                <div className="grid_1  ">
                  <p className="cancel-default">วันเริ่มต้น </p>
                </div>
                <div className="grid_3">
                  <input type="date" className="cancel-default grid_3 " ></input>
                </div>
              </div>


              <div className="grid_12">
                <div className="grid_1 cancel-default">
                  <p className="cancel-default">เลขที่เอกสาร </p>
                </div>
                <div className="grid_2">
                  <input type="text" className="cancel-default grid_2 " ></input>
                </div>
                <div className="grid_1  ">
                  <p className="cancel-default">วันสิ้นสุด </p>
                </div>
                <div className="grid_3">
                  <input type="date" className="cancel-default grid_3 "></input>
                </div>
                <div className="grid_1  ">
                  <p className="cancel-default">สถานะเอกสาร </p>

                </div>
                <div className="grid_2">
                  <select className="edit-select-top grid_2 " >

                  </select>
                </div>
              </div>

              <div className="grid_12">
                <div className="grid_1 cancel-default">
                  <p className="cancel-default">แขวง </p>
                </div>
                <div className="grid_2">
                  <select className="edit-select-top grid_2 " >

                  </select>
                </div>
                <div className="grid_1  ">
                  <p className="cancel-default">ตอน </p>
                </div>
                <div className="grid_3">
                  <select className="edit-select-top grid_3 " >
                    <option defaultValue=""></option>

                  </select>
                </div>
                <div className="grid_1  ">
                  <p className="cancel-default">สถานี </p>
                </div>
                <div className="grid_2">
                  <select className="edit-select-top grid_2 ">
                    <option defaultValue=""></option>

                  </select>
                </div>
                <button className="button-blue edit grid_1 float-right mr-5" type="button" >ค้นหา</button>
              </div>


              <table className="table-many-column ">
                <thead>
                  <tr>

                    <th className="font" style={{ minWidth: "150px" }}>เลขที่เอกสาร</th>
                    <th className="font" style={{ minWidth: "150px" }}>ชื่องาน</th>
                    <th className="font" style={{ minWidth: "150px" }}>วันเวลาแจ้งขัดข้อง</th>
                    <th className="font" style={{ minWidth: "150px" }}>ผู้นำเข้าระบบ</th>
                    <th className="font" style={{ minWidth: "150px" }}>สถานที่ แขวง/ตอน</th>
                    <th className="font" style={{ minWidth: "150px" }}></th>
                  </tr>
                </thead>
                <tbody>


                  <tr >

                    <td className="edit-padding" style={{ minWidth: "150px", paddingLeft: "50px" }}></td>
                    <td className="edit-padding" style={{ minWidth: "150px" }}></td>
                    <td className="edit-padding" style={{ minWidth: "150px" }}></td>
                    <td className="edit-padding" style={{ minWidth: "150px" }}></td>
                    <td className="edit-padding" style={{ minWidth: "150px" }}></td>
                    <td className="edit-padding" style={{ minWidth: "150px" }}>
                      <button type="button" className="button-blue" >เลือก</button>
                    </td>
                  </tr>


                </tbody>
              </table>


              <div className="grid_12">
                <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modal" id="aria-controls">กลับ</button>
              </div>

            </div>
          </div>
        </div>

        <div className="modal" id="modal2" style={{ display: "none" }}>
          <div className="gray-board">
            <p className="head-title-modal edit">ค้นหาเอกสารอ้างอิง / ใบสั่งงาน</p>
            <div className="container_12 edit-padding">

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">เลขที่เอกสาร:</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" />
                </div>
              </div>

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">สถานที่ แขวง:</p></div>
                <div className="grid_8 pull_0">
                  <select className="edit-select-top grid_3 " >
                    <option defaultValue="0"></option>
                    <option defaultValue="1">Cosmic Cuttlefish</option>
                    <option defaultValue="2">Bionic Beaver</option>
                    <option defaultValue="3">Xenial Xerus</option>
                  </select>
                  <select className="edit-select-top grid_3 float-right" >
                    <option defaultValue="0"></option>
                    <option defaultValue="1">Cosmic Cuttlefish</option>
                    <option defaultValue="2">Bionic Beaver</option>
                    <option defaultValue="3">Xenial Xerus</option>
                  </select>
                  <p className="cancel-default grid_2 float-right">สถานที่ ตอน:</p>
                </div>
              </div>
              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">วันที่เริ่มต้น:</p></div>
                <div className="grid_8 pull_0">
                  <input type="date" className="cancel-default grid_3 "></input>
                  <input type="date" className="cancel-default grid_3 float-right"></input>
                  <p className="cancel-default grid_2 float-right">วันที่สิ้นสุด:</p>
                </div>
                <button className="button-blue edit grid_1 float-right mr-5" type="button">ค้นหา</button>
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
                    <tr>
                      <td className="edit-padding" style={{ minWidth: "150px", paddingLeft: "50px" }}>1123451</td>
                      <td className="edit-padding" style={{ minWidth: "150px" }}>รถไฟ</td>
                      <td className="edit-padding" style={{ minWidth: "150px" }}>14 เมษ 2563</td>
                      <td className="edit-padding" style={{ minWidth: "150px" }}>นาย ก</td>
                      <td className="edit-padding" style={{ minWidth: "150px" }}>บางแค</td>
                      <td className="edit-padding" style={{ minWidth: "150px" }}>
                        <button className="button-blue">เลือก</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid_12 mt-5n">
                <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modal2" id="aria-controls">กลับ</button>
              </div>

            </div>
          </div>
        </div> */}


        <div className="modal" id="modalss101" style={{ display: "none" }}>
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
                            <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectNoDocument(e)} aria-label="Close active modal" aria-controls="modalss101" id="closemodalss101">เลือก</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="grid_12">
                <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalss101" id="closemodalss101">กลับ</button>
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
  onChangeNoDocumentRefAdd: (e) => dispatch(onChangeNoDocumentRefAdd(e)),
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

export const onChangeNoDocumentRefAdd = (e) => {
  return {
    type: "CHANGE NO DOCUMENT REF ADD",
    value: e.target.value
  }
}

