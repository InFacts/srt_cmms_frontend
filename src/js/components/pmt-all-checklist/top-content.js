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
  const factChecklistGroup = useSelector((state) => ({ ...state.api.fact[FACTS.CHECKLIST_GROUP] }), shallowEqual);
  const factChecklist = useSelector((state) => ({ ...state.api.fact.checklist }), shallowEqual);
  const factChecklistLineItem = useSelector((state) => ({ ...state.api.fact[FACTS.CHECKLIST_LINE_ITEM] }), shallowEqual);

  useEffect(() => {
    setFieldValue("checklist_line_item", factChecklistLineItem.items, false)
    fetchChecklistLineItem();
  }, [factChecklistLineItem.items])

  const fetchChecklistLineItem = () => {
    let filter_item = [];
    let items = factChecklistLineItem.items;
    items.map((item) => {
      if (item.checklist_id == values.checklist_id) {
        filter_item.push(item)
      }
    })
    // console.log("filter_item", filter_item)
    // if(filter_item.length !== 0) {
      setFieldValue("checklist_line_item", filter_item, false)
    // } else {
    //   setFieldValue("checklist_line_item", factChecklistLineItem.items, false)
    // }
  };
  console.log("factChecklistLineItem.items", factChecklistLineItem.items)
  return (
    <div id={changeTheam() === true ? "" : "blackground-white"}>
      <div className="container_12 clearfix">
        <section className="container_12 ">
          <FormTitle>แผนการทำวาระ</FormTitle>

          <div id={changeTheam() === true ? "blackground-white" : ""}
            style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray", height: "80px", paddingTop: "10px" } : {}}>

            <div className="container_12">

              {/* === checklist_group_id === */}
              <div className="grid_2 omega">
                <p className="top-text">กลุ่มการทำวาระ</p>
              </div>
              <div className="grid_3 alpha omega pull_0">
                <SelectNoChildrenInput name="checklist_group_id" tabIndex="1">
                  <option value=''></option>
                  {factChecklistGroup.items.map((factChecklistGroup) => {
                    return (<option value={factChecklistGroup.checklist_group_id}>{factChecklistGroup.name}</option>)
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
                <SelectNoChildrenInput name="checklist_id" tabIndex="1">
                  <option value=''></option>
                  {factChecklist.items.map((factChecklist) => {
                    if (values.checklist_group_id == factChecklist.checklist_group_id) {
                      return (<option value={factChecklist.checklist_id}>{factChecklist.checklist_name}</option>)
                    }
                  })}
                </SelectNoChildrenInput>
              </div>

              <div className="grid_1 alpha omega">
                <button type="button" className="button-blue" onClick={() => fetchChecklistLineItem()}>ค้นหา</button>
              </div>

            </div>

          </div>
        </section>
      </div>
    </div>
  )

}

export default TopContent;