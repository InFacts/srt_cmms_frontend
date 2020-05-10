import React from 'react';
import { connect } from 'react-redux'

import '../../../vender/fontawesome-free/css/all.css';
import '../../../css/style-nav.css'
import '../../../css/style.css'

class Footer extends React.Component {

  checkActionMode = (mode) => {
    // console.log("hello footer")
    if (mode === "search") {
      // console.log("Search mode is Action")
      return (
        <div className="grid_12 nav-footer">
          
        </div>
      )
    }
    if (mode === "edit" || mode === "add") {
      // console.log("Edit/Add mode is Action")
      return (
        <div className="grid_12 nav-footer">
          <button type="button" className="p-button--base edit float-right">ยกเลิก</button>
          <button type="submit" className="button-blue edit float-right mr-2">บันทึก</button>
        </div>
      )
    }

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

export default connect(mapStateToProps)(Footer);