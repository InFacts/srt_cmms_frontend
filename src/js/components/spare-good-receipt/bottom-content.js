import React from 'react';
import { connect } from 'react-redux'

import Files from '../common/files'

import '../../../css/style.css'
import '../../../css/table.css';

class BottomContent extends React.Component {

  sumTotalLineItem = (quantity, per_unit_price) => {
    var sum = 0;
    sum = quantity * per_unit_price;
    return sum;
  }

  sumTotal = () => {
    var sumTotal = 0;
    this.props.list_show.map(function (list, index) {
      var sum = 0;
      sum = list.quantity * list.per_unit_price;
      sumTotal = sumTotal + sum;
      // return sumTotal
    })
    // console.log("sum out", sumTotal)
    return sumTotal
  }

  checkActionMode = (mode) => {
    const current = this;
    if (mode === "search") {
      return (
        <>
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
                      <th className="edit-padding text-center">{index+1}</th>
                      <td className="edit-padding">{list.internal_item_id}</td>
                      <td className="edit-padding">{list.description}</td>
                      <td className="edit-padding text-center">{list.quantity}</td>
                      <td className="edit-padding text-center">{list.unit}</td>
                      <td className="edit-padding text-right">{list.per_unit_price}</td>
                      <td className="edit-padding text-right">{current.sumTotalLineItem(list.quantity, list.per_unit_price)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="grid_12 mt-3">
            <div className="grid_4 float-right">
              <input type="text" className="cancel-default float-right" value={current.sumTotal()} disabled="disabled"></input>
            </div>
            <div className="grid_2 float-right"><p className="cancel-default float-right">จำนวนสุทธิ</p></div>
          </div>
          <div className="grid_12">
            <div className="grid_1"><p className="cancel-default">หมายเหตุ</p></div>
            <div className="grid_4">
              <textarea className="edit" name="Text1" cols="40" rows="2" defaultValue={current.props.document_show.remark} disabled="disabled"></textarea>
            </div>
          </div>
        </>
      )
    }
    if (mode === "edit") {
      const current = this;
      return (
        <>
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
                      <th className="edit-padding text-center">{index+1}</th>
                      <td className="edit-padding">
                        <div className="p-search-box cancel-margin" style={{ marginBottom: "0" }}>
                          <input type="text" className="p-search-box__input cancel-default-table" value={list.item_id} onChange={(e) => current.props.onChangeNoPartEachRow(e)} />
                          <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPart" aria-controls="modalNoPart" onClick={(e) => current.props.onClickNoPartEachRow(e)}></i></button>
                        </div>
                      </td>
                      <td className="edit-padding">{list.name_part}</td>
                      <td className="edit-padding text-center">
                        <input type="number" min="1" className="cancel-default float-right" value={list.quantity} onChange={(e) => current.props.onChangeQuilityEachRow(e)}></input>
                      </td>
                      <td className="edit-padding text-center">{list.uom_id}</td>
                      <td className="edit-padding text-right">
                      <input type="number" min="1" className="cancel-default float-right" value={list.per_unit_price} onChange={(e) => current.props.onChangeUnitPerBathEachRow(e)}></input>
                      </td>
                      <td className="edit-padding text-right">{current.sumTotalLineItem(list.quantity, list.per_unit_price)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="grid_12 mt-3">
            <div className="grid_4 float-right">
              <input type="number" min="1" className="cancel-default float-right" value={current.sumTotal()} onChange={(e) => this.props.onChangeTotal(e)} disabled="disabled"></input>
            </div>
            <div className="grid_2 float-right"><p className="cancel-default float-right">จำนวนสุทธิ</p></div>
          </div>
          <div className="grid_12">
            <div className="grid_1"><p className="cancel-default">หมายเหตุ</p></div>
            <div className="grid_4">
              <textarea className="edit" name="Text1" cols="40" rows="2" value={current.props.document_show.note} onChange={(e) => this.props.onChangeNote(e)}></textarea>
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
                    <input type="text" className="cancel-default grid_3" value={this.props.list_no_part} onChange={(e) => this.props.onChangeNoPart(e)} />
                    <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickSearchPopUpNoPart(e)}>ค้นหา</button>
                  </div>
                </div>

                <div className="grid_12">
                  <table className="table-many-column mt-3">
                    <thead>
                      <tr>
                        <th className="font" style={{ minWidth: "300px" }}>เลขที่อะไหล่</th>
                        <th className="font" style={{ minWidth: "450px" }}>ชื่ออะไหล่</th>
                        <th className="font" style={{ minWidth: "150px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.no_part_show.map(function (no_part_show, index) {
                        return (
                          <tr key={index} id={index}>
                            <td className="edit-padding" style={{ minWidth: "150px" }}> {no_part_show.no_part} </td>
                            <td className="edit-padding" style={{ minWidth: "300px" }}> {no_part_show.name_part} </td>
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
                  <button className="button-blue float-right grid_1 mr-5" type="button" aria-label="Close active modal" aria-controls="modalNoPart" id="closeModalNoPart">กลับ</button>
                </div>

              </div>
            </div>
          </div>
        </>
      )
    }
    if (mode === "add") {
      const current = this;
      return (
        <>
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
                {current.props.list_show_mode_add.map(function (list, index) {
                  return (
                    <tr key={index} id={index}>
                      <th className="edit-padding text-center">{index+1}</th>
                      <td className="edit-padding">
                        <div className="p-search-box cancel-margin" style={{ marginBottom: "0" }}>
                          <input type="text" className="p-search-box__input cancel-default-table" value={list.internal_item_id} onChange={(e) => current.props.onChangeNoPartEachRowModeAdd(e)} />
                          <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPart" aria-controls="modalNoPartModeAdd" onClick={(e) => current.props.onClickNoPartEachRowModeAdd(e)}></i></button>
                        </div>
                      </td>
                      <td className="edit-padding">{list.description}</td>
                      <td className="edit-padding text-center">
                        <input type="number" min="1" className="cancel-default float-right" value={list.quantity} onChange={(e) => current.props.onChangeQuilityEachRowModeAdd(e)}></input>
                      </td>
                      <td className="edit-padding text-center">{list.unit}</td>
                      <td className="edit-padding text-right">
                      <input type="number" min="1" className="cancel-default float-right" value={list.per_unit_price} onChange={(e) => current.props.onChangeUnitPerBathEachRowModeAdd(e)}></input>
                      </td>
                      <td className="edit-padding text-right">{current.sumTotalLineItem(list.quantity, list.per_unit_price)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="grid_12 mt-3">
            <div className="grid_4 float-right">
              <input type="number" min="1" className="cancel-default float-right" value={current.sumTotal()} disabled="disabled"></input>
            </div>
            <div className="grid_2 float-right"><p className="cancel-default float-right">จำนวนสุทธิ</p></div>
          </div>
          <div className="grid_12">
            <div className="grid_1"><p className="cancel-default">หมายเหตุ</p></div>
            <div className="grid_4">
              <textarea className="edit" name="Text1" cols="40" rows="2" value={current.props.document_show_mode_add.remark} onChange={(e) => this.props.onChangeNoteModeAdd(e)}></textarea>
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
                    <input type="text" className="cancel-default grid_3" value={this.props.list_no_part_mode_add} onChange={(e) => this.props.onChangeNoPartModeAdd(e)} />
                    <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickSearchPopUpNoPartModeAdd(e)}>ค้นหา</button>
                  </div>
                </div>

                <div className="grid_12">
                  <table className="table-many-column mt-3">
                    <thead>
                      <tr>
                        <th className="font" style={{ minWidth: "300px" }}>เลขที่อะไหล่</th>
                        <th className="font" style={{ minWidth: "450px" }}>ชื่ออะไหล่</th>
                        <th className="font" style={{ minWidth: "150px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.no_part_show_mode_add.map(function (no_part_show_mode_add, index) {
                        return (
                          <tr key={index} id={index}>
                            <td className="edit-padding" style={{ minWidth: "150px" }}> {no_part_show_mode_add.no_part} </td>
                            <td className="edit-padding" style={{ minWidth: "300px" }}> {no_part_show_mode_add.name_part} </td>
                            <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
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
    const current = this;
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
          </div>
        </div>
      </div >
    )
  };
}

const mapStateToProps = (state) => ({
  actionMode: state.action,
  document_show: state.document_show,
  list_show: state.list_show,

  // Mode Edit 
  list_no_part: state.list_no_part,
  no_part_show: state.no_part_show,

  // Mode Add
  list_show_mode_add: state.list_show_mode_add,
  no_part_show_mode_add: state.no_part_show_mode_add,
  list_no_part_mode_add: state.list_no_part_mode_add,
  document_show_mode_add: state.document_show_mode_add
})
const mapDispatchToProps = (dispatch) => ({
  // Mode Edit
  onChangeNoPart: (e) => dispatch(onChangeNoPart(e)),
  onChangeNoPartEachRow: (e) => dispatch(onChangeNoPartEachRow(e)),
  onClickNoPartEachRow: (e) => dispatch(onClickNoPartEachRow(e)),
  onChangeQuilityEachRow: (e) => dispatch(onChangeQuilityEachRow(e)),
  onChangeUnitPerBathEachRow: (e) => dispatch(onChangeUnitPerBathEachRow(e)),
  onChangeTotalEachRow: (e) => dispatch(onChangeTotalEachRow(e)),
  onClickSearchPopUpNoPart: (e) => dispatch(onClickSearchPopUpNoPart(e)),
  onClickSelectPopUpNoPart: (e) => dispatch(onClickSelectPopUpNoPart(e)),
  onChangeNote: (e) => dispatch(onChangeNote(e)),

  // Mode Add
  onChangeNoPartEachRowModeAdd: (e) => dispatch(onChangeNoPartEachRowModeAdd(e)),
  onClickNoPartEachRowModeAdd: (e) => dispatch(onClickNoPartEachRowModeAdd(e)),
  onClickSearchPopUpNoPartModeAdd: (e) => dispatch(onClickSearchPopUpNoPartModeAdd(e)),
  onChangeNoPartModeAdd: (e) => dispatch(onChangeNoPartModeAdd(e)),
  onClickSelectPopUpNoPartModeAdd: (e) => dispatch(onClickSelectPopUpNoPartModeAdd(e)),
  onChangeUnitPerBathEachRowModeAdd: (e) => dispatch(onChangeUnitPerBathEachRowModeAdd(e)),
  onChangeQuilityEachRowModeAdd: (e) => dispatch(onChangeQuilityEachRowModeAdd(e)),
  onChangeTotalEachRowModeAdd: (e) => dispatch(onChangeTotalEachRowModeAdd(e)),
  onChangeNoteModeAdd: (e) => dispatch(onChangeNoteModeAdd(e))
})
export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);

// Mode Edit
export const onChangeNoPart = (e) => {
  return {
    type: "ON CHANGE NO PART",
    value: e.target.value,
  }
}
export const onChangeNoPartEachRow = (e) => {
  return {
    type: "ON CHANGE NO PART EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.parentNode.id
  }
}
export const onClickNoPartEachRow = (e) => {
  console.log(e.target.parentNode.parentNode.parentNode.parentNode)
  return {
    type: "ON CLICK NO PART EACH ROW",
    rowIndex: e.target.parentNode.parentNode.parentNode.parentNode.id
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
export const onChangeTotalEachRow = (e) => {
  return {
    type: "ON CHANGE TOTAL EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
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
export const onChangeNote = (e) => {
  return {
    type: "ON CHANGE NOTE",
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
  // console.log(e.target.parentNode.parentNode.parentNode.parentNode)
  return {
    type: "ON CLICK NO PART EACH ROW MODE ADD",
    rowIndex: e.target.parentNode.parentNode.parentNode.parentNode.id
  }
}
export const onClickSearchPopUpNoPartModeAdd = (e) => {
  return {
    type: "ON CLICK SEARCH POPUP NO PART ADD MODE",
  }
}
export const onChangeNoPartModeAdd = (e) => {
  return {
    type: "ON CHANGE NO PART MODE ADD",
    value: e.target.value,
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
export const onChangeTotalEachRowModeAdd = (e) => {
  return {
    type: "ON CHANGE TOTAL EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeNoteModeAdd = (e) => {
  return {
    type: "ON CHANGE NOTE MODE ADD",
    value: e.target.value
  }
}