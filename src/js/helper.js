
import axios from "axios";
import { API_PORT_DATABASE } from './config_port.js';
import { API_URL_DATABASE } from './config_url.js';
import { fetchFactIfNeeded, FACTS } from './redux/modules/api/fact';
import { isEmptyChildren } from "formik";
import { TOOLBAR_MODE, TOOLBAR_ACTIONS } from './redux/modules/toolbar'
import { FOOTER_ACTIONS } from './redux/modules/footer'

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
    EQUIPMENT_INSTALLATION: 206,
    MAINTENANT_ITEM: 207,

    // These needs to change later!!! since Doc Type Group ID will need to be used in other API's
    WAREHOUSE_MASTER_DATA: 1,
    ITEM_MASTER_DATA: 2,
    EQUIPMENT_MASTER_DATA: 3,

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
export const DOCUMENT_SCHEMA_GET = {
    document_id: -1,
    // document_type_id: -1, // NOT USED since Backend will get SRC and DEST WH and determine type
    internal_document_id: "draft-SCHEMA",
    created_on: "-1", // NOT USED since use DEFAULT NOW() of SQL
    remark: '',
    created_by_admin_id: -1,
    created_by_user_id: -1,
    document_date: "",
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

    has_equipment_item: [],
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

    loss_line_items: [],
    has_equipment_item: [],
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
    return parseInt(escapedString.split('\\')[0]) || null;
}

export const isValidInternalDocumentIDFormat = (internal_document_id) => {
    const internalDocumentIDRegex = /^(GP|GT|GR|GU|GI|IT|GX|GF|PC|IA|SR|SD|WR|WO|WP|SS|MI|EI)-[A-Z]{3}-\d{4}\/\d{4}$/g;
    return internalDocumentIDRegex.test(internal_document_id);
}
export const isValidInternalDocumentIDDraftFormat = (internal_document_id) => {
    const draftInternalDocumentIDRegex = /^draft-\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b$/g;
    return draftInternalDocumentIDRegex.test(internal_document_id);
}


export function isICD(document_type_group_id) {
    return ICD_DOCUMENT_TYPE_GROUP_IDS.includes(document_type_group_id);
}

