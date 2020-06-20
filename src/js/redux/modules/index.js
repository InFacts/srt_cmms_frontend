import { combineReducers } from 'redux';
import * as apis from './api/index.js'

export {default as toolbar} from './toolbar.js'

export {default as track_doc} from './track_doc.js'
export {default as notify} from './notify.js'
export {default as token} from './token.js'

export {default as form_data} from './form_data.js'
export {default as footer} from './footer.js'
export {default as nav_bottom_status} from './nav-bottom.js'

export const api = combineReducers(apis);