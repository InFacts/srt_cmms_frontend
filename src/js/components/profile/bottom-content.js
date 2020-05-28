import React from 'react';
import { connect } from 'react-redux'
import Document from '../../../images/document.svg'
import jwt_decode from 'jwt-decode';
import '../../../css/style.css'
import axios from "axios";

import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

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
                        {current.props.working_document_show.map(function (list, index) {
                          return (
                            <tr key={index} id={index}>
                              <td className="edit-padding" style={{ minWidth: "150px" }}>{list.internal_document_id}</td>
                              <td className="edit-padding" style={{ minWidth: "150px" }}>{list.document_type_name}</td>
                              <td className="edit-padding" style={{ minWidth: "150px" }}>{list.created_on}</td>
                              <td className="edit-padding" style={{ minWidth: "150px" }}>{list.is_document_on_going}</td>
                              <td className="edit-padding" style={{ minWidth: "150px" }}>
                                <button type="button" className="button-blue" >รายละเอียด</button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>

                </div>

                <div id="เสร็จสิน" className="subtabcontent">

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

                        {current.props.complete_document_show.map(function (list, index) {
                          return (
                            <tr key={index} id={index}>
                              <td className="edit-padding" style={{ minWidth: "150px" }}>{list.internal_document_id}</td>
                              <td className="edit-padding" style={{ minWidth: "150px" }}>{list.document_type_name}</td>
                              <td className="edit-padding" style={{ minWidth: "150px" }}>{list.created_on}</td>
                              <td className="edit-padding" style={{ minWidth: "150px" }}>{list.is_document_on_going}</td>
                              <td className="edit-padding" style={{ minWidth: "150px" }}>
                                <button type="button" className="button-blue" >รายละเอียด</button>
                              </td>
                            </tr>
                          )
                        })}

                      </tbody>
                    </table>
                  </div>






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
                        <input className="cancel-default " type="text" value={this.props.profile.firstname_th} onChange={(e) => this.props.onChangeName(e)} />
                      </div>
                      <div className="grid_2"><p className="cancel-default float-left">นามสกุล</p></div>
                      <div className="grid_3 pull_0">
                        <input className="cancel-default " type="text" value={this.props.profile.lastname_th} onChange={(e) => this.props.onChangeLastName(e)} />
                      </div>
                    </div>

                    <div className="grid_12">
                      <div className="grid_2"><p className="cancel-default">Email</p></div>
                      <div className="grid_3 pull_0">
                        <input className="cancel-default " type="text" value={this.props.profile.email} onChange={(e) => this.props.onChangeEmail(e)} />
                      </div>
                    </div>


                    <div className="grid_12">
                      {/* 
                      <div className="grid_3">
                        <input className="cancel-default" type="checkbox" id="change" name="change"/>
                        <label className="cancel-default " for="change">เปลี่ยนแปลงรหัสผ่าน</label>
                      </div> */}
                      <div className="grid_2 pull_0 float-right ">
                        <button className="button-blue edit   mr-5" type="button" onClick={(e) => { if (window.confirm('คุณต้องการแก้ไขข้อมูลส่วนตัวหรือไม่')) current.props.onSaveProfile(this.props.profile.firstname_th, this.props.profile.lastname_th, this.props.profile.email, this.props.profile.user_id) }}>บันทึก</button>
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
                        <input className="cancel-default " type="text" value={this.props.pass} onChange={(e) => this.props.onChangePass(e)} />
                      </div>
                    </div>
                    <div className="grid_12">
                      <div className="grid_2"><p className="cancel-default">รหัสผ่านใหม่</p></div>
                      <div className="grid_3 pull_0">
                        <input className="cancel-default " type="text" value={this.props.pass_new} onChange={(e) => this.props.onChangeNewPass(e)} />
                      </div>
                    </div>
                    <div className="grid_12">
                      <div className="grid_2"><p className="cancel-default">ยืนยันรหัสผ่านใหม่</p></div>
                      <div className="grid_3 pull_0">
                        <input className="cancel-default " type="text" value={this.props.pass_con} onChange={(e) => this.props.onChangeConfileNewPass(e)} />
                      </div>
                      <div className="grid_2 pull_0 float-right ">
                        <button className="button-blue edit   mr-5" type="button" onClick={(e) => { if (window.confirm('คุณต้องการแก้ไขรหัสผ่านหรือไม่')) current.props.onSavePass(this.props.pass,this.props.pass_new, this.props.profile.user_id) }}>บันทึก</button>
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
                        <select className="edit-select-top" disabled="disabled">

                          <option> </option>

                        </select>
                      </div>
                    </div>

                    <div className="grid_12">
                      <div className="grid_2"><p className="cancel-default">กอง</p></div>
                      <div className="grid_3 pull_0">
                        <select className="edit-select-top" disabled="disabled">
                          {/* {list.list_uoms.map(function (list_uoms, index) {
                            return <option value={list_uoms.name} key={index}>{list_uoms.name}</option>
                          })} */}
                          <option> </option>
                        </select>
                      </div>
                    </div>

                    <div className="grid_12">
                      <div className="grid_2"><p className="cancel-default">หน่วยงาน/แขวง</p></div>
                      <div className="grid_3 pull_0">
                        <select className="edit-select-top" disabled="disabled" onChange={(e) => this.props.onChangeDepartment(e)}>
                          {/* {this.props.location_document_show != []
                            ?
                            this.props.location_document_show.map(function (location_document_show, index) {
                              if (this.props.department === location_document_show.district_name) {
                                return <option defaultValue={location_document_show.district_name} key={index} selected> {location_document_show.district_name} </option>
                              }
                              else {
                                return <option value={location_document_show.district_name} key={index}> {location_document_show.district_name} </option>
                              }
                            })
                            :
                            <option> </option>
                          } */}
                         
                        </select>
                      </div>
                    </div>

                    <div className="grid_12">
                      <div className="grid_2"><p className="cancel-default">ตอน</p></div>
                      <div className="grid_3 pull_0">
                        <select className="edit-select-top" disabled="disabled">
                          {/* {list.list_uoms.map(function (list_uoms, index) {
                            return <option value={list_uoms.name} key={index}>{list_uoms.name}</option>
                          })} */}
                          <option> </option>
                        </select>
                      </div>
                      <div className="grid_2 pull_0 float-right ">
                        <button className="button-blue edit   mr-5" type="button" disabled="disabled" onClick={(e) => { if (window.confirm('คุณต้องการแก้ไขรหัสผ่านหรือไม่')) current.props.onSaveLocation(this.props.profile.user_id) }}>บันทึก</button>
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

                      {/* {current.props.history_document_show.map(function (list, index) {
                        return (
                          <tr key={index} id={index}>
                            <td className="edit-padding" style={{ minWidth: "150px" }}>{list.created_on}</td>
                            <td className="edit-padding" style={{ minWidth: "150px" }}>{list.document_type_id}</td>
                            <td className="edit-padding" style={{ minWidth: "150px" }}>{list.document_action_type_id}</td>
                            <td className="edit-padding" style={{ minWidth: "150px" }}>{list.created_on}</td>
                            <td className="edit-padding" style={{ minWidth: "150px" }}>
                              <button type="button" className="button-blue" >Actions</button>
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
  profile: state.profile,
  pass: state.pass,
  pass_new: state.pass_new,
  pass_con: state.pass_con,
  working_document_show: state.working_document_show,
  history_document_show: state.history_document_show,
  complete_document_show: state.complete_document_show,
  center: state.center,
  team: state.team,
  department: state.department,
  place: state.place,
  location_document_show: state.location_document_show,
  location_warehouses_show: state.location_warehouses_show,
})

const mapDispatchToProps = (dispatch) => ({
  onChangeName: (e) => dispatch(onChangeName(e)),
  onChangeEmail: (e) => dispatch(onChangeEmail(e)),
  onChangeLastName: (e) => dispatch(onChangeLastName(e)),
  onChangePass: (e) => dispatch(onChangePass(e)),
  onChangeNewPass: (e) => dispatch(onChangeNewPass(e)),
  onChangeConfileNewPass: (e) => dispatch(onChangeConfileNewPass(e)),
  onChangeCenter: (e) => dispatch(onChangeCenter(e)),
  onChangeTeam: (e) => dispatch(onChangeTeam(e)),
  onChangeDepartment: (e) => dispatch(onChangeDepartment(e)),
  onChangePlace: (e) => dispatch(onChangePlace(e)),

  onSaveProfile: (u, p, e, user_id) => dispatch(onSaveProfile(u, p, e, user_id)),
  onSavePass: (o,u, user_id) => dispatch(onSavePass(o,u, user_id)),
  onSaveLocation: (e) => dispatch(onSaveLocation(e)),

})

export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);


export const onChangeName = (e) => {
  return {
    type: "ON CHANGE NAME",
    value: e.target.value
  }
}
export const onChangeEmail = (e) => {
  return {
    type: "ON CHANGE EMAIL",
    value: e.target.value
  }
}
export const onChangeLastName = (e) => {
  return {
    type: "ON CHANGE LAST NAME",
    value: e.target.value
  }
}
export const onChangePass = (e) => {
  return {
    type: "ON CHANGE PASS",
    value: e.target.value
  }
}
export const onChangeNewPass = (e) => {
  return {
    type: "ON CHANGE NEW PASS",
    value: e.target.value
  }
}
export const onChangeConfileNewPass = (e) => {
  return {
    type: "ON CHANGE CONFILE NEW PASS",
    value: e.target.value
  }
}
export const onChangeCenter = (e) => {
  return {
    type: "ON CHANGE CENTER",
    value: e.target.value
  }
}
export const onChangeTeam = (e) => {
  return {
    type: "ON CHANGE TEAM",
    value: e.target.value
  }
}
export const onChangeDepartment = (e) => {
  return {
    type: "ON CHANGE DEPARTMENT",
    value: e.target.value
  }
}
export const onChangePlace = (e) => {
  return {
    type: "ON CHANGE PLACE",
    value: e.target.value
  }
}

export const onSaveProfile = (u, p, e, user_id) => {
  return function (dispatch) {
    return axios.put(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/user/profile`, {
      "firstname_th": u,
      "lastname_th": p,
      "email": e
    }, { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
      return axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/user/profile?user_id=${user_id}`, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((resDoc) => {
          alert("บันทึกข้อมูลสำเร็จ")
          dispatch({
            type: "CLICK SAVE PROFILE",
            value: resDoc.data,
          });
        })
    });
  };
}


export const onSavePass = (o,u, user_id) => {
  return function (dispatch) {
    return axios.put(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/user/profile`, {
      "password_old": o,
      "password_new": u
    }, { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
      return axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/user/profile?user_id=${user_id}`, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((resDoc) => {
          alert("บันทึกข้อมูลสำเร็จ")
          dispatch({
            type: "CLICK SAVE PASS",
            value: resDoc.data,
          });
        })
    });
  };
}

export const onSaveLocation = (e) => {

  // return function (dispatch) {
  //   return axios.put(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/user/profile`, {

  //   }, { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
  //     return axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/user/profile?user_id=${user_id}`, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
  //       .then((resDoc) => {
  //         alert("บันทึกข้อมูลสำเร็จ")
  //         dispatch({
  //           type: "CLICK SAVE LOCATION",
  //           value: resDoc.data,
  //         });
  //       })
  //   });
  // };
  // return {
  //   type: "CLICK SAVE LOCATION",
  //   value: e.target.value
  // }
}

