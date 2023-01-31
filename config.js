// const dotEnv = require("dotenv");
// dotEnv.config();

const config = {
    MONGOdb_ACCESS: process.env.mongoDb,
    TOKEN_SECRET: process.env.token,
    CLIENT_ID: process.env.clientId,
    MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,
    MAILGUN_APIKey: process.env.MAILGUN_APIKey,
    CLIENT_Url: process.env.CLIENT_Url,
    ACTIVATION_TOKEN: process.env.token_activation,
    SESSION_SECRET: process.env.SESSION_SECRET,
    SESSION_MAX_AGE: process.env.SESSION_MAX_AGE,
    PORT: process.env.PORT,
}

module.exports = config;