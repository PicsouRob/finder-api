// const jwt = require("jsonwebtoken");
const config = require('../config');

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send("Accès refusé");

    try {
        const verified = jwt.verify(token, config.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch(err) {
        res.status(400).send("Accès invalide");
    }
}