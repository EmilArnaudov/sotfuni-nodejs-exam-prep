const router = require('express').Router();
const auth = require('../../services/authServices');

router.get('/', (req, res) => {
    res.render('register');
});

router.post('/', async (req, res) => {
    console.log(req.body);
    const { firstName, lastName, email, password, repeatPassword } = req.body;
    console.log(firstName, lastName, email, password, repeatPassword);

    try {

        await auth.register(firstName, lastName, email, password, repeatPassword);
        return res.redirect('/login')

    } catch (error) {

        console.log(error.message);
        res.render('register', {error: error.message})

    }

})

module.exports = router;