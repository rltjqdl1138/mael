import { bindActionCreators } from 'redux'
import * as athenticationActions from './modules/athentication'
import * as sidebarActions from './modules/sidebar'
import store from './index'
const {dispatch} = store
export const AthenticationActions=bindActionCreators(athenticationActions, dispatch)
export const SidebarActions=bindActionCreators(sidebarActions, dispatch)