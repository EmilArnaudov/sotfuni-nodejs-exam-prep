const router = require('express').Router();

router.get('/all', (req, res) => {
    res.render('all-posts');
});

router.get('/my', (req, res) => {
    res.render('my-posts')
});

router.get('/create', (req, res) => {
    res.render('create');
})

router.get('/details/:id', (req, res) => {
    res.render('details');
})

module.exports = router;