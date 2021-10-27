const {Schema, model, Types} = require('mongoose');

const HallSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cinema: {
        type: Types.objectId,
        ref: 'Cinema'
    },
    rows: {
        type: Number,
        required: true
    },
    columns: {
        type: Number,
        required: true
    }

})

module.exports = model('Hall', HallSchema);