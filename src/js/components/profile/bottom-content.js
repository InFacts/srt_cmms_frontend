import React from 'react';
import { connect } from 'react-redux'
import Document from '../../../images/document.svg'

import '../../../css/style.css'

class BottomContent extends React.Component {
  componentDidMount() {
    document.getElementById("subDefaultOpen").click();
  }

  subTapChange(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("subtabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("subtablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  render() {
    let current = this;
    return (
      <form>
        <div id="blackground-gray">
          <div className="container_12 clearfix">
            <div className="grid_12 ">
              <div id="เอกสารราชการ" className="tabcontent">
                <h3 className="head-title-bottom mt-2">เอกสารราชการ</h3>
                <div className="grid_12">
                  <div className="tab grid_11">
                    <button type="button" id="subDefaultOpen" className="subtablinks" onClick={e => this.subTapChange(e, "กำลังดำเนินการ")}>กำลังดำเนินการ</button>
                    <button type="button" className="subtablinks" onClick={e => this.subTapChange(e, "เสร็จสิน")}>เสร็จสิน</button>
                  </div>
                </div>

                <div id="กำลังดำเนินการ" className="subtabcontent">
                  <div className="grid_12">
                    <table className="table-many-column mt-3">
                      <thead>
                        <tr>
                          <th className="font" style={{ minWidth: "150px" }}>เลขที่เอกสาร</th>
                          <th className="font" style={{ minWidth: "150px" }}>ประเภทเอกสาร</th>
                          <th className="font" style={{ minWidth: "150px" }}>วันที่</th>
                          <th className="font" style={{ minWidth: "150px" }}>สถานะเอกสาร Actions</th>
                          <th className="font" style={{ minWidth: "150px" }}>รายละเอียด</th>
                        </tr>
                      </thead>
                      <tbody>

                        {/* {current.props.track_document_popup.map(function (track_document_popup, index) {
                        return (
                          <tr key={index} id={index}>

                            <td className="edit-padding" style={{ minWidth: "150px", paddingLeft: "50px" }}>{track_document_popup.date_start}</td>
                            <td className="edit-padding" style={{ minWidth: "150px" }}>{track_document_popup.no_track_document}</td>
                            <td className="edit-padding" style={{ minWidth: "150px" }}>{track_document_popup.type_document} </td>
                            <td className="edit-padding" style={{ minWidth: "150px" }}>{track_document_popup.job_document}</td>
                            <td className="edit-padding" style={{ minWidth: "150px" }}>{track_document_popup.create_name}</td>
                            <td className="edit-padding" style={{ minWidth: "150px" }}>{track_document_popup.status_document}</td>
                            <td className="edit-padding" style={{ minWidth: "150px" }}>
                              <button type="button" className="button-blue" >รายละเอียด</button>
                            </td>
                          </tr>
                        )
                      })} */}

                      </tbody>
                    </table>
                  </div>

                </div>

                <div id="เสร็จสิน" className="subtabcontent">


                </div>


              </div>






              <div id="ข้อมูลผู้ใช้งาน" className="tabcontent">
                <h3 className="head-title-bottom mt-2">ข้อมูลบัญชีผู้ใช้</h3>

                <div class="card-profile">
                  <div class="card-profile-header">ข้อมูลส่วนตัว</div>
                  <div class="card-profile-main">

                    <div className="grid_12">
                      <div className="grid_2"><p className="cancel-default">ชื่อ</p></div>
                      <div className="grid_3 pull_0">
                        <input className="cancel-default " type="text" />
                      </div>
                      <div className="grid_2"><p className="cancel-default float-left">นามสกุล</p></div>
                      <div className="grid_3 pull_0">
                        <input className="cancel-default " type="text" />
                      </div>
                    </div>

                    <div className="grid_12">
                      <div className="grid_2"><p className="cancel-default">Email</p></div>
                      <div className="grid_3 pull_0">
                        <input className="cancel-default " type="text" />
                      </div>
                    </div>


                    <div className="grid_12">

                      <div className="grid_3">
                        <input className="cancel-default" type="checkbox" id="change" name="change"/>
                        <label className="cancel-default " for="change">เปลี่ยนแปลงรหัสผ่าน</label>
                      </div>
                        <div className="grid_2 pull_0 float-right ">
                          <button className="button-blue edit   mr-5" type="button">บันทึก</button>
                        </div>
                      </div>



                    </div>
                  </div>

                  <div class="card-profile">
                    <div class="card-profile-header">แก้ไขรหัสผ่าน</div>
                    <div class="card-profile-main">

                      <div className="grid_12">
                        <div className="grid_2"><p className="cancel-default">รหัสผ่านเก่า</p></div>
                        <div className="grid_3 pull_0">
                          <input className="cancel-default " type="text" />
                        </div>
                      </div>
                      <div className="grid_12">
                        <div className="grid_2"><p className="cancel-default">รหัสผ่านใหม่</p></div>
                        <div className="grid_3 pull_0">
                          <input className="cancel-default " type="text" />
                        </div>
                      </div>
                      <div className="grid_12">
                        <div className="grid_2"><p className="cancel-default">ยืนยันรหัสผ่านใหม่</p></div>
                        <div className="grid_3 pull_0">
                          <input className="cancel-default " type="text" />
                        </div>
                        <div className="grid_2 pull_0 float-right ">
                          <button className="button-blue edit   mr-5" type="button">บันทึก</button>
                        </div>
                      </div>


                    </div>
                  </div>


                  <div class="card-profile">
                    <div class="card-profile-header">ตำแหน่งงาน</div>
                    <div class="card-profile-main">

                      <div className="grid_12">
                        <div className="grid_2"><p className="cancel-default">ศูนย์</p></div>
                        <div className="grid_3 pull_0">
                          <select className="edit-select-top">

                          </select>
                        </div>
                      </div>

                      <div className="grid_12">
                        <div className="grid_2"><p className="cancel-default">กอง</p></div>
                        <div className="grid_3 pull_0">
                          <select className="edit-select-top">

                          </select>
                        </div>
                      </div>

                      <div className="grid_12">
                        <div className="grid_2"><p className="cancel-default">หน่วยงาน/แขวง</p></div>
                        <div className="grid_3 pull_0">
                          <select className="edit-select-top">

                          </select>
                        </div>
                      </div>

                      <div className="grid_12">
                        <div className="grid_2"><p className="cancel-default">ตอน</p></div>
                        <div className="grid_3 pull_0">
                          <select className="edit-select-top">

                          </select>
                        </div>
                        <div className="grid_2 pull_0 float-right ">
                          <button className="button-blue edit   mr-5" type="button">บันทึก</button>
                        </div>
                      </div>


                    </div>
                  </div>


                </div>

                <div id="ประวัติการใช้งาน" className="tabcontent">
                  <h3 className="head-title-bottom mt-2">ประวัติการใช้งาน</h3>
                  <div className="grid_12">
                    <table className="table-many-column mt-3">
                      <thead>
                        <tr>
                          <th className="font" style={{ minWidth: "150px" }}>วันเวลา</th>
                          <th className="font" style={{ minWidth: "150px" }}>ประเภทของเอกสาร</th>
                          <th className="font" style={{ minWidth: "150px" }}>ประเภทของ Actions</th>
                          <th className="font" style={{ minWidth: "150px" }}>ข้อมูลที่เปลี่ยนแปลง</th>
                          <th className="font" style={{ minWidth: "150px" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>

                        {/* {current.props.track_document_popup.map(function (track_document_popup, index) {
                        return (
                          <tr key={index} id={index}>

                            <td className="edit-padding" style={{ minWidth: "150px", paddingLeft: "50px" }}>{track_document_popup.date_start}</td>
                            <td className="edit-padding" style={{ minWidth: "150px" }}>{track_document_popup.no_track_document}</td>
                            <td className="edit-padding" style={{ minWidth: "150px" }}>{track_document_popup.type_document} </td>
                            <td className="edit-padding" style={{ minWidth: "150px" }}>{track_document_popup.job_document}</td>
                            <td className="edit-padding" style={{ minWidth: "150px" }}>{track_document_popup.create_name}</td>
                            <td className="edit-padding" style={{ minWidth: "150px" }}>{track_document_popup.status_document}</td>
                            <td className="edit-padding" style={{ minWidth: "150px" }}>
                              <button type="button" className="button-blue" >รายละเอียด</button>
                            </td>
                          </tr>
                        )
                      })} */}

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </form>
    )
  };
}



const mapStateToProps = (state) => ({

        })

const mapDispatchToProps = (dispatch) => ({

        })

export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);