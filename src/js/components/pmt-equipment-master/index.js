import React, {useState, useEffect} from 'react';
import { useFormik , withFormik ,useFormikContext} from 'formik';
import { Redirect } from 'react-router-dom';
import { useSelector  } from 'react-redux'

import TabBar from '../common/tab-bar';

import TopContent from './top-content';
import BottomContent from './bottom-content';
import Footer from '../common/footer.js';

import {packDataFromValues, DOCUMENT_TYPE_ID, saveDocument} from '../../helper';

import useToolbarInitializer from '../../hooks/toolbar-initializer';
import useFactInitializer from '../../hooks/fact-initializer';
import useTokenInitializer from '../../hooks/token-initializer';
import useFooterInitializer from '../../hooks/footer-initializer';
import useDocumentSubscription from '../../hooks/document-subscription';

import {  TOOLBAR_MODE,TOOLBAR_ACTIONS } from '../../redux/modules/toolbar.js';

const EquipmentMasterDataComponent = (props) => {

    useToolbarInitializer(TOOLBAR_MODE.SEARCH);
    useTokenInitializer();
    useFactInitializer();
    useFooterInitializer(DOCUMENT_TYPE_ID.EQUIPMENT_MASTER_DATA); // TODO Need to not be document type group id, and need to not check for values.document_id since this is not a document. 
    useDocumentSubscription();
    const loggedIn = useSelector(state => state.token.isLoggedIn); 

    // Initial tabbar & set default active
    const [tabNames, setTabNames] = useState([
        {id:"general", name:"ทั่วไป"},
        {id:"equipment_list", name:"รายการสินทรัพย์"},
        {id:"maintenance_plan", name:"แผนการบำรุงรักษา"},
        {id:"attachment", name:"แนบไฟล์"},
    ]);

    return (
        <>
        {!loggedIn ? <Redirect to="/" /> : null}
        <form>
            <TopContent />
            <TabBar tabNames={tabNames} initialTabID="general">
                <BottomContent />
            </TabBar>
            <Footer />
        </form>
        </>
    )
}


const EnhancedEquipmentMasterDataComponent = withFormik({
    mapPropsToValues: (props) => ({ 
        // Field ที่ให้ User กรอก
        // Top Content
        internal_equipment_id: '',       // เลขที่สิ่งของ NVARCHAR
        description: '', // รายละเอียด NVARCHAR
        internal_item_id: '',  //เลขที่อะไหล่ NVARCHAR
        equipment_group_id: '',  // กลุ่มของสินทรัพย์ FK_ID

        status_name_th: '',              // TODO doesn't have (Field ที่ไม่ได้กรอก)
        created_on: '',                  // TODO doesn't have (Field ที่ไม่ได้กรอก)
        document_date: '',              // วันที่ออกเอกสาร (Default === NOW )
        

        // Bottom Content
        uom_abbreviation: '',        // ชื่อย่อหน่วยนับ NVARCHAR
        uom_name: '',                 // ชื่อหน่วยนับ NVARCHAR (Field ที่ไม่ได้กรอก)

        annual_depreciation: '',         // ค่าเสื่อมต่อปี FLOAT
        depreciation_type: '', 
        active: '', 

        responsible_person_district: '',        // ผู้รับผิดชอบสถานที่ แขวง STRING
        responsible_person_node: '',            // ผู้รับผิดชอบสถานที่ ตอน  STRING
        responsible_person_station: '',         // ผู้รับผิดชอบสถานที่ สถานี  STRING


        install_date: '',              // วันที่ติดตั้งเสร็จ (Default === NOW )
        announce_date: '',             // วันที่ประกาศใช้ (Default === NOW )

        // Location Content
        install_address: '',           // ที่อยู่ String
        install_district: '',          // แขวง String
        install_county: '',             // เขต String
        install_postal_code: '',       //เลขไปรษณีย์ String
        install_google_map: '',        //เลขไปรษณีย์ String

        
        // line_items: initialRows(),
        remark: '',                      // หมายเหตุ  NVARCHAR

        file: [],
    
        //Field ที่ไม่ได้กรอก
        document_status_id: '', // ?
        step_approve: [],               // (Field ที่ไม่ได้กรอก)

        //Field ที่ไม่ได้ display
        document_id: '', // changes when document is displayed (internal_document_id field validation)
    }),
    validate: (values, props) => {
        const errors = {};
        if (!values.document_date){
            errors.document_date = "Required";
        }
        return errors;
    },
})(EquipmentMasterDataComponent);

export default EnhancedEquipmentMasterDataComponent;
