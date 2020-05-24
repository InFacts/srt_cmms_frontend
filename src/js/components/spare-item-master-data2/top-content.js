import React, {useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import TabDocument from '../common/tab-bar.js';

import {TOOLBAR_MODE, toModeSearch, toModeAdd } from '../../redux/modules/toolbar.js';

import '../../../css/style.css'
import '../../../css/grid12.css';

const InputComponent = (props) => (
  <input type='text' className={props.className} value={props.value} onChange={props.handleChange} />
);


const TestBottomContent = () => {
  const [count1, setCount1] = useState(0);
  const [count, setCount] = useState(0);
  return (
      <>
          <div className="tabcontent" id="listReport_content" >
              <h3>London</h3>
              <p>London is the capital city of England.</p>
              <p>You clicked {count1} times</p>
              <button onClick={() => setCount1(count1 + 1)}>
                  Click me
              </button>
          </div>
          <div className="tabcontent" id="attachment_content" >
              <p>You clicked {count} times</p>
              <button onClick={() => setCount(count + 1)}>
                  Click me
              </button>
          </div>
      </>
  )
}

const Input = connect(
  (state, ownProps) => ({
    className: ownProps.className,
    value: state.item_master.fields[ownProps.field] || ''
  }),
  (dispatch, ownProps) => ({
    handleChange: (e) => dispatch({
      type: 'CHANGE_FORM',
      field: ownProps.field,
      value: e.target.value
    })
  })
)(InputComponent);


// class TopContent extends React.Component {
const TopContent = (props) => {
  const [tabNames, setTabNames] = useState([
    {id:"attachment", name:"แนบไฟล์"},
    {id:"listReport", name:"รายการ"}
  ]);
  
  
  useEffect(() => {
    console.log("")
    props.toModeSearch();
  });
  const checkActionMode = (mode) => {
    if (mode === "home") {
      return (
          <Redirect to="/main"></Redirect>
      )
  }
  
    if (mode === TOOLBAR_MODE.SEARCH) {
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
                  {props.mode_no_part.map(function (mode_no_part, index) {
                    return (<option key={index} defaultValue={mode_no_part.mode_no}>{mode_no_part.mode_no}</option>)
                  })}
                </select>
              </div>
              <div className="grid_3 pull_1">
              <Input className="p-search-box__input cancel-default" field='first' />
              <Input field='first2' />
              <Input field='first3' />
              <Input field='first4' />
                <div className="p-search-box cancel-margin">
                  
                  <input type="text" className="p-search-box__input cancel-default" value={props.no_part} onChange={props.onChangeNoPart} />
                  <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalPart" aria-controls="modalPart" onClick={(e) => props.onClickOpenPopUpNoPart(e)}></i></button>
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
                <input type="text" className="cancel-default" defaultValue={props.info_part_show.description} disabled="disabled"></input>
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
                  {props.type_part.map(function (type_part, index) {
                    if (props.info_part_show.type === type_part.type)
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
                  {props.group_part.map(function (group_part, index) {
                    if (props.info_part_show.group === group_part.group)
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
                  {props.parent_unit_part.map(function (parent_unit_part, index) {
                    if (props.info_part_show.parent_unit_part === parent_unit_part.parent_unit)
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
  };
    return (
      <div>
        <div id="blackground-white">
          <div className="container_12 clearfix">
            <section className="grid_12 ">
              <h4 className="head-title">ข้อมูลอุปกรณ์</h4>
              {checkActionMode(props.actionMode)}
            </section>

            {/* Tab Bar */}
            <TabDocument tabNames={tabNames}>
                    <TestBottomContent />
            </TabDocument>
            {/* <div className="grid_12">
              <div className="tab grid_11">
                <button type="button" id="defaultOpen" className="tablinks" onClick={e => tapChange(e, "ทั่วไป")}>ทั่วไป</button>
                <button type="button" className="tablinks" onClick={e => tapChange(e, "คลัง")}>คลัง</button>
                <button type="button" className="tablinks" onClick={e => tapChange(e, "แนบไฟล์")}>แนบไฟล์</button>
              </div>
            </div> */}

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
                  <input type="text" className="cancel-default grid_3" value={props.no_part} onChange={(e) => props.onChangeNoPart(e)} />
                  <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => props.onClickPopUpSearchNoPart(e)}>ค้นหา</button>
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
                  {console.log(props)}
                  <tbody>
                    {props.info_part_show_popup.map(function (info_part_show_popup, index) {
                      return (
                        <tr key={index} id={index}>
                          <td className="edit-padding"> {info_part_show_popup.no_part} </td>
                          <td className="edit-padding"> {info_part_show_popup.description} </td>
                          <td className="edit-padding text-center">
                            <button type="button" className="button-blue" onClick={(e) => props.onClickSelectNoPart(e)} aria-label="Close active modal" aria-controls="modalPart" id="closeModalInventory" >เลือก</button>
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
  
}

const mapStateToProps = (state) => {
  var action = state.toolbar.mode;
  state = state.item_master.temp_reducer;
  return {

  actionMode: action,
  mode_no_part: state.mode_no_part,
  type_part: state.type_part,
  group_part: state.group_part,
  parent_unit_part: state.parent_unit_part,

  // Mode Search
  no_part: state.no_part,
  info_part_show_popup: state.info_part_show_popup,
  info_part_show: state.info_part_show
}
}
const mapDispatchToProps = (dispatch) => ({
  onChangeNoPart: (e) => dispatch(onChangeNoPart(e)),
  onClickPopUpSearchNoPart: (e) => dispatch(onClickPopUpSearchNoPart(e)),
  onClickSelectNoPart: (e) => dispatch(onClickSelectNoPart(e)),
  onClickOpenPopUpNoPart: (e) => dispatch(onClickOpenPopUpNoPart(e)),
  toModeSearch: () => dispatch(toModeSearch()),
  toModeAdd: () => dispatch(toModeAdd())
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

