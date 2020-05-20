const express = require('express');
const studentController = require('../controllers/student-controller');
const router = express.Router();

router.get('/jobDetails/:jobId',studentController.getEnrollData);
router.get('/jobView/:jobID',studentController.getJobData);
router.get('/StudentDash',studentController.getStudentDash);
router.get('/upcomingJobs',studentController.getUpcomingJobs);
router.get('/signOutStudent',studentController.getSignOutStudent);

router.get('/studentRegister',studentController.getStudentRegister);

router.post('/studentRegister',studentController.postStudentRegister);

router.get('/studentPlacementHistory',studentController.getStudentPlacementHistory);

router.get('/joblist',studentController.getjobList);

router.get('/',studentController.gethomepage);

router.get('/studentRegister',studentController.getStudentRegister);

router.post('/studentRegister',studentController.postStudentRegister);

router.get('/studentPlacementHistory',studentController.getStudentPlacementHistory);

router.get('/studProfile',studentController.getStudProfile);

module.exports = router;
