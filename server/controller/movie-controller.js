const movieService = require('../service/movie-service')


class MovieController{
    async getMovies(req, res, next) {
        try {
            const movies = await movieService.getMovies()
            return res.status(200).json(movies)
        } catch (e) {
            return res.status(400).send(e)
        }
    }


    async getNewMovie(req, res, next) {
        try {
            const movie = await movieService.getNewMovie()
            return res.status(200).json(movie)
        } catch (e) {
            return res.status(400).send(e)
        }
    }
    async getMoviesByCinemaId(req, res, next) {
        try {
            const id = req.params.id
            const movies = await movieService.getMoviesByCinemaId(id)
            return res.status(200).json(movies)
        } catch (e) {
            return res.status(400).send(e)
        }
    }

    async getMovieById(req, res, next) {
        try {
            const id = req.params.id
            const movie = await movieService.getMovieById(id)
            return res.status(200).json(movie)
        } catch (e) {
            return res.status(400).send(e)
        }
    }

    async update(req,res,next) {
        try {
            const id = req.params.id
            const movie = await movieService.update(id, req.body)
            return res.status(200).json(movie)

        } catch (e) {
            return res.status(400).send(e)
        }
    }

    async create(req,res,next) {
        try{
            const movie = await movieService.create({
                ...req.body,
                image: req.file.filename
            })
            return res.status(200).send(movie)
        } catch (e) {
            console.log(e.message)
        }
    }

    async delete(req,res,next) {
        try {
            const id = req.params.id
            await movieService.delete(id)
            return res.status(200).send("Успешно удалено")
        } catch (e) {
            return res.status(400).send(e)
        }
    }
}

module.exports = new MovieController()