const express = require('express');
const adminController = require('../controllers/admin-controller');
const router = express.Router();

router.get('/adminDashboard',adminController.getAdminDash);
router.get('/signOutAdmin',adminController.getSignOutAdmin);

//----------------------Mayank-----------------------------------

router.get('/pendingCompanyList',adminController.getPendingCompany);

router.get('/pendingCompaniesview/:company',adminController.getViewandAcceptCompany);

router.get('/pendingCompanies/accept/:company',adminController.getAcceptCompany);

router.get('/pendingCompanies/delete/:company',adminController.getDeleteCompany);

router.get('/adminReports',adminController.getAdminReports);

router.get('/Companyview/:company',adminController.getViewReportCompany);

router.get('/jobs/:jobs',adminController.getjobReportCompany);

router.get('/pendingstudentList',adminController.getpendingstudentList);

router.get('/pendingStudentview/:student',adminController.getViewandAcceptStudent);

router.get('/pendingStudent/accept/:student',adminController.getAcceptStudent);

router.get('/pendingStudent/delete/:student',adminController.getDeleteStudent);

router.get('/adminProfile',adminController.getAdminProfile);

module.exports = router;
