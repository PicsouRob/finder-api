const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: String,
    resetLink: { type: String, default: "" },
    date: { type: Date, default: Date.now },
    image: { type: String, default: "" },
    facebook: { type: String, default: "" },
    instagram: { type: String, default: "" },
    phone: { type: Number, min: 8, defaault: "" },
    description: { type: String, default: "" },
    website: { type: String, default: "" },
    location: { type: String, default: "" },
});

module.exports = mongoose.model("User", userSchema);