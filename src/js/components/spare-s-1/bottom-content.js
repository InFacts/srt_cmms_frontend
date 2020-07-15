import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { shallowEqual, useSelector } from 'react-redux'

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import TextareaInput from '../common/formik-textarea-input';
import TableStatus from '../common/table-status';
import TableHaveStock from '../common/table-have-stock';
import { ExportCSV } from '../common/exportCSV';

import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import { useFormikContext } from 'formik';

import '../../../css/table.css';

import { fetchPositionPermissionData, changeTheam, getNumberFromEscapedString } from '../../helper';

const BottomContent = (props) => {

  const { values, errors, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
  const factItems = useSelector((state) => ({ ...state.api.fact.items }), shallowEqual);

  const returnUnitCount = (quantity, item) => {
    if (quantity < item.quantity_lowest) {
      return <td className="edit-padding" style={{ color: "DarkRed" }}>{quantity}</td>
    } else if (quantity > item.quantity_highest) {
      return <td className="edit-padding" style={{ color: "DarkBlue" }}>{quantity}</td>
    } else {
      return <td className="edit-padding" style={{ color: "DarkGreen" }}>{quantity}</td>
    }
  }

  // const setValuesForCSV = (line_items) => {
  //   values.new_line_items = [];
  //   line_items.map((line_item) => {
  //     values.new_line_items.push({
  //       "warehouse_name": line_item.warehouse_name,
  //       "item_id": line_item.item_id,
  //       "internal_item_id": line_item.internal_item_id,
  //       "item_description": line_item.item_description,
  //       "uom_name": line_item.uom_name,
  //       "item_status_description_th": line_item.item_status_description_th,
  //       "quantity": line_item.current_unit_count - line_item.committed_unit_count,
  //       "total": line_item.pricing !== undefined ? (line_item.pricing.average_price.toFixed(4) * (line_item.current_unit_count - line_item.committed_unit_count)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : line_item.end_state_in_total_price,
  //       "per_unit_price": line_item.pricing !== undefined ? line_item.pricing.average_price.toFixed(4) : line_item.end_state_in_total_price / (line_item.current_unit_count - line_item.committed_unit_count)
  //     })
  //   });
  // }

  // useEffect(() => {
  //   setValuesForCSV(values.line_items)
  // }, [values.line_items])

  return (
    <div id={changeTheam() === true ? "" : "blackground-gray"}>
      <div className="container_12 clearfix" id={changeTheam() === true ? "blackground-gray" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray" } : {}}>

        <div className="container_12 ">
          <div id="listItem_content" className="tabcontent">

            <table className="table-many-column" style={{ padding: "10px" }}>
              <thead>
                <tr>
                  <th className="font text-center" style={{ minWidth: "30px" }}>ลำดับที่</th>
                  <th className="font" style={{ minWidth: "280px" }}>รายการสิ่งของ</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>เลขที่สิ่งของคงคลัง</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>สถานะ</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>หน่วย</th>

                  <th className="font text-center" style={{ minWidth: "100px" }}>จำนวนเหลือ ณ วันนี้</th>
                  <th className="font text-center" style={{ minWidth: "96px" }}>รวมเป็นเงิน</th>
                  <th className="font text-center" style={{ minWidth: "96px" }}>ราคาต่อหน่วย</th>
                </tr>
              </thead>
              <tbody>
                {values.line_item_shows.map(function (line_items, index) {
                  if (values.warehouse_type_id !== 1 && values.warehouse_type_id !== 2 && values.warehouse_type_id !== 4) {
                    return (
                      <tr key={index}>
                        <th className="edit-padding text-center">{index + 1}</th>
                        <td className="edit-padding">{line_items.item_description_th}</td>
                        <td className="edit-padding">{line_items.internal_item_id}</td>
                        <td className="edit-padding">{line_items.item_status_description_th}</td>
                        <td className="edit-padding text-center">{line_items.uom_name}</td>

                        {/* <td className="edit-padding text-center">{!line_items.committed_unit_count ? line_items.current_unit_count - line_items.committed_unit_count : line_items.current_unit_count}</td> */}

                        <td className="edit-padding text-center">{line_items.current_unit_count - line_items.committed_unit_count}</td>

                        <td className="edit-padding">{line_items.pricing.average_price ? (line_items.pricing.average_price.toFixed(4) * (line_items.current_unit_count - line_items.committed_unit_count)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : 0}</td>

                        <td className="edit-padding">{line_items.pricing.average_price ? line_items.pricing.average_price.toFixed(4).replace(/\d(?=(\d{3})+\.)/g, '$&,') : 0}</td>
                      </tr>
                    )
                  } else { //ถ้าไม่เป็นคลังของตอน
                    let items = factItems.items;
                    let item = items.find(item => `${item.item_id}` === `${line_items.item_id}`)
                    if (item) {
                      return (
                        <tr key={index}>
                          <th className="edit-padding text-center">{index + 1}</th>
                          <td className="edit-padding">{line_items.item_description}</td>
                          <td className="edit-padding">{line_items.internal_item_id}</td>
                          <td className="edit-padding text-center">{line_items.item_status_description_th}</td>
                          <td className="edit-padding text-center">{line_items.uom_name}</td>

                          {returnUnitCount(line_items.quantity, item)}

                          <td className="edit-padding">{line_items.total}</td>

                          <td className="edit-padding">{line_items.per_unit_price}</td>
                        </tr>
                      )
                    }
                  }
                })}
              </tbody>
            </table>

            <div className="grid_12">
              <p style={{ fontSize: "18px" }}>* หมายเหตุ: <span style={{ color: "DarkRed" }}>สีแดง: ของต่ำกว่าเกณฑ์</span>, <span style={{ color: "DarkBlue" }}>สีน้ำเงิน: ของมากกว่าเกณฑ์</span>, <span style={{ color: "DarkGreen" }}>สีเขียว: ของอยู่ในเกณฑ์</span>, สีดำ: ของในคลังของตอน</p>

              <div className="float-right">
                <ExportCSV csvData={values.line_item_shows} fileName="ส.1" />
              </div>
            </div>

          </div>
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