import {makeActionCreator} from './generate_action_creator'

// Constants

// Actions
const CHANGE_FORM = "form_data/CHANGE_FORM";

// Reducer
export default function reducer(state = {}, action){
    switch(action.type){
        case CHANGE_FORM:
            // ES6 computed property syntax https://redux.js.org/advanced/async-actions
            return {...state, [action.field]: action.value};
        default:
            return state
    }
}

// Action Creators
export function handleChange(field, value){
    return {
        type: CHANGE_FORM,
        field,
        value
    }
}