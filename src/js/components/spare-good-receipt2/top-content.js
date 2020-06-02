import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';


import FormInput from '../common/form-input'
import TextInput from '../common/formik-text-input'
import DateTimeInput from '../common/formik-datetime-input'
import DateInput from '../common/formik-date-input'

import { useFormikContext, useField } from 'formik';

import PopupModalDocument from '../common/popup-modal-document'
import PopupModalInventory from '../common/popup-modal-inventory'
import PopupModalUsername from '../common/popup-modal-username'
import { TOOLBAR_MODE, TOOLBAR_ACTIONS, toModeAdd } from '../../redux/modules/toolbar.js';
import {getEmployeeIDFromUserID} from '../common/helper';


const responseToFormState = (userFact, data) => {
  for (var i = data.line_items.length; i <= 9; i++) {
    data.line_items.push(
      {
        item_id: "",
        internal_item_id: "",
        description: "",
        quantity: "",
        uom_group_id: "",
        unit: "",
        per_unit_price: "",
        list_uoms: []
      }
    );
  }
  return {
    internal_document_id: data.internal_document_id,
    created_by_user_employee_id: getEmployeeIDFromUserID(userFact, data.created_by_user_id) || '',
    created_by_admin_employee_id: getEmployeeIDFromUserID(userFact, data.created_by_admin_id) || '',
    created_on: data.created_on,
    line_items: data.line_items,
    dest_warehouse_id: data.dest_warehouse_id,
    remark: data.remark,
    status_name_th: data.status_name,
    po_id: data.po_id,
  }
}




