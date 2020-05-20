const studentModel = require('../models/student'); 
const enrolledStudentModel = require('../models/enrolled-student');
const jobsModel = require('../models/job');
const date = require('../public/date');
const student_id="5e45704dbace1115c0aea1eb";

exports.getStudentDash = async (req,res,next) =>{
    const jobDetail = await jobsModel.find().limit(3);
    const enrollDetail = await enrolledStudentModel.find({studentID:req.session.student._id}).populate('jobID').limit(3);
    res.render('student/studentHome',{
        jobs: jobDetail,
        enroll : enrollDetail,
        studentName: req.session.student,
        pageTitle: 'Home'
    });
}

exports.getUpcomingJobs = (req,res,next) =>{
    jobsModel.find({applyBy : {$gte : new Date()}}).then(jobs=>{
        res.render('student/upcomingJobs',{jobs:jobs,studentName: req.session.student.name,pageTitle: 'Upcoming Jobs'});
    });
}

exports.getJobData = (req,res,next) =>{
    req.session.jobId = req.params.jobID;
    jobsModel.findById({_id:req.session.jobId}).populate('company').then(jobDetails =>{
      res.render('student/jobView',{
         jobInfo: jobDetails,
         pageTitle: 'Job View',
         studentName: req.session.student.name
      });
      
    }).catch(err =>{
        console.log(err);
    })
}
  
exports.getEnrollData = (req,res,next) =>{
    console.log(req.session.jobId);
    
    jobsModel.findById({_id:req.session.jobId}).then(jobDetails =>{
        const enroll = new enrolledStudentModel({
          studentID: req.session.student._id,
          jobID: jobDetails._id,
          selected: false,
          appliedOn: date.getDate()
        })
        enroll.save();
        console.log(req.session.student)
        res.redirect("/joblist");
      }).catch(err =>{
        console.log(err);
      })
    }

    exports.getSignOutStudent = async (req,res,next)=>{
        console.log('msg')
        req.session.destroy();
        res.redirect('/');
    }

// --------------------------------Mayank Part-----------------------------------



exports.getStudentPlacementHistory = (req,res,next)=>{
    
    enrolledStudentModel.find({studentID: student_id}).populate('jobID').then(enrollDetail =>{
        res.render('student/placementHistory',{
                 enrollDetail:enrollDetail,
                 studentName: req.session.student.name,
                 pageTitle: 'Placement History'
             });
    });
}
exports.getStudentRegister = (req,res,next)=>{
    res.render('student/studentRegistration');
}
exports.postStudentRegister = (req,res,next)=>{
       
            const Student = new studentModel({
                rollNo:req.body.Rollno,
                name:req.body.name,
                email:req.body.email,
                phoneNo:req.body.Phone,
                course:req.body.Course,
                sem:req.body.Semester,
                gender:req.body.gender,
                Password:req.body.password,
                status:-1,
            
            });
            Student.save();
            res.redirect('/student/login'); 
}

exports.getjobList = (req,res,next)=>{
    jobsModel.find().then(jobs=>{
        res.render('student/jobList',{jobs:jobs,studentName: req.session.student.name,pageTitle: 'Joblist'});
    });
}
exports.gethomepage = (req,res,next)=>{
    res.render('student/home');
}
exports.getdashboard = (req,res,next)=>{
    res.render('student/dashboard');
}
exports.getStudProfile = (req,res,next)=>{
    studentModel.findOne({_id:"5e45704dbace1115c0aea1eb"}).then(student=>{
      res.render('student/studentProfile',{student:student,pageTitle:'Profile'});
    });
  }
  