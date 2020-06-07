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
    // useFooterInitializer(DOCUMENT_TYPE_ID.GOODS_RECEIPT_PO);

    // If Link to this url via Track Document
    // useEffect(() => {
    //     let url = window.location.search;
    //     console.log("URL IS", url)
    //     const urlParams = new URLSearchParams(url);
    //     const internal_document_id = urlParams.get('internal_document_id');
    //     if (internal_document_id !== "") {
    //         // action_approval
    //         console.log(" IA M NOT SETTING ", internal_document_id);
    //         setFieldValue("internal_document_id", internal_document_id, true);
    //     }
    // }, [])

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
// const initialLineItem = {
//     internal_item_id: '',
//     quantity: '',
//     uom_id: '',
//     per_unit_price: '',
//     // item_id: '',
//     item_status_id: 1,
    
//     //Field ที่ไม่ได้กรอก
//     description: '',
//     line_number: '',
//     // document_id: '', // maybe not needed
//     list_uoms: [],
// }
// const initialRows = (n=10) => {
//     let rows = [];
//     for (var i = 1; i <= n; i++) {
//         rows.push({
//             ...initialLineItem, 
//             line_number: i
//         });
//     }
//     return rows;
// }


const EnhancedGoodsReceiptComponent = withFormik({
    mapPropsToValues: (props) => ({ 
        // Field ที่ให้ User กรอก
        internal_item_id: '',
        description: '',
        item_type_name: '',
        
        item_type_id: '',
        item_group_id: '',
        uom_group_id: '',       //UOM
        name: '',               //UOM ตัวย่อ
        abbreviation: '',       //UOM
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
    }),
    // validate: (values, props) => {
    //     const errors = {};

    //     if (!values.document_date){
    //         errors.document_date = "Required";
    //     }
    //     return errors;
    // },
    // handleSubmit: (values, formikBag) => new Promise ((resolve, reject) => { //handle Submit will just POST the Empty Document and PUT information inside
    //     let data = packDataFromValues(formikBag.props.fact, values, DOCUMENT_TYPE_ID.GOODS_RECEIPT_PO);
    //     console.log("I AM SUBMITTING ", data );
    //     saveDocument(DOCUMENT_TYPE_ID.GOODS_RECEIPT_PO, data)
    //     .then((document_id) => {
    //         formikBag.setFieldValue('document_id', document_id, false);
    //         return resolve(document_id); // Document_id is not passed on in submitForm, only Promise for isSubmitting https://jaredpalmer.com/formik/docs/api/withFormik#handlesubmit-values-values-formikbag-formikbag--void--promiseany
    //     })
    //     .catch((err) => {
    //         return reject(err)
    //     })
    //   }),    
    // // validateOnChange: false,
})(GoodsReceiptComponent);



const mapStateToProps = (state) => ({
    toolbar: state.toolbar,
    fact: state.api.fact,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedGoodsReceiptComponent);