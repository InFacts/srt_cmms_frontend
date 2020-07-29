import React, { useEffect } from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux'

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';
import { v4 as uuidv4 } from 'uuid';

import TextInput from '../common/formik-text-input'
import SelectNoChildrenInput from '../common/formik-select-no-children';

import { useFormikContext, useField } from 'formik';

import PopupModalInventory from '../common/popup-modal-inventory'
import PopupModalNoPartNoChildren from '../common/popup-modal-nopart-no-children'

import { TOOLBAR_MODE, TOOLBAR_ACTIONS, toModeAdd } from '../../redux/modules/toolbar.js';
import { getEmployeeIDFromUserID, fetchStepApprovalDocumentData, DOCUMENT_TYPE_ID, 
  getNumberFromEscapedString, validatedataDocumentField } from '../../helper';
import { FACTS } from '../../redux/modules/api/fact.js';

import { fetchPositionPermissionData, changeTheam } from '../../helper.js'
const TopContent = (props) => {
  const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
  const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);
  const factDistricts = useSelector((state) => ({ ...state.api.fact.districts }), shallowEqual);

  const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, 
    validateField, validateForm, setTouched, setErrors } = useFormikContext();

  // useEffect(() => {
  //   validateField("src_warehouse_id")
  //   searchGoodsOnHand();
  // }, [decoded_token.has_position, fact.warehouses.items])

  let error;
  function isEmpty1(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }
  const isObject = (obj) =>
    obj !== null && typeof obj === 'object';

  function setNestedObjectValues(
    object,
    value,
    visited = new WeakMap(),
    response = {}
  ) {
    for (let k of Object.keys(object)) {
      const val = object[k];
      if (isObject(val)) {
        if (!visited.get(val)) {
          visited.set(val, true);
          // In order to keep array values consistent for both dot path  and
          // bracket syntax, we need to check if this is an array so that
          // this will output  { friends: [true] } and not { friends: { "0": true } }
          response[k] = Array.isArray(val) ? [] : {};
          setNestedObjectValues(val, value, visited, response[k]);
        }
      } else {
        response[k] = value;
      }
    }

    return response;
  }
  
  const searchGoodsOnHand = () => new Promise(resolve => {
    validateForm()
      .then((err) => {
        console.log("THIS IS ErR I GET ", err, " i dont think it is touched ", touched)
        setTouched(setNestedObjectValues(values, true))
        setErrors(err);
        if (isEmpty1(err)) {
          // check ว่าเดือน ปี ที่เข้ามาเป็นของ ปัจจุบันหรือไหม
          var new_date = new Date();
          var year_now = new_date.getFullYear();
          var mouth_now = new_date.getMonth() + 1;
          var start_date = values.year_id - 543 + "-" + values.mouth_id + "-1";
          var end_date
          if (values.year_id - 543 === year_now && parseInt(values.mouth_id) === mouth_now) {
            if (values.mouth_id === "12") {
              end_date = values.year_id - 543 + 1 + "-1-1";
              console.log(">>>start_date", start_date, "end_date", end_date)
            }
            else {
              end_date = values.year_id - 543 + "-" + `${parseInt(values.mouth_id) + 1}` + "-1";
              console.log("start_date", start_date, "end_date", end_date)
            }
            const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/search?document_type_group_id=205&start_date=${start_date}&end_date=${end_date}`;
            axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
              .then((res) => {
                console.log("res", res)
                setFieldValue("line_items", res.data.results, false);
              })
              .catch((err) => { // 404 NOT FOUND  If input Document ID doesn't exists
                if (props.toolbar.mode === TOOLBAR_MODE.SEARCH) { //If Mode Search, invalid Document ID
                  error = 'Invalid Document ID';
                }//If mode add, ok
              })
              .finally(() => {
                return resolve(error)
              });
          }
          else {
            if (values.mouth_id === "12") {
              end_date = values.year_id - 543 + 1 + "-1-1";
              console.log(">>>start_date", start_date, "end_date", end_date)
            }
            else {
              end_date = values.year_id - 543 + "-" + `${parseInt(values.mouth_id) + 1}` + "-1";
              console.log("start_date", start_date, "end_date", end_date)
            }
            const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/search?document_type_group_id=205&start_date=${start_date}&end_date=${end_date}`;
            axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
              .then((res) => {
                console.log("res", res)
                setFieldValue("line_items", res.data.results, false);
              })
              .catch((err) => { // 404 NOT FOUND  If input Document ID doesn't exists
                if (props.toolbar.mode === TOOLBAR_MODE.SEARCH) { //If Mode Search, invalid Document ID
                  error = 'Invalid Document ID';
                }//If mode add, ok
              })
              .finally(() => {
                return resolve(error)
              });
          }
        }
      })
  });

  const validateDistrict = (...args) => validatedataDocumentField("district_id", setFieldValue, ...args)

  return (
    <>
      <div id={changeTheam() === true ? "" : "blackground-white"}>
        <div className="container_12 clearfix">
          <section className="container_12 ">
            <h4 className="head-title">รายงานแผนงานซ่อมบำรุง</h4>

            <div id={changeTheam() === true ? "blackground-white" : ""} 
            style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray", height: "130px", paddingTop: "10px" } : {}} >

              <div className="container_12">
                <div className="grid_2">
                  <p className="top-text">สถานที่ แขวง</p>
                </div>
                <div className="grid_3 pull_1">
                  <SelectNoChildrenInput name="district_id" validateField={validateDistrict}
                    cssStyle={{ left: "-240px", top: "10px" }} tabIndex="20">
                    <option value=''></option>
                    {factDistricts.items.map(function ({ district_id, name, division_id }) {
                      return <option value={district_id} key={district_id} selected> {name} </option>
                    })}
                  </SelectNoChildrenInput>
                </div>
              </div>

              <div className="container_12">
                {/* drop dawn year */}
                <div className="grid_2">
                  <p className="top-text">ปี</p>
                </div>
                <div className="grid_3 pull_1">
                  <SelectNoChildrenInput name="year_id" cssStyle={{ left: "-160px", top: "10px" }}>
                    <option value=''></option>
                    {values.year.map(function (year) {
                      return (
                        <option key={year.year_id} value={year.year_id}> {year.year_id} </option>
                      )
                    })}
                  </SelectNoChildrenInput>
                </div>
              </div>

              <div className="container_12">
                {/* Drop Dawn month */}
                <div className="grid_2">
                  <p className="top-text">เดือน</p>
                </div>
                <div className="grid_3 pull_1">
                  <SelectNoChildrenInput name="mouth_id"
                    cssStyle={{ left: "-160px", top: "10px" }}>
                    <option value=''></option>
                    {values.mouth.map((mouth) => {
                      var new_date = new Date();
                      var mouth_now = new_date.getMonth() + 1;
                      if (mouth_now === mouth.id) {
                        return <option key={mouth.id} value={mouth.id} selected> {mouth.mouth} </option>
                      } else {
                        return <option key={mouth.id} value={mouth.id}> {mouth.mouth} </option>
                      }
                    })}
                  </SelectNoChildrenInput>
                </div>

                <div className="grid_1 pull_1">
                  <button type="button" className="button-blue"
                   onClick={searchGoodsOnHand}
                  >ค้นหา</button>
                </div>

              </div>

            </div>
          </section>
        </div>
      </div>
    </>

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