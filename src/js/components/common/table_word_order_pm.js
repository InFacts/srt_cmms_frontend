import React, { useEffectm, useState } from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux';
import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';

import TextInput from '../common/formik-text-input';
import NumberInput from '../common/formik-number-input';
import SelectInput from '../common/formik-select-input';
import SelectNoChildrenInput from '../common/formik-select-no-children';
import { FACTS } from '../../redux/modules/api/fact.js';

const Table = (props) => {
  const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
  const factUnit = useSelector((state) => ({ ...state.api.fact[FACTS.UNIT_OF_MEASURE] }), shallowEqual);
  const factItems = useSelector((state) => ({ ...state.api.fact.items }), shallowEqual);

  return (
    <table className="table-many-column mt-2" style={{ paddingRight: "10px", paddingLeft: "10px" }}>
      <thead>
        <tr>
          <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
          <th className="font" style={{ minWidth: "130px" }}>เลขที่อะไหล่</th>
          <th className="font" style={{ minWidth: "335px" }}>รายละเอียด</th>
          <th className="font text-center" style={{ minWidth: "110px" }}>จำนวน</th>
          <th className="font text-center" style={{ minWidth: "110px" }}>ราคาต่อหน่วย</th>
          <th className="font text-center" style={{ minWidth: "100px" }}>หน่วยนับ</th>
          <th className="font text-center" style={{ minWidth: "100px" }}>จำนวนเงิน</th>
        </tr>
      </thead>
      <tbody>
        {props.checklist_line_item_use_equipment.map((list, index) => {
          let line_number = index + 1;
          let items = factItems.items;
          let item = items.find(item => `${item.item_id}` === `${list.item_id}`)
          if (item) {
            return (
              <tr>
                <th className="edit-padding text-center">{index + 1}</th>
                <td className="edit-padding">
                  {item.internal_item_id}
                </td>
                <td className="edit-padding">{item.description}</td>
                <td className="edit-padding text-center">
                  {/* {list.quantity && list.quantity} */}
                  <NumberInput step={1} name={`checklist_line_item_use_equipment[${index}].quantity`} tabIndex={props.tabIndex + line_number}
                    disabled={props.checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                    redBorderForError="error-in-table" />
                </td>
                <td className="edit-padding text-center">
                  <NumberInput step={0.0001} name={`checklist_line_item_use_equipment[${index}].per_unit_price`} disabled />
                </td>
                <td className="edit-padding text-center">
                  {/* {list.item && list.item.uom_group.uom[0].name} */}
                  <SelectNoChildrenInput name={`checklist_line_item_use_equipment[${index}].uom_id`} disabled={props.checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex={props.tabIndex + line_number}>
                    <option value=''></option>
                    {factUnit.items.map((factUnit) => {
                      return (<option value={factUnit.uom_id} key={factUnit.uom_id}>{factUnit.name}</option>)
                    })}
                  </SelectNoChildrenInput>
                </td>
                <td className="edit-padding text-right">{props.sumTotalLineItem(list.quantity, list.per_unit_price, list.description)}</td>

              </tr>
            )
          }
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