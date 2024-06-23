    // routes.js
    const express = require('express');
    const router = express.Router();
    const controller = require('./controller');


    router.post('/addjob', controller.addJob);
    router.get('/getjobs',controller.getJobs)
    router.put('/updatejob/:id', controller.updateStatus);
    router.delete('/deletejob/:id', controller.deleteJob);
    router.post('/addprocess/:id', controller.addProcess);
    router.get('/getprocess', controller.getProcess);
    router.post('/checkout', controller.payment);

    module.exports = router;
