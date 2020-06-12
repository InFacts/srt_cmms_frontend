import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux'

import { useFormik, withFormik, useFormikContext } from 'formik';

import TabBar from '../common/tab-bar';

import TopContent from './top-content';
import BottomContent from './bottom-content';
import Footer from '../common/footer.js';

import useToolbarInitializer from '../../hooks/toolbar-initializer';
import useFactInitializer from '../../hooks/fact-initializer';
import useTokenInitializer from '../../hooks/token-initializer';
import useFooterInitializer from '../../hooks/footer-initializer';
import useDocumentSubscription from '../../hooks/document-subscription';

import { TOOLBAR_MODE, TOOLBAR_ACTIONS } from '../../redux/modules/toolbar.js';
import { DOCUMENT_TYPE_ID } from '../../helper';

const MaintenantItemComponent = () => {

    useToolbarInitializer(TOOLBAR_MODE.SEARCH, DOCUMENT_TYPE_ID.WORK_REQUEST);
    useTokenInitializer();
    useFactInitializer();
    useFooterInitializer(DOCUMENT_TYPE_ID.WORK_REQUEST);
    useDocumentSubscription();
    const loggedIn = useSelector(state => state.token.isLoggedIn);

    // Initial tabbar & set default active
    const [tabNames, setTabNames] = useState([
        { id: "broken", name: "รายการอะไหล่" },
        { id: "related_parties", name: "ระบุผู้ปฎิบัติงาน" },
        { id: "equipment", name: "อุปกรณ์ที่ต้องนำไปปฎิบัติงาน" },
        { id: "attachment", name: "แนบไฟล์" },
        { id: "table_status", name: "สถานะเอกสาร" },
    ]);

    return (
        <>
            {!loggedIn ? <Redirect to="/" /> : null}
            <form>
                <TopContent />
                <TabBar tabNames={tabNames} initialTabID="broken">
                    <BottomContent />
                </TabBar>
                <Footer />
            </form>
        </>
    )
}

const EnhancedMaintenantItemComponent = withFormik({
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
        

        file: [],

        document_status_id: '', // ?
        step_approve: [],               // (Field ที่ไม่ได้กรอก)

        //Field ที่ไม่ได้ display
        document_id: '', // changes when document is displayed (internal_document_id field validation)
    })
})(MaintenantItemComponent);

export default EnhancedMaintenantItemComponent;