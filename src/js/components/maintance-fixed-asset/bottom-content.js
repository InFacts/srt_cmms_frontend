import React from 'react';
import { connect } from 'react-redux'
import Document from '../../../images/document.svg'

import '../../../css/style.css'

class BottomContent extends React.Component {

  render() {
    return (
      <form>
        <div id="blackground-gray">
          <div className="container_12 clearfix">
            <div className="grid_12 ">

              <div id="ข้อมูลการทำวาระ" className="tabcontent">

                <div className="grid_12 mt-3">
                  <div className="grid_2 cancel-default">
                    <p className="cancel-default">กลุ่มของการบำรุงรักษา </p>
                  </div>
                  <div className="grid_5">
                    <input type="text" className="cancel-default"></input>
                  </div>
                  <div className="grid_1 ml-0">
                    <button class="p-button--neutral edit">...</button>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_2 cancel-default">
                    <p className="cancel-default">ชนิดของกรบำรุงรักษา  </p>
                  </div>
                  <div className="grid_5">
                    <input type="text" className="cancel-default"></input>
                  </div>
                  <div className="grid_1 ml-0">
                    <button class="p-button--neutral edit">...</button>
                  </div>
                </div>

                <div className="grid_12">
                  <div className="grid_2 cancel-default">
                    <p className="cancel-default">หน่วย </p>
                  </div>
                  <div className="grid_5">
                    <input type="text" className="cancel-default"></input>
                  </div>

                </div>

                <div className="grid_12">
                  <div className="grid_2 cancel-default">
                    <p className="cancel-default">ความถี่การซ่อมบำรุง </p>
                  </div>
                  <div className="grid_2">
                    <input type="text" className="cancel-default"></input>
                  </div>
                  <div className="grid_1  ">
                    <p className="cancel-default">ครั้งต่อ </p>
                  </div>
                  <div className="grid_2">
                    <input type="text" className="cancel-default"></input>
                  </div>
                </div>


                <div className="grid_12 mt-5 mb-1">
                  <div className="grid_1"><p className="cancel-default">หมายเหตุ</p></div>
                  <div className="grid_10">
                    <textarea className="edit" name="Text1" cols="40" rows="2"></textarea>
                  </div>
                </div>


                <div className="grid_12">
                  <div className="p-search-box cancel-margin grid_3  float-right">
                    <select className="edit-select-top" disabled="disabled">

                    </select>
                  </div>
                  <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">สถานะการดำเนินการ</p></div>
                </div>

                <div className="grid_12">
                  <div className="p-search-box cancel-margin grid_3  float-right">
                    <select className="edit-select-top" disabled="disabled">

                    </select>
                  </div>
                  <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">สถานะสินทรัพย์</p></div>
                </div>




              </div>

              <div id="ระบุผู้ปฎิบัติงาน" className="tabcontent">

                <h3 className="head-title-bottom mt-2">ผู้ปฎิบัติงาน</h3>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">ผู้ควบคุมตรวจสอบชื่อ</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_4 mt-1"></input>
                    <select className="edit-select grid_3 float-right" >

                    </select>
                    <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
                  </div>
                </div>

                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">ดำเนินการแก้ไขชื่อ</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_4 mt-1"></input>
                    <select className="edit-select grid_3 float-right" >

                    </select>
                    <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
                  </div>
                </div>

                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
                  <div className="grid_8 pull_0" >
                    <input type="text" className="cancel-default grid_4 mt-1"></input>
                    <select className="edit-select grid_3 float-right" >

                    </select>
                    <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_4 mt-1"></input>
                    <select className="edit-select grid_3 float-right" >

                    </select>
                    <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_4 mt-1"></input>
                    <select className="edit-select grid_3 float-right" >

                    </select>
                    <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_4 mt-1"></input>
                    <select className="edit-select grid_3 float-right" >

                    </select>
                    <p className="cancel-default grid_1 float-right">ตำแหน่ง</p>
                  </div>
                </div>


              </div>

              <div id="อุปกรณ์ที่ต้องนำไปปฎิบัติงาน" className="tabcontent">
                <table className="table-many-column mt-2">
                  <thead>
                    <tr>
                      <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                      <th className="font" style={{ minWidth: "130px" }}>เลขที่อุปกรณ์</th>
                      <th className="font" style={{ minWidth: "250px" }}>รายละเอียด</th>
                      <th className="font text-center" style={{ minWidth: "150px" }}>จำนวน</th>
                      <th className="font text-center" style={{ minWidth: "100px" }}>หน่วย</th>
                      <th className="font text-center" style={{ minWidth: "500px" }}>หมายเหตุ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="edit-padding text-center" style={{ minWidth: "30px" }}>1</th>
                      <td className="edit-padding" style={{ minWidth: "130px" }}>tool 223</td>
                      <td className="edit-padding text-left" style={{ minWidth: "250px" }}>แผนหิน</td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
                        <select className="edit-select-table">
                          <option defaultValue="1">1</option>
                          <option defaultValue="2">2</option>
                        </select>
                      </td>
                      <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                        แผ่น
                      </td>
                      <td className="edit-padding text-left" style={{ minWidth: "300px" }}></td>
                    </tr>

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

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);