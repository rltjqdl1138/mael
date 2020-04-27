

const router = require('express').Router()
const controller = require('./controller')
const { authMiddleware } = require('../../tokenize')
//router.post('/register', controller.register)


router.use(authMiddleware)
router.get('/', controller.list)
router.post('/',controller.register)
//router.post('/',Account.login )
module.exports = router