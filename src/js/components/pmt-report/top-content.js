import React, { useEffect } from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux'

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import SelectNoChildrenInput from '../common/formik-select-no-children';

import { useFormikContext } from 'formik';

import { changeTheam } from '../../helper.js'
const TopContent = (props) => {
  const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
  const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);
  const factDistricts = useSelector((state) => ({ ...state.api.fact.districts }), shallowEqual);

  const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues,
    validateField, validateForm, setTouched, setErrors } = useFormikContext();

  useEffect(() => {
    searchGoodsOnHand();
  }, [values.district_id])

  const searchGoodsOnHand = () => new Promise(resolve => {
    // check ว่าเดือน ปี ที่เข้ามาเป็นของ ปัจจุบันหรือไหม
    var new_date = new Date();
    var year_now = new_date.getFullYear();
    var mouth_now = new_date.getMonth() + 1;
    var start_date = values.year_id - 543 + "-" + values.mouth_id + "-1";
    var end_date
    if (values.mouth_id === "12") {
      end_date = values.year_id - 543 + 1 + "-1-1";
    }
    else {
      end_date = values.year_id - 543 + "-" + `${parseInt(values.mouth_id) + 1}` + "-1";
    }
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/pmt/district-checklist?district_id=${values.district_id}&begin_start_on=${start_date}&end_start_on=${end_date}`;
    // &begin_start_on=${start_date}&end_start_on=${end_date}
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
      .then((res) => {
        console.log("res>>>>>", res)
        setFieldValue("line_items", res.data.results, false);
      })
      .catch((err) => { // 404 NOT FOUND  If input Document ID doesn't exists
        console.log("err.response", err.response)
      })
      .finally(() => {
        return resolve()
      });
  });

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
                  <SelectNoChildrenInput name="district_id" tabIndex="20">
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