import { createAction, handleActions } from 'redux-actions'

const REGISTER = 'navigator/REGISTER'


export const register = createAction(REGISTER)


const initialState = {
    isSidebarOpen: false,
    navList:{}
}

export default handleActions({
    [REGISTER]: (state, {payload} ) => {
        console.warn(navList)
        const {navList} = state
        if(!state[payload.id])
            navList[payload.id] = {
                push:payload.push,
                pop:payload.pop
            }    
        
        return state
    }
}, initialState)