const express = require('express');
const companyController = require('../controllers/company-controller');
const router = express.Router();

router.get('/dash',companyController.getDashboard);
router.get('/createJob',companyController.getCreateJob);
router.post('/job',companyController.postJobData);
router.get('/signOutCompany',companyController.getSignOutCompany);

//---------------Mayank------------------------------

router.get('/companyRegister',companyController.getCompanyRegister);
router.get('/companyReports',companyController.getCompanyReports);
router.get('/companyProfile',companyController.getCompanyProfile);
router.post('/companyRegister',companyController.postCompanyRegister);
router.get('/companyjobs/:jobs',companyController.getjobReportCompany);

module.exports = router;
