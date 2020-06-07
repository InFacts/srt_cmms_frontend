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

import PopupModalNoPart from '../common/popup-modal-nopart'

import '../../../css/table.css';

import { fetchGoodsOnhandData, getNumberFromEscapedString } from '../../helper';
const BottomContent = (props) => {

  const { values, errors, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();

  return (
    <div id="blackground-gray">
      <div className="container_12 clearfix">
        <div className="container_12 ">
          <div id="listItem_content" className="tabcontent">
            <table className="table-many-column mt-2">
              <thead>
                <tr>
                  <th className="font text-center" style={{ minWidth: "30px" }}>ลำดับที่</th>
                  <th className="font" style={{ minWidth: "350px" }}>รายการสิ่งของ</th>
                  <th className="font text-center" style={{ minWidth: "150px" }}>เลขที่สิ่งของคงคลัง</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>หน่วย</th>
                  <th className="font text-center" style={{ minWidth: "100px" }}>จำนวนเหลือ ณ วันนี้</th>
                  <th className="font text-center" style={{ minWidth: "96px" }}>รวมเป็นเงิน</th>
                  <th className="font text-center" style={{ minWidth: "96px" }}>ราคาต่อหน่วย</th>
                </tr>
              </thead>
              <tbody>
                {/* {this.props.line_item_s1.map(function (line_item_s1, index) {
                  return (
                    <tr key={index}>
                      <th className="edit-padding text-center">{index + 1}</th>
                      <td className="edit-padding">{line_item_s1.description} {line_item_s1.item_status_id === 1 ? "สถานะของใหม่" : "สถานะรอส่งมอบ"}</td>
                      <td className="edit-padding">{line_item_s1.internal_item_id}</td>
                      <td className="edit-padding text-center">{line_item_s1.uom_name}</td>
                      <td className="edit-padding text-center">{line_item_s1.ending_unit_count === undefined ? line_item_s1.current_unit_count : line_item_s1.ending_unit_count}</td>
                      <td className="edit-padding text-center">-</td>
                      <td className="edit-padding text-center">-</td>
                    </tr>
                  )
                })} */}
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