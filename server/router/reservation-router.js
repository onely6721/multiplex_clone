const AuthMiddleware = require('../middlewares/user-middleware')
const reservationController = require('../controller/reservation-controller')
const Router = require('express').Router
const router = new Router()
const adminMiddleware = require('../middlewares/admin-middleware')

router.get('/', reservationController.getReservations)
router.get('/me',AuthMiddleware, reservationController.getReservationsForUser)
router.get('/forShowtime/:id', reservationController.getReservationsForShowtime)
router.get('/:id', reservationController.getReservationById)
router.post('/',AuthMiddleware, reservationController.create)
router.put('/:id', reservationController.update)
router.delete('/:id', AuthMiddleware, reservationController.delete)


module.exports = router