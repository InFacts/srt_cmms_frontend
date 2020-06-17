import React, { useState, useEffect } from 'react';
import { useFormik, withFormik, useFormikContext } from 'formik';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux'

import TopContent from './top-content';
import BottomContent from './bottom-content';
import Footer from '../common/footer.js';

import { packDataFromValues, DOCUMENT_TYPE_ID, saveDocument, fetchPositionPermissionData } from '../../helper';

import useToolbarInitializer from '../../hooks/toolbar-initializer';
import useFactInitializer from '../../hooks/fact-initializer';
import useTokenInitializer from '../../hooks/token-initializer';
import useFooterInitializer from '../../hooks/footer-initializer';
import useDocumentSubscription from '../../hooks/document-subscription';

import { TOOLBAR_MODE, TOOLBAR_ACTIONS } from '../../redux/modules/toolbar.js';

const PermisstionAdminComponent = (props) => {

    useToolbarInitializer(TOOLBAR_MODE.NONE);
    useTokenInitializer();
    useFactInitializer();
    useFooterInitializer(DOCUMENT_TYPE_ID.EQUIPMENT_MASTER_DATA); // TODO Need to not be document type group id, and need to not check for values.document_id since this is not a document. 
    useDocumentSubscription();
    const loggedIn = useSelector(state => state.token.isLoggedIn);
    const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();

    let module = [];
    useEffect(() => {
        fetchPositionPermissionData()
            .then((position_permission) => {
                // console.log("position_permission", position_permission)
                position_permission.map((list_module) => {
                    module.push({
                        position_id: list_module.position_id,
                        name: list_module.name,
                        abbreviation: list_module.abbreviation,
                        module_1: list_module.function.indexOf(1) !== -1,
                        module_2: list_module.function.indexOf(2) !== -1,
                        module_3: list_module.function.indexOf(3) !== -1,
                        module_4: list_module.function.indexOf(4) !== -1,
                    })
                })
                setFieldValue('line_position_permission', module, false);
            })
    }, []);

    return (
        <>
            {!loggedIn ? <Redirect to="/" /> : null}
            <form>
                <TopContent />
                <BottomContent />
                <Footer />
            </form>
        </>
    )
}


const EnhancedPermisstionAdminDataComponent = withFormik({
    mapPropsToValues: (props) => ({
        // Field ที่ให้ User กรอก
        // Top Content
        position_id: '',

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
