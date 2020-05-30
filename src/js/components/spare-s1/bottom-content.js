import React from 'react';
import { connect } from 'react-redux'

import '../../../css/style.css'

class BottomContent extends React.Component {

  render() {
    return (
      <form>
        <div id="blackground-gray">
          <div className="container_12 clearfix">
            <div className="grid_12 ">
              <div id="รายงาน" className="tabcontent">

                <table className="table-many-column mt-2">
                  <thead>
                    <tr>
                      <th className="font text-center" style={{ minWidth: "30px" }}>ลำดับที่</th>
                      <th className="font" style={{ minWidth: "350px" }}>รายการสิ่งของ</th>
                      <th className="font text-center" style={{ minWidth: "150px" }}>เลขที่สิ่งของคงคลัง</th>
                      <th className="font text-center" style={{ minWidth: "80px" }}>หน่วย</th>
                      <th className="font text-center" style={{ minWidth: "100px" }}>จำนวนเหลือ ณ วันนี้</th>
                      <th className="font text-center" style={{ minWidth: "90px" }}>รวมเป็นเงิน</th>
                      <th className="font text-center" style={{ minWidth: "80px" }}>ราคาต่อหน่วย</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.line_item_s1.map(function (line_item_s1, index) {
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
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  };
}
const mapStateToProps = (state) => ({
  actionMode: state.action,
  line_item_s1: state.line_item_s1
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);