import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';
import { v4 as uuidv4 } from 'uuid';

import FormInput from '../common/form-input'
import TextInput from '../common/formik-text-input'
import SelectNoChildrenInput from '../common/formik-select-no-children';

import { useFormikContext, useField } from 'formik';

// import PopupModalDocument from '../common/popup-modal-document'  เปลี่ยนเป็น MOdal ของ part
import { TOOLBAR_MODE, TOOLBAR_ACTIONS, toModeAdd } from '../../redux/modules/toolbar.js';
import { getEmployeeIDFromUserID, fetchStepApprovalDocumentData, DOCUMENT_TYPE_ID, getDocumentbyInternalDocumentID } from '../../helper';

import PopupModalNoPart from '../common/popup-modal-nopart'

const FormLabel = ({ children }) => (
  <div className={`grid_2`}>
    <p className="top-text">{children}</p>
  </div>
);
const FormTitle = ({ children }) => (
  <h4 className="head-title">{children}</h4>
);


// const responseToFormState = (userFact, data) => {
//   return {
//     line_items: data.line_items,
//     remark: data.remark,
//   }
// }

const TopContent = (props) => {
  const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();

  return (
    <div id="blackground-white">
      <div className="container_12 clearfix">
        <section className="container_12 ">
          <FormTitle>ข้อมูลอุปกรณ์</FormTitle>
          <div className="container_12">
            <FormLabel>เลขที่อุปกรณ์</FormLabel>
            <div className="grid_3 pull_1">
              <TextInput name='internal_item_id'
                // validate={validateInternalDocumentIDField}
                searchable={props.toolbar.mode === TOOLBAR_MODE.SEARCH} ariaControls="modalNoPart" tabIndex="1" />
            </div>
            <div className="float-right">
              <div className="grid_3 float-right">
                <SelectNoChildrenInput name="item_type_id" disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH}>
                  <option value=''></option>
                  {/* {factDistricts.items.map(function ({ district_id, name, division_id }) {
                    return <option value={district_id} key={district_id}> {name} </option>
                  })} */}
                </SelectNoChildrenInput>
              </div>
              <div className="grid_2 float-right">
                <p className="top-text float-right">ชนิดอุปกรณ์</p>
              </div>
            </div>
          </div>

          <div className="container_12">
            <FormLabel>รายละเอียด</FormLabel>
            <div className="grid_3 pull_1">
              <TextInput name="description" disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="2" />
            </div>
            <div className="float-right">
              <div className="grid_3 float-right">
                <SelectNoChildrenInput name="item_group_id" disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH}>
                  <option value=''></option>
                  {/* {factDistricts.items.map(function ({ district_id, name, division_id }) {
                    return <option value={district_id} key={district_id}> {name} </option>
                  })} */}
                </SelectNoChildrenInput>
              </div>
              <div className="grid_2 float-right">
                <p className="top-text float-right">กลุ่มอุปกรณ์</p>
              </div>
            </div>
          </div>

          <div className="container_12">
            <div className="float-right">
              <div className="grid_3 float-right">
                <select className="edit-select" style={{ marginTop: "0" }} disabled="disabled">
                  <option defaultValue="0">none</option>
                  {/* {props.info_part_show.parent_unit_part(function (type_part, index) {
                    if (props.info_part_show.type === type_part.type)
                      return (<option key={index} defaultValue={type_part.type} selected>{type_part.type}</option>)
                    else return <option key={index} defaultValue={type_part.type}>{type_part.type}</option>
                  })} */}
                </select>
              </div>
              <div className="grid_2 float-right">
                <p className="top-text float-right">กลุ่มหน่วยนับ</p>
              </div>
            </div>
          </div>
        </section>

        {/* PopUp ค้นหาอะไหล่ */}
        <PopupModalNoPart />
      </div>
    </div>
  )

}
const mapStateToProps = (state) => ({
  fact: state.api.fact,
  toolbar: state.toolbar,
  decoded_token: state.token.decoded_token,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TopContent);