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

const EquipmentInstallationComponent = (props) => {

    useToolbarInitializer(TOOLBAR_MODE.SEARCH);
    useTokenInitializer();
    useFactInitializer();
    useFooterInitializer(DOCUMENT_TYPE_ID.GOODS_ISSUE);
    useDocumentSubscription();
    const loggedIn = useSelector(state => state.token.isLoggedIn); 

    // Initial tabbar & set default active
    const [tabNames, setTabNames] = useState([
        {id:"general", name:"ทั่วไป"},
        {id:"location", name:"สถานที่ติดตั้ง"},
        {id:"attachment", name:"แนบไฟล์"},
        {id:"table_status", name:"สถานะเอกสาร"},
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


const EnhancedEquipmentInstallationComponent = withFormik({
    mapPropsToValues: (props) => ({ 
        // Field ที่ให้ User กรอก
        // Top Content
        internal_document_id: '',       // เลขที่เอกสาร
        created_by_user_employee_id: '', // ผู้ดำเนินเรื่อง (Default === admin_employee_id)
        created_by_admin_employee_id: '',  //ผู้สร้างเอกสาร (Field ที่ไม่ได้กรอก)
        equipment_internal_id: '',  // เลขที่สินทรัพย์

        status_name_th: '',              // TODO doesn't have (Field ที่ไม่ได้กรอก)
        created_on: '',                  // TODO doesn't have (Field ที่ไม่ได้กรอก)
        document_date: '',              // วันที่ออกเอกสาร (Default === NOW )
        

        // Bottom Content
        location_district_id: '',        // สถานที่ แขวง  [รายงานการตรวจซ่อมอุปกรณ์แขวง] FK_ID
        location_node_id: '',            // สถานที่ ตอน   [ที่ตั้งอุปกรณ์ที่ทำการตรวจซ่อม (สถานที่/ที่ตั้ง)] FK_ID
        location_station_id: '',         // สถานที่ สถานี  FK_ID

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
})(EquipmentInstallationComponent);

export default EnhancedEquipmentInstallationComponent;
