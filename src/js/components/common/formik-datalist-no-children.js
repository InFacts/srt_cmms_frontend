import React from 'react';
import { useField } from 'formik';
import { useSelector, shallowEqual } from 'react-redux';
import { FACTS } from '../../redux/modules/api/fact';

const DatalistNoChildrenInput = ({ ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  //     props.name
  const [field, meta] = useField(props);
  const factXCross = useSelector((state) => ({ ...state.api.fact[FACTS.X_CROSS] }), shallowEqual);

  return (
    <>
      <input list="browsers" style={{ width: "100%", border: "1px solid gray", fontSize: "17px" }} {...field} {...props} />
      <datalist id="browsers">
        {factXCross.items.map((x_cross) => {
          return <option key={x_cross.x_cross_id} value={x_cross.road_center}></option>
        })}
      </datalist>

      {meta.touched && meta.error ? (
        <div className="error">
          <span className="tooltiptext" style={props.cssStyle}>{meta.error}</span>
        </div>
      ) : null
      }
    </>
  );
};
export default DatalistNoChildrenInput;