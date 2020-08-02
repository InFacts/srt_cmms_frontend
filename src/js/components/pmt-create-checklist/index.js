import React, { useState, useEffect } from 'react';
import { useFormik, withFormik, useFormikContext } from 'formik';
import { Redirect } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';

import TabBar from '../common/tab-bar';

import TopContent from './top-content';
import BottomContent from './bottom-content';
import Footer from '../common/footer.js';

import { DOCUMENT_TYPE_ID, saveDocument } from '../../helper';

import useToolbarInitializer from '../../hooks/toolbar-initializer';
import useFactInitializer from '../../hooks/fact-initializer';
import useTokenInitializer from '../../hooks/token-initializer';
import useFooterInitializer from '../../hooks/footer-initializer';

import { TOOLBAR_MODE, TOOLBAR_ACTIONS } from '../../redux/modules/toolbar.js';

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { fetchPositionPermissionData, changeTheam } from '../../helper.js'
const GoodsReceiptComponent = (props) => {

    const { resetForm, setFieldValue, setValues, values } = useFormikContext();
    const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);
    const [checkPermission, setCheckPermission] = useState([]);

    // Initial tabbar & set default active
    const [tabNames, setTabNames] = useState([
        { id: "general", name: "อุปกรณ์ที่ต้องนำไปปฎิบัติงาน" },
        { id: "attachment", name: "แนบไฟล์" }
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

    useToolbarInitializer(checkPermission.length >= 1 && checkPermission[0].module_admin ? TOOLBAR_MODE.SEARCH : TOOLBAR_MODE.SEARCH, DOCUMENT_TYPE_ID.EQUIPMENT_MASTER_DATA, DOCUMENT_TYPE_ID.CREATE_CHECKLIST_LINE_ITEM);
    useTokenInitializer();
    useFactInitializer();
    useFooterInitializer(DOCUMENT_TYPE_ID.CREATE_CHECKLIST_LINE_ITEM);
    const loggedIn = useSelector(state => state.token.isLoggedIn);

    return (
        <>
            {/* {!loggedIn ? <Redirect to="/" /> : null} */}
            <form style={changeTheam() === true ? { backgroundImage: `url(${BgBlue})`, width: "100vw", height: "130vh" } : {}}>
                <TopContent />
                <TabBar tabNames={tabNames} initialTabID="general">
                    <BottomContent />
                </TabBar>
                <Footer setFieldValue={setFieldValue}/>
            </form>
        </>
    )
}

const initiaLineEquipmentPlan = {
    internal_item_id: '',
    description: '',
    quantity: '',
    uom_id: ''
}
const initialRowsEquipmentPlan = (n = 10) => {
    let rows = [];
    for (var i = 1; i <= n; i++) {
        rows.push({
            ...initiaLineEquipmentPlan,
            line_number: i
        });
    }
    return rows;
}

const EnhancedGoodsReceiptComponent = withFormik({
    mapPropsToValues: (props) => ({
        // Field ที่ให้ User กรอก
        // Top Content
        checklist_line_item: '', 
        checklist_id: '',
        name: '',  // ชื่อแผน
        freq: '', //ความถี่
        freq_unit_id: '',
        active: 1,
        checklist_group_id: '',

        // Bottom Content
        checklist_line_item_use_equipment: initialRowsEquipmentPlan(),
        
        files: [],
        
        // FOR CHECK USER_ID ADMIN FOR EDIT
        modeEdit: false
    })
})(GoodsReceiptComponent);

export default EnhancedGoodsReceiptComponent;
