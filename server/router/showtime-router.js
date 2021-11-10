const Router = require('express').Router
const router = new Router()
const showtimeController = require('../controller/showtime-controller')

router.get('/', showtimeController.getShowtimes)
router.post('/create', showtimeController.create)
router.put('/:id', showtimeController.update)
router.delete('/:id', showtimeController.delete)


module.exports = router