import React, { useEffect } from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux';

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';
import { v4 as uuidv4 } from 'uuid';

import FormInput from '../common/form-input'
import TextInput from '../common/formik-text-input'
import SelectNoChildrenInput from '../common/formik-select-no-children';
import PopupModalNoPartNoChildren from '../common/popup-modal-nopart-no-children'

import { useFormikContext, useField } from 'formik';

// import PopupModalDocument from '../common/popup-modal-document'  เปลี่ยนเป็น MOdal ของ part
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
  const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);
  const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);

  const responseToFormState = (data) => {
    let uoms = props.fact['unit-of-measures'].items;
    let uom = uoms.find(uom => `${uom.uom_id}` === `${data.uom_id_inventory}`); // Returns undefined if not found
    return {
      internal_item_id: data.internal_item_id,
      description: data.description,
      item_group_id: data.item_group_id,
      item_type_id: data.item_type_id,
      uom_group_id: data.uom_group_id,                    //UOM
      uom_id: data.uom_id_inventory,
      uom_name: uom.name,
      minimum_order_quantity: !data.minimum_order_quantity ? 0 : data.minimum_order_quantity,  //ขั้นต่ำการสั่งซื้อ
      lead_time: !data.lead_time ? 0 : data.lead_time,
      tolerance_time: !data.tolerance_time ? 0 : data.tolerance_time,
      quantity_required: !data.quantity_required ? 0 : data.quantity_required,  //จำนวนที่ต้องการ
      quantity_lowest: !data.quantity_lowest ? 0 : data.quantity_lowest,    //ขั้นต่ำ
      quantity_highest: !data.quantity_highest ? 0 : data.quantity_highest,   //ขั้นสูง
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
      let items = props.fact.items.items;
      let item = items.find(item => `${item.internal_item_id}` === `${internal_item_id}`); // Returns undefined if not found
      if (item) {
        setValues({ ...values, ...responseToFormState(item) }, false); //Setvalues and don't validate
        validateField("item_type_id");

        // IF Check user If User is Admin -> return true Else -> return false
        if (decoded_token.id === 4) { //{/* TODO USER_ID FOR ADMIN */}
          console.log(" YES I AM ADMIN ")
          setFieldValue("modeEdit", true, false);
        } else {
          console.log(" NO I NOT ADMIN ")
          setFieldValue("modeEdit", false, false);
        }
        return;
      } else {
        return 'Invalid Number ID';
      }
    } else {//If mode add, ok
      console.log("document ID doesn't exist but I am in mode add")
      if (internal_item_id) {
        let items = props.fact.items.items;
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
  const validateItemTypeIDField = (...args) => validateItemMasterdataField("item_type_id", ...args);
  const validateItemGroupIDField = (...args) => validateItemMasterdataField("item_group_id", ...args);
  const validateUomGroupIDField = (...args) => validateItemMasterdataField("uom_group_id", ...args);
  const validateItemDescriptionField = (...args) => validateItemMasterdataField("description", ...args);

  return (
    <div id="blackground-white">
      <div className="container_12 clearfix">
        <section className="container_12 ">
          <FormTitle>ข้อมูลอุปกรณ์</FormTitle>
          <div className="container_12">
            <FormLabel>เลขที่อุปกรณ์</FormLabel>
            <div className="grid_3 pull_1">
              <TextInput name='internal_item_id'
                validate={validateInternalItemIDField}
                searchable={props.toolbar.mode === TOOLBAR_MODE.SEARCH} ariaControls="modalNoPart" tabIndex="1" />
            </div>
            <div className="float-right">
              <div className="grid_3 float-right">
                <SelectNoChildrenInput name="item_type_id" validate={validateItemTypeIDField} cssStyle={{ left: "-160px", top: "10px" }}
                  disabled={values.modeEdit ? false : props.toolbar.mode === TOOLBAR_MODE.SEARCH}>
                  <option value=''></option>
                  {props.fact[FACTS.ITEM_TYPE].items.map((item_type) => (
                    values.item_type_id === item_type.item_type_id
                      ?
                      <option value={item_type.item_type_id} key={item_type.item_type_id} selected> {item_type.name} </option>
                      :
                      <option value={item_type.item_type_id} key={item_type.item_type_id}> {item_type.name} </option>
                  ))}
                </SelectNoChildrenInput>
              </div>
              <div className="grid_2 float-right">
                <p className="top-text float-right">ชนิดอุปกรณ์</p>
              </div>
            </div>
          </div>

          <div className="container_12">
            <FormLabel>รายละเอียด</FormLabel>
            <div className="grid_3 pull_1">
              <TextInput name="description" validate={validateItemDescriptionField} disabled={values.modeEdit ? false : props.toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="2" />
            </div>
            <div className="float-right">
              <div className="grid_3 float-right">
                <SelectNoChildrenInput name="item_group_id" disabled={values.modeEdit ? false : props.toolbar.mode === TOOLBAR_MODE.SEARCH} validate={validateItemGroupIDField} cssStyle={{ left: "-160px", top: "10px" }}>
                  <option value=''></option>
                  {props.fact[FACTS.ITEM_GROUP].items.map((item_group) => (
                    values.item_group_id === item_group.item_group_id
                      ?
                      <option value={item_group.item_group_id} key={item_group.item_group_id} selected> {item_group.abbreviation} </option>
                      :
                      <option value={item_group.item_group_id} key={item_group.item_group_id}> {item_group.abbreviation} </option>
                  ))}
                </SelectNoChildrenInput>
              </div>
              <div className="grid_2 float-right">
                <p className="top-text float-right">กลุ่มอุปกรณ์</p>
              </div>
            </div>
          </div>

          <div className="container_12">

          <FormLabel>สถานะการใช้งาน</FormLabel>
            <div className="grid_5 pull_0">
              <TextInput name='equipment_status_id' disabled={true} />
            </div>

            <div className="float-right">
              <div className="grid_3 float-right">
                <SelectNoChildrenInput name="uom_group_id" disabled={values.modeEdit ? false : props.toolbar.mode === TOOLBAR_MODE.SEARCH} validate={validateUomGroupIDField} cssStyle={{ left: "-160px", top: "10px" }}>
                  <option value=''></option>
                  {props.fact[FACTS.UNIT_OF_MEASURE_GROUPS].items.map((uom) => (
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
        </section>

        {/* PopUp ค้นหาอะไหล่ */}
        <PopupModalNoPartNoChildren />
      </div>
    </div>
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