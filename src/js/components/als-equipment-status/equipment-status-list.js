import React, { useState, useEffect } from 'react';

const EquipmentStatusListComponent = () => {

    return (
    <div className="gray-background equipment-status-list">
        <h5 className="adjustment-bar-name">จำแนกประเภทสินทรัพย์และสถานะการใช้งาน</h5>
        <div className="white-background adjustment-bar-inner">


            <div className="adjustment-bar-inner-text">หน่วยงาน/แขวง</div>


            <div className="space-10px" />
            
            <div className="adjustment-bar-inner-text">ตอน</div>

        
            <div className="space-10px" />

            <div className="adjustment-bar-inner-text">ประเภทอุปกรณ์</div  >



        </div>
    </div>);
}

export default EquipmentStatusListComponent;