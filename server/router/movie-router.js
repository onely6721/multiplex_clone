const Router = require('express').Router
const router = new Router()
const movieController = require('../controller/movie-controller')
const fileUpload = require('../service/file-uploader')

router.get('/', movieController.getMovies)
router.post('/create', fileUpload.single('image'), movieController.create)
router.get('/:id', movieController.getMovieById )
router.get('/byCinema/:id', movieController.getMoviesByCinemaId)
router.put('/:id',fileUpload.single('image'),movieController.update)
router.delete('/:id', movieController.delete)
router.get('/by/random', movieController.getNewMovie)


module.exports = router