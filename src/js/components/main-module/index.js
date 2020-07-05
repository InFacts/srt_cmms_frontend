import React, { useEffect } from 'react';
import TopContent from './top-content';
import { Redirect } from 'react-router-dom';
import { useFormik, withFormik, useFormikContext } from 'formik';
import { toModeNone } from '../../redux/modules/toolbar.js';
import { footerToModeInvisible } from '../../redux/modules/footer.js';
import { useDispatch, useSelector } from 'react-redux';

import {useToolbarChangeModeInitializer} from '../../hooks/toolbar-initializer';
import {TOOLBAR_MODE} from '../../redux/modules/toolbar.js';
import useFactInitializer from '../../hooks/fact-initializer';
import useTokenInitializer from '../../hooks/token-initializer';

import {setupAllSubNav} from '../../helper';

const MainModule = (props) => {
    const toolbar = useSelector((state) => ({ ...state.toolbar }));

    // Initializer: Change Toolbar to Mode None
    useToolbarChangeModeInitializer(TOOLBAR_MODE.NONE);
    useFactInitializer();
    useTokenInitializer();
    const loggedIn = useSelector(state => state.token.isLoggedIn); 

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(footerToModeInvisible());
    }, []);

    return (
        <>
            {!loggedIn ? <Redirect to="/" /> : null}
            <TopContent />
        </>
    )
}

const EnhancedMainModuleDataComponent = withFormik({
    mapPropsToValues: (props) => ({
        line_position_permission: [],
    }),
    validate: (values, props) => {
        const errors = {};
        if (!values.document_date) {
            errors.document_date = "Required";
        }
        return errors;
    },
})(MainModule);

export default EnhancedMainModuleDataComponent;
