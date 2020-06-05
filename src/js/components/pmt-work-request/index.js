import React from 'react';

import { useFormik , withFormik ,useFormikContext} from 'formik';

import TopContent from './top-content';
import BottomContent from './bottom-content';
import Footer from '../common/footer.js';

import useToolbarInitializer from '../../hooks/toolbar-initializer';
import useFactInitializer from '../../hooks/fact-initializer';
import useTokenInitializer from '../../hooks/token-initializer';
import useFooterInitializer from '../../hooks/footer-initializer';
import {  TOOLBAR_MODE,TOOLBAR_ACTIONS } from '../../redux/modules/toolbar.js';

const WorkRequestComponent = () => {

    useToolbarInitializer(TOOLBAR_MODE.SEARCH);
    useTokenInitializer();
    useFactInitializer();
    useFooterInitializer();

    return (
        <>
          <form>
             <TopContent />
             <BottomContent  />
             <Footer /> 
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
        
        remark: '',                      // หมายเหตุ
        accident: '',                   // อาการขัดข้อง
        accident_on: '',                // วันเวลาเกิดเหตุ

        district_id: '',
        node_id: '',

        document_status_id: '', // ?
        step_approve: [],

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