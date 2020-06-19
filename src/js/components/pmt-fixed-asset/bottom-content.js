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

const BottomContent = (props) => {
    const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
    const factDistricts = useSelector((state) => ({ ...state.api.fact.districts }), shallowEqual);
    const factNodes = useSelector((state) => ({ ...state.api.fact.nodes }), shallowEqual);
    const factStations = useSelector((state) => ({ ...state.api.fact.stations }), shallowEqual);
    const { values } = useFormikContext();
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
                            <TextInput name="responsible_person_district"
                                disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                                tabIndex="6" />
                        </div>

                        <div class="clear" />

                        <h3 className="head-title-bottom mt-2">การติดตั้ง</h3>

                        <div class="clear" />

                        {/* Installed date */}
                        <Label>วันที่ติดตั้งเสร็จ</Label>
                        <div className="grid_3 alpha omega">
                            <DateInput name="install_date"
                                disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                                tabIndex="6" />
                        </div>
                        <div class="clear" />

                        {/* Installed date */}
                        <Label>วันที่ประกาศใช้</Label>
                        <div className="grid_3 alpha omega">
                            <DateInput name="announce_date"
                                disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                                tabIndex="6" />
                        </div>
                        <div class="clear" />

                        <Label>สถานะ</Label>
                        <div className="grid_3 alpha omega">
                            <SelectNoChildrenInput name="uom_id" disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
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
                            <div className="grid_9">
                                <TextInput name="install_address"
                                    disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                                    tabIndex="6" />
                            </div>

                            <div class="clear" />

                            {/* Responsible person Node ID */}
                            <Label>ตอน</Label>
                            <div className="grid_9">
                                <TextInput name="install_district"
                                    disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                                    tabIndex="6" />
                            </div>

                            <div class="clear" />

                            {/* Responsible person Station ID */}
                            <Label>สถานี</Label>
                            <div className="grid_9">
                                <TextInput name="install_county"
                                    disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                                    tabIndex="6" />
                            </div>

                            <div class="clear" />

                            {/* Responsible person Station ID */}
                            <Label>ละติจูด, ลองติจูด</Label>
                            <div className="grid_9">
                                <TextInput name="install_postal_code"
                                    disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                                    tabIndex="6" />
                            </div>

                            <div class="clear" />

                            {/* Responsible person Station ID */}
                            <Label>รายละเอียดเพิ่มเติม</Label>
                            <div className="grid_9">
                                <TextInput name="install_google_map"
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