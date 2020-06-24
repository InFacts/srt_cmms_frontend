import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux'
import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import Files from '../common/files2'
import TableStatus from '../common/table-status';
import TextInput from '../common/formik-text-input';
import TextareaInput from '../common/formik-textarea-input';
import DateInput from '../common/formik-date-input';
import DateTimeInput from '../common/formik-datetime-input';
import SelectNoChildrenInput from '../common/formik-select-no-children';
import { useFormik, withFormik, useFormikContext } from 'formik';
import Label from '../common/form-label'
import {
    getEmployeeIDFromUserID, fetchStepApprovalDocumentData, DOCUMENT_TYPE_ID, validateEmployeeIDField,
    validateWarehouseIDField, validateInternalDocumentIDFieldHelper, checkBooleanForEditHelper, validateUserIDField
} from '../../helper';
import { FACTS } from '../../redux/modules/api/fact';
import PopupModalReponseZoneBy from '../common/popup-modal-reponse-zone-by'

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { fetchPositionPermissionData, changeTheam } from '../../helper.js'
const BottomContent = (props) => {
    const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
    const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
    const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);
    const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);
    const factDistricts = useSelector((state) => ({ ...state.api.fact.districts }), shallowEqual);
    const factNodes = useSelector((state) => ({ ...state.api.fact.nodes }), shallowEqual);
    const factStations = useSelector((state) => ({ ...state.api.fact.stations }), shallowEqual);
    const factEquipmentStatus = useSelector((state) => ({ ...state.api.fact[FACTS.EQUIPMENT_STATUS] }), shallowEqual);
    const { values, setFieldValue } = useFormikContext();

    const checkBooleanForEdit = checkBooleanForEditHelper(values, decoded_token, fact)

    const validateResponsibleZoneByField = (...args) => validateUserIDField("responsible_zone_by", fact, setFieldValue, ...args);

    return (
        <div id={changeTheam() === true ? "" : "blackground-gray"}>
            <div className="container_12 clearfix" id={changeTheam() === true ? "blackground-gray" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray" } : {}}>

                {/* === Tab broken_content  === */}
                <div id="general_content" className="tabcontent">

                    {/* === Left Column === */}
                    <div className="grid_6" style={{ paddingLeft: "10px" }}>

                        <h3 className="head-title-bottom mt-2">หน่วยงานที่รับผิดชอบ</h3>

                        <div class="clear" />

                        {/* Responsible person District ID */}
                        <div className="grid_2 alpha white-space">
                            <p className="top-text">หน่วยงานผู้รับผิดชอบ</p>
                        </div>
                        <div className="grid_3 pull_0">
                            <TextInput name="responsible_node_id"
                                disabled
                                tabIndex="6" />
                        </div>

                        <div class="clear" />

                        <h3 className="head-title-bottom mt-2">การติดตั้ง</h3>

                        <div class="clear" />

                        {/* Installed date */}
                        <div className="grid_1 alpha white-space">
                            <p className="top-text">วันที่ติดตั้งเสร็จ</p>
                        </div>
                        <div className="grid_3 omega">
                            <DateInput name="installed_on"
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                                tabIndex="6" />
                        </div>
                        <div class="clear" />

                        {/* Installed date */}
                        <div className="grid_1 alpha white-space">
                            <p className="top-text">วันที่ประกาศใช้</p>
                        </div>
                        <div className="grid_3 omega">
                            <DateInput name="announce_use_on"
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                                tabIndex="6" />
                        </div>
                        <div class="clear" />

                        <div className="grid_1 alpha white-space">
                            <p className="top-text">สถานะ</p>
                        </div>
                        <div className="grid_3 omega">
                            <SelectNoChildrenInput name="equipment_status_id" disabled>
                                <option value=''></option>
                                {factEquipmentStatus.items.map((equipment_status) => {
                                    if (values.equipment_status_id === equipment_status.equipment_status_id) {
                                        return <option value={equipment_status.equipment_status_id} key={equipment_status.equipment_status_id} selected>{equipment_status.status_th}</option>
                                    } else {
                                        return <option value={equipment_status.equipment_status_id} key={equipment_status.equipment_status_id}>{equipment_status.status_th}</option>
                                    }
                                })}
                            </SelectNoChildrenInput>
                        </div>

                        <div class="clear" />
                    </div>

                    <div className="grid_12">
                        {/* Remark */}
                        <div className="grid_1 white-space">
                            <p className="top-text">หมายเหตุ</p>
                        </div>
                        <div className="grid_11 alpha omega">
                            <TextareaInput name="remark"
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div class="clear" />
                    </div>

                </div>

                <div id="location_content" className="tabcontent">
                    <div className="container_12 ">
                        {/* === One Column === */}
                        <div className="grid_12">

                            {/* Sub-Component Title */}
                            <h3 className="head-title-bottom mt-2">สถานที่ (ผู้ที่รับผิดชอบตามพื้นที่)</h3>

                            <div class="clear" />

                            {/* Responsible person District ID */}
                            <div className="grid_1 alpha white-space">
                                <p className="top-text">แขวง</p>
                            </div>
                            <div className="grid_7">
                                <SelectNoChildrenInput name="location_district_id"
                                    disabled={checkBooleanForEdit === true ? false : checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} >
                                    <option value=''></option>
                                    {factDistricts.items.map((districts) => (
                                        <option key={districts.district_id} value={districts.district_id}>{districts.name}</option>
                                    ))}
                                </SelectNoChildrenInput>
                            </div>

                            <div class="clear" />

                            {/* Responsible person Node ID */}
                            <div className="grid_1 alpha white-space">
                                <p className="top-text">ตอน</p>
                            </div>
                            <div className="grid_7">
                                <SelectNoChildrenInput name="location_node_id"
                                    disabled={checkBooleanForEdit === true ? false : checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} >
                                    <option value=''></option>
                                    {/* {factNodes.items.map((node) => {
                                        if (values.location_district_id === node.district_id) {
                                            console.log("node.district_id", node.district_id, "values.location_district_id", values.location_district_id)
                                            return <option key={node.node_id} value={node.node_id} selected>{node.name}</option>
                                        }
                                    })} */}
                                    {factNodes.items.map((node) => {
                                        if (values.location_district_id === node.node_id) {
                                            return <option key={node.node_id} value={node.node_id} selected>{node.name}</option>
                                        }
                                    })}
                                </SelectNoChildrenInput>
                            </div>

                            <div class="clear" />

                            {/* Responsible person Station ID ใช้สำหรับส่งให้ พี่ลีเพื่อบอกว่า สถานีไหนรับผิดชอบ */}
                            <div className="grid_1 alpha white-space">
                                <p className="top-text">สถานี</p>
                            </div>
                            <div className="grid_7">
                                <SelectNoChildrenInput name="location_station_id"
                                    disabled={checkBooleanForEdit === true ? false : checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} >
                                    <option value=''></option>
                                    {factStations.items.map((stations) => {
                                        if (values.location_node_id === stations.node_id) {
                                            return <option key={stations.station_id} value={stations.station_id} selected>{stations.name}</option>
                                        }
                                    })}
                                </SelectNoChildrenInput>
                            </div>

                            <div class="clear" />

                            {/* Responsible person Station ID */}
                            <div className="grid_2 alpha white-space">
                                <p className="top-text">รายละเอียดเพิ่มเติม</p>
                            </div>
                            <div className="grid_7 pull_0">
                                <TextInput name="location_description"
                                    disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                                    tabIndex="6" />
                            </div>

                            <div class="clear" />

                        </div>
                    </div>
                </div>

                <div id="attachment_content" className="tabcontent">
                    <Files />
                </div>

                <div id="table_status_content" className="tabcontent">
                    <TableStatus bodyTableStatus={values.step_approve} />
                </div>

            </div>
            <PopupModalReponseZoneBy />
        </div>
    );
};

export default BottomContent;