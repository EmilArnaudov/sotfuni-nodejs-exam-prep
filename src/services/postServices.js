const Post = require('../models/Post');

async function createPost(author, title, keyword, location, dateOfCreation, image, description) {
    let post = new Post({title: title, keyword: keyword, location: location, dateOfCreation: dateOfCreation, image: image, description: description, author: author});

    return post.save();
}

async function editPost(author, title, keyword, location, dateOfCreation, image, description) {
    let post = await Post.updateMany({author: author}, {title: title, keyword: keyword, location: location, dateOfCreation: dateOfCreation, image: image, description: description, author: author});

    return post;
}

function upvotePost(postId, userId) {
    return Post.findOneAndUpdate({_id: postId}, {$push: {votesOnPost: userId}, $inc: {ratingOfPost: 1}});
}

function downvotePost(postId, userId) {
    return Post.findOneAndUpdate({_id: postId}, {$push: {votesOnPost: userId}, $inc: {ratingOfPost: -1}});
}

module.exports = {
    createPost,
    editPost,
    upvotePost,
    downvotePost,
}