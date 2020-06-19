import React, { useState, useEffect } from 'react';
import SelectNoChildrenInput from '../common/formik-select-no-children';

const AdjustmentBarComponent = ({name, value}) => {

    return (
    <div className="gray-background adjustment-bar">
        <h5 className="adjustment-bar-name">ปรับแต่งข้อมูลของภาพรวม</h5>
        <div className="white-background adjustment-bar-inner">
            <div className="adjustment-bar-inner-text">กลุ่มอุปกรณ์</div  >
            <SelectNoChildrenInput 
                name="equipment_group_id" >
                    <option value='' selected>ทั้งหมด</option>
                    <option value='1' >โทรศัพท์</option>
                    <option value='2' >จดหมาย</option>
                    <option value='3' >Work Request</option>
            </SelectNoChildrenInput>

            <div className="space-10px" />

            <div className="adjustment-bar-inner-text">กอง</div>
            <SelectNoChildrenInput 
                name="division_id" >
                    <option value='' selected>ทั้งหมด</option>
                    <option value='1' >โทรศัพท์</option>
                    <option value='2' >จดหมาย</option>
                    <option value='3' >Work Request</option>
            </SelectNoChildrenInput>

            <div className="space-10px" />

            <div className="adjustment-bar-inner-text">หน่วยงาน/แขวง</div>
            <SelectNoChildrenInput 
                name="district_id" >
                    <option value='' selected>ทั้งหมด</option>
                    <option value='1' >โทรศัพท์</option>
                    <option value='2' >จดหมาย</option>
                    <option value='3' >Work Request</option>
            </SelectNoChildrenInput>

            <div className="space-10px" />
            
            <div className="adjustment-bar-inner-text">ตอน</div>
            <SelectNoChildrenInput 
                name="node_id" >
                    <option value='' selected>ทั้งหมด</option>
                    <option value='1' >โทรศัพท์</option>
                    <option value='2' >จดหมาย</option>
                    <option value='3' >Work Request</option>
            </SelectNoChildrenInput>
        </div>
    </div>);
}

export default AdjustmentBarComponent;