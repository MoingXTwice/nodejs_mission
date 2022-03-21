const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postId: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,

    },
    content: {
        type: String,
        required: true,
    },
    writer: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    writeDate: {
        type: String,
    },
})

module.exports = mongoose.model('Post', postSchema);