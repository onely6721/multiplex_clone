const showtimeService = require('../service/showtime-service')


class ShowtimeController{
    async getShowtimes(req, res, next) {
        try {
            const showtimes = await showtimeService.getShowtimes()
            return res.status(200).json(showtimes)
        } catch (e) {
            return res.status(400).send(e)
        }
    }

    async generateSchedule (req, res, next) {
        try {
            const schedule = await showtimeService.generateSchedule(req.body)
            return res.status(200).json(schedule)
        }   catch (e) {
            return res.status(400).send(e)
        }
    }

    async getShowtimeById(req,res,next) {
        try {
            const showtimeId = req.params.id
            const showtime = await showtimeService.getShowtimeById(showtimeId)
            console.log("hello")
            return res.status(200).json(showtime)
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
            console.log(req.body)
            const showtime = await showtimeService.create(req.body)
            return res.status(200).json(showtime)
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