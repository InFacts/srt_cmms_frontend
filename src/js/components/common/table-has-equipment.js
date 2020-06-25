import React, { useEffectm, useState } from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux';
import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';

import TextInput from '../common/formik-text-input';
import NumberInput from '../common/formik-number-input';
import SelectNoChildrenInput from '../common/formik-select-no-children';
import { FACTS } from '../../redux/modules/api/fact';

const Table = (props) => {
  const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
  const factItemStatus = useSelector((state) => ({ ...state.api.fact[FACTS.ITEM_STATUS] }), shallowEqual);

  return (
    <div style={{ padding: "10px" }}>
      <table className="table-many-column mt-3">
        <thead>
          <tr>
            <th className="font text-center" style={{ width: "50px" }}>#</th>
            <th className="font" style={{ width: "200px" }}>เลขที่สินทรัพย์</th>
            <th className="font" style={{ width: "350px" }}>รายละเอียด</th>
            <th className="font" style={{ width: "150px" }}>สถานะ</th>
            <th className="font" style={{ width: "200px" }}>หมายเหตุ</th>
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
                    disabled={props.disabledBothMode !== true ? props.checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH : true}
                    searchable={props.checkBooleanForEdit === true ? true : toolbar.mode !== TOOLBAR_MODE.SEARCH} ariaControls="modalEquipment"
                    // handleModalClick={() => props.setLineNumber(line_number)}
                    redBorderForError="error-in-table"
                  />
                </td>
                <td className="edit-padding">{list && list.description}</td>

                <td className="edit-padding text-center">
                  <SelectNoChildrenInput name={`line_items[${index}].item_status_id`} disabled={props.checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} >
                    <option value='' selected></option>
                    {factItemStatus.items.map((factItemStatus) => {
                      if (list) {
                      if (props.values.line_items[index].item_status_id === factItemStatus.item_status_id) {
                        return <option key={factItemStatus.item_status_id} value={factItemStatus.item_status_id} selected>{factItemStatus.description_th}</option>
                      } else return <option key={factItemStatus.item_status_id} value={factItemStatus.item_status_id}>{factItemStatus.description_th}</option>
                    }
                    })}
                  </SelectNoChildrenInput>
                </td>

                <td className="edit-padding text-center">
                  <TextInput name={`line_items[${index}].remark`} tabIndex="6"
                    disabled={props.disabledBothMode !== true ? props.checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH : true}
                  />
                </td>
              </tr>
            )
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