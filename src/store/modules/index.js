import { combineReducers } from 'redux'
import athentication from './athentication'
import sidebar from './sidebar'
import mostly from './mostly'
import theme from './theme'

export default combineReducers({
    athentication,
    sidebar,
    mostly,
    theme
})