
import axios from "axios";
import { API_PORT_DATABASE } from './config_port.js';
import { API_URL_DATABASE } from './config_url.js';
import { fetchFactIfNeeded, FACTS } from './redux/modules/api/fact';
import { isEmptyChildren } from "formik";
// Constants
export const DOCUMENT_TYPE_ID = {
    GOODS_RECEIPT_PO: 101,
    GOODS_RETURN: 102,
    GOODS_RETURN_MAINTENANCE: 102,
    GOODS_RECEIPT_PO_NO_PO: 103,
    GOODS_USAGE: 111,
    GOODS_ISSUE: 112,
    INVENTORY_TRANSFER: 121,
    GOODS_FIX: 131,
    GOODS_RECEIPT_FIX: 132,

    WORK_REQUEST:201,
    WORK_ORDER: 202,
    WORK_ORDER_PM: 203,
    SS101: 204,
}

export const ICD_DOCUMENT_TYPE_GROUP_IDS = [
    DOCUMENT_TYPE_ID.GOODS_RECEIPT_PO,
    DOCUMENT_TYPE_ID.GOODS_RETURN,
    DOCUMENT_TYPE_ID.GOODS_RETURN_MAINTENANCE,
    DOCUMENT_TYPE_ID.GOODS_RECEIPT_PO_NO_PO,
    DOCUMENT_TYPE_ID.GOODS_USAGE,
    DOCUMENT_TYPE_ID.GOODS_ISSUE,
    DOCUMENT_TYPE_ID.INVENTORY_TRANSFER,
    DOCUMENT_TYPE_ID.GOODS_FIX,
    DOCUMENT_TYPE_ID.GOODS_RECEIPT_FIX,
]

export const MOVEMENT_GOODS_RECEIPT_PO_SCHEMA = {
    document_id: -1, //  required, redundant!
    po_id: '',
}
export const DOCUMENT_TYPE_ID_TO_MOVEMENT_SCHEMA = {
    [DOCUMENT_TYPE_ID.GOODS_RECEIPT_PO]: MOVEMENT_GOODS_RECEIPT_PO_SCHEMA
}

export const DOCUMENT_SCHEMA = {
    document_id: -1,
    // document_type_id: -1, // NOT USED since Backend will get SRC and DEST WH and determine type
    internal_document_id: "draft-SCHEMA",
    // created_on: "-1", // NOT USED since use DEFAULT NOW() of SQL
    remark: '',
    created_by_admin_id: -1,
    created_by_user_id: -1,
    // document_status_id:	-1, // NOT USED, handled by Backend
    // document_action_type_id	string // NOT USED, handled by Backend
    // refer_to_document_id	string // NOT USED, handled by Backend
}


export const ICD_LINE_ITEM_SCHEMA = {
    document_id: -1, //  required, redundant!
    line_number: -1,
    quantity: 0.0,
    uom_id: -1,
    per_unit_price: 0.0,
    item_id: -1,
    item_status_id: -1,
}



export const ICD_SCHEMA = {
    document_id: -1, //  required, redundant!
    dest_warehouse_id: -1,
    src_warehouse_id: -1,
    line_items: [],  // REFER TO LINE ITEM SCHEMA
    movement: {}, // REFER TO MOVEMENT SCHEMAS
}

export const WORK_REQUEST_SCHEMA = {
    accident_on: '', // accident_on วันเวลาเกิดเหตุ
    accident: '', // accident_detail อาการขัดข้อง
    request_by: '', // informed_by ผู้แจ้งเหตุ
    
    // responsible_by: '', // remove from db!
    location_district_id: -1, // location_district_id สถานที่ แขวง  [TODO DATABASE]
    location_node_id: -1, // location_node_id สถานที่ ตอน
    location_station_id: -1, // สถานที่ สถานี  [TODO DATABASE]
    location_detail: '', // location_detail รายละเอียดสถานที่
    remark: '',
}

// Helper Functions
export function getEmployeeIDFromUserID(userFact, userID) {
    let users = userFact.items;
    if (users && users.length > 0) {
        let user = users.find(user => `${user.user_id}` === `${userID}`)
        if (userID === 0) { // needs to be handled later
            return "Server"
        }
        if (user) {
            return user.employee_id;
        }
        return null;
    }
    return null;
}

export function getUserIDFromEmployeeID(userFact, employee_id) {
    employee_id = employee_id.split('\\')[0]; // Escape Character USERNAME CANT HAVE ESCAPE CHARACTER!
    let users = userFact.items;
    if (users && users.length > 0) {
        let user = users.find(user => `${user.employee_id}` === `${employee_id}`)
        if (user) {
            return user.user_id;
        }
        return null;
    }
    return null;
}
export function getItemIDFromInternalItemID(itemFact, internal_item_id) {
    internal_item_id = internal_item_id.split('\\')[0]; // Escape Character USERNAME CANT HAVE ESCAPE CHARACTER!
    let items = itemFact.items;
    if (items && items.length > 0) {
        let item = items.find(item => `${item.internal_item_id}` === `${internal_item_id}`)
        if (item) {
            return item.item_id;
        }
        return null;
    }
    return null;
}

