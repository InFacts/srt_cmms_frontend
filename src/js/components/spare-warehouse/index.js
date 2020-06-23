import React, {useState, useEffect} from 'react';
import { useFormik , withFormik ,useFormikContext} from 'formik';
import { Redirect } from 'react-router-dom';
import { useSelector  } from 'react-redux';

import TabBar from '../common/tab-bar';

import TopContent from './top-content';
import BottomContent from './bottom-content';
import Footer from '../common/footer.js';

import {DOCUMENT_TYPE_ID, saveDocument} from '../../helper';

import useToolbarInitializer from '../../hooks/toolbar-initializer';
import useFactInitializer from '../../hooks/fact-initializer';
import useTokenInitializer from '../../hooks/token-initializer';
import useFooterInitializer from '../../hooks/footer-initializer';

import {  TOOLBAR_MODE,TOOLBAR_ACTIONS } from '../../redux/modules/toolbar.js';

import BgRed from '../../../images/spare/bg_red.jpg';
import { fetchPositionPermissionData, changeTheam } from '../../helper.js'
const WarehouesMasterDataComponent = (props) => {
    
    const {resetForm, setFieldValue, setValues, values} = useFormikContext();

    // Initial tabbar & set default active
    const [tabNames, setTabNames] = useState([
        {id:"general", name:"ทั่วไป"},
        // {id:"attachment", name:"แนบไฟล์"},
    ]);

    useToolbarInitializer(TOOLBAR_MODE.SEARCH);
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
        
        files: [],
        
        // FOR CHECK USER_ID ADMIN FOR EDIT
        modeEdit: false,
    })
})(WarehouesMasterDataComponent);

export default EnhancedWarehouseMasterDataComponent;