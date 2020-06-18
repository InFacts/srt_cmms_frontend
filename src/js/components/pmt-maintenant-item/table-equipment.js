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
          <th className="font text-center" style={{ minWidth: "130px" }}>จำนวน</th>

          <th className="font text-center" style={{ minWidth: "130px" }}>หน่วยนับ</th>
          <th className="font" style={{ minWidth: "300px" }}>หมายเหตุ</th>
        </tr>
      </thead>
      <tbody>
        {props.line_items.map(function (list_equipment, index) {
          let line_number = index + 1;
          return (
            <tr>
              <th className="edit-padding text-center">{line_number}</th>
              <td className="edit-padding">
                <TextInput name={`line_equipments[${index}].internal_item_id`}
                  validate={internal_item_id => props.validateLineNumberInternalItemIDFieldEquipment(`line_equipments[${index}]`, internal_item_id, index)} tabIndex="6"
                  disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                  searchable={props.actionMode !== TOOLBAR_MODE.SEARCH} ariaControls="modalNoPart2"
                  handleModalClick={() => props.setLineNumberEquipment(line_number)}
                  redBorderForError="error-in-table"
                />
              </td>
              <td className="edit-padding">{list_equipment.description}</td>
              <td className="edit-padding">
              <NumberInput step={0.01} name={`list_equipment[${index}].quantity`}
                  // validate={per_unit_price => props.validateLineNumberPerUnitPriceItemIDField(`line_items[${index}].per_unit_price`, per_unit_price, index)}
                  disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                  redBorderForError="error-in-table"
                />
              </td>

              <td className="edit-padding text-center">
              <SelectInput name={`list_equipment[${index}].uom_id`} listProps={list_equipment.list_uoms}
                  tabIndex="8" disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                  optionValue='uom_id' optionName='name'
                  redBorderForError="error-in-table"
                />
              </td>
              <td className="edit-padding text-center">
              <TextInput name={`list_equipment[${index}].remark`}
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