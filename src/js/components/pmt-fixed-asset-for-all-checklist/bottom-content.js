import React, { useEffect, useState } from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux';

import { useFormikContext } from 'formik';
import { FACTS } from '../../redux/modules/api/fact.js';
import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';

import CheckboxInput from '../common/formik-checkbox-input';
import NumberInput from '../common/formik-number-input';
import TextInput from '../common/formik-text-input';
import '../../../css/table.css';

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { fetchPositionPermissionData, changeTheam } from '../../helper.js'
const BottomContent = (props) => {
  const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
  const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
  const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);

  let checklist_id;
  return (
    <>
      {/* THIS MAKES THE BACKGROUND NOT GRAY!! NEEDS TO FIX */}
      <div id={changeTheam() === true ? "" : "blackground-gray"}>
        {/* <div className="container_12 clearfix"> */}
        <div className="container_12 " id={changeTheam() === true ? "blackground-gray" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray" } : {}}>

          <table className="table-many-column mt-2" style={{ padding: "0 10px" }}>
            <thead>
              <tr>
                <th className="font text-center" style={{ width: "30px" }}>#</th>
                <th className="font" style={{ minWidth: "30px" }}>ACTION</th>
                <th className="font" style={{ minWidth: "100px" }}>ค่าใช้จ่าย</th>
                <th className="font" style={{ minWidth: "350px" }}>แผน</th>
                <th className="font" style={{ minWidth: "350px" }}>หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>
              {
                values.station_id
                  ?
                  values.checklist_line_item.map((list, index) => {
                    if (values.weekly_task_id === list.weekly_task_id) {
                      return (
                        <tr key={index} id={index}>
                          <td className="edit-padding text-center">{index + 1}</td>
                          <td className="edit-padding" style={{ padding: "5px 15px" }}>
                            <CheckboxInput name={`checklist_line_item[${index}].is_checked`}
                              disabled={values.checkBooleanForEdit === true ? false : values.toolbar_mode === TOOLBAR_MODE.REPORT}
                              checked={values.checklist_line_item[index].is_checked} value={true} />
                          </td>
                          <td className="edit-padding">
                            <NumberInput name={`checklist_line_item[${index}].cost`}
                              disabled={values.checkBooleanForEdit === true ? false : values.toolbar_mode === TOOLBAR_MODE.REPORT} />
                          </td>
                          <td className="edit-padding" style={{ overflow: "hidden", maxWidth: "600px" }}>{list.checklist_name + "\\\\" + list.checklist_line_item_name}</td>
                          <td className="edit-padding">
                            <TextInput name={`checklist_line_item[${index}].remark`}
                              disabled={values.checkBooleanForEdit === true ? false : values.toolbar_mode === TOOLBAR_MODE.REPORT} />
                          </td>
                        </tr>
                      )
                    }
                  })
                  :
                  values.checklist_line_item.map((list, index) => {
                    if (values.checklist_id === list.checklist_id && values.weekly_task_id === list.weekly_task_id) {
                      return (
                        <tr key={index} id={index}>
                          <td className="edit-padding text-center">{index + 1}</td>
                          <td className="edit-padding" style={{ padding: "5px 15px" }}>
                            <CheckboxInput name={`checklist_line_item[${index}].is_checked`}
                              disabled={values.checkBooleanForEdit === true ? false : values.toolbar_mode === TOOLBAR_MODE.REPORT}
                              checked={values.checklist_line_item[index].is_checked} value={1} />
                          </td>
                          <td className="edit-padding">
                            <NumberInput name={`checklist_line_item[${index}].cost`}
                              disabled={values.checkBooleanForEdit === true ? false : values.toolbar_mode === TOOLBAR_MODE.REPORT} />
                          </td>
                          <td className="edit-padding" style={{ overflow: "hidden", maxWidth: "600px" }}>{list.checklist_line_item_name}</td>
                          <td className="edit-padding">
                            <TextInput name={`checklist_line_item[${index}].remark`}
                              disabled={values.checkBooleanForEdit === true ? false : values.toolbar_mode === TOOLBAR_MODE.REPORT} />
                          </td>
                        </tr>
                      )
                    }
                  })
              }
            </tbody>
          </table>

        </div>
      </div>
    </>
  )
};

export default BottomContent;