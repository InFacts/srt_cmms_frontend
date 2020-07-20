import React, { useState, useEffect } from 'react';
import {EQUIPMENT_STATUS} from '../als-equipment-status/d3-map.js';
import { useFormik, withFormik, useFormikContext } from 'formik';

const EquipmentStatusListComponent = () => {
    const { values } = useFormikContext();
    var [mapData,setMapData] = useState([])

    useEffect(() => {
        setMapData(values.list_node_status);
    },[values.list_node_status])

    return (
    <div className="gray-background equipment-status-list">
        <h5 className="adjustment-bar-name">จำแนกประเภทสินทรัพย์และสถานะการใช้งาน</h5>
        <div className="white-background adjustment-bar-inner">
            <table className="table-many-column mt-2" style={{height:"300px", marginTop:"0px"}}>
                <thead>
                <tr>
                    <th className="font" style={{ width: "200px" }}>หน่วยงาน</th>
                    {/* <th className="font" style={{ width: "200px" }}>พร้อมใช้งาน</th> */}
                    <th className="font" style={{ width: "250px" }}>กำลังใช้งาน</th>
                    <th className="font" style={{ width: "150px" }}>ชำรุด</th>
                    <th className="font" style={{ width: "150px" }}>รอดำเนินการซ่อม</th>
                </tr>
                </thead>
                <tbody>
                    {console.log("<<<<<<  mapData", mapData) }
                    {mapData.map((data, i)=> (
                        <tr key={i} id={i}>
                            <td className="edit-padding">{data.name.name}</td>
                            <td className="edit-padding">{data.WORKING}</td>
                            <td className="edit-padding">{data.DAMAGED}</td>
                            <td className="edit-padding">{data.MAINTENANCING}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>);
}

export default EquipmentStatusListComponent;