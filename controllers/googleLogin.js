// const { OAuth2Client } = require('google-auth-library');
// const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require("bcrypt");

const config = require('../config');

const googleLogin = async (req, res, next) => {
    // const client = new OAuth2Client(config.CLIENT_ID);
    // const { tokenId, location, description, instagram, website, facebook, phone } = req.body;
    // const userInfo = await client.verifyIdToken({ idToken: tokenId, audience: config.CLIENT_ID });
    // const { name, email_verified, picture, email } = userInfo.payload;
    // if(email_verified) {
    //     const token = jwt.sign({ email, name }, config.TOKEN_SECRET);
        
    //     const user = await User.findOne({ email });
    //     if(user) {
    //         return res.json({ user, token, isLogged: true });
    //     }

    //     const salt = await bcrypt.genSalt(10);
    //     const hashedPassword = await bcrypt.hash(email+config.TOKEN_SECRET, salt);

    //     const newUser = new User({
    //         name, email,
    //         password: hashedPassword,
    //         image: picture, description, instagram, website, 
    //         facebook, phone, location
    //     });

    //     res.header('auth-token', token);

    //     await newUser.save();
    //     res.json({ user: newUser, token, isLogged: true });
    // } else {
    //     return res.json({ error: "Quelque chose s'est mal passé" });
    // }
}

module.exports.googleLogin = googleLogin;