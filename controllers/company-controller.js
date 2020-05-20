const companyRegisterModel = require('../models/company');
const addressModel = require('../models/address').Model;
const jobModel = require('../models/job');
const enrollModel = require('../models/enrolled-student');
const date = require('../public/date');

exports.getDashboard = async (req,res,next) =>{
    const jobDetail = await jobModel.find({companyId:req.session.comp._id}).populate('companyId');
    const upcomingJob = await jobModel.find({ $and: [{companyId:req.session.comp._id}, {applyBy : {$gte : new Date()}}]});
    const enrollDetail = await enrollModel.find().populate('studentID').populate('jobID').limit(3);
    res.render('company/compHome',{
      jobs: jobDetail,
      enroll : enrollDetail,
      jobCount: jobDetail.length,
      upcomingJobs: upcomingJob,
      upcomingJobCount: upcomingJob.length,
      studentCount: enrollDetail.length,
      pageTitle: 'Home',
      compEmail : req.session.comp.email,
      compId: req.session.comp._id
    });
    
  }
  
  exports.getCreateJob = (req,res,next) =>{
    res.render('company/createJob',{
      pageTitle: 'Create Job',
      compEmail: req.session.comp.email
    });
  }
  
  exports.getJobData = (req,res,next) =>{
      jobModel.findById({_id:'5e4546cacaaf492b2079ca02'}).populate('company').then(jobDetails =>{
        res.render('company-views/jobDetails',{
           jobInfo: jobDetails
        });
        
      }).catch(err =>{
          console.log(err);
      })
  }
  
  exports.postJobData = (req,res,next) =>{
      const job = new jobModel({
          companyId: req.session.comp._id,
          title: req.body.tb_title,
          description: req.body.tb_description,
          type: req.body.jobType,
          salary: req.body.tb_salary,
          experience: req.body.tb_experience,
          postedOn: date.getDate(),
          applyBy: req.body.date_applyBy,
          interviewDate: req.body.date_interview
      });
      job.save().then(result=>{
          console.log(result);
          res.redirect("/");
        }).catch(err=>{
          console.log(err);
          console.log('error in a')
        })
  }

  exports.getSignOutCompany = async (req,res,next)=>{
    console.log('msg')
    req.session.destroy();
    res.redirect('/');
}

// -------------------------------Mayank Part-------------------------------------

exports.getCompanyRegister = (req,res,next) =>{
  res.render('company/companyRegister');
}

exports.postCompanyRegister = (req,res,next) =>{
  const Address = new addressModel({
      addressLineOne:req.body.address1,
      addressLineTwo:req.body.address2,
      landmark:req.body.landmark,
      city:req.body.city,
      state:req.body.state,
      pincode:req.body.pincode
  });
  const Company = new companyRegisterModel({
      name:req.body.name,
      email:req.body.email,
      phone:req.body.Phone,
      password:req.body.password,
      status:-1,
      
      address:Address
  });
  Company.save();
  res.redirect('/company/login');
}
exports.getCompanyReports = (req,res,next)=>{
  jobModel.find({companyId:req.session.comp._id}).populate('companyId').exec((err, company) => {
    res.render('company/companyreport',{company:company,pageTitle: 'Reports',compEmail: req.session.comp.email});
  });
}
exports.getCompanyProfile = (req,res,next)=>{
  companyRegisterModel.findOne({_id:req.session.comp._id}).then(company=>{
    res.render('company/CompProfile',{company:company,pageTitle: 'Profile'});
  });
}

exports.getjobReportCompany =  async (req,res,next)=>{
    
  const jobDetails = await jobModel.findOne({_id:req.params.jobs});
  const enrollDetail = await enrollModel.find({jobID:req.params.jobs}).populate('studentID');
  
  res.render('company/companyjobreport',{jobDetails:jobDetails,enrollDetail:enrollDetail,pageTitle:'Job report',compEmail: req.session.comp.email});
  
}

