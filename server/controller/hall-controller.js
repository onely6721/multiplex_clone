const hallService = require('../service/hall-service')

class HallController{
    async getHalls(req, res, next) {
        try {
            const halls = await hallService.getHalls()
            return res.status(200).json(halls)
        } catch (e) {
            return res.status(400).send(e)
        }
    }

    async getHallsByCinemaId(req, res, next) {
        try {
            const id = req.params.id
            const halls = await hallService.getHallsByCinemaId(id)
            return res.status(200).json(halls)
        } catch (e) {
            return res.status(400).send(e)
        }
    }

    async getHallById(req, res, next) {
        try {
            const id = req.params.id
            const hall = await hallService.getHallById(id)
            return res.status(200).json(hall)
        } catch (e) {
            return res.status(400).send(e)
        }
    }

    async update(req,res,next) {
        try {
            const id = req.params.id
            const cinema = await hallService.update(id, req.body)
            return res.status(200).json(cinema)

        } catch (e) {
            return res.status(400).send(e)
        }
    }

    async create(req,res,next) {
        try{
            const {columns, rows, name, cinema} = req.body
            console.log(req.body)
            const hall = await hallService.create({
                columns,
                rows,
                name,
                cinema
            })
            return res.status(200).send(hall)
        } catch (e) {
            console.log(e.message)
        }
    }

    async delete(req,res,next) {
        try {
            const id = req.params.id
            await hallService.delete(id)
            return res.status(200).send("Успешно удалено")
        } catch (e) {
            return res.status(400).send(e)
        }
    }
}

module.exports = new HallController()