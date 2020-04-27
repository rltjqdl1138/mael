//const URL = 'http://192.168.1.40:3000/'
//const URL = 'http://192.168.1.40:3000'
const URL = 'http://192.168.0.23:3000'

exports.url = URL

const getCheckID = async (id)=>{
    if(!id || id === '')
        return {}
    const response = await fetch(URL+'api/account/checkid?id='+id)
    const data = await response.json()
    return data
}
const registerAccount = ()=>{

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


const changeEmail = ()=>{

}
const changePassword = ()=>{

}
const getUserinfo = ()=>{

}
const getAccountinfo = ()=>{

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

exports.account = {
    getCheckID,
    getForgotID,
    getCreditInfo,
    registerCredit,
    Login,
    checkToken
}

exports.music = {
    getMainThemeList,
    getMusicList,
    getMusicFile

}
