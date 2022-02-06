const Post = require('../models/Post');

async function createPost(author, title, keyword, location, dateOfCreation, image, description) {
    let post = new Post({title: title, keyword: keyword, location: location, dateOfCreation: dateOfCreation, image: image, description: description, author: author});

    return post.save();
}


module.exports = {
    createPost,
}