// routes.js
const express = require('express');
const router = express.Router();
const controller = require('./controller');


router.post('/AddJob', controller.addJob);

module.exports = router;
