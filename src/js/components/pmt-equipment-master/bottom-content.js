import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux'
import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import Files from '../common/files2'
import TableStatus from '../common/table-status';
import TextInput from '../common/formik-text-input';
import TextareaInput from '../common/formik-textarea-input';
import DateInput from '../common/formik-date-input';
import DateTimeInput from '../common/formik-datetime-input';
import RadioInput from '../common/formik-radio-input';
import NumberInput from '../common/formik-number-input';
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

                    {/* Sub-Component Title
                <h3 className="head-title-bottom mt-2">ข้อมูลการติดตั้ง</h3> */}

                <div class="clear" style={{marginTop: "10px"}}/>

                {/* UOM ID */}
                <Label>ชื่อย่อหน่วยนับ</Label>
                <div className="grid_3 alpha omega">
                    <TextInput name="uom_abbreviation"
                            disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} 
                            tabIndex="6" />
                </div>

                <div class="clear" />

                {/* UOM Name */}
                <Label>ชื่อหน่วยนับ</Label>
                <div className="grid_3 alpha omega">
                    <TextInput name="uom_name"
                            disabled
                            tabIndex="6" />
                </div>

                <div class="clear" />

                {/* annual_depreciation */}
                <Label>ค่าเสื่อมต่อปี</Label>
                <div className="grid_3 alpha omega">
                    <NumberInput name="annual_depreciation"
                            disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} 
                            tabIndex="6" />
                </div>
                <div class="clear" />

                {/* depreciation_type */}
                <Label>ประเภทค่าเสื่อม</Label>
                <div className="grid_3 alpha omega">
                    <SelectNoChildrenInput name="depreciation_type" disabled>
                        <option value='1' selected>Straight Line Method</option>
                    </SelectNoChildrenInput>
                </div>
                <div class="clear" />

                {/* active */}
                <div className="grid_3 alpha omega mt-2">
                    <RadioInput name="active" value={true} label="เปิดการใช้งาน" />
                    <div class="clear" />
                    <RadioInput name="active" value={false} label="ปิดการใช้งาน" />
                </div>
                <div class="clear" />


            </div>
            
            
            <div className="grid_12" style={{marginTop: "70px"}}>
                {/* Remark */}
                <Label>หมายเหตุ</Label>
                <div className="grid_11 alpha omega">
                    <TextareaInput name="remark" 
                            disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} />
                </div>

                <div class="clear" />
            </div>

        </div>
            
        <div id="equipment_list_content" className="tabcontent">
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