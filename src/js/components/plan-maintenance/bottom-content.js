import React from 'react';

import '../../../css/style.css'
import '../../../css/tabs.css'
import '../../../css/grid12.css';

class BottomContent extends React.Component {
  
  render() {
    return (
      <form>
        <div id="blackground-gray">
          <div className="container_12 clearfix">
            <div className="grid_12 ">

              <div id="Checklist" className="tabcontent">

                <div className="u-clearfix mt-2">
                  <div className="u-float-left">
                    <label className="p-form__label" style={{ fontWeight: "bold" }} ><span className="top-text">Checklist</span></label>
                  </div>
                  <div className=" u-float-right">
                    <input id="fileButton" type="file" hidden />
                    <label><span className="top-text">เพิ่มวาระซ่อมบำรุง +</span></label>
                  </div>
                </div>

                <table className="cancel-border">
                  <thead>
                    <tr>
                      <th style={{ paddingLeft: "25px" }} className="font">สถานที่ตรวจสอบ</th>
                      <th style={{ paddingLeft: "30px" }} className="font">หน่วย</th>
                      <th className="font">หมายเหตุ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th><div className="w-80" style={{ paddingLeft: "10px" }}><input className="cancel-default" type="text"  /></div></th>
                      <td ><div className="w-30"><input className="cancel-default" type="text"  /></div></td>
                      <td><div className="w-50"><input className="cancel-default" type="text"  /></div></td>
                    </tr>
                    <tr>
                      <th><div className="w-80" style={{ paddingLeft: "10px" }}><input className="cancel-default" type="text"  /></div></th>
                      <td><div className="w-30"><input className="cancel-default" type="text"  /></div></td>
                      <td><div className="w-50"><input className="cancel-default" type="text"  /></div></td>
                    </tr>
                  </tbody>
                </table>



              </div>

              <div id="ระบุผู้ปฎิบัติงาน" className="tabcontent">

                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">ตอนที่รับผิดชอบ:</p></div>
                  <div className="grid_4 pull_0">
                    <input className="cancel-default" type="text"  />
                  </div>
                </div>
                <div className="grid_12">
                  <div className="grid_2"><p className="cancel-default">สถานที่:</p></div>
                  <div className="grid_4 pull_0">
                    <div className="p-search-box cancel-margin ">
                      <select className="edit-select" name="exampleSelect" id="exampleSelect">
                        <option defaultValue="0"></option>
                        <option defaultValue="1">Cosmic Cuttlefish</option>
                        <option defaultValue="2">Bionic Beaver</option>
                        <option defaultValue="3">Xenial Xerus</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div id="สรุป" className="tabcontent">

                <table className="border mt-2">
                  <thead >
                    <tr role="row">
                      <th rowSpan="3" className="font border u-align--center" style={{ fontSize: "0.9rem" }}>ลำดับ</th>
                      <th rowSpan="3" className="font border u-align--center" style={{ width: "12rem", fontSize: "0.9rem" }}>รายละเอียด</th>
                      <th rowSpan="3" className="font border u-align--center" style={{ width: "3rem", fontSize: "0.9rem" }}>หน่วย</th>
                      <th colSpan="10" className="font border u-align--center" style={{ width: "27rem", fontSize: "0.9rem" }}>การดำเนินการ</th>
                      <th colSpan="2" className="font border u-align--center" style={{ fontSize: "0.9rem" }}>สรุปรวม</th>
                      <th rowSpan="3" className="font border u-align--center" style={{ width: "7rem", fontSize: "0.9rem" }}>หมายเหตุ</th>
                    </tr>

                    <tr role="row">
                      <th colSpan="2" className="font border u-align--center" style={{ fontSize: "0.9rem" }}>ตอน นตส.พบ.</th>
                      <th colSpan="2" className="font border u-align--center" style={{ fontSize: "0.9rem" }}>ตอน นตส.หห.</th>
                      <th colSpan="2" className="font border u-align--center" style={{ fontSize: "0.9rem" }}>ตอน นตส.จข.</th>
                      <th colSpan="2" className="font border u-align--center" style={{ fontSize: "0.9rem" }}>ตอน นตส.พญ.</th>
                      <th colSpan="2" className="font border u-align--center" style={{ fontSize: "0.9rem" }}>ตอน นตส.ขพ.</th>
                      <th colSpan="2" className="font border u-align--center" style={{ fontSize: "0.9rem" }}>แขวง</th>
                    </tr>

                    <tr role="row">
                      <th className="font border u-align--center" style={{ fontSize: "0.9rem" }}>แผน</th>
                      <th className="font border u-align--center" style={{ fontSize: "0.9rem" }}>ผลงาน</th>
                      <th className="font border u-align--center" style={{ fontSize: "0.9rem" }}>แผน</th>
                      <th className="font border u-align--center" style={{ fontSize: "0.9rem" }}>ผลงาน</th>
                      <th className="font border u-align--center" style={{ fontSize: "0.9rem" }}>แผน</th>
                      <th className="font border u-align--center" style={{ fontSize: "0.9rem" }}>ผลงาน</th>
                      <th className="font border u-align--center" style={{ fontSize: "0.9rem" }}>แผน</th>
                      <th className="font border u-align--center" style={{ fontSize: "0.9rem" }}>ผลงาน</th>
                      <th className="font border u-align--center" style={{ fontSize: "0.9rem" }}>แผน</th>
                      <th className="font border u-align--center" style={{ fontSize: "0.9rem" }}>ผลงาน</th>
                      <th className="font border u-align--center" style={{ fontSize: "0.9rem" }}>แผน</th>
                      <th className="font border u-align--center" style={{ fontSize: "0.9rem" }}>ผลงาน</th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: "0.6rem" }} >
                    <tr>
                      <td className="u-align--center border" role="rowheader" aria-label="FQDN">1</td>
                      <td className="u-align--left border" role="rowheader" aria-label="FQDN">งานบำรุงรักษาตามวาระที่สถานที่(จำนวนสถานีที่รับผิดชอบ)</td>
                      <td className="u-align--center border" role="rowheader" aria-label="FQDN">สถานี</td>
                      <td className="u-align--center border" role="rowheader" aria-label="FQDN">11</td>
                      <td className="u-align--center border" role="rowheader" aria-label="FQDN">11</td>
                      <td className="u-align--center border" role="rowheader" aria-label="FQDN">11</td>
                      <td className="u-align--center border" role="rowheader" aria-label="FQDN">11</td>
                      <td className="u-align--center border" role="rowheader" aria-label="FQDN">9</td>
                      <td className="u-align--center border" role="rowheader" aria-label="FQDN">9</td>
                      <td className="u-align--center border" role="rowheader" aria-label="FQDN">9</td>
                      <td className="u-align--center border" role="rowheader" aria-label="FQDN">9</td>
                      <td className="u-align--center border" role="rowheader" aria-label="FQDN">9</td>
                      <td className="u-align--center border" role="rowheader" aria-label="FQDN">9</td>
                      <td className="u-align--center border" role="rowheader" aria-label="FQDN">49</td>
                      <td className="u-align--center border" role="rowheader" aria-label="FQDN">49</td>
                      <td className="u-align--center border" role="rowheader" aria-label="FQDN"></td>
                    </tr>
                  </tbody>
                </table>
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
