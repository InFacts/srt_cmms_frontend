import React, { useState, useEffect } from 'react';
import SelectNoChildrenInput from '../common/formik-select-no-children';
import RangeInput from '../common/formik-range-input';
import { useFormikContext } from 'formik';

const AdjustmentBarComponent = () => {

    const {values} = useFormikContext();

    return (
        <div className="gray-background adjustment-bar">
            <h5 className="adjustment-bar-name">ปรับแต่งข้อมูลของภาพรวม</h5>
            <div className="white-background adjustment-bar-inner">
                <div className="adjustment-bar-inner-text">รายงานประจำปี {values.year}</div>
                <RangeInput
                    name="year"
                    min="2560"
                    max="2563"
                    step="1"
                />

                <div className="space-10px" />

                <div className="adjustment-bar-inner-text">ประเภทการตรวจซ่อม</div  >
                <SelectNoChildrenInput
                    name="fix_type" 
                    // defaultValue=''
                >
                    <option value=''>ทั้งหมด</option>
                    <option value='1' >โทรศัพท์</option>
                    <option value='2' >จดหมาย</option>
                    <option value='3' >Work Request</option>
                </SelectNoChildrenInput>

                <div className="space-10px" />

                <div className="adjustment-bar-inner-text">กอง</div>
                <SelectNoChildrenInput
                    name="division_id" 
                    // defaultValue=''
                >
                    <option value=''>ทั้งหมด</option>
                    <option value='1' >โทรศัพท์</option>
                    <option value='2' >จดหมาย</option>
                    <option value='3' >Work Request</option>
                </SelectNoChildrenInput>

                <div className="space-10px" />

                <div className="adjustment-bar-inner-text">หน่วยงาน/แขวง</div>
                <SelectNoChildrenInput
                    name="district_id" 
                    // defaultValue=''
                >
                    <option value=''>ทั้งหมด</option>
                    <option value='1' >โทรศัพท์</option>
                    <option value='2' >จดหมาย</option>
                    <option value='3' >Work Request</option>
                </SelectNoChildrenInput>

                <div className="space-10px" />

                <div className="adjustment-bar-inner-text">ตอน</div>
                <SelectNoChildrenInput
                    name="node_id" 
                    // defaultValue=''
                >
                    <option value=''>ทั้งหมด</option>
                    <option value='1' >โทรศัพท์</option>
                    <option value='2' >จดหมาย</option>
                    <option value='3' >Work Request</option>
                </SelectNoChildrenInput>
            </div>
        </div>);
}

export default AdjustmentBarComponent;