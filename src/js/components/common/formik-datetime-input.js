import React from 'react';
import { useField } from 'formik';

const DateTimeInput = ({ ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <input type="datetime-local" className="cancel-default" min={props.min} {...field} {...props}></input>
      {meta.touched && meta.error ? (
        <div className="error">
          <span class="tooltiptext" style={props.cssStyle}>{meta.error}</span>
        </div>
      ) : null}
    </>
  );
};

export default DateTimeInput;