const mongoose = require('mongoose');

const AddressSchema = require('./address').Schema;

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    }, 
    logo: {
        type: String,
        require: false
    }, 
    address: {
        type: AddressSchema,
        require: true
    }, 
    email: {
        type: String,
        require: true
    }, 
    phone: {
        type: String,
        require: true
    }, 
    password: {
        type: String,
        require: true
    }, 
    status: {
        type: Number,
        require: true
    }, 
    requestedOn: {
        type: Date,
        default: Date.now
    }, 
    approvedOn: {
        type: Date,
        required: false
    }
});

module.exports = mongoose.model('company', CompanySchema);