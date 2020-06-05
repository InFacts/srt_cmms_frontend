import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux'
import PopupModalWorkRequest from './popup-modal-work-request'
import TextInput from '../common/formik-text-input'
import DateTimeInput from '../common/formik-datetime-input'
import DateInput from '../common/formik-date-input'
import { TOOLBAR_MODE, TOOLBAR_ACTIONS, toModeAdd } from '../../redux/modules/toolbar.js';
import Label from '../common/form-label'



const TopContent = (props) => {
    const toolbar = useSelector((state) => ({...state.toolbar}), shallowEqual);

    return (
    <div id="blackground-white">
    <div className="container_12 clearfix" style={{marginTop: "55px"}}>
        {/* Section Title */}
        <h4 className="head-title">แจ้งเหตุขัดข้อง/ชำรุด</h4>

        {/* === Left Column === */}
        <div className="grid_6" style={{paddingLeft: "10px"}}>

            {/* Document ID */}
            <Label>เลขที่เอกสาร</Label>
            <div className="grid_3 alpha">
                <TextInput name='internal_document_id'
                    searchable={toolbar.mode === TOOLBAR_MODE.SEARCH} 
                    ariaControls="modalWorkRequset" 
                    tabIndex="1" />
            </div>
            <div class="clear" />

            {/* User Employee ID  */}
            <Label>ผู้ดำเนินเรื่อง</Label>
            <div className="grid_3 alpha">
                <TextInput name="created_by_user_employee_id" 
                    disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} 
                    tabIndex="2"/>
            </div>
            <div class="clear" />

            {/* Admin Employee ID  */}
            <Label>ผู้สร้างเอกสาร</Label>
            <div className="grid_3 alpha">
                <TextInput name="created_by_admin_employee_id" 
                    disabled 
                    tabIndex="3"/>
            </div>
            <div class="clear" />
        </div>



        {/* === Right Column === */}
        <div className="grid_6 prefix_2">

            {/* Document Status  */}
            <Label>สถานะ</Label>
            <div className="grid_3 alpha">
                <TextInput name="status_name_th" 
                    disabled 
                    tabIndex="4"/>
            </div>
            <div class="clear" />

            {/* Created On */}
            <Label>วันที่</Label>
            <div className="grid_3 alpha">
                <DateTimeInput name="created_on" 
                    disabled 
                    tabIndex="5"/>
            </div>
            <div class="clear" />

            {/* Document date */}
            <Label>วันที่เอกสาร</Label>
            <div className="grid_3 alpha">
                <DateInput name="document_date"
                    disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} 
                    tabIndex="6" />
            </div>
            <div class="clear" />
        </div>
    </div>
    <PopupModalWorkRequest />
    </div>
    );
}

export default TopContent;