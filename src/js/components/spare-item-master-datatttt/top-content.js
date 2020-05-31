import React, {useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import TabDocument from '../common/tab-bar.js';
import FormInput from '../common/form-input'
import PopupModal from './popup-modal';
import BottomContent from './bottom-content';

import {TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';

import '../../../css/style.css'
import '../../../css/grid12.css';

const FormLabel = ({children}) => (
  <div className="grid_2">
    <p className="top-text">{children}</p>
  </div>
);
const FormTitle = ({children}) => (
  <h4 className="head-title">{children}</h4>
);

const TopContent = (props) => {
  const [tabNames, setTabNames] = useState([
    // {id:"attachment", name:"แนบไฟล์"},
    // {id:"listReport", name:"รายการ"},
    {id:"general", name:"ทั่วไป"},
    {id:"warehouse", name:"คลัง"},
    {id:"attachment", name:"แนบไฟล์"},
  ]);

  const checkActionMode = (props) => {
    let mode = props.actionMode;
      return (
        <>
          <div className="grid_12">
            <FormLabel>เลขที่อุปกรณ์</FormLabel>
            <div className="grid_6">
              <div className="grid_2 pull_1">
                {/* Select Manual or Auto on  */}
                <select className="edit-select" style={{ marginTop: "0" }} disabled="disabled">
                  <option defaultValue="0">none</option>
                  {props.mode_no_part.map(function (mode_no_part, index) {
                    return (<option key={index} defaultValue={mode_no_part.mode_no}>{mode_no_part.mode_no}</option>)
                  })}
                </select>
              </div>
              <div className="grid_3 pull_1">
              <FormInput className="" field='first' />
              <FormInput className="" field='second' />
                <div className="p-search-box cancel-margin">
                  
                  <input type="text" className="p-search-box__input cancel-default" value={props.no_part} onChange={props.onChangeNoPart} />
                  <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalPart" aria-controls="modalPart" onClick={props.onClickOpenPopUpNoPart}></i></button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid_12">
            <FormLabel>รายละเอียด</FormLabel>
            <div className="grid_2 pull_1"><h1></h1></div>
            <div className="grid_6">
              <div className="grid_3 pull_1">
                <input type="text" className="cancel-default" defaultValue={props.info_part_show.description} disabled="disabled"></input>
              </div>
            </div>
          </div>

          <div className="grid_12">
            <FormLabel>ชนิดอุปกรณ์</FormLabel>
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
            <FormLabel>กลุ่มอุปกรณ์</FormLabel>
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
          <FormLabel>กลุ่มหน่วยนับ</FormLabel>
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
  return (
    <>
      <div id="blackground-white">
        <div className="container_12 clearfix">
          <section className="grid_12 ">
            <FormTitle>ข้อมูลอุปกรณ์</FormTitle>
            {checkActionMode(props)}
          </section>

          {/* Tab Bar */}
            {/* <BottomContent /> */}
        </div>
      </div>

      {/* PopUp ค้นหาเลขที่ที่อุปกรณ์ */}
      <PopupModal props={props}/>

    </>
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

