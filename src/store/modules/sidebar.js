import { createAction, handleActions } from 'redux-actions'

const OPEN = 'sidebar/OPEN'
const CLOSE = 'sidebar/CLOSE'
const REGISTER = 'sidebar/REGISTER'

export const open = createAction(OPEN)
export const close = createAction(CLOSE)
export const register = createAction(REGISTER)

const initialState = {
    isSidebarOpen: false,
    handler: {}
}

export default handleActions({
    [OPEN]: (state) => ({ ...state, isSidebarOpen: true}) ,
    [CLOSE]: (state) => ({ ...state, isSidebarClose: false}) ,
    [REGISTER]: (state, {payload}) =>({
        ...state,
        handler:{
            open: payload.open,
            close: payload.close
        }
    })
}, initialState)