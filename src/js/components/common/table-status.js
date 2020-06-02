import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { useFormikContext } from 'formik';

const TableSatus = (props) => {
  const checkVariable = (check, value) => {
    if (check === "green") {
      return (
        <i className="fas fa-check-circle green"></i>
      )
    }
    if (check === "gray") {
      return (
        <i className="fas fa-check-circle gray"></i>
      )
    }
    else {
      return value;
    }
  }
  return (
    <>
      <table className="table-many-column">
        <thead>
          <tr>
            <th className="font-for-status" style={{ width: "50px" }}></th>
            <th className="font-for-status">ตำแหน่ง</th>
            <th className="font-for-status">หน่วยงาน</th>
            <th className="font-for-status">ชื่อผู้ลงนาม</th>
            <th className="font-for-status">วันที่ลงนาม</th>
            <th className="font-for-status">สถานะ</th>
          </tr>
        </thead>
        <tbody>
          {props.bodyTableStatus.map((resApprove, i) => {
            return (
              <tr key={i} id={i}>
                <td className="font-for-status" style={{ width: "50px" }}>
                  {resApprove.approval_by.length === 0 ? <i className="fas fa-check-circle" style={{ color: "gray" }}></i> : <i className="fas fa-check-circle" style={{ color: "green" }}></i>}
                </td>
                <td className="font-for-status">{resApprove.position_group.name}</td>
                <td className="font-for-status">{resApprove.position.length === 0 ? "" : resApprove.position[0].name}</td>
                <td className="font-for-status">{resApprove.approval_by.length === 0 ? "-" : resApprove.approval_by[0].user.firstname_th + " " + resApprove.approval_by[0].user.lastname_th}</td>
                <td className="font-for-status">{resApprove.approval_by.length === 0 ? "-" : resApprove.approval_by[0].approved_on.slice(0, 10)}</td>
                <td className="font-for-status">{resApprove.approval_by.length === 0 ? "รอการลงนาม" : "อนุมัติเรียบร้อย"}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default TableSatus;