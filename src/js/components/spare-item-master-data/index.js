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
    const [checkPermission, setCheckPermission] = useState([]);

    // Initial tabbar & set default active
    const [tabNames, setTabNames] = useState([
        { id: "general", name: "ทั่วไป" },
        { id: "warehouse", name: "คลัง" },
        // { id: "attachment", name: "แนบไฟล์" },
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

    useToolbarInitializer(checkPermission.length >= 1 && checkPermission[0].module_admin ? TOOLBAR_MODE.SEARCH : TOOLBAR_MODE.JUST_SEARCH);
    useTokenInitializer();
    useFactInitializer();
    useFooterInitializer(DOCUMENT_TYPE_ID.ITEM_MASTER_DATA);
    const loggedIn = useSelector(state => state.token.isLoggedIn);

    return (
        <>
            {!loggedIn ? <Redirect to="/" /> : null}
            <form style={changeTheam() === true ? { backgroundImage: `url(${BgRed})`, width: "100vw", height: "140vh" } : {}}>
                <TopContent />
                <TabBar tabNames={tabNames} initialTabID="general">
                    <BottomContent />
                </TabBar>
                <Footer />
            </form>
        </>
    )
}

const EnhancedItemMasterDataComponent = withFormik({
    mapPropsToValues: (props) => ({
        // Field ที่ให้ User กรอก
        internal_item_id: '',
        description: '',

        item_type_id: '',
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
    })
})(ItemMasterDataComponent);

export default EnhancedItemMasterDataComponent;
