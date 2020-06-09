import { useEffect } from 'react';
import { TOOLBAR_MODE, TOOLBAR_ACTIONS } from '../redux/modules/toolbar.js';
import { shallowEqual, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { getEmployeeIDFromUserID} from '../helper';

import { useFormikContext } from 'formik';

const useFillDefaultsOnModeAdd = () => {

    const fact = useSelector((state) => ({...state.api.fact}), shallowEqual);
    const toolbar = useSelector((state) => ({...state.toolbar}), shallowEqual);
    const decoded_token = useSelector((state) => ({...state.token.decoded_token}), shallowEqual);
    const { values, touched, setFieldValue} = useFormikContext();

    // Fill Default Forms
    useEffect(() => {
        if (toolbar.mode === TOOLBAR_MODE.ADD) {
            if (!values.internal_document_id && touched.internal_document_id){
                setFieldValue('internal_document_id', `draft-${uuidv4()}`, true)
            }
            setFieldValue("created_by_admin_employee_id", getEmployeeIDFromUserID(fact.users, decoded_token.id));
            setFieldValue("created_on", new Date().toISOString().slice(0, 16), false);
        }
        
    }, [fact.users, toolbar.mode, touched.internal_document_id, !values.internal_document_id,
        toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]]) // This needs requiresHandleClick since it resetsForm AFTER the setField Value, making it not show anything
    
}
export default useFillDefaultsOnModeAdd;