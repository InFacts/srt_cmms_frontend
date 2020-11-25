import React, { useState, useEffect } from 'react';
import '../../../vender/fontawesome-free/css/all.css';
import { useFormikContext } from 'formik';
import { useSelector, shallowEqual } from 'react-redux';
import TextInput from '../common/formik-text-input'

// import PopupModalDocument from '../common/popup-modal-document'
import PopupModalUsername from '../common/popup-modal-username'
import { getUserIDFromEmployeeID } from '../../helper';

import { changeTheam } from '../../helper.js'
const TopContent = (props) => {
    const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
    const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
    const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
    const factUser = useSelector((state) => ({ ...state.api.fact.users }), shallowEqual);
    const factPosition = useSelector((state) => ({ ...state.api.fact.position }), shallowEqual);

    useEffect(() => {
        setFieldValue("item_list", factUser.items);
    }, [factUser.items]);

    const searchUser = () => {
        let users = factUser.items;
        let user = users.find(user => user.user_id === getUserIDFromEmployeeID(factUser, values.created_by_user_employee_id)); // Returns undefined if not found
        if (user) {
            setFieldValue("item_list", [user], false);
            return;
        }
    }

    const validateEmployeeIDField = (fieldName, fact, setFieldValue, employee_id) => {
        console.log("I am validating employee id")
        employee_id = employee_id.split('\\')[0]; // Escape Character USERNAME CANT HAVE ESCAPE CHARACTER!
        let users = factUser.items;
        let user = users.find(user => user.employee_id === employee_id); // Returns undefined if not found
        if (user) {
            setFieldValue(fieldName, `${employee_id}\\${user.firstname_th} ${user.lastname_th}`, false);
            return;
        }
    };
    const validateUserEmployeeIDField = (...args) => validateEmployeeIDField("created_by_user_employee_id", fact, setFieldValue, ...args);

    return (
        <div id={changeTheam() === true ? "" : "blackground-white"}>
            <div className="container_12 clearfix" >
                {/* Section Title */}
                <section className="container_12 ">
                    <h4 className="head-title">บริหารจัดการผู้ใช้งาน</h4>

                    <div id={changeTheam() === true ? "blackground-white" : ""}
                     style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray", height: "55px", paddingTop: "10px" } : {}} >

                    {/* <div className="container_12">
                        <div className="grid_2 cancel-default">
                            <p className="cancel-default">หน่วยงาน </p>
                        </div>
                        <div className="grid_3 pull_0">
                            <SelectNoChildrenInput name="position_id" >
                                <option value=''></option>
                                {factPosition.items.map(function ({ position_id, name }) {
                                    return <option value={position_id} key={position_id}> {name} </option>
                                })}
                            </SelectNoChildrenInput>
                        </div>
                    </div> */}
                    <div className="container_12">
                        <div className="grid_2 cancel-default">
                            <p className="cancel-default">เลขที่พนักงาน </p>
                        </div>
                        <div className="grid_3 pull_0">
                            <TextInput name="created_by_user_employee_id"
                                validate={validateUserEmployeeIDField}
                                searchable={true} ariaControls="modalUserName" />
                        </div>
                        <button className="button-blue edit grid_1 mr-5" type="button" onClick={searchUser}>ค้นหา</button>
                    </div>
                    </div>
                </section>
            </div>


            {/* PopUp ค้นหาเลขที่เอกสาร */}
            {/* <PopupModalDocument documentTypeGroupID={"document_all_type"}
                id="modalDocument" //For Open POPUP
                name="internal_document_id" //For setFieldValue
            /> */}

            {/* PopUp ค้นหาชื่อพนักงาน MODE ADD */}
            <PopupModalUsername />
        </div>
    )
};
export default TopContent;