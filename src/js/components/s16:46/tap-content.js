import React from 'react';

import '../../../css/style.css'
import '../../../css/tabs.css'

class TapContent extends React.Component {

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
                <nav className=" tab">
                    <ul style={{ margin: "0px" }}>
                        <li >
                            <button id="defaultOpen" className="tablinks font-size-top-tap-content mb-0 border-none" role="tab" aria-controls="section1" onClick={e => this.openCity(e, "คลังต้นทาง")}>คลังต้นทาง</button>
                        </li>
                        <li >
                            <button className="tablinks font-size-top-tap-content mb-0 border-none" role="tab" aria-controls="section2" onClick={e => this.openCity(e, "แนบไฟล์")}>แนบไฟล์</button>
                        </li>
                        <li >
                            <button className="tablinks font-size-top-tap-content mb-0 border-none" role="tab" aria-controls="section3" onClick={e => this.openCity(e, "สถานะเอกสาร")}>สถานะเอกสาร</button>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    };
}

export default TapContent;