import React from 'react';
import { connect } from 'react-redux'
import '../../../css/grid12.css';
import { Redirect } from 'react-router-dom'

class TopContent extends React.Component {
  componentDidMount() {
    document.getElementById("defaultOpen").click();
  }
  tapChange(evt, cityName) {
    console.log("hello")
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
            <div className="grid_2"><p className="cancel-default">เลขที่สิ่งของ</p></div>
            <div className="grid_4 pull_0">
              <div className="p-search-box cancel-margin ">
                <input type="search" className="p-search-box__input cancel-default" value={this.props.no_document} onChange={(e) => this.props.onChangeNoDocument(e)} />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showAssetMaster" aria-controls="modalAssetMaster"></i></button>
              </div>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายละเอียด</p></div>
            <div className="grid_9 pull_0">
              <input className="cancel-default" type="text" defaultValue={this.props.document_show.detail} disabled="disabled" />
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ประเภทสิ่งของ</p></div>
            <div className="grid_4 pull_0">
              <select className="edit-select-top" disabled="disabled">
                {current.props.type_item.map(function (type_item, index) {
                  if (current.props.document_show.type_item === type_item.status) {
                    return <option defaultValue={type_item.id} key={index} selected> {type_item.status} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">กลุ่มของอะไหล่</p></div>
            <div className="grid_4 pull_0">
              <input className="cancel-default " type="text" defaultValue={this.props.document_show.group_asset} disabled="disabled" />
            </div>
            <div className="grid_2"><p className="cancel-default float-left">ประเภทบัญชี</p></div>
            <div className="grid_3 pull_0">
              <select className="edit-select-top" disabled="disabled">
                {current.props.type_account.map(function (type_account, index) {
                  if (current.props.document_show.type_account === type_account.status) {
                    return <option defaultValue={type_account.id} key={index} selected> {type_account.status} </option>
                  }
                  else {
                    return null
                  }
                })}
              </select>
            </div>
          </div>
        </>
      )
    }
    if (mode === "edit") {
      return (
        <>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">เลขที่สิ่งของ</p></div>
            <div className="grid_4 pull_0">
              <div className="p-search-box cancel-margin ">
                <input type="search" className="p-search-box__input cancel-default" value={this.props.no_document} onChange={(e) => this.props.onChangeNoDocument(e)} />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showAssetMaster" aria-controls="modalAssetMaster"></i></button>
              </div>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายละเอียด</p></div>
            <div className="grid_9 pull_0">
              <input className="cancel-default" type="text" defaultValue={this.props.document_show.detail} onChange={(e) => this.props.onChangeDetail(e)} />
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ประเภทสิ่งของ</p></div>
            <div className="grid_4 pull_0">
              <select className="edit-select-top" onChange={(e) => this.props.onChangeTypeItem(e)}>
                {current.props.type_item.map(function (type_item, index) {
                  if (current.props.document_show.type_item === type_item.status) {
                    return <option defaultValue={type_item.id} key={index} selected> {type_item.status} </option>
                  }
                  else {
                    return <option value={type_item.status} key={index}> {type_item.status} </option>
                  }
                })}

              </select>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">กลุ่มของอะไหล่</p></div>
            <div className="grid_4 pull_0">
              <input className="cancel-default " type="text" defaultValue={this.props.document_show.group_asset} onChange={(e) => this.props.onChangeGroupAsset(e)} />
            </div>
            <div className="grid_2"><p className="cancel-default float-left">ประเภทบัญชี</p></div>
            <div className="grid_3 pull_0">
              <select className="edit-select-top" onChange={(e) => this.props.onChangeTypeAccount(e)}>
                {current.props.type_account.map(function (type_account, index) {
                  if (current.props.document_show.type_account === type_account.status) {
                    return <option defaultValue={type_account.id} key={index} selected> {type_account.status} </option>
                  }
                  else {
                    return <option value={type_account.status} key={index}> {type_account.status} </option>
                  }
                })}
              </select>
            </div>
          </div>

        </>
      )
    }
    if (mode === "add") {
      return (
        <>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">เลขที่สิ่งของ</p></div>
            <div className="grid_4 pull_0">
              <div className="p-search-box cancel-margin ">
                <input type="search" className="p-search-box__input cancel-default" value={this.props.document_show_mode_add.no_document} onChange={(e) => this.props.onChangeNoDocumentAdd(e)} />
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showAssetMaster" aria-controls="modalAssetMaster"></i></button>
              </div>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">รายละเอียด</p></div>
            <div className="grid_9 pull_0">
              <input className="cancel-default" type="text" defaultValue={this.props.document_show_mode_add.detail} onChange={(e) => this.props.onChangeDetailAdd(e)} />
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">ประเภทสิ่งของ</p></div>
            <div className="grid_4 pull_0">
              <select className="edit-select-top" onChange={(e) => this.props.onChangeTypeItemAdd(e)}>
                {current.props.type_item.map(function (type_item, index) {

                  return <option value={type_item.status} key={index}> {type_item.status} </option>

                })}

              </select>
            </div>
          </div>
          <div className="grid_12">
            <div className="grid_2"><p className="cancel-default">กลุ่มของอะไหล่</p></div>
            <div className="grid_4 pull_0">
              <input className="cancel-default " type="text" defaultValue={this.props.document_show_mode_add.group_asset} onChange={(e) => this.props.onChangeGroupAssetAdd(e)} />
            </div>
            <div className="grid_2"><p className="cancel-default float-left">ประเภทบัญชี</p></div>
            <div className="grid_3 pull_0">
              <select className="edit-select-top" onChange={(e) => this.props.onChangeTypeAccountAdd(e)}>
                {current.props.type_account.map(function (type_account, index) {

                  return <option value={type_account.status} key={index}> {type_account.status} </option>

                })}
              </select>
            </div>
          </div>
        </>
      )
    }
  }

  render() {
    let current = this;
    return (

      <div id="blackground-white">
        <div className="container_12 clearfix">
          <section className="grid_12  ">
            <h4 className="head-title">ข้อมูลสินทรัพย์หลัก</h4>
            {/* Input in TopBar */}
            {this.checkActionMode(this.props.actionMode)}


          </section>

          <div className="grid_12">
            <div className="tab grid_7">
              <button type="button" id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "ทั่วไป")}>ทั่วไป</button>
              <button type="button" className="tablinks" onClick={e => this.tapChange(e, "รายการสินทรัพย์")}>รายการสินทรัพย์</button>
              <button type="button" className="tablinks" onClick={e => this.tapChange(e, "แผนบำรุงรักษา")}>แผนบำรุงรักษา</button>
              <button type="button" className="tablinks" onClick={e => this.tapChange(e, "แนบไฟล์")}>แนบไฟล์</button>
            </div>
          </div>
        </div>


        {/* PopUp */}
        {/* <div className="modal" id="modal" style={{ display: "none" }}>
          <div className="gray-board">
            <p className="head-title-modal edit">แผนบำรุงรักษา</p>
            <div className="container_12 edit-padding">


              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">ชือแผนซ่อมบำรุง:</p></div>
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


              <table className="table-many-column ">
                <thead>
                  <tr>
                    <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                    <th className="font" style={{ minWidth: "130px" }}>เลขที่อุปกรณ์</th>
                    <th className="font" style={{ minWidth: "250px" }}>รายละเอียด</th>
                    <th className="font text-center" style={{ minWidth: "150px" }}>จำนวน</th>
                    <th className="font text-center" style={{ minWidth: "100px" }}>หน่วย</th>
                    <th className="font text-center" style={{ minWidth: "500px" }}>หมายเหตุ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="edit-padding text-center" style={{ minWidth: "30px" }}>1</th>
                    <td className="edit-padding" style={{ minWidth: "130px" }}>tool 223</td>
                    <td className="edit-padding text-left" style={{ minWidth: "250px" }}>แผนหิน</td>
                    <td className="edit-padding text-center" style={{ minWidth: "80px" }}>
                      <select className="edit-select-table">
                        <option defaultValue="1">1</option>
                        <option defaultValue="2">2</option>
                      </select>
                    </td>
                    <td className="edit-padding text-center" style={{ minWidth: "100px" }}>
                      แผ่น
                      </td>
                    <td className="edit-padding text-left" style={{ minWidth: "300px" }}></td>
                  </tr>

                </tbody>
              </table>


              <div className="grid_12 ">
                <div className="grid_8 pull_0 float-right">
                  <button className="button-blue edit mt-3 grid_1 float-right p_0" type="button" aria-label="Close active modal" aria-controls="modal" id="aria-controls">ยกเลิก</button>
                  <button className="button-blue edit mt-3  grid_1 float-right p_0" type="button" aria-label="Save active modal" aria-controls="modal" id="aria-controls">บันทึก</button>
                </div>
              </div>

            </div>
          </div>
        </div> */}

        <div className="modal" id="modalAssetMaster" style={{ display: "none" }}>
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
                            <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectNoDocument(e)} aria-label="Close active modal" aria-controls="modalAssetMaster" id="closeModalAssetMaster">เลือก</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="grid_12">
                <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalAssetMaster" id="closeModalAssetMaster">กลับ</button>
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

  type_item: state.type_item,
  type_account: state.type_account,

  district: state.district,
  zone: state.zone,


  // Mode Add
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


  onChangeDetail: (e) => dispatch(onChangeDetail(e)),
  onChangeTypeItem: (e) => dispatch(onChangeTypeItem(e)),
  onChangeGroupAsset: (e) => dispatch(onChangeGroupAsset(e)),
  onChangeTypeAccount: (e) => dispatch(onChangeTypeAccount(e)),

  onChangeNoDocumentAdd: (e) => dispatch(onChangeNoDocumentAdd(e)),
  onChangeDetailAdd: (e) => dispatch(onChangeDetailAdd(e)),
  onChangeTypeItemAdd: (e) => dispatch(onChangeTypeItemAdd(e)),
  onChangeGroupAssetAdd: (e) => dispatch(onChangeGroupAssetAdd(e)),
  onChangeTypeAccountAdd: (e) => dispatch(onChangeTypeAccountAdd(e)),

})


