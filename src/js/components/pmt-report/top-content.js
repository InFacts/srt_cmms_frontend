import React, { useState, useEffect } from 'react';
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
  const factUsers = useSelector((state) => ({ ...state.api.fact.users }), shallowEqual);
  const factDistricts = useSelector((state) => ({ ...state.api.fact.districts }), shallowEqual);
  const factNodes = useSelector((state) => ({ ...state.api.fact.nodes }), shallowEqual);
  const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues,
    validateField, validateForm, setTouched, setErrors } = useFormikContext();

  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    let users = factUsers.items;
    let user = users.find(user => `${user.user_id}` === `${decoded_token.id}`);
    console.log("user", user)
    if (user) {
      if (!user.position[0].district_id && !user.position[0].division_id) { //สำหรับ User ที่เป็น node
        let nodes = factNodes.items;
        let node = nodes.find(node => `${node.node_id}` === `${user.position[0].node_id}`);
        // console.log("node", node)
        if (node) {
          console.log("node.district_id>>>", node.district_id)
          setKey("district_id");
          setValue(node.district_id)
        }
      } else if (!user.position[0].node_id && !user.position[0].division_id) { //สำหรับ User ที่เป็น district
        setKey("only_one_district_id");
      } else if (!user.position[0].node_id && !user.position[0].district_id) { //สำหรับ User ที่เป็น division
        let districts = factDistricts.items;
        let district = districts.find(district => `${district.division_id}` === `${user.position[0].division_id}`);
        if (district) {
          setKey("division_id");
          setValue(district.division_id)
        }
      }
    }
  }, [decoded_token.id, factUsers.items, factUsers.items, factDistricts.items, factNodes.items])

  useEffect(() => {
    searchGoodsOnHand();
  }, [values.district_id])

  const searchGoodsOnHand = () => new Promise(resolve => {
    // check ว่าเดือน ปี ที่เข้ามาเป็นของ ปัจจุบันหรือไหม
    if (values.mouth_id.toString().search("10") === 0 || values.mouth_id.toString().search("11") === 0 || values.mouth_id.toString().search("12") === 0) {
      var start_date = values.year_id - 543 + "-" + values.mouth_id + "-01";
    } else {
      var start_date = values.year_id - 543 + "-" + "0" + values.mouth_id.toString() + "-01";
    }
    var end_date
    if (values.mouth_id === "12") {
      end_date = values.year_id - 543 + 1 + "-01-01";
    }
    else {
      // console.log("(parseInt(values.mouth_id) + 1)", (parseInt(values.mouth_id) + 1))
      // end_date = values.year_id - 543 + "-" + `${parseInt(values.mouth_id) + 1}` + "-01";
      if ((parseInt(values.mouth_id) + 1).toString().search("10") === 0 || (parseInt(values.mouth_id) + 1).toString().search("11") === 0 || (parseInt(values.mouth_id) + 1).toString().search("12") === 0) {
        end_date = values.year_id - 543 + "-" + (parseInt(values.mouth_id) + 1) + "-01";
      } else {
        end_date = values.year_id - 543 + "-" + "0" + (parseInt(values.mouth_id) + 1).toString() + "-01";
      }
    }
    console.log("start_date", start_date)
    console.log("end_date", end_date)
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

  // console.log("key>>>", key)
  //         console.log("value>>>", value)

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
                      if (key === "district_id" && district_id === value) {
                        return <option value={district_id} key={district_id}> {name} </option>
                      } else if (key === "only_one_district_id" && district_id === values.district_id) {
                        return <option value={district_id} key={district_id}> {name} </option>
                      } else if (key === "division_id" && division_id === value) {
                        return <option value={district_id} key={district_id}> {name} </option>
                      }
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