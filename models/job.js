const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({

    title: {
        type: String,
        require: true
    }, 
    companyId: {
        type: mongoose.Types.ObjectId,
        ref: 'company',
        required: true
    },
    description: {
        type: String,
        require: true
    }, 
    type: {
        type: String,
        require: true
    }, 
    salary: {
        type: String,
        require: true
    }, 
    experience: {
        type: String,
        require: true
    }, 
    postedOn: {
        type: Date,
        default: Date.now
    }, 
    applyBy: {
        type: Date,
        required: false
    },
	interviewDate: {
        type: Date,
        required: false
    }
});

module.exports = mongoose.model('jobs', JobSchema);