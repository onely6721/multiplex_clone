const ReservationModel = require('../models/reservation-model')


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
        const reservations = await ReservationModel.find({owner: id})
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

    async delete(id) {
        await ReservationModel.findByIdAndDelete(id)
    }
}

module.exports = new ReservationService()