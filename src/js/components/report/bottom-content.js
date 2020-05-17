import React from 'react';
import { connect } from 'react-redux'
import Document from '../../../images/document.svg'

import '../../../css/style.css'

class BottomContent extends React.Component {

  render() {
    return (
      <form>
        <div id="blackground-gray">
          <div className="container_12 clearfix">
            <div className="grid_12 ">

              <div id="ภาพรวมการซ่อมบำรุง" className="tabcontent">
                
              </div>

              <div id="สรุปปฏิบัติงานการทำวาระ" className="tabcontent">
              
              </div>

              <div id="แบบรายงานด้านอาณัติสัญญาณขัดข้อง" className="tabcontent">
               

              </div>

              <div id="แบบรายงานเครื่องกั้นถนนขัดข้อง" className="tabcontent">
               

               </div>

            </div>
          </div>
        </div>
      </form>
    )
  };
}
const mapStateToProps = (state) => ({
  actionMode: state.action,

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);