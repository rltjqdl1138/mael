import { AsyncStorage } from 'react-native';
import { createAction, handleActions } from 'redux-actions'

const INITIALIZE = 'authentication/INITIALIZE'
const LOGIN = 'authentication/LOGIN'
const LOGOUT = 'authentication/LOGOUT'

export const login = createAction(LOGIN, value => value)
export const logout = createAction(LOGOUT)
export const initialize = createAction(INITIALIZE, value => value)

const _storeData = async (token) => {
    try {
        await AsyncStorage.setItem('@MySuperStore:token', JSON.stringify(token));
    } catch (error) {
        // Error saving data
    }
};

const initialState = {
    isLogin: false,
    token: '',
    username: ''
}
export default handleActions({
    [INITIALIZE]:(state, {payload})=>{
        const {token,username} = payload
        return {
            isLogin:true,
            token,
            username
        }
    },
    [LOGIN]: (state, {payload})=>{
        const {token, username} = payload
        _storeData({token, username})
        console.log(token, username)
        return {
            isLogin: true,
            token,
            username
        }
    },
    [LOGOUT]: ( )=>{
        AsyncStorage.removeItem('@MySuperStore:token')
        return {
            isLogin:false,
            token:'',
            username:''
        }
    }
}, initialState)