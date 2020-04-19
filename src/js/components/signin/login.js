import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import header from '../../../images/Header.png';

import logo from '../../../images/logo.png';

class Login extends Component {

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-6" style={{ marginTop: "6rem" }}>
            <div className="font-size-top-tap-content pl-5 pr-5" style={{ textAlign: "center" }}>
              <img alt='some value' src={logo} width="400px" />
              <p className="mb-0">ระบบฐานข้อมูลระบบอาณัติสัญญาณเพื่อวิเคราะห์และวางแผนซ่อมบำรุง</p>
              <p className="mb-0">ฝ่ายการอาณัติสัญญาณและโทรคมนาคม</p>
              <h4 className="mb-0" style={{ paddingTop: "0.5rem" }}>เข้าสู่ระบบ</h4>
              <form style={{ paddingLeft: "5rem", paddingRight: "5rem" }}>
                <label>รหัสพนักงาน</label>
                <input className="mb-1" type="text" />
                <label>รหัสผ่าน</label>
                <input type="text" />
                <div className="row">
                  <div className="col-3">
                    <div className="form-check custom-control custom-checkbox">
                      <input id="remember-me" name="remember" className="custom-control-input" type="checkbox" />
                      <label className="custom-control-label">จดจำรหัสผ่าน</label>
                    </div>
                  </div>
                  <div className="col-3" style={{ textAlign: "right" }}><p className="btn-link">ลืมรหัสผ่าน?</p></div>
                </div>
                <Link to="/main"><button type="submit" className="w-100" style={{ backgroundColor: "#850204", color: "white"}}>เข้าสู่ระบบ</button></Link>
              </form>
            </div>
          </div>
          <div className="col-6" style={{ marginTop: "12rem" }}>
            <div>
              <img alt='some value' src={header} />
            </div>
          </div>
        </div>
      </div>
    )
  };
}

export default Login;
