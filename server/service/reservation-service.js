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
                                                    .populate({
                                                        path: 'showtime',
                                                        populate:[ {path: 'movieId'}, {path:'cinemaId'}]
                                                    })

        return reservations
    }

    async getReservationsForShowtime(id) {
        const reservations = await ReservationModel.find({showtime: id})
        return reservations
    }

    async getCountForMovies() {
        const reservations = await ReservationModel.find().count()
        return reservations
    }

    async update(id, reservation) {
        const newReservation = await ReservationModel.findByIdAndUpdate(id, reservation, {new: true})
        return newReservation
    }

    async create(reservation) {
        const candidate = await ReservationModel.findOne({
            showtime: reservation.showtime,
            row: reservation.row,
            column: reservation.column
        })
        if( candidate)
            throw new Error("Уже забронировано!")
        const newReservation = await ReservationModel.create(reservation)
        return newReservation
    }
    async createReservations(reservations) {
        const session = await ReservationModel.startSession()
        await session.startTransaction()
        const createdReservations =  await Promise.all(
            reservations.map(async (rsv, index) => {
                return await ReservationModel.create(rsv)
            })
        )
        await session.commitTransaction()
        await session.endSession()
        return createdReservations

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