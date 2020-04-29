import React from 'react';

import Document from '../../../images/document.svg'

import '../../../css/style.css'

class BottomContent extends React.Component {

  render() {
    return (
      <form>
        <div id="blackground-gray">
          <div className="container_12 clearfix">
            <div className="grid_12 ">

              <h3 className="head-title-bottom mt-2">ข้อมูลเหตุขัดข้อง/ชำรุด</h3>
              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">ผู้แจ้งเหตุ</p></div>
                <div className="grid_7 ">
                  <input type="text" className="cancel-default mt-1"></input>
                </div>
              </div>
              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">วันเวลาเกิดเหตุ</p></div>
                <div className="grid_7 ">
                  <input type="date" className="cancel-default grid_3 mt-1"></input>
                  <input type="date" className="cancel-default grid_3 mt-1 float-right"></input>
                  <p className="cancel-default grid_1 float-right">เวลา</p>
                </div>
              </div>
              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">อาการขัดข้อง</p></div>
                <div className="grid_7 ">
                  <textarea className="edit" name="Text1" cols="40" rows="2"></textarea>
                </div>
              </div>
              {/* <div className="grid_12">
                <div className="grid_3"><p className="cancel-default">สถานที่ แขวง/ตอน:</p></div>
                <div className="grid_7 pull_0">
                  <input type="text" className="cancel-default mt-1"></input>
                </div>
              </div> */}
              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">สถานที่ แขวง</p></div>
                <div className="grid_3 ">
                  <select className="edit-select" >
                    <option defaultValue="0"></option>
                    <option defaultValue="1">Cosmic Cuttlefish</option>
                    <option defaultValue="2">Bionic Beaver</option>
                    <option defaultValue="3">Xenial Xerus</option>
                  </select>
                </div>
              </div>
              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">สถานที่ ตอน</p></div>
                <div className="grid_3 ">
                  <select className="edit-select" >
                    <option defaultValue="0"></option>
                    <option defaultValue="1">Cosmic Cuttlefish</option>
                    <option defaultValue="2">Bionic Beaver</option>
                    <option defaultValue="3">Xenial Xerus</option>
                  </select>
                </div>
              </div>
              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">รายละเอียดของสถานที่</p></div>
                <div className="grid_3 ">
                  <select className="edit-select" >
                    <option defaultValue="0"></option>
                    <option defaultValue="1">Cosmic Cuttlefish</option>
                    <option defaultValue="2">Bionic Beaver</option>
                    <option defaultValue="3">Xenial Xerus</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="grid_12 ">
              <h4 className="head-title-bottom mt-2">ข้อมูลแนบไฟล์</h4>
              <div className="u-clearfix">
                <div className="u-float-left">
                  <label className="p-form__label" ><span className="cancel-default2">ไฟล์เอกสาร</span></label>
                </div>
                <div className=" u-float-right">
                  <input id="fileButton" type="file" hidden />
                  <label><span className="cancel-default2">แนบไฟล์ +</span></label>
                </div>
              </div>
              <div className="dropZone" >
                <div className="grid_12">
                  <img src={Document} alt="Generic placeholder thumbnail" height="100px" />
                </div>
                <div className="grid_12 cancel-default2">ไม่พบไฟล์เอกสาร</div>
                <div className="grid_12 cancel-default2">คลิกที่ "+" ในการแนบเอกสาร</div>
              </div>

            </div>
          </div>
        </div>
      </form>
    )
  };
}

export default BottomContent;