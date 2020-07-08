import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import { useFormik, withFormik, useFormikContext } from 'formik';
import TabBar from '../common/tab-bar';
import TopContent from './top-content';
import BottomContent from './bottom-content';
import Footer from '../common/footer.js';
import useToolbarInitializer from '../../hooks/toolbar-initializer';
import useFactInitializer from '../../hooks/fact-initializer';
import useTokenInitializer from '../../hooks/token-initializer';
import useFooterInitializer from '../../hooks/footer-initializer';
import useDocumentSubscription from '../../hooks/document-subscription';
import useNavBottomStatusInitializer from '../../hooks/nav-bottom-status-initializer';

import { TOOLBAR_MODE, TOOLBAR_ACTIONS } from '../../redux/modules/toolbar.js';
import { DOCUMENT_TYPE_ID, getUrlParamsLink } from '../../helper';

import { footerToModeSearch } from '../../redux/modules/footer.js';

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { changeTheam } from '../../helper.js'
const MaintenantItemComponent = () => {
    const { resetForm, setFieldValue, setValues, values } = useFormikContext();
    const dispatch = useDispatch();
    const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);
    const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);

    useToolbarInitializer(TOOLBAR_MODE.SEARCH, DOCUMENT_TYPE_ID.MAINTENANT_ITEM);
    useTokenInitializer();
    useFactInitializer();
    useFooterInitializer(DOCUMENT_TYPE_ID.MAINTENANT_ITEM);
    useDocumentSubscription();
    useNavBottomStatusInitializer();

    const loggedIn = useSelector(state => state.token.isLoggedIn);
    // Initial tabbar & set default active
    const [tabNames, setTabNames] = useState([
        { id: "broken", name: "รายการอะไหล่" },
        { id: "attachment", name: "แนบไฟล์" },
        { id: "table_status", name: "สถานะเอกสาร" },
    ]);

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
                <TabBar tabNames={tabNames} initialTabID="broken">
                    <BottomContent />
                </TabBar>
                <Footer />
            </form>
        </>
    )
}

// For รายการอะไหล่่
const initialLossLineItem = {
    document_id: '', // maybe not needed
    line_number: '',
    list_uoms: [],

    // === Field ที่ให้ User กรอก ===
    internal_item_id: '',
    description: '',   // รายการ
    no_item: '',     //เลขที่สินทรัพย์
    uom_id: '',
    quantity_damaged: '',
    quantity_used: '',
    quantity_salvage: '',
    remark: '',
}
const initialRows = (n = 10) => {
    let rows = [];
    for (var i = 1; i <= n; i++) {
        rows.push({
            ...initialLossLineItem,
            line_number: i
        });
    }
    return rows;
}

const EnhancedMaintenantItemComponent = withFormik({
    mapPropsToValues: () => ({
        // === Field ที่ให้ User กรอก ===
        // Top Content  
        internal_document_id: '',       // เลขที่เอกสาร
        created_by_user_employee_id: '', // ผู้ดำเนินเรื่อง (Default === admin_employee_id)
        created_by_admin_employee_id: '',  //ผู้สร้างเอกสาร (Field ที่ไม่ได้กรอก)

        status_name_th: '',              // TODO doesn't have (Field ที่ไม่ได้กรอก)
        created_on: '',                  // TODO doesn't have (Field ที่ไม่ได้กรอก)
        document_date: '',              // วันที่ออกเอกสาร (Default === NOW )
        refer_to_document_internal_id: '',    // อ้างอิงเอกสาร
        refer_to_document_id: '',
        // Bottom Content
        line_items: initialRows(),          // รายการอะไหล่
        remark: '',                      // หมายเหตุ  NVARCHAR

        files: [],

        document_status_id: '', // ?
        step_approve: [],               // (Field ที่ไม่ได้กรอก)

        //Field ที่ไม่ได้ display
        document_id: '', // changes when document is displayed (internal_document_id field validation)

        division_id: '',
        district_id: '',
        node_id: ''
    })
})(MaintenantItemComponent);

export default EnhancedMaintenantItemComponent;