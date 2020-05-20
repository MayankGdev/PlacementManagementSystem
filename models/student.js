const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({

    rollNo: {
        type: String,
        require: true
    }, 
    name: {
        type: String,
        require: true
    }, 
    email: {
        type: String,
        require: true
    },
    gender: {
        type: Boolean,
        required: true
    },
    phoneNo: {
        type: String,
        require: true
    }, 
    course: {
        type: String,
        require: true
    }, 
    sem: {
        type: Number,
        require: true
    }, 
    Password: {
        type: String,
        require: true
    }, 
	joinedOn: {
        type: Date,
        default: Date.now
    }, 
    status: {
        type: Number,
        require: true
    }
});

module.exports= mongoose.model('student', StudentSchema);