const AuthMiddleware = require('../middlewares/auth-middleware')
const reservationController = require('../controller/reservation-controller')
const Router = require('express').Router
const router = new Router()

router.get('/', reservationController.getReservations)
router.get('/forUser',AuthMiddleware, reservationController.getReservationsForUser)
router.get('/forShowtime/:id', reservationController.getReservationsForShowtime)
router.get('/:id', reservationController.getReservationById)
router.post('/create',AuthMiddleware, reservationController.create)
router.put('/:id', reservationController.update)
router.delete('/:id', reservationController.delete)


module.exports = router