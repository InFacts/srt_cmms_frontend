import React from 'react';

import '../../../css/style.css'
import '../../../css/grid12.css';

class TopContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
    this.tapChange = this.tapChange.bind(this);
  }

  componentDidMount() {
    document.getElementById("defaultOpen").click();
  }

  tapChange(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  render() {

    return (
      <div>
        <div id="blackground-white">
          <div className="container_12 clearfix">
            <section className="grid_12 ">
              <h4 className="head-title">ออกใบสั่งซ่อมบำรุง</h4>

              <div className="grid_12">
                <div className="grid_3"><p className="top-text">เลขที่เอกสารใบสั่งซ่อมบำรุง</p></div>
                <div >
                  <div className="p-search-box cancel-margin grid_3 pull_0">
                    <input type="search" className="p-search-box__input cancel-default " />
                    <button className="p-search-box__button cancel-padding" ><i className="p-icon--external-link" id="showModal" aria-controls="modal" ></i></button>
                  </div>
                  <div className="p-search-box cancel-margin grid_3  float-right">
                    <input type="date" className="p-search-box__input cancel-default " disabled="disabled" />
                  </div>
                  <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">วันที่ออกเอกสาร</p></div>
                </div>
              </div>


              <div className="grid_12">
                <div className="grid_3"><p className="top-text">เลขที่เอกสารแจ้งเหตุขัดข้อง (ถ้ามี)</p></div>
                <div >
                  <div className="p-search-box cancel-margin grid_3 pull_0">
                    <input type="search" className="p-search-box__input cancel-default " />
                    <button className="p-search-box__button cancel-padding" ><i className="p-icon--external-link" id="showModal2" aria-controls="modal2" ></i></button>
                  </div>
                  <div className="p-search-box cancel-margin grid_3   float-right">
                    <input type="text" className=" p-search-box__input cancel-default  " disabled="disabled" ></input>
                  </div>
                  <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">ผู้สร้างเอกสาร</p></div>
                </div>
              </div>
            </section>

            <div className="grid_12">
              <div className="tab grid_8">
                <button type="button" id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "อาการเสีย")}>อาการเสีย</button>
                <button type="button" className="tablinks" onClick={e => this.tapChange(e, "แนบไฟล์")}>แนบไฟล์</button>
                <button type="button" className="tablinks" onClick={e => this.tapChange(e, "สินทรัพย์ที่เกี่ยวข้อง")}>สินทรัพย์ที่เกี่ยวข้อง</button>
              </div>
            </div>
          </div>
        </div>

        {/* PopUp */}
        <div className="modal" id="modal" style={{ display: "none" }}>
          <div className="gray-board">
            <p className="head-title-modal edit">เลขที่เอกสารใบสั่งซ่อมบำรุง</p>
            <div className="container_12 edit-padding">


              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">เลขที่เอกสาร:</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" />
                </div>
              </div>

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">สถานที่ แขวง:</p></div>
                <div className="grid_8 pull_0">
                  <select className="edit-select-top grid_3 " >
                    <option defaultValue="0"></option>
                    <option defaultValue="1">Cosmic Cuttlefish</option>
                    <option defaultValue="2">Bionic Beaver</option>
                    <option defaultValue="3">Xenial Xerus</option>
                  </select>
                  <select className="edit-select-top grid_3 float-right" >
                    <option defaultValue="0"></option>
                    <option defaultValue="1">Cosmic Cuttlefish</option>
                    <option defaultValue="2">Bionic Beaver</option>
                    <option defaultValue="3">Xenial Xerus</option>
                  </select>
                  <p className="cancel-default grid_2 float-right">สถานที่ ตอน:</p>
                </div>
              </div>
              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">วันที่เริ่มต้น:</p></div>
                <div className="grid_8 pull_0">
                  <input type="date" className="cancel-default grid_3 "></input>
                  <input type="date" className="cancel-default grid_3 float-right"></input>
                  <p className="cancel-default grid_2 float-right">วันที่สิ้นสุด:</p>
                </div>
                <button className="button-blue grid_1 float-right mr-5" type="button">ค้นหา</button>
              </div>

              <div className="grid_12">
                <table className="table-many-column mt-3">
                  <thead>
                    <tr>
                      <th className="font" style={{ minWidth: "150px" }}>เลขที่เอกสาร</th>
                      <th className="font" style={{ minWidth: "150px" }}>ชื่องาน</th>
                      <th className="font" style={{ minWidth: "150px" }}>วันเวลาแจ้งขัดข้อง</th>
                      <th className="font" style={{ minWidth: "150px" }}>ผู้นำเข้าระบบ</th>
                      <th className="font" style={{ minWidth: "150px" }}>สถานที่ แขวน/ตอน</th>
                      <th className="font"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="edit-padding" style={{ minWidth: "150px"}}>1123451</td>
                      <td className="edit-padding" style={{ minWidth: "150px" }}>รถไฟ</td>
                      <td className="edit-padding" style={{ minWidth: "150px" }}>14 เมษ 2563</td>
                      <td className="edit-padding" style={{ minWidth: "150px" }}>นาย ก</td>
                      <td className="edit-padding" style={{ minWidth: "150px" }}>บางแค</td>
                      <td className="edit-padding" style={{ minWidth: "150px" }}>
                        <button className="button-blue">เลือก</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid_12">
                <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modal" id="aria-controls">กลับ</button>
              </div>
            </div>

          </div>
        </div>
      
        <div className="modal" id="modal2" style={{ display: "none" }}>
          <div className="gray-board">
            <p className="head-title-modal edit">เลขที่เอกสารแจ้งเหตุขัดข้อง</p>
            <div className="container_12 edit-padding">


              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">เลขที่เอกสาร:</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" />
                </div>
              </div>

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">สถานที่ แขวง:</p></div>
                <div className="grid_8 pull_0">
                  <select className="edit-select-top grid_3 " >
                    <option defaultValue="0"></option>
                    <option defaultValue="1">Cosmic Cuttlefish</option>
                    <option defaultValue="2">Bionic Beaver</option>
                    <option defaultValue="3">Xenial Xerus</option>
                  </select>
                  <select className="edit-select-top grid_3 float-right" >
                    <option defaultValue="0"></option>
                    <option defaultValue="1">Cosmic Cuttlefish</option>
                    <option defaultValue="2">Bionic Beaver</option>
                    <option defaultValue="3">Xenial Xerus</option>
                  </select>
                  <p className="cancel-default grid_2 float-right">สถานที่ ตอน:</p>
                </div>
              </div>
              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">วันที่เริ่มต้น:</p></div>
                <div className="grid_8 pull_0">
                  <input type="date" className="cancel-default grid_3 "></input>
                  <input type="date" className="cancel-default grid_3 float-right"></input>
                  <p className="cancel-default grid_2 float-right">วันที่สิ้นสุด:</p>
                </div>
                <button className="button-blue grid_1 float-right mr-5" type="button">ค้นหา</button>
              </div>

              <div className="grid_12">
                <table className="table-many-column mt-3">
                  <thead>
                    <tr>
                      <th className="font" style={{ minWidth: "150px" }}>เลขที่เอกสาร</th>
                      <th className="font" style={{ minWidth: "150px" }}>ชื่องาน</th>
                      <th className="font" style={{ minWidth: "150px" }}>วันเวลาแจ้งขัดข้อง</th>
                      <th className="font" style={{ minWidth: "150px" }}>ผู้นำเข้าระบบ</th>
                      <th className="font" style={{ minWidth: "150px" }}>สถานที่ แขวน/ตอน</th>
                      <th className="font"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="edit-padding" style={{ minWidth: "150px"}}>1123451</td>
                      <td className="edit-padding" style={{ minWidth: "150px" }}>รถไฟ</td>
                      <td className="edit-padding" style={{ minWidth: "150px" }}>14 เมษ 2563</td>
                      <td className="edit-padding" style={{ minWidth: "150px" }}>นาย ก</td>
                      <td className="edit-padding" style={{ minWidth: "150px" }}>บางแค</td>
                      <td className="edit-padding" style={{ minWidth: "150px" }}>
                        <button className="button-blue">เลือก</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid_12">
                <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modal2" id="aria-controls">กลับ</button>
              </div>
            </div>

          </div>
        </div>
      
      </div>
    )
  };
}

export default TopContent;
