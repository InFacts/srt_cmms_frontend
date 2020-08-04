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
        { id: "general", name: "ทั่วไป" },
        { id: "equipment", name: "รายการสินทรัพย์" },
        { id: "equipment_plane", name: "แผนบำรุงรักษา" },
        { id: "history", name: "ประวัติการใช้" },
        { id: "attachment", name: "แนบไฟล์" },
    ]);
    const [toolbarMode, setToolBarMode] = useState(TOOLBAR_MODE.SEARCH);

    useEffect(() => {
        if (values.line_position_permission.length >= 1) {
            if (values.line_position_permission[0].module_admin) {
                setToolBarMode(TOOLBAR_MODE.SEARCH)
            } else {
                setToolBarMode(TOOLBAR_MODE.JUST_SEARCH)
            }
        }
    }, [decoded_token]);

    useToolbarInitializer(toolbarMode);
    useTokenInitializer();
    useFactInitializer();
    useFooterInitializer(DOCUMENT_TYPE_ID.EQUIPMENT_MASTER_DATA);
    const loggedIn = useSelector(state => state.token.isLoggedIn);

    return (
        <>
            {!loggedIn ? <Redirect to="/" /> : null}
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
    description: ''
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

const initiaLineDocument = {
    description: ''
}
const initialRowsDocument = (n = 10) => {
    let rows = [];
    for (var i = 1; i <= n; i++) {
        rows.push({
            ...initiaLineDocument,
            line_number: i
        });
    }
    return rows;
}



const EnhancedGoodsReceiptComponent = withFormik({
    mapPropsToValues: (props) => ({
        // Field ที่ให้ User กรอก
        // Top Content
        internal_item_id: '',
        item_type_id: 2,
        item_group_id: 1,
        description: '',
        uom_group_id: '',
        active: '',
        import_on: '',

        // Bottom Content
        // General Content
        uom_id: '',
        minimum_order_quantity: '',
        uom_name: '',
        lead_time: '',
        tolerance_time: '',
        active: '',
        accounting_type: '',
        remark: '',
        // Equipment Content
        price_import: '',
        price_currently: '',
        responsible_by: '',
        useful_life: '',
        // Equipment Plane Content
        equipment_group_id: '',
        checklist_group_id: '',
        checklist_id: '',
        checklist_line_item: initialRowsEquipmentPlan(),
        // history_content
        ref_document: initialRowsDocument(),

        //Field ที่ไม่ได้กรอก
        files: [],

        // FOR CHECK USER_ID ADMIN FOR EDIT
        modeEdit: false,
        line_position_permission: [],
        
        // For Attactment
        desrciption_files_length: '',
        desrciption_files: [],
    })
})(GoodsReceiptComponent);

export default EnhancedGoodsReceiptComponent;
