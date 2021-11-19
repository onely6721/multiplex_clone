const {Schema, model} = require('mongoose');

const MovieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    language: {
        type: String,
        required: true,
    },
    genre: [{
        type: String,
        required: true,
    }],
    ratingIMDB: {
      type: String,
      required: true
    },
    director: {
        type: String,
        required: true,
    },
    cast: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
})

module.exports = model('Movie', MovieSchema);