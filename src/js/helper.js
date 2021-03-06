
import axios from "axios";
import { API_PORT_DATABASE } from './config_port.js';
import { API_URL_DATABASE } from './config_url.js';
import { FACTS } from './redux/modules/api/fact';
import { TOOLBAR_MODE, TOOLBAR_ACTIONS } from './redux/modules/toolbar'
import { FOOTER_ACTIONS } from './redux/modules/footer'

// import { useFormikContext } from 'formik';

const BASE_URL = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}`;
const PAGE_SIZE = 100000;

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
    WORK_ORDER_PM: 205,
    SS101: 204,
    EQUIPMENT_INSTALLATION: 206,
    MAINTENANT_ITEM: 207,
    SELECTOR: 208,

    // These needs to change later!!! since Doc Type Group ID will need to be used in other API's
    WAREHOUSE_MASTER_DATA: 1,
    ITEM_MASTER_DATA: 2,
    REPORT_S1: 6,
    REPORT_B22: 7,
    EQUIPMENT_MASTER_DATA: 3,
    CREATE_CHECKLIST_LINE_ITEM: 4,
    WORK_ORDER_CHECKLIST: 5

}
export const DOCUMENT_TYPE_NOTGROUP_ID = {
    WORK_REQUEST: 2011,
    WORK_ORDER: 2021,
    WORK_ORDER_PM: 2031,
    SS101: 2041,
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
    DOCUMENT_TYPE_ID.PHYSICAL_COUNT,
    DOCUMENT_TYPE_ID.INVENTORY_ADJUSTMENT,
    DOCUMENT_TYPE_ID.SALVAGE_RETURN,
    DOCUMENT_TYPE_ID.SALVAGE_SOLD,
    DOCUMENT_TYPE_ID.ITEM_MASTER_DATA,
    DOCUMENT_TYPE_ID.WAREHOUSE_MASTER_DATA,
    DOCUMENT_TYPE_ID.REPORT_S1,
    DOCUMENT_TYPE_ID.REPORT_B22
]

// Group of ICD Type Group where this_warehouse_id_name = dest_warehouse_id
export const ICD_TYPE_GROUP_THIS_WH_DEST_IDS = [
    DOCUMENT_TYPE_ID.GOODS_RECEIPT_PO,
    DOCUMENT_TYPE_ID.GOODS_RETURN,
    DOCUMENT_TYPE_ID.GOODS_RETURN_MAINTENANCE,
    DOCUMENT_TYPE_ID.GOODS_RECEIPT_PO_NO_PO,
    DOCUMENT_TYPE_ID.INVENTORY_TRANSFER,
    DOCUMENT_TYPE_ID.GOODS_RECEIPT_FIX,
]
// Group of ICD Type Group where this_warehouse_id_name = src_warehouse_id
export const ICD_TYPE_GROUP_THIS_WH_SRC_IDS = [
    DOCUMENT_TYPE_ID.GOODS_USAGE,
    DOCUMENT_TYPE_ID.GOODS_ISSUE,
    DOCUMENT_TYPE_ID.GOODS_FIX,
    DOCUMENT_TYPE_ID.PHYSICAL_COUNT,
    DOCUMENT_TYPE_ID.INVENTORY_ADJUSTMENT,
    DOCUMENT_TYPE_ID.SALVAGE_RETURN,
    DOCUMENT_TYPE_ID.SALVAGE_SOLD,
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
    document_status_id: -1, // NOT USED, handled by Backend
    // document_action_type_id	string // NOT USED, handled by Backend
    // refer_to_document_id	string // NOT USED, handled by Backend
}
export const DOCUMENT_SCHEMA_GET = {
    document_id: -1,
    // document_type_id: -1, // NOT USED since Backend will get SRC and DEST WH and determine type
    internal_document_id: "draft-SCHEMA",
    created_on: "-1", // NOT USED since use DEFAULT NOW() of SQL
    remark: '',
    created_by_admin_id: -1,
    created_by_user_id: -1,
    document_date: "",
    document_status_id: -1, // NOT USED, handled by Backend
    // document_action_type_id	string // NOT USED, handled by Backend
    refer_to_document_id: '',	 // string NOT USED, handled by Backend
    refer_to_document_internal_id: '',
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
    document_id: -1, // NEEDS TO HAVE!

    accident_on: '', // accident_on วันเวลาเกิดเหตุ
    accident: '', // accident_detail อาการขัดข้อง
    request_by: '', // informed_by ผู้แจ้งเหตุ

    // responsible_by: '', // remove from db!
    location_district_id: -1, // location_district_id สถานที่ แขวง  [TODO DATABASE]
    location_node_id: -1, // location_node_id สถานที่ ตอน
    location_station_id: -1, // สถานที่ สถานี  [TODO DATABASE]
    location_detail: '', // location_detail รายละเอียดสถานที่
    // remark: '', we will remove this in db TODO** - > will use doc's remark instead
    // refer_to_document_id: ''
}

export const WORK_ORDER_SCHEMA = {
    document_id: -1, // NEEDS TO HAVE!

    accident_name: "",
    accident_on: '', // accident_on วันเวลาเกิดเหตุ
    request_on: '',                 // วันเวลาที่รับแจ้ง DATETIME
    root_cause: '',                 // อาการเสียโดยสรุป NVARCHAR
    request_by: '',                //  ผู้แจ้งเหตุ [WR] ,  ได้รับเหตุจาก[WO] NVARCHAR
    recv_accident_from_recv_id: -1,     // ได้รับข้อมูลผ่านช่องทาง: Phone, Letter, WR   FK_ID

    location_district_id: -1, // location_district_id สถานที่ แขวง  [TODO DATABASE]
    location_node_id: -1, // location_node_id สถานที่ ตอน
    location_station_id: -1, // สถานที่ สถานี  [TODO DATABASE]
    location_detail: '', // location_detail รายละเอียดสถานที่
    remark: '',
    line_items: [],
}

export const SS101_SCHEMA = {
    document_id: -1, // NEEDS TO HAVE!

    accident_name: '',              // ชื่องาน        NVARCHAR
    accident_on: '',                // วันเวลาเกิดเหตุ  DATETIME
    request_on: '',                 // วันเวลาที่รับแจ้ง DATETIME
    // root_cause: '',                 // อาการเสียโดยสรุป NVARCHAR [only WO]
    request_by: '',                //  ผู้แจ้งเหตุ [WR] ,  ได้รับเหตุจาก[WO] NVARCHAR
    recv_accident_from_recv_id: -1,     // ได้รับข้อมูลผ่านช่องทาง: Phone, Letter, WR   FK_ID

    location_district_id: -1,        // สถานที่ แขวง  [รายงานการตรวจซ่อมอุปกรณ์แขวง] FK_ID
    location_node_id: -1,            // สถานที่ ตอน   [ที่ตั้งอุปกรณ์ที่ทำการตรวจซ่อม (สถานที่/ที่ตั้ง)] FK_ID
    location_station_id: -1,         // สถานที่ สถานี  FK_ID
    location_detail: '',       //รายละเอียดสถานที่ [WR]  ที่ตั้งอุปกรณ์ที่ทำการตรวจซ่อม (สถานที่/ที่ตั้ง) [WO] NVARCHAR

    // Bottom Content
    by_car_type_id: -1,   
    car_type_id: -1,           // เดินทางโดย FK_ID
    departed_on: '',          // ออกเดินทาง DATETIME
    arrived_on: '',           // เดินทางถึง  DATETIME
    finished_on: '',          // วันเวลาที่แล้วเสร็จ DATETIME
    // system_type_group_id: -1,   // ระบบตรวจซ่อม FK_ID - this is automatically infered from sub_maintenance_type_id
    sub_maintenance_type_id: -1,      //  ชนิดระบบตรวจซ่อม FK_ID
    hardware_type_id: -1,   // ชื่ออุปกรณ์ที่บำรุงรักษา FK_ID

    summary_cause_condition: '', // สาเหตุและอาการเสียโดยสรุป link [root_cause] from WO NVARCHAR
    cargo_id: -1, //ขบวนรถที่ NVARCHAR/INT (**not in DB)
    total_fail_time: -1, //เสียเวลาเพราะเหตุนี้ (นาที) DECIMAL(10,2)
    service_method_id: -1, // ประเภทการซ่อม FK_ID
    service_method_desc: '', //สรุปการแก้ไขและการซ่อมแซม STRING
    interrupt_id: -1, //ยังไมไ่ด้จัดการแก้ไขเพราะเหตุนี้ FK_ID
    checked_remark: '',
    x_type_id: -1,

    // Bottom Content ผู้เกี่ยวข้อง
    auditor_name: '',           //ผู้ควบคุมตรวจสอบชื่อ NVARCHAR
    auditor_position_id: -1, //ผู้ควบคุมตรวจสอบชื่อ ตำแหน่ง FK_ID
    fixer_name: '',               //ดำเนินการแก้ไขชื่อ  NVARCHAR
    fixer_position_id: -1, //ดำเนินการแก้ไขชื่อ ตำแหน่ง FK_ID
    member_1: '',               //รายชื่อเพื่อนร่วมงาน 1 NVARCHAR
    member_1_position_id: -1, //รายชื่อเพื่อนร่วมงาน 1 ตำแหน่ง FK_ID
    member_2: '',              //รายชื่อเพื่อนร่วมงาน 2 NVARCHAR
    member_2_position_id: -1, //รายชื่อเพื่อนร่วมงาน 2 ตำแหน่ง FK_ID
    member_3: '',             //รายชื่อเพื่อนร่วมงาน 3
    member_3_position_id: -1,  //รายชื่อเพื่อนร่วมงาน 3 ตำแหน่ง
    member_4: '',               //รายชื่อเพื่อนร่วมงาน 1 NVARCHAR
    member_4_position_id: -1, //รายชื่อเพื่อนร่วมงาน 1 ตำแหน่ง FK_ID
    member_5: '',              //รายชื่อเพื่อนร่วมงาน 2 NVARCHAR
    member_5_position_id: -1, //รายชื่อเพื่อนร่วมงาน 2 ตำแหน่ง FK_ID
    member_6: '',             //รายชื่อเพื่อนร่วมงาน 3
    member_6_position_id: -1,  //รายชื่อเพื่อนร่วมงาน 3 ตำแหน่ง
    member_7: '',               //รายชื่อเพื่อนร่วมงาน 1 NVARCHAR
    member_7_position_id: -1, //รายชื่อเพื่อนร่วมงาน 1 ตำแหน่ง FK_ID
    member_8: '',              //รายชื่อเพื่อนร่วมงาน 2 NVARCHAR
    member_8_position_id: -1, //รายชื่อเพื่อนร่วมงาน 2 ตำแหน่ง FK_ID
    location_x_cross_id: -1,
    doc_bypass_doc_bypass_id: -1,

    loss_line_items: [],
    line_items: [],
}

// Helper Functions
export function getWarehouseIDFromUserID(warehouseFact, warehouseID) {
    let warehouses = warehouseFact.items;
    if (warehouses && warehouses.length > 0) {
        let warehouse = warehouses.find(warehouse => `${warehouse.warehouse_id}` === `${warehouseID}`)
        if (warehouseID === 0) { // needs to be handled later
            return "Server"
        }
        if (warehouse) {
            return warehouse.warehouse_id;
        }
        return null;
    }
    return null;
}

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

export function getUserNodeIDFromEmployeeID(userFact, user_id) {
    let users = userFact.items;
    if (users && users.length > 0) {
        let user = users.find(user => `${user.user_id}` === `${user_id}`)
        if (user) {
            return user.position[0].node_id;
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

export function getPositionAbbreviationFromWarehouseID(positionFact, warehouseID) {
    if (typeof warehouseID === 'string' || warehouseID instanceof String) {
        warehouseID = warehouseID.split('\\')[0]; // Escape Character USERNAME CANT HAVE ESCAPE CHARACTER!
    }
    let positions = positionFact.items;
    if (positions && positions.length > 0) {
        // Find position with that warehouse and position group id 3 หัวหน้าแขวง/คลัง or 5	หัวหน้าตอน (นสต. นายตรวจสายตอน)
        let position = positions.find(position => `${position.warehouse_id}` === `${warehouseID}`
            && (position.position_group_id === 3 || position.position_group_id === 5));
        if (position) {
            return position;
        }
        return null;
    }
    return null;
}

export const getFieldFromFact = (subFact, fieldName, queryString, fieldQuery) => {
    let items = subFact.items;
    if (items && items.length > 0) {
        let item = items.find(item => `${item[fieldName]}` === `${queryString}`)
        if (item) {
            return item[fieldQuery];
        }
        return null;
    }
    return null;
}




export const getItemNamefromItemID = (itemFact, itemID) => {
    return getFieldFromFact(itemFact, "item_id", itemID, "description");
}

export const getItemInternalIDfromItemID = (itemFact, itemID) => {
    return getFieldFromFact(itemFact, "item_id", itemID, "internal_item_id");
}

export const getNumberFromEscapedString = (escapedString) => {
    if (Number.isInteger(escapedString)) {
        return escapedString;
    }
    return parseInt(escapedString.split('\\')[0]) || null;
}

export const isValidInternalDocumentIDFormat = (internal_document_id) => {
    const internalDocumentIDRegex = /^[\u0E00-\u0E7F()]+.[\u0E00-\u0E7F()\d]*.?-?[\u0E00-\u0E7F()]*.?\d?\/[1-3]-\d{2}\/\d{4}\/\d{4}(-FastTrack)?$/g;
    return internalDocumentIDRegex.test(internal_document_id);
}
// export const isValidInternalDocumentIDFastTrackFormat = (internal_document_id) => {
//     const internalDocumentIDRegex = /^[\u0E00-\u0E7F()]+.[\u0E00-\u0E7F()\d]*.?-?[\u0E00-\u0E7F()]*.?\d?\/[1-3]-\d{2}\/\d{4}\/\d{4}-([A-Z])\w+/g;
//     return internalDocumentIDRegex.test(internal_document_id);
// } 
export const isValidOldInternalDocumentIDFormat = (internal_document_id) => {
    const internalDocumentIDRegex = /^(GP|GT|GR|GU|GI|IT|GX|GF|PC|IA|SR|SD|WR|WO|WP|SS|MI|EI|PM)-[A-Z]{3}-\d{4}\/\d{4}$/g;
    return internalDocumentIDRegex.test(internal_document_id);
}
export const isValidInternalDocumentIDDraftFormat = (internal_document_id) => {
    const draftInternalDocumentIDRegex = /^draft-\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b$/g;
    return draftInternalDocumentIDRegex.test(internal_document_id);
}


// Check if the Document Type Group ID is an ICD
export function isICD(document_type_group_id) {
    return ICD_DOCUMENT_TYPE_GROUP_IDS.includes(document_type_group_id);
}

// Check if the Document Type Grou ID is an ICD Document where this_warehouse_id_name = dest_warehouse_id
export function isICDWarehouseDest(document_type_group_id) {
    return ICD_TYPE_GROUP_THIS_WH_DEST_IDS.includes(document_type_group_id);
}

// Check if the Document Type Grou ID is an ICD Document where this_warehouse_id_name = src_warehouse_id
export function isICDWarehouseSrc(document_type_group_id) {
    return ICD_TYPE_GROUP_THIS_WH_SRC_IDS.includes(document_type_group_id);
}



export const packDataFromValues = (fact, values, document_type_id, checked_remark) => {
    if (document_type_id === DOCUMENT_TYPE_ID.WAREHOUSE_MASTER_DATA) {
        return {
            warehouse_id: values.warehouse_id,
            name: values.name,
            abbreviation: values.abbreviation,
            location: values.location,
            warehouse_type_id: values.warehouse_type_id,
            node_id: 1,
            active: values.active == "1" ? true : false,
            use_central: values.use_central == "1" ? true : false
        }
    } else if (document_type_id === DOCUMENT_TYPE_ID.ITEM_MASTER_DATA) {
        let last = 0;
        fact[FACTS.ITEM].items.map(item => {
            if (item.item_id > last) {
                last = item.item_id;
            }
        });
        return {
            item_id: last + 1,
            internal_item_id: values.internal_item_id,
            description: values.description,
            item_type_id: values.item_type_id,
            item_group_id: values.item_group_id,
            uom_group_id: 1,
            active: values.active == "1" ? true : false,
            remark: values.remark,
            uom_id_inventory: values.uom_id,
            default_warehouse_id: 100,
            quantity_lowest: values.quantity_lowest,
            quantity_highest: values.quantity_highest,
            quantity_required: values.quantity_required,
            minimum_order_quantity: values.minimum_order_quantity,
            lead_time: values.lead_time,
            tolerance_time: values.tolerance_time,
            accounting_type: values.accounting_type
        }
    } else if (document_type_id === DOCUMENT_TYPE_ID.EQUIPMENT_MASTER_DATA) {
        let lastItem = 0;
        fact[FACTS.ITEM].items.map(item => {
            if (item.item_id > lastItem) {
                lastItem = item.item_id;
            }
        });
        let lastEquipment = 0;
        fact[FACTS.EQUIPMENT].items.map(item => {
            if (item.item_id > lastEquipment) {
                lastEquipment = item.item_id;
            }
        });
        let lastItemId;
        if (lastEquipment >= lastItem) {
            lastItemId = lastEquipment + 1;
        } else {
            lastItemId = lastItem + 1;
        }

        let equipment_part = {
            item_id: lastItemId,
            price_currently: values.price_currently,
            depreciation: parseInt(values.depreciation),
            useful_life: values.useful_life,
            item_status_id: parseInt(values.item_status_id),
            responsible_district_id: parseInt(values.responsible_district_id),
            import_on: values.import_on + 'T00:00:00+00:00'
        }

        let equipment_item_part = {
            item_id: lastItemId,
            equipment_group_id: parseInt(values.equipment_group_id),
            checklist_id: parseInt(values.checklist_id)
        }

        let item_part = {
            item_id: lastItemId,
            internal_item_id: values.internal_item_id,
            description: values.description,
            item_type_id: parseInt(values.item_type_id),
            item_group_id: 1,
            uom_group_id: 1,
            active: values.active == "1" ? true : false,
            remark: values.remark,
            default_warehouse_id: 100,
            quantity_lowest: 1,
            quantity_highest: 1,
            quantity_required: 1,
            minimum_order_quantity: values.minimum_order_quantity,
            lead_time: values.lead_time,
            tolerance_time: values.tolerance_time,
            accounting_type: values.accounting_type
        }

        return {
            equipment: equipment_part,
            equipment_item: equipment_item_part,
            item: item_part,
        }
    } else if (document_type_id === DOCUMENT_TYPE_ID.CREATE_CHECKLIST_LINE_ITEM) {
        let last_checklist_line_item = 0;
        fact[FACTS.CHECKLIST_LINE_ITEM].items.map(item => {
            // console.log("item", item)
            if (item.checklist_line_item > last_checklist_line_item) {
                last_checklist_line_item = item.checklist_line_item;
            }
        });
        // console.log("values", values)
        let last_checklist_line_item_use_equipment_id = 0;
        fact[FACTS.CHECKLIST_LINE_ITEM_USE_EQUIPMENT].items.map(item => {
            if (item.checklist_line_item_use_equipment_id > last_checklist_line_item_use_equipment_id) {
                last_checklist_line_item_use_equipment_id = item.checklist_line_item_use_equipment_id;
            }
        });

        var line_items_part = [];
        values.checklist_line_item_use_equipment.map((line_item, index) => {
            if (line_item.item_id) {
                line_items_part.push({
                    // checklist_line_item_use_equipment_id: parseInt(last_checklist_line_item_use_equipment_id) + 1, // ต้อง Get อัน่าสุดออกมาก่อน
                    checklist_line_item_id: parseInt(last_checklist_line_item) + 1,
                    item_id: line_item.item_id,
                    quantity: line_item.quantity,
                    uom_id: parseInt(line_item.uom_id)
                });
            }
        })

        let create_checklist_part = {
            checklist_line_item: parseInt(last_checklist_line_item) + 1,
            checklist_id: parseInt(values.checklist_id),
            name: values.name,
            freq: values.freq,
            freq_unit_id: parseInt(values.freq_unit_id),
            // active: values.active === "1" ? true : false,
            remark: "string",
            line_item: line_items_part
        }
        console.log("create_checklist_part", create_checklist_part)
        return create_checklist_part;

    } else if (document_type_id === DOCUMENT_TYPE_ID.WORK_ORDER_CHECKLIST) {
        console.log("I AM WORK_ORDER_CHECKLIST");
        let work_order_pm_checklist_line_item_part = [];

        values.checklist_line_item.map((line_item) => {
            if (values.checklist_id === line_item.checklist_id && values.weekly_task_id === line_item.weekly_task_id) {
                work_order_pm_checklist_line_item_part.push({
                    selector_checklist_line_item_id: line_item.selector_checklist_line_item_id,
                    is_checked: line_item.is_checked,
                    weekly_task_id: line_item.weekly_task_id,
                    cost: line_item.cost,
                    remark: line_item.remark
                })
            } else {
                work_order_pm_checklist_line_item_part.push({
                    selector_checklist_line_item_id: line_item.selector_checklist_line_item_id,
                    is_checked: line_item.is_checked,
                    weekly_task_id: line_item.weekly_task_id,
                    cost: line_item.cost,
                    remark: line_item.remark
                })
            }
        })

        let work_order_pm_checklist_line_item_full_part = {
            work_order_pm_checklist_line_item: work_order_pm_checklist_line_item_part
        }

        return work_order_pm_checklist_line_item_full_part;
    }
    let document_part = {
        ...DOCUMENT_SCHEMA,
        document_status_id: 1, // ["สร้าง Draft", "รอการอนุมัติ", "อนุมัติเรียบร้อยแล้ว", "เอกสารหมดสถานะการใช้งาน", "แก้ไขเอกสาร", "Fast Track"]
        document_action_type_id: 1,
        document_id: values.document_id,
        internal_document_id: values.internal_document_id,
        remark: values.remark,
        created_by_admin_id: getUserIDFromEmployeeID(fact[FACTS.USERS], values.created_by_admin_employee_id),
        created_by_user_id: getUserIDFromEmployeeID(fact[FACTS.USERS], values.created_by_user_employee_id),
        document_date: values.document_date + 'T00:00:00+00:00'
    }
    if (isICD(document_type_id)) {
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
                    date_manufactured: line_item.date_manufactured ? line_item.date_manufactured : null
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
                    // refer_to_document_name: values.refer_to_document_name
                }
                document_part = {
                    ...document_part,
                    // refer_to_document_id: null
                }
                break;
            case DOCUMENT_TYPE_ID.INVENTORY_ADJUSTMENT:
                movement_part = {
                    ...movement_part,
                    // refer_to_document_name: values.refer_to_document_name
                }
                document_part = {
                    ...document_part,
                    // refer_to_document_id: null
                }
                break;
            case DOCUMENT_TYPE_ID.GOODS_RECEIPT_PO_NO_PO:
                document_part = {
                    ...document_part,
                    refer_to_document_id: values.refer_to_document_id
                }
                break;
            case DOCUMENT_TYPE_ID.GOODS_RECEIPT_FIX:
                document_part = {
                    ...document_part,
                    refer_to_document_id: values.refer_to_document_id
                }
                break;
            case DOCUMENT_TYPE_ID.GOODS_USAGE:
            case DOCUMENT_TYPE_ID.GOODS_RECEIPT_FIX:
            case DOCUMENT_TYPE_ID.GOODS_RETURN:
            case DOCUMENT_TYPE_ID.GOODS_RETURN_MAINTENANCE:
            case DOCUMENT_TYPE_ID.SALVAGE_RETURN:
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
                            unit_count: line_item.unit_count,
                            per_unit_price: line_item.per_unit_price,
                            item_id: getItemIDFromInternalItemID(fact[FACTS.ITEM], line_item.internal_item_id),
                            item_status_id: parseInt(line_item.item_status_id),
                            count_datetime: values.document_date + 'T00:00:00'
                        });
                    }
                })
                icd_part = {
                    document_id: values.document_id,
                    warehouse_id: getNumberFromEscapedString(values.src_warehouse_id),
                    // refer_to_document_name: values.refer_to_document_name,
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
                            unit_count: line_item.unit_count,
                            per_unit_price: line_item.per_unit_price,
                            item_id: getItemIDFromInternalItemID(fact[FACTS.ITEM], line_item.internal_item_id),
                            item_status_id: parseInt(line_item.item_status_id),
                            adjustment_datetime: values.document_date + 'T00:00:00+00:00'
                        });
                    }
                })
                icd_part = {
                    document_id: values.document_id,
                    warehouse_id: getNumberFromEscapedString(values.src_warehouse_id),
                    // refer_to_document_name: values.refer_to_document_name,
                    line_items: line_items_part,
                }
                break;
        }
        return {
            document: document_part,
            specific: icd_part,
        }
    } else if (document_type_id === DOCUMENT_TYPE_ID.WORK_REQUEST) {
        document_part["document_type_id"] = DOCUMENT_TYPE_NOTGROUP_ID.WORK_REQUEST;
        let work_request_part = {}
        Object.keys(WORK_REQUEST_SCHEMA).map((key) => {
            if (Number.isInteger(WORK_REQUEST_SCHEMA[key]) && key !== "document_id") { // Check if the number in the schema is a number
                // Hack 'document_id' to not be null, so it would work in mutateData
                // TODO needs to change ordering of the packDataFromValues!! to not use the mutate function
                work_request_part[key] = getNumberFromEscapedString(values[key]);
            } else {
                work_request_part[key] = values[key]
            }
        })
        console.log("document_part", document_part)
        console.log("work_request_part", work_request_part)

        document_part = {
            ...document_part,
            document_date: values.document_date + 'T00:00:00+00:00',
            refer_to_document_id: 0,
        };

        work_request_part = {
            ...work_request_part,
            accident_on: values.accident_on + ':00'
        }

        let work_request_part_big = {
            work_request: work_request_part
        }
        return {
            document: document_part,
            specific: work_request_part_big,
        }
    } else if (document_type_id === DOCUMENT_TYPE_ID.WORK_ORDER) {
        document_part["document_type_id"] = DOCUMENT_TYPE_NOTGROUP_ID.WORK_ORDER;
        let work_order_part = {}
        Object.keys(WORK_ORDER_SCHEMA).map((key) => {
            if (Number.isInteger(WORK_ORDER_SCHEMA[key]) && key !== "document_id") { // Check if the number in the schema is a number
                // Hack 'document_id' to not be null, so it would work in mutateData
                // TODO needs to change ordering of the packDataFromValues!! to not use the mutate function
                work_order_part[key] = getNumberFromEscapedString(values[key]);
            } else {
                work_order_part[key] = values[key]
            }
        })
        document_part = {
            ...document_part,
            document_date: values.document_date + 'T00:00:00+00:00',
            refer_to_document_id: values.refer_to_document_id,
        };
        work_order_part.line_items = removeEmptyLineItems(work_order_part.line_items);
        work_order_part.line_items.map((line_items, index) => {
            work_order_part.line_items[index].item_id = line_items.item_id
            work_order_part.line_items[index].item_status_id = parseInt(line_items.item_status_id)
            work_order_part.line_items[index].remark = line_items.remark
            work_order_part.line_items[index].document_id = line_items.document_id
            delete work_order_part.line_items[index].internal_item_id
            delete work_order_part.line_items[index].description
            delete work_order_part.line_items[index].equipment_item_id
            delete work_order_part.line_items[index].equipment_status_id
        })
        work_order_part = {
            ...work_order_part,
            accident_on: work_order_part.accident_on + ":00+00:00",
            request_on: work_order_part.request_on + ":00+00:00"
        };
        let work_order_part_big = {
            work_order: work_order_part,
            line_items: work_order_part.line_items
        }

        delete work_order_part_big.work_order.line_items
        return {
            document: document_part,
            specific: work_order_part_big,
        }
    } else if (document_type_id === DOCUMENT_TYPE_ID.SS101) {
        document_part = {
            ...document_part,
            refer_to_document_id: values.refer_to_document_id ? values.refer_to_document_id : null,
            document_date: values.document_date + 'T00:00:00+00:00'
        };
        let ss101_part = {
            document_id: values.document_id,
            accident_name: values.accident_name,
            accident_on: values.accident_on + ':00+00:00',
            arrived_on: values.arrived_on + ':00+00:00',
            finished_on: values.finished_on + ':00+00:00',
            total_fail_time: values.total_fail_time ? parseInt(values.total_fail_time) : null,
            recv_accident_from_recv_id: values.recv_accident_from_recv_id ? parseInt(values.recv_accident_from_recv_id) : null,
            recv_accident_from_desc: values.recv_accident_from_desc,
            summary_cause_condition: values.summary_cause_condition,
            loss: values.loss,
            car_type_id: values.car_type_id ? parseInt(values.car_type_id) : null,
            by_car_type_id: values.by_car_type_id ? parseInt(values.by_car_type_id) : null,
            cargo_id: values.cargo_id,
            interrupt_id: values.interrupt_id ? parseInt(values.interrupt_id) : null,
            service_method_id: values.service_method_id ? parseInt(values.service_method_id) : null,
            service_method_desc: values.service_method_desc,
            location_node_id: values.location_node_id ? parseInt(values.location_node_id) : null,
            location_station_id: values.location_station_id ? parseInt(values.location_station_id) : null,
            location_detail: values.location_detail,
            hardware_type_id: values.hardware_type_id ? parseInt(values.hardware_type_id) : null,
            x_type_id: values.x_type_id ? parseInt(values.x_type_id) : null,
            member_1: values.member_1,
            member_2: values.member_2,
            member_3: values.member_3,
            member_4: values.member_4,
            member_5: values.member_5,
            member_6: values.member_6,
            member_7: values.member_7,
            member_8: values.member_7,
            remark: values.remark,
            checked_remark: checked_remark,
            sub_maintenance_type_id: values.system_type_group_id ? parseInt(values.system_type_group_id) : null,
            // sub_maintenance_type_id: 1,
            request_on: values.request_on + ':00+00:00',
            request_by: values.request_by,
            location_district_id: values.location_district_id ? parseInt(values.location_district_id) : null,
            departed_on: values.departed_on + ':00+00:00',
            location_x_cross_id: values.location_x_cross_id,
            // location_x_cross_id: values.location_x_cross_id ? parseInt(values.location_x_cross_id) : null,
            auditor_name: values.auditor_name,
            auditor_position_id: values.auditor_position_id ? parseInt(values.auditor_position_id) : null,
            fixer_name: values.fixer_name,
            fixer_position_id: values.fixer_position_id ? parseInt(values.fixer_position_id) : null,
            member_1_position_id: values.member_1_position_id ? parseInt(values.member_1_position_id) : null,
            member_2_position_id: values.member_2_position_id ? parseInt(values.member_2_position_id) : null,
            member_3_position_id: values.member_3_position_id ? parseInt(values.member_3_position_id) : null,
            member_4_position_id: values.member_4_position_id ? parseInt(values.member_4_position_id) : null,
            member_5_position_id: values.member_5_position_id ? parseInt(values.member_5_position_id) : null,
            member_6_position_id: values.member_6_position_id ? parseInt(values.member_6_position_id) : null,
            member_7_position_id: values.member_7_position_id ? parseInt(values.member_7_position_id) : null,
            member_8_position_id: values.member_8_position_id ? parseInt(values.member_8_position_id) : null,
            doc_bypass_doc_bypass_id: values.doc_bypass_doc_bypass_id ? parseInt(values.doc_bypass_doc_bypass_id) : null
        }
        values.loss_line_items = removeEmptyLineItems(values.loss_line_items);
        values.line_items = removeEmptyLineItems(values.line_items);

        let loss_line_item_part = values.loss_line_items
        loss_line_item_part.map((line_items, index) => {
            loss_line_item_part[index].description = line_items.description
            loss_line_item_part[index].document_id = values.document_id
            loss_line_item_part[index].line_number = index + 1
            loss_line_item_part[index].price = parseInt(line_items.price)
            loss_line_item_part[index].quantity = parseInt(line_items.quantity)
            loss_line_item_part[index].remark = line_items.remark
            loss_line_item_part[index].uom_name = line_items.uom_name
            delete loss_line_item_part[index].item_id
        })

        let ss101_line_item_part = values.line_items
        ss101_line_item_part.map((line_items, index) => {
            ss101_line_item_part[index].item_id = line_items.item_id
            ss101_line_item_part[index].item_status_id = parseInt(line_items.item_status_id)
            ss101_line_item_part[index].remark = line_items.remark
            ss101_line_item_part[index].document_id = values.document_id
            ss101_line_item_part[index].line_number = index + 1
            delete ss101_line_item_part[index].internal_item_id
            delete ss101_line_item_part[index].description
            delete ss101_line_item_part[index].equipment_item_id
            delete ss101_line_item_part[index].equipment_status_id

            delete ss101_line_item_part[index].per_unit_price
            delete ss101_line_item_part[index].quantity
            delete ss101_line_item_part[index].uom_id
            delete ss101_line_item_part[index].list_uoms
        })

        let ss101_part_big = {
            ss101: ss101_part,
            loss_line_item: loss_line_item_part,
            ss101_line_item: ss101_line_item_part
        }
        return {
            document: document_part,
            specific: ss101_part_big,
        }

    } else if (document_type_id === DOCUMENT_TYPE_ID.MAINTENANT_ITEM) {
        document_part = {
            ...document_part,
            refer_to_document_id: values.refer_to_document_id,
        };
        var line_items_part = [];
        values.line_items.map((line_item, index) => {
            if (line_item.item_id) {
                line_items_part.push({
                    document_id: values.document_id,
                    item_id: line_item.item_id,
                    line_number: index + 1,
                    uom_id: line_item.uom_id,
                    quantity_damaged: line_item.quantity_damaged,
                    quantity_used: line_item.quantity_used,
                    quantity_salvage: line_item.quantity_salvage
                });
            }
        })
        var icd_part = {
            document_id: values.document_id,
            node_id: values.node_id,
            district_id: values.district_id,
            division_id: values.division_id,
            line_items: line_items_part,
        }
        return {
            document: document_part,
            specific: icd_part,
        }
    } else if (document_type_id === DOCUMENT_TYPE_ID.EQUIPMENT_INSTALLATION) {

        let document_part_equipment_install = {
            ...DOCUMENT_SCHEMA,
            document_status_id: 1,
            document_action_type_id: 1,
            document_id: values.document_id,
            internal_document_id: values.internal_document_id,
            remark: values.remark,
            created_by_admin_id: getUserIDFromEmployeeID(fact[FACTS.USERS], values.created_by_admin_employee_id),
            created_by_user_id: getUserIDFromEmployeeID(fact[FACTS.USERS], values.created_by_user_employee_id),
            document_date: values.document_date + 'T00:00:00+00:00',
        }

        var equipment_install_part = {
            document_id: values.document_id,
            equipment_id: values.equipment_id ? parseInt(values.equipment_id) : null,
            location_district_id: values.location_district_id ? parseInt(values.location_district_id) : null,
            location_node_id: values.location_node_id ? parseInt(values.location_node_id) : null,
            location_station_id: values.location_station_id ? parseInt(values.location_station_id) : null,
            location_description: values.location_description,
            installed_on: values.installed_on + 'T00:00:00+00:00',
            announce_use_on: values.announce_use_on + 'T00:00:00+00:00',
            // x_cross_x_cross_id: values.x_cross_x_cross_id ? parseInt(values.x_cross_x_cross_id) : null,
            x_cross_x_cross_id: values.x_cross_x_cross_id,
            responsible_node_id: values.location_node_id ? parseInt(values.location_node_id) : null
        }
        var line_items_part = [
            {
                document_id: values.document_id,
                item_id: values.item_id,
                line_number: 1,
                item_status_id: 5,
                remark: "string"
            }
        ]

        var equipment_installation_part = {
            equipment_installation: equipment_install_part,
            line_items: line_items_part
        }
        console.log("values", values)
        console.log("document_part", document_part);
        console.log("equipment_install", equipment_installation_part);
        return {
            document: document_part_equipment_install,
            specific: equipment_installation_part,
        }
    } else if (document_type_id === DOCUMENT_TYPE_ID.SELECTOR) {
        let document_part_selector = {
            ...DOCUMENT_SCHEMA,
            document_status_id: 1,
            document_action_type_id: 1,
            document_id: values.document_id,
            internal_document_id: values.internal_document_id,
            remark: values.remark,
            created_by_admin_id: getUserIDFromEmployeeID(fact[FACTS.USERS], values.created_by_admin_employee_id),
            created_by_user_id: getUserIDFromEmployeeID(fact[FACTS.USERS], values.created_by_user_employee_id),
            document_date: values.document_date + 'T00:00:00+00:00',
        }

        let selector_pm_plan_part = {
            document_id: values.document_id,
            name: values.name,
            active: true,
            node_id: parseInt(values.node_id),
            start_on: values.start_on + ':00+07:00',
        }

        var w1_part = [];
        let line_index = '';
        removeEmptyLineItemsWorkOrderPM(values.w1_list);
        values.w1_list.map((line_item, index) => {
            line_index = index + 1
            if (line_item.station_id || line_item.checklist_id) {
                w1_part.push({
                    document_id: values.document_id,
                    line_number: line_index,
                    name_group: line_item.equipment_id ? "ระบบเครื่องกั้นถนน" : "ระบบอาณัติสัญญาณ//ระบบโทรมานาคม",
                    weekly_plan_id: 1,
                    station_id: line_item.station_id ? parseInt(line_item.station_id) : null,
                    equipment_item_id: line_item.equipment_id ? parseInt(line_item.equipment_id) : null,
                    selector_checklist:
                        line_item.equipment_id && line_item.equipment_id ?
                            [
                                {
                                    document_id: values.document_id,
                                    checklist_name: line_item.checklist_th,
                                    remark: "",
                                    checklist_id: parseInt(line_item.checklist_id),
                                    is_have: true
                                }
                            ]
                            :
                            line_item.selector_checklist

                });
            }
        })

        var w2_part = [];
        removeEmptyLineItemsWorkOrderPM(values.w2_list)
        values.w2_list.map((line_item, index) => {
            line_index = index + 1
            if (line_item.station_id || line_item.checklist_id) {
                w2_part.push({
                    document_id: values.document_id,
                    line_number: line_index,
                    name_group: line_item.equipment_id ? "ระบบเครื่องกั้นถนน" : "ระบบอาณัติสัญญาณ//ระบบโทรมานาคม",
                    weekly_plan_id: 2,
                    station_id: line_item.station_id ? parseInt(line_item.station_id) : null,
                    equipment_item_id: line_item.equipment_id ? parseInt(line_item.equipment_id) : null,
                    selector_checklist:
                        line_item.equipment_id && line_item.equipment_id ?
                            [
                                {
                                    document_id: values.document_id,
                                    checklist_name: line_item.checklist_th,
                                    remark: "string",
                                    checklist_id: parseInt(line_item.checklist_id),
                                    is_have: true
                                }
                            ]
                            :
                            line_item.selector_checklist

                });
            }
        })

        var w3_part = [];
        removeEmptyLineItemsWorkOrderPM(values.w3_list)
        values.w3_list.map((line_item, index) => {
            line_index = index + 1
            if (line_item.station_id || line_item.checklist_id) {
                w3_part.push({
                    document_id: values.document_id,
                    line_number: line_index,
                    name_group: line_item.equipment_id ? "ระบบเครื่องกั้นถนน" : "ระบบอาณัติสัญญาณ//ระบบโทรมานาคม",
                    weekly_plan_id: 3,
                    station_id: line_item.station_id ? parseInt(line_item.station_id) : null,
                    equipment_item_id: line_item.equipment_id ? parseInt(line_item.equipment_id) : null,
                    selector_checklist:
                        line_item.equipment_id && line_item.equipment_id ?
                            [
                                {
                                    document_id: values.document_id,
                                    checklist_name: line_item.checklist_th,
                                    remark: "string",
                                    checklist_id: parseInt(line_item.checklist_id),
                                    is_have: true
                                }
                            ]
                            :
                            line_item.selector_checklist

                });
            }
        })

        var w4_part = [];
        removeEmptyLineItemsWorkOrderPM(values.w4_list)
        values.w4_list.map((line_item, index) => {
            line_index = index + 1
            if (line_item.station_id || line_item.checklist_id) {
                w4_part.push({
                    document_id: values.document_id,
                    line_number: line_index,
                    name_group: line_item.equipment_id ? "ระบบเครื่องกั้นถนน" : "ระบบอาณัติสัญญาณ//ระบบโทรมานาคม",
                    weekly_plan_id: 4,
                    station_id: line_item.station_id ? parseInt(line_item.station_id) : null,
                    equipment_item_id: line_item.equipment_id ? parseInt(line_item.equipment_id) : null,
                    selector_checklist:
                        line_item.equipment_id && line_item.equipment_id ?
                            [
                                {
                                    document_id: values.document_id,
                                    checklist_name: line_item.checklist_th,
                                    remark: "string",
                                    checklist_id: parseInt(line_item.checklist_id),
                                    is_have: true
                                }
                            ]
                            :
                            line_item.selector_checklist

                });
            }
        })

        // ต้องเป็น Array selector_checklist_group_part
        let selector_checklist_group_part = [
            ...w1_part,
            ...w2_part,
            ...w3_part,
            ...w4_part
        ]

        let specific_selector = {
            selector_pm_plan: selector_pm_plan_part,
            selector_checklist_group: selector_checklist_group_part,
        }

        return {
            document: document_part_selector,
            specific: specific_selector
        }
    } else if (document_type_id === DOCUMENT_TYPE_ID.WORK_ORDER_PM) {
        let document_part = {
            ...DOCUMENT_SCHEMA,
            document_status_id: 1,
            document_action_type_id: 1,
            document_id: values.document_id,
            internal_document_id: values.internal_document_id,
            remark: values.remark,
            created_by_admin_id: 0,
            created_by_user_id: 0,
            document_date: values.document_date + 'T00:00:00+00:00',
        }

        let work_order_pm_has_selector_checklist_line_item_part = [];
        values.work_order_pm_has_selector_checklist_line_item.map((line_custom) => {
            work_order_pm_has_selector_checklist_line_item_part.push({
                selector_checklist_line_item_id: line_custom.selector_checklist_line_item_id,
                is_checked: line_custom.is_checked == "1" ? true : false,
                weekly_task_id: line_custom.weekly_task_id,
                cost: line_custom.cost,
                remark: line_custom.remark,
            })
        })

        let specific_part = {
            document_id: values.document_id,
            member_1: values.member_1,
            member_1_level_id: values.member_1_level_id ? parseInt(values.member_1_level_id) : null,
            member_2: values.member_2,
            member_2_level_id: values.member_2_level_id ? parseInt(values.member_2_level_id) : null,
            member_3: values.member_3,
            member_3_level_id: values.member_3_level_id ? parseInt(values.member_3_level_id) : null,
            member_4: values.member_4,
            member_4_level_id: values.member_4_level_id ? parseInt(values.member_4_level_id) : null,
            member_lead: values.member_lead,
            member_lead_level_id: values.member_lead_level_id ? parseInt(values.member_lead_level_id) : null,

            work_order_pm_line_item: [],
            work_order_pm_checklist_line_item: work_order_pm_has_selector_checklist_line_item_part
        }
        // console.log("specific_part", specific_part)
        return {
            document: document_part,
            specific: specific_part
        }
    }
}

export const packDataFromValuesMasterDataForEdit = (fact, values, document_type_id) => {
    if (document_type_id === DOCUMENT_TYPE_ID.WAREHOUSE_MASTER_DATA) {
        return {
            warehouse_id: values.warehouse_id,
            name: values.name,
            abbreviation: values.abbreviation,
            location: values.location,
            warehouse_type_id: values.warehouse_type_id,
            node_id: 1,
            active: values.active == "1" ? true : false,
            use_central: values.use_central === "1" ? true : false
        }
    } else if (document_type_id === DOCUMENT_TYPE_ID.ITEM_MASTER_DATA) {
        return {
            item_id: values.item_id,
            internal_item_id: values.internal_item_id,
            description: values.description,
            item_type_id: values.item_type_id,
            item_group_id: values.item_group_id,
            uom_group_id: 1,
            active: values.active == "1" ? true : false,
            remark: values.remark,
            uom_id_inventory: values.uom_id,
            default_warehouse_id: 100,
            quantity_lowest: values.quantity_lowest,
            quantity_highest: values.quantity_highest,
            quantity_required: values.quantity_required,
            minimum_order_quantity: values.minimum_order_quantity,
            lead_time: values.lead_time,
            tolerance_time: values.tolerance_time,
            accounting_type: values.accounting_type
        }
    } else if (document_type_id === DOCUMENT_TYPE_ID.EQUIPMENT_MASTER_DATA) {
        console.log("item_id", values.item_id)
        let equipment_part = {
            item_id: values.item_id,
            equipment_id: values.equipment_id,
            price_currently: values.price_currently,
            depreciation: parseInt(values.depreciation),
            useful_life: values.useful_life,
            item_status_id: parseInt(values.item_status_id),
            responsible_district_id: parseInt(values.responsible_district_id),
            import_on: values.import_on + 'T00:00:00+00:00'
        }

        let equipment_item_part = {
            item_id: values.item_id,
            equipment_group_id: parseInt(values.equipment_group_id),
            checklist_id: parseInt(values.checklist_id)
        }

        let item_part = {
            item_id: values.item_id,
            internal_item_id: values.internal_item_id,
            description: values.description,
            item_type_id: parseInt(values.item_type_id),
            item_group_id: 1,
            uom_group_id: 1,
            active: values.active == "1" ? true : false,
            remark: values.remark,
            default_warehouse_id: 100,
            quantity_lowest: 1,
            quantity_highest: 1,
            quantity_required: 1,
            minimum_order_quantity: values.minimum_order_quantity,
            lead_time: values.lead_time,
            tolerance_time: values.tolerance_time,
            accounting_type: values.accounting_type
        }

        return {
            equipment: equipment_part,
            equipment_item: equipment_item_part,
            item: item_part,
        }
    } else if (document_type_id === DOCUMENT_TYPE_ID.CREATE_CHECKLIST_LINE_ITEM) {
        let last_checklist_line_item = 0;
        fact[FACTS.CHECKLIST_LINE_ITEM].items.map(item => {
            // console.log("item", item)
            if (item.checklist_line_item > last_checklist_line_item) {
                last_checklist_line_item = item.checklist_line_item;
            }
        });
        // console.log("values", values)
        let last_checklist_line_item_use_equipment_id = 0;
        fact[FACTS.CHECKLIST_LINE_ITEM_USE_EQUIPMENT].items.map(item => {
            if (item.checklist_line_item_use_equipment_id > last_checklist_line_item_use_equipment_id) {
                last_checklist_line_item_use_equipment_id = item.checklist_line_item_use_equipment_id;
            }
        });

        var line_items_part = [];
        values.checklist_line_item_use_equipment.map((line_item, index) => {
            if (line_item.item_id) {
                line_items_part.push({
                    // checklist_line_item_use_equipment_id: parseInt(line_item.item_id),
                    checklist_line_item_id: parseInt(values.checklist_line_item),
                    item_id: line_item.item_id,
                    quantity: line_item.quantity,
                    uom_id: parseInt(line_item.uom_id)
                });
            }
        })

        let create_checklist_part = {
            checklist_line_item: parseInt(values.checklist_line_item),
            checklist_id: parseInt(values.checklist_id),
            name: values.name,
            freq: values.freq,
            freq_unit_id: parseInt(values.freq_unit_id),
            // active: values.active === "1" ? true : false,
            remark: values.remark,
            line_item: line_items_part
        }
        console.log("create_checklist_part", create_checklist_part)
        return create_checklist_part;

    }
}



function removeEmptyLineItems(line_items) {
    return line_items.filter(line_item => line_item.description != '');
}

function removeEmptyLineItemsWorkOrderPM(line_items) {
    return line_items.filter(line_item => !line_item.equipment_item_id || !line_item.station_id);
}



// Document API
const fetchDocumentData = (document_id) => new Promise((resolve, reject) => {
    const url = `${BASE_URL}/document/${document_id}`;
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
    const url = `${BASE_URL}/document/new/0`;
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

// POST 
export const createMasterData = (data, document_type_group_id) => new Promise((resolve, reject) => {
    if (document_type_group_id === DOCUMENT_TYPE_ID.WAREHOUSE_MASTER_DATA) {
        var url = `${BASE_URL}/fact/warehouses`;
    }
    if (document_type_group_id === DOCUMENT_TYPE_ID.ITEM_MASTER_DATA) {
        var url = `${BASE_URL}/fact/items`;
    }
    if (document_type_group_id === DOCUMENT_TYPE_ID.EQUIPMENT_MASTER_DATA) {
        var url = `${BASE_URL}/fact/equipment`;
    }
    if (document_type_group_id === DOCUMENT_TYPE_ID.CREATE_CHECKLIST_LINE_ITEM) {
        var url = `${BASE_URL}/fact/checklist-line-item`;
    }
    console.log("data", data, "url", url)
    axios.post(url, data, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((res) => {
            console.log(" I am successful in creating master data ", res)
            resolve();
        })
        .catch((err) => {
            reject(err)
        });
});
// PUT
export const editMasterData = (data, document_type_group_id) => new Promise((resolve, reject) => {
    if (document_type_group_id === DOCUMENT_TYPE_ID.WAREHOUSE_MASTER_DATA) {
        var url = `${BASE_URL}/fact/warehouses/${data.warehouse_id}`;
    }
    if (document_type_group_id === DOCUMENT_TYPE_ID.ITEM_MASTER_DATA) {
        var url = `${BASE_URL}/fact/items/${data.item_id}`;
    }
    if (document_type_group_id === DOCUMENT_TYPE_ID.EQUIPMENT_MASTER_DATA) {
        var url = `${BASE_URL}/fact/equipment/${data.equipment.equipment_id}`;
    }
    if (document_type_group_id === DOCUMENT_TYPE_ID.CREATE_CHECKLIST_LINE_ITEM) {
        var url = `${BASE_URL}/fact/checklist-line-item/${data.checklist_line_item}`;
    }
    console.log("url", url, "data", data)
    axios.put(url, data, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((res) => {
            console.log(" I am successful in creating master data ", res)
            resolve();
        })
        .catch((err) => {
            console.log("ERR", err.response)
            reject(err)
        });
});



// GET  /statistic/goods-monthly-summary
export const fetchStatisticGoodsMonthlySummary = (beginReportingPeriodID = null, endReportingPeriodID = null, warehouseIDFilter = null, itemIDFilter = null, itemStatusIDFilter = 1) => new Promise((resolve, reject) => {
    const url = `${BASE_URL}/statistic/goods-monthly-summary?${beginReportingPeriodID ? `begin_reporting_period_id=${beginReportingPeriodID}&` : ''}${endReportingPeriodID ? `end_reporting_period_id=${endReportingPeriodID}&` : ''}${warehouseIDFilter ? `warehouse_id=${warehouseIDFilter[0]}&` : ''}${itemIDFilter ? `item_id=${itemIDFilter[0]}&` : ''}${itemStatusIDFilter ? `item_status_id=${itemStatusIDFilter}&` : ''}page_size=${PAGE_SIZE}`;

    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((res) => {
            let results = res.data.results;
            if (results) {
                resolve(results);
            } else {
                reject('No Results in fetchStatisticGoodsMonthlySummary');
            }
        })
});
// GET  /statistic/goods-onhand
export const fetchStatisticGoodsOnhand = (warehouseIDFilter = null, itemIDFilter = null, itemStatusIDFilter = 1) => new Promise((resolve, reject) => {
    const url = `${BASE_URL}/statistic/goods-onhand?${warehouseIDFilter ? `warehouse_id=${warehouseIDFilter[0]}&` : ''}${itemIDFilter ? `item_id=${itemIDFilter[0]}&` : ''}${itemStatusIDFilter ? `item_status_id=${itemStatusIDFilter}&` : ''}page_size=${PAGE_SIZE}`;

    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((res) => {
            let results = res.data.results;
            if (results) {
                resolve(results);
            } else {
                reject('No Results in fetchStatisticGoodsOnhand');
            }
        })
});



// GET latest internal document ID from /document/search?document_type_group_id=${document_type_group_id}
export const fetchLastestInternalDocumentID = (document_type_group_id) => new Promise((resolve, reject) => {
    const url = `${BASE_URL}/document/search?document_type_group_id=${document_type_group_id}`
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


// GET /document/latest/24/299/2563
// From https://github.com/cl21484952/srt_backend/issues/273

// ...of the URL /document/latest/{หน่วยงาน}/{document_type_group_id}/{year}

// url part {หน่วยงาน} to be position.position_id
// url part {document_type_group_id} to be document_type.document_type_group_id
// url part {year} will be taken AS IS no additional operation will be performed
// url part {year} is in Gregorian Calender format
// ...of the format AAA.BBB.-CCC./N-MM/YYYY/DDDD

// format part YYYY then -543 WILL always be the same year as the creation date of the document
// 4.1) Example สสญ.ธบ./9-99/2563/12345 was created in the year 2020 and not 2019-12-31 or 2021-01-01
export const fetchLastestRunningInternalDocumentID = (positionID, documentTypeGroupID, yearBE) => new Promise((resolve, reject) => {
    const url = `${BASE_URL}/document/latest/${positionID}/${documentTypeGroupID}/${yearBE}`
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((res) => {
            let results = res.data.results;
            if (results[0]) {
                resolve(results[0].internal_document_id);
            } else {
                reject('No Results in fetchLastestRunningInternalDocumentID');
            }
        })
        .catch((err) => {
            console.warn(err.response);
            reject(err)
        });
});

// GET /document/internal_document_id/{internal_document_id}
export const getDocumentbyInternalDocumentID = (internal_document_id) => new Promise((resolve, reject) => {
    const url = `${BASE_URL}/document/internal_document_id/${encodeURIComponent(internal_document_id)}`;
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((res) => {
            console.log(" I am successful in GETTING contents of internal_document_id ", internal_document_id)
            if (res.status === 200) {
                // console.log("wow i Getted successfully status 200 ", res.data)
                resolve(res.data);
            } else {
                // console.log(" i think i have some problems Getted ", res.data)
                reject(res);
            }
        })
        .catch((err) => {
            console.warn(err.response);
            reject(err)
        });
})

// PUT /document/{document_id}/{document_type_group_id}
export const editDocument = (document_id, document_type_group_id, data, files, flag_create_approval_flow) => new Promise((resolve, reject) => {
    if (document_type_group_id === DOCUMENT_TYPE_ID.WORK_ORDER_CHECKLIST) {
        var url = `${BASE_URL}/document/${document_id}/205-checklist`;
        axios.put(url, data, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
            .then((res) => {
                console.log(" I am successful in updating contents of document_id ", document_id, "res", res)
                if (res.status === 200) {
                    console.log("wow i putted successfully status 200 flag_create_approval_flow", flag_create_approval_flow, "files", files)
                    return resolve(res.data);
                } else {
                    console.log(" i think i have some problems putting ", res.data)
                    reject(res);
                }
            })
            .catch((err) => {
                console.log("err", err.response)
                reject(err)
            });
    } else {
        const url = `${BASE_URL}/document/${document_id}/${document_type_group_id}`;
        axios.put(url, data, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
            .then((res) => {
                console.log("ELSE I am successful in updating contents of document_id ", document_id, "res", res, files)
                if (res.status === 200) {
                    console.log("wow i putted successfully status 200 flag_create_approval_flow", flag_create_approval_flow, "files", files)
                    if (flag_create_approval_flow && files !== undefined) {
                        if (files.length !== 0) {
                            console.log("__uploadAttachmentDocumentData");
                            uploadAttachmentDocumentData(document_id, files)
                                .then(() => {
                                    console.log("__uploadAttachmentDocumentData Res", res);
                                    return resolve(res.data);
                                })
                                .catch((err) => {
                                    console.log("__uploadAttachmentDocumentData Err", err);
                                    return reject(err);
                                });
                        }
                        else { return resolve(res.data); }
                    }
                    else { return resolve(res.data); }
                } else {
                    console.log(" i think i have some problems putting ", res.data)
                    reject(res);
                }
            })
            .catch((err) => {
                console.log("err", err.response)
                reject(err)
            });
    }
});


const fillObjectOfName = (object, fieldName, value) => {
    for (let key1 in object) {
        if (typeof object[key1] === "object" && object[key1] !== null) {
            for (let key2 in object[key1]) {
                if (typeof object[key1][key2] === "object" && object[key1] !== null) {
                    for (let key3 in object[key1][key2]) {
                        if (typeof object[key1][key2][key3] === "object" && object[key1] !== null) {
                            // recursive line items
                            for (let key4 in object[key1][key2][key3]) {
                                if (typeof object[key1][key2][key3][key4] === "object" && object[key1] !== null) {

                                    for (let key5 in object[key1][key2][key3][key4]) {

                                        if (typeof object[key1][key2][key3][key4][key5] === "object" && object[key1] !== null) {

                                            for (let key6 in object[key1][key2][key3][key4][key5]) {
                                                if (typeof object[key1][key2][key3][key4][key5][key6] === "object" && object[key1] !== null) {
                                                    let line_item = object[key1][key2][key3][key4][key5];

                                                    if (typeof line_item === "object" && object[key1] !== null) {
                                                        if (line_item.hasOwnProperty(fieldName)) {
                                                            object[key1][key2][key3][key4][key5][fieldName] = value;
                                                        }
                                                    }
                                                } else {
                                                    // base case, stop recurring
                                                    if (key6 === fieldName) {
                                                        object[key1][key2][key3][key4][key5][key6] = value;
                                                    }
                                                }
                                            }

                                        } else {
                                            // base case, stop recurring
                                            if (key5 === fieldName) {
                                                object[key1][key2][key3][key4][key5] = value;
                                            }
                                        }
                                    }

                                } else {
                                    // base case, stop recurring
                                    if (key4 === fieldName) {
                                        object[key1][key2][key3][key4] = value;
                                    }
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
                    // console.log("I am setting ", key2, " if it is ", fieldName, " as ", value)
                    if (key2 === fieldName) {
                        // console.log("i think it is!! i am setting now ", object)
                        object[key1][key2] = value;
                        // console.log("i think it is!! i am setting now ", object)
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
    console.log("object", mutated_object)
    return mutated_object
}

// Save a Document Draft (without getting beginning approval flow)
//   1. POST /document/new/0: createDocumentEmptyRow()
//   2. PUT /document/{document_id}/{document_type_group_id}: editDocument(document_id, document_type_group_id, data)
export const saveDocument = (document_type_group_id, data, files, flag_create_approval_flow) => new Promise((resolve, reject) => {
    createDocumentEmptyRow()
        .then(({ document_id, internal_document_id, status }) => { // Get the Document_ID
            editDocument(document_id, document_type_group_id, mutateDataFillDocumentID(data, document_id), files, flag_create_approval_flow)
                .then(() => {
                    return resolve(document_id, internal_document_id, status);
                })
                .catch((err) => {
                    return reject(err);
                });
        })
        .catch((err) => {
            reject(err)
        });
});

// POST /fact/warehouses
export const saveMasterData = (document_type_group_id, data, image) => new Promise((resolve, reject) => {
    createMasterData(data, document_type_group_id)
        .then(() => { // Get the Document_ID
            return resolve();
        })
        .catch((err) => {
            reject(err)
        });
});
// EDIT /fact/warehouses
export const editMasterDataHelper = (document_type_group_id, data, image) => new Promise((resolve, reject) => {
    editMasterData(data, document_type_group_id)
        .then((res) => { // Get the Document_ID
            console.log("res", res)
            return resolve();
        })
        .catch((err) => {
            reject(err)
        });
});
// Start the Approval Flow of the Document
// POST /approval/{document_id}/new
export const startDocumentApprovalFlow = (document_id) => new Promise((resolve, reject) => {
    console.log("startDocumentApprovalFlow");
    const url = `${BASE_URL}/approval/${document_id}/new`;
    axios.post(url, null, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((res) => {
            console.log("startDocumentApprovalFlow res", res);
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
    const url = `${BASE_URL}/approval/${document_id}/latest/plus`;
    console.log("fetchStepApprovalDocumentData -> url", url)
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((step_approve) => {
            console.log("Fetfch Appoval", step_approve)
            resolve(step_approve.data);
        })
        .catch((err) => {
            reject(err)
        });
});

// Get Attachment after search Document (document_id changes)
export const fetchAttachmentDocumentData = (document_id) => new Promise((resolve, reject) => {
    const url = `${BASE_URL}/attachment/${document_id}`;
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            reject(err)
        });
});

// POST Attachment after SaveDocument (document_id changes)
export const uploadAttachmentDocumentData = (document_id, files) => new Promise((resolve, reject) => {
    var formData = new FormData();
    let tempFiles = [];
    files.map((file) => {
        if (file.isNew !== undefined) {
            tempFiles.push(file)
        }
    })
    if (tempFiles.length !== 0) {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        tempFiles.map((file) => { formData.append('file', file); })
        let url = `${BASE_URL}/attachment/${document_id}`
        axios.post(url, formData,
            { headers: { "x-access-token": localStorage.getItem('token_auth') } })
            .then((res) => {
                console.log(">>>>>>>>>>>>>>>>>>>>>res", res)
                resolve(res);
            }).catch(function (err) {
                console.log(">>>>>>>>>>>>>>>>>>>>>err", err.response)
                reject(err);
            })
    }
    resolve("Don't have new files");
});

// Download Attachment
// important -> responseType: 'blob'
export const downloadAttachmentDocumentData = (document_id, attachment_id) => new Promise((resolve, reject) => {
    const url = `${BASE_URL}/attachment/${document_id}/download/${attachment_id}`;
    axios.get(url, { responseType: 'blob', headers: { "x-access-token": localStorage.getItem('token_auth') } })
        // 1. Convert the data into 'blob'    
        .then((response) => {
            // 2. Create blob link to download
            console.log("response", response)
            let url = window.URL.createObjectURL(new Blob([response.data]));
            console.log("url", url)
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${response.headers.filename}`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        })
        .catch((err) => {
            reject(err)
        });
});

