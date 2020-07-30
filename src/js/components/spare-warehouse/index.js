import React, {useState, useEffect} from 'react';
import { useFormik , withFormik ,useFormikContext} from 'formik';
import { Redirect } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';

import TabBar from '../common/tab-bar';

import TopContent from './top-content';
import BottomContent from './bottom-content';
import Footer from '../common/footer.js';

import {DOCUMENT_TYPE_ID, saveDocument} from '../../helper';

import useToolbarInitializer from '../../hooks/toolbar-initializer';
import useFactInitializer from '../../hooks/fact-initializer';
import useTokenInitializer from '../../hooks/token-initializer';
import useFooterInitializer from '../../hooks/footer-initializer';

import {  TOOLBAR_MODE, TOOLBAR_ACTIONS } from '../../redux/modules/toolbar.js';

import BgRed from '../../../images/spare/bg_red.jpg';
import { changeTheam, fetchPositionPermissionData } from '../../helper.js'
const WarehouesMasterDataComponent = (props) => {
    
    const {resetForm, setFieldValue, setValues, values} = useFormikContext();
    const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);
    const [checkPermission, setCheckPermission] = useState([]);

    // Initial tabbar & set default active
    const [tabNames, setTabNames] = useState([
        {id:"general", name:"ทั่วไป"},
        // {id:"attachment", name:"แนบไฟล์"},
    ]);

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
                    setCheckPermission(module);
                })
        }
    }, [decoded_token.has_position]);

    useToolbarInitializer(checkPermission.length >= 1 && checkPermission[0].module_admin ? TOOLBAR_MODE.SEARCH : TOOLBAR_MODE.SEARCH);
    useTokenInitializer();
    useFactInitializer();
    useFooterInitializer(DOCUMENT_TYPE_ID.WAREHOUSE_MASTER_DATA);
    const loggedIn = useSelector(state => state.token.isLoggedIn); 

    return (
        <>
        {!loggedIn ? <Redirect to="/" /> : null}
        <form style={changeTheam() === true ? { backgroundImage: `url(${BgRed})`, width: "100vw", height: "100vh" } : {}}>
            <TopContent />
            <TabBar tabNames={tabNames} initialTabID="general">
                <BottomContent />
            </TabBar>
            <Footer />
        </form>
        </>
    )
}

const EnhancedWarehouseMasterDataComponent = withFormik({
    mapPropsToValues: (props) => ({ 
        // Field ที่ให้ User กรอก
        warehouse_id: '',
        name: '',
        abbreviation: '',
        active: '',
        location: '',
        warehouse_type_id: '',
        use_central: '',

        line_position_permission: [],
        files: [],
        
        // FOR CHECK USER_ID ADMIN FOR EDIT
        modeEdit: false,
    })
})(WarehouesMasterDataComponent);

export default EnhancedWarehouseMasterDataComponent;