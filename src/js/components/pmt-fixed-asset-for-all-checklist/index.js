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
import useExportPdfInitializer from '../../hooks/export-pdf-initializer';

import { FACTS } from '../../redux/modules/api/fact.js';

import { TOOLBAR_MODE, TOOLBAR_ACTIONS } from '../../redux/modules/toolbar.js';

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { changeTheam, getUrlParamsLinkForFixedAsset } from '../../helper.js'
const GoodsReceiptComponent = (props) => {

    const { resetForm, setFieldValue, setValues, values } = useFormikContext();

    useToolbarInitializer(TOOLBAR_MODE.REPORT);
    useTokenInitializer();
    useFactInitializer();
    useExportPdfInitializer();
    useFooterInitializer(DOCUMENT_TYPE_ID.WORK_ORDER_CHECKLIST);
    const loggedIn = useSelector(state => state.token.isLoggedIn);

    const factChecklist = useSelector((state) => ({ ...state.api.fact[FACTS.CHECKLIST] }), shallowEqual);
    const factChecklistLineItem = useSelector((state) => ({ ...state.api.fact[FACTS.CHECKLIST_LINE_ITEM] }), shallowEqual);

    // If Link to this url via Track Document
    useEffect(() => {
        if (props.location.aboutProps) {
            if (props.location.aboutProps.station_id) {
                console.log("I AM STATION")
                let checklist_line_item = [];
                setFieldValue("document_id", props.location.aboutProps.document_id, false);
                setFieldValue("checklist_name", props.location.aboutProps.checklist_name, false);
                setFieldValue("checklist_id", props.location.aboutProps.checklist_id, false);
                setFieldValue("station_id", props.location.aboutProps.station_id, false);
                setFieldValue("weekly_task_id", props.location.aboutProps.weekly_task_id, false);
                setFieldValue("internal_document_id", props.location.aboutProps.internal_document_id, false);
                setFieldValue("checkBooleanForEdit", props.location.aboutProps.checkBooleanForEdit, false);
                setFieldValue("toolbar_mode", props.location.aboutProps.toolbar_mode, false);

                props.location.aboutProps.work_order_pm_has_selector_checklist_line_item.map((list, index) => {
                    // console.log("list", list)
                    if (values.weekly_task_id === list.weekly_task_id) {
                        checklist_line_item.push({
                            ...list,
                        })
                    }
                })
                setFieldValue("checklist_line_item", props.location.aboutProps.work_order_pm_has_selector_checklist_line_item, false)
            } else {
                console.log("I AM EQUIPMENT")
                let checklist_line_item = [];

                setFieldValue("document_id", props.location.aboutProps.document_id, false);
                setFieldValue("checklist_id", props.location.aboutProps.checklist_id, false);
                setFieldValue("weekly_task_id", props.location.aboutProps.weekly_task_id, false);
                setFieldValue("internal_document_id", props.location.aboutProps.internal_document_id, false);
                setFieldValue("checkBooleanForEdit", props.location.aboutProps.checkBooleanForEdit, false);
                setFieldValue("toolbar_mode", props.location.aboutProps.toolbar_mode, false);

                props.location.aboutProps.work_order_pm_has_selector_checklist_line_item.map((list, index) => {
                    if (values.checklist_id === list.checklist_id && values.weekly_task_id === list.weekly_task_id) {
                        checklist_line_item.push({
                            ...list,
                        })
                    }
                })
                console.log("checklist_line_item", checklist_line_item)
                setFieldValue("checklist_line_item", checklist_line_item, false)
            }
        }

    }, [factChecklistLineItem.items, values.document_id])
    // console.log("props>>>", props.location.aboutProps)
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
        document_id: '',
        internal_document_id: '',
        checklist_id: '',
        checklist_group_id: '',
        checkBooleanForEdit: '',
        toolbar_mode: '',
        // Bottom Content
        checklist_line_item: initialRowsEquipmentPlan(),
        remark_approval: "",
        modeEdit: true
    })
})(GoodsReceiptComponent);

export default EnhancedGoodsReceiptComponent;
