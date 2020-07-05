import React, { useState, useEffect } from 'react';
import SelectNoChildrenInput from '../common/formik-select-no-children';
import {LIST_EQUIPMENT_GROUP, LIST_DIVISION, LIST_DISTRICT, LIST_NODE} from './d3-map'
const AdjustmentBarComponent = ({name, value}) => {

    return (
    <div className="gray-background adjustment-bar mt-3">
        <h5 className="adjustment-bar-name">ปรับแต่งข้อมูลของภาพรวม</h5>
        <div className="white-background adjustment-bar-inner">
            <div className="adjustment-bar-inner-text">กลุ่มอุปกรณ์</div  >
            <SelectNoChildrenInput 
                name="equipment_group_id" >
                    <option value='' selected>ทั้งหมด</option>
                    {LIST_EQUIPMENT_GROUP.map((list, i) => (
                        <option value={i+1} >{list}</option>
                    ))}
            </SelectNoChildrenInput>

            <div className="space-10px" />

            <div className="adjustment-bar-inner-text">กอง</div>
            <SelectNoChildrenInput 
                name="division_id" >
                    <option value='' selected>ทั้งหมด</option>
                    {LIST_DIVISION.map((list, i) => (
                        <option value={i+1} >{list}</option>
                    ))}
            </SelectNoChildrenInput>

            <div className="space-10px" />

            <div className="adjustment-bar-inner-text">หน่วยงาน/แขวง</div>
            <SelectNoChildrenInput 
                name="district_id" >
                    <option value='' selected>ทั้งหมด</option>
                    {LIST_DISTRICT.map((list, i) => (
                        <option value={i+1} >{list}</option>
                    ))}
            </SelectNoChildrenInput>

            <div className="space-10px" />
            
            <div className="adjustment-bar-inner-text">ตอน</div>
            <SelectNoChildrenInput 
                name="node_id" >
                    <option value='' selected>ทั้งหมด</option>
                    {LIST_NODE.map((list, i) => (
                        <option value={i+1} >{list}</option>
                    ))}
            </SelectNoChildrenInput>
        </div>
    </div>);
}

export default AdjustmentBarComponent;