import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

// import {handleChange} from '../../redux/modules/form_data.js';
import { useFormikContext } from 'formik';

import Document from '../../../images/document.svg';

const HandleDownload = () => {
    console.log(">>>")
    // axios({
    //     url: 'http://43.229.79.36:60013/attachment/1/download/1',
    //     method: 'GET',
    //     responseType: 'blob', // important
    // }).then((response) => {
    //     console.log("response")
    //     const url = window.URL.createObjectURL(new Blob([response.data]));
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.setAttribute('download', 'file.png');
    //     document.body.appendChild(link);
    //     link.click();
    // })
    axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/attachment/1/download/1`, {responseType: 'blob'}, 
    { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((response) => {
            console.log("response", response)
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.png');
            document.body.appendChild(link);
            link.click();
        }).catch(function (err) {
            console.log(err);
        })
};

const Files = (props) => {
    return (
        <div>
            <h4 className="head-title-bottom mt-2">ข้อมูลแนบไฟล์</h4>
            <div className="u-clearfix">
                <div className="u-float-left">
                    <span className="top-text">ไฟล์เอกสาร</span>
                </div>
                <div className=" u-float-right">
                    <span className="top-text">เพิ่มไฟล์</span>
                </div>
            </div>
            {props.desrciptionFilesLength !== 0 && props.desrciptionFilesLength !== undefined
                ?
                <div className="dropZone-list">
                    {props.desrciptionFiles.map((desrciptionFiles, index) => (
                        <li className="list-group-item">
                            <div className="media-body" key={index}>
                                <h4 className="media-heading grid_5" style={{ fontWeight: 'bold' }}>{desrciptionFiles.filename}</h4>
                                <h4 className="media-heading grid_2">ขนาดไฟล์ : {desrciptionFiles.sizeReadable}</h4>
                                <div className="float-right">
                                    <button type="button"><h4 className="media-heading grid_1" style={{ color: "blue" }} onClick={(e) => HandleDownload(e)}>ดาวน์โหลด</h4></button>
                                    <h4 className="media-heading grid_1" style={{ color: "blue", float: "right" }}>ลบ</h4>
                                </div>
                            </div>
                        </li>
                    ))}
                </div>
                :
                <div className="dropZone" >
                    <div className="mt-2">
                        <img src={Document} alt="Generic placeholder thumbnail" height="100px" />
                    </div>
                    <div className="top-text">ไม่พบไฟล์เอกสาร</div>
                    <div className="top-text">คลิกที่ "+" ในการแนบเอกสาร</div>
                </div>

            }
        </div>
    )
}

export default Files