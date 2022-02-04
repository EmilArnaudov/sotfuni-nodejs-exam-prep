const homeController = require('../controllers/homeController');
const loginController = require('../controllers/authControllers/loginController');
const registerController = require('../controllers/authControllers/registerController');
const postController = require('../controllers/postsController')
const router = require('express').Router();

router.use('/', homeController);
router.use('/login', loginController);
router.use('/register', registerController);
router.use('/posts', postController);

module.exports = router;