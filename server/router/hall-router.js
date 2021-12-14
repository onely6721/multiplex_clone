const Router = require('express').Router
const router = new Router()
const hallController = require('../controller/hall-controller')
const adminMiddleware = require('../middlewares/admin-middleware')


router.get('/', hallController.getHalls)
router.post('/', adminMiddleware, hallController.create)
router.get('/:id', hallController.getHallById )
router.get('/byCinema/:id', hallController.getHallsByCinemaId)
router.put('/:id',adminMiddleware, hallController.update)
router.delete('/:id', adminMiddleware, hallController.delete)



module.exports = router