import React from 'react';
import { connect } from 'react-redux'
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
        if (mode === "search") {
            return (
                <>
                    <div className="grid_12">
                        <div className="grid_2"><p className="cancel-default">ชื่อแผนซ่อมบำรุง</p></div>
                        <div className="grid_7 pull_0">
                            <div className="p-search-box cancel-margin">
                                <input type="search" className="p-search-box__input cancel-default" value={this.props.no_document} onChange={(e) => this.props.onChangeNoDocument(e)} />
                                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showPlan" aria-controls="modalPlan"></i></button>
                            </div>
                        </div>
                    </div>

                    <div className="grid_12">
                        <div className="grid_2"><p className="cancel-default">ความถี่การซ่อมบำรุง</p></div>
                        <div className="grid_7 pull_0">
                            <input type="text" className="cancel-default grid_3 " defaultValue={this.props.document_show.freq} disabled="disabled"></input>

                            <select className="edit-select-top grid_3 float-right" disabled="disabled">
                                {current.props.list_status_asset1.map(function (list_status_asset1, index) {
                                    if (current.props.document_show.status === list_status_asset1.status) {
                                        return <option defaultValue={list_status_asset1.id} key={index} selected> {list_status_asset1.status} </option>
                                    }
                                    else {
                                        return null
                                    }
                                })}
                            </select>

                            <p className="cancel-default grid_1 float-right">ครั้งต่อ</p>
                        </div>
                    </div>

                    <div className="grid_12">
                        <div className="grid_2"><p className="cancel-default">แขวง</p></div>
                        <div className="grid_3 pull_0">
                            <input className="cancel-default" type="text" defaultValue={this.props.document_show.district} disabled="disabled" />
                        </div>
                    </div>

                    <div className="grid_12">
                        <div className="grid_2"><p className="cancel-default">รายละเอียดสถานที่</p></div>
                        <div className="grid_9 pull_0">
                            <textarea className="edit" name="Text1" cols="40" rows="2" defaultValue={this.props.document_show.detail} disabled="disabled"></textarea>
                        </div>
                    </div>

                </>
            )
        }
        if (mode === "edit") {
            return (
                <>
                    <div className="grid_12">
                        <div className="grid_2"><p className="cancel-default">ชื่อแผนซ่อมบำรุง</p></div>
                        <div className="grid_7 pull_0">
                            <div className="p-search-box cancel-margin">
                                <input type="search" className="p-search-box__input cancel-default" value={this.props.no_document} onChange={(e) => this.props.onChangeNoDocument(e)} />
                                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showPlan" aria-controls="modalPlan"></i></button>
                            </div>
                        </div>
                    </div>

                    <div className="grid_12">
                        <div className="grid_2"><p className="cancel-default">ความถี่การซ่อมบำรุง</p></div>
                        <div className="grid_7 pull_0">
                            <input type="text" className="cancel-default grid_3 " defaultValue={this.props.document_show.freq} onChange={(e) => this.props.onChangeFreq(e)}></input>

                            <select className="edit-select-top grid_3 float-right" onChange={(e) => this.props.onChangePer(e)}>
                                {current.props.list_status_asset1.map(function (list_status_asset1, index) {
                                    if (current.props.document_show.status === list_status_asset1.status) {
                                        return <option defaultValue={list_status_asset1.id} key={index} selected> {list_status_asset1.status} </option>
                                    }
                                    else {
                                        return <option value={list_status_asset1.status} key={index}> {list_status_asset1.status} </option>
                                    }
                                })}
                            </select>

                            <p className="cancel-default grid_1 float-right">ครั้งต่อ</p>
                        </div>
                    </div>

                    <div className="grid_12">
                        <div className="grid_2"><p className="cancel-default">แขวง</p></div>
                        <div className="grid_3 pull_0">
                            <input className="cancel-default" type="text" defaultValue={this.props.document_show.district} onChange={(e) => this.props.onChangeDistrict(e)} />
                        </div>
                    </div>

                    <div className="grid_12">
                        <div className="grid_2"><p className="cancel-default">รายละเอียดสถานที่</p></div>
                        <div className="grid_9 pull_0">
                            <textarea className="edit" name="Text1" cols="40" rows="2" defaultValue={this.props.document_show.detail} onChange={(e) => this.props.onChangeDetail(e)}></textarea>
                        </div>
                    </div>

                </>
            )
        }
        if (mode === "add") {
            return (
                <>

                    <div className="grid_12">
                        <div className="grid_2"><p className="cancel-default">ชื่อแผนซ่อมบำรุง</p></div>
                        <div className="grid_7 pull_0">
                            <div className="p-search-box cancel-margin">
                                <input type="search" className="p-search-box__input cancel-default" value={this.props.document_show_mode_add.no_document} onChange={(e) => this.props.onChangeNoDocumentAdd(e)} />
                                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showPlan" aria-controls="modalPlan"></i></button>
                            </div>
                        </div>
                    </div>

                    <div className="grid_12">
                        <div className="grid_2"><p className="cancel-default">ความถี่การซ่อมบำรุง</p></div>
                        <div className="grid_7 pull_0">
                            <input type="text" className="cancel-default grid_3 " defaultValue={this.props.document_show_mode_add.freq} onChange={(e) => this.props.onChangeFreqAdd(e)}></input>

                            <select className="edit-select-top grid_3 float-right" onChange={(e) => this.props.onChangePerAdd(e)}>
                                {current.props.list_status_asset1.map(function (list_status_asset1, index) {
                                    return <option defaultValue={list_status_asset1.id} key={index} selected> {list_status_asset1.status} </option>   
                                })}
                            </select>

                            <p className="cancel-default grid_1 float-right">ครั้งต่อ</p>
                        </div>
                    </div>

                    <div className="grid_12">
                        <div className="grid_2"><p className="cancel-default">แขวง</p></div>
                        <div className="grid_3 pull_0">
                            <input className="cancel-default" type="text" defaultValue={this.props.document_show_mode_add.district} onChange={(e) => this.props.onChangeDistrictAdd(e)} />
                        </div>
                    </div>

                    <div className="grid_12">
                        <div className="grid_2"><p className="cancel-default">รายละเอียดสถานที่</p></div>
                        <div className="grid_9 pull_0">
                            <textarea className="edit" name="Text1" cols="40" rows="2" defaultValue={this.props.document_show_mode_add.detail} onChange={(e) => this.props.onChangeDetailAdd(e)}></textarea>
                        </div>
                    </div>

                </>
            )
        }

    }



    render() {
        let current = this;
        return (
            <div>
                <div id="blackground-white">
                    <div className="container_12 clearfix">
                        <section className="grid_12 ">
                            <h4 className="head-title">สร้างแผนวาระการซ่อมบำรุงรักษา</h4>
                            {this.checkActionMode(this.props.actionMode)}


                        </section>

                        <div className="grid_12">
                            <div className="tab grid_6">
                                <button type="button" id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "แผนการดำเนินงาน")}>แผนการดำเนินงาน</button>
                                <button type="button" className="tablinks" onClick={e => this.tapChange(e, "อุปกรณ์ที่ต้องนำไปปฎิบัติงาน")}>อุปกรณ์ที่ต้องนำไปปฎิบัติงาน</button>
                            </div>
                        </div>
                    </div>

                    {/* PopUp */}
                    {/* <div className="modal" id="modal" style={{ display: "none" }}>
                    <div className="gray-board">
                        <p className="head-title-modal edit">แผนบำรุงรักษา</p>
                        <div className="container_12 edit-padding">


                            <div className="grid_12">
                                <div className="grid_2"><p className="cancel-default">แขวง:</p></div>
                                <div className="grid_8 pull_0">
                                    <input type="text" className="cancel-default grid_3" />
                                </div>
                            </div>

                            <div className="grid_12">
                                <div className="grid_2"><p className="cancel-default">ความถี่การซ่อมบำรุง:</p></div>
                                <div className="grid_7 pull_0">
                                    <input type="text" className="cancel-default grid_3 "></input>
                                    <select className="edit-select-top grid_3 float-right" >
                                        <option defaultValue="0"></option>
                                        <option defaultValue="1">Cosmic Cuttlefish</option>
                                        <option defaultValue="2">Bionic Beaver</option>
                                        <option defaultValue="3">Xenial Xerus</option>
                                    </select>
                                    <p className="cancel-default grid_1 float-right">ครั้งต่อ:</p>
                                </div>
                            </div>

                            <div className="grid_12">
                                <div className="grid_2"><p className="cancel-default">ชื่อแผนซ่อมบำรุง:</p></div>
                                <div className="grid_8 pull_0">
                                    <input type="text" className="cancel-default grid_3" />
                                </div>
                                <button className="button-blue grid_1 float-right" style={{ marginRight: "30px"}} type="button">ค้นหา</button>
                            </div>

                            <table className="cancel-border mt-3">
                                <thead>
                                    <tr>
                                        <th className="font-for-status" style={{ width: "350px", paddingLeft: "50px" }}>เลขที่คลัง</th>
                                        <th className="font-for-status" style={{ width: "350px" }}>ชื่อคลัง</th>
                                        <th className="font-for-status"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="font-for-status" style={{ width: "270px", paddingLeft: "50px" }}>
                                            1123451
                                        </td>
                                        <td className="font-for-status" style={{ width: "270px" }}>
                                            คลังหากใหญ่้
                                        </td>
                                        <td className="font-for-status">
                                            <button className="button-green">ยืนยัน</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="grid_12" style={{ paddingRight: "13px"}}>
                                <button className="button-blue edit mt-3 grid_1 float-right p_0 mr-2" type="button" aria-label="Close active modal" aria-controls="modal" id="aria-controls">ยกเลิก</button>
                                <button className="button-blue edit mt-3 grid_1 float-right p_0" type="button" aria-label="Select active modal" aria-controls="modal" id="aria-controls">เลือก</button>
                            </div>
                        </div>
                    </div>
                </div> */}
                </div>

                <div className="modal" id="modalPlan" style={{ display: "none" }}>
                    <div className="gray-board">
                        <p className="head-title-modal edit">รายการแจ้งเหตุขัดข้อง/ชำรุด</p>
                        <div className="container_12 edit-padding">
                            <div className="grid_12">
                                <div className="grid_2"><p className="cancel-default">เลขที่เอกสาร:</p></div>
                                <div className="grid_8 pull_0">
                                    <input type="text" className="cancel-default grid_3" value={this.props.no_document} onChange={(e) => this.props.onChangeNoDocument(e)} />
                                </div>
                            </div>
                            <div className="grid_12">
                                <div className="grid_2"><p className="cancel-default">สถานที่ แขวง:</p></div>
                                <div className="grid_8 pull_0">
                                    <select className="edit-select-top grid_3 " onChange={(e) => this.props.onChangeDistricts(e)}>
                                        <option defaultValue=""></option>
                                        {this.props.district.map(function (district, index) {
                                            return <option value={district.name} key={index}> {district.name} </option>
                                        })}
                                    </select>
                                    <select className="edit-select-top grid_3 float-right" onChange={(e) => this.props.onChangeZones(e)}>
                                        <option defaultValue=""></option>
                                        {this.props.zone.map(function (zone, index) {
                                            return <option value={zone.name} key={index}> {zone.name} </option>
                                        })}
                                    </select>
                                    <p className="cancel-default grid_2 float-right">สถานที่ ตอน:</p>
                                </div>
                            </div>
                            <div className="grid_12">
                                <div className="grid_2"><p className="cancel-default">วันที่เริ่มต้น:</p></div>
                                <div className="grid_8 pull_0">
                                    <input type="date" className="cancel-default grid_3 " value={this.props.date_starts} onChange={(e) => this.props.onChangeDateStarts(e)}></input>
                                    <input type="date" className="cancel-default grid_3 float-right" value={this.props.date_ends} onChange={(e) => this.props.onChangeDateEnds(e)}></input>
                                    <p className="cancel-default grid_2 float-right">วันที่สิ้นสุด:</p>
                                </div>
                                <button className="button-blue edit grid_1 float-right mr-5" type="button" onClick={(e) => this.props.onClickPopUpSearchNoDocument(e)}>ค้นหา</button>
                            </div>
                            <div className="grid_12">
                                <table className="table-many-column mt-3">
                                    <thead>
                                        <tr>
                                            <th className="font" style={{ minWidth: "150px" }}>เลขที่เอกสาร</th>
                                            <th className="font" style={{ minWidth: "150px" }}>ชื่องาน</th>
                                            <th className="font" style={{ minWidth: "150px" }}>วันเวลาแจ้งขัดข้อง</th>
                                            <th className="font" style={{ minWidth: "150px" }}>ผู้นำเข้าระบบ</th>
                                            <th className="font" style={{ minWidth: "150px" }}>สถานที่ แขวน/ตอน</th>
                                            <th className="font" style={{ minWidth: "150px" }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.document_show_popup.map(function (document_show_popup, index) {
                                            return (
                                                <tr key={index} id={index}>

                                                    <td className="edit-padding" style={{ minWidth: "150px", paddingLeft: "50px" }}>{document_show_popup.no_word_request}</td>
                                                    <td className="edit-padding" style={{ minWidth: "150px" }}>{document_show_popup.job_name}</td>
                                                    <td className="edit-padding" style={{ minWidth: "150px" }}>{document_show_popup.date_start} {document_show_popup.time_start}</td>
                                                    <td className="edit-padding" style={{ minWidth: "150px" }}>{document_show_popup.create_name}</td>
                                                    <td className="edit-padding" style={{ minWidth: "150px" }}>{document_show_popup.station}</td>
                                                    <td className="edit-padding" style={{ minWidth: "150px" }}>
                                                        <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectNoDocument(e)} aria-label="Close active modal" aria-controls="modalPlan" id="closeModalPlan">เลือก</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            <div className="grid_12">
                                <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalPlan" id="closeModalPlan">กลับ</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}


const mapStateToProps = (state) => ({
    actionMode: state.action,

    // Mode Search
    no_document: state.no_document,
    districts: state.districts,
    zones: state.zones,
    date_starts: state.date_starts,
    date_ends: state.date_ends,

    document_show_popup: state.document_show_popup,
    document_show: state.document_show,
    district: state.district,
    zone: state.zone,
    station: state.station,
    list_status_asset1: state.list_status_asset1,

    document_show_mode_add: state.document_show_mode_add
})


const mapDispatchToProps = (dispatch) => ({
    onChangeNoDocument: (e) => dispatch(onChangeNoDocument(e)),
    onChangeDistricts: (e) => dispatch(onChangeDistricts(e)),
    onChangeZones: (e) => dispatch(onChangeZones(e)),
    onChangeDateStarts: (e) => dispatch(onChangeDateStarts(e)),
    onChangeDateEnds: (e) => dispatch(onChangeDateEnds(e)),
    onClickOpenPopUpNoDocument: (e) => dispatch(onClickOpenPopUpNoDocument(e)),
    onClickPopUpSearchNoDocument: (e) => dispatch(onClickPopUpSearchNoDocument(e)),
    onClickSelectNoDocument: (e) => dispatch(onClickSelectNoDocument(e)),

    onChangeFreq: (e) => dispatch(onChangeFreq(e)),
    onChangePer: (e) => dispatch(onChangePer(e)),
    onChangeDistrict: (e) => dispatch(onChangeDistrict(e)),
    onChangeDetail: (e) => dispatch(onChangeDetail(e)),



    onChangeNoDocumentAdd: (e) => dispatch(onChangeNoDocumentAdd(e)),
    onChangeFreqAdd: (e) => dispatch(onChangeFreqAdd(e)),
    onChangePerAdd: (e) => dispatch(onChangePerAdd(e)),
    onChangeDistrictAdd: (e) => dispatch(onChangeDistrictAdd(e)),
    onChangeDetailAdd: (e) => dispatch(onChangeDetailAdd(e)),

})

export default connect(mapStateToProps, mapDispatchToProps)(TopContent);


export const onChangeNoDocument = (e) => {
    return {
        type: "CHANGE NO DOCUMENT",
        value: e.target.value
    }
}
export const onChangeDistricts = (e) => {
    return {
        type: "ON CHANGE DISTRICTS",
        value: e.target.value
    }
}
export const onChangeZones = (e) => {
    return {
        type: "ON CHANGE ZONES",
        value: e.target.value
    }
}
export const onChangeDateStarts = (e) => {
    return {
        type: "ON CHANGE DATE STRARTS",
        value: e.target.value
    }
}
export const onChangeDateEnds = (e) => {
    return {
        type: "ON CHANGE DATE ENDS",
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


export const onChangeFreq = (e) => {
    return {
        type: "CHANGE FREQ",
        value: e.target.value
    }
}

export const onChangePer = (e) => {
    return {
        type: "CHANGE PER",
        value: e.target.value
    }
}

export const onChangeDistrict = (e) => {
    return {
        type: "CHANGE DISTRICT",
        value: e.target.value
    }
}


export const onChangeDetail = (e) => {
    return {
        type: "CHANGE DETAIL",
        value: e.target.value
    }
}


export const onChangeFreqAdd = (e) => {
    return {
        type: "CHANGE FREQ ADD",
        value: e.target.value
    }
}

export const onChangePerAdd = (e) => {
    return {
        type: "CHANGE PER ADD",
        value: e.target.value
    }
}

export const onChangeDistrictAdd = (e) => {
    return {
        type: "CHANGE DISTRICT ADD",
        value: e.target.value
    }
}


export const onChangeDetailAdd = (e) => {
    return {
        type: "CHANGE DETAIL ADD",
        value: e.target.value
    }
}


export const onChangeNoDocumentAdd = (e) => {
    return {
        type: "CHANGE NO DOCUMENT ADD",
        value: e.target.value
    }
}