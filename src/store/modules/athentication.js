import { createAction, handleActions } from 'redux-actions'

const LOGIN = 'athentication/LOGIN'
const LOGOUT = 'athentication/LOGOUT'

export const login = createAction(LOGIN, value => value)
export const logout = createAction(LOGOUT)


const initialState = {
    isLogin: false,
    token: '',
    username: ''
}
export default handleActions({
    [LOGIN]: (state, {payload})=>{
        return {
            isLogin: true,
            token: payload.token,
            username: payload.username
        }
    },
    [LOGOUT]: ( )=>{
        return {
            isLogin:false,
            token:'',
            username:''
        }
    }
}, initialState)