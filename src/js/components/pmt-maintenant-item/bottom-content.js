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
import Label from '../common/form-label'
import PopupModalNoPart from '../common/popup-modal-nopart'
import TableLineItem from './table-line-item.js';
import TableEquipment from './table-equipment.js';

const BottomContent = (props) => {
    const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
    const factItems = useSelector((state) => ({ ...state.api.fact.items }), shallowEqual);
    const { values, errors, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();

    const [lineNumber, setLineNumber] = useState('');
    const [lineNumberEquipment, setLineNumberEquipment] = useState('');

    {/* === Tab broken_content  === */}
     const validateLineNumberInternalItemIDField = (fieldName, internal_item_id, index) => {
        //     By default Trigger every line_item, so need to check if the internal_item_id changes ourselves
        if (values.line_items[index].internal_item_id === internal_item_id) {
            return;
        }
        if (internal_item_id === "") {
            setFieldValue(fieldName + `.description`, '', false);
            setFieldValue(fieldName + `.quantity_fix`, '', false);
            setFieldValue(fieldName + `.quantity_salvage`, '', false);
            setFieldValue(fieldName + `.list_uoms`, [], false);
            setFieldValue(fieldName + `.uom_id`, '', false);
            return;
        }
        let items = factItems.items;
        let item = items.find(item => `${item.internal_item_id}` === `${internal_item_id}`); // Returns undefined if not found
        console.log(item)
        if (item) {
            setFieldValue(fieldName + `.description`, `${item.description}`, false);
            setFieldValue(fieldName + `.quantity_fix`, '0.00', false);
            setFieldValue(fieldName + `.quantity_salvage`, '0.00', false);
            setFieldValue(fieldName + `.list_uoms`, item.list_uoms, false);
            setFieldValue(fieldName + `.uom_id`, item.list_uoms[0].uom_id, false);
            return;
        } else {
            return 'Invalid Number ID';
        }
    }

    {/* === Tab equipment_content  === */}
    {/*const validateLineNumberInternalItemIDFieldEquipment = (fieldName, internal_item_id, index) => {
        //     By default Trigger every line_item, so need to check if the internal_item_id changes ourselves
        if (values.line_items[index].internal_item_id === internal_item_id) {
            return;
        }
        if (internal_item_id === "") {
            setFieldValue(fieldName + `.description`, '', false);
            setFieldValue(fieldName + `.quantity`, '', false);
            setFieldValue(fieldName + `.uom_id`, '', false);
            setFieldValue(fieldName + `.list_uoms`, [], false);
            setFieldValue(fieldName + `.remark`, '', false);
            return;
        }
        let items = factItems.items;
        let item = items.find(item => `${item.internal_item_id}` === `${internal_item_id}`); // Returns undefined if not found
        console.log(item)
        if (item) {
            setFieldValue(fieldName + `.description`, item.description, false);
            setFieldValue(fieldName + `.quantity`, '0.00', false);
            setFieldValue(fieldName + `.uom_id`, item.list_uoms[0].uom_id, false);
            setFieldValue(fieldName + `.list_uoms`, item.list_uoms, false);
            setFieldValue(fieldName + `.remark`, item.remark , false);
            return;
        } else {
            return 'Invalid Number ID';
        }
    }*/}

    return (
        <div id="blackground-gray">
            <div className="container_12 clearfix">

                {/* === Tab broken_content  === */}
                <div id="broken_content" className="tabcontent">
                    <TableLineItem line_items={values.line_items}
                        validateLineNumberInternalItemIDField={validateLineNumberInternalItemIDField}
                        // validateLineNumberQuatityItemIDField={validateLineNumberQuatityItemIDField}
                        // validateLineNumberPerUnitPriceItemIDField={validateLineNumberPerUnitPriceItemIDField}
                        setLineNumber={setLineNumber}
                    />

                    <div className="grid_12" style={{ marginTop: "10px" }}>
                        {/* Remark */}
                        <Label>หมายเหตุ</Label>
                        <div className="grid_11 alpha omega">
                            <TextareaInput name="remark"
                                disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div className="clear" />
                    </div>
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

                        <div className="clear" />

                        {/* fixer_name  */}
                        <Label>ดำเนินการแก้ไขชื่อ</Label>
                        <div className="grid_4 alpha omega">
                            <TextInput name="fixer_name"
                                disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div className="clear" />


                        {/* member_1  */}
                        <Label>รายชื่อเพื่อนร่วมงาน</Label>
                        <div className="grid_4 alpha omega">
                            <TextInput name="member_1"
                                disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div className="clear" />

                        {/* member_2  */}
                        <Label>รายชื่อเพื่อนร่วมงาน</Label>
                        <div className="grid_4 alpha omega">
                            <TextInput name="member_2"
                                disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div className="clear" />

                        {/* member_3  */}
                        <Label>รายชื่อเพื่อนร่วมงาน</Label>
                        <div className="grid_4 alpha omega">
                            <TextInput name="member_3"
                                disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div className="clear" />
                    </div>

                </div>

                {/* <div id="equipment_content" className="tabcontent">
                    <TableEquipment line_items={values.line_equipments}
                        validateLineNumberInternalItemIDFieldEquipment={validateLineNumberInternalItemIDFieldEquipment}
                        // validateLineNumberQuatityItemIDField={validateLineNumberQuatityItemIDField}
                        // validateLineNumberPerUnitPriceItemIDField={validateLineNumberPerUnitPriceItemIDField}
                        setLineNumberEquipment={setLineNumberEquipment}
                    />
                </div> */}

                <div id="attachment_content" className="tabcontent">
                    <div className="container_12 ">
                        {/* <Files /> */}
                    </div>
                </div>

                <div id="table_status_content" className="tabcontent">
                    <TableStatus bodyTableStatus={values.step_approve} />
                </div>

                {/* PopUp ค้นหาอะไหล่ broken_content */}
                <PopupModalNoPart keyname='line_items' lineNumber={lineNumber} nameModal="modalNoPart" />

                {/* PopUp ค้นหาอะไหล่ equipment_content */}
                <PopupModalNoPart keyname='line_equipments' lineNumber={lineNumberEquipment} nameModal="modalNoPart2" />

            </div>
        </div>
    );
};

export default BottomContent;