const router = require('express').Router();
const {TOKEN_COOKIE_NAME} = require('../../constants')

router.get('/', (req, res) => {
    if (req.user) {
        res.clearCookie(TOKEN_COOKIE_NAME);
    }
    
    return res.redirect('/login');
})

module.exports = router;