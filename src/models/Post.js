const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: [6, 'Title should be at least 6 characters.'],
    },
    keyword: {
        type: String,
        required: true,
        minlength: [6, 'Keyword should be at least 6 characters.'],
    },
    location: {
        type: String,
        required: true,
    },
    dateOfCreation: {
        type: String,
        required: true,
        validate: [/[0-9][0-9]\.[0-9][0-9]\.[0-9][0-9][0-9][0-9]/, 'Date should be in the correct format.']
    },
    image: {
        type: String,
        required: true,
        validate: [/^https?:\/\/.+/, 'Please provide an image.']
    },
    description: {
        type: String,
        required: true,
        minlength: [8, 'Description should be at least 8 characters long.']
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    votesOnPost: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    ratingOfPost: {
        type: Number,
        default: 0,
    },
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;