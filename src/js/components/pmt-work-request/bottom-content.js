import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux'
import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import Files from '../common/files2'
import TextInput from '../common/formik-text-input';
import TextareaInput from '../common/formik-textarea-input';
import DateTimeInput from '../common/formik-datetime-input';
import SelectNoChildrenInput from '../common/formik-select-no-children';
import { useFormik , withFormik ,useFormikContext} from 'formik';

const BottomContent = (props) => {
    const toolbar = useSelector((state) => ({...state.toolbar}), shallowEqual);
    const factDistricts = useSelector((state) => ({...state.api.fact.districts}), shallowEqual); 
    const factNodes = useSelector((state) => ({...state.api.fact.nodes}), shallowEqual); 
    const factStations = useSelector((state) => ({...state.api.fact.stations}), shallowEqual); 

    const {values} = useFormikContext();
    useEffect(() => {
        console.log(values)
    }, [values]);

    return (
    <div id="blackground-gray">
        <div className="container_12 clearfix">
          <div className="container_12 ">
            <h3 className="head-title-bottom mt-2">ข้อมูลเหตุขัดข้อง/ชำรุด</h3>

            <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">ผู้แจ้งเหตุ</p></div>
                <div className="grid_7 ">
                    <TextInput name='information_name' disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}/>
                </div>
            </div>
            
            <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">อาการขัดข้อง</p></div>
                <div className="grid_7 ">
                    <TextareaInput name="job_name" 
                    disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} />
                </div>
            </div>
            <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">วันเวลาเกิดเหตุ</p></div>
                <div className="grid_4 mt-1 ">
                    <DateTimeInput name="datetime_start" 
                    disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}/>
                </div>
            </div>
            <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">สถานที่ แขวง</p></div>
                <div className="grid_4 ">
                    <SelectNoChildrenInput name="district_id" disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}>
                        <option value=''></option>
                        {factDistricts.items.map(function ({district_id, name, division_id}) {
                            return <option value={district_id} key={district_id}> {name} </option>
                        })}
                    </SelectNoChildrenInput>
                </div>
            </div>

            <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">สถานที่ ตอน</p></div>
                <div className="grid_4 ">
                <SelectNoChildrenInput name="node_id" disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}>
                    <option value=''></option>
                    {factNodes.items.map(function ({node_id, name, district_id}) {
                        if(values.district_id == district_id){ // Shallow equality, district ID may be string
                            return <option value={node_id} key={node_id}>{name}</option>
                        }
                    })}
                </SelectNoChildrenInput>
                </div>
            </div>
            <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">สถานที่ สถานี</p></div>
                <div className="grid_4 ">
                <SelectNoChildrenInput name="station_id" disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}>
                    <option value=''></option>
                    {factStations.items.map(function ({station_id, name, node_id}) {
                        if (values.node_id == node_id) { // Shallow equality, node ID may be string
                            return <option value={station_id} key={station_id}> {name} </option>
                        }
                    })}
                </SelectNoChildrenInput>
                </div>
            </div>
          </div>
          <div className="container_12 ">
            {/* <Files /> */}
          </div>
        </div>
      </div>
    );
};

export default BottomContent;