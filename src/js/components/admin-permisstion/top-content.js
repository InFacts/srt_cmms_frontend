import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import TextInput from '../common/formik-text-input';
import Label from '../common/form-label'
import SelectNoChildrenInput from '../common/formik-select-no-children';

import { TOOLBAR_MODE, TOOLBAR_ACTIONS, toModeAdd } from '../../redux/modules/toolbar.js';
import { FACTS } from '../../redux/modules/api/fact';
import { } from '../../helper';
import useFillDefaultsOnModeAdd from '../../hooks/fill-defaults-on-mode-add'

import { useFormikContext, useField } from 'formik';

const TopContent = (props) => {
    const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
    const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
    const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);

    const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();

    return (
        <div id="blackground-white">
            <div className="container_12 clearfix" style={{ marginTop: "55px" }}>
                {/* Section Title */}
                <h4 className="head-title">สิทธิการเข้าถึงแต่ละฟังก์ชั่น</h4>

                {/* === One Column === */}
                <div className="grid_11`" style={{ paddingLeft: "10px" }}>

                    {/* Internal Equipment ID */}
                    {/* <Label>รหัสพนักงาน</Label>
                    <div className="grid_4 alpha">
                        <TextInput name="employee_id" />
                    </div>
                    <div class="clear" /> */}

                    {/* Description  */}
                    <Label>ตำแหน่ง</Label>
                    <div className="grid_4 alpha">
                        <SelectNoChildrenInput name="recv_accident_from_recv_id">
                            <option value=''></option>
                            <option value=''>หัวหน้ากอง</option>
                        </SelectNoChildrenInput>
                    </div>
                    <div className="grid_1">
                        <button type="button" className="button-blue">ค้นหา</button>
                    </div>
                    <div class="clear" />
                </div>

            </div>

        </div>
    );
}

export default TopContent;