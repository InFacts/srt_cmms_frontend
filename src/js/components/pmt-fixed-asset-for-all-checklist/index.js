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
import { FACTS } from '../../redux/modules/api/fact.js';

import { TOOLBAR_MODE, TOOLBAR_ACTIONS } from '../../redux/modules/toolbar.js';

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { changeTheam, getUrlParamsLinkForFixedAsset } from '../../helper.js'
const GoodsReceiptComponent = (props) => {

    const { resetForm, setFieldValue, setValues, values } = useFormikContext();

    useToolbarInitializer(TOOLBAR_MODE.NONE_HOME, DOCUMENT_TYPE_ID.CREATE_CHECKLIST_LINE_ITEM);
    useTokenInitializer();
    useFactInitializer();
    useFooterInitializer(DOCUMENT_TYPE_ID.CREATE_CHECKLIST_LINE_ITEM);
    const loggedIn = useSelector(state => state.token.isLoggedIn);

    const factChecklist = useSelector((state) => ({ ...state.api.fact[FACTS.CHECKLIST] }), shallowEqual);
    const factChecklistLineItem = useSelector((state) => ({ ...state.api.fact[FACTS.CHECKLIST_LINE_ITEM] }), shallowEqual);

    // If Link to this url via Track Document
    useEffect(() => {
        getUrlParamsLinkForFixedAsset()
            .then((checklist_id) => {
                console.log("checklist_id", checklist_id)
                if (checklist_id === "station") { //ถ้าเป็นคลิกตัวสถานีจะ show checklist_id ทั้งหมด ยกเว้น checklost group id ของ คานกั้น
                    let filter_item = [];
                    let items = factChecklist.items;
                    items.map((item) => {
                        if (item.checklist_group_id !== 1) {
                            filter_item.push(item)
                        }
                    })
                    if (filter_item) {
                        setFieldValue("checklist_id", checklist_id, false);
                        setFieldValue("checklist_line_item", filter_item, false)
                        console.log("checklist_line_item", values.checklist_line_item)
                        return;
                    }
                }
                if (checklist_id !== "") {
                    let filter_item = [];
                    let items = factChecklistLineItem.items;
                    items.map((item) => {
                        if (item.checklist_id == checklist_id) {
                            filter_item.push(item)
                        }
                    })
                    setFieldValue("checklist_id", checklist_id, false);
                    setFieldValue("checklist_line_item", filter_item, false)
                    return;
                }
            })
    }, [factChecklistLineItem.items])
    
    return (
        <>
            {!loggedIn ? <Redirect to="/" /> : null}
            <form style={changeTheam() === true ? { backgroundImage: `url(${BgBlue})`, width: "100vw", height: "130vh" } : {}}>
                <TopContent />
                <BottomContent />
                <Footer />
            </form>
        </>
    )
}

const initiaLineEquipmentPlan = {
    description: '',
}
const initialRowsEquipmentPlan = (n = 10) => {
    let rows = [];
    for (var i = 1; i <= n; i++) {
        rows.push({
            ...initiaLineEquipmentPlan,
        });
    }
    return rows;
}

const EnhancedGoodsReceiptComponent = withFormik({
    mapPropsToValues: (props) => ({
        // Field ที่ให้ User กรอก
        // Top Content
        checklist_id: '',
        checklist_group_id: '',

        // Bottom Content
        checklist_line_item: initialRowsEquipmentPlan(),
    })
})(GoodsReceiptComponent);

export default EnhancedGoodsReceiptComponent;
