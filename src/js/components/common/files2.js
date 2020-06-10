// import React from 'react';
// import { useField } from 'formik';

// import Document from '../../../images/document.svg';

// const handleFileSelect = (e) => {
//     console.log("--- handleFileSelect - ---- ")
// 	if(!e.target.files) return;
//     var files = e.target.files;
//     console.log("--- handleFileSelect - ---- ", files)
// 	for(var i=0; i < files.length; i++) {
// 		var f = files[i];
// 	}
// }

// const Files = ({...props}) => {
//     const [field, meta] = useField();
//     // console.log("field", field)
//     // console.log("meta", meta)
//     // console.log("props", props)
//     return (
//         <div>
//             <h4 className="head-title-bottom mt-2">ข้อมูลแนบไฟล์</h4>
//             <div className="u-clearfix">
//                 <div className="u-float-left">
//                     <span className="top-text">ไฟล์เอกสาร</span>
//                 </div>
//                 <div className="u-float-right">
//                     <div className="upload-btn-wrapper">
//                         <button type="button" className="btn">เพิ่มไฟล์</button>
//                         <input type="file" onChange={handleFileSelect}  multiple/>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Files




import React from 'react';
import { useField } from 'formik';
import { useFormikContext } from 'formik';

import Document from '../../../images/document.svg';

const Files = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props);
    // console.log("field", field)
    // console.log("meta", meta)
    // console.log("props", props)
    // console.log("props.desrciptionFiles", props.desrciptionFiles)
    return (
        <div>
            <h4 className="head-title-bottom mt-2">ข้อมูลแนบไฟล์</h4>
            <div className="u-clearfix">
                <div className="u-float-left">
                    <span className="top-text">ไฟล์เอกสาร</span>
                </div>
                <div className="u-float-right">
                    <div className="upload-btn-wrapper">
                        <button type="button" className="btn" disabled={props.disabled}>เพิ่มไฟล์</button>
                        {/* <input type="file" disabled={props.disabled} {...field} {...props}/> */}
                        <input id="file" name="file" type="file" onChange={(event) => {setFieldValue("file[0].filename", event.currentTarget.files[0]);}} disabled={props.disabled} {...props} />
                    </div>
                </div>
            </div>
            {props.desrciptionFilesLength !== 0 && props.desrciptionFilesLength !== undefined
                ?
                <div className="dropZone-list">
                    {props.desrciptionFiles.map((desrciptionFiles, index) => (
                        <li className="list-group-item">
                            <div className="media-body" key={index}>
                                <h4 className="media-heading grid_5" style={{ fontWeight: 'bold' }}>{desrciptionFiles.filename.name}</h4>
                                <h4 className="media-heading grid_2">ขนาดไฟล์ : {desrciptionFiles.filename.size}</h4>
                                <div className="float-right">
                                    <button type="button" className="btn media-heading grid_1" style={{ color: "blue", padding: "4px" }} onClick={(e) => props.HandleDownload(e)} disabled={props.disabledForModeAdd}>ดาวน์โหลด</button>
                                    <button type="button" className="btn media-heading grid_1" style={{ color: "blue", padding: "4px" }} 
                                    onClick={(e) => props.HandleDeleteFile(e)}
                                    disabled={props.disabled}>ลบ</button>
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