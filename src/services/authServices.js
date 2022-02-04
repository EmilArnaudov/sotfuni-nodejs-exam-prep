const User = require('../models/User');

async function register(firstName, lastName, email, password, repeatPassword) {
    if (!password === repeatPassword) {
        throw new Error('Passwords must match.');
    };

    let user = new User({firstName, lastName, email, password});

    await user.save()
}

module.exports = {
    register,
}