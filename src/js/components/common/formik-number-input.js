import React from 'react';
import { useField } from 'formik';

const NumberInput = ({ ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <div>
        <input type="number" min="0" step={props.step} className="cancel-default" {...field} {...props}></input>
      </div>
      {meta.touched && meta.error ? (
        <div className="error">
          <span className="tooltiptextForNumber">{meta.error}</span>
        </div>
      ) : null}
    </>
  );
};

export default NumberInput;