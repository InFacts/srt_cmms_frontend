import React from 'react';
import { connect } from 'react-redux'

import '../../../vender/fontawesome-free/css/all.css';
import '../../../css/style-nav.css'
import '../../../css/style.css'

class Footer extends React.Component {

  checkActionMode = (mode, action_approval) => {
    console.log("hello footer", action_approval)
    if (mode === "search") {
      console.log("action_approval...", action_approval)
      if (action_approval === "check & approval" || action_approval === "approval") {
        return (
          <div className="grid_12 nav-footer">
            <a className="p-button--base edit float-right" href="http://vanilla-erp.com:50000/track">กลับ</a>
            <button type="button" className="p-button--base edit float-right" onClick={(e) => { if (window.confirm('คุณต้องการส่งเอกสารกลับใช่หรือไม่')) { return this.props.onClickCancle()} else { e.preventDefault(); }}}>ส่งเอกสารกลับ</button>
            <button type="submit" className="button-blue edit float-right mr-2">ลงนาม</button>
          </div>
        )
      }
      else if (action_approval === "got it") {
        return (
          <div className="grid_12 nav-footer">
            <a className="p-button--base edit float-right" href="http://vanilla-erp.com:50000/track">กลับ</a>
            <button type="submit" className="button-blue edit float-right mr-2" disabled>รับทราบ</button>
          </div>
        )
      }
      else if (action_approval === "approved") {
        return (
          <div className="grid_12 nav-footer">
            <button type="submit" className="button-blue edit float-right mr-2" disabled>ลงนามเรียบร้อยแล้ว</button>
          </div>
        )
      }
      return (
        <div className="grid_12 nav-footer">
          {/* <a className="p-button--base edit float-right" href="http://vanilla-erp.com:50000/track">กลับ</a> */}
        </div>
      )
    }
    if (mode === "add" || mode === "edit") {
      return (
        <div className="grid_12 nav-footer">
          <a className="p-button--base edit float-right" href="http://vanilla-erp.com:50000/track">กลับ</a>
          <button type="submit" className="button-blue edit float-right mr-2">บันทึก</button>
        </div>
      )
    }
  }

  render() {
    return (
      <div id="footer">
        <div className="container_12 clearfix">
          {this.checkActionMode(this.props.actionMode, this.props.actionApproval)}
        </div>
      </div>
    )
  };
}

const mapStateToProps = state => {
  return {
    actionMode: state.action,
    actionApproval: state.action_approval,
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