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

router.get('/details/:id', async (req, res) => {
    let postId = req.params.id;
    let post = await Post.findOne({_id: postId}).lean();
    let votersArray = post.votesOnPost.map(x => x.toString());
    let author = await User.findOne({_id: post.author}).lean();
    let voters = await User.find({_id: {$in: post.votesOnPost}}).lean();
    let votersDisplay = voters.map(x => x.email).join(', ')

    if (req.user) {
        if (post.author.toString() === req.user.id) {
            req.user.isAuthor = true;
        }
    
    
        if (votersArray.includes(req.user.id)) {
            req.user.hasVoted = true;
        }
    }


    return res.render('details', {user: req.user, post, author, voters: votersDisplay});
})

router.use(isAuthenticated);

router.get('/edit/:id', async (req, res) => {
    let post = await Post.findOne({_id: req.params.id}).lean();

    return res.render('edit', {post});
})

router.use('/my-posts', isAuthenticated);
router.use('/create', isAuthenticated);
router.use('/delete', isAuthenticated);



router.post('/edit/:id', async (req, res) => {
    let {title, keyword, location, dateOfCreation, image, description} = req.body;

    try {
        let post = await editPost(req.user._id, title, keyword, location, dateOfCreation, image, description)

        return res.redirect(`/posts/details/${req.params.id}`);

    } catch (error) {
        res.render(`/edit/${req.params.id}`, {error})
    }
})

router.get('/my-posts', async (req, res) => {
    let myPosts = await Post.find({author: req.user._id}).lean();

    res.render('my-posts', {user: req.user, myPosts});
});

router.get('/delete/:id', async (req, res) => {
    await Post.deleteOne({_id: req.params.id});
    return res.redirect('/all')
})

router.get('/create', (req, res) => {
    res.render('create', {user: req.user});
})

router.post('/create', async (req, res) => {
    let {title, keyword, location, dateOfCreation, image, description} = req.body;

    try {
        let post = await createPost(req.user.id, title, keyword, location, dateOfCreation, image, description)

        return res.redirect('/all')

    } catch (error) {
        console.log(error);
       return res.render('create', {user: req.user, error});
    }
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