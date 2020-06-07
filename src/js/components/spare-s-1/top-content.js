import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';
import { v4 as uuidv4 } from 'uuid';

import TextInput from '../common/formik-text-input'
import SelectNoChildrenInput from '../common/formik-select-no-children';

import { useFormikContext, useField } from 'formik';

import PopupModalInventory from '../common/popup-modal-inventory'
import PopupModalNoPartNoChildren from '../common/popup-modal-nopart-no-children'

import { TOOLBAR_MODE, TOOLBAR_ACTIONS, toModeAdd } from '../../redux/modules/toolbar.js';
import { getEmployeeIDFromUserID, fetchStepApprovalDocumentData, DOCUMENT_TYPE_ID } from '../../helper';

// const responseToFormState = (userFact, data) => {
//   for (var i = data.line_items.length; i <= 9; i++) {
//     data.line_items.push(
//       {
//         item_id: "",
//         internal_item_id: "",
//         description: "",
//         quantity: "",
//         uom_group_id: "",
//         unit: "",
//         per_unit_price: "",
//         list_uoms: [],
//         at_source: []
//       }
//     );
//   }
//   return {
//     internal_document_id: data.internal_document_id,
//     created_by_user_employee_id: getEmployeeIDFromUserID(userFact, data.created_by_user_id) || '',
//     created_by_admin_employee_id: getEmployeeIDFromUserID(userFact, data.created_by_admin_id) || '',
//     created_on: data.created_on.split(".")[0],
//     line_items: data.line_items,
//     src_warehouse_id: data.src_warehouse_id,
//     remark: data.remark,
//     status_name_th: data.status_name,
//   }
// }

const TopContent = (props) => {
  const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();

  const validateWarehouseIDField = (fieldName, warehouse_id) => {
    // console.log("I am validating warehouse id")
    warehouse_id = `${warehouse_id}`.split('\\')[0]; // Escape Character WAREHOUSE_ID CANT HAVE ESCAPE CHARACTER!
    let warehouses = props.fact.warehouses.items;
    let warehouse = warehouses.find(warehouse => `${warehouse.warehouse_id}` === `${warehouse_id}`); // Returns undefined if not found
    if (warehouse) {
      setFieldValue(fieldName, `${warehouse_id}\\[${warehouse.abbreviation}] ${warehouse.name}`, false);
      return;
    } else {
      return 'Invalid Warehouse ID';
    }
  }
  const validateSrcWarehouseIDField = (...args) => validateWarehouseIDField("src_warehouse_id", ...args);

  const validateInternalItemIDField = internal_item_id => {
    let items = props.fact.items.items;
    let item = items.find(item => `${item.internal_item_id}` === `${internal_item_id}`); // Returns undefined if not found
    if (item) {
      // setValues({ ...values, ...responseToFormState(item) }, false); //Setvalues and don't validate
      setFieldValue("internal_item_id", internal_item_id, false);
      return;
    } else {
      return 'Invalid Number ID';
    }
  };

  return (
    <>
      <div id="blackground-white">
        <div className="container_12 clearfix">
          <section className="container_12 ">
            <h4 className="head-title">รายงาน ส.1</h4>

            <div className="container_12">
              <div className="grid_2">
                <p className="top-text">เลขที่คลัง</p>
              </div>
              <div className="grid_3 pull_1">
                <TextInput name="src_warehouse_id" validate={validateSrcWarehouseIDField}
                  searchable={props.actionMode !== TOOLBAR_MODE.SEARCH} ariaControls="modalInventory" tabIndex="5" />
              </div>

              {/* drop dawn year */}
              <div className="grid_3 float-right">
                <SelectNoChildrenInput name="year_id">
                  <option value=''></option>
                  {values.year.map(function (year) {
                    return (
                      <option key={year.year_id} value={year.year_id}> {year.year_id} </option>
                    )
                  })}
                </SelectNoChildrenInput>
              </div>
              <div className="grid_2 float-right">
                <p className="top-text float-right">ปี</p>
              </div>
            </div>

            <div className="container_12">
              <div className="grid_2">
                <p className="top-text">เลขที่สิ่งของ</p>
              </div>
              <div className="grid_3 pull_1">
                <TextInput name='internal_item_id'
                  validate={validateInternalItemIDField}
                  searchable={props.toolbar.mode === TOOLBAR_MODE.SEARCH} ariaControls="modalNoPart" tabIndex="1" />
              </div>

              {/* Drop Dawn month */}
              <div className="grid_3 float-right">
                <SelectNoChildrenInput name="mouth_id" >
                  <option value=''></option>
                  {values.mouth.map(function (mouth) {
                    return (
                      <option key={mouth.id} value={mouth.id}> {mouth.mouth} </option>
                    )
                  })}
                </SelectNoChildrenInput>
              </div>
              <div className="grid_2 float-right">
                <p className="top-text float-right">เดือน</p>
              </div>
            </div>

            <div className="container_12 mt-3">
              <div className="grid_1 float-right">
                <button type="button" className="button-blue">ค้นหา</button>
              </div>
            </div>

            {/* PopUp ค้นหาเลขที่คลัง MODE ADD */}
            <PopupModalInventory
              id="modalInventory" //For Open POPUP
              name="src_warehouse_id"
            />
            {/* PopUp ค้นหาอะไหล่ */}
            <PopupModalNoPartNoChildren />
          </section>
        </div>
      </div>
    </>

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