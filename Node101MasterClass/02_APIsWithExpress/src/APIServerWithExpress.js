const express = require('express')
const app = express()
const port = 3000
const router = require('../mock-api/endpoints');

app.use(router);
app.get('/', (req, res) => res.send('Encore... Hello World!'))



app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app; // for testing purposes