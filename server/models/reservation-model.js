const {Schema, model, Types} = require('mongoose');

const ReservationSchema = new Schema({
    showtime: {
        type: Types.ObjectId,
        ref: "Showtime",
        required: true
    },
    row: {
        type: Number,
        required: true
    },
    column: {
        type: Number,
        required: true
    },
    checkin: {
        type: Boolean,
        default: false
    },
    owner: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = model('Reservation', ReservationSchema);