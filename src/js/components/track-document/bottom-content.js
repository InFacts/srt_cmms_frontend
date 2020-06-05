import React from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux'
import { connect } from 'react-redux'
import {FACTS, fetchFact} from '../../redux/modules/api/fact.js'

const formatDate = (dateISOString) => {
  let date = new Date(dateISOString);
  // year = date.getFullYear();
  // month = date.getMonth()+1;
  // dt = date.getDate();
  return date.toLocaleDateString('en-GB') + " " + date.toLocaleTimeString();
}

const BottomContent = (props) => {
  const listUsers = useSelector((state) => ({...state.api.fact.users.items}));
  const listDocumentStatus = useSelector((state) => ({...state.api.fact['document-status'].items}));
  
  const identifyEndpoins = (document_type_id) => {
    let doc_type = document_type_id.toString().substring(0, 3);
    if (doc_type === "101") return "goods-receipt2";
    if (doc_type === "103") return "good-good-issue-no-po";
    if (doc_type === "111") return "good-issue-2";
    if (doc_type === "112") return "good-take-out";
    if (doc_type === "121") return "s1646";
    else return "#";
  }

  return (
    <>
      <div id="blackground-gray">
        <div className="container_12 clearfix">
          <div className="container_12 ">
            <div className="container_12">
              <table className="table-many-column mt-3" style={{ height: "380px" }}>
                <thead>
                  <tr>
                    <th className="font" style={{ minWidth: "150px" }}>วันเวลาสร้าง</th>
                    <th className="font" style={{ minWidth: "10px" }}>เลขที่เอกสาร</th>
                    <th className="font" style={{ minWidth: "250px" }}>ประเภทเอกสาร</th>
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
                        <td className="edit-padding" style={{ paddingLeft: "5px" }}>{formatDate(track_document_show.created_on)}</td>
                        <td className="edit-padding" >{track_document_show.internal_document_id}</td>
                        <td className="edit-padding" >{track_document_show.document_type_name} </td>
                        {/* <td className="edit-padding" style={{  }}>{track_document_show.job_document}</td> */}
                        <td className="edit-padding">{
                          track_document_show.created_by_user_id === 0 ? "Server" :
                          Object.values(listUsers).find(user => user.user_id === track_document_show.created_by_user_id).username
                        }</td>
                        <td className="edit-padding">{
                          Object.values(listDocumentStatus).find(status => status.document_status_id === track_document_show.document_status_id).status
                        }</td>
                        <td className="edit-padding">
                          <Link to={identifyEndpoins(track_document_show.document_type_id) + "?internal_document_id=" + track_document_show.internal_document_id + "&document_id=" + track_document_show.document_id}>รายละเอียดsdasd</Link>
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