export const packDataFromValues = (fact, values, document_type_id) => {
    if (document_type_id === DOCUMENT_TYPE_ID.WAREHOUSE_MASTER_DATA) {
        return {
            warehouse_id: values.warehouse_id,
            name: values.name,
            abbreviation: values.abbreviation,
            location: values.location,
            warehouse_type_id: values.warehouse_type_id,
            node_id: 1,
            active: values.active === "1" ? true : false,
            use_central: values.use_central === "1" ? true : false
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
            uom_group_id: values.uom_group_id,
            active: values.active === "1" ? true : false,
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
    }
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
                            item_status_id: line_item.item_status_id,
                            count_datetime: `${values.document_date} 00:00:00`
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
                            item_status_id: line_item.item_status_id,
                            adjustment_datetime: `${values.document_date} 00:00:00`
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
        return {
            document: document_part,
            specific: work_request_part,
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
        work_order_part.accident_on = work_order_part.accident_on + ":00";

        work_order_part.has_equipment_item = removeEmptyLineItems(work_order_part.has_equipment_item);

        work_order_part.has_equipment_item.map((has_equipment_item, index) => {
            work_order_part.has_equipment_item[index].equipment_item_id = has_equipment_item.equipment_item_id
            work_order_part.has_equipment_item[index].equipment_status_id = has_equipment_item.equipment_status_id
            work_order_part.has_equipment_item[index].remark = has_equipment_item.remark
            work_order_part.has_equipment_item[index].work_order_document_id = has_equipment_item.work_order_document_id
            delete work_order_part.has_equipment_item[index].internal_item_id
            delete work_order_part.has_equipment_item[index].description
        })

        console.log("document_part", document_part,"work_order_part", work_order_part)
        return {
            document: document_part,
            specific: work_order_part,
        }
    } else if (document_type_id === DOCUMENT_TYPE_ID.SS101) {
        document_part["document_type_id"] = DOCUMENT_TYPE_NOTGROUP_ID.SS101;
        let ss101_part = {}
        Object.keys(SS101_SCHEMA).map((key) => {
            if (Number.isInteger(SS101_SCHEMA[key]) && key !== "document_id") { // Check if the number in the schema is a number
                // Hack 'document_id' to not be null, so it would work in mutateData
                // TODO needs to change ordering of the packDataFromValues!! to not use the mutate function
                ss101_part[key] = getNumberFromEscapedString(values[key]);
            } else {
                ss101_part[key] = values[key]
            }
        })

        ss101_part.loss_line_items = removeEmptyLineItems(ss101_part.loss_line_items);

        document_part = {
            ...document_part,
            refer_to_document_id: values.refer_to_document_id,
            document_date: values.document_date + 'T00:00:00+00:00'
        };

        ss101_part = {
            ...ss101_part,
            service_method_id: parseInt(values.service_method_id),
            car_type_id: parseInt(values.car_type_id) ,
            cargo_id: values.cargo_id,
            interrupt_id: parseInt(values.interrupt_id),
            accident_on: values.accident_on + ':00+00:00',
            arrived_on: values.arrived_on + ':00+00:00',
            departed_on: values.departed_on + ':00+00:00',
            finished_on: values.finished_on + ':00+00:00',
            request_on: values.request_on + ':00+00:00',
            auditor_position_id : values.auditor_position_id ? parseInt(values.auditor_position_id) : null,
            fixer_position_id: values.fixer_position_id ? parseInt(values.fixer_position_id) : null,
            member_1_position_id: values.member_1_position_id ? parseInt(values.member_1_position_id) : null,
            member_2_position_id: values.member_2_position_id ? parseInt(values.member_2_position_id) : null,
            member_3_position_id: values.member_3_position_id ? parseInt(values.member_3_position_id) : null,
            // has_equipment_item: values.has_equipment_item.map,
        };
        ss101_part.has_equipment_item = removeEmptyLineItems(ss101_part.has_equipment_item);

        ss101_part.has_equipment_item.map((has_equipment_item, index) => {
            ss101_part.has_equipment_item[index].equipment_item_id = has_equipment_item.equipment_item_id
            ss101_part.has_equipment_item[index].equipment_status_id = has_equipment_item.equipment_status_id
            ss101_part.has_equipment_item[index].remark = has_equipment_item.remark
            ss101_part.has_equipment_item[index].ss101_document_id = has_equipment_item.ss101_document_id
            delete ss101_part.has_equipment_item[index].internal_item_id
            delete ss101_part.has_equipment_item[index].description
        })

        ss101_part.loss_line_items.map((loss_line_items) => {
            loss_line_items.uom_code = parseInt(loss_line_items.uom_code)
        })
        console.log("document_part", document_part,"ss101_part", ss101_part)
        return {
            document: document_part,
            specific: ss101_part,
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
                    line_number: index+1,
                    uom_id: line_item.uom_id,
                    quantity_damaged: line_item.quantity_damaged,
                    quantity_used: line_item.quantity_used,
                    quantity_salvage: line_item.quantity_salvage
                });
            }
        })
        var icd_part = {
            document_id: values.document_id,
            line_items: line_items_part,
        }
        return {
            document: document_part,
            specific: icd_part,
        }
    }
}