// Get Latest Step Approval After Track Docuemnt
export const fetchLatestStepApprovalDocumentData = (document_id) => new Promise((resolve, reject) => {
    const url = `${BASE_URL}/approval/${document_id}/latest/step`;
    console.log(">>>> url", url);
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((latest_step_approve) => {
            console.log(">>>> latest_step_approve", latest_step_approve);
            resolve(latest_step_approve.data);
        })
        .catch((err) => {
            reject(err.response)
        });
});

// Get Latest Step Approval After Track Docuemnt
export const fetchSearchDocumentData = (document_id) => new Promise((resolve, reject) => {
    const url = `${BASE_URL}/document/search?${document_id}`;
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
    const url = `${BASE_URL}/statistic/goods-onhand/plus?warehouse_id=${warehouse_id}&item_id=${item_id}`;
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((res) => {
            console.log("res", res)
            resolve(res.data.results);
        })
        .catch((err) => {
            reject(err)
        });
});

// Get Goods Onhand After Select Warehoues ID and No part ID
export const fetchGoodsOnhandDataForItemmasterData = (item_id) => new Promise((resolve, reject) => {
    const url = `${BASE_URL}/statistic/goods-onhand/plus?item_id=${item_id}`;
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((res) => {
            resolve(res.data.results);
        })
        .catch((err) => {
            reject(err)
        });
});

