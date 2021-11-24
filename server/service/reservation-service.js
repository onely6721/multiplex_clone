const ReservationModel = require('../models/reservation-model')
const ShowtimeModel = require('../models/showtime-model')
const MovieModel = require('../models/movie-model')
const HallModel = require('../models/hall-model')
const CinemaModel = require('../models/cinema-model')

class ReservationService {
    async getReservations() {
        const reservations = await ReservationModel.find()
        return reservations
    }

    async getReservationById(id) {
        const reservation = await ReservationModel.findById(id)
        return reservation
    }

    async getReservationsForUser(id) {
        const tempReservations = await ReservationModel.find({owner: id})
        const reservations = await Promise.all(tempReservations.map( async (reserv) => {
            const showTime = await  ShowtimeModel.findById(reserv.showtime)
            const movie = await MovieModel.findById(showTime.movieId)
            const hall = await  HallModel.findById(showTime.hallId)
            const cinema = await CinemaModel.findById(showTime.cinemaId)
            const newReservation = {
                id: reserv._id,
                row: reserv.row,
                column: reserv.column,
                movieTitle: movie.title,
                cinemaName: cinema.name,
                hallName: hall.name,
                startDate: showTime.startDate,
                startAt: showTime.startAt,
                price: showTime.price,
            }
            return newReservation
        }))
        return reservations
    }

    async getReservationsForShowtime(id) {
        const reservations = await ReservationModel.find({showtime: id})
        return reservations
    }


    async update(id, reservation) {
        const newReservation = await ReservationModel.findByIdAndUpdate(id, reservation)
        return newReservation
    }

    async create(reservation) {
        const newReservation = await ReservationModel.create(reservation)
        return newReservation
    }

    async delete(id, user) {
        if (user.role === 'admin'){
            await ReservationModel.findByIdAndDelete(id)
            return
        }
        const candidate = await ReservationModel.findById(id)
        if (candidate.owner.equals(user.userId))
            await ReservationModel.findByIdAndDelete(id)
    }
}

module.exports = new ReservationService()