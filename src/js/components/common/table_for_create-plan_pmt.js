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

  return (
    <table className="table-many-column mt-2" style={{ paddingRight: "10px", paddingLeft: "10px" }}>
      <thead>
        <tr>
          <th className="font text-center" style={{ minWidth: "30px" }}>#</th>
          <th className="font" style={{ minWidth: "130px" }}>เลขที่อะไหล่</th>
          <th className="font" style={{ minWidth: "435px" }}>รายละเอียด</th>
          <th className="font text-center" style={{ minWidth: "160px" }}>จำนวน</th>
          <th className="font text-center" style={{ minWidth: "160px" }}>หน่วยนับ</th>
        </tr>
      </thead>
      <tbody>
        {props.checklist_line_item_use_equipment.map((list, index) => {
          let line_number = index +1;
          return (
            <tr>
              <th className="edit-padding text-center">{index + 1}</th>
              <td className="edit-padding">
                <TextInput name={`checklist_line_item_use_equipment[${index}].internal_item_id`}
                  validate={internal_item_id => props.validateLineNumberInternalItemIDField(`checklist_line_item_use_equipment[${index}]`, internal_item_id, index)} 
                  tabIndex={props.tabIndex + line_number}
                  disabled={props.checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                  searchable={props.checkBooleanForEdit === true ? true : toolbar.mode !== TOOLBAR_MODE.SEARCH} ariaControls="modalNoPart"
                  handleModalClick={() => props.setLineNumber(index + 1)}
                  redBorderForError="error-in-table"
                />
              </td>
              <td className="edit-padding">{list && list.description}</td>
              <td className="edit-padding text-center">
                {/* {list.quantity && list.quantity} */}
                <NumberInput step={1} name={`checklist_line_item_use_equipment[${index}].quantity`} tabIndex={props.tabIndex + line_number}
                  disabled={props.checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                  redBorderForError="error-in-table" />
              </td>
              <td className="edit-padding text-center">
                {/* {list.item && list.item.uom_group.uom[0].name} */}
                <SelectNoChildrenInput name={`checklist_line_item_use_equipment[${index}].uom_id`} disabled={props.checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex={props.tabIndex + line_number}>
                  <option value=''></option>
                  {factUnit.items.map((factUnit) => {
                    if (props.checklist_line_item_use_equipment[index].uom_group_id === factUnit.uom_group_id)
                    return (<option value={factUnit.uom_id} key={factUnit.uom_id}>{factUnit.name}</option>)
                  })}
                </SelectNoChildrenInput>
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