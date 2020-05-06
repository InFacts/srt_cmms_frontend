import React from 'react';



import '../../../css/style.css'
import '../../../css/table.css';
import Input from './input.js';

class BottomContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      
        <div id="blackground-gray">
          <div className="container_12 clearfix">
            <div className="grid_12 ">

              
                <h3 className="head-title-bottom mt-2">ข้อมูลเกี่ยวกับอาการขัดข้อง</h3>
                <div className="grid_12">
                  <div className="grid_3"><p className="cancel-default">เดินทางโดย</p></div>
                  <div className="grid_7">
                    <Input type="text" disabled={this.props.disabled} data={this.props.data[0]} action={this.props.action}/>

                  </div>
                </div>
          </div>
        </div>
        </div>
               
     
    )
  };
}

export default BottomContent;
