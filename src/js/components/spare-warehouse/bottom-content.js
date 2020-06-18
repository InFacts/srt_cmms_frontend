import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import TextareaInput from '../common/formik-textarea-input';
// import Table from '../common/table'; เปลัี่ยน Table ให้เป็นแบบสำหรับ form นี้
import TextInput from '../common/formik-text-input'
import NumberInput from '../common/formik-number-input'
import SelectNoChildrenInput from '../common/formik-select-no-children';

import Files from '../common/files2'

import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import { useFormikContext } from 'formik';

import PopupModalNoPart from '../common/popup-modal-nopart'

import { FACTS } from '../../redux/modules/api/fact.js';

import '../../../css/table.css';

const BottomContent = (props) => {

  const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm, resetForm } = useFormikContext();

  const validateWarehouseField = (fieldName, name) => {
    if (!name) {
      return 'Required'
    }
    setFieldValue(fieldName, name, false);
  };
  const validateLocationWarehouseIDField = (...args) => validateWarehouseField("location", ...args);
  const validateActionWarehouseIDField = (...args) => validateWarehouseField("active", ...args);

  const validateWarehouseTypeIDField = (...args) => validateWarehouseField("warehouse_type_id", ...args);
  const validateUseCentralWarehouseIDField = (...args) => validateWarehouseField("use_central", ...args);
  return (
    <>
      {/* THIS MAKES THE BACKGROUND NOT GRAY!! NEEDS TO FIX */}
      <div id="blackground-gray">
        {/* <div className="container_12 clearfix"> */}
        <div className="container_12 ">
          {/* General Tab */}
          <div id="general_content" className="tabcontent">

            <div className="container_12 mt-2">
              <div className="grid_2"><p className="cancel-default">สถานะคลัง</p></div> {/* ปิด หรือ เปิด การใช้งาน เป็น boolean */}
              <div className="grid_4 pull_0">
                <SelectNoChildrenInput name="active" validate={validateActionWarehouseIDField} cssStyle={{left: "-240px", top: "10px"}}
                  disabled={values.modeEdit ? false : props.toolbar.mode === TOOLBAR_MODE.SEARCH}>
                  {values.active === 1
                    ?
                    <>
                      <option value=''></option>
                      <option value='0'>ปิดการใช้งาน</option>
                      <option value='1' selected>เปิดการใช้งาน</option>
                    </>
                    :
                    <>
                      <option value=''></option>
                      <option value='0' selected>ปิดการใช้งาน</option>
                      <option value='1'>เปิดการใช้งาน</option>
                    </>}
                </SelectNoChildrenInput>
              </div>
            </div>


            <div className="container_12 mt-2">
              <div className="container_12">
                <div className="grid_2"><p className="cancel-default">ที่อยู่</p></div>
                <div className="grid_4 pull_0">
                  <TextInput name="location" validate={validateLocationWarehouseIDField} disabled={values.modeEdit ? false : props.toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="4" />
                </div>
              </div>

              <div className="container_12">
                <div className="grid_2"><p className="cancel-default">ประเภทคลัง</p></div>
                <div className="grid_4 pull_0">
                  <SelectNoChildrenInput name="warehouse_type_id" validate={validateWarehouseTypeIDField} cssStyle={{left: "-240px", top: "10px"}}
                    disabled={values.modeEdit ? false : props.toolbar.mode === TOOLBAR_MODE.SEARCH}>
                    <option value=''></option>
                    {props.fact[FACTS.WAREHOUSES_TYPE].items.map((warehouse_type) => (
                      values.warehouse_type_id === warehouse_type.warehouse_type_id
                        ?
                        <option value={warehouse_type.warehouse_type_id} key={warehouse_type.warehouse_type_id} selected> {warehouse_type.type} </option>
                        :
                        <option value={warehouse_type.warehouse_type_id} key={warehouse_type.warehouse_type_id}> {warehouse_type.type} </option>
                    ))}
                  </SelectNoChildrenInput>
                </div>
              </div>

              <div className="container_12">
                <div className="grid_2"><p className="cancel-default">กลุ่มคลัง</p></div>
                <div className="grid_4 pull_0">
                  <SelectNoChildrenInput name="use_central"  validate={validateUseCentralWarehouseIDField} cssStyle={{left: "-240px", top: "10px"}}
                    disabled={values.modeEdit ? false : props.toolbar.mode === TOOLBAR_MODE.SEARCH}>
                    {values.use_central === 1
                      ?
                      <>
                        <option value=''></option>
                        <option value='0'>คลังอื่นๆ</option>
                        <option value='1' selected>คลังส่วนกลาง</option>
                      </>
                      :
                      <>
                        <option value=''></option>
                        <option value='0' selected>คลังอื่นๆ</option>
                        <option value='1'>คลังส่วนกลาง</option>
                      </>}

                  </SelectNoChildrenInput>
                </div>
              </div>

            </div>
          </div>

          {/* Attachment Tab */}
          <div id="attachment_content" className="tabcontent">
            <Files />
          </div>
        </div>
      </div>
      {/* </div > */}
    </>
  )
};

const mapStateToProps = (state) => ({
  fact: state.api.fact,
  toolbar: state.toolbar,
  decoded_token: state.token.decoded_token,
})

const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);