import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import TextInput from '../common/formik-text-input';
import NumberInput from '../common/formik-number-input';
import Files from '../common/files'

import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';

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

import { useFormikContext } from 'formik';

import '../../../css/table.css';

const BottomContent = (props) => {

  const { values } = useFormikContext();

  const sumTotalLineItem = (quantity, per_unit_price) => {
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

  const sumTotal = (list_show) => {
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

  const perUnitPriceModeSearch = (description, per_unit_price) => {
    // TODO description !== undefined ถ้าเชื่อม Bottom เข้ากับ Formix หมดแล้วเด่วกลับมาเช็ค
    if (description !== undefined) {
      if (description !== "") {
        var s = per_unit_price.toString();
        var n = s.indexOf(".")
        if (n == -1) {
          s = s + ".0000"
          return s;
        }
        else return per_unit_price
      }
      else {
        return per_unit_price
      }
    }
    else {
      return null
    }
  }

  return (
    <div id="blackground-gray">
      <div className="container_12 clearfix">
        <div className="container_12 ">
          <div id="รายการ" className="tabcontent">
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
                  {values.line_items.map(function (list, index) {
                    return (
                      <tr key={index}>
                        <th className="edit-padding text-center">{index + 1}</th>
                        <td className="edit-padding">
                          {props.actionMode === TOOLBAR_MODE.SEARCH
                            ?
                            list.internal_item_id
                            //  <div className="p-search-box cancel-margin" style={{ marginBottom: "0" }}> 
                            //  <input type="text" className="p-search-box__input cancel-default-table" value={list.internal_item_id} onChange={(e) => props.onChangeNoPartEachRow(e)} />
                            //   <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showModalNoPart" aria-controls="modalNoPart" onClick={(e) => props.onClickNoPartEachRow(e)}></i></button> */}
                            // {/* </div> 
                            :
                            <TextInput name={`internal_item_id_${index}`}
                              disabled={props.actionMode === TOOLBAR_MODE.SEARCH}
                              searchable={props.actionMode !== TOOLBAR_MODE.SEARCH} ariaControls="modalNoPart" tabIndex="1" />
                          }
                        </td>
                        <td className="edit-padding">{list.description}</td>
                        <td className="edit-padding text-center">
                          {props.actionMode === TOOLBAR_MODE.SEARCH
                            ?
                            list.quantity
                            :
                            <NumberInput name={`quantity_${index}`} disabled={props.actionMode === TOOLBAR_MODE.SEARCH}
                              tabIndex="3" />
                          }
                        </td>
                        <td className="edit-padding text-center">
                          <select className="edit-select-top" disabled="disabled">
                            {list.list_uoms.map(function (list_uoms, index) {
                              return <option value={list_uoms.name} key={index}>{list_uoms.name}</option>
                            })}
                          </select>
                        </td>
                        <td className="edit-padding text-right">{perUnitPriceModeSearch(list.description, list.per_unit_price)}</td>
                        <td className="edit-padding text-right">{sumTotalLineItem(list.quantity, list.per_unit_price)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            {/* <div className="container_12 mt-3">
              <div className="grid_4 float-right">
                <input type="number" min="1" className="cancel-default float-right" value={sumTotal(props.list_show)} onChange={(e) => props.onChangeTotal(e)} disabled="disabled"></input>
              </div>
              <div className="grid_2 float-right"><p className="cancel-default float-right">จำนวนสุทธิ</p></div>
            </div>
            <div className="container_12">
              <div className="grid_1"><p className="cancel-default">หมายเหตุ</p></div>
              <div className="grid_4">
                <textarea className="edit" name="Text1" cols="40" rows="2" value={props.document_show.remark} onChange={(e) => props.onChangeNote(e)}></textarea>
              </div>
            </div> */}


          </div>
          <div id="แนบไฟล์" className="tabcontent">
            <Files />
          </div>
        </div>
      </div>
    </div >
  )
};



// const mapStateToProps = (state) => {
//   state = state.goods_receipt;
//   return ({
//     actionMode: state.toolbar.mode,

//     document_show: state.document_show,
//     list_show: state.list_show,

//     // Mode Edit 
//     list_no_part: state.list_no_part,
//     no_part_show: state.no_part_show,

//     // Mode Add
//     list_show_mode_add: state.list_show_mode_add,
//     no_part_show_mode_add: state.no_part_show_mode_add,
//     list_no_part_mode_add: state.list_no_part_mode_add,
//     document_show_mode_add: state.document_show_mode_add
//   })
// }
const mapStateToProps = (state) => ({
  fact: state.api.fact,
  actionMode: state.toolbar.mode,

  list_show: state.list_show
})
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