// Get Position Permission For Admin
export const fetchPositionPermissionData = (position_id) => new Promise((resolve, reject) => {
    const url = `${BASE_URL}/admin/position-permission?${position_id ? `position_id=${position_id}` : `&page_size=${PAGE_SIZE}`}`;
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((res) => {
            // console.log("res", res)
            resolve(res.data.results);
        })
        .catch((err) => {
            reject(err)
        });
});

// Get Position Permission For Admin
export const fetchPositionPermissionDataSearchPositionName = (position_name) => new Promise((resolve, reject) => {
    const url = `${BASE_URL}/admin/position-permission?position_name=${position_name}`;
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((res) => {
            // console.log("res", res)
            resolve(res.data.results);
        })
        .catch((err) => {
            reject(err)
        });
});


// Get Position Permission For Admin
export const fetchUserPermissionData = (position_id) => new Promise((resolve, reject) => {
    const url = `${BASE_URL}/admin/user-permission?${position_id ? `position_id=${position_id}` : `&page_size=${PAGE_SIZE}`}`;
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((res) => {
            console.log("res", res)
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
    ESCALATED: "ส่งต่อให้ผู้มีอำนาจ"
}
export const DOCUMENT_STATUS_ID = {
    DRAFT: 1,
    WAIT_APPROVE: 2,
    APPROVE_DONE: 3,
    VOID: 4,
    REOPEN: 5,
    FAST_TRACK: 6,
    ESCALATED: 7,
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

// approval_status
export const APPROVAL_STATUS = {
    UNCOMPLETE: 0, // "รอการลงนาม",
    APPROVED: 1, // "อนุมัติเรียบร้อย",
    REJECTED: 2, // "ส่งเอกสารไปยังต้นทาง",
    FAST_TRACKED: 3, // "FAST TRACK",
    ESCALATED: 4, // "ส่งเอกสารต่อ",
}

// approval_status
export const APPROVAL_STATUS_TH = {
    UNCOMPLETE: "รอการลงนาม",
    APPROVED: "อนุมัติเรียบร้อย",
    REJECTED: "ส่งเอกสารกลับไปยังต้นทาง",
    FAST_TRACKED: "FAST TRACK",
    ESCALATED: "ส่งเอกสารต่อ",
}

// Check document_action_type table in database -> CreateNew(DRAFT/WAIT_APPROVE/APPROVED), FastTrack(FAST_TRACK), Void(VOID)
// Check approval_process table in database -> is_canceled(REOPEN)
// Check Approval flow -> Clear infomation of CreateNew(DRAFT/WAIT_APPROVE/APPROVED)
// DRAFT
export const checkDocumentStatus = (valuesContext) => new Promise((resolve, reject) => {
    // GET document_action_type_id
    const _lookup_document_action_type = {
        CreateNew: 1,
        FastTrack: 2,
        Void: 3
    }
    let document_action_type_id = 1; //TODO valuesContext.document_action_type_id
    let approval_process_is_canceled = valuesContext.document_is_canceled;
    let approval_step = valuesContext.step_approve;
    // console.log("approval_step", valuesContext)
    if (_lookup_document_action_type.FastTrack === document_action_type_id) { return DOCUMENT_STATUS.FastTrack; }
    else if (_lookup_document_action_type.Void === document_action_type_id) { return DOCUMENT_STATUS.VOID; }
    else {
        // CreateNew
        if (approval_process_is_canceled === 1) {
            // console.log("------> REOPEN")
            return resolve(DOCUMENT_STATUS.REOPEN);
        }
        else {
            if (approval_step != undefined) {
                if (approval_step.length !== 0) {
                    // TODO: Check Latest ApprovalProcessID
                    let checkWaitApproval = false;
                    approval_step.map(apStep => {
                        if (apStep.approval_by.length === 0) {
                            // console.log("------> WAIT_APPROVE", apStep)
                            checkWaitApproval = true;
                            return resolve(DOCUMENT_STATUS.WAIT_APPROVE);
                        }
                        else {
                            if (apStep.approval_by[0].approval_status_id === APPROVAL_STATUS.REJECTED) {
                                return resolve(DOCUMENT_STATUS.REOPEN);
                            }
                        }
                    })
                    if (!checkWaitApproval) {
                        // console.log("------> APPROVE_DONE")
                        return resolve(DOCUMENT_STATUS.APPROVE_DONE);
                    }
                }
                else {
                    // console.log("------> DRAFT")
                    return resolve(DOCUMENT_STATUS.DRAFT);
                }
            }

        }
    }
})


const responseToFormState = (fact, data, document_type_group_id) => {
    if (isICD(document_type_group_id)) {
        if (document_type_group_id !== DOCUMENT_TYPE_ID.PHYSICAL_COUNT && document_type_group_id !== DOCUMENT_TYPE_ID.INVENTORY_ADJUSTMENT) {
            data.line_items.map((item) => {
                item.item_type_id = item.item.item_type_id
                if(item.date_manufactured) { item.date_manufactured = item.date_manufactured.split("T")[0] };
            })
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
                        list_uoms: [],
                        date_manufactured: ""
                    }
                );
            }
            // var created_on = new Date(data.created_on);
            // created_on.setHours(created_on.getHours() + 7)
            let form_state = {
                document_id: data.document_id,
                internal_document_id: data.internal_document_id,
                document_date: data.document_date.split("T")[0],
                created_by_user_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], data.created_by_user_id) || '',
                created_by_admin_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], data.created_by_admin_id) || '',
                created_on: data.created_on.split(".")[0],
                line_items: data.line_items,
                remark: data.remark,
                status_name_th: data.status_name,
                document_action_type_id: "",
            }
            if (document_type_group_id === DOCUMENT_TYPE_ID.GOODS_RECEIPT_PO) {
                return {
                    ...form_state,
                    po_id: data.po_id,
                    dest_warehouse_id: data.dest_warehouse_id
                }
            }
            if (document_type_group_id === DOCUMENT_TYPE_ID.GOODS_RETURN) {
                return {
                    ...form_state,
                    dest_warehouse_id: data.dest_warehouse_id
                }
            }
            if (document_type_group_id === DOCUMENT_TYPE_ID.GOODS_RECEIPT_FIX) {
                return {
                    ...form_state,
                    refer_to_document_id: data.refer_to_document_id,
                    dest_warehouse_id: data.dest_warehouse_id
                }
            }
            if (document_type_group_id === DOCUMENT_TYPE_ID.GOODS_RECEIPT_PO_NO_PO) {
                console.log("data", data)
                return {
                    ...form_state,
                    refer_to_document_internal_id: data.refer_to_document_internal_id,
                    dest_warehouse_id: data.dest_warehouse_id
                }
            }
            if (document_type_group_id === DOCUMENT_TYPE_ID.GOODS_USAGE) {
                return {
                    ...form_state,
                    src_warehouse_id: data.src_warehouse_id
                }
            }
            if (document_type_group_id === DOCUMENT_TYPE_ID.GOODS_FIX) {
                return {
                    ...form_state,
                    src_warehouse_id: data.src_warehouse_id
                }
            }
            if (document_type_group_id === DOCUMENT_TYPE_ID.GOODS_ISSUE) {
                return {
                    ...form_state,
                    src_warehouse_id: data.src_warehouse_id,
                    refer_to_document_name: data.refer_to_document_name
                }
            }
            if (document_type_group_id === DOCUMENT_TYPE_ID.INVENTORY_TRANSFER) {
                return {
                    ...form_state,
                    src_warehouse_id: data.src_warehouse_id,
                    dest_warehouse_id: data.dest_warehouse_id,
                }
            }
            if (document_type_group_id === DOCUMENT_TYPE_ID.SALVAGE_RETURN) {
                return {
                    ...form_state,
                    src_warehouse_id: data.src_warehouse_id
                }
            }
            if (document_type_group_id === DOCUMENT_TYPE_ID.SALVAGE_SOLD) {
                return {
                    ...form_state,
                    src_warehouse_id: data.src_warehouse_id
                }
            }
        } else {
            if (document_type_group_id === DOCUMENT_TYPE_ID.PHYSICAL_COUNT) {
                console.log(" I AM PHYSICAL_COUNT ")
                // data.specific.line_items.map((item) => {
                //     item.item_type_id = item.item.item_type_id
                // })
                for (var i = data.specific.line_items.length; i <= 9; i++) {
                    data.specific.line_items.push(
                        {
                            item_id: "",
                            internal_item_id: "",
                            description: "",
                            unit_count: "",
                            uom_group_id: "",
                            unit: "",
                            per_unit_price: "",
                            list_uoms: [],
                            item: {}
                        }
                    );
                }
                var created_on = new Date(data.document.created_on);
                created_on.setHours(created_on.getHours() + 7)
                return {
                    document_id: data.document.document_id,
                    internal_document_id: data.document.internal_document_id,
                    created_by_user_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], data.document.created_by_user_id) || '',
                    created_by_admin_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], data.document.created_by_admin_id) || '',
                    created_on: created_on.toISOString().split(".")[0],
                    line_items: data.specific.line_items,
                    src_warehouse_id: data.specific.warehouse_id,
                    remark: data.document.remark,
                    status_name_th: data.document.document_status.status,
                    // refer_to_document_name: data.specific.refer_to_document_name,
                    document_date: data.document.document_date.slice(0, 10)
                }
            }
            if (document_type_group_id === DOCUMENT_TYPE_ID.INVENTORY_ADJUSTMENT) {
                // data.specific.line_items.map((item) => {
                //     item.item_type_id = item.item.item_type_id
                // })
                for (var i = data.specific.line_items.length; i <= 9; i++) {
                    data.specific.line_items.push(
                        {
                            item_id: "",
                            internal_item_id: "",
                            description: "",
                            unit_count: "",
                            uom_group_id: "",
                            unit: "",
                            per_unit_price: "",
                            list_uoms: [],
                            item: {}
                        }
                    );
                }
                var created_on = new Date(data.document.created_on);
                created_on.setHours(created_on.getHours() + 7)
                return {
                    document_id: data.document.document_id,
                    internal_document_id: data.document.internal_document_id,
                    created_by_user_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], data.document.created_by_user_id) || '',
                    created_by_admin_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], data.document.created_by_admin_id) || '',
                    created_on: created_on.toISOString().split(".")[0],
                    line_items: data.specific.line_items,
                    src_warehouse_id: data.specific.warehouse_id,
                    remark: data.document.remark,
                    status_name_th: data.document.document_status.status,
                    // refer_to_document_name: data.specific.refer_to_document_name,
                    document_date: data.document.document_date.slice(0, 10)
                }
            }
        }
    } else if (document_type_group_id === DOCUMENT_TYPE_ID.WORK_REQUEST) {
        // Get Subset of Data from both DOCUMENT_SCHEMA_GET and WORK_REQUEST_SCHEMA_GET 
        // Object Destructuring and Property Shorthand https://stackoverflow.com/questions/17781472/how-to-get-a-subset-of-a-javascript-objects-properties
        let document_part = Object.fromEntries(
            Object.entries(data.document)
                .filter(([key]) => Object.keys(DOCUMENT_SCHEMA_GET).includes(key))
        )
        let work_request_part = Object.fromEntries(
            Object.entries(data.specific)
                .filter(([key]) => Object.keys(WORK_REQUEST_SCHEMA).includes(key))
        )
        console.log("this is document_part 123  ", document_part)
        console.log("this is work_request_part ", work_request_part)
        return { ...transformDocumentResponseToFormState(document_part, fact), ...transformWorkRequestResponseToFormState(work_request_part) }
    } else if (document_type_group_id === DOCUMENT_TYPE_ID.WORK_ORDER) {
        // Get Subset of Data from both DOCUMENT_SCHEMA_GET and WORK_REQUEST_SCHEMA_GET 
        // Object Destructuring and Property Shorthand https://stackoverflow.com/questions/17781472/how-to-get-a-subset-of-a-javascript-objects-properties
        let document_part = Object.fromEntries(
            Object.entries(data.document)
                .filter(([key]) => Object.keys(DOCUMENT_SCHEMA_GET).includes(key))
        )
        let work_order_part = Object.fromEntries(
            Object.entries(data.specific)
                .filter(([key]) => Object.keys(WORK_ORDER_SCHEMA).includes(key))
        )
        work_order_part = {
            ...work_order_part,
            line_items: data.specific.line_item
        }
        console.log("this is document_part 123  ", document_part)
        console.log("this is work_order_part ", work_order_part)
        return { ...transformDocumentResponseToFormState(document_part, fact), ...transformWorkOrderResponseToFormState(work_order_part) }
    } else if (document_type_group_id === DOCUMENT_TYPE_ID.SS101) {
        // Get Subset of Data from both DOCUMENT_SCHEMA_GET and SS101_SCHEMA_GET 
        console.log(">>> responseToFormState", data.document)
        let document_part = Object.fromEntries(
            Object.entries(data.document)
                .filter(([key]) => Object.keys(DOCUMENT_SCHEMA_GET).includes(key))
        )
        let ss101_part = Object.fromEntries(
            Object.entries(data.specific)
                .filter(([key]) => Object.keys(SS101_SCHEMA).includes(key))
        )
        // console.log("this is document_part 123  ", document_part)
        // console.log("this is ss101_part ", ss101_part)
        return { ...transformDocumentResponseToFormState(document_part, fact, document_type_group_id), ...transformSS101ResponseToFormState(ss101_part, data) }
    } else if (document_type_group_id === DOCUMENT_TYPE_ID.MAINTENANT_ITEM) {
        for (var i = data.specific.line_items.length; i <= 9; i++) {
            data.specific.line_items.push(
                {
                    item_id: "",
                    internal_item_id: "",
                    description: "",
                    uom_group_id: "",
                    unit: "",
                    list_uoms: [],
                }
            );
        }
        // var created_on = new Date(data.document.created_on);
        // created_on.setHours(created_on.getHours() + 7);
        let document_statuses = fact[FACTS.DOCUMENT_STATUS].items;
        let document_status = document_statuses.find(document_status => `${document_status.document_status_id}` === `${data.document.document_status_id}`);
        if (document_status) {
            return {
                document_id: data.document.document_id,
                internal_document_id: data.document.internal_document_id,
                created_by_user_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], data.document.created_by_user_id) || '',
                created_by_admin_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], data.document.created_by_admin_id) || '',
                created_on: data.document.created_on.split(".")[0],
                line_items: data.specific.line_items,
                src_warehouse_id: data.document.warehouse_id,
                remark: data.document.remark,
                refer_to_document_internal_id: data.document.refer_to_document_internal_id,
                refer_to_document_id: data.document.refer_to_document_id,
                document_date: data.document.document_date.slice(0, 10),
                status_name_th: document_status.status,
                node_id: data.specific.node_id,
                district_id: data.specific.district_id,
                division_id: data.specific.division_id
            }
        }
    } else if (document_type_group_id === DOCUMENT_TYPE_ID.EQUIPMENT_INSTALLATION) {
        var announce_use_on = new Date(data.specific.announce_use_on);
        announce_use_on.setHours(announce_use_on.getHours());

        var installed_on = new Date(data.specific.installed_on);
        installed_on.setHours(installed_on.getHours());

        let document_statuses = fact[FACTS.DOCUMENT_STATUS].items;
        let document_status = document_statuses.find(document_status => `${document_status.document_status_id}` === `${data.document.document_status_id}`);

        if (document_status) {
            return {
                document_id: data.document.document_id,
                item_id: data.specific.equipment.item_id,
                equipment_id: data.specific.equipment.equipment_id,
                internal_document_id: data.document.internal_document_id,
                internal_item_id: data.specific.equipment.equipment_item.item.internal_item_id,
                description: data.specific.equipment.equipment_item.item.description,
                uom_group_id: data.specific.equipment.equipment_item.item.uom_group_id,
                equipment_status_id: data.specific.equipment.item_status_id,
                responsible_district_id: data.specific.equipment.responsible_district_id,
                created_by_user_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], data.document.created_by_user_id) || '',
                created_by_admin_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], data.document.created_by_admin_id) || '',
                created_on: data.document.created_on.split(".")[0],
                remark: data.document.remark,
                document_date: data.document.document_date.slice(0, 10),
                announce_use_on: announce_use_on.toISOString().slice(0, 10),
                location_description: data.specific.location_description,
                location_district_id: data.specific.location_district_id,
                location_node_id: data.specific.location_node_id,
                location_station_id: data.specific.location_station_id,
                installed_on: installed_on.toISOString().slice(0, 10),
                x_cross_x_cross_id: data.specific.x_cross_x_cross_id,
                status_name_th: document_status.status
            }
        }
    } else if (document_type_group_id === DOCUMENT_TYPE_ID.SELECTOR) {
        // var created_on = new Date(data.document.created_on);
        // created_on.setHours(created_on.getHours() + 7);
        let document_statuses = fact[FACTS.DOCUMENT_STATUS].items;
        let document_status = document_statuses.find(document_status => `${document_status.document_status_id}` === `${data.document.document_status_id}`);
        if (document_status) {
            return {
                document_id: data.document.document_id,
                internal_document_id: data.document.internal_document_id,
                created_by_user_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], data.document.created_by_user_id) || '',
                created_by_admin_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], data.document.created_by_admin_id) || '',
                created_on: data.document.created_on.split(".")[0],
                src_warehouse_id: data.document.warehouse_id,
                document_date: data.document.document_date.slice(0, 10),

                name: data.specific.selector_pm_plan.name,
                district_id: data.specific.selector_pm_plan.node.district_id,
                node_id: data.specific.selector_pm_plan.node_id,
                station_id: data.specific.selector_pm_plan.station_id,
                start_on: data.specific.selector_pm_plan.start_on.slice(0, 16),
                status_name_th: document_status.status,

                w1_list: returnArrayLineSelector(data.specific.selector_pm_plan.selector_checklist_group, fact, 1),
                w2_list: returnArrayLineSelector(data.specific.selector_pm_plan.selector_checklist_group, fact, 2),
                w3_list: returnArrayLineSelector(data.specific.selector_pm_plan.selector_checklist_group, fact, 3),
                w4_list: returnArrayLineSelector(data.specific.selector_pm_plan.selector_checklist_group, fact, 4),
            }
        }
    } else if (document_type_group_id === DOCUMENT_TYPE_ID.WORK_ORDER_PM) {
        let document_statuses = fact[FACTS.DOCUMENT_STATUS].items;
        let document_status = document_statuses.find(document_status => `${document_status.document_status_id}` === `${data.document.document_status_id}`);

        let nodes = fact[FACTS.NODES].items;
        let node = nodes.find(node => `${node.node_id}` === `${data.specific.selector_pm_plan.node_id}`);
        if (document_status) {
            return {
                document_id: data.document.document_id,
                internal_document_id: data.document.internal_document_id,
                created_by_user_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], data.document.created_by_user_id) || '',
                created_by_admin_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], data.document.created_by_admin_id) || '',
                created_on: data.document.created_on.split(".")[0],
                document_date: data.document.document_date.slice(0, 10),

                member_1: data.specific.member_1,
                member_1_level_id: data.specific.member_1_level_id,
                member_2: data.specific.member_2,
                member_2_level_id: data.specific.member_2_level_id,
                member_3: data.specific.member_3,
                member_3_level_id: data.specific.member_3_level_id,
                member_4: data.specific.member_4,
                member_4_level_id: data.specific.member_4_level_id,
                member_lead: data.specific.member_lead,
                member_lead_level_id: data.specific.member_lead_level_id,

                name: data.specific.selector_pm_plan.name,
                district_id: node.district_id,
                node_id: data.specific.selector_pm_plan.node_id,
                start_on: data.specific.selector_pm_plan.start_on.slice(0, 10),
                status_name_th: document_status.status,

                w1_list: returnArrayLineWorkOrderPM(data.specific.work_order_pm_has_selector_checklist_line_item, fact, 1),
                w2_list: returnArrayLineWorkOrderPM(data.specific.work_order_pm_has_selector_checklist_line_item, fact, 2),
                w3_list: returnArrayLineWorkOrderPM(data.specific.work_order_pm_has_selector_checklist_line_item, fact, 3),
                w4_list: returnArrayLineWorkOrderPM(data.specific.work_order_pm_has_selector_checklist_line_item, fact, 4),

                work_order_pm_has_selector_checklist_line_item: returnArrayHasLineWorkOrderPM(data.specific.work_order_pm_has_selector_checklist_line_item),
            }
        }
    }
}

