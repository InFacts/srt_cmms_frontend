import React, { useEffect, useState } from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux';

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import TextareaInput from '../common/formik-textarea-input';
import TextInput from '../common/formik-text-input'
import NumberInput from '../common/formik-number-input'
import SelectInput from '../common/formik-select-input';
import SelectNoChildrenInput from '../common/formik-select-no-children';
import Label from '../common/form-label'
import PopupModalCheckListLineItem from '../common/popup-modal-checklist'
import PopupModalNoPart from '../common/popup-modal-nopart'
import Files from '../common/files2'
import TableCreatePlan from '../common/table_for_create-plan_pmt';

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

  const [lineNumber, setLineNumber] = useState('');

  const validateLineNumberInternalItemIDField = (fieldName, internal_item_id, index) => {
    //     By default Trigger every line_item, so need to check if the internal_item_id changes ourselves
    if (values.checklist_line_item_use_equipment[index].internal_item_id === internal_item_id) {
      return;
    }
    console.log("111111")
    if (internal_item_id === "") {
      setFieldValue(fieldName + `.description`, '', false);
      setFieldValue(fieldName + `.quantity`, '', false);
      setFieldValue(fieldName + `.uom_id`, '', false);
      setFieldValue(fieldName + `.uom_group_id`, '', false);
      return;
    }

    let items = fact.items.items;
    let item = items.find(item => `${item.internal_item_id}` === `${internal_item_id}`); // Returns undefined if not found
    console.log(item)
    if (item) {
      setFieldValue(fieldName + `.item_id`, item.item_id, false);
      setFieldValue(fieldName + `.description`, item.description, false);
      setFieldValue(fieldName + `.quantity`, 0, false);
      setFieldValue(fieldName + `.uom_id`, 0, false);
      setFieldValue(fieldName + `.uom_group_id`, item.uom_group_id, false);
      return;
    } else {
      return 'Invalid Number ID';
    }
  }

  return (
    <>
      {/* THIS MAKES THE BACKGROUND NOT GRAY!! NEEDS TO FIX */}
      <div id={changeTheam() === true ? "" : "blackground-gray"}>
        {/* <div className="container_12 clearfix"> */}
        <div className="container_12 " id={changeTheam() === true ? "blackground-gray" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray" } : {}}>
          {/* General Tab */}
          <div id="general_content" className="tabcontent">
            <TableCreatePlan checklist_line_item_use_equipment={values.checklist_line_item_use_equipment}
              validateLineNumberInternalItemIDField={validateLineNumberInternalItemIDField}
              setLineNumber={setLineNumber}
              tabIndex={7}
              checkBooleanForEdit={values.modeEdit}
            />
          </div>

          {/* Attachment Tab */}
          <div id="attachment_content" className="tabcontent">
            <Files />
          </div>

        </div>

        {/* PopUp ค้นหาอะไหล่ MODE ADD */}
        <PopupModalNoPart keyname='checklist_line_item_use_equipment' lineNumber={lineNumber} nameModal="modalNoPart" />

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