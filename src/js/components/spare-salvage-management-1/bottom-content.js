import React from 'react';
import Files from '../common/files'
import { connect } from 'react-redux'

import '../../../css/style.css';
import '../../../css/tabs.css';
import '../../../css/grid12.css';
import '../../../css/modal.css';
import '../../../css/table.css';

class BottomContent extends React.Component {

    checkActionMode = (mode) => {
        const current = this;
        if (mode === "search") {
            return (
                <>
                    <div className="grid_12 mb-2" style={{ paddingRight: "10px" }}>
                        <table className="table-many-column">
                            <thead>
                                <tr>
                                    <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                                    <th className="font" style={{ minWidth: "130px" }}>เลขที่อะไหล่</th>
                                    <th className="font" style={{ minWidth: "250px" }}>ชื่ออะไหล่</th>
                                    <th className="font text-center" style={{ minWidth: "80px" }}>คงคลัง</th>
                                    <th className="font text-center" style={{ minWidth: "80px" }}>รอส่งมอบ</th>
                                    <th className="font text-center" style={{ minWidth: "80px" }}>ระหว่างการจัดซื้อ</th>
                                    <th className="font text-center" style={{ minWidth: "80px" }}>จำนวนสุทธิ</th>
                                    <th className="font text-center" style={{ minWidth: "100px" }}>สถานะ</th>
                                    <th className="font" style={{ minWidth: "80px" }}>จำนวน</th>
                                    <th className="font" style={{ minWidth: "80px" }}>หน่วยนับ</th>
                                    <th className="font" style={{ minWidth: "80px" }}>ราคาต่อหน่วย</th>
                                    <th className="font" style={{ minWidth: "80px" }}>จำนวนเงิน</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.table_part_show.map(function (table_part_show, row) {
                                    return (
                                        <tr key={row} id={row}>
                                            <th className="edit-padding text-center">{row + 1}</th>
                                            <td className="edit-padding">{table_part_show.no_part}</td>
                                            <td className="edit-padding">{table_part_show.name_part}</td>
                                            <td className="edit-padding text-center disable">{table_part_show.stock}</td>
                                            <td className="edit-padding text-center disable">{table_part_show.wait_sent}</td>
                                            <td className="edit-padding text-center disable">{table_part_show.wait_po}</td>
                                            <td className="edit-padding text-center disable">{table_part_show.real_stock}</td>
                                            <td className="edit-padding text-center disable">{table_part_show.status}</td>
                                            <td className="edit-padding text-right">{table_part_show.quility}</td>
                                            <td className="edit-padding text-left">{table_part_show.unit}</td>
                                            <td className="edit-padding text-right">{table_part_show.unit_per_bath}</td>
                                            <td className="edit-padding text-right">{table_part_show.total}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="grid_12 mt-3">
                        <div className="grid_3 float-right">
                            <input type="text" className="cancel-default float-right" defaultValue={this.props.document_show.total} disabled="disabled"></input>
                        </div>
                        <div className="grid_2 float-right"><p className="cancel-default float-right">จำนวนสุทธิ</p></div>
                    </div>

                    <div className="grid_12">
                        <div className="grid_2"><p className="cancel-default">หมายเหตุ</p></div>
                        <div className="grid_4 pull_0">
                            <textarea className="edit" name="Text1" cols="40" rows="2" defaultValue={this.props.document_show.note} disabled="disabled"></textarea>
                        </div>
                    </div>
                </>
            )
        }
        if (mode === "edit") {
            return (
                <>
                    <div className="grid_12 mb-2" style={{ paddingRight: "10px" }}>
                        <table className="table-many-column">
                            <thead>
                                <tr>
                                    <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                                    <th className="font" style={{ minWidth: "130px" }}>เลขที่อะไหล่</th>
                                    <th className="font" style={{ minWidth: "250px" }}>ชื่ออะไหล่</th>
                                    <th className="font text-center" style={{ minWidth: "80px" }}>คงคลัง</th>
                                    <th className="font text-center" style={{ minWidth: "80px" }}>รอส่งมอบ</th>
                                    <th className="font text-center" style={{ minWidth: "80px" }}>ระหว่างการจัดซื้อ</th>
                                    <th className="font text-center" style={{ minWidth: "80px" }}>จำนวนสุทธิ</th>
                                    <th className="font text-center" style={{ minWidth: "100px" }}>สถานะ</th>
                                    <th className="font" style={{ minWidth: "80px" }}>จำนวน</th>
                                    <th className="font" style={{ minWidth: "80px" }}>หน่วยนับ</th>
                                    <th className="font" style={{ minWidth: "80px" }}>ราคาต่อหน่วย</th>
                                    <th className="font" style={{ minWidth: "80px" }}>จำนวนเงิน</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.table_part_show.map(function (table_part_show, row) {
                                    return (
                                        <tr key={row} id={row}>
                                            <th className="edit-padding text-center">{row + 1}</th>
                                            <td className="edit-padding">
                                                <div className="p-search-box cancel-margin" style={{ marginBottom: "0" }}>
                                                    <input type="text" className="p-search-box__input cancel-default-table" value={table_part_show.no_part} onChange={(e) => current.props.onChangeNoPartEachRow(e)} />
                                                    <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPart" aria-controls="modalNoPart" onClick={(e) => current.props.onClickNoPartEachRow(e)}></i></button>
                                                </div>
                                            </td>
                                            <td className="edit-padding">{table_part_show.name_part}</td>
                                            <td className="edit-padding text-center disable">{table_part_show.stock}</td>
                                            <td className="edit-padding text-center disable">{table_part_show.wait_sent}</td>
                                            <td className="edit-padding text-center disable">{table_part_show.wait_po}</td>
                                            <td className="edit-padding text-center disable">{table_part_show.real_stock}</td>
                                            <td className="edit-padding text-center disable">{table_part_show.status}</td>
                                            <td className="edit-padding text-right">
                                                <input type="number" min="1" className="cancel-default float-right" value={table_part_show.quility} onChange={(e) => current.props.onChangeQuilityEachRow(e)}></input>
                                            </td>
                                            <td className="edit-padding text-left">{table_part_show.unit}</td>
                                            <td className="edit-padding text-right">
                                                <input type="number" min="1" className="cancel-default float-right" value={table_part_show.unit_per_bath} onChange={(e) => current.props.onChangeUnitPerBathEachRow(e)}></input>
                                                {}</td>
                                            <td className="edit-padding text-right">{table_part_show.total}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="grid_12 mt-3">
                        <div className="grid_3 float-right">
                            <input type="text" className="cancel-default float-right" defaultValue={this.props.document_show.total} disabled="disabled"></input>
                        </div>
                        <div className="grid_2 float-right"><p className="cancel-default float-right">จำนวนสุทธิ</p></div>
                    </div>

                    <div className="grid_12">
                        <div className="grid_2"><p className="cancel-default">หมายเหตุ</p></div>
                        <div className="grid_4 pull_0">
                            <textarea className="edit" name="Text1" cols="40" rows="2" value={this.props.document_show.note} onChange={(e) => this.props.onChangeNote(e)}></textarea>
                        </div>
                    </div>

                    {/* PopUp เลขที่อะไหล่ */}
                    <div className="modal" id="modalNoPart" style={{ display: "none" }}>
                        <div className="gray-board">
                            <p className="head-title-modal edit">ค้นหาเลขที่อะไหล่</p>
                            <div className="container_12 edit-padding">

                                <div className="grid_12">
                                    <div className="grid_2"><p className="cancel-default">เลขที่อะไหล่</p></div>
                                    <div className="grid_8 pull_0">
                                        <input type="text" className="cancel-default grid_3" value={this.props.table_no_part} onChange={(e) => this.props.onChangeNoPart(e)} />
                                        <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickSearchPopUpNoPart(e)}>ค้นหา</button>
                                    </div>
                                </div>

                                <div className="grid_12">
                                    <table className="table-many-column mt-3">
                                        <thead>
                                            <tr>
                                                <th className="font" style={{ minWidth: "300px" }}>เลขที่อะไหล่</th>
                                                <th className="font" style={{ minWidth: "350px" }}>ชื่ออะไหล่</th>
                                                <th className="font" style={{ minWidth: "150px" }}>สถานะ</th>
                                                <th className="font" style={{ minWidth: "100px" }}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {current.props.raw_no_part_show_popup.map(function (raw_no_part_show_popup, index) {
                                                return (
                                                    <tr key={index} id={index}>
                                                        <td className="edit-padding"> {raw_no_part_show_popup.no_part} </td>
                                                        <td className="edit-padding"> {raw_no_part_show_popup.name_part} </td>
                                                        <td className="edit-padding"> {raw_no_part_show_popup.status} </td>
                                                        <td className="edit-padding text-center">
                                                            <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectPopUpNoPart(e)} aria-label="Close active modal" aria-controls="modalNoPart" id="closeModalNoPart" >เลือก</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="grid_12">
                                    <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalNoPart" id="closeModalNoPart">กลับ</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            )
        }
        if (mode === "add") {
            return (
                <>
                    <div className="grid_12 mb-2" style={{ paddingRight: "10px" }}>
                        <table className="table-many-column">
                            <thead>
                                <tr>
                                    <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                                    <th className="font" style={{ minWidth: "130px" }}>เลขที่อะไหล่</th>
                                    <th className="font" style={{ minWidth: "250px" }}>ชื่ออะไหล่</th>
                                    <th className="font text-center" style={{ minWidth: "80px" }}>คงคลัง</th>
                                    <th className="font text-center" style={{ minWidth: "80px" }}>รอส่งมอบ</th>
                                    <th className="font text-center" style={{ minWidth: "80px" }}>ระหว่างการจัดซื้อ</th>
                                    <th className="font text-center" style={{ minWidth: "80px" }}>จำนวนสุทธิ</th>
                                    <th className="font text-center" style={{ minWidth: "100px" }}>สถานะ</th>
                                    <th className="font" style={{ minWidth: "80px" }}>จำนวน</th>
                                    <th className="font" style={{ minWidth: "80px" }}>หน่วยนับ</th>
                                    <th className="font" style={{ minWidth: "80px" }}>ราคาต่อหน่วย</th>
                                    <th className="font" style={{ minWidth: "80px" }}>จำนวนเงิน</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.table_part_show_mode_add.map(function (table_part_show_mode_add, row) {
                                    return (
                                        <tr key={row} id={row}>
                                            <th className="edit-padding text-center">{row + 1}</th>
                                            <td className="edit-padding">
                                                <div className="p-search-box cancel-margin" style={{ marginBottom: "0" }}>
                                                    <input type="text" className="p-search-box__input cancel-default-table" value={table_part_show_mode_add.no_part} onChange={(e) => current.props.onChangeNoPartEachRowModeAdd(e)} />
                                                    <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPart" aria-controls="modalNoPartModeAdd" onClick={(e) => current.props.onClickNoPartEachRowModeAdd(e)}></i></button>
                                                </div>
                                            </td>
                                            <td className="edit-padding">{table_part_show_mode_add.name_part}</td>
                                            <td className="edit-padding text-center disable">{table_part_show_mode_add.stock}</td>
                                            <td className="edit-padding text-center disable">{table_part_show_mode_add.wait_sent}</td>
                                            <td className="edit-padding text-center disable">{table_part_show_mode_add.wait_po}</td>
                                            <td className="edit-padding text-center disable">{table_part_show_mode_add.real_stock}</td>
                                            <td className="edit-padding text-center disable">{table_part_show_mode_add.status}</td>
                                            <td className="edit-padding text-right">
                                                <input type="number" min="1" className="cancel-default float-right" value={table_part_show_mode_add.quility} onChange={(e) => current.props.onChangeQuilityEachRowModeAdd(e)}></input>
                                            </td>
                                            <td className="edit-padding text-left">{table_part_show_mode_add.unit}</td>
                                            <td className="edit-padding text-right">
                                                <input type="number" min="1" className="cancel-default float-right" value={table_part_show_mode_add.unit_per_bath} onChange={(e) => current.props.onChangeUnitPerBathEachRowModeAdd(e)}></input>
                                                {}</td>
                                            <td className="edit-padding text-right">{table_part_show_mode_add.total}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="grid_12 mt-3">
                        <div className="grid_3 float-right">
                            <input type="text" className="cancel-default float-right" defaultValue={this.props.document_show_mode_add.total} disabled="disabled"></input>
                        </div>
                        <div className="grid_2 float-right"><p className="cancel-default float-right">จำนวนสุทธิ</p></div>
                    </div>

                    <div className="grid_12">
                        <div className="grid_2"><p className="cancel-default">หมายเหตุ</p></div>
                        <div className="grid_4 pull_0">
                            <textarea className="edit" name="Text1" cols="40" rows="2" value={this.props.document_show_mode_add.note} onChange={(e) => this.props.onChangeNoteModeAdd(e)}></textarea>
                        </div>
                    </div>

                    {/* PopUp เลขที่อะไหล่ */}
                    <div className="modal" id="modalNoPartModeAdd" style={{ display: "none" }}>
                        <div className="gray-board">
                            <p className="head-title-modal edit">ค้นหาเลขที่อะไหล่</p>
                            <div className="container_12 edit-padding">

                                <div className="grid_12">
                                    <div className="grid_2"><p className="cancel-default">เลขที่อะไหล่</p></div>
                                    <div className="grid_8 pull_0">
                                        <input type="text" className="cancel-default grid_3" value={this.props.table_no_part_mode_add} onChange={(e) => this.props.onChangeNoPartModeAdd(e)} />
                                        <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickSearchPopUpNoPartModeAdd(e)}>ค้นหา</button>
                                    </div>
                                </div>

                                <div className="grid_12">
                                    <table className="table-many-column mt-3">
                                        <thead>
                                            <tr>
                                                <th className="font" style={{ minWidth: "300px" }}>เลขที่อะไหล่</th>
                                                <th className="font" style={{ minWidth: "350px" }}>ชื่ออะไหล่</th>
                                                <th className="font" style={{ minWidth: "150px" }}>สถานะ</th>
                                                <th className="font" style={{ minWidth: "100px" }}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {current.props.raw_no_part_show_popup_mode_add.map(function (raw_no_part_show_popup_mode_add, index) {
                                                return (
                                                    <tr key={index} id={index}>
                                                        <td className="edit-padding"> {raw_no_part_show_popup_mode_add.no_part} </td>
                                                        <td className="edit-padding"> {raw_no_part_show_popup_mode_add.name_part} </td>
                                                        <td className="edit-padding"> {raw_no_part_show_popup_mode_add.status} </td>
                                                        <td className="edit-padding text-center">
                                                            <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectPopUpNoPartModeAdd(e)} aria-label="Close active modal" aria-controls="modalNoPartModeAdd" id="closeModalNoPart" >เลือก</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="grid_12">
                                    <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalNoPartModeAdd" id="closeModalNoPart">กลับ</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }

    render() {
        return (
            <div id="blackground-gray">
                <div className="container_12 clearfix">
                    <div className="grid_12 ">
                        <div id="รายการ" className="tabcontent">
                            {this.checkActionMode(this.props.actionMode)}
                        </div>

                        <div id="แนบไฟล์" className="tabcontent">
                            <Files />
                        </div>

                        <div id="สถานะเอกสาร" className="tabcontent">
                            <h4 className="head-title-bottom mt-2">สถานะของเอกสาร</h4>
                            <table className="cancel-border">
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
                                    {this.props.table_status_show.map(function (table_status_show, index) {
                                        return (
                                            <tr>
                                                <td className="font-for-status" style={{ width: "50px" }}>
                                                    <i className="fas fa-check-circle" style={{ color: table_status_show.status === "ลงนามเรียบร้อย" ? "green" : "gray" }}></i>
                                                </td>
                                                <td className="font-for-status">{table_status_show.role}</td>
                                                <td className="font-for-status">{table_status_show.department}</td>
                                                <td className="font-for-status">{table_status_show.name}</td>
                                                <td className="font-for-status">{table_status_show.date === "" ? "-" : table_status_show.date}</td>
                                                <td className="font-for-status">{table_status_show.status}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        )
    };
}

const mapStateToProps = state => {
    return {
        actionMode: state.action,

        // Mode Search
        document_show: state.document_show,
        table_part_show: state.table_part_show,
        table_status_show: state.table_status_show,

        // Mode Edit
        table_no_part: state.table_no_part,
        raw_no_part_show_popup: state.raw_no_part_show_popup,

        // Mode Add
        table_part_show_mode_add: state.table_part_show_mode_add,
        table_no_part_mode_add: state.table_no_part_mode_add,
        raw_no_part_show_popup_mode_add: state.raw_no_part_show_popup_mode_add,
        document_show_mode_add: state.document_show_mode_add,
    };
};

const mapDispatchToProps = (dispatch) => ({
    // Mode Edit
    onChangeNoPartEachRow: (e) => dispatch(onChangeNoPartEachRow(e)),
    onClickNoPartEachRow: (e) => dispatch(onClickNoPartEachRow(e)),
    onChangeNoPart: (e) => dispatch(onChangeNoPart(e)),
    onClickSearchPopUpNoPart: (e) => dispatch(onClickSearchPopUpNoPart(e)),
    onClickSelectPopUpNoPart: (e) => dispatch(onClickSelectPopUpNoPart(e)),
    onChangeQuilityEachRow: (e) => dispatch(onChangeQuilityEachRow(e)),
    onChangeUnitPerBathEachRow: (e) => dispatch(onChangeUnitPerBathEachRow(e)),
    onChangeNote: (e) => dispatch(onChangeNote(e)),

    // MOde Add
    onChangeNoPartEachRowModeAdd: (e) => dispatch(onChangeNoPartEachRowModeAdd(e)),
    onClickNoPartEachRowModeAdd: (e) => dispatch(onClickNoPartEachRowModeAdd(e)),
    onChangeNoPartModeAdd: (e) => dispatch(onChangeNoPartModeAdd(e)),
    onClickSearchPopUpNoPartModeAdd: (e) => dispatch(onClickSearchPopUpNoPartModeAdd(e)),
    onClickSelectPopUpNoPartModeAdd: (e) => dispatch(onClickSelectPopUpNoPartModeAdd(e)),
    onChangeQuilityEachRowModeAdd: (e) => dispatch(onChangeQuilityEachRowModeAdd(e)),
    onChangeUnitPerBathEachRowModeAdd: (e) => dispatch(onChangeUnitPerBathEachRowModeAdd(e)),
    onChangeNoteModeAdd: (e) => dispatch(onChangeNoteModeAdd(e)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);

// Mode Edit
export const onChangeNoPartEachRow = (e) => {
    return {
        type: "ON CHANGE NO PART EACH ROW",
        value: e.target.value,
        rowIndex: e.target.parentNode.parentNode.parentNode.id
    }
}
export const onClickNoPartEachRow = (e) => {
    return {
        type: "ON CLICK NO PART EACH ROW",
        rowIndex: e.target.parentNode.parentNode.parentNode.parentNode.id
    }
}
export const onChangeNoPart = (e) => {
    return {
        type: "ON CHANGE NO PART",
        value: e.target.value,
    }
}
export const onClickSearchPopUpNoPart = (e) => {
    return {
        type: "ON CLICK SEARCH POPUP NO PART",
    }
}
export const onClickSelectPopUpNoPart = (e) => {
    return {
        type: "ON CLICK SELECT POPUP NO PART",
        rowIndex: e.target.parentNode.parentNode.id
    }
}
export const onChangeQuilityEachRow = (e) => {
    return {
        type: "ON CHANGE QUILITY EACH ROW",
        value: e.target.value,
        rowIndex: e.target.parentNode.parentNode.id
    }
}
export const onChangeUnitPerBathEachRow = (e) => {
    return {
        type: "ON CHANGE UNIT PER BATH EACH ROW",
        value: e.target.value,
        rowIndex: e.target.parentNode.parentNode.id
    }
}
export const onChangeNote = (e) => {
    return {
        type: "CHANGE NOTE",
        value: e.target.value
    }
}

// Mode Add
export const onChangeNoPartEachRowModeAdd = (e) => {
    return {
        type: "ON CHANGE NO PART EACH ROW MODE ADD",
        value: e.target.value,
        rowIndex: e.target.parentNode.parentNode.parentNode.id
    }
}
export const onClickNoPartEachRowModeAdd = (e) => {
    return {
        type: "ON CLICK NO PART EACH ROW MODE ADD",
        rowIndex: e.target.parentNode.parentNode.parentNode.parentNode.id
    }
}
export const onChangeNoPartModeAdd = (e) => {
    return {
        type: "ON CHANGE NO PART MODE ADD",
        value: e.target.value,
    }
}
export const onClickSearchPopUpNoPartModeAdd = (e) => {
    return {
        type: "ON CLICK SEARCH POPUP NO PART MODE ADD",
    }
}
export const onClickSelectPopUpNoPartModeAdd = (e) => {
    return {
        type: "ON CLICK SELECT POPUP NO PART MODE ADD",
        rowIndex: e.target.parentNode.parentNode.id
    }
}
export const onChangeQuilityEachRowModeAdd = (e) => {
    return {
        type: "ON CHANGE QUILITY EACH ROW MODE ADD",
        value: e.target.value,
        rowIndex: e.target.parentNode.parentNode.id
    }
}
export const onChangeUnitPerBathEachRowModeAdd = (e) => {
    return {
        type: "ON CHANGE UNIT PER BATH EACH ROW MODE ADD",
        value: e.target.value,
        rowIndex: e.target.parentNode.parentNode.id
    }
}
export const onChangeNoteModeAdd = (e) => {
    return {
        type: "CHANGE NOTE MODE ADD",
        value: e.target.value
    }
}