function transformDocumentResponseToFormState(document_part, fact, document_type_group_id) {
    // var created_on = new Date(document_part.created_on);
    // created_on.setHours(created_on.getHours() + 7)
    let document_statuses = fact[FACTS.DOCUMENT_STATUS].items;
    let document_status = document_statuses.find(document_status => `${document_status.document_status_id}` === `${document_part.document_status_id}`);
    if (document_status) {
        return {
            document_id: document_part.document_id,
            internal_document_id: document_part.internal_document_id,
            document_date: document_part.document_date.split("T")[0],
            created_by_user_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], document_part.created_by_user_id) || '',
            created_by_admin_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], document_part.created_by_admin_id) || '',
            created_on: document_part.created_on.split(".")[0],
            refer_to_document_id: document_part.refer_to_document_id,
            refer_to_document_internal_id: document_part.refer_to_document_internal_id,
            status_name_th: document_status.status,
            remark: document_part.remark
        }
    }
}

function returnEmptyStringIfNull(string) {
    return (string == null) ? '' : string;
}

function returnEmptyArrayIfNull(string) {
    console.log("string", string)
    return (string == null) ? [] : string;
}

function transformWorkRequestResponseToFormState(work_request_part) {
    return {
        ...work_request_part,
        accident_on: work_request_part.accident_on.slice(0, 16),
        location_district_id: returnEmptyStringIfNull(work_request_part.location_district_id),
        location_node_id: returnEmptyStringIfNull(work_request_part.location_node_id),
        location_station_id: returnEmptyStringIfNull(work_request_part.location_station_id),
    }
}

