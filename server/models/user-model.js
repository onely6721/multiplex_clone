const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    secondName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'employee', 'admin']
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    }

})

module.exports = model('User', UserSchema);