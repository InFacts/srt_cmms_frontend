import React from 'react';

import '../../../css/style.css'
import '../../../css/grid12.css';

class TopContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
    this.tapChange = this.tapChange.bind(this);
  }

  componentDidMount() {
    console.log("hello")
    console.log(document.getElementById("defaultOpen"))
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
    console.log("hello render")

    return (
      <div>
        <div id="blackground-white">
          <div className="container_12 clearfix">
            <section className="grid_12 ">
              <h4 className="head-title">ออกใบสั่งซ่อมบำรุง</h4>
              <div className="grid_12">
                <div className="grid_3"><p className="cancel-default">เลขที่เอกสารแจ้งเหตุขัดข้อง (ถ้ามี):</p></div>
                <div className="grid_3 pull_0">
                  <div className="p-search-box cancel-margin">
                    <input type="text" className="p-search-box__input cancel-default" />
                    <button type="button" className="p-search-box__button cancel-padding" alt="search"><i className="p-icon--search" id="showModal" aria-controls="modal" ></i></button>
                  </div>
                </div>
              </div>
              <div className="grid_12">
                <div className="grid_3"><p className="cancel-default">เลขที่เอกสารใบสั่งซ่อมบำรุง:</p></div>
                <div className="grid_3 pull_0">
                  <div className="p-search-box cancel-margin">
                    <input type="text" className="p-search-box__input cancel-default" />
                    <button type="button" className="p-search-box__button cancel-padding" alt="search"><i className="p-icon--search" id="showModal" aria-controls="modal" ></i></button>
                  </div>
                </div>
              </div>
            </section>

            <div className="grid_12">
              <div className="tab grid_8">
                <button type="button" id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "อาการเสีย")}>อาการเสีย</button>
                <button type="button" className="tablinks" onClick={e => this.tapChange(e, "แนบไฟล์")}>แนบไฟล์</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };
}

export default TopContent;
