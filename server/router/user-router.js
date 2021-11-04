const Router = require('express').Router
const router = new Router()

router.post('/login', ()=> console.log("you auth") )
router.post('/registration', ()=> console.log("you regist") )
router.get('/')
router.get('/:id')
router.put('/:id')
router.get('/all')
router.delete('/:id')
module.exports = router