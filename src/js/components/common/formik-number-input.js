import React from 'react';
import { useField } from 'formik';

const NumberInput = ({ ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <div>
        <input type="number" min="0" className="cancel-default" style={{paddingRight: "0"}} {...field} {...props}></input>
      </div>
      {
      props.redBorderForError !== "error-in-table"
        ?
        meta.touched && meta.error ? (
          <div className="error">
            <span className="tooltiptextForNumber" style={props.cssStyle}>{meta.error}</span>
          </div>
        ) : null
        :
        <div className="error2">{meta.error}</div>
      }
    </>
  );
};

export default NumberInput;