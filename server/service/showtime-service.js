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

        const showTime = await ShowtimeModel.create({
            startAt: showtime.startAt,
            startDate: moment(showtime.startDate).add(2, 'h').toDate(),
            endDate: moment(showtime.endDate).add(2, 'h').toDate(),
            movieId: showtime.movieId,
            cinemaId: showtime.cinemaId,
            hallId: showtime.hallId,
            price: showtime.price
        })
        return showTime
    }

    async delete(id) {

    }
}
module.exports = new ShowtimeService()