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
import BgWhite from '../../../images/main/bg_white.jpg';

import { fetchPositionPermissionData, changeTheam } from '../../helper.js'

const TopContent = (props) => {
  const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);
  // console.log("decoded_token", decoded_token.has_position && decoded_token.has_position[0].position_id)

  const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
  console.log("changeTheam", changeTheam())
  let module = [];
  useEffect(() => {
    // fetchPositionPermissionData(decoded_token.has_position && decoded_token.has_position[0].position_id)
    //   .then((position_permission) => {
    //     // console.log("position_permission", position_permission)
    //     position_permission.map((list_module) => {
    //       module.push({
    //         position_id: list_module.position_id,
    //         name: list_module.name,
    //         abbreviation: list_module.abbreviation,
    //         module_1: list_module.function.indexOf(1) !== -1,
    //         module_2: list_module.function.indexOf(2) !== -1,
    //         module_3: list_module.function.indexOf(3) !== -1,
    //         module_4: list_module.function.indexOf(4) !== -1,
    //       })
    //     })
    //     setFieldValue('line_position_permission', module, false);
    //   })
  }, [decoded_token]);
// style={{ width: "100vw", height: "100vh" }}
  return (
    <div style={ changeTheam() === true ? {backgroundImage: `url(${BgWhite})`,  width: "100vw", height: "100vh"} : {} }>
      <div id={changeTheam() === true ? "" : "blackground-white" } style={ changeTheam() === true ? {} : {width: "100vw", height: "100vh"} }>
        <div className="container_12 clearfix" >
          <section className="grid_12" style={{ width: "960px" }}>
            <h4 className="head-title" style={{ color: "black" }}>ระบบฐานข้อมูลระบบอาณัติสัญญาณเพื่อวิเคราะห์และวางแผนซ่อมบำรุง</h4>

            <div className="grid_4">
              {/* <Link to={values.line_position_permission.length !== 0 && values.line_position_permission[0].module_1 ? "/main-spare" : "#"}> */}
              <Link to="/main-spare">
                <div className="card p-tooltip--btm-center" aria-describedby="btm-cntr" style={ changeTheam() === true ? {background: "#EFAAA1", border: "2px solid #E92D13"} : {} }>
                  <div className="image ">
                    <img src={Spare} alt="Generic placeholder thumbnail" width="78px"/>
                  </div>
                  <div className="content ">
                    <div className="card-body">ระบบบริหารข้อมูลอะไหล่</div>
                    <div className="card-footer">ระบบบริหารข้อมูลอะไหล่สำหรับซ่อมบำรุง</div>
                  </div>
                  <span className="p-tooltip__message" role="tooltip" id="btm-cntr">ระบบบริหารข้อมูลอะไหล่</span>
                </div>
              </Link>
            </div>

            <div className="grid_4">
              {/* <Link to={values.line_position_permission.length !== 0 && values.line_position_permission[0].module_2 ? "/main-pmt" : "#"}> */}
              <Link to="/main-pmt">
                <div className="card p-tooltip--btm-center" aria-describedby="btm-cntr" style={ changeTheam() === true ? {background: "#CBECFD", border: "2px solid #00B0F7"} : {}} >
                  <div className="image ">
                    <img src={Pmt} alt="Generic placeholder thumbnail" width="78px"/>
                  </div>
                  <div className="content ">
                    <div className="card-body">ระบบบริหารงานซ่อมบำรุง</div>
                    <div className="card-footer ">
                      ระบบบริหารข้อมูลอะไหล่สำหรับซ่อมบำรุง
                            </div>
                  </div>
                  <span className="p-tooltip__message" role="tooltip" id="btm-cntr">ระบบบริหารงานซ่อมบำรุง</span>
                </div>
              </Link>
            </div>

            <div className="grid_4">
              {/* <Link to={values.line_position_permission.length !== 0 && values.line_position_permission[0].module_2 ? "/main-pmt" : "#"}> */}
              <Link to="/main-als">
                <div className="card p-tooltip--btm-center" aria-describedby="btm-cntr" style={ changeTheam() === true ? {background: "#D3F1A1", border: "2px solid #9CCC11"} : {}} >
                  <div className="image ">
                    <img src={Als} alt="Generic placeholder thumbnail" width="78px" />
                  </div>
                  <div className="content ">
                    <div className="card-body">ระบบวิเคราะห์และวางแผนทรัพยากรซ่อมบำรุง</div>
                    <div className="card-footer ">
                      ระบบบริหารข้อมูลอะไหล่สำหรับซ่อมบำรุง
                    </div>
                  </div>
                  <span className="p-tooltip__message" role="tooltip" id="btm-cntr">ระบบบริหารงานซ่อมบำรุง</span>
                </div>
              </Link>
            </div>

            <div className="grid_4">
            <Link to="/track">
              <div className="card p-tooltip--btm-center" aria-describedby="btm-cntr" style={ changeTheam() === true ? {background: "#F5F8BF", border: "2px solid #FAF700"} : {}}>
                <div className="image ">
                  <img src={Approval} alt="Generic placeholder thumbnail" width="78px"/>
                </div>
                <div className="content ">
                  {/* <Link to={values.line_position_permission.length !== 0 && values.line_position_permission[0].module_4 ? "/track" : "#"}> */}
                    <div className="card-body">สถานะรอการอนุมัติ</div>
                    <div className="card-footer ">
                      ระบบบริหารข้อมูลอะไหล่สำหรับซ่อมบำรุง
                      </div>
                </div>
                <span className="p-tooltip__message" role="tooltip" id="btm-cntr">สถานะรอการอนุมัติ</span>
              </div>
              </Link>
            </div>

            <div className="grid_4">
              <Link to="/main-admin">
                <div className="card p-tooltip--btm-center" aria-describedby="btm-cntr">
                  <div className="image">
                    <img src={Icon} alt="Generic placeholder thumbnail" />
                  </div>
                  <div className="content ">
                    <div className="card-body">บริหารจัดการผู้ใช้งาน</div>
                    <div className="card-footer ">ระบบบริหารข้อมูลอะไหล่สำหรับซ่อมบำรุง</div>
                  </div>
                  <span className="p-tooltip__message" role="tooltip" id="btm-cntr">สถานะรอการอนุมัติ</span>
                </div>
              </Link>
            </div>

            <div className="grid_4">
              <Link to="/approval-flow">
                <div className="card p-tooltip--btm-center" aria-describedby="btm-cntr">
                  <div className="image ">
                    <img src={Icon} alt="Generic placeholder thumbnail" />
                  </div>
                  <div className="content ">
                    <div className="card-body">บริหารจัดการเส้นทางเอกสาร</div>
                    <div className="card-footer ">ระบบบริหารข้อมูลอะไหล่สำหรับซ่อมบำรุง</div>
                  </div>
                  <span className="p-tooltip__message" role="tooltip" id="btm-cntr">สถานะรอการอนุมัติ</span>
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
