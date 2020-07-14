import React, { useState, useEffect } from 'react';
import { useFormik, withFormik, useFormikContext } from 'formik';
import { Redirect } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';

import TabBar from '../common/tab-bar';

import TopContent from './top-content';
import BottomContent from './bottom-content';
import Footer from '../common/footer.js';

import { packDataFromValues, DOCUMENT_TYPE_ID, saveDocument } from '../../helper';

import useToolbarInitializer from '../../hooks/toolbar-initializer';
import useFactInitializer from '../../hooks/fact-initializer';
import useTokenInitializer from '../../hooks/token-initializer';
import useFooterInitializer from '../../hooks/footer-initializer';
import useExportPdfInitializer from '../../hooks/export-pdf-initializer';

import { TOOLBAR_MODE, TOOLBAR_ACTIONS } from '../../redux/modules/toolbar.js';

import BgRed from '../../../images/spare/bg_red.jpg';
import { fetchPositionPermissionData, changeTheam } from '../../helper.js'
const ReportS1Component = (props) => {

    const { resetForm, setFieldValue, setTouched ,setFieldTouched , touched, setValues, validateField, values } = useFormikContext();
    const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);

    // Initial tabbar & set default active
    const [tabNames, setTabNames] = useState([
        { id: "listItem", name: "รายการ" },
    ]);

    useToolbarInitializer(TOOLBAR_MODE.SEARCH);
    useTokenInitializer();
    useFactInitializer();
    useExportPdfInitializer();
    const loggedIn = useSelector(state => state.token.isLoggedIn);

    useEffect(() => {
        setFieldValue("src_warehouse_id", decoded_token.has_position && decoded_token.has_position[0].warehouse_id, true)
    }, [decoded_token.has_position])

    return (
        <>
            {!loggedIn ? <Redirect to="/" /> : null}
            <form style={changeTheam() === true ? { backgroundImage: `url(${BgRed})`, width: "100vw", height: "140vh" } : {}}>
                <TopContent />
                <TabBar tabNames={tabNames} initialTabID="listItem">
                    <BottomContent />
                </TabBar>
                <Footer />
            </form>
        </>
    )
}

const initialLineYears = (n = 10) => {
    var new_date = new Date();
    var start_year = new_date.getFullYear() + 543; //ปีปัจุบัน(ค.ศ.) + 543(แปลงเป็น พ.ศ.) - 10(ย้อนหลังสิบปี) 
    let rows_year = [
        {
            year_id: start_year
        }
    ];
    for (var i = 1; i <= n; i++) {
        start_year = start_year - 1
        rows_year.push({
            year_id: start_year
        });
    }
    return rows_year;
}

var now_date = new Date();
const EnhancedReportS1Component = withFormik({
    mapPropsToValues: (props) => ({
        // Field ที่ให้ User กรอก
        internal_item_id: '',
        warehouse_type_id: -1,
        src_warehouse_id: '',
        item_status_id: 1,
        line_items: [],
        year_id: now_date.getFullYear() + 543,
        mouth_id: now_date.getMonth() + 1,

        new_line_items: [],
        // Field ที่ให้ User ไม่ได้กรอก
        year: initialLineYears(),
        mouth: [
            {
                id: 1,
                mouth: "มกราคม"
            },
            {
                id: 2,
                mouth: "กุมภาพันธ์"
            },
            {
                id: 3,
                mouth: "มีนาคม"
            },
            {
                id: 4,
                mouth: "เมษายน "
            },
            {
                id: 5,
                mouth: "พฤษภาคม"
            },
            {
                id: 6,
                mouth: "มิถุนายน"
            },
            {
                id: 7,
                mouth: "กรกฎาคม"
            },
            {
                id: 8,
                mouth: "สิงหาคม"
            },
            {
                id: 9,
                mouth: "กันยายน"
            },
            {
                id: 10,
                mouth: "ตุลาคม"
            },
            {
                id: 11,
                mouth: "พฤศจิกายน"
            },
            {
                id: 12,
                mouth: "ธันวาคม"
            }
        ],

    }),
})(ReportS1Component);

export default EnhancedReportS1Component;