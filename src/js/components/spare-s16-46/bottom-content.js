import React from 'react';
import { connect } from 'react-redux'

import Document from '../../../images/document.svg';
import Table from '../common/table.js';
import TableStatus from '../common/table-status.js';
import TablePopUp from '../common/table-popup.js';

import '../../../css/style.css';
import '../../../css/tabs.css';
import '../../../css/grid12.css';
import '../../../css/modal.css';
import '../../../css/table.css';

class BottomContent extends React.Component {

    render() {
        return (
            <form>
                <div id="blackground-gray">
                    <div className="container_12 clearfix">
                        <div className="grid_12 ">

                            <div id="รายการ" className="tabcontent">
                                <h3 className="head-title-bottom mt-2">คลังต้นทาง</h3>

                                <div className="grid_12 mb-2" style={{ paddingRight: "10px" }} key="table">
                                    <Table />
                                </div>

                                <div className="grid_12">
                                    <div className="grid_2"><p className="cancel-default">ประเภทบัญชี</p></div>
                                    <div className="grid_3 pull_0">
                                        <input type="text" className="cancel-default" value={this.props.type_account} ></input>
                                    </div>

                                    <div className="p-search-box cancel-margin grid_3  float-right">
                                        <input type="text" className=" p-search-box__input cancel-default" value={this.props.total_money} ></input>
                                    </div>
                                    <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">จำนวนสุทธิ</p></div>
                                </div>

                                <div className="grid_12">
                                    <div className="grid_2"><p className="cancel-default">หมายเหตุ</p></div>
                                    <div className="grid_5 pull_0">
                                        <textarea className="edit" name="Text1" cols="40" rows="2" value={this.props.note}></textarea>
                                    </div>
                                </div>
                            </div>

                            <div id="แนบไฟล์" className="tabcontent">
                                <h4 className="head-title-bottom mt-2">ข้อมูลแนบไฟล์</h4>
                                <div className="u-clearfix">
                                    <div className="u-float-left">
                                        <label className="p-form__label" ><span className="top-text">ไฟล์เอกสาร</span></label>
                                    </div>
                                    <div className=" u-float-right">
                                        <input id="fileButton" type="file" hidden />
                                        <label><span className="top-text">แนบไฟล์ +</span></label>
                                    </div>
                                </div>
                                <div className="dropZone" >
                                    <div className="grid_12">
                                        <img src={Document} alt="Generic placeholder thumbnail" height="100px" />
                                    </div>
                                    <div className="grid_12 top-text">ไม่พบไฟล์เอกสาร</div>
                                    <div className="grid_12 top-text">คลิกที่ "+" ในการแนบเอกสาร</div>
                                </div>
                            </div>

                            <div id="สถานะเอกสาร" className="tabcontent">
                                <h4 className="head-title-bottom mt-2">สถานะของเอกสาร</h4>
                                <TableStatus />
                            </div>

                        </div>
                    </div>
                </div>

                {/* PopUp */}
                <div className="modal" id={this.props.idPopUpTable} style={{ display: "none" }}>
                    <div className="gray-board">
                        <p className="head-title-modal edit">{this.props.variablePopUp.head}</p>
                        <div className="container_12 edit-padding">
                            <div className="grid_12">
                                <div className="grid_2"><p className="cancel-default">{this.props.variablePopUp.labelFind}</p></div>
                                <div className="grid_8 pull_0">
                                    <input type="text" className="cancel-default" onChange={(e) => this.props.handleChangeSearchPopUp(e)} value={this.props.variablePopUp.filterInventoryID} />
                                </div>
                                <button className="button-blue grid_1 float-right mr-5" type="button" onClick={(e) => this.props.handleSubmitSearch(e)}>ค้นหา</button>
                            </div>

                            <div className="grid_12">
                                <TablePopUp />
                            </div>
                            <div className="grid_12">
                                <button className="button-blue mt-5 float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls={this.props.idPopUpTable} id="aria-controls2">กลับ</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    };
}

const mapStateToProps = state => {
    return {
        idPopUpTable: state.idPopUpTable,
        variablePopUp: state.variablePopUp,
        type_account: state.type_account,
        total_money: state.total_money,
        note: state.note
    };
};

const mapDispatchToProps = (dispatch) => ({
    handleChangeSearchPopUp: (e) => dispatch(changeSearchPopUp(e)),
    handleSubmitSearch: (e) => dispatch(submitSearch(e)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);

export const changeSearchPopUp = (e) => {
    return {
        type: "SEARCH POPUP",
        value: e.target.value
    }
}

export const submitSearch = (e) => {
    return {
        type: "SUBMIT SEARCH",
        value: e.target.value
    }
}