import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux'
import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import Files from '../common/files2'
import TableStatus from '../common/table-status';
import TextInput from '../common/formik-text-input';
import TextareaInput from '../common/formik-textarea-input';
import DateInput from '../common/formik-date-input';
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
        <div id="general_content" className="tabcontent">
            

            {/* === Left Column === */}
            <div className="grid_6" style={{paddingLeft: "10px"}}>

                    {/* Sub-Component Title */}
                <h3 className="head-title-bottom mt-2">ข้อมูลการติดตั้ง</h3>

                {/* District ID */}
                <Label>หน่วยงาน/แขวง</Label>
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
                <Label>ตอน</Label>
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
                <Label>สถานี</Label>
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

                {/* Installed date */}
                <Label>วันที่ติดตั้งเสร็จ</Label>
                <div className="grid_3 alpha omega">
                    <DateInput name="install_date"
                        disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} 
                        tabIndex="6" />
                </div>
                <div class="clear" />

                {/* Installed date */}
                <Label>วันที่ประกาศใช้</Label>
                <div className="grid_3 alpha omega">
                    <DateInput name="announce_date"
                        disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} 
                        tabIndex="6" />
                </div>
                <div class="clear" />
                

            </div>
            

            {/* === Right Column === */}
            <div className="grid_6 prefix_1">
                
                <div class="clear" style={{marginTop: "3.5rem"}}/>

                {/* Responsible person District ID */}
                <Label>ผู้รับผิดชอบ</Label>
                <div className="grid_4 alpha omega">
                    <TextInput name="responsible_person_district"
                            disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} 
                            tabIndex="6" />
                </div>

                <div class="clear" />
                
                {/* Responsible person Node ID */}
                <Label>ผู้รับผิดชอบ</Label>
                <div className="grid_4 alpha omega">
                    <TextInput name="responsible_person_node"
                            disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} 
                            tabIndex="6" />
                </div>

                <div class="clear" />

                {/* Responsible person Station ID */}
                <Label>ผู้รับผิดชอบ</Label>
                <div className="grid_4 alpha omega">
                    <TextInput name="responsible_person_station"
                            disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} 
                            tabIndex="6" />
                </div>

                <div class="clear" />


            </div>
            
            <div className="grid_12" style={{marginTop: "60px"}}>
                {/* Remark */}
                <Label>หมายเหตุ</Label>
                <div className="grid_11 alpha omega">
                    <TextareaInput name="remark" 
                            disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} />
                </div>

                <div class="clear" />
            </div>

        </div>
            
        <div id="location_content" className="tabcontent">
            <div className="container_12 ">
                {/* === One Column === */}
                <div className="grid_12 prefix_1">
                    
                    <div class="clear" style={{marginTop: "1rem"}}/>

                    {/* Responsible person District ID */}
                    <Label>ที่อยู่</Label>
                    <div className="grid_9 alpha omega">
                        <TextInput name="install_address"
                                disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} 
                                tabIndex="6" />
                    </div>

                    <div class="clear" />
                    
                    {/* Responsible person Node ID */}
                    <Label>แขวง</Label>
                    <div className="grid_9 alpha omega">
                        <TextInput name="install_district"
                                disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} 
                                tabIndex="6" />
                    </div>

                    <div class="clear" />

                    {/* Responsible person Station ID */}
                    <Label>เขต</Label>
                    <div className="grid_9 alpha omega">
                        <TextInput name="install_county"
                                disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} 
                                tabIndex="6" />
                    </div>

                    <div class="clear" />
                    
                    {/* Responsible person Station ID */}
                    <Label>เลขไปรษณีย์</Label>
                    <div className="grid_9 alpha omega">
                        <TextInput name="install_postal_code"
                                disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} 
                                tabIndex="6" />
                    </div>

                    <div class="clear" />

                    {/* Responsible person Station ID */}
                    <Label>Google Map</Label>
                    <div className="grid_9 alpha omega">
                        <TextInput name="install_google_map"
                                disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} 
                                tabIndex="6" />
                    </div>

                    <div class="clear" />

                </div>
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