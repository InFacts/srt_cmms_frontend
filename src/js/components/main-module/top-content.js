import React from 'react';
import { Link } from 'react-router-dom';

import '../../../css/style.css'

class TopContent extends React.Component {
  render() {
    return (
      <div>
        <h4 className="head-title">ระบบฐานข้อมูลระบบอาณัติสัญญาณเพื่อวิเคราะห์และวางแผนซ่อมบำรุง</h4>
        <div className="p-strip is-shallow">
          <div className="row">
            <div className="col-4  col-medium-6">
              <Link to="/main-spare">
                <div className="card p-tooltip--btm-center" aria-describedby="btm-cntr">
                  <div className="image ">
                    <img src="http://i.imgur.com/Hw1dyoP.png" alt="Generic placeholder thumbnail" />
                  </div>
                  <div className="content ">
                    <div className="card-body">ระบบบริหารข้อมูลอะไหล่</div>
                    <div className="card-footer ">
                      ระบบบริหารข้อมูลอะไหล่สำหรับซ่อมบำรุง
                            </div>
                  </div>
                  <span className="p-tooltip__message" role="tooltip" id="btm-cntr">ระบบบริหารข้อมูลอะไหล่สำหรับซ่อมบำรุง</span>
                </div>
              </Link>
            </div>

            <div className="col-4 col-medium-6">
              <Link to="/main-pmt">
                <div className="card p-tooltip--btm-center" aria-describedby="btm-cntr" >
                  <div className="image ">
                    <img src="http://i.imgur.com/Hw1dyoP.png" alt="Generic placeholder thumbnail" />
                  </div>
                  <div className="content ">
                    <div className="card-body">ระบบบริหารข้อมูลซ่อมบำรุง</div>
                    <div className="card-footer ">
                      ระบบบริหารข้อมูลอะไหล่สำหรับซ่อมบำรุง
                            </div>
                  </div>
                  <span className="p-tooltip__message" role="tooltip" id="btm-cntr">ระบบบริหารข้อมูลอะไหล่สำหรับซ่อมบำรุง</span>
                </div>
              </Link>
            </div>

            <div className="col-4 col-medium-6">
              <div className="card p-tooltip--btm-center" aria-describedby="btm-cntr">
                <div className="image ">
                  <img src="http://i.imgur.com/Hw1dyoP.png" alt="Generic placeholder thumbnail" />
                </div>
                <div className="content ">
                  <div className="card-body">ระบบวิเคราะห์และวางแผนทรัพยากรซ่อมบำรุง</div>
                  <div className="card-footer ">
                    ระบบบริหารข้อมูลอะไหล่สำหรับซ่อมบำรุง
                            </div>
                </div>
                <span className="p-tooltip__message" role="tooltip" id="btm-cntr">ระบบบริหารข้อมูลอะไหล่สำหรับซ่อมบำรุง</span>
              </div>
            </div>

            <div className="col-4 col-medium-6">
              <div className="card p-tooltip--btm-center" aria-describedby="btm-cntr">
                <div className="image ">
                  <img src="http://i.imgur.com/Hw1dyoP.png" alt="Generic placeholder thumbnail" />
                </div>
                <div className="content ">
                  <div className="card-body">สถานะรอการอนุมัติ</div>
                  <div className="card-footer ">
                    ระบบบริหารข้อมูลอะไหล่สำหรับซ่อมบำรุง
                            </div>
                </div>
                <span className="p-tooltip__message" role="tooltip" id="btm-cntr">ระบบบริหารข้อมูลอะไหล่สำหรับซ่อมบำรุง</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };
}

export default TopContent;
