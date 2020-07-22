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
  const factChecklistCustomGroup = useSelector((state) => ({ ...state.api.fact[FACTS.CHECKLIST_CUSTOM_GROUP] }), shallowEqual);
  const factChecklistEquipmentGroup = useSelector((state) => ({ ...state.api.fact[FACTS.CHECKLIST_EQUIPMENT_GROUP] }), shallowEqual);
  const factChecklist = useSelector((state) => ({ ...state.api.fact.checklist }), shallowEqual);
  const factChecklistLineItem = useSelector((state) => ({ ...state.api.fact[FACTS.CHECKLIST_LINE_ITEM] }), shallowEqual);

  return (
    <div id={changeTheam() === true ? "" : "blackground-white"}>
      <div className="container_12 clearfix">
        <section className="container_12 ">
          <FormTitle>ทำวาระ</FormTitle>

          <div id={changeTheam() === true ? "blackground-white" : ""}
            style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray", height: "50px", paddingTop: "10px" } : {}}>

            <div className="container_12">

              {/* === equipment_status_id_th === */}
              <div className="grid_2 omega">
                <p className="top-text">ชนิดการทำวาระ</p>
              </div>
              <div className="grid_3 alpha omega pull_0">
                <SelectNoChildrenInput name="checklist_id" disabled>
                  <option value=''></option>
                  {factChecklist.items.map((factChecklist) => {
                      return <option value={factChecklist.checklist_id}>{factChecklist.checklist_name}</option>
                  })}
                </SelectNoChildrenInput>
              </div>

            </div>

          </div>
        </section>
      </div>
    </div>
  )

}

export default TopContent;