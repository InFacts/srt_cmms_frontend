import React from 'react';
import Document from '../../../images/document.svg'
import '../../../css/style.css'
import '../../../css/tabs.css'
import '../../../css/grid12.css';


class BottomContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fileUploadState: "",
      file_show: [
      ],
      number: 0,
    }
    this.fileUploadButton = this.fileUploadButton.bind(this);

  }

  componentDidMount() {
    document.getElementById("defaultOpen").click();
  }


  fileUploadButton = () => {
    document.getElementById('fileButton').click();
    document.getElementById('fileButton').onchange = () => {
      this.setState({ fileUploadState: document.getElementById('fileButton').value });
      this.setState({ number: this.state.number + 1 });

      var myArray = this.state.file_show;
      myArray.push(
        {
          "des": this.state.fileUploadState
        }
      )
      this.setState({ file_show: myArray });

    }
  }

  render() {
    return (
      <form>
        <div id="blackground-gray">
          <div className="container_12 clearfix">
            <div className="grid_12 ">

              <div id="ทั่วไป" className="tabcontent">

                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">ชื่อหน่วยนับการนำเข้า</p></div>
                  <div className="grid_3 ">
                    <input className="cancel-default grid_2 mt-1 " disabled="disabled" type="text" />
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">จำนวนต่อหน่วยนำเข้า</p></div>
                  <div className="grid_3 ">
                    <input className="cancel-default grid_2 mt-1 " disabled="disabled" type="text" />
                    <p className="cancel-default grid_1 float-right ">Pack</p>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">ค่าเลื่อนต่อปี</p></div>
                  <div className="grid_3 ">
                    <input className="cancel-default grid_2 mt-1 " type="text" />
                    <p className="cancel-default grid_1 float-right ">บาท</p>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">ค่าเลื่อนต่อปี</p></div>
                  <div className="grid_2 ">
                    <select className="edit-select grid_2 " >
                      <option defaultValue="0"></option>
                      <option defaultValue="1">Cosmic Cuttlefish</option>
                      <option defaultValue="2">Bionic Beaver</option>
                      <option defaultValue="3">Xenial Xerus</option>
                    </select>
                  </div>
                </div>
                <div className="grid_12 mt-5">
                  <div className="grid_2">
                    <input className="d-inline" type="radio" name="RadioOptions" id="Radio1" value="option1" />
                    <label htmlFor="Radio1" className="cancel-default d-inline">เปิดการใช้งาน</label>
                  </div>
                </div>
                <div className="grid_12 ">
                  <div className="grid_2">
                    <input className="d-inline" type="radio" name="RadioOptions2" id="Radio2" value="option2" />
                    <label htmlFor="Radio1" className="cancel-default d-inline">ปิดการใช้งาน</label>
                  </div>
                </div>
                <div className="grid_12 mt-1">
                  <div className="grid_2"><p className="cancel-default">หมายเหตุ</p></div>
                  <div className="grid_8">
                    <textarea className="edit" name="Text1" cols="40" rows="2"></textarea>
                  </div>
                </div>

              </div>

              <div id="แผนบำรุงรักษา" className="tabcontent">
                <div className="grid_12">
                  <div className="grid_2 "><p className="cancel-default">กลุ่มของการบำรุงรักษา</p></div>
                  <div className="grid_3">
                    <input className="cancel-default grid_2 mt-1 " type="text" />
                    <button className="button-white edit mt-1 grid_1 float-right" type="button">...</button>
                  </div>
                </div>

                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">ชนิดของการบำรุงรักษา</p></div>
                  <div className="grid_3 ">
                    <input className="cancel-default grid_2 mt-1 " type="text" />
                    <button className="button-white edit mt-1 grid_1 float-right" type="button">...</button>
                  </div>
                </div>

                <div className="grid_12 mt-2">
                  <table className="table-many-column">
                    <thead>
                      <tr>
                        <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                        <th className="font" style={{ minWidth: "150px" }}>ชื่อรายการบำรุงรักษา</th>
                        <th className="font text-center" style={{ minWidth: "250px" }}>ความถี่ของการบำรุงรักษา</th>
                        <th className="font" style={{ minWidth: "400px" }}>หมายเหตุ</th>
                        <th className="font" style={{ minWidth: "80px" }}>action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th className="edit-padding text-center" style={{ minWidth: "30px" }}>1</th>
                        <td className="edit-padding" style={{ minWidth: "150px" }}>แผนซ่อม A</td>
                        <td className="edit-padding text-center" style={{ minWidth: "250px" }}>2 ครั้งต่อเดือน</td>
                        <td className="edit-padding" style={{ minWidth: "400px" }}>10</td>
                        <td className="edit-padding" style={{ minWidth: "80px" }}>
                          <button className="button-blue">แก้ไข</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div id="แนบไฟล์" className="tabcontent">
                <h4 className="head-title-bottom mt-2">ข้อมูลแนบไฟล์</h4>
                <div className="u-clearfix">
                  <div className="u-float-left">
                    <label className="p-form__label" ><span className="top-text">ไฟล์เอกสาร</span></label>
                  </div>
                  <div className=" u-float-right">
                    <input type="file" hidden />
                    <label><span className="top-text">แนบไฟล์ +</span></label>
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

              <div id="หมายเหตุ" className="tabcontent">
                <div className="grid_12 mt-2">
                  <div className="grid_2">
                    <p className="cancel-default">หมายเหตุ</p>
                  </div>
                  <div className="grid_3">
                    <div>
                      <textarea className="cancel-table " cols="24" rows="4" style={{ width: "45rem", height: "15rem", resize: "none" }}></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div id="รายการสินทรัพย์" className="tabcontent">
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">ชื่อย่อหน่วยนับ</p></div>
                  <div className="grid_3">
                    <input className="cancel-default grid_2 mt-1 " type="text" />
                    <button className="button-white edit mt-1 grid_1 float-right" type="button">...</button>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">ชื่อหน่วยนับ</p></div>
                  <div className="grid_2 ">
                    <input className="cancel-default grid_2 mt-1 " disabled="disabled" type="text" />
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">ค่าเลื่อนต่อปี</p></div>
                  <div className="grid_2 ">
                    <select className="edit-select grid_3 " >
                      <option defaultValue="0"></option>
                      <option defaultValue="1">Cosmic Cuttlefish</option>
                      <option defaultValue="2">Bionic Beaver</option>
                      <option defaultValue="3">Xenial Xerus</option>
                    </select>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">Valuation Method</p></div>
                  <div className="grid_2 ">
                    <select className="edit-select grid_3 " >
                      <option defaultValue="0"></option>
                      <option defaultValue="1">Cosmic Cuttlefish</option>
                      <option defaultValue="2">Bionic Beaver</option>
                      <option defaultValue="3">Xenial Xerus</option>
                    </select>
                  </div>
                </div>

                <div className="grid_12 mt-2">
                  <table className="table-many-column grid_12">
                    <thead>
                      <tr>
                        <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                        <th className="font" style={{ minWidth: "130px" }}>เลขที่สินทรัพย์</th>
                        <th className="font" style={{ minWidth: "250px" }}>รายละเอียด</th>
                        <th className="font text-center" style={{ minWidth: "150px" }}>ที่อยู่ปัจจุบัน</th>
                        <th className="font text-center" style={{ minWidth: "100px" }}>สถานะ</th>
                        <th className="font text-center" style={{ minWidth: "80px" }}>มูลค่า</th>
                        <th className="font text-center" style={{ minWidth: "120px" }}>จำนวน</th>
                        <th className="font text-center" style={{ minWidth: "300px" }}>หมายเหตุ</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th className="edit-padding text-center" style={{ minWidth: "30px" }}>1</th>
                        <td className="edit-padding" style={{ minWidth: "130px" }}>001</td>
                        <td className="edit-padding text-left" style={{ minWidth: "250px" }}>10</td>
                        <td className="edit-padding text-center" style={{ minWidth: "150px" }}>คลังพัสดุส่วนกลางบางซื่อ</td>
                        <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                          <select className="edit-select-table">
                            <option defaultValue="1">เสียหาย</option>
                            <option defaultValue="2">ของเก่า</option>
                          </select>
                        </td>
                        <td className="edit-padding text-center" style={{ minWidth: "80px" }}>1</td>
                        <td className="edit-padding text-center" style={{ minWidth: "120px" }}>1</td>
                        <td className="edit-padding text-left" style={{ minWidth: "300px" }}></td>
                      </tr>
                      <tr>
                      <th className="edit-padding text-center" style={{ minWidth: "30px" }}></th>
                        <td className="edit-padding" style={{ minWidth: "130px" }}></td>
                        <td className="edit-padding text-left" style={{ minWidth: "250px" }}></td>
                        <td className="edit-padding text-center" style={{ minWidth: "150px" }}></td>
                        <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                          <select className="edit-select-table">
                            {/* <option defaultValue="1">เสียหาย</option>
                            <option defaultValue="2">ของเก่า</option> */}
                          </select>
                        </td>
                        <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                        <td className="edit-padding text-center" style={{ minWidth: "120px" }}></td>
                        <td className="edit-padding text-left" style={{ minWidth: "300px" }}></td>
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

export default BottomContent;
