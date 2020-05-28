import React, { Component } from 'react';
import axios from "axios";
import { Redirect, Link } from 'react-router-dom'
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import { connect } from 'react-redux'

import '../../../vender/fontawesome-free/css/all.css';
import '../../../css/grid12.css';
import '../../../css/style-signin.css';

import RedHouse from '../../../images/red-house.svg';
import logo from '../../../images/logo.png';

class Login extends Component {

  checkMode = () => {
    if (this.props.submitForget === false) {
      return (
        <>
          <h4 className="head-signin">ลืมรหัสผ่าน</h4>
          <form className="from-sigin-input" onSubmit={(e) => this.props.handleSubmit(e, this.props.username)}>
            <label className="input-signin">รหัสพนักงาน</label>
            <input className="cancel-default-signin" type="text" value={this.props.username} onChange={(e) => this.props.onChangeUsername(e)} required />
            <button className="button-red font-signin" type="submit">ยืนยัน</button>
            <Link to="/"><button className="button-red font-signin" type="button">กลับ</button></Link>
          </form>
        </>
      )
    }
    else {
      return (
        <>
          <h4 className="head-signin">ลืมรหัสผ่าน</h4>
          <form className="from-sigin-input">
            <label className="input-signin">รหัสผ่านใหม่ของคุณคือ: {this.props.new_password}</label>
            <Link to="/"><button className="button-red font-signin" type="submit">ไปหน้าเข้าสู้ระบบ</button></Link>
          </form>
        </>
      )
    }
  }

  render() {
    return (
      <div>
        <div className="container_12 clearfix">
          <div className="grid_12 from-sigin">
            <img alt='some value' src={logo} width="400px" />
            <p className="text-signin">ระบบฐานข้อมูลระบบอาณัติสัญญาณเพื่อวิเคราะห์และวางแผนซ่อมบำรุง</p>
            <p className="text-signin">ฝ่ายการอาณัติสัญญาณและโทรคมนาคม</p>
            {this.checkMode()}
          </div>
        </div>

        <div id="red-house2">
          <div className="container_12 clearfix">
            <div className="grid_12 from-red-house">
              <img alt='red house' src={RedHouse} />
            </div>
          </div>
        </div>

        <div id="red-house">
          <div className="container_12 clearfix">
            <div className="grid_12">
            </div>
          </div>
        </div>
      </div>
    )
  };
}

const mapStateToProps = state => {
  return {
    username: state.username,
    password: state.password,
    submitForget: state.submitForget,
    new_password: state.new_password
  };
};

const mapDispatchToProps = (dispatch) => ({
  onChangeUsername: (e) => dispatch(onChangeUsername(e)),
  onChangePassword: (e) => dispatch(onChangePassword(e)),
  handleSubmit: (e, i) => dispatch(handleSubmit(e, i)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);

export const onChangeUsername = (e) => {
  return {
    type: "ON_CHANGE_USERNAME",
    value: e.target.value
  }
}
export const onChangePassword = (e) => {
  return {
    type: "ON_CHANGE_PASSWORD",
    value: e.target.value
  }
}
export const handleSubmit = (e, username) => {
  e.preventDefault();
  const user = {
    "employee_id": username
  };
  console.log("user", user)
  return function (dispatch) {
    return axios.post(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/auth/reset-password`, user).then((res) => {
      console.log(res)
      dispatch({
        type: "SUBMIT",
        value: res.data.generated_password
      });
    });
  };
}