const ShowtimeModel = require('../models/showtime-model')
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
                                            .populate("cinemaId")
                                            .populate("movieId")
                                            .populate("cinemaId")
                                            .populate("hallId")
        return {
            startAt: showtime.startAt,
            startDate: showtime.startDate,
            price: showtime.price,
            columns: showtime.hallId.columns,
            rows: showtime.hallId.rows,
            endDate: showtime.endDate,
            cinemaName: showtime.cinemaId.name,
            movieTitle: showtime.movieId.title,
            hallName: showtime.hallId.name
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