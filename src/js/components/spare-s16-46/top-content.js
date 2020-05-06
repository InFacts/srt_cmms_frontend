import React from 'react';
import { connect } from 'react-redux'

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

    render() {
        const current = this;
        return (
            <div id="blackground-white">
                <div className="container_12 clearfix">
                    <section className="grid_12 ">
                        <h4 className="head-title">เบิก/โอนย้าย อะไหล่/พัสดุ - แบบ ส.16/46</h4>

                        <div className="grid_12">
                            <div className="grid_2"><p className="top-text">เลขที่เอกสาร</p></div>
                            <div>
                                <div className="p-search-box cancel-margin grid_3 mt-1 pull_0" style={{ marginBottom: "0", marginLeft: "0" }}>
                                    <input type="text" className="p-search-box__input cancel-default" value={this.props.no_document} onChange={(e) => this.props.handleChangeNoDocument(e)} />
                                    <button type="button" className="p-search-box__button cancel-padding hidden">
                                        <i className="p-icon--search" id="showModal" aria-controls="modalNoDocument" ></i>
                                    </button>
                                </div>
                                <div className="p-search-box cancel-margin grid_3 mt-1  float-right">
                                    <input type="text" className=" p-search-box__input cancel-default" disabled="disabled"></input>
                                </div>
                                <div className="grid_1 cancel-default float-right"><p className="cancel-default float-right">สถานะ</p></div>
                            </div>
                        </div>

                        <div className="grid_12">
                            <div className="grid_2"><p className="top-text">ผู้เบิก</p></div>
                            <div>
                                <input type="text" className="cancel-default grid_3  pull_0"></input>
                                <div className="p-search-box cancel-margin grid_3   float-right">
                                    <input type="date" className=" p-search-box__input cancel-default  "></input>
                                </div>
                                <div className="grid_1 cancel-default float-right"><p className="cancel-default float-right">วันที่</p></div>
                            </div>
                        </div>

                        <div className="grid_12">
                            <div>
                                <div className="p-search-box cancel-margin grid_3  float-right">
                                    <input type="text" className="p-search-box__input cancel-default  " />
                                    <button type="button" className="p-search-box__button cancel-padding" alt="search"><i className="p-icon--search" id="showModal" aria-controls="modalFindInventory" ></i></button>
                                </div>
                            </div>
                            <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">คลังต้นทาง</p></div>
                        </div>

                        <div className="grid_12 ">
                            <div>
                                <div className="p-search-box cancel-margin grid_3 float-right">
                                    <input type="text" className="p-search-box__input cancel-default" />
                                </div>
                            </div>
                            <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">คลังปลายทาง</p></div>
                        </div>

                        <div className="grid_12 ">
                            <div className="float-right ">
                                <input className="d-inline " type="radio" name="RadioOptions" id="Radio1" value="option1" />
                                <label htmlFor="Radio1" className="cancel-default d-inline ml-2n">รับของเอง</label>
                                <input className="d-inline" type="radio" name="RadioOptions" id="Radio2" value="option2" />
                                <label htmlFor="Radio2" className="cancel-default d-inline  ml-1">ส่งไปยังคลังปลายทาง</label>
                            </div>
                            <div className="grid_2  cancel-default float-right "><p className="cancel-default float-right">รูปแบบการรับของ</p></div>
                        </div>
                    </section>

                    <div className="grid_12">
                        <div className="tab grid_6">
                            <button id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "รายการ")}>รายการ</button>
                            <button className="tablinks" onClick={e => this.tapChange(e, "แนบไฟล์")}>แนบไฟล์</button>
                            <button className="tablinks" onClick={e => this.tapChange(e, "สถานะเอกสาร")}>สถานะเอกสาร</button>
                        </div>
                    </div>
                </div>
                {/* PopUp */}
                {/* ค้นหาเลขที่เอกสาร */}
                <div className="modal" id="modalNoDocument" style={{ display: "none" }}>
                    <div className="gray-board">
                        <p className="head-title-modal edit">เลขที่เอกสาร</p>
                        <div className="container_12 edit-padding">
                            <div className="grid_12">
                                <div className="grid_2"><p className="cancel-default">ค้นหาเลขที่เอกสาร</p></div>
                                <div className="grid_8 pull_0">
                                    <input type="text" className="cancel-default" value={this.props.no_document} onChange={(e) => this.props.handleChangeNoDocument(e)} />
                                </div>
                                <button className="button-blue grid_1 float-right mr-5" type="button">ค้นหา</button>
                            </div>

                            <div className="grid_12">
                                <table className="table-many-column">
                                    <thead>
                                        <tr>
                                            {this.props.headTable_list_no_document.map(function (headTable_list_no_document, index) {
                                                return (
                                                    <th className="font" style={{ minWidth: headTable_list_no_document[1] }}>{headTable_list_no_document[0]} </th>
                                                )
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {console.log(this.props.bodyTable_list_no_document[0].variousValues)} */}
                                        {this.props.bodyTable_list_no_document[0].variousValues.map(function (bodyTable_list_no_document, row_bodyTable_list_no_document) {
                                            return (
                                                <tr key={row_bodyTable_list_no_document} id={row_bodyTable_list_no_document}>
                                                    {bodyTable_list_no_document.map(function (bodyTable_list_no_document, column_bodyTable_list_no_document) {
                                                        console.log("bodyTable_list_no_document", bodyTable_list_no_document.bodyTable)
                                                        return (
                                                            <>
                                                                <td className={`edit-padding ${bodyTable_list_no_document[1]}`} key={column_bodyTable_list_no_document} id={column_bodyTable_list_no_document}>
                                                                    {
                                                                        bodyTable_list_no_document[2] ? <button type="button" className="button-green" aria-label="Close active modal" aria-controls="modalNoDocument" id="aria-controls2">ยืนยัน</button> : bodyTable_list_no_document[0]
                                                                    }
                                                                </td>
                                                            </>
                                                        )
                                                    })}
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="grid_12">
                                <button className="button-blue mt-5 float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalNoDocument" id="aria-controls">กลับ</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ค้นหาคลังต้นทาง */}
                <div className="modal" id="modalFindInventory" style={{ display: "none" }}>
                    <div className="gray-board">
                        <p className="head-title-modal edit">คลังต้นทาง</p>
                        <div className="container_12 edit-padding">
                            <div className="grid_12">
                                <div className="grid_2"><p className="cancel-default">ค้นหาเลขที่คลัง</p></div>
                                <div className="grid_8 pull_0">
                                    <input type="text" className="cancel-default" />
                                </div>
                                <button className="button-blue grid_1 float-right mr-5" type="button">ค้นหา</button>
                            </div>

                            <div className="grid_12">
                                <table className="table-many-column">
                                    <thead>
                                        <tr>
                                            <th className="font" style={{ minWidth: "300px" }}>เลขที่คลัง</th>
                                            <th className="font" style={{ minWidth: "500px" }}>ชื่อคลัง</th>
                                            <th className="font" style={{ minWidth: "100px" }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="edit-padding" style={{ minWidth: "200px" }}>1123451</td>
                                            <td className="edit-padding" style={{ minWidth: "300px" }}>คลังหากใหญ่้</td>
                                            <td className="edit-padding text-left" style={{ minWidth: "80px" }}>
                                                <button type="button" className="button-green">ยืนยัน</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="grid_12">
                                <button className="button-blue mt-5 float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalFindInventory" id="aria-controls">กลับ</button>
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
        no_document: state.no_document,
        headTable_list_no_document: state.headTable_list_no_document,
        bodyTable_list_no_document: state.bodyTable_list_no_document
    };
};

const mapDispatchToProps = (dispatch) => ({
    handleChangeNoDocument: (e) => dispatch(changeNoDocument(e)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TopContent);

export const changeNoDocument = (e) => {
    return {
        type: "CHANGE NO DOCUMENT",
        value: e.target.value
    }
}