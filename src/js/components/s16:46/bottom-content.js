import React from 'react';

import Document from '../../../images/document.svg'

import '../../../css/style.css'
import '../../../css/tabs.css'
import '../../../css/grid12.css';
import '../../../css/modal.css';

class BottomContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <form>
                <div id="blackground-gray">
                    <div className="container_12 clearfix">
                        <div className="grid_12 ">

                            <div id="คลังต้นทาง" className="tabcontent">
                                <h3 className="head-title-bottom mt-2">คลังต้นทาง</h3>
                                <div className="grid_12">
                                    <div className="grid_3"><p className="cancel-default">เลขที่เอกสาร:</p></div>
                                    <div className="grid_6 pull_0">
                                        <div className="p-search-box cancel-margin">
                                            <input type="text" className="p-search-box__input cancel-default" />
                                            <button type="button" className="p-search-box__button cancel-padding" alt="search"><i className="p-icon--search" id="showModal" aria-controls="modal" ></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid_12 mb-2">
                                    <div className="grid_3"><p className="cancel-default">รูปแบบการรับของ:</p></div>
                                    <div className="grid_6 pull_0">
                                        <input className="d-inline" type="radio" name="RadioOptions" id="Radio1" value="option1" />
                                        <label htmlFor="Radio1" className="cancel-default d-inline">รับของเอง</label>
                                        <input className="d-inline ml-3" type="radio" name="RadioOptions" id="Radio2" value="option2" />
                                        <label htmlFor="Radio2" className="cancel-default d-inline ml-3">ส่งไปยังคลังปลายทาง</label>
                                    </div>
                                </div>

                                {/* <div className="grid_12 mb-2">
                                    <div className="grid_2">
                                        <p className="top-text">เลขที่เอกสาร:</p>
                                    </div>
                                    <div className="grid_5 pull_0">
                                        <div className="" style={{ width: "300px" }}>
                                            <input className="d-inline" type="radio" name="RadioOptions" id="Radio1" value="option1" />
                                            <label htmlFor="Radio1" className="cancel-default d-inline">รับของเอง</label>
                                            <input className="d-inline ml-3" type="radio" name="RadioOptions" id="Radio2" value="option2" />
                                            <label htmlFor="Radio2" className="cancel-default d-inline ml-3">ส่งไปยังคลังปลายทาง</label>
                                        </div>
                                    </div>
                                </div> */}

                                <table className="cancel-border">
                                    <thead>
                                        <tr style={{ border: "none", }}>
                                            <th style={{ width: "28px" }}></th>
                                            <th style={{ width: "100px" }}></th>
                                            <th style={{ width: "110px" }}></th>
                                            <th></th>
                                            <th style={{ width: "50px" }}></th>

                                            <th style={{ width: "60px", borderBottom: "1px solid #969696" }}></th>
                                            <th style={{ borderBottom: "1px solid #969696" }}></th>
                                            <th style={{ borderBottom: "1px solid #969696" }}></th>
                                            <th className="font" style={{ width: "80px", textAlign: "center", borderBottom: "1px solid #969696" }}>คลังปลายทาง</th>
                                            <th style={{ width: "60px", borderBottom: "1px solid #969696" }}></th>
                                            <th style={{ width: "100px", borderBottom: "1px solid #969696" }}></th>
                                            <th style={{ width: "60px", borderBottom: "1px solid #969696" }}></th>
                                            <th style={{ width: "60px", borderBottom: "1px solid #969696" }}></th>
                                        </tr>
                                        <tr>
                                            <th className="font" style={{ width: "28px" }}>#</th>
                                            <th className="font" style={{ width: "100px" }}>เลขที่สิ่งของ</th>
                                            <th className="font" style={{ width: "110px" }}>รายละเอียดอะไหล่</th>
                                            <th className="font">เบิกจำนวน</th>
                                            <th className="font" style={{ width: "50px" }}>หน่วย</th>
                                            <th className="font" style={{ width: "60px" }}>คงคลัง</th>
                                            <th className="font">รอส่งมอบ</th>
                                            <th className="font">ระหว่างการจัดซื้อ</th>
                                            <th className="font" style={{ width: "80px" }}>จำนวนสุทธิ</th>
                                            <th className="font" style={{ width: "60px" }}>ซาก</th>
                                            <th className="font" style={{ width: "100px" }}>ของเก่าพร้อมใช้งาน</th>
                                            <th className="font" style={{ width: "60px" }}>ส่งซ่อม</th>
                                            <th className="font" style={{ width: "60px" }}>ของเสีย</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="edit-padding" style={{ width: "28px" }}>1</td>
                                            <td className="edit-padding" style={{ width: "100px" }}>
                                                <div className="p-search-box cancel-margin">
                                                    <input type="text" className="p-search-box__input cancel-default" />
                                                    <button type="button" className="p-search-box__button cancel-padding" alt="search"><i className="p-icon--search" id="showModal2" aria-controls="modal2"></i></button>
                                                </div>
                                            </td>
                                            <td className="edit-padding" style={{ width: "110px" }}>4-days</td>
                                            <td className="edit-padding">
                                                <input className="cancel-default" style={{ paddingRight: "3px" }} type="number" />
                                            </td>
                                            <td className="edit-padding" style={{ width: "50px" }}>ชิ้น</td>
                                            <td className="edit-padding" style={{ width: "60px" }}>1,0000</td>
                                            <td className="edit-padding">1,0000</td>
                                            <td className="edit-padding">2-days</td>
                                            <td className="edit-padding" style={{ width: "80px" }}>1,0000</td>
                                            <td className="edit-padding" style={{ width: "60px" }}>1,0000</td>
                                            <td className="edit-padding" style={{ width: "100px" }}>1,0000</td>
                                            <td className="edit-padding" style={{ width: "60px" }}>1,0000</td>
                                            <td className="edit-padding" style={{ width: "60px" }}>1,0000</td>
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

                            <div id="สถานะเอกสาร" className="tabcontent">
                                <h4 className="head-title-bottom mt-2">สถานะของเอกสาร</h4>
                                <table className="cancel-border">
                                    <thead>
                                        <tr>
                                            <th className="font-for-status" style={{ width: "50px" }}></th>
                                            <th className="font-for-status">ตำแหน่ง</th>
                                            <th className="font-for-status">หน่วยงาน</th>
                                            <th className="font-for-status">ชื่อผู้ลงนาม</th>
                                            <th className="font-for-status">วันที่ลงนาม</th>
                                            <th className="font-for-status">สถานะ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="font-for-status" style={{ width: "50px" }}>
                                                <i className="fas fa-check-circle" style={{ color: "green" }}></i>
                                            </td>
                                            <td className="font-for-status">ช่างฝีมือ 6</td>
                                            <td className="font-for-status">ตอนหาดใหญ่ (ผู้ขอเบิก)</td>
                                            <td className="font-for-status">นายวิชัย ไชยแก้ว</td>
                                            <td className="font-for-status">31/07/2018 22:24PM</td>
                                            <td className="font-for-status">ลงนามเรียบร้อยแล้ว</td>
                                        </tr>
                                        <tr>
                                            <td className="font-for-status" style={{ width: "50px" }}>
                                                <i className="fas fa-check-circle" style={{ color: "gray" }}></i>
                                            </td>
                                            <td className="font-for-status">สสญ.หม (ผู้ขอเบิก)</td>
                                            <td className="font-for-status">แขวงบำรุงรักษาอาณัติสัญญาณหาดใหญ่</td>
                                            <td className="font-for-status">นายภาคิน แก้วเมืองสอง</td>
                                            <td className="font-for-status">-</td>
                                            <td className="font-for-status">รอการอนุมัติ</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>

                {/* PopUp */}
                <div className="modal" id="modal" style={{ display: "none" }}>
                    <div className="gray-board">
                        <h3 className="head-title-modal">คลังต้นทาง</h3>
                        <div className="container-modal">
                            <h5 className="cancel-default colum1of2-modal">ค้นหาเลขที่คลัง:</h5>
                            <button className="button-blue ml-1 float-right" type="button">ค้นหา</button>
                            <input type="text" className="cancel-default colum2of2-modal" />
                            <table className="cancel-border mt-3">
                                <thead>
                                    <tr>
                                        <th className="font-for-status" style={{ width: "270px", paddingLeft: "50px" }}>เลขที่คลัง</th>
                                        <th className="font-for-status" style={{ width: "270px" }}>ชื่อคลัง</th>
                                        <th className="font-for-status"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="font-for-status" style={{ width: "270px", paddingLeft: "50px" }}>
                                            1123451
                                        </td>
                                        <td className="font-for-status" style={{ width: "270px" }}>
                                            คลังหากใหญ่้
                                        </td>
                                        <td className="font-for-status">
                                            <button className="button-green">ยืนยัน</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className="button-blue mt-3 float-right" type="button" aria-label="Close active modal" aria-controls="modal" id="aria-controls">Close</button>
                        </div>
                    </div>
                </div>

                <div className="modal" id="modal2" style={{ display: "none" }}>
                    <div className="gray-board">
                        <h3 className="head-title-modal">เลขที่สิ่งของ</h3>
                        <div className="container-modal">
                            <h5 className="cancel-default colum1of2-modal">ค้นหาเลขที่สิ่งของ:</h5>
                            <button className="button-blue ml-1 float-right" type="button">ค้นหา</button>
                            <input type="text" className="cancel-default colum2of2-modal" />
                            <table className="cancel-border mt-3">
                                <thead>
                                    <tr>
                                        <th className="font-for-status" style={{ width: "270px", paddingLeft: "50px" }}>เลขที่สิ่งของ</th>
                                        <th className="font-for-status" style={{ width: "270px" }}>รายละเอียดอะไหล่</th>
                                        <th className="font-for-status"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="font-for-status" style={{ width: "270px", paddingLeft: "50px" }}>
                                            1123451
                                        </td>
                                        <td className="font-for-status" style={{ width: "270px" }}>
                                            คลังหากใหญ่้
                                        </td>
                                        <td className="font-for-status">
                                            <button className="button-green">ยืนยัน</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className="button-blue mt-3 float-right" type="button" aria-label="Close active modal" aria-controls="modal2" id="aria-controls">Close</button>
                        </div>
                    </div>
                </div>

            </form>
        )
    };
}

export default BottomContent;