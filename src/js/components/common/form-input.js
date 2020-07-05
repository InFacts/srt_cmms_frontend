import React from 'react';
import { connect } from 'react-redux'
import { handleChange } from '../../redux/modules/form_data.js'

const FormInputComponent = ({className, value, handleChange, handleBlur}) => (
    <input type='text' className={className} value={value} onChange={handleChange} onBlur={handleBlur}/>
);

const mapStateToProps = (state, ownProps) => ({
    className: ownProps.className || '',
    value: state.form_data[ownProps.field] || ''
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    handleChange: (e) => dispatch(handleChange(ownProps.field, e.target.value))
});

const FormInput = connect(mapStateToProps, mapDispatchToProps)(FormInputComponent);

export default FormInput;