function removeEmptyLineItems(line_items) {
    return line_items.filter(line_item => line_item.description != '');
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

// POST 
export const createMasterData = (data, document_type_group_id) => new Promise((resolve, reject) => {
    if (document_type_group_id === DOCUMENT_TYPE_ID.WAREHOUSE_MASTER_DATA) {
        var url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/fact/warehouses`;
    }
    if (document_type_group_id === DOCUMENT_TYPE_ID.ITEM_MASTER_DATA) {
        var url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/fact/items`;
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
        var url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/fact/warehouses/${data.warehouse_id}`;
    }
    if (document_type_group_id === DOCUMENT_TYPE_ID.ITEM_MASTER_DATA) {
        var url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/fact/items/${data.item_id}`;
    }
    axios.put(url, data, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((res) => {
            console.log(" I am successful in creating master data ", res)
            resolve();
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
export const editDocument = (document_id, document_type_group_id, data, files) => new Promise((resolve, reject) => {
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/${document_id}/${document_type_group_id}`;
    console.log("files", files)
    console.log("data>>", data)
    axios.put(url, data, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((res) => {
            console.log(" I am successful in updating contents of document_id ", document_id)
            if (res.status === 200) {
                console.log("wow i putted successfully status 200 ", res.data)
                if (files !== undefined){
                    if (files.length !== 0) {
                        uploadAttachmentDocumentData(document_id, files)
                            .then(() => {
                                return resolve(res.data);
                            })
                            .catch((err) => {
                                return reject(err);
                            });
                    }
                    else {return resolve(res.data);}
                }
                else {return resolve(res.data); }
            } else {
                console.log(" i think i have some problems putting ", res.data)
                reject(res);
            }
        })
        .catch((err) => {
            console.log("err", err)
            reject(err)
        });
});


const fillObjectOfName = (object, fieldName, value) => {
    for (let key1 in object) {
        if (typeof object[key1] === "object" && object[key1] !== null) {
            for (let key2 in object[key1]) {
                if (typeof object[key1][key2] === "object" && object[key1] !== null) {
                    for (let key3 in object[key1][key2]) {
                        if (typeof object[key1][key2][key3] === "object" && object[key1] !== null) {
                            // recursive line items
                            let line_item = object[key1][key2][key3];
                            if (typeof line_item === "object" && object[key1] !== null) {
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
                    // console.log("I am setting ", key2, " if it is ", fieldName, " as ", value)
                    if (key2 === fieldName) {
                        console.log("i think it is!! i am setting now ", object)
                        object[key1][key2] = value;
                        console.log("i think it is!! i am setting now ", object)
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
    fillObjectOfName(mutated_object, 'ss101_document_id', document_id); 
    fillObjectOfName(mutated_object, 'work_order_document_id', document_id); 
    return mutated_object
}

// Save a Document Draft (without getting beginning approval flow)
//   1. POST /document/new/0: createDocumentEmptyRow()
//   2. PUT /document/{document_id}/{document_type_group_id}: editDocument(document_id, document_type_group_id, data)
export const saveDocument = (document_type_group_id, data, files) => new Promise((resolve, reject) => {
    createDocumentEmptyRow()
        .then(({ document_id, internal_document_id, status }) => { // Get the Document_ID
            editDocument(document_id, document_type_group_id, mutateDataFillDocumentID(data, document_id), files)
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
        .then(() => { // Get the Document_ID
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
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/approval/${document_id}/new`;
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
        tempFiles.map((file) => { formData.append('file', file); })
        let url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/attachment/${document_id}`
        axios.post(url, formData,
            { headers: { "x-access-token": localStorage.getItem('token_auth') } })
            .then((res) => {
                resolve(res);
            }).catch(function (err) {
                reject(err);
            })
    }
    resolve("Don't have new files");
});

// Download Attachment
// important -> responseType: 'blob'
export const downloadAttachmentDocumentData = (document_id, attachment_id) => new Promise((resolve, reject) => {
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/attachment/${document_id}/download/${attachment_id}`;
    axios.get(url, { responseType: 'blob', headers: { "x-access-token": localStorage.getItem('token_auth') } })
        // 1. Convert the data into 'blob'    
        .then((response) => {
            // 2. Create blob link to download
            console.log("response", response)
            let url = window.URL.createObjectURL(new Blob([response.data]));
            console.log("url", url)
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `sample.${(response.data.type).split("/")[1]}`);
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

// Get Goods Onhand After Select Warehoues ID and No part ID
export const fetchGoodsOnhandDataForItemmasterData = (item_id) => new Promise((resolve, reject) => {
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/statistic/goods-onhand/plus?item_id=${item_id}`;
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
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/admin/position-permission?${position_id ? `position_id=${position_id}` : null}`;
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((res) => {
            // console.log("res", res)
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
})


const responseToFormState = (fact, data, document_type_group_id) => {
    if (isICD(document_type_group_id)) {
        if (document_type_group_id !== DOCUMENT_TYPE_ID.PHYSICAL_COUNT && document_type_group_id !== DOCUMENT_TYPE_ID.INVENTORY_ADJUSTMENT) {
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
            var created_on = new Date(data.created_on);
            created_on.setHours(created_on.getHours() + 7)
            let form_state = {
                document_id: data.document_id,
                internal_document_id: data.internal_document_id,
                document_date: data.document_date.split("T")[0],
                created_by_user_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], data.created_by_user_id) || '',
                created_by_admin_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], data.created_by_admin_id) || '',
                created_on: created_on.toISOString().split(".")[0],
                line_items: data.line_items,
                remark: data.remark,
                // status_name_th: "",
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
                    internal_document_id: data.document.internal_document_id,
                    created_by_user_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], data.document.created_by_user_id) || '',
                    created_by_admin_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], data.document.created_by_admin_id) || '',
                    created_on: created_on.toISOString().split(".")[0],
                    line_items: data.specific.line_items,
                    src_warehouse_id: data.specific.warehouse_id,
                    remark: data.document.remark,
                    // status_name_th: '',
                    // refer_to_document_name: data.specific.refer_to_document_name,
                    document_date: data.document.document_date.slice(0, 10)
                }
            }
            if (document_type_group_id === DOCUMENT_TYPE_ID.INVENTORY_ADJUSTMENT) {
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
                    internal_document_id: data.document.internal_document_id,
                    created_by_user_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], data.document.created_by_user_id) || '',
                    created_by_admin_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], data.document.created_by_admin_id) || '',
                    created_on: created_on.toISOString().split(".")[0],
                    line_items: data.specific.line_items,
                    src_warehouse_id: data.specific.warehouse_id,
                    remark: data.document.remark,
                    // status_name_th: '',
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
        console.log("this is document_part 123  ", document_part)
        console.log("this is work_order_part ", work_order_part)
        return { ...transformDocumentResponseToFormState(document_part, fact), ...transformWorkOrderResponseToFormState(work_order_part) }
    } else if (document_type_group_id === DOCUMENT_TYPE_ID.SS101) {
        // Get Subset of Data from both DOCUMENT_SCHEMA_GET and SS101_SCHEMA_GET 
        let document_part = Object.fromEntries(
            Object.entries(data.document)
                .filter(([key]) => Object.keys(DOCUMENT_SCHEMA_GET).includes(key))
        )
        let ss101_part = Object.fromEntries(
            Object.entries(data.specific)
                .filter(([key]) => Object.keys(SS101_SCHEMA).includes(key))
        )
        console.log("this is document_part 123  ", document_part)
        console.log("this is ss101_part ", ss101_part)
        return { ...transformDocumentResponseToFormState(document_part, fact, document_type_group_id), ...transformSS101ResponseToFormState(ss101_part) }
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
        var created_on = new Date(data.document.created_on);
        created_on.setHours(created_on.getHours() + 7);
        return {
            document_id: data.document.document_id,
            internal_document_id: data.document.internal_document_id,
            created_by_user_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], data.document.created_by_user_id) || '',
            created_by_admin_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], data.document.created_by_admin_id) || '',
            created_on: created_on.toISOString().split(".")[0],
            line_items: data.specific.line_items,
            src_warehouse_id: data.document.warehouse_id,
            remark: data.document.remark,
            refer_to_document_internal_id: data.document.refer_to_document_internal_id,
            refer_to_document_id: data.document.refer_to_document_id,
            document_date: data.document.document_date.slice(0, 10)
        }
    } else if (document_type_group_id === DOCUMENT_TYPE_ID.EQUIPMENT_INSTALLATION) {
        var created_on = new Date(data.document.created_on);
        created_on.setHours(created_on.getHours() + 7);
        return {
            document_id: data.document.document_id,
            internal_document_id: data.document.internal_document_id,
            created_by_user_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], data.document.created_by_user_id) || '',
            created_by_admin_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], data.document.created_by_admin_id) || '',
            created_on: created_on.toISOString().split(".")[0],
            remark: data.document.remark,
            document_date: data.document.document_date.slice(0, 10),
            announce_use_on: data.specific.announce_use_on.slice(0, 10),
            location_description: data.specific.location_description,
            location_district_id: data.specific.location_district_id,
            location_node_id: data.specific.location_node_id,
            location_station_id: data.specific.location_station_id,
            installed_on: data.specific.installed_on.slice(0, 10),
        }
    }

}

