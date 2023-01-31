const { searchThings, getAllStuff, getOneStuff, getOneUserStuff,
    updateThing, deleteThing, addStuff
} = require('../controllers/stuffController')
const upload = require('../middleware/upload');
const requestLogin = require('../middlewares/requestLogin');

module.exports = (app) => {
    app.post('/api/user/add-stuff', requestLogin, upload.array('images'), addStuff);
    app.get('/api/stuff', getAllStuff);
    app.get('/api/search-stuff/:value/:location', searchThings);
    // app.get('/api/stuff/:id', getOneStuff);
    app.get('/api/user/stuff/:id', getOneUserStuff);
    app.put('/api/user/update-stuff/:id', requestLogin, upload.array('images'), updateThing);
    app.delete('/api/user/delete-stuff/:id', requestLogin, deleteThing);
};