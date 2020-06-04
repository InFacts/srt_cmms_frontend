import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import TextareaInput from '../common/formik-textarea-input';
import TableStatus from '../common/table-status';
import Table from '../common/table';

import Files from '../common/files2'

import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import { useFormikContext } from 'formik';

import PopupModalNoPart from '../common/popup-modal-nopart'

import '../../../css/table.css';

const BottomContent = (props) => {
    return (
    <>
        <div id="blackground-gray">
            <div className="container_12 clearfix">
                <div className="grid_12 ">
                    <div id="broken_content" className="tabcontent">
                        <h3 className="head-title-bottom mt-2">ข้อมูลเกี่ยวกับอาการขัดข้อง</h3>
                        <div className="grid_12">
                        <div className="grid_3"><p className="cancel-default">ชื่องาน</p></div>
                        <div className="grid_7 ">
                            {/* <input type="text" className="cancel-default mt-1" value={props.word_order_show.information_name} disabled="disabled"></input> */}
                            <input type="text" className="cancel-default mt-1" value="" disabled="disabled"></input>
                        </div>
                        </div>
                        <div className="grid_12">
                        <div className="grid_3"><p className="cancel-default">วันเวลาที่เกิดเหตุ</p></div>
                        <div className="grid_7 ">
                            {/* <input type="date" className="cancel-default grid_3 mt-1" value={props.word_order_show.date_start} disabled="disabled"></input>
                            <input type="time" className="cancel-default grid_3 mt-1 float-right" value={props.word_order_show.time_start} disabled="disabled"></input> */}
                            <input type="date" className="cancel-default grid_3 mt-1" value="" disabled="disabled"></input>
                            <input type="time" className="cancel-default grid_3 mt-1 float-right" value="" disabled="disabled"></input>
                            <p className="cancel-default grid_1 float-right">เวลา</p>
                        </div>
                        </div>
                        <div className="grid_12">
                        <div className="grid_3"><p className="cancel-default">วันเวลาที่รับแจ้ง</p></div>
                        <div className="grid_7 ">
                            {/* <input type="date" className="cancel-default grid_3 mt-1" value={props.word_order_show.date_end} disabled="disabled"></input>
                            <input type="time" className="cancel-default grid_3 mt-1 float-right" value={props.word_order_show.time_end} disabled="disabled"></input> */}
                            <input type="date" className="cancel-default grid_3 mt-1" value="" disabled="disabled"></input>
                            <input type="time" className="cancel-default grid_3 mt-1 float-right" value="" disabled="disabled"></input>
                            <p className="cancel-default grid_1 float-right">เวลา</p>
                        </div>
                        </div>
                        <div className="grid_12">
                        <div className="grid_3"><p className="cancel-default">อาการเสียโดยสรุป</p></div>
                        <div className="grid_7 ">
                            {/* <input type="text" className="cancel-default mt-1" value={props.word_order_show.conclusions} disabled="disabled"></input> */}
                            <input type="text" className="cancel-default mt-1" value="" disabled="disabled"></input>
                        </div>
                        </div>
                        <div className="grid_12">
                        <div className="grid_3"><p className="cancel-default">ได้รับเหตุจาก</p></div>
                        <div className="grid_7">
                            {/* <input type="text" className="cancel-default mt-1" value={props.word_order_show.reason} disabled="disabled"></input> */}
                            <input type="text" className="cancel-default mt-1" value="" disabled="disabled"></input>
                        </div>
                        </div>
                        <div className="grid_12">
                        <div className="grid_3"><p className="cancel-default">ได้รับข้อมูลผ่านช่องทาง</p></div>
                        <div className="grid_7 ">
                            {/* {props.type.map(function (type, index) {
                                    if (type.name === props.word_order_show.type){
                                    return <div><input className="d-inline" type="radio" name="RadioOptions" id={type.name} value={type.name} checked/><label htmlFor={type.name} className="cancel-default d-inline">{type.name}</label></div>
                                    }
                                    else{
                                    return <div><input className="d-inline ml-3" type="radio" name="RadioOptions" id={type.name} value={type.name} /><label htmlFor={type.name} className="cancel-default d-inline ml-3">{type.name} </label></div>
                                    }
                            })} */}
            
                        </div>
                        </div>
                        <div className="grid_12">
                        <div className="grid_3"><p className="cancel-default">รายงานการตรวจซ่อมอุปกรณ์แขวง</p></div>
                        <div className="grid_7 ">
                            {/* <input type="text" className="cancel-default mt-1" value={props.word_order_show.report} disabled="disabled"></input> */}
                            <input type="text" className="cancel-default mt-1" value="" disabled="disabled"></input>
                        </div>
                        </div>
                        <div className="grid_12">
                        <div className="grid_3"><p className="cancel-default" style={{ paddingRight: "50px" }}>ที่ตั้งอุปกรณ์ที่ทำการตรวจซ่อม (สถานที่/ที่ตั้ง)</p></div>
                        <div className="grid_7 ">
                            {/* <input type="text" className="cancel-default mt-1" value={props.word_order_show.equipment} disabled="disabled"></input> */}
                            <input type="text" className="cancel-default mt-1" value="" disabled="disabled"></input>
                        </div>
                        </div>
            
                        <div className="grid_12">
                        <div className="grid_3"><p className="cancel-default">หมายเหตุ</p></div>
                        <div className="grid_7">
                            {/* <textarea className="edit" name="Text1" cols="40" rows="2" value={props.word_order_show.note}></textarea> */}
                            <textarea className="edit" name="Text1" cols="40" rows="2" value=""></textarea>
                        </div>
                        </div>
                    </div>
            
                    <div id="fixed_asset_content" className="tabcontent">
                        <h4 className="head-title-bottom mt-2">ข้อมูลเกี่ยวกับอาการขัดข้อง</h4>
                        <div className="grid_12" style={{ paddingRight: "10px" }}>
                        <table className="table-many-column">
                            <thead>
                            <tr>
                                <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                                <th className="font" style={{ minWidth: "130px" }}>เลขที่สินทรัพย์</th>
                                <th className="font" style={{ minWidth: "250px" }}>รายละเอียด</th>
                                <th className="font text-center" style={{ minWidth: "150px" }}>ที่อยู่ปัจจุบัน</th>
                                <th className="font text-center" style={{ minWidth: "100px" }}>สถานะ</th>
                                <th className="font text-center" style={{ minWidth: "500px" }}>หมายเหตุ</th>
                            </tr>
                            </thead>
                            <tbody>
                                {/* {props.list_show.map(function (list, index) { */}
                            {[].map(function (list, index) {
                                return (
                                <tr key={index}>
                                    <th className="edit-padding text-center" style={{ minWidth: "30px" }}>{list.id}</th>
                                    <td className="edit-padding" style={{ minWidth: "130px" }}>{list.no_part}</td>
                                    <td className="edit-padding text-left" style={{ minWidth: "250px" }}>{list.quility}</td>
                                    <td className="edit-padding text-center" style={{ minWidth: "80px" }}>{list.location}</td>
                                    <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                                    <select className="edit-select-table">
                                        {/* {props.status.map(function (status, index) {
                                        if (list.status === status.name) {
                                            return <option defaultValue={status.id} key={index} selected> {status.name} </option>
                                        }
                                        else {
                                            return null
                                        }
                                        })} */}
                                    </select>
                                    </td>
                                    <td className="edit-padding text-left" style={{ minWidth: "300px" }}>{list.note}</td>
                                </tr>)
                            })}
                            </tbody>
                        </table>
                        </div>
                    </div>
                    <div id="attachment_content" className="tabcontent">
                        <div className="grid_12 ">
                        {/* <Files /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
};

const mapStateToProps = (state) => ({
  fact: state.api.fact,
  actionMode: state.toolbar.mode,

  list_show: state.list_show
})
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);