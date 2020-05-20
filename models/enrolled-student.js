const mongoose = require('mongoose');

const EnrolledStudentSchema = new mongoose.Schema({

    studentID: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: "student"
    }, 
    jobID: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: "jobs"
    }, 
    selected: {
        type: Boolean,
        default: false
    }, 
    appliedOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('enrolledStudents', EnrolledStudentSchema);