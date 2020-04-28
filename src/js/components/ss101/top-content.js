import React from 'react';

import '../../../css/style.css'
import '../../../css/grid12.css';

class TopContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    document.getElementById("defaultOpen").click();
  }

  tapChange(evt, cityName) {
    console.log("hello")
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
              <h4 className="head-title">สรุปการซ่อมบำรุง - แบบ สส.101</h4>


              <div className="grid_12">
                <div className="grid_2"><p className="top-text">เลขที่เอกสาร</p></div>
                <div >
                  <div className="p-search-box cancel-margin grid_3  pull_0">
                    <input type="search" className="p-search-box__input cancel-default " />
                    <button className="p-search-box__button cancel-padding" ><i className="p-icon--external-link" id="showModal" aria-controls="modal"></i></button>
                  </div>
                  <div className="p-search-box cancel-margin grid_3  float-right">
                    <input type="date" className="p-search-box__input cancel-default " disabled="disabled" />
                  </div>
                  <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">วันที่ออกเอกสาร</p></div>
                </div>
              </div>


              <div className="grid_12">
                <div className="grid_2"><p className="top-text">เลขที่เอกสารอ้างอิง</p></div>
                <div>
                  <div className="p-search-box cancel-margin grid_3 pull_0">
                    <input type="search" className="p-search-box__input cancel-default " />
                    <button className="p-search-box__button cancel-padding" ><i className="p-icon--external-link" id="showModal" aria-controls="modal"></i></button>
                  </div>
                  <div className="p-search-box cancel-margin grid_3   float-right">
                    <input type="text" className=" p-search-box__input cancel-default  " disabled="disabled"></input>
                  </div>
                  <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">ผู้สร้างเอกสาร</p></div>
                </div>
              </div>

              <div className="grid_12">
                <div className="grid_2">
                  <p className="top-text">ชื่องาน</p>
                  <p className="top-text mt-1">วันเวลาที่เกิดเหตุ</p>
                  <p className="top-text">วันเวลาที่รับแจ้ง</p>
                </div>
                <div className="grid_3 pull_0">
                  <p className="top-text">XXX-XXXXX-XXXX</p>
                  <p className="top-text" >14 เม.ย. 2563  06:02 น.</p>
                  <p className="top-text">14 เม.ย. 2563  12:02 น.</p>
                </div>
                <div className="grid_3">
                  <p className="top-text">รายงานการตรวจซ่อมอุปกรณ์แขวง</p>
                  <p className="top-text">ได้รับข้อมูลผ่านช่องทาง</p>
                </div>
                <div className="grid_3 pull_0">
                  <p className="top-text">สสญ. ธน. ตอน นตส.ตช.</p>
                  <p className="top-text">XXXXXXX</p>
                  <p className="top-text">XXXXXXX</p>
                </div>
              </div>

            </section>

            <div className="grid_12">
              <div className="tab grid_8">
                <button id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "อาการเสีย")}>อาการเสีย</button>
                <button id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "ผู้ที่เกี่ยวข้อง")}>ผู้ที่เกี่ยวข้อง</button>
                <button id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "รายการค่าเสียหาย")}>รายการค่าเสียหาย</button>
                <button className="tablinks" onClick={e => this.tapChange(e, "แนบไฟล์")}>แนบไฟล์</button>
                <button className="tablinks" onClick={e => this.tapChange(e, "สถานะเอกสาร")}>สถานะเอกสาร</button>
              </div>
            </div>
          </div>
        </div>
        {/* PopUp */}
        <div className="modal" id="modal" style={{ display: "none" }}>
          <div className="gray-board">
            <p className="head-title-modal edit">คลังต้นทาง</p>
            <div className="container_12 edit-padding">

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">ค้นหาเลขที่คลัง:</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default" />
                </div>
                <button className="button-blue ml-1 grid_1 pull_0" type="button">ค้นหา</button>
              </div>
              <table className="cancel-border mt-3">
                <thead>
                  <tr>
                    <th className="font-for-status" style={{ width: "350px", paddingLeft: "50px" }}>เลขที่เอกสาร</th>
                    <th className="font-for-status" style={{ width: "350px" }}>อาการเสีย</th>
                    <th className="font-for-status"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-for-status" style={{ width: "270px", paddingLeft: "50px" }}>
                      1123451
                                        </td>
                    <td className="font-for-status" style={{ width: "270px" }}>
                      คลังหากใหญ่้
                                        </td>
                    <td className="font-for-status">
                      <button className="button-green">ยืนยัน</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="grid_12 ">
                <div className="grid_8 pull_0 float-right">

                  <button className="button-blue edit mt-3  grid_1 float-right" type="button" aria-label="Save active modal" aria-controls="modal" id="aria-controls">กลับ</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };
}

export default TopContent;
