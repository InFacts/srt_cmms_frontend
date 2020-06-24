import React, { useEffect } from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux';

import FormInput from '../common/form-input'
import TextInput from '../common/formik-text-input'
import SelectNoChildrenInput from '../common/formik-select-no-children';
import PopupModalEquipmentNoChildren from '../common/popup-modal-equipment-no-children'

import { useFormikContext, useField } from 'formik';

import { TOOLBAR_MODE, TOOLBAR_ACTIONS, toModeAdd } from '../../redux/modules/toolbar.js';
import { getNumberFromEscapedString, fetchGoodsOnhandDataForItemmasterData, DOCUMENT_TYPE_ID, getDocumentbyInternalDocumentID } from '../../helper';

import { FACTS } from '../../redux/modules/api/fact.js';

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { fetchPositionPermissionData, changeTheam } from '../../helper.js'

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
  const factEquipmentStatus = useSelector((state) => ({ ...state.api.fact[FACTS.EQUIPMENT_STATUS] }), shallowEqual);

  const responseToFormState = (data) => {
    console.log("data", data)
    return {
      internal_item_id: data.equipment_group.item.internal_item_id,
      description: data.equipment_group.item.description,
      active: data.equipment_group.item.active.data[0],
      item_type_id: data.equipment_group.item.item_type_id,
      uom_group_id: data.equipment_group.item.uom_group_id,                    //UOM
      uom_id: data.equipment_group.item.uom_group.uom[0].uom_id,
      uom_name: data.equipment_group.item.uom_group.uom[0].name,
      remark: data.equipment_group.item.remark,
      minimum_order_quantity: data.equipment_group.item.minimum_order_quantity,
      tolerance_time: data.equipment_group.item.tolerance_time,
      lead_time: data.equipment_group.item.lead_time,
      accounting_type: data.equipment_group.item.accounting_type,
      equipment_status_id: data.item_status_id,
      price_import: data.price_import,
      price_currently: data.price_currently,
      description_equipment: data.depreciation,
      useful_life: data.useful_life,
      responsible_by: data.responsible_district_id,
      responsible_node_by: data.responsible_node_by
    }
  }

  const validateInternalItemIDField = internal_item_id => {
    console.log("internal_item_id", internal_item_id)

    if (!internal_item_id) {
      console.log("I dont have any internal item id")
      return 'Required';
    }

    if ((toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.NONE || toolbar.mode === TOOLBAR_MODE.NONE_HOME)
      && !toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]) {
      var item_match_equipments = factEquipment.items;
      let item_match_equipment = item_match_equipments.find(item_match_equipment => `${item_match_equipment.equipment_group.item.internal_item_id}` === `${internal_item_id}`); // Returns undefined if not found
      // console.log("item_match_equipment", item_match_equipment)
      if (item_match_equipment) {
        setValues({ ...values, ...responseToFormState(item_match_equipment) }, false); //Setvalues and don't validate
        // validateField("item_type_id");
        // IF Check user If User is Admin -> return true Else -> return false
        if (decoded_token.id === 4) { //{/* TODO USER_ID FOR ADMIN */}
          console.log(" YES I AM ADMIN ")
          setFieldValue("modeEdit", true, false);
        } else {
          console.log(" NO I NOT ADMIN ")
          setFieldValue("modeEdit", false, false);
        }
      }
      return;
    } else {//If mode add, ok
      console.log("document ID doesn't exist but I am in mode add")
      if (internal_item_id) {
        let items = fact.items.items;
        let item = items.find(item => `${item.internal_item_id}` === `${internal_item_id}`); // Returns undefined if not found
        // console.log("warehouse", item)
        if (!item) { // Check Dulplication
          setFieldValue("internal_item_id", internal_item_id, false);
        } else return 'Internal Item Id Duplication'
      } else return 'Required';
    }
  };

  const validateItemMasterdataField = (fieldName, name) => {
    if (!name) {
      return 'Required'
    }
    setFieldValue(fieldName, name, false);
  };
  const validateUomGroupIDField = (...args) => validateItemMasterdataField("uom_group_id", ...args);
  const validateItemDescriptionField = (...args) => validateItemMasterdataField("description", ...args);

  return (
    <div id={changeTheam() === true ? "" : "blackground-white"}>
      <div className="container_12 clearfix">
        <section className="container_12 ">
          <FormTitle>ข้อมูลอุปกรณ์</FormTitle>

          <div id={changeTheam() === true ? "blackground-white" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray", height: "120px", paddingTop: "10px" } : {}}>
            <div className="container_12" >

              {/* === internal_item_id === */}
              <FormLabel>เลขที่สินทรัพย์</FormLabel>
              <div className="grid_3 pull_1">
                <TextInput name='internal_item_id'
                  validate={validateInternalItemIDField}
                  searchable={toolbar.mode === TOOLBAR_MODE.SEARCH} ariaControls="modalNoPart" tabIndex="1" />
              </div>

              {/* === item_type_id === */}
              <div className="float-right">
                <div className="grid_3 float-right">
                  <SelectNoChildrenInput name="item_type_id" disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}>
                    <option value=''></option>
                    {values.item_type_id === 1 ? <option value='1' selected>asset</option> : <option value='1'>asset</option>}
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
                <TextInput name="description" validate={validateItemDescriptionField} disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
              </div>

              {/* === uom_group_id === */}
              <div className="float-right">
                <div className="grid_3 float-right">
                  <SelectNoChildrenInput name="uom_group_id" disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} validate={validateUomGroupIDField} cssStyle={{ left: "-160px", top: "10px" }}>
                    <option value=''></option>
                    {fact[FACTS.UNIT_OF_MEASURE_GROUPS].items.map((uom) => (
                      values.uom_group_id === uom.uom_group_id
                        ?
                        <option value={uom.uom_group_id} key={uom.uom_group_id} selected> {uom.name} </option>
                        :
                        <option value={uom.uom_group_id} key={uom.uom_group_id}> {uom.name} </option>
                    ))}
                  </SelectNoChildrenInput>
                </div>
                <div className="grid_2 float-right">
                  <p className="top-text float-right">กลุ่มหน่วยนับ</p>
                </div>
              </div>
            </div>

            <div className="container_12">

              {/* === equipment_status_id_th === */}
              <FormLabel>สถานะการใช้งาน</FormLabel>
              <div className="grid_3 pull_0">
                <SelectNoChildrenInput name="equipment_status_id" disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} >
                  <option value=''></option>
                  {factEquipmentStatus.items.map((equipment_status) => {
                    if (values.equipment_status_id === equipment_status.equipment_status_id) {
                      return <option value={equipment_status.equipment_status_id} key={equipment_status.equipment_status_id} selected>{equipment_status.status_th}</option>
                    } else {
                      return <option value={equipment_status.equipment_status_id} key={equipment_status.equipment_status_id}>{equipment_status.status_th}</option>
                    }
                  })}
                </SelectNoChildrenInput>
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