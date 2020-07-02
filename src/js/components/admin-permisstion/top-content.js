import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import TextInput from '../common/formik-text-input';
import Label from '../common/form-label'
import SelectNoChildrenInput from '../common/formik-select-no-children';

import { TOOLBAR_MODE, TOOLBAR_ACTIONS, toModeAdd } from '../../redux/modules/toolbar.js';
import { FACTS } from '../../redux/modules/api/fact';
import { fetchPositionPermissionDataSearchPositionName } from '../../helper';
import useFillDefaultsOnModeAdd from '../../hooks/fill-defaults-on-mode-add'

import { useFormikContext, useField } from 'formik';

import { changeTheam } from '../../helper.js'
const TopContent = (props) => {
    const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
    const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
    const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);

    const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();

    let module = [];
    const searchPermisstion = () => new Promise(resolve => {
        fetchPositionPermissionDataSearchPositionName(values.position_name)
            .then((position_permission) => {
                console.log("position_permission", position_permission)
                position_permission.map((list_module) => {
                    module.push({
                        position_id: list_module.position_id,
                        name: list_module.name,
                        abbreviation: list_module.abbreviation,
                        module_spare: list_module.function.indexOf(1) !== -1,
                        module_pmt: list_module.function.indexOf(2) !== -1,
                        module_als: list_module.function.indexOf(3) !== -1,
                        module_track_document: list_module.function.indexOf(4) !== -1,
                        module_admin: list_module.function.indexOf(5) !== -1,
                    })
                })
                setFieldValue('line_position_permission', module, false);
            })
    });

    return (
        <div id={changeTheam() === true ? "" : "blackground-white"}>
            <div className="container_12 clearfix" style={{ marginTop: "55px" }}>
                {/* Section Title */}
                <h4 className="head-title">สิทธิการเข้าถึงระบบ</h4>

                <div id={changeTheam() === true ? "blackground-white" : ""}
                    style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray", height: "55px", paddingTop: "10px" } : {}} >

                    {/* === One Column === */}
                    <div className="grid_11`" style={{ paddingLeft: "10px" }}>
                        <Label>ตำแหน่ง</Label>
                        <div className="grid_4 alpha">
                            {/* <SelectNoChildrenInput name="position_id">
                            <option value=''></option>
                            {values.line_position_permission.map((list_position) => (
                                <option value={list_position.position_id} key={list_position.position_id}>{list_position.name}</option>
                            ))}
                        </SelectNoChildrenInput> */}
                            <TextInput name='position_name'
                            // validate={validateInternalDocumentIDField}
                            />
                        </div>
                        <div className="grid_1">
                            <button type="button" className="button-blue" onClick={searchPermisstion}>ค้นหา</button>
                        </div>
                        <div class="clear" />
                    </div>
                </div>

            </div>

        </div>
    );
}

export default TopContent;