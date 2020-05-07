import React from 'react';
// import { connect } from 'react-redux'

import Document from '../../../images/document.svg';
import Table from '../common/table.js';

import '../../../css/style.css';
import '../../../css/tabs.css';
import '../../../css/grid12.css';
import '../../../css/modal.css';
import '../../../css/table.css';

class BottomContent extends React.Component {

    render() {
        return (
            <form>
                <div id="blackground-gray">
                    <div className="container_12 clearfix">
                        <div className="grid_12 ">

                            <div id="รายการ" className="tabcontent">
                                <h3 className="head-title-bottom mt-2">คลังต้นทาง</h3>

                                <div className="grid_12 mb-2" style={{ paddingRight: "10px" }}>
                                    <Table headTable={this.props.headTable} bodyTable={this.props.bodyTable} />
                                </div>

                                <div className="grid_12">
                                    <div className="grid_2"><p className="cancel-default">ประเภทบัญชี</p></div>
                                    <div className="grid_3 pull_0">
                                        <input type="text" className="cancel-default"></input>
                                    </div>

                                    <div className="p-search-box cancel-margin grid_3  float-right">
                                        <input type="text" className=" p-search-box__input cancel-default  "></input>
                                    </div>
                                    <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">จำนวนสุทธิ</p></div>
                                </div>

                                <div className="grid_12">
                                    <div className="grid_2"><p className="cancel-default">หมายเหตุ</p></div>
                                    <div className="grid_5 pull_0">
                                        <textarea className="edit" name="Text1" cols="40" rows="2"></textarea>
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
                        <p className="head-title-modal edit">คลังต้นทาง</p>
                        <div className="container_12 edit-padding">
                            <div className="grid_12">
                                <div className="grid_2"><p className="cancel-default">ค้นหาเลขที่คลัง</p></div>
                                <div className="grid_8 pull_0">
                                    <input type="text" className="cancel-default" />
                                </div>
                                <button className="button-blue grid_1 float-right mr-5" type="button">ค้นหา</button>
                            </div>

                            <div className="grid_12">
                                <table className="table-many-column">
                                    <thead>
                                        <tr>
                                            <th className="font" style={{ minWidth: "300px" }}>เลขที่คลัง</th>
                                            <th className="font" style={{ minWidth: "500px" }}>ชื่อคลัง</th>
                                            <th className="font" style={{ minWidth: "100px" }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="edit-padding" style={{ minWidth: "200px" }}>1123451</td>
                                            <td className="edit-padding" style={{ minWidth: "300px" }}>คลังหากใหญ่้</td>
                                            <td className="edit-padding text-left" style={{ minWidth: "80px" }}>
                                                <button className="button-green">ยืนยัน</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="grid_12">
                                <button className="button-blue mt-5 float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modal" id="aria-controls">กลับ</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal" id="modal2" style={{ display: "none" }}>
                    <div className="gray-board">
                        <p className="head-title-modal edit">เลขที่สิ่งของ</p>
                        <div className="container_12 edit-padding">
                            <div className="grid_12">
                                <div className="grid_2"><p className="cancel-default">ค้นหาเลขที่สิ่งของ</p></div>
                                <div className="grid_8 pull_0">
                                    <input type="text" className="cancel-default" />
                                </div>
                                <button className="button-blue grid_1 float-right mr-5" type="button">ค้นหา</button>
                            </div>

                            <div className="grid_12">
                                <table className="table-many-column mt-3">
                                    <thead>
                                        <tr>
                                            <th className="font" style={{ minWidth: "300px" }}>เลขที่สิ่งของ</th>
                                            <th className="font" style={{ minWidth: "500px" }}>รายละเอียดอะไหล่</th>
                                            <th className="font" style={{ minWidth: "100px" }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="edit-padding" style={{ minWidth: "200px" }}>1123451</td>
                                            <td className="edit-padding" style={{ minWidth: "300px" }}>คลังหากใหญ่้</td>
                                            <td className="edit-padding text-left" style={{ minWidth: "80px" }}>
                                                <button className="button-green">ยืนยัน</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="grid_12">
                                <button className="button-blue mt-5 float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modal2" id="aria-controls">กลับ</button>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        )
    };
}

// const mapStateToProps = (state) => ({
//     headTable: state.headTable,
//     bodyTable: state.bodyTable
// })

// const mapDispatchToProps = (dispatch) => ({
//     handleChangeText: (e) => dispatch(changeText(e)),
// })

// export default connect(mapStateToProps)(BottomContent);
export default BottomContent;


// ACtion Creator
// export const changeText = (e) => {
//     console.log(e.target.value)
//     return {
//         type: "TEXT",
//         value: e.target.value
//     }
// }