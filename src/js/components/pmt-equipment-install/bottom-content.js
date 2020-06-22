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
    validateWarehouseIDField, validateInternalDocumentIDFieldHelper, checkBooleanForEditHelper
} from '../../helper';

const BottomContent = (props) => {
    const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
    const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
    const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);
    const decoded_token = useSelector((state) => ({...state.token.decoded_token}), shallowEqual);
    const factDistricts = useSelector((state) => ({ ...state.api.fact.districts }), shallowEqual);
    const factNodes = useSelector((state) => ({ ...state.api.fact.nodes }), shallowEqual);
    const factStations = useSelector((state) => ({ ...state.api.fact.stations }), shallowEqual);
    const { values } = useFormikContext();

    const checkBooleanForEdit = checkBooleanForEditHelper(values, decoded_token, fact)

    return (
        <div id="blackground-gray">
            <div className="container_12 clearfix">

                {/* === Tab broken_content  === */}
                <div id="general_content" className="tabcontent">

                    {/* === Left Column === */}
                    <div className="grid_6" style={{ paddingLeft: "10px" }}>

                        {/* Sub-Component Title */}
                        <h3 className="head-title-bottom mt-2">ผู้ที่รับผิดชอบตามพื้นที่</h3>

                        <div class="clear" />

                        {/* Responsible person District ID */}
                        <Label>ผู้รับผิดชอบ</Label>
                        <div className="grid_3 alpha omega">
                            <TextInput name="responsible_zone_by"
                                disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                                tabIndex="6" />
                        </div>

                        <div class="clear" />

                        <h3 className="head-title-bottom mt-2">หน่วยงานที่รับผิดชอบ</h3>

                        <div class="clear" />

                        {/* Responsible person District ID */}
                        <Label>หน่วยงานผู้รับผิดชอบ</Label>
                        <div className="grid_3 alpha omega">
                            <TextInput name="responsible_by"
                                disabled
                                tabIndex="6" />
                        </div>

                        <div class="clear" />

                        <h3 className="head-title-bottom mt-2">การติดตั้ง</h3>

                        <div class="clear" />

                        {/* Installed date */}
                        <Label>วันที่ติดตั้งเสร็จ</Label>
                        <div className="grid_3 alpha omega">
                            <DateInput name="installed_on"
                                disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                                tabIndex="6" />
                        </div>
                        <div class="clear" />

                        {/* Installed date */}
                        <Label>วันที่ประกาศใช้</Label>
                        <div className="grid_3 alpha omega">
                            <DateInput name="announce_use_on"
                                disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                                tabIndex="6" />
                        </div>
                        <div class="clear" />

                        <Label>สถานะ</Label>
                        <div className="grid_3 alpha omega">
                            <SelectNoChildrenInput name="equipment_status_id" disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                                cssStyle={{ left: "-160px", top: "10px" }}>
                                <option value=''></option>
                            </SelectNoChildrenInput>
                        </div>

                        <div class="clear" />
                    </div>

                    <div className="grid_12" style={{ marginTop: "20px" }}>
                        {/* Remark */}
                        <Label>หมายเหตุ</Label>
                        <div className="grid_11 alpha omega">
                            <TextareaInput name="remark"
                                disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div class="clear" />
                    </div>

                </div>

                <div id="location_content" className="tabcontent">
                    <div className="container_12 ">
                        {/* === One Column === */}
                        <div className="grid_12">

                            {/* Sub-Component Title */}
                            <h3 className="head-title-bottom mt-2">สถานที่</h3>

                            <div class="clear" />

                            {/* Responsible person District ID */}
                            <Label>แขวง</Label>
                            <div className="grid_7">
                                <SelectNoChildrenInput name="location_district_id" 
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} >
                                    <option value=''></option>
                                    {factDistricts.items.map((districts) => {
                                        if (values.location_district_id === districts.district_id) {
                                            return <option key={districts.district_id} value={districts.district_id} selected>{districts.name}</option>
                                        } else return <option key={districts.district_id} value={districts.district_id}>{districts.name}</option>
                                    })}
                                </SelectNoChildrenInput>
                            </div>

                            <div class="clear" />

                            {/* Responsible person Node ID */}
                            <Label>ตอน</Label>
                            <div className="grid_7">
                                <SelectNoChildrenInput name="location_node_id" 
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} >
                                    <option value=''></option>
                                    {factNodes.items.map((node) => {
                                        if (values.location_node_id === node.node_id) {
                                            return <option key={node.node_id} value={node.node_id} selected>{node.name}</option>
                                        } else return <option key={node.node_id} value={node.node_id}>{node.name}</option>
                                    })}
                                </SelectNoChildrenInput>
                            </div>

                            <div class="clear" />

                            {/* Responsible person Station ID */}
                            <Label>สถานี</Label>
                            <div className="grid_7">
                                <SelectNoChildrenInput name="location_station_id" 
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} >
                                    <option value=''></option>
                                    {factStations.items.map((stations) => {
                                        if (values.location_station_id === stations.station_id) {
                                            return <option key={stations.station_id} value={stations.station_id} selected>{stations.name}</option>
                                        } else return <option key={stations.station_id} value={stations.station_id}>{stations.name}</option>
                                    })}
                                </SelectNoChildrenInput>
                            </div>

                            <div class="clear" />

                            {/* Responsible person Station ID */}
                            <Label>รายละเอียดเพิ่มเติม</Label>
                            <div className="grid_7">
                                <TextInput name="location_description"
                                    disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
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
        </div>
    );
};

export default BottomContent;