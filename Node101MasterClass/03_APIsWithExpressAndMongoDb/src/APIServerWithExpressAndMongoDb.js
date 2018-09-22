const express = require('express')
const app = express()
const port = 3000
//const router = require('../mock-api/endpoints');
const router = require('./routes');
var mongoose = require('mongoose');

mongoose.connect('mongodb://benoit%40skillvalue:sk1llvalue@ds111623.mlab.com:11623/skillvalue', function(err) {
    if (err) console.log(err);

    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    app.use(router);
    app.get('/', (req, res) => res.send('Encore... Hello World!'))



    app.listen(port, () => console.log(`Example app listening on port ${port}!`))

});


module.exports = app; // for testing purposes