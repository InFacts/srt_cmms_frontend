import React from 'react';
import { connect } from 'react-redux'

import '../../../vender/fontawesome-free/css/all.css';
import '../../../css/style-nav.css'
import '../../../css/style.css'

class Footer extends React.Component {

  checkActionMode = (mode) => {
    // console.log("hello footer")
    // if (mode === "search") {
    //   return (
    //     <div className="grid_12 nav-footer">
          
    //     </div>
    //   )
    // }
    // if (mode === "add" || mode === "edit") {
      return (
        <div className="grid_12 nav-footer">
          <button type="button" className="p-button--base edit float-right" onClick={(e) => { if (window.confirm('คุณต้องการยกเลิกใช่หรือไม่')) this.props.onClickCancle() }}>ยกเลิก</button>
          <button type="submit" className="button-blue edit float-right mr-2">บันทึก</button>
        </div>
      )
    // }
  }

  render() {
    return (
      <div id="footer">
        <div className="container_12 clearfix">
          {this.checkActionMode(this.props.actionMode)}
        </div>
      </div>
    )
  };
}

const mapStateToProps = state => {
  return {
    actionMode: state.action,
  };
};
const mapDispatchToProps = (dispatch) => ({
  onClickCancle: (e) => dispatch(onClickCancle(e)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Footer);

export const onClickCancle = (e) => {
  return {
    type: "ON CLICK CANCLE"
  }
}