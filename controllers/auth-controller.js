const nodemailer = require('nodemailer');

const Admin = require('../models/admin');
const Company = require('../models/company');
const Student = require('../models/student');


exports.logOut = (req, res, next) =>{
    req.session.destroy();
}


/** Student Controllers are bellow **/

exports.getStudentForgot = (req, res, next) =>{
    const error = req.flash('adminResetError')[0];
    console.log(error);

    res.render('auth/forgot-password', {
        pageTitle: "Student Forgot Password",
        isError: error,
        loginLink: "/student/login",
        formPath: "/student/forgot"
    });
}

exports.getStudentPasswordReset = (req, res, next) =>{
    const resetID = req.params.resetID;
    const error = req.flash('adminLoginError')[0];

    Admin.findById(resetID).select("status").then(admin =>{
        if (admin.status === 1){
            return res.render('auth/reset-password', {
                pageTitle: "Student Password Reset",
                isError: error,
                path: "/student-reset/" + resetID
            });
        } else {
            return res.status(404).send('Page not found');
        }
    }).catch(err => console.log(err));
}

exports.getStudentLogin = (req, res, next) =>{
    const error = req.flash('adminLoginError')[0];
    const reset = req.flash('resetSuccess')[0];

    console.log(error);

    res.render('auth/login', {
        pageTitle: "Student Login",
        isError: error,
        formPath: "/student/login",
        reset: reset,
        forgetLink: "/student/forgot"
    });
}

exports.postStudentLogin = (req, res, next) => {

    Student.findOne({ email: req.body.email }).then(stud => {
        if (stud) {
            console.log(stud);

            if (req.body.password === stud.Password) {
                if (stud.status === 0) {
                    req.flash('adminLoginError', 'Successfull login');
                    req.session.student = stud;
                    return res.redirect('/StudentDash');// -> update to dashboard
                } else {
                    req.flash('adminLoginError', 'Password Reset request not completed');
                    return res.redirect('/');
                }
            } else {
                req.flash('adminLoginError', 'Email or Password INCORRECT');
                return res.redirect('/student/login');
            }
        } else {
            req.flash('adminLoginError', 'Email or Password INCORRECT');
            return res.redirect('/student/login');
        }
    }).catch(err => {
        console.log(err);
        req.flash('adminLoginError', 'Email or Password INCORRECT');
    });
}

