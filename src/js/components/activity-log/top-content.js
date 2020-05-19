import React from 'react';
import { connect } from 'react-redux'
import '../../../css/style.css'
import '../../../css/grid12.css';

class TopContent extends React.Component {



  render() {

    return (
      <div>
        <div id="blackground-white">
          <div className="container_12 clearfix">
            <section className="grid_12 ">
              <h4 className="head-title">Activity log</h4>
             
              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">ช่วงเวลา</p></div>
                <div className="grid_3 pull_0">
                  <input className="cancel-default " type="time"   />
                </div>
                <div className="grid_2"><p className="cancel-default float-left">ถึง</p></div>
                <div className="grid_3 pull_0">
                  <input className="cancel-default " type="time"   />
                </div>
              </div>

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">ประเภทเอกสาร</p></div>
                <div className="grid_3 pull_0">
                  <select className="edit-select-top">
                    
                  </select>
                </div>                
              </div>

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">ประเภท Actions</p></div>
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
              </div>
              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">เลขที่เอกสาร</p></div>
                <div className="grid_3 pull_0">
                  <input className="cancel-default " type="text"   />
                </div>

                <button className="button-blue edit grid_1 float-right mr-5" type="button">ค้นหา</button>
              </div>



            </section>
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

