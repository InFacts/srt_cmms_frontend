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
import useDocumentSubscription from '../../hooks/document-subscription';
import useNavBottomStatusInitializer from '../../hooks/nav-bottom-status-initializer';

import { TOOLBAR_MODE, TOOLBAR_ACTIONS } from '../../redux/modules/toolbar.js';

import { footerToModeSearch } from '../../redux/modules/footer.js';

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { changeTheam, getUrlParamsLink } from '../../helper.js'
const GoodsReceiptComponent = (props) => {
    const { resetForm, setFieldValue, setValues, values } = useFormikContext();
    const dispatch = useDispatch();

    // Initial tabbar & set default active
    const [tabNames, setTabNames] = useState([
        { id: "w1", name: "สัปดาห์ที่ 1" },
        { id: "w2", name: "สัปดาห์ที่ 2" },
        { id: "w3", name: "สัปดาห์ที่ 3" },
        { id: "w4", name: "สัปดาห์ที่ 4" },
        { id: "attachment", name: "แนบไฟล์" },
        { id: "table_status", name: "สถานะเอกสาร" }
    ]);

    useToolbarInitializer(TOOLBAR_MODE.SEARCH, DOCUMENT_TYPE_ID.SELECTOR);
    useTokenInitializer();
    useFactInitializer();
    useDocumentSubscription();
    useNavBottomStatusInitializer();
    useFooterInitializer(DOCUMENT_TYPE_ID.SELECTOR);

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
                <TabBar tabNames={tabNames} initialTabID="w1">
                    <BottomContent />
                </TabBar>
                <Footer />
            </form>
        </>
    )
}

// Week one
const initialLineW1 = {
    station_id: '',
    checklist_id: '',
}
const initialRowsW1 = (n = 10) => {
    let rows = [];
    for (var i = 1; i <= n; i++) {
        rows.push({
            ...initialLineW1,
        });
    }
    return rows;
}

// Week two
const initialLineW2 = {
    station_id: '',
    checklist_id: '',
}
const initialRowsW2 = (n = 10) => {
    let rows = [];
    for (var i = 1; i <= n; i++) {
        rows.push({
            ...initialLineW2,
        });
    }
    return rows;
}

// Week three
const initialLineW3 = {
    station_id: '',
    checklist_id: '',
}
const initialRowsW3 = (n = 10) => {
    let rows = [];
    for (var i = 1; i <= n; i++) {
        rows.push({
            ...initialLineW3,
        });
    }
    return rows;
}

// Week four
const initialLineW4 = {
    station_id: '',
    checklist_id: '',
}
const initialRowsW4 = (n = 10) => {
    let rows = [];
    for (var i = 1; i <= n; i++) {
        rows.push({
            ...initialLineW4,
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
        district_id: '',
        node_id: '',
        station_id: '',

        // Bottom
        w1_list: initialRowsW1(),
        w2_list: initialRowsW2(),
        w3_list: initialRowsW3(),
        w4_list: initialRowsW4(),

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
