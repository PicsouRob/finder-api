// keys.js figure out what set of credentials to return
if(process.env.NODE_ENV === 'production') {
    // We are in production - return set of dev keys
    module.exports = require('./prod');
} else {
    // We are in development - return set of dev keys
    module.exports = require('./dev');
}