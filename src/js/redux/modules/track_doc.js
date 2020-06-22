import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

const initialState = {

    find_document_list: [
        {
            "id": 1,
            "type": "เอกสารของฉัน"
        },
        {
            "id": 2,
            "type": "เอกสารทั้งหมด"
        },
    ],

    // Mode Search
    no_track_document: "", //Document ID
    find_document: "2", // my docs/all docs
    type_document: "", //document type
    date_start: "",
    date_end: "",
    status_document: "",
    district: "",
    zone: "",
    station: "",
    divisions: "",
    track_document_show: [],
}


export default function reducer(state = initialState, action) {
    switch (action.type) {
        // Mode Search
        case "ON CHANGE NO TRACKDOCUMENT":
            return {
                ...state,
                no_track_document: action.value
            }

        case "ON CHANGE FIND TRACKDOCUMENT":
            return {
                ...state,
                find_document: action.value
            }

        case "ON CHANGE TYPE TRACKDOCUMENT":
            return {
                ...state,
                type_document: action.value
            }

        case "ON CHANGE DATE START TRACKDOCUMENT":
            return {
                ...state,
                date_start: action.value
            }

        case "ON CHANGE DATE END TRACKDOCUMENT":
            return {
                ...state,
                date_end: action.value
            }

        case "ON CHANGE STATUS TRACKDOCUMENT":
            return {
                ...state,
                status_document: action.value
            }

        case "ON CHANGE DISTRICT TRACKDOCUMENT":
            return {
                ...state,
                district: action.value
            }

        case "ON CHANGE ZONE TRACKDOCUMENT":
            return {
                ...state,
                zone: action.value
            }

        case "ON CHANGE DIVISIONS TRACKDOCUMENT":
            return {
                ...state,
                divisions: action.value
            }

        case "ON CHANGE STATION TRACKDOCUMENT":
            return {
                ...state,
                station: action.value
            }
        case "SEARCH SUCCESS":
            return {
                ...state,
                track_document_show: action.items
            }

        default:
            return state
    }
}

// Action creators
function receiveDocuments(data) {
    return {
        type: "SEARCH SUCCESS",
        items: data.results
    }
}

function getQueryString(state) {
    let queryString = "?";
    let mapStateToQuery = {
        no_track_document: "internal_document_id",
        // find_document: "", 
        type_document: "document_type_id",
        date_start: "before_create_on", 
        date_end: "after_created_on",
        status_document: "document_status_id",
        // district: "", 
        // zone: "",
        // station: ""
    }
    Object.keys(mapStateToQuery).map((key) => {

        if (state[key]) {
            if (queryString !== "?") {
                queryString += '&'
            }
            queryString += `${mapStateToQuery[key]}=${state[key]}`;
        }
    });
    console.log("QRUERYSAD", queryString)
    return queryString
}

export function fetchDocuments() {
    return (dispatch, getState) => {

        // TODO: dispatch fetching
        let queryString = getQueryString(getState().track_doc);
        let url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/search${queryString}`;
        console.log("url", url)
        return axios.get(url,
            { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
                console.log(res)
                if (res.status === 200) {
                    dispatch(receiveDocuments(res.data))
                } else {
                    // dispatch(receiveFailure(factName))
                }
            })
    }
}




export const onChangeNoTrackDocument = (e) => {
    return {
        type: "ON CHANGE NO TRACKDOCUMENT",
        value: e.target.value
    }
}

export const onChangeFindTrackDocument = (e) => {
    return {
        type: "ON CHANGE FIND TRACKDOCUMENT",
        value: e.target.value
    }
}

export const onChangeTypeTrackDocument = (e) => {
    return {
        type: "ON CHANGE TYPE TRACKDOCUMENT",
        value: e.target.value
    }
}

export const onChangeDateStartTrackDocument = (e) => {
    return {
        type: "ON CHANGE DATE START TRACKDOCUMENT",
        value: e.target.value
    }
}

export const onChangeDateEndTrackDocument = (e) => {
    return {
        type: "ON CHANGE DATE END TRACKDOCUMENT",
        value: e.target.value
    }
}

export const onChangeStatusTrackDocument = (e) => {
    return {
        type: "ON CHANGE STATUS TRACKDOCUMENT",
        value: e.target.value
    }
}

export const onChangeDistrictTrackDocument = (e) => {
    return {
        type: "ON CHANGE DISTRICT TRACKDOCUMENT",
        value: e.target.value
    }
}

export const onChangeZoneTrackDocument = (e) => {
    return {
        type: "ON CHANGE ZONE TRACKDOCUMENT",
        value: e.target.value
    }
}

export const onChangeDivisionsTrackDocument = (e) => {
    return {
        type: "ON CHANGE DIVISIONS TRACKDOCUMENT",
        value: e.target.value
    }
}

export const onChangeStationTrackDocument = (e) => {
    return {
        type: "ON CHANGE STATION TRACKDOCUMENT",
        value: e.target.value
    }
}