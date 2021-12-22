const ReservationModel = require('../models/reservation-model')
const UserModel = require('../models/user-model')
const moment = require('moment')

class StatService {
    async getReservationsStat() {
        const reservations = await ReservationModel.aggregate()
            .lookup({
                from: 'showtimes',
                localField: 'showtime',
                foreignField: '_id',
                as: 'showtime'
            })
            .unwind({
                path: '$showtime'
            })
            .lookup({
                from: 'movies',
                localField:'showtime.movieId',
                foreignField: '_id',
                as: 'movie'
            })
            .unwind({
                path: '$movie'
            })
            .group({
                _id: '$movie',
                totalCash: {
                    $sum: '$showtime.price'
                },
                totalReservations: {
                    $sum: 1
                }
            })
            .project({
                _id: 0,
                movie: "$_id",
                totalCash: 1,
                totalReservations: 1

            })
            .sort({totalCash: -1})
        const totalCount = await ReservationModel.find().count()
        return  {
            totalCount: totalCount,
            reservations: reservations
        }
    }

    async getTotalUsers () {
        const totalUsers = await UserModel
            .find()
            .count()
        const usersPerMonth = await UserModel
            .find({
                date: {
                    $gte: moment().subtract(1,'month'),
                    $lte: moment()
                }
            })
            .count()
        const usersPerWeek = await UserModel
            .find({
                date: {
                    $gte: moment().subtract(1,'week'),
                    $lte: moment()
                }
            })
            .count()
        return {
            totalUsers,
            usersPerMonth,
            usersPerWeek
        }
    }
}

module.exports = new StatService()