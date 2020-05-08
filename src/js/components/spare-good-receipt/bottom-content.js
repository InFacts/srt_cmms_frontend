import React from 'react';
import { connect } from 'react-redux'

import Document from '../../../images/document.svg'

import '../../../css/style.css'
import '../../../css/table.css';

class BottomContent extends React.Component {

  checkActionMode = (mode) => {
    const current = this;
    if (mode === "search") {
      return (
        <>
          <div id="รายการ" className="tabcontent">
            <div className="grid_12 mt-1" style={{ paddingRight: "10px" }}>
              <table className="table-many-column">
                <thead>
                  <tr>
                    <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                    <th className="font" style={{ minWidth: "130px" }}>เลขที่อะไหล่</th>
                    <th className="font" style={{ minWidth: "448px" }}>ชื่ออะไหล่</th>
                    <th className="font text-center" style={{ minWidth: "80px" }}>จำนวน</th>
                    <th className="font text-center" style={{ minWidth: "80px" }}>หน่วยนับ</th>
                    <th className="font text-right" style={{ minWidth: "80px" }}>ราคาต่อหน่วย</th>
                    <th className="font text-right" style={{ minWidth: "80px" }}>จำนวนเงิน</th>
                  </tr>
                </thead>
                <tbody>
                  {current.props.list_show.map(function (list, index) {
                    return (
                      <tr key={index}>
                        <th className="edit-padding text-center">{list.id}</th>
                        <td className="edit-padding">{list.no_part}</td>
                        <td className="edit-padding">{list.name_part}</td>
                        <td className="edit-padding text-center">{list.quility}</td>
                        <td className="edit-padding text-center">{list.unit}</td>
                        <td className="edit-padding text-right">{list.unit_per_bath}</td>
                        <td className="edit-padding text-right">{list.total}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className="grid_12 mt-3">
              <div className="grid_4 float-right">
                <input type="text" className="cancel-default float-right" defaultValue={current.props.document_show.total}></input>
              </div>
              <div className="grid_2 float-right"><p className="cancel-default float-right">จำนวนสุทธิ</p></div>
            </div>
            <div className="grid_12">
              <div className="grid_1"><p className="cancel-default">หมายเหตุ</p></div>
              <div className="grid_4">
                <textarea className="edit" name="Text1" cols="40" rows="2" defaultValue={current.props.document_show.note}></textarea>
              </div>
            </div>
          </div>

          <div id="แนบไฟล์" className="tabcontent">
            <h4 className="head-title-bottom mt-2">ข้อมูลแนบไฟล์</h4>
            <div className="u-clearfix">
              <div className="u-float-left">
                <label className="p-form__label" ><p className="top-text">ไฟล์เอกสาร</p></label>
              </div>
              <div className=" u-float-right">
                <input id="fileButton" type="file" hidden />
                <label><p className="top-text">แนบไฟล์ +</p></label>
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
        </>
      )
    }
    if (mode === "edit") {
      const current = this;
      return (
        <>
          <div id="รายการ" className="tabcontent">
            <div className="grid_12 mt-1" style={{ paddingRight: "10px" }}>
              <table className="table-many-column">
                <thead>
                  <tr>
                    <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                    <th className="font" style={{ minWidth: "130px" }}>เลขที่อะไหล่</th>
                    <th className="font" style={{ minWidth: "448px" }}>ชื่ออะไหล่</th>
                    <th className="font text-center" style={{ minWidth: "80px" }}>จำนวน</th>
                    <th className="font text-center" style={{ minWidth: "80px" }}>หน่วยนับ</th>
                    <th className="font text-right" style={{ minWidth: "80px" }}>ราคาต่อหน่วย</th>
                    <th className="font text-right" style={{ minWidth: "80px" }}>จำนวนเงิน</th>
                  </tr>
                </thead>
                <tbody>
                  {current.props.list_show.map(function (list, index) {
                    return (
                      <tr key={index} id={index}>
                        <th className="edit-padding text-center">{list.id}</th>
                        <td className="edit-padding">
                          <div className="p-search-box cancel-margin" style={{ marginBottom: "0"}}>
                            <input type="text" className="p-search-box__input cancel-default-table" value={list.no_part} onChange={(e) => current.props.onChangeNoPart(e)} />
                            <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPart" aria-controls="showModalNoPart"></i></button>
                          </div>
                        </td>
                        <td className="edit-padding">{list.name_part}</td>
                        <td className="edit-padding text-center">{list.quility}</td>
                        <td className="edit-padding text-center">{list.unit}</td>
                        <td className="edit-padding text-right">{list.unit_per_bath}</td>
                        <td className="edit-padding text-right">{list.total}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className="grid_12 mt-3">
              <div className="grid_4 float-right">
                <input type="text" className="cancel-default float-right" defaultValue={current.props.document_show.total}></input>
              </div>
              <div className="grid_2 float-right"><p className="cancel-default float-right">จำนวนสุทธิ</p></div>
            </div>
            <div className="grid_12">
              <div className="grid_1"><p className="cancel-default">หมายเหตุ</p></div>
              <div className="grid_4">
                <textarea className="edit" name="Text1" cols="40" rows="2" defaultValue={current.props.document_show.note}></textarea>
              </div>
            </div>
          </div>

          <div id="แนบไฟล์" className="tabcontent">
            <h4 className="head-title-bottom mt-2">ข้อมูลแนบไฟล์</h4>
            <div className="u-clearfix">
              <div className="u-float-left">
                <label className="p-form__label" ><p className="top-text">ไฟล์เอกสาร</p></label>
              </div>
              <div className=" u-float-right">
                <input id="fileButton" type="file" hidden />
                <label><p className="top-text">แนบไฟล์ +</p></label>
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
        </>
      )
    }
  }

  render() {
    const current = this;
    return (
      <div id="blackground-gray">
        <div className="container_12 clearfix">
          <div className="grid_12 ">
            {this.checkActionMode(this.props.actionMode)}
          </div>
        </div>
        {/* PopUp เลขที่อะไหล่ */}
        <div className="modal" id="showModalInventory" style={{ display: "none" }}>
          <div className="gray-board">
            <p className="head-title-modal edit">ค้นหาเลขที่เอกสาร</p>
            <div className="container_12 edit-padding">

              <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">เลขที่เอกสาร</p></div>
                <div className="grid_8 pull_0">
                  <input type="text" className="cancel-default grid_3" value="1" onChange={(e) => this.props.onChangeNoPart(e)} />
                  <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickPopUpSearchNoPart(e)}>ค้นหา</button>
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
                    {/* {this.props.document_show_popup.map(function (document_show_popup, index) {
                      return (
                        <tr key={index} id={index}>
                          <td className="edit-padding" style={{ minWidth: "150px" }}> {document_show_popup.no_document} </td>
                          <td className="edit-padding" style={{ minWidth: "300px" }}> {document_show_popup.name} </td>
                          <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                            <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectNoDocument(e)} aria-label="Close active modal" aria-controls="showModalNoPart" id="closeModalNoPart" >เลือก</button>
                          </td>
                        </tr>
                      )
                    })} */}
                  </tbody>
                </table>
              </div>

              <div className="grid_12">
                <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="showModalNoPart" id="closeModalNoPart">กลับ</button>
              </div>

            </div>
          </div>
        </div>

      </div >
    )
  };
}

const mapStateToProps = (state) => ({
  actionMode: state.action,
  document_show: state.document_show,
  list_show: state.list_show
})
const mapDispatchToProps = (dispatch) => ({
  onChangeNoPart: (e) => dispatch(onChangeNoPart(e)),
  // onClickPopUpSearchNoPart: (e) => dispatch(onClickPopUpSearchNoPart(e)),
})
export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);

// Mode Edit
export const onChangeNoPart = (e) => {
  return {
    type: "ON CHANGE NO PART",
    value: e.target.value,
    // rowIndex: e.target.parentNode.parentNode.parentNode.id
  }
}
// export const onClickPopUpSearchNoPart = (e) => {
//   return {
//     type: "CLICK SEARCH POPUP NO PART"
//   }
// }