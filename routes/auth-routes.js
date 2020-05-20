const express = require('express');

const authController = require('../controllers/auth-controller');

const router = express.Router();


/** Admin Routes are bwlow **/

router.get('/student-reset/:resetID', authController.getStudentPasswordReset);

router.post('/student-reset/:resetID', authController.postStudentPasswordReset);

router.get('/student/forgot', authController.getStudentForgot);

router.post('/student/forgot', authController.postStudentForgot);

router.get('/student/login', authController.getStudentLogin);

router.post('/student/login', authController.postStudentLogin);





/** Admin Routes are bwlow **/

router.get('/company-reset/:resetID', authController.getCompanyPasswordReset);

router.post('/company-reset/:resetID', authController.postCompanyPasswordReset);

router.get('/company/forgot', authController.getCompanyForgot);

router.post('/company/forgot', authController.postCompanyForgot);

router.get('/company/login', authController.getCompanyLogin);

router.post('/company/login', authController.postCompanyLogin);






/** Admin Routes are bwlow **/

router.get('/admin-reset/:resetID', authController.getAdminPasswordReset);

router.post('/admin-reset/:resetID', authController.postAdminPasswordReset);

router.get('/admin/forgot', authController.getAdminForgot);

router.post('/admin/forgot', authController.postAdminForgot);

router.get('/admin/login', authController.getAdminLogin);

router.post('/admin/login', authController.postAdminLogin);

module.exports = router;