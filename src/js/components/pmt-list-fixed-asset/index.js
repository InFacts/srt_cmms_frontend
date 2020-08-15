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

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { changeTheam } from '../../helper.js'
const GoodsReceiptComponent = (props) => {

    const { resetForm, setFieldValue, setValues, values } = useFormikContext();

    useToolbarInitializer(TOOLBAR_MODE.NONE_HOME, DOCUMENT_TYPE_ID.CREATE_CHECKLIST_LINE_ITEM);
    useTokenInitializer();
    useFactInitializer();
    useFooterInitializer(DOCUMENT_TYPE_ID.CREATE_CHECKLIST_LINE_ITEM);
    const loggedIn = useSelector(state => state.token.isLoggedIn);

    return (
        <>
            {!loggedIn ? <Redirect to="/" /> : null}
            <form style={changeTheam() === true ? { backgroundImage: `url(${BgBlue})`, width: "100vw", height: "130vh" } : {}}>
                <TopContent />
                <BottomContent />
                <Footer setFieldValue={setFieldValue}/>
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

const EnhancedGoodsReceiptComponent = withFormik({
    mapPropsToValues: (props) => ({
        // Field ที่ให้ User กรอก
        // Top Content

        year_id: now_date.getFullYear() + 543,
        mouth_id: now_date.getMonth() + 1,

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
        // Bottom Content
        list_documents: []
    })
})(GoodsReceiptComponent);

export default EnhancedGoodsReceiptComponent;
