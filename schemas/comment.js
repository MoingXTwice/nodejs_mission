const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    commentId:{
        type: Number,
        required: true,
        unique: true,
    },
    postId: {
        type: Number,
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
    content: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Comment', commentSchema);