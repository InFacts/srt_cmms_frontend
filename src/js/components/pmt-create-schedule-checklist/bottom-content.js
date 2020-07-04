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
import TableStatus from '../common/table-status';

import Files from '../common/files2'

import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import { useFormikContext } from 'formik';
import { FACTS } from '../../redux/modules/api/fact.js';

import '../../../css/table.css';

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { fetchPositionPermissionData, changeTheam, checkBooleanForEditHelper, validatedataDocumentField } from '../../helper.js'
const BottomContent = (props) => {
  const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
  const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
  const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
  const factPosition = useSelector((state) => ({ ...state.api.fact.position }), shallowEqual);
  const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);
  const factChecklist = useSelector((state) => ({ ...state.api.fact.checklist }), shallowEqual);
  const factChecklistCustom = useSelector((state) => ({ ...state.api.fact[FACTS.CHECKLIST_CUSTOM_GROUP] }), shallowEqual);
  const factDistricts = useSelector((state) => ({ ...state.api.fact.districts }), shallowEqual);
  const factUnitMaintenanceLocation = useSelector((state) => ({ ...state.api.fact[FACTS.UNIT_MAINTENANCE_LOCATION] }), shallowEqual);
  const factNodes = useSelector((state) => ({ ...state.api.fact.nodes }), shallowEqual);
  const factStations = useSelector((state) => ({ ...state.api.fact.stations }), shallowEqual);
  const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);

  useEffect(() => {
    console.log(">>>>>>>>>")
    searchLocationEquipment()
  }, [values.station_id]);

