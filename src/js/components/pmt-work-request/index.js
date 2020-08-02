import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux'

import { useFormik , withFormik ,useFormikContext} from 'formik';

import TabBar from '../common/tab-bar';

import TopContent from './top-content';
import BottomContent from './bottom-content';
import Footer from '../common/footer.js';

import useToolbarInitializer from '../../hooks/toolbar-initializer';
import useFactInitializer from '../../hooks/fact-initializer';
import useTokenInitializer from '../../hooks/token-initializer';
import useFooterInitializer from '../../hooks/footer-initializer';
import useDocumentSubscription from '../../hooks/document-subscription';
import useNavBottomStatusInitializer from '../../hooks/nav-bottom-status-initializer';

import {  TOOLBAR_MODE,TOOLBAR_ACTIONS } from '../../redux/modules/toolbar.js';
import { DOCUMENT_TYPE_ID, getUrlParamsLink} from '../../helper';

import { footerToModeSearch } from '../../redux/modules/footer.js';

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { changeTheam } from '../../helper.js'
const WorkRequestComponent = () => {
    const { resetForm, setFieldValue, setValues, values } = useFormikContext();
    const dispatch = useDispatch();

    useToolbarInitializer(TOOLBAR_MODE.SEARCH, DOCUMENT_TYPE_ID.WORK_REQUEST);
    useTokenInitializer();
    useFactInitializer();
    useFooterInitializer(DOCUMENT_TYPE_ID.WORK_REQUEST);
    useDocumentSubscription();
    useNavBottomStatusInitializer();
    const loggedIn = useSelector(state => state.token.isLoggedIn); 

    // Initial tabbar & set default active
    const [tabNames, setTabNames] = useState([
        {id:"broken", name:"อาการเสีย"},
        {id:"attachment", name:"แนบไฟล์"},
        {id:"table_status", name:"สถานะเอกสาร"},
    ]);

    useEffect(() => {
        dispatch(footerToModeSearch());
    }, []);

        // If Link to this url via Track Document
        useEffect(() => {
            getUrlParamsLink()
                .then((internal_document_id) => {
                if (internal_document_id !== "") {
                    // action_approval
                    setFieldValue("status_name_th", "", true);
                    setFieldValue("internal_document_id", internal_document_id, true);
                }
            })
        }, [])

    return (
        <>
            {!loggedIn ? <Redirect to="/" /> : null}
          <form style={changeTheam() === true ? { backgroundImage: `url(${BgBlue})`, width: "100vw", height: "130vh" } : {}}>
             <TopContent />
             <TabBar tabNames={tabNames} initialTabID="broken">
                <BottomContent />
            </TabBar>
             <Footer setFieldValue={setFieldValue}/> 
         </form> 
        </>
    )
}

const EnhancedWorkRequestComponent = withFormik({
    mapPropsToValues: () => ({ 
        // === Field ที่ให้ User กรอก ===
        // Top Content  
        internal_document_id: '',       // เลขที่เอกสาร
        created_by_user_employee_id: '', // ผู้ดำเนินเรื่อง (Default === admin_employee_id)
        created_by_admin_employee_id: '',  //ผู้สร้างเอกสาร (Field ที่ไม่ได้กรอก)

        status_name_th: '',              // TODO doesn't have (Field ที่ไม่ได้กรอก)
        created_on: '',                  // TODO doesn't have (Field ที่ไม่ได้กรอก)
        document_date: '',              // วันที่ออกเอกสาร (Default === NOW )
        
        // Bottom Content
        accident_on: '',                // วันเวลาเกิดเหตุ
        request_by: '',                // ผู้แจ้งเหตุ
        accident: '',            // อาการขัดข้อง

        location_district_id: '',                // สถานที่ แขวง
        location_node_id: '',                    // สถานที่ ตอน
        location_station_id: '',                 // สถานที่ สถานี
        location_detail: '',       //รายละเอียดสถานที่

        remark: '',                      // หมายเหตุ  NVARCHAR

        files: [],

        document_status_id: '', // ?
        step_approve: [],               // (Field ที่ไม่ได้กรอก)
        remark_approval: "",

        //Field ที่ไม่ได้ display
        document_id: '', // changes when document is displayed (internal_document_id field validation)
    }),
    validate: (values, props) => {
        const errors = {};
        return errors;
    },
    handleSubmit: (values, formikBag) => new Promise ((resolve, reject) => { //handle Submit will just POST the Empty Document and PUT information inside
        console.log( "I am submitting ". values)
        resolve("DONE!")
      }),    
})(WorkRequestComponent);

export default EnhancedWorkRequestComponent;