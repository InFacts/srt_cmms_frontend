import React, {useState, useEffect} from 'react';
import { useFormik , withFormik ,useFormikContext} from 'formik';
import { Redirect } from 'react-router-dom';
import { useSelector  } from 'react-redux';

import TabBar from '../common/tab-bar';


import TopContent from './top-content';
import BottomContent from './bottom-content';
import Footer from '../common/footer.js';

import {packDataFromValues, DOCUMENT_TYPE_ID, saveDocument} from '../../helper';

import useToolbarInitializer from '../../hooks/toolbar-initializer';
import useFactInitializer from '../../hooks/fact-initializer';
import useTokenInitializer from '../../hooks/token-initializer';
import useFooterInitializer from '../../hooks/footer-initializer';

import {  TOOLBAR_MODE,TOOLBAR_ACTIONS } from '../../redux/modules/toolbar.js';

const GoodsReturnComponent = (props) => {
    
    const {resetForm, setFieldValue, setValues, values} = useFormikContext();

    // Initial tabbar & set default active
    const [tabNames, setTabNames] = useState([
        {id:"listItem", name:"รายการ"},
    ]);

    useToolbarInitializer(TOOLBAR_MODE.NONE_HOME);
    useFactInitializer();
    const loggedIn = useSelector(state => state.token.isLoggedIn); 

    return (
        <>
            {!loggedIn ? <Redirect to="/" /> : null}
            <TopContent />
            <TabBar tabNames={tabNames} initialTabID="listItem">
                <BottomContent />
            </TabBar>
            <Footer />
        </>
    )
}

const initialLineYears = (n=10) => {
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

const EnhancedGoodsReturnComponent = withFormik({
    mapPropsToValues: (props) => ({ 
        // Field ที่ให้ User กรอก
        internal_document_id: '',
        internal_item_id: '',
        src_warehouse_id: '', 
        item_status_id: '',
        document_date: '', 
        line_items: [],
        year_id: 0,
        mouth_id: 0,
        
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
})(GoodsReturnComponent);

export default EnhancedGoodsReturnComponent;