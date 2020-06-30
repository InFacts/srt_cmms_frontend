import React, { useEffect } from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';

import FormInput from '../common/form-input'
import TextInput from '../common/formik-text-input'

import PopupModalInventory from '../common/popup-modal-inventory'

import { useFormikContext, useField } from 'formik';

import { TOOLBAR_MODE, TOOLBAR_ACTIONS, toModeAdd } from '../../redux/modules/toolbar.js';
import { getNumberFromEscapedString, fetchGoodsOnhandDataForItemmasterData, DOCUMENT_TYPE_ID, getDocumentbyInternalDocumentID } from '../../helper';

import { FACTS } from '../../redux/modules/api/fact.js';

import { fetchPositionPermissionData, changeTheam } from '../../helper.js'

import useFetchPernissionUser from '../../hooks/fetch-permission-user';
const TopContent = (props) => {
  const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
  const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
  const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
  const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);
  const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);

  // Fetch permissiton
  useFetchPernissionUser();

  const validateWarehouseIDField = (fieldName, warehouse_id) => {
    if (warehouse_id === values.warehouse_id) {
      return;
    }

    const warehouseIDRegex = /^[0-9]{3}$/g;
    if (!warehouse_id) {
      setFieldValue("warehouse_id", '', false);
        setFieldValue("name", '', false);
        setFieldValue("abbreviation", '', false);
        setFieldValue("active", '', false);
        setFieldValue("location", '', false);
        setFieldValue("warehouse_type_id", '', false);
        setFieldValue("use_central", '', false);
      return 'Required';
    } else if (!warehouseIDRegex.test(warehouse_id)) {
      return 'Invalid Warehouse Format Be sure to use the format ie. 100';
    }

    // console.log("I am validating warehouse id")
    if ((toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.NONE || toolbar.mode === TOOLBAR_MODE.NONE_HOME)
      && !toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]) {
      warehouse_id = `${warehouse_id}`.split('\\')[0]; // Escape Character WAREHOUSE_ID CANT HAVE ESCAPE CHARACTER!
      let warehouses = props.fact.warehouses.items;
      let warehouse = warehouses.find(warehouse => `${warehouse.warehouse_id}` === `${warehouse_id}`); // Returns undefined if not found
      console.log("warehouse", warehouse)
      if (warehouse) {
        setFieldValue("warehouse_id", warehouse_id, false);
        setFieldValue("name", warehouse.name, false);
        setFieldValue("abbreviation", warehouse.abbreviation, false);
        setFieldValue("active", warehouse.active.data[0], false);
        setFieldValue("location", warehouse.location, false);
        setFieldValue("warehouse_type_id", warehouse.warehouse_type_id, false);
        setFieldValue("use_central", warehouse.use_central.data[0], false);

        // IF Check user If User is Admin -> return true Else -> return false
        if (values.line_position_permission[0].module_admin === true) { //{/* TODO USER_ID FOR ADMIN */}
          console.log(" YES I AM ADMIN ")
          setFieldValue("modeEdit", true, false);
        } else {
          console.log(" NO I NOT ADMIN ")
          setFieldValue("modeEdit", false, false);
        }
        return;
      } else {
        return 'Invalid Warehouse ID';
      }
    } else {//If mode add, ok
      console.log("document ID doesn't exist but I am in mode add")
      if (warehouse_id) {
        let warehouses = props.fact.warehouses.items;
        let warehouse = warehouses.find(warehouse => `${warehouse.warehouse_id}` === `${warehouse_id}`); // Returns undefined if
        if (!warehouse) { // Check Dulplication
          setFieldValue("warehouse_id", warehouse_id, false);
        } else return 'Warehouse Duplication'
      } else return 'Required';
    }
  }
  const validateSrcWarehouseIDField = (...args) => validateWarehouseIDField("warehouse_id", ...args);

  const validateWarehouseField = (fieldName, name) => {
    if (!name) {
      return 'Required'
    }
    return;
  };
  const validateNameWarehouseIDField = (...args) => validateWarehouseField("name", ...args);
  const validateAbbreviationWarehouseIDField = (...args) => validateWarehouseField("abbreviation", ...args);

  return (
    <div id={changeTheam() === true ? "" : "blackground-white"}>
      <div className="container_12 clearfix">
        <section className="container_12 ">
          <h4 className="head-title">คลัง - Setup</h4>

          <div id={changeTheam() === true ? "blackground-white" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray", height: "100px", paddingTop: "10px" } : {}} >

          <div className="container_12">
            <div className="grid_1"><p className="top-text">เลขที่คลัง</p></div>
            <div className="grid_4">
              <TextInput name="warehouse_id"
                validate={validateSrcWarehouseIDField}
                searchable={props.toolbar.mode === TOOLBAR_MODE.SEARCH} ariaControls="modalInventory" tabIndex="1" />
            </div>

            <div className="grid_4 float-right">
              <TextInput name="name"
                validate={validateNameWarehouseIDField}
                disabled={values.modeEdit ? false : props.toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="2" />
            </div>
            <div className="grid_1 float-right"><p className="top-text float-right">ชื่อคลัง</p></div>
          </div>


          <div className="container_12">
            <div className="grid_4 float-right">
              <TextInput name="abbreviation"
                validate={validateAbbreviationWarehouseIDField}
                disabled={values.modeEdit ? false : props.toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="3" />
            </div>
            <div className="grid_1 float-right"><p className="top-text float-right">ชื่อย่อคลัง</p></div>
          </div>

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