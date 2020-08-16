import React, { useState, useEffect } from 'react';
import { useFormik, withFormik, useFormikContext } from 'formik';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import TabBar from '../common/tab-bar';

import TopContent from './top-content';
import BottomContent from './bottom-content';
import Footer from '../common/footer.js';

import { packDataFromValues, DOCUMENT_TYPE_ID, saveDocument } from '../../helper';

import useToolbarInitializer from '../../hooks/toolbar-initializer';
import useFactInitializer from '../../hooks/fact-initializer';
import useTokenInitializer from '../../hooks/token-initializer';
import useFooterInitializer from '../../hooks/footer-initializer';
import useDocumentSubscription from '../../hooks/document-subscription';
import useExportPdfInitializer from '../../hooks/export-pdf-initializer';
import useNavBottomStatusInitializer from '../../hooks/nav-bottom-status-initializer';

import { TOOLBAR_MODE, TOOLBAR_ACTIONS } from '../../redux/modules/toolbar.js';

import { footerToModeSearch } from '../../redux/modules/footer.js';

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { changeTheam, getUrlParamsLink } from '../../helper.js'
const PmtSS101Componant = (props) => {
    const { resetForm, setFieldValue, setValues, values } = useFormikContext();
    const dispatch = useDispatch();

    useToolbarInitializer(TOOLBAR_MODE.SEARCH, DOCUMENT_TYPE_ID.SS101);
    useTokenInitializer();
    useFactInitializer();
    useFooterInitializer(DOCUMENT_TYPE_ID.SS101);
    useDocumentSubscription();
    useExportPdfInitializer();
    useNavBottomStatusInitializer();
    const loggedIn = useSelector(state => state.token.isLoggedIn);

    // Initial tabbar & set default active
    const [tabNames, setTabNames] = useState([
        { id: "breakdown", name: "อาการเสีย" },
        { id: "related_parties", name: "ผู้ที่เกี่ยวข้อง" },
        { id: "compensation_list", name: "รายการค่าเสียหาย" },
        { id: "assets_under_maintenance", name: "สินทรัพที่ดำเดินการซ่อมบำรุง" },
        { id: "attachment", name: "แนบไฟล์" },
        { id: "table_status", name: "สถานะเอกสาร" },
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
            <form style={changeTheam() === true ? { backgroundImage: `url(${BgBlue})`, width: "100vw", height: "155vh" } : {}}>
                <TopContent />
                <TabBar tabNames={tabNames} initialTabID="breakdown">
                    <BottomContent />
                </TabBar>
                <Footer setFieldValue={setFieldValue}/>
            </form>
        </>
    )
}

const initialLossLineItem = {
    document_id: '', // maybe not needed
    line_number: '',

    description: '',   // รายการ
    quantity: '',
    uom_name: '',
    price: '',

    remark: '',
}
const initialRows = (n = 10) => {
    let rows = [];
    for (var i = 1; i <= n; i++) {
        rows.push({
            ...initialLossLineItem,
            line_number: i
        });
    }
    return rows;
}

const initialEquipmentLineItem = {
    document_id: '',
    internal_item_id: '',
    description:'',
    item_status_id: '',
    remark: '',
}
const initialRowsEquipment = (n = 10) => {
    let rows = [];
    for (var i = 1; i <= n; i++) {
        rows.push({
            ...initialEquipmentLineItem,
            line_number: i
        });
    }
    return rows;
}


const EnhancedPmtSS101Component = withFormik({
    mapPropsToValues: (props) => ({
        // Field ที่ให้ User กรอก
        // Top Content
        internal_document_id: '',       // เลขที่เอกสาร
        created_by_user_employee_id: '', // ผู้ดำเนินเรื่อง (Default === admin_employee_id)
        created_by_admin_employee_id: '',  //ผู้สร้างเอกสาร (Field ที่ไม่ได้กรอก)
        refer_to_document_internal_id: '',  // เลขที่เอกสารอ้างอิง (Must have)
        refer_to_document_id: '',

        status_name_th: '',              // TODO doesn't have (Field ที่ไม่ได้กรอก)
        created_on: '',                  // TODO doesn't have (Field ที่ไม่ได้กรอก)
        document_date: '',              // วันที่ออกเอกสาร (Default === NOW )

        // Top Content [FROM Work Order!!]
        accident_name: '',              // ชื่องาน        NVARCHAR
        accident_on: '',                // วันเวลาเกิดเหตุ  DATETIME
        request_on: '',                 // วันเวลาที่รับแจ้ง DATETIME
        // root_cause: '',                 // อาการเสียโดยสรุป NVARCHAR [only WO]
        request_by: '',                //  ผู้แจ้งเหตุ [WR] ,  ได้รับเหตุจาก[WO] NVARCHAR
        recv_accident_from_recv_id: '',     // ได้รับข้อมูลผ่านช่องทาง: Phone, Letter, WR   FK_ID

        location_district_id: '',        // สถานที่ แขวง  [รายงานการตรวจซ่อมอุปกรณ์แขวง] FK_ID
        location_node_id: '',            // สถานที่ ตอน   [ที่ตั้งอุปกรณ์ที่ทำการตรวจซ่อม (สถานที่/ที่ตั้ง)] FK_ID
        location_station_id: '',         // สถานที่ สถานี  FK_ID
        location_detail: '',       //รายละเอียดสถานที่ [WR]  ที่ตั้งอุปกรณ์ที่ทำการตรวจซ่อม (สถานที่/ที่ตั้ง) [WO] NVARCHAR


        // Bottom Content
        car_type_id: '',           // เดินทางโดย FK_ID
        departed_on: '',          // ออกเดินทาง DATETIME
        arrived_on: '',           // เดินทางถึง  DATETIME
        finished_on: '',          // วันเวลาที่แล้วเสร็จ DATETIME
        system_type_group_id: '',   // ระบบตรวจซ่อม FK_ID
        sub_maintenance_type_id: '',      //  ชนิดระบบตรวจซ่อม FK_ID
        hardware_type_id: '',   // ชื่ออุปกรณ์ที่บำรุงรักษา FK_ID

        summary_cause_condition: '', // สาเหตุและอาการเสียโดยสรุป link [root_cause] from WO NVARCHAR
        cargo_id: '', //ขบวนรถที่ NVARCHAR/INT (**not in DB)
        total_fail_time: '', //เสียเวลาเพราะเหตุนี้ (นาที) DECIMAL(10,2)
        service_method_id: '', // ประเภทการซ่อม FK_ID
        service_method_desc: '', //สรุปการแก้ไขและการซ่อมแซม STRING
        interrupt_id: '', //ยังไมไ่ด้จัดการแก้ไขเพราะเหตุนี้ FK_ID
        location_x_cross_id: '',

        // Bottom Content ผู้เกี่ยวข้อง
        auditor_name: '',           //ผู้ควบคุมตรวจสอบชื่อ NVARCHAR
        auditor_position_id: '', //ผู้ควบคุมตรวจสอบชื่อ ตำแหน่ง FK_ID
        fixer_name: '',               //ดำเนินการแก้ไขชื่อ  NVARCHAR
        fixer_position_id: '', //ดำเนินการแก้ไขชื่อ ตำแหน่ง FK_ID
        member_1: '',               //รายชื่อเพื่อนร่วมงาน 1 NVARCHAR
        member_1_position_id: '', //รายชื่อเพื่อนร่วมงาน 1 ตำแหน่ง FK_ID
        member_2: '',              //รายชื่อเพื่อนร่วมงาน 2 NVARCHAR
        member_2_position_id: '', //รายชื่อเพื่อนร่วมงาน 2 ตำแหน่ง FK_ID
        member_3: '',             //รายชื่อเพื่อนร่วมงาน 3
        member_3_position_id: '',  //รายชื่อเพื่อนร่วมงาน 3 ตำแหน่ง


        remark: '',
        checked_remark: '',
        loss_line_items: initialRows(),
        line_items: initialRowsEquipment(),

        files: [],

        //Field ที่ไม่ได้กรอก
        document_status_id: '', // ?
        step_approve: [],               // (Field ที่ไม่ได้กรอก)
        remark_approval: "",

        //Field ที่ไม่ได้ display
        document_id: '', // changes when document is displayed (internal_document_id field validation)
        is_auto_internal_document_id: 'auto',
    }),
    validate: (values, props) => {
        const errors = {};
        if (!values.document_date) {
            errors.document_date = "Required";
        }
        return errors;
    },
})(PmtSS101Componant);


export default EnhancedPmtSS101Component;