function transformDocumentResponseToFormState(document_part, fact, document_type_group_id) {
    var created_on = new Date(document_part.created_on);
    created_on.setHours(created_on.getHours() + 7)
    if (document_type_group_id === DOCUMENT_TYPE_ID.SS101) {
        return {
            document_id: document_part.document_id,
        internal_document_id: document_part.internal_document_id,
        document_date: document_part.document_date.split("T")[0],
        created_by_user_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], document_part.created_by_user_id) || '',
        created_by_admin_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], document_part.created_by_admin_id) || '',
        // created_on: document_part.created_on.split(".")[0],
        created_on: created_on.toISOString().split(".")[0],
        refer_to_document_id: document_part.refer_to_document_id
        }
    } else {
    return {
        document_id: document_part.document_id,
        internal_document_id: document_part.internal_document_id,
        document_date: document_part.document_date.split("T")[0],
        created_by_user_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], document_part.created_by_user_id) || '',
        created_by_admin_employee_id: getEmployeeIDFromUserID(fact[FACTS.USERS], document_part.created_by_admin_id) || '',
        // created_on: document_part.created_on.split(".")[0],
        created_on: created_on.toISOString().split(".")[0],
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
    return {
        ...work_order_part,
        accident_on: work_order_part.accident_on.slice(0, 16),
        location_district_id: returnEmptyStringIfNull(work_order_part.location_district_id),
        location_node_id: returnEmptyStringIfNull(work_order_part.location_node_id),
        location_station_id: returnEmptyStringIfNull(work_order_part.location_station_id),

         has_equipment_item: returnFullArrayHasEquipmentItemNull(work_order_part.has_equipment_item),
    }
}
function transformSS101ResponseToFormState(ss101_part) {
    return {
        ...ss101_part,
        ...transformWorkRequestResponseToFormState(ss101_part),

        // Bottom Content
        car_type_id: returnEmptyStringIfNull(ss101_part.car_type_id),
        departed_on: ss101_part.departed_on.split(".")[0],
        arrived_on: ss101_part.arrived_on.split(".")[0],
        request_on: ss101_part.request_on.split(".")[0],
        finished_on: ss101_part.finished_on.split(".")[0],
        system_type_group_id: returnEmptyStringIfNull(ss101_part.system_type_group_id),
        sub_maintenance_type_id: returnEmptyStringIfNull(ss101_part.sub_maintenance_type_id),
        hardware_type_id: returnEmptyStringIfNull(ss101_part.hardware_type_id),

        cargo_id: returnEmptyStringIfNull(ss101_part.cargo_id),
        service_method_id: returnEmptyStringIfNull(ss101_part.service_method_id),
        interrupt_id: returnEmptyStringIfNull(ss101_part.interrupt_id),

        // Bottom Content ผู้เกี่ยวข้อง
        auditor_position_id: returnEmptyStringIfNull(ss101_part.auditor_position_id),
        fixer_position_id: returnEmptyStringIfNull(ss101_part.fixer_position_id),
        member_1_position_id: returnEmptyStringIfNull(ss101_part.member_1_position_id),
        member_2_position_id: returnEmptyStringIfNull(ss101_part.member_2_position_id),
        member_3_position_id: returnEmptyStringIfNull(ss101_part.member_3_position_id),

        has_equipment_item: returnFullArrayHasEquipmentItemNull(ss101_part.has_equipment_item),
        loss_line_items: returnFullArrayLossLineItemNull(ss101_part.loss_line_items)
    }
}

