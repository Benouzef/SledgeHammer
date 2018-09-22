const express = require('express')
const router = express.Router()
const Customer = require('./models/Customer')

router.get('/customers/', function (req, res) {
        Customer.find({}, function(err, customers) {
            if (err) res.send(err)
            res.json(customers);
        })
    }
);

router.get('/customers/:name/', function (req, res) {
    Customer.find({name: req.params.name}, function(err, customers) {
        if (err) res.send(err)
        res.json(customers);
    })
}

);

module.exports = router;