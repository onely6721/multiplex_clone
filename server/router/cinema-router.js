const Router = require('express').Router
const router = new Router()
const cinemaController = require('../controller/cinema-controller')
const fileUpload = require('../service/file-uploader')
const adminMiddleware = require('../middlewares/admin-middleware')


router.get('/', cinemaController.getCinemas)
router.post('/',adminMiddleware,fileUpload.single('image'), cinemaController.create)
router.get('/:id', cinemaController.getCinemaById)
router.put('/:id',adminMiddleware,fileUpload.single('image'), cinemaController.update)
router.delete('/:id',adminMiddleware,cinemaController.delete)


module.exports = router