import React from 'react';
import { useField } from 'formik';

const TextareaInput = ({ ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and also replace ErrorMessage entirely.
    //     props.name
    const [field, meta] = useField(props);
    return (
      <>
        <textarea className="edit" name="Text1" rows="2" {...field} {...props}></textarea>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
};
export default TextareaInput;