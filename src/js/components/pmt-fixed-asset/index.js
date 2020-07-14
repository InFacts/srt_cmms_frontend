import React, { useState, useEffect } from 'react';
import { useFormik, withFormik, useFormikContext } from 'formik';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import TabBar from '../common/tab-bar';

import TopContent from './top-content';
import BottomContent from './bottom-content';
import Footer from '../common/footer.js';

import { DOCUMENT_TYPE_ID, saveDocument } from '../../helper';

import useToolbarInitializer from '../../hooks/toolbar-initializer';
import useFactInitializer from '../../hooks/fact-initializer';
import useTokenInitializer from '../../hooks/token-initializer';
import useFooterInitializer from '../../hooks/footer-initializer';
import useNavBottomStatusInitializer from '../../hooks/nav-bottom-status-initializer';
import useDocumentSubscription from '../../hooks/document-subscription';

import { TOOLBAR_MODE, TOOLBAR_ACTIONS } from '../../redux/modules/toolbar.js';

import { footerToModeSearch } from '../../redux/modules/footer.js';

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { changeTheam, getUrlParamsLink } from '../../helper.js'
const GoodsReceiptComponent = (props) => {
    const { resetForm, setFieldValue, setValues, values } = useFormikContext();
    const dispatch = useDispatch();

    // Initial tabbar & set default active
    const [tabNames, setTabNames] = useState([
        // { id: "general", name: "รายการบำรุงรักษา" },
        { id: "related_parties", name: "ผู้ที่เกี่ยวข้อง" },
        { id: "item", name: "อุปกรณ์ที่ต้องนำไปปฎิบัติงาน" },
        { id: "attachment", name: "แนบไฟล์" },
        { id: "table_status", name: "สถานะเอกสาร" }
    ]);

    useToolbarInitializer(TOOLBAR_MODE.SEARCH, DOCUMENT_TYPE_ID.WORK_ORDER_PM);
    useTokenInitializer();
    useFactInitializer();
    useFooterInitializer(DOCUMENT_TYPE_ID.WORK_ORDER_PM);
    useDocumentSubscription();
    useNavBottomStatusInitializer();
    const loggedIn = useSelector(state => state.token.isLoggedIn);

    useEffect(() => {
        dispatch(footerToModeSearch());
    }, []);

    // If Link to this url via Track Document
    useEffect(() => {
        getUrlParamsLink()
            .then((internal_document_id) => {
                if (internal_document_id !== "") {
                    // action_approval
                    setFieldValue("status_name_th", "", true);
                    setFieldValue("internal_document_id", internal_document_id, true);
                }
            })
    }, [])

    return (
        <>
            {!loggedIn ? <Redirect to="/" /> : null}
            <form style={changeTheam() === true ? { backgroundImage: `url(${BgBlue})`, width: "100vw", height: "130vh" } : {}}>
                <TopContent />
                <TabBar tabNames={tabNames} initialTabID="related_parties">
                    <BottomContent />
                </TabBar>
                <Footer />
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

const initiaLineDocument = {
    internal_item_id: '',
    description: '',
    item_status_id: '',
    remark: ''
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
        // created_by_user_employee_id: '',
        // created_by_admin_employee_id: '',
        checklist_id: '',
        name: '',
        freq: '',
        freq_unit_id: '',
        status_name_th: '',
        created_on: '',
        document_date: '',
        location_district_id: '',
        location_node_id: '',
        location_station_id: '',

        // Bottom
        line_items: initialRowsDocument(),
        remark: '',
        checklist_line_item_use_equipment: initialRowsEquipmentPlan(),

        // Bottom Content ผู้เกี่ยวข้อง
        auditor_name: '',           //ผู้ควบคุมตรวจสอบชื่อ NVARCHAR
        auditor_position_id: '', //ผู้ควบคุมตรวจสอบชื่อ ตำแหน่ง FK_ID
        fixer_name: '',               //ดำเนินการแก้ไขชื่อ  NVARCHAR
        fixer_position_id: '', //ดำเนินการแก้ไขชื่อ ตำแหน่ง FK_ID
        member_1: '',               //รายชื่อเพื่อนร่วมงาน 1 NVARCHAR
        member_1_position_id: '', //รายชื่อเพื่อนร่วมงาน 1 ตำแหน่ง FK_ID
        member_2: '',              //รายชื่อเพื่อนร่วมงาน 2 NVARCHAR
        member_2_position_id: '', //รายชื่อเพื่อนร่วมงาน 2 ตำแหน่ง FK_ID
        member_3: '',             //รายชื่อเพื่อนร่วมงาน 3
        member_3_position_id: '',  //รายชื่อเพื่อนร่วมงาน 3 ตำแหน่ง

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