function transformWorkOrderResponseToFormState(work_order_part) {
    var accident_on = new Date(work_order_part.accident_on);
    accident_on.setHours(accident_on.getHours());

    var request_on = new Date(work_order_part.request_on);
    request_on.setHours(request_on.getHours());
    return {
        ...work_order_part,
        accident_on: accident_on.toISOString().slice(0, 16),
        request_on: request_on.toISOString().slice(0, 16),
        location_district_id: returnEmptyStringIfNull(work_order_part.location_district_id),
        location_node_id: returnEmptyStringIfNull(work_order_part.location_node_id),
        location_station_id: returnEmptyStringIfNull(work_order_part.location_station_id),
        line_items: returnFullArrayHasEquipmentItemNull(work_order_part.line_items),
    }
}

function transformSS101ResponseToFormState(ss101_part, data) {

    var departed_on = new Date(ss101_part.departed_on);
    departed_on.setHours(departed_on.getHours());

    var arrived_on = new Date(ss101_part.arrived_on);
    arrived_on.setHours(arrived_on.getHours());

    var request_on = new Date(ss101_part.request_on);
    request_on.setHours(request_on.getHours());

    var finished_on = new Date(ss101_part.finished_on);
    finished_on.setHours(finished_on.getHours());

    var accident_on = new Date(ss101_part.accident_on);
    accident_on.setHours(accident_on.getHours());
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>", data)
    // console.log("ss101_part.by_car_type_id", ss101_part.by_car_type_id)
    return {    
        ...ss101_part,
        accident_on: accident_on.toISOString().slice(0, 16),
        location_district_id: returnEmptyStringIfNull(ss101_part.location_district_id),
        location_node_id: returnEmptyStringIfNull(ss101_part.location_node_id),
        location_station_id: returnEmptyStringIfNull(ss101_part.location_station_id),

        // // Bottom Content
        car_type_id: returnEmptyStringIfNull(ss101_part.car_type_id),
        by_car_type_id: returnEmptyStringIfNull(ss101_part.by_car_type_id),
        departed_on: departed_on.toISOString().slice(0, 16),
        arrived_on: arrived_on.toISOString().slice(0, 16),
        request_on: request_on.toISOString().slice(0, 16),
        finished_on: finished_on.toISOString().slice(0, 16),
        system_type_group_id: returnEmptyStringIfNull(data.specific.system_type.system_type_group_id),
        sub_maintenance_type_id: returnEmptyStringIfNull(ss101_part.sub_maintenance_type_id),
        hardware_type_id: returnEmptyStringIfNull(ss101_part.hardware_type_id),
        x_type_id: returnEmptyStringIfNull(ss101_part.x_type_id),

        cargo_id: returnEmptyStringIfNull(ss101_part.cargo_id),
        service_method_id: returnEmptyStringIfNull(ss101_part.service_method_id),
        interrupt_id: returnEmptyStringIfNull(ss101_part.interrupt_id),
        doc_bypass_doc_bypass_id: data.specific.doc_bypass_doc_bypass_id,
        location_x_cross_id: data.specific.location_x_cross_id,

        // // Bottom Content ผู้เกี่ยวข้อง
        auditor_position_id: returnEmptyStringIfNull(ss101_part.auditor_position_id),
        fixer_position_id: returnEmptyStringIfNull(ss101_part.fixer_position_id),
        member_1_position_id: returnEmptyStringIfNull(ss101_part.member_1_position_id),
        member_2_position_id: returnEmptyStringIfNull(ss101_part.member_2_position_id),
        member_3_position_id: returnEmptyStringIfNull(ss101_part.member_3_position_id),
        member_4_position_id: returnEmptyStringIfNull(ss101_part.member_4_position_id),
        member_5_position_id: returnEmptyStringIfNull(ss101_part.member_5_position_id),
        member_6_position_id: returnEmptyStringIfNull(ss101_part.member_6_position_id),
        member_7_position_id: returnEmptyStringIfNull(ss101_part.member_7_position_id),
        member_8_position_id: returnEmptyStringIfNull(ss101_part.member_8_position_id),

        // line_items: [ss101_part.line_items],
        line_items: returnFullArrayHasEquipmentItemNull(data.specific.ss101_line_item),

        loss_line_items: returnFullArrayLossLineItemNull(data.specific.loss_line_item)
    }
}

function returnFullArrayHasEquipmentItemNull(has_equipment_item) {
    let initialEquipmentLineItem = {
        internal_item_id: '',
        description: '',
        document_id: '',
        equipment_item_id: '',
        equipment_status_id: '',
        remark: '',
        line_number: '',
        item_id: ''
    }
    for (var i = 0; i < has_equipment_item.length; i++) {
        has_equipment_item[i] = {
            internal_item_id: has_equipment_item[i].equipment_item.equipment.equipment_item.item.internal_item_id,
            description: has_equipment_item[i].equipment_item.equipment.equipment_item.item.description,
            document_id: has_equipment_item[i].document_id,
            equipment_item_id: has_equipment_item[i].equipment_item_id,
            item_status_id: has_equipment_item[i].item_status_id,
            remark: has_equipment_item[i].remark,
            line_number: has_equipment_item[i].line_number,
            item_id: has_equipment_item[i].item_id,
        };
    }
    for (var i = has_equipment_item.length; i <= 9; i++) {
        has_equipment_item.push({
            ...initialEquipmentLineItem,
        });
    }
    return has_equipment_item;
}

function returnFullArrayLossLineItemNull(loss_line_items) {
    let initialLossLineItem = {
        document_id: '', // maybe not needed
        line_number: '',
        description: '',   // รายการ
        quantity: '',
        uom_name: '',
        price: '',
        remark: '',
    }

    for (var i = loss_line_items.length; i <= 9; i++) {
        loss_line_items.push({
            ...initialLossLineItem,
            line_number: i
        });
    }
    return loss_line_items;
}

