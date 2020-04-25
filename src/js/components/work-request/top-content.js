import React from 'react';

import '../../../css/style.css'
import '../../../css/grid12.css';

class TopContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <div id="blackground-white">
          <div className="container_12 clearfix">
            <section className="grid_12 ">
              <h4 className="head-title">แจ้งเหตุขัดข้อง/ชำรุด</h4>
              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">เลขที่เอกสาร:</p></div>
                <div className="grid_3 pull_0">
                  <div className="p-search-box cancel-margin">
                    <input type="text" className="p-search-box__input cancel-default" />
                    <button type="button" className="p-search-box__button cancel-padding" alt="search"><i className="p-icon--search" id="showModal" aria-controls="modal" ></i></button>
                  </div>
                </div>
              </div>
              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">ลงวันที่:</p></div>
                <div className="grid_3 pull_0">
                  <input type="date" className="cancel-default" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div >
    )
  };
}

export default TopContent;
