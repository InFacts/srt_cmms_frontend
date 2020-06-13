import React from 'react';
import { useFormikContext } from 'formik';

import Document from '../../../images/document.svg';
import {downloadAttachmentDocumentData} from '../../helper';
import { TOOLBAR_MODE } from '../../redux/modules/toolbar'
import { navBottomOnReady, navBottomWarning } from '../../redux/modules/nav-bottom'
import { useDispatch, shallowEqual, useSelector } from 'react-redux'

const Files = () => {
    const dispatch = useDispatch();
    const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
    const mimeTypeRegexp = /^(application|audio|example|image|message|model|multipart|text|video)\/[a-z0-9\.\+\*-]+$/;
    const extRegexp = /\.[a-zA-Z0-9]*$/;
    const { values, setFieldValue } = useFormikContext();
    
    const fileExtension = (file) => {
        let extensionSplit = file.name.split('.')
        if (extensionSplit.length > 1) {
            return extensionSplit[extensionSplit.length - 1]
        } else {
            return 'none'
        }
    }

    const fileSizeReadable = (size) => {
        if (size >= 1000000000) {
            return Math.ceil(size / 1000000000) + 'GB'
        } else if (size >= 1000000) {
            return Math.ceil(size / 1000000) + 'MB'
        } else if (size >= 1000) {
            return Math.ceil(size / 1000) + 'kB'
        } else {
            return Math.ceil(size) + 'B'
        }
    }

    const mimeTypeLeft = (mime) => {
        return mime.split('/')[0]
    }

    const fileSizeAcceptable = (file) => {
        let maxFileSize = 10 ** 9; // 10^9 = 1GB
        if (file.size > maxFileSize) {
            dispatch(navBottomWarning('Attachment', file.name, 'ขนาดใหญ่เกิน 1GB'));
            dispatch(navBottomWarning('Attachment', file.name, 'ขนาดใหญ่เกิน 1GB'));
            setTimeout(function(){ dispatch(navBottomOnReady('', '', '')); }, 5000);
            return false
        } else {
            return true
        }
    }

    const convertFormFileToAPI = (e) => {
        let filesAdded = [];
        let files = [];
        let filesOld = values.files;
        console.log("filesOld", filesOld)
        for (let i = 0; i < e.target.files.length; i++) {
            filesAdded.push(e.target.files[i]);
        }
        filesAdded.map((newFile, index) => {
            newFile.id = 'files-' + index;
            newFile.extension = fileExtension(newFile);
            newFile.sizeReadable = fileSizeReadable(newFile.size);
            if (newFile.type && mimeTypeLeft(newFile.type) === 'image') {
                newFile.preview = { type: 'image', url: window.URL.createObjectURL(newFile) };
            } else {
                newFile.preview = { type: 'file' };
            }
            if (fileSizeAcceptable(newFile)) {
                files.push(newFile);
            }
        })
        setFieldValue("file", files);

        
        // setFieldValue("files_in_database", files);
    }

    return (
        <div>
            <h4 className="head-title-bottom mt-2">ข้อมูลแนบไฟล์</h4>
            <div className="u-clearfix">
                <div className="u-float-left">
                    <span className="top-text">ไฟล์เอกสาร </span>
                    <span className="top-text" style={{color:"red"}}>(ขนาดไฟล์ไม่เกิน 1GB)</span>
                </div>
                <div className="u-float-right">
                    <div className="upload-btn-wrapper">
                        <button type="button" className="btn" disabled={toolbar.mode !== TOOLBAR_MODE.SEARCH ? false:true}>เพิ่มไฟล์</button>
                        <input id="file" name="file" type="file" onChange={convertFormFileToAPI} multiple disabled={toolbar.mode !== TOOLBAR_MODE.SEARCH ? false:true}/>
                    </div>
                </div>
            </div>
            {values.files_in_database.length !== 0 && values.files_in_database !== undefined ?
                <div className="dropZone-list">
                    {values.files_in_database.map((oldFile, index) => (
                        <li className="list-group-item" key={index}>
                            <div className="media-body">
                                <h4 className="media-heading grid_5" style={{ fontWeight: 'bold' }}>{oldFile.filename}</h4>
                                <h4 className="media-heading grid_2">ขนาดไฟล์ : {fileSizeReadable(oldFile.sizeReadable)}</h4>
                                <div className="float-right">
                                    <button type="button" className="btn media-heading grid_1" style={{ color: "blue", padding: "4px" }} onClick={ () => downloadAttachmentDocumentData(values.document_id, oldFile.id) }>ดาวน์โหลด</button>
                                    {toolbar.mode !== TOOLBAR_MODE.SEARCH &&
                                        <button type="button" className="btn media-heading grid_1" style={{ color: "blue", padding: "4px" }}>ลบ</button> }
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




export default Files;