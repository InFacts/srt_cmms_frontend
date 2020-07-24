import React, { useEffect, useState } from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux';

import TextareaInput from '../common/formik-textarea-input';
import TextInput from '../common/formik-text-input'
import NumberInput from '../common/formik-number-input'
import SelectNoChildrenInput from '../common/formik-select-no-children';
import Label from '../common/form-label'
import TableStatus from '../common/table-status';
import PopupModalEquipment from '../common/popup-modal-equipment-installed';
import Files from '../common/files2'

import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import { useFormikContext } from 'formik';
import { FACTS } from '../../redux/modules/api/fact.js';

import '../../../css/table.css';

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { fetchPositionPermissionData, changeTheam, checkBooleanForEditHelper, validatedataDocumentField } from '../../helper.js'
const BottomContent = (props) => {
  const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
  const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
  const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
  const factPosition = useSelector((state) => ({ ...state.api.fact.position }), shallowEqual);
  const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);
  const factChecklist = useSelector((state) => ({ ...state.api.fact.checklist }), shallowEqual);
  const factChecklistCustom = useSelector((state) => ({ ...state.api.fact[FACTS.CHECKLIST_CUSTOM_GROUP] }), shallowEqual);
  const factUnitMaintenanceLocation = useSelector((state) => ({ ...state.api.fact[FACTS.UNIT_MAINTENANCE_LOCATION] }), shallowEqual);
  const factStations = useSelector((state) => ({ ...state.api.fact.stations }), shallowEqual);
  const factXCross = useSelector((state) => ({ ...state.api.fact[FACTS.X_CROSS] }), shallowEqual);

  const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);

  const [lineNumber1, setLineNumber1] = useState('');
  const [lineNumber2, setLineNumber2] = useState('');
  const [lineNumber3, setLineNumber3] = useState('');
  const [lineNumber4, setLineNumber4] = useState('');

  const validateLineNumberInternalItemIDField = (fieldName, internal_item_id, index) => {
    //     By default Trigger every line_item, so need to check if the internal_item_id changes ourselves
    if (fieldName.internal_item_id === internal_item_id) {
      return;
    }
    if (internal_item_id === "") {
      setFieldValue(fieldName + `.checklist_id`, '', false);
      setFieldValue(fieldName + `.x_cross_x_cross_id`, '', false);
      return;
    }
    let items = fact.equipment.items;
    let item = items.find(item => `${item.equipment_group.item.internal_item_id}` === `${internal_item_id}`); // Returns undefined if not found
    console.log(item)
    if (item) {
      setFieldValue(fieldName + `.checklist_id`, item.equipment_group.checklist_id, false);
      setFieldValue(fieldName + `.x_cross_x_cross_id`, item.equipment_installation[0].x_cross_x_cross_id, false);
      return;
    } else {
      return 'Invalid Number ID';
    }
  }

  let checkBooleanForEdit = checkBooleanForEditHelper(values, decoded_token, fact);
  useEffect(() => {
    checkBooleanForEdit = false
    validateField("internal_document_id")
  }, [values.internal_document_id])

  return (
    <>
      {/* THIS MAKES THE BACKGROUND NOT GRAY!! NEEDS TO FIX */}
      <div id={changeTheam() === true ? "" : "blackground-gray"}>
        {/* <div className="container_12 clearfix"> */}
        <div className="container_12 " id={changeTheam() === true ? "blackground-gray" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray" } : {}}>

          {/* w1_content Tab */}
          <div id="w1_content" className="tabcontent">
            <div className="container_12 mt-3">
              <table className="table-many-column" style={{ padding: "10px" }}>
                <thead>
                  <tr>
                    <th className="font text-center" rowSpan="2" style={{ minWidth: "30px" }}>#</th>
                    <th className="font text-center" rowSpan="2" style={{ minWidth: "240px" }}>สถานี</th>
                    <th className="font text-center" colSpan="3" style={{ minWidth: "640px" }}>คานกั้น</th>
                  </tr>
                  <tr>
                    <th className="font text-center" style={{ minWidth: "216px" }}>สินทรัพย์</th>
                    <th className="font text-center" style={{ minWidth: "216px" }}>แผน</th>
                    <th className="font text-center" style={{ minWidth: "216px" }}>เลข กม.</th>
                  </tr>
                </thead>
                <tbody>
                  {values.w1_list.map((line_item, index) => {
                    let line_number = index + 1;
                    return (
                      <tr>
                        <th className="edit-padding text-center">{line_number}</th>
                        <td className="edit-padding">
                          {
                            values.w1_list[index].internal_item_id
                              ?
                              "-"
                              :
                              <SelectNoChildrenInput name={`w1_list[${index}].station_id`}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} >
                                <option value=''></option>
                                {factStations.items.map((stations) => {
                                  if (values.node_id == stations.node_id) {
                                    return <option key={stations.station_id} value={stations.station_id}>{stations.name}</option>
                                  }
                                })}
                              </SelectNoChildrenInput>
                          }
                        </td>
                        <td className="edit-padding">
                          {
                            values.w1_list[index].station_id
                              ?
                              "-"
                              :
                              <TextInput name={`w1_list[${index}].internal_item_id`}
                                validate={internal_item_id => validateLineNumberInternalItemIDField(`w1_list[${index}]`, internal_item_id, index)}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                                searchable={checkBooleanForEdit === true ? true : toolbar.mode !== TOOLBAR_MODE.SEARCH} ariaControls="modalEquipment"
                                handleModalClick={() => setLineNumber1(line_number)}
                              />
                          }
                        </td>
                        <td className="edit-padding">
                          {
                            values.w1_list[index].station_id
                              ?
                              "-"
                              :
                              <SelectNoChildrenInput name={`w1_list[${index}].checklist_id`}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}>
                                <option value=''></option>
                                {factChecklist.items.map((checklist) => {
                                    return <option key={checklist.checklist_id} value={checklist.checklist_id}>{checklist.checklist_name}</option>
                                })}
                              </SelectNoChildrenInput>
                          }
                        </td>
                        <td className="edit-padding">
                          {
                            values.w1_list[index].station_id
                              ?
                              "-"
                              :
                              <SelectNoChildrenInput name={`w1_list[${index}].x_cross_x_cross_id`}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}>
                                <option value=''></option>
                                {factXCross.items.map((x_cross) => {
                                        return <option key={x_cross.x_cross_id} value={x_cross.x_cross_id}>{x_cross.road_center}</option>
                                    })}
                              </SelectNoChildrenInput>
                          }
                        </td>

                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* w2_content Tab */}
          <div id="w2_content" className="tabcontent">
            <div className="container_12 mt-3">
              <table className="table-many-column" style={{ padding: "10px" }}>
                <thead>
                  <tr>
                    <th className="font text-center" rowSpan="2" style={{ minWidth: "30px" }}>#</th>
                    <th className="font text-center" rowSpan="2" style={{ minWidth: "240px" }}>สถานี</th>
                    <th className="font text-center" colSpan="3" style={{ minWidth: "640px" }}>คานกั้น</th>
                  </tr>
                  <tr>
                    <th className="font text-center" style={{ minWidth: "216px" }}>สินทรัพย์</th>
                    <th className="font text-center" style={{ minWidth: "216px" }}>แผน</th>
                    <th className="font text-center" style={{ minWidth: "216px" }}>เลข กม.</th>
                  </tr>
                </thead>
                <tbody>
                {values.w2_list.map((line_item, index) => {
                    let line_number = index + 1;
                    return (
                      <tr>
                        <th className="edit-padding text-center">{line_number}</th>
                        <td className="edit-padding">
                          {
                            values.w2_list[index].internal_item_id
                              ?
                              "-"
                              :
                              <SelectNoChildrenInput name={`w2_list[${index}].station_id`}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} >
                                <option value=''></option>
                                {factStations.items.map((stations) => {
                                  if (values.node_id == stations.node_id) {
                                    return <option key={stations.station_id} value={stations.station_id}>{stations.name}</option>
                                  }
                                })}
                              </SelectNoChildrenInput>
                          }
                        </td>
                        <td className="edit-padding">
                          {
                            values.w2_list[index].station_id
                              ?
                              "-"
                              :
                              <TextInput name={`w2_list[${index}].internal_item_id`}
                                validate={internal_item_id => validateLineNumberInternalItemIDField(`w1_list[${index}]`, internal_item_id, index)}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                                searchable={checkBooleanForEdit === true ? true : toolbar.mode !== TOOLBAR_MODE.SEARCH} ariaControls="modalEquipment"
                                handleModalClick={() => setLineNumber2(line_number)}
                              />
                          }
                        </td>
                        <td className="edit-padding">
                          {
                            values.w2_list[index].station_id
                              ?
                              "-"
                              :
                              <SelectNoChildrenInput name={`w2_list[${index}].checklist_id`}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}>
                                <option value=''></option>
                                {factChecklist.items.map((checklist) => {
                                    return <option key={checklist.checklist_id} value={checklist.checklist_id}>{checklist.checklist_name}</option>
                                })}
                              </SelectNoChildrenInput>
                          }
                        </td>
                        <td className="edit-padding">
                          {
                            values.w2_list[index].station_id
                              ?
                              "-"
                              :
                              <SelectNoChildrenInput name={`w2_list[${index}].x_cross_x_cross_id`}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}>
                                <option value=''></option>
                                {factXCross.items.map((x_cross) => {
                                        return <option key={x_cross.x_cross_id} value={x_cross.x_cross_id}>{x_cross.road_center}</option>
                                    })}
                              </SelectNoChildrenInput>
                          }
                        </td>

                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* w3_content Tab */}
          <div id="w3_content" className="tabcontent">
            <div className="container_12 mt-3">
              <table className="table-many-column" style={{ padding: "10px" }}>
                <thead>
                  <tr>
                    <th className="font text-center" rowSpan="2" style={{ minWidth: "30px" }}>#</th>
                    <th className="font text-center" rowSpan="2" style={{ minWidth: "240px" }}>สถานี</th>
                    <th className="font text-center" colSpan="3" style={{ minWidth: "640px" }}>คานกั้น</th>
                  </tr>
                  <tr>
                    <th className="font text-center" style={{ minWidth: "216px" }}>สินทรัพย์</th>
                    <th className="font text-center" style={{ minWidth: "216px" }}>แผน</th>
                    <th className="font text-center" style={{ minWidth: "216px" }}>เลข กม.</th>
                  </tr>
                </thead>
                <tbody>
                {values.w3_list.map((line_item, index) => {
                    let line_number = index + 1;
                    return (
                      <tr>
                        <th className="edit-padding text-center">{line_number}</th>
                        <td className="edit-padding">
                          {
                            values.w3_list[index].internal_item_id
                              ?
                              "-"
                              :
                              <SelectNoChildrenInput name={`w3_list[${index}].station_id`}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} >
                                <option value=''></option>
                                {factStations.items.map((stations) => {
                                  if (values.node_id == stations.node_id) {
                                    return <option key={stations.station_id} value={stations.station_id}>{stations.name}</option>
                                  }
                                })}
                              </SelectNoChildrenInput>
                          }
                        </td>
                        <td className="edit-padding">
                          {
                            values.w3_list[index].station_id
                              ?
                              "-"
                              :
                              <TextInput name={`w3_list[${index}].internal_item_id`}
                                validate={internal_item_id => validateLineNumberInternalItemIDField(`w1_list[${index}]`, internal_item_id, index)}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                                searchable={checkBooleanForEdit === true ? true : toolbar.mode !== TOOLBAR_MODE.SEARCH} ariaControls="modalEquipment"
                                handleModalClick={() => setLineNumber3(line_number)}
                              />
                          }
                        </td>
                        <td className="edit-padding">
                          {
                            values.w3_list[index].station_id
                              ?
                              "-"
                              :
                              <SelectNoChildrenInput name={`w3_list[${index}].checklist_id`}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}>
                                <option value=''></option>
                                {factChecklist.items.map((checklist) => {
                                    return <option key={checklist.checklist_id} value={checklist.checklist_id}>{checklist.checklist_name}</option>
                                })}
                              </SelectNoChildrenInput>
                          }
                        </td>
                        <td className="edit-padding">
                          {
                            values.w3_list[index].station_id
                              ?
                              "-"
                              :
                              <SelectNoChildrenInput name={`w3_list[${index}].x_cross_x_cross_id`}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}>
                                <option value=''></option>
                                {factXCross.items.map((x_cross) => {
                                        return <option key={x_cross.x_cross_id} value={x_cross.x_cross_id}>{x_cross.road_center}</option>
                                    })}
                              </SelectNoChildrenInput>
                          }
                        </td>

                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* w4_content Tab */}
          <div id="w4_content" className="tabcontent">
            <div className="container_12 mt-3">
              <table className="table-many-column" style={{ padding: "10px" }}>
                <thead>
                  <tr>
                    <th className="font text-center" rowSpan="2" style={{ minWidth: "30px" }}>#</th>
                    <th className="font text-center" rowSpan="2" style={{ minWidth: "240px" }}>สถานี</th>
                    <th className="font text-center" colSpan="3" style={{ minWidth: "640px" }}>คานกั้น</th>
                  </tr>
                  <tr>
                    <th className="font text-center" style={{ minWidth: "216px" }}>สินทรัพย์</th>
                    <th className="font text-center" style={{ minWidth: "216px" }}>แผน</th>
                    <th className="font text-center" style={{ minWidth: "216px" }}>เลข กม.</th>
                  </tr>
                </thead>
                <tbody>
                {values.w1_list.map((line_item, index) => {
                    let line_number = index + 1;
                    return (
                      <tr>
                        <th className="edit-padding text-center">{line_number}</th>
                        <td className="edit-padding">
                          {
                            values.w4_list[index].internal_item_id
                              ?
                              "-"
                              :
                              <SelectNoChildrenInput name={`w4_list[${index}].station_id`}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} >
                                <option value=''></option>
                                {factStations.items.map((stations) => {
                                  if (values.node_id == stations.node_id) {
                                    return <option key={stations.station_id} value={stations.station_id}>{stations.name}</option>
                                  }
                                })}
                              </SelectNoChildrenInput>
                          }
                        </td>
                        <td className="edit-padding">
                          {
                            values.w4_list[index].station_id
                              ?
                              "-"
                              :
                              <TextInput name={`w4_list[${index}].internal_item_id`}
                                validate={internal_item_id => validateLineNumberInternalItemIDField(`w1_list[${index}]`, internal_item_id, index)}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                                searchable={checkBooleanForEdit === true ? true : toolbar.mode !== TOOLBAR_MODE.SEARCH} ariaControls="modalEquipment"
                                handleModalClick={() => setLineNumber4(line_number)}
                              />
                          }
                        </td>
                        <td className="edit-padding">
                          {
                            values.w4_list[index].station_id
                              ?
                              "-"
                              :
                              <SelectNoChildrenInput name={`w4_list[${index}].checklist_id`}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}>
                                <option value=''></option>
                                {factChecklist.items.map((checklist) => {
                                    return <option key={checklist.checklist_id} value={checklist.checklist_id}>{checklist.checklist_name}</option>
                                })}
                              </SelectNoChildrenInput>
                          }
                        </td>
                        <td className="edit-padding">
                          {
                            values.w4_list[index].station_id
                              ?
                              "-"
                              :
                              <SelectNoChildrenInput name={`w4_list[${index}].x_cross_x_cross_id`}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}>
                                <option value=''></option>
                                {factXCross.items.map((x_cross) => {
                                        return <option key={x_cross.x_cross_id} value={x_cross.x_cross_id}>{x_cross.road_center}</option>
                                    })}
                              </SelectNoChildrenInput>
                          }
                        </td>

                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Attachment Tab */}
          <div id="attachment_content" className="tabcontent">
            <Files />
          </div>

          <div id="table_status_content" className="tabcontent">
            <TableStatus bodyTableStatus={values.step_approve} />
          </div>

        </div>

        <PopupModalEquipment keyname='w1_list' lineNumber={lineNumber1} />
        <PopupModalEquipment keyname='w2_list' lineNumber={lineNumber2} />
        <PopupModalEquipment keyname='w3_list' lineNumber={lineNumber3} />
        <PopupModalEquipment keyname='w4_list' lineNumber={lineNumber4} />

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