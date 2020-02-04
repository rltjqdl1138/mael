import { combineReducers } from 'redux'
import athentication from './athentication'
import sidebar from './sidebar'
import mostly from './mostly'

export default combineReducers({
    athentication,
    sidebar,
    mostly
})