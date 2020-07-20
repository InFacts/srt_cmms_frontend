import React, { useEffect, useState } from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux';

import { useFormikContext } from 'formik';
import { FACTS } from '../../redux/modules/api/fact.js';

import SelectNoChildrenInput from '../common/formik-select-no-children';
import '../../../css/table.css';

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { fetchPositionPermissionData, changeTheam } from '../../helper.js'
const BottomContent = (props) => {
  const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
  const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
  const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);

  return (
    <>
      {/* THIS MAKES THE BACKGROUND NOT GRAY!! NEEDS TO FIX */}
      <div id={changeTheam() === true ? "" : "blackground-gray"}>
        {/* <div className="container_12 clearfix"> */}
        <div className="container_12 " id={changeTheam() === true ? "blackground-gray" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray" } : {}}>

          <table className="table-many-column mt-2" style={{ padding: "10px" }}>
            <thead>
              <tr>
                <th className="font text-center" style={{ width: "30px" }}>#</th>
                <th className="font" style={{ width: "380px" }}>เลขที่เอกสาร</th>
                <th className="font text-center" style={{ width: "200px" }}>งาน</th>
                <th className="font text-center" style={{ width: "200px" }}>สร้างวันที่	</th>
                <th className="font text-center" style={{ width: "200px" }}>สถานะเอกสาร</th>
              </tr>
            </thead>
            <tbody>
              {values.list_documents.map((list, index) => {
                return (
                  <tr key={index} id={index}>
                    <td className="edit-padding text-center">{index + 1}</td>
                    <td className="edit-padding">{list.internal_document_id}</td>
                    <td className="edit-padding text-center">-</td>
                    <td className="edit-padding text-center">{list.created_on.split(".")[0].replace("T", " เวลา ") + " น."}</td>
                    <td className="edit-padding text-center">
                      <select className="edit-select" value={list.document_status_id} disabled>
                        <option value=''></option>
                        {fact[FACTS.DOCUMENT_STATUS].items.map((status) => {
                          return <option value={status.document_status_id}>{status.status}</option>
                        })}
                      </select>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

        </div>
      </div>
    </>
  )
};

export default BottomContent;