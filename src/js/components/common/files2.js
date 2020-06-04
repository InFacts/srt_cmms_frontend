import React from 'react';
import { useField } from 'formik';

import Document from '../../../images/document.svg';

const Files = ({ ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div>
            <h4 className="head-title-bottom mt-2">ข้อมูลแนบไฟล์</h4>
            <div className="u-clearfix">
                <div className="u-float-left">
                    <span className="top-text">ไฟล์เอกสาร</span>
                </div>
                <div className="u-float-right">
                    <div className="upload-btn-wrapper">
                        <button className="btn" disabled={props.disabled}>เพิ่มไฟล์</button>
                        <input type="file" disabled={props.disabled} {...field} {...props} />
                    </div>
                </div>
            </div>
            {/* {console.log("desrciptionFilesLength", props.desrciptionFilesLength)} */}
            {props.desrciptionFilesLength !== 0 && props.desrciptionFilesLength !== undefined
                ?
                <div className="dropZone-list">
                    {props.desrciptionFiles.map((desrciptionFiles, index) => (
                        <li className="list-group-item">
                            <div className="media-body" key={index}>
                                <h4 className="media-heading grid_5" style={{ fontWeight: 'bold' }}>{desrciptionFiles.filename}</h4>
                                <h4 className="media-heading grid_2">ขนาดไฟล์ : {desrciptionFiles.sizeReadable}</h4>
                                <div className="float-right">
                                    <button className="btn media-heading grid_1" style={{ color: "blue", padding: "4px" }} onClick={(e) => props.HandleDownload(e)}>ดาวน์โหลด</button>
                                    <button className="btn media-heading grid_1" style={{ color: "blue", padding: "4px" }} disabled={props.disabled}>ลบ</button>
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