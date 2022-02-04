const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    keyword: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    dateOfCreation: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    votesOnPost: [{
        ref: 'User'
    }],
    ratingOfPost: {
        type: Number,
        default: 0,
    },
})