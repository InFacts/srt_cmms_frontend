import React from 'react';
import { useField } from 'formik';

const TextInput = ({ ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and also replace ErrorMessage entirely.
    //     props.name
    const [field, meta] = useField(props);
    return (
      <>
        <div className="p-search-box cancel-margin">
          <input type='text' className='p-search-box__input cancel-default' {...field} {...props}/>
          {props.searchable &&
            <button type="button" className="p-search-box__button cancel-padding hidden" >
              <i className="p-icon--search" aria-controls={props.ariaControls} />
            </button>
          }
        </div>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
};
export default TextInput;