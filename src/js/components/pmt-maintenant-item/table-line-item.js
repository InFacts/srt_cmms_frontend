import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';

import TextInput from '../common/formik-text-input';
import NumberInput from '../common/formik-number-input';
import SelectInput from '../common/formik-select-input';

const Table = (props) => {
  const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
  return (
    <table className="table-many-column mt-3">
      <thead>
        <tr>
          <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
          <th className="font" style={{ minWidth: "130px" }}>เลขที่อะไหล่</th>
          <th className="font" style={{ minWidth: "368px" }}>รายละเอียด</th>
          <th className="font" style={{ minWidth: "130px" }}>เลขที่สินทรัพย์</th>

          <th className="font text-center" style={{ minWidth: "80px" }}>หน่วยนับ</th>

          <th className="font text-center" style={{ minWidth: "80px" }}>ของเสีย</th>
          <th className="font text-center" style={{ minWidth: "80px" }}>ซาก</th>
          <th className="font text-center" style={{ minWidth: "80px" }}>ของเก่าพร้อมใช้งาน</th>

          <th className="font text-center" style={{ minWidth: "80px" }}>จำนวนทั้งหมด</th>
          <th className="font text-center" style={{ minWidth: "200px" }}>หมายเหตุ</th>
        </tr>
      </thead>
      <tbody>
        {props.line_items.map(function (list, index) {
          let line_number = index + 1;
          return (
            <tr key={index}>
              <th className="edit-padding text-center">{line_number}</th>
              <td className="edit-padding">
                <TextInput name={`line_items[${index}].internal_item_id`}
                  validate={internal_item_id => props.validateLineNumberInternalItemIDField(`line_items[${index}]`, internal_item_id, index)} 
                  tabIndex="6"
                  disabled
                />
              </td>
              <td className="edit-padding">{list.description}</td>
              <td className="edit-padding text-center"></td> {/* เลขที่สินทรัพย์ */}

              <td className="edit-padding text-center">
                <SelectInput name={`line_items[${index}].uom_id`} listProps={list.list_uoms}
                  tabIndex="8" disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                  optionValue='uom_id' optionName='name'
                  redBorderForError="error-in-table"
                  disabled
                />
              </td>

              <td className="edit-padding text-center">{list.quantity}</td>
              <td className="edit-padding text-center">
                <NumberInput step={0.01} name={`line_items[${index}].quantity_fix`}
                  // validate={per_unit_price => props.validateLineNumberPerUnitPriceItemIDField(`line_items[${index}].per_unit_price`, per_unit_price, index)}
                  disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                  redBorderForError="error-in-table"
                />
              </td>
              <td className="edit-padding text-center">
                <NumberInput step={0.01} name={`line_items[${index}].quantity_salvage`}
                  // validate={per_unit_price => props.validateLineNumberPerUnitPriceItemIDField(`line_items[${index}].per_unit_price`, per_unit_price, index)}
                  disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                  redBorderForError="error-in-table"
                />
              </td>

              <td className="edit-padding text-center">{list.quantity}</td>

              <td className="edit-padding text-center">
                <TextInput name={`line_items[${index}].remark`}
                  disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                  redBorderForError="error-in-table"
                />
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const mapStateToProps = (state) => ({
  actionMode: state.toolbar.mode,
  fact: state.api.fact
})
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(Table);