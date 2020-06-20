import React, { useState, useEffect } from 'react';
import { useFormik, withFormik, useFormikContext } from 'formik';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

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

const GoodsReceiptComponent = (props) => {

    const { resetForm, setFieldValue, setValues, values } = useFormikContext();

    // Initial tabbar & set default active
    const [tabNames, setTabNames] = useState([
        { id: "general", name: "ทั่วไป" },
        { id: "equipment", name: "รายการสินทรัพย์" },
        { id: "equipment_plane", name: "แผนบำรุงรักษา" },
        { id: "attachment", name: "แนบไฟล์" },
        { id: "history", name: "ประวัติการใช้" }
    ]);

    useToolbarInitializer(TOOLBAR_MODE.SEARCH);
    useTokenInitializer();
    useFactInitializer();
    useFooterInitializer(DOCUMENT_TYPE_ID.ITEM_MASTER_DATA);
    const loggedIn = useSelector(state => state.token.isLoggedIn);

    return (
        <>
            {!loggedIn ? <Redirect to="/" /> : null}
            <form>
                <TopContent />
                <TabBar tabNames={tabNames} initialTabID="general">
                    <BottomContent />
                </TabBar>
                <Footer />
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
        item_type_id: '',
        description: '',
        equipment_status_id: '',
        uom_group_id: '',

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
        description_equipment: '',
        top_districts_id: '',
        useful_life: '',
        // จังหวัด
        // อำเภอ
        districts_id: '',
        location_station_id: '',
        location: '',
        // Equipment Plane Content
        equipment_group_id: '',
        checklist_id: '',
        checklist_line_item: initialRowsEquipmentPlan(),
        // history_content
        ref_document: initialRowsDocument(),

        //Field ที่ไม่ได้กรอก
        list_uoms: [],
        line_items: [],
        files: [],
        goods_onhand: [],       //อะไหล่ที่มีอยู่ในทุกคลัง
        method: '',
        
        // NOT USE FOR FOOTER
        step_approve: [],
        created_by_admin_employee_id: '',

        //Field ที่ไม่ได้ display
        document_id: '', // changes when document is displayed (internal_document_id field validation)

        // FOR CHECK USER_ID ADMIN FOR EDIT
        modeEdit: false,
        // For Attactment
        desrciption_files_length: '',
        desrciption_files: [],
    })
})(GoodsReceiptComponent);

export default EnhancedGoodsReceiptComponent;
