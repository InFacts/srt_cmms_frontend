import React, { useEffect, useState } from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux';

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import TextareaInput from '../common/formik-textarea-input';
import TableStatus from '../common/table-status';
import TableHaveStock from '../common/table-have-stock';

import Files from '../common/files2'

import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import { useFormikContext } from 'formik';
import { FACTS } from '../../redux/modules/api/fact.js';

import PopupModalNoPart from '../common/popup-modal-nopart'

import '../../../css/table.css';

import {
  fetchGoodsOnhandData, getNumberFromEscapedString, getLotFromQty, weightedAverage,
  sumTotalLineItemHelper, sumTotalHelper, DOCUMENT_STATUS, getUserIDFromEmployeeID, checkBooleanForEditHelper
} from '../../helper';

import { fetchPositionPermissionData, changeTheam } from '../../helper.js'
const BottomContent = (props) => {
  const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
  const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
  const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);
  const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);
  const [lineNumber, setLineNumber] = useState('');

  const { values, errors, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();

  const sumTotalLineItem = (quantity, per_unit_price, description) => sumTotalLineItemHelper(quantity, per_unit_price, description);

  const sumTotal = (list_show) => sumTotalHelper(list_show);

  const validateLineNumberInternalItemIDField = (fieldName, internal_item_id, index) => new Promise(resolve => {
    //     By default Trigger every line_item, so need to check if the internal_item_id changes ourselves
    if (values.line_items[index].internal_item_id === internal_item_id) {
      return resolve();
    }
    if (internal_item_id === "") {
      setFieldValue(fieldName + `.description`, '', false);
      setFieldValue(fieldName + `.quantity`, '', false);
      setFieldValue(fieldName + `.list_uoms`, [], false);
      setFieldValue(fieldName + `.uom_id`, '', false);
      setFieldValue(fieldName + `.per_unit_price`, '', false);
      setFieldValue(fieldName + `.at_source`, [], false);
      return resolve();
    }
    let items = props.fact.items.items;
    let item = items.find(item => `${item.internal_item_id}` === `${internal_item_id}`); // Returns undefined if not found

    if (item) {
      setFieldValue(fieldName + `.description`, `${item.description}`, false);
      setFieldValue(fieldName + `.quantity`, 0, false);
      setFieldValue(fieldName + `.list_uoms`, item.list_uoms, false);
      setFieldValue(fieldName + `.uom_id`, item.list_uoms[0].uom_id, false);
      // setFieldValue(fieldName + `.per_unit_price`, 0, false);
      setFieldValue(fieldName + `.line_number`, index + 1, false);
      setFieldValue(fieldName + `.item_status_id`, 1, false);
      setFieldValue(fieldName + `.item_id`, item.item_id, false);
      setFieldValue(fieldName + `.at_source`, [], false);

      fetchGoodsOnhandData(getNumberFromEscapedString(values.src_warehouse_id), item.item_id)
        .then((at_source) => {
          var at_sources = at_source;
          var at_source = at_sources.find(at_source => `${at_source.item_status_id}` === `1`); // Returns undefined if not found
          console.log("at_source", at_source)
          if (at_source) {
            setFieldValue(`line_items[${index}].at_source`, [at_source], false);
            setFieldValue(`line_items[${index}].per_unit_price`, weightedAverage(getLotFromQty(at_source.pricing.fifo, values.line_items[index].quantity)), false);
            return resolve();
          }
          else {
            console.log(" NOT FOUND AT SOURCES FOR CALCULATE FIFO")
            setFieldValue(`line_items[${index}].at_source`, [], false);
            setFieldValue(`line_items[${index}].per_unit_price`, 0, false);
            return resolve();
          }
        })
      return resolve();
    } else {
      return resolve('Invalid Number ID');
    }
  });

  const validateLineNumberQuatityItemIDField = (fieldName, quantity, index) => {
    if (values.line_items[index].quantity === quantity) {
      return;
    }
    if (quantity === "") {
      return;
    }
    if (quantity !== 0) {
      setFieldValue(fieldName, quantity, false);
      setFieldValue(`line_items[${index}].per_unit_price`, weightedAverage(getLotFromQty(values.line_items[index].at_source[0].pricing.fifo, quantity)), false);
      return;
    } else {
      return 'Invalid Quantity Line Item';
    }
  }

  const validateLineNumberItemStatusIDField = (fieldName, item_status_id, index) => {
    if (values.line_items[index].item_status_id === item_status_id) {
      return;
    }
    fetchGoodsOnhandData(getNumberFromEscapedString(values.src_warehouse_id), values.line_items[index].item_id)
      .then((at_source) => {
        var at_sources = at_source;
        var at_source = at_sources.find(at_source => `${at_source.item_status_id}` === `${item_status_id}`); // Returns undefined if not found
        console.log("at_source", at_source)
        if (at_source) {
          setFieldValue(`line_items[${index}].at_source`, [at_source], false);
          setFieldValue(`line_items[${index}].item_status_id`, item_status_id, false);
          setFieldValue(`line_items[${index}].per_unit_price`, weightedAverage(getLotFromQty(at_source.pricing.fifo, values.line_items[index].quantity)), false);
        }
        else {
          console.log(" NOT FOUND AT SOURCES FOR CALCULATE FIFO")
          setFieldValue(`line_items[${index}].at_source`, [{ "current_unit_count": 0, "committed_unit_count": 0 }], false);
          setFieldValue(`line_items[${index}].item_status_id`, item_status_id, false);
          setFieldValue(`line_items[${index}].per_unit_price`, 0, false);
        }
      })
  }
  const checkBooleanForEdit = checkBooleanForEditHelper(values, decoded_token, fact)
  return (
    <div id={changeTheam() === true ? "" : "blackground-gray"}>
      <div className="container_12 clearfix" id={changeTheam() === true ? "blackground-gray" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray" } : {}}>

        <div className="container_12 ">

          <div id="listItem_content" className="tabcontent">
            <div className="container_12 mt-1" style={{ paddingRight: "10px" }}>
              <TableHaveStock line_items={values.line_items}
                sumTotalLineItem={sumTotalLineItem}
                validateLineNumberInternalItemIDField={validateLineNumberInternalItemIDField}
                validateLineNumberQuatityItemIDField={validateLineNumberQuatityItemIDField}
                validateLineNumberItemStatusIDField={validateLineNumberItemStatusIDField}
                setLineNumber={setLineNumber}
                checkBooleanForEdit={checkBooleanForEdit}
                tabIndex={6}
              />
            </div>

            <div className="container_12 mt-3">
              <div className="grid_1 float-right"><p className="cancel-default float-right">บาท.</p></div>
              <div className="grid_3 float-right push_0">
                <input type="text" className="cancel-default" value={sumTotal(values.line_items)} disabled="disabled"></input>
              </div>
              <div className="grid_2 float-right push_0"><p className="cancel-default float-right">รวมเป็นเงิน</p></div>
            </div>
            <div className="container_12">
              <div className="grid_1"><p className="cancel-default">หมายเหตุ</p></div>
              <div className="grid_11">
                <TextareaInput name="remark" tabIndex="100"
                  disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                />
              </div>
            </div>
          </div>

          <div id="attachment_content" className="tabcontent">
            <Files />
          </div>

          <div id="table_status_content" className="tabcontent">
            {/* {console.log("values.step_approve", values.step_approve)} */}
            <TableStatus bodyTableStatus={values.step_approve} />
          </div>

          {/* PopUp ค้นหาอะไหล่ MODE ADD */}
          <PopupModalNoPart keyname='line_items' lineNumber={lineNumber} nameModal="modalNoPart" />

        </div>
      </div>
    </div >

  )
};

const mapStateToProps = (state) => ({
  fact: state.api.fact,
  actionMode: state.toolbar.mode,

  list_show: state.list_show
})
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);