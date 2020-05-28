import React from 'react';
import { connect } from 'react-redux'

import Files from '../common/files'

import '../../../css/style.css'
import '../../../css/table.css';

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
        <input type="number" min="1" className="cancel-default float-right" defaultValue={quantity} disabled="disabled"></input>
      )
    }
    else {
      return (
        <input type="number" min="1" className="cancel-default float-right" defaultValue={quantity} disabled="disabled"></input>
      )
    }
  }

  requiredPerUnitPriceModeEdit = (description, per_unit_price) => {
    if (description !== "") {
      var s = per_unit_price.toString();
      var n = s.indexOf(".")
      if (n == -1) {
        s = s + ".0000"
        return <input type="number" step="0.0001" min="1" className="cancel-default float-right" style={{ paddingRight: "10px" }} defaultValue={s} disabled="disabled"></input>;
      }
      return (
        <input type="number" step="0.0001" min="1" className="cancel-default float-right" style={{ paddingRight: "10px" }} defaultValue={per_unit_price} disabled="disabled"></input>
      )
    }
    else {
      return (
        <input type="number" step="0.0001" min="1" className="cancel-default float-right" style={{ paddingRight: "10px" }} defaultValue={per_unit_price} disabled="disabled"></input>
      )
    }

  }

  requiredQuantity = (description, quantity) => {
    if (description !== "") {
      return (
        <input type="number" min="1" className="cancel-default float-right" defaultValue={quantity} disabled="disabled"></input>
      )
    }
    else {
      return (
        <input type="number" min="1" className="cancel-default float-right" defaultValue={quantity} disabled="disabled"></input>
      )
    }
  }

  requiredPerUnitPrice = (description, per_unit_price) => {
    if (description !== "") {
      var s = per_unit_price.toString();
      var n = s.indexOf(".")
      if (n == -1) {
        s = s + ".0000"
        return <input type="number" step="0.0001" min="1" className="cancel-default float-right" style={{ paddingRight: "10px" }} defaultValue={s} disabled="disabled"></input>;
      }
      return (
        <input type="number" step="0.0001" min="1" className="cancel-default float-right" style={{ paddingRight: "10px" }} defaultValue={per_unit_price} disabled="disabled"></input>
      )
    }
    else {
      return (
        <input type="number" step="0.0001" min="1" className="cancel-default float-right" style={{ paddingRight: "10px" }} defaultValue={per_unit_price} disabled="disabled"></input>
      )
    }
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
          <div className="grid_12 mt-3">
          <div className="grid_1 float-right pull_0"><p className="cancel-default float-right">บาท</p></div>
            <div className="grid_4 float-right">
              <input type="text" className="cancel-default float-right" value={current.sumTotal(current.props.list_show)} disabled="disabled"></input>
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
                          <input type="text" className="p-search-box__input cancel-default-table" defaultValue={list.internal_item_id} disabled="disabled" />
                        </div>
                      </td>
                      <td className="edit-padding">{list.description}</td>
                      <td className="edit-padding text-center">
                        {current.requiredQuantityModeEdit(list.description, list.quantity)}
                      </td>
                      <td className="edit-padding text-center">
                        <select className="edit-select-top" disabled="disabled">
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
          <div className="grid_12 mt-3">
          <div className="grid_1 float-right pull_0"><p className="cancel-default float-right">บาท</p></div>
            <div className="grid_4 float-right">
              <input type="number" min="1" className="cancel-default float-right" value={current.sumTotal(current.props.list_show)} onChange={(e) => this.props.onChangeTotal(e)} disabled="disabled"></input>
            </div>
            <div className="grid_2 float-right"><p className="cancel-default float-right">จำนวนสุทธิ</p></div>
          </div>
          <div className="grid_12">
            <div className="grid_1"><p className="cancel-default">หมายเหตุ</p></div>
            <div className="grid_4">
              <textarea className="edit" name="Text1" cols="40" rows="2" value={current.props.document_show.remark} onChange={(e) => this.props.onChangeNote(e)}></textarea>
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
                          <input type="text" className="p-search-box__input cancel-default-table" defaultValue={list.internal_item_id} disabled="disabled" />
                        </div>
                      </td>
                      <td className="edit-padding">{list.description}</td>
                      <td className="edit-padding text-center">
                        {current.requiredQuantity(list.description, list.quantity)}
                      </td>
                      <td className="edit-padding text-center">
                        <select className="edit-select-top" disabled="disabled">
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
          <div className="grid_12 mt-3">
          <div className="grid_1 float-right pull_0"><p className="cancel-default float-right">บาท</p></div>
            <div className="grid_4 float-right">
              <input type="number" min="1" className="cancel-default float-right" value={current.sumTotal(current.props.list_show_mode_add)} disabled="disabled"></input>
            </div>
            <div className="grid_2 float-right"><p className="cancel-default float-right">จำนวนสุทธิ</p></div>
          </div>
          <div className="grid_12">
            <div className="grid_1"><p className="cancel-default">หมายเหตุ</p></div>
            <div className="grid_4">
              <textarea className="edit" name="Text1" cols="40" rows="2" value={current.props.document_show_mode_add.remark} onChange={(e) => this.props.onChangeNoteModeAdd(e)}></textarea>
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
  list_description_part: state.list_description_part,

  // Mode Add
  list_show_mode_add: state.list_show_mode_add,
  no_part_show_mode_add: state.no_part_show_mode_add,
  list_no_part_mode_add: state.list_no_part_mode_add,
  document_show_mode_add: state.document_show_mode_add,
  list_desription_part_mode_add: state.list_desription_part_mode_add
})
const mapDispatchToProps = (dispatch) => ({
  // Mode Edit
  onChangeNote: (e) => dispatch(onChangeNote(e)),

  // Mode Add
  onChangeNoteModeAdd: (e) => dispatch(onChangeNoteModeAdd(e)),
})
export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);

// Mode Edit
export const onChangeNote = (e) => {
  return {
    type: "ON CHANGE NOTE",
    value: e.target.value
  }
}

// Mode Add
export const onChangeNoteModeAdd = (e) => {
  return {
    type: "ON CHANGE NOTE MODE ADD",
    value: e.target.value
  }
}