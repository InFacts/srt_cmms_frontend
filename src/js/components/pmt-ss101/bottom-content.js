import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { useSelector, shallowEqual } from 'react-redux';

import TableStatus from '../common/table-status';
import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';

import Files from '../common/files2'
import Label from '../common/form-label'
import TextInput from '../common/formik-text-input';
import TextareaInput from '../common/formik-textarea-input';
import NumberInput from '../common/formik-number-input';
import DateTimeInput from '../common/formik-datetime-input';
import SelectNoChildrenInput from '../common/formik-select-no-children';
import SelectInput from '../common/formik-select-input';
import PopupModalEquipment from '../common/popup-modal-equipment';
import TableHasEquipment from '../common/table-has-equipment';

import { useFormikContext } from 'formik';

import { validatedataDocumentField, DOCUMENT_STATUS, getUserIDFromEmployeeID, checkBooleanForEditHelper } from '../../helper';
import { FACTS } from '../../redux/modules/api/fact';

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { fetchPositionPermissionData, changeTheam } from '../../helper.js'
const BottomContent = (props) => {
    const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
    const factDistricts = useSelector((state) => ({ ...state.api.fact.districts }), shallowEqual);
    const factNodes = useSelector((state) => ({ ...state.api.fact.nodes }), shallowEqual);
    const factStations = useSelector((state) => ({ ...state.api.fact.stations }), shallowEqual);
    const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);
    const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);

    const factRecvAccidentFrom = useSelector((state) => ({ ...state.api.fact[FACTS.SS101_RECV_ACCIDENT_FROM] }), shallowEqual);
    const factAccidentCause = useSelector((state) => ({ ...state.api.fact[FACTS.SS101_ACCIDENT_CAUSE] }), shallowEqual);
    const factServiceMethod = useSelector((state) => ({ ...state.api.fact[FACTS.SS101_SERVICE_METHOD] }), shallowEqual);
    const factSystemTypeGroup = useSelector((state) => ({ ...state.api.fact[FACTS.SS101_SYSTEM_TYPE_GROUP] }), shallowEqual);
    const factSystemType = useSelector((state) => ({ ...state.api.fact[FACTS.SS101_SYSTEM_TYPE] }), shallowEqual);
    const factHardwareType = useSelector((state) => ({ ...state.api.fact[FACTS.SS101_HARDWARE_TYPE] }), shallowEqual);
    const factCarType = useSelector((state) => ({ ...state.api.fact[FACTS.SS101_CAR_TYPE] }), shallowEqual);
    const factCaseType = useSelector((state) => ({ ...state.api.fact[FACTS.SS101_CASE_TYPE] }), shallowEqual);
    const factInterrupt = useSelector((state) => ({ ...state.api.fact[FACTS.SS101_INTERRUPT] }), shallowEqual);
    const factPosition = useSelector((state) => ({ ...state.api.fact[FACTS.POSITION] }), shallowEqual);

    const factUnit = useSelector((state) => ({ ...state.api.fact[FACTS.UNIT_OF_MEASURE] }), shallowEqual);
    const { values, setFieldValue, validateField } = useFormikContext();

    const [lineNumber, setLineNumber] = useState('');

    const validateDocumentAccidentNameField = (...args) => validatedataDocumentField("accident_name", setFieldValue, ...args)
    const validateDocumentAccidentOnField = (...args) => validatedataDocumentField("accident_on", setFieldValue, ...args)
    const validateDocumentRequestOnField = (...args) => validatedataDocumentField("request_on", setFieldValue, ...args)
    const validateDocumentRequestByField = (...args) => validatedataDocumentField("request_by", setFieldValue, ...args)
    const validateDocumentRecvAccidentFromRecvIDField = (...args) => validatedataDocumentField("recv_accident_from_recv_id", setFieldValue, ...args)
    const validateDocumentCarTypeIDField = (...args) => validatedataDocumentField("car_type_id", setFieldValue, ...args)
    const validateDocumentDepartedOnField = (...args) => validatedataDocumentField("departed_on", setFieldValue, ...args)
    const validateDocumentArrivedOnField = (...args) => validatedataDocumentField("arrived_on", setFieldValue, ...args)
    const validateDocumentFinishedOnField = (...args) => validatedataDocumentField("finished_on", setFieldValue, ...args)
    const validateDocumentSystemTypeGroupIDnField = (...args) => validatedataDocumentField("system_type_group_id", setFieldValue, ...args)
    const validateDocumentSystemTypeIDField = (...args) => validatedataDocumentField("system_type_id", setFieldValue, ...args)

    const validateDocumentLocationDistrictIDField = (...args) => validatedataDocumentField("location_district_id", setFieldValue, ...args)
    const validateDocumentLocationNodeIDField = (...args) => validatedataDocumentField("location_node_id", setFieldValue, ...args)
    const validateDocumentLocationStationIDField = (...args) => validatedataDocumentField("location_station_id", setFieldValue, ...args)
    const validateDocumentInterruptIDField = (...args) => validatedataDocumentField("interrupt_id", setFieldValue, ...args)
    const validateDocumentTotalFailTimeField = (...args) => validatedataDocumentField("total_fail_time", setFieldValue, ...args)
    const validateDocumentServiceMethodIDField = (...args) => validatedataDocumentField("service_method_id", setFieldValue, ...args)

    const validateLineNumberInternalItemIDField = (fieldName, internal_item_id, index) => {
        //     By default Trigger every line_item, so need to check if the internal_item_id changes ourselves
        if (values.line_items[index].internal_item_id === internal_item_id) {
            return;
        }
        if (internal_item_id === "") {
            setFieldValue(fieldName + `.description`, '', false);
            setFieldValue(fieldName + `.quantity`, '', false);
            setFieldValue(fieldName + `.list_uoms`, [], false);
            setFieldValue(fieldName + `.uom_id`, '', false);
            setFieldValue(fieldName + `.per_unit_price`, '', false);
            return;
        }
        let items = props.fact.items.items;
        let item = items.find(item => `${item.internal_item_id}` === `${internal_item_id}`); // Returns undefined if not found
        console.log(item)
        if (item) {
            var item_match_equipments = props.equipment;
            let item_match_equipment = item_match_equipments.find(item_match_equipment => `${item_match_equipment.item_id}` === `${item.item_id}`);
            console.log("item_match_equipment", item_match_equipment)
            if (item_match_equipment) {
                setFieldValue(fieldName + `.item_id`, item.item_id, false);
                setFieldValue(fieldName + `.description`, `${item.description}`, false);
                setFieldValue(fieldName + `.equipment_status_id`, 3, false);
                setFieldValue(fieldName + `.equipment_item_id`, parseInt(item_match_equipment.item_id), false);
            }
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
        <div id={changeTheam() === true ? "" : "blackground-gray"}>
            <div className="container_12 clearfix" id={changeTheam() === true ? "blackground-gray" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray" } : {}}>

                {/* === Tab breakdown_content  === */}
                <div id="breakdown_content" className="tabcontent">
                    {/* Component Title */}
                    <h3 className="head-title-bottom mt-2">ข้อมูลเกี่ยวกับอาการขัดข้อง</h3>

                    {/* === Left Column   ==== */}
                    <div className={changeTheam() === true ? "grid_5" : "grid_6"} style={{ paddingLeft: "10px" }}>
                        {/* Accident Name  */}
                        <div className="grid_2 alpha white-space">
                            <p className="top-text">ชื่องาน</p>
                        </div>
                        <div className="grid_3 alpha omega">
                            <TextInput name="accident_name" validate={validateDocumentAccidentNameField} tabIndex="8"
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div className="clear" />

                        {/* Accident On  */}
                        <div className="grid_2 alpha white-space">
                            <p className="top-text">วันเวลาที่เกิดเหตุ</p>
                        </div>
                        <div className="grid_3 alpha omega">
                            <DateTimeInput name="accident_on" validate={validateDocumentAccidentOnField} cssStyle={{ left: "-160px", top: "14px" }}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="9" />
                        </div>

                        <div className="clear" />

                        {/* request_on */}
                        <div className="grid_2 alpha white-space">
                            <p className="top-text">วันเวลาที่รับแจ้ง</p>
                        </div>
                        <div className="grid_3 alpha omega">
                            <DateTimeInput name="request_on" validate={validateDocumentRequestOnField} cssStyle={{ left: "-160px", top: "14px" }}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="10" />
                        </div>

                        <div className="clear" />

                        {/* request_by */}
                        <div className="grid_2 alpha white-space">
                            <p className="top-text">ได้รับเหตุจาก</p>
                        </div>
                        <div className="grid_3 alpha omega">
                            <TextInput name="request_by" validate={validateDocumentRequestByField} tabIndex="11"
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div className="clear" />

                        {/* recv_accident_from_recv_idid */}
                        <div className="grid_2 alpha white-space">
                            <p className="top-text">รับข้อมูลผ่านช่องทาง</p>
                        </div>
                        <div className="grid_3 alpha omega">
                            {/* Need to change to radio button later */}
                            <SelectNoChildrenInput name="recv_accident_from_recv_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} 
                            validate={validateDocumentRecvAccidentFromRecvIDField} 
                            cssStyle={{ left: "-160px", top: "14px" }} tabIndex="12">
                                <option value='' selected></option>
                                {factRecvAccidentFrom.items.map((recv_accident_from) => {
                                    if (values.recv_accident_from_recv_id === recv_accident_from.recv_id) {
                                        return <option key={recv_accident_from.recv_id} value={recv_accident_from.recv_id} selected>{recv_accident_from.name}</option>
                                    } else return <option key={recv_accident_from.recv_id} value={recv_accident_from.recv_id}>{recv_accident_from.name}</option>
                                })}
                            </SelectNoChildrenInput>
                        </div>

                        <div className="clear" />

                        {/* car_type_id  */}
                        <div className="grid_2 alpha white-space">
                            <p className="top-text">เดินทางโดย</p>
                        </div>
                        <div className="grid_3 alpha omega">
                            <SelectNoChildrenInput name="car_type_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} validate={validateDocumentCarTypeIDField} cssStyle={{ left: "-160px", top: "14px" }} tabIndex="13">
                                <option value=''></option>
                                {factCarType.items.map((factCarType) => {
                                    if (values.car_type_id === factCarType.car_id) {
                                        return <option value={factCarType.car_id} key={factCarType.car_id} selected>{factCarType.car_type}</option>
                                    } else {
                                        return <option value={factCarType.car_id} key={factCarType.car_id}>{factCarType.car_type}</option>
                                    }
                                })}
                            </SelectNoChildrenInput>
                        </div>

                        <div className="clear" />

                        {/* departed_on  */}
                        <div className="grid_2 alpha white-space">
                            <p className="top-text">ออกเดินทาง</p>
                        </div>
                        <div className="grid_3 alpha omega">
                            <DateTimeInput name="departed_on" validate={validateDocumentDepartedOnField} cssStyle={{ left: "-160px", top: "14px" }}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="14" />
                        </div>

                        <div className="clear" />

                        {/* arrived_on  */}
                        <div className="grid_2 alpha white-space">
                            <p className="top-text">เดินทางถึง</p>
                        </div>
                        <div className="grid_3 alpha omega">
                            <DateTimeInput name="arrived_on" validate={validateDocumentArrivedOnField} cssStyle={{ left: "-160px", top: "14px" }}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="15" />
                        </div>

                        <div className="clear" />

                        {/* finished_on  */}
                        <div className="grid_2 alpha white-space">
                            <p className="top-text">วันเวลาที่แล้วเสร็จ</p>
                        </div>
                        <div className="grid_3 alpha omega">
                            <DateTimeInput name="finished_on" validate={validateDocumentFinishedOnField} cssStyle={{ left: "-160px", top: "14px" }}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="16" />
                        </div>

                        <div className="clear" />

                        {/* system_type_group_id  */}
                        <div className="grid_2 alpha white-space">
                            <p className="top-text">ระบบตรวจซ่อม</p>
                        </div>
                        <div className="grid_3 alpha omega">
                            <SelectNoChildrenInput name="system_type_group_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} validate={validateDocumentSystemTypeGroupIDnField} cssStyle={{ left: "-160px", top: "14px" }} tabIndex="17">
                                <option value='' selected></option>
                                {factSystemTypeGroup.items.map((systemTypeGroup) => {
                                    return <option key={systemTypeGroup.system_type_group_id} value={systemTypeGroup.system_type_group_id}>{systemTypeGroup.system_type_group}</option>
                                })}
                            </SelectNoChildrenInput>
                        </div>

                        <div className="clear" />

                        {/* system_type_id  */}
                        <div className="grid_2 alpha white-space">
                            <p className="top-text">ชนิดระบบตรวจซ่อม</p>
                        </div>
                        <div className="grid_3 alpha omega">
                            <SelectNoChildrenInput name="sub_maintenance_type_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} validate={validateDocumentSystemTypeIDField} cssStyle={{ left: "-160px", top: "14px" }} tabIndex="18">
                                <option value='' selected></option>
                                {factSystemType.items.map((factSystemType) => {
                                    if (values.system_type_group_id == factSystemType.system_type_group_id)
                                        return <option key={factSystemType.system_type_id} value={factSystemType.system_type_id}>{factSystemType.abbreviation} - {factSystemType.system_type}</option>
                                })}
                            </SelectNoChildrenInput>
                        </div>

                        <div className="clear" />

                        {/* hardware_type_id  */}
                        <div className="grid_2 alpha white-space">
                            <p className="top-text">ชื่ออุปกรณ์ที่บำรุงรักษา</p>
                        </div>
                        <div className="grid_3 alpha omega pull">
                            <SelectNoChildrenInput name="hardware_type_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="19">
                                <option value=''></option>
                                {factHardwareType.items.map((factHardwareType) => {
                                    if (values.sub_maintenance_type_id == factHardwareType.system_type_id)
                                        return <option key={factHardwareType.hardware_type_id} value={factHardwareType.hardware_type_id}>{factHardwareType.abbreviation} - {factHardwareType.hardware_type}</option>
                                })}
                            </SelectNoChildrenInput>
                        </div>

                        <div className="clear" />
                    </div>


                    {/* === Right Column === */}
                    <div className="grid_6 prefix_1">
                        {/* District ID */}
                        <Label>สถานที่ แขวง</Label>
                        <div className="grid_4 alpha omega">
                            <SelectNoChildrenInput name="location_district_id" validate={validateDocumentLocationDistrictIDField}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                                cssStyle={{ left: "-240px", top: "10px" }} tabIndex="20">
                                <option value=''></option>
                                {factDistricts.items.map(function ({ district_id, name, division_id }) {
                                    return <option value={district_id} key={district_id} selected> {name} </option>
                                })}
                            </SelectNoChildrenInput>
                        </div>

                        <div className="clear" />

                        {/* Node ID */}
                        <Label>สถานที่ ตอน</Label>
                        <div className="grid_4 alpha omega">
                            <SelectNoChildrenInput name="location_node_id" validate={validateDocumentLocationNodeIDField}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                                cssStyle={{ left: "-240px", top: "10px" }} tabIndex="21">
                                <option value=''></option>
                                {factNodes.items.map(function ({ node_id, name, district_id }) {
                                    if (values.location_district_id == district_id) { // Shallow equality, district ID may be string
                                        return <option value={node_id} key={node_id} selected>{name}</option>
                                    }
                                })}
                            </SelectNoChildrenInput>
                        </div>

                        <div className="clear" />

                        {/* Station ID */}
                        <Label>สถานที่ สถานี</Label>
                        <div className="grid_4 alpha omega">
                            <SelectNoChildrenInput name="location_station_id" validate={validateDocumentLocationStationIDField}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                                cssStyle={{ left: "-240px", top: "10px" }} tabIndex="22">
                                <option value=''></option>
                                {factStations.items.map(function ({ station_id, name, node_id }) {
                                    if (values.location_node_id == node_id) { // Shallow equality, node ID may be string
                                        return <option value={station_id} key={station_id} selected> {name} </option>
                                    }
                                })}
                            </SelectNoChildrenInput>
                        </div>

                        <div className="clear" />

                        {/* Station ID */}
                        <Label>รายละเอียดสถานที่</Label>
                        <div className="grid_4 alpha omega">
                            <TextareaInput name="location_detail" tabIndex="23"
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div className="clear" />

                        {/* summary_cause_condition link [root_cause] from WO */}
                        <Label>สาเหตุและอาการเสียโดยสรุป</Label>
                        <div className="grid_4 alpha omega">
                            <TextareaInput name="summary_cause_condition" tabIndex="24"
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div className="clear" />

                        {/* cargo_id  */}
                        <Label>ขบวนรถที่</Label>
                        <div className="grid_4 alpha omega">
                            <TextInput name="cargo_id" tabIndex="25"
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div className="clear" />

                        {/* total_fail_time  */}
                        <Label>เสียเวลาเพราะเหตุนี้</Label>
                        <div className="grid_3 alpha omega">
                            <NumberInput name="total_fail_time" step={1} validate={validateDocumentTotalFailTimeField} tabIndex="26"
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} cssStyle={{ left: "60px", top: "-5px" }} />
                        </div>
                        <div className="grid_1  omega">
                            <p className="top-text">
                                นาที
                            </p>
                        </div>

                        <div className="clear" />

                        {/* service_method_id */}
                        <Label>ประเภทการซ่อม</Label>
                        <div className="grid_4 alpha omega">
                            <SelectNoChildrenInput name="service_method_id" validate={validateDocumentServiceMethodIDField} disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="27" cssStyle={{ left: "-240px", top: "10px" }}>
                                <option value='' selected></option>
                                {factServiceMethod.items.map((factServiceMethod) => {
                                    if (factServiceMethod.sm_id === values.service_method_id) {
                                        return <option key={factServiceMethod.sm_id} value={factServiceMethod.sm_id} selected>{factServiceMethod.sm_method_type}</option>
                                    } else {
                                        return <option key={factServiceMethod.sm_id} value={factServiceMethod.sm_id}>{factServiceMethod.sm_method_type}</option>
                                    }
                                })}
                            </SelectNoChildrenInput>
                        </div>

                        <div className="clear" />

                        {/* service_method_desc */}
                        <Label>สรุปการแก้ไขและการซ่อมแซม</Label>
                        <div className="grid_4 alpha omega">
                            <TextareaInput name="service_method_desc" tabIndex="28"
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div className="clear" />

                        {/* interrupt_id */}
                        <Label>ยังไมไ่ด้จัดการแก้ไขเพราะเหตุนี้</Label>
                        <div className="grid_4 alpha omega">
                            <SelectNoChildrenInput name="interrupt_id" validate={validateDocumentInterruptIDField} disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="29" cssStyle={{ left: "-240px", top: "10px" }}>
                                <option value='' selected></option>
                                {factInterrupt.items.map((factInterrupt) => {
                                    if (values.interrupt_id === factInterrupt.interrupt_id) {
                                        return <option key={factInterrupt.interrupt_id} value={factInterrupt.interrupt_id} selected>{factInterrupt.interrupt_type}</option>
                                    } else {
                                        return <option key={factInterrupt.interrupt_id} value={factInterrupt.interrupt_id}>{factInterrupt.interrupt_type}</option>
                                    }
                                })}
                            </SelectNoChildrenInput>
                        </div>

                        <div className="clear" />
                    </div>

                    <div className="grid_12" style={{ marginTop: "10px" }}>
                        {/* Remark */}
                        <Label>หมายเหตุ</Label>
                        <div className="grid_11 alpha omega">
                            <TextareaInput name="remark" tabIndex="30"
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div className="clear" />
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
                            <p className="top-text">ผู้ควบคุมตรวจสอบชื่อ</p>
                        </div>
                        <div className="grid_4 alpha omega">
                            <TextInput name="auditor_name" tabIndex="31"
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <Label>ตำแหน่ง</Label>
                        <div className="grid_4 alpha omega">
                            <SelectNoChildrenInput name="auditor_position_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="32">
                                <option value='' selected></option>
                                {factPosition.items.map((position) => {
                                    if (values.auditor_position_id === position.position_id) {
                                        return <option key={position.position_id} value={position.position_id} selected>{position.name}</option>
                                    } else return <option key={position.position_id} value={position.position_id}>{position.name}</option>
                                })}
                            </SelectNoChildrenInput>
                        </div>
                        <div className="clear" />

                        {/* fixer_name  */}
                        <div className="grid_2 alpha white-space">
                            <p className="top-text">ดำเนินการแก้ไขชื่อ</p>
                        </div>
                        <div className="grid_4 alpha omega">
                            <TextInput name="fixer_name" tabIndex="33"
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>
                        <Label>ตำแหน่ง</Label>
                        <div className="grid_4 alpha omega">
                            <SelectNoChildrenInput name="fixer_position_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="34">
                                <option value='' selected></option>
                                {factPosition.items.map((position) => {
                                    if (values.fixer_position_id === position.position_id) {
                                        return <option key={position.position_id} value={position.position_id} selected>{position.name}</option>
                                    } else return <option key={position.position_id} value={position.position_id}>{position.name}</option>
                                })}
                            </SelectNoChildrenInput>
                        </div>
                        <div className="clear" />


                        {/* member_1  */}
                        <div className="grid_2 alpha white-space">
                            <p className="top-text">รายชื่อเพื่อนร่วมงาน</p>
                        </div>
                        <div className="grid_4 alpha omega">
                            <TextInput name="member_1" tabIndex="35"
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>
                        <Label>ตำแหน่ง</Label>
                        <div className="grid_4 alpha omega">
                            <SelectNoChildrenInput name="member_1_position_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="36">
                                <option value='' selected></option>
                                {factPosition.items.map((position) => {
                                    if (values.member_1_position_id === position.position_id) {
                                        return <option key={position.position_id} value={position.position_id} selected>{position.name}</option>
                                    } else return <option key={position.position_id} value={position.position_id}>{position.name}</option>
                                })}
                            </SelectNoChildrenInput>
                        </div>
                        <div className="clear" />

                        {/* member_2  */}
                        <div className="grid_2 alpha white-space">
                            <p className="top-text">รายชื่อเพื่อนร่วมงาน</p>
                        </div>
                        <div className="grid_4 alpha omega">
                            <TextInput name="member_2"
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="37" />
                        </div>
                        <Label>ตำแหน่ง</Label>
                        <div className="grid_4 alpha omega">
                            <SelectNoChildrenInput name="member_2_position_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="38">
                                <option value='' selected></option>
                                {factPosition.items.map((position) => {
                                    if (values.member_2_position_id === position.position_id) {
                                        return <option key={position.position_id} value={position.position_id} selected>{position.name}</option>
                                    } else return <option key={position.position_id} value={position.position_id}>{position.name}</option>
                                })}
                            </SelectNoChildrenInput>
                        </div>
                        <div className="clear" />

                        {/* member_3  */}
                        <div className="grid_2 alpha white-space">
                            <p className="top-text">รายชื่อเพื่อนร่วมงาน</p>
                        </div>
                        <div className="grid_4 alpha omega">
                            <TextInput name="member_3" tabIndex="39"
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>
                        <Label>ตำแหน่ง</Label>
                        <div className="grid_4 alpha omega">
                            <SelectNoChildrenInput name="member_3_position_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="40">
                                <option value='' selected></option>
                                {factPosition.items.map((position) => {
                                    if (values.member_3_position_id === position.position_id) {
                                        return <option key={position.position_id} value={position.position_id} selected>{position.name}</option>
                                    } else return <option key={position.position_id} value={position.position_id}>{position.name}</option>
                                })}
                            </SelectNoChildrenInput>
                        </div>
                        <div className="clear" />
                    </div>

                </div>

                {/* === Tab compensation_list_content  === */}
                <div id="compensation_list_content" className="tabcontent">

                    {/* Component Title */}
                    <h4 className="head-title-bottom mt-2">ข้อมูลรายการค่าเสียหาย</h4>

                    <div style={{ padding: "10px" }}>
                        <table className="table-many-column">
                            <thead>
                                <tr>
                                    <th className="font text-center" style={{ minWidth: "50px" }}>#</th>
                                    <th className="font" style={{ minWidth: "400px" }}>รายการ</th>
                                    <th className="font text-center" style={{ minWidth: "100px" }}>จำนวน</th>
                                    <th className="font text-center" style={{ minWidth: "100px" }}>หน่วย</th>
                                    <th className="font text-center" style={{ minWidth: "100px" }}>จำนวนเงิน</th>
                                    <th className="font" style={{ minWidth: "400px" }}>หมายเหตุ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {values.loss_line_items.map((loss_line_item, index) => (
                                    <tr key={index}>
                                        <td className="edit-padding text-center">{index + 1}</td>
                                        <td className="edit-padding">
                                            <TextInput name={`loss_line_items[${index}].description`} tabIndex={41 + index + 1}
                                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                                            />
                                        </td>
                                        <td className="edit-padding text-center">
                                            <NumberInput step={0.01} name={`loss_line_items[${index}].quantity`} tabIndex={41 + index + 1}
                                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                                            />
                                        </td>
                                        <td className="edit-padding text-center">
                                            <SelectNoChildrenInput name={`loss_line_items[${index}].uom_code`} disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex={41 + index + 1}>
                                                <option value='' selected></option>
                                                {factUnit.items.map((factUnit) => {
                                                    if (values.loss_line_items[index].uom_code === factUnit.uom_id) {
                                                        return <option key={factUnit.uom_id} value={parseInt(factUnit.uom_id)} selected>{factUnit.name}</option>
                                                    } else return <option key={factUnit.uom_id} value={parseInt(factUnit.uom_id)}>{factUnit.name}</option>
                                                })}
                                            </SelectNoChildrenInput>
                                        </td>
                                        <td className="edit-padding text-center">
                                            <NumberInput step={1} name={`loss_line_items[${index}].price`} tabIndex={41 + index + 1}
                                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                                            />
                                        </td>
                                        <td className="edit-padding">
                                            <TextInput name={`loss_line_items[${index}].remark`} tabIndex={41 + index + 1}
                                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div id="attachment_content" className="tabcontent">
                    <Files />
                </div>

                <div id="table_status_content" className="tabcontent">
                    <TableStatus bodyTableStatus={values.step_approve} />
                </div>

                <div id="assets_under_maintenance_content" className="tabcontent">
                    <TableHasEquipment line_items={values.line_items} values={values}
                        setLineNumber={setLineNumber}
                        validateLineNumberInternalItemIDField={validateLineNumberInternalItemIDField}
                        checkBooleanForEdit={checkBooleanForEdit} />
                </div>
                {/* PopUp ค้นหาอะไหล่ MODE ADD */}
                <PopupModalEquipment keyname='line_items' lineNumber={lineNumber} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    fact: state.api.fact,
    actionMode: state.toolbar.mode,
    equipment: state.api.fact.equipment.items,

    list_show: state.list_show
})
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);