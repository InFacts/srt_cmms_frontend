import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import { v4 as uuidv4 } from 'uuid';

import FormInput from '../common/form-input'
import TextInput from '../common/formik-text-input'
import SelectNoChildrenInput from '../common/formik-select-no-children';

import PopupModalInventory from '../common/popup-modal-inventory'

import { useFormikContext, useField } from 'formik';

import { TOOLBAR_MODE, TOOLBAR_ACTIONS, toModeAdd } from '../../redux/modules/toolbar.js';
import { getNumberFromEscapedString, fetchGoodsOnhandDataForItemmasterData, DOCUMENT_TYPE_ID, getDocumentbyInternalDocumentID } from '../../helper';

import { FACTS } from '../../redux/modules/api/fact.js';

const TopContent = (props) => {
  const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm, resetForm } = useFormikContext();

  const validateWarehouseIDField = (fieldName, warehouse_id) => {
    // console.log("I am validating warehouse id")
    warehouse_id = `${warehouse_id}`.split('\\')[0]; // Escape Character WAREHOUSE_ID CANT HAVE ESCAPE CHARACTER!
    let warehouses = props.fact.warehouses.items;
    let warehouse = warehouses.find(warehouse => `${warehouse.warehouse_id}` === `${warehouse_id}`); // Returns undefined if not found
    console.log(warehouse, "<<warehouse")
    if (warehouse) {
      setFieldValue("warehouse_id", warehouse_id, false);
      setFieldValue("name", warehouse.name, false);
      setFieldValue("abbreviation", warehouse.abbreviation, false);
      setFieldValue("active", warehouse.active.data[0], false);
      setFieldValue("location", warehouse.location, false);
      setFieldValue("warehouse_type_id", warehouse.warehouse_type_id, false);
      setFieldValue("use_central", warehouse.use_central.data[0], false);
      return;
    } else {
      return 'Invalid Warehouse ID';
    }
  }
  const validateSrcWarehouseIDField = (...args) => validateWarehouseIDField("warehouse_id", ...args);

  return (
    <div id="blackground-white">
      <div className="container_12 clearfix">
        <section className="container_12 ">
          <h4 className="head-title">คลัง - Setup</h4>

          <div className="container_12">
            <div className="grid_1"><p className="top-text">เลขที่คลัง</p></div>
            <div className="grid_4">
            <TextInput name="warehouse_id" 
                validate={validateSrcWarehouseIDField}
                searchable={props.toolbar.mode === TOOLBAR_MODE.SEARCH} ariaControls="modalInventory" tabIndex="1" />
            </div>

            <div className="grid_4 float-right">
            <TextInput name="name" 
                // validate={validateSrcWarehouseIDField}
                disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH}
                searchable={props.toolbar.mode === TOOLBAR_MODE.SEARCH} ariaControls="modalInventory" tabIndex="1" />
            </div>
            <div className="grid_1 float-right"><p className="top-text float-right">ชื่อคลัง</p></div>
          </div>


          <div className="container_12">
            <div className="grid_4 float-right">
            <TextInput name="abbreviation" 
                // validate={validateSrcWarehouseIDField}
                disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH}
                searchable={props.toolbar.mode === TOOLBAR_MODE.SEARCH} ariaControls="modalInventory" tabIndex="1" />
            </div>
            <div className="grid_1 float-right"><p className="top-text float-right">ชื่อย่อคลัง</p></div>
          </div>
        </section>

      {/* PopUp ค้นหาเลขที่คลังต้นทาง MODE ADD */}
      <PopupModalInventory
        id="modalInventory" //For Open POPUP
        name="warehouse_id"
      />
      </div>
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