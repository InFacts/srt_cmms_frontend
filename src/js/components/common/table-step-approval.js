import React, { useState, useEffect } from 'react';

const TableStepApproval = (props) => {
  return (
    <>
      <table className="table-many-column mt-2" style={{ height: "600px" }}>
        <thead>
          <tr>
            <th className="font text-center" style={{ width: "30px" }}>#</th>
            <th className="font" style={{ width: "500px" }}>ตำแหน่ง</th>
            <th className="font" style={{ width: "500px" }}>หน่วยงาน</th>
          </tr>
        </thead>
        <tbody>
          {props.bodyTableStepApproval.approval_step_lookup && props.bodyTableStepApproval.approval_step_lookup.map((resApprove, i) => {
            if (resApprove.position_group.position.length !== 0) {
              return (
                <tr key={i} id={i}>
                  <td className="edit-padding text-center">{i + 1}</td>
                  <td className="edit-padding">{resApprove.position_group.name}</td>
                  <td className="edit-padding">{resApprove.position_group.position[0].name}</td>
                </tr>
              )
            } else {
              return null;
            }
          })}
        </tbody>
      </table>
    </>
  )
}

export default TableStepApproval;