export const getNumberFromEscapedString = (escapedString) => {
    if (Number.isInteger(escapedString)) {
        return escapedString;
    }
    return parseInt(escapedString.split('\\')[0]);
}

function isICD(document_type_group_id){
    return ICD_DOCUMENT_TYPE_GROUP_IDS.includes(document_type_group_id);
}

export const packDataFromValues = (fact, values, document_type_id) => {
    let document_part = {
        ...DOCUMENT_SCHEMA,
        document_id: values.document_id,
        internal_document_id: values.internal_document_id,
        remark: values.remark,
        created_by_admin_id: getUserIDFromEmployeeID(fact[FACTS.USERS], values.created_by_admin_employee_id),
        created_by_user_id: getUserIDFromEmployeeID(fact[FACTS.USERS], values.created_by_user_employee_id),
    }
    if(isICD(document_type_id)) {
        let line_items_part = [];
        values.line_items.map(line_item => {
            if (line_item.internal_item_id) {
                line_items_part.push({
                    ...ICD_LINE_ITEM_SCHEMA,
                    document_id: values.document_id,
                    line_number: line_item.line_number,
                    quantity: line_item.quantity,
                    uom_id: line_item.uom_id,
                    per_unit_price: line_item.per_unit_price,
                    item_id: getItemIDFromInternalItemID(fact[FACTS.ITEM], line_item.internal_item_id),
                    item_status_id: line_item.item_status_id,
                });
            }
        })
        let movement_part = {
            ...DOCUMENT_TYPE_ID_TO_MOVEMENT_SCHEMA[document_type_id],
            document_id: values.document_id,
        }
        switch (document_type_id) {
            case DOCUMENT_TYPE_ID.GOODS_RECEIPT_PO:
                movement_part = {
                    ...movement_part,
                    po_id: values.po_id
                }
                break;
            case DOCUMENT_TYPE_ID.GOODS_ISSUE:
                movement_part = {
                    ...movement_part,
                    refer_to_document_name: values.refer_to_document_name
                }
                break;
            case DOCUMENT_TYPE_ID.GOODS_RETURN:
                break;
            case DOCUMENT_TYPE_ID.GOODS_RETURN_MAINTENANCE:
                break;
            case DOCUMENT_TYPE_ID.GOODS_RECEIPT_PO_NO_PO:
                document_part = {
                    ...document_part,
                    refer_to_document_id: values.refer_to_document_id
                }
                break;
            case DOCUMENT_TYPE_ID.GOODS_RETURN_MAINTENANCE:
                document_part = {
                    ...document_part,
                    refer_to_document_id: values.refer_to_document_id
                }
                break;
            case DOCUMENT_TYPE_ID.GOODS_USAGE:
                break;
            default:
                break;
        }
    
        const icd_part = {
            ...ICD_SCHEMA,
            document_id: values.document_id,
            dest_warehouse_id: getNumberFromEscapedString(values.dest_warehouse_id),
            src_warehouse_id: getNumberFromEscapedString(values.src_warehouse_id),
            line_items: line_items_part,
            movement: movement_part, // REFER TO MOVEMENT SCHEMAS
    
        }
        return {
            document: document_part,
            specific: icd_part,
        }
    }else if (document_type_id === DOCUMENT_TYPE_ID.WORK_REQUEST){
        document_part["document_type_id"] = DOCUMENT_TYPE_ID.WORK_REQUEST;
        let work_request_part = {}
        Object.keys(WORK_REQUEST_SCHEMA).map((key) => {
            work_request_part[key] = values[key]
        })
        return {
            document: document_part,
            specific: work_request_part,
        }
    }
}


// const packForm = (document_id, document_show, list_show) => {
//     const line_items = [];
//     var line_number = 1
//     // console.log(list_show_mode_add)
//     list_show.map(function (item, index) {
//         if (item.description !== "") {
//             var myObj = {
//                 "document_id": document_id,
//                 "line_number": line_number,
//                 "quantity": parseInt(item.quantity),
//                 "uom_id": item.uom_group_id,
//                 "per_unit_price": parseFloat(item.per_unit_price),
//                 "item_id": item.item_id,
//                 "item_status_id": 1
//             };
//             line_number += 1;
//             return (
//                 line_items.push(myObj)
//             )
//         }
//     })

//     const data = {
//         "document": {
//             "document_id": document_id,
//             "internal_document_id": document_show.internal_document_id,
//             "created_by_admin_id": document_show.created_by_admin_id,
//             "created_by_user_id": document_show.created_by_user_id,
//             "remark": document_show.remark,
//         },
//         "specific": {
//             "document_id": document_id,
//             "dest_warehouse_id": parseInt(document_show.dest_warehouse_id),
//             "src_warehouse_id": 999,
//             "line_items": line_items,
//             "movement": {
//                 "document_id": document_id,
//                 "po_id": document_show.po_id
//             }
//         }
//     };
//     console.log(data)
//     return data;
// }

