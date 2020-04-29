import React from 'react';
import { Link } from 'react-router-dom';

import '../../../css/style.css'
import '../../../css/grid12.css';

import RedHouse from '../../../images/red-house.svg';
import Icon from '../../../images/icon-main-module.svg';

class TopContent extends React.Component {
  render() {
    return (
      <div>
        <div id="blackground-white" style={{ width: "100vw", height: "100vh" }}>
          <div className="container_12 clearfix">
            <section className="grid_12" style={{ width:"960px"}}>
              <h4 className="head-title" style={{ color: "black"}}>ระบบฐานข้อมูลระบบอาณัติสัญญาณเพื่อวิเคราะห์และวางแผนซ่อมบำรุง</h4>
              <div className="grid_4">
                <Link to="/main-spare">
                  <div className="card p-tooltip--btm-center" aria-describedby="btm-cntr">
                    <div className="image ">
                      <img src={Icon} alt="Generic placeholder thumbnail" />
                    </div>
                    <div className="content ">
                      <div className="card-body">ระบบบริหารข้อมูลอะไหล่</div>
                      <div className="card-footer ">
                        ระบบบริหารข้อมูลอะไหล่สำหรับซ่อมบำรุง
                      </div>
                    </div>
                    <span className="p-tooltip__message" role="tooltip" id="btm-cntr">ระบบบริหารข้อมูลอะไหล่</span>
                  </div>
                </Link>
              </div>
              <div className="grid_4">
                <Link to="/main-pmt">
                  <div className="card p-tooltip--btm-center" aria-describedby="btm-cntr" >
                    <div className="image ">
                      <img src={Icon} alt="Generic placeholder thumbnail" />
                    </div>
                    <div className="content ">
                      <div className="card-body">ระบบบริหารงานซ่อมบำรุง</div>
                      <div className="card-footer ">
                        ระบบบริหารข้อมูลอะไหล่สำหรับซ่อมบำรุง
                            </div>
                    </div>
                    <span className="p-tooltip__message" role="tooltip" id="btm-cntr">ระบบบริหารงานซ่อมบำรุง</span>
                  </div>
                </Link>
              </div>
              <div className="grid_4">
                <div className="card p-tooltip--btm-center" aria-describedby="btm-cntr">
                  <div className="image ">
                    <img src={Icon} alt="Generic placeholder thumbnail" />
                  </div>
                  <div className="content ">
                    <div className="card-body">ระบบวิเคราะห์และวางแผนทรัพยากรซ่อมบำรุง</div>
                    <div className="card-footer ">
                      ระบบบริหารข้อมูลอะไหล่สำหรับซ่อมบำรุง
                            </div>
                  </div>
                  <span className="p-tooltip__message" role="tooltip" id="btm-cntr">ระบบวิเคราะห์และวางแผนทรัพยากรซ่อมบำรุง</span>
                </div>
              </div>
              <div className="grid_4">
                <div className="card p-tooltip--btm-center" aria-describedby="btm-cntr">
                  <div className="image ">
                    <img src={Icon} alt="Generic placeholder thumbnail" />
                  </div>
                  <div className="content ">
                    <div className="card-body">สถานะรอการอนุมัติ</div>
                    <div className="card-footer ">
                      ระบบบริหารข้อมูลอะไหล่สำหรับซ่อมบำรุง
                            </div>
                  </div>
                  <span className="p-tooltip__message" role="tooltip" id="btm-cntr">สถานะรอการอนุมัติ</span>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div id="red-house2">
          <div className="container_12 clearfix">
            <div className="grid_12 from-red-house">
              <img alt='red house' src={RedHouse} />
            </div>
          </div>
        </div>

        <div id="red-house">
          <div className="container_12 clearfix">
            <div className="grid_12">
            </div>
          </div>
        </div>
      </div>
    )
  };
}

export default TopContent;
