const Router = require('express').Router
const router = new Router()
const userController = require('../controller/user-controller')

router.post('/login', userController.login )
router.post('/registration', userController.registration )
router.get('/', userController.getUsers)
router.put('/:id')
router.get('/:id', userController.getById)
router.delete('/:id')
module.exports = router