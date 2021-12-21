const reservationService = require('../service/reservation-service')

class ReservationController{
    async getReservations(req, res, next) {
        try {
            const reservations = await reservationService.getReservations()
            return res.status(200).json(reservations)
        } catch (e) {
            return res.status(400).json({message: e.message})
        }
    }

    async createReservations(req,res,next) {
        try {
            const reservations = await reservationService.createReservations(req.body)
            return res.status(200).json(reservations)
        } catch (e) {
            return res.status(400).json({message: e.message})
        }
    }

    async getReservationById(req, res, next) {
        try {
            const id = req.params.id
            const reservation = await reservationService.getReservationById(id)
            return res.status(200).json(reservation)
        } catch (e) {
            return res.status(400).json({message: e.message})
        }
    }


    async getReservationsForShowtime(req, res, next) {
        try {
            const id = req.params.id
            const reservations = await reservationService.getReservationsForShowtime(id)
            return res.status(200).json(reservations)
        } catch (e) {
            return res.status(400).json({message: e.message})
        }
    }

    async getCountForMovies(req, res, next) {
        try {
            const reservations = await reservationService.getCountForMovies()
            return res.status(200).json(reservations)
        } catch (e) {
            return res.status(400).json({message: e.message})
        }
    }
    async getReservationsForUser(req, res, next) {
        try {
            const id = req.user.userId
            const reservations = await reservationService.getReservationsForUser(id)
            return res.status(200).json(reservations)
        } catch (e) {
            return res.status(400).json({message: e.message})
        }
    }



    async update(req,res,next) {
        try {
            const id = req.params.id
            const reservation = await reservationService.update(id, req.body)
            return res.status(200).json(reservation)
        } catch (e) {
            return res.status(400).json({message: e.message})
        }
    }

    async create(req,res,next) {
        try {
            const userId = req.user.userId
            const reservation = await reservationService.create({...req.body, owner:userId})
            return res.status(200).json(reservation)
        } catch (e) {
            return res.status(400).json({message: e.message})
        }
    }

    async delete(req,res,next) {
        try {
            const id = req.params.id
            const user = req.user
            await reservationService.delete(id, user)
            return res.status(200).json({message:"Успешно удалено"})
        } catch (e) {
            return res.status(400).json({message: e.message})
        }
    }
}

module.exports = new ReservationController()