import React from 'react';
import { connect } from 'react-redux'

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import Files from '../common/files'

import {
  // Mode Edit
  onChangeNoPart,
  onChangeNoPartEachRow,
  onClickNoPartEachRow,
  onChangeQuilityEachRow,
  onChangeUnitPerBathEachRow,
  onChangeTotalEachRow,
  onClickSearchPopUpNoPart,
  onClickSelectPopUpNoPart,
  onChangeNote,

  // Mode Add
  onChangeNoPartEachRowModeAdd,
  onClickNoPartEachRowModeAdd,
  onClickSearchPopUpNoPartModeAdd,
  onChangeNoPartModeAdd,
  onClickSelectPopUpNoPartModeAdd,
  onChangeUnitPerBathEachRowModeAdd,
  onChangeQuilityEachRowModeAdd,
  onChangeTotalEachRowModeAdd,
  onChangeNoteModeAdd
} from '../../redux/modules/goods_receipt.js';

// import '../../../css/style.css'
// import '../../../css/table.css';
class BottomContent extends React.Component {

  sumTotalLineItem = (quantity, per_unit_price) => {
    var sum = 0;
    sum = quantity * per_unit_price;
    if (sum === 0 || sum == NaN) {
      return null
    }
    else {
      var s = sum.toString();
      var n = s.indexOf(".")
      // console.log(n, "s>>>>", s)
      if (n == -1) {
        s = s + ".00"
        return s;
      }
      else {
        s = s.slice(0, n + 3)
        var c = s.length - n;
        // console.log(c, "s.length", s.length, "n", n )
        if (c === 2) {
          return s + "0";
        }
        else {
          return s;
        }
      }
    }
  }

  sumTotal = (list_show) => {
    var sumTotal = 0;
    list_show.map(function (list, index) {
      var sum = 0;
      sum = list.quantity * list.per_unit_price;
      sumTotal = sumTotal + sum;
      // return sumTotal
    })
    var s = sumTotal.toString();
    var n = s.indexOf(".")
    if (n == -1) {
      s = s + ".00"
      return s;
    }
    else {
      s = s.slice(0, n + 3)
      return s;
    }
  }

  perUnitPriceModeSearch = (description, per_unit_price) => {
    if (description !== "") {
    var s = per_unit_price.toString();
      var n = s.indexOf(".")
      if (n == -1) {
        s = s + ".0000"
        return s;
      }
      return per_unit_price
    }
    else return per_unit_price
  }

  requiredQuantityModeEdit = (description, quantity) => {
    if (description !== "") {
      return (
        <input type="number" min="1" className="cancel-default float-right" value={quantity} onChange={(e) => this.props.onChangeQuilityEachRow(e)} required></input>
      )
    }
    else {
      return (
        <input type="number" min="1" className="cancel-default float-right" value={quantity} onChange={(e) => this.props.onChangeQuilityEachRow(e)}></input>
      )
    }
  }

  requiredPerUnitPriceModeEdit = (description, per_unit_price) => {
    if (description !== "") {
      var s = per_unit_price.toString();
      var n = s.indexOf(".")
      if (n == -1) {
        s = s + ".0000"
        return <input type="number" step="0.0001" min="1" className="cancel-default float-right" style={{ paddingRight: "10px" }} value={s} onChange={(e) => this.props.onChangeUnitPerBathEachRow(e)} required></input>;
      }
      return (
        <input type="number" step="0.0001" min="1" className="cancel-default float-right" style={{ paddingRight: "10px" }} value={per_unit_price} onChange={(e) => this.props.onChangeUnitPerBathEachRow(e)} required></input>
      )
    }
    else {
      return (
        <input type="number" step="0.0001" min="1" className="cancel-default float-right" style={{ paddingRight: "10px" }} value={per_unit_price} onChange={(e) => this.props.onChangeUnitPerBathEachRow(e)}></input>
      )
    }

  }

  requiredQuantity = (description, quantity) => {
    if (description !== "") {
      return (
        <input type="number" min="1" className="cancel-default float-right" value={quantity} onChange={(e) => this.props.onChangeQuilityEachRowModeAdd(e)} required></input>
      )
    }
    else {
      return (
        <input type="number" min="1" className="cancel-default float-right" value={quantity} onChange={(e) => this.props.onChangeQuilityEachRowModeAdd(e)}></input>
      )
    }
  }

