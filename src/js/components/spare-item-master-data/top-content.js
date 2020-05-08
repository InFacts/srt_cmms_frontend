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
    console.log(mode)
    if (mode === "search") {
      return (
        <>
          <div className="grid_12">
            <div className="grid_2">
              <p className="top-text">เลขที่อุปกรณ์</p>
            </div>
            <div className="grid_6">
              <div className="grid_2 pull_1">
                <select className="edit-select" style={{ marginTop: "0" }} disabled="disabled">
                  <option defaultValue="0">none</option>
                  {this.props.mode_no_part.map(function (mode_no_part, index) {
                    return (<option key={index} defaultValue={mode_no_part.mode_no}>{mode_no_part.mode_no}</option>)
                  })}
                </select>
              </div>
              <div className="grid_3 pull_1">
                <div className="p-search-box cancel-margin">
                  <input type="text" className="p-search-box__input cancel-default" value={this.props.no_part} onChange={(e) => this.props.onChangeNoPart(e)} />
                  <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalPart" aria-controls="modalPart"></i></button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2">
              <p className="top-text">รายละเอียด</p>
            </div>
            <div className="grid_2 pull_1"><h1></h1></div>
            <div className="grid_6">
              <div className="grid_3 pull_1">
                <input type="text" className="cancel-default" disabled="disabled"></input>
              </div>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2">
              <p className="top-text">ชนิดอุปกรณ์</p>
            </div>
            <div className="grid_2 pull_1"><h1></h1></div>
            <div className="grid_6">
              <div className="grid_3 pull_1">
                <select className="edit-select" style={{ marginTop: "0" }} disabled="disabled">
                  <option defaultValue="0">none</option>
                  {this.props.type_part.map(function (type_part, index) {
                    return (<option key={index} defaultValue={type_part.type}>{type_part.type}</option>)
                  })}
                </select>
              </div>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2">
              <p className="top-text">กลุ่มอุปกรณ์</p>
            </div>
            <div className="grid_2 pull_1"><h1></h1></div>
            <div className="grid_6">
              <div className="grid_3 pull_1">
                <select className="edit-select" style={{ marginTop: "0" }} disabled="disabled">
                  <option defaultValue="0">none</option>
                  {this.props.group_part.map(function (group_part, index) {
                    return (<option key={index} defaultValue={group_part.group}>{group_part.group}</option>)
                  })}
                </select>
              </div>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2">
              <p className="top-text">กลุ่มหน่วยนับ</p>
            </div>
            <div className="grid_2 pull_1"><h1></h1></div>
            <div className="grid_6">
              <div className="grid_3 pull_1">
                <select className="edit-select" style={{ marginTop: "0" }} disabled="disabled">
                  <option defaultValue="0">none</option>
                  {this.props.group_unit_part.map(function (group_unit_part, index) {
                    return (<option key={index} defaultValue={group_unit_part.unit}>{group_unit_part.unit}</option>)
                  })}
                </select>
              </div>
            </div>
          </div>
        </>
      )
    }
  }
  render() {
    const current = this;
    return (
      <div>
        <div id="blackground-white">
          <div className="container_12 clearfix">
            <section className="grid_12 ">
              <h4 className="head-title">ข้อมูลอุปกรณ์</h4>
              {this.checkActionMode(this.props.actionMode)}
            </section>

            {/* Tab Bar */}
            <div className="grid_12">
              <div className="tab grid_11">
                <button type="button" id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "ทั่วไป")}>ทั่วไป</button>
                <button type="button" className="tablinks" onClick={e => this.tapChange(e, "คลัง")}>คลัง</button>
                <button type="button" className="tablinks" onClick={e => this.tapChange(e, "แนบไฟล์")}>แนบไฟล์</button>
              </div>
            </div>

          </div>
        </div>

        {/* PopUp ค้นหาเลขที่ที่อุปกรณ์ */}
        <div className="modal" id="modalPart" style={{ display: "none" }}>
          <div className="gray-board">
            <p className="head-title-modal edit">ค้นหาเลขที่อุปกรณ์</p>
            <div className="container_12 edit-padding">

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">เลขที่อุปกรณ์</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" value={this.props.no_part} onChange={(e) => this.props.onChangeNoPart(e)} />
                  <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickPopUpSearchNoInventory(e)}>ค้นหา</button>
                </div>
              </div>

              <div className="grid_12">
                <table className="table-many-column mt-3">
                  <thead>
                    <tr>
                      <th className="font" style={{ minWidth: "300px" }}>เลขที่อุปกรณ์</th>
                      <th className="font" style={{ minWidth: "450px" }}>รายละเอียด</th>
                      <th className="font" style={{ minWidth: "150px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {this.props.inventory_show_popup.map(function (inventory_show_popup, index) {
                      return (
                        <tr key={index} id={index}>
                          <td className="edit-padding"> {inventory_show_popup.no_inventory} </td>
                          <td className="edit-padding"> {inventory_show_popup.full_name} </td>
                          <td className="edit-padding text-center">
                            <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectNoInventory(e)} aria-label="Close active modal" aria-controls="modalPart" id="closeModalInventory" >เลือก</button>
                          </td>
                        </tr>
                      )
                    })} */}
                  </tbody>
                </table>
              </div>

              <div className="grid_12">
                <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalPart" id="closeModalInventory">กลับ</button>
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
  mode_no_part: state.mode_no_part,
  type_part: state.type_part,
  group_part: state.group_part,
  group_unit_part: state.group_unit_part,

  // Mode Search
  no_part: state.no_part,
})
const mapDispatchToProps = (dispatch) => ({
  onChangeNoPart: (e) => dispatch(onChangeNoPart(e))
})
export default connect(mapStateToProps, mapDispatchToProps)(TopContent);

// Mode Search
export const onChangeNoPart = (e) => {
  return {
    type: "ON CHANGE NO PART",
    value: e.target.value
  }
}
