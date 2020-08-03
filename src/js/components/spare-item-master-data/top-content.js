import React, { useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import TextInput from '../common/formik-text-input'
import SelectNoChildrenInput from '../common/formik-select-no-children';
import PopupModalNoPartNoChildren from '../common/popup-modal-nopart-no-children'

import { useFormikContext, useField } from 'formik';

// import PopupModalDocument from '../common/popup-modal-document'  เปลี่ยนเป็น MOdal ของ part
import { TOOLBAR_MODE, TOOLBAR_ACTIONS, toModeAdd } from '../../redux/modules/toolbar.js';
import { getNumberFromEscapedString, fetchGoodsOnhandDataForItemmasterData, DOCUMENT_TYPE_ID, getDocumentbyInternalDocumentID } from '../../helper';

import { FACTS } from '../../redux/modules/api/fact.js';

import { fetchPositionPermissionData, changeTheam } from '../../helper.js'

import useFetchPernissionUser from '../../hooks/fetch-permission-user';

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
    let uoms = fact['unit-of-measures'].items;
    let uom = uoms.find(uom => `${uom.uom_id}` === `${data.uom_id_inventory}`); // Returns undefined if not found
    return {
      item_id: data.item_id,
      internal_item_id: data.internal_item_id,
      description: data.description,
      item_group_id: data.item_group_id,
      item_type_id: data.item_type_id,
      uom_group_id: 1,                    //UOM
      // uom_group_id: data.uom_group_id,                    //UOM
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
      list_uoms: data.list_uoms,

      modeEdit: values.line_position_permission[0].module_admin === true ? true : false     // IF Check user If User is Admin -> return true Else -> return false

    }
  }

  // Fetch permissiton
  useFetchPernissionUser();

  const validateInternalItemIDField = internal_item_id => {
    if (!internal_item_id) {
      setFieldValue("description", "", false)
      setFieldValue("item_group_id", "", false)
      setFieldValue("item_type_id", "", false)
      setFieldValue("uom_group_id", 1, false)
      setFieldValue("uom_id", "", false)
      setFieldValue("uom_name", "", false)
      setFieldValue("minimum_order_quantity", "", false)
      setFieldValue("lead_time", "", false)
      setFieldValue("tolerance_time", "", false)
      setFieldValue("quantity_required", "", false)
      setFieldValue("quantity_lowest", "", false)
      setFieldValue("quantity_highest", "", false)
      setFieldValue("remark", "", false)
      setFieldValue("active", "", false)
      setFieldValue("accounting_type", "", false)
      setFieldValue("list_uoms", "", false)
      setFieldValue("modeEdit", false, false);
      return 'Required';
    }

    if ((toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.JUST_SEARCH || toolbar.mode === TOOLBAR_MODE.NONE || toolbar.mode === TOOLBAR_MODE.NONE_HOME)
      && !toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]) {
      if (internal_item_id !== values.internal_item_id) {
        let items = fact.items.items;
        let item = items.find(item => `${item.internal_item_id}` === `${internal_item_id}` && `${item.item_type_id}` === `${1}`); // Returns undefined if not found
        if (item) {
          setValues({ ...values, ...responseToFormState(item) }, false);

          fetchGoodsOnhandDataForItemmasterData(item.item_id)
            .then((goods_onhand) => {
              // console.log("good on hand", goods_onhand)
              setFieldValue('goods_onhand', goods_onhand, false);
            })
          return;
        } else {
          return 'Invalid Number ID';
        }
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
    return;
  };
  const validateItemTypeIDField = (...args) => validateItemMasterdataField("item_type_id", ...args);
  const validateItemGroupIDField = (...args) => validateItemMasterdataField("item_group_id", ...args);
  const validateUomGroupIDField = (...args) => validateItemMasterdataField("uom_group_id", ...args);
  const validateItemDescriptionField = (...args) => validateItemMasterdataField("description", ...args);

  return (
    <div id={changeTheam() === true ? "" : "blackground-white"}>
      <div className="container_12 clearfix">
        <section className="container_12 ">

          <FormTitle>ข้อมูลอุปกรณ์</FormTitle>

          <div id={changeTheam() === true ? "blackground-white" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray", height: "90px", paddingTop: "10px" } : {}} >

            <div className="container_12">
              <FormLabel>เลขที่อุปกรณ์</FormLabel>
              <div className="grid_3 pull_1">
                <TextInput name='internal_item_id'
                  validate={validateInternalItemIDField}
                  searchable={toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.JUST_SEARCH} ariaControls="modalNoPart" tabIndex="1" />
              </div>
              <div className="float-right">
                <div className="grid_3 float-right">
                  <SelectNoChildrenInput name="item_type_id" validate={validateItemTypeIDField} cssStyle={{ left: "-160px", top: "10px" }}
                    disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.JUST_SEARCH} tabIndex="2">
                    <option value=''></option>
                    <option value='1'>item</option>
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
                <TextInput name="description" validate={validateItemDescriptionField} disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.JUST_SEARCH} tabIndex="3" />
              </div>
              <div className="float-right">
                <div className="grid_3 float-right">
                  <SelectNoChildrenInput name="item_group_id" disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.JUST_SEARCH} validate={validateItemGroupIDField} cssStyle={{ left: "-160px", top: "10px" }} tabIndex="4">
                    <option value=''></option>
                    {fact[FACTS.ITEM_GROUP].items.map((item_group) => (
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

            {/* <div className="container_12">
              <div className="float-right">
                <div className="grid_3 float-right">
                  <SelectNoChildrenInput name="uom_group_id" disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} validate={validateUomGroupIDField} cssStyle={{ left: "-160px", top: "10px" }} tabIndex="5">
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
            </div> */}
          </div>
        </section>

        {/* PopUp ค้นหาอะไหล่ */}
        <PopupModalNoPartNoChildren itemTypeID={1} />
      </div>
    </div>
  )

}
export default TopContent;