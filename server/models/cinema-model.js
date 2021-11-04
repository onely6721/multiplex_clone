const {Schema, model, Types} = require('mongoose');

const CinemaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
        enum: ["Chernihiv", "Kiev", "Lviv", "Odesa", "Kharkiv"]
    },
    image: {
        type:String
    }


})

module.exports = model('Cinema', CinemaSchema);