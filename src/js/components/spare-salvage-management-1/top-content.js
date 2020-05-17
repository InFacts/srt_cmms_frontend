import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import '../../../css/style.css'
import '../../../css/grid12.css';

class TopContent extends React.Component {

    componentDidMount() {
        document.getElementById("defaultOpen").click();
    }

    tapChange(evt, cityName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";
    }

    checkActionMode = (mode) => {
        const current = this;
        if (mode === "home") {
            return (
                <Redirect to="/main"></Redirect>
            )
        }
        if (mode === "search") {
            return (
                <>
                    <div className="grid_12">
                        <div className="grid_2">
                            <p className="top-text">เลขที่เอกสาร</p>
                        </div>
                        <div className="grid_3 pull_1">
                            <div className="p-search-box cancel-margin">
                                <input type="text" className="p-search-box__input cancel-default" value={this.props.no_document} onChange={(e) => this.props.onChangeNoDocument(e)} />
                                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalInventory" aria-controls="modalDocument" onClick={(e) => this.props.onClickOpenPopUpNoDocument(e)}></i></button>
                            </div>
                        </div>
                        <div className="grid_3 float-right">
                            <input type="date" className="cancel-default float-right" defaultValue={this.props.document_show.date} disabled="disabled"></input>
                        </div>
                        <div className="grid_2 float-right">
                            <p className="top-text float-right">วันที่</p>
                        </div>
                    </div>

                    <div className="grid_12">
                        <div className="grid_2">
                            <p className="top-text">ผู้เบิก</p>
                        </div>
                        <div className="grid_3 pull_1">
                            <input type="text" className="cancel-default" defaultValue={this.props.document_show.name} disabled="disabled"></input>
                        </div>
                        <div className="grid_3 float-right">
                            <div className="p-search-box cancel-margin">
                                <input type="text" className="p-search-box__input cancel-default" defaultValue={this.props.document_show.to_inventory} disabled="disabled" />
                                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalInventory" aria-controls="modalToInventory"></i></button>
                            </div>
                        </div>
                        <div className="grid_2 float-right">
                            <p className="top-text float-right">คลังปลายทาง</p>
                        </div>
                    </div>
                </>
            )
        }
        if (mode === "edit") {
            return (
                <>
                    <div className="grid_12">
                        <div className="grid_2">
                            <p className="top-text">เลขที่เอกสาร</p>
                        </div>
                        <div className="grid_3 pull_1">
                            <div className="p-search-box cancel-margin">
                                <input type="text" className="p-search-box__input cancel-default" value={this.props.no_document} onChange={(e) => this.props.onChangeNoDocument(e)} />
                                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalInventory" aria-controls="modalDocument" onClick={(e) => this.props.onClickOpenPopUpNoDocument(e)}></i></button>
                            </div>
                        </div>
                        <div className="grid_3 float-right">
                            <input type="date" className="cancel-default float-right" value={this.props.document_show.date} onChange={(e) => this.props.onChangeDate(e)} ></input>
                        </div>
                        <div className="grid_2 float-right">
                            <p className="top-text float-right">วันที่</p>
                        </div>
                    </div>

                    <div className="grid_12">
                        <div className="grid_2">
                            <p className="top-text">ผู้เบิก</p>
                        </div>
                        <div className="grid_3 pull_1">
                            <input type="text" className="cancel-default" value={this.props.document_show.name} onChange={(e) => this.props.onChangeName(e)}></input>
                        </div>
                        <div className="grid_3 float-right">
                            <div className="p-search-box cancel-margin">
                                <input type="text" className="p-search-box__input cancel-default" value={this.props.document_show.to_inventory} onChange={(e) => this.props.onChangeToInventory(e)} />
                                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalInventory" aria-controls="modalToInventory" onClick={(e) => this.props.onClickToInventory(e)}></i></button>
                            </div>
                        </div>
                        <div className="grid_2 float-right">
                            <p className="top-text float-right">คลังปลายทาง</p>
                        </div>
                    </div>
                </>
            )
        }
        if (mode === "add") {
            return (
                <>
                    <div className="grid_12">
                        <div className="grid_2">
                            <p className="top-text">เลขที่เอกสาร</p>
                        </div>
                        <div className="grid_3 pull_1">
                            <input type="text" className="cancel-default" value={this.props.document_show_mode_add.no_document} onChange={(e) => this.props.onChangeNoDocumentModeAdd(e)} />
                        </div>
                        <div className="grid_3 float-right">
                            <input type="date" className="cancel-default float-right" value={this.props.document_show_mode_add.date} onChange={(e) => this.props.onChangeDateModeAdd(e)} ></input>
                        </div>
                        <div className="grid_2 float-right">
                            <p className="top-text float-right">วันที่</p>
                        </div>
                    </div>

                    <div className="grid_12">
                        <div className="grid_2">
                            <p className="top-text">ผู้เบิก</p>
                        </div>
                        <div className="grid_3 pull_1">
                            <input type="text" className="cancel-default" value={this.props.document_show_mode_add.name} onChange={(e) => this.props.onChangeNameModeAdd(e)}></input>
                        </div>
                        <div className="grid_3 float-right">
                            <div className="p-search-box cancel-margin">
                                <input type="text" className="p-search-box__input cancel-default" value={this.props.document_show_mode_add.to_inventory} onChange={(e) => this.props.onChangeToInventoryModeAdd(e)} />
                                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalInventory" aria-controls="modalToInventoryAdd" onClick={(e) => this.props.onClickToInventoryModeAdd(e)}></i></button>
                            </div>
                        </div>
                        <div className="grid_2 float-right">
                            <p className="top-text float-right">คลังปลายทาง</p>
                        </div>
                    </div>
                </>
            )
        }
    }

