import React, { useEffect } from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux';

import FormInput from '../common/form-input'
import TextInput from '../common/formik-text-input'
import SelectNoChildrenInput from '../common/formik-select-no-children';
import PopupModalEquipmentNoChildren from '../common/popup-modal-equipment-no-children'

import { useFormikContext, useField } from 'formik';

import { TOOLBAR_MODE, TOOLBAR_ACTIONS, toModeAdd } from '../../redux/modules/toolbar.js';
import { getNumberFromEscapedString, fetchGoodsOnhandDataForItemmasterData, DOCUMENT_TYPE_ID, getDocumentbyInternalDocumentID } from '../../helper';

import { FACTS } from '../../redux/modules/api/fact.js';

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { fetchPositionPermissionData, changeTheam } from '../../helper.js'
const FormLabel = ({ children }) => (
  <div className={`grid_2`}>
    <p className="top-text">{children}</p>
  </div>
);
const FormTitle = ({ children }) => (
  <h4 className="head-title">{children}</h4>
);

const TopContent = (props) => {
  const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm, resetForm } = useFormikContext();
  const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
  const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
  const factEquipment = useSelector((state) => ({ ...state.api.fact.equipment }), shallowEqual);
  const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);
  const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);
  const factEquipmentStatus = useSelector((state) => ({ ...state.api.fact[FACTS.EQUIPMENT_STATUS] }), shallowEqual);

  return (
    <div id={changeTheam() === true ? "" : "blackground-white"}>
      <div className="container_12 clearfix">
        <section className="container_12 ">
          <FormTitle>สร้างวาระ</FormTitle>

          <div id={changeTheam() === true ? "blackground-white" : ""}
            style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray", height: "180px", paddingTop: "10px" } : {}}>

            <div className="container_12" >
              <div className="grid_2 omega">
                <p className="top-text">แผนซ่อมบำรุง</p>
              </div>
              <div className="grid_3 alpha omega pull_0">
                <TextInput name='internal_item_id'
                  searchable={toolbar.mode === TOOLBAR_MODE.SEARCH} ariaControls="modalNoPart" tabIndex="1" />
              </div>

            </div>

            <div className="container_12">

              {/* === equipment_status_id_th === */}
              <div className="grid_2 omega">
                <p className="top-text">สถานะการใช้งาน</p>
              </div>
              <div className="grid_3 alpha omega pull_0">
                <SelectNoChildrenInput name="equipment_status_id" disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} >
                  <option value=''></option>
                  <option value=''>เปิดการใช้งาน</option>
                  <option value=''>ปิดการใช้งาน</option>
                </SelectNoChildrenInput>
              </div>

            </div>

            <div className="container_12">

              {/* === equipment_status_id_th === */}
              <div className="grid_2 omega">
                <p className="top-text">กลุ่มการทำวาระ</p>
              </div>
              <div className="grid_3 alpha omega pull_0">
                <SelectNoChildrenInput name="equipment_status_id" disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} >
                  <option value=''></option>
                  <option value=''>Equipment</option>
                  <option value=''>Custom</option>
                </SelectNoChildrenInput>
              </div>

            </div>

            <div className="container_12">

              {/* === equipment_status_id_th === */}
              <div className="grid_2 omega">
                <p className="top-text">ชนิดการทำวาระ</p>
              </div>
              <div className="grid_3 alpha omega pull_0">
                <SelectNoChildrenInput name="equipment_status_id" disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} >
                  <option value=''></option>
                  <option value=''>CCTV</option>
                  <option value=''>PA</option>
                </SelectNoChildrenInput>
              </div>

            </div>

            <div className="container_12">

              <div className="grid_2">
                <p className="top-text">ความถี่การซ่อมบำรุง</p>
              </div>
              <div className="grid_3 alpha omega pull_0">
                <TextInput name='internal_item_id'
                  searchable={toolbar.mode === TOOLBAR_MODE.SEARCH} ariaControls="modalNoPart" tabIndex="1" />
              </div>
              <div className="grid_1 omega pull_0">
                <p className="top-text">ครั้งต่อ</p>
              </div>
              <div className="grid_2 alpha omega pull_0">
                <SelectNoChildrenInput name="item_type_id" disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}>
                  <option value=''></option>
                </SelectNoChildrenInput>
              </div>

            </div>

          </div>

        </section>

        {/* PopUp ค้นหาอะไหล่ */}
        <PopupModalEquipmentNoChildren />
      </div>
    </div>
  )

}

export default TopContent;