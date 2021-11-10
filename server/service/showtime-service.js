const ShowtimeModel = require('../models/showtime-model')


class ShowtimeService {
    async getShowtimes() {
        const cinemas = await ShowtimeModel.find()
        return cinemas
    }


    async getShowtimesForMovie(filter) {
        return
    }


    async update(id, newShowtime) {
        const showTime = await ShowtimeModel.findByIdAndUpdate(id, newShowtime, {new: true})
        return showTime
    }

    async create(showtime) {

    }

    async delete(id) {

    }
}
module.exports = new ShowtimeService()