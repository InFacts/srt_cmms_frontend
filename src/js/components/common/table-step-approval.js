import React, { useState, useEffect } from 'react';

const TableStepApproval = (props) => {
  console.log("props.bodyTableStepApprovaldddddd", props.bodyTableStepApproval)
  const item = props.bodyTableStepApproval
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
          {item.map((resApprove, i) => {
              return (
                <tr key={i} id={i}>
                  <td className="edit-padding text-center">{resApprove.position_id+1}</td>
                  <td className="edit-padding">{resApprove.name}</td>
                  <td className="edit-padding">{resApprove.abbreviation}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </>
  )
}

export default TableStepApproval;