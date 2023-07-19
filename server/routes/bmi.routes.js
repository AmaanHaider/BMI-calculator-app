const express = require('express');
const {calculateBMI} = require('../controllers/bmi.controllers')

const router = express.Router();

router.post('/', calculateBMI);

module.exports = router;
