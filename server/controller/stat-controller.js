const  statService = require('../service/stat-service')

class StatController{

    async getReservationsStat(req, res, next) {
        try {
            const reservations = await statService.getReservationsStat()
            res.status(200).json(reservations)
        } catch (e) {
            console.log(e.message)
        }
    }
    
    async getTotalUsers(req, res, next) {
        try {
            const totalUsers = await statService.getTotalUsers()
            res.status(200).json(totalUsers)
        } catch (e) {
            console.log(e.message)
        }
    }
}

module.exports = new StatController()