
import axios from "axios";
import { API_PORT_DATABASE } from './config_port.js';
import { API_URL_DATABASE } from './config_url.js';
import { fetchFactIfNeeded, FACTS } from './redux/modules/api/fact';
import { isEmptyChildren } from "formik";
import {TOOLBAR_MODE, TOOLBAR_ACTIONS} from './redux/modules/toolbar'

// import { useFormikContext } from 'formik';

// Constants
export const DOCUMENT_TYPE_ID = {
    GOODS_RECEIPT_PO: 101,
    GOODS_RETURN: 102,
    GOODS_RETURN_MAINTENANCE: 102,
    GOODS_RECEIPT_PO_NO_PO: 103,
    GOODS_USAGE: 111,
    GOODS_ISSUE: 112,
    INVENTORY_TRANSFER: 121,
    GOODS_RECEIPT_FIX: 131,
    GOODS_FIX: 132,
    PHYSICAL_COUNT: 141,
    INVENTORY_ADJUSTMENT: 142,
    SALVAGE_RETURN: 151,
    SALVAGE_SOLD: 152,

    WORK_REQUEST: 201,
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

export const isValidInternalDocumentIDFormat = (internal_document_id) => {
    const internalDocumentIDRegex = /^(GP|GT|GR|GU|GI|IT|GX|GF|PC|IA|SR|SD|WR|WO|WP|SS)-[A-Z]{3}-\d{4}\/\d{4}$/g;
    return internalDocumentIDRegex.test(internal_document_id);
}
export const isValidInternalDocumentIDDraftFormat = (internal_document_id) => {
    const draftInternalDocumentIDRegex = /^draft-\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b$/g;
    return draftInternalDocumentIDRegex.test(internal_document_id);
}


function isICD(document_type_group_id){
    return ICD_DOCUMENT_TYPE_GROUP_IDS.includes(document_type_group_id);
}

export const packDataFromValues = (fact, values, document_type_id) => {
    let document_part = {
        ...DOCUMENT_SCHEMA,
        document_status_id: 1,
        document_action_type_id: 1, 
        document_id: values.document_id,
        internal_document_id: values.internal_document_id,
        remark: values.remark,
        created_by_admin_id: getUserIDFromEmployeeID(fact[FACTS.USERS], values.created_by_admin_employee_id),
        created_by_user_id: getUserIDFromEmployeeID(fact[FACTS.USERS], values.created_by_user_employee_id),
        document_date: values.document_date
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
            case DOCUMENT_TYPE_ID.PHYSICAL_COUNT:
                movement_part = {
                    ...movement_part,
                    refer_to_document_name: values.refer_to_document_name
                }
                document_part = {
                    ...document_part,
                    refer_to_document_id: null
                }
                break;
                case DOCUMENT_TYPE_ID.INVENTORY_ADJUSTMENT:
                movement_part = {
                    ...movement_part,
                    refer_to_document_name: values.refer_to_document_name
                }
                document_part = {
                    ...document_part,
                    refer_to_document_id: null
                }
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
            case DOCUMENT_TYPE_ID.GOODS_RECEIPT_FIX:
            case DOCUMENT_TYPE_ID.GOODS_RETURN:
            case DOCUMENT_TYPE_ID.GOODS_RETURN_MAINTENANCE:
                break;
            default:
                break;
        }

    let icd_part = {
        ...ICD_SCHEMA,
        document_id: values.document_id,
        dest_warehouse_id: getNumberFromEscapedString(values.dest_warehouse_id),
        src_warehouse_id: getNumberFromEscapedString(values.src_warehouse_id),
        line_items: line_items_part,
        movement: movement_part, // REFER TO MOVEMENT SCHEMAS
    }
    switch (document_type_id) {
        case DOCUMENT_TYPE_ID.PHYSICAL_COUNT:
            line_items_part = [];
            values.line_items.map(line_item => {
                if (line_item.internal_item_id) {
                    line_items_part.push({
                        document_id: values.document_id,
                        line_number: line_item.line_number,
                        unit_count: line_item.quantity,
                        per_unit_price: line_item.per_unit_price,
                        item_id: getItemIDFromInternalItemID(fact[FACTS.ITEM], line_item.internal_item_id),
                        item_status_id: line_item.item_status_id,
                        count_datetime: `${values.document_date} 00:00:00`
                    });
                }
            })
            icd_part = {
                document_id: values.document_id,   
                warehouse_id: getNumberFromEscapedString(values.src_warehouse_id),
                refer_to_document_name: values.refer_to_document_name,
                line_items: line_items_part,
            }
            break;
            case DOCUMENT_TYPE_ID.INVENTORY_ADJUSTMENT:
                line_items_part = [];
                values.line_items.map(line_item => {
                    if (line_item.internal_item_id) {
                        line_items_part.push({
                            document_id: values.document_id,
                            line_number: line_item.line_number,
                            unit_count: line_item.quantity,
                            per_unit_price: line_item.per_unit_price,
                            item_id: getItemIDFromInternalItemID(fact[FACTS.ITEM], line_item.internal_item_id),
                            item_status_id: line_item.item_status_id,
                            adjustment_datetime: `${values.document_date} 00:00:00`
                        });
                    }
                })
                icd_part = {
                    document_id: values.document_id,   
                    warehouse_id: getNumberFromEscapedString(values.src_warehouse_id),
                    refer_to_document_name: values.refer_to_document_name,
                    line_items: line_items_part,
                }
                break;
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
export const createDocumentEmptyRow = () => new Promise((resolve, reject) => {
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/new/0`;
    axios.post(url, null, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((res) => {
            console.log(" I am successful in creating empty document with document_id ", res.data.document_id)
            resolve({
                internal_document_id: res.data.internal_document_id, //"draft-bea9f75d-23db-49ae-a8d5-385121fb0234",
                document_id: res.data.document_id,  //"document_id": 14
                status: res.status,
            });
        })
        .catch((err) => {
            reject(err)
        });
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

// GET /document/internal_document_id/{internal_document_id}
export const getDocumentbyInternalDocumentID = (internal_document_id) => new Promise((resolve, reject) => {
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/internal_document_id/${encodeURIComponent(internal_document_id)}`;
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
      .then((res) => {
        console.log(" I am successful in GETTING contents of internal_document_id ", internal_document_id)
        if(res.status === 200){
            console.log("wow i Getted successfully status 200 ", res.data)
            resolve(res.data);
        } else {
            console.log(" i think i have some problems Getted ",res.data)
            reject(res);
        }
      })
      .catch((err) => {
          console.warn(err.response);
          reject(err)
      });
})

// PUT /document/{document_id}/{document_type_group_id}
export const editDocument = (document_id, document_type_group_id, data) => new Promise((resolve, reject) => {
    console.log(">>>>>> I HEAR", document_id, ">>>>",document_type_group_id, ">>>", data)
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
        .then(({ document_id, internal_document_id, status }) => { // Get the Document_ID
            editDocument(document_id, document_type_group_id, mutateDataFillDocumentID(data, document_id))
                .then(() => {
                    return resolve(document_id);
                })
                .catch((err) => {
                    return reject(err);
                });

        })
        .catch((err) => {
            reject(err)
        });
});
// Start the Approval Flow of the Document
// POST /approval/{document_id}/new
export const startDocumentApprovalFlow = (document_id) => new Promise((resolve, reject) => {
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/approval/${document_id}/new`;
    axios.post(url, null, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                console.log(" I am successful in starting approval flow of document_id ", document_id)
                resolve(res.data);
            } else {
                console.warn("I have trouble in starting approval flow ", res);
                reject(res);
            }
        })
        .catch((err) => {
            console.warn("I have trouble in starting approval flow ", err.response);
            reject(err)
        });
});

// Get Step Approval After Search Document (document_id changes)
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

// Get Attachment after search Document (document_id changes)
export const fetchAttachmentDocumentData = (document_id) => new Promise((resolve, reject) => {
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/attachment/${document_id}`;
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((desrciption_files) => {
            resolve(desrciption_files.data);
        })
        .catch((err) => {
            reject(err)
        });
});

// Get Latest Step Approval After Track Docuemnt
export const fetchLatestStepApprovalDocumentData = (document_id) => new Promise((resolve, reject) => {
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
export const fetchSearchDocumentData = (document_id) => new Promise((resolve, reject) => {
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

// Check Document Status from 
export const DOCUMENT_STATUS = {
    DRAFT: "สร้าง Draft",
    WAIT_APPROVE: "รอการอนุมัติ",
    APPROVE_DONE: "อนุมัติเรียบร้อยแล้ว",
    VOID: "เอกสารหมดสถานะการใช้งาน",
    REOPEN: "แก้ไขเอกสาร",
    FAST_TRACK: "Fast Track",
}
// approval_step_action_id
export const APPROVAL_STEP_ACTION = {
    CHECK_APPROVAL: 1, // "ตรวจสอบและรับทราบลงนาม",
    APPROVAL: 2, // "รับทราบลงนาม",
    GOT_IT: 3, // "รับทราบ",
    CHECK_ORDER: 4, // "ตรวจสอบและสั่งจ่าย",
    CHECK_MAINTENANCE: 5, // "ตรวจสอบรับทราบลงนาม และเลือกวิธีจัดซ่อม",
    GUARANTEE_MAINTENANCE: 6 // "รับรองผลดำเนินการซ่อมเสร็จแล้ว",
}

// Check document_action_type table in database -> CreateNew(DRAFT/WAIT_APPROVE/APPROVED), FastTrack(FAST_TRACK), Void(VOID)
// Check approval_process table in database -> is_canceled(REOPEN)
// Check Approval flow -> Clear infomation of CreateNew(DRAFT/WAIT_APPROVE/APPROVED)
// DRAFT
export const checkDocumentStatus = (valuesContext) => {
    // GET document_action_type_id
    const _lookup_document_action_type = {
        CreateNew: 1,
        FastTrack: 2,
        Void: 3
    }
    // http://43.229.79.36:60013/approval/1/latest/plus
    let result = {
        "id": 1,
        "created_on": "2020-05-31T15:28:51.000Z",
        "update_time": null,
        "document_id": 1,
        "approval_process_lookup_id": 1031,
        "is_canceled": {
            "type": "Buffer",
            "data": [
                0
            ]
        },
        "approval_step": [
            {
                "approval_process_id": 1,
                "step_number": 1,
                "is_skipped": {
                    "type": "Buffer",
                    "data": [
                        0
                    ]
                },
                "approval_by": [
                    {
                        "id": 1,
                        "approval_process_id": 1,
                        "step_number": 1,
                        "approval_status_id": 1,
                        "user_id": 0,
                        "position_group_id": 0,
                        "approved_on": "2020-05-31T15:28:51.000Z",
                        "remark": "AUTOMATIC EXECUTION BY DATABASE",
                        "position": null,
                        "user": {
                            "firstname_th": null,
                            "firstname_en": null,
                            "lastname_th": null,
                            "lastname_en": null
                        },
                        "approval_status": {
                            "approval_status_id": 1,
                            "name": "Approved",
                            "description": "Approved",
                            "name_th": null,
                            "description_th": null
                        }
                    }
                ],
                "position": [],
                "position_group": {
                    "position_group_id": 0,
                    "name": "This"
                }
            },
            {
                "approval_process_id": 1,
                "step_number": 2,
                "is_skipped": {
                    "type": "Buffer",
                    "data": [
                        0
                    ]
                },
                "approval_by": [],
                "position": [],
                "position_group": {
                    "position_group_id": 5,
                    "name": "หัวหน้าตอน (นสต. นายตรวจสายตอน)"
                }
            }
        ]
    }
    let document_action_type_id = 1; //TODO valuesContext.document_action_type_id
    let approval_process_is_canceled = valuesContext.document_is_canceled;
    let approval_step = valuesContext.step_approve;
    if (_lookup_document_action_type.FastTrack === document_action_type_id) { return DOCUMENT_STATUS.FastTrack; }
    else if  (_lookup_document_action_type.Void === document_action_type_id) { return DOCUMENT_STATUS.VOID; }
    else {
        // CreateNew
        if (approval_process_is_canceled === 1){
            // console.log("------> REOPEN")
            return DOCUMENT_STATUS.REOPEN;
        }
        else {
            if (approval_step.length !== 0) {
                // TODO: Check Latest ApprovalProcessID
                let checkWaitApproval = false;
                approval_step.map(apStep => {
                    if (apStep.approval_by.length === 0){ 
                        // console.log("------> WAIT_APPROVE")
                        checkWaitApproval = true;
                        return DOCUMENT_STATUS.WAIT_APPROVE;
                    }
                })
                if (!checkWaitApproval) {
                    // console.log("------> APPROVE_DONE")
                    return DOCUMENT_STATUS.APPROVE_DONE;
                }
            }
            else {
                // console.log("------> DRAFT")
                return DOCUMENT_STATUS.DRAFT;
            }
        }
    }


}


const responseToFormState = (fact, data) => {
    for (var i = data.line_items.length; i <= 9; i++) {
      data.line_items.push(
        {
          item_id: "",
          internal_item_id: "",
          description: "",
          quantity: "",
          uom_group_id: "",
          unit: "",
          per_unit_price: "",
          list_uoms: []
        }
      );
    }
    return {
      document_id: data.document_id,
      internal_document_id: data.internal_document_id,
      document_date: data.document_date.split("T")[0], 
      created_by_user_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], data.created_by_user_id) || '',
      created_by_admin_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], data.created_by_admin_id) || '',
      created_on: data.created_on.split(".")[0],
      line_items: data.line_items,
      dest_warehouse_id: data.dest_warehouse_id,
      remark: data.remark,
      status_name_th: "",
      document_action_type_id: "",
      po_id: data.po_id,
    }
  }

// Validation 
export const validateInternalDocumentIDFieldHelper = (toolbar, fact, values , setValues, setFieldValue, validateField, internal_document_id) => new Promise(resolve => {
    // Internal Document ID
    //  {DocumentTypeGroupAbbreviation}-{WH Abbreviation}-{Year}-{Auto Increment ID}
    //  ie. GR-PYO-2563/0001
    console.log("I am validating internal document id ", internal_document_id)
    if (!internal_document_id) {
        console.log("I dont have any internal doc id")
      return resolve('Required');
    } else if (!isValidInternalDocumentIDFormat(internal_document_id) && !isValidInternalDocumentIDDraftFormat(internal_document_id)) {
      return resolve('Invalid Document ID Format Be sure to use the format ie. GR-PYO-2563/0001')
    }


    // Checking from Database if Internal Document ID Exists
    let error;
    getDocumentbyInternalDocumentID(internal_document_id)
    .then((data) => {
        console.log(" i got data", data);
      if (data.internal_document_id === internal_document_id) { // If input document ID exists
        if ((toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.NONE || toolbar.mode === TOOLBAR_MODE.NONE_HOME) 
          && !toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]) { //If Mode Search, needs to set value 
          
          console.log("validateInternalDocumentIDField:: I got document ID ",data.document_id)
          setValues({ ...values , ...responseToFormState(fact, data) }, false); //Setvalues and don't validate
          validateField("dest_warehouse_id");
          validateField("created_by_user_employee_id");
          validateField("created_by_admin_employee_id");
          return resolve(null);

        } else { //If Mode add, need to error duplicate Document ID
            // setFieldValue('document_id', '', false); 
            console.log("I AM DUPLICATE")
            error = 'Duplicate Document ID';
        }
    } else { // If input Document ID doesn't exists
        
        setFieldValue('document_id', '', false);
        if (toolbar.mode === TOOLBAR_MODE.SEARCH) { //If Mode Search, invalid Document ID  
            console.log("I KNOW IT'sINVALID")
            error = 'Invalid Document ID';
        } else {//If mode add, ok
            console.log("document ID doesn't exist but I am in mode add")
            error = '';
        }
    }
    })
    .catch((err) => { // 404 NOT FOUND  If input Document ID doesn't exists
        console.log("I think I have 404 not found in doc id.")   
        setFieldValue('document_id', '', false);

        if (toolbar.mode === TOOLBAR_MODE.SEARCH) { //If Mode Search, invalid Document ID
            error = 'Document ID not Found in System';
        } else{//If mode add, ok
            console.log("document ID doesn't exist but I am in mode add")
            error = ''
        }
    })
    .finally(() => {
    return resolve(error)
    });
  });


export const validateEmployeeIDField = (fieldName, fact, setFieldValue, employee_id) => {
    console.log("I am validating employee id")
    employee_id = employee_id.split('\\')[0]; // Escape Character USERNAME CANT HAVE ESCAPE CHARACTER!
    let users = fact[FACTS.USERS].items;
    let user = users.find(user => user.employee_id === employee_id); // Returns undefined if not found
    if (user) {
      setFieldValue(fieldName, `${employee_id}\\${user.firstname_th} ${user.lastname_th}`, false);
      return;
    } else {
      return 'Invalid Employee ID';
    }
};


export const validateWarehouseIDField = (fieldName, fact, setFieldValue, warehouse_id) => {
    console.log("I am validating warehouse id")
    warehouse_id = `${warehouse_id}`.split('\\')[0]; // Escape Character WAREHOUSE_ID CANT HAVE ESCAPE CHARACTER!
    let warehouses = fact[FACTS.WAREHOUSES].items;
    let warehouse = warehouses.find(warehouse => `${warehouse.warehouse_id}` === `${warehouse_id}`); // Returns undefined if not found
    if (warehouse) {
      setFieldValue(fieldName, `${warehouse_id}\\[${warehouse.abbreviation}] ${warehouse.name}`, false);
      return;
    } else {
      return 'Invalid Warehouse ID';
    }
  }