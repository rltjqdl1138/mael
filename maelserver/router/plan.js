

const router = require('express').Router()
//const controller = require('./auth.controller')
//router.post('/register', controller.register)
router.get('/*', (req,res)=>{
    res.send('404 not found')
})
//router.post('/',Account.login )
module.exports = router