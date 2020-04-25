import React from 'react';

import '../../../css/test.css'
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
          <section className="grid_12  ">
            {/* <div className="mb-auto" >
          <i class="p-icon--user p-button--positive t"></i>
          <i class="p-icon--plus p-button--positive t"></i>
          <i class="p-icon--minus p-button--positive t"></i>
          <i class="p-icon--expand p-button--positive t"></i>
          <i class="p-icon--collapse p-button--positive t"></i>
          <i class="p-icon--close p-button--positive t"></i>
          <i class="p-icon--delete p-button--positive t"></i>
          <i class="p-icon--menu p-button--positive t"></i>
          <i class="p-icon--code p-button--positive t"></i>
        </div> */}

            <h4 className="head-title">ติดตั้งสินทรัพย์</h4>

            <div className="grid_2 ">
              <p className="top-text  mt-1 ">Serial Number:</p>
            </div>

            <div className="grid_3 pull_0 ">
              <div className="p-search-box cancel-margin ">
                <input type="text" className="p-search-box__input cancel-default" />
                <button type="button" className="p-search-box__button cancel-padding" alt="search"><i className="p-icon--search" id="showModal" aria-controls="modal" ></i></button>
              </div>
            </div>
          </section>

          <div className="grid_12">
            <div className="tab grid_6">
              <button id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "ทั่วไป")}>ทั่วไป</button>
              <button className="tablinks" onClick={e => this.tapChange(e, "สถานที่ติดตั้ง")}>สถานที่ติดตั้ง</button>
              <button className="tablinks" onClick={e => this.tapChange(e, "แนบไฟล์")}>แนบไฟล์</button>
              <button className="tablinks" onClick={e => this.tapChange(e, "หมายเหตุ")}>หมายเหตุ</button>
            </div>
          </div>
        </div>

      </div>
    )
  };
}

export default TopContent;
