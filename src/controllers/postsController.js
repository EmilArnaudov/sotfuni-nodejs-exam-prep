const router = require('express').Router();
const Post = require('../models/Post');
const { isAuthenticated } = require('../middleware/authMiddleware');
const { createPost } = require('../services/postServices');
const { editPost } = require('../services/postServices');

router.get('/all', async (req, res) => {
    let posts = await Post.find({}).lean();

    res.render('all-posts', {user: req.user, posts});
});

router.use('/my-posts', isAuthenticated);
router.use('/create', isAuthenticated);
router.use('/delete', isAuthenticated);
router.use('/edit', isAuthenticated);

router.get('/edit/:id', async (req, res) => {
    let post = await Post.findOne({_id: req.params.id}).lean();

    return res.render('edit', {post});
})

router.post('/edit/:id', async (req, res) => {
    let {title, keyword, location, dateOfCreation, image, description} = req.body;

    try {
        let post = await editPost(req.user._id, title, keyword, location, dateOfCreation, image, description)

        return res.redirect('/posts/all');

    } catch (error) {
        console.log(error);
    }
})

router.get('/my-posts', async (req, res) => {
    let myPosts = await Post.find({author: req.user._id}).lean();

    res.render('my-posts', {user: req.user, myPosts});
});

router.get('/delete/:id', async (req, res) => {
    await Post.deleteOne({_id: req.params.id});
    return res.redirect('/')
})

router.get('/create', (req, res) => {
    res.render('create', {user: req.user});
})

router.post('/create', async (req, res) => {
    let {title, keyword, location, dateOfCreation, image, description} = req.body;

    try {
        let post = await createPost(req.user._id, title, keyword, location, dateOfCreation, image, description)

        return res.redirect('/')

    } catch (error) {
        console.log(error);
    }
})

router.use('/details/:id', isAuthenticated)

router.get('/details/:id', async (req, res) => {
    let postId = req.params.id;
    let post = await Post.findOne({_id: postId}).lean();

    if (post.author === req.user._id) {
        req.user.isAuthor = true;
    }

    if (post.votesOnPost.includes(req.user._id)) {
        req.user.hasVoted = true;
    }


    return res.render('details', {user: req.user, post});
})

module.exports = router;