import React from 'react';

import '../../../css/style.css'
import '../../../css/grid12.css';

class TopContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount(){
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
                        <div className="tab grid_6">
                            <button id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "คลังต้นทาง")}>คลังต้นทาง</button>
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