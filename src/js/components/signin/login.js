import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import '../../../vender/fontawesome-free/css/all.css';
import '../../../css/grid12.css';
import '../../../css/style-signin.css';

import RedHouse from '../../../images/red-house.svg';
import logo from '../../../images/logo.png';

class Login extends Component {

  render() {
    return (
      <div>
        <div className="container_12 clearfix">
          <div className="grid_12 from-sigin">
            <img alt='some value' src={logo} width="400px" />
            <p className="text-signin">ระบบฐานข้อมูลระบบอาณัติสัญญาณเพื่อวิเคราะห์และวางแผนซ่อมบำรุง</p>
            <p className="text-signin">ฝ่ายการอาณัติสัญญาณและโทรคมนาคม</p>
            <h4 className="head-signin">เข้าสู่ระบบ</h4>
            <form className="from-sigin-input">
              <label className="input-signin">รหัสพนักงาน</label>
              <input className="cancel-default-signin" type="text" />
              <label className="input-signin mt-2">รหัสผ่าน</label>
              <input className="cancel-default-signin" type="password" id="exampleInputPassword1" />
              <input type="checkbox" id="checkExample1" ></input>

              <input type="checkbox" id="checkExample2" />
              <label className="alert-signin float-left mt-1 font-signin">จดจำรหัสผ่าน</label>
              <label className="alert-signin float-right mt-1 font-signin" style={{ marginTop: "9px" }}>ลืมรหัสผ่าน ?</label>

              <Link to="/main"><button className="button-red font-signin" type="submit">เข้าสู่ระบบ</button></Link>
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

export default Login;
