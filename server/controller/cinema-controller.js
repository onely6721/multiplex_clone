const cinemaService = require('../service/cinema-service')

class CinemaController{
    async getCinemas(req, res, next) {
        try {
            const cinemas = await cinemaService.getCinemas()
            return res.status(200).json(cinemas)
        } catch (e) {
            return res.status(400).send(e)
        }
    }

    async getCinemaById(req, res, next) {
        try {
            const id = req.params.id
            const cinema = await cinemaService.getCinemaById(id)
            return res.status(200).json(cinema)
        } catch (e) {
            return res.status(400).send(e)
        }
    }

    async update(req,res,next) {
        try {
            console.log(req.body)
            const id = req.params.id
            const newCinema = req.file ?
                {
                    ...req.body,
                    image: req.file.filename
                }
                :
                {
                    ...req.body,
                }
            const cinema = await cinemaService.update(id, newCinema)
            return res.status(200).json(cinema)

        } catch (e) {
            return res.status(400).send(e)
        }
    }

    async create(req,res,next) {
        try  {
            const {name, address, city} = req.body
            const cinema = await cinemaService.create({
                address,
                city,
                name,
                image: req.file.filename
            })

            return res.status(200).json(cinema)

        } catch (e) {
            return res.status(400).send(e)
        }
    }

    async delete(req,res,next) {
        try {
            const id = req.params.id
            await cinemaService.delete(id)
            return res.status(200).send("Успешно удалено")
        } catch (e) {
            return res.status(400).send(e)
        }
    }
}

module.exports = new CinemaController()