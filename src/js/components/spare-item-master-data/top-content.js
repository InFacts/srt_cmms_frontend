import React, { useEffect } from 'react';
import { connect } from 'react-redux'

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

  const responseToFormState = (data) => {
    console.log("!data.quantity_required", !data.quantity_required, data.quantity_required)
    return {
      internal_item_id: data.internal_item_id,
      description: data.description,
      item_group_id: data.item_group_id,
      item_type_id: data.item_type_id,
      uom_group_id: data.uom_group_id,                    //UOM
      name: data.list_uoms[0].name,                       //UOM ตัวย่อ
      abbreviation: data.list_uoms[0].abbreviation,       //UOM
      minimum_order_quantity: !data.minimum_order_quantity ? 0 : data.minimum_order_quantity,  //ขั้นต่ำการสั่งซื้อ
      lead_time: !data.lead_time ? 0 : data.lead_time,
      tolerance_time: !data.tolerance_time ? 0 : data.tolerance_time,
      quantity_required: !data.quantity_required ? 0 : data.quantity_required,  //จำนวนที่ต้องการ
      quantity_lowest: !data.quantity_lowest ? 0 : data.quantity_lowest,    //ขั้นต่ำ
      quantity_highest: !data.quantity_highest ? 0 : data.quantity_highest,   //ขั้นสูง
      remark: data.remark,
      active: data.active.data[0],

      list_uoms: data.list_uoms
    }
  }
  const validateInternalItemIDField = internal_item_id => {
    //     By default Trigger every line_item, so need to check if the internal_item_id changes ourselves

    if (values.internal_item_id === internal_item_id) {
      return;
    }
    if (internal_item_id === "") {
      resetForm();
      return;
    }
    let items = props.fact.items.items;
    let item = items.find(item => `${item.internal_item_id}` === `${internal_item_id}`); // Returns undefined if not found
    if (item) {
      setValues({ ...values, ...responseToFormState(item) }, false); //Setvalues and don't validate
      validateField("item_type_id");

      fetchGoodsOnhandDataForItemmasterData(item.item_id)
        .then((goods_onhand) => {
          console.log("good on hand", goods_onhand)
          setFieldValue('goods_onhand', goods_onhand, false);
        })
      return;
    } else {
      return 'Invalid Number ID';
    }
  };

  const validateItemTypeID = (fieldName, item_type_id) => {
    item_type_id = `${item_type_id}`.split('\\')[0]; // Escape Character WAREHOUSE_ID CANT HAVE ESCAPE CHARACTER!
    let item_types = props.fact[FACTS.ITEM_TYPE].items;
    let item_type = item_types.find(item_type => `${item_type.item_type_id}` === `${item_type_id}`); // Returns undefined if not found
    console.log("item_type", item_type)
    if (item_type) {
      console.log("in")
      setFieldValue(fieldName, item_type_id, false);
      return;
    } else {
      console.log("out")
      return 'Invalid Item Type ID';
    }
  }
  const validateItemTypeIDField = (...args) => validateItemTypeID("item_type_id", ...args);

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
                <SelectNoChildrenInput name="item_type_id" validate={validateItemTypeIDField}
                  disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH}>
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
              <TextInput name="description" disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="2" />
            </div>
            <div className="float-right">
              <div className="grid_3 float-right">
                <SelectNoChildrenInput name="item_group_id" disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH}>
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
            <div className="float-right">
              <div className="grid_3 float-right">
                <SelectNoChildrenInput name="uom_group_id" disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH}>
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