import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux'
import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';
import { useFormikContext } from 'formik';

const TableApproval = (props) => {

    const [data, setData] = useState([]);
    const [documentID, setDocumentID] = useState("");
    const { setFieldValue } = useFormikContext();
    const [url, setUrl] = useState(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/search?document_type_group_id=${props.documentTypeGroupID}&internal_document_id=${documentID}`)


    useEffect(() => {
        const fetchData = () => {
            axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
                .then((res) => {
                    setData(res.data.results);
                })
        };
        fetchData();
    }, [url]);


    return (
        <>

            <table className="table-many-column mt-2">
                <thead>
                    <tr>
                        <th className="font text-center" style={{ width: "350px" }}>ประเภทเอกสาร</th>
                        <th className="font text-center" style={{ width: "350px" }}>รายละเอียด</th>
                        <th className="font text-center" style={{ width: "300px" }}>กำหนดลำดับเอกสาร</th>
                    </tr>
                </thead>
                <tbody>
                    {props.bodyTableStatus.map((resApprove, i) => {
                        return (
                            resApprove.position_group.name !== "This"
                                ?
                                <tr key={i} id={i}>
                                    <td className="edit-padding text-center">{resApprove.position_group.name}</td>
                                    <td className="edit-padding">{resApprove.position.length === 0 ? "" : resApprove.position[0].name}</td>
                                    <td className="edit-padding text-center">
                                        <button type="button" className="button-blue" onClick={() => setFieldValue(`${props.name}`, document.internal_document_id, true)} >เลือก</button>    
                                    </td>
                                </tr>
                                :
                                null
                        )
                    })}
                </tbody>
            </table>
        </>

    )
}

export default TableApproval;