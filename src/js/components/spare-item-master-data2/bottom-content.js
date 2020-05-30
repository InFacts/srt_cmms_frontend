import React from 'react';
import { connect } from 'react-redux'
import Files from '../common/files'

// import '../../../css/style.css'
// import '../../../css/table.css';


const BottomContent = (props) => (
  <>
  {/* THIS MAKES THE BACKGROUND NOT GRAY!! NEEDS TO FIX */}
  <div id="blackground-gray">
        {/* <div className="container_12 clearfix"> */}
          <div className="grid_12 ">
            {/* General Tab */}
          <div id="general_content" className="tabcontent">
            <div className="grid_12 mt-3">
              <div className="grid_2 cancel-default">
                <p className="cancel-default">ชื่อย่อหน่วยนับการนำเข้า </p>
              </div>
              <div className="grid_2">
                <input type="text" className="cancel-default" disabled="disabled" defaultValue={
                  props.parent_unit_part.map(function (parent_unit_part, index) {
                    if (parent_unit_part.parent_unit === props.info_part_show.parent_unit_part)
                      return parent_unit_part.child_unit[0].short_name
                  })
                }>
                </input>
              </div>
              <div className="grid_1 ml-0">
                <button type="button" className="p-button--neutral edit" disabled="disabled">...</button>
              </div>

              <div className="float-right">
                <div className="grid_2 cancel-default">
                  <p className="cancel-default">ขั้นต่ำการสั่งซื้อ</p>
                </div>
                <div className="grid_2 pull_0">
                  <input type="text" className="cancel-default" defaultValue={props.info_part_show.low_po} disabled="disabled"></input>
                </div>
                <div className="grid_1 ml-0 pull_0">

                </div>
              </div>
            </div>

            <div className="grid_12">
              <div className="grid_2 cancel-default">
                <p className="cancel-default">ชื่อหน่วยนับการนำเข้า  </p>
              </div>
              <div className="grid_2">
                <input type="text" className="cancel-default" disabled="disabled" defaultValue={
                  props.parent_unit_part.map(function (parent_unit_part, index) {
                    if (parent_unit_part.parent_unit === props.info_part_show.parent_unit_part)
                      return parent_unit_part.child_unit[0].child_unit
                  })
                }></input>
              </div>

              <div className="float-right">
                <div className="grid_2 cancel-default">
                  <p className="cancel-default">Lead Time</p>
                </div>
                <div className="grid_2 pull_0">
                  <input type="text" className="cancel-default" defaultValue={props.info_part_show.lead_time} disabled="disabled"></input>
                </div>
                <div className="grid_1 ml-0 pull_0">
                  <p className="cancel-default">วัน </p>
                </div>
              </div>
            </div>

            <div className="grid_12">
              <div className="grid_2 cancel-default">
                <p className="cancel-default">จำนวนต่อหน่วยนำเข้า </p>
              </div>
              <div className="grid_2">
                <input type="text" className="cancel-default" defaultValue={props.info_part_show.quality_into} disabled="disabled"></input>
              </div>
              <div className="grid_1 ml-0">
                <p className="cancel-default">
                  {props.parent_unit_part.map(function (parent_unit_part, index) {
                    if (parent_unit_part.parent_unit === props.info_part_show.parent_unit_part)
                      return parent_unit_part.child_unit[0].child_unit
                  })}
                </p>
              </div>

              <div className="float-right">
                <div className="grid_2 cancel-default">
                  <p className="cancel-default">Tolerance Days </p>
                </div>
                <div className="grid_2 pull_0">
                  <input type="text" className="cancel-default" defaultValue={props.info_part_show.tolerance_day} disabled="disabled"></input>
                </div>
                <div className="grid_1 ml-0 pull_0">
                  <p className="cancel-default">วัน </p>
                </div>
              </div>
            </div>

            <div className="grid_12 mt-2">
              <div className="grid_4 ml-3">
                <input type="radio" name="RadioOptions" id="checkExample1" value="option1" />
                <label className="cancel-default d-inline ml-2n" htmlFor="checkExample1">เปิดการใช้งาน</label>
              </div>
            </div>
            <div className="grid_12 mt-2">
              <div className="grid_4 ml-3">
                <input type="radio" name="RadioOptions" id="checkExample2" value="option2" />
                <label className="cancel-default d-inline ml-2n" htmlFor="checkExample2">ปิดการใช้งาน</label>
              </div>
            </div>

            <div className="grid_12 mt-3">
              <div className="grid_1"><p className="cancel-default">หมายเหตุ</p></div>
              <div className="grid_">
                <textarea className="edit" name="Text1" cols="40" rows="2" defaultValue={props.info_part_show.note} disabled="disabled"></textarea>
              </div>
            </div>

          </div>
          
          {/* Warehouse Tab  */}
          <div id="warehouse_content" className="tabcontent">

            <div className="grid_12 mt-3">
              <div className="grid_2 cancel-default">
                <p className="cancel-default">ชื่อย่อหน่วยนับ </p>
              </div>
              <div className="grid_2 pull_0">
                <input type="text" className="cancel-default" disabled="disabled" defaultValue={
                  props.parent_unit_part.map(function (parent_unit_part, index) {
                    if (parent_unit_part.parent_unit === props.info_part_show.parent_unit_part)
                      return parent_unit_part.child_unit[0].short_name
                  })}>
                </input>
              </div>
              <div className="grid_1 ml-0 pull_0">
                <button type="button" className="p-button--neutral edit" disabled="disabled">...</button>
              </div>

              <div className="float-right">
                <div className="grid_2 cancel-default">
                  <p className="cancel-default" style={{ textDecoration: "underline" }}>จำนวนในคลัง</p>
                </div>
                <div className="grid_2 pull_0">

                </div>
                <div className="grid_1 ml-0 pull_0">

                </div>
              </div>
            </div>

            <div className="grid_12">
              <div className="grid_2 cancel-default">
                <p className="cancel-default">ชื่อหน่วยนับ </p>
              </div>
              <div className="grid_2 pull_0">
                <input type="text" className="cancel-default" disabled="disabled" defaultValue={
                  props.parent_unit_part.map(function (parent_unit_part, index) {
                    if (parent_unit_part.parent_unit === props.info_part_show.parent_unit_part)
                      return parent_unit_part.child_unit[0].child_unit
                  })
                }></input>
              </div>
              <div className="grid_1 ml-0">
              </div>

              <div className="float-right">
                <div className="grid_2 cancel-default">
                  <p className="cancel-default">จำนวนที่ต้องการ</p>
                </div>
                <div className="grid_2 pull_0">
                  <input type="text" className="cancel-default" defaultValue={props.info_part_show.stock_need} disabled="disabled"></input>
                </div>
                <div className="grid_1 ml-0 pull_0">

                </div>
              </div>
            </div>

            <div className="grid_12">
              <div className="float-right">
                <div className="grid_2 cancel-default">
                  <p className="cancel-default">จำนวนต่ำสุด</p>
                </div>
                <div className="grid_2 pull_0">
                  <input type="text" className="cancel-default" defaultValue={props.info_part_show.stock_min} disabled="disabled"></input>
                </div>
                <div className="grid_1 ml-0 pull_0">

                </div>
              </div>
            </div>

            <div className="grid_12">
              <div className="float-right">
                <div className="grid_2 cancel-default">
                  <p className="cancel-default">จำนวนสูงสุด</p>
                </div>
                <div className="grid_2 pull_0">
                  <input type="text" className="cancel-default" defaultValue={props.info_part_show.stock_max} disabled="disabled"></input>
                </div>
                <div className="grid_1 ml-0 pull_0">

                </div>
              </div>
            </div>

            <div className="grid_12 mt-2">
              <div className="grid_2 cancel-default">
                <p className="cancel-default">Valuation Method</p>
              </div>
              <div className="grid_3 pull_0">
                <select className="edit-select" style={{ marginTop: "0" }} disabled="disabled">
                  <option defaultValue={props.info_part_show.valuation_method}>{props.info_part_show.valuation_method}</option>
                </select>
              </div>
            </div>

            <div className="grid_12 mt-1" style={{ paddingRight: "px" }}>
              <table className="table-many-column">
                <thead>
                  <tr>
                    <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                    <th className="font" style={{ minWidth: "130px" }}>เลขที่คลัง</th>
                    <th className="font" style={{ minWidth: "250px" }}>ชื่อคลัง</th>
                    <th className="font text-center" style={{ minWidth: "80px" }}>คงคลัง</th>
                    <th className="font text-center" style={{ minWidth: "80px" }}>รอส่งมอบ</th>
                    <th className="font text-center" style={{ minWidth: "80px" }}>ระหว่างการจัดซื้อ</th>
                    <th className="font text-center" style={{ minWidth: "80px" }}>จำนวนสุทธิ</th>
                    <th className="font blue text-center" style={{ minWidth: "80px" }}>ของเสีย</th>
                    <th className="font blue text-center" style={{ minWidth: "80px" }}>ส่งซ่อม</th>
                    <th className="font blue text-center" style={{ minWidth: "80px" }}>ของเก่าพร้อมใช้งาน</th>
                    <th className="font blue text-center" style={{ minWidth: "80px" }}>ซาก</th>
                  </tr>
                </thead>
                <tbody>
                  {props.table_list_show.map(function (table_list_show, index) {
                    return (
                      <tr>
                        <th className="edit-padding text-center">{index+1}</th>
                        <td className="edit-padding">{table_list_show.no_inventory}</td>
                        <td className="edit-padding">{table_list_show.name_inventory}</td>
                        <td className="edit-padding text-center disable">{table_list_show.stock}</td>
                        <td className="edit-padding text-center disable">{table_list_show.wait_send}</td>
                        <td className="edit-padding text-center disable">{table_list_show.wait_po}</td>
                        <td className="edit-padding text-center disable">{table_list_show.real_stock}</td>
                        <td className="edit-padding text-center blue font-red">{table_list_show.broken}</td>
                        <td className="edit-padding text-center blue">{table_list_show.send_fix}</td>
                        <td className="edit-padding text-center blue">{table_list_show.old_part}</td>
                        <td className="edit-padding text-center blue">{table_list_show.carcass}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="grid_12 mt-2" style={{ paddingRight: "px" }}>
              <button type="button" className="button-gray float-right" disabled="disabled">ตั้งเป็นคลังตั้งต้น</button>
            </div>

          </div>

          {/* Attachment Tab */}
          <div id="attachment_content" className="tabcontent">
            <Files />
          </div>
          </div>
        </div>
       {/* </div > */}
    </>
)

const mapStateToProps = (state) => {
  var action = state.toolbar.mode;
  state = state.item_master.temp_reducer;
  return ({
  actionMode: action,
  info_part_show: state.info_part_show,
  parent_unit_part: state.parent_unit_part,
  table_list_show: state.table_list_show,
})
}
const mapDispatchToProps = (dispatch) => ({
  // onChangeTotal: (e) => dispatch(onChangeTotal(e)),
})
export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);

// export const onChangeTotal = (e) => {
//   return {
//     type: "CHANGE TOTAL",
//     value: e.target.value
//   }
// }
