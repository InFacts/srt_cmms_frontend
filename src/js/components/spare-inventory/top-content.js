import React from 'react';

import '../../../css/style.css'
import '../../../css/grid12.css';

class TopContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mockUpData: [
        {
          "id": "1002",
          "name": "example1",
          "shortName": "ex1",
          "status": "1",
          "station": "หัวลำโพรง",
          "address": "ถนนพระรามที่ 4 บริเวณแยกหัวลำโพง",
          "district": "ปทุมวัน",
          "county": "ปทุมวัน",
          "province": "กรุงเทพ",
          "no_po": "11111"
        },
        {
          "id": "2003",
          "name": "example2",
          "shortName": "ex2",
          "status": "2",
          "station": "ลาดกระบัง",
          "address": "ถนนลาดกระบัง",
          "district": "ลาดกระบัง",
          "county": "ลาดกระบัง",
          "province": "กรุงเทพ",
          "no_po": "22222"
        }
      ],
      mockUpData_selected: {
        "id": "",
        "name": "",
        "shortName": "",
        "status": "",
        "station": "",
        "address": "",
        "district": "",
        "county": "",
        "province": "",
        "no_po": ""
      },
      value_enter: ""
    }
    this._handleKeyDown = this._handleKeyDown.bind(this);
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

  async _handleKeyDown(e) {
    const current = this;
    if (e.key === 'Enter') {
      current.setState({ value_enter: e.target.value})
      // console.log(e.target.value);
      await this.state.mockUpData.map(function (mockUpData, index) {
        if (e.target.value === mockUpData.id) {
          current.setState({
            mockUpData_selected: {
              id: mockUpData.id,
              name: mockUpData.name,
              shortName: mockUpData.shortName,
              status: mockUpData.status,
              station: mockUpData.station,
              address: mockUpData.address,
              district: mockUpData.district,
              county: mockUpData.county,
              province: mockUpData.province,
              no_po: mockUpData.no_po
            }
          })
          const order = current.state.mockUpData[index];
          current.props.confirm(order)
        }
        return null;
      })

      // console.log(current.state.value_enter);
      if(current.state.value_enter !== current.state.mockUpData_selected.id) {
        document.getElementById("showModal").click();
      }
    }
  }

  // selectValue(status) {
  //   // console.log(status);
  // }

  render() {
    const current = this;
    return (
      <div>
        <div id="blackground-white">
          <div className="container_12 clearfix">
            <section className="grid_12 ">
              <h4 className="head-title">คลัง - Setup</h4>

              <div className="grid_12">
                <div className="grid_1"><p className="top-text">เลขที่คลัง</p></div>
                <div >
                  <div className="grid_2">
                    <div className="p-search-box cancel-margin">
                      <input type="text" className="p-search-box__input cancel-default" onKeyDown={this._handleKeyDown} />
                      <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModal" aria-controls="modal"></i></button>
                    </div>
                  </div>
                  <div className="grid_2 cancel-default text-right">
                    <p className="cancel-default">ชื่อเต็มคลัง</p>
                  </div>
                  <div className="grid_4">
                    <input type="text" className="cancel-default font-black" value={this.state.mockUpData_selected.name} readOnly></input>
                  </div>
                </div>
              </div>

              <div className="grid_12">
                <div className="grid_5 cancel-default text-right">
                  <p className="cancel-default">ชื่อย่อคลัง</p>
                </div>
                <div className="grid_4">
                  <input type="text" className="cancel-default font-black" value={this.state.mockUpData_selected.shortName} readOnly></input>
                </div>
              </div>

            </section>

            <div className="grid_12">
              <div className="tab grid_11">
                <button type="button" id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "ทั่วไป")}>ทั่วไป</button>
                <button type="button" className="tablinks" onClick={e => this.tapChange(e, "แนบไฟล์")}>แนบไฟล์</button>
              </div>
            </div>
          </div>
        </div>

        {/* PopUp */}
        <div className="modal" id="modal" style={{ display: "none" }}>
          <div className="gray-board">
            <p className="head-title-modal edit">ค้นหาคลัง</p>
            <div className="container_12 edit-padding">

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">เลขที่คลัง</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" value={current.state.value_enter} />
                  <button className="button-blue edit grid_1 mr-5" type="button">ค้นหา</button>
                </div>
              </div>

              <div className="grid_12">
                <table className="table-many-column mt-3">
                  <thead>
                    <tr>
                      <th className="font" style={{ minWidth: "150px" }}>เลขที่คลัง</th>
                      <th className="font" style={{ minWidth: "300px" }}>ชื่อเต็มคลัง</th>
                      <th className="font" style={{ minWidth: "150px" }}>ชื่อย่อคลัง</th>
                      <th className="font text-center" style={{ minWidth: "150px" }}>สถานะ</th>
                      <th className="font" style={{ minWidth: "150px" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.mockUpData.map(function (mockUpData, index) {
                      return (
                        <tr key={index}>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>{mockUpData.id}</td>
                          <td className="edit-padding" style={{ minWidth: "300px" }}>{mockUpData.name}</td>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>{mockUpData.shortName}</td>
                          <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                            {/* {current.selectValue(mockUpData.status)} */}
                          </td>
                          <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                            <button type="button" className="button-blue">เลือก</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="grid_12">
                <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modal" id="aria-controls">กลับ</button>
              </div>

            </div>
          </div>
        </div>

      </div>
    )
  };
}

export default TopContent;
