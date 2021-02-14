import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';

import Document from '../../../images/document.svg';
import { downloadAttachmentDocumentData, fetchAttachmentDocumentData, checkBooleanForEditHelper, uploadAttachmentDocumentData } from '../../helper';
import { TOOLBAR_MODE } from '../../redux/modules/toolbar'
import { navBottomOnReady, navBottomWarning } from '../../redux/modules/nav-bottom'
import { useDispatch, shallowEqual, useSelector } from 'react-redux'

import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

const BASE_URL = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}`;
const Files = () => {
    const dispatch = useDispatch();
    const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
    const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);
    const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
    const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);

    // const mimeTypeRegexp = /^(application|audio|example|image|message|model|multipart|text|video)\/[a-z0-9\.\+\*-]+$/;
    // const extRegexp = /\.[a-zA-Z0-9]*$/;
    const { values, setFieldValue } = useFormikContext();
    const checkBooleanForEdit = checkBooleanForEditHelper(values, decoded_token, fact)

    const fileExtension = (file) => {
        // console.log("file>>>>", file)
        if (file.name !== undefined) {
            let extensionSplit = file.name.split('.')
            if (extensionSplit.length > 1) {
                return extensionSplit[extensionSplit.length - 1]
            } else {
                return 'none'
            }
        } else if (file.filename !== undefined) {
            let extensionSplit = file.filename.split('.')
            if (extensionSplit.length > 1) {
                return extensionSplit[extensionSplit.length - 1]
            } else {
                return 'none'
            }
        }
        else {

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
        if (file.filename !== undefined) {
            if (file.size > maxFileSize) {
                dispatch(navBottomWarning('Attachment', file.name, 'ขนาดใหญ่เกิน 1GB'));
                setTimeout(function () { dispatch(navBottomOnReady('', '', '')); }, 5000);
                return false
            } else {
                return true
            }
        }
    }

    const convertFormFileToAPI = (e) => {
        let filesAdded = [];
        let files = [];
        // console.log("e.target...", e.target.files);
        for (let i = 0; i < e.target.files.length; i++) {
            filesAdded.push(e.target.files[i]);
        }
        for (let i = 0; i < values.files.length; i++) {
            // console.log("values.files[i]", values.files[i])
            filesAdded.push(values.files[i]);
        }
        filesAdded.map((newFile, index) => {
            newFile.id = 'files-' + index;
            // if (newFile.name !== undefined) { newFile.filename = Math.random().toString() + newFile.name; }
            if (newFile.name !== undefined) { newFile.filename = newFile.name; }
            newFile.extension = fileExtension(newFile);
            newFile.sizeReadable = fileSizeReadable(newFile.sizeReadable ? newFile.sizeReadable : newFile.size);
            newFile.isNew = true;
            if (newFile.type && mimeTypeLeft(newFile.type) === 'image') {
                // newFile.preview = { type: 'image', url: window.URL.createObjectURL(newFile) };
                newFile["Content-Type"] = "image";
                newFile["preview_url"] = window.URL.createObjectURL(newFile);
            } else {
                newFile["Content-Type"] = { type: 'file' };
            }
            if (fileSizeAcceptable(newFile)) {
                files.push(newFile);
            }
        })
        setFieldValue("files", files);
        console.log("convertFormFileToAPI values.files", files);
        if (values.document_id) {
            uploadAttachmentDocumentData(values.document_id, files)
        } else {
            return;
        }
    }

    const deleteFileInState = (e) => {
        // console.log("delete e.target...", e.target.parentNode.parentNode.parentNode);
        let index = e.target.parentNode.parentNode.parentNode.id;
        values.files.splice(index, 1);
        // console.log("delete values.files", values.files);
        setFieldValue("files", values.files);
    }

    return (
        <div style={{ padding: "10px" }}>
            <h4 className="head-title-bottom mt-2">ข้อมูลแนบไฟล์</h4>
            <div className="u-clearfix">
                <div className="u-float-left">
                    <span className="top-text">ไฟล์เอกสาร </span>
                    <span className="top-text" style={{ color: "red" }}>(ขนาดไฟล์ไม่เกิน 1GB)</span>
                </div>
                <div className="u-float-right">
                    <div className="upload-btn-wrapper">
                        {/* TODO: Add FILES */}
                        <button type="button" className="btn"
                        // disabled={toolbar.mode === TOOLBAR_MODE.SEARCH ? true : false }
                        >เพิ่มไฟล์</button>
                        <input id="file" name="file" type="file" onChange={convertFormFileToAPI} onClick={(e) => { e.target.value = null }} multiple
                        // disabled={toolbar.mode === TOOLBAR_MODE.SEARCH ? true :false}
                        />
                        {/* <button type="button" className="btn" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}>เพิ่มไฟล์</button> */}
                        {/* <input id="file" name="file" type="file" onChange={convertFormFileToAPI} multiple disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}/> */}
                    </div>
                </div>
            </div>
            {values.files.length !== 0 && values.files !== undefined ?
                <div className="dropZone-list">
                    {values.files.map((file, index) => (
                        <li className="list-group-item" key={file.id} id={index}>
                            {(file.preview_url !== undefined && (file.extension.indexOf("jpg") !== -1 || file.extension.indexOf("png") !== -1 || file.extension.indexOf("jpeg") !== -1 || file.extension.indexOf("JPG") !== -1 || file.extension.indexOf("PNG") !== -1 || file.extension.indexOf("JPEG") !== -1 || file.extension.indexOf("bmp") !== -1)) ?
                                <>
                                    <div className="media-body media-left">
                                        <img className="media-object" src={file.preview_url.indexOf("blob") !== -1 ? file.preview_url : `${BASE_URL}${file.preview_url}`} width={150} height={100} />
                                    </div>
                                    <div className="media-body">
                                        <h4 className="media-heading" style={{ fontWeight: 'bold', display: 'block' }}>{file.filename}</h4>
                                        <h4 className="media-heading">ขนาดไฟล์ : {file.isNew ? file.sizeReadable : fileSizeReadable(file.sizeReadable)}</h4>
                                        <div>
                                            {toolbar.mode === TOOLBAR_MODE.SEARCH &&
                                                <button type="button" className="btn media-heading" style={{ color: "blue", padding: "4px", display: 'block' }} onClick={() => downloadAttachmentDocumentData(values.document_id, file.id)}>ดาวน์โหลด</button>
                                            }
                                            {
                                                toolbar.mode !== TOOLBAR_MODE.SEARCH &&
                                                <button type="button" className="btn media-heading" style={{ color: "blue", padding: "4px", display: 'block' }} onClick={(e) => deleteFileInState(e)}>ลบ</button>
                                            }
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="media-body">
                                        <h4 className="media-heading grid_5" style={{ fontWeight: 'bold' }}>{file.filename}</h4>
                                        <h4 className="media-heading grid_2">ขนาดไฟล์ : {file.isNew ? file.sizeReadable : fileSizeReadable(file.sizeReadable)}</h4>
                                        <div className="float-right">
                                            {toolbar.mode === TOOLBAR_MODE.SEARCH &&
                                                <button type="button" className="btn media-heading grid_1" style={{ color: "blue", padding: "4px" }} onClick={() => downloadAttachmentDocumentData(values.document_id, file.id)}>ดาวน์โหลด</button>
                                            }
                                            {toolbar.mode !== TOOLBAR_MODE.SEARCH &&
                                                <button type="button" className="btn media-heading grid_1" style={{ color: "blue", padding: "4px" }} onClick={(e) => deleteFileInState(e)}>ลบ</button>
                                            }
                                        </div>
                                    </div>
                                </>
                            }
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