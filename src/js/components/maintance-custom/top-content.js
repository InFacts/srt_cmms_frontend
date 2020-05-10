import React from 'react';
import { connect } from 'react-redux'
import '../../../css/style.css'
import '../../../css/grid12.css';

class TopContent extends React.Component {
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

  checkActionMode = (mode) => {
    const current = this;
    if (mode === "search") {
      return (
        <>
          <div className="grid_12">
            <div className="grid_2"><p className="top-text">เลขที่เอกสาร</p></div>
            <div>
              <div className="p-search-box cancel-margin grid_3 pull_0 ">
                <input type="search" className="p-search-box__input cancel-default " />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showMaintenanceFixedAsset" aria-controls="modalMaintenanceFixedAsset"></i></button>
              </div>
              <div className="p-search-box cancel-margin grid_3  float-right">
                <input type="date" className="p-search-box__input cancel-default " disabled="disabled" />
              </div>
              <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">วันที่ออกเอกสาร</p></div>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="top-text">เลขที่เอกสารอ้างอิง</p></div>
            <div>
              <div className="p-search-box cancel-margin grid_3 pull_0 ">
                <input type="search" className="p-search-box__input cancel-default " />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showMaintenanceFixedAsset2" aria-controls="modalMaintenanceFixedAsset2"></i></button>
              </div>
              <div className="p-search-box cancel-margin grid_3  float-right">
                <input type="text" className="p-search-box__input cancel-default " disabled="disabled" />
              </div>
              <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">ผู้สร้างเอกสาร</p></div>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ชื่อแผนซ่อมบำรุง</p></div>
            <div className="grid_3 pull_0">
              <input className="cancel-default " type="text" />
            </div>
           
          </div>

        

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">แขวง</p></div>
            <div className="grid_3 pull_0">
              <select className="edit-select-top" disabled="disabled">
                
              </select>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ตอน</p></div>
            <div className="grid_3 pull_0">
              <select className="edit-select-top" disabled="disabled">
                
              </select>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">สถานี</p></div>
            <div className="grid_3 pull_0">
              <select className="edit-select-top" disabled="disabled">
                
              </select>
            </div>
          </div>

        </>
      )
    }
    if (mode === "edit") {
      return (
        <>

        </>
      )


    }
    if (mode === "add") {
      return (
        <>

        </>
      )


    }
  }

  render() {

    return (
      <div>
        <div id="blackground-white">
          <div className="container_12 clearfix">
            <section className="grid_12 ">
              <h4 className="head-title">สรุปการทำวาระซ่อมบำรุง - สถานี</h4>
              {/* Input in TopBar */}
              {this.checkActionMode(this.props.actionMode)}
            </section>

            <div className="grid_12">
              <div className="tab grid_11">
                <button type="button" id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "ข้อมูลการทำวาระ")}>ข้อมูลการทำวาระ</button>
                <button type="button" className="tablinks" onClick={e => this.tapChange(e, "ระบุผู้ปฎิบัติงาน")}>ระบุผู้ปฎิบัติงาน</button>
                <button type="button" className="tablinks" onClick={e => this.tapChange(e, "อุปกรณ์ที่ต้องนำไปปฎิบัติงาน")}>อุปกรณ์ที่ต้องนำไปปฎิบัติงาน</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };
}

const mapStateToProps = (state) => ({
  actionMode: state.action,
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(TopContent);