  requiredPerUnitPrice = (description, per_unit_price) => {
    if (description !== "") {
      var s = per_unit_price.toString();
      var n = s.indexOf(".")
      if (n == -1) {
        s = s + ".0000"
        return <input type="number" step="0.0001" min="1" className="cancel-default float-right" style={{ paddingRight: "10px" }} value={s} onChange={(e) => this.props.onChangeUnitPerBathEachRowModeAdd(e)} required></input>;
      }
      return (
        <input type="number" step="0.0001" min="1" className="cancel-default float-right" style={{ paddingRight: "10px" }} value={per_unit_price} onChange={(e) => this.props.onChangeUnitPerBathEachRowModeAdd(e)} required></input>
      )
    }
    else {
      return (
        <input type="number" step="0.0001" min="1" className="cancel-default float-right" style={{ paddingRight: "10px" }} value={per_unit_price} onChange={(e) => this.props.onChangeUnitPerBathEachRowModeAdd(e)}></input>
      )
    }
  }

  checkActionMode = (mode) => {
    const current = this;
    if (mode === "search") {
      return (
        <>
          <div className="container_12 mt-1" style={{ paddingRight: "10px" }}>
            <table className="table-many-column">
              <thead>
                <tr>
                  <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                  <th className="font" style={{ minWidth: "130px" }}>เลขที่อะไหล่</th>
                  <th className="font" style={{ minWidth: "448px" }}>รายละเอียด</th>
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
                      <th className="edit-padding text-center">{index + 1}</th>
                      <td className="edit-padding">{list.internal_item_id}</td>
                      <td className="edit-padding">{list.description}</td>
                      <td className="edit-padding text-center">{list.quantity}</td>
                      <td className="edit-padding text-center">
                        <select className="edit-select-top" disabled="disabled">
                          {list.list_uoms.map(function (list_uoms, index) {
                            return <option value={list_uoms.name} key={index}>{list_uoms.name}</option>
                          })}
                        </select>
                      </td>
                      <td className="edit-padding text-right">{current.perUnitPriceModeSearch(list.description, list.per_unit_price)}</td>
                      <td className="edit-padding text-right">{current.sumTotalLineItem(list.quantity, list.per_unit_price)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="container_12 mt-3">
            <div className="grid_4 float-right">
              <input type="text" className="cancel-default float-right" value={current.sumTotal(current.props.list_show)} disabled="disabled"></input>
            </div>
            <div className="grid_2 float-right"><p className="cancel-default float-right">จำนวนสุทธิ</p></div>
          </div>
          <div className="container_12">
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
          <div className="container_12 mt-1" style={{ paddingRight: "10px" }}>
            <table className="table-many-column">
              <thead>
                <tr>
                  <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                  <th className="font" style={{ minWidth: "130px" }}>เลขที่อะไหล่</th>
                  <th className="font" style={{ minWidth: "448px" }}>รายละเอียด</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>จำนวน</th>
                  <th className="font text-center" style={{ minWidth: "80px" }}>หน่วยนับ</th>
                  <th className="font text-right" style={{ minWidth: "80px" }}>ราคาต่อหน่วย</th>
                  <th className="font text-right" style={{ minWidth: "80px" }}>จำนวนเงิน</th>
                </tr>
              </thead>
              <tbody>
                {console.log(current.props.list_show, "<<<list_show")}
                {current.props.list_show.map(function (list, index) {
                  return (
                    <tr key={index} id={index}>
                      <th className="edit-padding text-center">{index + 1}</th>
                      <td className="edit-padding">
                        <div className="p-search-box cancel-margin" style={{ marginBottom: "0" }}>
                          <input type="text" className="p-search-box__input cancel-default-table" value={list.internal_item_id} onChange={(e) => current.props.onChangeNoPartEachRow(e)} />
                          {/* <input type="text" className="p-search-box__input cancel-default-table" value={list.internal_item_id} onChange={(e) => current.props.onChangeNoPartEachRow(e)} onKeyPress={(e) => current.props.handleKeyPressModeEdit(e)} /> */}
                          <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPart" aria-controls="modalNoPart" onClick={(e) => current.props.onClickNoPartEachRow(e)}></i></button>
                        </div>
                      </td>
                      <td className="edit-padding">{list.description}</td>
                      <td className="edit-padding text-center">
                        {current.requiredQuantityModeEdit(list.description, list.quantity)}
                      </td>
                      <td className="edit-padding text-center">
                        <select className="edit-select-top">
                          {list.list_uoms.map(function (list_uoms, index) {
                            return <option value={list_uoms.name} key={index}>{list_uoms.name}</option>
                          })}
                        </select>
                      </td>
                      <td className="edit-padding text-right">
                        {current.requiredPerUnitPriceModeEdit(list.description, list.per_unit_price)}
                      </td>
                      <td className="edit-padding text-right">{current.sumTotalLineItem(list.quantity, list.per_unit_price)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="container_12 mt-3">
            <div className="grid_4 float-right">
              <input type="number" min="1" className="cancel-default float-right" value={current.sumTotal(current.props.list_show)} onChange={(e) => this.props.onChangeTotal(e)} disabled="disabled"></input>
            </div>
            <div className="grid_2 float-right"><p className="cancel-default float-right">จำนวนสุทธิ</p></div>
          </div>
          <div className="container_12">
            <div className="grid_1"><p className="cancel-default">หมายเหตุ</p></div>
            <div className="grid_4">
              <textarea className="edit" name="Text1" cols="40" rows="2" value={current.props.document_show.remark} onChange={(e) => this.props.onChangeNote(e)}></textarea>
            </div>
          </div>

          {/* PopUp เลขที่อะไหล่ */}
          <div className="modal" id="modalNoPart" style={{ display: "none" }}>
            <div className="gray-board">
              <p className="head-title-modal edit">ค้นหาเลขที่อะไหล่</p>
              <div className="container_12 edit-padding">

                <div className="container_12">
                  <div className="grid_2"><p className="cancel-default">เลขที่อะไหล่</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_3" value={this.props.list_no_part} onChange={(e) => this.props.onChangeNoPart(e)} />
                  </div>
                </div>

                <div className="container_12">
                  <div className="grid_2"><p className="cancel-default">รายละเอียด</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_3" value={this.props.list_description_part} onChange={(e) => this.props.onChangeDescriptionPart(e)} />
                    <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickSearchPopUpNoPart(this.props.list_no_part)}>ค้นหา</button>
                  </div>
                </div>

                <div className="container_12">
                  <table className="table-many-column mt-3">
                    <thead>
                      <tr>
                        <th className="font" style={{ minWidth: "300px" }}>เลขที่อะไหล่</th>
                        <th className="font" style={{ minWidth: "450px" }}>รายละเอียด</th>
                        <th className="font" style={{ minWidth: "150px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.no_part_show.map(function (no_part_show, index) {
                        return (
                          <tr key={index} id={index}>
                            <td className="edit-padding" style={{ minWidth: "150px" }}> {no_part_show.internal_item_id} </td>
                            <td className="edit-padding" style={{ minWidth: "300px" }}> {no_part_show.description} </td>
                            <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                              <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectPopUpNoPart(e)} aria-label="Close active modal" aria-controls="modalNoPart" id="closeModalNoPart" >เลือก</button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="container_12">
                  <button className="button-blue float-right grid_1 mr-5 mt-3" type="button" aria-label="Close active modal" aria-controls="modalNoPart" id="closeModalNoPart">กลับ</button>
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
          <div className="container_12 mt-1" style={{ paddingRight: "10px" }}>
            <table className="table-many-column">
              <thead>
                <tr>
                  <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
                  <th className="font" style={{ minWidth: "130px" }}>เลขที่อะไหล่</th>
                  <th className="font" style={{ minWidth: "448px" }}>รายละเอียด</th>
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
                      <th className="edit-padding text-center">{index + 1}</th>
                      <td className="edit-padding">
                        <div className="p-search-box cancel-margin" style={{ marginBottom: "0" }}>
                          <input type="text" className="p-search-box__input cancel-default-table" value={list.internal_item_id} onChange={(e) => current.props.onChangeNoPartEachRowModeAdd(e)} />
                          {/* <input type="text" className="p-search-box__input cancel-default-table" value={list.internal_item_id} onChange={(e) => current.props.onChangeNoPartEachRowModeAdd(e)} onKeyPress={(e) => current.props.handleKeyPress(e)}/> */}
                          <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPart" aria-controls="modalNoPartModeAdd" onClick={(e) => current.props.onClickNoPartEachRowModeAdd(e)}></i></button>
                        </div>
                      </td>
                      <td className="edit-padding">{list.description}</td>
                      <td className="edit-padding text-center">
                        {current.requiredQuantity(list.description, list.quantity)}
                      </td>
                      <td className="edit-padding text-center">
                        <select className="edit-select-top">
                          {list.list_uoms.map(function (list_uoms, index) {
                            return <option value={list_uoms.name} key={index}>{list_uoms.name}</option>
                          })}
                        </select>
                      </td>
                      <td className="edit-padding text-right">
                        {current.requiredPerUnitPrice(list.description, list.per_unit_price)}
                      </td>
                      <td className="edit-padding text-right">{current.sumTotalLineItem(list.quantity, list.per_unit_price)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="container_12 mt-3">
            <div className="grid_4 float-right">
              <input type="number" min="1" className="cancel-default float-right" value={current.sumTotal(current.props.list_show_mode_add)} disabled="disabled"></input>
            </div>
            <div className="grid_2 float-right"><p className="cancel-default float-right">จำนวนสุทธิ</p></div>
          </div>
          <div className="container_12">
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

                <div className="container_12">
                  <div className="grid_2"><p className="cancel-default">เลขที่อะไหล่</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_3" value={this.props.list_no_part_mode_add} onChange={(e) => this.props.onChangeNoPartModeAdd(e)} />
                  </div>
                </div>
                <div className="container_12">
                  <div className="grid_2"><p className="cancel-default">รายละเอียด</p></div>
                  <div className="grid_8 pull_0">
                    <input type="text" className="cancel-default grid_3" value={this.props.list_desription_part_mode_add} onChange={(e) => this.props.onChangeDescriptionPartModeAdd(e)} />
                    <button className="button-blue edit grid_1 mr-5" type="button" onClick={(e) => this.props.onClickSearchPopUpNoPartModeAdd(this.props.list_no_part_mode_add, this.props.list_desription_part_mode_add)}>ค้นหา</button>
                  </div>
                </div>

                <div className="container_12">
                  <table className="table-many-column mt-3">
                    <thead>
                      <tr>
                        <th className="font" style={{ minWidth: "300px" }}>เลขที่อะไหล่</th>
                        <th className="font" style={{ minWidth: "450px" }}>รายละเอียด</th>
                        <th className="font" style={{ minWidth: "150px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.no_part_show_mode_add.map(function (no_part_show_mode_add, index) {
                        return (
                          <tr key={index} id={index}>
                            <td className="edit-padding" style={{ minWidth: "150px" }}> {no_part_show_mode_add.internal_item_id} </td>
                            <td className="edit-padding" style={{ minWidth: "300px" }}> {no_part_show_mode_add.description} </td>
                            <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                              <button type="button" className="button-blue" onClick={(e) => current.props.onClickSelectPopUpNoPartModeAdd(e)} aria-label="Close active modal" aria-controls="modalNoPartModeAdd" id="closeModalNoPart" >เลือก</button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="container_12">
                  <button className="button-blue float-right grid_1 mr-5 mt-3" type="button" aria-label="Close active modal" aria-controls="modalNoPartModeAdd" id="closeModalNoPart">กลับ</button>
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
          <div className="container_12 ">
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


const mapStateToProps = (state) => {
  state = state.goods_receipt;
  return ({
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
}
const mapDispatchToProps = {
  // Mode Edit
  onChangeNoPart,
  onChangeNoPartEachRow,
  onClickNoPartEachRow,
  onChangeQuilityEachRow,
  onChangeUnitPerBathEachRow,
  onChangeTotalEachRow,
  onClickSearchPopUpNoPart,
  onClickSelectPopUpNoPart,
  onChangeNote,

  // Mode Add
  onChangeNoPartEachRowModeAdd,
  onClickNoPartEachRowModeAdd,
  onClickSearchPopUpNoPartModeAdd,
  onChangeNoPartModeAdd,
  onClickSelectPopUpNoPartModeAdd,
  onChangeUnitPerBathEachRowModeAdd,
  onChangeQuilityEachRowModeAdd,
  onChangeTotalEachRowModeAdd,
  onChangeNoteModeAdd
}
export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);
