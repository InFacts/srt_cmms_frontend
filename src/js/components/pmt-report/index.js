import React, { useState, useEffect } from 'react';
import { useFormik, withFormik, useFormikContext } from 'formik';
import { Redirect } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';

import TabBar from '../common/tab-bar';

import TopContent from './top-content';
import BottomContent from './bottom-content';
import Footer from '../common/footer.js';

import { packDataFromValues, DOCUMENT_TYPE_ID, saveDocument } from '../../helper';
import { FACTS } from '../../redux/modules/api/fact.js'

import useToolbarInitializer from '../../hooks/toolbar-initializer';
import useFactInitializer from '../../hooks/fact-initializer';
import useTokenInitializer from '../../hooks/token-initializer';
import useFooterInitializer from '../../hooks/footer-initializer';
import useExportPdfInitializer from '../../hooks/export-pdf-initializer';

import { TOOLBAR_MODE, TOOLBAR_ACTIONS } from '../../redux/modules/toolbar.js';

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { fetchPositionPermissionData, changeTheam } from '../../helper.js'
const ReportS1Component = (props) => {

    const { resetForm, setFieldValue, setValues, values } = useFormikContext();
    const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);
    const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);

    useToolbarInitializer(TOOLBAR_MODE.SEARCH);
    useTokenInitializer();
    useFactInitializer();
    useExportPdfInitializer();
    const loggedIn = useSelector(state => state.token.isLoggedIn);

    useEffect(() => {
        let users = fact[FACTS.USERS].items;
        let user = users.find(user => user.user_id === decoded_token.id); // Returns undefined if not found
        if (user) {
            setFieldValue("district_id", user.position[0].district_id, false)
        }
    }, [decoded_token.has_position, fact[FACTS.USERS]])

    return (
        <>
            {!loggedIn ? <Redirect to="/" /> : null}
            <form style={changeTheam() === true ? { backgroundImage: `url(${BgBlue})`, width: "100vw", height: "140vh" } : {}}>
                <TopContent />
                <BottomContent />
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
        head_table: [],
        checklist_name_unique: [],
        // Field ที่ให้ User กรอก
        district_id: -1,
        line_items: [],
        year_id: now_date.getFullYear() + 543,
        mouth_id: now_date.getMonth(),

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