import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, Redirect } from 'react-router-dom'
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';
import { connect } from 'react-redux';
import '../../../vender/fontawesome-free/css/all.css';
import TableSatusApproval from '../common/table-step-approval';
import { useFormik, withFormik, useFormikContext } from 'formik';
import { useSelector, shallowEqual } from 'react-redux';
import { fetchDocuments } from '../../redux/modules/track_doc.js';

const ApprovalFlow = (props) => {
    const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
    // // Initial Fetch
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
                <TableSatusApproval bodyTableStepApproval={values.step_approve} />
            </div>
        </div>
    )


};



const mapStateToProps = (state) => ({

})
const mapDispatchToProps = {
}
export default connect(mapStateToProps, mapDispatchToProps)(ApprovalFlow);