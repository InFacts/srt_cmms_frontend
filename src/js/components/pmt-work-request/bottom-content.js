import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux'
import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import Files from '../common/files2'
import TextInput from '../common/formik-text-input';
import TextareaInput from '../common/formik-textarea-input';

const BottomContent = (props) => {
    const toolbar = useSelector((state) => ({...state.toolbar}), shallowEqual);
    const factDistricts = useSelector((state) => ({...state.api.fact.districts}), shallowEqual); 
    const factNodes = useSelector((state) => ({...state.api.fact.nodes}), shallowEqual); 
    const factStations = useSelector((state) => ({...state.api.fact.stations}), shallowEqual); 
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
                <div className="grid_2"><p className="cancel-default">วันเวลาเกิดเหตุ</p></div>
                <div className="grid_7 ">
                <input type="date" className="cancel-default grid_3 mt-1" value={props.date_start} disabled="disabled"></input>
                <input type="time" className="cancel-default grid_3 mt-1 float-right" value={props.time_start} disabled="disabled"></input>
                <p className="cancel-default grid_1 float-right">เวลา</p>
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
                <div className="grid_2"><p className="cancel-default">สถานที่ แขวง</p></div>
                <div className="grid_3 ">
                <select className="edit-select" disabled="disabled">
                    {factDistricts.items.map(function (district, index) {
                        if (props.district === district.name) {
                            return <option defaultValue={district.id} key={index} selected> {district.name} </option>
                        }
                    })}
                </select>
                </div>
            </div>

            <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">สถานที่ ตอน</p></div>
                <div className="grid_3 ">
                <select className="edit-select" disabled="disabled">
                    {factNodes.items.map(function (zone, index) {
                        if (props.zone === zone.name) {
                            return <option defaultValue={zone.id} key={index} selected> {zone.name} </option>
                        }
                    })}
                </select>
                </div>
            </div>
            <div className="grid_12">
                <div className="grid_2"><p className="cancel-default">รายละเอียดของสถานที่</p></div>
                <div className="grid_3 ">
                <select className="edit-select" disabled="disabled">
                    {factStations.items.map(function (station, index) {
                        if (props.station === station.name) {
                            return <option defaultValue={station.id} key={index} selected> {station.name} </option>
                        }
                    })}
                </select>
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