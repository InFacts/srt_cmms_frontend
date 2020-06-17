import React, { useState, useEffect } from 'react';

const TableStepApproval = (props) => {
  console.log("props.bodyTableStepApproval", props.bodyTableStepApproval)
  return (
    <>
      <table className="table-many-column mt-2">
        <thead>
          <tr>
            <th className="font text-center" style={{ width: "30px" }}>#</th>
            <th className="font" style={{ width: "500px" }}>ตำแหน่ง</th>
            <th className="font" style={{ width: "500px" }}>หน่วยงาน</th>
          </tr>
        </thead>
        <tbody>
          {/* {props.bodyTableStatus.map((resApprove, i) => {
            return (
            resApprove.position_group.name !== "This"
            ?
              <tr key={i} id={i}>
                <td className="edit-padding text-center">
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
          })} */}
          <tr>
            <td className="edit-padding text-center">1</td>
            <td className="edit-padding">SEVER</td>
            <td className="edit-padding"></td>
          </tr>
          <tr>
            <td className="edit-padding text-center">2</td>
            <td className="edit-padding">หัวหน้าแขวง/คลัง</td>
            <td className="edit-padding">แผนกควบคุมพัสดุ</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default TableStepApproval;