    render() {
        const current = this;
        return (
            <div>
                <div id="blackground-white">
                    <div className="container_12 clearfix">
                        <section className="grid_12 ">
                            <h4 className="head-title">คืนซากอะไหล่เพื่อรอตัดสินทรัพย์</h4>
                            {this.checkActionMode(this.props.actionMode)}
                        </section>

                        <div className="grid_12">
                            <div className="tab grid_11">
                                <button type="button" id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "รายการ")}>รายการ</button>
                                <button type="button" className="tablinks" onClick={e => this.tapChange(e, "แนบไฟล์")}>แนบไฟล์</button>
                                <button type="button" className="tablinks" onClick={e => this.tapChange(e, "สถานะเอกสาร")}>สถานะเอกสาร</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PopUp ค้นหาเลขที่เอกสาร */}
                <div className="modal" id="modalDocument" style={{ display: "none" }}>
                    <div className="gray-board">
                        <p className="head-title-modal edit">ค้นหาเลขที่เอกสาร</p>
                        <div className="container_12 edit-padding">

                            <div className="grid_12">
                                <div className="grid_2"><p className="cancel-default">เลขที่เอกสาร</p></div>
                                <div className="grid_8 pull_0">
                                    <input type="text" className="cancel-default grid_3" value={this.props.no_document} onChange={(e) => this.props.onChangeNoDocument(e)} />
                                    <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickPopUpSearchNoDocument(e)}>ค้นหา</button>
                                </div>
                            </div>

                            <div className="grid_12">
                                <table className="table-many-column mt-3">
                                    <thead>
                                        <tr>
                                            <th className="font" style={{ minWidth: "300px" }}>เลขที่เอกสาร</th>
                                            <th className="font" style={{ minWidth: "450px" }}>ผู้นำเข้า</th>
                                            <th className="font" style={{ minWidth: "150px" }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.document_show_popup.map(function (document_show_popup, index) {
                                            return (
                                                <tr key={index} id={index}>
                                                    <td className="edit-padding" style={{ minWidth: "150px" }}> {document_show_popup.no_document} </td>
                                                    <td className="edit-padding" style={{ minWidth: "300px" }}> {document_show_popup.name} </td>
                                                    <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                                                        <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectNoDocument(e)} aria-label="Close active modal" aria-controls="modalDocument" id="closeModalInventory" >เลือก</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            <div className="grid_12">
                                <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalDocument" id="closeModalInventory">กลับ</button>
                            </div>

                        </div>
                    </div>
                </div>

                {/* PopUp ค้นหาคลังปลายทาง */}
                <div className="modal" id="modalToInventory" style={{ display: "none" }}>
                    <div className="gray-board">
                        <p className="head-title-modal edit">ค้นหาเลขที่คลังปลายทาง</p>
                        <div className="container_12 edit-padding">

                            <div className="grid_12">
                                <div className="grid_2"><p className="cancel-default">เลขที่คลังปลายทาง</p></div>
                                <div className="grid_8 pull_0">
                                    <input type="text" className="cancel-default grid_3" value={this.props.document_show.to_inventory} onChange={(e) => this.props.onChangeToInventory(e)} />
                                    <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickPopUpSearchToInventory(e)}>ค้นหา</button>
                                </div>
                            </div>

                            <div className="grid_12">
                                <table className="table-many-column mt-3">
                                    <thead>
                                        <tr>
                                            <th className="font" style={{ minWidth: "300px" }}>เลขที่คลังปลายทาง</th>
                                            <th className="font" style={{ minWidth: "450px" }}>ชื่อคลัง</th>
                                            <th className="font" style={{ minWidth: "150px" }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {current.props.to_inventory_show_popup.map(function (to_inventory_show_popup, index) {
                                            return (
                                                <tr key={index} id={index}>
                                                    <td className="edit-padding" style={{ minWidth: "150px" }}> {to_inventory_show_popup.no_inventory} </td>
                                                    <td className="edit-padding" style={{ minWidth: "300px" }}> {to_inventory_show_popup.name} </td>
                                                    <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                                                        <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectToInventory(e)} aria-label="Close active modal" aria-controls="modalToInventory" id="closeModalInventory" >เลือก</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            <div className="grid_12">
                                <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalToInventory" id="closeModalInventory">กลับ</button>
                            </div>

                        </div>
                    </div>
                </div>

                {/* PopUp ค้นหาคลังปลายทาง สำหรับ mode Add */}
                <div className="modal" id="modalToInventoryAdd" style={{ display: "none" }}>
                    <div className="gray-board">
                        <p className="head-title-modal edit">ค้นหาเลขที่คลังปลายทาง</p>
                        <div className="container_12 edit-padding">

                            <div className="grid_12">
                                <div className="grid_2"><p className="cancel-default">เลขที่คลังปลายทาง</p></div>
                                <div className="grid_8 pull_0">
                                    <input type="text" className="cancel-default grid_3" value={this.props.document_show_mode_add.to_inventory} onChange={(e) => this.props.onChangeToInventoryModeAdd(e)} />
                                    <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickPopUpSearchToInventoryModeAdd(e)}>ค้นหา</button>
                                </div>
                            </div>

                            <div className="grid_12">
                                <table className="table-many-column mt-3">
                                    <thead>
                                        <tr>
                                            <th className="font" style={{ minWidth: "300px" }}>เลขที่คลังปลายทาง</th>
                                            <th className="font" style={{ minWidth: "450px" }}>ชื่อคลัง</th>
                                            <th className="font" style={{ minWidth: "150px" }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {current.props.to_inventory_show_popup_mode_add.map(function (to_inventory_show_popup_mode_add, index) {
                                            return (
                                                <tr key={index} id={index}>
                                                    <td className="edit-padding" style={{ minWidth: "150px" }}> {to_inventory_show_popup_mode_add.no_inventory} </td>
                                                    <td className="edit-padding" style={{ minWidth: "300px" }}> {to_inventory_show_popup_mode_add.name} </td>
                                                    <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                                                        <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectToInventoryModeAdd(e)} aria-label="Close active modal" aria-controls="modalToInventoryAdd" id="closeModalInventory" >เลือก</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            <div className="grid_12">
                                <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalToInventoryAdd" id="closeModalInventory">กลับ</button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        )
    };
}

const mapStateToProps = state => {
    return {
        actionMode: state.action,

        // Mode Search
        no_document: state.no_document,
        document_show_popup: state.document_show_popup,
        document_show: state.document_show,

        // Mode Edit
        from_inventory_show_popup: state.from_inventory_show_popup,
        to_inventory_show_popup: state.to_inventory_show_popup,

        // Mode Add
        document_show_mode_add: state.document_show_mode_add,
        from_inventory_show_popup_mode_add: state.from_inventory_show_popup_mode_add,
        to_inventory_show_popup_mode_add: state.to_inventory_show_popup_mode_add,
    };
};

const mapDispatchToProps = (dispatch) => ({
    // Mode Search
    onChangeNoDocument: (e) => dispatch(onChangeNoDocument(e)),
    onClickPopUpSearchNoDocument: (e) => dispatch(onClickPopUpSearchNoDocument(e)),
    onClickOpenPopUpNoDocument: (e) => dispatch(onClickOpenPopUpNoDocument(e)),
    onClickSelectNoDocument: (e) => dispatch(onClickSelectNoDocument(e)),

    // Mode Edit
    onChangeName: (e) => dispatch(onChangeName(e)),
    onChangeDate: (e) => dispatch(onChangeDate(e)),
    onChangeToInventory: (e) => dispatch(onChangeToInventory(e)),
    onClickToInventory: (e) => dispatch(onClickToInventory(e)),
    onClickPopUpSearchToInventory: (e) => dispatch(onClickPopUpSearchToInventory(e)),
    onClickSelectToInventory: (e) => dispatch(onClickSelectToInventory(e)),

    // Mode Add
    onChangeNoDocumentModeAdd: (e) => dispatch(onChangeNoDocumentModeAdd(e)),
    onChangeNameModeAdd: (e) => dispatch(onChangeNameModeAdd(e)),
    onChangeDateModeAdd: (e) => dispatch(onChangeDateModeAdd(e)),
    onChangeToInventoryModeAdd: (e) => dispatch(onChangeToInventoryModeAdd(e)),
    onClickToInventoryModeAdd: (e) => dispatch(onClickToInventoryModeAdd(e)),
    onClickPopUpSearchToInventoryModeAdd: (e) => dispatch(onClickPopUpSearchToInventoryModeAdd(e)),
    onClickSelectToInventoryModeAdd: (e) => dispatch(onClickSelectToInventoryModeAdd(e)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TopContent);

// Mode Search
export const onChangeNoDocument = (e) => {
    return {
        type: "CHANGE NO DOCUMENT",
        value: e.target.value
    }
}
export const onClickOpenPopUpNoDocument = (e) => {
    return {
        type: "CLICK OPEN POPUP NO DOCUMENT"
    }
}
export const onClickPopUpSearchNoDocument = (e) => {
    return {
        type: "CLICK SEARCH POPUP NO DOCUMENT"
    }
}
export const onClickSelectNoDocument = (e) => {
    return {
        type: "CLICK SELECT POPUP NO DOCUMENT",
        row_document_show_popup: e.target.parentNode.parentNode.id
    }
}

// Mode Edit
export const onChangeName = (e) => {
    return {
        type: "CHANGE NAME",
        value: e.target.value
    }
}
export const onChangeDate = (e) => {
    return {
        type: "CHANGE DATE",
        value: e.target.value
    }
}
export const onChangeToInventory = (e) => {
    return {
        type: "CHANGE TO INVENTORY",
        value: e.target.value
    }
}
export const onClickToInventory = (e) => {
    return {
        type: "CLICK TO INVENTORY"
    }
}
export const onClickPopUpSearchToInventory = (e) => {
    return {
        type: "CLICK SEARCH POPUP TO INVENTORY"
    }
}
export const onClickSelectToInventory = (e) => {
    return {
        type: "CLICK SELECT POPUP TO INVENTORY",
        rowIndex: e.target.parentNode.parentNode.id
    }
}

// Mode Add
export const onChangeNoDocumentModeAdd = (e) => {
    // console.log(e.target.value)
    return {
        type: "ON CHANGE DOCUMENT MODE ADD",
        value: e.target.value
    }
}
export const onChangeNameModeAdd = (e) => {
    return {
        type: "ON CHANGE NAME MODE ADD",
        value: e.target.value
    }
}
export const onChangeDateModeAdd = (e) => {
    return {
        type: "ON CHANGE DATE MODE ADD",
        value: e.target.value
    }
}
export const onChangeToInventoryModeAdd = (e) => {
    return {
        type: "CHANGE TO INVENTORY MODE ADD",
        value: e.target.value
    }
}
export const onClickToInventoryModeAdd = (e) => {
    return {
        type: "CLICK TO INVENTORY MODE ADD"
    }
}
export const onClickPopUpSearchToInventoryModeAdd = (e) => {
    return {
        type: "CLICK SEARCH POPUP TO INVENTORY MODE ADD"
    }
}
export const onClickSelectToInventoryModeAdd = (e) => {
    return {
        type: "CLICK SELECT POPUP TO INVENTORY MODE ADD",
        rowIndex: e.target.parentNode.parentNode.id
    }
}