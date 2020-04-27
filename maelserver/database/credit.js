const database = require("./index")
const iamport = require('../import')
module.exports = class accountDB extends database {
    constructor(location, host='localhost', port=2424){
        super(location, host, port);
    }
    async listPaymentByID(id){
        const {dbSession} = this
        const account = await dbSession.query('Select * from Account where id=:id',{params:{id}}).all()
        if(account.length === 0)
            throw Error('unregistered ID: ', id)
        else if(account.length > 1)
            console.log("\x1b[33m",`[Warnning] User id '${id}' is overlaped`,"\x1b[0m")
        const credit = await dbSession.query('Select * from payment where accountID=:accountID', {params:{accountID:id}}).all()
        return credit
    }

    async registerPayment(payload){
        const {accountID, subscriptionID, cardNumber, expireDate} = payload

        if(!accountID || accountID === '')
            throw Error('account ID')
        else if(!subscriptionID || subscriptionID==='')
            throw Error('subscription ID')
        else if(!cardNumber || cardNumber.length === 20 )
            throw Error('card Number')
        else if(!expireDate || expireDate === '')
            throw Error('expire Date')

        const {dbSession} = this
        const _num = await dbSession.query('Select ID from payment').all()
        const ID = String(_num.length + 1)
        const isVerified = true
        const result = await dbSession.command('Insert into payment set ID=:ID, accountID=:accountID, subscriptionID=:subscriptionID, cardNumber=:cardNumber, expireDate=:expireDate, isVerified=:isVerified',
                {params:{ID, accountID, subscriptionID, cardNumber, expireDate, isVerified}}).all()

                return result
    }
}