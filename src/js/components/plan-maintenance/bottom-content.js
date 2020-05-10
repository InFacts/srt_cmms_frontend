import React from 'react';
import { connect } from 'react-redux'
import '../../../css/style.css'
import '../../../css/tabs.css'
import '../../../css/grid12.css';

class BottomContent extends React.Component {

  render() {
    return (
      <form>
        <div id="blackground-gray">
          <div className="container_12 clearfix">
            <div className="grid_12 ">

              <div id="แผนการดำเนินงาน" className="tabcontent">

                <div className="grid_12 mt-2" style={{ paddingRight: "10px"}}>
                  <table className="table-many-column">
                    <thead>
                    <tr>
                        <th className="font text-center" style={{ minWidth: "30px" }}></th>
                        <th className="font text-center" style={{ minWidth: "200px" }}></th>
                        <th className="font text-center" style={{ minWidth: "100px" }}></th>
                        <th className="font text-center" colSpan="5">การดำเนินการ</th>
                        <th className="font text-center" style={{ minWidth: "80px" }}>สรุปรวม</th>
                        <th className="font text-center" style={{ minWidth: "200px" }}></th>
                      </tr>
                      <tr>
                        <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                        <th className="font text-center" style={{ minWidth: "200px" }}>รายละเอียด</th>
                        <th className="font text-center" style={{ minWidth: "100px" }}>หน่วย</th>
                        <th className="font text-center" style={{ minWidth: "80px" }}>ตอน นตส.พบ.</th>
                        <th className="font text-center" style={{ minWidth: "80px" }}>ตอน นตส.หห.</th>
                        <th className="font text-center" style={{ minWidth: "80px" }}>ตอน นตส.จข.</th>
                        <th className="font text-center" style={{ minWidth: "80px" }}>ตอน นตส.พญ.</th>
                        <th className="font text-center" style={{ minWidth: "80px" }}>ตอน นตส.ชพ.</th>
                        <th className="font text-center" style={{ minWidth: "80px" }}>แขวง</th>
                        <th className="font text-center" style={{ minWidth: "200px" }}>ตอน นตส.ชพ.</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="edit-padding" style={{ minWidth: "30px" }}>1</td>
                        <td className="edit-padding" style={{ minWidth: "200px" }}>งานบำรุงรักษาตามวาระที่สถานี (จำนวนสถานี...</td>
                        <td className="edit-padding" style={{ minWidth: "100px" }}>
                          <select className="edit-select-table">
                            <option defaultValue="1">สถานี</option>
                            <option defaultValue="2">แห่ง</option>
                          </select>
                        </td>
                        <td className="edit-padding text-center" style={{ minWidth: "80px" }}>11</td>
                        <td className="edit-padding text-center" style={{ minWidth: "80px" }}>11</td>
                        <td className="edit-padding text-center" style={{ minWidth: "80px" }}>9</td>
                        <td className="edit-padding text-center" style={{ minWidth: "80px" }}>9</td>
                        <td className="edit-padding text-center" style={{ minWidth: "80px" }}>9</td>
                        <td className="edit-padding text-center" style={{ minWidth: "80px" }}>49</td>
                        <td className="edit-padding" style={{ minWidth: "200px" }}></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">หมายเหตุ</p></div>
                  <textarea className="edit grid_8  pull_0 " name="Text1" cols="40" rows="2"></textarea>
                </div>
              </div>

              <div id="อุปกรณ์ที่ต้องนำไปปฎิบัติงาน" className="tabcontent">
              <div className="grid_12 mt-2" style={{ paddingRight: "10px"}}>
                  <table className="table-many-column">
                    <thead>
                      <tr>
                        <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                        <th className="font text-center" style={{ minWidth: "150px" }}>เลขที่อุปกรณ์</th>
                        <th className="font text-center" style={{ minWidth: "300px" }}>รายละเอียด</th>
                        <th className="font text-center" style={{ minWidth: "80px" }}>จำนวน</th>
                        <th className="font text-center" style={{ minWidth: "100px" }}>หน่วย</th>
                        <th className="font text-center" style={{ minWidth: "400px" }}>หมายเหตุ</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="edit-padding" style={{ minWidth: "30px" }}>1</td>
                        <td className="edit-padding" style={{ minWidth: "150px" }}>tool 233</td>                        
                        <td className="edit-padding" style={{ minWidth: "300px" }}>แผนหินเจียร์มือขนาด</td>
                        <td className="edit-padding text-center" style={{ minWidth: "80px" }}>9</td>
                        <td className="edit-padding" style={{ minWidth: "100px" }}>
                          <select className="edit-select-table">
                            <option defaultValue="1">แผ่น</option>
                            <option defaultValue="2">แห่ง</option>
                          </select>
                        </td>
                        <td className="edit-padding" style={{ minWidth: "400px" }}></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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


})


const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);