export default connect(mapStateToProps, mapDispatchToProps)(TopContent);


// Mode Search
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



// Mode Edit
export const onChangeDetail = (e) => {
  return {
    type: "CHANGE DETAIL",
    value: e.target.value
  }
}
export const onChangeTypeItem = (e) => {
  return {
    type: "CHANGE TYPE ITEM",
    value: e.target.value
  }
}
export const onChangeGroupAsset = (e) => {
  return {
    type: "CHANGE GROUP ASSET",
    value: e.target.value
  }
}
export const onChangeTypeAccount = (e) => {
  return {
    type: "CHANGE TYPE ACCOUNT",
    value: e.target.value
  }
}



export const onChangeNoDocumentAdd = (e) => {
  return {
    type: "ON CHANGE DOCUMENT MODE ADD",
    value: e.target.value
  }
}

export const onChangeDetailAdd = (e) => {
  return {
    type: "ON CHANGE DETAIL MODE ADD",
    value: e.target.value
  }
}
export const onChangeTypeItemAdd = (e) => {
  return {
    type: "ON CHANGE TYPE ITEM MODE ADD",
    value: e.target.value
  }
}
export const onChangeGroupAssetAdd = (e) => {
  return {
    type: "ON CHANGE GROUP ASSET MODE ADD",
    value: e.target.value
  }
}
export const onChangeTypeAccountAdd = (e) => {
  return {
    type: "ON CHANGE TYPE ACCOUNT MODE ADD",
    value: e.target.value
  }
}