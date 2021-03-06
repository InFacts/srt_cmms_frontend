import React, { useState, useEffect } from 'react';
import SelectNoChildrenInput from '../common/formik-select-no-children';

import { useSelector, shallowEqual } from 'react-redux';
import { useFormikContext } from 'formik';
import { validatedataDocumentField } from '../../helper';

const AdjustmentBarComponent = ({name, value}) => {
    const { values, setFieldValue, validateField } = useFormikContext();
    const factEquipmentGroup = useSelector((state) => ({ ...state.api.fact['equipment-group'] }), shallowEqual);
    const factDistricts = useSelector((state) => ({ ...state.api.fact.districts }), shallowEqual);
    const factNodes = useSelector((state) => ({ ...state.api.fact.nodes }), shallowEqual);
    const validateDocumentLocationDistrictIDField = (...args) => validatedataDocumentField("district_id", setFieldValue, ...args)
    const validateDocumentLocationNodeIDField = (...args) => validatedataDocumentField("node_id", setFieldValue, ...args)
    return (
    <div className="gray-background adjustment-bar mt-3">
        <h5 className="adjustment-bar-name">ปรับแต่งข้อมูลของภาพรวม</h5>
        <div className="white-background adjustment-bar-inner">
            <div className="adjustment-bar-inner-text">กลุ่มอุปกรณ์</div  >
            <SelectNoChildrenInput 
                name="equipment_group_id" >
                    <option value='ทั้งหมด'>ทั้งหมด</option>
                    {factEquipmentGroup.items.map(function ({ equipment_group_id, name, description }) {
                return <option value={equipment_group_id} key={equipment_group_id}> {description}  </option>
                })}
            </SelectNoChildrenInput>


            <div className="space-10px" />

            <div className="adjustment-bar-inner-text">หน่วยงาน/แขวง</div>
            <SelectNoChildrenInput name="district_id" validate={validateDocumentLocationDistrictIDField}
                cssStyle={{ left: "-240px", top: "10px" }} tabIndex="20">
                <option value='ทั้งหมด'>ทั้งหมด</option>
                {factDistricts.items.map(function ({ district_id, name, division_id }) {
                    return <option value={district_id} key={district_id}> {name} </option>
                })}
            </SelectNoChildrenInput>

            <div className="space-10px" />
            
            <div className="adjustment-bar-inner-text">ตอน</div>
            <SelectNoChildrenInput name="node_id" validate={validateDocumentLocationNodeIDField}
                cssStyle={{ left: "-240px", top: "10px" }} tabIndex="21">
                <option value='ทั้งหมด'>ทั้งหมด</option>
                {factNodes.items.map(function ({ node_id, name, district_id }) {
                    if (values.district_id == district_id) { // Shallow equality, district ID may be string
                        return <option value={node_id} key={node_id}>{name}</option>
                    }
                })}
            </SelectNoChildrenInput>
        </div>
    </div>);
}

export default AdjustmentBarComponent;