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

  console.log("values.line_items", values.line_items)
  return (
    <div id={changeTheam() === true ? "" : "blackground-gray"}>
      <div className="container_12 clearfix" id={changeTheam() === true ? "blackground-gray" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray" } : {}}>

        <div className="grid_12 ">
          <div id="listItem_content" className="tabcontent">
            <table className="table-many-column mt-1" style={{ padding: "10px"}}>
              <thead>
                <tr>
                  <th className="font text-center" rowspan="2" style={{ minWidth: "30px", verticalAlign: 'middle' }}>ลำดับ</th>
                  <th className="font text-center" rowspan="2" style={{ minWidth: "310px", verticalAlign: 'middle' }}>รายการ</th>
                  <th className="font text-center" rowspan="2" style={{ minWidth: "80px", verticalAlign: 'middle' }}>หน่วย</th>

                  <th className="font text-center" colSpan="2" style={{ minWidth: "80px" }}>เหลือเดือนก่อน</th>
                  <th className="font text-center" colSpan="2" style={{ minWidth: "80px" }}>รับเดือนนี้</th>
                  <th className="font text-center" rowspan="2" style={{ minWidth: "80px", verticalAlign: 'middle' }}>รับจาก</th>

                  <th className="font text-center" style={{ minWidth: "80px" }}>ใบส่งของ</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>ฎีกาเบิก</th>

                  <th className="font text-center" colSpan="2" style={{ minWidth: "80px" }}>จ่ายเดือนนี้</th>
                  <th className="font text-center" colSpan="2" style={{ minWidth: "80px" }}>คงเหลือ</th>

                  <th className="font text-center" style={{ minWidth: "80px" }}>จ่ายให้ใคร</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>ประเภทบัญชี</th>
                </tr>
                <tr>
                  <th className="font text-center" style={{ minWidth: "40px" }}>จำนวน</th>
                  <th className="font text-center" style={{ minWidth: "40px" }}>ราคา</th>
                  <th className="font text-center" style={{ minWidth: "40px" }}>จำนวน</th>
                  <th className="font text-center" style={{ minWidth: "40px" }}>ราคา</th>

                  <th className="font text-center" style={{ minWidth: "80px" }}>เลขที่/ลงวันที่</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>เลขที่/ลงวันที่</th>

                  <th className="font text-center" style={{ minWidth: "40px" }}>จำนวน</th>
                  <th className="font text-center" style={{ minWidth: "40px" }}>ราคา</th>
                  <th className="font text-center" style={{ minWidth: "40px" }}>จำนวน</th>
                  <th className="font text-center" style={{ minWidth: "40px" }}>ราคา</th>
                
                  <th className="font text-center" style={{ minWidth: "80px" }}>ใบส่งเลขที่</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>๒๐๓๑๐๕๑</th>
                
                </tr>
              </thead>
              <tbody>
                {values.line_items.map(function (line_items, index) {
                  return (
                    <tr key={index}>
                      <th className="edit-padding text-center">{index + 1}</th>
                      <td className="edit-padding">{line_items.internal_item_id} - {line_items.item_description}</td>
                      <td className="edit-padding text-center">{line_items.uom_name}</td>

                      <td className="edit-padding text-center">{line_items.begin_unit_count}</td> {/* เหลือเดือนก่อน */}
                      <td className="edit-padding text-center">{line_items.item_id}</td>

                      <td className="edit-padding text-center">{line_items.receive_unit_count}</td> {/* รับเดือนนี้ */}
                      <td className="edit-padding text-center">{line_items.item_id}</td>

                      <td className="edit-padding text-center">{line_items.item_id}</td> {/* รับจาก */}
                      
                      <td className="edit-padding text-center">{line_items.item_id}</td> {/* ใบส่งของ */}

                      <td className="edit-padding text-center">{line_items.item_id}</td> {/* ฎีกาเบิก	 */}

                      <td className="edit-padding text-center">{line_items.item_id}</td> {/* จ่ายเดือนนี้ */}
                      <td className="edit-padding text-center">{line_items.item_id}</td>

                      <td className="edit-padding text-center">{line_items.ending_unit_count}</td> {/* คงเหลือ */}

                      <td className="edit-padding text-center">{line_items.item_id}</td>
                      <td className="edit-padding text-center">{line_items.item_id}</td>
                      <td className="edit-padding text-center">{line_items.item_id}</td>
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