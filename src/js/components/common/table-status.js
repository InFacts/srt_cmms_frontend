import React, { useState, useEffect } from 'react';
import {APPROVAL_STATUS, APPROVAL_STATUS_TH} from '../../helper';

const TableStatus = (props) => {

  const status = (approval_status_id, is_icon) => {
    if (approval_status_id === APPROVAL_STATUS.UNCOMPLETE) {
      if (is_icon) {
        return <i className="fas fa-check-circle" style={{ color: "gray" }}></i>;
      }
      return APPROVAL_STATUS_TH.UNCOMPLETE;
    }
    else if (approval_status_id === APPROVAL_STATUS.APPROVED) {
      if (is_icon) {
        return <i className="fas fa-check-circle" style={{ color: "green" }}></i>;
      }
      return APPROVAL_STATUS_TH.APPROVED;
    }
    else if (approval_status_id === APPROVAL_STATUS.REJECTED) {
      if (is_icon) {
        return <i className="fas fa-times-circle" style={{ color: "red" }}></i>;
      }
      return APPROVAL_STATUS_TH.REJECTED;
    }
    else if (approval_status_id === APPROVAL_STATUS.FAST_TRACKED) {
      if (is_icon) {
        return <i className="fas fa-tag" style={{ color: "green" }}></i>;
      }
      return APPROVAL_STATUS_TH.FAST_TRACKED;
    }
    else if (approval_status_id === APPROVAL_STATUS.ESCALATED) {
      if (is_icon) {
        return <i className="fas fa-users" style={{ color: "green" }}></i>;
      }
      return APPROVAL_STATUS_TH.ESCALATED;
    }
  } 
  
  return (
    <>
      {[0].map((newTable,j) => (
        <div style={{ paddingRight: "10px", paddingLeft: "10px" }}>
          <h2>Approval Process ID #{props.bodyTableStatus.length !== 0 ? props.bodyTableStatus[j].approval_process_id: "ไม่มี"}</h2>
          <table className="table-many-column mt-2">
            <thead>
              <tr>
                <th className="font" style={{ minWidth: "50px" }}></th>
                <th className="font" style={{ minWidth: "150px" }}>ตำแหน่ง</th>
                <th className="font" style={{ minWidth: "200px" }}>หน่วยงาน</th>
                <th className="font" style={{ minWidth: "250px" }}>ชื่อผู้ลงนาม</th>
                <th className="font" style={{ minWidth: "100px" }}>วันที่ลงนาม</th>
                <th className="font" style={{ minWidth: "100px" }}>สถานะ</th>
                <th className="font" style={{ minWidth: "300px" }}>หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>
              {props.bodyTableStatus.map((resApprove, i) => {
                // console.log("resApprove", resApprove)
                return (
                  <tr key={i} id={i}>
                    <td className="edit-padding">
                      { resApprove.approval_by.length === 0 ? <i className="fas fa-check-circle" style={{ color: "gray" }}></i> : status(resApprove.approval_by[0].approval_status_id, true)}
                      {/* { status(resApprove.approval_by[0].approval_status_id, true)} */}
                    </td>
                    <td className="edit-padding">{resApprove.position_group && resApprove.position_group.name}</td>
                    <td className="edit-padding">{resApprove.position.length === 0 ? "" : resApprove.position[0].name}</td>
                    <td className="edit-padding">{resApprove.approval_by.length === 0 || resApprove.position_group.name === "SERVER" ? "-" : resApprove.approval_by[0].user.firstname_th + " " + resApprove.approval_by[0].user.lastname_th}</td>
                    <td className="edit-padding">{resApprove.approval_by.length === 0 ? "-" : resApprove.approval_by[0].approved_on.slice(0, 10)}</td>
                    <td className="edit-padding">{resApprove.approval_by.length === 0 ? APPROVAL_STATUS_TH.UNCOMPLETE : status(resApprove.approval_by[0].approval_status_id, false)}</td>
                    <td className="edit-padding">{resApprove.approval_by.length === 0 ? "-" : resApprove.approval_by[0].remark}</td>
                  </tr>
              )
              })}
            </tbody>
          </table>
        </div>
      ))}
    </>
  )
}

export default TableStatus;