import React from 'react';
import { useField } from 'formik';

const SelectInput = ({ ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  //     props.name
  const [field, meta] = useField(props);
  return (
    <>
      <select className="edit-select-top" {...field} {...props}>
        {props.checkDescription &&
          props.listProps.map((list_uoms, index) => {
            return <option value={list_uoms[props.optionValue]} key={index}>{list_uoms[props.optionName]}</option>
          })
        }
      </select>
      {props.redBorderForError !== "error-in-table"
        ?
        meta.touched && meta.error ? (
          <div className="error">
            <span class="tooltiptext">{meta.error}</span>
          </div>
        ) : null
        :
        <div className="error2">{meta.error}</div>
      }
    </>
  );
};
export default SelectInput;