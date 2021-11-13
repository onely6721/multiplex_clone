const showtimeService = require('../service/showtime-service')
const moment = require('moment-timezone')

class ShowtimeController{
    async getShowtimes(req, res, next) {
        try {
            const showtimes = await showtimeService.getShowtimes()
            return res.status(200).json(showtimes)
        } catch (e) {
            return res.status(400).send(e)
        }
    }

    async getShowtimesForMovie(req, res, next) {
        try {
            const {cinemaId, movieId, startDate} = req.query
            console.log(req.query)
            const showtimes = await showtimeService.getShowtimesForMovie({cinemaId, movieId, startDate})
            return res.status(200).json(showtimes)
        } catch (e) {
            return res.status(400).send(e)

        }
    }



    async update(req,res,next) {
        try {
            const id = req.params.id
            const showtime = await showtimeService.update(id,req.body)
            return res.status(200).json(showtime)

        } catch (e) {
            return res.status(400).send(e)

        }
    }

    async create(req,res,next) {
        try {
            const cinema = await showtimeService.create(req.body)
            return res.status(200).json(cinema)
        } catch (e) {
                return res.status(400).send(e)

            }
        }


        async delete(req,res,next) {
            try {
                const id = req.params.id
                await showtimeService.delete(id)
                return res.status(200).send("Успешно удалено")

            } catch (e) {
                return res.status(400).send(e)

            }
        }
    }

    module.exports = new ShowtimeController()