const db = new (require('../../database/credit'))('Credit')
const APIKEY = '5914024416387245'
const SECRET = 'cOKNeJoKIzdJOCbXjwL5PbB2BXV2AqXMeIztsYebxrVl46joD5usg5uS3qUDRSq5B0z4YNfweaRjhbHV'

const { Iamporter, IamporterError } = require('iamporter');
const iamporter = new Iamporter({
    apiKey: APIKEY,
    secret: SECRET
});

exports.list = (req, res)=>{
    const {id} = req.decoded
    console.log('결제 정보 조회: ',id)
    if(!id || id==='')
        res.status(400).send('unvalied token');
    (async()=>{
        const result = await db.listPaymentByID(id)
        const credit = await result.map(item=>{
            const {ID, cardNumber, expireDate, isVerified, isSignitured} = item
            return {
                ID, isVerified, isSignitured,
                cardNumber: 'XXXX-XXXX-XXXX-'+cardNumber.slice(15,20),
                expireDate: expireDate.slice(0,2) + '/' +expireDate.slice(2,4)
            }
        })
        await res.json({success:true, payment:credit} )
    })()
    
}

exports.register = (req, res)=>{
    const {id} = req.decoded
    const subscriptionID = id +'-'+ Date.now()
    const {cardNumber, cvc, expireDate, birth, password} = req.body
    if(!id || id==='' || !cardNumber || !cvc || !expireDate || !birth || !password)
        res.status(400).send('empty set');
    console.log(req.body)
    const expiry = '20' + expireDate.slice(2,4) + '-' + expireDate.slice(0,2);

    (async()=>{
        try{
            const result = await db.listPaymentByID(id)
            if(result > 5) return res.json({success:false, msg:'6th card'})
            await iamporter.createSubscription({
                'customer_uid': subscriptionID,
                'card_number': cardNumber,
                'expiry': expiry,
                'birth': birth,
                'pwd_2digit': password
            })
            const regist = await db.registerPayment({accountID:id, subscriptionID, cardNumber, expireDate, isSignitured:result.length===0?true:false})
            res.json({success:true, regist})
        }catch(e){
            console.log(e.message)
            res.status(400).send(e.message)
        }
    })()
    console.log('결제 정보 등록: ', id)
}