// Document API
const fetchDocumentData = (document_id) => new Promise((resolve, reject) => {
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/${document_id}`;
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((res) => {
            resolve(res.data);
        })
        .catch((err) => {
            reject(err)
        });
});

// Reserve a row in `document` table and return `document_id` and `internal_document_id`
// POST /document/new/0
export const createDocumentEmptyRow = () => new Promise((resolve) => {
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/new/0`;
    axios.post(url, null, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((res) => {
            console.log(" I am successful in creating empty document with document_id ", res.data.document_id)
            resolve({
                internal_document_id: res.data.internal_document_id, //"draft-bea9f75d-23db-49ae-a8d5-385121fb0234",
                document_id: res.data.document_id,  //"document_id": 14
            });
        })
});


export const fetchLastestInternalDocumentID = (document_type_group_id) => new Promise((resolve, reject) => {
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/search?document_type_group_id=${document_type_group_id}`
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((res) => {
            let results = res.data.results;
            if (results) {
                resolve(results[0].internal_document_id);
            } else {
                reject('No Results in fetchLastestInternalDocumentID');
            }
        })
});

// PUT /document/{document_id}/{document_type_group_id}
export const editDocument = (document_id, document_type_group_id, data) => new Promise((resolve, reject) => {
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/${document_id}/${document_type_group_id}`;
    axios.put(url, data, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((res) => {
            console.log(" I am successful in updating contents of document_id ", document_id)
            if(res.status === 200){
                console.log("wow i putted successfully status 200 ", res.data)
                resolve(res.data);
            } else {
                console.log(" i think i have some problems putting ",res.data)
                reject(res);
            }
        })
        .catch((err) => {
            reject(err)
        });
});


const fillObjectOfName = (object, fieldName, value) => {
    for (let key1 in object) {
        if (typeof object[key1] === "object") {
            for (let key2 in object[key1]) {
                if (typeof object[key1][key2] === "object") {
                    for (let key3 in object[key1][key2]) {
                        if (typeof object[key1][key2][key3] === "object") {
                            // recursive line items
                            let line_item = object[key1][key2][key3];
                            if (typeof line_item === "object") {
                                if (line_item.hasOwnProperty(fieldName)) {
                                    object[key1][key2][key3][fieldName] = value;
                                }
                            }
                        } else {
                            // base case, stop recurring
                            if (key3 === fieldName) {
                                object[key1][key2][key3] = value;
                            }
                        }
                    }
                } else {
                    // base case, stop recurring
                    if (key2 === fieldName) {
                        object[key1][key2] = value;
                    }
                }
            }
        } else {
            // base case, stop recurring
            if (key1 === fieldName) {
                object[key1] = value;
            }
        }
    }
}

// Fill in the document ID keys inside the nested object
const mutateDataFillDocumentID = (object, document_id) => {
    let mutated_object = { ...object };
    fillObjectOfName(mutated_object, 'document_id', document_id);
    return mutated_object
}

// Save a Document Draft (without getting beginning approval flow)
//   1. POST /document/new/0: createDocumentEmptyRow()
//   2. PUT /document/{document_id}/{document_type_group_id}: editDocument(document_id, document_type_group_id, data)
export const saveDocument = (document_type_group_id, data) => new Promise((resolve, reject) => {
    createDocumentEmptyRow()
        .then(({ document_id, internal_document_id }) => { // Get the Document_ID
            editDocument(document_id, document_type_group_id, mutateDataFillDocumentID(data, document_id))
                .then(() => {
                    return resolve(document_id);
                });
        })
});
// Start the Approval Flow of the Document
// POST /approval/{document_id}/new
export const startDocumentApprovalFlow = (document_id) => new Promise((resolve, reject) => {
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/approval/${document_id}/new`;
    axios.post(url, null, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((res) => {
            if(res.status === 200 || res.status === 201){
                console.log(" I am successful in starting approval flow of document_id ", document_id)
                resolve(res.data);
            } else {
                reject(res);
            }
        })
});

// Get Step Approval After Search Document
export const fetchStepApprovalDocumentData = (document_id) => new Promise((resolve, reject) => {
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/approval/${document_id}/latest/plus`;
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((step_approve) => {
            resolve(step_approve.data);
        })
        .catch((err) => {
            reject(err)
        });
});

// Get Latest Step Approval After Track Docuemnt
export const fetchLatestStepApprovalDocumentData = (document_id) => new Promise((resolve, reject) =>{
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/approval/${document_id}/latest/step`;
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((latest_step_approve) => {
            resolve(latest_step_approve.data);
        })
        .catch((err) => {
            reject(err)
        });
});

// Get Latest Step Approval After Track Docuemnt
export const fetchSearchDocumentData = (document_id) => new Promise((resolve, reject) =>{
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/search?${document_id}`;
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((document) => {
            resolve(document.data);
        })
        .catch((err) => {
            reject(err)
        });
});

// Get Goods Onhand After Select Warehoues ID and No part ID
export const fetchGoodsOnhandData = (warehouse_id, item_id) => new Promise((resolve, reject) => {
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/statistic/goods-onhand/plus?warehouse_id=${warehouse_id}&item_id=${item_id}`;
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((res) => {
            resolve(res.data.results);
        })
        .catch((err) => {
            reject(err)
        });
});