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
    USERS: "users"
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


export function fetchFact(factName){
    return (dispatch) => {
        dispatch(requestFact(factName));
        return axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/fact/${factName}`, 
        { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
            console.log(res)
            if(res.status === 200){
                dispatch(receiveFact(factName, res.data))
            }else{
                dispatch(receiveFailure(factName))
            }
        })
    }
}