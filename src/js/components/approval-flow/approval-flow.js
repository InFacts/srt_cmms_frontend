import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, Redirect } from 'react-router-dom'
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';
import { connect } from 'react-redux';
import '../../../vender/fontawesome-free/css/all.css';
import { useFormik, withFormik, useFormikContext } from 'formik';
import { useSelector, shallowEqual } from 'react-redux';
import { fetchDocuments } from '../../redux/modules/track_doc.js';
import { FACTS } from '../../redux/modules/api/fact.js'

const ApprovalFlow = (props) => {
    const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
    
    const factApproval = useSelector((state) => ({ ...state.api.fact[FACTS.APPROVAL_PROCESS_LOOKUP] }), shallowEqual);
    
    useEffect(() => {
        setFieldValue("item_list", factApproval.items);
    }, [factApproval.items]);

    // Initial Fetch
    // useEffect(() => {
    //     props.fetchDocuments();
    // }, []);

    // useEffect(() => {
    //     setFieldValue("item_list", props.track_document_show);
    //     console.log(props.track_document_show)
    // }, [props.track_document_show]);

    return (
        <div id="blackground-white">
            <div className="container_12 clearfix" style={{ marginTop: "55px" }}>
                {/* Section Title */}
                <h4 className="head-title">บริหารจัดการเส้นทางเอกสาร</h4>

                <table className="table-many-column mt-2" style={{ height: "450px"}}>
                    <thead>
                        <tr>
                            <th className="font text-center" style={{ width: "350px" }}>ประเภทเอกสาร</th>
                            <th className="font text-center" style={{ width: "350px" }}>รายละเอียด</th>
                            <th className="font text-center" style={{ width: "300px" }}>กำหนดลำดับเอกสาร</th>
                        </tr>
                    </thead>
                    <tbody>

                        {values.item_list.map(function (item, index) {
                            if(item.approval_process_lookup_id !== 0) {
                            return (
                                <tr key={index} id={index}>
                                    <td className="edit-padding" >{item.approval_process_lookup_id} </td>
                                    <td className="edit-padding" >{item.description} </td>
                                    <td className="edit-padding text-center" >
                                        <button type="button" className="button-yellow"><Link className="button-yellow" to={"/approval-flow-step"+ "?approval_process_lookup_id=" + item.approval_process_lookup_id}>รายละเอียด</Link></button>
                                    </td>
                                </tr>
                            )
                            }
                        })}
                    </tbody>
                </table>







                {/* <TableStatus bodyTableStatus={values.step_approve} /> */}
            </div>
        </div>
    )


};



const mapStateToProps = (state) => ({
    // track_document_show: state.track_doc.track_document_show,
})
const mapDispatchToProps = {
    // fetchDocuments
}
export default connect(mapStateToProps, mapDispatchToProps)(ApprovalFlow);