function returnArrayLineSelector(line_custom, fact, week) {
    let line_customs = [];
    line_custom.map((line_custom) => {
        // console.log("line_custom", line_custom)
        let internal_item_ids = fact.equipment.items;
        let internal_item_id = internal_item_ids.find(internal_item_id => `${internal_item_id.equipment_id}` === `${line_custom.weekly_task.equipment_item_id}`);
        // console.log("internal_item_id", internal_item_id)
        if (line_custom.weekly_task.weekly_plan_id === week)
            if (internal_item_id) {
                // let factXCrosses = fact[FACTS.X_CROSS].items;
                // let factXCross = factXCrosses.find(factXCross => `${factXCross.x_cross_id}` === `${internal_item_id.equipment_installation[0].x_cross_x_cross_id}`);

                line_customs.push({
                    station_id: null,
                    internal_item_id: internal_item_id.equipment_group.item.internal_item_id,
                    equipment_id: line_custom.weekly_task.equipment_item_id,
                    checklist_id: line_custom.selector_checklist[0].checklist_id,
                    x_cross_x_cross_id: internal_item_id.equipment_installation[0].x_cross_x_cross_id,
                    checklist_th: line_custom.selector_checklist[0].checklist_name,
                    // x_cross_x_cross_th: factXCross.road_center
                });
            } else {
                let selector_checklist_part = []
                line_custom.selector_checklist.map((list) => {
                    selector_checklist_part.push({
                        document_id: list.document_id,
                        checklist_name: list.checklist_name,
                        remark: list.remark,
                        checklist_id: list.checklist_id,
                        is_have: list.is_have.data[0] === 1 ? true : false
                    })
                })
                line_customs.push({
                    station_id: line_custom.weekly_task.station_id,
                    internal_item_id: null,
                    checklist_id: null,
                    x_cross_x_cross_id: null,
                    selector_checklist: selector_checklist_part
                });
            }
    })
    return line_customs;
}

function returnArrayLineWorkOrderPM(line_custom, fact, week) {
    let line_customs = [];
    let prev_equipment_id;
    let prev_station_id;
    let prev_weekly_task_id;
    line_custom.map((line_custom) => {
        // console.log("line_custom", line_custom)
        let internal_item_ids = fact.equipment.items;
        let internal_item_id = internal_item_ids.find(internal_item_id => `${internal_item_id.equipment_id}` === `${line_custom.equipment_item_id}`);
        // console.log("internal_item_id", internal_item_id)
        if (line_custom.weekly_task.weekly_plan_id === week) {
            if (internal_item_id) {
                let factXCrosses = fact[FACTS.X_CROSS].items;
                let factXCross = factXCrosses.find(factXCross => `${factXCross.x_cross_id}` === `${internal_item_id.equipment_installation[0].x_cross_x_cross_id}`);
                if (prev_equipment_id !== line_custom.equipment_item_id && prev_weekly_task_id !== line_custom.weekly_task_id) {
                    line_customs.push({
                        station_id: null,
                        internal_item_id: internal_item_id.equipment_group.item.internal_item_id,
                        checklist_name: line_custom.checklist_name,
                        checklist_id: line_custom.checklist_id,
                        x_cross_x_cross_th: factXCross.road_center,
                        weekly_task_id: line_custom.weekly_task_id,
                        cost: line_custom.cost,
                        remark: line_custom.remark
                    });
                    prev_equipment_id = line_custom.equipment_item_id;
                    prev_weekly_task_id = line_custom.weekly_task_id;
                } else {
                    prev_equipment_id = line_custom.equipment_item_id;
                    prev_weekly_task_id = line_custom.weekly_task_id;
                }
            } else {
                let factStations = fact[FACTS.STATIONS].items;
                let factStation = factStations.find(factStation => `${factStation.station_id}` === `${line_custom.station_id}`);
                if (prev_station_id !== line_custom.station_id && prev_weekly_task_id !== line_custom.weekly_task_id) {
                    line_customs.push({
                        station_id: line_custom.station_id,
                        station_th: factStation.name,
                        internal_item_id: null,
                        checklist_id: line_custom.checklist_id,
                        x_cross_x_cross_id: null,
                        weekly_task_id: line_custom.weekly_task_id,
                        checklist_name: line_custom.checklist_name,
                        cost: line_custom.cost,
                        remark: line_custom.remark
                    });
                    prev_station_id = line_custom.station_id;
                    prev_weekly_task_id = line_custom.weekly_task_id;
                } else {
                    prev_station_id = line_custom.station_id;
                    prev_weekly_task_id = line_custom.weekly_task_id;
                }
            }
        }
    })
    return line_customs;
}

function returnArrayHasLineWorkOrderPM(line_custom) {
    let work_order_pm_has_selector_checklist_line_item = [];
    line_custom.map((line_custom) => {
        work_order_pm_has_selector_checklist_line_item.push({
            selector_checklist_line_item_id: line_custom.selector_checklist_line_item_id,
            is_checked: line_custom.is_checked.data[0] === 1 ? true : false,
            weekly_task_id: line_custom.weekly_task_id,
            checklist_line_item_id: line_custom.checklist_line_item_id,
            checklist_line_item_name: line_custom.checklist_line_item.name,
            checklist_id: line_custom.checklist_id,
            checklist_name: line_custom.checklist_name,
            cost: line_custom.cost,
            remark: line_custom.remark
            // selector_checklist: 
        })
    })
    return work_order_pm_has_selector_checklist_line_item;
}




// Validation 
export const validateInternalDocumentIDWorfOrderPMFieldHelper = (decoded_token, checkBooleanForEdit, document_type_group_id, toolbar, footer, fact, values, setValues, setFieldValue, validateField, internal_document_id) => new Promise(resolve => {
    // Internal Document ID
    //  {DocumentTypeGroupAbbreviation}-{WH Abbreviation}-{Year}-{Auto Increment ID}
    //  ie. GR-PYO-2563/0001
    // if (toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.NONE || toolbar.mode === TOOLBAR_MODE.NONE_HOME) {
    //     return resolve();
    // }
    if (internal_document_id === values.internal_document_id) {
        return resolve();
    }

    if (document_type_group_id === DOCUMENT_TYPE_ID.WORK_ORDER_PM) {
        let error;
        getDocumentbyInternalDocumentID(internal_document_id)
            .then((data) => {
                // console.log(" i got data", data);
                if ((toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.NONE || toolbar.mode === TOOLBAR_MODE.NONE_HOME)
                    && !toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]) { //If Mode Search, needs to set value 
                    // console.log("validateInternalDocumentIDField:: I got document ID ")
                    setValues({ ...values, ...responseToFormState(fact, data, document_type_group_id) }, false); //Setvalues and don't validate
                    return resolve(null);
                }
            })
            .catch((err) => { // 404 NOT FOUND  If input Document ID doesn't exists
                // console.log("I think I have 404 not found in doc id.")
                setFieldValue('document_id', '', false);

                if (toolbar.mode === TOOLBAR_MODE.SEARCH) { //If Mode Search, invalid Document ID
                    error = 'Document ID not Found in System';
                } else {//If mode add, ok
                    // console.log("document ID doesn't exist but I am in mode add")
                    error = ''
                }
            })
            .finally(() => {
                return resolve(error)
            });
    }
});



// Validation 
export const validateInternalDocumentIDFieldHelper = (decoded_token, checkBooleanForEdit, document_type_group_id, toolbar, footer, fact, values, setValues, setFieldValue, validateField, internal_document_id) => new Promise(async (resolve) => {
    // Internal Document ID
    //  {DocumentTypeGroupAbbreviation}-{WH Abbreviation}-{Year}-{Auto Increment ID}
    //  ie. GR-PYO-2563/0001
    // if (checkBooleanForEdit === true && (toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.NONE || toolbar.mode === TOOLBAR_MODE.NONE_HOME)) {
    //     return resolve();
    // }
    if (internal_document_id === values.internal_document_id) {
        return resolve();
    }

    // Basic Form Checks of the Internal Document ID
    // 1. If it is empty
    // 2. If it is in the valid Form
    // console.log("internal_document_id..", internal_document_id)
    if (!internal_document_id) {
        console.log("validateInternalDocumentIDFieldHelper:: I dont have any internal doc id")
        console.log("validateInternalDocumentIDFieldHelper:: warehouseid", values.dest_warehouse_id)
        return resolve('Required');
    } else if (!isValidInternalDocumentIDFormat(internal_document_id)
        && !isValidOldInternalDocumentIDFormat(internal_document_id)
        // && !isValidInternalDocumentIDFastTrackFormat(internal_document_id)
        && !isValidInternalDocumentIDDraftFormat(internal_document_id)) {
        console.log("Invalid Document ID Format Be sure to use the format ie. สสญ.ธบ.-ธบ./2-4/2563/0001")
        // return resolve('Invalid Document ID Format Be sure to use the format ie. สสญ.ธบ.-ธบ./2-4/2563/0001') //เอาออกเพราะว่ามีการ เปลี่ยนชื่อเอกสารตามใจผู้ใช้ ในวันที่ 05/02/2021
    }

    // Basic information to share
    // Find this_warehouse_id_name for utility of the current document_type_group_id
    var this_warehouse_id_name;
    if (isICD(document_type_group_id)) { // If document type group ID is ICD
        if (isICDWarehouseDest(document_type_group_id)) {
            this_warehouse_id_name = "dest_warehouse_id";
        } else if (isICDWarehouseSrc(document_type_group_id)) {
            this_warehouse_id_name = "src_warehouse_id";
        }
    }



    // Checking from Database if Internal Document ID Exists
    let error;
    getDocumentbyInternalDocumentID(internal_document_id)
        .then((data) => {
            console.log(" i got data", data);
            if (isICD(document_type_group_id)) { // If document type group ID is ICD
                var internalDocumentID;

                // This is because the getting document with internal document id isn't perfect, the original way would separate between document and specific. So the physical count and the inventory adjustment isn't done yet. 
                if (document_type_group_id === DOCUMENT_TYPE_ID.PHYSICAL_COUNT
                    || document_type_group_id === DOCUMENT_TYPE_ID.INVENTORY_ADJUSTMENT) {
                    internalDocumentID = data.document.internal_document_id;
                } else {
                    internalDocumentID = data.internal_document_id;
                }

                // If input document ID exists
                // if (internalDocumentID === internal_document_id) {
                // NOTE: THIS IS ACTUALLY NOT NEEDED SINCE IF IT DOESNT EXIST IT WILL BE CATCHED in the ERROR,
                //       SEE CATCH BELOW!! 

                //If Mode Search, needs to set value 
                if ((toolbar.mode === TOOLBAR_MODE.SEARCH
                    || toolbar.mode === TOOLBAR_MODE.NONE
                    || toolbar.mode === TOOLBAR_MODE.NONE_HOME)
                    && !toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]) {
                    console.log("validateInternalDocumentIDField:: I got document ID ", internalDocumentID)
                    setValues({ ...values, ...responseToFormState(fact, data, document_type_group_id) }, false); //Setvalues and don't validate

                    // If it is inventory Transfer, this_warehouse_id will be dest, so need to validate Source too!
                    if (document_type_group_id === DOCUMENT_TYPE_ID.INVENTORY_TRANSFER) {
                        validateField("src_warehouse_id");
                    }
                    validateField(this_warehouse_id_name);
                    validateField("created_by_user_employee_id");
                    validateField("created_by_admin_employee_id");
                    return resolve(null);

                } else { //If Mode add, need to error duplicate Document ID
                    // setFieldValue('document_id', '', false); 
                    if (values.document_id || footer.requiresHandleClick[FOOTER_ACTIONS.SEND] || footer.requiresHandleClick[FOOTER_ACTIONS.SAVE]) { // I think this is when I'm in Mode Add, doing the Save action but I cann't approve 
                        //TODO - need to check whether it needs to be approved - Donut
                        console.log("i am in mode add, saved and wanting to approve")
                        error = '';
                    } else {
                        console.log("I AM DUPLICATE")
                        error = 'Duplicate Document ID';
                    }

                }


            } else if (document_type_group_id === DOCUMENT_TYPE_ID.WORK_REQUEST) {
                console.log("i know i am in workrequest!!")

                // if (data.document.internal_document_id === internal_document_id) { // If input document ID exists
                // NOTE: THIS IS ACTUALLY NOT NEEDED SINCE IF IT DOESNT EXIST IT WILL BE CATCHED in the ERROR,
                //    
                console.log("i am not ICD and toolbar mode in ", toolbar)
                if ((toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.NONE || toolbar.mode === TOOLBAR_MODE.NONE_HOME)
                    && !toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]) { //If Mode Search, needs to set value 
                    console.log("validateInternalDocumentIDField:: I got document ID ", data.document.document_id)
                    setValues({ ...values, ...responseToFormState(fact, data, document_type_group_id) }, false); //Setvalues and don't validate
                    // validateField("dest_warehouse_id");
                    validateField("created_by_user_employee_id");
                    validateField("created_by_admin_employee_id");
                    return resolve(null);

                } else { //If Mode add, need to error duplicate Document ID
                    // setFieldValue('document_id', '', false); 
                    if (values.document_id || footer.requiresHandleClick[FOOTER_ACTIONS.SEND] || footer.requiresHandleClick[FOOTER_ACTIONS.SAVE]) { // I think this is when I'm in Mode Add, doing the Save action but I cann't approve
                        console.log("i am in mode add, saved and wanting to approve")
                        error = '';
                    } else {
                        console.log("I AM DUPLICATE")
                        error = 'Duplicate Document ID';
                    }

                }

            } else if (document_type_group_id === DOCUMENT_TYPE_ID.WORK_ORDER) {
                console.log("i know i am in workorder!!")

                // if (data.document.internal_document_id === internal_document_id) { // If input document ID exists
                // NOTE: THIS IS ACTUALLY NOT NEEDED SINCE IF IT DOESNT EXIST IT WILL BE CATCHED in the ERROR,
                //    
                console.log("i am not ICD and toolbar mode in ", toolbar)
                if ((toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.NONE || toolbar.mode === TOOLBAR_MODE.NONE_HOME)
                    && !toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]) { //If Mode Search, needs to set value 
                    console.log("validateInternalDocumentIDField:: I got document ID ", data.document.document_id)
                    setValues({ ...values, ...responseToFormState(fact, data, document_type_group_id) }, false); //Setvalues and don't validate
                    // validateField("dest_warehouse_id");
                    console.log("!!!!!!!")
                    validateField("created_by_user_employee_id");
                    validateField("created_by_admin_employee_id");
                    return resolve(null);

                } else { //If Mode add, need to error duplicate Document ID
                    // setFieldValue('document_id', '', false); 
                    if (values.document_id || footer.requiresHandleClick[FOOTER_ACTIONS.SEND] || footer.requiresHandleClick[FOOTER_ACTIONS.SAVE]) { // I think this is when I'm in Mode Add, doing the Save action but I cann't approve
                        console.log("i am in mode add, saved and wanting to approve")
                        error = '';
                    } else {
                        console.log("I AM DUPLICATE")
                        error = 'Duplicate Document ID';
                    }

                }

            } else if (document_type_group_id === DOCUMENT_TYPE_ID.SS101) {
                console.log("i know i am in ss101!!")
                if ((toolbar.mode === TOOLBAR_MODE.SEARCH ||
                    toolbar.mode === TOOLBAR_MODE.NONE ||
                    toolbar.mode === TOOLBAR_MODE.NONE_HOME)
                    && !toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]) { //If Mode Search, needs to set value 
                    console.log("validateInternalDocumentIDField:: I got document ID ", data.document.document_id)
                    setValues({ ...values, ...responseToFormState(fact, data, document_type_group_id) }, false); //Setvalues and don't validate
                    validateField("created_by_user_employee_id");
                    validateField("created_by_admin_employee_id");
                    return resolve(null);

                } else { //If Mode add, need to error duplicate Document ID
                    // setFieldValue('document_id', '', false); 
                    if (values.document_id || footer.requiresHandleClick[FOOTER_ACTIONS.SEND] || footer.requiresHandleClick[FOOTER_ACTIONS.SAVE]) { // I think this is when I'm in Mode Add, doing the Save action but I cann't approve
                        console.log("i am in mode add, saved and wanting to approve")
                        error = '';
                    } else {
                        console.log("I AM DUPLICATE")
                        error = 'Duplicate Document ID';
                    }
                }


            } else if (document_type_group_id === DOCUMENT_TYPE_ID.MAINTENANT_ITEM) {
                console.log("i know i am in maintenant item!!")
                if ((toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.NONE || toolbar.mode === TOOLBAR_MODE.NONE_HOME)
                    && !toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]) { //If Mode Search, needs to set value 
                    console.log("validateInternalDocumentIDField:: I got document ID ")
                    setValues({ ...values, ...responseToFormState(fact, data, document_type_group_id) }, false); //Setvalues and don't validate
                    validateField("created_by_user_employee_id");
                    validateField("created_by_admin_employee_id");
                    return resolve(null);

                } else { //If Mode add, need to error duplicate Document ID
                    // setFieldValue('document_id', '', false); 
                    if (values.document_id || footer.requiresHandleClick[FOOTER_ACTIONS.SEND] || footer.requiresHandleClick[FOOTER_ACTIONS.SAVE]) { // I think this is when I'm in Mode Add, doing the Save action but I cann't approve
                        console.log("i am in mode add, saved and wanting to approve")
                        error = '';
                    } else {
                        console.log("I AM DUPLICATE")
                        error = 'Duplicate Document ID';
                    }
                }
            } else if (document_type_group_id === DOCUMENT_TYPE_ID.EQUIPMENT_INSTALLATION) {
                console.log("i know i am in equipmrnt installation item!!")
                if ((toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.NONE || toolbar.mode === TOOLBAR_MODE.NONE_HOME)
                    && !toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]) { //If Mode Search, needs to set value 
                    console.log("validateInternalDocumentIDField:: I got document ID ")
                    setValues({ ...values, ...responseToFormState(fact, data, document_type_group_id) }, false); //Setvalues and don't validate
                    validateField("created_by_user_employee_id");
                    validateField("created_by_admin_employee_id");
                    validateField("internal_item_id");
                    return resolve(null);

                } else { //If Mode add, need to error duplicate Document ID
                    // setFieldValue('document_id', '', false); 
                    if (values.document_id || footer.requiresHandleClick[FOOTER_ACTIONS.SEND] || footer.requiresHandleClick[FOOTER_ACTIONS.SAVE]) { // I think this is when I'm in Mode Add, doing the Save action but I cann't approve
                        console.log("i am in mode add, saved and wanting to approve")
                        error = '';
                    } else {
                        console.log("I AM DUPLICATE")
                        error = 'Duplicate Document ID';
                    }
                }
            } else if (document_type_group_id === DOCUMENT_TYPE_ID.SELECTOR) {
                console.log("i know i am in SELECTOR!!")
                if ((toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.NONE || toolbar.mode === TOOLBAR_MODE.NONE_HOME)
                    && !toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]) { //If Mode Search, needs to set value 
                    console.log("validateInternalDocumentIDField:: I got document ID ")
                    setValues({ ...values, ...responseToFormState(fact, data, document_type_group_id) }, false); //Setvalues and don't validate
                    validateField("created_by_user_employee_id");
                    validateField("created_by_admin_employee_id");
                    return resolve(null);

                } else { //If Mode add, need to error duplicate Document ID
                    // setFieldValue('document_id', '', false); 
                    if (values.document_id || footer.requiresHandleClick[FOOTER_ACTIONS.SEND] || footer.requiresHandleClick[FOOTER_ACTIONS.SAVE]) { // I think this is when I'm in Mode Add, doing the Save action but I cann't approve
                        console.log("i am in mode add, saved and wanting to approve")
                        error = '';
                    } else {
                        console.log("I AM DUPLICATE")
                        error = 'Duplicate Document ID';
                    }
                }
            } else {
                console.error("validateInternalDocumentIDFieldHelper:: Unhandled Document Type Group ID.", document_type_group_id)
            }
        })
        .catch(async (err) => { // 404 NOT FOUND  If input Document ID doesn't exists
            console.log("validateInternalDocumentIDFieldHelper:: I think I have 404 not found in doc id.", err.response)

            //Reset Document ID to Empty String
            setFieldValue('document_id', '', false);

            //If Mode Search, invalid Document ID:: Document ID not found in System
            if (toolbar.mode === TOOLBAR_MODE.SEARCH) {
                error = 'Document ID not found in System';
            } else {//If Mode Add, ok
                console.log("validateInternalDocumentIDFieldHelper:: document ID doesn't exist but I am in mode add")
                error = ''

                // If auto increment
                if (values.is_auto_internal_document_id === "auto") {
                    var internalDocumentID;
                    // if (isICD(document_type_group_id)) {
                    //     console.log("validateInternalDocumentIDFieldHelper:: auto!!");
                    //     console.log("validateInternalDocumentIDFieldHelper:: values[this_warehouse_id_name]", values[this_warehouse_id_name]);

                    //     internalDocumentID = getInternalDocumentIDFromCurrentValues(fact, values, document_type_group_id, this_warehouse_id_name);

                    //     console.log("validateInternalDocumentIDFieldHelper:: internalDocumentID", internalDocumentID);
                    //     setFieldValue("internal_document_id", internalDocumentID, false);
                    // }else{ // PMT

                    // }

                    var delimiter = "/";
                    var positionAbbreviation, positionID, documentTypeGroupIDSplit, fullYearBE, runningInternalDocumentID;
                    var internalDocumentID;
                    if (isICD(document_type_group_id)) { // If document type group ID is ICD
                        var this_warehouse_id_name;
                        if (isICDWarehouseDest(document_type_group_id)) {
                            this_warehouse_id_name = "dest_warehouse_id";
                        } else if (isICDWarehouseSrc(document_type_group_id)) {
                            this_warehouse_id_name = "src_warehouse_id";
                        }
                        console.log("validateInternalDocumentIDFieldHelper:: values[this_warehouse_id_name]", values[this_warehouse_id_name]);
                        let position = getPositionAbbreviationFromWarehouseID(fact.position, values[this_warehouse_id_name]);
                        if (position) {
                            positionAbbreviation = position.abbreviation;
                            positionID = position.position_id;
                        }

                        // runningInternalDocumentID = await fetchLastestRunningInternalDocumentID(positionID, document_type_group_id, fullYearBE);
                        // internalDocumentID = getInternalDocumentIDFromCurrentValues(fact, values, document_type_group_id, this_warehouse_id_name, runningInternalDocumentID);
                    } else { // If document type group ID is PMT
                        positionAbbreviation = decoded_token.has_position[0].abbreviation;
                        positionID = decoded_token.has_position[0].position_id;
                        // internalDocumentID = getInternalDocumentIDFromCurrentValuesPMT(fact, values, document_type_group_id, positionAbbreviation, runningInternalDocumentID);

                    }
                    console.log("validateInternalDocumentIDFieldHelper:: positionAbbreviation", positionAbbreviation)
                    documentTypeGroupIDSplit = `${document_type_group_id.toString()[0]}-${document_type_group_id.toString().substr(1)}`;
                    fullYearBE = (parseInt(values["document_date"].slice(0, 4)) + 543).toString();
                    try {
                        let fullYearBEForAPI = (parseInt(fullYearBE) - 543).toString();
                        runningInternalDocumentID = await fetchLastestRunningInternalDocumentID(positionID, document_type_group_id, fullYearBEForAPI);
                        let splitRunningInternalDocumentID = runningInternalDocumentID.split(delimiter);
                        runningInternalDocumentID = (parseInt(splitRunningInternalDocumentID[splitRunningInternalDocumentID.length - 1]) + 1).toString().padStart(4, '0');
                    } catch (err) {
                        if (err === 'No Results in fetchLastestRunningInternalDocumentID') {
                            console.log("validateInternalDocumentIDFieldHelper:: No Results in fetchLastestRunningInternalDocumentID")
                            runningInternalDocumentID = "0001";
                        } else {
                            throw "validateInternalDocumentIDFieldHelper:: try catch values.is_auto_internal_document_id === auto";
                        }
                    }
                    internalDocumentID = [positionAbbreviation, documentTypeGroupIDSplit, fullYearBE, runningInternalDocumentID].join(delimiter);

                    console.log("validateInternalDocumentIDFieldHelper:: internalDocumentID", internalDocumentID)

                    // setFieldTouched('internal_document_id');
                    await setFieldValue('internal_document_id', internalDocumentID, false);

                }



            }
        })
        .finally(() => {
            return resolve(error)
        });
});

