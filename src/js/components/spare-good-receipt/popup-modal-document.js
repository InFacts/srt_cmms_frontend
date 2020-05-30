import React from 'react';

const PopupModalDocument = ({props}) => (
    <div className="modal" id="modalDocument" style={{ display: "none" }}>
        <div className="gray-board">
        <p className="head-title-modal edit">ค้นหาเลขที่เอกสาร</p>
        <div className="container_12 edit-padding">

            <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">เลขที่เอกสาร</p></div>
            <div className="grid_8 pull_0">
                <input type="text" className="cancel-default grid_3" value={props.no_document} onChange={props.onChangeNoDocument} />
                <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => props.onClickPopUpSearchNoDocument(props.no_document)}>ค้นหา</button>
            </div>
            </div>

            <div className="grid_12">
            <table className="table-many-column mt-3">
                <thead>
                <tr>
                    <th className="font" style={{ minWidth: "300px" }}>เลขที่เอกสาร</th>
                    <th className="font" style={{ minWidth: "450px" }}>สร้างวันที่</th>
                    <th className="font" style={{ minWidth: "150px" }}>Action</th>
                </tr>
                </thead>
                <tbody>
                {props.document_show_popup.map(function (document_show_popup, index) {
                    return (
                    <tr key={index} id={index}>
                        <td className="edit-padding" style={{ minWidth: "150px" }}> {document_show_popup.internal_document_id} </td>
                        <td className="edit-padding" style={{ minWidth: "300px" }}> {document_show_popup.created_on.replace("T", " เวลา ").slice(0, 21) + " น."} </td>
                        <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                        <button type="button" className="button-blue" onClick={(e, i) => props.onClickSelectNoDocument(document_show_popup.document_id)} aria-label="Close active modal" aria-controls="modalDocument" id="closeModalInventory" >เลือก</button>
                        </td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
            </div>

            <div className="grid_12">
            <button className="button-blue float-right grid_1 mr-5 mt-3" type="button" aria-label="Close active modal" aria-controls="modalDocument" id="closeModalInventory">กลับ</button>
            </div>

        </div>
        </div>
    </div>
)
export default PopupModalDocument;