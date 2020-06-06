import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';
import { v4 as uuidv4 } from 'uuid';

import FormInput from '../common/form-input'
import TextInput from '../common/formik-text-input'
import DateTimeInput from '../common/formik-datetime-input'
import DateInput from '../common/formik-date-input'

import { useFormikContext, useField } from 'formik';

// import PopupModalDocument from '../common/popup-modal-document'  เปลี่ยนเป็น MOdal ของ part
import { TOOLBAR_MODE, TOOLBAR_ACTIONS, toModeAdd } from '../../redux/modules/toolbar.js';
import { getEmployeeIDFromUserID, fetchStepApprovalDocumentData, DOCUMENT_TYPE_ID, getDocumentbyInternalDocumentID } from '../../helper';

const FormLabel = ({ children }) => (
  <div className="grid_2">
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
            <div className="grid_6">
              <div className="grid_2 pull_1">
                {/* Select Manual or Auto on  */}
                <select className="edit-select" style={{ marginTop: "0" }} disabled="disabled">
                  <option defaultValue="0">none</option>
                  {/* {props.mode_no_part.map(function (mode_no_part, index) {
                    return (<option key={index} defaultValue={mode_no_part.mode_no}>{mode_no_part.mode_no}</option>)
                  })} */}
                </select>
              </div>
              <div className="grid_3 pull_1">
                <div className="p-search-box cancel-margin">

                  <input type="text" className="p-search-box__input cancel-default"
                  // value={props.no_part} onChange={props.onChangeNoPart} 
                  />
                  <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalPart" aria-controls="modalPart" onClick={props.onClickOpenPopUpNoPart}></i></button>
                </div>
              </div>
            </div>
          </div>

          <div className="container_12">
            <FormLabel>รายละเอียด</FormLabel>
            <div className="grid_2 pull_1"><h1></h1></div>
            <div className="grid_6">
              <div className="grid_3 pull_1">
                <input type="text" className="cancel-default"
                  // defaultValue={props.info_part_show.description} 
                  disabled="disabled"></input>
              </div>
            </div>
          </div>

          <div className="container_12">
            <FormLabel>ชนิดอุปกรณ์</FormLabel>
            <div className="grid_2 pull_1"><h1></h1></div>
            <div className="grid_6">
              <div className="grid_3 pull_1">
                <select className="edit-select" style={{ marginTop: "0" }} disabled="disabled">
                  <option defaultValue="0">none</option>
                  {/* {props.type_part.map(function (type_part, index) {
                    if (props.info_part_show.type === type_part.type)
                      return (<option key={index} defaultValue={type_part.type} selected>{type_part.type}</option>)
                    else return <option key={index} defaultValue={type_part.type}>{type_part.type}</option>
                  })} */}
                </select>
              </div>
            </div>
          </div>

          <div className="container_12">
            <FormLabel>กลุ่มอุปกรณ์</FormLabel>
            <div className="grid_2 pull_1"><h1></h1></div>
            <div className="grid_6">
              <div className="grid_3 pull_1">
                <select className="edit-select" style={{ marginTop: "0" }} disabled="disabled">
                  <option defaultValue="0">none</option>
                  {/* {props.group_part.map(function (group_part, index) {
                    if (props.info_part_show.group === group_part.group)
                      return (<option key={index} defaultValue={group_part.group} selected>{group_part.group}</option>)
                    else return <option key={index} defaultValue={group_part.group}>{group_part.group}</option>
                  })} */}
                </select>
              </div>
            </div>
          </div>

          <div className="container_12">
            <FormLabel>กลุ่มหน่วยนับ</FormLabel>
            <div className="grid_2 pull_1"><h1></h1></div>
            <div className="grid_6">
              <div className="grid_3 pull_1">
                <select className="edit-select" style={{ marginTop: "0" }} disabled="disabled">
                  <option defaultValue="0">none</option>
                  {/* {props.parent_unit_part.map(function (parent_unit_part, index) {
                    if (props.info_part_show.parent_unit_part === parent_unit_part.parent_unit)
                      return (<option key={index} defaultValue={parent_unit_part.parent_unit} selected>{parent_unit_part.parent_unit}</option>)
                    else return <option key={index} defaultValue={parent_unit_part.parent_unit}>{parent_unit_part.parent_unit}</option>
                  })} */}
                </select>
              </div>
            </div>
          </div>
        </section>
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