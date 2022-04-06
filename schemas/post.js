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
    userId: {
        type: Number,
        required: true,
    },
    nickname: {
        type: String,
        required: true,
    },
    writeDate: {
        type: String,
    },
})

module.exports = mongoose.model('Post', postSchema);