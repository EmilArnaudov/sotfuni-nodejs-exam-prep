const User = require('../models/User');
const bcrypt = require('bcrypt');
const constants = require('../constants');
const { jwtSign } = require('../utils/jwtUtils');

async function register(firstName, lastName, email, password, repeatPassword) {
    if (!password === repeatPassword) {
        throw new Error('Passwords must match.');
    };

    let user = new User({firstName, lastName, email, password});

    await user.save()
}

async function login(email, password) {
    let hashedPassword = await bcrypt.hash(password, 10);
    let user = User.find({email: email, password: hashedPassword});

    if (!user) {
        throw new Error('Email or password incorrect.')
    }
    
    return user;
}

async function createToken(user) {
    let payload = {
        _id: user._id,
        email: user.email,
    }

    return jwtSign(payload, constants.SECRET);
} 

module.exports = {
    register,
    login,
    createToken,
}