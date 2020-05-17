import React from 'react';
import { connect } from 'react-redux'
import '../../../css/style.css'
import '../../../css/grid12.css';
import RedHouse from '../../../images/red-house.svg';
import logo from '../../../images/logo.png';
import '../../../css/style-register.css';
class TopContent extends React.Component {



  render() {

    return (
      <div>
        <div className="container_12 clearfix">
          <div className="grid_12 from-register">
            <h4 className="head-register">สร้างผู้ใช้งานภายในระบบ</h4>


            <div className="grid_5">
              <div class="card-profile">
                <div class="card-profile-header">ข้อมูลส่วนตัว</div>
                <div class="card-profile-main">

                  <div className="grid_12">
                    <div className="grid_12"><p className="cancel-default">รหัสพนักงาน</p></div>
                    <div className="grid_4">
                      <input className="cancel-default " type="text" />
                    </div>
                  </div>

                  <div className="grid_12">
                    <div className="grid_12"><p className="cancel-default">ชื่อ</p></div>
                    <div className="grid_4">
                      <input className="cancel-default " type="text" />
                    </div>
                  </div>

                  <div className="grid_12">
                    <div className="grid_12"><p className="cancel-default">นามสกุล</p></div>
                    <div className="grid_4">
                      <input className="cancel-default " type="text" />
                    </div>
                  </div>

                  <div className="grid_12">
                    <div className="grid_12"><p className="cancel-default">Email</p></div>
                    <div className="grid_4">
                      <input className="cancel-default " type="text" />
                    </div>
                  </div>

                  <div className="grid_12">
                    <div className="grid_12"><p className="cancel-default">รหัสผ่าน</p></div>
                    <div className="grid_4">
                      <input className="cancel-default " type="text" />
                    </div>
                  </div>


                  <div className="grid_12">
                    <div className="grid_12"><p className="cancel-default">ยืนยันรหัสผ่าน</p></div>
                    <div className="grid_4">
                      <input className="cancel-default " type="text" />
                    </div>
                  </div>



                </div>
              </div>
            </div>

            <div className="grid_5 float-right">
              <div class="card-profile">
                <div class="card-profile-header">ตำแหน่งงาน</div>
                <div class="card-profile-main">

                  <div className="grid_12">
                    <div className="grid_12"><p className="cancel-default">ศูนย์</p></div>
                    <div className="grid_4 ">
                      <select className="edit-select-top">

                      </select>
                    </div>
                  </div>

                  <div className="grid_12">
                    <div className="grid_12"><p className="cancel-default">กอง</p></div>
                    <div className="grid_4">
                      <select className="edit-select-top">

                      </select>
                    </div>
                  </div>

                  <div className="grid_12">
                    <div className="grid_12"><p className="cancel-default">หน่วยงาน/แขวง</p></div>
                    <div className="grid_4 ">
                      <select className="edit-select-top">

                      </select>
                    </div>
                  </div>

                  <div className="grid_12">
                    <div className="grid_12"><p className="cancel-default">ตอน</p></div>
                    <div className="grid_4 ">
                      <select className="edit-select-top">

                      </select>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className="grid_12 " style={{ "text-align": "center" }}>
            <button className="button-red from-register-button" type="submit">สร้างผู้ใช้งาน</button>
          </div>
        </div>
        <div id="red-house2">
          <div className="container_12 clearfix">
            <div className="grid_12 from-red-house">
              <img alt='red house' src={RedHouse} />
            </div>
          </div>
        </div>
      </div >
    )
  };
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(TopContent);

