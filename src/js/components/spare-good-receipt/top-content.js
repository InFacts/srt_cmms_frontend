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
              <h4 className="head-title">นำอะไหล่เข้า</h4>

              <div className="grid_12">
                <div className="grid_2">
                  <p className="top-text">เลขที่เอกสาร</p>
                </div>
                <div className="grid_3 pull_1">
                  <input type="text" className="cancel-default"></input>
                </div>
                <div className="grid_3 float-right">
                  <input type="text" className="cancel-default float-right" defaultValue="เปิดสำหรับแก้ไข"></input>
                </div>
                <div className="grid_2 float-right">
                  <p className="top-text float-right">สถานะ</p>
                </div>
              </div>

              <div className="grid_12">
                <div className="grid_2">
                  <p className="top-text">ผู้นำเข้า</p>
                </div>
                <div className="grid_3 pull_1">
                  <input type="text" className="cancel-default"></input>
                </div>
                <div className="grid_3 float-right">
                  <input type="date" className="cancel-default float-right" defaultValue="2014-02-09"></input>
                </div>
                <div className="grid_2 float-right">
                  <p className="top-text float-right">วันที่</p>
                </div>
              </div>

              <div className="grid_12">
                <div className="grid_3 float-right">
                  <input type="text" className="cancel-default float-right" defaultValue="001"></input>
                </div>
                <div className="grid_2 float-right">
                  <p className="top-text float-right">คลัง</p>
                </div>
              </div>

              <div className="grid_12">
                <div className="grid_2">
                  <p className="top-text">เลขที่ใบสั่งซื้อ/เลขที่เอกสารอ้างอิง</p>
                </div>
                <div className="grid_3 pull_0">
                  <input type="text" className="cancel-default" defaultValue="PO-456/2345"></input>
                </div>
              </div>

            </section>

            <div className="grid_12">
              <div className="tab grid_11">
                <button id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "รายการ")}>รายการ</button>
                <button className="tablinks" onClick={e => this.tapChange(e, "แนบไฟล์")}>แนบไฟล์</button>
              </div>
            </div>

          </div>
        </div>

      </div>
    )
  };
}

export default TopContent;
