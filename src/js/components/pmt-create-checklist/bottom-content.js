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
import PopupModalCheckListLineItem from '../common/popup-modal-checklist'

import Files from '../common/files2'

import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import { useFormikContext } from 'formik';
import { FACTS } from '../../redux/modules/api/fact.js';

import '../../../css/table.css';

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { fetchPositionPermissionData, changeTheam } from '../../helper.js'
const BottomContent = (props) => {
  const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
  const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
  const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
  const factPosition = useSelector((state) => ({ ...state.api.fact.position }), shallowEqual);

  const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);
  const factEquipmentGroup = useSelector((state) => ({ ...state.api.fact[FACTS.EQUIPMENT_GROUP] }), shallowEqual);
  const factChecklist = useSelector((state) => ({ ...state.api.fact.checklist }), shallowEqual);

  return (
    <>
      {/* THIS MAKES THE BACKGROUND NOT GRAY!! NEEDS TO FIX */}
      <div id={changeTheam() === true ? "" : "blackground-gray"}>
        {/* <div className="container_12 clearfix"> */}
        <div className="container_12 " id={changeTheam() === true ? "blackground-gray" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray" } : {}}>
          {/* General Tab */}
          <div id="general_content" className="tabcontent">

            <table className="table-many-column" style={{ padding: "10px" }}>
              <thead>
                <tr>
                  <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                  <th className="font" style={{ minWidth: "130px" }}>เลขที่อะไหล่</th>
                  <th className="font" style={{ minWidth: "435px" }}>รายละเอียด</th>
                  <th className="font text-center" style={{ minWidth: "160px" }}>จำนวน</th>
                  <th className="font text-center" style={{ minWidth: "160px" }}>หน่วยนับ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="edit-padding text-center"></th>
                  <td className="edit-padding"></td>
                  <td className="edit-padding"></td>
                  <td className="edit-padding text-center"></td>
                  <td className="edit-padding text-center"></td>
                </tr>
              </tbody>
            </table>

          </div>

          {/* Attachment Tab */}
          <div id="attachment_content" className="tabcontent">
            <Files />
          </div>

        </div>

        {/* PopUp ค้นหาอะไหล่ */}
        <PopupModalCheckListLineItem />

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