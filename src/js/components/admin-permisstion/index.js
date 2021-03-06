import React, { useState, useEffect } from 'react';
import { useFormik, withFormik, useFormikContext } from 'formik';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux'

import TopContent from './top-content';
import BottomContent from './bottom-content';
import Footer from '../common/footer.js';

import { packDataFromValues, DOCUMENT_TYPE_ID, saveDocument, fetchPositionPermissionData, fetchUserPermissionData } from '../../helper';

import useToolbarInitializer from '../../hooks/toolbar-initializer';
import useFactInitializer from '../../hooks/fact-initializer';
import useTokenInitializer from '../../hooks/token-initializer';
import useFooterInitializer from '../../hooks/footer-initializer';
import useDocumentSubscription from '../../hooks/document-subscription';

import { TOOLBAR_MODE, TOOLBAR_ACTIONS } from '../../redux/modules/toolbar.js';

import BgPink from '../../../images/admin/bg_pink.jpg';
import { changeTheam } from '../../helper.js'
const PermisstionAdminComponent = (props) => {

    useToolbarInitializer(TOOLBAR_MODE.NONE);
    useTokenInitializer();
    useFactInitializer();
    // useFooterInitializer(DOCUMENT_TYPE_ID.EQUIPMENT_MASTER_DATA); // TODO Need to not be document type group id, and need to not check for values.document_id since this is not a document. 
    useDocumentSubscription();
    const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();

    let module = [];
    // useEffect(() => {
    //     fetchUserPermissionData()
    //         .then((user_permission) => {
    //             console.log("user_permission", user_permission)
    //             user_permission.map((list_module) => {
    //                 module.push({
    //                     user_id: list_module.user_id,
    //                     username: list_module.username,
    //                     employee_id: list_module.employee_id,
    //                     firstname_th: list_module.firstname_th,
    //                     module_spare: list_module.function.indexOf(1) !== -1,
    //                     module_pmt: list_module.function.indexOf(2) !== -1,
    //                     module_als: list_module.function.indexOf(3) !== -1,
    //                     module_track_document: list_module.function.indexOf(4) !== -1,
    //                     module_admin: list_module.function.indexOf(5) !== -1,
    //                     module_master_data: list_module.function.indexOf(6) !== -1,

    //                     // position_id: list_module.position_id,
    //                     // name: list_module.name,
    //                     // abbreviation: list_module.abbreviation,
    //                     // module_spare: list_module.function.indexOf(1) !== -1,
    //                     // module_pmt: list_module.function.indexOf(2) !== -1,
    //                     // module_als: list_module.function.indexOf(3) !== -1,
    //                     // module_track_document: list_module.function.indexOf(4) !== -1,
    //                     // module_admin: list_module.function.indexOf(5) !== -1,
    //                 })
    //             })
    //             setFieldValue('line_position_permission', module, false);
    //         })
    // }, []);
    
    useEffect(() => {
        fetchPositionPermissionData()
            .then((position_permission) => {
                console.log("position_permission", position_permission)
                position_permission.map((list_module) => {
                    module.push({
                        position_id: list_module.position_id,
                        name: list_module.name,
                        abbreviation: list_module.abbreviation,
                        module_spare: list_module.function.indexOf(1) !== -1,
                        module_pmt: list_module.function.indexOf(2) !== -1,
                        module_als: list_module.function.indexOf(3) !== -1,
                        module_track_document: list_module.function.indexOf(4) !== -1,
                        module_admin: list_module.function.indexOf(5) !== -1,
                        module_master_data: list_module.function.indexOf(6) !== -1
                    })
                })
                setFieldValue('line_position_permission', module, false);
            })
    }, []);

    const loggedIn = useSelector(state => state.token.isLoggedIn);
    return (
        <>
            {!loggedIn ? <Redirect to="/" /> : null}
            <form style={changeTheam() === true ? { backgroundImage: `url(${BgPink})`, width: "100vw", height: "100vh" } : {}}>
                <TopContent />
                <BottomContent />
            </form>
        </>
    )
}


const EnhancedPermisstionAdminDataComponent = withFormik({
    mapPropsToValues: (props) => ({
        // Field ที่ให้ User กรอก
        // Top Content
        position_name: '',

        // Bottom Content
        line_position_permission: [],
    }),
    validate: (values, props) => {
        const errors = {};
        if (!values.document_date) {
            errors.document_date = "Required";
        }
        return errors;
    },
})(PermisstionAdminComponent);

export default EnhancedPermisstionAdminDataComponent;
