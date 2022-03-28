const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        unique: true,
    },
    nickname: {
        type: String,

    },
    password: {
        type: String,
        required: true,
    },

})

module.exports = mongoose.model('User', userSchema);