import React from 'react';

import Document from '../../../images/document.svg'

import '../../../css/style.css'
import '../../../css/table.css';

class BottomContent extends React.Component {

  render() {
    // console.log(this.props.mockUpData)
    return (
      <div id="blackground-gray">
        <div className="container_12 clearfix">
          <div className="grid_12 ">

            <div id="ทั่วไป" className="tabcontent">
              <div className="grid_12 mt-2">
                <div className="grid_4 ml-3">
                  <input type="checkbox" id="checkExample2" />
                  <label className="cancel-default d-inline ml-2n" htmlFor="checkExample2">ปิดการใช้งาน</label>
                </div>
              </div>

              <div className="grid_12 mt-2">
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">สถานที่</p></div>
                  <div className="grid_4 pull_0">
                    <select className="edit-select" >
                      <option defaultValue="0"></option>
                      <option defaultValue="1">Cosmic Cuttlefish</option>
                      <option defaultValue="2">Bionic Beaver</option>
                      <option defaultValue="3">Xenial Xerus</option>
                    </select>
                  </div>
                </div>

                <div className="grid_12 mt-5">
                  <div className="grid_2 cancel-default">
                    <p className="cancel-default">ที่อยู่</p>
                  </div>
                  <div className="grid_4 pull_0">
                    <input type="text" className="cancel-default font-black" defaultValue={this.props.mockUpData.address} readOnly></input>
                  </div>
                </div>

                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">แขวง/ตำบล</p></div>
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
                  <div className="grid_2"><p className="cancel-default">เขต/อำเภอ</p></div>
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
                  <div className="grid_2"><p className="cancel-default">จังหวัด</p></div>
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
                  <div className="grid_2 cancel-default">
                    <p className="cancel-default">รหัสไปรษณีย์</p>
                  </div>
                  <div className="grid_4 pull_0">
                    <input type="text" className="cancel-default font-black" defaultValue={this.props.mockUpData.no_po} readOnly></input>
                  </div>
                </div>

              </div>
            </div>

            <div id="แนบไฟล์" className="tabcontent">
              <h4 className="head-title-bottom mt-2">ข้อมูลแนบไฟล์</h4>
              <div className="u-clearfix">
                <div className="u-float-left">
                  <label className="p-form__label" ><p className="top-text">ไฟล์เอกสาร</p></label>
                </div>
                <div className=" u-float-right">
                  <input id="fileButton" type="file" hidden />
                  <label><p className="top-text">แนบไฟล์ +</p></label>
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

          </div>
        </div>
      </div>
    )
  };
}

export default BottomContent;
