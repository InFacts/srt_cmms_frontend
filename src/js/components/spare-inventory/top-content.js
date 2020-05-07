import React from 'react';
import { connect } from 'react-redux'

import '../../../css/style.css'
import '../../../css/grid12.css';

class TopContent extends React.Component {

  componentDidMount() {
    document.getElementById("defaultOpen").click();
  }

  tapChange(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  checkActionMode = (mode) => {
    if (mode === "search") {
      console.log("Search mode is Action")
      return (
        <>
          <div className="grid_12">
            <div className="grid_1"><p className="top-text">เลขที่คลัง</p></div>
            <div>
              <div className="grid_2">
                <div className="p-search-box cancel-margin">
                  <input type="text" className="p-search-box__input cancel-default" />
                  <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModal" aria-controls="modal"></i></button>
                </div>
              </div>
              <div className="grid_2 cancel-default text-right">
                <p className="cancel-default">ชื่อเต็มคลัง</p>
              </div>
              <div className="grid_4">
                <input type="text" className="cancel-default font-black" readOnly></input>
              </div>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_5 cancel-default text-right">
              <p className="cancel-default">ชื่อย่อคลัง</p>
            </div>
            <div className="grid_4">
              <input type="text" className="cancel-default font-black" readOnly></input>
            </div>
          </div>
        </>
      )
    }
  }

  render() {
    return (
      <div>
        <div id="blackground-white">
          <div className="container_12 clearfix">
            <section className="grid_12 ">
              <h4 className="head-title">คลัง - Setup</h4>
              {/* Input in TopBar */}
              {this.checkActionMode(this.props.actionMode)}
            </section>

              {/*  Tab Bar  */}
            <div className="grid_12">
              <div className="tab grid_11">
                <button type="button" id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "ทั่วไป")}>ทั่วไป</button>
                <button type="button" className="tablinks" onClick={e => this.tapChange(e, "แนบไฟล์")}>แนบไฟล์</button>
              </div>
            </div>
          </div>
        </div>

        {/* PopUp ค้นหาเลขที่คลัง */}
        <div className="modal" id="modal" style={{ display: "none" }}>
          <div className="gray-board">
            <p className="head-title-modal edit">ค้นหาคลัง</p>
            <div className="container_12 edit-padding">

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">เลขที่คลัง</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" />
                  <button className="button-blue edit grid_1 mr-5" type="button">ค้นหา</button>
                </div>
              </div>

              <div className="grid_12">
                <table className="table-many-column mt-3">
                  <thead>
                    <tr>
                      <th className="font" style={{ minWidth: "150px" }}>เลขที่คลัง</th>
                      <th className="font" style={{ minWidth: "300px" }}>ชื่อเต็มคลัง</th>
                      <th className="font" style={{ minWidth: "150px" }}>ชื่อย่อคลัง</th>
                      <th className="font text-center" style={{ minWidth: "150px" }}>สถานะ</th>
                      <th className="font" style={{ minWidth: "150px" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="edit-padding" style={{ minWidth: "150px" }}></td>
                      <td className="edit-padding" style={{ minWidth: "300px" }}></td>
                      <td className="edit-padding" style={{ minWidth: "150px" }}></td>
                      <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                      </td>
                      <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                        <button type="button" className="button-blue">เลือก</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid_12">
                <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modal" id="aria-controls">กลับ</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  };
}

const mapStateToProps = (state) => ({
  actionMode: state.action,
})
const mapDispatchToProps = (dispatch) => ({
  // handleAction: (value) => dispatch(action(value))
})
export default connect(mapStateToProps, mapDispatchToProps)(TopContent);

// export const action = (value) => {

//   return {
//       type: "ACTION",
//       value: value
//   }
// }
