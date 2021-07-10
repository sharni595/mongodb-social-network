const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    thoughts: [],
    friends: []
});


UserSchema.virtual('friendCount').get(function() {
    return this.replies.length;
});

const User = ('User', UserSchema);

module.exports = User;