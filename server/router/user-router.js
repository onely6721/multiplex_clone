const Router = require('express').Router
const router = new Router()
const userController = require('../controller/user-controller')

router.post('/login', userController.login )
router.post('/registration', userController.registration )
router.get('/')
router.put('/:id')
router.get('/all')
router.delete('/:id')
module.exports = router