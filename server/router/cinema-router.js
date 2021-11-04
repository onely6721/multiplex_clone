const Router = require('express').Router
const router = new Router()
const cinemaController = require('../controller/cinema-controller')
const fileUpload = require('../service/file-uploader')



router.get('/', cinemaController.getCinemas)
router.post('/create',fileUpload.single('avatar'), cinemaController.create)
router.get('/:id', cinemaController.getCinemaById)
router.put('/:id',fileUpload.single('avatar'), cinemaController.update)
router.delete('/:id', cinemaController.delete)


module.exports = router