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
  const factUnit = useSelector((state) => ({ ...state.api.fact[FACTS.UNIT_OF_MEASURE] }), shallowEqual);

  const factChecklist = useSelector((state) => ({ ...state.api.fact.checklist }), shallowEqual);

  const [lineNumber, setLineNumber] = useState('');

  const validateLineNumberInternalItemIDField = internal_item_id => {
    //     By default Trigger every line_item, so need to check if the internal_item_id changes ourselves
    // if (values.line_items[index].internal_item_id === internal_item_id) {
    //   return;
    // }
    // if (internal_item_id === "") {
    //   setFieldValue('checklist_line_item_use_equipment[${index}]' + `.description`, '', false);
    //   setFieldValue('checklist_line_item_use_equipment[${index}]' + `.quantity`, '', false);
    //   setFieldValue('checklist_line_item_use_equipment[${index}]' + `.uom_id`, '', false);
    //   setFieldValue('checklist_line_item_use_equipment[${index}]' + `.per_unit_price`, '', false);
    //   return;
    // }
    // let items = props.fact.items.items;
    // let item = items.find(item => `${item.internal_item_id}` === `${internal_item_id}`); // Returns undefined if not found
    // console.log(item)
    // if (item) {
    //   setFieldValue('checklist_line_item_use_equipment[${index}]' + `.description`, `${item.description}`, false);
    //   setFieldValue('checklist_line_item_use_equipment[${index}]' + `.quantity`, 0, false);
    //   setFieldValue('checklist_line_item_use_equipment[${index}]' + `.list_uoms`, item.list_uoms, false);
    //   setFieldValue('checklist_line_item_use_equipment[${index}]' + `.uom_id`, item.list_uoms[0].uom_id, false);
    //   setFieldValue('checklist_line_item_use_equipment[${index}]' + `.line_number`, index+1, false);
    //   setFieldValue('checklist_line_item_use_equipment[${index}]' + `.item_status_id`, 1, false);
    //   setFieldValue('checklist_line_item_use_equipment[${index}]' + `.per_unit_price`, 0, false);
    //   return;
    // } else {
    //   return 'Invalid Number ID';
    // }
  }

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
                {values.checklist_line_item_use_equipment.map((list, index) => {
                  return (
                    <tr>
                      <th className="edit-padding text-center">{index + 1}</th>
                      <td className="edit-padding">
                        {/* {list.item && list.item.internal_item_id} */}
                        <TextInput name={`checklist_line_item_use_equipment[${index}].internal_item_id`}
                          validate={validateLineNumberInternalItemIDField} 
                          disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                          searchable={toolbar.mode !== TOOLBAR_MODE.SEARCH} ariaControls="modalNoPart"
                          handleModalClick={() => setLineNumber(index + 1)}
                          redBorderForError="error-in-table"
                        />
                      </td>
                      <td className="edit-padding">{list && list.description}</td>
                      <td className="edit-padding text-center">
                        {/* {list.quantity && list.quantity} */}
                        <NumberInput step={1} name={`checklist_line_item_use_equipment[${index}].quantity`} tabIndex="7"
                          disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                          redBorderForError="error-in-table" />
                      </td>
                      <td className="edit-padding text-center">
                        {/* {list.item && list.item.uom_group.uom[0].name} */}
                        <SelectNoChildrenInput name={`checklist_line_item_use_equipment[${index}].uom_id`} disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} >
                          <option value=''></option>
                          {factUnit.items.map((factUnit) => {
                            return (<option value={factUnit.uom_id} key={factUnit.uom_id}>{factUnit.name}</option>)
                          })}
                        </SelectNoChildrenInput>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

          </div>

          {/* Attachment Tab */}
          <div id="attachment_content" className="tabcontent">
            <Files />
          </div>

        </div>

        {/* PopUp ค้นหาอะไหล่ MODE ADD */}
        <PopupModalNoPart keyname='line_items' lineNumber={lineNumber} nameModal="modalNoPart" />

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