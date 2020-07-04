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
          <table className="table-many-column mt-1" style={{ padding: "10px" }}>
            <thead>
              <tr>
                <th className="font text-center" rowspan="3" style={{ minWidth: "30px", verticalAlign: 'middle' }}>ลำดับ</th>
                <th className="font text-center" rowspan="3" style={{ minWidth: "300px", verticalAlign: 'middle' }}>รายละเอียด</th>
                <th className="font text-center" rowspan="3" style={{ minWidth: "80px", verticalAlign: 'middle' }}>หน่วย</th>

                <th className="font text-center" colSpan="10" style={{ minWidth: "80px" }}>การดำเนินการ</th>
                <th className="font text-center" colSpan="2" style={{ minWidth: "80px" }}>สรุปรวม</th>

                <th className="font text-center" rowspan="3" style={{ minWidth: "300px", verticalAlign: 'middle' }}>หมายเหตุ</th>

              </tr>
              <tr>
                <th className="font text-center" colSpan="2" style={{ minWidth: "80px" }}>ตอน นตส.พบ.</th>

                <th className="font text-center" colSpan="2" style={{ minWidth: "80px" }}>ตอน นตส.หห.</th>

                <th className="font text-center" colSpan="2" style={{ minWidth: "80px" }}>ตอน นตส.จข.</th>

                <th className="font text-center" colSpan="2" style={{ minWidth: "80px" }}>ตอน นตส.พญ.</th>

                <th className="font text-center" colSpan="2" style={{ minWidth: "80px" }}>ตอน นตส.ชพ.</th>

                <th className="font text-center" colSpan="2" style={{ minWidth: "80px", verticalAlign: 'middle' }}>แขวง</th>
              </tr>
              <tr>
                <th className="font text-center" style={{ minWidth: "40px" }}>แผน</th>
                <th className="font text-center" style={{ minWidth: "40px" }}>ผลงาน</th>

                <th className="font text-center" style={{ minWidth: "40px" }}>แผน</th>
                <th className="font text-center" style={{ minWidth: "40px" }}>ผลงาน</th>

                <th className="font text-center" style={{ minWidth: "40px" }}>แผน</th>
                <th className="font text-center" style={{ minWidth: "40px" }}>ผลงาน</th>

                <th className="font text-center" style={{ minWidth: "40px" }}>แผน</th>
                <th className="font text-center" style={{ minWidth: "40px" }}>ผลงาน</th>

                <th className="font text-center" style={{ minWidth: "40px" }}>แผน</th>
                <th className="font text-center" style={{ minWidth: "40px" }}>ผลงาน</th>

                <th className="font text-center" style={{ minWidth: "40px" }}>แผน</th>
                <th className="font text-center" style={{ minWidth: "40px" }}>ผลงาน</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="edit-padding text-center">1</th>
                <td className="edit-padding">งานบำรุงรักษาตามวาระที่สถานี(จำนวนสถานีที่รับผิดชอบ)</td>
                <td className="edit-padding text-center">สถานี</td>

                <td className="edit-padding text-center">11</td>
                <td className="edit-padding text-center">11</td>

                <td className="edit-padding text-center">11</td>
                <td className="edit-padding text-center">11</td>

                <td className="edit-padding text-center">9</td>
                <td className="edit-padding text-center">9</td>

                <td className="edit-padding text-center">9</td>

                <td className="edit-padding text-center">9</td>

                <td className="edit-padding text-center">9</td>

                <td className="edit-padding text-center">9</td>
                <td className="edit-padding text-center">49</td>

                <td className="edit-padding text-center">49</td>

                <td className="edit-padding text-center"></td>
              </tr>
              <tr>
                <th className="edit-padding text-center">1.1</th>
                <td className="edit-padding">ห้องรีเลย์ไฟสี ARI/ไฟสีสายลวด</td>
                <td className="edit-padding text-center">แห่ง</td>

                <td className="edit-padding text-center">11</td>
                <td className="edit-padding text-center">11</td>

                <td className="edit-padding text-center">6</td>
                <td className="edit-padding text-center">6</td>

                <td className="edit-padding text-center">5</td>
                <td className="edit-padding text-center">5</td>

                <td className="edit-padding text-center">9</td>

                <td className="edit-padding text-center">9</td>

                <td className="edit-padding text-center">9</td>

                <td className="edit-padding text-center">9</td>
                <td className="edit-padding text-center">40</td>

                <td className="edit-padding text-center">40</td>

                <td className="edit-padding text-center"></td>
              </tr>

              <tr>
                <th className="edit-padding text-center">1.2</th>
                <td className="edit-padding">ห้องรีเลย์ CTC Service (CTS/ PABX/ SDH/ PDH)</td>
                <td className="edit-padding text-center">แห่ง</td>

                <td className="edit-padding text-center">-</td>
                <td className="edit-padding text-center">-</td>

                <td className="edit-padding text-center">-</td>
                <td className="edit-padding text-center">-</td>

                <td className="edit-padding text-center">-</td>
                <td className="edit-padding text-center">-</td>

                <td className="edit-padding text-center">-</td>

                <td className="edit-padding text-center">-</td>

                <td className="edit-padding text-center">-</td>

                <td className="edit-padding text-center">-</td>
                <td className="edit-padding text-center">-</td>

                <td className="edit-padding text-center">-</td>

                <td className="edit-padding text-center"></td>
              </tr>

              <tr>
                <th className="edit-padding text-center">1.3</th>
                <td className="edit-padding">ห้องรีเลย์ CBI/ MDF</td>
                <td className="edit-padding text-center">แห่ง</td>

                <td className="edit-padding text-center">-</td>
                <td className="edit-padding text-center">-</td>

                <td className="edit-padding text-center">-</td>
                <td className="edit-padding text-center">-</td>

                <td className="edit-padding text-center">-</td>
                <td className="edit-padding text-center">-</td>

                <td className="edit-padding text-center">-</td>

                <td className="edit-padding text-center">-</td>

                <td className="edit-padding text-center">-</td>

                <td className="edit-padding text-center">-</td>
                <td className="edit-padding text-center">-</td>

                <td className="edit-padding text-center">-</td>

                <td className="edit-padding text-center"></td>
              </tr>


            </tbody>
          </table>
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