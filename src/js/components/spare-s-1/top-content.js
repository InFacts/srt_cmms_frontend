import React, { useEffect } from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux'

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import TextInput from '../common/formik-text-input'
import SelectNoChildrenInput from '../common/formik-select-no-children';

import { useFormikContext } from 'formik';

import PopupModalInventory from '../common/popup-modal-inventory'

import { TOOLBAR_MODE } from '../../redux/modules/toolbar.js';
import { getNumberFromEscapedString, validatedataDocumentField } from '../../helper';
import { FACTS } from '../../redux/modules/api/fact.js';

import { changeTheam } from '../../helper.js'
const TopContent = (props) => {
  const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
  const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);
  const { values, setFieldValue, validateField, validateForm, setTouched, setErrors } = useFormikContext();

  useEffect(() => {
    validateField("src_warehouse_id")
    searchGoodsOnHand();
  }, [decoded_token.has_position, fact.warehouses.items])

  const validateWarehouseIDField = (fieldName, warehouse_id) => {
    console.log("I am validating warehouse id",fieldName, warehouse_id)
    warehouse_id = `${warehouse_id}`.split('\\')[0]; // Escape Character WAREHOUSE_ID CANT HAVE ESCAPE CHARACTER!
    let warehouses = fact.warehouses.items;
    // console.log("warehouses", warehouses)
    let warehouse = warehouses.find(warehouse => `${warehouse.warehouse_id}` === `${warehouse_id}`); // Returns undefined if not found
    // console.log("warehouse1", warehouse)
    if (warehouse) {
      setFieldValue(fieldName, `${warehouse_id}\\[${warehouse.abbreviation}] ${warehouse.name}`, false);
      setFieldValue("warehouse_type_id", warehouse.warehouse_type_id, false);
      return;
    } else {
      return 'Invalid Warehouse ID';
    }
  }
  const validateSrcWarehouseIDField = (...args) => validateWarehouseIDField("src_warehouse_id", ...args);

  // const validateInternalDocumentIDField = (...args) => validatedataDocumentField("internal_item_id", setFieldValue, ...args)
  const validateYearIDField = (...args) => validatedataDocumentField("year_id", setFieldValue, ...args)
  const validateMouthIDField = (...args) => validatedataDocumentField("mouth_id", setFieldValue, ...args)
  const validateInternalDocumentStatusIDField = (...args) => validatedataDocumentField("item_status_id", setFieldValue, ...args)

  let error;
  function isEmpty1(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }
  const isObject = (obj) =>
    obj !== null && typeof obj === 'object';

  function setNestedObjectValues(
    object,
    value,
    visited = new WeakMap(),
    response = {}
  ) {
    for (let k of Object.keys(object)) {
      const val = object[k];
      if (isObject(val)) {
        if (!visited.get(val)) {
          visited.set(val, true);
          // In order to keep array values consistent for both dot path  and
          // bracket syntax, we need to check if this is an array so that
          // this will output  { friends: [true] } and not { friends: { "0": true } }
          response[k] = Array.isArray(val) ? [] : {};
          setNestedObjectValues(val, value, visited, response[k]);
        }
      } else {
        response[k] = value;
      }
    }

    return response;
  }

  const searchGoodsOnHand = () => new Promise(resolve => {
    validateForm()
      .then((err) => {
        // console.log("THIS IS ErR I GET ", err, " i dont think it is touched ", touched)
        setTouched(setNestedObjectValues(values, true))
        setErrors(err);
        if (isEmpty1(err)) {
          // check ว่าเดือน ปี ที่เข้ามาเป็นของ ปัจจุบันหรือไหม
          var new_date = new Date();
          var year_now = new_date.getFullYear();
          var mouth_now = new_date.getMonth() + 1;
          var start_date = values.year_id - 543 + "-" + values.mouth_id + "-1";
          var end_date
          if (values.year_id - 543 === year_now && parseInt(values.mouth_id) === mouth_now) {
            if (values.mouth_id === "12") {
              end_date = values.year_id - 543 + 1 + "-1-1";
              console.log(">>>start_date", start_date, "end_date", end_date)
            }
            else {
              end_date = values.year_id - 543 + "-" + `${parseInt(values.mouth_id) + 1}` + "-1";
              console.log("start_date", start_date, "end_date", end_date)
            }
            const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/statistic/goods-monthly-summary/plus?warehouse_id=${getNumberFromEscapedString(values.src_warehouse_id)}&start_date=${start_date}&end_date=${end_date}&item_status_id=${values.item_status_id}&internal_item_id=${values.internal_item_id}&page_size=10000`; //&page_size=10000
            axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
              .then((res) => {
                console.log("res", res)
                setFieldValue("line_items", res.data.results, false);
                setFieldValue("start_date", start_date, false);
                setFieldValue("end_date", end_date, false);
              })
              .catch((err) => { // 404 NOT FOUND  If input Document ID doesn't exists
                if (props.toolbar.mode === TOOLBAR_MODE.SEARCH) { //If Mode Search, invalid Document ID
                  console.log("err>>>", err.response)
                  error = 'Invalid Document ID';
                }//If mode add, ok
              })
              .finally(() => {
                return resolve(error)
              });
          }
          else {
            if (values.mouth_id === "12") {
              end_date = values.year_id - 543 + 1 + "-1-1";
              console.log(">>>start_date", start_date, "end_date", end_date)
            }
            else {
              end_date = values.year_id - 543 + "-" + `${parseInt(values.mouth_id) + 1}` + "-1";
              console.log("start_date", start_date, "end_date", end_date)
            }
            const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/statistic/goods-monthly-summary/plus?warehouse_id=${getNumberFromEscapedString(values.src_warehouse_id)}&start_date=${start_date}&end_date=${end_date}&item_status_id=${values.item_status_id}&internal_item_id=${values.internal_item_id}&page_size=10000`; //&page_size=10000
            axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
              .then((res) => {
                console.log("res", res)
                setFieldValue("line_items", res.data.results, false);
                setFieldValue("start_date", start_date, false);
                setFieldValue("end_date", end_date, false);
              })
              .catch((err) => { // 404 NOT FOUND  If input Document ID doesn't exists
                if (props.toolbar.mode === TOOLBAR_MODE.SEARCH) { //If Mode Search, invalid Document ID
                  error = 'Invalid Document ID';
                }//If mode add, ok
              })
              .finally(() => {
                return resolve(error)
              });
          }
        }
      })
  });
  
  useEffect(() => {
    let line_item_shows = [];
    console.log("line_item", values.line_items)
    values.line_items.map((line_item) => {
      line_item_shows.push({
        "item_status_id": line_item.item_status_id,
        "warehouse_name": line_item.warehouse_name,
        "item_id": line_item.item_id,
        "internal_item_id": line_item.internal_item_id,
        "item_description": line_item.item_description,
        "uom_name": line_item.uom_name,
        "item_status_description_th": line_item.item_status_description_th,
        "quantity": line_item.end_unit_count.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
        "total": line_item.end_total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
        "per_unit_price": line_item.end_state_in_total_price / line_item.current_ending_unit_count ? (line_item.end_state_in_total_price / line_item.current_ending_unit_count).toFixed(4).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "0.00",
        // "lot_fifo": line_item.pricing.fifo.length > 0 && rawLotFromQty( line_item.pricing.fifo, line_item.current_unit_count - line_item.committed_unit_count )
      })
    })
    setFieldValue("checkClick", false, false)
    setFieldValue("line_item_shows", line_item_shows, false)
  }, [values.line_items, values.checkClick])

  return (
    <>
      <div id={changeTheam() === true ? "" : "blackground-white"}>
        <div className="container_12 clearfix">
          <section className="container_12 ">
            <h4 className="head-title">รายงาน ส.1</h4>

            <div id={changeTheam() === true ? "blackground-white" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray", height: "170px", paddingTop: "10px" } : {}} >

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
                  <SelectNoChildrenInput name="year_id" validate={validateYearIDField} cssStyle={{ left: "-160px", top: "10px" }}>
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
                    // validate={validateInternalDocumentIDField}
                    // searchable={props.actionMode !== TOOLBAR_MODE.SEARCH}
                    // ariaControls="modalNoPart"
                    tabIndex="1"
                  />
                </div>

                {/* Drop Dawn month */}
                <div className="grid_3 float-right">
                  <SelectNoChildrenInput name="mouth_id" validate={validateMouthIDField}
                    cssStyle={{ left: "-160px", top: "10px" }}>
                    <option value=''></option>
                    {values.mouth.map((mouth) => {
                      var new_date = new Date();
                      var mouth_now = new_date.getMonth() + 1;
                      if (mouth_now === mouth.id) {
                        return <option key={mouth.id} value={mouth.id} selected> {mouth.mouth} </option>
                      } else {
                        return <option key={mouth.id} value={mouth.id}> {mouth.mouth} </option>
                      }
                    })}
                  </SelectNoChildrenInput>
                </div>
                <div className="grid_2 float-right">
                  <p className="top-text float-right">เดือน</p>
                </div>
              </div>

              <div className="container_12">
                <div className="grid_2">
                  <p className="top-text">สถานะสิ่งของ</p>
                </div>
                <div className="grid_3 pull_1">
                  <SelectNoChildrenInput name="item_status_id" validate={validateInternalDocumentStatusIDField}
                    cssStyle={{ left: "-160px", top: "10px" }}>
                    <option value=''></option>
                    {fact[FACTS.ITEM_STATUS].items.map((status) => (
                      <option key={status.item_status_id} value={status.item_status_id} selected> {status.description_th} </option>
                    ))}
                  </SelectNoChildrenInput>
                </div>
              </div>

              <div className="grid_12 mt-3">
                <div className="grid_1 float-right">
                  <button type="button" className="button-blue" onClick={searchGoodsOnHand}>ค้นหา</button>
                </div>
              </div>

              {/* PopUp ค้นหาเลขที่คลัง MODE ADD */}
              <PopupModalInventory
                id="modalInventory" //For Open POPUP
                name="src_warehouse_id"
              />
              {/* PopUp ค้นหาอะไหล่ */}
              {/* <PopupModalNoPartNoChildren /> */}

            </div>
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