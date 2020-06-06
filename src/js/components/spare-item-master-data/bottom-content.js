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
            <div className="container_12 mt-3">
              <div className="grid_2 cancel-default">
                <p className="cancel-default">ชื่อย่อหน่วยนับ </p>
              </div>
              <div className="grid_2">
                <SelectNoChildrenInput name="name" disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH}>
                  <option value=''></option>
                  {values.list_uoms.map((list_uoms) => (
                    list_uoms.name === values.name
                      ?
                      <option value={list_uoms.name} key={list_uoms.name} selected> {list_uoms.name} </option>
                      :
                      <option value={list_uoms.name} key={list_uoms.name}> {list_uoms.name} </option>
                  ))}
                </SelectNoChildrenInput>
              </div>

              <div className="float-right">
                <div className="grid_2 cancel-default">
                  <p className="cancel-default float-right">ขั้นต่ำการสั่งซื้อ</p>
                </div>
                <div className="grid_2">
                  <NumberInput step={0.01} name="minimum_order_quantity" tabIndex="7"
                    // validate={quantity => props.validateLineNumberQuatityItemIDField(`line_items[${index}].quantity`, quantity, index)}
                    disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH}
                  />
                </div>
                <div className="grid_1 ml-0 pull_0">
                  <p className="cancel-default"></p>
                </div>
              </div>
            </div>

            <div className="container_12">
              <div className="grid_2 cancel-default">
                <p className="cancel-default">ชื่อหน่วยนับ  </p>
              </div>
              <div className="grid_2">
                <TextInput name='name'
                  // validate={validateInternalItemIDField}
                  disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH}
                  tabIndex="1" />
              </div>

              <div className="float-right">
                <div className="grid_2 cancel-default">
                  <p className="cancel-default float-right">Lead Time</p>
                </div>
                <div className="grid_2">
                  <NumberInput step={1} name="lead_time" tabIndex="7"
                    // validate={quantity => props.validateLineNumberQuatityItemIDField(`line_items[${index}].quantity`, quantity, index)}
                    disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH}
                  />
                </div>
                <div className="grid_1">
                  <p className="cancel-default">วัน </p>
                </div>
              </div>
            </div>

            <div className="container_12">
              <div className="float-right">
                <div className="grid_2 cancel-default">
                  <p className="cancel-default float-right">Tolerance Days</p>
                </div>
                <div className="grid_2">
                  <NumberInput step={1} name="tolerance_time" tabIndex="7"
                    // validate={quantity => props.validateLineNumberQuatityItemIDField(`line_items[${index}].quantity`, quantity, index)}
                    disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH}
                  />
                </div>
                <div className="grid_1">
                  <p className="cancel-default">วัน </p>
                </div>
              </div>
            </div>

            <div className="container_12 mt-3">
              <div className="grid_2 cancel-default">
                <p className="cancel-default">สถานะอะไหล่ </p>
              </div>
              <div className="grid_2">
                <SelectNoChildrenInput name="active" disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH}>
                  <option value=''></option>
                  {values.active === 0
                    ?
                    <>
                      <option value='0' selected>ปิดการใช้งาน</option>
                      <option value='1'>เปิดการใช้งาน</option>
                    </>
                    :
                    <>
                      <option value='0'>ปิดการใช้งาน</option>
                      <option value='1' selected>เปิดการใช้งาน</option>
                    </>
                  }
                </SelectNoChildrenInput>
              </div>
            </div>

            <div className="container_12 mt-3">
              <div className="grid_1"><p className="cancel-default">หมายเหตุ</p></div>
              <div className="grid_11">
                <TextareaInput name="remark" tabIndex="6"
                  disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH}
                />
              </div>
            </div>
          </div>

          {/* Warehouse Tab  */}
          <div id="warehouse_content" className="tabcontent">
            <div className="container_12 mt-3">
              <div className="grid_2 cancel-default">
                <p className="cancel-default" style={{ textDecoration: "underline" }}>จำนวนในคลัง</p>
              </div>
              <div className="grid_2 pull_0"></div>
              <div className="grid_1 ml-0 pull_0"></div>
            </div>

            <div className="container_12">
              <div className="grid_2 cancel-default">
                <p className="cancel-default">จำนวนที่ต้องการ</p>
              </div>
              <div className="grid_2 pull_0">
                <NumberInput step={0.01} name="quantity_required" tabIndex="7"
                  // validate={quantity => props.validateLineNumberQuatityItemIDField(`line_items[${index}].quantity`, quantity, index)}
                  disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH}
                />
              </div>
              <div className="grid_1 ml-0 pull_0"></div>
            </div>

            <div className="container_12">
              <div className="grid_2 cancel-default">
                <p className="cancel-default">จำนวนต่ำสุด</p>
              </div>
              <div className="grid_2 pull_0">
                <NumberInput step={0.01} name="quantity_lowest" tabIndex="7"
                  // validate={quantity => props.validateLineNumberQuatityItemIDField(`line_items[${index}].quantity`, quantity, index)}
                  disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH}
                />
              </div>
              <div className="grid_1 ml-0 pull_0">

              </div>
            </div>

            <div className="container_12">
              <div className="grid_2 cancel-default">
                <p className="cancel-default">จำนวนสูงสุด</p>
              </div>
              <div className="grid_2 pull_0">
                <NumberInput step={0.01} name="quantity_highest" tabIndex="7"
                  // validate={quantity => props.validateLineNumberQuatityItemIDField(`line_items[${index}].quantity`, quantity, index)}
                  disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH}
                />
              </div>
              <div className="grid_3 float-right">
                <SelectNoChildrenInput name="name" disabled>
                  {values.description
                    ?
                    <option value=''></option>
                    :
                    <option value=''>FIFO</option>
                  }
                </SelectNoChildrenInput>
              </div>
              <div className="grid_2 cancel-default float-right">
                <p className="cancel-default float-right">Valuation Method</p>
              </div>
            </div>

            <div className="container_12 mt-1" style={{ paddingRight: "px" }}>
              <table className="table-many-column">
                <thead>
                  <tr>
                    <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                    <th className="font" style={{ minWidth: "130px" }}>เลขที่คลัง</th>
                    <th className="font" style={{ minWidth: "250px" }}>ชื่อคลัง</th>
                    <th className="font text-center" style={{ minWidth: "80px" }}>คงคลัง</th>
                    <th className="font text-center" style={{ minWidth: "80px" }}>รอส่งมอบ</th>
                    <th className="font text-center" style={{ minWidth: "80px" }}>ระหว่างการจัดซื้อ</th>
                    <th className="font text-center" style={{ minWidth: "80px" }}>จำนวนสุทธิ</th>
                    <th className="font blue text-center" style={{ minWidth: "80px" }}>ของเสีย</th>
                    <th className="font blue text-center" style={{ minWidth: "80px" }}>ส่งซ่อม</th>
                    <th className="font blue text-center" style={{ minWidth: "80px" }}>ของเก่าพร้อมใช้งาน</th>
                    <th className="font blue text-center" style={{ minWidth: "80px" }}>ซาก</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {props.table_list_show.map(function (table_list_show, index) {
                    return (
                      <tr>
                        <th className="edit-padding text-center">{index+1}</th>
                        <td className="edit-padding">{table_list_show.no_inventory}</td>
                        <td className="edit-padding">{table_list_show.name_inventory}</td>
                        <td className="edit-padding text-center disable">{table_list_show.stock}</td>
                        <td className="edit-padding text-center disable">{table_list_show.wait_send}</td>
                        <td className="edit-padding text-center disable">{table_list_show.wait_po}</td>
                        <td className="edit-padding text-center disable">{table_list_show.real_stock}</td>
                        <td className="edit-padding text-center blue font-red">{table_list_show.broken}</td>
                        <td className="edit-padding text-center blue">{table_list_show.send_fix}</td>
                        <td className="edit-padding text-center blue">{table_list_show.old_part}</td>
                        <td className="edit-padding text-center blue">{table_list_show.carcass}</td>
                      </tr>
                    )
                  })} */}
                </tbody>
              </table>
            </div>

            <div className="container_12 mt-2" style={{ paddingRight: "px" }}>
              <button type="button" className="button-gray float-right" disabled="disabled">ตั้งเป็นคลังตั้งต้น</button>
            </div>

          </div>

          {/* Attachment Tab */}
          <div id="attachment_content" className="tabcontent">
            {/* <Files /> */}
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