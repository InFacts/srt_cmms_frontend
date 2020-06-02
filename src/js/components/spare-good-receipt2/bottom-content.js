import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import TextInput from '../common/formik-text-input';
import NumberInput from '../common/formik-number-input';
import SelectInput from '../common/formik-select-input';
import TextareaInput from '../common/formik-textarea-input';
import Files from '../common/files'

import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';

import { useFormikContext } from 'formik';

import PopupModalNoPart from '../common/popup-modal-nopart'

import '../../../css/table.css';

const BottomContent = (props) => {

  const [lineNumber, setLineNumber] = useState('');

  const { values, errors, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();

  const sumTotalLineItem = (quantity, per_unit_price, description) => {
    let sumValueInLineItem = 0;
    sumValueInLineItem = quantity * per_unit_price
    if (description !== '') {
      var conventToString = sumValueInLineItem.toString();
      var findDot = conventToString.indexOf(".")
      if (findDot == -1) {
        conventToString = conventToString + ".00"
        return conventToString;
      }
      else {
        conventToString = conventToString.slice(0, findDot + 3)
        var addOneDot = conventToString.length - findDot;
        if (addOneDot === 2) {
          return conventToString + "0";
        }
        else {
          return conventToString;
        }
      }
    } else {
      return '';
    }
  }

  const sumTotal = (list_show) => {
    var sumTotal = 0;
    list_show.map(function (list, index) {
      var sum = 0;
      sum = list.quantity * list.per_unit_price;
      sumTotal = sumTotal + sum;
      // return sumTotal
    })
    var s = sumTotal.toString();
    var n = s.indexOf(".")
    if (n == -1) {
      s = s + ".00"
      return s;
    }
    else {
      s = s.slice(0, n + 3)
      return s;
    }
  }

  const validateLineNumberInternalItemIDField = (fieldName, internal_item_id, index) => {
    //     By default Trigger every line_item, so need to check if the internal_item_id changes ourselves

    // if (values.line_items[index].internal_item_id === internal_item_id) {
    //   return;
    // }
    if (internal_item_id === "") {
      setFieldValue(fieldName + `.description`, '', false);
      setFieldValue(fieldName + `.quantity`, '', false);
      setFieldValue(fieldName + `.list_uoms`, [], false);
      setFieldValue(fieldName + `.per_unit_price`, '', false);
      return;
    }
    let items = props.fact.items.items;
    let item = items.find(item => `${item.internal_item_id}` === `${internal_item_id}`); // Returns undefined if not found

    if (item) {
      // console.log("if")
      setFieldValue(fieldName + `.description`, `${item.description}`, false);
      setFieldValue(fieldName + `.quantity`, 0, false);
      setFieldValue(fieldName + `.list_uoms`, item.list_uoms, false);
      setFieldValue(fieldName + `.per_unit_price`, 0, false);
      return;
    } else {
      // console.log("else")
      return 'Invalid Number ID';
    }
  }

  const validateLineNumberQuatityItemIDField = (fieldName, quantity, index) => {
    // internal_item_id = `${internal_item_id}`.split('\\')[0]; // Escape Character WAREHOUSE_ID CANT HAVE ESCAPE CHARACTER!
    //     By default Trigger every line_item, so need to check if the internal_item_id changes ourselves
    // if (values.line_items[index].quantity === quantity) {
    //   return;
    // }
    if (quantity === "") {
      return;
    }

    if (quantity !== 0) {
      setFieldValue(fieldName, quantity, false);
      return;
    } else {
      return 'Invalid Quantity Line Item';
    }
  }

  const validateLineNumberPerUnitPriceItemIDField = (fieldName, per_unit_price, index) => {
    // internal_item_id = `${internal_item_id}`.split('\\')[0]; // Escape Character WAREHOUSE_ID CANT HAVE ESCAPE CHARACTER!
    //     By default Trigger every line_item, so need to check if the internal_item_id changes ourselves
    // if (values.line_items[index].per_unit_price === per_unit_price) {
    //   return;
    // }
    if (per_unit_price === "") {
      return;
    }

    if (per_unit_price !== 0) {
      setFieldValue(fieldName, per_unit_price, false);
      return;
    } else {
      return 'Invalid Per Unit Price Line Item';
    }
  }

  return (
    <div id="blackground-gray">
      <div className="container_12 clearfix">
        <div className="container_12 ">

          <div id="listItem_content" className="tabcontent">
            <div className="container_12 mt-1" style={{ paddingRight: "10px" }}>
              <table className="table-many-column">
                <thead>
                  <tr>
                    <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                    <th className="font" style={{ minWidth: "130px" }}>เลขที่อะไหล่</th>
                    <th className="font" style={{ minWidth: "368px" }}>รายละเอียด</th>
                    <th className="font text-center" style={{ minWidth: "80px" }}>จำนวน</th>
                    <th className="font text-center" style={{ minWidth: "80px" }}>หน่วยนับ</th>
                    <th className="font text-right" style={{ minWidth: "80px" }}>สถานะ</th>
                    <th className="font text-right" style={{ minWidth: "80px" }}>ราคาต่อหน่วย</th>
                    <th className="font text-right" style={{ minWidth: "80px" }}>จำนวนเงิน</th>
                  </tr>
                </thead>
                <tbody>
                  {values.line_items.map(function (list, index) {
                    let line_number = index + 1;
                    return (
                      <tr key={index}>
                        <th className="edit-padding text-center">{line_number}</th>
                        <td className="edit-padding">
                          <TextInput name={`line_items[${index}].internal_item_id`}
                            validate={internal_item_id => validateLineNumberInternalItemIDField(`line_items[${index}]`, internal_item_id, index)} tabIndex="6"
                            disabled={props.actionMode === TOOLBAR_MODE.SEARCH}
                            searchable={props.actionMode !== TOOLBAR_MODE.SEARCH} ariaControls="modalNoPart"
                            handleModalClick={() => setLineNumber(line_number)}
                          />
                        </td>
                        <td className="edit-padding">{list.description}</td>
                        <td className="edit-padding text-center">
                          <NumberInput name={`line_items[${index}].quantity`} tabIndex="7"
                            validate={quantity => validateLineNumberQuatityItemIDField(`line_items[${index}].quantity`, quantity, index)}
                            disabled={props.actionMode === TOOLBAR_MODE.SEARCH} />
                        </td>

                        {/* หน่วยนับ */}
                        <td className="edit-padding text-center">
                          <SelectInput name={`line_items[${index}].list_uom`} listProps={list.list_uoms}
                            tabIndex="8" disabled={props.actionMode === TOOLBAR_MODE.SEARCH} 
                            optionValue='uom_id' optionName='name'
                            />
                        </td>

                        {/* สถานะของอะไหล่ */}
                        <td className="edit-padding text-center">
                          <SelectInput name={`line_items[${index}].item_status_id`} listProps={props.fact['item-status'].items}
                            tabIndex="8" disabled={props.actionMode === TOOLBAR_MODE.SEARCH} 
                            checkDescription = {list.description}
                            optionValue='item_status_id' optionName='description_th'
                            />
                        </td>

                        <td className="edit-padding text-right">
                          <NumberInput step={0.0001} name={`line_items[${index}].per_unit_price`}
                            validate={per_unit_price => validateLineNumberPerUnitPriceItemIDField(`line_items[${index}].per_unit_price`, per_unit_price, index)}
                            disabled={props.actionMode === TOOLBAR_MODE.SEARCH} />
                        </td>
                        <td className="edit-padding text-right">{sumTotalLineItem(list.quantity, list.per_unit_price, list.description)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
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
                {/* <textarea className="edit" name="Text1" rows="2" 
                defaultValue={current.props.document_show.remark} 
                ></textarea> */}
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

          {/* PopUp ค้นหาอะไหล่ MODE ADD */}
          <PopupModalNoPart lineNumber={lineNumber} />

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
