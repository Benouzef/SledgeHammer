var mongoose = require('mongoose')
var Schema = mongoose.Schema

var customerSchema = new Schema(
    {
        id: Number,
        name: String,
        email: String,
        phone: String
    }
)

module.exports = mongoose.model('Customer', customerSchema, 'Customers')