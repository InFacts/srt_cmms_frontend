import { useEffect } from 'react';
import { TOOLBAR_MODE, TOOLBAR_ACTIONS } from '../redux/modules/toolbar.js';
import { shallowEqual, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { getEmployeeIDFromUserID, fetchPositionPermissionData } from '../helper';

import { useFormikContext } from 'formik';

import {DOCUMENT_TYPE_ID} from '../helper';
const useFetchPernissionUser = (document_type_group_id) => {

    const fact = useSelector((state) => ({...state.api.fact}), shallowEqual);
    const toolbar = useSelector((state) => ({...state.toolbar}), shallowEqual);
    const decoded_token = useSelector((state) => ({...state.token.decoded_token}), shallowEqual);
    const { setFieldValue } = useFormikContext();

    let module = [];
    useEffect(() => {
      if (decoded_token.has_position) {
        fetchPositionPermissionData(decoded_token.has_position[0].position_id)
          .then((position_permission) => {
            // console.log("position_permission", position_permission)
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
              })
            })
            setFieldValue('line_position_permission', module, false);
          })
      }
    }, [decoded_token.has_position]);
}
export default useFetchPernissionUser;