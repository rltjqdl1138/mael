import { combineReducers } from 'redux'
import authentication from './authentication'
import navigator from './navigator'
import theme from './theme'
import sidebar from './sidebar'
import audio from './audio'
import myPlaylist from './myPlaylist'
export default combineReducers({
    authentication,
    navigator,
    theme,
    sidebar,
    audio,
    myPlaylist
})