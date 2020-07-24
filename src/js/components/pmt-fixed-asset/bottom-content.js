import React, { useEffect, useState } from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom'

import TableStatus from '../common/table-status';
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
  const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);

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
                          {values.w1_list[index].internal_item_id ? "-" : <Link to={`pmt-all-checklist-fixed-asset?checklist_id=station`}>บางซื่อ</Link>}
                        </td>
                        <td className="edit-padding">
                          {values.w1_list[index].station_id ? "-" : "internal_item_id"}
                        </td>
                        <td className="edit-padding">
                          {
                            values.w1_list[index].station_id
                              ?
                              "-"
                              :
                              <Link to={`pmt-all-checklist-fixed-asset?checklist_id=${1}`}>ก1</Link>
                          }
                        </td>
                        <td className="edit-padding">
                          {
                            values.w1_list[index].station_id
                              ?
                              "-"
                              :
                              line_item.x_cross_x_cross_th
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
                              "stations.name"
                          }
                        </td>
                        <td className="edit-padding">
                          {
                            values.w2_list[index].station_id
                              ?
                              "-"
                              :
                              "internal_item_id"
                          }
                        </td>
                        <td className="edit-padding">
                          {
                            values.w2_list[index].station_id
                              ?
                              "-"
                              :
                              line_item.checklist_th
                          }
                        </td>
                        <td className="edit-padding">
                          {
                            values.w2_list[index].station_id
                              ?
                              "-"
                              :
                              line_item.x_cross_x_cross_th
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
                              "stations.name"
                          }
                        </td>
                        <td className="edit-padding">
                          {
                            values.w3_list[index].station_id
                              ?
                              "-"
                              :
                              "internal_item_id"
                          }
                        </td>
                        <td className="edit-padding">
                          {
                            values.w3_list[index].station_id
                              ?
                              "-"
                              :
                              line_item.checklist_th
                          }
                        </td>
                        <td className="edit-padding">
                          {
                            values.w3_list[index].station_id
                              ?
                              "-"
                              :
                              line_item.x_cross_x_cross_id
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
                  {values.w4_list.map((line_item, index) => {
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
                              "stations.name"
                          }
                        </td>
                        <td className="edit-padding">
                          {
                            values.w4_list[index].station_id
                              ?
                              "-"
                              :
                              "internal_item_id"
                          }
                        </td>
                        <td className="edit-padding">
                          {
                            values.w4_list[index].station_id
                              ?
                              "-"
                              :
                              line_item.checklist_th
                          }
                        </td>
                        <td className="edit-padding">
                          {
                            values.w4_list[index].station_id
                              ?
                              "-"
                              :
                              line_item.x_cross_x_cross_th
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