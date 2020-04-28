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

              <div id="อาการเสีย" className="tabcontent">
                <h3 className="head-title-bottom mt-2">ข้อมูลเกี่ยวกับอาการขัดข้อง:</h3>
                <div className="grid_12">
                  <div className="grid_3"><p className="cancel-default">ชื่องาน:</p></div>
                  <div className="grid_7 pull_0">
                    <input type="text" className="cancel-default mt-1"></input>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_3"><p className="cancel-default">วันเวลาที่เกิดเหตุ:</p></div>
                  <div className="grid_7 pull_0">
                    <input type="date" className="cancel-default grid_3 mt-1"></input>
                    <input type="date" className="cancel-default grid_3 mt-1 float-right"></input>
                    <p className="cancel-default grid_1 float-right">เวลา:</p>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_3"><p className="cancel-default">วันเวลาที่รับแจ้ง:</p></div>
                  <div className="grid_7 pull_0">
                    <input type="date" className="cancel-default grid_3 mt-1"></input>
                    <input type="date" className="cancel-default grid_3 mt-1 float-right"></input>
                    <p className="cancel-default grid_1 float-right">เวลา:</p>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_3"><p className="cancel-default">อาการเสียโดยสรุป:</p></div>
                  <div className="grid_7 pull_0">
                    <input type="text" className="cancel-default mt-1"></input>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_3"><p className="cancel-default">ได้รับเหตุจาก:</p></div>
                  <div className="grid_7 pull_0">
                    <input type="text" className="cancel-default mt-1"></input>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_3"><p className="cancel-default">ได้รับข้อมูลผ่านช่องทาง:</p></div>
                  <div className="grid_7 pull_0">
                    <input className="d-inline" type="radio" name="RadioOptions" id="Radio1" value="option1" />
                    <label htmlFor="Radio1" className="cancel-default d-inline">โทรศัพท์</label>
                    <input className="d-inline ml-3" type="radio" name="RadioOptions" id="Radio2" value="option2" />
                    <label htmlFor="Radio2" className="cancel-default d-inline ml-3">จดหมาย</label>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_3"><p className="cancel-default">รายงานการตรวจซ่อมอุปกรณ์แขวง:</p></div>
                  <div className="grid_7 pull_0">
                    <input type="text" className="cancel-default mt-1"></input>
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_3"><p className="cancel-default" style={{ paddingRight: "50px" }}>ที่ตั้งอุปกรณ์ที่ทำการตรวจซ่อม (สถานที่/ที่ตั้ง):</p></div>
                  <div className="grid_7 pull_0">
                    <input type="text" className="cancel-default mt-1"></input>
                  </div>
                </div>

                <div className="grid_12">
                            <div className="grid_3"><p className="cancel-default">หมายเหตุ:</p></div>
                            <div className="grid_7 pull_0">
                            <textarea className="edit" name="Text1" cols="40" rows="2"></textarea>
                            </div>
                        </div>
              </div>

              <div id="แนบไฟล์" className="tabcontent">
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

              <div id="สินทรัพย์ที่เกี่ยวข้อง" className="tabcontent">

              </div>

            </div>
          </div>
        </div>
      </form>
    )
  };
}

export default BottomContent;