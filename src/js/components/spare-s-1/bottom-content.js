import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import TextareaInput from '../common/formik-textarea-input';
import TableStatus from '../common/table-status';
import TableHaveStock from '../common/table-have-stock';

import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import { useFormikContext } from 'formik';

import '../../../css/table.css';

import { fetchGoodsOnhandData, getNumberFromEscapedString } from '../../helper';

import { fetchPositionPermissionData, changeTheam } from '../../helper.js'
const BottomContent = (props) => {

  const { values, errors, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();

  return (
    <div id={changeTheam() === true ? "" : "blackground-gray"}>
      <div className="container_12 clearfix" id={changeTheam() === true ? "blackground-gray" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray" } : {}}>

        <div className="container_12 ">
          <div id="listItem_content" className="tabcontent">
            <table className="table-many-column mt-2">
              <thead>
                <tr>
                  <th className="font text-center" style={{ minWidth: "30px" }}>ลำดับที่</th>
                  <th className="font" style={{ minWidth: "310px" }}>รายการสิ่งของ</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>เลขที่สิ่งของคงคลัง</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>สถานะ</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>หน่วย</th>

                  <th className="font text-center" style={{ minWidth: "100px" }}>จำนวนเหลือ ณ วันนี้</th>
                  <th className="font text-center" style={{ minWidth: "96px" }}>รวมเป็นเงิน</th>
                  <th className="font text-center" style={{ minWidth: "96px" }}>ราคาต่อหน่วย</th>
                </tr>
              </thead>
              <tbody>
                {values.line_items.map(function (line_items, index) {
                  return (
                    <tr key={index}>
                      <th className="edit-padding text-center">{index + 1}</th>
                      <td className="edit-padding">{line_items.item_description_th}</td>
                      <td className="edit-padding">{line_items.internal_item_id}</td>
                      <td className="edit-padding">{line_items.item_status_description_th}</td>
                      <td className="edit-padding text-center">{line_items.uom_name}</td>

                      {/* <td className="edit-padding text-center">{!line_items.committed_unit_count ? line_items.current_unit_count - line_items.committed_unit_count : line_items.current_unit_count}</td> */}

                      <td className="edit-padding text-center">{line_items.current_unit_count - line_items.committed_unit_count }</td>

                      <td className="edit-padding text-center">{line_items.pricing.average_price ? (line_items.pricing.average_price.toFixed(4) * (line_items.current_unit_count - line_items.committed_unit_count)).toFixed(2) : 0}</td>

                      <td className="edit-padding text-center">{line_items.pricing.average_price ? line_items.pricing.average_price.toFixed(4) : 0}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
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