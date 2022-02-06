const router = require('express').Router();
const Post = require('../models/Post');

router.get('/all', async (req, res) => {
    let posts = await Post.find({}).lean();

    res.render('all-posts', {posts});
});

router.get('/my', (req, res) => {
    res.render('my-posts')
});

router.get('/create', (req, res) => {
    res.render('create');
})

router.get('/:id', async (req, res) => {
    let postId = req.params.id;
    let post = await Post.findOne({_id: postId});



    res.render('details', {user: req.user, post});
})

module.exports = router;