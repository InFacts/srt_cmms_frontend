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
              <h4 className="head-title">คลัง - Setup</h4>

              <div className="grid_12">
                <div className="grid_2">
                  <p className="top-text">เลขที่อุปกรณ์</p>
                </div>
                <div className="grid_6">
                  <div className="grid_2 pull_1">
                    <select className="edit-select" style={{ marginTop: "0" }}>
                      <option defaultValue="0"></option>
                      <option defaultValue="1">Cosmic Cuttlefish</option>
                      <option defaultValue="2">Bionic Beaver</option>
                      <option defaultValue="3">Xenial Xerus</option>
                    </select>
                  </div>
                  <div className="grid_3 pull_1">
                    <input type="text" className="cancel-default"></input>
                  </div>
                </div>
              </div>

              <div className="grid_12">
                <div className="grid_2">
                  <p className="top-text">รายละเอียด</p>
                </div>
                <div className="grid_6">
                  <div className="grid_4 pull_1">
                    <input type="text" className="cancel-default"></input>
                  </div>
                </div>
              </div>

              <div className="grid_12">
                <div className="grid_2">
                  <p className="top-text">ชนิดอุปกรณ์</p>
                </div>
                <div className="grid_6">
                  <div className="grid_4 pull_1">
                    <select className="edit-select" style={{ marginTop: "0" }}>
                      <option defaultValue="0"></option>
                      <option defaultValue="1">Cosmic Cuttlefish</option>
                      <option defaultValue="2">Bionic Beaver</option>
                      <option defaultValue="3">Xenial Xerus</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid_12">
                <div className="grid_2">
                  <p className="top-text">กลุ่มอุปกรณ์</p>
                </div>
                <div className="grid_6">
                  <div className="grid_4 pull_1">
                    <select className="edit-select" style={{ marginTop: "0" }}>
                      <option defaultValue="0"></option>
                      <option defaultValue="1">Cosmic Cuttlefish</option>
                      <option defaultValue="2">Bionic Beaver</option>
                      <option defaultValue="3">Xenial Xerus</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid_12">
                <div className="grid_2">
                  <p className="top-text">กลุ่มหน่วยนับ</p>
                </div>
                <div className="grid_6">
                  <div className="grid_4 pull_1">
                    <select className="edit-select" style={{ marginTop: "0" }}>
                      <option defaultValue="0"></option>
                      <option defaultValue="1">Cosmic Cuttlefish</option>
                      <option defaultValue="2">Bionic Beaver</option>
                      <option defaultValue="3">Xenial Xerus</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            <div className="grid_12">
              <div className="tab grid_11">
                <button id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "ทั่วไป")}>ทั่วไป</button>
                <button className="tablinks" onClick={e => this.tapChange(e, "คลัง")}>คลัง</button>
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
