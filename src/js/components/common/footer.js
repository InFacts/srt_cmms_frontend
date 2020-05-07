import React from 'react';
import { connect } from 'react-redux'

import '../../../vender/fontawesome-free/css/all.css';
import '../../../css/style-nav.css'
import '../../../css/style.css'

class Footer extends React.Component {
  render() {
    return (
      <div id="footer" style={{display: this.props.show_footer }}>
        <div className="container_12 clearfix">
          <div className="grid_12 nav-footer">
            <button type="button" className="p-button--base edit float-right">ยกเลิก</button>
            <button type="submit" className="button-blue edit float-right mr-2">บันทึก</button>
          </div>
        </div>
      </div>
    )
  };
}

const mapStateToProps = state => {
  return {
    show_footer: state.show_footer,
  };
};

export default connect(mapStateToProps)(Footer);