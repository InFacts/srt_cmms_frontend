import React from 'react';
import Document from '../../../images/document.svg'
import '../../../css/style.css'
import '../../../css/test.css'
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


                <div className="grid_12 mt-2 ">
                  <div className="grid_2  mt-1">
                    <p className="cancel-default">กลุ่มของสินทรัพย์:</p>
                    <p className=" cancel-default ">Serial Number:</p>
                    <p className="cancel-default ">ระบบนำเข้า:</p>
                    <p className="cancel-default ">ค่าเลื่อนต่อปี:</p>
                    <p className="cancel-default ">สถานะ:</p>
                  </div>
                  <div className="grid_3 pull_0">
                    <div className=" p-search-box cancel-margin  ">
                      <select className="cancel-default" name="exampleSelect" id="exampleSelect" style={{ fontSize: "0.8rem" }}>
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value="3"></option>
                      </select>
                    </div>
                    <div className="p-search-box cancel-margin ">
                      <input className="cancel-default" type="text" id="exampleTextInput" />
                    </div>
                    <div className="p-search-box cancel-margin">
                      <input className="cancel-default" type="text" id="exampleTextInput" />
                    </div>
                    <div className="p-search-box cancel-margin ">
                      <input className="cancel-default" type="text" id="exampleTextInput" />
                    </div>
                    <div className="p-search-box cancel-margin mm ">
                      <select className="p-search-box__input cancel-default" name="exampleSelect" id="exampleSelect" style={{ fontSize: "0.8rem" }}>
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value="3"></option>
                      </select>
                    </div>
                  </div>
                </div>


              </div>

              <div id="คลัง" className="tabcontent">

                <h4 style={{ fontWeight: "bold" }}>พิกัดของคลัง</h4>
                <div className="grid_12 ">


                  <div className="grid_2 mt-1 ">
                    <p className="cancel-default">คลัง:</p>
                    <p className="cancel-default ">Required (ต้องจัดซื้อ):</p>
                    <p className=" cancel-default ">Minimum:</p>
                    <p className=" cancel-default ">Minimum:</p>

                  </div>
                  <div className="grid_3 pull_0">

                    <div className="p-search-box cancel-margin ml-2">
                      <input type="search" class="p-search-box__input cancel-default" />
                      <button class="p-search-box__button cancel-padding" ><i class="p-icon--external-link" id="aria-controls"></i></button>
                    </div>

                    <div className="p-search-box cancel-margin ml-2">
                      <input className="cancel-default" type="text" id="exampleTextInput" />
                    </div>
                    <div className="p-search-box cancel-margin ml-2">
                      <input className="cancel-default" type="text" id="exampleTextInput" />
                    </div>
                    <div className="p-search-box cancel-margin ml-2">
                      <input className="cancel-default" type="text" id="exampleTextInput" />
                    </div>

                  </div>

                  <div className="grid_2  mt-4">
                    <p className="cancel-default">Valuation Method:</p>
                  </div>

                  <div className="grid_3 pull_0 mt-3">
                    <div className="p-search-box cancel-margin  ">
                      <select className="cancel-default" name="exampleSelect" id="exampleSelect" style={{ fontSize: "0.8rem" }}>
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value="3"></option>
                      </select>
                    </div>
                  </div>

                </div>

              </div>

              <div id="แผนบำรุงรักษา" className="tabcontent">


                <div className="u-clearfix mt-2">
                  <div className="u-float-left">
                    <label className="p-form__label" style={{ fontWeight: "bold" }} ><span className="top-text">แผนบำรุงรักษา</span></label>
                  </div>
                  <div className=" u-float-right">
                    <input id="fileButton" type="file" hidden />
                    <label><span className="top-text">เพิ่มวาระซ่อมบำรุง +</span></label>
                  </div>
                </div>

                <table className="cancel-border">
                  <thead>
                    <tr>
                      <th className="font" style={{ paddingLeft: "25px" }}>#</th>
                      <th className="font">ชื่อแผน</th>
                      <th className="font" style={{ paddingLeft: "25px" }}>ความถี่</th>
                      <th className="font">จำนวนรายการ</th>
                      <th className="font" style={{ paddingLeft: "30px" }}>รายละเอียด</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th style={{ paddingLeft: "25px" }}>1</th>
                      <td>แผนซ่อม A</td>
                      <td>2 ครั้งต่อเดือน</td>
                      <td style={{ paddingLeft: "30px" }}>10</td>
                      <td><div><button className="p-button--positive cancel-table" style={{ backgroundColor: "#2F6FCA", border: "none" }}>แก้ไข</button></div></td>
                    </tr>

                  </tbody>
                </table>



              </div>



              <div id="แนบไฟล์" className="tabcontent">
                <h4 className="head-title-bottom mt-2">ข้อมูลแนบไฟล์</h4>
                <div className="u-clearfix">
                  <div className="u-float-left">
                    <label className="p-form__label" ><span className="top-text">ไฟล์เอกสาร</span></label>
                  </div>
                  <div className=" u-float-right">
                    <input id="fileButton" type="file" hidden />
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
                    <h5 className="cancel-default">หมายเหตุ:</h5>
                  </div>
                  <div className="grid_3 pull_0">
                    <div>
                      <textarea className="cancel-table " cols="24" rows="4" style={{ width: "45rem", height: "15rem", resize: "none" }}></textarea>
                    </div>
                  </div>
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
