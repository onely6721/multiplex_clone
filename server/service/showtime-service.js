const ShowtimeModel = require('../models/showtime-model')


class ShowtimeService {
    async getShowtimes() {
        const cinemas = await ShowtimeModel.find()
        return cinemas
    }



    async getShowtimesForMovie(filter){

    }

    async update(id, newShowtime) {
        const showTime = await ShowtimeModel.findByIdAndUpdate(id, newShowtime, {new:true})
        return showTime
    }

    async create(showtime) {
        const newShowtime = await ShowtimeModel.create(showtime)
        return newShowtime
    }

    async delete(id) {

        await ShowtimeModel.findByIdAndDelete(id)

    }
}

module.exports = new ShowtimeService()