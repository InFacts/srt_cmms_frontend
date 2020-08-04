import {makeActionCreator} from '../generate_action_creator'
import axios from "axios";
import { API_PORT_DATABASE } from '../../../config_port.js';
import { API_URL_DATABASE } from '../../../config_url.js';

// Constants

// Map between FACT enum and URI when query
export const FACTS = {
    STATIONS: "stations",
    DIVISIONS: "divisions",
    NODES: "nodes",
    DISTRICTS: "districts",
    DOCUMENT_TYPE_GROUPS: "document-type-groups",
    DOCUMENT_STATUS: "document-status",
    USERS: "users",
    WAREHOUSES: "warehouses",
    ITEM: "items",
    ITEM_STATUS: "item-status",
    ITEM_GROUP: "item-group",
    EQUIPMENT_GROUP: "equipment-group",
    UNIT_OF_MEASURE_GROUPS: "unit-of-measure-groups",
    UNIT_OF_MEASURE: "unit-of-measures",
    ITEM_TYPE: "item-type",
    WAREHOUSES_TYPE: "warehouse-type",
    APPROVAL_PROCESS_LOOKUP: "approval-process-lookup",
    POSITION:"position",
    LEVEL: "level",
    EQUIPMENT:"equipment",
    EQUIPMENT_GROUP: "equipment-group",
    CHECKLIST_LINE_ITEM_USE_EQUIPMENT: "checklist-line-item-use-equipment",
    CHECKLIST: "checklist",
    EQUIPMENT_STATUS: "equipment-status",
    CHECKLIST_LINE_ITEM: "checklist-line-item",
    CHECKLIST_GROUP:"checklist-group",
    UNIT_MAINTENANCE_LOCATION: "unit-maintenance-location",
    X_CROSS: "x-cross",

    // FOR SS101 LOOK UP
    SS101_RECV_ACCIDENT_FROM: "ss101/recv-accident-from",
    SS101_ACCIDENT_CAUSE: "ss101/accident-cause",
    SS101_SERVICE_METHOD: "ss101/service-method",
    SS101_SYSTEM_TYPE_GROUP: "ss101/system-type-group",
    SS101_SYSTEM_TYPE: "ss101/system-type",
    SS101_HARDWARE_TYPE: "ss101/hardware-type",
    SS101_CAR_TYPE: "ss101/car-type",
    SS101_CASE_TYPE: "ss101/case-type",
    SS101_INTERRUPT: "ss101/interrupt",
    SS101_DOC_BYPASS: "ss101/doc-bypass",

    // For reporting period
    REPORTING_PERIOD: "statistic/reporting-period"
}

// Actions
const FETCH_DATA_REQUEST = "api/fact/FETCH_DATA_REQUEST";
const FETCH_DATA_FAILURE = "api/fact/FETCH_DATA_FAILURE";
const FETCH_DATA_SUCCESS = "api/fact/FETCH_DATA_SUCCESS";



const _FACT_DEFAULT = {
    isFetching: false,
    didInvalidate: false,
    lastUpdated: -1,
    items: []
}

const initialState = {}
Object.keys(FACTS).map((key) => {
    initialState[FACTS[key]] = {..._FACT_DEFAULT};
});

// Reducer
export default function reducer(state = initialState, action){
    switch(action.type){
        case FETCH_DATA_REQUEST:
            return {
                ...state, 
                [action.factName]: {
                    ...state[action.factName],
                    isFetching: true
                }
            };
        case FETCH_DATA_FAILURE:
            return {
                ...state, 
                [action.factName]: {
                    ...state[action.factName],
                    isFetching: false
                }
            };
        case FETCH_DATA_SUCCESS:
            return {
                ...state, 
                [action.factName]: {
                    ...state[action.factName],
                    isFetching: false,
                    lastUpdated: action.receivedAt,
                    items: action.items
                }
            };
        default:
            return state
    }
}




// Action Creators

const requestFact = makeActionCreator(FETCH_DATA_REQUEST, 'factName')
const receiveFailure = makeActionCreator(FETCH_DATA_FAILURE, 'factName')

function receiveFact(factName, data){
    return {
        type: FETCH_DATA_SUCCESS,
        factName,
        receivedAt: Date.now(),
        items: data.results
    }
}

function shouldFetchFact(state, factName){
    const fact = state.api.fact[factName];
    if (fact.lastUpdated < 0){
        return true;
    } else if (fact.isFetching){
        return false;
    } else {
        return fact.didInvalidate;
    }
}

export function fetchFact(factName){
    return (dispatch) => {
        dispatch(requestFact(factName));
        return axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/fact/${factName}?page_size=100000`, 
        { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
            // console.log(res)
            if(res.status === 200){
                dispatch(receiveFact(factName, res.data))
            }else{
                dispatch(receiveFailure(factName))
            }
        })
    }
}

export function fetchFactIfNeeded(factName){
    return (dispatch, getState) => {
        if (shouldFetchFact(getState(), factName)) {
            // Dispatch a thunk from thunk!
            return dispatch(fetchFact(factName));
        } else{
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve();
        }
    }
}