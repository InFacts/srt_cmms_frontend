import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux'
import PopupModalWorkRequest from './popup-modal-work-request'

const TopContent = (props) => {

    return (
        <div>
            <div id="blackground-white">
                <div className="container_12 clearfix">
                <section className="container_12 ">
                    <h4 className="head-title">แจ้งเหตุขัดข้อง/ชำรุด</h4>
                    <div className="container_12">
                    <div className="grid_2"><p className="top-text">เลขที่เอกสาร</p></div>
                    <div>
                    <div className="p-search-box cancel-margin grid_3 pull_0">
                        <input type="search" className="p-search-box__input cancel-default " value={props.no_word_request} onChange={(e) => { props.onChangeNoWorkRequset(e) }} />
                        <button type="button" className="p-search-box__button cancel-padding hidden" ><i className="p-icon--search" id="showWorkRequset" aria-controls="modalWorkRequset"></i></button>
                    </div>
                    <div className="p-search-box cancel-margin grid_3  float-right">
                        <input type="date" className="p-search-box__input cancel-default " defaultValue={props.create_date_time} disabled="diabled" />
                    </div>
                    <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">วันที่ออกเอกสาร</p></div>
                    </div>
                </div>
                <div className="container_12">
                    <div>
                    <div className="p-search-box cancel-margin grid_3  float-right">
                        <input type="text" className=" p-search-box__input cancel-default  " defaultValue={props.create_name} disabled="diabled"></input>
                    </div>
                    </div>
                    <div className="grid_2 cancel-default float-right"><p className="cancel-default float-right">ผู้สร้างเอกสาร</p></div>
                </div>
                </section>
                </div>
            </div>


        <PopupModalWorkRequest />

      </div >
    );
}

export default TopContent;