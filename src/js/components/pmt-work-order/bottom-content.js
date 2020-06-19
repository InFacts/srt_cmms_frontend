import React, { useEffect, useState } from 'react';
import { useSelector, shallowEqual} from 'react-redux'


import TableStatus from '../common/table-status';
import Table from '../common/table';

import Files from '../common/files2'

import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import { useFormikContext } from 'formik';

import PopupModalNoPart from '../common/popup-modal-nopart'
import Label from '../common/form-label'
import TextInput from '../common/formik-text-input';
import TextareaInput from '../common/formik-textarea-input';
import DateTimeInput from '../common/formik-datetime-input';
import SelectNoChildrenInput from '../common/formik-select-no-children';

import { validatedataDocumentField, DOCUMENT_STATUS, getUserIDFromEmployeeID } from '../../helper';
import { FACTS } from '../../redux/modules/api/fact';

const BottomContent = (props) => {
    const toolbar = useSelector((state) => ({...state.toolbar}), shallowEqual);
    const factDistricts = useSelector((state) => ({...state.api.fact.districts}), shallowEqual); 
    const factNodes = useSelector((state) => ({...state.api.fact.nodes}), shallowEqual); 
    const factStations = useSelector((state) => ({...state.api.fact.stations}), shallowEqual); 
    const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
    const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);
    const {values, setFieldValue} = useFormikContext();

    const validateDocumentAccidentNameField = (...args) => validatedataDocumentField("accident_name", setFieldValue, ...args)
    const validateDocumentAccidentOnField = (...args) => validatedataDocumentField("accident_on", setFieldValue, ...args)
    const validateDocumentRequestOnField = (...args) => validatedataDocumentField("request_on", setFieldValue, ...args)
    const validateDocumentRequestByField = (...args) => validatedataDocumentField("request_by", setFieldValue, ...args)
    const validateDocumentRecvAccidentFromRecvIDField = (...args) => validatedataDocumentField("recv_accident_from_recv_id", setFieldValue, ...args)

    const validateDocumentLocationDistrictIDField = (...args) => validatedataDocumentField("location_district_id", setFieldValue, ...args)
    const validateDocumentLocationNodeIDField = (...args) => validatedataDocumentField("location_node_id", setFieldValue, ...args)
    const validateDocumentLocationStationIDField = (...args) => validatedataDocumentField("location_station_id", setFieldValue, ...args)

    const checkBooleanForEdit = (values.status_name_th === DOCUMENT_STATUS.REOPEN || values.status_name_th === DOCUMENT_STATUS.FAST_TRACK) && (getUserIDFromEmployeeID(fact[FACTS.USERS], values.created_by_admin_employee_id) === decoded_token.id)
    return (
    <div id="blackground-gray">
    <div className="container_12 clearfix">

        {/* === Tab broken_content  === */}
        <div id="broken_content" className="tabcontent">
            {/* Component Title */}
            <h3 className="head-title-bottom mt-2">ข้อมูลเกี่ยวกับอาการขัดข้อง</h3>

            {/* === Left Column   ==== */}
            <div className="grid_6" style={{paddingLeft: "10px"}}>


                {/* Accident Name  */}
                <Label>ชื่องาน</Label>
                <div className="grid_4 alpha omega">
                    <TextInput name="accident_name" validate={validateDocumentAccidentNameField}
                        disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}/>
                </div>

                <div class="clear" />

                {/* Accident On  */}
                <Label>วันเวลาที่เกิดเหตุ</Label>
                <div className="grid_4 alpha omega">
                    <DateTimeInput name="accident_on" validate={validateDocumentAccidentOnField}
                        disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                        cssStyle={{ left: "-240px", top: "14px" }}/>
                </div>

                <div class="clear" />

                {/* request_on */}
                <Label>วันเวลาที่รับแจ้ง</Label>
                <div className="grid_4 alpha omega">
                    <DateTimeInput name="request_on"  validate={validateDocumentRequestOnField}
                        disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                        cssStyle={{ left: "-240px", top: "14px" }}/>
                </div>

                <div class="clear" />

                {/* root_cause */}
                <Label>อาการเสียโดยสรุป</Label>
                <div className="grid_4 alpha omega">
                    <TextareaInput name="root_cause" 
                        disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}/>
                </div>

                <div class="clear" />

                {/* request_by */}
                <Label>ได้รับเหตุจาก</Label>
                <div className="grid_4 alpha omega">
                    <TextInput name="request_by" validate={validateDocumentRequestByField}
                        disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}/>
                </div>

                <div class="clear" />

                {/* recv_accident_from_id */}
                <Label>รับข้อมูลผ่านช่องทาง</Label>
                <div className="grid_4 alpha omega"> 
                    {/* Need to change to radio button later */}
                    <SelectNoChildrenInput name="recv_accident_from_recv_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} cssStyle={{ left: "-240px", top: "14px" }}
                    validate={validateDocumentRecvAccidentFromRecvIDField}>
                        <option value='' selected></option>
                        <option value='1' >โทรศัพท์</option>
                        <option value='2' >จดหมาย</option>
                        <option value='3' >Work Request</option>
                    </SelectNoChildrenInput>
                </div>

                <div class="clear" />


            </div>

            {/* === Right Column === */}
            <div className="grid_6 prefix_1">

                {/* District ID */}
                <Label>สถานที่ แขวง</Label>
                <div className="grid_4 alpha omega">
                    <SelectNoChildrenInput name="location_district_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                    validate={validateDocumentLocationDistrictIDField} cssStyle={{ left: "-240px", top: "10px" }}>
                        <option value=''></option>
                        {factDistricts.items.map(function ({district_id, name, division_id}) {
                            return <option value={district_id} key={district_id}> {name} </option>
                        })}
                    </SelectNoChildrenInput>
                </div>

                <div class="clear" />
                
                {/* Node ID */}
                <Label>สถานที่ ตอน</Label>
                <div className="grid_4 alpha omega">
                    <SelectNoChildrenInput name="location_node_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                    validate={validateDocumentLocationNodeIDField} cssStyle={{ left: "-240px", top: "10px" }}>
                        <option value=''></option>
                        {factNodes.items.map(function ({node_id, name, district_id}) {
                            if(values.location_district_id == district_id){ // Shallow equality, district ID may be string
                                return <option value={node_id} key={node_id}>{name}</option>
                            }
                        })}
                    </SelectNoChildrenInput>
                </div>

                <div class="clear" />

                {/* Station ID */}
                <Label>สถานที่ สถานี</Label>
                <div className="grid_4 alpha omega">
                    <SelectNoChildrenInput name="location_station_id" cssStyle={{ left: "-240px", top: "10px" }}
                        disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} validate={validateDocumentLocationStationIDField}>
                        <option value=''></option>
                        {factStations.items.map(function ({station_id, name, node_id}) {
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
                    <TextareaInput name="location_detail" 
                        disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                </div>

                <div class="clear" />
            </div>
            
            
            <div className="grid_12" style={{marginTop: "10px"}}>
                {/* Remark */}
                <Label>หมายเหตุ</Label>
                <div className="grid_11 alpha omega">
                    <TextareaInput name="remark" 
                            disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                </div>

                <div class="clear" />
            </div>
        </div>
        
        <div id="attachment_content" className="tabcontent">
            <div className="grid_12 ">
            <Files />
            </div>
        </div>

        <div id="table_status_content" className="tabcontent">
            <TableStatus bodyTableStatus = {values.step_approve} />
        </div>
    </div>
    </div>
    )
};

export default BottomContent;