const TopContent = (props) => {
  const {values, errors,setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm} = useFormikContext();

  // Fill Default Forms
  useEffect(() => {
    if(props.toolbar.mode === TOOLBAR_MODE.ADD){
      setFieldValue("created_by_admin_employee_id", getEmployeeIDFromUserID(props.fact.users, props.decoded_token.id));
      setFieldValue("status_name_th","ยังไม่ได้รับการบันทึก");
      setFieldValue("created_on", new Date().toISOString().slice(0, 16));
      // validateField("created_by_admin_employee_id");
    }
  }, [props.decoded_token, props.fact.users, props.toolbar.mode])

  const validateInternalDocumentIDField = internal_document_id => new Promise(resolve => {
    // Internal Document ID
        //  {DocumentTypeGroupAbbreviation}-{WH Abbreviation}-{Year}-{Auto Increment ID}
        //  ie. GR-PYO-2563/0001
    // console.log("I am validating doucment id")
    let internalDocumentIDRegex = /^(GP|GT|GR|GU|GI|IT|GX|GF|PC|IA|SR|SS)-[A-Z]{3}-\d{4}\/\d{4}$/g
    // let draftInternalDocumentIDRegex= /^heh\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b$/g
    let draftInternalDocumentIDRegex = /^heh/g
    if (!internal_document_id) {
        return resolve('Required');
    }else if (!internalDocumentIDRegex.test(internal_document_id) && !draftInternalDocumentIDRegex.test(internal_document_id)){ //
        return resolve('Invalid Document ID Format\nBe sure to use the format ie. GR-PYO-2563/0001')
    }
    // if (!internal_document_id) {
    //   return resolve(); // Resolve doesn't return
    // }
    let error;
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/internal_document_id/${internal_document_id}`;
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
      .then((res) => {
        if (res.data.internal_document_id === internal_document_id) { // If input document ID exists
          if (props.toolbar.mode === TOOLBAR_MODE.SEARCH && !props.toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]) { //If Mode Search, needs to set value
            console.log(" I AM STILL IN MODE SEARCH AND SET VALUE")
            setValues({ ...values, ...responseToFormState(props.fact.users, res.data) }, false); //Setvalues and don't validate
            validateField("dest_warehouse_id");
            // validateField("internal_document_id");
            return resolve(null);
          } else { //If Mode add, need to error duplicate Document ID
            console.log("I AM DUPLICATE")
            error = 'Duplicate Document ID';
          }
        } else { // If input Document ID doesn't exists
          if (props.toolbar.mode === TOOLBAR_MODE.SEARCH) { //If Mode Search, invalid Document ID
            console.log("I KNOW IT'sINVALID")
            error = 'Invalid Document ID';
          } else {//If mode add, ok
          }
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

  const validateEmployeeIDField = (fieldName, employee_id) => {
    employee_id = employee_id.split('\\')[0]; // Escape Character USERNAME CANT HAVE ESCAPE CHARACTER!
    let users = props.fact.users.items;
    let user = users.find(user => user.employee_id === employee_id); // Returns undefined if not found
    if(user){
      setFieldValue(fieldName, `${employee_id}\\${user.firstname_th} ${user.lastname_th}`, false);
      return;
    }else{
      return 'Invalid Employee ID';
    }
  };

  const validateUserEmployeeIDField = (...args) => validateEmployeeIDField("created_by_user_employee_id", ...args);
  const validateAdminEmployeeIDField = (...args) => validateEmployeeIDField("created_by_admin_employee_id", ...args);
  
  const validateWarehouseIDField = (fieldName, warehouse_id) => {
    warehouse_id = `${warehouse_id}`.split('\\')[0]; // Escape Character WAREHOUSE_ID CANT HAVE ESCAPE CHARACTER!
    let warehouses = props.fact.warehouses.items;
    let warehouse = warehouses.find(warehouse => `${warehouse.warehouse_id}` === `${warehouse_id}`); // Returns undefined if not found
    if(warehouse){
      setFieldValue(fieldName, `${warehouse_id}\\[${warehouse.abbreviation}] ${warehouse.name}`, false);
      return;
    }else{
      return 'Invalid Warehouse ID';
    }
  }
  const validateDestWarehouseIDField = (...args) => validateWarehouseIDField("dest_warehouse_id", ...args);

  return (
    <div id="blackground-white">
      <div className="container_12 clearfix">
        <section className="container_12 ">
          <h4 className="head-title">นำอะไหล่เข้าโดยมีใบสั่งซื้อ</h4>
          <div className="container_12">

            {/* Document ID */}
            <div className="grid_2">
              <p className="top-text">เลขที่เอกสาร</p>
            </div>
            <div className="grid_3 pull_1">
              <TextInput name='internal_document_id' validate={validateInternalDocumentIDField}
                searchable={props.toolbar.mode === TOOLBAR_MODE.SEARCH} ariaControls="modalDocument" tabIndex="1" />
            </div>

            {/* Document Status  */}
            <div className="grid_3 float-right">
              <TextInput name="status_name_th" disabled />
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">สถานะ</p>
            </div>
          </div>

          <div className="container_12">
            {/* Created by User */}
            <div className="grid_2">
              <p className="top-text">ผู้นำเข้า</p>
            </div>
            <div className="grid_3 pull_1">
              {/* Q: If this is user name in thai, how do we get ID? */}
              <TextInput name="created_by_user_employee_id" validate={validateUserEmployeeIDField} 
                disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH}
                searchable={props.toolbar.mode !== TOOLBAR_MODE.SEARCH} ariaControls="modalUserName" tabIndex="2" />
            </div>

            {/* Created On */}
            <div className="grid_3 float-right">
              <DateTimeInput name="created_on" /*validate={validateCreateOnField */
                disabled />
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">วันที่</p>
            </div>
          </div>

          <div className="container_12">
            {/* Admin Name */}
            <div className="grid_2">
              <p className="top-text">ผู้สร้างเอกสาร</p>
            </div>
            <div className="grid_3 pull_1">
              <TextInput name="created_by_admin_employee_id" validate={validateAdminEmployeeIDField} disabled />
            </div>

            {/* Document date */}
            <div className="grid_3 float-right">
              <DateInput name="document_date" 
                disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="3"/>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">วันที่เอกสาร</p>
            </div>

          </div>

          {/* PO ID */}
          <div className="container_12">
            <div className="grid_2">
              <p className="top-text">เลขที่ใบสั่งซื้อ/เลขที่เอกสารอ้างอิง</p>
            </div>
            <div className="grid_3 pull_0">
              <TextInput name="po_id" disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="4"/>
            </div>

            {/* Dest Warehouse ID */}
            <div className="grid_3 float-right">
              <TextInput name="dest_warehouse_id" validate={validateDestWarehouseIDField}
                disabled={props.actionMode === TOOLBAR_MODE.SEARCH}
                searchable={props.actionMode !== TOOLBAR_MODE.SEARCH} ariaControls="modalInventory" tabIndex="5"/>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">เลขที่คลัง</p>
            </div>
          </div>
        </section>
      </div>

      {/* PopUp ค้นหาเลขที่เอกสาร */}
      <PopupModalDocument />

      {/* PopUp ค้นหาเลขที่คลัง MODE ADD */}
      <PopupModalInventory />

      {/* PopUp ค้นหาชื่อพนักงาน MODE ADD */}
      <PopupModalUsername />  

    </div>
  )

}
const mapStateToProps = (state) => ({
  fact: state.api.fact,
  toolbar: state.toolbar,
  decoded_token: state.token.decoded_token,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TopContent);
