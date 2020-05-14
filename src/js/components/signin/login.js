import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom'
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import { connect } from 'react-redux'

import '../../../vender/fontawesome-free/css/all.css';
import '../../../css/grid12.css';
import '../../../css/style-signin.css';

import RedHouse from '../../../images/red-house.svg';
import logo from '../../../images/logo.png';

class Login extends Component {

  handleSubmit = event => {
    event.preventDefault();
    console.log("handleSubmit")

    const user = {
      "username": this.props.username,
      // "password": this.state.password
    };
    console.log("user", user)
    var current = this;
    axios.defaults.withCredentials = false;
    axios.post(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/user/login-no-password-not-a-good-idea-remind-to-remove-path`, user)
      .then(res => {
        console.log(res);
        // console.log(res.headers['set-cookies']);
        // console.log(res.headers.get('set-cookie'));
        // res.headers.get('set-cookie')
        // console.log(res.data.token);
        // localStorage.setItem('token_auth', res.data.token)
        // console.log("token_auth", localStorage.getItem('token_auth'))
      }).catch(function (err) {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <div className="container_12 clearfix">
          <div className="grid_12 from-sigin">
            <img alt='some value' src={logo} width="400px" />
            <p className="text-signin">ระบบฐานข้อมูลระบบอาณัติสัญญาณเพื่อวิเคราะห์และวางแผนซ่อมบำรุง</p>
            <p className="text-signin">ฝ่ายการอาณัติสัญญาณและโทรคมนาคม</p>
            <h4 className="head-signin">เข้าสู่ระบบ</h4>

            <form className="from-sigin-input" onSubmit={this.handleSubmit}>
              <label className="input-signin">รหัสพนักงาน</label>
              <input className="cancel-default-signin" type="text" value={this.props.username} onChange={(e) => this.props.onChangeUsername(e)} />
              <label className="input-signin mt-2">รหัสผ่าน</label>
              <input className="cancel-default-signin" type="password" id="exampleInputPassword1" value={this.props.password} onChange={(e) => this.props.onChangePassword(e)} />
              <input type="checkbox" id="checkExample1" ></input>

              <input type="checkbox" id="checkExample2" />
              <label className="alert-signin float-left mt-1 font-signin">จดจำรหัสผ่าน</label>
              <label className="alert-signin float-right mt-1 font-signin" style={{ marginTop: "9px" }}>ลืมรหัสผ่าน ?</label>

              {/* <Link to="/main"><button className="button-red font-signin" type="submit">เข้าสู่ระบบ</button></Link> */}
              <button className="button-red font-signin" type="submit">เข้าสู่ระบบ</button>
            </form>
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
  };
};

const mapDispatchToProps = (dispatch) => ({
  onChangeUsername: (e) => dispatch(onChangeUsername(e)),
  onChangePassword: (e) => dispatch(onChangePassword(e))
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