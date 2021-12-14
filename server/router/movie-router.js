const Router = require('express').Router
const router = new Router()
const movieController = require('../controller/movie-controller')
const fileUpload = require('../service/file-uploader')
const adminMiddleware = require('../middlewares/admin-middleware')

router.get('/', movieController.getMovies)
router.post('/', adminMiddleware, fileUpload.single('image'), movieController.create)
router.get('/:id', movieController.getMovieById )
router.get('/byCinema/:id',  movieController.getMoviesByCinemaId)
router.put('/:id',adminMiddleware, fileUpload.single('image'),movieController.update)
router.delete('/:id', adminMiddleware,  movieController.delete)
router.get('/by/random', movieController.getNewMovie)


module.exports = router