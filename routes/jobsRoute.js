const express = require('express');
const router = express();

const {
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
  showStats,
} = require('../controllers/jobsController');
const testUser = require('../middleware/testUser');

router.route('/').post(testUser, createJob).get(getAllJobs);
router.route('/stats').get(showStats);
router
  .route('/:id')
  .get(getSingleJob)
  .patch(testUser, updateJob)
  .delete(testUser, deleteJob);

module.exports = router;
