import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { useFormik , withFormik ,useFormikContext} from 'formik';

import TabBar from '../common/tab-bar';

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import TopContent from './top-content';
import BottomContent from './bottom-content';
import Footer from '../common/footer.js';

import {DOCUMENT_TYPE_ID, saveDocument} from '../../helper';

import useToolbarInitializer from '../../hooks/toolbar-initializer';
import useFactInitializer from '../../hooks/fact-initializer';
import useTokenInitializer from '../../hooks/token-initializer';
import useFooterInitializer from '../../hooks/footer-initializer';

import {  TOOLBAR_MODE,TOOLBAR_ACTIONS } from '../../redux/modules/toolbar.js';

const GoodsReceiptComponent = (props) => {
    
    const {resetForm, setFieldValue, setValues, values} = useFormikContext();

    // Initial tabbar & set default active
    const [tabNames, setTabNames] = useState([
        {id:"general", name:"ทั่วไป"},
        {id:"warehouse", name:"คลัง"},
        {id:"attachment", name:"แนบไฟล์"},
    ]);

    useToolbarInitializer(TOOLBAR_MODE.SEARCH);
    useTokenInitializer();
    useFactInitializer();
    useFooterInitializer();

    return (
        <form onSubmit={props.handleSubmit}>
            <TopContent />
            <TabBar tabNames={tabNames} initialTabID="general">
                <BottomContent />
            </TabBar>
            <Footer />
        </form>

    )
}

const EnhancedGoodsReceiptComponent = withFormik({
    mapPropsToValues: (props) => ({ 
        // Field ที่ให้ User กรอก
        internal_item_id: '',
        description: '',
        item_type_name: '',
        
        item_type_id: '',
        item_group_id: '',
        uom_group_id: '',       
        uom_id: '',           //UOM 
        uom_name: '',       //UOM ตัวเต็ม
        uom_abbreviation: '',       //UOM ตัวย่อ
        minimum_order_quantity: '',  //ขั้นต่ำการสั่งซื้อ
        lead_time: '',
        tolerance_time: '',
        quantity_required: '',  //จำนวนที่ต้องการ
        quantity_lowest: '',    //ขั้นต่ำ
        quantity_highest: '',   //ขั้นสูง
        remark: '', 
        goods_onhand: [],       //อะไหล่ที่มีอยู่ในทุกคลัง
        active: ''  ,            //สถานะอะไหล่ ปิด เปิด

         //Field ที่ไม่ได้กรอก
        list_uoms: [],
        line_items: [],
        file: [],

        // NOT USE FOR FOOTER
        step_approve: [],
        created_by_admin_employee_id: '',

        //Field ที่ไม่ได้ display
        document_id: '', // changes when document is displayed (internal_document_id field validation)

        // For Attactment
        desrciption_files_length: '',
        desrciption_files: [],
    })
})(GoodsReceiptComponent);

const mapStateToProps = (state) => ({
    toolbar: state.toolbar,
    fact: state.api.fact,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedGoodsReceiptComponent);