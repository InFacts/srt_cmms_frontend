import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux'
import PopupModalDocument from '../common/popup-modal-document'
import PopupModalUsername from '../common/popup-modal-username'

import TextInput from '../common/formik-text-input'
import DateTimeInput from '../common/formik-datetime-input'
import DateInput from '../common/formik-date-input'
import SelectNoChildrenInput from '../common/formik-select-no-children';

import { TOOLBAR_MODE, TOOLBAR_ACTIONS, toModeAdd } from '../../redux/modules/toolbar.js';
import { FACTS } from '../../redux/modules/api/fact';
import Label from '../common/form-label'
import {
    getEmployeeIDFromUserID, fetchStepApprovalDocumentData, DOCUMENT_TYPE_ID, validateEmployeeIDField,
    validateWarehouseIDField, validateInternalDocumentIDFieldHelper, checkBooleanForEditHelper
} from '../../helper';
import useFillDefaultsOnModeAdd from '../../hooks/fill-defaults-on-mode-add'
import PopupModalEquipmentNoChildren from '../common/popup-modal-equipment-no-children'

import { useFormikContext, useField } from 'formik';

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { fetchPositionPermissionData, changeTheam } from '../../helper.js'
const TopContent = (props) => {
    const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
    const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
    const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);
    const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);
    const factEquipment = useSelector((state) => ({ ...state.api.fact.equipment }), shallowEqual);

    const { values, errors, touched, setFieldValue, setTouched, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();

    // Fill Default Forms
    useFillDefaultsOnModeAdd();

    const validateInternalDocumentIDField = (...args) => validateInternalDocumentIDFieldHelper(checkBooleanForEdit, DOCUMENT_TYPE_ID.EQUIPMENT_INSTALLATION, toolbar, footer, fact, values, setValues, setFieldValue, validateField, ...args)

    const validateUserEmployeeIDField = (...args) => validateEmployeeIDField("created_by_user_employee_id", fact, setFieldValue, ...args);
    const validateAdminEmployeeIDField = (...args) => validateEmployeeIDField("created_by_admin_employee_id", fact, setFieldValue, ...args);

    const validateInternalItemIDField = internal_item_id => {
        //     By default Trigger every line_item, so need to check if the internal_item_id changes ourselves
        if (values.internal_item_id === internal_item_id) {
            return;
        }
        if (internal_item_id === "") {
            setFieldValue("item_id", '', false);
            setFieldValue("description", '', false);
            setFieldValue("uom_group_id", '', false);
            setFieldValue("equipment_id", '', false);
            setFieldValue("equipment_status_id", '', false);
            setFieldValue("responsible_node_id", '', false);
            return;
        }

        var item_match_equipments = factEquipment.items;
        let item_match_equipment = item_match_equipments.find(item_match_equipment => `${item_match_equipment.equipment_group.item.internal_item_id}` === `${internal_item_id}`); // Returns undefined if not found
        console.log("item_match_equipment", item_match_equipment)
        if (item_match_equipment) {
            // item_match_equipment
            setFieldValue("item_id", item_match_equipment.equipment_group.item_id, false);
            setFieldValue("description", item_match_equipment.equipment_group.item.description, false);
            setFieldValue("uom_group_id", item_match_equipment.equipment_group.item.uom_group_id, false);
            setFieldValue("equipment_id", item_match_equipment.equipment_id, false);
            setFieldValue("equipment_status_id", item_match_equipment.item_status_id, false);
            setFieldValue("responsible_district_id", item_match_equipment.responsible_district_id, false);

            // IF Check user If User is Admin -> return true Else -> return false
            if (decoded_token.id === 4) { //{/* TODO USER_ID FOR ADMIN */}
                console.log(" YES I AM ADMIN ")
                setFieldValue("modeEdit", true, false);
            } else {
                console.log(" NO I NOT ADMIN ")
                setFieldValue("modeEdit", false, false);
            }
        }
        else {
            return 'Invalid Number ID';
        }
    }

    const checkBooleanForEdit = checkBooleanForEditHelper(values, decoded_token, fact)
    return (
        <div id={changeTheam() === true ? "" : "blackground-white"}>
            <div className="container_12 clearfix">
                {/* Section Title */}
                <h4 className="head-title" style={{ marginTop: "80px" }}>ติดตั้งสินทรัพย์</h4>

                <div id={changeTheam() === true ? "blackground-white" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray", height: "200px", paddingTop: "10px" } : {}} >
                    {/* === Left Column === */}
                    <div className={changeTheam() === true ? "grid_5" : "grid_6"} style={{ paddingLeft: "10px" }}>

                        {/* Document ID */}
                        <div className="grid_1 alpha white-space">
                            <p className="top-text">เลขที่เอกสาร</p>
                        </div>
                        <div className="grid_3">
                            <TextInput name="internal_document_id"
                                validate={validateInternalDocumentIDField}
                                searchable={toolbar.mode === TOOLBAR_MODE.SEARCH} ariaControls="modalDocument"
                                tabIndex="1" />
                        </div>
                        <div className="clear" />

                        {/* Equiment ID */}
                        <div className="grid_1 alpha white-space">
                            <p className="top-text">เลขที่สินทรัพย์</p>
                        </div>
                        <div className="grid_3">
                            <TextInput name='internal_item_id'
                                validate={validateInternalItemIDField}
                                searchable={checkBooleanForEdit === true ? true : toolbar.mode !== TOOLBAR_MODE.SEARCH}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                                ariaControls="modalNoPart"
                                tabIndex="2" />
                        </div>
                        <div className="clear" />

                        {/* Description  */}
                        <div className="grid_1 alpha white-space">
                            <p className="top-text">รายละเอียด</p>
                        </div>
                        <div className="grid_3">
                            <TextInput name="description"
                                disabled
                                tabIndex="3" />
                        </div>
                        <div className="clear" />

                        {/* UOM  */}
                        <div className="grid_1 alpha white-space">
                            <p className="top-text">หน่วย</p>
                        </div>
                        <div className="grid_3">
                            <SelectNoChildrenInput name="uom_group_id" disabled>
                                <option value=''></option>
                                {fact[FACTS.UNIT_OF_MEASURE_GROUPS].items.map((uom) => (
                                    values.uom_group_id === uom.uom_group_id
                                        ?
                                        <option value={uom.uom_group_id} key={uom.uom_group_id} selected> {uom.name} </option>
                                        :
                                        <option value={uom.uom_group_id} key={uom.uom_group_id}> {uom.name} </option>
                                ))}
                            </SelectNoChildrenInput>
                        </div>
                        <div className="clear" />
                    </div>

                    {/* === Right Column === */}
                    <div className="grid_6 prefix_2">

                        {/* Created On */}
                        <Label>สถานะ</Label>
                        <div className="grid_3 alpha">
                            <TextInput name="status_name_th"
                                disabled={true}
                                tabIndex="4" />
                        </div>
                        <div className="clear" />

                        {/* Created On */}
                        <Label>วันที่</Label>
                        <div className="grid_3 alpha">
                            <DateTimeInput name="created_on"
                                disabled
                                tabIndex="5" />
                        </div>
                        <div className="clear" />

                        {/* Document date */}
                        <Label>วันที่เอกสาร</Label>
                        <div className="grid_3 alpha">
                            <DateInput name="document_date"
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                                tabIndex="6" />
                        </div>
                        <div className="clear" />

                        {/* User Employee ID  */}
                        <Label>ผู้นำเข้า</Label>
                        <div className="grid_3 alpha">
                            <TextInput name="created_by_user_employee_id"
                                validate={validateUserEmployeeIDField}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                                searchable={checkBooleanForEdit === true ? true : toolbar.mode !== TOOLBAR_MODE.SEARCH} ariaControls="modalUserName"
                                tabIndex="7" />
                        </div>
                        <div className="clear" />

                        {/* Admin Employee ID  */}
                        <Label>ผู้สร้างเอกสาร</Label>
                        <div className="grid_3 alpha">
                            <TextInput name="created_by_admin_employee_id"
                                validate={validateAdminEmployeeIDField}
                                disabled={true} />
                        </div>
                        <div className="clear" />
                    </div>
                </div>
            </div>

            {/* PopUp ค้นหาเลขที่เอกสาร */}
            <PopupModalDocument
                documentTypeGroupID={DOCUMENT_TYPE_ID.EQUIPMENT_INSTALLATION}
                id="modalDocument" //For Open POPUP
                name="internal_document_id" //For setFieldValue 
            />

            {/* PopUp ค้นหาชื่อพนักงาน MODE ADD */}
            <PopupModalUsername />

            {/* PopUp ค้นหาสินทรัพย์ */}
            <PopupModalEquipmentNoChildren />
        </div>
    );
}

export default TopContent;