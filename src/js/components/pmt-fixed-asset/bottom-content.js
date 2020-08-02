import React, { useEffect, useState } from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom'

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import TableStatus from '../common/table-status';
import Files from '../common/files2'
import TextInput from '../common/formik-text-input';
import SelectNoChildrenInput from '../common/formik-select-no-children';
import Label from '../common/form-label'

import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import { useFormikContext } from 'formik';
import { FACTS } from '../../redux/modules/api/fact.js';

import '../../../css/table.css';

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { fetchPositionPermissionData, changeTheam, checkBooleanForEditCheckNodeIDHelperForWorkOrderPM, validatedataDocumentField } from '../../helper.js'
const BottomContent = (props) => {
  const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
  const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
  const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
  const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);
  const factLevel = useSelector((state) => ({ ...state.api.fact[FACTS.LEVEL] }), shallowEqual);

  const [rowItem, setRowItem] = useState([]);

  let checkBooleanForEdit = checkBooleanForEditCheckNodeIDHelperForWorkOrderPM(values, decoded_token, fact);
  useEffect(() => {
    checkBooleanForEdit = false
    validateField("internal_document_id")
  }, [values.internal_document_id])

  const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  }

  useEffect(() => {
    let item = [];
    let item_show_not_unique = [];
    values.work_order_pm_has_selector_checklist_line_item && values.work_order_pm_has_selector_checklist_line_item.map((clecklist) => {
      if (clecklist.is_checked) {
        item.push(`${clecklist.checklist_line_item_id}`)
      }
    })
    var unique = item.filter(onlyUnique);
    // console.log("unique", unique)
    unique.map((id) => {
      const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/fact/checklist-line-item/${id}`;
      axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((res) => {
          // console.log("res", res.data.checklist_line_item.checklist_line_item_use_equipment)
          if (res.data.checklist_line_item.checklist_line_item_use_equipment.length >= 1) {
            res.data.checklist_line_item.checklist_line_item_use_equipment.map((checklist_line_item) => {
              // console.log("checklist_line_item", checklist_line_item)

              item_show_not_unique.push(checklist_line_item)
              // console.log("item_show_not_unique", item_show_not_unique)
              
              var item_show_unique = item_show_not_unique.filter(onlyUnique);
              setRowItem(item_show_unique);
              // console.log("item_show_unique", item_show_unique)
            })
          }
        })
    })
  }, [values.work_order_pm_has_selector_checklist_line_item])

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
                    <th className="font text-center" style={{ minWidth: "100px" }}>สินทรัพย์</th>
                    <th className="font text-center" style={{ minWidth: "216px" }}>แผน</th>
                    <th className="font text-center" style={{ minWidth: "100px" }}>เลข กม.</th>
                  </tr>
                </thead>
                <tbody>
                  {values.w1_list.map((line_item, index) => {
                    // console.log("line_item", line_item)
                    let line_number = index + 1;
                    return (
                      <tr>
                        <th className="edit-padding text-center">{line_number}</th>
                        <td className="edit-padding">
                          {values.w1_list[index].internal_item_id ? "-" :
                            <Link to={{
                              pathname: `pmt-all-checklist-fixed-asset`,
                              aboutProps: {
                                station_id: line_item.station_id,
                                weekly_task_id: line_item.weekly_task_id,
                                work_order_pm_has_selector_checklist_line_item: values.work_order_pm_has_selector_checklist_line_item,
                                document_id: values.document_id,
                                internal_document_id: values.internal_document_id,
                                checkBooleanForEdit: checkBooleanForEdit,
                                toolbar_mode: toolbar.mode
                              }
                            }}>{line_item.station_th}</Link>}
                        </td>
                        <td className="edit-padding text-center">
                          {values.w1_list[index].station_id ? "-" : line_item.internal_item_id}
                        </td>
                        <td className="edit-padding">
                          {values.w1_list[index].station_id ? "-" :
                            <Link to={{
                              pathname: `pmt-all-checklist-fixed-asset`, aboutProps: {
                                checklist_id: line_item.checklist_id,
                                weekly_task_id: line_item.weekly_task_id, work_order_pm_has_selector_checklist_line_item: values.work_order_pm_has_selector_checklist_line_item,
                                document_id: values.document_id,
                                internal_document_id: values.internal_document_id,
                                checkBooleanForEdit: checkBooleanForEdit,
                                toolbar_mode: toolbar.mode
                              }
                            }}>{line_item.checklist_name}</Link>}
                        </td>
                        <td className="edit-padding text-center">
                          {values.w1_list[index].station_id ? "-" : line_item.x_cross_x_cross_th}
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
                    <th className="font text-center" style={{ minWidth: "100px" }}>สินทรัพย์</th>
                    <th className="font text-center" style={{ minWidth: "216px" }}>แผน</th>
                    <th className="font text-center" style={{ minWidth: "100px" }}>เลข กม.</th>
                  </tr>
                </thead>
                <tbody>
                  {values.w2_list.map((line_item, index) => {
                    let line_number = index + 1;
                    return (
                      <tr>
                        <th className="edit-padding text-center">{line_number}</th>
                        <td className="edit-padding">
                          {values.w2_list[index].internal_item_id ? "-" :
                            <Link to={{
                              pathname: `pmt-all-checklist-fixed-asset`,
                              aboutProps: {
                                station_id: line_item.station_id,
                                weekly_task_id: line_item.weekly_task_id,
                                work_order_pm_has_selector_checklist_line_item: values.work_order_pm_has_selector_checklist_line_item,
                                document_id: values.document_id,
                                internal_document_id: values.internal_document_id,
                                checkBooleanForEdit: checkBooleanForEdit,
                                toolbar_mode: toolbar.mode
                              }
                            }}>{line_item.station_th}</Link>}
                        </td>
                        <td className="edit-padding text-center">
                          {values.w2_list[index].station_id ? "-" : line_item.internal_item_id}
                        </td>
                        <td className="edit-padding">
                          {values.w2_list[index].station_id ? "-" :
                            <Link to={{
                              pathname: `pmt-all-checklist-fixed-asset`, aboutProps: {
                                checklist_id: line_item.checklist_id,
                                weekly_task_id: line_item.weekly_task_id, work_order_pm_has_selector_checklist_line_item: values.work_order_pm_has_selector_checklist_line_item,
                                document_id: values.document_id,
                                internal_document_id: values.internal_document_id,
                                checkBooleanForEdit: checkBooleanForEdit,
                                toolbar_mode: toolbar.mode
                              }
                            }}>{line_item.checklist_name}</Link>}
                        </td>
                        <td className="edit-padding text-center">
                          {values.w2_list[index].station_id ? "-" : line_item.x_cross_x_cross_th}
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
                    <th className="font text-center" style={{ minWidth: "100px" }}>สินทรัพย์</th>
                    <th className="font text-center" style={{ minWidth: "216px" }}>แผน</th>
                    <th className="font text-center" style={{ minWidth: "100px" }}>เลข กม.</th>
                  </tr>
                </thead>
                <tbody>
                  {values.w3_list.map((line_item, index) => {
                    let line_number = index + 1;
                    return (
                      <tr>
                        <th className="edit-padding text-center">{line_number}</th>
                        <td className="edit-padding">
                          {values.w3_list[index].internal_item_id ? "-" :
                            <Link to={{
                              pathname: `pmt-all-checklist-fixed-asset`,
                              aboutProps: {
                                station_id: line_item.station_id,
                                weekly_task_id: line_item.weekly_task_id,
                                work_order_pm_has_selector_checklist_line_item: values.work_order_pm_has_selector_checklist_line_item,
                                document_id: values.document_id,
                                internal_document_id: values.internal_document_id,
                                checkBooleanForEdit: checkBooleanForEdit,
                                toolbar_mode: toolbar.mode
                              }
                            }}>{line_item.station_th}</Link>}
                        </td>
                        <td className="edit-padding text-center">
                          {values.w3_list[index].station_id ? "-" : line_item.internal_item_id}
                        </td>
                        <td className="edit-padding">
                          {values.w3_list[index].station_id ? "-" :
                            <Link to={{
                              pathname: `pmt-all-checklist-fixed-asset`, aboutProps: {
                                checklist_id: line_item.checklist_id,
                                weekly_task_id: line_item.weekly_task_id, work_order_pm_has_selector_checklist_line_item: values.work_order_pm_has_selector_checklist_line_item,
                                document_id: values.document_id,
                                internal_document_id: values.internal_document_id,
                                checkBooleanForEdit: checkBooleanForEdit,
                                toolbar_mode: toolbar.mode
                              }
                            }}>{line_item.checklist_name}</Link>}
                        </td>
                        <td className="edit-padding text-center">
                          {values.w3_list[index].station_id ? "-" : line_item.x_cross_x_cross_th}
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
                    <th className="font text-center" style={{ minWidth: "100px" }}>สินทรัพย์</th>
                    <th className="font text-center" style={{ minWidth: "216px" }}>แผน</th>
                    <th className="font text-center" style={{ minWidth: "100px" }}>เลข กม.</th>
                  </tr>
                </thead>
                <tbody>
                  {values.w4_list.map((line_item, index) => {
                    let line_number = index + 1;
                    return (
                      <tr>
                        <th className="edit-padding text-center">{line_number}</th>
                        <td className="edit-padding">
                          {values.w4_list[index].internal_item_id ? "-" :
                            <Link to={{
                              pathname: `pmt-all-checklist-fixed-asset`,
                              aboutProps: {
                                station_id: line_item.station_id,
                                weekly_task_id: line_item.weekly_task_id,
                                work_order_pm_has_selector_checklist_line_item: values.work_order_pm_has_selector_checklist_line_item,
                                document_id: values.document_id,
                                internal_document_id: values.internal_document_id,
                                checkBooleanForEdit: checkBooleanForEdit,
                                toolbar_mode: toolbar.mode
                              }
                            }}>{line_item.station_th}</Link>}
                        </td>
                        <td className="edit-padding text-center">
                          {values.w4_list[index].station_id ? "-" : line_item.internal_item_id}
                        </td>
                        <td className="edit-padding">
                          {values.w4_list[index].station_id ? "-" :
                            <Link to={{
                              pathname: `pmt-all-checklist-fixed-asset`, aboutProps: {
                                checklist_id: line_item.checklist_id,
                                weekly_task_id: line_item.weekly_task_id, work_order_pm_has_selector_checklist_line_item: values.work_order_pm_has_selector_checklist_line_item,
                                document_id: values.document_id,
                                internal_document_id: values.internal_document_id,
                                checkBooleanForEdit: checkBooleanForEdit,
                                toolbar_mode: toolbar.mode
                              }
                            }}>{line_item.checklist_name}</Link>}
                        </td>
                        <td className="edit-padding text-center">
                          {values.w4_list[index].station_id ? "-" : line_item.x_cross_x_cross_th}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* === Tab related_parties_content  === */}
          <div id="related_parties_content" className="tabcontent">
            {/* Component Title */}
            <h3 className="head-title-bottom mt-2">ผู้ปฎิบัติงาน</h3>

            {/* === One Column   ==== */}
            <div className="grid_12">
              {/* auditor_name  */}
              <div className="grid_2 alpha white-space">
                <p className="top-text">ผู้ดำเนินการทำวาระ</p>
              </div>
              <div className="grid_4 alpha omega">
                <TextInput name="member_lead" tabIndex="31"
                  disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
              </div>

              <Label>ตำแหน่ง</Label>
              <div className="grid_4 alpha omega">
                <SelectNoChildrenInput name="member_lead_level_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="32">
                  <option value='' selected></option>
                  {factLevel.items.map((position) => {
                    if (values.member_lead_level_id === position.level_id) {
                      return <option key={position.level_id} value={position.level_id} selected>{position.level}</option>
                    } else return <option key={position.level_id} value={position.level_id}>{position.level}</option>
                  })}
                </SelectNoChildrenInput>
              </div>
              <div className="clear" />

              {/* fixer_name  */}
              <div className="grid_2 alpha white-space">
                <p className="top-text">รายชื่อเพื่อนร่วมงาน</p>
              </div>
              <div className="grid_4 alpha omega">
                <TextInput name="member_1" tabIndex="33"
                  disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
              </div>
              <Label>ตำแหน่ง</Label>
              <div className="grid_4 alpha omega">
                <SelectNoChildrenInput name="member_1_level_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="34">
                  <option value='' selected></option>
                  {factLevel.items.map((position) => {
                    if (values.member_1_level_id === position.level_id) {
                      return <option key={position.level_id} value={position.level_id} selected>{position.level}</option>
                    } else return <option key={position.level_id} value={position.level_id}>{position.level}</option>
                  })}
                </SelectNoChildrenInput>
              </div>
              <div className="clear" />


              {/* member_1  */}
              <div className="grid_2 alpha white-space">
                <p className="top-text">รายชื่อเพื่อนร่วมงาน</p>
              </div>
              <div className="grid_4 alpha omega">
                <TextInput name="member_2" tabIndex="35"
                  disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
              </div>
              <Label>ตำแหน่ง</Label>
              <div className="grid_4 alpha omega">
                <SelectNoChildrenInput name="member_2_level_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="36">
                  <option value='' selected></option>
                  {factLevel.items.map((position) => {
                    if (values.member_2_level_id === position.level_id) {
                      return <option key={position.level_id} value={position.level_id} selected>{position.level}</option>
                    } else return <option key={position.level_id} value={position.level_id}>{position.level}</option>
                  })}
                </SelectNoChildrenInput>
              </div>
              <div className="clear" />

              {/* member_2  */}
              <div className="grid_2 alpha white-space">
                <p className="top-text">รายชื่อเพื่อนร่วมงาน</p>
              </div>
              <div className="grid_4 alpha omega">
                <TextInput name="member_3"
                  disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="37" />
              </div>
              <Label>ตำแหน่ง</Label>
              <div className="grid_4 alpha omega">
                <SelectNoChildrenInput name="member_3_level_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="38">
                  <option value='' selected></option>
                  {factLevel.items.map((position) => {
                    if (values.member_3_level_id === position.level_id) {
                      return <option key={position.level_id} value={position.level_id} selected>{position.level}</option>
                    } else return <option key={position.level_id} value={position.level_id}>{position.level}</option>
                  })}
                </SelectNoChildrenInput>
              </div>
              <div className="clear" />

              {/* member_3  */}
              <div className="grid_2 alpha white-space">
                <p className="top-text">รายชื่อเพื่อนร่วมงาน</p>
              </div>
              <div className="grid_4 alpha omega">
                <TextInput name="member_4" tabIndex="39"
                  disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
              </div>
              <Label>ตำแหน่ง</Label>
              <div className="grid_4 alpha omega">
                <SelectNoChildrenInput name="member_4_level_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="40">
                  <option value='' selected></option>
                  {factLevel.items.map((position) => {
                    if (values.member_4_level_id === position.level_id) {
                      return <option key={position.level_id} value={position.level_id} selected>{position.level}</option>
                    } else return <option key={position.level_id} value={position.level_id}>{position.level}</option>
                  })}
                </SelectNoChildrenInput>
              </div>
              <div className="clear" />
            </div>

          </div>

          {/* w4_content Tab */}
          <div id="item_content" className="tabcontent">
            <div className="container_12 mt-3">
              <table className="table-many-column" style={{ padding: "10px" }}>
                <thead>
                  <tr>
                    <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                    <th className="font" style={{ minWidth: "200px" }}>เลขที่อะไหล่</th>
                    <th className="font" style={{ minWidth: "600px" }}>รายละเอียด</th>
                    <th className="font" style={{ minWidth: "100px" }}>หน่วย</th>
                  </tr>
                </thead>
                <tbody>
                  {rowItem.map((line_item, index) => {
                    console.log("line_item", line_item)
                    let line_number = index + 1;
                    return (
                      <tr>
                        <th className="edit-padding text-center">{line_number}</th>
                        <td className="edit-padding">{line_item.item.internal_item_id}</td>
                        <td className="edit-padding">{line_item.item.description}</td>
                        <td className="edit-padding">{line_item.item.uom_group.name}</td>
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