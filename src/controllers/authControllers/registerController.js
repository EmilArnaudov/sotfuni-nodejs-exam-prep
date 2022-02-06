const router = require('express').Router();
const auth = require('../../services/authServices');
const {TOKEN_COOKIE_NAME} = require('../../constants');

router.get('/', (req, res) => {
    if (req.user) {
        return res.redirect('/')
    }

    res.render('register');
});

router.post('/', async (req, res) => {
    const { firstName, lastName, email, password, repeatPassword } = req.body;

    try {

        let user = await auth.register(firstName, lastName, email, password, repeatPassword);
        let token = await auth.createToken(user);

        res.cookie(TOKEN_COOKIE_NAME, token, {
            httpOnly: true,
        });

        return res.redirect('/')

    } catch (error) {

        res.render('register', {error: error.message})
    }

})

module.exports = router;