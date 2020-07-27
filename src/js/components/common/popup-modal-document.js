import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux'
import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';
import { FACTS } from '../../redux/modules/api/fact.js';

// import {handleChange} from '../../redux/modules/form_data.js';
import { useFormikContext } from 'formik';

const PopupModalDocument = (props) => {
    const [data, setData] = useState([]);
    const [documentID, setDocumentID] = useState("");
    const [url, setUrl] = useState(props.documentTypeGroupID !== "document_all_type" ? `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/search?document_type_group_id=${props.documentTypeGroupID}&internal_document_id=${documentID}&page_size=1000` : `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/search?&internal_document_id=${documentID}&page_size=1000`)
    const { setFieldValue } = useFormikContext();
    const [forceRefresh, setForceRefresh] = useState(false);
    const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
    const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
    const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);

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
                            <button className="button-blue edit grid_1 mr-5" type="button" onClick={() => setUrl(props.documentTypeGroupID !== "document_all_type" ? `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/search?document_type_group_id=${props.documentTypeGroupID}&internal_document_id=${documentID}` : `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/search?&internal_document_id=${documentID}`)}>ค้นหา</button>
                        </div>
                    </div>

                    <div className="container_12">
                        <table className="table-many-column mt-3" style={{ height: "270px" }}>
                            <thead>
                                <tr>
                                    <th className="font" style={{ minWidth: "300px" }}>เลขที่เอกสาร</th>
                                    <th className="font" style={{ minWidth: "225px" }}>สร้างวันที่</th>
                                    <th className="font" style={{ minWidth: "225px" }}>สถานะเอกสาร</th>
                                    <th className="font" style={{ minWidth: "150px" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(function (document, index) {
                                    if (document.dest_warehouse_id && document.src_warehouse_id) {
                                        let findWarehouse = decoded_token.has_position ? decoded_token.has_position[0].warehouse_id ? decoded_token.has_position[0].warehouse_id : "no_warehouse" : null;
                                        if (findWarehouse === document.dest_warehouse_id || findWarehouse === document.src_warehouse_id) {
                                            // console.log("findWarehouse>>>>")
                                            return (
                                                <tr key={index} id={index}>
                                                    <td className="edit-padding"> {document.internal_document_id} </td>
                                                    <td className="edit-padding"> {document.created_on.split(".")[0].replace("T", " เวลา ") + " น."} </td>
                                                    <td className="edit-padding"> {document.document_status_en}</td>
                                                    <td className="edit-padding text-center">
                                                        <button type="button" className="button-blue" onClick={() => setFieldValue(`${props.name}`, document.internal_document_id, true)} aria-label="Close active modal" aria-controls={props.id} >เลือก</button>
                                                    </td>
                                                </tr>
                                            )
                                        } else if (findWarehouse === "no_warehouse") {
                                            // console.log("no_warehouse")
                                            return (
                                                <tr key={index} id={index}>
                                                    <td className="edit-padding"> {document.internal_document_id} </td>
                                                    <td className="edit-padding"> {document.created_on.split(".")[0].replace("T", " เวลา ") + " น."} </td>
                                                    <td className="edit-padding"> {document.document_status_en}</td>
                                                    <td className="edit-padding text-center">
                                                        <button type="button" className="button-blue" onClick={() => setFieldValue(`${props.name}`, document.internal_document_id, true)} aria-label="Close active modal" aria-controls={props.id} >เลือก</button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    } else {
                                        // console.log("dest_warehouse and src_warehouse is null")
                                        return (
                                            <tr key={index} id={index}>
                                                <td className="edit-padding"> {document.internal_document_id} </td>
                                                <td className="edit-padding"> {document.created_on.split(".")[0].replace("T", " เวลา ") + " น."} </td>
                                                <td className="edit-padding"> {document.document_status_en}</td>
                                                <td className="edit-padding text-center">
                                                    <button type="button" className="button-blue" onClick={() => setFieldValue(`${props.name}`, document.internal_document_id, true)} aria-label="Close active modal" aria-controls={props.id} >เลือก</button>
                                                </td>
                                            </tr>
                                        )
                                    }
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