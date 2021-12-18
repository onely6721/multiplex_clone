const Router = require('express').Router
const router = new Router()
const showtimeController = require('../controller/showtime-controller')
const adminMiddleware = require('../middlewares/admin-middleware')

router.get('/', showtimeController.getShowtimes)
router.get('/forMovie', showtimeController.getShowtimesForMovie)
router.get('/:id', showtimeController.getShowtimeById)
router.post('/generateSchedule', showtimeController.generateSchedule)
router.post('/', adminMiddleware, showtimeController.create)
router.put('/:id', adminMiddleware, showtimeController.update)
router.delete('/:id', adminMiddleware, showtimeController.delete)


module.exports = router