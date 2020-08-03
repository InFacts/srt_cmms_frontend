import React, { useState, useEffect } from 'react';
import SelectNoChildrenInput from '../common/formik-select-no-children';
import RangeInput from '../common/formik-range-input';
import { useFormikContext } from 'formik';
import { useSelector, shallowEqual } from 'react-redux';
import { FACTS } from '../../redux/modules/api/fact.js';

const AdjustmentBarComponent = () => {

    const { values } = useFormikContext();
    const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
    let thisYear = new Date().getFullYear() + 543
    
    return (
        <div className="gray-background adjustment-bar">
            <h5 className="adjustment-bar-name">ปรับแต่งข้อมูลของภาพรวม</h5>
            <div className="white-background adjustment-bar-inner">
                <div className="adjustment-bar-inner-text">รายงานประจำปี {values.year}</div>
                <RangeInput
                    name="year"
                    min="2563"
                    max={thisYear}
                    step="1"
                />

                <div className="space-10px" />

                <div className="adjustment-bar-inner-text">คลัง</div  >
                <SelectNoChildrenInput
                    name="warehouse_id" >
                    <option value='' selected>ทั้งหมด</option>
                    {fact[FACTS.WAREHOUSES].items.map((warehouse) => (
                        <option
                            key={warehouse.warehouse_id}
                            value={warehouse.warehouse_id}
                        >{warehouse.name}</option>
                    ))}
                </SelectNoChildrenInput>

                <div className="space-10px" />

                <div className="adjustment-bar-inner-text">อะไหล่</div>
                <SelectNoChildrenInput
                    name="item_id" >
                    <option value='' selected>ทั้งหมด</option>
                    {fact[FACTS.ITEM].items.map((item) => (
                        <option
                            key={item.item_id}
                            value={item.item_id}
                        >{`${item.internal_item_id}/${item.description}`}</option>
                    ))}
                </SelectNoChildrenInput>

                <div className="space-10px" />

                <div className="adjustment-bar-inner-text">Inventory Month เป้าหมาย {values.goal_inventory_month}</div>
                <RangeInput
                    name="goal_inventory_month"
                    min="1"
                    max="12"
                    step="1"
                    disabled={true}
                />

                <div className="space-10px" />

                <div className="adjustment-bar-inner-text">Window Size (ปี) {values.window_size}</div>
                <RangeInput
                    name="window_size"
                    min="0.5"
                    max="4"
                    step="0.5"
                    disabled={true}
                />
            </div>
        </div>);
}

export default AdjustmentBarComponent;