import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Link, Redirect } from 'react-router-dom'
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import '../../../vender/fontawesome-free/css/all.css';
import '../../../css/style-signin.css';

import RedHouse from '../../../images/red-house.svg';
import logo from '../../../images/logo.png';

const Login = (props) => {
  const [login, setLogin] = useState(false)
  const [checkIdPassword, setCheckIdPasswordLogin] = useState(true)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = event => {
    event.preventDefault();

    const user = {"username": username, "password": password};
    console.log("user", user)

    axios.post(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/auth/login`, user)
      .then(res => {
        console.log(res);
        localStorage.setItem('token_auth', res.data.token)
        setLogin(true);
      }).catch(function (err) {
        console.log("err", err)
        setCheckIdPasswordLogin(false);
      })
  }

  if (login === true) {
    return <Redirect to='/main' />
  }
  return (
    <div>
      <div className="container_12 clearfix">
        <div className="grid_12 from-sigin">
          <img alt='some value' src={logo} width="400px" />
          <p className="text-signin">ระบบฐานข้อมูลระบบอาณัติสัญญาณเพื่อวิเคราะห์และวางแผนซ่อมบำรุง</p>
          <p className="text-signin">ฝ่ายการอาณัติสัญญาณและโทรคมนาคม</p>
          <h4 className="head-signin">เข้าสู่ระบบ</h4>

          <form className="from-sigin-input" onSubmit={handleSubmit}>
            <label className="input-signin">ชื่อผู้ใช้</label>
            <input className="cancel-default-signin" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
            <label className="input-signin mt-2">รหัสผ่าน</label>
            <input className="cancel-default-signin" type="password" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            {checkIdPassword === false && <label className="float-left alert_error_input">ชื่อผู้ใช้งาน หรือรหัสผ่านไม่ถูกต้อง</label>}
            <Link to="forgot-password"><label className="alert-signin float-right mt-1 font-signin" style={{ marginTop: "9px" }}>ลืมรหัสผ่าน ?</label></Link>
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

export default Login;