// export const getInternalDocumentIDFromCurrentValues = (fact, values, document_type_group_id, this_warehouse_id_name, runningInternalDocumentIDInitial= null, delimiter = "/") => {

//     var positionAbbreviation, documentTypeGroupIDSplit, fullYearBE, runningInternalDocumentID; 
//     var internalDocumentID;

//     let position = getPositionAbbreviationFromWarehouseID(fact.position, values[this_warehouse_id_name]);
//     positionAbbreviation = position.abbreviation;
//     documentTypeGroupIDSplit = `${document_type_group_id.toString()[0]}-${document_type_group_id.toString().substr(1)}`;
//     fullYearBE = (parseInt(values["document_date"].slice(0, 4))+543).toString();
//     runningInternalDocumentID = (runningInternalDocumentIDInitial) ? runningInternalDocumentIDInitial : "0000";
//     internalDocumentID = [positionAbbreviation, documentTypeGroupIDSplit, fullYearBE, runningInternalDocumentID].join(delimiter);

//     return internalDocumentID;

// }

// export const getInternalDocumentIDFromCurrentValuesPMT = (fact, values, document_type_group_id, positionAbbreviation, runningInternalDocumentIDInitial= null, delimiter = "/") => {

//     var positionAbbreviation, documentTypeGroupIDSplit, fullYearBE, runningInternalDocumentID; 
//     var internalDocumentID;

//     documentTypeGroupIDSplit = `${document_type_group_id.toString()[0]}-${document_type_group_id.toString().substr(1)}`;
//     fullYearBE = (parseInt(values["document_date"].slice(0, 4))+543).toString();
//     runningInternalDocumentID = (runningInternalDocumentIDInitial) ? runningInternalDocumentIDInitial : "0000";
//     internalDocumentID = [positionAbbreviation, documentTypeGroupIDSplit, fullYearBE, runningInternalDocumentID].join(delimiter);
//     console.log("internalDocumentID >>", internalDocumentID)

//     return internalDocumentID;

// }

export const validateLineNumberInternalItemIDFieldHelper = (document_type_group_id, fact, values, setFieldValue, fieldName, internal_item_id, index) => {
    //     By default Trigger every line_item, so need to check if the internal_item_id changes ourselves
    internal_item_id = internal_item_id.toUpperCase()
    if (document_type_group_id === DOCUMENT_TYPE_ID.GOODS_RECEIPT_PO) {
        if (values.line_items[index].internal_item_id === internal_item_id) {
            return;
        }
        if (internal_item_id === "") {
            setFieldValue(fieldName + `.description`, '', false);
            setFieldValue(fieldName + `.quantity`, '', false);
            setFieldValue(fieldName + `.list_uoms`, [], false);
            setFieldValue(fieldName + `.uom_id`, '', false);
            setFieldValue(fieldName + `.per_unit_price`, '', false);
            return;
        }
        let items = fact.items.items;
        let item = items.find(item => `${item.internal_item_id}` === `${internal_item_id}`); // Returns undefined if not found
        console.log(item)
        if (item) {
            if (item.item_type_id === 1) {
                setFieldValue(fieldName + `.internal_item_id`, `${internal_item_id}`, false);
                setFieldValue(fieldName + `.item_type_id`, `${item.item_type_id}`, false);
                setFieldValue(fieldName + `.description`, `${item.description}`, false);
                setFieldValue(fieldName + `.quantity`, 0, false);
                setFieldValue(fieldName + `.list_uoms`, item.list_uoms, false);
                setFieldValue(fieldName + `.uom_id`, item.list_uoms[0].uom_id, false);
                setFieldValue(fieldName + `.line_number`, index + 1, false);
                setFieldValue(fieldName + `.item_status_id`, 1, false);
                setFieldValue(fieldName + `.per_unit_price`, 0, false);
            }
            return;
        } else {
            return 'Invalid Number ID';
        }
    } else if (document_type_group_id === DOCUMENT_TYPE_ID.GOODS_RETURN) {
        if (values.line_items[index].internal_item_id === internal_item_id) {
            return;
        }
        if (internal_item_id === "") {
            setFieldValue(fieldName + `.description`, '', false);
            setFieldValue(fieldName + `.quantity`, '', false);
            setFieldValue(fieldName + `.list_uoms`, [], false);
            setFieldValue(fieldName + `.uom_id`, '', false);
            setFieldValue(fieldName + `.per_unit_price`, '', false);
            return;
        }
        let items = fact.items.items;
        let item = items.find(item => `${item.internal_item_id}` === `${internal_item_id}`); // Returns undefined if not found
        // console.log(item)
        if (item) {
            if (item.item_type_id === 1) {
                setFieldValue(fieldName + `.internal_item_id`, `${internal_item_id}`, false);
                setFieldValue(fieldName + `.item_type_id`, `${item.item_type_id}`, false);
                setFieldValue(fieldName + `.description`, `${item.description}`, false);
                setFieldValue(fieldName + `.quantity`, 0, false);
                setFieldValue(fieldName + `.list_uoms`, item.list_uoms, false);
                setFieldValue(fieldName + `.uom_id`, item.list_uoms[0].uom_id, false);
                setFieldValue(fieldName + `.line_number`, index + 1, false);
                setFieldValue(fieldName + `.item_status_id`, 1, false);
                setFieldValue(fieldName + `.per_unit_price`, 0, false);
            }
            return;
        } else {
            return 'Invalid Number ID';
        }
    } else if (document_type_group_id === DOCUMENT_TYPE_ID.GOODS_RECEIPT_FIX) {
        if (values.line_items[index].internal_item_id === internal_item_id) {
            return;
        }
        if (internal_item_id === "") {
            setFieldValue(fieldName + `.description`, '', false);
            setFieldValue(fieldName + `.quantity`, '', false);
            setFieldValue(fieldName + `.list_uoms`, [], false);
            setFieldValue(fieldName + `.uom_id`, '', false);
            setFieldValue(fieldName + `.per_unit_price`, '', false);
            return;
        }
        let items = fact.items.items;
        let item = items.find(item => `${item.internal_item_id}` === `${internal_item_id}`); // Returns undefined if not found
        // console.log(item)
        if (item) {
            if (item.item_type_id === 1) {
                setFieldValue(fieldName + `.internal_item_id`, `${internal_item_id}`, false);
                setFieldValue(fieldName + `.item_type_id`, `${item.item_type_id}`, false);
                setFieldValue(fieldName + `.description`, `${item.description}`, false);
                setFieldValue(fieldName + `.quantity`, 0, false);
                setFieldValue(fieldName + `.list_uoms`, item.list_uoms, false);
                setFieldValue(fieldName + `.uom_id`, item.list_uoms[0].uom_id, false);
                setFieldValue(fieldName + `.line_number`, index + 1, false);
                setFieldValue(fieldName + `.item_status_id`, 4, false);
                setFieldValue(fieldName + `.per_unit_price`, 0, false);
            }
            return;
        } else {
            return 'Invalid Number ID';
        }
    } else if (document_type_group_id === DOCUMENT_TYPE_ID.GOODS_RECEIPT_PO_NO_PO) {
        if (values.line_items[index].internal_item_id === internal_item_id) {
            return;
        }
        if (internal_item_id === "") {
            setFieldValue(fieldName + `.description`, '', false);
            setFieldValue(fieldName + `.quantity`, '', false);
            setFieldValue(fieldName + `.list_uoms`, [], false);
            setFieldValue(fieldName + `.uom_id`, '', false);
            setFieldValue(fieldName + `.per_unit_price`, '', false);
            return;
        }
        let items = fact.items.items;
        let item = items.find(item => `${item.internal_item_id}` === `${internal_item_id}`); // Returns undefined if not found
        // console.log(item)
        if (item) {
            if (item.item_type_id === 1) {
                setFieldValue(fieldName + `.internal_item_id`, `${internal_item_id}`, false);
                setFieldValue(fieldName + `.item_type_id`, `${item.item_type_id}`, false);
                setFieldValue(fieldName + `.description`, `${item.description}`, false);
                setFieldValue(fieldName + `.quantity`, 0, false);
                setFieldValue(fieldName + `.list_uoms`, item.list_uoms, false);
                setFieldValue(fieldName + `.uom_id`, item.list_uoms[0].uom_id, false);
                setFieldValue(fieldName + `.per_unit_price`, 0, false);
            }
            return;
        } else {
            return 'Invalid Number ID';
        }
    }
};

export const validateLineNumberQuatityItemIDFieldHelper = (setFieldValue, fieldName, quantity, index) => {
    if (quantity === "") {
        return;
    }

    if (quantity !== 0) {
        setFieldValue(fieldName, quantity, false);
        return;
    } else {
        return 'Invalid Quantity Line Item';
    }
}

export const validateLineNumberPerUnitPriceItemIDFieldHelper = (setFieldValue, fieldName, per_unit_price, index) => {
    if (per_unit_price === "") {
        return;
    }

    if (per_unit_price !== "") {
        setFieldValue(fieldName, per_unit_price, false);
        return;
    } else {
        return 'Invalid Per Unit Price Line Item';
    }
}

