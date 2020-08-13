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
    const [url, setUrl] = useState(props.documentTypeGroupID !== "document_all_type" ?
        `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/search?document_type_group_id=${props.documentTypeGroupID}&internal_document_id=${documentID}&page_size=1000` :
        `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/search?&internal_document_id=${documentID}&page_size=1000`)
    const { setFieldValue } = useFormikContext();
    const [forceRefresh, setForceRefresh] = useState(false);
    const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
    const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
    const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);
    const factUsers = useSelector((state) => ({ ...state.api.fact.users }), shallowEqual);
    const factDistricts = useSelector((state) => ({ ...state.api.fact.districts }), shallowEqual);
    const factNodes = useSelector((state) => ({ ...state.api.fact.nodes }), shallowEqual);

    const [valueDivisionID, setValueDivisionID] = useState([]);
    const [valueDistrictID, setValueDistrictID] = useState('');
    const [valueNodeID, setValueNodeID] = useState('');
    const [valueNodeIDWorkOrderPM, setValueNodeIDWorkOrderPM] = useState([]);
    const [valueNodeIDFormDistrictWorkOrderPM, setValueNodeIDFormDistrictWorkOrderPM] = useState([]);

    useEffect(() => {
        let users = factUsers.items;
        let user = users.find(user => `${user.user_id}` === `${decoded_token.id}`);
        if (user) {
            let nodes = factNodes.items;
            let districts = factDistricts.items;
            if (!user.position[0].district_id && !user.position[0].division_id) { //สำหรับ User ที่เป็น node
                let node = nodes.find(node => `${node.node_id}` === `${user.position[0].node_id}`);
                // console.log("node", node)
                if (node) {
                    setValueNodeID(user.position[0].node_id)
                }
            } else if (!user.position[0].node_id && !user.position[0].division_id) { //สำหรับ User ที่เป็น district
                let list_nodes = [];
                nodes.map((node) => {
                    if (`${node.district_id}` === `${user.position[0].district_id}`) {
                        list_nodes.push(node)
                    }
                })
                setValueNodeIDWorkOrderPM(list_nodes)
                setValueDistrictID(user.position[0].district_id)
            } else if (!user.position[0].node_id && !user.position[0].district_id) { //สำหรับ User ที่เป็น division
                let list_district = [];
                let list_nodes = [];
                districts.map((district) => {
                    if (`${district.division_id}` === `${user.position[0].division_id}`) {
                        list_district.push(district)
                    }
                    nodes.map((node) => {
                        if (`${district.division_id}` === `${user.position[0].division_id}`) {
                            if (`${node.district_id}` === `${district.district_id}`) {
                                list_nodes.push(node)
                            }
                        }
                    })
                })
                setValueDivisionID(list_district)
                setValueNodeIDFormDistrictWorkOrderPM(list_nodes)
            }
        }
    }, [decoded_token.id, factUsers.items, factUsers.items, factDistricts.items, factNodes.items])

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
                            <button className="button-blue edit grid_1 mr-5" type="button" onClick={() => setUrl(props.documentTypeGroupID !== "document_all_type" ?
                                `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/search?document_type_group_id=${props.documentTypeGroupID}&internal_document_id=${documentID}` :
                                `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/search?&internal_document_id=${documentID}`)}>ค้นหา</button>
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
                                    // console.log("document>>>", document)
                                    // console.log("decoded_token.has_position", decoded_token)
                                    // <<<<<<======= DOCUMENT SPARE ===========>>>>>>>>>
                                    if (document.dest_warehouse_id && document.src_warehouse_id || document.physical_count_warehouse_id
                                        || document.inventory_adjustment_warehouse_id) {
                                        let findWarehouse = decoded_token.has_position ?
                                            decoded_token.has_position[0].warehouse_id ?
                                                decoded_token.has_position[0].warehouse_id :
                                                "no_warehouse" : null;
                                        if (findWarehouse === document.dest_warehouse_id || findWarehouse === document.src_warehouse_id) {
                                            // console.log("findWarehouse>>>>")
                                            return (
                                                <tr key={index} id={index}>
                                                    <td className="edit-padding"> {document.internal_document_id} </td>
                                                    <td className="edit-padding"> {document.created_on.split(".")[0].replace("T", " เวลา ") + " น."} </td>
                                                    <td className="edit-padding"> {document.document_status_en}</td>
                                                    <td className="edit-padding text-center">
                                                        <button type="button" className="button-blue"
                                                            onClick={() => setFieldValue(`${props.name}`, document.internal_document_id, true)}
                                                            aria-label="Close active modal" aria-controls={props.id} >เลือก</button>
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
                                                        <button type="button" className="button-blue"
                                                            onClick={() => setFieldValue(`${props.name}`, document.internal_document_id, true)}
                                                            aria-label="Close active modal" aria-controls={props.id} >เลือก</button>
                                                    </td>
                                                </tr>
                                            )
                                        } else if (findWarehouse === document.physical_count_warehouse_id || findWarehouse === document.inventory_adjustment_warehouse_id) {
                                            // console.log("physical_count_warehouse_id or inventory_adjustment_warehouse_id")
                                            return (
                                                <tr key={index} id={index}>
                                                    <td className="edit-padding"> {document.internal_document_id} </td>
                                                    <td className="edit-padding"> {document.created_on.split(".")[0].replace("T", " เวลา ") + " น."} </td>
                                                    <td className="edit-padding"> {document.document_status_en}</td>
                                                    <td className="edit-padding text-center">
                                                        <button type="button" className="button-blue"
                                                            onClick={() => setFieldValue(`${props.name}`, document.internal_document_id, true)}
                                                            aria-label="Close active modal" aria-controls={props.id} >เลือก</button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    } else {  // <<<<<<======= DOCUMENT PMT ===========>>>>>>>>>
                                        // console.log("dest_warehouse and src_warehouse is null")
                                        // document.work_order_district_id && document.work_order_district_id === valueDistrictID
                                        if (valueNodeID ? valueNodeID === document.work_order_node_id : valueDistrictID === document.work_order_district_id) {
                                            console.log("work_order")
                                            return (
                                                <tr key={index} id={index}>
                                                    <td className="edit-padding"> {document.internal_document_id} </td>
                                                    <td className="edit-padding"> {document.created_on.split(".")[0].replace("T", " เวลา ") + " น."} </td>
                                                    <td className="edit-padding"> {document.document_status_en}</td>
                                                    <td className="edit-padding text-center">
                                                        <button type="button" className="button-blue"
                                                            onClick={() => setFieldValue(`${props.name}`, document.internal_document_id, true)}
                                                            aria-label="Close active modal" aria-controls={props.id} >เลือก</button>
                                                    </td>
                                                </tr>
                                            )
                                        } else if (valueNodeID ? valueNodeID === document.ss101_node_id : valueDistrictID === document.ss101_district_id) {
                                            console.log("ss101")
                                            return (
                                                <tr key={index} id={index}>
                                                    <td className="edit-padding"> {document.internal_document_id} </td>
                                                    <td className="edit-padding"> {document.created_on.split(".")[0].replace("T", " เวลา ") + " น."} </td>
                                                    <td className="edit-padding"> {document.document_status_en}</td>
                                                    <td className="edit-padding text-center">
                                                        <button type="button" className="button-blue"
                                                            onClick={() => setFieldValue(`${props.name}`, document.internal_document_id, true)}
                                                            aria-label="Close active modal" aria-controls={props.id} >เลือก</button>
                                                    </td>
                                                </tr>
                                            )
                                        } else if (valueNodeID ? valueNodeID === document.equipment_installation_node_id : valueDistrictID === document.equipment_installation_district_id) {
                                            console.log("equipment_installation")
                                            return (
                                                <tr key={index} id={index}>
                                                    <td className="edit-padding"> {document.internal_document_id} </td>
                                                    <td className="edit-padding"> {document.created_on.split(".")[0].replace("T", " เวลา ") + " น."} </td>
                                                    <td className="edit-padding"> {document.document_status_en}</td>
                                                    <td className="edit-padding text-center">
                                                        <button type="button" className="button-blue"
                                                            onClick={() => setFieldValue(`${props.name}`, document.internal_document_id, true)}
                                                            aria-label="Close active modal" aria-controls={props.id} >เลือก</button>
                                                    </td>
                                                </tr>
                                            )
                                        } else if (valueNodeID ? valueNodeID === document.selector_pm_plan_node_id : valueDistrictID === document.selector_pm_plan_district_id) {
                                            console.log("selector_pm_plan")
                                            return (
                                                <tr key={index} id={index}>
                                                    <td className="edit-padding"> {document.internal_document_id} </td>
                                                    <td className="edit-padding"> {document.created_on.split(".")[0].replace("T", " เวลา ") + " น."} </td>
                                                    <td className="edit-padding"> {document.document_status_en}</td>
                                                    <td className="edit-padding text-center">
                                                        <button type="button" className="button-blue"
                                                            onClick={() => setFieldValue(`${props.name}`, document.internal_document_id, true)}
                                                            aria-label="Close active modal" aria-controls={props.id} >เลือก</button>
                                                    </td>
                                                </tr>
                                            )
                                        } else if (valueNodeID === document.node_id) {
                                            console.log("work_order_pmt")
                                            return (
                                                <tr key={index} id={index}>
                                                    <td className="edit-padding"> {document.internal_document_id} </td>
                                                    <td className="edit-padding"> {document.created_on.split(".")[0].replace("T", " เวลา ") + " น."} </td>
                                                    <td className="edit-padding"> {document.document_status_en}</td>
                                                    <td className="edit-padding text-center">
                                                        <button type="button" className="button-blue"
                                                            onClick={() => setFieldValue(`${props.name}`, document.internal_document_id, true)}
                                                            aria-label="Close active modal" aria-controls={props.id} >เลือก</button>
                                                    </td>
                                                </tr>
                                            )
                                        } else if (document.document_type_id === 2011 || document.document_type_id === 2071) {
                                            // Work Request // Maintenant Item ต้องเห็นทุกเอกสาร 
                                            console.log("Work Request // Maintenant Item")
                                            return (
                                                <tr key={index} id={index}>
                                                    <td className="edit-padding"> {document.internal_document_id} </td>
                                                    <td className="edit-padding"> {document.created_on.split(".")[0].replace("T", " เวลา ") + " น."} </td>
                                                    <td className="edit-padding"> {document.document_status_en}</td>
                                                    <td className="edit-padding text-center">
                                                        <button type="button" className="button-blue"
                                                            onClick={() => setFieldValue(`${props.name}`, document.internal_document_id, true)}
                                                            aria-label="Close active modal" aria-controls={props.id} >เลือก</button>
                                                    </td>
                                                </tr>
                                            )
                                        } else if (valueDivisionID.length !== 0) {
                                            // console.log("valueDivisionID.length !== 0")
                                            let work_order_division = valueDivisionID.find(division => `${division.district_id}` === `${document.work_order_district_id}`);
                                            let ss101_division = valueDivisionID.find(division => `${division.district_id}` === `${document.ss101_district_id}`);
                                            let equipment_installation_division = valueDivisionID.find(division => `${division.district_id}` === `${document.equipment_installation_district_id}`);
                                            let selector_pm_plan_division = valueDivisionID.find(division => `${division.district_id}` === `${document.selector_pm_plan_district_id}`);
                                            if (document.work_order_node_id && work_order_division) {
                                                console.log("DIVISION")
                                                return (
                                                    <tr key={index} id={index}>
                                                        <td className="edit-padding"> {document.internal_document_id} </td>
                                                        <td className="edit-padding"> {document.created_on.split(".")[0].replace("T", " เวลา ") + " น."} </td>
                                                        <td className="edit-padding"> {document.document_status_en}</td>
                                                        <td className="edit-padding text-center">
                                                            <button type="button" className="button-blue"
                                                                onClick={() => setFieldValue(`${props.name}`, document.internal_document_id, true)}
                                                                aria-label="Close active modal" aria-controls={props.id} >เลือก</button>
                                                        </td>
                                                    </tr>
                                                )
                                            } else if (document.ss101_node_id && ss101_division) {
                                                console.log("DIVISION")
                                                return (
                                                    <tr key={index} id={index}>
                                                        <td className="edit-padding"> {document.internal_document_id} </td>
                                                        <td className="edit-padding"> {document.created_on.split(".")[0].replace("T", " เวลา ") + " น."} </td>
                                                        <td className="edit-padding"> {document.document_status_en}</td>
                                                        <td className="edit-padding text-center">
                                                            <button type="button" className="button-blue"
                                                                onClick={() => setFieldValue(`${props.name}`, document.internal_document_id, true)}
                                                                aria-label="Close active modal" aria-controls={props.id} >เลือก</button>
                                                        </td>
                                                    </tr>
                                                )
                                            } else if (document.equipment_installation_district_id && equipment_installation_division) {
                                                console.log("DIVISION")
                                                return (
                                                    <tr key={index} id={index}>
                                                        <td className="edit-padding"> {document.internal_document_id} </td>
                                                        <td className="edit-padding"> {document.created_on.split(".")[0].replace("T", " เวลา ") + " น."} </td>
                                                        <td className="edit-padding"> {document.document_status_en}</td>
                                                        <td className="edit-padding text-center">
                                                            <button type="button" className="button-blue"
                                                                onClick={() => setFieldValue(`${props.name}`, document.internal_document_id, true)}
                                                                aria-label="Close active modal" aria-controls={props.id} >เลือก</button>
                                                        </td>
                                                    </tr>
                                                )
                                            } else if (document.selector_pm_plan_district_id && selector_pm_plan_division) {
                                                console.log("DIVISION")
                                                return (
                                                    <tr key={index} id={index}>
                                                        <td className="edit-padding"> {document.internal_document_id} </td>
                                                        <td className="edit-padding"> {document.created_on.split(".")[0].replace("T", " เวลา ") + " น."} </td>
                                                        <td className="edit-padding"> {document.document_status_en}</td>
                                                        <td className="edit-padding text-center">
                                                            <button type="button" className="button-blue"
                                                                onClick={() => setFieldValue(`${props.name}`, document.internal_document_id, true)}
                                                                aria-label="Close active modal" aria-controls={props.id} >เลือก</button>
                                                        </td>
                                                    </tr>
                                                )
                                            } else if (document.selector_pm_plan_district_id && selector_pm_plan_division) {
                                                console.log("DIVISION")
                                                return (
                                                    <tr key={index} id={index}>
                                                        <td className="edit-padding"> {document.internal_document_id} </td>
                                                        <td className="edit-padding"> {document.created_on.split(".")[0].replace("T", " เวลา ") + " น."} </td>
                                                        <td className="edit-padding"> {document.document_status_en}</td>
                                                        <td className="edit-padding text-center">
                                                            <button type="button" className="button-blue"
                                                                onClick={() => setFieldValue(`${props.name}`, document.internal_document_id, true)}
                                                                aria-label="Close active modal" aria-controls={props.id} >เลือก</button>
                                                        </td>
                                                    </tr>
                                                )
                                            } else if (valueNodeIDFormDistrictWorkOrderPM.length !== 0 && document.node_id) {
                                                let node = valueNodeIDFormDistrictWorkOrderPM.find(node => `${node.node_id}` === `${document.node_id}`);
                                                if (node) {
                                                    return (
                                                        <tr key={index} id={index}>
                                                            <td className="edit-padding"> {document.internal_document_id} </td>
                                                            <td className="edit-padding"> {document.created_on.split(".")[0].replace("T", " เวลา ") + " น."} </td>
                                                            <td className="edit-padding"> {document.document_status_en}</td>
                                                            <td className="edit-padding text-center">
                                                                <button type="button" className="button-blue"
                                                                    onClick={() => setFieldValue(`${props.name}`, document.internal_document_id, true)}
                                                                    aria-label="Close active modal" aria-controls={props.id} >เลือก</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            } 
                                        } else if (valueNodeIDWorkOrderPM.length !== 0 && document.node_id) {
                                            console.log(">>>>>")
                                            let work_order_pmt_node_id = valueNodeIDWorkOrderPM.find(node_id => `${node_id.node_id}` === `${document.node_id}`);
                                            if (work_order_pmt_node_id) {
                                                return (
                                                    <tr key={index} id={index}>
                                                        <td className="edit-padding"> {document.internal_document_id} </td>
                                                        <td className="edit-padding"> {document.created_on.split(".")[0].replace("T", " เวลา ") + " น."} </td>
                                                        <td className="edit-padding"> {document.document_status_en}</td>
                                                        <td className="edit-padding text-center">
                                                            <button type="button" className="button-blue"
                                                                onClick={() => setFieldValue(`${props.name}`, document.internal_document_id, true)}
                                                                aria-label="Close active modal" aria-controls={props.id} >เลือก</button>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        }
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