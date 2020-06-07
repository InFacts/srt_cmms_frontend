import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux'
import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

// import {handleChange} from '../../redux/modules/form_data.js';
import { useFormikContext } from 'formik';

const PopupModalDocument = (props) => {
    const [data, setData] = useState([]);
    const [documentID, setDocumentID] = useState("");
    const [url, setUrl] = useState(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/search?document_type_group_id=${props.documentTypeGroupID}&internal_document_id=${documentID}`)
    const { setFieldValue } = useFormikContext();
    const [forceRefresh, setForceRefresh] = useState(false);
    const toolbar = useSelector((state ) => ({...state.toolbar}), shallowEqual);

    useEffect(() => {
        const fetchData = () => {
            axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
                .then((res) => {
                    setData(res.data.results);
                })
        };
        fetchData();
    }, [url, toolbar.mode]);

    return (
        <div className="modal" id={props.id} style={{ display: "none" }}>
            <div className="gray-board">
                <p className="head-title-modal edit">ค้นหาเลขที่เอกสาร</p>
                <div className="container_12 edit-padding">

                    <div className="container_12">
                        <div className="grid_2"><p className="cancel-default">เลขที่เอกสาร</p></div>
                        <div className="grid_8 pull_0">
                            <input type="text" className="cancel-default grid_3" value={documentID} onChange={e => setDocumentID(e.target.value)} />
                            <button className="button-blue edit grid_1 mr-5" type="button" onClick={() => setUrl(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/search?document_type_group_id=${props.documentTypeGroupID}&internal_document_id=${documentID}`)}>ค้นหา</button>
                        </div>
                    </div>

                    <div className="container_12">
                        <table className="table-many-column mt-3">
                            <thead>
                                <tr>
                                    <th className="font" style={{ minWidth: "300px" }}>เลขที่เอกสาร</th>
                                    <th className="font" style={{ minWidth: "450px" }}>สร้างวันที่</th>
                                    <th className="font" style={{ minWidth: "150px" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(function (document, index) {
                                    return (
                                        <tr key={index} id={index}>
                                            <td className="edit-padding" style={{ minWidth: "150px" }}> {document.internal_document_id} </td>
                                            <td className="edit-padding" style={{ minWidth: "300px" }}> {document.created_on.replace("T", " เวลา ").slice(0, 21) + " น."} </td>
                                            <td className="edit-padding text-center" style={{ minWidth: "150px" }}>
                                                <button type="button" className="button-blue" onClick={() => setFieldValue(`${props.name}`, document.internal_document_id, true)} aria-label="Close active modal" aria-controls={props.id} >เลือก</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    <button className="button-blue float-right grid_1 mr-5 mt-3" type="button" aria-label="Close active modal" aria-controls={props.id}>กลับ</button>

                </div>
            </div>
        </div>
    )
}

export default PopupModalDocument;