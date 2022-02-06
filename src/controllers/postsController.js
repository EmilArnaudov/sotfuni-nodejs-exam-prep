const router = require('express').Router();
const Post = require('../models/Post');
const { isAuthenticated } = require('../middleware/authMiddleware');
const { createPost } = require('../services/postServices');

router.get('/all', async (req, res) => {
    let posts = await Post.find({}).lean();

    res.render('all-posts', {user: req.user, posts});
});

router.use('/my-posts', isAuthenticated);
router.use('/create', isAuthenticated);


router.get('/my-posts', async (req, res) => {
    let myPosts = await Post.find({author: req.user._id}).lean();

    res.render('my-posts', {user: req.user, myPosts});
});

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



    res.render('details', {user: req.user, post});
})

module.exports = router;