import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo.png';

import '../../../css/test.css';
import '../../../css/grid12.css';
import '../../../css/tabs.css';
import '../../../vender/fontawesome-free/css/all.css';

class Test extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        this.openCity = this.openCity.bind(this);
    }

    openCity(evt, cityName) {
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
            <div>
                <div id="header">
                    <div className="container_12 clearfix">
                        <ul className="grid_12 nav-ul">
                            <li className="nav-li"><Link to="/test">
                                <img src={logo} alt="logo" width="160px" />
                            </Link></li>
                            <li className="nav-li"><Link className="mt-12" to="/test">ระบบบริหารข้อมูลอะไหล่</Link></li>
                            <li className="nav-li"><Link className="mt-12" to="/test">ระบบบริหารงานซ่อมบำรุง</Link></li>
                            <li className="nav-li"><Link className="mt-12" to="/test">ระบบวิเคราะห์และวางแผนทรัพยากรซ่อมบำรุง</Link></li>
                            <li className="nav-li"><Link className="mt-12" to="/test">สถานะรอการอนุมัติ</Link></li>
                            <li className="nav-li" style={{ float: "right" }}><Link className="mt-12" to="/test"><i className="fas fa-bell" style={{ fontSize: "20px", color: "white" }}></i></Link></li>
                            <li className="nav-li" style={{ float: "right" }}><Link className="mt-12" to="/test"><i className="fas fa-user-circle" style={{ fontSize: "20px", color: "white" }}></i></Link></li>
                        </ul>
                    </div>
                </div>

                <div id="blackground-white">
                    <div className="container_12 clearfix">
                        <section className="grid_12 ">
                            <h4 className="head-title">เบิก/โอนย้าย อะไหล่/พัสดุ - แบบ ส.16/46</h4>
                            <div className="grid_2">
                                <p className="top-text">เลขที่เอกสาร:</p>
                                <p className="top-text">ผู้เบิก:</p>
                            </div>
                            <div className="grid_3 pull_0">
                                <p className="top-text">ตช.04/2563</p>
                                <p className="top-text">นายอาทิต แห่งการรถไฟ</p>
                            </div>
                            <div className="grid_2">
                                <p className="top-text">ลงวันที่:</p>
                                <p className="top-text">คลังปลายทาง:</p>
                            </div>
                            <div className="grid_2 pull_0">
                                <p className="top-text">14 เม.ย. 2563  06:02 น.</p>
                                <p className="top-text">ลาดกระบัง</p>
                            </div>
                        </section>

                        <div className="grid_12">
                            <div className="tab">
                                <button className="tablinks" onClick={e => this.openCity(e, "London")}>คลังต้นทาง</button>
                                <button className="tablinks" onClick={e => this.openCity(e, "Paris")}>แนบไฟล์</button>
                                <button className="tablinks" onClick={e => this.openCity(e, "Tokyo")}>สถานะเอกสาร</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="blackground-gray">
                    <div className="container_12 clearfix">
                        <div className="grid_12 ">
                            <div id="London" className="tabcontent">
                                <h3 className="head-title-bottom">คลังต้นทาง</h3>
                                <div className="grid_12 mb-2">
                                    <div className="grid_2">
                                        <h5 className="cancel-default">เลขที่เอกสาร:</h5>
                                        <h5 className="cancel-default">รูปแบบการรับของ:</h5>
                                        <h5 className="cancel-default">เดินทางโดย:</h5>
                                        <h5 className="cancel-default">ออกเดินทาง:</h5>
                                    </div>
                                    <div className="grid_5 pull_0">
                                        <form class="p-search-box cancel-margin">
                                            <input type="search" class="p-search-box__input cancel-default" name="search" placeholder="Search" required="" />
                                            <button type="submit" class="p-search-box__button cancel-padding" alt="search"><i class="p-icon--search"></i></button>
                                        </form>
                                        <div className="" style={{ width: "300px" }}>
                                            <input className="d-inline" type="radio" name="RadioOptions" id="Radio1" value="option1" />
                                            <label for="Radio1" className="cancel-default d-inline">รับของเอง</label>

                                            <input className="d-inline ml-3" type="radio" name="RadioOptions" id="Radio2" value="option2" />
                                            <label for="Radio2" className="cancel-default d-inline ml-3">ส่งไปยังคลังปลายทาง</label>
                                        </div>
                                        <input className="cancel-default" type="text" id="exampleTextInput" placeholder="example@canonical.com" />
                                        <input className="cancel-default" type="text" id="exampleTextInput" placeholder="example@canonical.com" />
                                    </div>
                                </div>
                                <table className="cancel-border">
                                    <thead>
                                        <tr>
                                            <th className="font"></th>
                                            <th className="font">Foundation Cloud</th>
                                            <th className="font">Foundation Cloud Plus</th>
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
                                        <tr>
                                            <th>Workshop and training</th>
                                            <td>2-days</td>
                                            <td>4-days</td>
                                        </tr>
                                        <tr>
                                            <th>Workshop and training</th>
                                            <td>2-days</td>
                                            <td>4-days</td>
                                        </tr>
                                        <tr>
                                            <th>Workshop and training</th>
                                            <td>2-days</td>
                                            <td>4-days</td>
                                        </tr>
                                        <tr>
                                            <th>Workshop and training</th>
                                            <td>2-days</td>
                                            <td>4-days</td>
                                        </tr>
                                        <tr>
                                            <th>Workshop and training</th>
                                            <td>2-days</td>
                                            <td>4-days</td>
                                        </tr>
                                        <tr>
                                            <th>Nuk</th>
                                            <td>2-days</td>
                                            <td>4-days</td>
                                        </tr>
                                        <tr>
                                            <th>Nuk</th>
                                            <td>2-days</td>
                                            <td>4-days</td>
                                        </tr>
                                        <tr>
                                            <th>Nuk</th>
                                            <td>2-days</td>
                                            <td>4-days</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div id="Paris" className="tabcontent">
                                <h3>Paris</h3>
                                <p>Paris is the capital of France.</p>
                            </div>

                            <div id="Tokyo" className="tabcontent">
                                <h3>Tokyo</h3>
                                <p>Tokyo is the capital of Japan.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="footer">
                    <div className="container_12 clearfix">
                        <div className="grid_12 nav-footer">
                            <button className="p-button--base edit">ดาวโหลด ส.16/46</button>
                            <button className="p-button--base edit float-right">ยกเลิก</button>
                            <button className="button-blue edit float-right">ยืนยัน</button>
                        </div>
                    </div>
                </div>

            </div>
        )
    };
}

export default Test;
