import { combineReducers } from 'redux'
import athentication from './athentication'
import navigator from './navigator'
import mostly from './mostly'
import theme from './theme'
import sidebar from './sidebar'
import audio from './audio'
import myPlaylist from './myPlaylist'

export default combineReducers({
    athentication,
    navigator,
    mostly,
    theme,
    sidebar,
    audio,
    myPlaylist
})