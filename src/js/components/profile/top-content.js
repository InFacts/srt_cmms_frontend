import React from 'react';
import { connect } from 'react-redux'
import '../../../css/style.css'
import '../../../css/grid12.css';
import jwt_decode from 'jwt-decode';
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
    // var token_auth = localStorage.getItem('token_auth');
    
    return (
      <div>
        <div id="blackground-white">
          <div className="container_12 clearfix">
            <section className="grid_12 ">
              <h4 className="head-title">โปรไฟล์ส่วนตัว</h4>


              <div className="grid_12">
                <div className="grid_2">
                  <p className="top-text">ชื่อ-สกุล</p>
                  <p className="top-text mt-1">ตำแหน่งงาน</p>
                  <p className="top-text">สังกัด</p>
                </div>
                <div className="grid_8 pull_0">

                  <p className="top-text">{this.props.profile.firstname_th} {this.props.profile.lastname_th}</p>
                  {this.props.profile.has_positions != null
                    ? 
                      <p className="top-text" >{this.props.profile.has_positions[0].name}</p>
                    : 
                      <p className="top-text" >{""}</p>
                  }
                  {this.props.profile.has_positions != null
                    ? 
                      <p className="top-text">{this.props.profile.has_positions[0].abbreviation}</p>
                    : 
                      <p className="top-text">{""}</p>
                  }
                </div>

              </div>



            </section>

            <div className="grid_12">
              <div className="tab grid_11">
                <button type="button" id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "เอกสารราชการ")}>เอกสารราชการ</button>
                <button type="button" className="tablinks" onClick={e => this.tapChange(e, "ข้อมูลผู้ใช้งาน")}>ข้อมูลผู้ใช้งาน</button>
                <button type="button" className="tablinks" onClick={e => this.tapChange(e, "ประวัติการใช้งาน")}>ประวัติการใช้งาน</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };
}

const mapStateToProps = (state) => ({
  profile: state.profile,
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(TopContent);

