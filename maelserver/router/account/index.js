const router = require('express').Router()
const controller = require('./controller')

const {authMiddleware} = require('../../tokenize')
//router.post('/register', controller.register)
router.get('/', (req,res)=>{
    res.send('404 not found')
})
router.get('/checkid',controller.checkID)
router.get('/forgotid',controller.forgotID)
router.post('/register',controller.register )

router.use(authMiddleware)
router.get('/user',controller.getUserinfo)
router.get('/account',controller.getAccountinfo)
router.put('/email', controller.changeEmail)
router.put('/password',controller.changePassword)
module.exports = router