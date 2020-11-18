import React, {useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux'

const PopupModalWorkRequest = (props) => {

  const factDistricts = useSelector((state) => ({...state.api.fact.districts}), shallowEqual); 
  const factNodes = useSelector((state) => ({...state.api.fact.nodes}), shallowEqual); 

  return(
    <div className="modal" id="modalWorkRequset" style={{ display: "none" }}>
          <div className="gray-board">
            <p className="head-title-modal edit">รายการแจ้งเหตุขัดข้อง/ชำรุด</p>
            <div className="container_12 edit-padding">

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">เลขที่เอกสาร:</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" value={props.no_word_request} onChange={(e) => props.onChangeNoWorkRequset(e)} />
                </div>
              </div>

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">สถานที่ แขวง:</p></div>
                <div className="grid_8 pull_0">
                  <select className="edit-select-top grid_3 " onChange={(e) => props.onChangeDistricts(e)}>
                    <option defaultValue=""></option>
                    {factDistricts.items.map(function (district, index) {
                      return <option value={district.name} key={index}> {district.name} </option>
                    })}
                  </select>
                  <select className="edit-select-top grid_3 float-right" onChange={(e) => props.onChangeZones(e)}>
                    <option defaultValue=""></option>
                    {factNodes.items.map(function (zone, index) {
                      return <option value={zone.name} key={index}> {zone.name} </option>
                    })}
                  </select>
                  <p className="cancel-default grid_2 float-right">สถานที่ ตอน:</p>
                </div>
              </div>
              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">วันที่เริ่มต้น:</p></div>
                <div className="grid_8 pull_0">
                  <input type="date" className="cancel-default grid_3 " value={props.date_starts} onChange={(e) => props.onChangeDateStarts(e)}></input>
                  <input type="date" className="cancel-default grid_3 float-right" value={props.date_ends} onChange={(e) => props.onChangeDateEnds(e)}></input>
                  <p className="cancel-default grid_2 float-right">วันที่สิ้นสุด:</p>
                </div>
                <button className="button-blue edit grid_1 float-right mr-5" type="button" onClick={(e) => props.onClickPopUpSearchWorkRequset(e)}>ค้นหา</button>
              </div>

              <div className="grid_12">
                <table className="table-many-column mt-3">
                  <thead>
                    <tr>
                      <th className="font" style={{ minWidth: "150px" }}>เลขที่เอกสาร</th>
                      <th className="font" style={{ minWidth: "150px" }}>ชื่องาน</th>
                      <th className="font" style={{ minWidth: "150px" }}>วันเวลาแจ้งขัดข้อง</th>
                      <th className="font" style={{ minWidth: "150px" }}>ผู้นำเข้าระบบ</th>
                      <th className="font" style={{ minWidth: "150px" }}>สถานที่ แขวน/ตอน</th>
                      <th className="font" style={{ minWidth: "150px" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {[].map(function (word_request_show_popup, index) {
                    // {props.word_request_show_popup.map(function (word_request_show_popup, index) {
                      return (
                        <tr key={index} id={index}>

                          <td className="edit-padding" style={{ minWidth: "150px", paddingLeft: "50px" }}>{word_request_show_popup.no_word_request}</td>
                          <td className="edit-padding" style={{ maxWidth: "150px" }}>{word_request_show_popup.job_name}</td>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>{word_request_show_popup.date_start} {word_request_show_popup.time_start}</td>
                          <td className="edit-padding" style={{ maxWidth: "150px" }}>{word_request_show_popup.create_name}</td>
                          <td className="edit-padding" style={{ maxWidth: "150px" }}>{word_request_show_popup.station}</td>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>
                            <button type="button" className="button-blue" onClick={(e) => props.onClickSelectNoWorkRequset(e)} aria-label="Close active modal" aria-controls="modalWorkRequset" id="closeModalWorkRequset">เลือก</button>
                          </td>
                        </tr>
                      )
                    })}


                  </tbody>
                </table>
              </div>


              <div className="grid_12">
                <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalWorkRequset" id="closeModalWorkRequset">กลับ</button>
              </div>

            </div>
          </div>
        </div>
)};

export default PopupModalWorkRequest;