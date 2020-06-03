
import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';
import {fetchFactIfNeeded , FACTS} from '../../redux/modules/api/fact';
// Constants
export const DOCUMENT_TYPE_ID = {
    GOODS_RECEIPT_PO: 101,
}
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

// Helper Functions
export function getEmployeeIDFromUserID(userFact, userID) {
    let users = userFact.items;
    if (users && users.length > 0) {
      let user = users.find(user => `${user.user_id}` === `${userID}`)
      if (userID === 0){ // needs to be handled later
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

export const packDataFromValues = (fact, values, document_type_id) => {
    let document_part = {
        ...DOCUMENT_SCHEMA,
        document_id: values.document_id,
        internal_document_id: values.internal_document_id,
        remark: values.remark,
        created_by_admin_id: getUserIDFromEmployeeID(fact[FACTS.USERS], values.created_by_admin_employee_id),
        created_by_user_id: getUserIDFromEmployeeID(fact[FACTS.USERS], values.created_by_user_employee_id),
    }
    let line_items_part = [];
    values.line_items.map(line_item => {
        line_items_part.push({
            ...ICD_LINE_ITEM_SCHEMA,
            document_id: values.document_id,
            line_number: line_item.line_number,
            quantity: line_item.quantity,
            uom_id: line_item.uom_id,
            per_unit_price: line_item.per_unit_price,
            item_id: line_item.item_id,
            item_status_id: line_item.item_status_id,
        });
    })
    let movement_part = {
        ...DOCUMENT_TYPE_ID_TO_MOVEMENT_SCHEMA[document_type_id],
        document_id: values.document_id,
    }
    switch(document_type_id) {
        case DOCUMENT_TYPE_ID.GOODS_RECEIPT_PO:
            movement_part = {
                ...movement_part,
                po_id: values.po_id
            }
            break;
        default:
            break;
    }

    const icd_part = {
        ...ICD_SCHEMA,
        document_id: values.document_id,
        dest_warehouse_id: values.dest_warehouse_id, 
        src_warehouse_id: values.src_warehouse_id, 
        line_items: line_items_part, 
        movement: movement_part, // REFER TO MOVEMENT SCHEMAS

    }
    return {
        document: document_part,
        specific: icd_part,
    }
}


// Document API
const fetchDocumentData = (document_id) => new Promise((resolve) =>{
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/${document_id}`;
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((res) => {
            resolve(res.data);
        })
});

// Reserve a row in `document` table and return `document_id` and `internal_document_id`
export const createDocumentEmptyRow = () => new Promise((resolve) => {
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/new/0`;
    axios.post(url, null, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((res) => {
            resolve({
                internal_document_id: res.data.internal_document_id, //"draft-bea9f75d-23db-49ae-a8d5-385121fb0234",
                document_id: res.data.document_id,  //"document_id": 14
            });
        })
});



const editDocument = (document_id, document_type_group_id, data) => new Promise((resolve, reject) => {
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/new/0`;
    axios.put(url, data, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((res) => {
            if(res.status === 200){
                resolve(res.data);
            }else{
                reject(res);
            }
        })
});

// Save a Document Draft (without getting beginning approval flow)
//   1. createDocumentEmptyRow
//   2. 