import React from 'react';


const PopupModal = ({props}) => {
    return (
    <div className="modal" id="modalPart" style={{ display: "none" }}>
        <div className="gray-board">
            <p className="head-title-modal edit">ค้นหาเลขที่อุปกรณ์</p>
            <div className="container_12 edit-padding">
  
            <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">เลขที่อุปกรณ์</p></div>
                <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_3" value={props.no_part} onChange={props.onChangeNoPart} />
                    <button className="button-blue edit grid_1 mr-5" type="button" onClick={props.onClickPopUpSearchNoPart}>ค้นหา</button>
                </div>
            </div>
  
            <div className="grid_12">
                <table className="table-many-column mt-3">
                    <thead>
                        <tr>
                            <th className="font" style={{ minWidth: "300px" }}>เลขที่อุปกรณ์</th>
                            <th className="font" style={{ minWidth: "450px" }}>รายละเอียด</th>
                            <th className="font" style={{ minWidth: "150px" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.info_part_show_popup.map(function (info_part_show_popup, index) {
                        return (
                            <tr key={index} id={index}>
                            <td className="edit-padding"> {info_part_show_popup.no_part} </td>
                            <td className="edit-padding"> {info_part_show_popup.description} </td>
                            <td className="edit-padding text-center">
                                <button type="button" className="button-blue" onClick={props.onClickSelectNoPart} aria-label="Close active modal" aria-controls="modalPart" id="closeModalInventory" >เลือก</button>
                            </td>
                            </tr>
                        )
                        })}
                    </tbody>
                </table>
            </div>
  
            <div className="grid_12">
                <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalPart" id="closeModalInventory">กลับ</button>
            </div>
  
            </div>
        </div>
    </div>
)}
export default PopupModal;