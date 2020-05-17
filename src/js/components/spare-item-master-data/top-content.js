import React from 'react';
import { Redirect } from 'react-router-dom'
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
    const current = this;
    if (mode === "home") {
      return (
          <Redirect to="/main"></Redirect>
      )
  }
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
                  <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalPart" aria-controls="modalPart" onClick={(e) => this.props.onClickOpenPopUpNoPart(e)}></i></button>
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
                <input type="text" className="cancel-default" defaultValue={this.props.info_part_show.description} disabled="disabled"></input>
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
                    if (current.props.info_part_show.type === type_part.type)
                      return (<option key={index} defaultValue={type_part.type} selected>{type_part.type}</option>)
                    else return <option key={index} defaultValue={type_part.type}>{type_part.type}</option>
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
                    if (current.props.info_part_show.group === group_part.group)
                      return (<option key={index} defaultValue={group_part.group} selected>{group_part.group}</option>)
                    else return <option key={index} defaultValue={group_part.group}>{group_part.group}</option>
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
                  {this.props.parent_unit_part.map(function (parent_unit_part, index) {
                    if (current.props.info_part_show.parent_unit_part === parent_unit_part.parent_unit)
                      return (<option key={index} defaultValue={parent_unit_part.parent_unit} selected>{parent_unit_part.parent_unit}</option>)
                    else return <option key={index} defaultValue={parent_unit_part.parent_unit}>{parent_unit_part.parent_unit}</option>
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
                  <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickPopUpSearchNoPart(e)}>ค้นหา</button>
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
                    {this.props.info_part_show_popup.map(function (info_part_show_popup, index) {
                      return (
                        <tr key={index} id={index}>
                          <td className="edit-padding"> {info_part_show_popup.no_part} </td>
                          <td className="edit-padding"> {info_part_show_popup.description} </td>
                          <td className="edit-padding text-center">
                            <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectNoPart(e)} aria-label="Close active modal" aria-controls="modalPart" id="closeModalInventory" >เลือก</button>
                          </td>
                        </tr>
                      )
                    })}
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
  parent_unit_part: state.parent_unit_part,

  // Mode Search
  no_part: state.no_part,
  info_part_show_popup: state.info_part_show_popup,
  info_part_show: state.info_part_show
})
const mapDispatchToProps = (dispatch) => ({
  onChangeNoPart: (e) => dispatch(onChangeNoPart(e)),
  onClickPopUpSearchNoPart: (e) => dispatch(onClickPopUpSearchNoPart(e)),
  onClickSelectNoPart: (e) => dispatch(onClickSelectNoPart(e)),
  onClickOpenPopUpNoPart: (e) => dispatch(onClickOpenPopUpNoPart(e)),
})
export default connect(mapStateToProps, mapDispatchToProps)(TopContent);

// Mode Search
export const onChangeNoPart = (e) => {
  return {
    type: "ON CHANGE NO PART",
    value: e.target.value
  }
}
export const onClickPopUpSearchNoPart = (e) => {
  return {
    type: "ON CLICK POPUP SEARCH NO PART",
    value: e.target.value
  }
}
export const onClickSelectNoPart = (e) => {
  console.log(e.target.parentNode.parentNode)
  return {
    type: "ON CLICK SELECT NO PART POPUP",
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onClickOpenPopUpNoPart = (e) => {
  return {
    type: "ON CLICK OPRN POPUP NO PART"
  }
}