const searchLocationEquipment = () => new Promise(resolve => {
  if (toolbar.mode !== TOOLBAR_MODE.SEARCH) {
            const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/fact/equipment-install?location_station_id=${values.station_id}`;
            axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
              .then((res) => {
                console.log("res", res)
                let line_equipments = [];
                res.data.results.map((results) => {
                  line_equipments.push({
                    equipment_id: results.equipment_id,
                    checklist_group_id: results.equipment.equipment_item.equipment_group_id,
                    checklist_id: results.equipment.equipment_item.checklist_id,
                    item_id: results.equipment.item_id,
                    internal_item_id: results.equipment.equipment_item.item.internal_item_id,
                    quantity_location: '',
                    unit_maintenance_location_id: results.equipment.equipment_item.checklist.unit_maintenance_location_id
                  })
                })
                setFieldValue("line_equipment", line_equipments, false);
                return resolve()
              })
              .finally(() => {
                return resolve()
              });
  }
  else {
    return resolve()
  }
  });

  const validateDistrictIDField = (...args) => validatedataDocumentField("district_id", setFieldValue, ...args)
  const validateNodeIDField = (...args) => validatedataDocumentField("node_id", setFieldValue, ...args)
  const validateStationIDField = (...args) => validatedataDocumentField("station_id", setFieldValue, ...args)

  let checkBooleanForEdit = checkBooleanForEditHelper(values, decoded_token, fact);
  // useEffect(() => {
  //   checkBooleanForEdit = false
  //   validateField("internal_document_id")
  // }, [values.internal_document_id])
  
  return (
    <>
      {/* THIS MAKES THE BACKGROUND NOT GRAY!! NEEDS TO FIX */}
      <div id={changeTheam() === true ? "" : "blackground-gray"}>
        {/* <div className="container_12 clearfix"> */}
        <div className="container_12 " id={changeTheam() === true ? "blackground-gray" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray" } : {}}>
          {/* General Tab */}
          <div id="general_content" className="tabcontent">

            <div className="grid_12 mt-3" style={{ paddingLeft: "10px" }}>

              {/* district_id */}
              <div className="grid_1 alpha white-space">
                <p className="top-text">แขวง</p>
              </div>
              <div className="grid_7">
                <SelectNoChildrenInput name="district_id" tabIndex="7"
                validate={validateDistrictIDField}
                cssStyle={{ left: "-480px", top: "14px" }}
                  disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} >
                  <option value=''></option>
                  {factDistricts.items.map((districts) => (
                    <option key={districts.district_id} value={districts.district_id}>{districts.name}</option>
                  ))}
                </SelectNoChildrenInput>
              </div>

              <div class="clear" />

              {/* Node ID */}
              <div className="grid_1 alpha white-space">
                <p className="top-text">ตอน</p>
              </div>
              <div className="grid_7">
                <SelectNoChildrenInput name="node_id" tabIndex="8"
                cssStyle={{ left: "-480px", top: "14px" }}
                validate={validateNodeIDField}
                  disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} >
                  <option value=''></option>
                  {factNodes.items.map((node) => {
                    if (values.district_id == node.district_id) {
                      return <option key={node.node_id} value={node.node_id} selected>{node.name}</option>
                    }
                  })}
                </SelectNoChildrenInput>
              </div>

              <div class="clear" />

              {/* Station ID */}
              <div className="grid_1 alpha white-space">
                <p className="top-text">สถานี</p>
              </div>
              <div className="grid_7">
                <SelectNoChildrenInput name="station_id" tabIndex="9"
                cssStyle={{ left: "-480px", top: "14px" }}
                validate={validateStationIDField}
                  disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} >
                  <option value=''></option>
                  {factStations.items.map((stations) => {
                    if (values.node_id == stations.node_id) {
                      return <option key={stations.station_id} value={stations.station_id} selected>{stations.name}</option>
                    }
                  })}
                </SelectNoChildrenInput>
              </div>

              <div class="clear" />

            </div>
          </div>

          {/* list_plan_custom_content Tab */}
          <div id="list_plan_custom_content" className="tabcontent">

            <div className="container_12 mt-3">

              <table className="table-many-column" style={{ padding: "10px" }}>
                <thead>
                  <tr>
                    <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                    <th className="font" style={{ minWidth: "250px" }}>กลุ่ม</th>
                    <th className="font" style={{ minWidth: "350px" }}>แผน</th>
                    <th className="font text-center" style={{ minWidth: "100px" }}>จำนวนสถานที่ซ่อมบำรุง</th>
                    <th className="font text-center" style={{ minWidth: "150px" }}>หน่วย</th>
                  </tr>
                </thead>
                <tbody>
                  {values.line_custom.map((line_item, index) => {
                    let line_number = index + 1;
                    return (
                      <tr>
                        <th className="edit-padding text-center">{line_number}</th>
                        <td className="edit-padding">
                          <SelectNoChildrenInput name={`line_custom[${index}].checklist_group_id`} 
                          tabIndex={10 + line_number}
                          disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} >
                            <option value=''></option>
                            {factChecklistCustom.items.map((custom_group) => (
                              <option value={custom_group.checklist_group_id} key={custom_group.checklist_group_id}> {custom_group.checklist_group_name} </option>
                            ))}
                          </SelectNoChildrenInput>
                        </td>
                        <td className="edit-padding">
                          <SelectNoChildrenInput name={`line_custom[${index}].checklist_id`} 
                          tabIndex={10 + line_number}
                          disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} >
                            <option value=''></option>
                            {factChecklist.items.map((custom_group) => {
                              if (values.line_custom[index].checklist_group_id == custom_group.checklist_group_id) {
                              return <option value={custom_group.checklist_id} key={custom_group.checklist_id}> {custom_group.checklist_name} </option>
                              }
                          })}
                          </SelectNoChildrenInput>
                        </td>
                        <td className="edit-padding text-center">
                          <NumberInput step={0.01} name={`line_custom[${index}].quantity_location`} 
                          tabIndex={10 + line_number}
                           cssStyle={{ left: "60px", top: "-5px" }}
                            disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                          />
                        </td>
                        <td className="edit-padding">
                          <SelectNoChildrenInput name={`line_custom[${index}].unit_maintenance_location_id`} 
                          tabIndex={10 + line_number}
                          disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} >
                            <option value=''></option>
                            {factUnitMaintenanceLocation.items.map((unit) => (
                              <option value={unit.unit_maintenance_location_id} key={unit.unit_maintenance_location_id}> {unit.unit_type} </option>
                            ))}
                          </SelectNoChildrenInput>
                        </td>
                      </tr>
                    )
                  })}

                </tbody>
              </table>

            </div>

          </div>

          {/* list_plan_equipment_content Tab */}
          <div id="list_plan_equipment_content" className="tabcontent">

            <div className="container_12 mt-3">

              <table className="table-many-column" style={{ padding: "10px" }}>
                <thead>
                  <tr>
                    <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                    <th className="font" style={{ minWidth: "200px" }}>เลขที่สินทรัพย์</th>
                    <th className="font" style={{ minWidth: "400px" }}>แผน</th>
                    <th className="font text-center" style={{ minWidth: "100px" }}>จำนวน</th>
                    <th className="font text-center" style={{ minWidth: "150px" }}>หน่วย</th>
                  </tr>
                </thead>
                <tbody>
                  {values.line_equipment.map((line_item, index) => {
                    let line_number = index + 1;
                    return (
                      <tr>
                        <th className="edit-padding text-center">{line_number}</th>
                        <td className="edit-padding">
                          <TextInput name={`line_equipment[${index}].internal_item_id`} disabled />
                        </td>
                        <td className="edit-padding">
                          <SelectNoChildrenInput name={`line_equipment[${index}].checklist_id`} disabled >
                            <option value=''></option>
                               {factChecklist.items.map((custom_group) => {
                              return <option value={custom_group.checklist_id} key={custom_group.checklist_id}> {custom_group.checklist_name} </option>
                               })}
                          </SelectNoChildrenInput>
                        </td>
                        <td className="edit-padding text-center">
                          <NumberInput step={1} name={`line_equipment[${index}].quantity_location`} disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </td>
                        <td className="edit-padding">
                          <SelectNoChildrenInput name={`line_equipment[${index}].unit_maintenance_location_id`} disabled >
                            <option value=''></option>
                         {factUnitMaintenanceLocation.items.map((unit) => (
                              <option value={unit.unit_maintenance_location_id} key={unit.unit_maintenance_location_id}> {unit.unit_type} </option>
                            ))}
                          </SelectNoChildrenInput>
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