const Router = require('express').Router;
const showtimeRouter = require('../router/showtime-router')
const hallRouter = require('../router/hall-router')
const cinemaRouter = require('../router/cinema-router')
const userRouter = require('../router/user-router')
const reservationRouter = require('../router/reservation-router')
const movieRouter = require('../router/movie-router')

const router = new Router();


router.use('/users', userRouter)
router.use('/halls', hallRouter)
router.use('/movies', movieRouter)
router.use('/cinemas', cinemaRouter)
router.use('/movies', movieRouter)
router.use('/showtimes', showtimeRouter)
router.use('/reservations', reservationRouter)

module.exports = router
