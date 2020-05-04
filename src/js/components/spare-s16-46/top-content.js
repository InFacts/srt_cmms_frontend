import React from 'react';

import '../../../css/style.css'
import '../../../css/grid12.css';

class TopContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        document.getElementById("defaultOpen").click();
    }

    tapChange(evt, cityName) {
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
                        <h4 className="head-title">เบิก/โอนย้าย อะไหล่/พัสดุ - แบบ ส.16/46</h4>

                        <div className="grid_12">
                            <div className="grid_2"><p className="top-text">เลขที่เอกสาร</p></div>
                            <div>
                                <input type="text" className="cancel-default grid_3 mt-1 pull_0"></input>
                                <div className="p-search-box cancel-margin grid_3 mt-1  float-right">
                                    <input type="text" className=" p-search-box__input cancel-default  " disabled="disabled"></input>
                                </div>
                                <div className="grid_1 cancel-default float-right"><p className="cancel-default float-right">สถานะ</p></div>
                            </div>
                        </div>

                        <div className="grid_12">
                            <div className="grid_2"><p className="top-text">ผู้เบิก</p></div>
                            <div>
                                <input type="text" className="cancel-default grid_3  pull_0"></input>
                                <div className="p-search-box cancel-margin grid_3   float-right">
                                    <input type="date" className=" p-search-box__input cancel-default  "></input>
                                </div>
                                <div className="grid_1 cancel-default float-right"><p className="cancel-default float-right">วันที่</p></div>
                            </div>
                        </div>

                        <div className="grid_12">
                            <div>
                                <div className="p-search-box cancel-margin grid_3  float-right">
                                    <input type="text" className="p-search-box__input cancel-default  " />
                                    <button type="button" className="p-search-box__button cancel-padding" alt="search"><i className="p-icon--search" id="showModal" aria-controls="modal" ></i></button>
                                </div>
                            </div>
                            <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">คลังต้นทาง</p></div>
                        </div>

                        <div className="grid_12 ">
                            <div>
                                <div className="p-search-box cancel-margin grid_3 float-right">
                                    <input type="text" className="p-search-box__input cancel-default  " />
                                    <button type="button" className="p-search-box__button cancel-padding" alt="search"><i className="p-icon--search"></i></button>
                                </div>
                            </div>
                            <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">คลังปลายทาง</p></div>
                        </div>

                        <div className="grid_12 ">
                            <div className="float-right ">
                                <input className="d-inline " type="radio" name="RadioOptions" id="Radio1" value="option1" />
                                <label htmlFor="Radio1" className="cancel-default d-inline ml-2n">รับของเอง</label>
                                <input className="d-inline" type="radio" name="RadioOptions" id="Radio2" value="option2" />
                                <label htmlFor="Radio2" className="cancel-default d-inline  ml-1">ส่งไปยังคลังปลายทาง</label>
                            </div>
                            <div className="grid_2  cancel-default float-right "><p className="cancel-default float-right">รูปแบบการรับของ</p></div>
                        </div>
                    </section>

                    <div className="grid_12">
                        <div className="tab grid_6">
                            <button id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "รายการ")}>รายการ</button>
                            <button className="tablinks" onClick={e => this.tapChange(e, "แนบไฟล์")}>แนบไฟล์</button>
                            <button className="tablinks" onClick={e => this.tapChange(e, "สถานะเอกสาร")}>สถานะเอกสาร</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export default TopContent;