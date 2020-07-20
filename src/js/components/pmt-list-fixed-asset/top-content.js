import React, { useEffect } from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux';

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import FormInput from '../common/form-input'
import TextInput from '../common/formik-text-input'
import NumberInput from '../common/formik-number-input';
import SelectNoChildrenInput from '../common/formik-select-no-children';
import PopupModalChecklist from '../common/popup-modal-checklist'

import { useFormikContext, useField } from 'formik';

import { TOOLBAR_MODE, TOOLBAR_ACTIONS, toModeAdd } from '../../redux/modules/toolbar.js';
import {
  getNumberFromEscapedString, fetchGoodsOnhandDataForItemmasterData, DOCUMENT_TYPE_ID,
  getDocumentbyInternalDocumentID, validatedataDocumentField
} from '../../helper';

import { FACTS } from '../../redux/modules/api/fact.js';

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { fetchPositionPermissionData, changeTheam } from '../../helper.js'

const FormTitle = ({ children }) => (
  <h4 className="head-title">{children}</h4>
);

const TopContent = (props) => {
  const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm, resetForm } = useFormikContext();

  const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
  const factDistricts = useSelector((state) => ({ ...state.api.fact.districts }), shallowEqual);
  const factNodes = useSelector((state) => ({ ...state.api.fact.nodes }), shallowEqual);
  const factStations = useSelector((state) => ({ ...state.api.fact.stations }), shallowEqual);

  useEffect(() => {
    const fetchData = () => {
      axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/search?document_type_group_id=205`, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((res) => {
          setFieldValue("list_documents", res.data.results, false);
        })
    };
    fetchData();
  }, [toolbar.mode]);

  return (
    <div id={changeTheam() === true ? "" : "blackground-white"}>
      <div className="container_12 clearfix">
        <section className="container_12 ">
          <FormTitle>รายการทำวาระ</FormTitle>

          <div id={changeTheam() === true ? "blackground-white" : ""}
            style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray", height: "180px", paddingTop: "10px" } : {}}>

            <div className="container_12">

              {/* District ID */}
              <div className="grid_2 omega">
                <p className="top-text">สถานที่ แขวง</p>
              </div>
              <div className="grid_4 alpha omega pull_0">
                <SelectNoChildrenInput name="location_district_id" tabIndex="1">
                  <option value=''></option>
                  {factDistricts.items.map(function ({ district_id, name, division_id }) {
                    return <option value={district_id} key={district_id}> {name} </option>
                  })}
                </SelectNoChildrenInput>
              </div>

              <div className="clear" />

              {/* Node ID */}
              <div className="grid_2 omega">
                <p className="top-text">สถานที่ ตอน</p>
              </div>
              <div className="grid_4 alpha omega pull_0">
                <SelectNoChildrenInput name="location_node_id" tabIndex="2">
                  <option value=''></option>
                  {factNodes.items.map(function ({ node_id, name, district_id }) {
                    if (values.location_district_id == district_id) { // Shallow equality, district ID may be string
                      return <option value={node_id} key={node_id}>{name}</option>
                    }
                  })}
                </SelectNoChildrenInput>
              </div>

              <div className="clear" />

              {/* Station ID */}
              <div className="grid_2 omega">
                <p className="top-text">สถานที่ สถานี</p>
              </div>
              <div className="grid_4 alpha omega pull_0">
                <SelectNoChildrenInput name="location_station_id" tabIndex="3">
                  <option value=''></option>
                  {factStations.items.map(function ({ station_id, name, node_id }) {
                    if (values.location_node_id == node_id) { // Shallow equality, node ID may be string
                      return <option value={station_id} key={station_id}> {name} </option>
                    }
                  })}
                </SelectNoChildrenInput>
              </div>

              <div className="clear" />

              {/* === equipment_status_id_th === */}
              <div className="grid_2 omega">
                <p className="top-text">เดือน</p>
              </div>
              <div className="grid_3 alpha omega pull_0">
                <SelectNoChildrenInput name="mouth_id" tabIndex="4">
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

            </div>

            <div className="container_12">

              {/* === equipment_status_id_th === */}
              <div className="grid_2 omega">
                <p className="top-text">ปี</p>
              </div>
              <div className="grid_3 alpha omega pull_0">
                <SelectNoChildrenInput name="year_id" tabIndex="5">
                  <option value=''></option>
                  {values.year.map(function (year) {
                    return (
                      <option key={year.year_id} value={year.year_id}> {year.year_id} </option>
                    )
                  })}
                </SelectNoChildrenInput>
              </div>

              <div className="grid_1 alpha omega">
                <button type="button" className="button-blue">ค้นหา</button>
              </div>

            </div>

          </div>
        </section>
      </div>
    </div>
  )

}

export default TopContent;