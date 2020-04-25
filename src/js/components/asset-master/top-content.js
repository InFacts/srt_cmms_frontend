import React from 'react';

import '../../../css/test.css';

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


            {/* <div className="mb-auto " >
          <i class="p-icon--user p-button--positive t"></i>
          <i class="p-icon--plus p-button--positive t"></i>
          <i class="p-icon--minus p-button--positive t"></i>
          <i class="p-icon--expand p-button--positive t"></i>
          <i class="p-icon--collapse p-button--positive t"></i>
          <i class="p-icon--close p-button--positive t"></i>
          <i class="p-icon--delete p-button--positive t"></i>
          <i class="p-icon--menu p-button--positive t"></i>
          <i class="p-icon--code p-button--positive t"></i>
        </div> */}
            <h4 className="head-title">ข้อมูลสินทรัพย์หลัก</h4>

            <div className="grid_2 ">
              <p className="top-text">เลขที่สิ่งของ:</p>
              <p className="top-text">รายละเอียด:</p>
              <p className="top-text ">ประเภทสิ่งของ:</p>
              <p className="top-text ">กลุ่มของอะไหล่:</p>
              <p className="top-text">หน่วย:</p>
            </div>

            <div className="grid_10 pull_0 ml-2n ">
              <div className="p-search-box cancel-margin ">
                <input type="search" class="p-search-box__input cancel-default" />
                <button class="p-search-box__button cancel-padding" ><i class="p-icon--external-link" id="showModal" aria-controls="modal"></i></button>
              </div>
              <div className="p-search-box cancel-margin">
                <input className="cancel-default" type="text" id="exampleTextInput" />
              </div>
            </div>

            <div className="grid_4 pull_0 ml-2n">
              <div className=" p-search-box cancel-margin">
                <select className="cancel-default " name="exampleSelect" id="exampleSelect" style={{ fontSize: "0.8rem" }}>
                  <option value="1"></option>
                  <option value="2"></option>
                  <option value="3"></option>
                </select>
              </div>
              <div className="p-search-box cancel-margin">
                <input className="cancel-default" type="text" id="exampleTextInput" />
              </div>
              <div className="p-search-box cancel-margin">
                <input className="cancel-default" type="text" id="exampleTextInput" />
              </div>
            </div>


            <div className="grid_2">
              <p className="ml-5n mt-4 top-input">ประเภทบัญชี:</p>
              <p className=" ml-5n mt-4 top-input">ราคาต่อหน่วย:</p>
            </div>

            <div className="grid_4 pull_0 ml-2n">
              <div className="ml-4n mt-3 p-search-box cancel-margin  ">
                <select className="cancel-default " name="exampleSelect" id="exampleSelect" style={{ fontSize: "0.8rem" }}>
                  <option value="1"></option>
                  <option value="2"></option>
                  <option value="3"></option>
                </select>
              </div>
              <div className="ml-4n p-search-box cancel-margin">
                <input className="cancel-default ml-8n mt-2n" type="text" id="exampleTextInput" />
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
                  <p className="top-text">ความถี่การซ่อมบำรุง:</p>
                </div>

                <div className="grid_2 pull_0  ">
                  <div className="p-search-box cancel-margin">
                    <input className="cancel-default" type="text" id="exampleTextInput" />
                  </div>
                  <div className="p-search-box cancel-margin">
                    <input className="cancel-default" type="text" id="exampleTextInput" />
                  </div>
                </div>

                <div className="grid_1">
                  <p className=" mt-4 top-input">ครั้งต่อ:</p>
                </div>

                <div className="grid_10 pull_0 ">
                  <div className="mt-3 p-search-box cancel-margin  ">
                    <select className="cancel-default " name="exampleSelect" id="exampleSelect" style={{ fontSize: "0.8rem" }}>
                      <option value="1"></option>
                      <option value="2"></option>
                      <option value="3"></option>
                    </select>
                  </div>
                </div>
              

              <div className="container-modal">
              <div className="u-clearfix mt-2">
                <div className="u-float-left">
                  <label className="p-form__label" style={{ fontWeight: "bold" }} ><span className="top-text">Checklist</span></label>
                </div>
                <div className=" u-float-right">
                  <input id="fileButton" type="file" hidden />
                  <label><span className="top-text">เพิ่มวาระซ่อมบำรุง +</span></label>
                </div>
              </div>
              </div>

              <table className="cancel-border mt-3">
                <thead>
                  <tr>
                    <th className="font-for-status" style={{ width: "270px", paddingLeft: "50px" }}>ตรวจสอบ</th>
                    <th className="font-for-status" style={{ width: "270px" }}>หมายเหตุ</th>

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

                  </tr>
                </tbody>
              </table>

              <button className="button-blue mt-3 ml-2 float-right" type="button" aria-label="Close active modal" aria-controls="modal" id="aria-controls">ยกเลิก</button>
              <button className="button-blue mt-3 float-right" type="button" aria-label="Close active modal" aria-controls="modal" id="aria-controls">บันทึก</button>
            </div>
          </div>
        </div>


      </div>





    )
  };
}

export default TopContent;
