const router = require('express').Router();
const Post = require('../models/Post');
const { isAuthenticated } = require('../middleware/authMiddleware');
const { createPost, upvotePost, downvotePost } = require('../services/postServices');
const { editPost } = require('../services/postServices');
const User = require('../models/User');

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
        let post = await createPost(req.user.id, title, keyword, location, dateOfCreation, image, description)

        return res.redirect('/')

    } catch (error) {
        console.log(error);
    }
})

router.use('/details/:id', isAuthenticated)

router.get('/details/:id', async (req, res) => {
    let postId = req.params.id;
    let post = await Post.findOne({_id: postId}).lean();
    let votersArray = post.votesOnPost.map(x => x.toString());
    let author = await User.findOne({_id: post.author}).lean();
    let voters = await User.find({_id: {$in: post.votesOnPost}}).lean();


    if (post.author.toString() === req.user.id) {
        req.user.isAuthor = true;
    }

    console.log(post.votesOnPost);

    if (votersArray.includes(req.user.id)) {
        req.user.hasVoted = true;
    }


    return res.render('details', {user: req.user, post, author, voters});
})

router.get('/details/:id/vote-up', async (req, res) => {
    try {
        let result = await upvotePost(req.params.id, req.user.id);
        return res.redirect(`/posts//details/${req.params.id}`)      
    } catch (error) {
        console.log(error.message);
    }
    
})

router.get('/details/:id/vote-down', async (req, res) => {
    try {
        let result = await downvotePost(req.params.id, req.user.id);
        return res.redirect(`/posts/details/${req.params.id}`) 
    } catch (error) {
        console.log(error.message);
    }
    
})

module.exports = router;