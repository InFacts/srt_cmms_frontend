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
                  <div className="grid_2"><p className="cancel-default">กลุ่มของสินทรัพย์:</p></div>
                  <div className="grid_4 pull_0">
                    <div className="p-search-box cancel-margin ">
                      <select className="edit-select" >
                        <option defaultValue="0"></option>
                        <option defaultValue="1">Cosmic Cuttlefish</option>
                        <option defaultValue="2">Bionic Beaver</option>
                        <option defaultValue="3">Xenial Xerus</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">Serial Number:</p></div>
                  <div className="grid_4 pull_0">
                    <div className="p-search-box cancel-margin ">
                      <input className="cancel-default mt-1" type="text"  />
                    </div>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">ระบบนำเข้า:</p></div>
                  <div className="grid_4 pull_0">
                    <div className="p-search-box cancel-margin ">
                      <input className="cancel-default mt-1" type="text"  />
                    </div>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">ค่าเลื่อนต่อปี:</p></div>
                  <div className="grid_4 pull_0">
                    <div className="p-search-box cancel-margin ">
                      <input className="cancel-default mt-1" type="text"  />
                    </div>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">สถานะ:</p></div>
                  <div className="grid_4 pull_0">
                    <div className="p-search-box cancel-margin ">
                      <select className="edit-select" >
                        <option defaultValue="0"></option>
                        <option defaultValue="1">Cosmic Cuttlefish</option>
                        <option defaultValue="2">Bionic Beaver</option>
                        <option defaultValue="3">Xenial Xerus</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div id="คลัง" className="tabcontent">
                <h4 className="head-title-bottom mt-2">พิกัดของคลัง</h4>

                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">คลัง:</p></div>
                  <div className="grid_4 pull_0">
                    <div className="p-search-box cancel-margin ">
                      <input type="search" className="p-search-box__input cancel-default" />
                      <button className="p-search-box__button cancel-padding" ><i className="p-icon--external-link" id="showModal" aria-controls="modal"></i></button>
                    </div>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">Required (ต้องจัดซื้อ):</p></div>
                  <div className="grid_3 pull_0">
                    <input className="cancel-default" type="text"  />
                  </div>
                  <div className="grid_2"><p className="cancel-default">Valuation Method:</p></div>
                  <div className="grid_3 pull_0">
                    <input className="cancel-default" type="text"  />
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">Minimum:</p></div>
                  <div className="grid_4 pull_0">
                    <input className="cancel-default" type="text"  />
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">Maximum:</p></div>
                  <div className="grid_4 pull_0">
                    <input className="cancel-default" type="text"  />
                  </div>
                </div>
              </div>

              <div id="แผนบำรุงรักษา" className="tabcontent">
                <h4 className="head-title-bottom mt-2">แผนบำรุงรักษา</h4>
                <div className=" u-float-right">
                  <input  type="file" hidden />
                  <label><span className="top-text">เพิ่มวาระซ่อมบำรุง +</span></label>
                </div>

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

              <div id="แนบไฟล์" className="tabcontent">
                <h4 className="head-title-bottom mt-2">ข้อมูลแนบไฟล์</h4>
                <div className="u-clearfix">
                  <div className="u-float-left">
                    <label className="p-form__label" ><span className="top-text">ไฟล์เอกสาร</span></label>
                  </div>
                  <div className=" u-float-right">
                    <input  type="file" hidden />
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
                    <p className="cancel-default">หมายเหตุ:</p>
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
