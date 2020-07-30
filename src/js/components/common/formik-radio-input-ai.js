import React from 'react';
import { useField,Field } from 'formik';

const RadioAutoIncrementInput = ({ ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and also replace ErrorMessage entirely.
    //     props.name
    // const [field, meta] = useField(props);
    return (
      <>
        <div className="radioInternalID">
            <label>
            <Field type="radio"  {...props} 
            // {...field} 
             value="auto" />
            Auto
            </label>
        </div>
        <div className="radioInternalID">
            <label>
            <Field type="radio"  {...props}
            // {...field}  
            value="manual"/>
            Manual
            </label>
        </div>
        

        {/* {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null} */}
      </>
    );
};
export default RadioAutoIncrementInput;