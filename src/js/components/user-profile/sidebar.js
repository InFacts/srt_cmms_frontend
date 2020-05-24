import React from 'react';
import { Link } from 'react-router-dom'

// import '../../../vender/fontawesome-free/css/all.css';
// import '../../../css/position-arrow-pmt.css';
// import '../../../css/style.css'
import '../../../css/grid12.css';
// import '../../../css/table.css';

class SideBar extends React.Component {
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
                    <section className="grid_12 ">
                        <h4 className="head-title">โปรไฟล์ส่วนตัว</h4>

                        <div className="grid_12">
                            <div className="grid_2">
                                <p className="top-text">ชื่อ-สกุล</p>
                            </div>
                            <div className="grid_5 pull_1">
                                <p className="top-text">นายสรวิศ ศิริมาลีวัฒนา</p>
                            </div>
                        </div>

                        <div className="grid_12">
                            <div className="grid_2">
                                <p className="top-text">ตำแหน่งงาน</p>
                            </div>
                            <div className="grid_5 pull_1">
                                <p className="top-text">พนักงานเทคนิค 8 (สารวัตรงานบำรุงรักษาอาณัติสัญญาณแขวงธนบุรี)</p>
                            </div>
                        </div>

                        <div className="grid_12">
                            <div className="grid_2">
                                <p className="top-text">สังกัด</p>
                            </div>
                            <div className="grid_5 pull_1">
                                <p className="top-text">แขวงบำรุงรักษาอาณัติสัญญาณแขวงธนบุรี</p>
                            </div>
                        </div>

                        
                    </section>

                    <div className="grid_12">
                        <div className="tab grid_11">
                            <button id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "รายการ")}>เอกสารราชการ</button>
                            <button className="tablinks" onClick={e => this.tapChange(e, "แนบไฟล์")}>ประวัติการใช้งาน</button>
                            <button className="tablinks" onClick={e => this.tapChange(e, "ข้อความแจ้งเตือน")}>ข้อความแจ้งเตือน</button>
                            <button className="tablinks" onClick={e => this.tapChange(e, "ข้อมูลบัญชีผู้ใช้งาน")}>ข้อมูลบัญชีผู้ใช้งาน</button>
                        </div>
                    </div>

                </div>
                <div id="blackground-gray">
                    <div className="container_12 clearfix">
                    <div className="grid_12 ">

                        <div id="รายการ" className="tabcontent">
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
                                {/* <input type="text" className="cancel-default font-black" defaultValue={this.props.mockUpData.address} readOnly></input> */}
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
                                {/* <input type="text" className="cancel-default font-black" defaultValue={this.props.mockUpData.no_po} readOnly></input> */}
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

                        <div id="ข้อมูลบัญชีผู้ใช้งาน" className="tabcontent">
                            <h4 className="head-title-bottom mt-2">ข้อมูลบัญชีผู้ใช้งาน</h4>
                            {/* <div className="dropZone" > */}
                            <table>
  <thead>
    <tr>
      <th></th>
      <th>Foundation Cloud</th>
      <th>Foundation Cloud Plus</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Expert delivery of an Ubuntu OpenStack cloud</th>
      <td>Reference architecture</td>
      <td>Custom architecture</td>
    </tr>
    <tr>
      <th>Workshop and training</th>
      <td>2-days</td>
      <td>4-days</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th>One-time price</th>
      <td>$75,000</td>
      <td>$150,000</td>
    </tr>
  </tfoot>
</table>
                            {/* </div> */}
                        </div>

                    </div>
                    </div>
                </div>
        </div>
        )
    };
}
export default SideBar;