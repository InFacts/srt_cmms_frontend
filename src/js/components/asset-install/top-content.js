import React from 'react';

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
            <h4 className="head-title">ติดตั้งสินทรัพย์</h4>

            <div className="grid_12">
              <div className="grid_2"><p className="cancel-default">Serial Number:</p></div>
              <div className="grid_4 pull_0">
                <div className="p-search-box cancel-margin ">
                  <input type="search" className="p-search-box__input cancel-default" />
                  <button className="p-search-box__button cancel-padding" ><i className="p-icon--external-link" id="showModal" aria-controls="modal"></i></button>
                </div>
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
