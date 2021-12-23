const Router = require('express').Router
const router = new Router()
const userController = require('../controller/user-controller')
const adminMiddleware = require('../middlewares/admin-middleware')

router.post('/login', userController.login )
router.post('/registration', userController.registration )
router.get('/', userController.getUsers)
router.put('/:id', userController.update)
router.get('/:id', userController.getById)
router.delete('/:id', userController.delete)
module.exports = router