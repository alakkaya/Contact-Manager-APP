const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    note: {
        type: String,
        trim: true,
        default: "Add note"
    },
    phoneNumber: { //ülke kodu ile girilmeli +905380369169
        type: String,
        required: true,
        match: /^\+?[1-9]\d{1,14}$/
    },
    birthdate: {
        type: Date
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    }
}, { collection: "Contact", timestamps: true })

const contact = mongoose.model("Contact", contactSchema)

module.exports = contact