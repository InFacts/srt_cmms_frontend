import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux'

import { useFormikContext, useField } from 'formik';


const TopContent = (props) => {
    const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
    // const token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);
    return (
        <div id="blackground-white">
            <div className="container_12 clearfix">
                <h4 className="head-title" style={{ marginTop: "80px" }}>โปรไฟล์ส่วนตัว</h4>
                <div className="grid_12">
                    <div className="grid_2">
                        <p className="top-text">ชื่อ-สกุล</p>
                        <p className="top-text mt-1">รหัสพนักงาน</p>
                        <p className="top-text mt-1">หน่วยงาน</p>
                        {/* <p className="top-text">สังกัด</p> */}
                    </div>
                    <div className="grid_8 pull_0">
                        <p className="top-text" >{values.firstname_th} {values.lastname_th}</p>
                        <p className="top-text" >{values.employee_id}</p> 
                        <p className="top-text" >{values.position_name}</p> {/* รอ API พี่ลี ส่งมาให้ที่เป็น position */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopContent;