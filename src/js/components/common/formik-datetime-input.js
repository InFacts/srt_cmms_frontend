import React from 'react';
import { useField } from 'formik';

const DateTimeInput = ({ ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and also replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
      <>
        <input type="datetime-local" className="cancel-default" {...field} {...props}></input>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
};

export default DateTimeInput;