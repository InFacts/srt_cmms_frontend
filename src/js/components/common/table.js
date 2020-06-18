import React, { useEffectm, useState } from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux';
import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';

import TextInput from '../common/formik-text-input';
import NumberInput from '../common/formik-number-input';
import SelectInput from '../common/formik-select-input';

const Table = (props) => {
  const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
  return (
    <table className="table-many-column">
      <thead>
        <tr>
          <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
          <th className="font" style={{ minWidth: "130px" }}>เลขที่อะไหล่</th>
          <th className="font" style={{ minWidth: "368px" }}>รายละเอียด</th>
          <th className="font text-center" style={{ minWidth: "80px" }}>จำนวน</th>
          <th className="font text-center" style={{ minWidth: "80px" }}>หน่วยนับ</th>
          <th className="font text-right" style={{ minWidth: "80px" }}>สถานะ</th>
          <th className="font text-center" style={{ minWidth: "80px" }}>ราคาต่อหน่วย</th>
          <th className="font text-right" style={{ minWidth: "80px" }}>จำนวนเงิน</th>
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
                  validate={internal_item_id => props.validateLineNumberInternalItemIDField(`line_items[${index}]`, internal_item_id, index)} tabIndex="6"
                  disabled={props.disabledBothMode !== true ? props.checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH : true}
                  searchable={props.checkBooleanForEdit === true ? true : toolbar.mode !== TOOLBAR_MODE.SEARCH} ariaControls="modalNoPart"
                  handleModalClick={() => props.setLineNumber(line_number)}
                  redBorderForError="error-in-table"
                />
              </td>
              <td className="edit-padding">{list.description}</td>
              <td className="edit-padding text-center">
                {props.document_type_group_id !== 141 && props.document_type_group_id !== 142
                  ?
                  <NumberInput step={1} name={`line_items[${index}].quantity`} tabIndex="7"
                    validate={quantity => props.validateLineNumberQuatityItemIDField(`line_items[${index}].quantity`, quantity, index)}
                    disabled={props.disabledBothMode !== true ? props.checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH : true}
                    redBorderForError="error-in-table" />
                  :
                  <NumberInput step={1} name={`line_items[${index}].unit_count`} tabIndex="7"
                    validate={unit_count => props.validateLineNumberQuatityItemIDField(`line_items[${index}].unit_count`, unit_count, index)}
                    disabled={props.disabledBothMode !== true ? props.checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH : true}
                    redBorderForError="error-in-table" />
                }
              </td>

              {/* หน่วยนับ */}
              <td className="edit-padding text-center">
                <SelectInput name={`line_items[${index}].uom_id`} listProps={list.list_uoms}
                  tabIndex="8" disabled={props.disabledBothMode !== true ? props.checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH : true}
                  optionValue='uom_id' optionName='name' checkDescription={list.description}
                  redBorderForError="error-in-table"
                />
              </td>

              {/* สถานะของอะไหล่ */}
              <td className="edit-padding text-center">
                <SelectInput name={`line_items[${index}].item_status_id`} listProps={props.fact['item-status'].items}
                  tabIndex="8" disabled={props.disabledBothMode !== true ? props.checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH : true}
                  checkDescription={list.description}
                  optionValue='item_status_id' optionName='description_th'
                />
              </td>

              <td className="edit-padding text-center">
                <NumberInput step={1.0} name={`line_items[${index}].per_unit_price`}
                  validate={per_unit_price => props.validateLineNumberPerUnitPriceItemIDField(`line_items[${index}].per_unit_price`, per_unit_price, index)}
                  disabled={props.disabledBothMode !== true ? props.checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH : true}
                  redBorderForError="error-in-table"
                />
              </td>
              <td className="edit-padding text-right">
                {props.document_type_group_id !== 141 && props.document_type_group_id !== 142
                  ?
                  props.sumTotalLineItem(list.quantity, list.per_unit_price, list.description)
                  :
                  props.sumTotalLineItem(list.unit_count, list.per_unit_price, list.description)}
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