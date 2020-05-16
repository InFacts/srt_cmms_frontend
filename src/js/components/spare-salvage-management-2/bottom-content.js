import React from 'react';
import { connect } from 'react-redux'
import Files from '../common/files'

import '../../../css/style.css'
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
                {this.props.list_show.map(function (list_show, row) {
                  return (
                    <tr key={row} id={row}>
                      <th className="edit-padding text-center">{list_show.id}</th>
                      <td className="edit-padding">{list_show.no_part}</td>
                      <td className="edit-padding">{list_show.name_part}</td>
                      <td className="edit-padding text-center disable">{list_show.stock}</td>
                      <td className="edit-padding text-center disable">{list_show.wait_sent}</td>
                      <td className="edit-padding text-center disable">{list_show.wait_po}</td>
                      <td className="edit-padding text-center disable">{list_show.real_stock}</td>
                      <td className="edit-padding text-center disable">
                        <select className="edit-select-table" disabled>
                          {current.props.status.map(function (status, index) {
                            if (list_show.status === status.status) {
                              return (<option key={index} id={index} defaultValue={status.status} selected>{status.status}</option>)
                            }
                            else {
                              return null
                            }
                          })}
                        </select>
                      </td>
                      <td className="edit-padding text-right">{list_show.quility}</td>
                      <td className="edit-padding text-left">{list_show.unit}</td>
                      <td className="edit-padding text-right">{list_show.unit_per_bath}</td>
                      <td className="edit-padding text-right">{list_show.total}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="grid_12 mt-3">
            <div className="grid_4 float-right">
              <input type="text" className="cancel-default float-right" defaultValue={this.props.document_show.total} disabled="disabled"></input>
            </div>
            <div className="grid_2 float-right"><p className="cancel-default float-right">จำนวนสุทธิ</p></div>
          </div>

          <div className="grid_12">
            <div className="grid_1"><p className="cancel-default">หมายเหตุ</p></div>
            <div className="grid_4">
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
                {this.props.list_show.map(function (list_show, row) {
                  return (
                    <tr key={row} id={row}>
                      <th className="edit-padding text-center">{list_show.id}</th>
                      <td className="edit-padding">
                        <div className="p-search-box cancel-margin" style={{ marginBottom: "0" }}>
                          <input type="text" className="p-search-box__input cancel-default-table" value={list_show.no_part} onChange={(e) => current.props.onChangeNoPartEachRow(e)} />
                          <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPart" aria-controls="modalNoPart" onClick={(e) => current.props.onClickNoPartEachRow(e)}></i></button>
                        </div>
                      </td>
                      <td className="edit-padding">{list_show.name_part}</td>
                      <td className="edit-padding text-center disable">{list_show.stock}</td>
                      <td className="edit-padding text-center disable">{list_show.wait_sent}</td>
                      <td className="edit-padding text-center disable">{list_show.wait_po}</td>
                      <td className="edit-padding text-center disable">{list_show.real_stock}</td>
                      <td className="edit-padding text-center disable">
                        <select className="edit-select-table" disabled>
                          {current.props.status.map(function (status, index) {
                            if (list_show.status === status.status) {
                              return (<option key={index} id={index} defaultValue={status.status} selected>{status.status}</option>)
                            }
                            else {
                              return null
                            }
                          })}
                        </select>
                      </td>
                      <td className="edit-padding text-right">
                        <input type="number" min="1" className="cancel-default float-right" value={list_show.quility} onChange={(e) => current.props.onChangeQuilityEachRow(e)}></input>
                      </td>
                      <td className="edit-padding text-left">{list_show.unit}</td>
                      <td className="edit-padding text-right">{list_show.unit_per_bath}</td>
                      <td className="edit-padding text-right">
                        <input type="number" min="1" className="cancel-default float-right" value={list_show.total} onChange={(e) => current.props.onChangeTotalEachRow(e)}></input>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="grid_12 mt-3">
            <div className="grid_4 float-right">
              <input type="number" className="cancel-default float-right" value={this.props.document_show.total} onChange={(e) => this.props.onChangeTotal(e)}></input>
            </div>
            <div className="grid_2 float-right"><p className="cancel-default float-right">จำนวนสุทธิ</p></div>
          </div>

          <div className="grid_12">
            <div className="grid_1"><p className="cancel-default">หมายเหตุ</p></div>
            <div className="grid_4">
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
                    <input type="text" className="cancel-default grid_3" value={this.props.list_no_part} onChange={(e) => this.props.onChangeNoPart(e)} />
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
                      {current.props.no_part_show.map(function (no_part_show, index) {
                        return (
                          <tr key={index} id={index}>
                            <td className="edit-padding"> {no_part_show.no_part} </td>
                            <td className="edit-padding"> {no_part_show.name_part} </td>
                            <td className="edit-padding"> {no_part_show.status} </td>
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
                {this.props.list_show_mode_add.map(function (list, row) {
                  return (
                    <tr key={row} id={row}>
                      <th className="edit-padding text-center">{list.id}</th>
                      <td className="edit-padding">
                        <div className="p-search-box cancel-margin" style={{ marginBottom: "0" }}>
                          <input type="text" className="p-search-box__input cancel-default-table" value={list.no_part} onChange={(e) => current.props.onChangeNoPartEachRowModeAdd(e)} />
                          <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPart" aria-controls="modalNoPartModeAdd" onClick={(e) => current.props.onClickNoPartEachRowModeAdd(e)}></i></button>
                        </div>
                      </td>
                      <td className="edit-padding">{list.name_part}</td>
                      <td className="edit-padding text-center disable">{list.stock}</td>
                      <td className="edit-padding text-center disable">{list.wait_sent}</td>
                      <td className="edit-padding text-center disable">{list.wait_po}</td>
                      <td className="edit-padding text-center disable">{list.real_stock}</td>
                      <td className="edit-padding text-center disable">
                        <select className="edit-select-table" disabled>
                          {current.props.status.map(function (status, index) {
                            if (list.status === status.status) {
                              return (<option key={index} id={index} defaultValue={status.status} selected>{status.status}</option>)
                            }
                            else {
                              return null
                            }
                          })}
                        </select>
                      </td>
                      <td className="edit-padding text-right">
                        <input type="number" min="1" className="cancel-default float-right" value={list.quility} onChange={(e) => current.props.onChangeQuilityEachRowModeAdd(e)}></input>
                      </td>
                      <td className="edit-padding text-left">{list.unit}</td>
                      <td className="edit-padding text-right">{list.unit_per_bath}</td>
                      <td className="edit-padding text-right">
                        <input type="number" min="1" className="cancel-default float-right" value={list.total} onChange={(e) => current.props.onChangeTotalEachRowModeAdd(e)}></input>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="grid_12 mt-3">
            <div className="grid_4 float-right">
              <input type="number" className="cancel-default float-right" value={current.props.document_show_mode_add.total} onChange={(e) => this.props.onChangeTotalModeAdd(e)}></input>
            </div>
            <div className="grid_2 float-right"><p className="cancel-default float-right">จำนวนสุทธิ</p></div>
          </div>

          <div className="grid_12">
            <div className="grid_1"><p className="cancel-default">หมายเหตุ</p></div>
            <div className="grid_4">
              <textarea className="edit" name="Text1" cols="40" rows="2" value={current.props.document_show_mode_add.note} onChange={(e) => this.props.onChangeNoteModeAdd(e)}></textarea>
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
                        <th className="font" style={{ minWidth: "350px" }}>ชื่ออะไหล่</th>
                        <th className="font" style={{ minWidth: "150px" }}>สถานะ</th>
                        <th className="font" style={{ minWidth: "100px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.no_part_show_mode_add.map(function (no_part_show_mode_add, index) {
                        return (
                          <tr key={index} id={index}>
                            <td className="edit-padding"> {no_part_show_mode_add.no_part} </td>
                            <td className="edit-padding"> {no_part_show_mode_add.name_part} </td>
                            <td className="edit-padding"> {no_part_show_mode_add.status} </td>
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
  status: state.status,
  list_no_part: state.list_no_part,
  no_part_show: state.no_part_show,

  // Mode Add
  list_show_mode_add: state.list_show_mode_add,
  document_show_mode_add: state.document_show_mode_add,
  list_no_part_mode_add: state.list_no_part_mode_add,
  no_part_show_mode_add: state.no_part_show_mode_add
})
const mapDispatchToProps = (dispatch) => ({
  // Mode Edit
  onChangeTotal: (e) => dispatch(onChangeTotal(e)),
  onChangeNote: (e) => dispatch(onChangeNote(e)),
  onChangeNoPart: (e) => dispatch(onChangeNoPart(e)),
  onChangeNoPartEachRow: (e) => dispatch(onChangeNoPartEachRow(e)),
  onClickNoPartEachRow: (e) => dispatch(onClickNoPartEachRow(e)),
  onClickSearchPopUpNoPart: (e) => dispatch(onClickSearchPopUpNoPart(e)),
  onClickSelectPopUpNoPart: (e) => dispatch(onClickSelectPopUpNoPart(e)),
  onChangeQuilityEachRow: (e) => dispatch(onChangeQuilityEachRow(e)),
  onChangeTotalEachRow: (e) => dispatch(onChangeTotalEachRow(e)),

  // Mode Add
  onChangeNoPartEachRowModeAdd: (e) =>dispatch(onChangeNoPartEachRowModeAdd(e)),
  onClickNoPartEachRowModeAdd: (e) => dispatch(onClickNoPartEachRowModeAdd(e)),
  onChangeQuilityEachRowModeAdd: (e) => dispatch(onChangeQuilityEachRowModeAdd(e)),
  onChangeTotalEachRowModeAdd: (e) => dispatch(onChangeTotalEachRowModeAdd(e)),
  onChangeTotalModeAdd: (e) => dispatch(onChangeTotalModeAdd(e)),
  onChangeNoteModeAdd: (e) => dispatch(onChangeNoteModeAdd(e)),
  onClickSearchPopUpNoPartModeAdd: (e) => dispatch(onClickSearchPopUpNoPartModeAdd(e)),
  onClickSelectPopUpNoPartModeAdd: (e) => dispatch(onClickSelectPopUpNoPartModeAdd(e))
})
export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);

// Mode Edit
export const onChangeTotal = (e) => {
  return {
    type: "CHANGE TOTAL",
    value: e.target.value
  }
}
export const onChangeNote = (e) => {
  return {
    type: "CHANGE NOTE",
    value: e.target.value
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
export const onClickSearchPopUpNoPart = (e) => {
  return {
    type: "ON CLICK SEARCH POPUP NO PART",
  }
}
export const onChangeNoPart = (e) => {
  return {
    type: "ON CHANGE NO PART",
    value: e.target.value,
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
export const onChangeTotalEachRow = (e) => {
  return {
    type: "ON CHANGE TOTAL EACH ROW",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
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
export const onChangeTotalEachRowModeAdd = (e) => {
  return {
    type: "ON CHANGE TOTAL EACH ROW MODE ADD",
    value: e.target.value,
    rowIndex: e.target.parentNode.parentNode.id
  }
}
export const onChangeTotalModeAdd = (e) => {
  // console.log(e.target.value)
  return {
    type: "ON CHANGE TOTAL MODE ADD",
    value: e.target.value
  }
}
export const onChangeNoteModeAdd = (e) => {
  return {
    type: "ON CHANGE NOTE MODE ADD",
    value: e.target.value
  }
}
