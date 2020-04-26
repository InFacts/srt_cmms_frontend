import React from 'react';

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

      <div id="blackground-white">
        <div className="container_12 clearfix">
          <section className="grid_12  ">
            <h4 className="head-title">ข้อมูลสินทรัพย์หลัก</h4>

            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">เลขที่สิ่งของ:</p></div>
              <div className="grid_4 pull_0">
                <div className="p-search-box cancel-margin ">
                  <input type="search" className="p-search-box__input cancel-default" />
                  <button className="p-search-box__button cancel-padding" ><i className="p-icon--external-link" id="showModal" aria-controls="modal"></i></button>
                </div>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">รายละเอียด:</p></div>
              <div className="grid_9 pull_0">
                <input className="cancel-default" type="text"  />
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">ประเภทสิ่งของ:</p></div>
              <div className="grid_4 pull_0">
                <select className="edit-select" >
                  <option defaultValue="0"></option>
                  <option defaultValue="1">Cosmic Cuttlefish</option>
                  <option defaultValue="2">Bionic Beaver</option>
                  <option defaultValue="3">Xenial Xerus</option>
                </select>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">กลุ่มของอะไหล่:</p></div>
              <div className="grid_4 pull_0">
                <input className="cancel-default mt-1" type="text"  />
              </div>
              <div className="grid_2"><p className="cancel-default float-left">ประเภทบัญชี:</p></div>
              <div className="grid_3 pull_0">
                <select className="edit-select" >
                  <option defaultValue="0"></option>
                  <option defaultValue="1">Cosmic Cuttlefish</option>
                  <option defaultValue="2">Bionic Beaver</option>
                  <option defaultValue="3">Xenial Xerus</option>
                </select>
              </div>
            </div>
            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">หน่วย:</p></div>
              <div className="grid_4 pull_0">
                <input className="cancel-default mt-1" type="text"  />
              </div>
              <div className="grid_2"><p className="cancel-default float-left">ราคาต่อหน่วย:</p></div>
              <div className="grid_3 pull_0">
                <input className="cancel-default mt-1" type="text"  />
              </div>
            </div>
          </section>

          <div className="grid_12">
            <div className="tab grid_7">
              <button id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "ทั่วไป")}>ทั่วไป</button>
              <button className="tablinks" onClick={e => this.tapChange(e, "คลัง")}>คลัง</button>
              <button className="tablinks" onClick={e => this.tapChange(e, "แผนบำรุงรักษา")}>แผนบำรุงรักษา</button>
              <button className="tablinks" onClick={e => this.tapChange(e, "หมายเหตุ")}>หมายเหตุ</button>
              <button className="tablinks" onClick={e => this.tapChange(e, "แนบไฟล์")}>แนบไฟล์</button>
            </div>
          </div>
        </div>


        {/* PopUp */}
        <div className="modal" id="modal" style={{ display: "none" }}>
          <div className="gray-board">
            <h3 className="head-title-modal">แผนบำรุงรักษา</h3>
            <div className="container-modal">

              <div className="grid_1 ">
                <p className="top-text">ชือแผนซ่อมบำรุง:</p>
                <p className="top-text" style={{ marginTop: "8px" }}>ความถี่การซ่อมบำรุง:</p>
              </div>

              <div className="grid_2 pull_0">
                <div className="p-search-box cancel-margin">
                  <input className="cancel-default" type="text"  />
                </div>
                <div className="p-search-box cancel-margin">
                  <input className="cancel-default" type="text"  />
                </div>
              </div>

              <div className="grid_1">
                <p className="top-text" style={{ marginTop: "35px" }}>ครั้งต่อ:</p>
              </div>

              <div className="grid_2 pull_0" style={{ marginTop: "13px" }}>
                <div className="mt-3 p-search-box cancel-margin  ">
                  <select className="cancel-default "  style={{ fontSize: "0.8rem" }}>
                    <option value="1"></option>
                    <option value="2"></option>
                    <option value="3"></option>
                  </select>
                </div>
              </div>

              <p className="cancel-default">เพิ่มวาระซ่อมบำรุง +</p>
              <table className="cancel-border mt-3">
                <thead>
                  <tr>
                    <th className="font-for-status" style={{ width: "270px", paddingLeft: "50px" }}>ตรวจสอบ</th>
                    <th className="font-for-status" style={{ width: "270px" }}>หมายเหตุ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-for-status" style={{ width: "270px", paddingLeft: "50px" }}>1123451</td>
                    <td className="font-for-status" style={{ width: "270px" }}>คลังหากใหญ่้</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button className="button-blue mt-3 ml-2 float-right" type="button" aria-label="Close active modal" aria-controls="modal" id="aria-controls">ยกเลิก</button>
            <button className="button-blue mt-3 float-right" type="button" aria-label="Close active modal" aria-controls="modal" id="aria-controls">บันทึก</button>
          </div>
        </div>
      </div>
    )
  };
}

export default TopContent;
