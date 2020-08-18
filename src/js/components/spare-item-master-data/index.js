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

import BgRed from '../../../images/spare/bg_red.jpg';
import { fetchPositionPermissionData, changeTheam } from '../../helper.js'
const ItemMasterDataComponent = (props) => {

    const { resetForm, setFieldValue, setValues, values } = useFormikContext();
    const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);

    // Initial tabbar & set default active
    const [tabNames, setTabNames] = useState([
        { id: "general", name: "ทั่วไป" },
        { id: "warehouse", name: "คลัง" },
        // { id: "attachment", name: "แนบไฟล์" },
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
    useFooterInitializer(DOCUMENT_TYPE_ID.ITEM_MASTER_DATA);
    const loggedIn = useSelector(state => state.token.isLoggedIn);

    return (
        <>
            {!loggedIn ? <Redirect to="/" /> : null}
            <form style={changeTheam() === true ? { backgroundImage: `url(${BgRed})`, width: "100vw", height: "100vh" } : {}}>
                <TopContent />
                <TabBar tabNames={tabNames} initialTabID="general">
                    <BottomContent />
                </TabBar>
                <Footer setFieldValue={setFieldValue}/>
            </form>
        </>
    )
}

const EnhancedItemMasterDataComponent = withFormik({
    mapPropsToValues: (props) => ({
        // Field ที่ให้ User กรอก
        internal_item_id: '',
        description: '',

        item_type_id: 1,
        item_group_id: '',
        uom_group_id: '',
        uom_id: '',           //UOM 
        uom_name: '',       //UOM ตัวเต็ม
        uom_abbreviation: '',       //UOM ตัวย่อ
        default_warehouse_id: 100,
        minimum_order_quantity: '',  //ขั้นต่ำการสั่งซื้อ
        lead_time: '',
        tolerance_time: '',
        quantity_required: '',  //จำนวนที่ต้องการ
        quantity_lowest: '',    //ขั้นต่ำ
        quantity_highest: '',   //ขั้นสูง
        remark: '',
        active: '',            //สถานะอะไหล่ ปิด เปิด
        accounting_type: '',    // ประเภทเอกบัญชี

        //Field ที่ไม่ได้กรอก
        list_uoms: [],
        line_items: [],
        files: [],
        goods_onhand: [],       //อะไหล่ที่มีอยู่ในทุกคลัง

        // NOT USE FOR FOOTER
        step_approve: [],
        created_by_admin_employee_id: '',

        //Field ที่ไม่ได้ display
        document_id: '', // changes when document is displayed (internal_document_id field validation)

        // FOR CHECK USER_ID ADMIN FOR EDIT
        modeEdit: false,
        line_position_permission: [],

        remark_approval: "",
    })
})(ItemMasterDataComponent);

export default EnhancedItemMasterDataComponent;
