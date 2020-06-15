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
import PopupModalNoPart from '../common/popup-modal-nopart';

import { useFormikContext } from 'formik';

import { validatedataDocumentField, DOCUMENT_STATUS, getUserIDFromEmployeeID } from '../../helper';
import { FACTS } from '../../redux/modules/api/fact';

const BottomContent = (props) => {
    const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
    const factDistricts = useSelector((state) => ({ ...state.api.fact.districts }), shallowEqual);
    const factNodes = useSelector((state) => ({ ...state.api.fact.nodes }), shallowEqual);
    const factStations = useSelector((state) => ({ ...state.api.fact.stations }), shallowEqual);
    const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);
    const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);

    const factRecvAccidentFrom = useSelector((state) => ({ ...state.api.fact.SS101_RECV_ACCIDENT_FROM }), shallowEqual);
    const factAccidentCause = useSelector((state) => ({ ...state.api.fact.SS101_ACCIDENT_CAUSE }), shallowEqual);
    const factServiceMethod = useSelector((state) => ({ ...state.api.fact.SS101_SERVICE_METHOD }), shallowEqual);
    const factHardwareType = useSelector((state) => ({ ...state.api.fact.SS101_HARDWARE_TYPE }), shallowEqual);
    const factCarType = useSelector((state) => ({ ...state.api.fact.SS101_CAR_TYPE }), shallowEqual);
    const factCaseType = useSelector((state) => ({ ...state.api.fact.SS101_CASE_TYPE }), shallowEqual);
    const factInterrupt = useSelector((state) => ({ ...state.api.fact.SS101_INTERRUPT }), shallowEqual);

    const { values, setFieldValue } = useFormikContext();

    const [lineNumber, setLineNumber] = useState('');

    const validateLineNumberInternalItemIDField = (fieldName, internal_item_id, index) => {
        //     By default Trigger every loss_line_item, so need to check if the internal_item_id changes ourselves
        console.log(values.loss_line_items[index].internal_item_id," === ", internal_item_id)
        if (values.loss_line_items[index].internal_item_id === internal_item_id) {
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
        console.log(items, "<<<<")
        let item = items.find(item => `${item.internal_item_id}` === `${internal_item_id}`); // Returns undefined if not found
        console.log(item)
        if (item) {
            setFieldValue(fieldName + `.description`, `${item.description}`, false);
            setFieldValue(fieldName + `.quantity`, 0, false);
            setFieldValue(fieldName + `.list_uoms`, item.list_uoms, false);
            setFieldValue(fieldName + `.uom_id`, item.list_uoms[0].uom_id, false);
            setFieldValue(fieldName + `.per_unit_price`, 0, false);
            return;
        } else {
            return 'Invalid Number ID';
        }
    }

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

    const checkBooleanForEdit = (values.status_name_th === DOCUMENT_STATUS.REOPEN || values.status_name_th === DOCUMENT_STATUS.FAST_TRACK) && (getUserIDFromEmployeeID(fact[FACTS.USERS], values.created_by_admin_employee_id) === decoded_token.id)
    return (
    <div id="blackground-gray">
    <div className="container_12 clearfix">

                {/* === Tab breakdown_content  === */}
                <div id="breakdown_content" className="tabcontent">
                    {/* Component Title */}
                    <h3 className="head-title-bottom mt-2">ข้อมูลเกี่ยวกับอาการขัดข้อง</h3>

                    {/* === Left Column   ==== */}
                    <div className="grid_6" style={{ paddingLeft: "10px" }}>
                        {/* Accident Name  */}
                        <Label>ชื่องาน</Label>
                        <div className="grid_4 alpha omega">
                            <TextInput name="accident_name" validate={validateDocumentAccidentNameField}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div class="clear" />

                        {/* Accident On  */}
                        <Label>วันเวลาที่เกิดเหตุ</Label>
                        <div className="grid_4 alpha omega">
                            <DateTimeInput name="accident_on" validate={validateDocumentAccidentOnField}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div class="clear" />

                        {/* request_on */}
                        <Label>วันเวลาที่รับแจ้ง</Label>
                        <div className="grid_4 alpha omega">
                            <DateTimeInput name="request_on" validate={validateDocumentRequestOnField}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div class="clear" />

                        {/* request_by */}
                        <Label>ได้รับเหตุจาก</Label>
                        <div className="grid_4 alpha omega">
                            <TextInput name="request_by" validate={validateDocumentRequestByField}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div class="clear" />

                        {/* recv_accident_from_recv_idid */}
                        <Label>รับข้อมูลผ่านช่องทาง</Label>
                        <div className="grid_4 alpha omega">
                            {/* Need to change to radio button later */}
                            <SelectNoChildrenInput name="recv_accident_from_recv_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} validate={validateDocumentRecvAccidentFromRecvIDField}>
                                <option value='' selected></option>
                                <option value='1' >โทรศัพท์</option>
                                <option value='2' >จดหมาย</option>
                                <option value='3' >Work Request</option>
                            </SelectNoChildrenInput>
                        </div>

                        <div class="clear" />

                        {/* car_type_id  */}
                        <Label>เดินทางโดย</Label>
                        <div className="grid_4 alpha omega">
                            <SelectNoChildrenInput name="car_type_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} validate={validateDocumentCarTypeIDField}>
                                <option value='' selected></option>
                                <option value='1' >รถยนต์</option>
                                <option value='2' >รถโดยสาร</option>
                                <option value='3' >มอเตอร์ไซค์</option>
                            </SelectNoChildrenInput>
                        </div>

                        <div class="clear" />

                        {/* departed_on  */}
                        <Label>ออกเดินทาง</Label>
                        <div className="grid_4 alpha omega">
                            <DateTimeInput name="departed_on" validate={validateDocumentDepartedOnField}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div class="clear" />

                        {/* arrived_on  */}
                        <Label>เดินทางถึง</Label>
                        <div className="grid_4 alpha omega">
                            <DateTimeInput name="arrived_on" validate={validateDocumentArrivedOnField}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div class="clear" />

                        {/* finished_on  */}
                        <Label>วันเวลาที่แล้วเสร็จ</Label>
                        <div className="grid_4 alpha omega">
                            <DateTimeInput name="finished_on" validate={validateDocumentFinishedOnField}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div class="clear" />

                        {/* system_type_group_id  */}
                        <Label>ระบบตรวจซ่อม</Label>
                        <div className="grid_4 alpha omega">
                            <SelectNoChildrenInput name="system_type_group_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} validate={validateDocumentSystemTypeGroupIDnField}>
                                <option value='' selected></option>
                                <option value='1' >ระบบเครื่องกั้นถนน</option>
                    </SelectNoChildrenInput>
                </div>

                <div class="clear" />

                {/* system_type_id  */}
                <Label>ชนิดระบบตรวจซ่อม</Label>
                <div className="grid_4 alpha omega">
                    <SelectNoChildrenInput name="system_type_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} validate={validateDocumentSystemTypeIDField}>
                        <option value='' selected></option>
                        <option value='1' >ชนิดคานทำงานด้วยไฟฟ้า (ก.1)</option>
                    </SelectNoChildrenInput>
                </div>

                <div class="clear" />

                {/* hardware_type_id  */}
                <Label>ชื่ออุปกรณ์ที่บำรุงรักษา</Label>
                <div className="grid_4 alpha omega">
                    <SelectNoChildrenInput name="hardware_type_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}>
                        <option value='' selected></option>
                        <option value='1' >เครื่องกั้นถนนชนิดคานทำงานด้วยไฟฟ้า (ก.1)</option>
                    </SelectNoChildrenInput>
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
                                cssStyle={{ left: "-240px", top: "10px" }}>
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
                                cssStyle={{ left: "-240px", top: "10px" }}>
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
                                cssStyle={{ left: "-240px", top: "10px" }}>
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
                    <TextareaInput name="location_detail"
                        disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                </div>

                <div class="clear" />

                {/* summary_cause_condition link [root_cause] from WO */}
                <Label>สาเหตุและอาการเสียโดยสรุป</Label>
                <div className="grid_4 alpha omega">
                    <TextareaInput name="summary_cause_condition"
                        disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                </div>

                <div class="clear" />

                {/* cargo_id  */}
                <Label>ขบวนรถที่</Label>
                <div className="grid_4 alpha omega">
                    <TextInput name="cargo_id"
                        disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                </div>

                <div class="clear" />

                {/* total_fail_time  */}
                <Label>เสียเวลาเพราะเหตุนี้</Label>
                <div className="grid_3 alpha omega">
                    <NumberInput name="total_fail_time" step={1}
                        disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                </div>
                <div className="grid_1  omega">
                    <p className="top-text">
                        นาที
            </p>
                </div>

                <div class="clear" />

                {/* service_method_id */}
                <Label>ประเภทการซ่อม</Label>
                <div className="grid_4 alpha omega">
                    <SelectNoChildrenInput name="service_method_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}>
                        <option value='' selected></option>
                    </SelectNoChildrenInput>
                </div>

                <div class="clear" />

                {/* service_method_desc */}
                <Label>สรุปการแก้ไขและการซ่อมแซม</Label>
                <div className="grid_4 alpha omega">
                    <TextareaInput name="service_method_desc"
                        disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                </div>

                <div class="clear" />

                {/* interrupt_id */}
                <Label>ยังไมไ่ด้จัดการแก้ไขเพราะเหตุนี้</Label>
                <div className="grid_4 alpha omega">
                    <SelectNoChildrenInput name="interrupt_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}>
                        <option value='' selected></option>
                    </SelectNoChildrenInput>
                </div>

                <div class="clear" />
            </div>

            <div className="grid_12" style={{ marginTop: "10px" }}>
                {/* Remark */}
                <Label>หมายเหตุ</Label>
                <div className="grid_11 alpha omega">
                    <TextareaInput name="remark"
                        disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                </div>

                <div class="clear" />
            </div>

        </div>

        {/* === Tab related_parties_content  === */}
        <div id="related_parties_content" className="tabcontent">
            {/* Component Title */}
            <h3 className="head-title-bottom mt-2">ผู้ปฎิบัติงาน</h3>

            {/* === One Column   ==== */}
            <div className="grid_12">
                {/* auditor_name  */}
                <Label>ผู้ควบคุมตรวจสอบชื่อ</Label>
                <div className="grid_4 alpha omega">
                    <TextInput name="auditor_name"
                        disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                </div>

                <div class="clear" />

                {/* fixer_name  */}
                <Label>ดำเนินการแก้ไขชื่อ</Label>
                <div className="grid_4 alpha omega">
                    <TextInput name="fixer_name"
                        disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                </div>

                <div class="clear" />


                {/* member_1  */}
                <Label>รายชื่อเพื่อนร่วมงาน</Label>
                <div className="grid_4 alpha omega">
                    <TextInput name="member_1"
                        disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                </div>

                <div class="clear" />

                {/* member_2  */}
                <Label>รายชื่อเพื่อนร่วมงาน</Label>
                <div className="grid_4 alpha omega">
                    <TextInput name="member_2"
                        disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                </div>

                <div class="clear" />

                {/* member_3  */}
                <Label>รายชื่อเพื่อนร่วมงาน</Label>
                <div className="grid_4 alpha omega">
                    <TextInput name="member_3"
                        disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                </div>

                <div class="clear" />
            </div>

        </div>

        {/* === Tab compensation_list_content  === */}
        <div id="compensation_list_content" className="tabcontent">

            {/* Component Title */}
            <h4 className="head-title-bottom mt-2">ข้อมูลรายการค่าเสียหาย</h4>



            <table className="table-many-column">
                <thead>
                    <tr>
                        <th className="font text-center" style={{ minWidth: "50px" }}>#</th>
                        <th className="font text-center" style={{ minWidth: "300px" }}>รายการ</th>
                        <th className="font text-center" style={{ minWidth: "100px" }}>จำนวน</th>
                        <th className="font text-center" style={{ minWidth: "100px" }}>หน่วย</th>
                        <th className="font text-center" style={{ minWidth: "100px" }}>จำนวนเงิน</th>
                        <th className="font text-center" style={{ minWidth: "150px" }}>เลขที่อุปกรณ์</th>
                        <th className="font text-center" style={{ minWidth: "300px" }}>หมายเหตุ</th>
                    </tr>
                </thead>
                <tbody>
                    {values.loss_line_items.map((loss_line_item, index) => (
                        <tr key={index}>
                            <td className="edit-padding text-center">{loss_line_item.line_number}</td>
                            <td className="edit-padding text-center">
                                <TextInput name={`loss_line_items[${index}].description`} tabIndex="6"
                                    disabled={props.actionMode === TOOLBAR_MODE.SEARCH}
                                    redBorderForError="error-in-table"
                                />
                            </td>
                            <td className="edit-padding text-center">
                                <NumberInput step={0.01} name={`loss_line_items[${index}].quantity`} tabIndex="7"
                                    disabled={props.actionMode === TOOLBAR_MODE.SEARCH}
                                    redBorderForError="error-in-table"
                                />
                            </td>
                            <td className="edit-padding text-center">
                                {/* <SelectInput name={`loss_line_items[${index}].uom_id`} listProps={loss_line_item.list_uoms} tabIndex="8"
                                    tabIndex="8" disabled={props.actionMode === TOOLBAR_MODE.SEARCH}
                                    optionValue='uom_id' optionName='name'
                                    redBorderForError="error-in-table"
                                /> */}
                            </td>
                            <td className="edit-padding text-center">
                                <NumberInput step={1} name={`loss_line_items[${index}].per_unit_price`} tabIndex="9"
                                    disabled={props.actionMode === TOOLBAR_MODE.SEARCH}
                                    redBorderForError="error-in-table"
                                />
                            </td>
                            <td className="edit-padding text-center">
                                <TextInput name={`loss_line_items[${index}].internal_item_id`}
                                    validate={internal_item_id => validateLineNumberInternalItemIDField(`loss_line_items[${index}]`, internal_item_id, index)} tabIndex="6"
                                    disabled={props.actionMode === TOOLBAR_MODE.SEARCH}
                                    searchable={props.actionMode !== TOOLBAR_MODE.SEARCH} ariaControls="modalNoPart"
                                    handleModalClick={() => setLineNumber(loss_line_item.line_number)}
                                    redBorderForError="error-in-table"
                                />
                            </td>
                            <td className="edit-padding text-center">
                                <TextInput name={`loss_line_items[${index}].remark`} tabIndex="11"
                                    disabled={props.actionMode === TOOLBAR_MODE.SEARCH}
                                    redBorderForError="error-in-table"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* PopUp ค้นหาอะไหล่ MODE ADD */}
            <PopupModalNoPart 
            keyname='loss_line_items'
            lineNumber={lineNumber} 
            nameModal="modalNoPart" 
            />
        </div>


                <div id="attachment_content" className="tabcontent">
                    {/* <Files name="file[0].filename" desrciptionFiles={props.actionMode === TOOLBAR_MODE.SEARCH ? values.desrciption_files
                    : values.file}
                    desrciptionFilesLength={props.actionMode === TOOLBAR_MODE.SEARCH ? values.desrciption_files_length
                        : values.file.length}
                    disabled={props.actionMode === TOOLBAR_MODE.SEARCH}
                    disabledForModeAdd={props.actionMode === TOOLBAR_MODE.ADD}
                    HandleDownload={HandleDownload}
                    HandleDeleteFile={HandleDeleteFile}
                    /> */}
                </div>

                <div id="table_status_content" className="tabcontent">
                    <TableStatus bodyTableStatus={values.step_approve} />
                </div>

            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    fact: state.api.fact,
    actionMode: state.toolbar.mode,

    list_show: state.list_show
})
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);