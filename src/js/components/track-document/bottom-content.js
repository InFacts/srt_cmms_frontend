import React from 'react';
import { connect } from 'react-redux'
import Document from '../../../images/document.svg'
import {FACTS} from '../../redux/modules/api/fact.js'

import '../../../css/style.css'

const formatDate = (dateISOString) => {
  let date = new Date(dateISOString);
  // year = date.getFullYear();
  // month = date.getMonth()+1;
  // dt = date.getDate();
  return date.toLocaleDateString('en-GB') + " " + date.toLocaleTimeString();
}

const BottomContent = (props) => {
  return (
    <>
      <div id="blackground-gray">
        <div className="container_12 clearfix">
          <div className="container_12 ">
            <div className="container_12">
              <table className="table-many-column mt-3">
                <thead>
                  <tr>
                    <th className="font" style={{ minWidth: "150px" }}>วันเวลาสร้าง</th>
                    <th className="font" style={{ minWidth: "10px" }}>เลขที่เอกสาร</th>
                    <th className="font" style={{ minWidth: "150px" }}>ประเภทเอกสาร</th>
                    {/* <th className="font" style={{ minWidth: "150px" }}>ชื่องาน</th> */}
                    <th className="font" style={{ minWidth: "10px" }}>ผู้นำเข้าระบบ</th>
                    <th className="font" style={{ minWidth: "150px" }}>สถานะ</th>
                    <th className="font" style={{ minWidth: "150px" }}>รายละเอียด</th>
                  </tr>
                </thead>
                <tbody>
                  {props.track_document_show.map(function (track_document_show, index) {
                    return (
                      <tr key={index} id={index}>
                        <td className="edit-padding" style={{ minWidth: "150px", paddingLeft: "0px" }}>{formatDate(track_document_show.created_on)}</td>
                        <td className="edit-padding" style={{ minWidth: "10px" }}>{track_document_show.document_id}</td>
                        <td className="edit-padding" style={{ minWidth: "150px" }}>{track_document_show.document_type_name} </td>
                        {/* <td className="edit-padding" style={{ minWidth: "150px" }}>{track_document_show.job_document}</td> */}
                        <td className="edit-padding" style={{ minWidth: "10px" }}>{
                        props.FACT_USERS.find(user => user.user_id === track_document_show.created_by_user_id).username}</td>
                        <td className="edit-padding" style={{ minWidth: "150px" }}>{
                        props.FACT_DOCUMENT_STATUS.find(status => status.document_status_id === track_document_show.document_status_id).status}</td>
                        <td className="edit-padding" style={{ minWidth: "150px" }}>
                          <button type="button" className="button-blue" >รายละเอียด</button>
                        </td>
                      </tr>
                    )})}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  actionMode: state.action,
  track_document_show: state.track_doc.track_document_show,
  
  //fact
  FACT_USERS: state.api.fact[FACTS.USERS].items,
  FACT_DOCUMENT_STATUS: state.api.fact[FACTS.DOCUMENT_STATUS].items,
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);