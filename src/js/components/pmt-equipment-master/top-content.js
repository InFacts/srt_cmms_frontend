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

  const responseToFormState = (data) => {
    let uoms = fact['unit-of-measures'].items;
    let uom = uoms.find(uom => `${uom.uom_id}` === `${data.uom_id_inventory}`); // Returns undefined if not found
    return {
      internal_item_id: data.internal_item_id,
      description: data.description,
      item_group_id: data.item_group_id,
      uom_group_id: data.uom_group_id,                    //UOM
      uom_id: data.uom_id_inventory,
      uom_name: uom.name,
      minimum_order_quantity: !data.minimum_order_quantity ? 0 : data.minimum_order_quantity,  //ขั้นต่ำการสั่งซื้อ
      lead_time: !data.lead_time ? 0 : data.lead_time,
      tolerance_time: !data.tolerance_time ? 0 : data.tolerance_time,
      remark: data.remark,
      active: data.active.data[0],
      accounting_type: data.accounting_type,
      list_uoms: data.list_uoms
    }
  }

  const validateInternalItemIDField = internal_item_id => {
    if (!internal_item_id) {
      return 'Required';
    }
    if ((toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.NONE || toolbar.mode === TOOLBAR_MODE.NONE_HOME)
      && !toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]) {
      let items = fact.items.items;
      let item = items.find(item => `${item.internal_item_id}` === `${internal_item_id}`); // Returns undefined if not found
      if (item) {
        setValues({ ...values, ...responseToFormState(item) }, false); //Setvalues and don't validate
        validateField("item_type_id");

        var item_match_equipments = factEquipment.items;
        let item_match_equipment = item_match_equipments.find(item_match_equipment => `${item_match_equipment.item_id}` === `${item.item_id}`); // Returns undefined if not found
        console.log("item_match_equipment", item_match_equipment)
        if (item_match_equipment) {
          setFieldValue("price_import", item_match_equipment.price_import, false);
          setFieldValue("districts_id", item_match_equipment.districts_id, false);
          setFieldValue("price_currently", item_match_equipment.price_currently, false);
          setFieldValue("location_station_id", item_match_equipment.location_station_id, false);
          setFieldValue("description_equipment", item_match_equipment.depreciation, false);
          setFieldValue("useful_life", item_match_equipment.useful_life, false);
          setFieldValue("equipment_status_id_th", item_match_equipment.equipment_status.status_th, false);
          setFieldValue("responsible_by", item_match_equipment.responsible_by, false);
          setFieldValue("station", item_match_equipment.station, false);
          setFieldValue("equipment_group_id", item_match_equipment.equipment_group.equipment_group_id, false);
          setFieldValue("item_type_id", 1, false);

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
      } else {
        return 'Invalid Number ID';
      }
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
    <div id="blackground-white">
      <div className="container_12 clearfix">
        <section className="container_12 ">
          <FormTitle>ข้อมูลอุปกรณ์</FormTitle>
          <div className="container_12">

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
                <SelectNoChildrenInput name="item_type_id" disabled={true}>
                  <option value=''></option>
                  {values.item_type_id === 1 && <option value='1' selected>asset</option>}
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
            <div className="grid_5 pull_0">
              <TextInput name='equipment_status_id_th' disabled={true} />
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