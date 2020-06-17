import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import TextareaInput from '../common/formik-textarea-input';
import TableStatus from '../common/table-status';
import TableHaveStock from '../common/table-have-stock';

import Files from '../common/files2'

import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import { useFormikContext } from 'formik';

import PopupModalNoPart from '../common/popup-modal-nopart'

import '../../../css/table.css';

import { fetchGoodsOnhandData, getNumberFromEscapedString, getLotFromQty, weightedAverage, sumTotalLineItemHelper, sumTotalHelper } from '../../helper';

const BottomContent = (props) => {

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
      setFieldValue(fieldName + `.item_id`, item.item_id, false);

      fetchGoodsOnhandData(getNumberFromEscapedString(values.src_warehouse_id), item.item_id)
        .then((at_source) => {
          var at_sources = at_source;
          var at_source = at_sources.find(at_source => `${at_source.item_status_id}` === `${values.line_items[index].item_status_id}`); // Returns undefined if not found
          if (at_sources) {
            setFieldValue(`line_items[${index}].at_source`, [at_source], false);
            setFieldValue(`line_items[${index}].per_unit_price`, weightedAverage(getLotFromQty(at_source.pricing.fifo, values.line_items[index].quantity)), false);
            return resolve();
          }
          else {
            console.log(" NOT FOUND AT SOURCES FOR CALCULATE FIFO")
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
          setFieldValue(`line_items[${index}].at_source`, [{"current_unit_count": 0, "committed_unit_count": 0}], false);
          setFieldValue(`line_items[${index}].item_status_id`, item_status_id, false);
          setFieldValue(`line_items[${index}].per_unit_price`, 0, false);
        }
      })
  }
  
  // For Down File in Attactment by Nuk
  const HandleDownload = () => {
    axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/attachment/1/download/1`,
      { headers: { "x-access-token": localStorage.getItem('token_auth') } })
      .then((response) => {
        console.log("response", response)
        const url = window.URL.createObjectURL(new Blob([response.data]));
        console.log("url", url)
        const link = document.createElement('a');
        console.log("link", link)
        link.href = url;
        link.setAttribute('download', 'Screen Shot 2563-05-28 at 20.11.15.png');
        document.body.appendChild(link);
        link.click();
      }).catch(function (err) {
        console.log(err);
      })
  };

  return (
    <div id="blackground-gray">
      <div className="container_12 clearfix">
        <div className="container_12 ">

          <div id="listItem_content" className="tabcontent">
            <div className="container_12 mt-1" style={{ paddingRight: "10px" }}>
              {console.log("------- TableHaveStock -------")}
              <TableHaveStock line_items={values.line_items}
                sumTotalLineItem={sumTotalLineItem}
                validateLineNumberInternalItemIDField={validateLineNumberInternalItemIDField}
                validateLineNumberQuatityItemIDField={validateLineNumberQuatityItemIDField}
                validateLineNumberItemStatusIDField={validateLineNumberItemStatusIDField}
                setLineNumber={setLineNumber}
              />
            </div>

            <div className="container_12 mt-3">
              <div className="grid_1 float-right"><p className="cancel-default float-right">บาท.</p></div>
              <div className="grid_3 float-right push_0">
                <input type="text" className="cancel-default" value={sumTotal(values.line_items)} disabled="disabled"></input>
              </div>
              <div className="grid_2 float-right push_0"><p className="cancel-default float-right">จำนวนสุทธิ</p></div>
            </div>
            <div className="container_12">
              <div className="grid_1"><p className="cancel-default">หมายเหตุ</p></div>
              <div className="grid_11">
                <TextareaInput name="remark" tabIndex="6"
                  disabled={props.actionMode === TOOLBAR_MODE.SEARCH}
                  searchable={props.actionMode !== TOOLBAR_MODE.SEARCH} ariaControls="modalNoPart"
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
          <PopupModalNoPart keyname='line_items' lineNumber={lineNumber} />

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