export const validateEmployeeIDField = (fieldName, fact, setFieldValue, employee_id) => {
    // console.log("I am validating employee id")
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

export const validateUserIDField = (fieldName, fact, setFieldValue, user_id) => {
    if (!user_id) {
        return;
    }
    if (Number.isInteger(user_id)) {
        let users = fact[FACTS.USERS].items;
        let user = users.find(user => user.user_id === user_id); // Returns undefined if not found
        if (user) {
            setFieldValue(fieldName, `${user.employee_id}\\${user.firstname_th} ${user.lastname_th}`, false);
            return;
        } else {
            return 'Invalid Employee ID';
        }
    } else {
        let users = fact[FACTS.USERS].items;
        let user = users.find(user => user.user_id === getUserIDFromEmployeeID(fact[FACTS.USERS], user_id)); // Returns undefined if not found
        if (user) {
            setFieldValue(fieldName, `${user.employee_id}\\${user.firstname_th} ${user.lastname_th}`, false);
            return;
        } else {
            return 'Invalid Employee ID';
        }
    }
};


export const validateWarehouseIDField = (fieldName, fact, setFieldValue, warehouse_id) => {
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

export const validatedataDocumentField = (fieldName, setFieldValue, name) => {
    if (!name) {
        return 'Required'
    }
    return '';
};

// Approve a Document
//   1. GET /approval/{document_id}/latest/step : getLatestApprovalStep()
//   2. POST /approval/{document_id}/approval_process_id/approve : approveDocuement(document_id, objBody)
export const approveDocument = (document_id, approval_step_action_id, userInfo, remark) => new Promise((resolve, reject) => {
    getLatestApprovalStep(document_id, approval_step_action_id, userInfo, remark)
        .then((obj_body) => { // Get the Document_ID
            approveDocuement(document_id, obj_body)
                .then((res) => {
                    return resolve(res);
                })
                .catch((err) => {
                    return reject(err);
                });
        })
        .catch((err) => {
            reject(err)
        });
});

// Get latest approval step
// GET /approval/{document_id}/latest/step
export const getLatestApprovalStep = (document_id, approval_step_action_id, userInfo, remark) => new Promise((resolve, reject) => {
    const url = `${BASE_URL}/approval/${document_id}/latest/step`;
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then(res => {
            console.log(" I am successful in get latest approval_step ", res.data);
            let obj_body = {
                "step_number": res.data.step_number,
                "user_id": userInfo.id,
                "approval_process_id": res.data.approval_process_id,
                "approval_status_id": approval_step_action_id,
                "position_group_id": userInfo.has_position[0].position_group_id,
                "remark": remark
            }
            resolve(obj_body);
        }).catch(function (err) {
            reject(err.response)
        })
});

// Cancel Approval Process ID
// POST /approval/{document_id}/{approval_process_id}/cancel
export const cancelApproval = (document_id, approval_process_id) => new Promise((resolve, reject) => {
    const url = `${BASE_URL}/approval/${document_id}/${approval_process_id}/cancel`;
    axios.post(url, '', { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then(res => {
            console.log(" I am successful in get latest approval_step ", res.data);
            resolve(res);
        }).catch(function (err) {
            reject(err)
        })
});

// Approve document in approval_step
// POST /approval/{document_id}/approval_process_id/approve
export const approveDocuement = (document_id, obj_body) => new Promise((resolve, reject) => {
    console.log("approveDocuement obj_body ------>", obj_body);
    const url = `${BASE_URL}/approval/${document_id}/${obj_body.approval_process_id}/approve`;
    axios.post(url, obj_body, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then(res => {
            console.log(" I am successful in creating approval to document with document_id ", res);
            resolve(res);
        }).catch(function (err) {
            console.log("err", err.response)
            reject(err);
        })
});


// Validate Token: 200 if token is valid and not expired, 400 otherwise. + requestBody {'refresh_token': true} 201 and token is refreshed [if not expired]
// POST /auth/token-validation
export const validateToken = (willRefreshToken) => new Promise((resolve, reject) => {
    const url = `${BASE_URL}/auth/token-validation`;
    const requestBody = willRefreshToken ? { 'refresh_token': true } : null;
    axios.post(url, requestBody, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then(res => {
            resolve(res);
        }).catch(function (err) { // 400 and 500 errors default validateStatus valid code is >= 200 and < 300. https://stackoverflow.com/questions/47679543/axios-400-error-request-call-then-instead-of-catch
            reject(err);
        })
});

export const weightedAverage = (lots) => {
    var quantityTotal = 0;
    var weightedTotal = 0;
    lots.map((lot) => {
        quantityTotal += lot.quantity;
        weightedTotal += lot.quantity * lot.per_unit_price;
    })
    var averageFifo = weightedTotal / quantityTotal;
    if (averageFifo) {
        return averageFifo.toFixed(4);
    } else return 0;
}

export const getLotFromQty = (fifo, quantity) => {
    var fifoCopy = fifo.slice(); // make a copy
    // console.log("fifoCopy", fifoCopy)
    var quantityLeft = quantity;
    // console.log("quantityLeft", quantityLeft)
    var lotsFrom = [];
    // console.log("lotsFrom fifo ", fifo)
    for (var currentLot of fifo) {
        // console.log("lotsFrom currentLot ", currentLot)
        if (quantityLeft >= currentLot.quantity) { // if Quantity Left >= Current Lot Quantity, shift and push
            lotsFrom.push(fifoCopy.shift());
            quantityLeft -= currentLot.quantity;
        } else { // if Quantity Left < Current Lot Quantity, shift and push only required # of lot
            if (quantityLeft == 0) {
                break;
            }
            lotsFrom.push({ ...fifoCopy.shift(), quantity: quantityLeft });
            quantityLeft = 0;
        }
    }
    // Artificial Lots if QTY leftover
    if (quantityLeft > 0) {
        lotsFrom.push({ quantity: quantityLeft, per_unit_price: weightedAverage(lotsFrom) });
    }
    // console.log("lotsFrom", lotsFrom)
    return lotsFrom;
};


var fifoCopyRaw = [];
var compose_fifo2;
export const rawLotFromQty = (raw_fifo, quantity) => {
    // console.log("raw_fifo?>>>>", raw_fifo, "fifoCopyRaw", fifoCopyRaw)
    if (fifoCopyRaw.length === 0) {
        // console.log("IN PROCESS")
        // var fifoCopyRaw = Object.assign([], raw_fifo)
        fifoCopyRaw = [...raw_fifo]; // make a copy
        var compose_fifo = [];
        var quantityLeft = 0;

        // หา lot ที่ไม่ติดลบ และ เก็บ lot ที่ติดลบไว้ใน var quantityLeft
        for (var currentLot of fifoCopyRaw) {
            // console.log("compose_fifo ", compose_fifo)
            if (currentLot.quantity > 0) {
                compose_fifo.push(currentLot)
            } else {
                quantityLeft = quantityLeft + Math.abs(currentLot.quantity)
            }
        }
        // ลบของออกจาก lot
        compose_fifo2 = [...compose_fifo]; // make a copy

        // console.log("compose_fifo2", compose_fifo2)
        // console.log("quantityLeft", quantityLeft)

        for (var afterDesimalLot of fifoCopyRaw) {
            // console.log("quantityLeft>>>>>>", quantityLeft)
            if (quantityLeft > compose_fifo2[0].quantity) {
                quantityLeft = quantityLeft - compose_fifo2[0].quantity;
                compose_fifo2.shift();
            } else {
                if (quantityLeft == 0) {
                    break;
                } else {
                    compose_fifo2[0].quantity = compose_fifo2[0].quantity - quantityLeft;
                    quantityLeft = 0;
                }
            }
        }
        // console.log("quantityLeft>>>>>>", quantityLeft)
        let total = 0;
        for (var composeLotFifo of compose_fifo2) {
            total = total + composeLotFifo.quantity
        }
        // console.log("total", total, "quantity", quantity)
        if (total === quantity) {
            // console.log("total === quantity", "=>", "compose_fifo", compose_fifo2)
            return compose_fifo2;
        } else {
            // console.log("total !== quantity", "=>", "compose_fifo", compose_fifo2)
            return compose_fifo2;
        }
    } else if (`${fifoCopyRaw[0].item_id}` !== `${raw_fifo[0].item_id}`
        || `${fifoCopyRaw[0].item_status_id}` !== `${raw_fifo[0].item_status_id}`
        || `${fifoCopyRaw[0].warehouse_id}` !== `${raw_fifo[0].warehouse_id}`) {
        // console.log("IN PROCESS ELSE IF")
        // var fifoCopyRaw = Object.assign([], raw_fifo)
        fifoCopyRaw = [...raw_fifo]; // make a copy
        var compose_fifo = [];
        var quantityLeft = 0;

        // หา lot ที่ไม่ติดลบ และ เก็บ lot ที่ติดลบไว้ใน var quantityLeft
        for (var currentLot of fifoCopyRaw) {
            // console.log("compose_fifo ", compose_fifo)
            if (currentLot.quantity > 0) {
                compose_fifo.push(currentLot)
            } else {
                quantityLeft = quantityLeft + Math.abs(currentLot.quantity)
            }
        }
        // ลบของออกจาก lot
        compose_fifo2 = [...compose_fifo]; // make a copy

        // console.log("compose_fifo2", compose_fifo2)

        for (var afterDesimalLot of fifoCopyRaw) {
            // console.log("quantityLeft>>>>>>", quantityLeft)
            if (quantityLeft > compose_fifo2[0].quantity) {
                quantityLeft = quantityLeft - compose_fifo2[0].quantity;
                compose_fifo2.shift();
                // console.log("compose_fifo ===>>>> IF", compose_fifo2)
            } else {
                // console.log("compose_fifo ===>>>> ELSE")
                if (quantityLeft == 0) {
                    // console.log("compose_fifo ===>>>> BREAK")
                    break;
                } else {
                    compose_fifo2[0].quantity = compose_fifo2[0].quantity - quantityLeft;
                    quantityLeft = 0;
                }
            }
        }
        // console.log("quantityLeft>>>>>>", quantityLeft)
        let total = 0;
        for (var composeLotFifo of compose_fifo2) {
            total = total + composeLotFifo.quantity
        }
        // console.log("total", total, "quantity", quantity)
        if (total === quantity) {
            // console.log("total === quantity", "=>", "compose_fifo", compose_fifo2)
            return compose_fifo2;
        } else {
            // console.log("total !== quantity", "=>", "compose_fifo", compose_fifo2)
            return compose_fifo2;
        }
    } else {
        // console.log("OUT PROCESS", compose_fifo2)
        return compose_fifo2
    }
};

// Get Params from URL
export const getUrlParamsLink = () => new Promise((resolve, reject) => {
    let url = window.location.search;
    console.log("URL IS", url)
    const urlParams = new URLSearchParams(url);
    const internal_document_id = urlParams.get('internal_document_id');
    console.log(" getUrlParamsLink internal_document_id --------", internal_document_id)
    return resolve(internal_document_id);
})

// Get Params from URL For fixed asset checklist
export const getUrlParamsLinkForFixedAsset = () => new Promise((resolve, reject) => {
    let url = window.location.search;
    console.log("URL IS", url)
    const urlParams = new URLSearchParams(url);
    const checklist_id = urlParams.get('checklist_id');
    console.log(" getUrlParamsLink checklist_id --------", checklist_id)
    return resolve(checklist_id);
})

// START FOR SETUP DROP DAWN IN NAV BAR
/**
Toggles visibility of given subnav by toggling is-active className to it
and setting aria-hidden attribute on dropdown contents.
@param {HTMLElement} subnav Root element of subnavigation to open.
*/
const toggleSubnav = (subnav, open) => {
    if (open) {
        subnav.classList.add('is-active');
    } else {
        subnav.classList.remove('is-active');
    }

    var toggle = subnav.querySelector('.p-subnav__toggle');

    if (toggle) {
        var dropdown = document.getElementById(toggle.getAttribute('aria-controls'));
        // console.log("dropdawn", dropdown)
        if (dropdown) {
            dropdown.setAttribute('aria-hidden', false ? 'true' : false);
        }
    }
}
/**
Closes all subnavs on the page.
*/
const closeAllSubnavs = () => {
    var subnavs = document.querySelectorAll('.p-subnav');
    for (var i = 0, l = subnavs.length; i < l; i++) {
        toggleSubnav(subnavs[i], false);
    }
}
/**
 Attaches click event listener to subnav toggle.
@param {HTMLElement} subnavToggle Toggle element of subnavigation.
*/
const setupSubnavToggle = (subnavToggle) => {
    subnavToggle.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        var subnav = subnavToggle.parentElement;
        var isActive = subnav.classList.contains('is-active');

        closeAllSubnavs();
        if (!isActive) {
            toggleSubnav(subnav, true);
        }
    });
}
export const setupAllSubNav = () => {
    // Setup all subnav toggles on the page
    var subnavToggles = document.querySelectorAll('.p-subnav__toggle');

    for (var i = 0, l = subnavToggles.length; i < l; i++) {
        setupSubnavToggle(subnavToggles[i]);
    }
    // Close all menus if anything else on the page is clicked
    document.addEventListener('click', function (event) {
        var target = event.target;

        if (target.closest) {
            if (!target.closest('.p-subnav__toggle') && !target.closest('.p-subnav__item')) {
                closeAllSubnavs();
            }
        } else if (target.msMatchesSelector) {
            do {
                if (target.msMatchesSelector('.p-subnav__toggle') || target.msMatchesSelector('.p-subnav__item')) {
                    return;
                }
                target = target.parentElement || target.parentNode;
            } while (target !== null && target.nodeType === 1);

            closeAllSubnavs();
        }
    });
}

// สำหรับตาราง Table have stock
export const sumTotalLineItemHelper = (quantity, per_unit_price, description) => {
    let sumValueInLineItem = 0;
    sumValueInLineItem = quantity * per_unit_price
    if (description !== '') {
        var conventToString = sumValueInLineItem.toString();
        var findDot = conventToString.indexOf(".")
        if (findDot == -1) {
            conventToString = conventToString + ".00"
            return conventToString.replace(/\d(?=(\d{3})+\.)/g, '$&,');
        }
        else {
            conventToString = conventToString.slice(0, findDot + 3)
            var addOneDot = conventToString.length - findDot;
            if (addOneDot === 2) {
                conventToString = conventToString + "0"
                return conventToString.replace(/\d(?=(\d{3})+\.)/g, '$&,');
            }
            else {
                return conventToString.replace(/\d(?=(\d{3})+\.)/g, '$&,');
            }
        }
    } else {
        return '';
    }
}

// สำหรับคำนวณจำนวนสุทธิทั้งหมดภายใน table
export const sumTotalHelper = (list_show) => {
    var sumTotal = 0;
    list_show.map(function (list, index) {
        var sum = 0;
        sum = list.quantity * list.per_unit_price;
        sumTotal = sumTotal + sum;
        // return sumTotal
    })
    var s = sumTotal.toString();
    var n = s.indexOf(".")
    if (n == -1) {
        s = s + ".00"
        return s.replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    else {
        s = s.slice(0, n + 3)
        return s.replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
}

// FOR Phycical count and inventory adjustment
export const sumTotalPhycicalCountAndInventoryAdjustmentHelper = (list_show) => {
    var sumTotal = 0;
    list_show.map(function (list, index) {
        var sum = 0;
        sum = list.unit_count * list.per_unit_price;
        sumTotal = sumTotal + sum;
        // return sumTotal
    })
    var s = sumTotal.toString();
    var n = s.indexOf(".")
    if (n == -1) {
        s = s + ".00"
        return s.replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    else {
        s = s.slice(0, n + 3)
        return s.replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
}

export const identifyEndpoinsHelper = (document_type_id) => {
    let doc_type = document_type_id.toString().substring(0, 3);
    // console.log("doc_type", doc_type)
    // SPARE
    if (doc_type === "101") return "spare-goods-receipt2";
    if (doc_type === "102") return "spare-goods-return";
    if (doc_type === "103") return "spare-goods-receipt-no-po";
    if (doc_type === "111") return "spare-goods-usage";
    if (doc_type === "112") return "spare-goods-issue";
    if (doc_type === "121") return "spare-inventory-transfer";
    if (doc_type === "131") return "spare-goods-receipt-fix";
    if (doc_type === "132") return "spare-goods-fix";
    if (doc_type === "141") return "spare-physical-count";
    if (doc_type === "142") return "spare-inventory-adjustment";
    if (doc_type === "151") return "spare-salvage-return";
    if (doc_type === "152") return "spare-salvage-sold"; // สั่งซ่อม ตามวาระ TODO:
    // PMT
    if (doc_type === "201") return "pmt-work-request"; // แจ้งการเกิดอุบัติเหตุ/เสียหาย
    if (doc_type === "202") return "pmt-work-order"; // สั่งซ่อม
    if (doc_type === "205") return "pmt-fixed-asset"; // สรุปการทำวาระ  WORK_ORDER_PM
    if (doc_type === "204") return "pmt-ss-101"; // สรุปการซ่อมบำรุง
    if (doc_type === "206") return "pmt-equipment-installation"; // ติดตั้ง
    if (doc_type === "207") return "pmt-maitenant-item"; // ดำเนินการซ่อมอะไหล่
    if (doc_type === "208") return "pmt-create-schedule-checklist"; // SELECTOR

    else return "#";
}

export const checkBooleanForEditHelper = (values, decoded_token, fact) => (
    values.status_name_th === DOCUMENT_STATUS.REOPEN || values.status_name_th === DOCUMENT_STATUS.DRAFT)
    && (getUserIDFromEmployeeID(fact[FACTS.USERS], values.created_by_admin_employee_id) === decoded_token.id)

export const checkBooleanForEditInPmtMaintenanceHelper = (values, decoded_token, fact) => (
    values.status_name_th === DOCUMENT_STATUS.ESCALATED || values.status_name_th === DOCUMENT_STATUS.REOPEN || values.status_name_th === DOCUMENT_STATUS.DRAFT)

export const checkBooleanForEditCheckNodeIDHelper = (values, decoded_token, fact) => (
    values.status_name_th === DOCUMENT_STATUS.REOPEN || values.status_name_th === DOCUMENT_STATUS.DRAFT)
    && (getUserIDFromEmployeeID(fact[FACTS.USERS], values.specific.location_node_id) === decoded_token.has_position[0].node_id)

export const checkBooleanForEditCheckNodeIDHelperForWorkOrderPM = (values, decoded_token, fact) => (
    values.status_name_th === DOCUMENT_STATUS.REOPEN || values.status_name_th === DOCUMENT_STATUS.DRAFT)
    && (getUserNodeIDFromEmployeeID(fact[FACTS.USERS], decoded_token.id) === values.node_id
    )

export const filterAlsEquipment = (equipmentData, formData) => {
    let tempEquipmentData = [];
    equipmentData.map((mockup, i) => {
        if (mockup.equipment_group_id === formData.equipment_group_id || formData.equipment_group_id === "") {
            if (mockup.division_id === formData.division_id || formData.division_id === "") {
                if (mockup.district_id === formData.district_id || formData.district_id === "") {
                    if (mockup.node_id === formData.node_id || formData.node_id === "") {
                        tempEquipmentData.push(mockup);
                    }
                }
            }
        }
    })
    return tempEquipmentData;

}

export const changeTheam = () => {
    // Ture คือ version Theam แบบใหม่
    return true;

    // False คือ version Theam แบบเก่า
    // return false;
}

// #####################################
// ################ ALS ################
// #####################################

// Equipment
export const ITEM_STATUS = {
    NEW: 1, // ใหม่
    BROKEN: 2, // เสีย
    FIX: 3, // ซ่อมแล้ว
    USED: 4, // มือสอง
    SALVAGE: 5, // ซาก
    INSTALLED: 6, // ติดตั้งแล้ว
}

// GET /document/ss101/search
export const ALSGetDocumentSS101 = (begin_document_date, end_document_date) => new Promise((resolve, reject) => {
    let page_number = 0;
    let page_size = 100000;
    // let begin_document_date = "2020-07-16";
    // let end_document_date = "2020-07-16";
    const url = `${BASE_URL}/document/ss101/search?page_number=${page_number}&page_size=${page_size}&begin_document_date=${begin_document_date}&end_document_date=${end_document_date}`;
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then(res => {
            resolve(res.data);
        }).catch(function (err) {
            reject(err)
        })
});

export const FilterByAdjustmentBar = (equipment_installation, equipment_group, adjustmentBar) => {
    if (equipment_installation.length !== 0) {
        if (adjustmentBar.equipment_group_id === "ทั้งหมด" || adjustmentBar.equipment_group_id == equipment_group.equipment_group_id) {
            if (adjustmentBar.district_id === "ทั้งหมด" || adjustmentBar.district_id == equipment_installation[0].location_district_id) {
                if (adjustmentBar.node_id === "ทั้งหมด" || adjustmentBar.node_id == equipment_installation[0].location_node_id) {
                    return true;
                }
            }
        }
    }
    return false;
}
export const FilterByAdjustmentBarSS101 = (item, adjustmentBar) => {
        if (adjustmentBar.district_id === "ทั้งหมด" || adjustmentBar.district_id == item.specific.location_district_id) {
            if (adjustmentBar.node_id === "ทั้งหมด" || adjustmentBar.node_id == item.specific.location_node_id) {
                return true;
            }
        }
    
    return false;
}

// GET /document/search?document_type_group_id=205
export const ALSGetDocumentPMTPlan = (begin_document_date, end_document_date) => new Promise((resolve, reject) => {
    let page_number = 0;
    let page_size = 100000;
    let document_type = 205
    const url = `${BASE_URL}/document/search?document_type_group_id=${document_type}&page_number=${page_number}&page_size=${page_size}&begin_document_date=${begin_document_date}&end_document_date=${end_document_date}`;
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then(res => {
            resolve(res.data);
        }).catch(function (err) {
            reject(err)
        })
});

// GET /fact/equipment_group/1/history
export const ALSGetEquipmentGroupMTBF = (begin_document_date, end_document_date, equipment_group_id) => new Promise((resolve, reject) => {
    let page_number = 0;
    let page_size = 100000;
    const url = `${BASE_URL}/fact/equipment_group/${equipment_group_id}/history?&page_number=${page_number}&page_size=${page_size}&begin_document_date=${begin_document_date}&end_document_date=${end_document_date}`;
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then(res => {
            resolve(res.data);
        }).catch(function (err) {
            reject(err)
        })
});