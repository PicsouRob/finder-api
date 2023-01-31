const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Localstrategy = require('passport-local').Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const keys = require('../config/keys');
const User = mongoose.model('User');

passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user, err) => {
        return done(err, user);
    })
});

passport.use(new GoogleStrategy({
    clientID: keys.CLIENT_ID,
    clientSecret: keys.CLIENT_SECRET,
    callbackURL: keys.CALLBACK_URL,
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {
    const { displayName, emails } = profile;
    User.findOne({ email: emails[0].value }).then((user, err) => {
        if(user) {
            return done(err, user);
        } else {
            new User({ name: displayName, email: emails[0].value,
                password: emails[0].value
            }).save().then((newUser, error) => {
                return done(error, newUser);
            });
        }
    });
}));

passport.use('local', new Localstrategy({
    passwordField: "password",
    usernameField: 'email',
    passReqToCallback: true
}, async (req, email, password, done) => {
    User.findOne({ email }).then(async (user, err) => {
        try {
            if(!user) { 
                return done(null, false, req.flash("message", 
                    "Cette utilisateur n'existe pas."
                ));
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if(!passwordCompare) { 
                return done(null, false, req.flash("message", "Mot de passe incorrect.")); 
            }
    
            return done(err, user);
        } catch (error) {
            done(error);
        }
    });
}));

passport.use('local-signup', new Localstrategy({
    passwordField: "password",
    usernameField: 'email',
    passReqToCallback: true
}, async (req, email, password, done) => {
    User.findOne({ email }).then(async (user, err) => {
        try {
            if(user) { 
                done(null, false, req.flash('message', 'Cet utilisateur existe déjà.' ));
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            new User({ name: req.body.name, 
                email: email, password: hashedPassword }).save()
            .then(async (newUser, err) => {
                return done(err, newUser);
            });
        } catch(error) {
            done(error);
        }
    });
}));