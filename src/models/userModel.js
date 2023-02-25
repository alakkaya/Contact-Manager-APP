const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the user name !"]
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
        type: String,
        required: [true, "Please add the user password"]
    }
}, { collection: "myusers", timestamps: true })



const User = mongoose.model("myusers", userSchema)

module.exports = User