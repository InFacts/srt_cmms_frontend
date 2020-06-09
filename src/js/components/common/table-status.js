import React, { useState, useEffect } from 'react';

const TableSatus = (props) => {
  console.log("props.bodyTableStatus", props.bodyTableStatus)
  return (
    <>
      <table className="table-many-column mt-2">
        <thead>
          <tr>
            <th className="font" style={{ width: "50px" }}></th>
            <th className="font" style={{ width: "200px" }}>ตำแหน่ง</th>
            <th className="font" style={{ width: "200px" }}>หน่วยงาน</th>
            <th className="font" style={{ width: "250px" }}>ชื่อผู้ลงนาม</th>
            <th className="font" style={{ width: "150px" }}>วันที่ลงนาม</th>
            <th className="font" style={{ width: "150px" }}>สถานะ</th>
          </tr>
        </thead>
        <tbody>
          {props.bodyTableStatus.map((resApprove, i) => {
            return (
            resApprove.position_group.name !== "This"
            ?
              <tr key={i} id={i}>
                <td className="edit-padding">
                  {resApprove.approval_by.length === 0 ? <i className="fas fa-check-circle" style={{ color: "gray" }}></i> : <i className="fas fa-check-circle" style={{ color: "green" }}></i>}
                </td>
                <td className="edit-padding">{resApprove.position_group.name}</td>
                <td className="edit-padding">{resApprove.position.length === 0 ? "" : resApprove.position[0].name}</td>
                <td className="edit-padding">{resApprove.approval_by.length === 0 ? "-" : resApprove.approval_by[0].user.firstname_th + " " + resApprove.approval_by[0].user.lastname_th}</td>
                <td className="edit-padding">{resApprove.approval_by.length === 0 ? "-" : resApprove.approval_by[0].approved_on.slice(0, 10)}</td>
                <td className="edit-padding">{resApprove.approval_by.length === 0 ? "รอการลงนาม" : "อนุมัติเรียบร้อย"}</td>
              </tr>
            :
            null
          )
          })}
        </tbody>
      </table>
    </>
  )
}

export default TableSatus;