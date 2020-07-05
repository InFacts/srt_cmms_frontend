import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';

import TextInput from '../common/formik-text-input';
import NumberInput from '../common/formik-number-input';
import SelectInput from '../common/formik-select-input';

const Table = (props) => {
  const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
  const factItems = useSelector((state) => ({ ...state.api.fact.items }), shallowEqual);
  return (
    <div style={{ paddingRight: "10px", paddingLeft: "10px" }}>
    <table className="table-many-column mt-3" >
      <thead>
        <tr>
          <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
          <th className="font" style={{ minWidth: "160px" }}>เลขที่อะไหล่</th>
          <th className="font" style={{ minWidth: "340px" }}>รายละเอียด</th>

          <th className="font text-center" style={{ minWidth: "80px" }}>หน่วยนับ</th>

          <th className="font text-center" style={{ minWidth: "80px" }}>ของเสีย</th>
          <th className="font text-center" style={{ minWidth: "80px" }}>ซาก</th>
          <th className="font text-center" style={{ minWidth: "80px" }}>ของเก่าพร้อมใช้งาน</th>

          <th className="font text-center" style={{ minWidth: "80px" }}>จำนวนทั้งหมด</th>
        </tr>
      </thead>
      <tbody>
        {props.line_items.map(function (list, index) {
          let line_number = index + 1;
          let items = factItems.items;
          let item = items.find(item => `${item.item_id}` === `${list.item_id}`)
          if (item) {
            return (
              <tr key={index}>
                <th className="edit-padding text-center">{line_number}</th>
                <td className="edit-padding">{item.internal_item_id}</td>
                <td className="edit-padding">{item.description}</td>
                <td className="edit-padding text-center">{item.description && item.list_uoms[0].name}</td>

                <td className="edit-padding text-center">{item.description && list.quantity_damaged - list.quantity_used - list.quantity_salvage}</td>
                <td className="edit-padding text-center">
                  <NumberInput step={0.01} name={`line_items[${index}].quantity_used`}
                    disabled={props.disabledBothMode !== true ? props.checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH : true}
                    tabIndex={props.tabIndex + line_number}
                    redBorderForError="error-in-table"
                  />
                </td>
                <td className="edit-padding text-center">
                  <NumberInput step={0.01} name={`line_items[${index}].quantity_salvage`}
                    disabled={props.disabledBothMode !== true ? props.checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH : true}
                    tabIndex={props.tabIndex + line_number}
                    redBorderForError="error-in-table"
                  />
                </td>

                <td className="edit-padding text-center">{list.quantity_damaged}</td>
              </tr>
            )
          } else {
            return (
              <tr key={index}>
                <th className="edit-padding text-center">{line_number}</th>
                <td className="edit-padding"></td>
                <td className="edit-padding"></td>
                <td className="edit-padding text-center"></td>
                <td className="edit-padding text-center"></td>
                <td className="edit-padding text-center"></td>
                <td className="edit-padding text-center"></td>
                <td className="edit-padding text-center"></td>
              </tr>
            )
          }
        })}
      </tbody>
    </table>
    </div>
  )
}

const mapStateToProps = (state) => ({
  actionMode: state.toolbar.mode,
  fact: state.api.fact
})
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(Table);