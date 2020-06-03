import React from 'react';
import { useField } from 'formik';

const DateInput = ({ ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <div>
        <input type="date" className="cancel-default" style={{paddingRight: "0"}} {...field} {...props}></input>
      </div>
      {meta.touched && meta.error ? (
        <div className="error">
          <span class="tooltiptext">{meta.error}</span>
        </div>
      ) : null}
    </>
  );
};

export default DateInput;