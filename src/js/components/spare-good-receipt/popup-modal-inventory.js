import React from 'react';

const PopupModalInventory = ({props}) =>(<div className="modal" id="modalInventory" style={{ display: "none" }}>
<div className="gray-board">
  <p className="head-title-modal edit">ค้นหาเลขที่คลัง</p>
  <div className="container_12 edit-padding">

    <div className="grid_12">
      <div className="grid_2"><p className="cancel-default">เลขที่คลัง</p></div>
      <div className="grid_8 pull_0">
        <input type="text" className="cancel-default grid_3" value={props.document_show_mode_add.dest_warehouse_id} onChange={props.onChangeMyInventoryModeAdd} />
      </div>
    </div>
    <div className="grid_12">
      <div className="grid_2"><p className="cancel-default">ชื่อคลัง</p></div>
      <div className="grid_8 pull_0">
        <input type="text" className="cancel-default grid_3" value={props.document_show_mode_add.dest_warehouse_name} onChange={props.onChangeMyInventoryNameModeAdd} />
        <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => props.onClickPopUpSearchInventory(props.document_show_mode_add.dest_warehouse_id, props.document_show_mode_add.dest_warehouse_name)}>ค้นหา</button>
      </div>
    </div>

    <div className="grid_12">
      <table className="table-many-column mt-3">
        <thead>
          <tr>
            <th className="font" style={{ minWidth: "300px" }}>เลขที่คลัง</th>
            <th className="font" style={{ minWidth: "450px" }}>ชื่อคลัง</th>
            <th className="font" style={{ minWidth: "150px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.inventory_show_popup.map(function (inventory_show_popup, index) {
            return (
              <tr key={index} id={index}>
                <td className="edit-padding" style={{ minWidth: "150px" }}> {inventory_show_popup.warehouse_id} </td>
                <td className="edit-padding" style={{ minWidth: "300px" }}> {inventory_show_popup.name} </td>
                <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                  <button type="button" className="button-blue" onClick={props.onClickSelectInventory} aria-label="Close active modal" aria-controls="modalInventory" id="closeModalInventory" >เลือก</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>

    <div className="grid_12">
      <button className="button-blue float-right grid_1 mr-5 mt-3" type="button" aria-label="Close active modal" aria-controls="modalInventory" id="closeModalInventory">กลับ</button>
    </div>

  </div>
</div>
</div>)

export default PopupModalInventory;