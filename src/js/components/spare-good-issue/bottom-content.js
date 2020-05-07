import React from 'react';

import Document from '../../../images/document.svg'

import '../../../css/style.css'
import '../../../css/table.css';

class BottomContent extends React.Component {

  render() {
    return (
      <div id="blackground-gray">
        <div className="container_12 clearfix">
          <div className="grid_12 ">

            <div id="รายการ" className="tabcontent">

              <div className="grid_12 mb-2" style={{ paddingRight: "10px" }}>
                <table className="table-many-column">
                  <thead>
                    <tr>
                      <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                      <th className="font" style={{ minWidth: "130px" }}>เลขที่อะไหล่</th>
                      <th className="font" style={{ minWidth: "250px" }}>ชื่ออะไหล่</th>
                      <th className="font text-center" style={{ minWidth: "80px" }}>คงคลัง</th>
                      <th className="font text-center" style={{ minWidth: "80px" }}>รอส่งมอบ</th>
                      <th className="font text-center" style={{ minWidth: "80px" }}>ระหว่างการจัดซื้อ</th>
                      <th className="font text-center" style={{ minWidth: "80px" }}>จำนวนสุทธิ</th>
                      <th className="font text-center" style={{ minWidth: "100px" }}>สถานะ</th>
                      <th className="font" style={{ minWidth: "80px" }}>จำนวน</th>
                      <th className="font" style={{ minWidth: "80px" }}>หน่วยนับ</th>
                      <th className="font" style={{ minWidth: "80px" }}>ราคาต่อหน่วย</th>
                      <th className="font" style={{ minWidth: "80px" }}>จำนวนเงิน</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="edit-padding text-center" style={{ minWidth: "30px" }}>1</th>
                      <td className="edit-padding" style={{ minWidth: "130px" }}>
                        <button type="button" class="button-for-table" id="showModal2" aria-controls="modal2"><i className="fas fa-arrow-right" style={{ color: "#FFCB21" }} id="showModal2" aria-controls="modal2"></i></button>
                        <input type="text" defaultValue="SIG 003" className="cancel-default-for-table"></input>
                      </td>
                      <td className="edit-padding" style={{ minWidth: "250px" }}>คลังพัสดุส่วนกลางบางซื่อ</td>
                      <td className="edit-padding text-center disable" style={{ minWidth: "80px" }} >10</td>
                      <td className="edit-padding text-center disable" style={{ minWidth: "80px" }} >10</td>
                      <td className="edit-padding text-center disable" style={{ minWidth: "80px" }} >10</td>
                      <td className="edit-padding text-center disable" style={{ minWidth: "80px" }} >10</td>
                      <td className="edit-padding text-center disable" style={{ minWidth: "80px" }} >
                        <select className="edit-select-table" disabled>
                          <option defaultValue="1" style={{ minWidth: "80px" }} >ของใหม่</option>
                          <option defaultValue="2" style={{ minWidth: "80px" }} >ของเก่า</option>
                        </select>
                      </td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }} >
                        <input type="number" min="1" defaultValue="10" className="cancel-default-for-table text-right"></input>
                      </td>
                      <td className="edit-padding text-left" style={{ minWidth: "80px" }} >ชิ้น</td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }} >1,120.0000</td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }} >11,200.00</td>
                    </tr>
                    <tr>
                      <th className="edit-padding text-center" style={{ minWidth: "30px" }}></th>
                      <td className="edit-padding" style={{ minWidth: "130px" }}>
                        <button type="button" class="button-for-table" id="showModal2" aria-controls="modal2"><i className="fas fa-arrow-right" style={{ color: "#FFCB21" }} id="showModal2" aria-controls="modal2"></i></button>
                        <input type="text" className="cancel-default-for-table"></input>
                      </td>
                      <td className="edit-padding" style={{ minWidth: "250px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }}>
                        <input type="number" min="1" className="cancel-default-for-table"></input>
                      </td>
                      <td className="edit-padding text-left" style={{ minWidth: "80px" }} ></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }} ></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }} ></td>
                    </tr>
                    <tr>
                      <th className="edit-padding text-center" style={{ minWidth: "30px" }}></th>
                      <td className="edit-padding" style={{ minWidth: "130px" }}>

                      </td>
                      <td className="edit-padding" style={{ minWidth: "250px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }}>
                        <input type="number" min="1" className="cancel-default-for-table"></input>
                      </td>
                      <td className="edit-padding text-left" style={{ minWidth: "80px" }} ></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }} ></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }} ></td>
                    </tr>
                    <tr>
                      <th className="edit-padding text-center" style={{ minWidth: "30px" }}></th>
                      <td className="edit-padding" style={{ minWidth: "130px" }}>

                      </td>
                      <td className="edit-padding" style={{ minWidth: "250px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }}>
                        <input type="number" min="1" className="cancel-default-for-table"></input>
                      </td>
                      <td className="edit-padding text-left" style={{ minWidth: "80px" }} ></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }} ></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }} ></td>
                    </tr>
                    <tr>
                      <th className="edit-padding text-center" style={{ minWidth: "30px" }}></th>
                      <td className="edit-padding" style={{ minWidth: "130px" }}>

                      </td>
                      <td className="edit-padding" style={{ minWidth: "250px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }}>
                        <input type="number" min="1" className="cancel-default-for-table"></input>
                      </td>
                      <td className="edit-padding text-left" style={{ minWidth: "80px" }} ></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }} ></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }} ></td>
                    </tr>
                    <tr>
                      <th className="edit-padding text-center" style={{ minWidth: "30px" }}></th>
                      <td className="edit-padding" style={{ minWidth: "130px" }}>

                      </td>
                      <td className="edit-padding" style={{ minWidth: "250px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }}>
                        <input type="number" min="1" className="cancel-default-for-table"></input>
                      </td>
                      <td className="edit-padding text-left" style={{ minWidth: "80px" }} ></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }} ></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }} ></td>
                    </tr>
                    <tr>
                      <th className="edit-padding text-center" style={{ minWidth: "30px" }}></th>
                      <td className="edit-padding" style={{ minWidth: "130px" }}>

                      </td>
                      <td className="edit-padding" style={{ minWidth: "250px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }}>
                        <input type="number" min="1" className="cancel-default-for-table"></input>
                      </td>
                      <td className="edit-padding text-left" style={{ minWidth: "80px" }} ></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }} ></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }} ></td>
                    </tr>
                    <tr>
                      <th className="edit-padding text-center" style={{ minWidth: "30px" }}></th>
                      <td className="edit-padding" style={{ minWidth: "130px" }}>

                      </td>
                      <td className="edit-padding" style={{ minWidth: "250px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }}>
                        <input type="number" min="1" className="cancel-default-for-table"></input>
                      </td>
                      <td className="edit-padding text-left" style={{ minWidth: "80px" }} ></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }} ></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }} ></td>
                    </tr>
                    <tr>
                      <th className="edit-padding text-center" style={{ minWidth: "30px" }}></th>
                      <td className="edit-padding" style={{ minWidth: "130px" }}>

                      </td>
                      <td className="edit-padding" style={{ minWidth: "250px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }}>
                        <input type="number" min="1" className="cancel-default-for-table"></input>
                      </td>
                      <td className="edit-padding text-left" style={{ minWidth: "80px" }} ></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }} ></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }} ></td>
                    </tr>
                    <tr>
                      <th className="edit-padding text-center" style={{ minWidth: "30px" }}></th>
                      <td className="edit-padding" style={{ minWidth: "130px" }}>

                      </td>
                      <td className="edit-padding" style={{ minWidth: "250px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }}>
                        <input type="number" min="1" className="cancel-default-for-table"></input>
                      </td>
                      <td className="edit-padding text-left" style={{ minWidth: "80px" }} ></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }} ></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }} ></td>
                    </tr>
                    <tr>
                      <th className="edit-padding text-center" style={{ minWidth: "30px" }}></th>
                      <td className="edit-padding" style={{ minWidth: "130px" }}>

                      </td>
                      <td className="edit-padding" style={{ minWidth: "250px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }}>
                        <input type="number" min="1" className="cancel-default-for-table"></input>
                      </td>
                      <td className="edit-padding text-left" style={{ minWidth: "80px" }} ></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }} ></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }} ></td>
                    </tr>
                    <tr>
                      <th className="edit-padding text-center" style={{ minWidth: "30px" }}></th>
                      <td className="edit-padding" style={{ minWidth: "130px" }}>

                      </td>
                      <td className="edit-padding" style={{ minWidth: "250px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }}>
                        <input type="number" min="1" className="cancel-default-for-table"></input>
                      </td>
                      <td className="edit-padding text-left" style={{ minWidth: "80px" }} ></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }} ></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }} ></td>
                    </tr>
                    <tr>
                      <th className="edit-padding text-center" style={{ minWidth: "30px" }}></th>
                      <td className="edit-padding" style={{ minWidth: "130px" }}>

                      </td>
                      <td className="edit-padding" style={{ minWidth: "250px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }}>
                        <input type="number" min="1" className="cancel-default-for-table"></input>
                      </td>
                      <td className="edit-padding text-left" style={{ minWidth: "80px" }} ></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }} ></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }} ></td>
                    </tr>
                    <tr>
                      <th className="edit-padding text-center" style={{ minWidth: "30px" }}></th>
                      <td className="edit-padding" style={{ minWidth: "130px" }}>

                      </td>
                      <td className="edit-padding" style={{ minWidth: "250px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }}>
                        <input type="number" min="1" className="cancel-default-for-table"></input>
                      </td>
                      <td className="edit-padding text-left" style={{ minWidth: "80px" }} ></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }} ></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }} ></td>
                    </tr>
                    <tr>
                      <th className="edit-padding text-center" style={{ minWidth: "30px" }}></th>
                      <td className="edit-padding" style={{ minWidth: "130px" }}>

                      </td>
                      <td className="edit-padding" style={{ minWidth: "250px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "80px" }}></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }}>
                        <input type="number" min="1" className="cancel-default-for-table"></input>
                      </td>
                      <td className="edit-padding text-left" style={{ minWidth: "80px" }} ></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }} ></td>
                      <td className="edit-padding text-right" style={{ minWidth: "80px" }} ></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid_12 mt-3">
                <div className="grid_4 float-right">
                  <input type="text" className="cancel-default float-right" defaultValue="001"></input>
                </div>
                <div className="grid_2 float-right"><p className="cancel-default float-right">จำนวนสุทธิ</p></div>
              </div>

              <div className="grid_12">
                <div className="grid_1"><p className="cancel-default">หมายเหตุ</p></div>
                <div className="grid_4">
                  <textarea className="edit" name="Text1" cols="40" rows="2"></textarea>
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
      </div >
    )
  };
}

export default BottomContent;
