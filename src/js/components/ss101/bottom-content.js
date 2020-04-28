import React from 'react';

import Document from '../../../images/document.svg'

import '../../../css/style.css'
import '../../../css/table.css';

class BottomContent extends React.Component {

  render() {
    return (
      <form>
        <div id="blackground-gray">
          <div className="container_12 clearfix">
            <div className="grid_12 ">

              <div id="อาการเสีย" className="tabcontent">
                <h3 className="head-title-bottom mt-2">ข้อมูลเกี่ยวกับอาการขัดข้อง</h3>
                <div className="grid_12">
                  <div className="grid_3"><p className="cancel-default">เดินทางโดย:</p></div>
                  <div className="grid_7 pull_0">
                    <select className="edit-select" >
                      <option defaultValue="0"></option>
                      <option defaultValue="1">Cosmic Cuttlefish</option>
                      <option defaultValue="2">Bionic Beaver</option>
                      <option defaultValue="3">Xenial Xerus</option>
                    </select>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_3"><p className="cancel-default">ออกเดินทาง:</p></div>
                  <div className="grid_7 pull_0">
                    <input type="date" className="cancel-default grid_3 mt-1"></input>
                    <input type="date" className="cancel-default grid_3 mt-1 float-right"></input>
                    <p className="cancel-default grid_1 float-right">เวลา:</p>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_3"><p className="cancel-default">เดินทางถึง:</p></div>
                  <div className="grid_7 pull_0">
                    <input type="date" className="cancel-default grid_3 mt-1"></input>
                    <input type="date" className="cancel-default grid_3 mt-1 float-right"></input>
                    <p className="cancel-default grid_1 float-right">เวลา:</p>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_3"><p className="cancel-default">วันเวลาที่แล้วเสร็จ:</p></div>
                  <div className="grid_7 pull_0">
                    <input type="date" className="cancel-default grid_3 mt-1"></input>
                    <input type="date" className="cancel-default grid_3 mt-1 float-right"></input>
                    <p className="cancel-default grid_1 float-right">เวลา:</p>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_3"><p className="cancel-default">ระบบตรวจซ่อม:</p></div>
                  <div className="grid_7 pull_0">
                    <select className="edit-select grid_3" >
                      <option defaultValue="0"></option>
                      <option defaultValue="1">Cosmic Cuttlefish</option>
                      <option defaultValue="2">Bionic Beaver</option>
                      <option defaultValue="3">Xenial Xerus</option>
                    </select>
                    <select className="edit-select grid_3 float-right" >
                      <option defaultValue="0"></option>
                      <option defaultValue="1">Cosmic Cuttlefish</option>
                      <option defaultValue="2">Bionic Beaver</option>
                      <option defaultValue="3">Xenial Xerus</option>
                    </select>
                    <p className="cancel-default grid_1 float-right">ชนิด:</p>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_3"><p className="cancel-default">รายการที่ซ่อม:</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default mt-1"></input>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_3"><p className="cancel-default">ที่ตั้งอุปกรณ์ที่ทำการตรวจซ่อม:</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default mt-1"></input>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_3"><p className="cancel-default">ชื่ออุปกรณ์ที่บำรุงรักษา:</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default mt-1"></input>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_3"><p className="cancel-default">สาเหตุและอาการเสียโดยสรุป:</p></div>
                  <div className="grid_8 pull_0">
                    <textarea className="edit" name="Text1" cols="40" rows="2"></textarea>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_3"><p className="cancel-default">ขบวนรถที่:</p></div>
                  <div className="grid_8 pull_0">
                    <p className="cancel-default grid_1 float-right">นาที:</p>
                    <input type="text" className="cancel-default mt-1 grid_3"></input>
                    <input type="text" className="cancel-default mt-1 grid_2 float-right"></input>
                    <p className="cancel-default grid_2 float-right">เสียเวลาเพราะเหตุนี้:</p>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_3"><p className="cancel-default">สรุปการแก้ไขและการซ่อมแซม:</p></div>
                  <div className="grid_8 pull_0">
                    <textarea className="edit" name="Text1" cols="40" rows="2"></textarea>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_3"><p className="cancel-default">ยังไม่ได้จัดการแก้ไขเพราะ:</p></div>
                  <div className="grid_7 pull_0">
                    <select className="edit-select" >
                      <option defaultValue="0"></option>
                      <option defaultValue="1">Cosmic Cuttlefish</option>
                      <option defaultValue="2">Bionic Beaver</option>
                      <option defaultValue="3">Xenial Xerus</option>
                    </select>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_3"><p className="cancel-default">สรุปการแก้ไขและการซ่อมแซม:</p></div>
                  <div className="grid_8 pull_0">
                    <textarea className="edit" name="Text1" cols="40" rows="2"></textarea>
                  </div>
                </div>
              </div>

              <div id="ผู้ที่เกี่ยวข้อง" className="tabcontent">
                <h3 className="head-title-bottom mt-2">ผู้ปฎิบัติงาน</h3>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">ผู้ควบคุมทดสอบชื่อ:</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_4 mt-1"></input>
                    <select className="edit-select grid_3 float-right" >
                      <option defaultValue="0"></option>
                      <option defaultValue="1">Cosmic Cuttlefish</option>
                      <option defaultValue="2">Bionic Beaver</option>
                      <option defaultValue="3">Xenial Xerus</option>
                    </select>
                    <p className="cancel-default grid_1 float-right">ตำแหน่ง:</p>
                  </div>
                </div>

                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">ดำเนินการแก้ไขชื่อ:</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_4 mt-1"></input>
                    <select className="edit-select grid_3 float-right" >
                      <option defaultValue="0"></option>
                      <option defaultValue="1">Cosmic Cuttlefish</option>
                      <option defaultValue="2">Bionic Beaver</option>
                      <option defaultValue="3">Xenial Xerus</option>
                    </select>
                    <p className="cancel-default grid_1 float-right">ตำแหน่ง:</p>
                  </div>
                </div>

                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน:</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_4 mt-1"></input>
                    <select className="edit-select grid_3 float-right" >
                      <option defaultValue="0"></option>
                      <option defaultValue="1">Cosmic Cuttlefish</option>
                      <option defaultValue="2">Bionic Beaver</option>
                      <option defaultValue="3">Xenial Xerus</option>
                    </select>
                    <p className="cancel-default grid_1 float-right">ตำแหน่ง:</p>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน:</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_4 mt-1"></input>
                    <select className="edit-select grid_3 float-right" >
                      <option defaultValue="0"></option>
                      <option defaultValue="1">Cosmic Cuttlefish</option>
                      <option defaultValue="2">Bionic Beaver</option>
                      <option defaultValue="3">Xenial Xerus</option>
                    </select>
                    <p className="cancel-default grid_1 float-right">ตำแหน่ง:</p>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน:</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_4 mt-1"></input>
                    <select className="edit-select grid_3 float-right" >
                      <option defaultValue="0"></option>
                      <option defaultValue="1">Cosmic Cuttlefish</option>
                      <option defaultValue="2">Bionic Beaver</option>
                      <option defaultValue="3">Xenial Xerus</option>
                    </select>
                    <p className="cancel-default grid_1 float-right">ตำแหน่ง:</p>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">รายชื่อเพื่อนร่วมงาน:</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_4 mt-1"></input>
                    <select className="edit-select grid_3 float-right" >
                      <option defaultValue="0"></option>
                      <option defaultValue="1">Cosmic Cuttlefish</option>
                      <option defaultValue="2">Bionic Beaver</option>
                      <option defaultValue="3">Xenial Xerus</option>
                    </select>
                    <p className="cancel-default grid_1 float-right">ตำแหน่ง:</p>
                  </div>
                </div>
              </div>

              <div id="รายการค่าเสียหาย" className="tabcontent">
                <h4 className="head-title-bottom mt-2">ข้อมูลรายการค่าเสียหาย</h4>

                <table className="table-many-column">
                  <thead>
                    <tr>
                      <th className="font text-center" style={{ minWidth: "50px" }}>#</th>
                      <th className="font text-center" style={{ minWidth: "300px" }}>รายการ</th>
                      <th className="font text-center" style={{ minWidth: "80px" }}>จำนวน</th>
                      <th className="font text-center" style={{ minWidth: "80px" }}>หน่วย</th>
                      <th className="font text-center" style={{ minWidth: "80px" }}>จำนวนเงิน</th>
                      <th className="font text-center" style={{ minWidth: "80px" }}>เลขที่อุปกรณ์</th>
                      <th className="font text-center" style={{ minWidth: "400px" }}>หมายเหตุ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="edit-padding text-center" style={{ minWidth: "50px" }}>1</td>
                      <td className="edit-padding text-center" style={{ minWidth: "200px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "300px" }}></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div id="แนบไฟล์" className="tabcontent">
                <h4 className="head-title-bottom mt-2">ข้อมูลแนบไฟล์</h4>
                <div className="u-clearfix">
                  <div className="u-float-left">
                    <label className="p-form__label" ><span className="cancel-default2">ไฟล์เอกสาร</span></label>
                  </div>
                  <div className=" u-float-right">
                    <input id="fileButton" type="file" hidden />
                    <label><span className="cancel-default2">แนบไฟล์ +</span></label>
                  </div>
                </div>
                <div className="dropZone" >
                  <div className="grid_12">
                    <img src={Document} alt="Generic placeholder thumbnail" height="100px" />
                  </div>
                  <div className="grid_12 cancel-default2">ไม่พบไฟล์เอกสาร</div>
                  <div className="grid_12 cancel-default2">คลิกที่ "+" ในการแนบเอกสาร</div>
                </div>
              </div>

              <div id="สถานะเอกสาร" className="tabcontent">
                <h4 className="head-title-bottom mt-2">สถานะของเอกสาร</h4>
                <table className="cancel-border">
                  <thead>
                    <tr>
                      <th className="font-for-status" style={{ width: "50px" }}></th>
                      <th className="font-for-status">ตำแหน่ง</th>
                      <th className="font-for-status">หน่วยงาน</th>
                      <th className="font-for-status">ชื่อผู้ลงนาม</th>
                      <th className="font-for-status">วันที่ลงนาม</th>
                      <th className="font-for-status">สถานะ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-for-status" style={{ width: "50px" }}>
                        <i className="fas fa-check-circle" style={{ color: "green" }}></i>
                      </td>
                      <td className="font-for-status">ช่างฝีมือ 6</td>
                      <td className="font-for-status">ตอนหาดใหญ่ (ผู้ขอเบิก)</td>
                      <td className="font-for-status">นายวิชัย ไชยแก้ว</td>
                      <td className="font-for-status">31/07/2018 22:24PM</td>
                      <td className="font-for-status">ลงนามเรียบร้อยแล้ว</td>
                    </tr>
                    <tr>
                      <td className="font-for-status" style={{ width: "50px" }}>
                        <i className="fas fa-check-circle" style={{ color: "gray" }}></i>
                      </td>
                      <td className="font-for-status">สสญ.หม (ผู้ขอเบิก)</td>
                      <td className="font-for-status">แขวงบำรุงรักษาอาณัติสัญญาณหาดใหญ่</td>
                      <td className="font-for-status">นายภาคิน แก้วเมืองสอง</td>
                      <td className="font-for-status">-</td>
                      <td className="font-for-status">รอการอนุมัติ</td>
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

export default BottomContent;
