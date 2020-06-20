import React from 'react';
import { useField } from 'formik';

const RangeInput = ({ ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  //     props.name
  const [field, meta] = useField(props);
  // console.log("meta.error", meta.error)

  return (
    <>
    <input type='range' {...field} {...props} />
    {meta.touched && meta.error ? (
        <div className="error">
        <span className="tooltiptext">{meta.error}</span>
        </div>
    ) : null
    }
    </>
  );
};
export default RangeInput;