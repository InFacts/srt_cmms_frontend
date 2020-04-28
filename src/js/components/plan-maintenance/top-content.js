import React from 'react';

import '../../../css/grid12.css';

class TopContent extends React.Component {

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
                        <h4 className="head-title">สร้างแผนวาระการซ่อมบำรุงรักษา</h4>

                        <div className="grid_12">
                            <div className="grid_2"><p className="cancel-default">ชื่อแผนซ่อมบำรุง:</p></div>
                            <div className="grid_7 pull_0">
                                <div className="p-search-box cancel-margin">
                                    <input type="search" className="p-search-box__input cancel-default" />
                                    <button className="p-search-box__button cancel-padding" ><i className="p-icon--external-link" id="showModal" aria-controls="modal"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="grid_12">
                            <div className="grid_2"><p className="cancel-default">ความถี่การซ่อมบำรุง:</p></div>
                            <div className="grid_7 pull_0">
                                <input type="text" className="cancel-default grid_3 "></input>

                                <select className="edit-select-top grid_3 float-right" >
                                    <option defaultValue="0"></option>
                                    <option defaultValue="1">Cosmic Cuttlefish</option>
                                    <option defaultValue="2">Bionic Beaver</option>
                                    <option defaultValue="3">Xenial Xerus</option>
                                </select>

                                <p className="cancel-default grid_1 float-right">ครั้งต่อ:</p>
                            </div>
                        </div>
                        <div className="grid_12">
                            <div className="grid_2"><p className="cancel-default">แขวง:</p></div>
                            <div className="grid_3 pull_0">
                                <input className="cancel-default" type="text" />
                            </div>
                        </div>
                        <div className="grid_12">
                            <div className="grid_2"><p className="cancel-default">รายละเอียดสถานที่:</p></div>
                            <div className="grid_9 pull_0">
                                <textarea className="edit" name="Text1" cols="40" rows="2"></textarea>
                            </div>
                        </div>

                    </section>

                    <div className="grid_12">
                        <div className="tab grid_6">
                            <button id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "แผนการดำเนินงาน")}>แผนการดำเนินงาน</button>
                            <button className="tablinks" onClick={e => this.tapChange(e, "อุปกรณ์ที่ต้องนำไปปฎิบัติงาน")}>อุปกรณ์ที่ต้องนำไปปฎิบัติงาน</button>
                        </div>
                    </div>
                </div>

                {/* PopUp */}
                <div className="modal" id="modal" style={{ display: "none" }}>
                    <div className="gray-board">
                        <p className="head-title-modal edit">แผนบำรุงรักษา</p>
                        <div className="container_12 edit-padding">


                            <div className="grid_12">
                                <div className="grid_2"><p className="cancel-default">แขวง:</p></div>
                                <div className="grid_8 pull_0">
                                    <input type="text" className="cancel-default grid_3" />
                                </div>
                            </div>

                            <div className="grid_12">
                                <div className="grid_2"><p className="cancel-default">ความถี่การซ่อมบำรุง:</p></div>
                                <div className="grid_7 pull_0">
                                    <input type="text" className="cancel-default grid_3 "></input>
                                    <select className="edit-select-top grid_3 float-right" >
                                        <option defaultValue="0"></option>
                                        <option defaultValue="1">Cosmic Cuttlefish</option>
                                        <option defaultValue="2">Bionic Beaver</option>
                                        <option defaultValue="3">Xenial Xerus</option>
                                    </select>
                                    <p className="cancel-default grid_1 float-right">ครั้งต่อ:</p>
                                </div>
                            </div>

                            <div className="grid_12">
                                <div className="grid_2"><p className="cancel-default">ชื่อแผนซ่อมบำรุง:</p></div>
                                <div className="grid_8 pull_0">
                                    <input type="text" className="cancel-default grid_3" />
                                </div>
                                <button className="button-blue ml-1 grid_1 pull_0" type="button">ค้นหา</button>
                            </div>

                            <table className="cancel-border mt-3">
                                <thead>
                                    <tr>
                                        <th className="font-for-status" style={{ width: "350px", paddingLeft: "50px" }}>เลขที่คลัง</th>
                                        <th className="font-for-status" style={{ width: "350px" }}>ชื่อคลัง</th>
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

                            <div className="grid_12 ">
                                <div className="grid_8 pull_0 float-right">
                                    <button className="button-white edit mt-3 grid_1 float-right" type="button" aria-label="Close active modal" aria-controls="modal" id="aria-controls">ยกเลิก</button>
                                    <button className="button-blue edit mt-3  grid_1 float-right" type="button" aria-label="Select active modal" aria-controls="modal" id="aria-controls">เลือก</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    };
}

export default TopContent;