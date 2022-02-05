const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        require: true,
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