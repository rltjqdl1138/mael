
const {authMiddlewareNotAbort } = require('../../tokenize')
const router = require('express').Router()
const controller = require('./controller')
//router.post('/register', controller.register)



router.use(authMiddlewareNotAbort)
router.get('/', controller.basicRouter)
router.get('/*', controller.loadFile)

module.exports = router