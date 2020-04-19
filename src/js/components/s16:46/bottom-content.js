import React from 'react';

import '../../../css/style.css'
import '../../../css/tabs.css'

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

    componentDidMount(){
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
                {/* INput */}
                <div id="คลังต้นทาง" className="tabcontent">
                    <h4 className="head-title-bottom mt-2">ข้อมูลคลังต้นทาง</h4>

                    <div className="font-size-bottom-content">
                        <div className="row">
                            <div className="col-2">
                                <label >คลังต้นทาง:</label>
                            </div>
                            <div className="col-5 mt-auto mb-auto">
                                <div className=" p-search-box m0">
                                    <input type="text" className="p-search-box__input is-dense" />
                                    <button type="button" className="p-search-box__button m0" id="aria-controls"><i className="p-icon--search" id="aria-controls"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-2n">
                            <div className="col-2">
                                <label >รูปแบบการรับของ:</label>
                            </div>
                            <div className="col-6 mt-auto mb-auto p-form--inline">
                                <div className="p-form__group">
                                    <input type="radio" name="RadioOptions" id="Radio1" value="option1" />
                                    <label className="mr-2">รับของเอง</label>
                                    <input type="radio" name="RadioOptions" id="Radio2" value="option1" />
                                    <label>ส่งไปยังคลังปลายทาง</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PopUp */}
                    <div className="p-modal none-popup" id="modal">
                        <div className="p-modal__dialog blackground-whites" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description">
                            <section className="p-modal__header blackground-white">
                                <h2 className="p-modal__title head-title" id="modal-title">คลังต้นทาง</h2>
                                <button className="p-modal__close" aria-label="Close active modal" aria-controls="modal" id="aria-controls">Close</button>
                            </section>
                            <div className="row">
                                <div className="col-3">
                                    <label >ค้นหาเลขที่คลัง:</label>
                                </div>
                                <div className="col-9 mt-auto mb-auto">
                                    <div className=" p-search-box m0">
                                        <input type="text" className="p-search-box__input is-dense" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <label >ชื่อคลัง:</label>
                                </div>
                                <div className="col-9 mt-auto mb-auto">
                                    <div className=" p-search-box m0">
                                        <input type="text" className="p-search-box__input is-dense" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <button className="p-button--positive blue">ยืนยัน</button>
                            </div>
                            <div className="p-heading-icon--small">
                                <table className="p-table-expanding mt-3" role="grid">
                                    <thead className="blackground-gray-for-head-table">
                                        <tr role="row">
                                            <th className="flex-basis" id="t-name" aria-sort="none">เลขที่คลัง</th>
                                            <th id="t-users" aria-sort="none">ชื่อคลัง</th>
                                            <th id="t-revenue" aria-sort="none" className="u-align--center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="blackground-white-for-table">
                                        {/* <tr role="row">
                                        <td role="rowheader" aria-label="Name">Unknown</td>
                                        <td role="gridcell" aria-label="Users">2c:44:fd:80:3f:25</td>
                                        <td role="gridcell" className="u-align--center">
                                            <button className="u-toggle is-dense" aria-controls="expanded-row" aria-expanded="false" data-shown-text="Hide" data-hidden-text="Show">Show</button>
                                        </td>
                                    </tr> */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <table className="blackground-white border-none p-table--mobile-card">
                        <thead>
                            <tr role="row">
                                <th className="u-align--center pp" style={{ width: "2.5rem" }}>#</th>
                                <th className="u-align--left pp" style={{ width: "6rem" }}>เลขที่สิ่งของ</th>
                                <th className="u-align--center pp">รายละเอียดอะไหล่</th>
                                <th className="u-align--center pp">เบิกจำนวน</th>
                                <th className="u-align--center pp">หน่วย</th>
                                <th className="u-align--center pp">คลังต้นทาง</th>
                                <th className="u-align--center pp">คลังปลายทาง</th>
                                <th className="u-align--center pp">คงคลัง</th>
                                <th className="u-align--center pp">รอส่งมอบ</th>
                                <th className="u-align--center pp">ระหว่างการจัดซื้อ</th>
                                <th className="u-align--center pp">จำนวนสุทธิ</th>
                                <th className="u-align--center pp">ซาก</th>
                                <th className="u-align--center pp">ของเก่าพร้อมใช้งาน</th>
                                <th className="u-align--center pp">ส่งซ่อม</th>
                                <th className="u-align--center pp">ของเสีย</th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: "0.8rem" }}>
                            <tr>
                                <td className="u-align--center pp" role="rowheader" aria-label="#">1</td>
                                <td className="u-align--left pp" role="gridcell" aria-label="เลขที่สิ่งของ">
                                    <div className="p-search-box cancel-default w-100">
                                        <input type="text" className="p-search-box__input cancel-default" />
                                        <button type="button" className="p-search-box__button cancel-d" alt="search"><i className="p-icon--search"></i></button>
                                    </div>
                                </td>
                                <td className="u-align--center pp" role="gridcell" aria-label="รายละเอียดอะไหล่">1g</td>
                                <td className="u-align--center pp" role="gridcell" aria-label="เบิกจำนวน">1</td>
                                <td className="u-align--center pp" role="gridcell" aria-label="หน่วย">1</td>
                                <td className="u-align--center pp" role="gridcell" aria-label="คลังต้นทาง">4</td>
                                <td className="u-align--center pp" role="gridcell" aria-label="คลังปลายทาง">2 </td>
                                <td className="u-align--center pp" role="gridcell" aria-label="คงคลัง">1</td>
                                <td className="u-align--center pp" role="gridcell" aria-label="รอส่งมอบ">2TB</td>
                                <td className="u-align--center pp" role="rowheader" aria-label="ระหว่างการจัดซื้อ">1</td>
                                <td className="u-align--center pp" role="gridcell" aria-label="จำนวนสุทธิ">On</td>
                                <td className="u-align--center pp" role="gridcell" aria-label="ซาก">\</td>
                                <td className="u-align--center pp" role="gridcell" aria-label="ของเก่าพร้อมใช้งาน">1</td>
                                <td className="u-align--center pp" role="gridcell" aria-label="ส่งซ่อม">1</td>
                                <td className="u-align--center pp" role="gridcell" aria-label="ของเสีย">4</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div id="แนบไฟล์" className="tabcontent">
                    <h4 className="head-title-bottom mt-2">ข้อมูลแนบไฟล์</h4>
                    <div className="u-clearfix">
                        <div className="u-float-left">
                            <label className="p-form__label" ><span>ไฟล์เอกสาร {this.state.number} </span></label>
                        </div>
                        <div className=" u-float-right">
                            <input id="fileButton" type="file" hidden />
                            <label onClick={this.fileUploadButton} ><span>แนบไฟล์ +</span></label>
                        </div>
                    </div>
                    <div className="dropZone" >

                        <img src="http://i.imgur.com/Hw1dyoP.png" alt="Generic placeholder thumbnail" height="100px" />
                        <br></br>
                ไม่พบไฟล์เอกสาร
                <br></br>
                คลิกที่ "+" ในการแนบเอกสาร
                {this.state.file_show.map((file_show, index) => (
                            <div className="ui item segment p-form">
                                <div className="row">
                                    <div className="col-3 col-small-1 col-medium-1">
                                        <img alt='some value1' src="http://semantic-ui.com/images/wireframe/image.png" width="90" height="90" />
                                    </div>
                                    <div className="col-3 col-small-1 col-medium-1">
                                        <h5 className="header">{file_show.des}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Table Status */}
                <div id="สถานะเอกสาร" className="tabcontent">
                    <h4 className="head-title-bottom mt-2">สถานะของเอกสาร</h4>
                    <table className="blackground-white border p-table--mobile-card">
                        <thead>
                            <tr role="row">
                                <th className="u-align--center border" style={{ width: "2.5rem" }}></th>
                                <th className="u-align--center border">ตำแหน่ง</th>
                                <th className="u-align--center border">หน่วยงาน</th>
                                <th className="u-align--center border">ชื่อผู้ลงนาม</th>
                                <th className="u-align--center border">วันที่ลงนาม</th>
                                <th className="u-align--center border">สถานะ</th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: "0.8rem" }}>
                            <tr>
                                <td className="u-align--center border" role="rowheader" aria-label="FQDN"><i className="fas fa-check-circle" style={{ color: "green", fontSize: "18px" }}></i></td>
                                <td className="u-align--center border" role="rowheader" aria-label="FQDN">ช่างฝีฝือ 6</td>
                                <td className="u-align--center border" role="rowheader" aria-label="FQDN">ตอนหาดใหญ่ผู้ขอเบิก</td>
                                <td className="u-align--center border" role="rowheader" aria-label="FQDN">นายวินัยชัยแก้ว</td>
                                <td className="u-align--center border" role="rowheader" aria-label="FQDN">31/07/2018 22:24:PM</td>
                                <td className="u-align--center border" role="rowheader" aria-label="FQDN">ลงนามเรียบร้อยแล้ว</td>
                            </tr>
                            <tr>
                                <td className="u-align--center border" role="rowheader" aria-label="FQDN"><i className="fas fa-check-circle" style={{ color: "gray", fontSize: "18px" }}></i></td>
                                <td className="u-align--center border" role="rowheader" aria-label="FQDN">สสญ.ห (ผู้ขอเบิก)</td>
                                <td className="u-align--center border" role="rowheader" aria-label="FQDN">แขวงบำรุงอาณัติสัญญาณหาดใหญ่</td>
                                <td className="u-align--center border" role="rowheader" aria-label="FQDN">นายภาคิน แก้วเมืองสอง</td>
                                <td className="u-align--center border" role="rowheader" aria-label="FQDN">-</td>
                                <td className="u-align--center border" role="rowheader" aria-label="FQDN">รอการอณุมัติ</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </form>
        )
    };
}

export default BottomContent;