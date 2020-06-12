import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux'
import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import Files from '../common/files2'
import TableStatus from '../common/table-status';
import TextInput from '../common/formik-text-input';
import TextareaInput from '../common/formik-textarea-input';
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
                <div id="broken_content" className="tabcontent">
                    <table className="table-many-column mt-3">
                        <thead>
                            <tr>
                                <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                                <th className="font" style={{ minWidth: "130px" }}>เลขที่อะไหล่</th>
                                <th className="font" style={{ minWidth: "368px" }}>รายละเอียด</th>
                                <th className="font" style={{ minWidth: "130px" }}>เลขที่สินทรัพย์</th>

                                <th className="font text-center" style={{ minWidth: "80px" }}>หน่วยนับ</th>

                                <th className="font text-center" style={{ minWidth: "80px" }}>ของเสีย</th>
                                <th className="font text-center" style={{ minWidth: "80px" }}>ซาก</th>
                                <th className="font text-center" style={{ minWidth: "80px" }}>ของเก่าพร้อมใช้งาน</th>

                                <th className="font text-center" style={{ minWidth: "80px" }}>จำนวนทั้งหมด</th>
                                <th className="font text-center" style={{ minWidth: "200px" }}>หมายเหตุ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className="edit-padding text-center"></th>
                                <td className="edit-padding"></td>
                                <td className="edit-padding"></td>
                                <td className="edit-padding"></td>

                                <td className="edit-padding text-center"></td>

                                <td className="edit-padding text-center"></td>
                                <td className="edit-padding text-center"></td>
                                <td className="edit-padding text-right"></td>

                                <td className="edit-padding text-center"></td>
                                <td className="edit-padding text-center"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div id="related_parties_content" className="tabcontent">
                    {/* Component Title */}
                    <h3 className="head-title-bottom mt-2">ผู้ปฎิบัติงาน</h3>

                    {/* === One Column   ==== */}
                    <div className="grid_12">

                        {/* auditor_name  */}
                        <Label>ผู้ควบคุมตรวจสอบชื่อ</Label>
                        <div className="grid_4 alpha omega">
                            <TextInput name="auditor_name"
                                disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div class="clear" />

                        {/* fixer_name  */}
                        <Label>ดำเนินการแก้ไขชื่อ</Label>
                        <div className="grid_4 alpha omega">
                            <TextInput name="fixer_name"
                                disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div class="clear" />


                        {/* member_1  */}
                        <Label>รายชื่อเพื่อนร่วมงาน</Label>
                        <div className="grid_4 alpha omega">
                            <TextInput name="member_1"
                                disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div class="clear" />

                        {/* member_2  */}
                        <Label>รายชื่อเพื่อนร่วมงาน</Label>
                        <div className="grid_4 alpha omega">
                            <TextInput name="member_2"
                                disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div class="clear" />

                        {/* member_3  */}
                        <Label>รายชื่อเพื่อนร่วมงาน</Label>
                        <div className="grid_4 alpha omega">
                            <TextInput name="member_3"
                                disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div class="clear" />
                    </div>

                </div>

                <div id="equipment_content" className="tabcontent">
                    <table className="table-many-column mt-3">
                        <thead>
                            <tr>
                                <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                                <th className="font" style={{ minWidth: "130px" }}>เลขที่อะไหล่</th>
                                <th className="font" style={{ minWidth: "368px" }}>รายละเอียด</th>
                                <th className="font text-center" style={{ minWidth: "130px" }}>จำนวน</th>

                                <th className="font text-center" style={{ minWidth: "130px" }}>หน่วยนับ</th>
                                <th className="font" style={{ minWidth: "300px" }}>หมายเหตุ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className="edit-padding text-center"></th>
                                <td className="edit-padding"></td>
                                <td className="edit-padding"></td>
                                <td className="edit-padding"></td>

                                <td className="edit-padding text-center"></td>
                                <td className="edit-padding text-center"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div id="attachment_content" className="tabcontent">
                    <div className="container_12 ">
                        {/* <Files /> */}
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