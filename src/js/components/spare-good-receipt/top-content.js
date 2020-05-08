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

  checkActionMode = (mode) => {
    const current = this;
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
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalInventory" aria-controls="modalDocument"></i></button>
              </div>
            </div>
            <div className="grid_3 float-right">
              <input type="text" className="cancel-default float-right" defaultValue={current.props.document_show.status} disabled="disabled"></input>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">สถานะ</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2">
              <p className="top-text">ผู้นำเข้า</p>
            </div>
            <div className="grid_3 pull_1">
              <input type="text" className="cancel-default" defaultValue={current.props.document_show.name} disabled="disabled"></input>
            </div>
            <div className="grid_3 float-right">
              <input type="date" className="cancel-default float-right" defaultValue={current.props.document_show.date} disabled="disabled"></input>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">วันที่</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_3 float-right">
              <input type="text" className="cancel-default float-right" defaultValue={current.props.document_show.my_inventory} disabled="disabled"></input>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">คลัง</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2">
              <p className="top-text">เลขที่ใบสั่งซื้อ/เลขที่เอกสารอ้างอิง</p>
            </div>
            <div className="grid_3 pull_0">
              <input type="text" className="cancel-default" defaultValue={current.props.document_show.no_po} disabled="disabled"></input>
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
                <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalInventory" aria-controls="modalDocument"></i></button>
              </div>
            </div>
            <div className="grid_3 float-right">
              <input type="text" className="cancel-default float-right" value={current.props.document_show.status} onChange={(e) => this.props.onChangeStatus(e)}></input>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">สถานะ</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2">
              <p className="top-text">ผู้นำเข้า</p>
            </div>
            <div className="grid_3 pull_1">
              <input type="text" className="cancel-default" value={current.props.document_show.name} onChange={(e) => this.props.onChangeName(e)}></input>
            </div>
            <div className="grid_3 float-right">
              <input type="date" className="cancel-default float-right" value={current.props.document_show.date} onChange={(e) => this.props.onChangeDate(e)}></input>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">วันที่</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_3 float-right">
              <input type="text" className="cancel-default float-right" value={current.props.document_show.my_inventory} onChange={(e) => this.props.onChangeMyInventory(e)}></input>
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">คลัง</p>
            </div>
          </div>

          <div className="grid_12">
            <div className="grid_2">
              <p className="top-text">เลขที่ใบสั่งซื้อ/เลขที่เอกสารอ้างอิง</p>
            </div>
            <div className="grid_3 pull_0">
              <input type="text" className="cancel-default" value={current.props.document_show.no_po} onChange={(e) => this.props.onChangeNoPo(e)}></input>
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
              <h4 className="head-title">นำอะไหล่เข้า</h4>
              {this.checkActionMode(this.props.actionMode)}
            </section>

            <div className="grid_12">
              <div className="tab grid_11">
                <button type="button" id="defaultOpen" className="tablinks" onClick={e => this.tapChange(e, "รายการ")}>รายการ</button>
                <button type="button" className="tablinks" onClick={e => this.tapChange(e, "แนบไฟล์")}>แนบไฟล์</button>
              </div>
            </div>

          </div>
        </div>
        {/* PopUp ค้นหาเลขที่คลัง */}
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

      </div>
    )
  };
}

const mapStateToProps = (state) => ({
  actionMode: state.action,
  no_document: state.no_document,
  document_show_popup: state.document_show_popup,
  document_show: state.document_show,
})
const mapDispatchToProps = (dispatch) => ({
  onChangeNoDocument: (e) => dispatch(onChangeNoDocument(e)),
  onClickPopUpSearchNoDocument: (e) => dispatch(onClickPopUpSearchNoDocument(e)),
  onClickSelectNoDocument: (e) => dispatch(onClickSelectNoDocument(e)),

  // Mode Edit
  onChangeStatus: (e) => dispatch(onChangeStatus(e)),
  onChangeName: (e) => dispatch(onChangeName(e)),
  onChangeDate: (e) => dispatch(onChangeDate(e)),
  onChangeMyInventory: (e) => dispatch(onChangeMyInventory(e)),
  onChangeNoPo: (e) => dispatch(onChangeNoPo(e))
})
export default connect(mapStateToProps, mapDispatchToProps)(TopContent);

// Mode Search
export const onChangeNoDocument = (e) => {
  return {
    type: "ON CHANGE NO DOCUMENT",
    value: e.target.value
  }
}
export const onClickPopUpSearchNoDocument = (e) => {
  return{
    type: "CLICK SEARCH POPUP NO DOCUMENT"
  }
}
export const onClickSelectNoDocument = (e) => {
  return{
    type: "CLICK SELECT POPUP NO DOCUMENT",
    row_document_show_popup: e.target.parentNode.parentNode.id
  }
}

// Mode Edit
export const onChangeStatus = (e) => {
  return{
    type: "ON CHANGE STATUS",
    value: e.target.value
  }
}
export const onChangeName = (e) => {
  return{
    type: "ON CHANGE NAME",
    value: e.target.value
  }
}
export const onChangeDate = (e) => {
  return{
    type: "ON CHANGE DATE",
    value: e.target.value
  }
}
export const onChangeMyInventory = (e) => {
  return{
    type: "ON CHANGE MY INVENTORY",
    value: e.target.value
  }
}
export const onChangeNoPo = (e) => {
  return{
    type: "ON CHANGE NO PO",
    value: e.target.value
  }
}