

module.exports = (app, gfs) => {
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
}