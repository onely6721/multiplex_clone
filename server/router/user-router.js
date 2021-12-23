const Router = require('express').Router
const router = new Router()
const userController = require('../controller/user-controller')
const adminMiddleware = require('../middlewares/admin-middleware')

router.post('/login', userController.login )
router.post('/registration', userController.registration )
router.get('/', adminMiddleware ,userController.getUsers)
router.put('/:id', adminMiddleware,userController.update)
router.get('/:id', adminMiddleware,userController.getById)
router.delete('/:id', adminMiddleware,userController.delete)
module.exports = router