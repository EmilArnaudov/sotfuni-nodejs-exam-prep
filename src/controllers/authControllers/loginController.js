const router = require('express').Router();
const auth = require('../../services/authServices');
const {TOKEN_COOKIE_NAME} = require('../../constants');

router.get('/', (req, res) => {
    if (req.user) {
        return res.redirect('/')
    }

    res.render('login');
})

router.post('/', async (req, res) => {
    const {email, password} = req.body;

    try {
        if (!email && !password) {
            throw new Error('Username or password incorrect.')
        }

        let user = await auth.login(email, password);
        let token = await auth.createToken(user);

        res.cookie(TOKEN_COOKIE_NAME, token, {
            httpOnly: true,
        })

        return res.redirect('/');
        
    } catch (error) {
        return res.render('login', {error: error.message})
    }
})

module.exports = router;