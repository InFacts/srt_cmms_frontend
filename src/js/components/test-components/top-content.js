import React from 'react';

import '../../../css/style.css'
import '../../../css/grid12.css';
import InputSearch from './input-search.js';

class TopContent extends React.Component {

  constructor(props) {
    super(props);
  }

  handledata=(data)=>{
    this.props.callback(data);
  }

  render() {
    return (
      <div>
        <div id="blackground-white">
          <div className="container_12 clearfix">
            <section className="grid_12 ">
              <h4 className="head-title">สรุปการซ่อมบำรุง - แบบ สส.101</h4>


              <div className="grid_12">
                <InputSearch iconType="search" modalType="เลขที่เอกสาร" callback={this.handledata}/>
              </div>

            </section>


           
          </div>
        </div>
      </div>
    )
  };
}

export default TopContent;
