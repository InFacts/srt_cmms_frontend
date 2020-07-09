import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import { useFormik, withFormik, useFormikContext } from 'formik';

import RedHouse from '../../../images/red-house.svg';
import Icon from '../../../images/icon-main-module.svg';
import Spare from '../../../images/main/spare.svg';
import Pmt from '../../../images/main/pmt.svg';
import Als from '../../../images/main/als.svg';
import Approval from '../../../images/main/approval.svg';
import UserManagement from '../../../images/main/user-management.svg';
import Flow from '../../../images/main/flow.svg';
import BgWhite from '../../../images/main/bg_white.jpg';
import useFetchPernissionUser from '../../hooks/fetch-permission-user';
import { changeTheam } from '../../helper.js'

const TopContent = (props) => {
  const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);
  // console.log("decoded_token", decoded_token.has_position && decoded_token.has_position[0].position_id)

  const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();

  useFetchPernissionUser();

  return (
    <div style={changeTheam() === true ? { backgroundImage: `url(${BgWhite})`, width: "100vw", height: "100vh" } : {}}>
      <div id={changeTheam() === true ? "" : "blackground-white"} style={changeTheam() === true ? {} : { width: "100vw", height: "100vh" }}>
        <div className="container_12 clearfix" >
          <section className="grid_12" style={{ width: "960px" }}>
            <h4 className="head-title" style={{ color: "black" }}>ระบบฐานข้อมูลระบบอาณัติสัญญาณเพื่อวิเคราะห์และวางแผนซ่อมบำรุง</h4>

            <div className="grid_4">
              <Link to={values.line_position_permission.length !== 0 && values.line_position_permission[0].module_spare ? "/main-spare" : "#"}>
                <div className="card p-tooltip--btm-center" aria-describedby="btm-cntr" 
                style={changeTheam() === true
                  ?
                  values.line_position_permission.length !== 0 && values.line_position_permission[0].module_spare === true
                    ?
                    { background: "#EFAAA1", border: "2px solid #E92D13" }
                    :
                    { background: "gray" }
                  :
                  {}} >
                  <div className="image ">
                    <img src={Spare} alt="Generic placeholder thumbnail" width="78px" />
                  </div>
                  <div className="content ">
                    <div className="card-body">ระบบบริหารข้อมูลอะไหล่</div>
                    <div className="card-footer">ระบบบริหารข้อมูลอะไหล่สำหรับซ่อมบำรุง</div>
                  </div>
                  <span className="p-tooltip__message edit_p_tooltip__message" role="tooltip" id="btm-cntr">SPARE</span>
                </div>
              </Link>
            </div>

            <div className="grid_4">
              <Link to={values.line_position_permission.length !== 0 && values.line_position_permission[0].module_pmt ? "/main-pmt" : "#"}>
                <div className="card p-tooltip--btm-center" aria-describedby="btm-cntr" 
                style={changeTheam() === true
                  ?
                  values.line_position_permission.length !== 0 && values.line_position_permission[0].module_pmt === true
                    ?
                    { background: "#CBECFD", border: "2px solid #00B0F7" }
                    :
                    { background: "gray" }
                  :
                  {}} >
                  <div className="image ">
                    <img src={Pmt} alt="Generic placeholder thumbnail" width="78px" />
                  </div>
                  <div className="content ">
                    <div className="card-body">ระบบบริหารงานซ่อมบำรุง</div>
                    <div className="card-footer ">
                      ระบบบริหารข้อมูลอะไหล่สำหรับซ่อมบำรุง
                            </div>
                  </div>
                  <span className="p-tooltip__message edit_p_tooltip__message" role="tooltip" id="btm-cntr">PMT</span>
                </div>
              </Link>
            </div>

            <div className="grid_4">
              <Link to={values.line_position_permission.length !== 0 && values.line_position_permission[0].module_als ? "/main-als" : "#"}>
                <div className="card p-tooltip--btm-center" aria-describedby="btm-cntr"
                  style={changeTheam() === true
                    ?
                    values.line_position_permission.length !== 0 && values.line_position_permission[0].module_als === true
                      ?
                      { background: "#D3F1A1", border: "2px solid #9CCC11" }
                      :
                      { background: "gray" }
                    :
                    {}}>
                  <div className="image ">
                    <img src={Als} alt="Generic placeholder thumbnail" width="78px" />
                  </div>
                  <div className="content ">
                    <div className="card-body">ระบบวิเคราะห์และวางแผนทรัพยากรซ่อมบำรุง</div>
                    <div className="card-footer ">
                      ระบบบริหารข้อมูลอะไหล่สำหรับซ่อมบำรุง
                    </div>
                  </div>
                  <span className="p-tooltip__message edit_p_tooltip__message" role="tooltip" id="btm-cntr">ALS</span>
                </div>
              </Link>
            </div>

            <div className="grid_4">
              <Link to={values.line_position_permission.length !== 0 && values.line_position_permission[0].module_track_document ? "/track" : "#"}>
                <div className="card p-tooltip--btm-center" aria-describedby="btm-cntr"
                  style={changeTheam() === true
                    ?
                    values.line_position_permission.length !== 0 && values.line_position_permission[0].module_track_document === true
                      ?
                      { background: "#F5F8BF", border: "2px solid #FAF700" }
                      :
                      { background: "gray" }
                    :
                    {}}>
                  <div className="image ">
                    <img src={Approval} alt="Generic placeholder thumbnail" width="78px" />
                  </div>
                  <div className="content ">
                    <div className="card-body">สถานะรอการอนุมัติ</div>
                    <div className="card-footer ">
                      ระบบบริหารข้อมูลอะไหล่สำหรับซ่อมบำรุง
                      </div>
                  </div>
                  <span className="p-tooltip__message edit_p_tooltip__message" role="tooltip" id="btm-cntr">สถานะรอการอนุมัติ</span>
                </div>
              </Link>
            </div>

            <div className="grid_4">
              <Link to={values.line_position_permission.length !== 0 && values.line_position_permission[0].module_admin ? "/main-admin" : "#"}>
                <div className="card p-tooltip--btm-center" aria-describedby="btm-cntr"
                 style={changeTheam() === true
                  ?
                  values.line_position_permission.length !== 0 && values.line_position_permission[0].module_admin === true
                    ?
                    { background: "#CBB0E9", border: "2px solid #652D90" }
                    :
                    { background: "gray" }
                  :
                  {}}>
                  <div className="image">
                    <img src={UserManagement} alt="Generic placeholder thumbnail" />
                  </div>
                  <div className="content ">
                    <div className="card-body">บริหารจัดการผู้ใช้งาน</div>
                    <div className="card-footer ">ระบบบริหารข้อมูลอะไหล่สำหรับซ่อมบำรุง</div>
                  </div>
                  <span className="p-tooltip__message edit_p_tooltip__message" role="tooltip" id="btm-cntr">สถานะรอการอนุมัติ</span>
                </div>
              </Link>
            </div>

            <div className="grid_4">
              <Link to="/approval-flow">
                <div className="card p-tooltip--btm-center" aria-describedby="btm-cntr"
                style={changeTheam() === true
                    ?
                    { background: "#F8CFDC", border: "2px solid #ED145B" }
                    :
                    { background: "gray" }
                }>
                  <div className="image ">
                    <img src={Flow} width="65px" alt="Generic placeholder thumbnail" />
                  </div>
                  <div className="content ">
                    <div className="card-body">บริหารจัดการเส้นทางเอกสาร</div>
                    <div className="card-footer ">ระบบบริหารข้อมูลอะไหล่สำหรับซ่อมบำรุง</div>
                  </div>
                  <span className="p-tooltip__message edit_p_tooltip__message" role="tooltip" id="btm-cntr">สถานะรอการอนุมัติ</span>
                </div>
              </Link>
            </div>

          </section>
        </div>
      </div>
      {/* <div id="red-house2">
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
      </div> */}
    </div>
  )
}

export default TopContent;
