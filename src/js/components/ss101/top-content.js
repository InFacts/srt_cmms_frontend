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
              <div className="grid_2">
                <p className="top-text">ชื่องาน:</p>
                <p className="top-text">เลขที่เอกสาร:</p>
                <p className="top-text">วันเวลาที่เกิดเหตุ:</p>
                <p className="top-text">วันเวลาที่รับแจ้ง:</p>
              </div>
              <div className="grid_2 pull_0">
                <p className="top-text">XXX-XXXXX-XXXX</p>
                <div className="p-search-box cancel-margin" style={{ top: "-1px"}}>
                  <input type="text" className="p-search-box__input cancel-default"  />
                  <button type="button" className="p-search-box__button cancel-padding" alt="search" ><i className="p-icon--search" id="showModal" aria-controls="modal" ></i></button>
                </div>
                <p className="top-text" style={{ marginTop: "-20px"}}>14 เม.ย. 2563  06:02 น.</p>
                <p className="top-text">14 เม.ย. 2563  12:02 น.</p>
              </div>
              <div className="grid_4">
                <p className="top-text">รายงานการตรวจซ่อมอุปกรณ์แขวง:</p>
                <p className="top-text">ที่ตั้งอุปกรณ์ที่ทำการตรวจซ่อม (สถานที่/ที่ตั้ง):</p>
                <p className="top-text">อาการเสียโดยสรุป:</p>
                <p className="top-text">ได้รับเหตุจาก:</p>
                <p className="top-text">ได้รับข้อมูลผ่านช่องทาง:</p>
              </div>
              <div className="grid_2 pull_0">
                <p className="top-text">สสญ. ธน. ตอน นตส.ตช.</p>
                <p className="top-text">XXXXXXX</p>
                <p className="top-text">XXXXXXX</p>
                <p className="top-text">XXXXXXX</p>
                <p className="top-text">XXXXXXX</p>
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
      </div>
    )
  };
}

export default TopContent;
