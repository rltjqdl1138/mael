import { bindActionCreators } from 'redux'


// Load Store for redux
import store from './index'
const {dispatch} = store


// Load redux action modules
import * as athenticationActions from './modules/athentication'
import * as navigatorActions from './modules/navigator'
import * as mostlyActions from './modules/mostly'
import * as themeActions from './modules/theme'
import * as sidebarActions from './modules/sidebar'
import * as audioActions from './modules/audio'
import * as myPlaylistActions from './modules/myPlaylist'

// bind actions
export const AthenticationActions=bindActionCreators(athenticationActions, dispatch)
export const NavigatorActions=bindActionCreators(navigatorActions, dispatch)
export const MostlyActions=bindActionCreators(mostlyActions, dispatch)
export const ThemeActions=bindActionCreators(themeActions, dispatch)
export const SidebarActions=bindActionCreators(sidebarActions, dispatch)
export const AudioActions=bindActionCreators(audioActions, dispatch)
export const MyPlaylistActions=bindActionCreators(myPlaylistActions, dispatch)