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
                        <h4 className="head-title">สร้างแผนบำรุงรักษา</h4>

                        <div className="grid_12">
                            <div className="grid_2"><p className="cancel-default">ชื่อแผนซ่อมบำรุง:</p></div>
                            <div className="grid_4 pull_0">
                                <div className="p-search-box cancel-margin ">
                                    <input type="search" className="p-search-box__input cancel-default" />
                                    <button className="p-search-box__button cancel-padding" ><i className="p-icon--external-link" id="showModal" aria-controls="modal"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="grid_12">
                            <div className="grid_2"><p className="cancel-default">ความถี่การซ่อมบำรุง:</p></div>
                            <div className="grid_9 pull_0">
                                <input className="cancel-default" type="text"  />
                            </div>
                        </div>
                        <div className="grid_12">
                            <div className="grid_2"><p className="cancel-default">แขวง:</p></div>
                            <div className="grid_9 pull_0">
                                <input className="cancel-default" type="text"  />
                            </div>
                        </div>

                    </section>

                    <div className="grid_12">
                        <div className="tab grid_6">
                            <button id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "Checklist")}>Checklist</button>
                            <button className="tablinks" onClick={e => this.tapChange(e, "ระบุผู้ปฎิบัติงาน")}>ระบุผู้ปฎิบัติงาน</button>
                            <button className="tablinks" onClick={e => this.tapChange(e, "สรุป")}>สรุป</button>
                            <button className="tablinks" onClick={e => this.tapChange(e, "หมายเหตุ")}>หมายเหตุ</button>
                        </div>
                    </div>
                </div>

                {/* PopUp */}
                <div className="modal" id="modal" style={{ display: "none" }}>
                    <div className="gray-board">
                        <h3 className="head-title-modal">คลังต้นทาง</h3>
                        <div className="container">

                            <div className="grid_12">

                                <div className="grid_2 ">
                                    <p className="top-text ">แขวง:</p>
                                    <p className="top-text">ความถี่การซ่อมบำรุง:</p>
                                    <p className="top-text">ชื่อแผนซ่อมบำรุง:</p>
                                </div>

                                <div className="grid_2 pull_0  ">
                                    <input className="cancel-default" type="text"  />
                                    <input className="cancel-default" type="text"  />
                                    <input className="cancel-default" type="text"  />
                                </div>

                                <div className="grid_2">
                                    <p className="ml-4n mt-4 top-text">ครั้งต่อ:</p>
                                </div>
                                <div className="grid_1 pull_0 ">
                                    <div className="ml-8n mt-4 p-search-box cancel-margin mm">
                                        <select className="p-search-box__input cancel-default" name="exampleSelect" id="exampleSelect" style={{ fontSize: "0.8rem" }}>
                                            <option value="1">วัน</option>
                                            <option value="2">เดือน</option>
                                            <option value="3">ปี</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid_8 mt-5n">
                                    <button className="button-blue" style={{ float: "right" }} type="button">ค้นหา</button>
                                </div>

                            </div>

                            <table className="cancel-border mt-3">
                                <thead>
                                    <tr>
                                        <th className="font-for-status" style={{ width: "270px", paddingLeft: "50px" }}>ชื่อแผนซ่อมบำรุง</th>
                                        <th className="font-for-status" style={{ width: "270px" }}>ความถี่</th>
                                        <th className="font-for-status">หมายเหตุ</th>
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

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="grid_8">
                                <div className="">
                                    <button className="button-gray mt-3" style={{ float: "right" }} type="button" aria-label="Close active modal" aria-controls="modal" id="aria-controls">ยกเลิก</button>
                                </div>
                                <div className="ml-2n">
                                    <button className="button-blue mt-3" style={{ float: "right" }} type="button" aria-label="Close active modal" aria-controls="modal" id="aria-controls">เลือก</button>
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