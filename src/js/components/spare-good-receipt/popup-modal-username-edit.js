import React from 'react';

const PopupModalUsernameEdit = ({props}) => (<div className="modal" id="modalUserNameModeEdit" style={{ display: "none" }}>
<div className="gray-board">
  <p className="head-title-modal edit">ค้นหาชื่อผู้นำเข้า</p>
  <div className="container_12 edit-padding">

    <div className="grid_12">
      <div className="grid_2"><p className="cancel-default">ชื่อพนักงาน</p></div>
      <div className="grid_8 pull_0">
        <input type="text" className="cancel-default grid_3" value={props.document_show.created_by_user_name_th} onChange={props.onChangeName} />
      </div>
    </div>
    <div className="grid_12">
      <div className="grid_2"><p className="cancel-default">รหัสพนักงาน</p></div>
      <div className="grid_8 pull_0">
        <input type="text" className="cancel-default grid_3" value={props.document_show.employee_id} onChange={props.onChangeNameId} />
        <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => props.onClickPopUpSearchUserModeEdit(props.document_show.created_by_user_name_th, props.document_show.employee_id)}>ค้นหา</button>
      </div>
    </div>

    <div className="grid_12">
      <table className="table-many-column mt-3">
        <thead>
          <tr>
            <th className="font" style={{ minWidth: "300px" }}>รหัสพนักงาน</th>
            <th className="font" style={{ minWidth: "450px" }}>ชื่อพนักงาน</th>
            <th className="font" style={{ minWidth: "150px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.line_users.map(function (line_users, index) {
            return (
              <tr key={index} id={index}>
                <td className="edit-padding" style={{ minWidth: "150px" }}> {line_users.employee_id} </td>
                <td className="edit-padding" style={{ minWidth: "300px" }}> {line_users.firstname_th} {line_users.lastname_th}</td>
                <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                  <button type="button" className="button-blue" onClick={props.onClickSelectUserModeEdit} aria-label="Close active modal" aria-controls="modalUserNameModeEdit" id="closeModalInventory" >เลือก</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>

    <div className="grid_12">
      <button className="button-blue float-right grid_1 mr-5 mt-3" type="button" aria-label="Close active modal" aria-controls="modalUserNameModeEdit" id="closeModalInventory">กลับ</button>
    </div>

  </div>
</div>
</div>)
export default PopupModalUsernameEdit;