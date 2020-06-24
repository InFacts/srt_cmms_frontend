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

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { changeTheam } from '../../helper.js'
const WorkOrderComponent = (props) => {

    useToolbarInitializer(TOOLBAR_MODE.SEARCH, DOCUMENT_TYPE_ID.WORK_ORDER);
    useTokenInitializer();
    useFactInitializer();
    useFooterInitializer(DOCUMENT_TYPE_ID.WORK_ORDER);
    useDocumentSubscription();
    const loggedIn = useSelector(state => state.token.isLoggedIn); 

    // Initial tabbar & set default active
    const [tabNames, setTabNames] = useState([
        {id:"broken", name:"อาการเสีย"},
        {id:"attachment", name:"แนบไฟล์"},
        // {id:"fixed_asset", name:"สินทรัพย์ที่เกี่ยวข้อง"},
        {id:"table_status", name:"สถานะเอกสาร"},
        { id: "assets_under_maintenance", name: "สินทรัพที่ดำเดินการซ่อมบำรุง" },
    ]);

    
    return (
        <>
        {!loggedIn ? <Redirect to="/" /> : null}
        <form style={changeTheam() === true ? { backgroundImage: `url(${BgBlue})`, width: "100vw", height: "130vh" } : {}}>
            <TopContent />
            <TabBar tabNames={tabNames} initialTabID="broken">
                <BottomContent />
            </TabBar>
            <Footer />
        </form>
        </>
    )
}

const initialEquipmentLineItem = {
    internal_item_id: '',
    description:'',
    work_order_document_id: '',
    equipment_item_id: '',
    equipment_status_id: '',
    remark: '',
}
const initialRowsEquipment = (n = 10) => {
    let rows = [];
    for (var i = 1; i <= n; i++) {
        rows.push({
            ...initialEquipmentLineItem,
        });
    }
    return rows;
}

const EnhancedWorkOrderComponent = withFormik({
    mapPropsToValues: (props) => ({ 
        // Field ที่ให้ User กรอก
        // Top Content
        internal_document_id: '',       // เลขที่เอกสาร
        created_by_user_employee_id: '', // ผู้ดำเนินเรื่อง (Default === admin_employee_id)
        created_by_admin_employee_id: '',  //ผู้สร้างเอกสาร (Field ที่ไม่ได้กรอก)
        refer_to_document_internal_id: '',  // เลขที่เอกสารแจ้งเหตุขัดข้อง (ถ้ามี)
        refer_to_document_id: '',

        status_name_th: '',              // TODO doesn't have (Field ที่ไม่ได้กรอก)
        created_on: '',                  // TODO doesn't have (Field ที่ไม่ได้กรอก)
        document_date: '',              // วันที่ออกเอกสาร (Default === NOW )
        

        // Bottom Content
        accident_name: '',              // ชื่องาน        NVARCHAR
        accident_on: '',                // วันเวลาเกิดเหตุ  DATETIME
        request_on: '',                 // วันเวลาที่รับแจ้ง DATETIME
        root_cause: '',                 // อาการเสียโดยสรุป NVARCHAR
        request_by: '' ,                //  ผู้แจ้งเหตุ [WR] ,  ได้รับเหตุจาก[WO] NVARCHAR
        recv_accident_from_recv_id: '' ,     // ได้รับข้อมูลผ่านช่องทาง: Phone, Letter, WR   FK_ID


        location_district_id: '',        // สถานที่ แขวง  [รายงานการตรวจซ่อมอุปกรณ์แขวง] FK_ID
        location_node_id: '',            // สถานที่ ตอน   [ที่ตั้งอุปกรณ์ที่ทำการตรวจซ่อม (สถานที่/ที่ตั้ง)] FK_ID
        location_station_id: '',         // สถานที่ สถานี  FK_ID
        location_detail: '',       //รายละเอียดสถานที่ [WR]  ที่ตั้งอุปกรณ์ที่ทำการตรวจซ่อม (สถานที่/ที่ตั้ง) [WO] NVARCHAR
        has_equipment_item: initialRowsEquipment(),
        
        // line_items: initialRows(),
        remark: '',                      // หมายเหตุ  NVARCHAR

        files: [],
    
        //Field ที่ไม่ได้กรอก
        document_status_id: '', // ?
        step_approve: [],               // (Field ที่ไม่ได้กรอก)

        //Field ที่ไม่ได้ display
        document_id: '', // changes when document is displayed (internal_document_id field validation)
    }),
    validate: (values, props) => {
        const errors = {};
        // MOVED TO FIELD
        if (!values.document_date){
            errors.document_date = "Required";
        }
        return errors;
    },
})(WorkOrderComponent);


export default EnhancedWorkOrderComponent;