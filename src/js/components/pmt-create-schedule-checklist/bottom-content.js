import React, { useEffect, useState } from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux';

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import TextareaInput from '../common/formik-textarea-input';
import TextInput from '../common/formik-text-input'
import NumberInput from '../common/formik-number-input'
import SelectNoChildrenInput from '../common/formik-select-no-children';
import Label from '../common/form-label'
import PopupModalCheckListLineItem from '../common/popup-modal-checklist'
import TableStatus from '../common/table-status';

import Files from '../common/files2'

import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import { useFormikContext } from 'formik';
import { FACTS } from '../../redux/modules/api/fact.js';

import '../../../css/table.css';

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { fetchPositionPermissionData, changeTheam, checkBooleanForEditHelper } from '../../helper.js'
const BottomContent = (props) => {
  const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
  const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
  const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
  const factPosition = useSelector((state) => ({ ...state.api.fact.position }), shallowEqual);

  const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);
  const factEquipmentGroup = useSelector((state) => ({ ...state.api.fact[FACTS.EQUIPMENT_GROUP] }), shallowEqual);
  const factChecklist = useSelector((state) => ({ ...state.api.fact.checklist }), shallowEqual);
    const factDistricts = useSelector((state) => ({ ...state.api.fact.districts }), shallowEqual);
    const factNodes = useSelector((state) => ({ ...state.api.fact.nodes }), shallowEqual);
    const factStations = useSelector((state) => ({ ...state.api.fact.stations }), shallowEqual);
  const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);

  const checkBooleanForEdit = checkBooleanForEditHelper(values, decoded_token, fact)

  return (
    <>
      {/* THIS MAKES THE BACKGROUND NOT GRAY!! NEEDS TO FIX */}
      <div id={changeTheam() === true ? "" : "blackground-gray"}>
        {/* <div className="container_12 clearfix"> */}
        <div className="container_12 " id={changeTheam() === true ? "blackground-gray" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray" } : {}}>
          {/* General Tab */}
          <div id="general_content" className="tabcontent">

            <div className="grid_12 mt-3" style={{ paddingLeft: "10px" }}>

              {/* === Distict ID === */}
              <div className="grid_1">
                <p className="top-text">แขวง</p>
              </div>
              <div className="grid_5 alpha omega">
                <SelectNoChildrenInput name="location_district_id" disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}>
                  <option value=''></option>
                  {factDistricts.items.map((districts) => (
                      <option key={districts.district_id} value={districts.district_id}>{districts.name}</option>
                  ))}
                </SelectNoChildrenInput>
              </div>
              <div className="clear" />

              <div className="grid_1">
                <p className="top-text">ตอน</p>
              </div>
              <div className="grid_5 alpha omega">
                <SelectNoChildrenInput name="location_node_id" disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}>
                  <option value=''></option>
                  {factNodes.items.map((node) => {
                        if (values.location_district_id == node.district_id) {
                            return <option key={node.node_id} value={node.node_id} selected>{node.name}</option>
                        }
                    })}
                </SelectNoChildrenInput>
              </div>
              <div className="clear" />

              {/* === location === */}
              <div className="grid_1">
                <p className="top-text">สถานี</p>
              </div>
              <div className="grid_5 alpha omega">
                <SelectNoChildrenInput name="location_station_id" disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}>
                  <option value=''></option>
                  {factStations.items.map((stations) => {
                        if (values.location_node_id == stations.node_id) {
                            return <option key={stations.station_id} value={stations.station_id} selected>{stations.name}</option>
                        }
                    })}
                </SelectNoChildrenInput>
              </div>
              <div className="clear" />
            </div>
          </div>

          {/* list_plan Tab */}
          <div id="list_plan_content" className="tabcontent">

            <div className="container_12 mt-3">

              <table className="table-many-column" style={{ padding: "10px" }}>
                <thead>
                  <tr>
                    <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                    <th className="font" style={{ minWidth: "220px" }}>กลุ่มการทำวาระ</th>
                    <th className="font" style={{ minWidth: "220px" }}>ชนิดการทำวาระ</th>
                    <th className="font" style={{ minWidth: "130px" }}>เลขที่สินทรัพย์</th>
                    <th className="font text-center" style={{ minWidth: "80px" }}>จำนวนสถานที่ซ่อมบำรุง</th>
                  </tr>
                </thead>
                <tbody>
                  {[0,1,1,1,1,1,1,1,1].map((x, i) => {
                    console.log("i",i)
                    return (
                    <tr>
                    <th className="edit-padding text-center"></th>
                    <td className="edit-padding">
                      <SelectNoChildrenInput name={`21111${i}`} disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} >
                        <option value=''></option>
                        <option value='กล้อง CCTV'>กล้อง CCTV</option>
                        <option value='คานกั้นถนน'>คานกั้นถนน</option>
                        <option value='งานบำรุงรักษาตามวาระที่สถานี'>งานบำรุงรักษาตามวาระที่สถานี</option>
                      </SelectNoChildrenInput>
                    </td>
                    <td className="edit-padding">
                      <SelectNoChildrenInput name={`1aefsedf${i}`} disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} >
                        <option value=''></option>
                        <option value='ก.0 ชนิดคานทำงานด้วยไฟฟ้า ตรวจสอบด้วยกล้อง'>ก.0 ชนิดคานทำงานด้วยไฟฟ้า ตรวจสอบด้วยกล้อง</option>
                        <option value='ก.1 ชนิดคานทำงานด้วยไฟฟ้า มีพนักงานควบคุม'>ก.1 ชนิดคานทำงานด้วยไฟฟ้า มีพนักงานควบคุม</option>
                        <option value='ก.2 ชนิดม่านยกตรง ทำงานด้วยมือหมุน'>ก.2 ชนิดม่านยกตรง ทำงานด้วยมือหมุน</option>
                        <option value='ก.3 ชนิดเข็นแผง'>ก.3 ชนิดเข็นแผง</option>
                        <option value='ห้องรีเลย์ไฟสี ARI/ไฟสีสายลวด'>ห้องรีเลย์ไฟสี ARI/ไฟสีสายลวด</option>
                        <option value='ห้องรีเลย์ CTC Service (CTS/PABX/SDH/PDH)'>ห้องรีเลย์ CTC Service (CTS/PABX/SDH/PDH)</option>
                        <option value='แผงบรรยายทาง (CBI/IPU/CCTV FOR Level Crossing)'>แผงบรรยายทาง (CBI/IPU/CCTV FOR Level Crossing)</option>
                      </SelectNoChildrenInput>
                    </td>
                    <td className="edit-padding">
                      <TextInput name={`1aefsedfd${i}`}
                        // validate={validateUserEmployeeIDField}
                        disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                        searchable={checkBooleanForEdit === true ? true : toolbar.mode !== TOOLBAR_MODE.SEARCH} ariaControls="modalUserName"
                        tabIndex="2" />
                    </td>
                    <td className="edit-padding text-center">
                      <NumberInput step={0.01} name="minimum_order_quantity" tabIndex="7" cssStyle={{ left: "60px", top: "-5px" }}
                        disabled={values.modeEdit ? false : values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                      />
                    </td>
                  </tr>
                    )
})}
                  
                </tbody>
              </table>


            </div>

          </div>

          {/* Attachment Tab */}
          <div id="attachment_content" className="tabcontent">
            <Files />
          </div>

          <div id="table_status_content" className="tabcontent">
            <TableStatus bodyTableStatus={values.step_approve} />
          </div>

        </div>

        {/* PopUp ค้นหาอะไหล่ */}
        <PopupModalCheckListLineItem />

      </div>
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