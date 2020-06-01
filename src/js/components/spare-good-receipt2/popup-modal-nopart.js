import React from 'react';

const PopupModalNoPart = (props) => {
    //* PopUp เลขที่อะไหล่ */
return(
    <div className="modal" id="modalNoPart" style={{ display: "none" }}>
    <div className="gray-board">
        <p className="head-title-modal edit">ค้นหาเลขที่อะไหล่</p>
        <div className="container_12 edit-padding">

        <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">เลขที่อะไหล่</p></div>
            <div className="grid_8 pull_0">
            <input type="text" className="cancel-default grid_3" value={this.props.list_no_part} onChange={(e) => this.props.onChangeNoPart(e)} />
            </div>
        </div>

        <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายละเอียด</p></div>
            <div className="grid_8 pull_0">
            <input type="text" className="cancel-default grid_3" value={this.props.list_description_part} onChange={(e) => this.props.onChangeDescriptionPart(e)} />
            <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickSearchPopUpNoPart(this.props.list_no_part)}>ค้นหา</button>
            </div>
        </div>

        <div className="grid_12">
            <table className="table-many-column mt-3">
            <thead>
                <tr>
                <th className="font" style={{ minWidth: "300px" }}>เลขที่อะไหล่</th>
                <th className="font" style={{ minWidth: "450px" }}>รายละเอียด</th>
                <th className="font" style={{ minWidth: "150px" }}>Action</th>
                </tr>
            </thead>
            <tbody>
                {this.props.no_part_show.map(function (no_part_show, index) {
                return (
                    <tr key={index} id={index}>
                    <td className="edit-padding" style={{ minWidth: "150px" }}> {no_part_show.internal_item_id} </td>
                    <td className="edit-padding" style={{ minWidth: "300px" }}> {no_part_show.description} </td>
                    <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                        <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectPopUpNoPart(e)} aria-label="Close active modal" aria-controls="modalNoPart" id="closeModalNoPart" >เลือก</button>
                    </td>
                    </tr>
                )
                })}
            </tbody>
            </table>
        </div>

        <div className="grid_12">
            <button className="button-blue float-right grid_1 mr-5 mt-3" type="button" aria-label="Close active modal" aria-controls="modalNoPart" id="closeModalNoPart">กลับ</button>
        </div>

        </div>
    </div>
    </div>
)}

export default PopupModalNoPart;