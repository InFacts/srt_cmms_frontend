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

                <h4 className="head-title-bottom-sub mt-2">ผู้ที่รับผิดชอบ</h4>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">หน่วยงาน/แขวง:</p></div>
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
                  <div className="grid_2"><p className="cancel-default">ตอน:</p></div>
                  <div className="grid_4 pull_0">
                    <select className="edit-select" >
                      <option defaultValue="0"></option>
                      <option defaultValue="1">Cosmic Cuttlefish</option>
                      <option defaultValue="2">Bionic Beaver</option>
                      <option defaultValue="3">Xenial Xerus</option>
                    </select>
                  </div>
                </div>
                <h4 className="head-title-bottom-sub mt-4">การติดตั้ง</h4>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default  ">วันที่ติดตั้งเสร็จ:</p></div>
                  <div className="grid_4 pull_0">
                    <div className="p-search-box cancel-margin ">
                      <input type="date" className="p-search-box__input cancel-default" />
                    </div>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default ">วันที่ประกาศใช้:</p></div>
                  <div className="grid_4 pull_0">
                    <div className="p-search-box cancel-margin">
                      <input type="date" className="p-search-box__input cancel-default" />
                    </div>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">ตอน:</p></div>
                  <div className="grid_4 pull_0">
                    <select className="edit-select-top" >
                      <option defaultValue="0"></option>
                      <option defaultValue="1">Cosmic Cuttlefish</option>
                      <option defaultValue="2">Bionic Beaver</option>
                      <option defaultValue="3">Xenial Xerus</option>
                    </select>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">หมายเหตุ:</p></div>
                  <div className="grid_9 pull_0">
                    <textarea className="edit" name="Text1" cols="40" rows="2"></textarea>
                  </div>
                </div>
                {/* <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">วันที่ติดตั้งเสร็จ:</p></div>
                  <div className="grid_9 pull_0">
                    <input className="cancel-default mt-1" type="text"  />
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">วันที่ประกาศใช้:</p></div>
                  <div className="grid_9 pull_0">
                    <input className="cancel-default mt-1" type="text"  />
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">ค่าเลื่อนต่อปี:</p></div>
                  <div className="grid_9 pull_0">
                    <input className="cancel-default mt-1" type="text"  />
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">สถานะ:</p></div>
                  <div className="grid_9 pull_0">
                    <select className="edit-select" >
                      <option value="1"></option>
                      <option value="2"></option>
                      <option value="3"></option>
                    </select>
                  </div>
                </div> */}
              </div>

              <div id="สถานที่ติดตั้ง" className="tabcontent">

                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">ที่อยู่:</p></div>
                  <div className="grid_9 pull_0 mt-1">
                    <input className="cancel-default" type="text" />
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">แขวง:</p></div>
                  <div className="grid_9 pull_0">
                    <select className="edit-select" >
                      <option value="1"></option>
                      <option value="2"></option>
                      <option value="3"></option>
                    </select>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">เขต:</p></div>
                  <div className="grid_9 pull_0">
                    <select className="edit-select" >
                      <option value="1"></option>
                      <option value="2"></option>
                      <option value="3"></option>
                    </select>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">เลขไปรณีย์:</p></div>
                  <div className="grid_9 pull_0 mt-1">
                    <input className="cancel-default" type="text" />
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">Google Map:</p></div>
                  <div className="grid_9 pull_0 mt-1">
                    <input className="cancel-default" type="text" />
                  </div>
                </div>
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
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">หมายเหตุ:</p></div>
                  <div className="grid_9 pull_0">
                    <textarea className="edit" name="Text1" cols="40" rows="2" style={{ height: "15rem", resize: "none" }}></textarea>
                  </div>
                </div>
                {/* <div className="grid_12">
                  <div className="grid_2">
                    <h5 className="cancel-default">หมายเหตุ:</h5>
                  </div>
                  <div className="grid_3 pull_0">
                    <div>
                      <textarea className="cancel-table " cols="24" rows="4" style={{ width: "45rem", height: "15rem", resize: "none" }}></textarea>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  };
}

export default BottomContent;