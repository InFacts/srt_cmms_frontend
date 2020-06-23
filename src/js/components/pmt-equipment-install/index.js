import React, { useState, useEffect } from 'react';
import { useFormik, withFormik, useFormikContext } from 'formik';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux'

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

import { TOOLBAR_MODE, TOOLBAR_ACTIONS } from '../../redux/modules/toolbar.js';

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { changeTheam } from '../../helper.js'
const EquipmentInstallationComponent = (props) => {

    useToolbarInitializer(TOOLBAR_MODE.SEARCH, DOCUMENT_TYPE_ID.EQUIPMENT_INSTALLATION);
    useTokenInitializer();
    useFactInitializer();
    useFooterInitializer(DOCUMENT_TYPE_ID.EQUIPMENT_INSTALLATION);
    useDocumentSubscription();
    const loggedIn = useSelector(state => state.token.isLoggedIn);

    // Initial tabbar & set default active
    const [tabNames, setTabNames] = useState([
        { id: "general", name: "ทั่วไป" },
        { id: "location", name: "สถานที่ติดตั้ง" },
        { id: "attachment", name: "แนบไฟล์" },
        { id: "table_status", name: "สถานะเอกสาร" },
    ]);

    return (
        <>
            {!loggedIn ? <Redirect to="/" /> : null}
            <form style={changeTheam() === true ? { backgroundImage: `url(${BgBlue})`, width: "100vw", height: "130vh" } : {}}>
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
        internal_item_id: '',  // เลขที่สินทรัพย์
        description: '',
        uom_group_id: '',
        created_on: '',                  // TODO doesn't have (Field ที่ไม่ได้กรอก)
        document_date: '',              // วันที่ออกเอกสาร (Default === NOW )
        created_by_user_employee_id: '', // ผู้ดำเนินเรื่อง (Default === admin_employee_id)
        created_by_admin_employee_id: '',  //ผู้สร้างเอกสาร (Field ที่ไม่ได้กรอก)
        status_name_th: '',              // TODO doesn't have (Field ที่ไม่ได้กรอก)
        equipment_id: '',
        equipment_status_id: '',

        // Bottom Content
        // general_content
        responsible_zone_by: '',        // ผู้รับผิดชอบสถานที่ STRING
        responsible_by: '',
        installed_on: '',              // วันที่ติดตั้งเสร็จ (Default === NOW )
        announce_use_on: '',             // วันที่ประกาศใช้ (Default === NOW )
        equipment_status_id: '',        //สถานะ
        remark: '', 

        // Location Content
        location_district_id: '',        // สถานที่ แขวง  [รายงานการตรวจซ่อมอุปกรณ์แขวง] FK_ID
        location_node_id: '',            // สถานที่ ตอน   [ที่ตั้งอุปกรณ์ที่ทำการตรวจซ่อม (สถานที่/ที่ตั้ง)] FK_ID
        location_station_id: '',         // สถานที่ สถานี  FK_ID
        location_description: '',                //รายละเอียดเพิ่มเติม

        files: [],

        //Field ที่ไม่ได้กรอก
        document_status_id: '', // ?
        step_approve: [],               // (Field ที่ไม่ได้กรอก)

        //Field ที่ไม่ได้ display
        document_id: '', // changes when document is displayed (internal_document_id field validation)
    }),
    validate: (values, props) => {
        const errors = {};

        if (!values.document_date) {
            errors.document_date = "Required";
        }
        return errors;
    },
})(EquipmentInstallationComponent);

export default EnhancedEquipmentInstallationComponent;
