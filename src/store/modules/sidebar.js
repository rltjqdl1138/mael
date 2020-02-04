import { createAction, handleActions } from 'redux-actions'

const CLOSE = 'sidebar/CLOSE'
const OPEN = 'sidebar/OPEN'

export const close = createAction(CLOSE)
export const open = createAction(OPEN)


const initialState = {
    isSidebarOpen: true
}

export default handleActions({
    [OPEN]: ( ) => {
        return { isSidebarOpen: true }
    },
    [CLOSE]: ( )=>{
        return { isSidebarOpen: false }
    }
}, initialState)