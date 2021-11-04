const CinemaModel = require('../models/cinema-model')

class CinemaService {
    async getCinemas() {
        try {
            const cinemas = await CinemaModel.find()
            return cinemas
        } catch (e) {

        }
    }

    async getCinemaById(id) {
        try {
            const cinema = await CinemaModel.findById(id)
            return cinema
        } catch (e) {

        }
    }

    async update(id, newCinema) {
        console.log(newCinema)
        const cinema = await CinemaModel.findByIdAndUpdate(id, newCinema, {new:true})
        return cinema

    }

    async create(cinema) {
        const newCinema = await CinemaModel.create(cinema)
        return newCinema
    }

    async delete(id) {
        try {
            await CinemaModel.findByIdAndDelete(id)
        } catch (e) {

        }
    }
}

module.exports = new CinemaService()