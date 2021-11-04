const Router = require('express').Router
const router = new Router()
const hallController = require('../controller/hall-controller')

router.get('/', hallController.getHalls)
router.post('/create', hallController.create)
router.get('/:id', hallController.getHallById )
router.get('/byCinema/:id', hallController.getHallsByCinemaId)
router.put('/:id', hallController.update)
router.delete('/:id', hallController.delete)



module.exports = router