
const HallModel = require('../models/hall-model')


class HallService {
    async getHalls() {
        const halls = await HallModel.find()
        return halls
    }

    async getHallsByCinemaId(id) {
        const halls = await HallModel.find({cinema: id})
        return halls
    }

    async getHallById(id) {
        const hall = await HallModel.findById(id)
        return hall
    }

    async update(id, newHall) {
        const hall = await HallModel.findByIdAndUpdate(id, newHall, {new:true})
        return hall
    }

    async create(hall) {
        const newHall = await HallModel.create(hall)
        return newHall
    }

    async delete(id) {
        await HallModel.findByIdAndDelete(id)
    }
}

module.exports = new HallService()