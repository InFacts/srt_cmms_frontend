import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import { useFormik, withFormik, useFormikContext } from 'formik';

import RedHouse from '../../../images/red-house.svg';
import Icon from '../../../images/icon-main-module.svg';

import { fetchPositionPermissionData } from '../../helper.js'

const TopContent = (props) => {
  const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);
  // console.log("decoded_token", decoded_token.has_position && decoded_token.has_position[0].position_id)

  const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();

  let module = [];
  useEffect(() => {
      fetchPositionPermissionData(decoded_token.has_position && decoded_token.has_position[0].position_id)
          .then((position_permission) => {
              // console.log("position_permission", position_permission)
              position_permission.map((list_module) => {
                  module.push({
                      position_id: list_module.position_id,
                      name: list_module.name,
                      abbreviation: list_module.abbreviation,
                      module_1: list_module.function.indexOf(1) !== -1,
                      module_2: list_module.function.indexOf(2) !== -1,
                      module_3: list_module.function.indexOf(3) !== -1,
                      module_4: list_module.function.indexOf(4) !== -1,
                  })
              })
              setFieldValue('line_position_permission', module, false);
          })
  }, [decoded_token]);
  console.log("values.line_position_permission",values.line_position_permission)

  return (
    <div>
      <div id="blackground-white" style={{ width: "100vw", height: "100vh" }}>
        <div className="container_12 clearfix">
          <section className="grid_12" style={{ width: "960px" }}>
            <h4 className="head-title" style={{ color: "black" }}>ระบบฐานข้อมูลระบบอาณัติสัญญาณเพื่อวิเคราะห์และวางแผนซ่อมบำรุง</h4>
            <div className="grid_4">
              <Link to={values.line_position_permission.length !== 0 && values.line_position_permission[0].module_1 ? "/main-spare" : "#"}>
                <div className="card p-tooltip--btm-center" aria-describedby="btm-cntr">
                  <div className="image ">
                    <img src={Icon} alt="Generic placeholder thumbnail" />
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
              <Link to={values.line_position_permission.length !== 0 && values.line_position_permission[0].module_2 ? "/main-pmt" : "#"}>
                <div className="card p-tooltip--btm-center" aria-describedby="btm-cntr" >
                  <div className="image ">
                    <img src={Icon} alt="Generic placeholder thumbnail" />
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
              <div className="card p-tooltip--btm-center" aria-describedby="btm-cntr">
                <div className="image ">
                  <img src={Icon} alt="Generic placeholder thumbnail" />
                </div>
                <div className="content ">
                  <div className="card-body">ระบบวิเคราะห์และวางแผนทรัพยากรซ่อมบำรุง</div>
                  <div className="card-footer ">
                    ระบบบริหารข้อมูลอะไหล่สำหรับซ่อมบำรุง
                            </div>
                </div>
                <span className="p-tooltip__message" role="tooltip" id="btm-cntr">ระบบวิเคราะห์และวางแผนทรัพยากรซ่อมบำรุง</span>
              </div>
            </div>
            <div className="grid_4">
              <div className="card p-tooltip--btm-center" aria-describedby="btm-cntr">
                <div className="image ">
                  <img src={Icon} alt="Generic placeholder thumbnail" />
                </div>
                <div className="content ">
                  <Link to={values.line_position_permission.length !== 0 && values.line_position_permission[0].module_4 ? "/track" : "#"}>
                    <div className="card-body">สถานะรอการอนุมัติ</div>
                    <div className="card-footer ">
                      ระบบบริหารข้อมูลอะไหล่สำหรับซ่อมบำรุง
                      </div>
                  </Link>
                </div>
                <span className="p-tooltip__message" role="tooltip" id="btm-cntr">สถานะรอการอนุมัติ</span>
              </div>
            </div>
          </section>
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
}

export default TopContent;