exports.postStudentForgot = (req, res, next) => {

    Student.findOne({ email: req.body.email }).select('status').then(stud => {
        console.log('Company:', stud);
        if (stud) {
            stud.status = 1
            return stud.save();
        } else {
            req.flash('adminResetError', 'Email NOT FOUND');
            return res.redirect('/student/forgot');
        }
    }).then(async result => {
        console.log('Result:', result);
        const resetLink = '<a href="http://localhost:3000/company-reset/' + result._id + '" target="_blank">Reset Password link</a>';
        console.log('Reset Link: ', resetLink);

        let transporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "placementproject789@gmail.com", // generated ethereal user
                pass: "sahilraja" // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const body = `
            <h1>Placement Management System</h1>
            <p>Use the link below to reset the password:-</p>` + resetLink;

        let info = await transporter.sendMail({
            from: '"Placement Project" <placementproject789@gmail.com>', // sender address
            to: req.body.email, // list of receivers
            subject: "Password Reset Request", // Subject line
            html: body
        });

        req.flash('resetSuccess', 'Check your email for reset link(check span too).');
        return res.redirect('/student/login');
    }).catch(err => {
        console.log(err);
        req.flash('adminResetError', 'NETWORK ERROR');
        return res.redirect('/student/forgot');
    });

}

exports.postStudentPasswordReset = (req, res, next) =>{
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const resetID = req.params.resetID;

    Student.findById(resetID).select('status password').then(stud =>{
        if (stud.status === 1){
            if (password === confirmPassword){
                stud.status = 0;
                stud.password = password;
                return stud.save();
            } else {
                req.flash('adminLoginError', 'Password did not match');
                return res.redirect("/student-reset/" + resetID);
            }
        } else {
            return res.status(404).send('Page not found');
        }
    }).then(result =>{
        req.flash('resetSuccess', 'Please try logging in with new password');
        return res.redirect('/student/login');
    }).catch(err => console.log(err));
}





/** Admin Controllers are bwlow **/

exports.getCompanyLogin = (req, res, next) =>{
    const error = req.flash('adminLoginError')[0];
    const reset = req.flash('resetSuccess')[0];

    console.log(error);

    res.render('auth/login', {
        pageTitle: "Company Login",
        isError: error,
        formPath: "/company/login",
        reset: reset,
        forgetLink: "/company/forgot"
    });
}

exports.getCompanyForgot = (req, res, next) =>{
    const error = req.flash('adminResetError')[0];
    console.log(error);

    res.render('auth/forgot-password', {
        pageTitle: "Company Forgot Password",
        isError: error,
        loginLink: "/company/login",
        formPath: "/company/forgot"
    });
}

exports.getCompanyPasswordReset = (req, res, next) =>{
    const resetID = req.params.resetID;
    const error = req.flash('adminLoginError')[0];

    Admin.findById(resetID).select("status").then(admin =>{
        if (admin.status === 1){
            return res.render('auth/reset-password', {
                pageTitle: "Company Password Reset",
                isError: error,
                path: "/company-reset/" + resetID
            });
        } else {
            return res.status(404).send('Page not found');
        }
    }).catch(err => console.log(err));
}

exports.postCompanyLogin = (req, res, next) => {

    Company.findOne({ email: req.body.email }).then(comp => {
        if (comp) {
            console.log(comp);

            if (req.body.password === comp.password) {
                if (comp.status === 0) {
                    req.flash('adminLoginError', 'Successfull login');
                    req.session.comp = comp;
                    return res.redirect('/dash');
                } else {
                    req.flash('adminLoginError', 'Password Reset request not completed');
                    return res.redirect('/company/login');
                }
            } else {
                req.flash('adminLoginError', 'Email or Password INCORRECT');
                return res.redirect('/company/login');
            }
        } else {
            req.flash('adminLoginError', 'Email or Password INCORRECT');
            return res.redirect('/company/login');
        }
    }).catch(err => {
        console.log(err);
        req.flash('adminLoginError', 'Email or Password INCORRECT');
    });
}

exports.postCompanyForgot = (req, res, next) => {

    Company.findOne({ email: req.body.email }).select('status').then(comp => {
        console.log('Company:', comp);
        if (comp) {
            comp.status = 1
            return comp.save();
        } else {
            req.flash('adminResetError', 'Email NOT FOUND');
            return res.redirect('/company/forgot');
        }
    }).then(async result => {
        console.log('Result:', result);
        const resetLink = '<a href="http://localhost:3000/company-reset/' + result._id + '" target="_blank">Reset Password link</a>';
        console.log('Reset Link: ', resetLink);

        let transporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "placementproject789@gmail.com", // generated ethereal user
                pass: "sahilraja" // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const body = `
            <h1>Placement Management System</h1>
            <p>Use the link below to reset the password:-</p>` + resetLink;

        let info = await transporter.sendMail({
            from: '"Placement Project" <placementproject789@gmail.com>', // sender address
            to: req.body.email, // list of receivers
            subject: "Password Reset Request", // Subject line
            html: body
        });

        req.flash('resetSuccess', 'Check your email for reset link(check span too).');
        return res.redirect('/company/login');
    }).catch(err => {
        console.log(err);
        req.flash('adminResetError', 'NETWORK ERROR');
        return res.redirect('/company/forgot');
    });

}

exports.postCompanyPasswordReset = (req, res, next) =>{
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const resetID = req.params.resetID;

    Company.findById(resetID).select('status password').then(comp =>{
        if (comp.status === 1){
            if (password === confirmPassword){
                comp.status = 0;
                comp.password = password;
                return comp.save();
            } else {
                req.flash('adminLoginError', 'Password did not match');
                return res.redirect("/company-reset/" + resetID);
            }
        } else {
            return res.status(404).send('Page not found');
        }
    }).then(result =>{
        req.flash('resetSuccess', 'Please try logging in with new password');
        return res.redirect('/company/login');
    }).catch(err => console.log(err));
}






/** Admin Controllers are bwlow **/

exports.getAdminLogin = (req, res, next) => {
    const error = req.flash('adminLoginError')[0];
    const reset = req.flash('resetSuccess')[0];
    const route = "/admin/login";

    console.log(error);

    res.render('auth/login', {
        pageTitle: "Admin Login",
        isError: error,
        formPath: "/admin/login",
        reset: reset,
        forgetLink: "/admin/forgot"
    });
}

exports.getAdminPasswordReset = (req, res, next) =>{
    const resetID = req.params.resetID;
    const error = req.flash('adminLoginError')[0];

    Admin.findById(resetID).select("status").then(admin =>{
        if (admin.status === 1){
            return res.render('auth/reset-password', {
                pageTitle: "Admin Password Reset",
                isError: error,
                path: "/admin-reset/" + resetID
            });
        } else {
            return res.status(404).send('Page not found');
        }
    }).catch(err => console.log(err));
}

exports.postAdminPasswordReset = (req, res, next) =>{
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const resetID = req.params.resetID;

    Admin.findById(resetID).select('status password').then(admin =>{
        if (admin.status === 1){
            if (password === confirmPassword){
                admin.status = 0;
                admin.password = password;
                return admin.save();
            } else {
                req.flash('adminLoginError', 'Password did not match');
                return res.redirect("/admin-reset/" + resetID);
            }
        } else {
            return res.status(404).send('Page not found');
        }
    }).then(result =>{
        req.flash('resetSuccess', 'Please try logging in with new password');
        return res.redirect('/admin/login');
    }).catch(err => console.log(err));
}

exports.postAdminLogin = (req, res, next) => {

    Admin.findOne({ email: req.body.email}).then(admin => {
        if (admin) {
            if (req.body.password === admin.password) {
                if (admin.status === 0) {
                    req.flash('adminLoginError', 'Successfull login');
                    req.session.adminData = admin;
                    return res.redirect('/adminDashboard');
                } else {
                    req.flash('adminLoginError', 'Password Reset request not completed');
                    return res.redirect('/admin/login');
                }
            } else {
                req.flash('adminLoginError', 'Email or Password INCORRECT');
                return res.redirect('/admin/login');
            }
        } else {
            req.flash('adminLoginError', 'Email or Password INCORRECT');
            return res.redirect('/admin/login');
        }
    }).catch(err => {
        console.log(err);
        req.flash('adminLoginError', 'Email or Password INCORRECT');
    });
}

exports.getAdminForgot = (req, res, next) => {
    const error = req.flash('adminResetError')[0];
    console.log(error);

    res.render('auth/forgot-password', {
        pageTitle: "Admin Forgot Password",
        isError: error
    });
}

exports.postAdminForgot = (req, res, next) => {

    Admin.findOne({
        email: req.body.email
    }).select('status').then(admin => {
        console.log('Admin:', admin);
        if (admin) {
            admin.status = 1
            return admin.save();
        } else {
            req.flash('adminResetError', 'Email NOT FOUND');
            return res.redirect('/admin/forgot');
        }
    }).then(async result => {
        console.log('Result:', result);
        const resetLink = '<a href="http://localhost:3000/admin-reset/' + result._id + '" target="_blank">Reset Password link</a>';
        console.log('Reset Link: ', resetLink);

        let transporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "placementproject789@gmail.com", // generated ethereal user
                pass: "sahilraja" // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const body = `
            <h1>Placement Management System</h1>
            <p>Use the link below to reset the password:-</p>` + resetLink;

        let info = await transporter.sendMail({
            from: '"Placement Project" <placementproject789@gmail.com>', // sender address
            to: req.body.email, // list of receivers
            subject: "Password Reset Request", // Subject line
            html: body
        });

        req.flash('resetSuccess', 'Check your email for reset link(check span too).');
        return res.redirect('/admin/login');
    }).catch(err => {
        console.log(err);
        req.flash('adminResetError', 'NETWORK ERROR');
        return res.redirect('/admin/forgot');
    });

}
