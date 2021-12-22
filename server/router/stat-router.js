const Router = require('express').Router
const router = new Router()
const statController = require('../controller/stat-controller')

router.get('/reservations', statController.getReservationsStat)
router.get('/totalUsers', statController.getTotalUsers)
module.exports = router