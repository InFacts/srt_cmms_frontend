import React from 'react';
import { useField } from 'formik';

const TextInput = ({ ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  //     props.name
  const [field, meta] = useField(props);
  return (
    <>
      <select className="edit-select-top" {...field} {...props}>
        {props.checkDescription !== '' &&
          props.listProps.map(function (list_uoms, index) {
            return <option value={list_uoms[props.optionValue]} key={index}>{list_uoms[props.optionName]}</option>
          })
        }
      </select>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};
export default TextInput;