const mongoose = require('mongoose');

// Schema for user account
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    displayName: {
        type: String,
        required: false,
    }
})

// Export mongoose model to allow for interaction with DB
module.exports = User = mongoose.model("user", userSchema)
