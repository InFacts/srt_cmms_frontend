import React, {useState, useEffect } from 'react';
import { connect } from 'react-redux';


import {fetchDocuments, onChangeNoTrackDocument,
  onChangeFindTrackDocument,
  onChangeTypeTrackDocument,
  onChangeDateStartTrackDocument,
  onChangeDateEndTrackDocument,
  onChangeStatusTrackDocument,
  onChangeDistrictTrackDocument,
  onChangeZoneTrackDocument,
  onChangeStationTrackDocument } from '../../redux/modules/track_doc.js';

import {FACTS} from '../../redux/modules/api/fact.js'

const FormDropdown = ({factList, onChange, idName, descriptionName, gridClass}) => (
  <select className={`edit-select-top ${gridClass}`} onChange={onChange}>
    <option defaultValue="" key={0}></option>
    {factList.map(function (fact, index) {
      if (fact[idName] !== 0) { // Mostly Zeros are Defaults made by System
        return <option value={fact[idName]} key={index+1}>{fact[descriptionName]}</option>
      }
    })}
  </select>
);


const TopContent = (props) => {
    return (
        <div id="blackground-white">
          <div className="container_12 clearfix">
            <section className="container_12 ">
              <h4 className="head-title">รายการติดตามเอกสาร</h4>
              <div className="container_12">
                <div className="grid_11"><p className="cancel-default">ค้นหาข้อมูล</p></div>
                <div className="grid_7">
                  <input className="d-inline" type="radio" name="RadioOptions" id="Radio1" value="1" onChange={props.onChangeFindTrackDocument}  />
                  <label htmlFor="Radio1" className="cancel-default d-inline" >เอกสารของฉัน</label>
                  <input className="d-inline ml-3" type="radio" name="RadioOptions" id="Radio2" value="2" onChange={props.onChangeFindTrackDocument} checked />
                  <label htmlFor="Radio2" className="cancel-default d-inline ml-3">เอกสารทั้งหมด</label>
                </div>
              </div>

              <div className="container_12 mt-2">
                <div className="grid_2 cancel-default">
                  <p className="cancel-default">ประเภทเอกสาร </p>
                </div>
                <div className="grid_2 pull_0">
                  <FormDropdown factList={props.type_document_list} onChange={props.onChangeTypeTrackDocument} 
                    idName="document_type_group_id" descriptionName="name" gridClass="grid_2"/>
                </div>
                <div className="grid_1">
                  <p className="cancel-default">วันเริ่มต้น </p>
                </div>
                <div className="grid_3">
                  <input type="date" className="cancel-default grid_3 " value={props.date_start} onChange={props.onChangeDateStartTrackDocument}></input>
                </div>
              </div>
              <div className="container_12">
                <div className="grid_2 cancel-default">
                  <p className="cancel-default">เลขที่เอกสาร </p>
                </div>
                <div className="grid_2 pull_0">
                  <input type="text" className="cancel-default grid_2 " value={props.no_track_document} onChange={props.onChangeNoTrackDocument}></input>
                </div>
                <div className="grid_1  ">
                  <p className="cancel-default">วันสิ้นสุด </p>
                </div>
                <div className="grid_3">
                  <input type="date" className="cancel-default grid_3 " value={props.date_end} onChange={props.onChangeDateEndTrackDocument}></input>
                </div>
                <div className="grid_2">
                  <p className="cancel-default">สถานะเอกสาร </p>
                </div>
                <div className="grid_2 pull_1">
                  <FormDropdown factList={props.status_document_list} onChange={props.onChangeStatusTrackDocument} 
                    idName="document_status_id" descriptionName="status" gridClass="grid_2"/>
                </div>
            </div>
            <div className="container_12">
              <div className="grid_2 cancel-default">
                <p className="cancel-default">แขวง </p>
              </div>
              <div className="grid_2 pull_0">
                <FormDropdown factList={props.district_list} onChange={props.onChangeDistrictTrackDocument} 
                  idName="district_id" descriptionName="name" gridClass="grid_2"/>
              </div>
              <div className="grid_1  ">
                <p className="cancel-default">ตอน </p>
              </div>
              <div className="grid_3">
                <FormDropdown factList={props.node_list} onChange={props.onChangeZoneTrackDocument} 
                    idName="node_id" descriptionName="name" gridClass="grid_3"/>
              </div>
              <div className="grid_1  ">
                <p className="cancel-default">สถานี </p>
              </div>
              <div className="grid_2">
                <FormDropdown factList={props.station_list} onChange={props.onChangeStationTrackDocument} 
                  idName="station_id" descriptionName="name" gridClass="grid_2"/>
              </div>
              <button className="button-blue edit grid_1 float-right mr-5" type="button" onClick={props.fetchDocuments}>ค้นหา</button>
            </div>
          </section>
        </div>
     </div> 
  )
};

const mapStateToProps = (state) => {
  var fact = state.api.fact;
  state = state.track_doc;
  return {

    find_document_list: state.find_document_list,
    
    
    // Facts
    station_list: fact[FACTS.STATIONS].items,
    district_list: fact[FACTS.DISTRICTS].items,
    node_list: fact[FACTS.NODES].items,
    type_document_list: fact[FACTS.DOCUMENT_TYPE_GROUPS].items,
    status_document_list: fact[FACTS.DOCUMENT_STATUS].items,

    no_track_document: state.no_track_document,
    find_document: state.find_document,
    type_document: state.type_document,
    date_start: state.date_start,
    date_end: state.date_end,
    status_document: state.status_document,
    district: state.district,
    zone: state.zone,
    station: state.station,
  }

}


const mapDispatchToProps = {
  // onClickSearchTrackDocument, 
  onChangeNoTrackDocument,
  onChangeFindTrackDocument,
  onChangeTypeTrackDocument,
  onChangeDateStartTrackDocument,
  onChangeDateEndTrackDocument,
  onChangeStatusTrackDocument,
  onChangeDistrictTrackDocument,
  onChangeZoneTrackDocument,
  onChangeStationTrackDocument,
  fetchDocuments
}

export default connect(mapStateToProps, mapDispatchToProps)(TopContent);