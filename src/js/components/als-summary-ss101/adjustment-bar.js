import React, { useState, useEffect } from 'react';
import SelectNoChildrenInput from '../common/formik-select-no-children';
import RangeInput from '../common/formik-range-input';
import { useFormikContext } from 'formik';
import { useSelector, shallowEqual } from 'react-redux';
import { validatedataDocumentField } from '../../helper';

const AdjustmentBarComponent = () => {

    const { values, setFieldValue, validateField } = useFormikContext();
    const factDistricts = useSelector((state) => ({ ...state.api.fact.districts }), shallowEqual);
    const factNodes = useSelector((state) => ({ ...state.api.fact.nodes }), shallowEqual);
    const validateDocumentLocationDistrictIDField = (...args) => validatedataDocumentField("district_id", setFieldValue, ...args)
    const validateDocumentLocationNodeIDField = (...args) => validatedataDocumentField("node_id", setFieldValue, ...args)

    return (
        <div className="gray-background adjustment-bar">
            <h5 className="adjustment-bar-name">ปรับแต่งข้อมูลของภาพรวม</h5>
            <div className="white-background adjustment-bar-inner">
                <div className="adjustment-bar-inner-text">รายงานประจำปี {values.year}</div>
                <RangeInput
                    name="year"
                    min="2562"
                    max="2563"
                    step="1"
                />

                <div className="space-10px" />

                <div className="adjustment-bar-inner-text">ประเภทการตรวจซ่อม</div  >
                <SelectNoChildrenInput
                    name="fix_type" >
                    <option value='' selected>ทั้งหมด</option>
                    <option value='1' >โทรศัพท์</option>
                    <option value='2' >จดหมาย</option>
                    <option value='3' >Work Request</option>
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