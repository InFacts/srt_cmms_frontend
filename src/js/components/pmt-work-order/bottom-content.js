import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { useSelector, shallowEqual } from 'react-redux'

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

import PopupModalEquipment from '../common/popup-modal-equipment';
import TableHasEquipment from '../common/table-has-equipment';
import { validatedataDocumentField, DOCUMENT_STATUS, getUserIDFromEmployeeID, checkBooleanForEditHelper } from '../../helper';
import { FACTS } from '../../redux/modules/api/fact';

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { fetchPositionPermissionData, changeTheam } from '../../helper.js'
const BottomContent = (props) => {
    const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
    const factDistricts = useSelector((state) => ({ ...state.api.fact.districts }), shallowEqual);
    const factNodes = useSelector((state) => ({ ...state.api.fact.nodes }), shallowEqual);
    const factStations = useSelector((state) => ({ ...state.api.fact.stations }), shallowEqual);
    const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
    const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);
    const { values, setFieldValue } = useFormikContext();

    const [lineNumber, setLineNumber] = useState('');

    const validateDocumentAccidentNameField = (...args) => validatedataDocumentField("accident_name", setFieldValue, ...args)
    const validateDocumentAccidentOnField = (...args) => validatedataDocumentField("accident_on", setFieldValue, ...args)
    const validateDocumentRequestOnField = (...args) => validatedataDocumentField("request_on", setFieldValue, ...args)
    const validateDocumentRequestByField = (...args) => validatedataDocumentField("request_by", setFieldValue, ...args)
    const validateDocumentRecvAccidentFromRecvIDField = (...args) => validatedataDocumentField("recv_accident_from_recv_id", setFieldValue, ...args)

    const validateDocumentLocationDistrictIDField = (...args) => validatedataDocumentField("location_district_id", setFieldValue, ...args)
    const validateDocumentLocationNodeIDField = (...args) => validatedataDocumentField("location_node_id", setFieldValue, ...args)
    const validateDocumentLocationStationIDField = (...args) => validatedataDocumentField("location_station_id", setFieldValue, ...args)

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
            setFieldValue(fieldName + `.item_id`, item.item_id, false);
            setFieldValue(fieldName + `.description`, `${item.description}`, false);
            setFieldValue(fieldName + `.equipment_status_id`, 3, false);
            var item_match_equipments = props.equipment;
            let item_match_equipment = item_match_equipments.find(item_match_equipment => `${item_match_equipment.item_id}` === `${item.item_id}`);
            console.log("item_match_equipment", item_match_equipment)
            if (item_match_equipment) {
                setFieldValue(fieldName + `.equipment_item_id`, parseInt(item.item_id), false);
            }
            return;
        } else {
            return 'Invalid Number ID';
        }
    }

    const checkBooleanForEdit = checkBooleanForEditHelper(values, decoded_token, fact)
    return (
        <div id={changeTheam() === true ? "" : "blackground-gray"}>
            <div className="container_12 clearfix" id={changeTheam() === true ? "blackground-gray" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray" } : {}}>

                {/* === Tab broken_content  === */}
                <div id="broken_content" className="tabcontent">
                    {/* Component Title */}
                    <h3 className="head-title-bottom mt-2">ข้อมูลเกี่ยวกับอาการขัดข้อง</h3>

                    {/* === Left Column   ==== */}
                    <div className={changeTheam() === true ? "grid_5" : "grid_6"} style={{ paddingLeft: "10px" }}>


                        {/* Accident Name  */}
                        <div className="grid_2 alpha white-space">
                            <p className="top-text">ชื่องาน</p>
                        </div>
                        <div className="grid_3 alpha omega pull_0">
                            <TextInput name="accident_name" validate={validateDocumentAccidentNameField} tabIndex="8"
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div class="clear" />

                        {/* Accident On  */}
                        <div className="grid_2 alpha white-space">
                            <p className="top-text">วันเวลาที่เกิดเหตุ</p>
                        </div>
                        <div className="grid_3 alpha omega pull_0">
                            <DateTimeInput name="accident_on" validate={validateDocumentAccidentOnField} tabIndex="9"
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                                cssStyle={{ left: "-160px", top: "14px" }} />
                        </div>

                        <div class="clear" />

                        {/* request_on */}
                        <div className="grid_2 alpha white-space">
                            <p className="top-text">วันเวลาที่รับแจ้ง</p>
                        </div>
                        <div className="grid_3 alpha omega pull_0">
                            <DateTimeInput name="request_on" validate={validateDocumentRequestOnField} tabIndex="10"
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                                cssStyle={{ left: "-160px", top: "14px" }} />
                        </div>

                        <div class="clear" />

                        {/* root_cause */}
                        <div className="grid_2 alpha white-space">
                            <p className="top-text">อาการเสียโดยสรุป</p>
                        </div>
                        <div className="grid_3 alpha omega pull_0">
                            <TextareaInput name="root_cause" tabIndex="11"
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div class="clear" />

                        {/* request_by */}
                        <div className="grid_2 alpha white-space">
                            <p className="top-text">ได้รับเหตุจาก</p>
                        </div>
                        <div className="grid_3 alpha omega pull_0">
                            <TextInput name="request_by" validate={validateDocumentRequestByField} tabIndex="12"
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div class="clear" />

                        {/* recv_accident_from_id */}
                        <div className="grid_2 alpha white-space">
                            <p className="top-text">รับข้อมูลผ่านช่องทาง</p>
                        </div>
                        <div className="grid_3 alpha omega pull_0">
                            {/* Need to change to radio button later */}
                            <SelectNoChildrenInput name="recv_accident_from_recv_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                             cssStyle={{ left: "-160px", top: "14px" }}
                                validate={validateDocumentRecvAccidentFromRecvIDField} tabIndex="13">
                                <option value='' selected></option>
                                <option value='1' >โทรศัพท์</option>
                                <option value='2' >จดหมาย</option>
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
                                validate={validateDocumentLocationDistrictIDField} cssStyle={{ left: "-240px", top: "10px" }} tabIndex="14">
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
                            <SelectNoChildrenInput name="location_node_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                                validate={validateDocumentLocationNodeIDField} cssStyle={{ left: "-240px", top: "10px" }} tabIndex="15">
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
                            <SelectNoChildrenInput name="location_station_id" cssStyle={{ left: "-240px", top: "10px" }} tabIndex="16"
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} validate={validateDocumentLocationStationIDField}>
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
                            <TextareaInput name="location_detail" tabIndex="17"
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div class="clear" />
                    </div>


                    <div className="grid_12" style={{ marginTop: "10px" }}>
                        {/* Remark */}
                        <Label>หมายเหตุ</Label>
                        <div className="grid_11 alpha omega">
                            <TextareaInput name="remark" tabIndex="18"
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
};

const mapStateToProps = (state) => ({
    fact: state.api.fact,
    equipment: state.api.fact.equipment.items,
})
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);