const jwt = require('jsonwebtoken')
const SECRET_KEY = 'mael'

const authMiddleware = (req, res, next) => {

    // read the token from header or url 
    const token = req.headers['x-access-token'] || req.query.token
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // token does not exist
    if(!token) {
        return res.status(403).json({
            success: false,
            message: 'not logged in'
        })
    }

    // create a promise that decodes the token
    const p = new Promise(

        (resolve, reject) => {

            console.log('[Check Token]: ', token.slice(0,20),'...\t', 'from ',ip);
            jwt.verify(token, SECRET_KEY, (err, decoded) => {
                if(err) reject(err)
                resolve(decoded)
            })
        }
    )

    // if it has failed to verify, it will return an error message
    const onError = (error) => {
        res.status(403).json({
            success: false,
            message: error.message
        })
    }

    // process the promise
    p.then((decoded)=>{
        req.decoded = decoded
        req.token = token
        req.ip=ip
        next()
    }).catch(onError)
}


const authMiddlewareNotAbort = (req, res, next) => {

    // read the token from header or url 
    const token = req.headers['x-access-token'] || req.query.token
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // token does not exist
    if(!token) 
        return next()
    

    // create a promise that decodes the token
    const p = new Promise(
        (resolve, reject) => {
            console.log('[Check Token]: ', token.slice(0,20),'...\t', 'from ',ip);
            jwt.verify(token, SECRET_KEY, (err, decoded) => {
                if(err) reject(err)
                resolve(decoded)
            })
        }
    )

    // if it has failed to verify, it will return an error message
    const onError = (error) => {
        next()
    }

    // process the promise
    p.then((decoded)=>{
        req.decoded = decoded
        req.token = token
        req.ip=ip
        next()
    }).catch(onError)
}



const createAuthToken = async (body)=>{
    return jwt.sign( body, SECRET_KEY, {
            issuer: 'mael.co.kr',
            subject: 'authentication'
        })
}

exports.authMiddlewareNotAbort = authMiddlewareNotAbort
exports.authMiddleware = authMiddleware
exports.createAuthToken = createAuthToken