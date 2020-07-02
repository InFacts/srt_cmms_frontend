import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux'
import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import Files from '../common/files2'
import TableStatus from '../common/table-status';
import TextInput from '../common/formik-text-input';
import TextareaInput from '../common/formik-textarea-input';
import DateTimeInput from '../common/formik-datetime-input';
import SelectNoChildrenInput from '../common/formik-select-no-children';
import { useFormik, withFormik, useFormikContext } from 'formik';
import { FACTS } from '../../redux/modules/api/fact';

import Label from '../common/form-label'

import { validatedataDocumentField, DOCUMENT_STATUS, getUserIDFromEmployeeID, checkBooleanForEditHelper } from '../../helper';

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { fetchPositionPermissionData, changeTheam } from '../../helper.js'
const BottomContent = (props) => {
    const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
    const factDistricts = useSelector((state) => ({ ...state.api.fact.districts }), shallowEqual);
    const factNodes = useSelector((state) => ({ ...state.api.fact.nodes }), shallowEqual);
    const factStations = useSelector((state) => ({ ...state.api.fact.stations }), shallowEqual);
    const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
    const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);
    const { values, setFieldValue, validateField } = useFormikContext();

    const validateDocumentAccidentOnField = (...args) => validatedataDocumentField("accident_on", setFieldValue, ...args)
    const validateDocumentLocationDistrictIDField = (...args) => validatedataDocumentField("location_district_id", setFieldValue, ...args)
    const validateDocumentLocationNodeIDField = (...args) => validatedataDocumentField("location_node_id", setFieldValue, ...args)
    const validateDocumentLocationStationIDField = (...args) => validatedataDocumentField("location_station_id", setFieldValue, ...args)

  let checkBooleanForEdit = checkBooleanForEditHelper(values, decoded_token, fact);
  useEffect(() => {
    checkBooleanForEdit = false
    validateField("internal_document_id")
  }, [values.internal_document_id])
  
    return (
        <div id={changeTheam() === true ? "" : "blackground-gray"}>
            <div className="container_12 clearfix" id={changeTheam() === true ? "blackground-gray" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray" } : {}}>

                {/* === Tab broken_content  === */}
                <div id="broken_content" className="tabcontent">
                    {/* Component Title */}
                    <h3 className="head-title-bottom mt-2">ข้อมูลเหตุขัดข้อง/ชำรุด</h3>

                    {/* === Left Column === */}
                    <div className={changeTheam() === true ? "grid_5" : "grid_6"} style={{ paddingLeft: "10px" }}>

                        {/* Accident On */}
                        <Label>วันเวลาเกิดเหตุ</Label>
                        <div className="grid_4 alpha omega">
                            <DateTimeInput name="accident_on" validate={validateDocumentAccidentOnField}  tabIndex="7"
                            cssStyle={{ left: "-240px", top: "14px" }}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} 
                                />
                        </div>

                        <div class="clear" />

                        {/* Informed By */}
                        <Label>ผู้แจ้งเหตุ</Label>
                        <div className="grid_4 alpha omega">
                            <TextInput name='request_by' tabIndex="8"
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div class="clear" />

                        {/* Accident Detail */}
                        <Label>อาการขัดข้อง</Label>
                        <div className="grid_4 alpha omega">
                            <TextareaInput name="accident" rows="4" tabIndex="9"
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div class="clear" />

                    </div>


                    {/* === Right Column === */}
                    <div className="grid_6 prefix_1">

                        {/* District ID */}
                        <Label>สถานที่ แขวง</Label>
                        <div className="grid_4 alpha omega">
                            <SelectNoChildrenInput name="location_district_id" validate={validateDocumentLocationDistrictIDField}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                                cssStyle={{ left: "-240px", top: "10px" }} tabIndex="10">
                                <option value=''></option>
                                {factDistricts.items.map(function ({ district_id, name, division_id }) {
                                    return <option value={district_id} key={district_id}> {name} </option>
                                })}
                            </SelectNoChildrenInput>
                        </div>

                        <div class="clear" />

                        {/* Node ID */}
                        <Label>สถานที่ ตอน</Label>
                        <div className="grid_4 alpha omega">
                            <SelectNoChildrenInput name="location_node_id" validate={validateDocumentLocationNodeIDField}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                                cssStyle={{ left: "-240px", top: "10px" }} tabIndex="11">
                                <option value=''></option>
                                {factNodes.items.map(function ({ node_id, name, district_id }) {
                                    if (values.location_district_id == district_id) { // Shallow equality, district ID may be string
                                        return <option value={node_id} key={node_id}>{name}</option>
                                    }
                                })}
                            </SelectNoChildrenInput>
                        </div>

                        <div class="clear" />

                        {/* Station ID */}
                        <Label>สถานที่ สถานี</Label>
                        <div className="grid_4 alpha omega">
                            <SelectNoChildrenInput name="location_station_id" validate={validateDocumentLocationStationIDField}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                                cssStyle={{ left: "-240px", top: "10px" }} tabIndex="12">
                                <option value=''></option>
                                {factStations.items.map(function ({ station_id, name, node_id }) {
                                    if (values.location_node_id == node_id) { // Shallow equality, node ID may be string
                                        return <option value={station_id} key={station_id}> {name} </option>
                                    }
                                })}
                            </SelectNoChildrenInput>
                        </div>

                        <div class="clear" />

                        {/* Station ID */}
                        <Label>รายละเอียดสถานที่</Label>
                        <div className="grid_4 alpha omega">
                            <TextareaInput name="location_detail" tabIndex="13"
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div class="clear" />

                    </div>

                    <div className="grid_12" style={{ marginTop: "100px" }}>
                        {/* Remark */}
                        <Label>หมายเหตุ</Label>
                        <div className="grid_11 alpha omega">
                            <TextareaInput name="remark" tabIndex="14"
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div class="clear" />
                    </div>

                </div>

                <div id="attachment_content" className="tabcontent">
                    <div className="container_12 ">
                        <Files />
                    </div>
                </div>

                <div id="table_status_content" className="tabcontent">
                    <TableStatus bodyTableStatus={values.step_approve} />
                </div>

            </div>
        </div>
    );
};

export default BottomContent;