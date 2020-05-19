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


  render() {

    return (
      <div>
        <div id="blackground-white">
          <div className="container_12 clearfix">
            <section className="grid_12 ">
              <h4 className="head-title">บริหารจัดการผู้ใช้งาน</h4>
             

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">หน่วยงาน</p></div>
                <div className="grid_3 pull_0">
                  <select className="edit-select-top">
                    
                  </select>
                </div>
                <div className="grid_2"><p className="cancel-default float-left">ตำแหน่งงาน</p></div>
                <div className="grid_3 pull_0">
                  <select className="edit-select-top">
                   
                  </select>
                </div>
              </div>

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">Username</p></div>
                <div className="grid_3 pull_0">
                  <input className="cancel-default " type="text"   />
                </div>
                <div className="grid_2"><p className="cancel-default float-left">ชื่อ-นามสกุล</p></div>
                <div className="grid_3 pull_0">
                  <input className="cancel-default " type="text"   />
                </div>
              </div>

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">เลขที่พนักงาน</p></div>
                <div className="grid_3 pull_0">
                  <input className="cancel-default " type="text" />
                </div>

                <button className="button-blue edit grid_1 float-right mr-5" type="button">ค้นหา</button>
              </div>



            </section>

            <div className="grid_12">
              <div className="tab grid_11">
                <button type="button" id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "Active")}>Active</button>
                <button type="button" className="tablinks" onClick={e => this.tapChange(e, "Inactive")}>Inactive</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(TopContent);

