import React from 'react';

import '../../../css/style.css'

class TapContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        this.openCity = this.openCity.bind(this);
    }

    openCity(evt, cityName) {
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
                <nav className="p-tabs">
                    <ul className="p-tabs__list" role="tablist" style={{ margin: "0px" }}>
                        <li className="p-tabs__item" role="presentation">
                            <button className="p-tabs__link active" tabindex="0" role="tab" aria-controls="section1" aria-selected="true" onClick={e => this.openCity(e , "อาการเสีย")}>อาการเสีย</button>
                        </li>
                        <li className="p-tabs__item" role="presentation">
                            <button className="p-tabs__link" tabindex="-1" role="tab" aria-controls="section2" onClick={e => this.openCity(e, "ผู้ที่เกี่ยวข้อง")}>ผู้ที่เกี่ยวข้อง</button>
                        </li>
                        <li className="p-tabs__item" role="presentation">
                            <button className="p-tabs__link" tabindex="-1" role="tab" aria-controls="section3" onClick={e => this.openCity(e, "รายการค่าเสียหาย")}>รายการค่าเสียหาย</button>
                        </li>
                        <li className="p-tabs__item" role="presentation">
                            <button className="p-tabs__link" tabindex="-1" role="tab" aria-controls="section3" onClick={e => this.openCity(e, "แนบไฟล์")}>แนบไฟล์</button>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    };
}

export default TapContent;