function returnFullArrayHasEquipmentItemNull (has_equipment_item) {
    let initialEquipmentLineItem = {
        internal_item_id: '',
        description:'',
        ss101_document_id: '',
        equipment_item_id: '',
        equipment_status_id: '',
        remark: '',
    }
    for (var i = has_equipment_item.length; i <= 9; i++) {
        has_equipment_item.push({
            initialEquipmentLineItem,
        });
    }
    return has_equipment_item;
}

function  returnFullArrayLossLineItemNull (loss_line_items) {
    let initialLossLineItem = {
        document_id: '', // maybe not needed
        line_number: '',
        description: '',   // รายการ
        quantity: '',
        uom_code: '',
        price: '',
        remark: '',
    }

        for (var i = loss_line_items.length; i <= 9; i++) {
            loss_line_items.push({
                initialLossLineItem,
                line_number: i
            });
        }
        return loss_line_items;
}

// Validation 
export const validateInternalDocumentIDFieldHelper = (checkBooleanForEdit, document_type_group_id, toolbar, footer, fact, values, setValues, setFieldValue, validateField, internal_document_id) => new Promise(resolve => {
    // Internal Document ID
    //  {DocumentTypeGroupAbbreviation}-{WH Abbreviation}-{Year}-{Auto Increment ID}
    //  ie. GR-PYO-2563/0001
    if (checkBooleanForEdit === true) {
        return resolve();
    }
    console.log("I am validating internal document id ", internal_document_id)
    if (!internal_document_id) {
        console.log("I dont have any internal doc id")
        return resolve('Required');
    } else if (!isValidInternalDocumentIDFormat(internal_document_id) && !isValidInternalDocumentIDDraftFormat(internal_document_id)) {
        console.log(">>>>>")
        return resolve('Invalid Document ID Format Be sure to use the format ie. GR-PYO-2563/0001')
    }
    console.log(">>>>NUK")
    // Checking from Database if Internal Document ID Exists
    let error;
    getDocumentbyInternalDocumentID(internal_document_id)
        .then((data) => {
            console.log(" i got data", data);
            if (isICD(document_type_group_id)) { // If document type group ID is ICD
                if (document_type_group_id !== DOCUMENT_TYPE_ID.PHYSICAL_COUNT && document_type_group_id !== DOCUMENT_TYPE_ID.INVENTORY_ADJUSTMENT) {
                    if (data.internal_document_id === internal_document_id) { // If input document ID exists
                        if ((toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.NONE || toolbar.mode === TOOLBAR_MODE.NONE_HOME)
                            && !toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]) { //If Mode Search, needs to set value 
                            console.log("validateInternalDocumentIDField:: I got document ID ", data.document_id)
                            setValues({ ...values, ...responseToFormState(fact, data, document_type_group_id) }, false); //Setvalues and don't validate

                            if (document_type_group_id === DOCUMENT_TYPE_ID.GOODS_USAGE || document_type_group_id === DOCUMENT_TYPE_ID.GOODS_FIX || document_type_group_id === DOCUMENT_TYPE_ID.GOODS_ISSUE || document_type_group_id === DOCUMENT_TYPE_ID.SALVAGE_RETURN || document_type_group_id === DOCUMENT_TYPE_ID.SALVAGE_SOLD) {
                                validateField("src_warehouse_id");
                                validateField("created_by_user_employee_id");
                                validateField("created_by_admin_employee_id");
                                return resolve(null);
                            }
                            if (document_type_group_id === DOCUMENT_TYPE_ID.INVENTORY_TRANSFER) {
                                validateField("src_warehouse_id");
                                validateField("dest_warehouse_id");
                                validateField("created_by_user_employee_id");
                                validateField("created_by_admin_employee_id");
                                return resolve(null);
                            }
                            else {
                                validateField("dest_warehouse_id");
                                validateField("created_by_user_employee_id");
                                validateField("created_by_admin_employee_id");
                                return resolve(null);
                            }

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
                } else {
                    if (data.document.internal_document_id === internal_document_id) { // If input document ID exists
                        if ((toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.NONE || toolbar.mode === TOOLBAR_MODE.NONE_HOME)
                            && !toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]) { //If Mode Search, needs to set value 
                            console.log("validateInternalDocumentIDField:: I got document ID ", data.document.document_id)
                            setValues({ ...values, ...responseToFormState(fact, data, document_type_group_id) }, false); //Setvalues and don't validate
                            validateField("src_warehouse_id");
                            validateField("created_by_user_employee_id");
                            validateField("created_by_admin_employee_id");
                            return resolve(null);

                        } else { //If Mode add, need to error duplicate Document ID
                            // setFieldValue('document_id', '', false); 
                            // if (values.document_id || footer.requiresHandleClick[FOOTER_ACTIONS.SEND] || footer.requiresHandleClick[FOOTER_ACTIONS.SAVE]) { // I think this is when I'm in Mode Add, doing the Save action but I cann't approve
                            if (footer.requiresHandleClick[FOOTER_ACTIONS.SEND] || footer.requiresHandleClick[FOOTER_ACTIONS.SAVE]) { // I think this is when I'm in Mode Add, doing the Save action but I cann't approve 
                                //TODO - need to check whether it needs to be approved - Donut
                                console.log("i am in mode add, saved and wanting to approve")
                                error = '';
                            } else {
                                console.log("I AM DUPLICATE")
                                error = 'Duplicate Document ID';
                            }

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
                }
            } else if (document_type_group_id === DOCUMENT_TYPE_ID.WORK_REQUEST) {
                console.log("i know i am in workrequest!!")

                if (data.document.internal_document_id === internal_document_id) { // If input document ID exists
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
            } else if (document_type_group_id === DOCUMENT_TYPE_ID.WORK_ORDER) {
                console.log("i know i am in workorder!!")

                if (data.document.internal_document_id === internal_document_id) { // If input document ID exists
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
                    validateField("responsible_by");
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
            }
            else {
                console.log("IDK WHERE I AM", document_type_group_id)
            }

        })
        .catch((err) => { // 404 NOT FOUND  If input Document ID doesn't exists
            console.log("I think I have 404 not found in doc id.")
            setFieldValue('document_id', '', false);

            if (toolbar.mode === TOOLBAR_MODE.SEARCH) { //If Mode Search, invalid Document ID
                error = 'Document ID not Found in System';
            } else {//If mode add, ok
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

export const validateUserIDField = (fieldName, fact, setFieldValue, user_id) => {
    console.log("I am validating user id")
    let users = fact[FACTS.USERS].items;
    let user = users.find(user => user.user_id === user_id); // Returns undefined if not found
    if (user) {
        setFieldValue(fieldName, `${user.employee_id}\\${user.firstname_th} ${user.lastname_th}`, false);
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
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/approval/${document_id}/latest/step`;
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
            reject(err)
        })
});

// Cancel Approval Process ID
// POST /approval/{document_id}/{approval_process_id}/cancel
export const cancelApproval = (document_id, approval_process_id) => new Promise((resolve, reject) => {
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/approval/${document_id}/${approval_process_id}/cancel`;
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
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/approval/${document_id}/${obj_body.approval_process_id}/approve`;
    axios.post(url, obj_body, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then(res => {
            console.log(" I am successful in creating approval to document with document_id ", res.data);
            resolve(res);
        }).catch(function (err) {
            reject(err);
        })
});


// Validate Token: 200 if token is valid and not expired, 400 otherwise. + requestBody {'refresh_token': true} 201 and token is refreshed [if not expired]
// POST /auth/token-validation
export const validateToken = (willRefreshToken) => new Promise((resolve, reject) => {
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/auth/token-validation`;
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
    var quantityLeft = quantity;
    var lotsFrom = [];
    fifo.forEach((currentLot) => {
        if (quantityLeft >= currentLot.quantity) { // if Quantity Left >= Current Lot Quantity, shift and push
            lotsFrom.push(fifoCopy.shift());
            quantityLeft -= currentLot.quantity;
        } else { // if Quantity Left < Current Lot Quantity, shift and push only required # of lot
            lotsFrom.push({ ...fifoCopy.shift(), quantity: quantityLeft });
            quantityLeft = 0;
        }
    })
    // Artificial Lots if QTY leftover
    if (quantityLeft > 0) {
        lotsFrom.push({ quantity: quantityLeft, per_unit_price: weightedAverage(lotsFrom) });
    }

    return lotsFrom;
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
            return conventToString;
        }
        else {
            conventToString = conventToString.slice(0, findDot + 3)
            var addOneDot = conventToString.length - findDot;
            if (addOneDot === 2) {
                return conventToString + "0";
            }
            else {
                return conventToString;
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
        return s;
    }
    else {
        s = s.slice(0, n + 3)
        return s;
    }
}

export const identifyEndpoinsHelper = (document_type_id) => {
    let doc_type = document_type_id.toString().substring(0, 3);
    // console.log("doc_type", doc_type)
    // SPARE
    if (doc_type === "101") return "goods-receipt2";
    if (doc_type === "102") return "goods-return";
    if (doc_type === "103") return "goods-receipt-no-po";
    if (doc_type === "111") return "goods-usage";
    if (doc_type === "112") return "goods-issue";
    if (doc_type === "121") return "inventory-transfer";
    if (doc_type === "131") return "goods-receipt-fix";
    if (doc_type === "132") return "goods-fix";
    if (doc_type === "141") return "physical-count";
    if (doc_type === "142") return "inventory-adjustment";
    if (doc_type === "151") return "salvage-return";
    // PMT
    if (doc_type === "201") return "pmt-work-request"; // แจ้งการเกิดอุบัติเหตุ/เสียหาย
    if (doc_type === "202") return "pmt-work-order"; // สั่งซ่อม
    // if (doc_type === "203") return "salvage-sold"; // สั่งซ่อม ตามวาระ TODO:
    if (doc_type === "204") return "ss-101"; // สรุปการซ่อมบำรุง
    if (doc_type === "205") return "PmtFixedAsset"; // สรุปการทำวาระ
    if (doc_type === "206") return "pmt-equipment-installation"; // ติดตั้ง
    if (doc_type === "207") return "maitenant-item"; // ดำเนินการซ่อมอะไหล่

    else return "#";
}

export const checkBooleanForEditHelper = (values, decoded_token, fact) => (values.status_name_th === DOCUMENT_STATUS.REOPEN || values.status_name_th === DOCUMENT_STATUS.DRAFT)
    && (getUserIDFromEmployeeID(fact[FACTS.USERS], values.created_by_admin_employee_id) === decoded_token.id)


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