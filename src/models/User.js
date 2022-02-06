const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [3, 'First name length must be at least 3 characters'],
        validate: [/[a-z]+/, 'First name can include only english letters.']
    },

    lastName: {
        type: String,
        required: true,
        minlength: [3, 'First name length must be at least 3 characters'],
        validate: [/[a-z]+/, 'First name can include only english letters.']
    },

    email: {
        type: String,
        required: true,
        validate: [/^[a-z]+@[a-z]+\.[a-z]+$/, 'Please enter a valid email.']
    },

    password: {
        type: String,
        require: true,
        minlength: [4, 'Password should be at least 4 characters.']
    },

    myPosts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Post',
    }]
})

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then((hashedPassword) => {
            this.password = hashedPassword;

            next();
        })
})

const User = mongoose.model('User', userSchema);



module.exports = User;