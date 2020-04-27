
const db = new (require('../../database/account'))('Authentication')
const {createAuthToken} = require('../../tokenize')

exports.login = (req,res)=>{
    const {id, password, deviceID} = req.body;
    console.log('[Login Try]: ', id, password, deviceID);
    (async()=>{
        const hash = password
        try{
            const result = await db.findOneByID(id)
            // ID is not exist
            if(!result || !result.id)
                return res.json({success:false, msg:'ID is not exist'})
            // Password is wrong
            else if(hash !== result.password)
                return res.json({success:false, msg:'Password is not match with ID'})
            else if(!deviceID)
                return res.json({success:false, msg:'Device ID is not exist'})
    
            console.log(`[Login] ID:${id}`)
            // Create JWT
            const token = await createAuthToken({ id, name:result.name, deviceID })
            
            await db.changeLastToken(id, token)
            const msg = {
                success:true,
                token,
                username:result.name }
    
            res.json(msg)

        }
        catch(e){
            console.log(e)
            res.json({success:false, msg:e.message})
        }
    })()
}

exports.check = (req,res)=>{
    const {id, deviceID} = req.decoded
    const token = req.token;
    (async()=>{
        const result = await db.findOneByID(id)
        
        if(!result)
            return res.json({success:false, msg:'ID is not exist'})
        else if(result.lastToken !== token)
            return res.json({success:false, msg:'다른 기기에 로그인되어있습니다.', deviceID})
        
        res.json({
            success:true
        })
    })()
}