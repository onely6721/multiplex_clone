const {Schema, model, Types} = require('mongoose');

const ShowtimeSchema = new Schema({
    startAt: {
        type: String,
        required: true,
        trim: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    movieId: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required: true,
    },
    cinemaId: {
        type: Types.ObjectId,
        ref: 'Cinema',
        required: true,
    },
    hallId: {
        type: Types.ObjectId,
        ref: 'Hall',
        required: true,
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = model('Showtime', ShowtimeSchema);