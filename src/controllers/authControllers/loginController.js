const router = require('express').Router();
const auth = require('../../services/authServices');
const constants = require('../../constants');

router.get('/', (req, res) => {
    res.render('login');
})

router.post('/', async (req, res) => {
    const {email, password} = req.body;

    try {
        let user = await auth.login(email, password);
        let token = await auth.createToken(user);

        res.cookie(constants.TOKEN_COOKIE_NAME, token, {
            httpOnly: true,
        })

        return res.redirect('/');
        
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;