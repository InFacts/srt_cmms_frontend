import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';
import { v4 as uuidv4 } from 'uuid';

import TextInput from '../common/formik-text-input'
import DateTimeInput from '../common/formik-datetime-input'
import DateInput from '../common/formik-date-input'

import { useFormikContext, useField } from 'formik';

import PopupModalDocument from '../common/popup-modal-document'
import PopupModalInventory from '../common/popup-modal-inventory'
import PopupModalUsername from '../common/popup-modal-username'
import { TOOLBAR_MODE, TOOLBAR_ACTIONS, toModeAdd } from '../../redux/modules/toolbar.js';
import { getEmployeeIDFromUserID, fetchStepApprovalDocumentData, DOCUMENT_TYPE_ID } from '../../helper';

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
        list_uoms: [],
        at_source: []
      }
    );
  }
  return {
    internal_document_id: data.internal_document_id,
    created_by_user_employee_id: getEmployeeIDFromUserID(userFact, data.created_by_user_id) || '',
    created_by_admin_employee_id: getEmployeeIDFromUserID(userFact, data.created_by_admin_id) || '',
    created_on: data.created_on.split(".")[0],
    line_items: data.line_items,
    src_warehouse_id: data.src_warehouse_id,
    remark: data.remark,
    status_name_th: data.status_name,
  }
}

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

  return (
    <>
      <div className="grid_12">
        <div className="grid_2">
          <p className="top-text">เลขที่คลัง</p>
        </div>
        <div className="grid_3 pull_1">
          <div className="p-search-box cancel-margin">
            <input type="text" className="p-search-box__input cancel-default" 
            // value={this.props.inventory_id} onChange={(e) => this.props.onChangeInventoryId(e)}
             />
            <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalInventory" aria-controls="modalSrcInventory"></i></button>
          </div>
        </div>
        <div className="grid_3 float-right">
          <input type="text" className="cancel-default float-right"
          //  value={this.props.inventory_name}
            disabled="disabled"></input>
        </div>
        <div className="grid_2 float-right">
          <p className="top-text float-right">ชื่อคลัง</p>
        </div>
      </div>

      <div className="grid_12">
        <div className="grid_2">
          <p className="top-text">เลขที่สิ่งของ</p>
        </div>
        <div className="grid_3 pull_1">
          <div className="p-search-box cancel-margin">
            {/* <input type="text" className="p-search-box__input cancel-default" value={this.props.no_item} onChange={(e) => this.props.onChangeNoItem(e)} /> */}
            {/* <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPart" aria-controls="modalNoPart"></i></button> */}
          </div>
        </div>
      </div>

      <div className="grid_12">
        {/* <div className="grid_2">
              <p className="top-text">แขวง</p>
            </div>
            <div className="grid_3 pull_1">
              <div className="p-search-box cancel-margin">
                <input type="text" className="p-search-box__input cancel-default" value={this.props.districts} onChange={(e) => this.props.onChangeDistricts(e)} />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPart" aria-controls="modalDistricts"></i></button>
              </div>
            </div> */}
        <div className="grid_3 float-right">
          <select className="edit-select-top" onChange={(e) => this.props.onChangeYear(e)}>
            <option value="0"> none </option>
            {/* {this.props.year.map(function (year, index) {
              return (
                <option key={index} value={year.year_id}> {year.name} </option>
              )
            })} */}
          </select>
        </div>
        <div className="grid_2 float-right">
          <p className="top-text float-right">ปี</p>
        </div>
      </div>

      <div className="grid_12">
        {/* <div className="grid_2">
              <p className="top-text">ตอน</p>
            </div>
            <div className="grid_3 pull_1">
            <div className="p-search-box cancel-margin">
                <input type="text" className="p-search-box__input cancel-default" value={this.props.node} onChange={(e) => this.props.onChangeNode(e)} />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPart" aria-controls="modalNode"></i></button>
              </div>
            </div> */}
        <div className="grid_3 float-right">
          <select className="edit-select-top" onChange={(e) => this.props.onChangeMonth(e)}>
            <option value="0"> none </option>
            {/* {this.props.month.map(function (month, index) {
              return (
                <option key={index} value={month.month_id}> {month.name} </option>
              )
            })} */}
          </select>
        </div>
        <div className="grid_2 float-right">
          <p className="top-text float-right">เดือน</p>
        </div>
      </div>

      <div className="grid_12">
        {/* {
          this.props.inventory_id !== "" && this.props.month_id !== "0" && this.props.year_id !== "0" ? <button className="button-blue float-right grid_1 mt-3" type="button" onClick={(e) => this.props.onClickSearchS1(this.props.inventory_id, this.props.no_item, this.props.month_id, this.props.year_id)}>ค้นหา</button> : <button className="button-blue float-right grid_1 mt-3" type="button">ค้นหา</button>
        } */}
      </div>
      {/* PopUp ค้นหาเลขที่คลัง MODE ADD */}
      <PopupModalInventory
        id="modalInventory" //For Open POPUP
        name="src_warehouse_id"
      />
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