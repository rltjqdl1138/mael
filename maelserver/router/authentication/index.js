

const router = require('express').Router()
const controller = require('./controller')
const {authMiddleware} = require('../../tokenize')
//const controller = require('./auth.controller')
//router.post('/register', controller.register)

router.post('/', controller.login)
router.use(authMiddleware)
router.get('/*', controller.check)
// LOGIN
module.exports = router