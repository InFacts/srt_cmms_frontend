import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux'

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import PopupModalDocument from '../common/popup-modal-document'
import PopupModalDocumentGoodsFix from '../common/popup-modal-document'
import PopupModalUsername from '../common/popup-modal-username'

import TextInput from '../common/formik-text-input'
import DateTimeInput from '../common/formik-datetime-input'
import DateInput from '../common/formik-date-input'
import { TOOLBAR_MODE, TOOLBAR_ACTIONS, toModeAdd } from '../../redux/modules/toolbar.js';
import { FACTS } from '../../redux/modules/api/fact';
import Label from '../common/form-label'
import {
    getEmployeeIDFromUserID, fetchStepApprovalDocumentData, DOCUMENT_TYPE_ID, validateEmployeeIDField, validateWarehouseIDField, validateInternalDocumentIDFieldHelper,
    checkBooleanForEditHelper
} from '../../helper';
import useFillDefaultsOnModeAdd from '../../hooks/fill-defaults-on-mode-add'

import { useFormikContext, useField } from 'formik';

const TopContent = (props) => {
    const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
    const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
    const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);
    const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);

    const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();

    // Fill Default Forms
    useFillDefaultsOnModeAdd();
    const validateInternalDocumentIDField = (...args) => validateInternalDocumentIDFieldHelper(checkBooleanForEdit, DOCUMENT_TYPE_ID.MAINTENANT_ITEM, toolbar, footer, fact, values, setValues, setFieldValue, validateField, ...args);

    const validateUserEmployeeIDField = (...args) => validateEmployeeIDField("created_by_user_employee_id", fact, setFieldValue, ...args);
    const validateAdminEmployeeIDField = (...args) => validateEmployeeIDField("created_by_admin_employee_id", fact, setFieldValue, ...args);

    // For Search GOODs FIX
    const setLineItem = (data) => {
        var line_items = []
        for (var i = 0; i < data.line_items.length; i++) {
            line_items.push(
                {
                    item_id: data.line_items[i].item_id,
                    internal_item_id: data.line_items[i].internal_item_id,
                    description: data.line_items[i].description,
                    quantity_damaged: data.line_items[i].quantity,   //ของเสีย
                    quantity_used: 0,
                    quantity_salvage: 0,
                    uom_group_id: data.line_items[i].uom_group_id,
                    unit: data.line_items[i].unit,
                    list_uoms: data.line_items[i].list_uoms
                }
            );
        }

        for (var i = data.line_items.length; i <= 10 - data.line_items.length; i++) {
            line_items.push({
                ...line_items,
                line_number: i
            });
        }
        return line_items;
    }

    const validateInternalDocumentGoodFixID = refer_to_document_internal_id => new Promise(resolve => {
        if (values.refer_to_document_internal_id === refer_to_document_internal_id) {
            return;
        }
        // Internal Document ID
        //  {DocumentTypeGroupAbbreviation}-{WH Abbreviation}-{Year}-{Auto Increment ID}
        //  ie. GR-PYO-2563/0001
        // console.log("I am validating document id")
        let internalDocumentIDRegex = /^(GP|GT|GR|GU|GI|IT|GX|GF|PC|IA|SR|SS)-[A-Z]{3}-\d{4}\/\d{4}$/g
        let draftInternalDocumentIDRegex = /^draft-\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b$/g
        // let draftInternalDocumentIDRegex = /^heh/g
        if (!refer_to_document_internal_id) {
            return resolve('Required');
        } else if (!internalDocumentIDRegex.test(refer_to_document_internal_id) && !draftInternalDocumentIDRegex.test(refer_to_document_internal_id)) { //
            return resolve('Invalid Document ID Format\nBe sure to use the format ie. S1646-PYO-2563/0001')
        }
        let error;
        const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/internal_document_id/${encodeURIComponent(refer_to_document_internal_id)}`;
        axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
            .then((res) => {
                console.log("res", res)
                if (res.data.internal_document_id === refer_to_document_internal_id) { // If input document ID exists
                    setFieldValue("line_items", setLineItem(res.data), false)
                    setFieldValue("refer_to_document_id", res.data.document_id, false)
                    return resolve(null);
                } else { // If input Document ID doesn't exists
                    error = 'Invalid Document ID';
                }
            })
            .catch((err) => { // 404 NOT FOUND  If input Document ID doesn't exists
                if (props.toolbar.mode === TOOLBAR_MODE.SEARCH) { //If Mode Search, invalid Document ID
                    error = 'Invalid Document ID';
                }//If mode add, ok
            })
            .finally(() => {
                return resolve(error)
            });
    });

    const checkBooleanForEdit = checkBooleanForEditHelper(values, decoded_token, fact)
    return (
        <div id="blackground-white">
            <div className="container_12 clearfix" style={{ marginTop: "55px" }}>
                {/* Section Title */}
                <h4 className="head-title">ดำเนินการซ่อมบำรุง</h4>

                {/* === Left Column === */}
                <div className="grid_6" style={{ paddingLeft: "10px" }}>

                    {/* Document ID */}
                    <Label>เลขที่เอกสาร</Label>
                    <div className="grid_3 alpha">
                        <TextInput name='internal_document_id'
                            validate={validateInternalDocumentIDField}
                            searchable={toolbar.mode === TOOLBAR_MODE.SEARCH}
                            ariaControls="modalDocument"
                            tabIndex="1" />
                    </div>
                    <div className="clear" />

                    {/* User Employee ID  */}
                    <Label>ผู้ดำเนินเรื่อง</Label>
                    <div className="grid_3 alpha">
                        <TextInput name="created_by_user_employee_id"
                            validate={validateUserEmployeeIDField}
                            disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                            searchable={toolbar.mode !== TOOLBAR_MODE.SEARCH} ariaControls="modalUserName"
                            tabIndex="2" />
                    </div>
                    <div className="clear" />

                    {/* Admin Employee ID  */}
                    <Label>ผู้สร้างเอกสาร</Label>
                    <div className="grid_3 alpha">
                        <TextInput name="created_by_admin_employee_id"
                            validate={validateAdminEmployeeIDField}
                            disabled
                            tabIndex="3" />
                    </div>
                    <div className="clear" />

                    {/* Admin Employee ID  */}
                    <Label>เลขที่เอกสารอ้างอิง</Label>
                    <div className="grid_3 alpha">
                        <TextInput name='refer_to_document_internal_id'
                            validate={validateInternalDocumentGoodFixID}
                            disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                            searchable={toolbar.mode === TOOLBAR_MODE.ADD}
                            ariaControls="modalDocument2"
                            tabIndex="1" />
                    </div>
                    <div className="clear" />
                </div>



                {/* === Right Column === */}
                <div className="grid_6 prefix_2">

                    {/* Document Status  */}
                    <Label>สถานะ</Label>
                    <div className="grid_3 alpha">
                        <TextInput name="status_name_th"
                            disabled
                            tabIndex="5" />
                    </div>
                    <div className="clear" />

                    {/* Created On */}
                    <Label>วันที่</Label>
                    <div className="grid_3 alpha">
                        <DateTimeInput name="created_on"
                            disabled
                            tabIndex="6" />
                    </div>
                    <div className="clear" />

                    {/* Document date */}
                    <Label>วันที่เอกสาร</Label>
                    <div className="grid_3 alpha">
                        <DateInput name="document_date"
                            disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                            tabIndex="7" />
                    </div>
                    <div className="clear" />
                </div>
            </div>
            {/* PopUp ค้นหาเลขที่เอกสาร */}
            <PopupModalDocument
                documentTypeGroupID={DOCUMENT_TYPE_ID.MAINTENANT_ITEM}
                id="modalDocument" //For Open POPUP
                name="internal_document_id" //For setFieldValue 
            />
            {/* PopUp ค้นหาเลขที่เอกสารอ้างอิงส่งซ่อม */}
            <PopupModalDocumentGoodsFix
                documentTypeGroupID={DOCUMENT_TYPE_ID.GOODS_FIX}
                id="modalDocument2" //For Open POPUP
                name="refer_to_document_internal_id" //For setFieldValue 
            />

            {/* PopUp ค้นหาชื่อพนักงาน MODE ADD */}
            <PopupModalUsername />
        </div>
    );
}

export default TopContent;