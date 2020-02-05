import { createAction, handleActions } from 'redux-actions'

const UPDATE = 'theme/UPDATE'

export const update = createAction(UPDATE, value => value)


const initialState = {
    list:[]
}
export default handleActions({
    [UPDATE]: (state, {payload})=>{
        return {
            ...state,
            list: payload,
        }
    }
}, initialState)