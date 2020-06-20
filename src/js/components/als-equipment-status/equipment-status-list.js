import React, { useState, useEffect } from 'react';

const EquipmentStatusListComponent = () => {

    return (
    <div className="gray-background equipment-status-list">
        <h5 className="adjustment-bar-name">จำแนกประเภทสินทรัพย์และสถานะการใช้งาน</h5>
        <div className="white-background adjustment-bar-inner">
            <table className="table-many-column mt-2" style={{height:"300px", marginTop:"0px"}}>
                <thead>
                <tr>
                    <th className="font" style={{ width: "200px" }}>หน่วยงาน</th>
                    <th className="font" style={{ width: "200px" }}>พร้อมใช้งาน</th>
                    <th className="font" style={{ width: "250px" }}>กำลังใช้งาน</th>
                    <th className="font" style={{ width: "150px" }}>ชำรุด</th>
                    <th className="font" style={{ width: "150px" }}>รอดำเนินการซ่อม</th>
                </tr>
                </thead>
                <tbody>
                {[0,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4].map((resApprove, i) => {
                    { console.log("resApprove", resApprove) }
                    return (
                    <tr key={i} id={i}>
                        <td className="edit-padding">ddsdsadasdsadad</td>
                        <td className="edit-padding">dsd</td>
                        <td className="edit-padding">dsd</td>
                        <td className="edit-padding">ddd</td>
                        <td className="edit-padding">sds</td>
                    </tr>
                )
                })}
                </tbody>
            </table>
        </div>
    </div>);
}

export default EquipmentStatusListComponent;