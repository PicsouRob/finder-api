const express = require("express");
const mongoose = require("mongoose");
const Grid = require('gridfs-stream');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');
const flash    = require('connect-flash');

const keys = require('./config/keys');
require('./models/userModel');
require('./models/createModel');
require('./services/passport-setup');

const PORT = process.env.PORT || 8000; 
// initialize the app.........
const app = express();

// mongoose connection....
const conn = mongoose.createConnection(keys.MONGOdb_ACCESS, 
    { useNewUrlParser: true, useUnifiedTopology: true 
});

// Middleware.........
app.use(cors());
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.SESSION_SECRET],
    name: 'user-id',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.json());

Grid.mongo = mongoose.mongo;
let gfs;
conn.once('open', () => {
    console.log(`connected to mongoDb on port ${PORT}`);
    gfs = Grid(conn.db);
    gfs.collection("photos");
});

// Routes...
require('./routes/auth')(app);
require('./routes/stuff')(app);
require('./routes/imageGfsStream')(app, gfs);

// if(process.env.NODE_ENV === 'production') {
//     // Express will serve up production assets
//     // Like our main.js file, or main.css file!

//     app.use(express.static('client/build'));

//     // Express will serve the index.html file
//     // if it doesn't recognize the route
//     const path = require('path');
//     app.get("/", (req, res) => res.type('html').send(path.resolve(__dirname, 'client', 'build', 'index.html')));
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
// }

// const path = require('path');
// app.use(express.static('client/build'));
app.get("/", (req, res) => res.send({  }));

app.get('/userProfil/:filename', async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    } catch (error) {
        console.log("Not found");
        console.log(error);
    }
});

app.listen(PORT, () => console.log("Server runing up"));