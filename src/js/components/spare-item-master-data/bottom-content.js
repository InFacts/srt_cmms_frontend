import React from 'react';

import Document from '../../../images/document.svg'

import '../../../css/style.css'
import '../../../css/table.css';

class BottomContent extends React.Component {

  render() {
    return (
      <div id="blackground-gray">
        <div className="container_12 clearfix">
          <div className="grid_12 ">

            <div id="ทั่วไป" className="tabcontent">

              <div className="grid_12 mt-3">
                <div className="grid_2 cancel-default">
                  <p className="cancel-default">ชื่อย่อหน่วยนับการนำเข้า </p>
                </div>
                <div className="grid_2">
                  <input type="text" className="cancel-default"></input>
                </div>
                <div className="grid_1 ml-0">
                  <button class="p-button--neutral edit">...</button>
                </div>

                <div className="float-right">
                  <div className="grid_2 cancel-default">
                    <p className="cancel-default">ขั้นต่ำการสั่งซื้อ</p>
                  </div>
                  <div className="grid_2 pull_0">
                    <input type="text" className="cancel-default"></input>
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
                  <input type="text" className="cancel-default"></input>
                </div>

                <div className="float-right">
                  <div className="grid_2 cancel-default">
                    <p className="cancel-default">Lead Time</p>
                  </div>
                  <div className="grid_2 pull_0">
                    <input type="text" className="cancel-default"></input>
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
                  <input type="text" className="cancel-default"></input>
                </div>
                <div className="grid_1 ml-0">
                  <p className="cancel-default">Pack </p>
                </div>

                <div className="float-right">
                  <div className="grid_2 cancel-default">
                    <p className="cancel-default">Tolerance Days </p>
                  </div>
                  <div className="grid_2 pull_0">
                    <input type="text" className="cancel-default"></input>
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
                <div className="grid_10">
                  <textarea className="edit" name="Text1" cols="40" rows="2"></textarea>
                </div>
              </div>

            </div>

            <div id="คลัง" className="tabcontent">

              <div className="grid_12 mt-3">
                <div className="grid_2 cancel-default">
                  <p className="cancel-default">ชื่อย่อหน่วยนับ </p>
                </div>
                <div className="grid_2 pull_0">
                  <input type="text" className="cancel-default"></input>
                </div>
                <div className="grid_1 ml-0 pull_0">
                  <button class="p-button--neutral edit">...</button>
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
                  <input type="text" className="cancel-default"></input>
                </div>
                <div className="grid_1 ml-0">

                </div>

                <div className="float-right">
                  <div className="grid_2 cancel-default">
                    <p className="cancel-default">จำนวนที่ต้องการ</p>
                  </div>
                  <div className="grid_2 pull_0">
                    <input type="text" className="cancel-default"></input>
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
                    <input type="text" className="cancel-default"></input>
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
                    <input type="text" className="cancel-default"></input>
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
                  <select className="edit-select" style={{ marginTop: "0" }}>
                    <option defaultValue="0"></option>
                    <option defaultValue="1">Cosmic Cuttlefish</option>
                    <option defaultValue="2">Bionic Beaver</option>
                    <option defaultValue="3">Xenial Xerus</option>
                  </select>
                </div>
              </div>

              <div className="grid_12 mt-1" style={{ paddingRight: "10px" }}>
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
                      <th className="font blue" style={{ minWidth: "80px" }}>ของเสีย</th>
                      <th className="font blue" style={{ minWidth: "80px" }}>ส่งซ่อม</th>
                      <th className="font blue" style={{ minWidth: "80px" }}>ของเก่าพร้อมใช้งาน</th>
                      <th className="font blue" style={{ minWidth: "80px" }}>ซาก</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="edit-padding text-center" style={{ minWidth: "30px" }}>1</th>
                      <td className="edit-padding" style={{ minWidth: "130px" }}>
                        <button type="button" class="button-for-table" id="showModal2" aria-controls="modal2"><i className="fas fa-arrow-right" style={{ color: "#FFCB21" }} id="showModal2" aria-controls="modal2"></i></button>
                        <input type="text" defaultValue="SIG 003" className="cancel-default-for-table"></input>
                      </td>
                      <td className="edit-padding" style={{ minWidth: "250px" }}>คลังพัสดุส่วนกลางบางซื่อ</td>
                      <td className="edit-padding text-center disable" style={{ minWidth: "80px" }} >10</td>
                      <td className="edit-padding text-center disable" style={{ minWidth: "80px" }} >10</td>
                      <td className="edit-padding text-center disable" style={{ minWidth: "80px" }} >10</td>
                      <td className="edit-padding text-center disable" style={{ minWidth: "80px" }} >10</td>
                      <td className="edit-padding text-center blue font-red" style={{ minWidth: "80px" }} >10</td>
                      <td className="edit-padding text-center blue" style={{ minWidth: "80px" }} >10</td>
                      <td className="edit-padding text-center blue" style={{ minWidth: "80px" }} >10</td>
                      <td className="edit-padding text-center blue" style={{ minWidth: "80px" }} >10</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid_12 mt-2" style={{ paddingRight: "10px" }}>
                  <button className="button-gray float-right">ตั้งเป็นคลังตั้งต้น</button>
              </div>

            </div>

            <div id="แนบไฟล์" className="tabcontent">
              <h4 className="head-title-bottom mt-2">ข้อมูลแนบไฟล์</h4>
              <div className="u-clearfix">
                <div className="u-float-left">
                  <label className="p-form__label" ><p className="top-text">ไฟล์เอกสาร</p></label>
                </div>
                <div className=" u-float-right">
                  <input id="fileButton" type="file" hidden />
                  <label><p className="top-text">แนบไฟล์ +</p></label>
                </div>
              </div>
              <div className="dropZone" >
                <div className="grid_12">
                  <img src={Document} alt="Generic placeholder thumbnail" height="100px" />
                </div>
                <div className="grid_12 top-text">ไม่พบไฟล์เอกสาร</div>
                <div className="grid_12 top-text">คลิกที่ "+" ในการแนบเอกสาร</div>
              </div>
            </div>

          </div>
        </div>
      </div >
    )
  };
}

export default BottomContent;
