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
  getDocumentbyInternalDocumentID
} from '../../helper';

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
  const factChecklistCustomGroup = useSelector((state) => ({ ...state.api.fact[FACTS.CHECKLIST_CUSTOM_GROUP] }), shallowEqual);
  const factChecklistEquipmentGroup = useSelector((state) => ({ ...state.api.fact[FACTS.CHECKLIST_EQUIPMENT_GROUP] }), shallowEqual);
  const factChecklist = useSelector((state) => ({ ...state.api.fact.checklist }), shallowEqual);

  const validateNameChecklist = checklist_line_item => new Promise(resolve => {
    if (!checklist_line_item) {
      return resolve('Required');
    }

    let error;
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/fact/checklist-line-item/${checklist_line_item}`;
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
      .then((res) => {
        if (res.data.checklist_line_item.checklist_line_item === checklist_line_item) { // If input document ID exists
          if (toolbar.mode === TOOLBAR_MODE.SEARCH && !toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]) { //If Mode Search, needs to set value 
            setFieldValue("checklist_line_item", `${res.data.checklist_line_item.checklist_line_item}\\${res.data.checklist_line_item.name}`, false)
            setFieldValue("checklist_id", res.data.checklist_line_item.checklist_id, false)
            setFieldValue("freq", res.data.checklist_line_item.freq, false)
            setFieldValue("freq_unit_id", res.data.checklist_line_item.freq_unit_id, false)
            setFieldValue("active", res.data.checklist_line_item.active.data[0], false)
            for (var i = 0; i < res.data.checklist_line_item.checklist_line_item_use_equipment.length; i++) {
              res.data.checklist_line_item.checklist_line_item_use_equipment[i].internal_item_id = res.data.checklist_line_item.checklist_line_item_use_equipment[i].item.internal_item_id
              res.data.checklist_line_item.checklist_line_item_use_equipment[i].description = res.data.checklist_line_item.checklist_line_item_use_equipment[i].item.description
              res.data.checklist_line_item.checklist_line_item_use_equipment[i].quantity = res.data.checklist_line_item.checklist_line_item_use_equipment[i].quantity
              res.data.checklist_line_item.checklist_line_item_use_equipment[i].uom_id = res.data.checklist_line_item.checklist_line_item_use_equipment[i].item.uom_group.uom[0].uom_id
              delete res.data.checklist_line_item.checklist_line_item_use_equipment[i].item
            }
            for (var i = res.data.checklist_line_item.checklist_line_item_use_equipment.length; i <= 9; i++) {
              res.data.checklist_line_item.checklist_line_item_use_equipment.push({
                internal_item_id: '',
                description: '',
                quantity: '',
                uom_id: ''
              });
            }

            setFieldValue("checklist_line_item_use_equipment", res.data.checklist_line_item.checklist_line_item_use_equipment, false)
            return resolve(null);
          } else { //If Mode add, need to error duplicate Document ID
            console.log("I AM DUPLICATE")
            error = 'Duplicate CheckLIst Name';
          }
        } else { // If input Document ID doesn't exists
          // console.log("I KNOW IT'sINVALID")
          error = 'Invalid Document ID';
        }
      })
      .catch((err) => { // 404 NOT FOUND  If input Document ID doesn't exists
        if (toolbar.mode === TOOLBAR_MODE.SEARCH) { //If Mode Search, invalid Document ID
          error = 'Invalid Document ID';
        }//If mode add, ok
      })
      .finally(() => {
        return resolve(error)
      });
  });

  return (
    <div id={changeTheam() === true ? "" : "blackground-white"}>
      <div className="container_12 clearfix">
        <section className="container_12 ">
          <FormTitle>สร้างวาระ</FormTitle>

          <div id={changeTheam() === true ? "blackground-white" : ""}
            style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray", height: "180px", paddingTop: "10px" } : {}}>

            <div className="container_12" >
              <div className="grid_2 omega">
                <p className="top-text">แผนซ่อมบำรุง</p>
              </div>
              <div className="grid_3 alpha omega pull_0">
                <TextInput name='checklist_line_item' validate={validateNameChecklist}
                  searchable={toolbar.mode === TOOLBAR_MODE.SEARCH} ariaControls="modalChecklistLineItem" tabIndex="1" />
              </div>

            </div>

            <div className="container_12">

              {/* === equipment_status_id_th === */}
              <div className="grid_2 omega">
                <p className="top-text">สถานะการใช้งาน</p>
              </div>
              <div className="grid_3 alpha omega pull_0">
                <SelectNoChildrenInput name="active" disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} >
                  <option value=''></option>
                  <option value='1'>เปิดการใช้งาน</option>
                  <option value='0'>ปิดการใช้งาน</option>
                </SelectNoChildrenInput>
              </div>

            </div>

            <div className="container_12">

              {/* === equipment_status_id_th === */}
              <div className="grid_2 omega">
                <p className="top-text">กลุ่มการทำวาระ</p>
              </div>
              <div className="grid_3 alpha omega pull_0">
                <SelectNoChildrenInput name="checklist_group_id" disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} >
                  <option value=''></option>
                  {factChecklistEquipmentGroup.items.map((factChecklistEquipmentGroup) => {
                    return (<option value={factChecklistEquipmentGroup.checklist_group_id}>{factChecklistEquipmentGroup.checklist_group_id}</option>)
                  })}
                  {factChecklistCustomGroup.items.map((factChecklistCustomGroup) => {
                    return (<option value={factChecklistCustomGroup.checklist_group_id}>{factChecklistCustomGroup.checklist_group_name}</option>)
                  })}
                </SelectNoChildrenInput>
              </div>

            </div>

            <div className="container_12">

              {/* === equipment_status_id_th === */}
              <div className="grid_2 omega">
                <p className="top-text">ชนิดการทำวาระ</p>
              </div>
              <div className="grid_3 alpha omega pull_0">
                <SelectNoChildrenInput name="checklist_id" disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} >
                  <option value=''></option>
                  {factChecklist.items.map((factChecklist) => {
                    if (values.checklist_group_id == factChecklist.checklist_group_id) {
                      return (<option value={factChecklist.checklist_id}>{factChecklist.checklist_name}</option>)
                    }
                  })}
                </SelectNoChildrenInput>
              </div>

            </div>

            <div className="container_12">

              <div className="grid_2">
                <p className="top-text">ความถี่การซ่อมบำรุง</p>
              </div>
              <div className="grid_3 alpha omega pull_0">
                <NumberInput name="freq" step={1}
                  disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} />
              </div>
              <div className="grid_1 omega pull_0">
                <p className="top-text">ครั้งต่อ</p>
              </div>
              <div className="grid_2 alpha omega pull_0">
                <SelectNoChildrenInput name="freq_unit_id" disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}>
                  <option value=''></option>
                  <option value='1'>วัน</option>
                  <option value='2'>เดือน</option>
                  <option value='3'>ปี</option>
                </SelectNoChildrenInput>
              </div>

            </div>

          </div>

        </section>

        {/* PopUp ค้นหาอะไหล่ */}
        <PopupModalChecklist />
      </div>
    </div>
  )

}

export default TopContent;