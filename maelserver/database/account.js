const database = require("./index")
module.exports = class accountDB extends database {
    constructor(location, host='localhost', port=2424){
        super(location, host, port);
    }
    async getAID(){
        const {dbSession} = this
        try{
            const result = await dbSession.query("Select AID from Account").all()
            this.AID = result.length + 1
        }catch(e){
            console.log(e)
            this.AID = 1000001
        }
        return this.AID
    }
    async findOneByID(id){
        const {dbSession} = this
        try{
            const result = await dbSession.query("Select * from Account where id=:id",{params:{id}}).all()
            if(result.length > 1)
                console.log("\x1b[33m",`[Warnning] User id '${id}' is overlaped`,"\x1b[0m")

            else if(result.length === 0){
                return {}
            }
            return result[0]
            
        }catch(e){
            console.log(e)
            return {}
        }
    }
    async findOneByEmail(email){
        const {dbSession} = this
        try{
            const result = await dbSession.query("Select * from Account where email=:email",{params:{email}}).all()

            if(result.length > 1)
                console.log("\x1b[33m",`[Warnning] User email '${email}' is overlaped`,"\x1b[0m")
                //console.log(`[Warnning] User id '${email}' is overlaped`)

            else if(result.length === 0){
                return {}
            }
            return result[0]
            
        }catch(e){
            console.log(e)
            return {}
        }
    }
    async changeLastToken(id, token){
        const {dbSession} = this
        try{
            const result = await dbSession.update('Account')
                .set({lastToken:token})
                .where({id}).one()
            //console.log(result)
        }
        catch(e){
            console.log(e)
        }
    }

    async changeEmail(id, email){
        const {dbSession} = this
        try{
            const result = await dbSession.update('Account')
                .set({email:email})
                .where({id}).one()
            //console.log(result)
        }
        catch(e){
            console.log(e)
        }
    }

    async changePassword(id, password){
        const {dbSession} = this
        try{
            const result = await dbSession.update('Account')
                .set({password:password})
                .where({id}).one()
            //console.log(result)
        }
        catch(e){
            console.log(e)
        }
    }

    async createAccount( payload ){
        const {dbSession} = this
        const {id, password, mobile, email, name} = payload
        const stateID = 0
        const creditID = 0 
        //const createDate

        if( !id || id.length < 8 || id.length > 16)
            throw Error('ID')
        else if( !password )
            throw Error('password')
        else if( !mobile )
            throw Error('mobile')
        else if( !email )
            throw Error('email')
        else if( !name )
            throw Error('name')
        
        try{
            const overlaped = await this.findOneByID(id)
            const AID = this.AID ? this.AID : await this.getAID()
            if(overlaped.id) throw Error('ID overlaped')

            const body = {AID, id, password, mobile, email, name, stateID, creditID}
            const result = await dbSession.command(
                "insert into Account set AID=:AID, id=:id, stateID=:stateID, mobile=:mobile, email=:email, creditID=:creditID, name=:name, password=:password",
                { params: body }).all()
            this.AID = this.AID + 1
            console.log(`[Database: Account] ${this.AID}th ID is registerd: <${id}>`)
        }catch(e){
            throw Error (e.message)
        }
        
    }
}