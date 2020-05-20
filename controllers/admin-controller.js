const companyRegisterModel = require('../models/company');
const jobsModel = require('../models/job');
const studentModel = require('../models/student');
const addressModel = require('../models/address').Model;
const enrolledStudentModel = require('../models/enrolled-student');
const adminModel = require('../models/admin');

exports.getAdminDash = async (req,res,next)=>{
    const jobDetail = await jobsModel.find().limit(3);
    const companylDetail = await companyRegisterModel.find().limit(3);
    const companyCount = await companyRegisterModel.find();
    const studentCount = await studentModel.find();
    const jobCount = await jobsModel.find();
    const pendingStudents = await studentModel.find({status:-1}).limit(3);
    res.render('admin/adminHome',{
        pendingStud: pendingStudents,
        jobsCount: jobCount.length,
        studentsCount: studentCount.length,
        companiesCount: companyCount.length,
        companyData : companylDetail,
        pageTitle: 'Home',
        adminEmail: req.session.adminData.name
    });
}

exports.getSignOutAdmin = async (req,res,next)=>{
    console.log('msg')
    req.session.destroy();
    res.redirect('/');
}

//---------------------------------------------Mayank Part-----------------------------------------

exports.getPendingCompany = (req,res,next)=>{
    companyRegisterModel.find({status:-1}).then(companies=>{
        res.render('admin/pendingcompanyList',{  companies:companies,pageTitle:'Pending Compnies',adminEmail:req.session.adminData.name});
    });
}
exports.getViewandAcceptCompany = (req,res,next)=>{
    companyRegisterModel.findOne({_id:req.params.company}).then(company=>{
        res.render('admin/acceptCompany',{company:company,pageTitle:'accept company',adminEmail:req.session.adminData.name});
    });
}
exports.getDeleteCompany = (req,res,next)=>{
    companyRegisterModel.findByIdAndDelete({_id:req.params.company}).then(
        res.redirect('/pendingCompanyList')
    );
}
exports.getAcceptCompany = (req,res,next)=>{
    companyRegisterModel.findByIdAndUpdate({_id:req.params.company},{$set: { status:0 }}).then(
        res.redirect('/pendingCompanyList')
    );
}
exports.getAdminReports = (req,res,next)=>{
    
    let searchTerm = req.query.search;
    if (req.query.search) {
        companyRegisterModel.find({$and:[{'name': {'$regex': searchTerm,'$options': 'i'}},{status:0}]}).limit(5).then(companies => {    
            res.render('admin/adminReports', {
                companies: companies,
                pageTitle: 'Reports',
                adminEmail: req.session.adminData.name
            });
        }).catch(err => {
            console.log(err);
        })
    } else {
        companyRegisterModel.find({status:0}).then(companies=>{
              res.render('admin/adminReports',{companies:companies,pageTitle: 'Reports',
              adminEmail: req.session.adminData.name});
            });
    }
}


exports.getViewReportCompany = (req,res,next)=>{
    jobsModel.find({companyId: req.params.company}).populate('companyId').exec((err, company) => {
        res.render('admin/viewCompanyReport',{company:company,pageTitle: 'Reports',
        adminEmail: req.session.adminData.name});
      });

}
exports.getjobReportCompany =  async (req,res,next)=>{
    
    const jobDetails = await jobsModel.findOne({_id:req.params.jobs});
    const enrollDetail = await enrolledStudentModel.find({jobID:req.params.jobs}).populate('studentID');
    res.render('admin/viewJobReport',{jobDetails:jobDetails,enrollDetail:enrollDetail,pageTitle: 'View job', adminEmail: req.session.adminData.name});
    
}
exports.getpendingstudentList = (req,res,next)=>{
    studentModel.find({status:-1}).then(Students=>{
        res.render('admin/pendingStudentList',{  Students:Students,pageTitle: 'Pending Students',
        adminEmail: req.session.adminData.name});
    });
}
exports.getViewandAcceptStudent = (req,res,next)=>{
    studentModel.findOne({_id:req.params.student}).then(Students=>{
        res.render('admin/acceptStudent',{Students:Students,pageTitle:'accept student',adminEmail:req.session.adminData.name});
    });
}
exports.getDeleteStudent = (req,res,next)=>{
    studentModel.findByIdAndDelete({_id:req.params.student}).then(
        res.redirect('/pendingstudentList')
    );
}
exports.getAcceptStudent = (req,res,next)=>{
    studentModel.findByIdAndUpdate({_id:req.params.student},{$set: { status:0 }}).then(
        res.redirect('/pendingstudentList')
    );
}
exports.getDasboardPage = (req,res,next)=>{
    res.render('admin/dashboard')
}

exports.getAdminProfile = (req,res,next)=>{
    adminModel.findById(req.session.adminData._id).then(admin=>{
        res.render('admin/adminProfile',{admin:admin,pageTitle:'admin profile',adminEmail:admin.name});
    });
}