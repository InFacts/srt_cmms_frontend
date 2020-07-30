import React from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux'
import { connect } from 'react-redux'
import {FACTS, fetchFact} from '../../redux/modules/api/fact.js'
import {identifyEndpoinsHelper} from '../../helper';
const formatDate = (dateISOString) => {
  let date = new Date(dateISOString);
  // year = date.getFullYear();
  // month = date.getMonth()+1;
  // dt = date.getDate();
  return date.toLocaleDateString('th-TH');
}

const BottomContent = (props) => {
  const listUsers = useSelector((state) => ({...state.api.fact.users.items}));
  const listDocumentStatus = useSelector((state) => ({...state.api.fact['document-status'].items}));
  
  const identifyEndpoins = (document_type_id) => identifyEndpoinsHelper(document_type_id)

  return (
    <>
      <div id="blackground-gray">
        <div className="container_12 clearfix">
          <div className="container_12 ">
            <div className="container_12">
              <table className="table-many-column mt-3" style={{ height: "380px" }}>
                <thead>
                  <tr>
                  {/* <th className="font" style={{ minWidth: "150px" }}>TEST</th> */}
                    <th className="font" style={{ minWidth: "150px" }}>วันเวลาสร้าง</th>
                    <th className="font" style={{ minWidth: "150px" }}>เลขที่เอกสาร</th>
                    <th className="font" style={{ minWidth: "350px" }}>ประเภทเอกสาร</th>
                    {/* <th className="font" style={{ minWidth: "150px" }}>ชื่องาน</th> */}
                    <th className="font" style={{ minWidth: "150px" }}>ผู้นำเข้าระบบ</th>
                    <th className="font" style={{ minWidth: "150px" }}>สถานะ</th>
                    {/* <th className="font" style={{ minWidth: "150px" }}>รายละเอียด</th> */}
                  </tr>
                </thead>
                <tbody>
                  {props.track_document_show.map(function (track_document_show, index) {
                    if (Object.keys(listUsers).length !== 0 && listUsers !== undefined && Object.keys(listDocumentStatus).length !== 0 && listDocumentStatus !== undefined){
                      return (
                        <tr key={index} id={index}>
                          {/* <td className="edit-padding" style={{ paddingLeft: "5px" }}>{track_document_show.document_id}</td> */}
                          <td className="edit-padding" style={{ paddingLeft: "5px" }}>{formatDate(track_document_show.created_on)}</td>
                          <td className="edit-padding" >
                            <Link to={identifyEndpoins(track_document_show.document_type_id) + "?internal_document_id=" + track_document_show.internal_document_id + "&document_id=" + track_document_show.document_id}>{track_document_show.internal_document_id}</Link>
                          </td>
                          {/* <td className="edit-padding" >{track_document_show.internal_document_id}</td> */}
                          <td className="edit-padding" >{track_document_show.document_type_name} </td>
                          {/* <td className="edit-padding" style={{  }}>{track_document_show.job_document}</td> */}
                          <td className="edit-padding">{
                            track_document_show.created_by_user_id === 0 && listUsers[0].username !== undefined ? "Server" :
                            Object.values(listUsers).find(user => user.user_id === track_document_show.created_by_user_id).username
                          }</td>
                          <td className="edit-padding">{track_document_show.document_status_en}</td>
                          {/* <td className="edit-padding">
                            <Link to={identifyEndpoins(track_document_show.document_type_id) + "?internal_document_id=" + track_document_show.internal_document_id + "&document_id=" + track_document_show.document_id}>รายละเอียด</Link>
                          </td> */}
                        </tr>
                      )}
                    })
                  }
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