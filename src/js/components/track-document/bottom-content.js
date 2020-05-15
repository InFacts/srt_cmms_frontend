import React from 'react';
import { connect } from 'react-redux'
import Document from '../../../images/document.svg'

import '../../../css/style.css'

class BottomContent extends React.Component {

  render() {
    let current = this;
    return (
      <form>
        <div id="blackground-gray">
          <div className="container_12 clearfix">
            <div className="grid_12 ">

              <div className="grid_12">
                <table className="table-many-column mt-3">
                  <thead>
                    <tr>
                      <th className="font" style={{ minWidth: "150px" }}>วันเวลาแจ้งขัดข้อง</th>
                      <th className="font" style={{ minWidth: "150px" }}>เลขที่เอกสาร</th>
                      <th className="font" style={{ minWidth: "150px" }}>ประเภทเอกสาร</th>
                      <th className="font" style={{ minWidth: "150px" }}>ชื่องาน</th>
                      <th className="font" style={{ minWidth: "150px" }}>ผู้นำเข้าระบบ</th>
                      <th className="font" style={{ minWidth: "150px" }}>สถานะ</th>
                      <th className="font" style={{ minWidth: "150px" }}>รายละเอียด</th>
                    </tr>
                  </thead>
                  <tbody>

                    {current.props.track_document_popup.map(function (track_document_popup, index) {
                      return (
                        <tr key={index} id={index}>

                          <td className="edit-padding" style={{ minWidth: "150px", paddingLeft: "50px" }}>{track_document_popup.date_start}</td>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>{track_document_popup.no_track_document}</td>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>{track_document_popup.type_document} </td>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>{track_document_popup.job_document}</td>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>{track_document_popup.create_name}</td>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>{track_document_popup.status_document}</td>
                          <td className="edit-padding" style={{ minWidth: "150px" }}>
                            <button type="button" className="button-blue" >รายละเอียด</button>
                          </td>
                        </tr>
                      )
                    })}

                  </tbody>
                </table>
              </div>



            </div>
          </div>
        </div>
      </form>
    )
  };
}



const mapStateToProps = (state) => ({
  actionMode: state.action,
  track_document_popup: state.track_document_popup,
  track_document: state.track_document,
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);