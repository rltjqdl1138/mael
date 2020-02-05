import { bindActionCreators } from 'redux'


// Load Store for redux
import store from './index'
const {dispatch} = store


// Load redux action modules
import * as athenticationActions from './modules/athentication'
import * as sidebarActions from './modules/sidebar'
import * as mostlyActions from './modules/mostly'
import * as themeActions from './modules/theme'

// bind actions
export const AthenticationActions=bindActionCreators(athenticationActions, dispatch)
export const SidebarActions=bindActionCreators(sidebarActions, dispatch)
export const MostlyActions=bindActionCreators(mostlyActions, dispatch)
export const ThemeActions=bindActionCreators(themeActions, dispatch)