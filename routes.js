// routes.js
const express = require('express');
const router = express.Router();
const controller = require('./controller');


router.post('/addjob', controller.addJob);
router.get('/getjobs',controller.getJobs)
router.put('/:id', controller.updateStatus);

module.exports = router;
