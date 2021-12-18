const ShowtimeModel = require('../models/showtime-model')
const CinemaModel = require('../models/cinema-model')
const MovieModel = require('../models/movie-model')
const HallModel = require('../models/hall-model')
const moment = require('moment-timezone')


class ShowtimeService {
    async getShowtimes() {
        const showtimes = await ShowtimeModel.find()
        return showtimes
    }

    async generateSchedule(params) {
        const result = []
        let startDate = params.startDate
        for (let i = 0; i < params.count; i++) {
            const showtime = await ShowtimeModel.create({
                movieId: params.movieId,
                cinemaId: params.cinemaId,
                hallId: params.hallId,
                startDate: startDate,
                endDate: moment(startDate).add(params.duration, 'm'),
                startAt: moment(startDate).format("HH:mm"),
                price: params.price
            })
            result.push(showtime)
            startDate = moment(startDate).add(params.duration, 'm').add(params.delay, 'm')
        }
        return result
    }

    async getShowtimeById(showtimeId) {
        const showtime = await ShowtimeModel.findById(showtimeId)
        const cinema = await CinemaModel.findById(showtime.cinemaId)
        const movie = await MovieModel.findById(showtime.movieId)
        const hall = await HallModel.findById(showtime.hallId)
        return {
            startAt: showtime.startAt,
            startDate: showtime.startDate,
            price: showtime.price,
            columns: hall.columns,
            rows: hall.rows,
            endDate: showtime.endDate,
            cinemaName: cinema.name,
            movieTitle: movie.title,
            hallName: hall.name
        }
    }

    async getShowtimesForMovie(filter) {
        const endDate = moment(filter.startDate).endOf('d')
        console.log(endDate)
        const showtimes = await ShowtimeModel.find({
            cinemaId: filter.cinemaId,
            movieId: filter.movieId,
            startDate: {$gte: filter.startDate, $lte: endDate}
        }).sort({startDate: -1})
        return showtimes

    }


    async update(id, newShowtime) {
        const showTime = await ShowtimeModel.findByIdAndUpdate(id, newShowtime, {new: true})
        return showTime
    }

    async create(showtime) {

        const showTime = await ShowtimeModel.create(showtime)
        return showTime
    }

    async delete(id) {
        await ShowtimeModel.findByIdAndDelete(id)
    }
}
module.exports = new ShowtimeService()