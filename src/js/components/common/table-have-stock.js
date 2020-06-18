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

          <th className="font text-center gray-column" style={{ minWidth: "80px" }}>คงคลัง</th>
          <th className="font text-center gray-column" style={{ minWidth: "80px" }}>รอส่งมอบ</th>
          <th className="font text-right gray-column" style={{ minWidth: "80px" }}>ระหว่างจัดซื้อ</th>
          <th className="font text-center gray-column" style={{ minWidth: "80px" }}>รวมทั้งสิ้น</th>

          <th className="font text-center" style={{ minWidth: "80px" }}>สถานนะ</th>
          <th className="font text-center" style={{ minWidth: "80px" }}>จำนวน</th>
          <th className="font text-center" style={{ minWidth: "80px" }}>หน่วยนับ</th>
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

              <td className="edit-padding gray-column"> {/* คงคลัง */}
                {list.description !== '' ? list.at_source.length !== 0 ? list.at_source[0].current_unit_count : 0 : ''}
                </td>
              <td className="edit-padding gray-column"> {/* รอส่งมอบ */}
                {list.description !== '' ? list.at_source.length !== 0 ? list.at_source[0].committed_unit_count : 0 : ''}
                </td> 
              <td className="edit-padding gray-column">{/* ระหว่างจัดซ้ือ */}
                {list.description !== '' ? list.at_source.length !== 0 ? 0 : 0 : ''}
                {/* {list.at_source.length !== 0 ? list.at_source[0].order : ''} */} {/* TODO Database Send Value */}
              </td>
              <td className="edit-padding gray-column">{/* รวมทั้งสิ้น */}
                {list.description !== '' ? list.at_source.length !== 0 ? list.at_source[0].current_unit_count - list.at_source[0].committed_unit_count + 0 : 0 : ''}
              </td>

              {/* สถานะของอะไหล่ */}
              <td className="edit-padding text-center">
                <SelectInput name={`line_items[${index}].item_status_id`} listProps={props.fact['item-status'].items}
                  validate={item_status_id => props.validateLineNumberItemStatusIDField(`line_items[${index}].item_status_id`, item_status_id, index)}
                  tabIndex="8" disabled={props.disabledBothMode !== true ? props.checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH : true}
                  checkDescription={list.description}
                  optionValue='item_status_id' optionName='description_th'
                />
              </td>

              <td className="edit-padding text-center">
                <NumberInput step={0.01} name={`line_items[${index}].quantity`} tabIndex="7"
                  validate={quantity => props.validateLineNumberQuatityItemIDField(`line_items[${index}].quantity`, quantity, index)}
                  disabled={props.disabledBothMode !== true ? props.checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH : true}
                  redBorderForError="error-in-table" />
              </td>

              {/* หน่วยนับ */}
              <td className="edit-padding text-center">
                <SelectInput name={`line_items[${index}].uom_id`} listProps={list.list_uoms}
                  tabIndex="8" disabled={props.disabledBothMode !== true ? props.checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH : true}
                  optionValue='uom_id' optionName='name' checkDescription={list.description}
                  redBorderForError="error-in-table"
                />
              </td>

              <td className="edit-padding text-center">
                <NumberInput step={0.0001} name={`line_items[${index}].per_unit_price`} disabled />
              </td>
              <td className="edit-padding text-right">{props.sumTotalLineItem(list.quantity, list.per_unit_price, list.description)}</td>
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