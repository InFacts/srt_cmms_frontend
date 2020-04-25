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
        <div id="blackground-white">
          <div className="container_12 clearfix">
            <section className="grid_12 ">
              <h4 className="head-title">ออกใบสั่งซ่อมบำรุง</h4>
              <div className="grid_12">
                <div className="grid_3"><p className="cancel-default">เลขที่เอกสารแจ้งเหตุขัดข้อง (ถ้ามี):</p></div>
                <div className="grid_7 pull_0">
                  
                </div>
              </div>
              <div className="grid_12">
                <div className="grid_3"><p className="cancel-default">เลขที่เอกสารใบสั่งซ่อมบำรุง:</p></div>
                <div className="grid_7 pull_0">
                  
                </div>
              </div>
            </section>

            <div className="grid_12">
              <div className="tab grid_8">
                <button id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "อาการเสีย")}>อาการเสีย</button>
                <button className="tablinks" onClick={e => this.tapChange(e, "แนบไฟล์")}>แนบไฟล์</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };
}

export default TopContent;
