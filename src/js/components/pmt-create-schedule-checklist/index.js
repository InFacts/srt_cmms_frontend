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
import useDocumentSubscription from '../../hooks/document-subscription';
import useNavBottomStatusInitializer from '../../hooks/nav-bottom-status-initializer';

import { TOOLBAR_MODE, TOOLBAR_ACTIONS } from '../../redux/modules/toolbar.js';

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { changeTheam } from '../../helper.js'
const GoodsReceiptComponent = (props) => {

    const { resetForm, setFieldValue, setValues, values } = useFormikContext();

    // Initial tabbar & set default active
    const [tabNames, setTabNames] = useState([
        { id: "general", name: "สถานที่" },
        { id: "list_plan_custom", name: "รายการบำรุงรักษาสถานี" },
        { id: "list_plan_equipment", name: "รายการบำรุงรักษาสินทรัพย์" },
        { id: "attachment", name: "แนบไฟล์" },
        { id: "table_status", name: "สถานะเอกสาร" }
    ]);

    useToolbarInitializer(TOOLBAR_MODE.SEARCH);
    useTokenInitializer();
    useFactInitializer();
    useDocumentSubscription();
    useNavBottomStatusInitializer();
    useFooterInitializer(DOCUMENT_TYPE_ID.SELECTOR);

    const loggedIn = useSelector(state => state.token.isLoggedIn);

    return (
        <>
            {/* {!loggedIn ? <Redirect to="/" /> : null} */}
            <form style={changeTheam() === true ? { backgroundImage: `url(${BgBlue})`, width: "100vw", height: "130vh" } : {}}>
                <TopContent />
                <TabBar tabNames={tabNames} initialTabID="general">
                    <BottomContent />
                </TabBar>
                <Footer />
            </form>
        </>
    )
}

const initiaLineCustom = {
    checklist_group_name: '',
    checklist_id: '',
    quantity_location: '',
    unit_maintenance_location_id: ''
}
const initialRowsCustom = (n = 10) => {
    let rows = [];
    for (var i = 1; i <= n; i++) {
        rows.push({
            ...initiaLineCustom,
        });
    }
    return rows;
}

const initiaLineEquipment = {
    checklist_id: '',
    item_id: '',
    internal_item_id: '',
    quantity_location: '',
    unit_maintenance_location_id: ''
}
const initialRowsEquipment = (n = 10) => {
    let rows = [];
    for (var i = 1; i <= n; i++) {
        rows.push({
            ...initiaLineEquipment,
        });
    }
    return rows;
}

const EnhancedGoodsReceiptComponent = withFormik({
    mapPropsToValues: (props) => ({
        // Field ที่ให้ User กรอก
        // Top Content
        internal_document_id: '',       // เลขที่เอกสาร
        created_by_user_employee_id: '', // ผู้ดำเนินเรื่อง (Default === admin_employee_id)
        created_by_admin_employee_id: '',  //ผู้สร้างเอกสาร (Field ที่ไม่ได้กรอก)
        name: '',                   // ชื่อแผนการทำวาระ
        status_name_th: '',              // TODO doesn't have (Field ที่ไม่ได้กรอก)
        created_on: '',                  // TODO doesn't have (Field ที่ไม่ได้กรอก)
        document_date: '',              // วันที่ออกเอกสาร (Default === NOW )
        start_on: '',

        // Bottom
        district_id: '',
        node_id: '',
        station_id: '',
        line_custom: initialRowsCustom(),
        line_equipment: initialRowsEquipment(),

        //Field ที่ไม่ได้กรอก
        files: [],
        
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
