import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useFormikContext } from 'formik';
import { changeTheam } from '../../helper.js';

import '../../../css/table.css';

const BottomContent = (props) => {

  const { values, errors, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();

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

                <th className="font text-center" colSpan={values.line_items.length * 2}>การดำเนินการ</th>
                <th className="font text-center" colSpan="2" style={{ minWidth: "80px" }}>สรุปรวม</th>

                <th className="font text-center" rowspan="3" style={{ minWidth: "300px", verticalAlign: 'middle' }}>หมายเหตุ</th>

              </tr>
              <tr>
                {values.line_items.map((node) => (
                  <th className="font text-center" colSpan="2" style={{ minWidth: "80px" }}>{node.node_id}</th>
                ))}

                <th className="font text-center" colSpan="2" style={{ minWidth: "80px", verticalAlign: 'middle' }}>แขวง</th>
              </tr>
              <tr>
                {values.line_items.map((node) => (
                  <>
                    <th className="font text-center" style={{ minWidth: "40px" }}>แผน</th>
                    <th className="font text-center" style={{ minWidth: "40px" }}>ผลงาน</th>
                  </>
                ))}
                <th className="font text-center" style={{ minWidth: "40px" }}>แผน</th>
                <th className="font text-center" style={{ minWidth: "40px" }}>ผลงาน</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
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
              </tr> */}
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