import React, { useState, useEffect } from 'react';
import {EQUIPMENT_STATUS} from '../als-equipment-status/d3-map.js';
import { useFormik, withFormik, useFormikContext } from 'formik';

const EquipmentStatusListComponent = () => {
    const { values } = useFormikContext();
    var [mapData,setMapData] = useState([])

    useEffect(() => {
        let tempNodeData = [];
        let tempOnlyUniqueNodeID = [];
        if (values.temp_equipment_data !== undefined && values.temp_equipment_data !== []) {
            values.temp_equipment_data.map((data, i) => {
                if (tempNodeData.length !== 0) {
                    let isInArray = tempOnlyUniqueNodeID.includes(data.node_id);
                    let indexArray = tempOnlyUniqueNodeID.indexOf(data.node_id);
                    if (isInArray) {
                        if (data.equipment_status_id === EQUIPMENT_STATUS.WORKING) { tempNodeData[indexArray].WORKING += 1 }
                        else if (data.equipment_status_id === EQUIPMENT_STATUS.DAMAGED) { tempNodeData[indexArray].DAMAGED += 1 }
                        else if (data.equipment_status_id === EQUIPMENT_STATUS.MAINTENANCING) { tempNodeData[indexArray].MAINTENANCING += 1 }
                    } else {
                        tempOnlyUniqueNodeID.push(data.node_id);
                        tempNodeData.push({
                            id: data.node_id,
                            name: data.node_name,
                            WORKING: data.equipment_status_id === EQUIPMENT_STATUS.WORKING? 1:0,
                            DAMAGED: data.equipment_status_id === EQUIPMENT_STATUS.DAMAGED? 1:0,
                            MAINTENANCING: data.equipment_status_id === EQUIPMENT_STATUS.MAINTENANCING? 1:0
                        });
                    }
                } else {
                    tempOnlyUniqueNodeID.push(data.node_id);
                    tempNodeData.push({
                        id: data.node_id,
                        name: data.node_name,
                        WORKING: data.equipment_status_id === EQUIPMENT_STATUS.WORKING? 1:0,
                        DAMAGED: data.equipment_status_id === EQUIPMENT_STATUS.DAMAGED? 1:0,
                        MAINTENANCING: data.equipment_status_id === EQUIPMENT_STATUS.MAINTENANCING? 1:0
                    });
                }
                // console.log(">> tempNodeData", tempNodeData)
            })
        }
        setMapData(tempNodeData);
    },[values.temp_equipment_data])

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
                    {mapData.map((data, i)=> (
                        <tr key={i} id={i}>
                            <td className="edit-padding">{data.name}</td>
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