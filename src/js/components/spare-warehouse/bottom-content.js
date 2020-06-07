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

import '../../../css/table.css';

const BottomContent = (props) => {

  const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm, resetForm } = useFormikContext();

  // For Down File in Attactment by Nuk
  const HandleDownload = () => {
    axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/attachment/1/download/1`,
      { headers: { "x-access-token": localStorage.getItem('token_auth') } })
      .then((response) => {
        console.log("response", response)
        const url = window.URL.createObjectURL(new Blob([response.data]));
        console.log("url", url)
        const link = document.createElement('a');
        console.log("link", link)
        link.href = url;
        link.setAttribute('download', 'Screen Shot 2563-05-28 at 20.11.15.png');
        document.body.appendChild(link);
        link.click();
      }).catch(function (err) {
        console.log(err);
      })
  };

  // const HandleUpLoad = () => {
  //   console.log("<<<<<<")
  //   const data = {
  //     file: values.file
  //   }
  //   axios.post(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/attachment/1`, data,
  //     { headers: { "x-access-token": localStorage.getItem('token_auth') } })
  //     .then((res) => {
  //       console.log("response", res)
  //     }).catch(function (err) {
  //       console.log(err);
  //     })
  // };

  const HandleDeleteFile = () => {
    setFieldValue('file', [], false);
  };

  return (
    <>
      {/* THIS MAKES THE BACKGROUND NOT GRAY!! NEEDS TO FIX */}
      <div id="blackground-gray">
        {/* <div className="container_12 clearfix"> */}
        <div className="container_12 ">
          {/* General Tab */}
          <div id="general_content" className="tabcontent">

            <div className="container_12 mt-2">
              <div className="grid_2"><p className="cancel-default">สถานะคลัง</p></div>
              <div className="grid_4 pull_0">
                <SelectNoChildrenInput name="warehouse_status"
                  disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH}>
                  <option value=''></option>
                  {/* {props.fact[FACTS.ITEM_TYPE].items.map((item_type) => (
                    values.item_type_id === item_type.item_type_id
                      ?
                      <option value={item_type.item_type_id} key={item_type.item_type_id} selected> {item_type.name} </option>
                      :
                      <option value={item_type.item_type_id} key={item_type.item_type_id}> {item_type.name} </option>
                  ))} */}
                </SelectNoChildrenInput>
              </div>
            </div>


            <div className="container_12 mt-2">
              <div className="container_12">
                <div className="grid_2"><p className="cancel-default">สถานที่</p></div>
                <div className="grid_4 pull_0">
                  <TextInput name="location" disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="4" />
                </div>
              </div>

              <div className="container_12">
                <div className="grid_2 cancel-default">
                  <p className="cancel-default">ที่อยู่</p>
                </div>
                <div className="grid_4 pull_0">
                  <TextInput name="address" disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="4" />
                </div>
              </div>

              <div className="container_12">
                <div className="grid_2"><p className="cancel-default">แขวง/ตำบล</p></div>
                <div className="grid_4 pull_0">
                  <SelectNoChildrenInput name="district_id"
                    disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH}>
                    <option value=''></option>
                    {/* {props.fact[FACTS.ITEM_TYPE].items.map((item_type) => (
                    values.item_type_id === item_type.item_type_id
                      ?
                      <option value={item_type.item_type_id} key={item_type.item_type_id} selected> {item_type.name} </option>
                      :
                      <option value={item_type.item_type_id} key={item_type.item_type_id}> {item_type.name} </option>
                  ))} */}
                  </SelectNoChildrenInput>
                </div>
              </div>

              <div className="container_12">
                <div className="grid_2"><p className="cancel-default">เขต/อำเภอ</p></div>
                <div className="grid_4 pull_0">
                  <SelectNoChildrenInput name="county_id"
                    disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH}>
                    <option value=''></option>
                    {/* {props.fact[FACTS.ITEM_TYPE].items.map((item_type) => (
                    values.item_type_id === item_type.item_type_id
                      ?
                      <option value={item_type.item_type_id} key={item_type.item_type_id} selected> {item_type.name} </option>
                      :
                      <option value={item_type.item_type_id} key={item_type.item_type_id}> {item_type.name} </option>
                  ))} */}
                  </SelectNoChildrenInput>
                </div>
              </div>

              <div className="container_12">
                <div className="grid_2"><p className="cancel-default">จังหวัด</p></div>
                <div className="grid_4 pull_0">
                  <SelectNoChildrenInput name="province_id"
                    disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH}>
                    <option value=''></option>
                    {/* {props.fact[FACTS.ITEM_TYPE].items.map((item_type) => (
                    values.item_type_id === item_type.item_type_id
                      ?
                      <option value={item_type.item_type_id} key={item_type.item_type_id} selected> {item_type.name} </option>
                      :
                      <option value={item_type.item_type_id} key={item_type.item_type_id}> {item_type.name} </option>
                  ))} */}
                  </SelectNoChildrenInput>
                </div>
              </div>

              <div className="container_12 mt-1">
                <div className="grid_2 cancel-default">
                  <p className="cancel-default">รหัสไปรษณีย์</p>
                </div>
                <div className="grid_4 pull_0">
                  <NumberInput step={1} name="post_code" tabIndex="7"
                    // validate={quantity => props.validateLineNumberQuatityItemIDField(`line_items[${index}].quantity`, quantity, index)}
                    disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Attachment Tab */}
          <div id="attachment_content" className="tabcontent">
          <Files 
              name="file[0].filename"
              desrciptionFiles={props.actionMode === TOOLBAR_MODE.SEARCH ? values.desrciption_files
              : values.file}
              desrciptionFilesLength={props.actionMode === TOOLBAR_MODE.SEARCH ? values.desrciption_files_length
                : values.file.length}
              disabled={props.actionMode === TOOLBAR_MODE.SEARCH}
              disabledForModeAdd={props.actionMode === TOOLBAR_MODE.ADD}
              // HandleDownload={HandleDownload}
              // HandleDeleteFile={HandleDeleteFile}
            />
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