import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux'
import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import Files from '../common/files2'
import TableStatus from '../common/table-status';
import TextInput from '../common/formik-text-input';
import TextareaInput from '../common/formik-textarea-input';
import DateTimeInput from '../common/formik-datetime-input';
import SelectNoChildrenInput from '../common/formik-select-no-children';
import { useFormik , withFormik ,useFormikContext} from 'formik';
import Label from '../common/form-label'



const BottomContent = (props) => {
    const toolbar = useSelector((state) => ({...state.toolbar}), shallowEqual);
    const factDistricts = useSelector((state) => ({...state.api.fact.districts}), shallowEqual); 
    const factNodes = useSelector((state) => ({...state.api.fact.nodes}), shallowEqual); 
    const factStations = useSelector((state) => ({...state.api.fact.stations}), shallowEqual); 
    const {values} = useFormikContext();
    return (
    <div id="blackground-gray">
    <div className="container_12 clearfix">

            {/* === Tab broken_content  === */}
            <div id="broken_content" className="tabcontent">
                {/* Component Title */}
                <h3 className="head-title-bottom mt-2">ข้อมูลเหตุขัดข้อง/ชำรุด</h3>

                {/* === Left Column === */}
                <div className="grid_6" style={{paddingLeft: "10px"}}>
                    
                    {/* Accident On */}
                    <Label>วันเวลาเกิดเหตุ</Label>
                    <div className="grid_4 alpha omega">
                        <DateTimeInput name="accident_on" 
                        disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}/>
                    </div>

                    <div class="clear" />

                    {/* Informed By */}
                    <Label>ผู้แจ้งเหตุ</Label>
                    <div className="grid_4 alpha omega">
                        <TextInput name='request_by' 
                            disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}/>
                    </div>

                    <div class="clear" />

                    {/* Accident Detail */}
                    <Label>อาการขัดข้อง</Label>
                    <div className="grid_4 alpha omega">
                        <TextareaInput name="accident" rows="4"
                            disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} />
                    </div>

                    <div class="clear" />

                </div>
                

                {/* === Right Column === */}
                <div className="grid_6 prefix_1">

                    {/* District ID */}
                    <Label>สถานที่ แขวง</Label>
                    <div className="grid_4 alpha omega">
                        <SelectNoChildrenInput name="location_district_id" disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}>
                            <option value=''></option>
                            {factDistricts.items.map(function ({district_id, name, division_id}) {
                                return <option value={district_id} key={district_id}> {name} </option>
                            })}
                        </SelectNoChildrenInput>
                    </div>

                    <div class="clear" />
                    
                    {/* Node ID */}
                    <Label>สถานที่ ตอน</Label>
                    <div className="grid_4 alpha omega">
                        <SelectNoChildrenInput name="location_node_id" disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}>
                            <option value=''></option>
                            {factNodes.items.map(function ({node_id, name, district_id}) {
                                if(values.district_id == district_id){ // Shallow equality, district ID may be string
                                    return <option value={node_id} key={node_id}>{name}</option>
                                }
                            })}
                        </SelectNoChildrenInput>
                    </div>

                    <div class="clear" />

                    {/* Station ID */}
                    <Label>สถานที่ สถานี</Label>
                    <div className="grid_4 alpha omega">
                        <SelectNoChildrenInput name="location_station_id" 
                            disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}>
                            <option value=''></option>
                            {factStations.items.map(function ({station_id, name, node_id}) {
                                if (values.node_id == node_id) { // Shallow equality, node ID may be string
                                    return <option value={station_id} key={station_id}> {name} </option>
                                }
                            })}
                        </SelectNoChildrenInput>
                    </div>

                    <div class="clear" />

                    {/* Station ID */}
                    <Label>รายละเอียดสถานที่</Label>
                    <div className="grid_4 alpha omega">
                        <TextareaInput name="location_detail" 
                            disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} />
                    </div>

                    <div class="clear" />

                </div>
                
                <div className="grid_12" style={{marginTop: "100px"}}>
                    {/* Remark */}
                    <Label>หมายเหตุ</Label>
                    <div className="grid_11 alpha omega">
                        <TextareaInput name="remark" 
                                disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} />
                    </div>

                    <div class="clear" />
                </div>

            </div>
            

        
        
        <div id="attachment_content" className="tabcontent">
            <div className="container_12 ">
                {/* <Files /> */}
            </div>
        </div>

            
        <div id="table_status_content" className="tabcontent">
            <TableStatus bodyTableStatus = {values.step_approve} />
        </div>

    </div>  
    </div>
    );
};

export default BottomContent;