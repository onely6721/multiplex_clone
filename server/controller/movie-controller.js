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

    async random(req,res,next) {
        try {
            const movie = await movieService.random()
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
            console.log(req.body)
            const id = req.params.id
            const newMovie = req.file ?
                {
                    ...req.body,
                    image: req.file.filename
                }
                    :
                {
                    ...req.body,
                }
            const movie = await movieService.update(id, newMovie)
            return res.status(200).json(movie)

        } catch (e) {
            console.log(e.message)
            return res.status(400).send(e)
        }
    }

    async create(req,res,next) {
        try{
            console.log(req.body)
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