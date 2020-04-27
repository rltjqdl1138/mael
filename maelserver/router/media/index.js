

const router = require('express').Router()
const controller = require('./controller')
//router.post('/register', controller.register)

router.get('/group', controller.getAlbumGroup)
router.get('/album', controller.getAlbum)
router.get('/music', controller.getMusicByAlbum)
router.get('/*', (req,res)=>{
    res.send('404 not found')
})
//router.post('/',Account.login )
module.exports = router

