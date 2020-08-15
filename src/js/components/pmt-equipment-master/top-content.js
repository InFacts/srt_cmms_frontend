import React, { useEffect } from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux';

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import TextInput from '../common/formik-text-input'
import DateInput from '../common/formik-date-input'
import SelectNoChildrenInput from '../common/formik-select-no-children';
import PopupModalEquipmentNoChildren from '../common/popup-modal-equipment-no-children'

import { useFormikContext, useField } from 'formik';

import { TOOLBAR_MODE, TOOLBAR_ACTIONS, toModeAdd } from '../../redux/modules/toolbar.js';
import { changeTheam } from '../../helper';
import useFetchPernissionUser from '../../hooks/fetch-permission-user';

import { FACTS } from '../../redux/modules/api/fact.js';

const FormLabel = ({ children }) => (
  <div className={`grid_2`}>
    <p className="top-text">{children}</p>
  </div>
);
const FormTitle = ({ children }) => (
  <h4 className="head-title">{children}</h4>
);

const TopContent = (props) => {
  const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm, resetForm } = useFormikContext();
  const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
  const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
  const factEquipment = useSelector((state) => ({ ...state.api.fact.equipment }), shallowEqual);
  const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);
  const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);
  const factItemStatus = useSelector((state) => ({ ...state.api.fact[FACTS.ITEM_STATUS] }), shallowEqual);
  const factChecklist = useSelector((state) => ({ ...state.api.fact.checklist }), shallowEqual);

  const responseToFormState = (data) => {
    console.log("data>>>>", data)
    let fact_checklists = factChecklist.items;
    let fact_checklist = fact_checklists.find(factChecklist => `${factChecklist.checklist_id}` === `${data.equipment_group.checklist_id}`); // Returns undefined if not found
    // if (fact_checklist) {
    return {
      item_id: data.item_id,
      internal_item_id: data.equipment_group.item.internal_item_id,
      description: data.equipment_group.item.description,
      item_group_id: data.equipment_group.item.item_group_id,
      checklist_group_id: fact_checklist ? fact_checklist.checklist_group_id : "",
      checklist_id: data.equipment_group.checklist_id,
      equipment_group_id: data.equipment_group.equipment_group_id,
      active: data.equipment_group.item.active.data[0],
      item_type_id: data.equipment_group.item.item_type_id,
      uom_group_id: 1,                   
      uom_id: data.equipment_group.item.uom_group.uom[0].uom_id,
      uom_name: data.equipment_group.item.uom_group.uom[0].name,
      remark: data.equipment_group.item.remark,
      minimum_order_quantity: data.equipment_group.item.minimum_order_quantity,
      tolerance_time: data.equipment_group.item.tolerance_time,
      lead_time: data.equipment_group.item.lead_time,
      accounting_type: data.equipment_group.item.accounting_type,
      item_status_id: data.item_status_id,
      price_import: data.price_import,
      price_currently: data.price_currently,
      depreciation: data.depreciation,
      useful_life: data.useful_life,
      responsible_district_id: data.responsible_district_id,
      responsible_node_id: data.responsible_node_id,
      import_on: data.import_on.split("T")[0],

      location_district_id: data.equipment_installation.length > 0 ? data.equipment_installation[0].location_district_id : null,
      location_node_id: data.equipment_installation.length > 0 ? data.equipment_installation[0].location_node_id : null,
      location_station_id: data.equipment_installation.length > 0 ? data.equipment_installation[0].location_station_id : null,
      location_description: data.equipment_installation.length > 0 ? data.equipment_installation[0].location_description : null,
      x_cross_x_cross_id: data.equipment_installation.length > 0 ? data.equipment_installation[0].x_cross_x_cross_id : null,

      equipment_id: data.equipment_id,
      modeEdit: values.line_position_permission[0].module_admin === true ? true : false     // IF Check user If User is Admin -> return true Else -> return false

    // }
  }
  }

  // Fetch permissiton
  useFetchPernissionUser();

  const validateInternalItemIDField = internal_item_id => {

    if (!internal_item_id) {
      return 'Required';
    }
    if ((toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.JUST_SEARCH || toolbar.mode === TOOLBAR_MODE.NONE || toolbar.mode === TOOLBAR_MODE.NONE_HOME)
      && !toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]) {
      if (internal_item_id !== values.internal_item_id) {
        var item_match_equipments = factEquipment.items;
        let item_match_equipment = item_match_equipments.find(item_match_equipment => `${item_match_equipment.equipment_group.item.internal_item_id}` === `${internal_item_id}`); // Returns undefined if not found
        // console.log("item_match_equipment", item_match_equipment)
        if (item_match_equipment) {
          setValues({ ...values, ...responseToFormState(item_match_equipment) }, false); //Setvalues and don't validate

          const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/fact/equipment/${item_match_equipment.equipment_id}/history`;
          axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
            .then((res) => {
              // console.log(res.data);
              setFieldValue("ref_document", res.data.results, false);
              return;
            });

        } else {
          // console.log("values.modeEdit", values.modeEdit)
          if (values.modeEdit) {
            return;
          } else {
          return 'Invalid Equipment ID';
          }
        }
      }
    } else {//If mode add, ok
      // console.log("document ID doesn't exist but I am in mode add")
      if (internal_item_id) {
        // console.log("internal_item_id", internal_item_id)
        var item_match_equipments = factEquipment.items;
        let item_match_equipment = item_match_equipments.find(item_match_equipment => `${item_match_equipment.equipment_group.item.internal_item_id}` === `${internal_item_id}`); // Returns undefined if not found
        // console.log("item_match_equipment", item_match_equipment)
        if (item_match_equipment) { // Check Dulplication
          // console.log("Dulplication")
          return 'Dulplication Internal item';
        } else {
          setFieldValue("internal_item_id", internal_item_id, false);
          return;
        }
      } else return 'Required';
    }
  };

  const validateItemMasterdataField = (fieldName, name) => {
    if (!name) {
      return 'Required'
    } 
    return;
  };

  const validateImportOnField = (...args) => validateItemMasterdataField("import_on", ...args);
  const validateItemDescriptionField = (...args) => validateItemMasterdataField("description", ...args);
  const validateItemTypeIDField = (...args) => validateItemMasterdataField("item_type_id", ...args);
  const validateItemStatusIDField = (...args) => validateItemMasterdataField("item_status_id", ...args);
  const validateItemGroupIDField = (...args) => validateItemMasterdataField("item_group_id", ...args);

  return (
    <div id={changeTheam() === true ? "" : "blackground-white"}>
      <div className="container_12 clearfix">
        <section className="container_12 ">
          <FormTitle>ข้อมูลสินทรัพย์หลัก</FormTitle>

          <div id={changeTheam() === true ? "blackground-white" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray", height: "120px", paddingTop: "10px" } : {}}>
            <div className="container_12" >

              {/* === internal_item_id === */}
              <FormLabel>เลขที่สินทรัพย์</FormLabel>
              <div className="grid_3 pull_1">
                <TextInput name='internal_item_id'
                  validate={validateInternalItemIDField}
                  searchable={toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.JUST_SEARCH} ariaControls="modalNoPart" tabIndex="1" />
              </div>

              {/* === item_type_id === */}
              <div className="float-right">
                <div className="grid_3 float-right">
                  <SelectNoChildrenInput name="item_type_id" disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.JUST_SEARCH} tabIndex="2"
                    validate={validateItemTypeIDField} cssStyle={{ left: "-160px", top: "10px" }}>
                    <option value=''></option>
                    {values.item_type_id === 1 ? <option value='2' selected>asset</option> : <option value='2'>asset</option>}
                  </SelectNoChildrenInput>
                </div>
                <div className="grid_2 float-right">
                  <p className="top-text float-right">ชนิดอุปกรณ์</p>
                </div>
              </div>
            </div>

            <div className="container_12">

              {/* === description === */}
              <FormLabel>รายละเอียด</FormLabel>
              <div className="grid_3 pull_1">
                <TextInput name="description" validate={validateItemDescriptionField} disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.JUST_SEARCH} tabIndex="3" />
              </div>

              <div className="float-right">
                <div className="grid_3 float-right">
                  <SelectNoChildrenInput name="equipment_group_id" disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.JUST_SEARCH} validate={validateItemGroupIDField} cssStyle={{ left: "-160px", top: "10px" }} tabIndex="4">
                    <option value=''></option>
                    {fact[FACTS.EQUIPMENT_GROUP].items.map((item_group) => (
                      values.equipment_group_id === item_group.equipment_group_id
                        ?
                        <option value={item_group.equipment_group_id} key={item_group.equipment_group_id} selected> {item_group.name} </option>
                        :
                        <option value={item_group.equipment_group_id} key={item_group.equipment_group_id}> {item_group.name} </option>
                    ))}
                  </SelectNoChildrenInput>
                </div>
                <div className="grid_2 float-right">
                  <p className="top-text float-right">กลุ่มอุปกรณ์</p>
                </div>
              </div>

            </div>

            <div className="container_12">

              {/* === equipment_status_id_th === */}
              <FormLabel>สถานะการใช้งาน</FormLabel>
              <div className="grid_3 pull_0">
                <SelectNoChildrenInput name="item_status_id" disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.JUST_SEARCH} tabIndex="5"
                  validate={validateItemStatusIDField} cssStyle={{ left: "-160px", top: "10px" }}>
                  <option value=''></option>
                  {factItemStatus.items.map((item_status) => {
                    if (values.item_status_id === item_status.item_status_id) {
                      return <option value={item_status.item_status_id} key={item_status.item_status_id} selected>{item_status.description_th}</option>
                    } else {
                      return <option value={item_status.item_status_id} key={item_status.item_status_id}>{item_status.description_th}</option>
                    }
                  })}
                </SelectNoChildrenInput>
              </div>

              {/* === import_on === */}
              <div className="float-right">
                <div className="grid_3 float-right">
                  <DateInput name="import_on" disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.JUST_SEARCH} 
                  validate={validateImportOnField} cssStyle={{ left: "-160px", top: "10px" }} tabIndex="5" />
                </div>
                <div className="grid_2 float-right">
                  <p className="top-text float-right">วันที่นำเข้า</p>
                </div>
              </div>

            </div>

          </div>

        </section>

        {/* PopUp ค้นหาอะไหล่ */}
        <PopupModalEquipmentNoChildren />
      </div>
    </div>
  )

}

export default TopContent;