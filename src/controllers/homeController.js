const router = require('express').Router();

router.get('/', (req, res) => {
    let user = req.user;
    res.render('home', {user});
})

module.exports = router;