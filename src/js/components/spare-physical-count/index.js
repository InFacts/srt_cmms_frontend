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

import {packDataFromValues, DOCUMENT_TYPE_ID, saveDocument} from '../../helper';

import useToolbarInitializer from '../../hooks/toolbar-initializer';
import useFactInitializer from '../../hooks/fact-initializer';
import useTokenInitializer from '../../hooks/token-initializer';
import useFooterInitializer from '../../hooks/footer-initializer';

import {  TOOLBAR_MODE,TOOLBAR_ACTIONS } from '../../redux/modules/toolbar.js';

const GoodsReceiptComponent = (props) => {
    
    const {resetForm, setFieldValue, setValues, values} = useFormikContext();

    // Initial tabbar & set default active
    const [tabNames, setTabNames] = useState([
        {id:"listItem", name:"รายการ"},
        {id:"attachment", name:"แนบไฟล์"},
        {id:"table_status", name:"สถานะเอกสาร"},
    ]);

    useToolbarInitializer(TOOLBAR_MODE.SEARCH);
    useTokenInitializer();
    useFactInitializer();
    useFooterInitializer(DOCUMENT_TYPE_ID.PHYSICAL_COUNT);

    // If Link to this url via Track Document
    useEffect(() => {
        let url = window.location.search;
        console.log("URL IS", url)
        const urlParams = new URLSearchParams(url);
        const internal_document_id = urlParams.get('internal_document_id');
        if (internal_document_id !== "") {
            // action_approval
            console.log(" IA M NOT SETTING ", internal_document_id);
            console.log(" THIS IS CURRENT VALUES ", values);
            setFieldValue("internal_document_id", internal_document_id, true);
            console.log(" THIS IS AFTER VALUES ", values);
        }
    }, [])

    return (
        <form onSubmit={props.handleSubmit}>
        {/* <form onSubmit={(e) => { if (window.confirm('คุณต้องการบันทึกใช่หรือไม่')) handleSubmit(e) }}> */}
            <TopContent />
            <TabBar tabNames={tabNames} initialTabID="listItem">
                <BottomContent />
            </TabBar>
            <Footer />
        </form>

    )
}
const initialLineItem = {
    internal_item_id: '',
    quantity: '',
    uom_id: '',
    per_unit_price: '',
    // item_id: '',
    item_status_id: 1,
    
    //Field ที่ไม่ได้กรอก
    description: '',
    line_number: '',
    // document_id: '', // maybe not needed
    list_uoms: [],
}
const initialRows = (n=10) => {
    let rows = [];
    for (var i = 1; i <= n; i++) {
        rows.push({
            ...initialLineItem, 
            line_number: i
        });
    }
    return rows;
}


const EnhancedGoodsReceiptComponent = withFormik({
    mapPropsToValues: (props) => ({ 
        // Field ที่ให้ User กรอก
        internal_document_id: '',
        document_date: '',
        dest_warehouse_id: 0, // Need to fill for user's own WH
        src_warehouse_id: '', // for Goods Receipt
        created_by_user_employee_id: '',
        refer_to_document_name: '',
        remark: '',
        line_items: initialRows(),

        file: [],
    
        //Field ที่ไม่ได้กรอก
        
        created_on: '',
        status_name_th: '',
        document_status_id: '',
        created_by_admin_employee_id: '',

        //Field ที่ไม่ได้ display
        document_id: '', // changes when document is displayed (internal_document_id field validation)

        // For Attactment
        desrciption_files_length: '',
        desrciption_files: [],
        // For Step Approval
        step_approve: [],
    }),
    validate: (values, props) => {
        const errors = {};

        // Internal Document ID
        //  {DocumentTypeGroupAbbreviation}-{WH Abbreviation}-{Year}-{Auto Increment ID}
        //  ie. GR-PYO-2563/0001
        // let internalDocumentIDRegex = /^(GP|GT|GR|GU|GI|IT|GX|GF|PC|IA|SR|SS)-[A-Z]{3}-\d{4}\/\d{4}$/g
        // let draftInternalDocumentIDRegex= /^draft-\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b$/g
        // if (!values.internal_document_id) {
        //     errors.internal_document_id = 'Required';
        // }else if (!internalDocumentIDRegex.test(values.internal_document_id)){ //&& !draftInternalDocumentIDRegex.text(values.internal_document_id)
        //     errors.internal_document_id = 'Invalid Document ID Format\nBe sure to use the format ie. GR-PYO-2563/0001'
        // }
        // MOVED TO FIELD
        if (!values.document_date){
            errors.document_date = "Required";
        }
        return errors;
    },
    handleSubmit: (values, formikBag) => new Promise ((resolve, reject) => { //handle Submit will just POST the Empty Document and PUT information inside
        let data = packDataFromValues(formikBag.props.fact, values, DOCUMENT_TYPE_ID.PHYSICAL_COUNT);
        console.log("I AM SUBMITTING ", data );
        saveDocument(DOCUMENT_TYPE_ID.PHYSICAL_COUNT, data)
        .then((document_id) => {
            formikBag.setFieldValue('document_id', document_id, false);
            return resolve(document_id); // Document_id is not passed on in submitForm, only Promise for isSubmitting https://jaredpalmer.com/formik/docs/api/withFormik#handlesubmit-values-values-formikbag-formikbag--void--promiseany
        })
        .catch((err) => {
            return reject(err)
        })
      }),    
    // validateOnChange: false,
})(GoodsReceiptComponent);



const mapStateToProps = (state) => ({
    toolbar: state.toolbar,
    // decoded_token: state.token.decoded_token,
    fact: state.api.fact,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedGoodsReceiptComponent);