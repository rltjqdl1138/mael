const OrientDBClient = require('orientjs').OrientDBClient

// setting
const NAME = 'mael'
const USER = 'root'
const PW = '1138877'

module.exports = class database{
    constructor(location, host='localhost', port=2424){
        (async() => {
            try{
                //Connect to orientDB Server
                this.dbClient = await OrientDBClient.connect({
                    host,
                    port
                })
                //Check database is exist
                const exists = await this.dbClient.existsDatabase({
                    name: NAME,
                    username: USER,
                    password: PW
                })
                if(!exists) throw Error('database is not exist')

                // Create Session for networking with Orient DB
                this.dbSession = await this.dbClient.session({
                    name:'mael',
                    username: 'root',
                    password: '1138877'
                })
                console.log(`[DataBase] Initializing Database for ${location?location:'server'} Complete on ${host}:${port}`)
                
            }catch(e){
                if(this.dbSession){
                    console.log('Session closed')
                    this.dbSession.close()
                }
                if(this.dbClient){
                    console.log('DB socket closed')
                    this.dbClient.close()
                }
                this.dbClient = undefined
                console.error(e)
            }
        })()
    }
    async rawQuery(query, params){
        try{
            const result = await this.dbSession.query(query, {params}).all()
            return result
        }catch(e){
            console.log(e)
            return e.message
        }
    }
    async rawCommand(query, params){
        try{
            const result = await this.dbSession.query(query, {params}).all()
            return result
        }catch(e){
            console.log(e)
            return e.message
        }

    }
}