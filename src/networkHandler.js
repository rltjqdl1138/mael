const URL = 'http://192.168.1.48:3000'
//const URL = 'http://192.168.1.40:3000'
//const URL = 'http://192.168.0.23:3000'

exports.url = URL

const getCheckID = async (id)=>{
    if(!id || id === '')
        return {}
    const response = await fetch(URL+'/api/account/checkid?id='+id)
    const data = await response.json()
    return data
}
const registerAccount = async (payload)=>{
    const {id, email, password, mobile, name, token, countryCode } = payload
    console.warn(token)
    try{
        const response = await fetch(URL+'/api/account/register',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'x-access-token':token 
            },body:JSON.stringify({
                id, email, password, mobile, name, countryCode
            })
        })
        const data = await response.json()
        return data
    }catch(e){
        return null
    }
}
const getForgotID = async (name, email)=>{
    try{
        const response = await fetch(URL+`/api/account/forgotid?email=${email}&name=${name}`,{
            method:'GET',
            headers: { 'Content-Type': 'application/json'} })
        const data = await response.json()
        return data

    }catch(e){
        console.warn(e)
        return {success:false}
    }

}

const getCreditInfo = async (token)=>{
    try{
        const response = await fetch(URL+'/api/payment/',{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'x-access-token':token } })
        const data = await response.json()
        return data
    }
    catch(e){
        console.warn(e)
        return {success:false}
    }
}

const registerCredit = async (token, payload)=>{
    const {cardNumber, cvc, expireDate, birth, password} = payload
    try{
        const response = await fetch(URL+'/api/payment/',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'x-access-token':token 
            },body:JSON.stringify({
                cardNumber, cvc, expireDate, birth, password
            })
        })
        const data = await response.json()
        return data

    }catch(e){
        return null
    }
}


const changeMobile = async (payload, authToken)=>{
    const { mobile, token } = payload
    try{
        const response = await fetch(URL+'/api/account/mobile',{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': authToken 
            },body:JSON.stringify({
                mobile, token
            })
        })
        const data = await response.json()
        return data
    }catch(e){
        return null
    }
}

const changeEmail = async (payload, authToken)=>{
    const { email } = payload
    try{
        const response = await fetch(URL+'/api/account/email',{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': authToken 
            },body:JSON.stringify({
                email
            })
        })
        const data = await response.json()
        return data
    }catch(e){
        return null
    }
}
const changePassword = ()=>{

}
const getUserinfo = async (token)=>{
    try{
        const response = await fetch(URL+'/api/account/user',{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': token 
            }
        })
        const data = await response.json()
        return data
    }catch(e){
        return null
    }
}
const getAccountinfo = async (token)=>{

    try{
        const response = await fetch(URL+'/api/account/account',{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': token 
            }
        })
        const data = await response.json()
        return data
    }catch(e){
        return null
    }

}

const Login = async (id, password)=>{
    if(!id || id ==='' || !password || password ==='')
        return {}
    const response = await fetch(URL+'/api/authentication/',{
        method:'POST',
        headers:
            { 'Content-Type': 'application/json' },
        body: JSON.stringify({'id':id, 'password':password, 'deviceID':'1111'})
    })
    const data = await response.json()
    return data
}
const checkToken = async (token)=>{
    if(!token || token ==='')
        return {success:false}
    try{
        const response = await fetch(URL+'/api/authentication/',{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token }
            })
        const data = await response.json()
        return data

    }catch(e){
        console.warn(e)
        return {success:false}
    }
}

const getMainThemeList = async () =>{
    try{
        //TODO: patch the URL
        const response = await fetch(URL+'/api/media/album',{
            method:'GET',
            headers: { 'Content-Type': 'application/json' } })
        const data = await response.json()
        return data
    }catch(e){
        console.warn(e)
        return {success:false}
    }
}
const getMusicList = async(albumID)=>{
    if(!albumID || albumID === '')
        return {success: false}
    try{
        const response = await fetch(URL+'/api/media/music?album='+albumID,{
            method:'GET',
            headers: { 'Content-Type': 'application/json' } })
        const data = await response.json()
        return data
    }catch(e){
        console.warn(e)
        return {success:false}
    }
}
const getMusicFile = async(url)=>{

    if(!url)
        return {success:false}

    try{
        const response = await fetch(URL+'/music/'+url, {
            method:'GET',
            headers: {'Content-Type':'application/json'}
        })
        const blob = await response.blob()
        const reader = new FileReader();
        console.warn(reader)
        reader.readAsDataURL(blob);

        return reader
    }catch(e){
        console.warn(e)
    }


}
const getCountryCode = async()=>{
    try{
        const response = await fetch(URL+'/api/authentication/countrylist', {
            method:'GET',
            headers: {'Content-Type':'application/json'}
        })
        const data = await response.json()
        return data
    }catch(e){
        console.warn(e)
        return {success:false}
    }
}
const mobileAuth = async(mobile, countryCode, type) =>{
    if(!mobile || !countryCode || mobile.length < 10 || mobile.length > 11)
        return { success:false }
    const response = await fetch(URL+'/api/authentication/test',{
        method:'POST',
        headers:
            { 'Content-Type': 'application/json' },
        body: JSON.stringify({mobile, countryCode, type})
    })
    const data = await response.json()
    return data

}

const checkMobileAuth = async(mobile, countryCode, key) =>{
    if(!mobile || !countryCode || mobile.length < 10 || mobile.length > 11)
        return {success:false}
    const response = await fetch(URL+`/api/authentication/test2`,{
        method:'POST',
        headers:
            { 'Content-Type': 'application/json' },
        body: JSON.stringify({mobile, countryCode, key})
    })
    const data = await response.json()
    return data
}

exports.account = {
    getCheckID,
    getForgotID,
    getCreditInfo,
    getUserinfo,
    getAccountinfo,
    registerCredit,
    registerAccount,
    changeMobile,
    changeEmail,
    Login,
    checkToken,
}

exports.music = {
    getMainThemeList,
    getMusicList,
    getMusicFile
}
exports.info = {
    getCountryCode,
    mobileAuth,
    checkMobileAuth
}
