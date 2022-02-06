const User = require('../models/User');
const bcrypt = require('bcrypt');
const {SECRET} = require('../constants');
const { jwtSign } = require('../utils/jwtUtils');

async function register(firstName, lastName, email, password, repeatPassword) {
    if (!password === repeatPassword) {
        throw new Error('Passwords must match.');
    };

    let user = new User({firstName, lastName, email, password});

    return user.save()
}

async function login(email, password) {
    let user = await User.findOne({email: email}).lean();

    let passwordCorrect = await bcrypt.compare(password, user.password);

    if (passwordCorrect) {
        return user;
    } else {
        throw new Error('Email or password incorrect.')
    }

}

async function createToken(user) {
    let payload = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    }

    return jwtSign(payload, SECRET);
} 

module.exports = {
    register,
    login,
    createToken,
}