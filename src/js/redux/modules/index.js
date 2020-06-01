//export {default as ThingA} from './ThingA'
//export {default as ThingB} from './ThingB'
//export {default as ThingC} from './ThingC'

import { combineReducers } from 'redux';
import * as apis from './api/index.js'


export {default as toolbar} from './toolbar.js'

export {default as item_master} from './item_master.js'
export {default as track_doc} from './track_doc.js'
export {default as notify} from './notify.js'
export {default as goods_receipt} from './goods_receipt.js'

export {default as form_data} from './form_data.js'

export const api = combineReducers(apis);