const db = new (require('../../database/account'))('Account')

exports.register = (req, res) =>{
    const {id, password, mobile, name, email} = req.body;
    (async()=>{
        try{
            await db.createAccount({id, password, mobile, name, email})
            res.json({success:true, id:id})
        }catch(e){
            console.log('[Account API] Registeration fault:', e.message)
            res.json({success:false, msg:e.message})
        }
    })()
}


exports.checkID = (req, res)=>{
    const {id} = req.query;
    if(!id || id==='')
        return res.json({success:false, msg:'No id input'});
    (async()=>{
        try{
            const result = await db.findOneByID(id)

            if(result.id)
                res.json({success:true, overlaped:true})
            else
                res.json({success:true, overlaped:false})

        }catch(e){
            console.log(e)
            res.json({success:false, msg:e.message})
        }
    })()
}

exports.forgotID = (req, res) =>{
    const {name, email} = req.query
    if( !name || !email || name==='' || email === '' )
        return res.json({success:false, msg:'empty set'});

    (async()=>{
        try{
            const result = await db.findOneByEmail(email)
            if(result.id && result.name === name){
                console.log('[Find ID] name:',name, '  email:', email, '  id:',result.id)
                res.json({success:true, id:result.id})
            }
            else{
                console.log('[Find ID] name:',name, '  email:', email)
                res.json({success:false, msg:'there is no matched info'})
            }
        }catch(e){
            console.log(e)
            res.json({success:false, msg:e.message})
        }
    })()

}

exports.changeEmail = (req, res)=>{
    const {id} = req.decoded
    const {email} = req.body
    if(!id || id === '' || !email || email === '')
        return res.json({success:false, msg:'empty set'});
    
    (async()=>{
        try{
            const result = await db.findOneByID(id)
            if(result.email && result.email === email)
                return res.json({success:false, msg:'Same email' })
            await db.changeEmail(id, email)
            res.json({success:true, email})
        }catch(e){
            console.log(e)
            res.json({success:false, msg:e.message})
        }
    })()
    
}


exports.changePassword = (req, res)=>{
    const {id} = req.decoded
    const {oldPassword, newPassword} = req.body
    if( !id || id === '' || !oldPassword || oldPassword === '' ||
        !newPassword || !newPassword === '')
        return res.json({success:false, msg:'empty set'});
    
    (async()=>{
        try{
            const result = await db.findOneByID(id)
            if(result.password && result.password === oldPassword)
                return res.json({success:false, msg:'password is not correct' })
            await db.changePassword(id, newPassword)
            res.json({success:true})
        }catch(e){
            console.log(e)
            res.json({success:false, msg:e.message})
        }
    })()
    
}

exports.getUserinfo = (req, res)=>{
    const {id} = req.decoded
    console.log(`유저 정보 조회: ${id}`)
    if(!id || id === '')
        return res.json({success:false, msg:'empty set'});
    (async()=>{
        try{
            const result = await db.findOneByID(id)
            const {name, email, mobile} = result
            if( !name || !email || !mobile)
                throw Error('empty set')
            return res.json({success:true, name, email, mobile})
        }catch(e){
            console.log(e)
            return res.json({success:false, msg:e.message})
        }
    })()
}


exports.getAccountinfo = (req, res)=>{
    const {id} = req.decoded
    console.log(`계정 정보 조회: ${id}`)
    if(!id || id === '')
        return res.json({success:false, msg:'empty set'});
    (async()=>{
        try{
            const result = await db.findOneByID(id)
            const { stateID } = result
            if( !id || stateID === undefined )
                throw Error('empty set')
            res.json({success:true, id, stateID, date:'2020.04.30'})
        }catch(e){
            console.log(e)
            res.json({success:false, msg:e.message})

        }
    })()
}