const MovieModel = require('../models/movie-model')

class MovieService {
    async getMovies() {
        const movies = await MovieModel.find()
        return movies
    }


    async random() {
        const movie = await MovieModel.aggregate([{ $sample: { size: 1 } }])
        return movie
    }
    async getMoviesByCinemaId(id) {
        const movies = await MovieModel.find({cinema: id})
        return movies
    }

    async getMovieById(id) {
        const movie = await MovieModel.findById(id)
        return movie
    }

    async update(id, newMovie) {
        const movie = await MovieModel.findByIdAndUpdate(id, newMovie, {new:true})
        return movie
    }

    async create(movie) {
        const newMovie = await MovieModel.create(movie)
        return newMovie
    }

    async delete(id) {
        await MovieModel.findByIdAndDelete(id)
    }
}

module.exports = new MovieService()